"use client"; 

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowLeft, FileText, Scissors, Eye, Filter, Shield, Zap, CheckCircle, Sparkles, File, X } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import ProgressBar from '../components/ProgressBar';
import { extractPages } from '../../utils/pdfUtils';
import { downloadFile } from '../../utils/imageUtils';
import { PDFDocument } from 'pdf-lib';

export default function ExtractPages() {
  const [files, setFiles] = useState<File[]>([]);
  const [pageNumbers, setPageNumbers] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [showUploadInfo, setShowUploadInfo] = useState(true);
  const [expandedPreview, setExpandedPreview] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [previewModal, setPreviewModal] = useState<{url: string | null, open: boolean}>({url: null, open: false});

  // Client-side check
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFileSelect = async (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setPdfBlob(null);
    setPdfUrl(null);
    setPageNumbers('');
    setShowUploadInfo(false);

    if (selectedFiles.length > 0) {
      try {
        const arrayBuffer = await selectedFiles[0].arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        setTotalPages(pdf.getPageCount());
      } catch (error) {
        console.error('Error loading PDF:', error);
        setTotalPages(0);
      }
    } else {
      setTotalPages(0);
    }
  };

  const handleConvert = async () => {
    if (files.length === 0 || !pageNumbers.trim()) {
      alert('Please select a PDF file and enter page numbers to extract.');
      return;
    }
    
    const pages = parsePageNumbers(pageNumbers, totalPages);
    
    if (pages.length === 0) {
      alert('Please enter valid page numbers within the document range.');
      return;
    }

    setConverting(true);
    setProgress(0);
    setPdfBlob(null);
    setPdfUrl(null);
    setPreviewLoading(true);

    try {
      setProgress(20);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setProgress(50);
      const blob = await extractPages(files[0], pages);
      
      setProgress(80);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setProgress(100);
      setPdfBlob(blob);
    } catch (error) {
      console.error('Extraction error:', error);
      alert('Failed to extract pages. Please try again.');
    } finally {
      setConverting(false);
      setPreviewLoading(false);
    }
  };

  const parsePageNumbers = (input: string, total: number): number[] => {
    if (!input.trim()) return [];
    
    const numbers = new Set<number>();
    const parts = input.split(',');
    
    for (const part of parts) {
      const trimmed = part.trim();
      
      // Check for range (e.g., "1-5")
      if (trimmed.includes('-')) {
        const [startStr, endStr] = trimmed.split('-').map(s => s.trim());
        const start = parseInt(startStr);
        const end = parseInt(endStr);
        
        if (!isNaN(start) && !isNaN(end) && start > 0 && end <= total && start <= end) {
          for (let i = start; i <= end; i++) {
            numbers.add(i);
          }
        }
      } else {
        // Single number
        const num = parseInt(trimmed);
        if (!isNaN(num) && num > 0 && num <= total) {
          numbers.add(num);
        }
      }
    }
    
    return Array.from(numbers).sort((a, b) => a - b);
  };

  const handleDownload = () => {
    if (pdfBlob) {
      const pages = parsePageNumbers(pageNumbers, totalPages);
      const pageList = pages.join('-');
      downloadFile(pdfBlob, `pages-${pageList}.pdf`);
    }
  };

  useEffect(() => {
    if (pdfBlob && isClient) {
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);

      return () => {
        URL.revokeObjectURL(url);
        setPdfUrl(null);
      };
    }
  }, [pdfBlob, isClient]);

  const fileSize = files[0] ? (files[0].size / 1024 / 1024).toFixed(2) : 0;
  const extractedPages = parsePageNumbers(pageNumbers, totalPages);

  // Render PDF preview using iframe
  const renderPdfPreview = () => {
    if (!pdfUrl || !isClient) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <FileText className="w-12 h-12 text-gray-400 mb-3" />
          <span className="text-gray-500">Preview not available</span>
        </div>
      );
    }

    return (
      <div className="w-full h-full">
        <iframe
          src={pdfUrl}
          title="Extracted PDF Preview"
          className="w-full h-full"
          frameBorder="0"
        />
      </div>
    );
  };

  // Render full screen preview modal
  const renderFullScreenPreview = () => {
    if (!previewModal.url || !isClient) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-600">Loading...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full">
        <iframe
          src={previewModal.url}
          title="PDF Preview"
          className="w-full h-full"
          frameBorder="0"
        />
      </div>
    );
  };

  return (
    <>
      {/* Full Screen Preview Modal */}
      <AnimatePresence>
        {previewModal.open && previewModal.url && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setPreviewModal({url: null, open: false})}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-white" />
                  <h3 className="text-white font-bold">
                    PDF Preview
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (previewModal.url) {
                        window.open(previewModal.url, '_blank');
                      }
                    }}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    title="Open in new tab"
                  >
                    <Download className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => setPreviewModal({url: null, open: false})}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* PDF Preview */}
              <div className="h-[calc(90vh-80px)] p-4">
                {renderFullScreenPreview()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header Section */}
            <div className="mb-8 md:mb-12">
              <a
                href="/"
                className="inline-flex items-center gap-2 md:gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all font-medium group mb-4 md:mb-6"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm md:text-base">Back to Tools</span>
              </a>

              <div className="text-center mb-6 md:mb-8">
                <motion.div 
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-4 md:mb-6 shadow-2xl"
                >
                  <Scissors className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </motion.div>
                
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-3 md:mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  PDF Page Extractor
                </h1>
                
                <p className="text-sm md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
                  Extract specific pages from PDF documents with precision
                  <span className="block text-blue-600 dark:text-blue-400 font-medium mt-1 text-sm md:text-base">
                    Select single pages or ranges (e.g., 1,3,5 or 1-5)
                  </span>
                </p>
              </div>
            </div>

            {/* Features Grid */}
            {/* Features Grid */}
