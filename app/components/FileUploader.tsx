"use client"; // ⚠️ Required for client-side interactivity

import { useRef, useState, useCallback, useEffect } from 'react';
import { Upload, X, File as FileIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface FileWithPreview extends File {
  previewUrl?: string;
}

interface FileUploaderProps {
  accept: string;
  multiple?: boolean;
  onFilesSelected: (files: FileWithPreview[]) => void;
  maxSize?: number; // Size in MB
}

export default function FileUploader({
  accept,
  multiple = false,
  onFilesSelected,
  maxSize = 1024,
}: FileUploaderProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  //
  // 1️⃣ SAFE: CREATE & CLEANUP PREVIEW URLs
  //
  useEffect(() => {
    files.forEach((file) => {
      if (file.type.startsWith("image/") && !file.previewUrl) {
        file.previewUrl = URL.createObjectURL(file);
      }
    });

    return () => {
      files.forEach(
        (file) => file.previewUrl && URL.revokeObjectURL(file.previewUrl)
      );
    };
  }, [files]);

  //
  // 2️⃣ SAFE: NOTIFY PARENT ONLY WHEN FILES CHANGE (NO LOOP)
  //
 useEffect(() => {
  if (files && files.length > 0) {
    onFilesSelected(files);
  }
}, [files]); // ✅ runs only when files change


  //
  // 3️⃣ HANDLE FILE SELECTION
  //
  const handleFiles = useCallback(
    (newFilesList: FileList | null) => {
      if (!newFilesList) return;

      const fileArray = Array.from(newFilesList);

      const validNewFiles: FileWithPreview[] = fileArray.filter((file) => {
        const sizeMB = file.size / 1024 / 1024;
        if (sizeMB > maxSize) {
          alert(`File "${file.name}" exceeds maximum size of ${maxSize}MB.`);
          return false;
        }
        return true;
      });

      setFiles((prevFiles) => {
        let updatedFiles: FileWithPreview[];

        if (multiple) {
          updatedFiles = [...prevFiles, ...validNewFiles];
        } else {
          if (prevFiles.length > 0 && prevFiles[0].previewUrl) {
            URL.revokeObjectURL(prevFiles[0].previewUrl);
          }
          updatedFiles = validNewFiles.slice(0, 1);
        }

        return updatedFiles;
      });

      if (inputRef.current) inputRef.current.value = "";
    },
    [multiple, maxSize]
  );

  //
  // 4️⃣ REMOVE FILE
  //
 

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
          {100}MB per file
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
