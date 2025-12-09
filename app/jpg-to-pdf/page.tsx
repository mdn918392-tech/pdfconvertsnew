"use client";

import { useState, useCallback, useEffect, useRef } from "react";
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
  Crop as CropIcon,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Square,
  Clock,
} from "lucide-react";

import FileUploader from "../components/FileUploader";
import ProgressBar from "../components/ProgressBar";
import { imageToPdf } from "../../utils/pdfUtils";
import { downloadFile } from "../../utils/imageUtils";

import type { PaperSize, Orientation } from "../../types";

interface FileWithPreview {
  file: File;
  previewUrl?: string;
  id: string;
  rotation: number;
  scale: number;
  aspectRatio: "free" | "1:1" | "4:3" | "16:9" | "A4";
}

interface DownloadNotification {
  id: string;
  fileName: string;
  fileCount: number;
  timestamp: Date;
}

const MAX_PAGES_COUNT = 1000;

const aspectRatioOptions = {
  "free": { label: "Free", value: undefined },
  "1:1": { label: "Square (1:1)", value: 1 },
  "4:3": { label: "Standard (4:3)", value: 4/3 },
  "16:9": { label: "Widescreen (16:9)", value: 16/9 },
  "A4": { label: "A4 Paper", value: 210/297 },
};

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

// Smart filename generator
const generatePdfFilename = (
  files: FileWithPreview[], 
  paperSize: PaperSize, 
  orientation: Orientation
): string => {
  const now = new Date();
  const timestamp = now.getTime();
  const randomId = Math.random().toString(36).substring(2, 9);
  const dateStr = now.toISOString().split('T')[0];
  
  if (files.length === 1) {
    const originalName = files[0].file.name.split('.')[0];
    return `${originalName}_${paperSize}_${timestamp}_${randomId}.pdf`;
  } else {
    return `images_${files.length}_pages_${paperSize}_${timestamp}_${randomId}.pdf`;
  }
};

