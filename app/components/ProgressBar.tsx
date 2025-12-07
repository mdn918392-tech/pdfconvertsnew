"use client"; // ⚠️ Required for client-side interactivity

import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  label?: string;
}

export default function ProgressBar({ progress, label }: ProgressBarProps) {
  return (
    <div className="w-full">
      {label && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {label}
        </p>
      )}
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 text-right">
        {progress}%
      </p>
    </div>
  );
}
