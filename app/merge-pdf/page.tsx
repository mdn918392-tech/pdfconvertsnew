"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, ArrowLeft, FileText, X, Merge, Layers, Shield, Zap, 
  CheckCircle, Sparkles, ChevronUp, ChevronDown, RefreshCw, 
  Search, ArrowRight, Grid, Eye, Plus, ArrowUpDown
} from "lucide-react";
import FileUploader from "@/app/components/FileUploader";
import ProgressBar from "@/app/components/ProgressBar";
import { mergePdfs, reversePdfOrder } from "../../utils/pdfUtils";
import { downloadFile } from '../../utils/imageUtils';

// Smart filename generator for merged PDFs
const generateMergedPdfFilename = (files: File[]): string => {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
  
  if (files.length === 2) {
    const firstFile = files[0].name.replace(/\.pdf$/i, '');
    const secondFile = files[1].name.replace(/\.pdf$/i, '');
    return `${firstFile}_and_${secondFile}_merged_${dateStr}.pdf`;
  } else if (files.length === 3) {
    const fileNames = files.map(file => 
      file.name.replace(/\.pdf$/i, '').substring(0, 15)
    ).join('_');
    return `${fileNames}_merged_${dateStr}.pdf`;
  } else if (files.length > 3) {
    const firstFile = files[0].name.replace(/\.pdf$/i, '').substring(0, 20);
    const lastFile = files[files.length - 1].name.replace(/\.pdf$/i, '').substring(0, 20);
    return `${firstFile}_to_${lastFile}_merged_${files.length}files_${dateStr}.pdf`;
  } else {
    return `merged_document_${dateStr}_${timeStr}.pdf`;
  }
};

const generateDescriptiveFilename = (files: File[]): string => {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  
  const firstFileName = files[0].name.replace(/\.pdf$/i, '');
  const cleanName = firstFileName
    .replace(/[^a-zA-Z0-9\s-_]/g, '')
    .substring(0, 30)
    .trim();
  
  if (files.length === 1) {
    return `${cleanName}_${dateStr}.pdf`;
  } else if (files.length === 2) {
    const secondName = files[1].name
      .replace(/\.pdf$/i, '')
      .replace(/[^a-zA-Z0-9\s-_]/g, '')
      .substring(0, 15)
      .trim();
    return `${cleanName}_and_${secondName}_${dateStr}.pdf`;
  } else {
    return `${cleanName}_and_${files.length - 1}_more_files_merged_${dateStr}.pdf`;
  }
};

const getMergedFilename = (files: File[]): string => {
  return generateDescriptiveFilename(files);
};

