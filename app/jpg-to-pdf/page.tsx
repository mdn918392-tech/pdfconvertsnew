"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Download,
  ArrowLeft,
  X,
  Image as ImageIcon,
  Upload,
  CheckCircle,
  Loader2,
  Maximize2,
  Settings,
  Check,
} from "lucide-react";

import FileUploader from "../components/FileUploader";
import ProgressBar from "../components/ProgressBar";
import { imageToPdf } from "../../utils/pdfUtils";
import { downloadFile } from "../../utils/imageUtils";

// ✅ REMOVE the local type definitions and import from the correct location
// The imageToPdf function imports from '../types', so we need to do the same
import type { PaperSize, Orientation } from "../../types"; // Adjust path based on your project structure

// ✅ FIX 1: Interface is fine as is, but we will ensure previewUrl is set on file addition
interface FileWithPreview {
  file: File; // Holds the native File object
  previewUrl?: string;
  id: string;
}

const MAX_PAGES_COUNT = 1000;

// Progress animation
const simulateProgress = (
  callback: (p: number) => void,
  initial: number,
  final: number,
  durationMs: number
) => {
  const startTime = Date.now();
  const interval = 100;

  const progressId = setInterval(() => {
    const elapsed = Date.now() - startTime;
    let newProgress =
      initial + ((final - initial) * elapsed) / durationMs;

    if (newProgress >= final) {
      newProgress = final;
      clearInterval(progressId);
    }
    callback(Math.floor(newProgress));
  }, interval);

  return () => clearInterval(progressId);
};

