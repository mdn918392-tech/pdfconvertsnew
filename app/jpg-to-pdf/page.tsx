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
  RotateCw,
  Clock,
  FileText,
  ArrowUpDown,
  RotateCcw,
  Grid,
  List,
  AlertCircle,
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
  previewError?: boolean;
  compressedSize?: number;
}

interface DownloadNotification {
  id: string;
  fileName: string;
  fileCount: number;
  timestamp: Date;
  fileSize: number;
}

const MAX_PAGES_COUNT = 1000;
const MAX_IMAGE_SIZE_MB = 5;

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

const generatePdfFilename = (
  files: FileWithPreview[], 
  paperSize: PaperSize, 
  orientation: Orientation,
  reverseOrder: boolean
): string => {
  const now = new Date();
  const timestamp = now.getTime();
  const randomId = Math.random().toString(36).substring(2, 9);
  
  const orderSuffix = reverseOrder ? "_reverse" : "";
  
  if (files.length === 1) {
    const originalName = files[0].file.name.split('.')[0];
    return `${originalName}_${paperSize}_${timestamp}_${randomId}${orderSuffix}.pdf`;
  } else {
    return `images_${files.length}_pages_${paperSize}_${timestamp}_${randomId}${orderSuffix}.pdf`;
  }
};

// Smart compression function that works for both rotated and non-rotated images
const compressImageForPdf = async (file: File, rotation: number = 0, targetQuality: number = 0.7): Promise<File> => {
  return new Promise((resolve, reject) => {
    const fileSizeMB = file.size / (1024 * 1024);
    
    // If file is already small enough, return as is
    if (fileSizeMB <= 1) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size based on rotation
        if (rotation === 90 || rotation === 270) {
          canvas.width = img.height;
          canvas.height = img.width;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }
        
        if (ctx) {
          // If rotation needed, apply it
          if (rotation !== 0) {
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((rotation * Math.PI) / 180);
            ctx.drawImage(img, -img.width / 2, -img.height / 2);
          } else {
            // No rotation, just draw
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
          
          // Calculate optimal quality based on file size
          let quality = targetQuality;
          
          // Reduce quality for larger files
          if (fileSizeMB > 10) {
            quality = 0.5;
          } else if (fileSizeMB > 5) {
            quality = 0.6;
          } else if (fileSizeMB > 2) {
            quality = 0.7;
          }
          
          canvas.toBlob((blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              // Fallback to original file if compression fails
              resolve(file);
            }
          }, 'image/jpeg', quality);
        } else {
          reject(new Error('Failed to get canvas context'));
        }
      };
      
      img.onerror = () => reject(new Error('Image loading failed'));
    };
    
    reader.onerror = () => reject(new Error('File reading failed'));
  });
};

