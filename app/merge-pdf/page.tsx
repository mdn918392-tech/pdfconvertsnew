"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowLeft, FileText, X, Merge, Layers, Shield, Zap, CheckCircle, Sparkles, ChevronUp, ChevronDown } from "lucide-react";
// Assuming these are correct paths in your project
import FileUploader from "@/app/components/FileUploader";
import ProgressBar from "@/app/components/ProgressBar";
import { mergePdfs } from "../../utils/pdfUtils";
import { downloadFile } from '../../utils/imageUtils';

export default function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [expandedFile, setExpandedFile] = useState<number | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

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
      // Simulate progress for better UX
      setProgress(20);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setProgress(50);
      // NOTE: mergePdfs is assumed to be a function that takes File[] and returns a Blob
      const blob = await mergePdfs(files); 
      
      setProgress(80);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setProgress(100);
      setPdfBlob(blob);
    } catch (error) {
      console.error("Merge error:", error);
      alert("Failed to merge PDFs. Please try again.");
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (pdfBlob) {
      // NOTE: downloadFile is assumed to be a utility function
      downloadFile(pdfBlob, "merged.pdf"); 
    }
  };

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === dropIndex) return;

    const newFiles = [...files];
    const draggedFile = newFiles[dragIndex];
    newFiles.splice(dragIndex, 1);
    newFiles.splice(dropIndex, 0, draggedFile);
    
    setFiles(newFiles);
    setDragIndex(null);
    setPdfBlob(null);
  };

  const moveFileUp = (index: number) => {
    if (index === 0) return;
    const newFiles = [...files];
    [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]];
    setFiles(newFiles);
    setPdfBlob(null);
  };

  const moveFileDown = (index: number) => {
    if (index === files.length - 1) return;
    const newFiles = [...files];
    [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
    setFiles(newFiles);
    setPdfBlob(null);
  };

  const totalSize = files.reduce((acc, file) => acc + file.size, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/20 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8 md:mb-12">
            <a
              href="/"
              className="inline-flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all font-medium group mb-6"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Back to Tools</span>
            </a>

            <div className="text-center mb-8">
              <motion.div 
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mb-6 shadow-2xl"
              >
                <Merge className="w-10 h-10 text-white" />
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                PDF Merger
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Combine multiple PDF files into a single, organized document
                <span className="block text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                  Drag & drop to rearrange pages in your desired order
                </span>
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-6 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                  <Merge className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Smart Merging</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Combine multiple PDFs while preserving quality and formatting
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-2xl border-2 border-blue-200 dark:border-blue-800/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Drag & Drop</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Arrange files in your preferred order before merging
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-2xl border-2 border-green-200 dark:border-green-800/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Secure Processing</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                All processing happens locally in your browser
              </p>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-2xl p-6 md:p-8 mb-8">
            {/* Upload Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl">
                  <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Upload PDF Files
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Select multiple PDF files to merge (minimum 2)
                  </p>
                </div>
              </div>

              <FileUploader
                accept="application/pdf"
                multiple={true}
                onFilesSelected={setFiles}
              />

              {files.length > 0 && (
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full">
                    <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-medium text-indigo-700 dark:text-indigo-300">
                      {files.length} files • {(totalSize / 1024 / 1024).toFixed(2)} MB total
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Files List & Controls */}
            {files.length > 0 && (
              <div className="space-y-8">
                {/* File List Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <Layers className="w-5 h-5 text-indigo-500" />
                    Files to Merge ({files.length})
                  </h3>
                  <button
                    onClick={() => setFiles([])}
                    className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {/* Files List */}
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {files.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDrop={(e) => handleDrop(e, index)}
                      className={`group relative ${
                        dragIndex === index ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            {/* Drag Handle */}
                            <div className="cursor-move p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                              <div className="space-y-1">
                                <div className="w-4 h-0.5 bg-gray-400 dark:bg-gray-500"></div>
                                <div className="w-4 h-0.5 bg-gray-400 dark:bg-gray-500"></div>
                                <div className="w-4 h-0.5 bg-gray-400 dark:bg-gray-500"></div>
                              </div>
                            </div>

                            {/* File Icon */}
                            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                              <FileText className="w-5 h-5 text-white" />
                            </div>

                            {/* File Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-full">
                                  #{index + 1}
                                </span>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                  {file.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                <span>•</span>
                                <span>Pages: ???</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            {/* Move Buttons */}
                            <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => moveFileUp(index)}
                                disabled={index === 0}
                                className="p-1 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed"
                                title="Move up"
                              >
                                <ChevronUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => moveFileDown(index)}
                                disabled={index === files.length - 1}
                                className="p-1 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed"
                                title="Move down"
                              >
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Expand Button */}
                            <button
                              onClick={() => setExpandedFile(expandedFile === index ? null : index)}
                              className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                              title="Show details"
                            >
                              {expandedFile === index ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>

                            {/* Remove Button */}
                            <button
                              onClick={() => handleRemoveFile(index)}
                              className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                              title="Remove file"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Expanded Details */}
                        <AnimatePresence>
                          {expandedFile === index && (
                            <motion.div
                              key="file-details" // <--- Added key here
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                            >
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500 dark:text-gray-400">Type:</span>
                                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                                    {file.type || 'application/pdf'}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-500 dark:text-gray-400">Last Modified:</span>
                                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                                    {new Date(file.lastModified).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Status Messages and Actions (Error was here) */}
                <AnimatePresence mode="wait">
                  {/* Warning: Need more files (key="warning") */}
                  {files.length < 2 && (
                    <motion.div
                      key="warning" // <--- ADDED KEY
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 rounded-xl border-2 border-yellow-200 dark:border-yellow-800/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
                          <FileText className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                          <p className="font-medium text-yellow-800 dark:text-yellow-200">
                            Need more files to merge
                          </p>
                          <p className="text-sm text-yellow-700 dark:text-yellow-300">
                            Please select at least 2 PDF files to continue
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Progress Bar (key="progress") */}
                  {converting && (
                    <motion.div
                      key="progress" // <--- ADDED KEY
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <ProgressBar progress={progress} label="Merging PDFs..." />
                      <div className="flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400">
                        <Sparkles className="w-4 h-4 animate-pulse" />
                        <span className="text-sm font-medium">
                          Combining {files.length} files into a single PDF
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Action Buttons (Merge vs. Download) */}
                  <div className="space-y-4">
                    {/* Merge Button (key="merge-button") */}
                    {!pdfBlob && !converting && files.length >= 2 && (
                      <motion.div
                        key="merge-button" // <--- ADDED KEY
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                      >
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleConvert}
                          className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-3"
                        >
                          <Merge className="w-6 h-6" />
                          Merge {files.length} PDF Files
                          <Zap className="w-5 h-5" />
                        </motion.button>
                      </motion.div>
                    )}

                    {/* Download/Success State (key="download-state") */}
                    {pdfBlob && (
                      <motion.div
                        key="download-state" // <--- ADDED KEY
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="space-y-6"
                      >
                        {/* Success Banner */}
                        <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl border-2 border-green-200 dark:border-green-800/50">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="flex items-center justify-center sm:justify-start">
                              <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-xl">
                                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                              </div>
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                PDFs Successfully Merged! 🎉
                              </h3>
                              <p className="text-green-700 dark:text-green-300 font-medium">
                                All {files.length} files have been combined
                              </p>
                              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                Ready to download your merged document
                              </p>
                            </div>
                            <div className="flex items-center justify-center">
                              <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl">
                                {(pdfBlob.size / 1024 / 1024).toFixed(2)} MB
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Download Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleDownload}
                          className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-extrabold rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-3"
                        >
                          <Download className="w-6 h-6" />
                          Download Merged PDF
                          <Sparkles className="w-5 h-5" />
                        </motion.button>

                        {/* Convert Another */}
                        <div className="text-center">
                          <button
                            onClick={() => {
                              setFiles([]);
                              setPdfBlob(null);
                              setProgress(0);
                            }}
                            className="inline-flex items-center gap-2 px-6 py-3 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-xl transition-colors"
                          >
                            <Merge className="w-4 h-4" />
                            Merge More Files
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Stats Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-black text-indigo-600 dark:text-indigo-400 mb-2">
                  {files.length}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Files Selected
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-purple-600 dark:text-purple-400 mb-2">
                  {(totalSize / 1024 / 1024).toFixed(1)} MB
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Total Size
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400 mb-2">
                  {files.length >= 2 ? "Ready" : "Waiting"}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Merge Status
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-green-600 dark:text-green-400 mb-2">
                  {pdfBlob ? "✓" : "—"}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Converted
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}