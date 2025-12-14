"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, ArrowLeft, FileText, Scissors, Layers, 
  Shield, Zap, CheckCircle, Sparkles, Eye, 
  Maximize2, X, Check, AlertCircle, Clock
} from 'lucide-react';
import FileUploader from '../components/FileUploader';
import ProgressBar from '../components/ProgressBar';
import { splitPdf } from '../../utils/pdfUtils';
import { downloadFile } from '../../utils/imageUtils';

// Interfaces
interface PreviewModalState {
  url: string | null;
  page: number | null;
  blob: Blob | null;
  fileName: string;
}

interface DownloadNotification {
  id: string;
  fileName: string;
  page: number;
  timestamp: Date;
}

export default function SplitPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfBlobs, setPdfBlobs] = useState<Blob[]>([]);
  const [pdfUrls, setPdfUrls] = useState<string[]>([]);
  const [showUploadInfo, setShowUploadInfo] = useState(true);
  const [previewModal, setPreviewModal] = useState<PreviewModalState>({ 
    url: null, 
    page: null, 
    blob: null,
    fileName: '' 
  });
  const [isExpandedView, setIsExpandedView] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [downloadNotifications, setDownloadNotifications] = useState<DownloadNotification[]>([]);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const [downloadingAll, setDownloadingAll] = useState(false);

  // Set client flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-scroll notifications
  useEffect(() => {
    if (notificationsRef.current && downloadNotifications.length > 0) {
      notificationsRef.current.scrollTop = notificationsRef.current.scrollHeight;
    }
  }, [downloadNotifications]);

  // Generate unique filename
  const generateUniqueFileName = (baseName: string, pageNumber: number) => {
    const timestamp = new Date().getTime();
    const randomId = Math.random().toString(36).substring(2, 9);
    const cleanBaseName = baseName.replace(/\.[^/.]+$/, "");
    return `${cleanBaseName}_page${pageNumber}_${timestamp}_${randomId}.pdf`;
  };

  // Effect to revoke Object URLs
  useEffect(() => {
    if (pdfBlobs.length > 0) {
      const urls = pdfBlobs.map(blob => URL.createObjectURL(blob));
      setPdfUrls(urls);

      return () => {
        urls.forEach(url => URL.revokeObjectURL(url));
      };
    }
  }, [pdfBlobs]);

  // Get total pages when file is uploaded
  useEffect(() => {
    if (files.length > 0) {
      const getPageCount = async () => {
        try {
          const { PDFDocument } = await import('pdf-lib');
          const arrayBuffer = await files[0].arrayBuffer();
          const pdf = await PDFDocument.load(arrayBuffer);
          setTotalPages(pdf.getPageCount());
        } catch (error) {
          console.error("Error getting page count:", error);
        }
      };
      getPageCount();
    }
  }, [files]);

  const handleConvert = async () => {
    if (files.length === 0) return;

    setConverting(true);
    setProgress(0);
    setPdfBlobs([]);
    setPdfUrls([]);
    setShowUploadInfo(false);

    try {
      setProgress(20);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setProgress(50);
      const blobs = await splitPdf(files[0]);
      
      setProgress(80);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setProgress(100);
      setPdfBlobs(blobs);
    } catch (error) {
      console.error('Split error:', error);
      alert('Failed to split PDF. Please try again.');
    } finally {
      setConverting(false);
    }
  };

  const handleSingleDownload = (blob: Blob, pageNumber: number) => {
    const fileName = generateUniqueFileName(files[0].name, pageNumber);
    downloadFile(blob, fileName);
    
    // Add notification
    const notification: DownloadNotification = {
      id: Math.random().toString(36).substring(7),
      fileName: fileName,
      page: pageNumber,
      timestamp: new Date()
    };
    setDownloadNotifications(prev => [...prev, notification]);
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setDownloadNotifications(prev => 
        prev.filter(n => n.id !== notification.id)
      );
    }, 5000);
  };

  const handleDownloadAll = async () => {
    if (pdfBlobs.length === 0 || downloadingAll) return;
    
    setDownloadingAll(true);
    
    try {
      // एक-एक करके सभी files download करें
      for (let i = 0; i < pdfBlobs.length; i++) {
        const blob = pdfBlobs[i];
        const pageNumber = i + 1;
        const fileName = generateUniqueFileName(files[0].name, pageNumber);
        
        // थोड़ा delay देकर browser को block होने से बचाएं
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        downloadFile(blob, fileName);
        
        // Progress update
        setProgress(Math.round((i + 1) / pdfBlobs.length * 100));
        
        // Add notification
        const notification: DownloadNotification = {
          id: Math.random().toString(36).substring(7),
          fileName: fileName,
          page: pageNumber,
          timestamp: new Date()
        };
        setDownloadNotifications(prev => [...prev, notification]);
        
        // Auto-remove notification
        setTimeout(() => {
          setDownloadNotifications(prev => 
            prev.filter(n => n.id !== notification.id)
          );
        }, 5000);
      }
      
      // Success notification
      const successNotification: DownloadNotification = {
        id: 'success-all',
        fileName: `All ${pdfBlobs.length} pages downloaded`,
        page: 0,
        timestamp: new Date()
      };
      setDownloadNotifications(prev => [...prev, successNotification]);
      
      setTimeout(() => {
        setDownloadNotifications(prev => 
          prev.filter(n => n.id !== successNotification.id)
        );
      }, 3000);
      
    } catch (error) {
      console.error('Download error:', error);
      alert('Some files failed to download. Please try again.');
    } finally {
      setDownloadingAll(false);
      setProgress(0);
    }
  };

  const handlePreviewClick = (url: string, page: number, blob: Blob) => {
    const fileName = generateUniqueFileName(files[0].name, page);
    setPreviewModal({ url, page, blob, fileName });
  };

  const handleDownloadFromModal = () => {
    if (previewModal.blob && previewModal.page) {
      handleSingleDownload(previewModal.blob, previewModal.page);
      setPreviewModal({ url: null, page: null, blob: null, fileName: '' });
    }
  };

  const totalSize = files[0] ? (files[0].size / 1024 / 1024).toFixed(2) : 0;

  return (
    <>
      {/* Download Notifications */}
      <div className="fixed top-4 right-4 z-40 w-full max-w-xs sm:max-w-sm">
        <div 
          ref={notificationsRef}
          className="space-y-2 max-h-64 overflow-y-auto pr-2"
        >
          {downloadNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl shadow-lg"
            >
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm mb-1">
                    {notification.page > 0 ? `Page ${notification.page} Downloaded` : notification.fileName}
                  </h4>
                  <p className="text-xs opacity-90 truncate">
                    {notification.fileName}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs opacity-80">
                    <Clock className="w-3 h-3" />
                    {notification.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
                <button
                  onClick={() => setDownloadNotifications(prev => 
                    prev.filter(n => n.id !== notification.id)
                  )}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Preview Modal - FIXED FOR MOBILE */}
      <AnimatePresence>
        {previewModal.url && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setPreviewModal({ url: null, page: null, blob: null, fileName: '' })}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                  <div className="min-w-0">
                    <h3 className="text-white font-bold text-sm sm:text-base truncate">
                      Page {previewModal.page} Preview
                    </h3>
                    <p className="text-xs text-white/80 truncate">
                      {previewModal.fileName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={handleDownloadFromModal}
                    className="p-1.5 sm:p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    title="Download this page"
                  >
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </button>
                  <button
                    onClick={() => setPreviewModal({ url: null, page: null, blob: null, fileName: '' })}
                    className="p-1.5 sm:p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* PDF Preview - FIXED FOR MOBILE */}
              <div className="h-[calc(90vh-80px)] p-2 sm:p-4">
                <div className="w-full h-full bg-white rounded-lg overflow-hidden flex items-center justify-center">
                  {isClient && previewModal.url && (
                    <div className="w-full h-full">
                      {/* Mobile friendly PDF preview */}
                      <object
                        data={`${previewModal.url}#view=fitH`}
                        type="application/pdf"
                        className="w-full h-full"
                      >
                        <div className="p-4 text-center">
                          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">PDF preview not available on this device</p>
                          <p className="text-sm text-gray-500 mt-2">
                            Click the download button above to save the PDF
                          </p>
                        </div>
                      </object>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 py-4 sm:py-8 md:py-12">
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header Section */}
            <div className="mb-6 sm:mb-8 md:mb-12">
              <a
                href="/"
                className="inline-flex items-center gap-2 sm:gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all font-medium group mb-4 sm:mb-6"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm sm:text-base">Back to Tools</span>
              </a>

              <div className="text-center mb-6 sm:mb-8">
                <motion.div 
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-2xl"
                >
                  <Scissors className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </motion.div>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-3 sm:mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  PDF Splitter
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
                  Split PDF documents into individual pages with one click
                  <span className="block text-purple-600 dark:text-purple-400 font-medium mt-1 text-sm sm:text-base">
                    Each page becomes a separate PDF file
                  </span>
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <AnimatePresence>
              {showUploadInfo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8 sm:mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                >
                  {[
                    {
                      icon: Scissors,
                      title: "One-Click Split",
                      desc: "Split entire PDF documents into individual pages instantly",
                      gradient: "from-purple-500 to-pink-600",
                      bg: "from-purple-50 to-pink-50",
                      border: "border-purple-200"
                    },
                    {
                      icon: Layers,
                      title: "Page Preview",
                      desc: "Preview each page before downloading individually or in bulk",
                      gradient: "from-blue-500 to-cyan-600",
                      bg: "from-blue-50 to-cyan-50",
                      border: "border-blue-200"
                    },
                    {
                      icon: Shield,
                      title: "Secure Processing",
                      desc: "All processing happens locally in your browser",
                      gradient: "from-green-500 to-emerald-600",
                      bg: "from-green-50 to-emerald-50",
                      border: "border-green-200"
                    }
                  ].map((feature, index) => (
                    <div 
                      key={index}
                      className={`bg-gradient-to-br ${feature.bg} dark:from-gray-800 dark:to-gray-900 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 ${feature.border} dark:border-gray-700`}
                    >
                      <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <div className={`p-2 bg-gradient-to-r ${feature.gradient} rounded-lg sm:rounded-xl`}>
                          <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        {feature.desc}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl lg:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-lg sm:shadow-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
              {/* Upload Section */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg sm:rounded-xl">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      Upload PDF File
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                      Select a PDF file to split into individual pages
                    </p>
                  </div>
                </div>

                <FileUploader
                  accept="application/pdf"
                  multiple={false}
                  onFilesSelected={setFiles}
                />

                {files.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                  >
                    <div className="inline-flex flex-col sm:flex-row sm:items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg sm:rounded-full">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                        <span className="font-medium text-purple-700 dark:text-purple-300 text-sm truncate max-w-[200px] sm:max-w-none">
                          {files[0].name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400">
                        <span>• {totalSize} MB</span>
                        <span>• {totalPages} pages</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Content Area */}
              {files.length > 0 && (
                <div className="space-y-6 sm:space-y-8">
                  {/* Action Buttons */}
                  <div className="space-y-4">
                    {converting && (
                      <div className="space-y-4">
                        <ProgressBar 
                          progress={progress} 
                          label="Splitting PDF into individual pages..." 
                        />
                        <div className="flex items-center justify-center gap-2 text-purple-600 dark:text-purple-400">
                          <Sparkles className="w-4 h-4 animate-pulse" />
                          <span className="text-sm font-medium">
                            Processing {totalPages} pages...
                          </span>
                        </div>
                      </div>
                    )}

                    {pdfBlobs.length === 0 && !converting && (
                      <div className="space-y-4">
                        <motion.button
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleConvert}
                          className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl transition-all text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3"
                        >
                          <Scissors className="w-5 h-5 sm:w-6 sm:h-6" />
                          Split PDF into {totalPages} Pages
                          <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.button>
                        
                        <div className="text-center">
                          <button
                            onClick={() => setIsExpandedView(!isExpandedView)}
                            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium hover:bg-purple-50 dark:hover:bg-purple-950/30 rounded-lg sm:rounded-xl transition-colors"
                          >
                            <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            {isExpandedView ? 'Collapse View' : 'Expand View'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Results Section */}
                  {pdfBlobs.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6 sm:space-y-8"
                    >
                      {/* Success Banner */}
                      <div className="p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl sm:rounded-2xl border-2 border-green-200 dark:border-green-800/50">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                          <div className="flex items-center justify-center sm:justify-start">
                            <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900/50 rounded-lg sm:rounded-xl">
                              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
                            </div>
                          </div>
                          <div className="flex-1 text-center sm:text-left">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
                              PDF Successfully Split! 🎉
                            </h3>
                            <p className="text-green-700 dark:text-green-300 font-medium text-sm sm:text-base">
                              Split into {pdfBlobs.length} individual pages
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1">
                              Each page is now available as a separate PDF file
                            </p>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg sm:rounded-xl text-sm sm:text-base">
                              {pdfBlobs.length} Pages
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Page Previews Header */}
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 sm:gap-3">
                            <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                            Individual Pages ({pdfBlobs.length})
                          </h3>
                          <div className="flex items-center gap-2 sm:gap-3">
                            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                              Tap to preview
                            </span>
                            <button
                              onClick={() => setIsExpandedView(!isExpandedView)}
                              className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-lg sm:rounded-xl transition-colors flex items-center gap-1.5 sm:gap-2"
                            >
                              <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                              {isExpandedView ? 'Collapse' : 'Expand'}
                            </button>
                          </div>
                        </div>

                        {/* Page Previews Grid */}
                        <div className={`
                          p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-purple-50 
                          dark:from-gray-800 dark:to-purple-950/20 rounded-xl sm:rounded-2xl 
                          border-2 border-gray-200 dark:border-gray-700 
                          ${isExpandedView 
                            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto' 
                            : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4'
                          }`}
                        >
                          {pdfUrls.map((url, index) => {
                            const pageBlob = pdfBlobs[index];
                            const pageNumber = index + 1;
                            
                            return (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="relative group"
                              >
                                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg sm:rounded-xl p-2 sm:p-3 border-2 border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                                  {/* Page Number Badge */}
                                  <div className="absolute top-1.5 left-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full z-10">
                                    #{pageNumber}
                                  </div>
                                  
                                  {/* Preview Container - MOBILE FRIENDLY */}
                                  <div 
                                    className="relative w-full h-24 sm:h-28 md:h-32 mb-2 sm:mb-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer"
                                    onClick={() => handlePreviewClick(url, pageNumber, pageBlob)}
                                  >
                                    <div className="w-full h-full flex items-center justify-center p-1 sm:p-2">
                                      <div className="w-full h-full bg-white rounded flex items-center justify-center">
                                        {isClient && (
                                          <div className="w-full h-full">
                                            <object
                                              data={`${url}#view=fitH`}
                                              type="application/pdf"
                                              className="w-full h-full"
                                            >
                                              <div className="flex flex-col items-center justify-center h-full p-2">
                                                <FileText className="w-8 h-8 text-gray-400 mb-1" />
                                                <span className="text-xs text-gray-500">Page {pageNumber}</span>
                                              </div>
                                            </object>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                      <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                                        <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                        <span className="text-xs text-white font-medium">Preview</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Page Info */}
                                  <div className="text-center px-1">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm mb-0.5 truncate">
                                      Page {pageNumber}
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      Individual PDF
                                    </p>
                                  </div>
                                  
                                  {/* Download Button */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSingleDownload(pageBlob, pageNumber);
                                    }}
                                    className="absolute bottom-1.5 right-1.5 p-1 sm:p-1.5 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors opacity-0 group-hover:opacity-100"
                                    title={`Download Page ${pageNumber}`}
                                  >
                                    <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                  </button>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Download Buttons */}
                      <div className="space-y-4 sm:space-y-6">
                        {downloadingAll ? (
                          <div className="space-y-4">
                            <ProgressBar 
                              progress={progress} 
                              label={`Downloading pages... (${progress}%)`} 
                            />
                            <div className="text-center text-sm text-green-600 dark:text-green-400">
                              <Sparkles className="w-4 h-4 animate-pulse inline mr-2" />
                              Downloading all {pdfBlobs.length} pages...
                            </div>
                          </div>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleDownloadAll}
                            className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl transition-all text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3"
                          >
                            <Download className="w-5 h-5 sm:w-6 sm:h-6" />
                            Download All {pdfBlobs.length} Pages
                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                          </motion.button>
                        )}

                        {/* Convert Another */}
                        <div className="text-center">
                          <button
                            onClick={() => {
                              setFiles([]);
                              setPdfBlobs([]);
                              setPdfUrls([]);
                              setTotalPages(0);
                              setIsExpandedView(false);
                              setShowUploadInfo(true);
                              setDownloadingAll(false);
                              setProgress(0);
                            }}
                            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium hover:bg-purple-50 dark:hover:bg-purple-950/30 rounded-lg sm:rounded-xl transition-colors"
                          >
                            <Scissors className="w-4 h-4" />
                            Split Another PDF
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Stats Footer */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 text-center">
                {[
                  { value: files.length > 0 ? '✓' : '—', label: 'File Uploaded', color: 'text-purple-600' },
                  { value: pdfBlobs.length || totalPages, label: pdfBlobs.length > 0 ? 'Pages Split' : 'Total Pages', color: 'text-pink-600' },
                  { value: totalSize, label: 'File Size (MB)', color: 'text-blue-600' },
                  { value: pdfBlobs.length > 0 ? '✓' : '—', label: 'Ready to Download', color: 'text-green-600' }
                ].map((stat, index) => (
                  <div key={index}>
                    <div className={`text-xl sm:text-2xl md:text-3xl font-black ${stat.color} dark:${stat.color.replace('600', '400')} mb-1 sm:mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}