const DownloadNotification = ({ 
  id, 
  fileName, 
  fileCount, 
  timestamp, 
  fileSize,
  onClose 
}: DownloadNotification & { onClose: () => void }) => {
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
          <h4 className="font-bold text-base mb-1">
            PDF Downloaded Successfully! 🎉
          </h4>
          <p className="text-sm opacity-90 truncate mb-1">
            {fileName}
          </p>
          <p className="text-xs opacity-80 mb-1">
            {fileCount} image{fileCount !== 1 ? 's' : ''} converted • {(fileSize / (1024 * 1024)).toFixed(2)} MB
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

const FloatingPageCounter = ({ 
  count, 
  reverseOrder 
}: { 
  count: number, 
  reverseOrder: boolean
}) => {
  if (count === 0) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 z-40 group"
    >
      <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-4 rounded-xl shadow-lg">
        <FileText className="w-6 h-6" />
        <div className="text-center">
          <div className="text-3xl font-bold">{count}</div>
          <div className="text-sm opacity-90">Pages</div>
          {reverseOrder && (
            <div className="text-xs opacity-80 mt-1 flex items-center justify-center gap-1">
              <ArrowUpDown className="w-3 h-3" />
              Reverse Order
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute -top-14 right-0 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="font-medium">Total pages: {count}</div>
        {reverseOrder && <div className="text-xs mt-1">• Images in Reverse Order</div>}
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
  const [expandedImage, setExpandedImage] = useState<{
    url: string;
    rotation: number;
  } | null>(null);
  const [rotatedUrls, setRotatedUrls] = useState<Record<string, string>>({});
  const [downloadNotifications, setDownloadNotifications] = useState<DownloadNotification[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [reverseOrder, setReverseOrder] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [compressing, setCompressing] = useState(false);
  const [showCompressionInfo, setShowCompressionInfo] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (notificationsRef.current && downloadNotifications.length > 0) {
      notificationsRef.current.scrollTop = notificationsRef.current.scrollHeight;
    }
  }, [downloadNotifications]);

  useEffect(() => {
    const currentFiles = files;
    
    return () => {
      currentFiles.forEach((file) => {
        if (file.previewUrl) URL.revokeObjectURL(file.previewUrl);
      });
    };
  }, [files]);

  const handleRemoveFile = useCallback((fileToRemove: FileWithPreview) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileToRemove.id));
    if (fileToRemove.previewUrl) URL.revokeObjectURL(fileToRemove.previewUrl);
    if (rotatedUrls[fileToRemove.id]) {
      if (rotatedUrls[fileToRemove.id].startsWith('data:')) {
        URL.revokeObjectURL(rotatedUrls[fileToRemove.id]);
      }
      setRotatedUrls(prev => {
        const newUrls = { ...prev };
        delete newUrls[fileToRemove.id];
        return newUrls;
      });
    }
    setPdfBlob(null);
    setProgress(0);
  }, [rotatedUrls]);

  const handleRotateFile = useCallback((id: string, degrees: number) => {
    const file = files.find(f => f.id === id);
    if (!file || !file.previewUrl) return;

    const newRotation = (file.rotation + degrees) % 360;
    
    setFiles(prev => prev.map(f => 
      f.id === id ? { ...f, rotation: newRotation } : f
    ));
    
    setPdfBlob(null);
    
    // Clear rotated URL for this file since rotation changed
    if (rotatedUrls[id]) {
      if (rotatedUrls[id].startsWith('data:')) {
        URL.revokeObjectURL(rotatedUrls[id]);
      }
      setRotatedUrls(prev => {
        const newUrls = { ...prev };
        delete newUrls[id];
        return newUrls;
      });
    }
  }, [files, rotatedUrls]);

  const handleRotateAll = useCallback((degrees: number) => {
    setFiles(prev => prev.map(file => ({
      ...file,
      rotation: (file.rotation + degrees) % 360
    })));
    
    setPdfBlob(null);
    
    // Clear all rotated URLs
    Object.values(rotatedUrls).forEach(url => {
      if (url.startsWith('data:')) {
        URL.revokeObjectURL(url);
      }
    });
    setRotatedUrls({});
  }, [rotatedUrls]);

  const handleFilesUpdate = useCallback(async (newFiles: File[]) => {
    if (newFiles.length === 0) return;

    setCompressing(true);
    
    try {
      const filesWithIds: FileWithPreview[] = newFiles.map(file => ({
        file: file,
        id: Math.random().toString(36).substr(2, 9),
        rotation: 0,
        scale: 1,
        aspectRatio: "free",
        previewError: false
      }));

      let filesToSet = filesWithIds;

      if (filesWithIds.length > MAX_PAGES_COUNT) {
        alert(
          `Maximum ${MAX_PAGES_COUNT} files allowed. Only first ${MAX_PAGES_COUNT} are used.`
        );
        filesToSet = filesWithIds.slice(0, MAX_PAGES_COUNT);
      }

      setFiles(prev => [...prev, ...filesToSet]);
      setPdfBlob(null);
      setProgress(0);

      setFiles(prev => prev.map((file, index) => {
        const fileToSet = filesToSet[index];
        if (fileToSet && !file.previewUrl) {
          try {
            const previewUrl = URL.createObjectURL(fileToSet.file);
            return { ...fileToSet, previewUrl, previewError: false };
          } catch (error) {
            console.error('Failed to create preview URL:', error);
            return { ...fileToSet, previewError: true };
          }
        }
        return file;
      }));

    } catch (error) {
      console.error('File processing error:', error);
      alert('Error processing files. Please try again.');
    } finally {
      setCompressing(false);
    }
  }, []);

  const handleImageError = useCallback((id: string) => {
    setFiles(prev => prev.map(file => {
      if (file.id === id) {
        return { ...file, previewError: true };
      }
      return file;
    }));
  }, []);

  const handleConvert = async () => {
    if (files.length === 0) return;

    setConverting(true);
    setPdfBlob(null);
    setShowCompressionInfo(true);

    try {
      // Prepare files based on reverse order setting
      let filesToConvert;
      if (reverseOrder) {
        filesToConvert = [...files].reverse();
      } else {
        filesToConvert = [...files];
      }

      // First, compress all images (with rotation applied)
      const compressedFiles = await Promise.all(
        filesToConvert.map(async (fileWithPreview) => {
          try {
            // Compress image with rotation applied
            const compressedFile = await compressImageForPdf(
              fileWithPreview.file, 
              fileWithPreview.rotation,
              0.7 // Target quality for PDF
            );
            
            // Calculate compression ratio
            const originalSize = fileWithPreview.file.size;
            const compressedSize = compressedFile.size;
            const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
            
            console.log(`File: ${fileWithPreview.file.name}`);
            console.log(`Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
            console.log(`Compressed: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`);
            console.log(`Reduced by: ${compressionRatio}%`);
            
            return compressedFile;
          } catch (error) {
            console.error('Failed to compress image:', error);
            // If compression fails, use original file
            return fileWithPreview.file;
          }
        })
      );

      let cleanup: (() => void) | null = null;

      try {
        setProgress(10);
        cleanup = simulateProgress(setProgress, 10, 90, 5000);

        const blob = await imageToPdf(
          compressedFiles, 
          paperSize,
          orientation
        );

        if (cleanup) cleanup();
        setProgress(100);

        setTimeout(() => {
          setPdfBlob(blob);
          setConverting(false);
          
          // Hide compression info after 3 seconds
          setTimeout(() => {
            setShowCompressionInfo(false);
          }, 3000);
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
      setShowCompressionInfo(false);
    }
  };

  const handleDownload = () => {
    if (pdfBlob) {
      const filename = generatePdfFilename(files, paperSize, orientation, reverseOrder);
      downloadFile(pdfBlob, filename);
      
      const notification: DownloadNotification = {
        id: Math.random().toString(36).substring(7),
        fileName: filename,
        fileCount: files.length,
        timestamp: new Date(),
        fileSize: pdfBlob.size
      };
      setDownloadNotifications(prev => [...prev, notification]);
      
      setTimeout(() => {
        setDownloadNotifications(prev => 
          prev.filter(n => n.id !== notification.id)
        );
      }, 5000);
    }
  };

  const toggleReverseOrder = () => {
    setReverseOrder(!reverseOrder);
    setPdfBlob(null);
  };

  const displayFiles = reverseOrder ? [...files].reverse() : files;

  const getPageNumber = (displayIndex: number) => {
    return displayIndex + 1;
  };

  // Get image URL for display (with rotation applied)
  const getImageUrl = (file: FileWithPreview) => {
    // If we have a rotated URL, use it
    if (rotatedUrls[file.id]) {
      return rotatedUrls[file.id];
    }
    // Otherwise use original preview URL
    return file.previewUrl;
  };

  const handleExpandImage = async (file: FileWithPreview) => {
    if (!file.previewUrl || file.previewError) return;
    
    try {
      // If rotation is 0, use original URL
      if (file.rotation === 0) {
        setExpandedImage({
          url: file.previewUrl,
          rotation: 0
        });
        return;
      }
      
      // Generate rotated URL if not already cached
      if (!rotatedUrls[file.id]) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
          if (file.rotation === 90 || file.rotation === 270) {
            canvas.width = img.height;
            canvas.height = img.width;
          } else {
            canvas.width = img.width;
            canvas.height = img.height;
          }
          
          if (ctx) {
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((file.rotation * Math.PI) / 180);
            ctx.drawImage(img, -img.width / 2, -img.height / 2);
            
            const rotatedUrl = canvas.toDataURL('image/jpeg', 0.8);
            setRotatedUrls(prev => ({
              ...prev,
              [file.id]: rotatedUrl
            }));
            setExpandedImage({
              url: rotatedUrl,
              rotation: file.rotation
            });
          }
        };
        
        img.src = file.previewUrl;
      } else {
        setExpandedImage({
          url: rotatedUrls[file.id],
          rotation: file.rotation
        });
      }
    } catch (error) {
      console.error('Failed to prepare expanded image:', error);
      // Fallback to original URL
      setExpandedImage({
        url: file.previewUrl,
        rotation: 0
      });
    }
  };

  if (!isClient) return null;

  return (
    <>
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

      <FloatingPageCounter 
        count={files.length} 
        reverseOrder={reverseOrder}
      />

      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setExpandedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-full max-h-[90vh]"
            >
              <img
                src={expandedImage.url}
                alt="Expanded preview"
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                style={{
                  transform: expandedImage.rotation !== 0 
                    ? `rotate(${expandedImage.rotation}deg)` 
                    : 'none'
                }}
                onError={() => setExpandedImage(null)}
              />
            </motion.div>
            <button
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setExpandedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-gray-900 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-base">Back to Home</span>
            </a>

            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                <ImageIcon className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                JPG to PDF Converter
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Transform your images into a polished PDF document
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl p-6 md:p-8 mb-8">
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <Upload className="w-6 h-6 text-blue-500" />
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
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
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>JPG, PNG, WebP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Multiple selection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Auto compression</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Secure & private</span>
                  </div>
                </div>

                {compressing && (
                  <div className="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Processing images...</span>
                  </div>
                )}
              </div>

              {files.length > 0 && (
                <div className="space-y-8">
                  {/* Compression Info Banner */}
                  {showCompressionInfo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4"
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-1">
                            Smart Compression Active
                          </h4>
                          <p className="text-sm text-blue-700 dark:text-blue-400">
                            All images are being compressed before PDF creation. 
                            {files.length > 0 && ` Large images will be reduced in size.`}
                          </p>
                          <div className="mt-2 text-xs text-blue-600 dark:text-blue-500">
                            <span className="font-medium">Note:</span> Compression applies to both rotated and non-rotated images
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Selected Images ({files.length})
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Click on image to preview • Click rotate to adjust orientation
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                        <button
                          onClick={() => setViewMode('grid')}
                          className={`px-3 py-1.5 rounded-md transition-colors ${
                            viewMode === 'grid'
                              ? "bg-white dark:bg-gray-700 shadow-sm"
                              : "hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          <Grid className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setViewMode('list')}
                          className={`px-3 py-1.5 rounded-md transition-colors ${
                            viewMode === 'list'
                              ? "bg-white dark:bg-gray-700 shadow-sm"
                              : "hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          <List className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleRotateAll(-90)}
                          className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          title="Rotate all counter-clockwise"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRotateAll(90)}
                          className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          title="Rotate all clockwise"
                        >
                          <RotateCw className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button
                        onClick={toggleReverseOrder}
                        className={`px-4 py-2 flex items-center gap-2 rounded-xl transition-all text-sm ${
                          reverseOrder
                            ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        <ArrowUpDown className="w-4 h-4" />
                        {reverseOrder ? "Normal Order" : "Reverse Order"}
                      </button>
                      
                      <button
                        onClick={() => {
                          files.forEach(file => {
                            if (file.previewUrl) URL.revokeObjectURL(file.previewUrl);
                          });
                          Object.values(rotatedUrls).forEach(url => {
                            if (url.startsWith('data:')) {
                              URL.revokeObjectURL(url);
                            }
                          });
                          setFiles([]);
                          setRotatedUrls({});
                          setPdfBlob(null);
                          setProgress(0);
                          setReverseOrder(false);
                          setShowCompressionInfo(false);
                        }}
                        className="px-4 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Clear All
                      </button>
                    </div>
                  </div>

                  <div className={`${
                    viewMode === 'grid' 
                      ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'
                      : 'space-y-3'
                  }`}>
                    <AnimatePresence initial={false}>
                      {displayFiles.map((item, displayIndex) => {
                        const pageNumber = getPageNumber(displayIndex);
                        const imageUrl = getImageUrl(item);
                        
                        // Create unique key for each displayed item
                        const uniqueKey = `${item.id}-${reverseOrder ? 'reverse' : 'normal'}-${displayIndex}`;
                        
                        return (
                          <motion.div
                            key={uniqueKey} // Use unique key instead of item.id
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            layout
                            className={`group relative ${
                              viewMode === 'list' 
                                ? 'flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl'
                                : ''
                            }`}
                          >
                            <div 
                              className={`relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 cursor-pointer ${
                                viewMode === 'list' 
                                  ? 'w-20 h-20 flex-shrink-0'
                                  : 'aspect-square'
                              }`}
                              onClick={() => handleExpandImage(item)}
                            >
                              {imageUrl && !item.previewError ? (
                                <>
                                  <img
                                    src={imageUrl}
                                    alt={item.file.name}
                                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${
                                      item.rotation !== 0 && !rotatedUrls[item.id] ? 'transform' : ''
                                    }`}
                                    style={
                                      item.rotation !== 0 && !rotatedUrls[item.id] 
                                        ? { transform: `rotate(${item.rotation}deg)` }
                                        : undefined
                                    }
                                    onError={() => handleImageError(item.id)}
                                    loading="lazy"
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                </>
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center p-3">
                                  <div className="relative mb-2">
                                    <ImageIcon className="w-8 h-8 text-gray-400" />
                                    {item.previewError && (
                                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                                        <X className="w-2 h-2 text-white" />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              <div 
                                className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {pageNumber}
                              </div>
                              
                              {item.rotation !== 0 && (
                                <div 
                                  className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <RotateCw className="w-2 h-2" />
                                  {item.rotation}°
                                </div>
                              )}
                            </div>
                            
                            {viewMode === 'list' && (
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">
                                  {item.file.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {(item.file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRotateFile(item.id, -90);
                                    }}
                                    className="p-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                    title="Rotate counter-clockwise"
                                  >
                                    <RotateCcw className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRotateFile(item.id, 90);
                                    }}
                                    className="p-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                    title="Rotate clockwise"
                                  >
                                    <RotateCw className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveFile(item);
                                    }}
                                    className="p-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/30 rounded-lg transition-colors ml-auto"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            )}
                            
                            {viewMode === 'grid' && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveFile(item);
                                  }}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors z-10"
                                  aria-label={`Remove ${item.file.name}`}
                                >
                                  <X className="w-3 h-3" />
                                </button>
                                
                                <div className="absolute bottom-2 left-2 flex gap-1">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRotateFile(item.id, -90);
                                    }}
                                    className="p-1.5 bg-black/70 text-white hover:bg-black/90 rounded-lg transition-colors"
                                    title="Rotate counter-clockwise"
                                  >
                                    <RotateCcw className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRotateFile(item.id, 90);
                                    }}
                                    className="p-1.5 bg-black/70 text-white hover:bg-black/90 rounded-lg transition-colors"
                                    title="Rotate clockwise"
                                  >
                                    <RotateCw className="w-3 h-3" />
                                  </button>
                                </div>
                                
                                {imageUrl && !item.previewError && (
                                  <button
                                    className="absolute bottom-2 right-2 p-1.5 bg-black/70 text-white hover:bg-black/90 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleExpandImage(item);
                                    }}
                                  >
                                    <Maximize2 className="w-3 h-3" />
                                  </button>
                                )}
                              </>
                            )}
                            
                            {reverseOrder && viewMode === 'grid' && (
                              <div 
                                className="absolute -top-2 -left-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ArrowUpDown className="w-2 h-2" />
                                R
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-850 rounded-2xl p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Settings className="w-6 h-6 text-blue-500" />
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        PDF Settings
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Paper Size
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {(["A4", "Letter", "Legal", "A3"] as PaperSize[]).map((size) => (
                            <button
                              key={size}
                              onClick={() => setPaperSize(size)}
                              className={`px-4 py-3 rounded-lg border transition-all text-base ${
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

                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Orientation
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => setOrientation("Portrait")}
                            className={`flex items-center justify-center gap-3 px-4 py-3 rounded-lg border transition-all text-base ${
                              orientation === "Portrait"
                                ? "bg-blue-500 text-white border-blue-500 shadow-md"
                                : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
                            }`}
                          >
                            <div className="w-4 h-5 border-2 border-current rounded" />
                            <span>Portrait</span>
                          </button>
                          <button
                            onClick={() => setOrientation("Landscape")}
                            className={`flex items-center justify-center gap-3 px-4 py-3 rounded-lg border transition-all text-base ${
                              orientation === "Landscape"
                                ? "bg-blue-500 text-white border-blue-500 shadow-md"
                                : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
                            }`}
                          >
                            <div className="w-5 h-4 border-2 border-current rounded" />
                            <span>Landscape</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-3">
                            <ArrowUpDown className="w-5 h-5" />
                            Reverse Page Order
                          </label>
                          <button
                            onClick={toggleReverseOrder}
                            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                              reverseOrder ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                                reverseOrder ? 'translate-x-8' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {reverseOrder 
                            ? "Images will be arranged in reverse order (last image first) with normal page numbers (1, 2, 3...)"
                            : "Images will be arranged in normal order (first image first) with page numbers 1, 2, 3..."}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Total Pages:</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200 ml-2">{files.length}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Paper Size:</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200 ml-2">{paperSize} ({orientation})</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Page Order:</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200 ml-2">
                            {reverseOrder ? "Reverse Order" : "Normal Order"}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Total Size:</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200 ml-2">
                            {(files.reduce((acc, file) => acc + file.file.size, 0) / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div>
                      </div>
                      
                      {/* Compression Info */}
                      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                            Smart Compression
                          </span>
                        </div>
                        <p className="text-xs text-blue-600 dark:text-blue-400">
                          All images will be compressed during PDF creation to reduce file size.
                          Large images ({">"}5MB) will be optimized automatically.
                        </p>
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
                            progress < 30
                              ? "Preparing images..."
                              : progress < 60
                              ? "Compressing images..."
                              : progress < 90
                              ? "Creating PDF..."
                              : "Finalizing..."
                          }
                        />
                        <div className="flex items-center justify-center gap-3 mt-4 text-blue-600 dark:text-blue-400">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span className="text-base font-medium">
                            {progress < 50 
                              ? "Optimizing image sizes for PDF..." 
                              : "Creating your PDF document..."}
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
                        className="mt-6 space-y-6"
                      >
                        <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-850 rounded-2xl border border-green-200 dark:border-emerald-800">
                          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                          <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            Conversion Complete! 🎉
                          </h4>
                          <p className="text-base text-gray-600 dark:text-gray-400 mb-4">
                            Your PDF is ready to download
                            {reverseOrder && (
                              <span className="text-purple-600 dark:text-purple-400">
                                {" "}(Reverse Image Order)
                              </span>
                            )}
                          </p>
                          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              File Size: {(pdfBlob.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                              Pages: {files.length}
                            </span>
                            {reverseOrder && (
                              <span className="text-purple-600 dark:text-purple-400 font-semibold">
                                Reverse Image Order
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <button
                            onClick={() => {
                              files.forEach(file => {
                                if (file.previewUrl) URL.revokeObjectURL(file.previewUrl);
                              });
                              Object.values(rotatedUrls).forEach(url => {
                                if (url.startsWith('data:')) {
                                  URL.revokeObjectURL(url);
                                }
                              });
                              setFiles([]);
                              setRotatedUrls({});
                              setPdfBlob(null);
                              setProgress(0);
                              setReverseOrder(false);
                              setShowCompressionInfo(false);
                            }}
                            className="py-3 px-6 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium text-base"
                          >
                            Convert More Files
                          </button>
                          <button
                            onClick={handleDownload}
                            className="py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl font-medium flex items-center justify-center gap-3 text-base"
                          >
                            <Download className="w-5 h-5" />
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
                          className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold flex items-center justify-center gap-3"
                        >
                          <ImageIcon className="w-6 h-6" />
                          {reverseOrder 
                            ? `Convert ${files.length} Image${files.length !== 1 ? "s" : ""} with Reverse Order` 
                            : `Convert ${files.length} Image${files.length !== 1 ? "s" : ""} to PDF`}
                        </button>
                        
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                          {reverseOrder 
                            ? "Images will be arranged in reverse order with normal page numbers" 
                            : "Your images will be converted to a single PDF document with smart compression"}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {files.length === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <div className="inline-flex p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl mb-4">
                    <ImageIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                    Smart Compression
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Automatically compresses all images (rotated or not) to reduce PDF size
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <div className="inline-flex p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl mb-4">
                    <Maximize2 className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                    Full Screen Preview
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    View rotated images in full screen with rotation applied
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <div className="inline-flex p-3 bg-green-100 dark:bg-green-900/30 rounded-xl mb-4">
                    <Settings className="w-7 h-7 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                    Size Optimization
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Reduces file size while maintaining quality for both mobile and desktop
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