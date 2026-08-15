"use client"; // ⚠️ Required for client-side interactivity

import { useRef, useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { motion } from 'framer-motion';

interface FileUploaderProps {
  accept: string;
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
  // No size or count limits – always unlimited
}

export default function FileUploader({
  accept,
  multiple = false,
  onFilesSelected,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle files – no filtering, no limits
  const handleFiles = useCallback(
    (newFilesList: FileList | null) => {
      if (!newFilesList) return;

      const fileArray = Array.from(newFilesList);

      if (fileArray.length === 0) return;

      // Pass all files directly – NO SIZE or COUNT checks
      if (multiple) {
        onFilesSelected(fileArray);
      } else {
        onFilesSelected(fileArray.slice(0, 1));
      }

      if (inputRef.current) inputRef.current.value = "";
    },
    [multiple, onFilesSelected]
  );

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
          {multiple ? "Multiple files supported" : "Single file only"} • 
          <span className="font-medium"> Unlimited size • No limits</span>
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