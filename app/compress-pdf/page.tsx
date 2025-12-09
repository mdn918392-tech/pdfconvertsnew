"use client"; 
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowLeft, FileText, Zap, Shield, CheckCircle, X, Sparkles, FileDown, FileUp, Percent, Gauge } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import ProgressBar from '../components/ProgressBar';
import { compressPdf } from '../../utils/pdfUtils';
import { downloadFile } from '../../utils/imageUtils';

// Smart filename generator
const generateCompressedFilename = (originalName: string): string => {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
  
  // Clean original filename
  const cleanName = originalName
    .replace(/\.pdf$/i, '') // Remove .pdf extension
    .replace(/[^a-zA-Z0-9\s-_]/g, '')
    .substring(0, 30)
    .trim();
  
  return `${cleanName}_compressed_${dateStr}_${timeStr}.pdf`;
};

export default function CompressPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [compressionStats, setCompressionStats] = useState<{ original: number; compressed: number } | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [showUploadInfo, setShowUploadInfo] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (downloadSuccess) {
      const timer = setTimeout(() => {
        setDownloadSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [downloadSuccess]);

  const handleConvert = async () => {
    if (files.length === 0) return;

    setConverting(true);
    setProgress(0);
    setPdfBlob(null);
    setCompressionStats(null);
    setDownloadSuccess(null);
    setShowUploadInfo(false);

    try {
      setProgress(10);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setProgress(30);
      const blob = await compressPdf(files[0]);
      
      setProgress(80);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProgress(100);
      setPdfBlob(blob);
      setCompressionStats({
        original: files[0].size,
        compressed: blob.size,
      });
      
      setDownloadSuccess(`✓ Successfully compressed PDF! (Saved ${getCompressionPercent()}%)`);
    } catch (error) {
      console.error('Compression error:', error);
      setDownloadSuccess("✗ Failed to compress PDF. Please try again.");
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (pdfBlob) {
      setDownloading(true);
      try {
        const filename = generateCompressedFilename(files[0].name);
        downloadFile(pdfBlob, filename);
        
        setDownloadSuccess(`✓ Downloaded: ${filename}`);
        
        // Reset after a delay
        setTimeout(() => {
          setDownloading(false);
        }, 1000);
      } catch (error) {
        console.error('Download error:', error);
        setDownloadSuccess("✗ Failed to download PDF");
        setDownloading(false);
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const getCompressionPercent = () => {
    if (!compressionStats) return '0';
    return ((1 - compressionStats.compressed / compressionStats.original) * 100).toFixed(1);
  };

  const handleFileSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setPdfBlob(null);
    setCompressionStats(null);
    setDownloadSuccess(null);
    setShowUploadInfo(false);
  };

  const handleReset = () => {
    setFiles([]);
    setPdfBlob(null);
    setCompressionStats(null);
    setDownloadSuccess(null);
    setShowUploadInfo(true);
  };

  const getFileIconColor = () => {
    if (pdfBlob) return 'from-green-500 to-emerald-600';
    if (converting) return 'from-blue-500 to-cyan-600';
    if (files.length > 0) return 'from-orange-500 to-pink-600';
    return 'from-gray-500 to-gray-600';
  };

  return (
    <>
      {/* Success Message Overlay */}
      <AnimatePresence>
        {downloadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
          >
            <div className={`p-4 rounded-xl shadow-2xl backdrop-blur-sm ${
              downloadSuccess.startsWith("✓") 
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white" 
                : "bg-gradient-to-r from-red-500 to-orange-600 text-white"
            }`}>
              <div className="flex items-center justify-center gap-3">
                {downloadSuccess.startsWith("✓") ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <X className="w-5 h-5" />
                )}
                <span className="font-medium text-sm">{downloadSuccess}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20 py-6 md:py-12 px-3 md:px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header Section */}
            <div className="mb-6 md:mb-10">
              <a
                href="/"
                className="inline-flex items-center gap-2 md:gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all font-medium mb-4 md:mb-6 text-sm md:text-base"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Tools</span>
              </a>

              <div className="text-center mb-6 md:mb-8">
                <motion.div 
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl md:rounded-3xl mb-3 md:mb-4 shadow-xl"
                >
                  <FileText className="w-7 h-7 md:w-9 md:h-9 text-white" />
                </motion.div>
                
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-2 md:mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  PDF Compressor
                </h1>
                
                <p className="text-sm md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed px-2">
                  Reduce PDF file size while maintaining document quality
                  <span className="block text-blue-600 dark:text-blue-400 font-medium mt-1 text-xs md:text-sm">
                    Secure processing • Smart filenames • Fast compression
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
                  className="mb-6 md:mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4"
                >
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-3 md:p-4 rounded-xl border-2 border-blue-200 dark:border-blue-800/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg">
                        <Zap className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">Fast Compression</h3>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      Reduce PDF size in seconds
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-3 md:p-4 rounded-xl border-2 border-purple-200 dark:border-purple-800/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                        <FileDown className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">Smart Names</h3>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      Automatic descriptive filenames
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-3 md:p-4 rounded-xl border-2 border-green-200 dark:border-green-800/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                        <Shield className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">Secure</h3>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      Processed locally in your browser
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-xl md:shadow-2xl p-4 md:p-6 mb-6 md:mb-8">
              {/* Upload Section */}
              <div className="mb-6 md:mb-8">
                <div className="flex items-center gap-2 md:gap-3 mb-4">
                  <div className={`p-1.5 md:p-2 bg-gradient-to-r ${getFileIconColor()} rounded-xl`}>
                    <FileUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                      Upload PDF
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Select PDF file to compress
                    </p>
                  </div>
                </div>

                <FileUploader
                  accept="application/pdf"
                  multiple={false}
                  onFilesSelected={handleFileSelect}
                />

                {files.length > 0 && (
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-sm">
                      <FileText className="w-3 h-3 md:w-4 md:h-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-blue-700 dark:text-blue-300">
                        {files[0].name} • {formatFileSize(files[0].size)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Will be saved as: {files[0].name.replace('.pdf', '')}_compressed_YYYY-MM-DD.pdf
                    </p>
                  </div>
                )}
              </div>

              {/* Content Area */}
              {files.length > 0 && (
                <div className="space-y-6 md:space-y-8">
                  {/* Action Buttons */}
                  <div className="space-y-3 md:space-y-4">
                    {converting && (
                      <div className="space-y-3 md:space-y-4">
                        <ProgressBar 
                          progress={progress} 
                          label={`Compressing ${files[0].name}...`} 
                        />
                        <div className="flex items-center justify-center gap-1 md:gap-2 text-blue-600 dark:text-blue-400">
                          <Sparkles className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
                          <span className="text-xs md:text-sm font-medium">
                            Optimizing PDF file...
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
                        className="w-full py-3 md:py-4 px-4 md:px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl md:rounded-2xl shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm md:text-lg flex items-center justify-center gap-2 md:gap-3"
                      >
                        <FileDown className="w-4 h-4 md:w-5 md:h-5" />
                        <span>Compress PDF</span>
                        <Zap className="w-3 h-3 md:w-4 md:h-4" />
                      </motion.button>
                    )}
                  </div>

                  {/* Results Section */}
                  {pdfBlob && compressionStats && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 md:space-y-6"
                    >
                      {/* Success Banner */}
                      <div className="p-4 md:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl md:rounded-2xl border-2 border-green-200 dark:border-green-800/50">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
                          <div className="flex items-center justify-center sm:justify-start">
                            <div className="p-2 md:p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                              <CheckCircle className="w-6 h-6 md:w-7 md:h-7 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 text-center sm:text-left">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                              Compression Complete! 🎉
                            </h3>
                            <p className="text-green-700 dark:text-green-300 font-medium text-sm md:text-base">
                              Saved {getCompressionPercent()}% • New file ready
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-0.5 md:mt-1">
                              Download compressed file with smart filename
                            </p>
                          </div>
                          <div className="flex items-center justify-center mt-2 sm:mt-0">
                            <div className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl text-sm">
                              ✓ Ready
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stats Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-4 md:p-5 rounded-xl border-2 border-blue-200 dark:border-blue-800/50">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg">
                              <FileUp className="w-3 h-3 md:w-4 md:h-4 text-white" />
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">Original Size</h4>
                          </div>
                          <div className="text-center">
                            <div className="text-xl md:text-2xl font-black text-blue-600 dark:text-blue-400 mb-1 md:mb-2">
                              {formatFileSize(compressionStats.original)}
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              Before compression
                            </p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-4 md:p-5 rounded-xl border-2 border-purple-200 dark:border-purple-800/50">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                              <Percent className="w-3 h-3 md:w-4 md:h-4 text-white" />
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">Savings</h4>
                          </div>
                          <div className="text-center">
                            <div className="text-xl md:text-2xl font-black text-purple-600 dark:text-purple-400 mb-1 md:mb-2">
                              {getCompressionPercent()}%
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              Size reduction
                            </p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-4 md:p-5 rounded-xl border-2 border-green-200 dark:border-green-800/50">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                              <FileDown className="w-3 h-3 md:w-4 md:h-4 text-white" />
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">Compressed Size</h4>
                          </div>
                          <div className="text-center">
                            <div className="text-xl md:text-2xl font-black text-green-600 dark:text-green-400 mb-1 md:mb-2">
                              {formatFileSize(compressionStats.compressed)}
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              After compression
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Filename Preview */}
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl border-2 border-blue-200 dark:border-blue-800/30">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <h4 className="font-semibold text-gray-900 dark:text-white">Download Filename:</h4>
                        </div>
                        <div className="text-sm md:text-base text-blue-700 dark:text-blue-300 bg-white dark:bg-gray-800 p-3 rounded-lg font-mono break-all">
                          {generateCompressedFilename(files[0].name)}
                        </div>
                      </div>

                      {/* Download Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDownload}
                        disabled={downloading}
                        className="w-full py-3 md:py-4 px-4 md:px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold md:font-extrabold rounded-xl md:rounded-2xl shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm md:text-lg flex items-center justify-center gap-2 md:gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {downloading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Downloading...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 md:w-5 md:h-5" />
                            <span>Download Compressed PDF</span>
                            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                          </>
                        )}
                      </motion.button>

                      {/* Convert Another */}
                      <div className="text-center">
                        <button
                          onClick={handleReset}
                          className="inline-flex items-center gap-1 md:gap-2 px-4 py-2 md:px-5 md:py-2.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-colors text-sm"
                        >
                          <FileText className="w-3 h-3 md:w-4 md:h-4" />
                          Compress Another PDF
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Stats Footer */}
            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-center">
                <div>
                  <div className="text-lg md:text-xl lg:text-2xl font-black text-blue-600 dark:text-blue-400 mb-1">
                    {files.length}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                    PDF Uploaded
                  </div>
                </div>
                <div>
                  <div className="text-lg md:text-xl lg:text-2xl font-black text-purple-600 dark:text-purple-400 mb-1">
                    {files.length > 0 ? formatFileSize(files[0].size) : '0 MB'}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                    File Size
                  </div>
                </div>
                <div>
                  <div className="text-lg md:text-xl lg:text-2xl font-black text-green-600 dark:text-green-400 mb-1">
                    {pdfBlob ? '✓' : '—'}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Compressed
                  </div>
                </div>
                <div>
                  <div className="text-lg md:text-xl lg:text-2xl font-black text-orange-600 dark:text-orange-400 mb-1">
                    {pdfBlob ? `${getCompressionPercent()}%` : '0%'}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Savings
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