<AnimatePresence>
  {showUploadInfo && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mb-8 md:mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
    >
      {/* CARD 1 */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-4 md:p-6 rounded-2xl border-2 border-blue-200 dark:border-blue-800/50 overflow-hidden">
        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
          <div className="p-1.5 md:p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
            <Filter className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white break-words leading-snug">
            Selective Extraction
          </h3>
        </div>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 break-words leading-snug">
          Extract specific pages or page ranges from your PDF
        </p>
      </div>

      {/* CARD 2 */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-4 md:p-6 rounded-2xl border-2 border-purple-200 dark:border-purple-800/50 overflow-hidden">
        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
          <div className="p-1.5 md:p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
            <Zap className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white break-words leading-snug">
            Fast Processing
          </h3>
        </div>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 break-words leading-snug">
          Extract pages instantly with optimized algorithms
        </p>
      </div>

      {/* CARD 3 */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-4 md:p-6 rounded-2xl border-2 border-green-200 dark:border-green-800/50 overflow-hidden">
        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
          <div className="p-1.5 md:p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
            <Shield className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white break-words leading-snug">
            Secure Processing
          </h3>
        </div>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 break-words leading-snug">
          All processing happens locally in your browser
        </p>
      </div>

    </motion.div>
  )}
</AnimatePresence>


            {/* Main Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-xl md:shadow-2xl p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
              {/* Upload Section */}
              <div className="mb-6 md:mb-8">
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                  <div className="p-1.5 md:p-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl">
                    <FileText className="w-4 h-4 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      Upload PDF File
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Select a PDF file to extract pages from
                    </p>
                  </div>
                </div>

                <FileUploader
                  accept="application/pdf"
                  multiple={false}
                  onFilesSelected={handleFileSelect}
                />

                {files.length > 0 && (
                  <div className="mt-3 md:mt-4 text-center">
                    <div className="inline-flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-xs md:text-sm">
                      <FileText className="w-3 h-3 md:w-4 md:h-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-blue-700 dark:text-blue-300">
                        {files[0].name} • {fileSize} MB • {totalPages} pages
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Content Area */}
              {files.length > 0 && (
                <div className="space-y-6 md:space-y-8">
                  {/* File Info Card */}
                  <div className="p-4 md:p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20 rounded-xl md:rounded-2xl border-2 border-blue-200 dark:border-blue-800/30">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
    <div className="flex items-center gap-3 md:gap-4">
      <div className="p-2 md:p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg md:rounded-xl shadow-md">
        <FileText className="w-5 h-5 md:w-8 md:h-8 text-white" />
      </div>
      <div>
        <h3
          className="font-bold text-gray-900 dark:text-white text-base md:text-lg 
          break-words line-clamp-2 max-w-[230px] md:max-w-[350px]"
        >
          {files[0].name}
        </h3>

        <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
          <span>{fileSize} MB</span>
          <span>•</span>
          <span>{totalPages} pages total</span>
        </div>
      </div>
    </div>

    <button
      onClick={() => {
        setFiles([]);
        setPdfBlob(null);
        setPageNumbers('');
        setShowUploadInfo(true);
      }}
      className="px-4 py-1.5 md:px-6 md:py-2.5 text-xs md:text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors mt-2 sm:mt-0"
    >
      Change File
    </button>
  </div>
</div>


                                       {/* Mobile Preview Warning */}
<div className="md:hidden p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
    <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300 text-center">
        Tap on any page to view the image clearly.
    </p>
</div>



                  {/* Page Selection */}
                  <div className="space-y-4 md:space-y-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 md:gap-3">
                      <Scissors className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                      Select Pages to Extract
                    </h3>

                    <div className="space-y-3 md:space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1 md:mb-2">
                          <label className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Page Numbers
                          </label>
                          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                            Total: {totalPages} pages
                          </span>
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            value={pageNumbers}
                            onChange={(e) => {
                              setPageNumbers(e.target.value);
                              setPdfBlob(null);
                              setPdfUrl(null);
                            }}
                            placeholder="e.g., 1,3,5 or 1-5"
                            className="w-full px-4 py-3 md:px-6 md:py-4 border-2 border-gray-300 dark:border-gray-700 rounded-xl md:rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm md:text-base"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {extractedPages.length > 0 && (
                              <span className="text-xs md:text-sm font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-2 py-0.5 rounded-full">
                                {extractedPages.length} selected
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mt-1 md:mt-2">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Enter page numbers separated by commas or ranges with dash (e.g., 1,3,5 or 1-5)
                          </p>
                        </div>
                      </div>

                      {/* Pages Preview */}
                      {extractedPages.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 md:p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl md:rounded-2xl border-2 border-blue-200 dark:border-blue-800/50"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                                <File className="w-3 h-3 md:w-4 md:h-4 text-white" />
                              </div>
                              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                                Selected Pages
                              </h4>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap gap-1 md:gap-2">
                                {extractedPages.map((page, index) => (
                                  <span
                                    key={page}
                                    className="px-2 md:px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs md:text-sm rounded-lg font-medium shadow-sm"
                                  >
                                    Page {page}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    {converting && (
                      <div className="space-y-3 md:space-y-4">
                        <ProgressBar 
                          progress={progress} 
                          label="Extracting selected pages..." 
                        />
                        <div className="flex items-center justify-center gap-1 md:gap-2 text-blue-600 dark:text-blue-400">
                          <Sparkles className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
                          <span className="text-xs md:text-sm font-medium">
                            Processing {extractedPages.length} pages...
                          </span>
                        </div>
                      </div>
                    )}

                    {!pdfBlob && !converting && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleConvert}
                        disabled={extractedPages.length === 0}
                        className={`w-full py-3 md:py-4 px-4 md:px-6 font-bold rounded-xl md:rounded-2xl shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm md:text-lg flex items-center justify-center gap-2 md:gap-3 ${
                          extractedPages.length === 0
                            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-white'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                        }`}
                      >
                        <Scissors className="w-4 h-4 md:w-6 md:h-6" />
                        {extractedPages.length === 0 ? 'Enter Page Numbers' : `Extract ${extractedPages.length} Pages`}
                        <Zap className="w-3 h-3 md:w-5 md:h-5" />
                      </motion.button>
                    )}
                  </div>

                  {/* Results Section */}
                  {pdfBlob && pdfUrl && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6 md:space-y-8"
                    >
                      {/* Success Banner */}
                      <div className="p-4 md:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl md:rounded-2xl border-2 border-green-200 dark:border-green-800/50">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
                          <div className="flex items-center justify-center sm:justify-start">
                            <div className="p-2 md:p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg md:rounded-xl">
                              <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 text-center sm:text-left">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                              Pages Successfully Extracted! 🎉
                            </h3>
                            <p className="text-green-700 dark:text-green-300 font-medium text-sm md:text-base">
                              Extracted {extractedPages.length} pages from your PDF
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-0.5 md:mt-1">
                              Ready to download your new PDF document
                            </p>
                          </div>
                          <div className="flex items-center justify-center mt-2 sm:mt-0">
                            <div className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl text-sm md:text-base">
                              {(pdfBlob.size / 1024 / 1024).toFixed(2)} MB
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* PDF Preview */}
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Eye className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                            Preview Extracted PDF
                          </h4>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setExpandedPreview(!expandedPreview)}
                              className="px-3 py-1.5 text-xs md:text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-xl transition-colors"
                            >
                              {expandedPreview ? 'Minimize' : 'Expand'}
                            </button>
                            <button
                              onClick={() => setPreviewModal({url: pdfUrl, open: true})}
                              className="px-3 py-1.5 text-xs md:text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-xl transition-colors"
                            >
                              Full Screen
                            </button>
                          </div>
                        </div>

                        <div className={`border-2 border-gray-300 dark:border-gray-700 rounded-xl md:rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 transition-all duration-300 ${
                          expandedPreview ? 'h-[80vh]' : 'h-[50vh] md:h-[60vh]'
                        }`}>
                          {previewLoading ? (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="animate-pulse flex flex-col items-center gap-2">
                                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
                                <span className="text-sm text-gray-500 dark:text-gray-400">Loading preview...</span>
                              </div>
                            </div>
                          ) : renderPdfPreview()}
                        </div>

                       
                      </div>

                      {/* Download Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDownload}
                        className="w-full py-3 md:py-4 px-4 md:px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold md:font-extrabold rounded-xl md:rounded-2xl shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm md:text-lg flex items-center justify-center gap-2 md:gap-3"
                      >
                        <Download className="w-4 h-4 md:w-6 md:h-6" />
                        <span>Download Extracted PDF</span>
                        <Sparkles className="w-3 h-3 md:w-5 md:h-5" />
                      </motion.button>

                      {/* Convert Another */}
                      <div className="text-center">
                        <button
                          onClick={() => {
                            setPdfBlob(null);
                            setPdfUrl(null);
                            setPageNumbers('');
                          }}
                          className="inline-flex items-center gap-1 md:gap-2 px-4 py-2 md:px-6 md:py-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-colors text-sm md:text-base"
                        >
                          <Scissors className="w-3 h-3 md:w-4 md:h-4" />
                          Extract More Pages
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Stats Footer */}
            <div className="mt-6 md:mt-12 pt-4 md:pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6 text-center">
                <div>
                  <div className="text-lg md:text-2xl lg:text-3xl font-black text-blue-600 dark:text-blue-400 mb-1 md:mb-2">
                    {files.length > 0 ? '✓' : '—'}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                    File Uploaded
                  </div>
                </div>
                <div>
                  <div className="text-lg md:text-2xl lg:text-3xl font-black text-purple-600 dark:text-purple-400 mb-1 md:mb-2">
                    {files.length > 0 ? totalPages : '—'}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Total Pages
                  </div>
                </div>
                <div>
                  <div className="text-lg md:text-2xl lg:text-3xl font-black text-green-600 dark:text-green-400 mb-1 md:mb-2">
                    {extractedPages.length}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Pages Selected
                  </div>
                </div>
                <div>
                  <div className="text-lg md:text-2xl lg:text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-1 md:mb-2">
                    {pdfBlob ? '✓' : '—'}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Ready to Download
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}