export default function JpgToPdf() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [paperSize, setPaperSize] = useState<PaperSize>("A4");
  const [orientation, setOrientation] = useState<Orientation>("Portrait");
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);

  /* --------------------- File Preview Cleanup --------------------- */
  // The original useEffect tried to mutate state outside of a setter, causing the bug.
  // We keep this useEffect only for cleaning up object URLs when the component unmounts.
  useEffect(() => {
    return () => {
      // Clean up object URLs when the component unmounts
      files.forEach((item) => {
        if (item.previewUrl) {
          URL.revokeObjectURL(item.previewUrl);
        }
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only on mount/unmount

  /* -------------------- Remove Selected File --------------------- */
  const handleRemoveFile = useCallback((fileToRemove: FileWithPreview) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileToRemove.id));
    // Clean up the object URL immediately upon removal
    if (fileToRemove.previewUrl)
      URL.revokeObjectURL(fileToRemove.previewUrl);
    
    setPdfBlob(null);
    setProgress(0);
    setShowDownloadSuccess(false);
  }, []);

  /* ------------------------ Add Files (FIXED) ---------------------------- */
  const handleFilesUpdate = useCallback(
    (newFiles: File[]) => {
      // ✅ FIX 3: Create the preview URL immediately when mapping the files.
      const filesWithIds: FileWithPreview[] = newFiles.map(file => ({
        file: file, // Store the original File object
        // Create the preview URL here using URL.createObjectURL
        previewUrl: file.type && file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        id: Math.random().toString(36).substr(2, 9)
      }));

      let filesToSet = filesWithIds;

      if (filesWithIds.length > MAX_PAGES_COUNT) {
        alert(
          `Maximum ${MAX_PAGES_COUNT} files allowed. Only first ${MAX_PAGES_COUNT} are used.`
        );
        filesToSet = filesWithIds.slice(0, MAX_PAGES_COUNT);
      }

      // Setting the state with files that already have preview URLs triggers the correct re-render.
      setFiles(filesToSet);
      setPdfBlob(null);
      setProgress(0);
      setShowDownloadSuccess(false);
    },
    []
  );

  /* ---------------------- Convert Images ------------------------- */
  const handleConvert = async () => {
    if (files.length === 0) return;

    setConverting(true);
    setPdfBlob(null);
    setShowDownloadSuccess(false);

    // ✅ FIX 4: Map back to an array of native File objects
    const filesToConvert = files.map((f) => f.file);

    let cleanup: (() => void) | null = null;

    try {
      setProgress(10);
      cleanup = simulateProgress(setProgress, 10, 90, 5000);

      // Pass the array of native File objects to imageToPdf
      const blob = await imageToPdf(
        filesToConvert, 
        paperSize,
        orientation
      );

      if (cleanup) cleanup();
      setProgress(100);

      setTimeout(() => {
        setPdfBlob(blob);
        setConverting(false);
      }, 500);
    } catch (err) {
      if (cleanup) cleanup();
      console.error("Conversion error:", err);
      alert("Failed to convert images to PDF.");
      setProgress(0);
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (pdfBlob) {
      downloadFile(pdfBlob, "converted.pdf");
      
      // Show success message
      setShowDownloadSuccess(true);
      
      // Auto-hide the message after 3 seconds
      setTimeout(() => {
        setShowDownloadSuccess(false);
      }, 3000);
    }
  };

  /* ---------------------------- UI ------------------------------ */
  return (
    <>
      {/* Download Success Toast */}
      <AnimatePresence>
        {showDownloadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Download Complete! ✅</p>
                <p className="text-sm opacity-90">PDF saved to your device</p>
              </div>
              <button
                onClick={() => setShowDownloadSuccess(false)}
                className="ml-4 text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setExpandedImage(null)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={expandedImage}
              alt="Expanded preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setExpandedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-gray-900 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back Button */}
            <a
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </a>

            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                JPG to PDF Converter
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Transform your images into a polished PDF document with customizable settings
              </p>
            </div>

            {/* Main Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl p-6 md:p-8 mb-8">
              {/* Upload Section */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Upload className="w-5 h-5 text-blue-500" />
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Upload Images
                  </h2>
                </div>
                
                <FileUploader
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  multiple={true}
                  onFilesSelected={handleFilesUpdate}
                  maxSize={100}
                />

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>JPG, PNG, WebP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Up to 100MB each</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Multiple selection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Secure & private</span>
                  </div>
                </div>
              </div>

              {/* File List & Preview Section */}
              {files.length > 0 && (
                <div className="space-y-8">
                  {/* Files Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Selected Images ({files.length})
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Drag to reorder or click to preview
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        files.forEach(file => {
                          if (file.previewUrl) {
                            URL.revokeObjectURL(file.previewUrl);
                          }
                        });
                        setFiles([]);
                        setPdfBlob(null);
                        setProgress(0);
                        setShowDownloadSuccess(false);
                      }}
                      className="px-4 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Clear All
                    </button>
                  </div>

                  {/* Image Grid Preview */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <AnimatePresence initial={false}>
                      {files.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          layout
                          className="group relative"
                        >
                          <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 aspect-square cursor-pointer"
                              onClick={() => item.previewUrl && setExpandedImage(item.previewUrl)}>
                            {item.previewUrl ? (
                              <>
                                <img
                                  // This `src` now immediately points to the URL created in handleFilesUpdate
                                  src={item.previewUrl} 
                                  alt={item.file.name} 
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  onError={(e) => {
                                    // Fallback if image fails to load
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                              </>
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                                <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center truncate w-full">
                                  {item.file.name} 
                                </p>
                              </div>
                            )}
                            
                            {/* Image Info Overlay */}
                            {item.previewUrl && (
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-xs truncate font-medium">{item.file.name}</p> 
                                <p className="text-xs opacity-80">
                                  {(item.file.size / 1024 / 1024).toFixed(2)} MB 
                                </p>
                              </div>
                            )}
                            
                            {/* Page Number */}
                            <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                              {index + 1}
                            </div>
                            
                            {/* Expand Button */}
                            {item.previewUrl && (
                              <button
                                className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedImage(item.previewUrl!);
                                }}
                              >
                                <Maximize2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          
                          {/* Remove Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFile(item);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors z-10"
                            aria-label={`Remove ${item.file.name}`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Settings Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Settings className="w-5 h-5 text-blue-500" />
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        PDF Settings
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Paper Size */}
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Paper Size
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {(["A4", "Letter", "Legal", "A3"] as PaperSize[]).map((size) => (
                            <button
                              key={size}
                              onClick={() => setPaperSize(size)}
                              className={`px-4 py-3 rounded-lg border transition-all ${
                                paperSize === size
                                  ? "bg-blue-500 text-white border-blue-500 shadow-md"
                                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Orientation */}
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Orientation
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setOrientation("Portrait")}
                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                              orientation === "Portrait"
                                ? "bg-blue-500 text-white border-blue-500 shadow-md"
                                : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
                            }`}
                          >
                            <div className="w-4 h-6 border-2 border-current rounded" />
                            <span>Portrait</span>
                          </button>
                          <button
                            onClick={() => setOrientation("Landscape")}
                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                              orientation === "Landscape"
                                ? "bg-blue-500 text-white border-blue-500 shadow-md"
                                : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
                            }`}
                          >
                            <div className="w-6 h-4 border-2 border-current rounded" />
                            <span>Landscape</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Additional Settings */}
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>Total Pages:</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{files.length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                        <span>Paper Size:</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{paperSize} ({orientation})</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <AnimatePresence mode="wait">
                    {converting && (
                      <motion.div
                        key="converting"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-8"
                      >
                        <ProgressBar
                          progress={progress}
                          label={
                            progress < 90
                              ? "Processing images..."
                              : "Finalizing PDF..."
                          }
                        />
                        <div className="flex items-center justify-center gap-2 mt-4 text-blue-600 dark:text-blue-400">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span className="text-sm font-medium">
                            Creating your PDF document...
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* Download Button */}
                    {pdfBlob && !converting && (
                      <motion.div
                        key="download"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mt-8 space-y-4"
                      >
                        <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-850 rounded-2xl border border-green-200 dark:border-emerald-800">
                          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            Conversion Complete! 🎉
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Your PDF is ready to download
                          </p>
                          <div className="flex items-center justify-center gap-4 text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              File Size: {(pdfBlob.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                              Pages: {files.length}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <button
                            onClick={() => {
                              files.forEach(file => {
                                if (file.previewUrl) {
                                  URL.revokeObjectURL(file.previewUrl);
                                }
                              });
                              setFiles([]);
                              setPdfBlob(null);
                              setProgress(0);
                              setShowDownloadSuccess(false);
                            }}
                            className="py-3 px-6 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                          >
                            Convert More Files
                          </button>
                          <button
                            onClick={handleDownload}
                            className="py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl font-medium flex items-center justify-center gap-3"
                          >
                            <Download className="w-5 h-5" />
                            Download PDF
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Convert Button */}
                    {!pdfBlob && !converting && (
                      <motion.div
                        key="convert"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mt-8"
                      >
                        <button
                          onClick={handleConvert}
                          disabled={files.length === 0}
                          className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold flex items-center justify-center gap-3"
                        >
                          <ImageIcon className="w-6 h-6" />
                          Convert {files.length} Image{files.length !== 1 ? "s" : ""} to PDF
                        </button>
                        
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                          Your images will be converted to a single PDF document
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Features Footer */}
            {files.length === 0 && (
              <div className="text-center text-gray-600 dark:text-gray-400 text-sm mt-12">
                <p>📁 Supports JPG, PNG, WebP formats</p>
                <p>⚡ Fast conversion with no quality loss</p>
                <p>🔒 Your files are processed securely and never stored</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}