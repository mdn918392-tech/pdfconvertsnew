"use client"; // ⚠️ Required for client-side interactivity

import { useRef, useState, useCallback, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { motion } from 'framer-motion';

interface FileUploaderProps {
  accept: string;
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
  maxSize?: number; // Default size in MB
  existingFilesCount?: number; // नया prop
  hasExistingPdf?: boolean;    // नया prop
  isMobile?: boolean;
  maxFiles?: number; // Add this line - maximum number of files allowed
}

export default function FileUploader({
  accept,
  multiple = false,
  onFilesSelected,
  maxSize = 1024,
  maxFiles, // Add this line
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [deviceMaxSize, setDeviceMaxSize] = useState(maxSize);
  const inputRef = useRef<HTMLInputElement>(null);

  // Device detection - runs only on client side
  useEffect(() => {
    const checkDevice = () => {
      const isMobileDevice = window.innerWidth <= 768; // Mobile detection
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      
      // Phone के लिए 35MB, laptop/desktop के लिए 100MB
      const calculatedMaxSize = (isMobileDevice || isMobileUserAgent) ? 35 : 100;
      setDeviceMaxSize(calculatedMaxSize);
    };

    checkDevice();
    
    // Optional: Listen to window resize for responsiveness
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  //
  // 3️⃣ HANDLE FILE SELECTION
  //
  const handleFiles = useCallback(
    (newFilesList: FileList | null) => {
      if (!newFilesList) return;

      const fileArray = Array.from(newFilesList);
      const currentMaxSize = deviceMaxSize;

      // Check file size
      const validNewFiles: File[] = fileArray.filter((file) => {
        const sizeMB = file.size / 1024 / 1024;
        if (sizeMB > currentMaxSize) {
          alert(`File "${file.name}" exceeds maximum size of ${currentMaxSize}MB.`);
          return false;
        }
        return true;
      });

      if (validNewFiles.length === 0) return;

      // Check maxFiles limit if provided
      if (maxFiles !== undefined && validNewFiles.length > maxFiles) {
        alert(`Maximum ${maxFiles} file(s) allowed. You selected ${validNewFiles.length} files.`);
        return;
      }

      // Call parent callback immediately with the new files
      if (multiple) {
        onFilesSelected(validNewFiles);
      } else {
        onFilesSelected(validNewFiles.slice(0, 1));
      }

      if (inputRef.current) inputRef.current.value = "";
    },
    [multiple, onFilesSelected, deviceMaxSize, maxFiles] // Add maxFiles to dependencies
  );

  //
  // 5️⃣ DRAG & DROP HANDLERS
  //
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="w-full">
      <motion.div
        whileHover={{ scale: 1.01 }}
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          transition-all duration-200
          ${
            isDragging
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
          }
        `}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          {isDragging ? "Drop files here" : "Click or drag files to upload"}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {multiple ? "Multiple files supported" : "Single file only"} • Max{" "}
          {deviceMaxSize}MB per file
          {maxFiles !== undefined && ` • Max ${maxFiles} file${maxFiles !== 1 ? 's' : ''}`}
        </p>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </motion.div>
    </div>
  );
}