// Download Notification Component
const DownloadNotification = ({ id, fileName, fileCount, timestamp, onClose }: DownloadNotification & { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl shadow-lg mb-2"
    >
      <div className="flex items-start gap-3">
        <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm mb-1">
            PDF Downloaded Successfully! 🎉
          </h4>
          <p className="text-xs opacity-90 truncate mb-1">
            {fileName}
          </p>
          <p className="text-xs opacity-80 mb-2">
            {fileCount} image{fileCount !== 1 ? 's' : ''} converted to PDF
          </p>
          <div className="flex items-center gap-1 text-xs opacity-80">
            <Clock className="w-3 h-3" />
            {timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default function JpgToPdf() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [paperSize, setPaperSize] = useState<PaperSize>("A4");
  const [orientation, setOrientation] = useState<Orientation>("Portrait");
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [downloadNotifications, setDownloadNotifications] = useState<DownloadNotification[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Auto-scroll notifications
  useEffect(() => {
    if (notificationsRef.current && downloadNotifications.length > 0) {
      notificationsRef.current.scrollTop = notificationsRef.current.scrollHeight;
    }
  }, [downloadNotifications]);

  // Memory cleanup effect
  useEffect(() => {
    const currentFiles = files;
    
    return () => {
      // Cleanup preview URLs
      currentFiles.forEach((file) => {
        if (file.previewUrl) URL.revokeObjectURL(file.previewUrl);
      });
    };
  }, [files]);

  const handleRemoveFile = useCallback((fileToRemove: FileWithPreview) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileToRemove.id));
    if (fileToRemove.previewUrl) URL.revokeObjectURL(fileToRemove.previewUrl);
    setPdfBlob(null);
    setProgress(0);
  }, []);

  const handleFilesUpdate = useCallback((newFiles: File[]) => {
    // First, create file objects without previews
    const filesWithIds: FileWithPreview[] = newFiles.map(file => ({
      file: file,
      id: Math.random().toString(36).substr(2, 9),
      rotation: 0,
      scale: 1,
      aspectRatio: "free"
    }));

    let filesToSet = filesWithIds;

    if (filesWithIds.length > MAX_PAGES_COUNT) {
      alert(
        `Maximum ${MAX_PAGES_COUNT} files allowed. Only first ${MAX_PAGES_COUNT} are used.`
      );
      filesToSet = filesWithIds.slice(0, MAX_PAGES_COUNT);
    }

    // Set files first (without previews)
    setFiles(filesToSet);
    setPdfBlob(null);
    setProgress(0);

    // Then generate previews asynchronously
    setTimeout(() => {
      setFiles(prev => prev.map((file, index) => {
        if (index < filesToSet.length && !file.previewUrl) {
          try {
            const previewUrl = URL.createObjectURL(filesToSet[index].file);
            return { ...file, previewUrl };
          } catch (error) {
            console.error('Failed to create preview URL:', error);
            return file;
          }
        }
        return file;
      }));
    }, 0);
  }, []);

  const handleConvert = async () => {
    if (files.length === 0) return;

    setConverting(true);
    setPdfBlob(null);

    try {
      const filesToConvert = files.map(f => f.file);

      let cleanup: (() => void) | null = null;

      try {
        setProgress(10);
        cleanup = simulateProgress(setProgress, 10, 90, 5000);

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
        throw err;
      }
    } catch (err) {
      console.error("Conversion error:", err);
      alert("Failed to convert images to PDF. Please try again.");
      setProgress(0);
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (pdfBlob) {
      const filename = generatePdfFilename(files, paperSize, orientation);
      downloadFile(pdfBlob, filename);
      
      // Add download notification
      const notification: DownloadNotification = {
        id: Math.random().toString(36).substring(7),
        fileName: filename,
        fileCount: files.length,
        timestamp: new Date()
      };
      setDownloadNotifications(prev => [...prev, notification]);
      
      // Auto-remove notification after 5 seconds
      setTimeout(() => {
        setDownloadNotifications(prev => 
          prev.filter(n => n.id !== notification.id)
        );
      }, 5000);
    }
  };

  if (!isClient) return null;

  return (
    <>
      {/* Download Success Notifications */}
      <div className="fixed top-4 right-4 z-50 w-full max-w-xs sm:max-w-sm">
        <div 
          ref={notificationsRef}
          className="space-y-2 max-h-64 overflow-y-auto pr-2"
        >
          <AnimatePresence>
            {downloadNotifications.map((notification) => (
              <DownloadNotification
                key={notification.id}
                {...notification}
                onClose={() => setDownloadNotifications(prev => 
                  prev.filter(n => n.id !== notification.id)
                )}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

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
              onError={(e) => {
                console.error("Failed to load expanded image");
                e.currentTarget.style.display = 'none';
              }}
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

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-gray-900 py-6 sm:py-8 md:py-12">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-6 sm:mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">Back to Home</span>
            </a>

            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-lg">
                <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                JPG to PDF Converter
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2">
                Transform your images into a polished PDF document
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
              <div className="mb-6 sm:mb-8 md:mb-10">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Upload Images
                  </h2>
                </div>
                
                <FileUploader
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  multiple={true}
                  onFilesSelected={handleFilesUpdate}
                  maxSize={100}
                />

                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                    <span>JPG, PNG, WebP</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                    <span>Multiple selection</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                    <span>Easy to use</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                    <span>Secure & private</span>
                  </div>
                </div>
              </div>

              {files.length > 0 && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Selected Images ({files.length})
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        Click on image to preview
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        files.forEach(file => {
                          if (file.previewUrl) URL.revokeObjectURL(file.previewUrl);
                        });
                        setFiles([]);
                        setPdfBlob(null);
                        setProgress(0);
                      }}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1.5 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg sm:rounded-xl transition-colors"
                    >
                      <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Clear All
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
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
                          <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-gray-100 dark:bg-gray-800 aspect-square cursor-pointer"
                              onClick={() => setExpandedImage(item.previewUrl || '')}>
                            
                            {item.previewUrl ? (
                              <>
                                <img
                                  src={item.previewUrl}
                                  alt={item.file.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  onError={(e) => {
                                    console.error("Failed to load thumbnail image");
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                              </>
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center p-3">
                                <ImageIcon className="w-6 h-6 text-gray-400 mb-1.5" />
                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center truncate w-full">
                                  {item.file.name}
                                </p>
                              </div>
                            )}
                            
                            {item.previewUrl && (
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-xs truncate font-medium">{item.file.name}</p>
                                <p className="text-xs opacity-80">
                                  {(item.file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            )}
                            
                            <div className="absolute top-1.5 right-1.5 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded-full">
                              {index + 1}
                            </div>
                            
                            {item.previewUrl && (
                              <button
                                className="absolute top-1.5 right-8 bg-black/60 text-white p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedImage(item.previewUrl || '');
                                }}
                              >
                                <Maximize2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFile(item);
                            }}
                            className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600 transition-colors z-10"
                            aria-label={`Remove ${item.file.name}`}
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-850 rounded-xl sm:rounded-xl p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-4 sm:mb-6">
                      <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                        PDF Settings
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2 sm:space-y-3">
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Paper Size
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {(["A4", "Letter", "Legal", "A3"] as PaperSize[]).map((size) => (
                            <button
                              key={size}
                              onClick={() => setPaperSize(size)}
                              className={`px-3 py-2 sm:px-4 sm:py-3 rounded-lg border transition-all text-sm ${
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

                      <div className="space-y-2 sm:space-y-3">
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Orientation
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setOrientation("Portrait")}
                            className={`flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg border transition-all text-sm ${
                              orientation === "Portrait"
                                ? "bg-blue-500 text-white border-blue-500 shadow-md"
                                : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
                            }`}
                          >
                            <div className="w-3 h-4 sm:w-4 sm:h-6 border-2 border-current rounded" />
                            <span>Portrait</span>
                          </button>
                          <button
                            onClick={() => setOrientation("Landscape")}
                            className={`flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg border transition-all text-sm ${
                              orientation === "Landscape"
                                ? "bg-blue-500 text-white border-blue-500 shadow-md"
                                : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
                            }`}
                          >
                            <div className="w-4 h-3 sm:w-6 sm:h-4 border-2 border-current rounded" />
                            <span>Landscape</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <span>Total Pages:</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{files.length}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">
                        <span>Paper Size:</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{paperSize} ({orientation})</span>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {converting && (
                      <motion.div
                        key="converting"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6"
                      >
                        <ProgressBar
                          progress={progress}
                          label={
                            progress < 90
                              ? "Processing images..."
                              : "Finalizing PDF..."
                          }
                        />
                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 text-blue-600 dark:text-blue-400">
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                          <span className="text-xs sm:text-sm font-medium">
                            Creating your PDF document...
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {pdfBlob && !converting && (
                      <motion.div
                        key="download"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mt-6 space-y-4"
                      >
                        <div className="text-center p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-850 rounded-xl sm:rounded-2xl border border-green-200 dark:border-emerald-800">
                          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-500 mx-auto mb-2 sm:mb-3" />
                          <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                            Conversion Complete! 🎉
                          </h4>
                          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                            Your PDF is ready to download
                          </p>
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              File Size: {(pdfBlob.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                              Pages: {files.length}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                          <button
                            onClick={() => {
                              files.forEach(file => {
                                if (file.previewUrl) URL.revokeObjectURL(file.previewUrl);
                              });
                              setFiles([]);
                              setPdfBlob(null);
                              setProgress(0);
                            }}
                            className="py-2.5 sm:py-3 px-4 sm:px-6 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium text-sm sm:text-base"
                          >
                            Convert More Files
                          </button>
                          <button
                            onClick={handleDownload}
                            className="py-2.5 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl font-medium flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                          >
                            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                            Download PDF
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {!pdfBlob && !converting && (
                      <motion.div
                        key="convert"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mt-6"
                      >
                        <button
                          onClick={handleConvert}
                          disabled={files.length === 0}
                          className="w-full py-3 px-4 sm:py-4 sm:px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl sm:rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base md:text-lg font-semibold flex items-center justify-center gap-2 sm:gap-3"
                        >
                          <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                          Convert {files.length} Image{files.length !== 1 ? "s" : ""} to PDF
                        </button>
                        
                        <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-3">
                          Your images will be converted to a single PDF document
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {files.length === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="inline-flex p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-3 sm:mb-4">
                    <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2 text-sm sm:text-base">
                    Multiple Formats
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Supports JPG, PNG, WebP and other popular image formats
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="inline-flex p-2 sm:p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg mb-3 sm:mb-4">
                    <Maximize2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2 text-sm sm:text-base">
                    Easy Preview
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Click on any image to preview it in full size before conversion
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="inline-flex p-2 sm:p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mb-3 sm:mb-4">
                    <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2 text-sm sm:text-base">
                    Custom Settings
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Multiple paper sizes and orientations to choose from
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}