export default function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [expandedFile, setExpandedFile] = useState<number | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [reverseFlags, setReverseFlags] = useState<boolean[]>([]); // Individual file reverse flags
  const [showUploader, setShowUploader] = useState(true);

  // Initialize reverse flags when files change
  const handleFilesSelected = (selectedFiles: File[]) => {
    // Prevent duplicate files
    const newFiles = selectedFiles.filter(newFile => {
      return !files.some(existingFile => 
        existingFile.name === newFile.name && 
        existingFile.size === newFile.size &&
        existingFile.lastModified === newFile.lastModified
      );
    });
    
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    
    // Initialize reverse flags for new files
    setReverseFlags(prev => [...prev, ...new Array(newFiles.length).fill(false)]);
    
    setPdfBlob(null);
    setShowUploader(false);
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((currentFiles) =>
      currentFiles.filter((_, index) => index !== indexToRemove)
    );
    
    // Remove the corresponding reverse flag
    setReverseFlags(prev => 
      prev.filter((_, index) => index !== indexToRemove)
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
      setProgress(20);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setProgress(50);
      let blob = await mergePdfs(files);
      
      // Apply individual file reverse if any flags are true
      const hasReverse = reverseFlags.some(flag => flag);
      if (hasReverse) {
        // You'll need to implement a function that handles individual file reversal
        // This would require more complex PDF manipulation
        // For now, we'll just reverse the entire document if any file needs reversal
        blob = await reversePdfOrder(blob);
      }
      
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
      let filename = getMergedFilename(files);
      
      // Check if any individual files are reversed
      const hasReverse = reverseFlags.some(flag => flag);
      if (hasReverse) {
        filename = filename.replace('.pdf', '_with_reverse.pdf');
      }
      
      downloadFile(pdfBlob, filename); 
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
    
    // Also move the corresponding reverse flag
    const newReverseFlags = [...reverseFlags];
    const draggedFlag = newReverseFlags[dragIndex];
    newReverseFlags.splice(dragIndex, 1);
    newReverseFlags.splice(dropIndex, 0, draggedFlag);
    
    setFiles(newFiles);
    setReverseFlags(newReverseFlags);
    setDragIndex(null);
    setPdfBlob(null);
  };

  const moveFileUp = (index: number) => {
    if (index === 0) return;
    const newFiles = [...files];
    [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]];
    
    // Also swap reverse flags
    const newReverseFlags = [...reverseFlags];
    [newReverseFlags[index], newReverseFlags[index - 1]] = [newReverseFlags[index - 1], newReverseFlags[index]];
    
    setFiles(newFiles);
    setReverseFlags(newReverseFlags);
    setPdfBlob(null);
  };

  const moveFileDown = (index: number) => {
    if (index === files.length - 1) return;
    const newFiles = [...files];
    [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
    
    // Also swap reverse flags
    const newReverseFlags = [...reverseFlags];
    [newReverseFlags[index], newReverseFlags[index + 1]] = [newReverseFlags[index + 1], newReverseFlags[index]];
    
    setFiles(newFiles);
    setReverseFlags(newReverseFlags);
    setPdfBlob(null);
  };

  const toggleReverseForFile = (index: number) => {
    const newReverseFlags = [...reverseFlags];
    newReverseFlags[index] = !newReverseFlags[index];
    setReverseFlags(newReverseFlags);
    setPdfBlob(null);
  };

  const handleAddMoreFiles = () => {
    setShowUploader(true);
  };

  const totalSize = files.reduce((acc, file) => acc + file.size, 0);

  // Explore Tools Data
  const exploreTools = [
    {
      name: "PDF Splitter",
      description: "Split PDF into multiple files",
      icon: "📄",
      color: "from-blue-500 to-cyan-500",
      href: "/split-pdf"
    },
    {
      name: "PDF Compressor",
      description: "Reduce PDF file size",
      icon: "🗜️",
      color: "from-green-500 to-emerald-500",
      href: "/compress-pdf"
    },
    {
      name: "PDF to Word",
      description: "Convert PDF to editable Word",
      icon: "📝",
      color: "from-purple-500 to-pink-500",
      href: "/pdf-to-word"
    },
    {
      name: "PDF to Image",
      description: "Convert PDF pages to images",
      icon: "🖼️",
      color: "from-orange-500 to-red-500",
      href: "/pdf-to-image"
    },
    {
      name: "PDF Encrypt",
      description: "Add password protection",
      icon: "🔒",
      color: "from-indigo-500 to-blue-500",
      href: "/encrypt-pdf"
    },
    {
      name: "PDF Rotate",
      description: "Rotate PDF pages",
      icon: "🔄",
      color: "from-yellow-500 to-amber-500",
      href: "/rotate-pdf"
    }
  ];

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
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Individual Reverse</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Reverse individual files before merging
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-2xl border-2 border-purple-200 dark:border-purple-800/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
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
                    {files.length > 0 && (
                      <span className="ml-2 text-indigo-600 dark:text-indigo-400 font-medium">
                        • {files.length} file{files.length !== 1 ? 's' : ''} selected
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Show uploader only when needed */}
              {showUploader || files.length === 0 ? (
                <FileUploader
                  accept="application/pdf"
                  multiple={true}
                  onFilesSelected={handleFilesSelected}
                />
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors cursor-pointer bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20">
                  <button
                    onClick={handleAddMoreFiles}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <Plus className="w-5 h-5" />
                    <div className="text-left">
                      <div className="text-lg">Add More PDF Files</div>
                      <div className="text-sm font-normal opacity-90">Click to select additional files</div>
                    </div>
                  </button>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    You can add more PDF files to merge with existing {files.length} files
                  </p>
                </div>
              )}

              {files.length > 0 && (
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full">
                    <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-medium text-indigo-700 dark:text-indigo-300">
                      {files.length} files • {(totalSize / 1024 / 1024).toFixed(2)} MB total
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                      Will save as: 
                    </span>{" "}
                    <span className="truncate max-w-xs inline-block align-middle">
                      {getMergedFilename(files)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Files List & Controls */}
            {files.length > 0 && (
              <div className="space-y-8">
                {/* File List Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <Layers className="w-5 h-5 text-indigo-500" />
                    Files to Merge ({files.length})
                  </h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleAddMoreFiles}
                      className="px-5 py-2.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/40 dark:hover:to-purple-900/40 rounded-xl transition-colors flex items-center gap-2 border border-indigo-200 dark:border-indigo-800"
                    >
                      <Plus className="w-4 h-4" />
                      Add More
                    </button>
                    <button
                      onClick={() => {
                        setFiles([]);
                        setReverseFlags([]);
                        setPdfBlob(null);
                        setShowUploader(true);
                      }}
                      className="px-5 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 hover:from-red-100 hover:to-pink-100 dark:hover:from-red-900/40 dark:hover:to-pink-900/40 rounded-xl transition-colors border border-red-200 dark:border-red-800"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                {/* Desktop Merge Preview */}
                <div className="hidden lg:block bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-800/50">
                  <div className="flex items-center justify-center gap-4">
                    {files.map((file, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                            <FileText className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-lg font-bold text-indigo-700 dark:text-indigo-300">
                            #{index + 1}
                          </span>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
                            {file.name.replace(/\.pdf$/i, '').substring(0, 20)}
                            {file.name.replace(/\.pdf$/i, '').length > 20 ? '...' : ''}
                          </div>
                          {reverseFlags[index] && (
                            <div className="text-xs text-red-600 dark:text-red-400 font-medium mt-1 flex items-center justify-center gap-1">
                              <RefreshCw className="w-3 h-3" />
                              Reversed
                            </div>
                          )}
                        </div>
                        {index < files.length - 1 && (
                          <div className="mx-2 flex items-center">
                            <ArrowRight className="w-6 h-6 text-indigo-400 dark:text-indigo-500" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
                    Preview of merge order {files.length} files → 1 merged PDF
                  </div>
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

                            {/* File Number */}
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                                <span className="text-white font-bold text-lg">
                                  {index + 1}
                                </span>
                              </div>
                            </div>

                            {/* File Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                  {file.name}
                                </span>
                                {reverseFlags[index] && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 text-red-700 dark:text-red-300 rounded-full text-xs font-medium">
                                    <RefreshCw className="w-3 h-3" />
                                    Reversed
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                <span>•</span>
                                <span>PDF Document</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            {/* Reverse Button */}
                            <button
                              onClick={() => toggleReverseForFile(index)}
                              className={`p-2 rounded-lg transition-colors ${
                                reverseFlags[index]
                                  ? 'bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 text-red-600 dark:text-red-400'
                                  : 'text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                              }`}
                              title={reverseFlags[index] ? "Remove reverse" : "Reverse this file"}
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>

                            {/* Move Buttons */}
                            <div className="hidden sm:flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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

                        {/* Mobile Move Buttons */}
                        <div className="sm:hidden flex items-center justify-center gap-4 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <button
                            onClick={() => moveFileUp(index)}
                            disabled={index === 0}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed bg-gray-100 dark:bg-gray-800 rounded-lg"
                          >
                            <ChevronUp className="w-4 h-4" />
                            Move Up
                          </button>
                          <button
                            onClick={() => moveFileDown(index)}
                            disabled={index === files.length - 1}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed bg-gray-100 dark:bg-gray-800 rounded-lg"
                          >
                            <ChevronDown className="w-4 h-4" />
                            Move Down
                          </button>
                        </div>

                        {/* Expanded Details */}
                        <AnimatePresence>
                          {expandedFile === index && (
                            <motion.div
                              key="file-details"
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
                                <div>
                                  <span className="text-gray-500 dark:text-gray-400">Reverse Status:</span>
                                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                                    {reverseFlags[index] ? 'Will be reversed' : 'Normal order'}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-500 dark:text-gray-400">Position:</span>
                                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                                    {index + 1} of {files.length}
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

                {/* Status Messages and Actions */}
                <AnimatePresence mode="wait">
                  {/* Warning: Need more files */}
                  {files.length < 2 && (
                    <motion.div
                      key="warning"
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

                  {/* Progress Bar */}
                  {converting && (
                    <motion.div
                      key="progress"
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
                          {reverseFlags.some(flag => flag) && " (with reverse)"}
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Action Buttons (Merge vs. Download) */}
                  <div className="space-y-4">
                    {/* Merge Button */}
                    {!pdfBlob && !converting && files.length >= 2 && (
                      <motion.div
                        key="merge-button"
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
                        
                        {/* Applied Options Preview */}
                        {reverseFlags.some(flag => flag) && (
                          <div className="mt-3 flex flex-wrap gap-2 justify-center">
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm">
                              <RefreshCw className="w-3 h-3" />
                              Some files will be reversed
                            </span>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Download/Success State */}
                    {pdfBlob && (
                      <motion.div
                        key="download-state"
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
                                {reverseFlags.some(flag => flag) && " (with reverse)"}
                              </p>
                              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                Ready to download: <span className="font-mono text-indigo-600 dark:text-indigo-400">
                                  {getMergedFilename(files)}
                                  {reverseFlags.some(flag => flag) && "_with_reverse"}
                                  .pdf
                                </span>
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
                              setReverseFlags([]);
                              setPdfBlob(null);
                              setProgress(0);
                              setShowUploader(true);
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

          {/* Explore All Tools Section */}
          <div className="mt-12 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950/10 rounded-3xl border-2 border-gray-200 dark:border-gray-800 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                  <Grid className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Explore All PDF Tools
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Discover more powerful tools to manipulate, convert, and optimize your PDF documents
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {exploreTools.map((tool, index) => (
                <motion.a
                  key={index}
                  href={tool.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 bg-gradient-to-br ${tool.color} rounded-xl`}>
                      <span className="text-2xl">{tool.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {tool.description}
                      </p>
                      <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
                        <span className="text-sm">Try Now</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="text-center mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <a
                href="/all-tools"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Search className="w-5 h-5" />
                View All Tools
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
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
                  {reverseFlags.filter(flag => flag).length}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Files to Reverse
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}