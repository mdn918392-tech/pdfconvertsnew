"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, ArrowLeft, FileText, X } from "lucide-react";
import FileUploader from "@/app/components/FileUploader";
import ProgressBar from "@/app/components/ProgressBar";
import { mergePdfs } from "../../utils/pdfUtils";
import { downloadFile } from '../../utils/imageUtils';

export default function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((currentFiles) =>
      currentFiles.filter((_, index) => index !== indexToRemove)
    );
    setPdfBlob(null);
  };

  const handleConvert = async () => {
    if (files.length < 2) {
      alert("Please select at least 2 PDF files to merge");
      return;
    }

    setConverting(true);
    setProgress(0);

    try {
      setProgress(30);
      const blob = await mergePdfs(files);
      setProgress(100);
      setPdfBlob(blob);
    } catch (error) {
      console.error("Merge error:", error);
      alert("Failed to merge PDFs");
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (pdfBlob) {
      downloadFile(pdfBlob, "merged.pdf");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Merge PDF Files
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Combine multiple PDF files into a single document
          </p>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 mb-6">
            <FileUploader
              accept="application/pdf"
              multiple={true}
              onFilesSelected={setFiles}
            />

            {files.length > 0 && (
              <div className="mt-6 space-y-4">
                {/* FILE LIST */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Uploaded Files ({files.length})
                  </h3>

                  <div className="max-h-60 overflow-y-auto pr-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-2"
                      >
                        <div className="flex items-center truncate">
                          <FileText className="w-5 h-5 text-blue-500 mr-3" />
                          <span className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            {file.name}
                          </span>
                        </div>
                        <button
                          onClick={() => handleRemoveFile(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          title="Remove file"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {files.length < 2 && (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                      Please select at least 2 PDF files to merge
                    </p>
                  </div>
                )}

                {converting && (
                  <ProgressBar progress={progress} label="Merging PDFs..." />
                )}

                {!pdfBlob && !converting && files.length >= 2 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConvert}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Merge PDFs
                  </motion.button>
                )}

                {pdfBlob && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownload}
                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Merged PDF
                  </motion.button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
