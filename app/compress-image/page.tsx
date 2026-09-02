"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import FAQSchema from "./FAQSchema";
import { faqData } from "./faqData";

import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  ArrowLeft,
  XCircle,
  CheckCircle,
  Image as ImageIcon,
  Sparkles,
  Zap,
  Shield,
  Palette,
  Upload,
  Layers,
  Eye,
  Clock,
  Grid,
  ArrowRight,
  Check,
  X,
  Plus,
  FolderArchive,
  FileQuestion,
  Cpu,
  Globe,
  Lock,
  HelpCircle,
} from "lucide-react";
import FileUploader from "../components/FileUploader";
import ProgressBar from "../components/ProgressBar";
import {
  convertPngToJpg,
  downloadFile,
  downloadAsZip,
  compressImage,
} from "../../utils/imageUtils";
import BreadcrumbSchema from "./BreadcrumbSchema";
import ArticleSchema from "./ArticleSchema";
import HowToSchema from "./HowToSchema";

const tool = {
  id: "compress-image",
  name: "Compress Image",
  description: "Reduce JPG/PNG file size",
  category: "image",
  icon: "📉",
  color: "from-blue-500 to-cyan-500",
  href: "/compress-image",
  path: "/tools/compress-image",
};

// Define Tool type
type Tool = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  href: string;
  path: string;
};

// Explore All Tools Data
const exploreTools: Tool[] = [
  {
    id: "split-pdf",
    name: "Split PDF",
    description: "Split PDF into separate pages",
    category: "pdf",
    icon: "✂️",
    color: "from-orange-500 to-red-500",
    href: "/split-pdf",
    path: "/tools/split-pdf",
  },
  {
    id: "rotate-pdf",
    name: "Rotate PDF",
    description: "Rotate PDF pages",
    category: "pdf",
    icon: "🔄",
    color: "from-teal-500 to-cyan-500",
    href: "/rotate-pdf",
    path: "/tools/rotate-pdf",
  },
  {
    id: "jpg-to-pdf",
    name: "JPG to PDF",
    description: "Convert JPG images to PDF documents",
    category: "pdf",
    icon: "🖼️",
    color: "from-green-500 to-emerald-500",
    href: "/jpg-to-pdf",
    path: "/tools/jpg-to-pdf",
  },
  {
    id: "png-to-jpg",
    name: "PNG to JPG",
    description: "Convert PNG images to JPG format",
    category: "image",
    icon: "🔄",
    color: "from-emerald-500 to-green-500",
    href: "/png-to-jpg",
    path: "/tools/png-to-jpg",
  },
  {
    id: "pdf-to-jpg",
    name: "PDF to JPG",
    description: "Convert PDF pages to JPG images",
    category: "pdf",
    icon: "🖼️",
    color: "from-purple-500 to-pink-500",
    href: "/pdf-to-jpg",
    path: "/tools/pdf-to-jpg",
  },
  {
    id: "extract-pages",
    name: "Extract Pages",
    description: "Extract specific pages from PDF",
    category: "pdf",
    icon: "📑",
    color: "from-indigo-500 to-blue-500",
    href: "/extract-pages",
    path: "/tools/extract-pages",
  },
  {
    id: "compress-image",
    name: "Compress Image",
    description: "Reduce JPG/PNG file size",
    category: "image",
    icon: "📉",
    color: "from-blue-500 to-cyan-500",
    href: "/compress-image",
    path: "/tools/compress-image",
  },
  {
    id: "merge-pdf",
    name: "Merge PDF",
    description: "Combine multiple PDF files into one",
    category: "pdf",
    icon: "🔗",
    color: "from-violet-500 to-purple-500",
    href: "/merge-pdf",
    path: "/tools/merge-pdf",
  },
  {
    id: "remove-pages",
    name: "Remove Pages",
    description: "Delete specific pages from PDF",
    category: "pdf",
    icon: "🗑️",
    color: "from-rose-500 to-pink-500",
    href: "/remove-pages",
    path: "/tools/remove-pages",
  },
];

// --- Helper Functions ---
const createObjectURL = (fileOrBlob: Blob | File) =>
  URL.createObjectURL(fileOrBlob);
const revokeObjectURL = (url: string) => URL.revokeObjectURL(url);

// --- Component Interface ---
interface ConvertedFile {
  blob: Blob;
  name: string;
  originalFile: File;
  timestamp: number;
  originalSize: number;
  compressedSize: number;
}

interface DownloadNotification {
  id: string;
  fileName: string;
  fileCount: number;
  timestamp: Date;
  isZip?: boolean;
}

// --- Image Preview Component ---
const ImagePreview = ({
  file,
  onRemove,
  status,
  isDownloadable = false,
  filename = "image.jpg",
  index,
  originalSize,
  compressedSize,
}: {
  file: Blob | File;
  onRemove?: () => void;
  status: string;
  isDownloadable?: boolean;
  filename: string;
  index: number;
  originalSize?: number;
  compressedSize?: number;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const objectUrlRef = useRef<string | null>(null);

  // Create object URL with proper cleanup
  useEffect(() => {
    if (!file) {
      setError(true);
      setLoading(false);
      return;
    }

    let url: string | null = null;
    let img: HTMLImageElement | null = null;
    let isMounted = true;

    const loadImage = async () => {
      try {
        // Check if file is valid
        if (file.size === 0) {
          if (isMounted) {
            setError(true);
            setLoading(false);
          }
          return;
        }

        url = URL.createObjectURL(file);
        objectUrlRef.current = url;
        
        if (isMounted) {
          setPreviewUrl(url);
        }

        img = new Image();
        
        const imageLoadPromise = new Promise((resolve, reject) => {
          if (!img) return reject(new Error("Image not created"));
          
          img.onload = () => resolve(true);
          img.onerror = () => reject(new Error("Failed to load image"));
        });

        img.src = url;

        // Set timeout for mobile devices (longer timeout)
        const timeoutPromise = new Promise((_, reject) => {
          const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          ) || window.innerWidth < 768;
          
          // Mobile devices need more time
          const timeoutDuration = isMobile ? 10000 : 5000;
          setTimeout(() => reject(new Error("Image load timeout")), timeoutDuration);
        });

        await Promise.race([imageLoadPromise, timeoutPromise]);

        if (isMounted) {
          setLoading(false);
          setError(false);
        }
      } catch (err) {
        if (isMounted) {
          console.warn("Failed to load image preview:", filename, err);
          setError(true);
          setLoading(false);
        }
      }
    };

    loadImage();

    // Cleanup function
    return () => {
      isMounted = false;
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
      if (img) {
        img.onload = null;
        img.onerror = null;
        img.src = "";
      }
    };
  }, [file, filename]);

  const statusColor =
    status && status.includes("Compressed")
      ? "text-green-600 dark:text-green-400"
      : "text-blue-600 dark:text-blue-400";

  const handleIndividualDownload = () => {
    if (file && file.size > 0) {
      downloadFile(file as Blob, filename);
    }
  };

  // Calculate compression percentage
  const compressionPercent = originalSize && compressedSize
    ? ((1 - compressedSize / originalSize) * 100).toFixed(1)
    : null;

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const handleImageError = () => {
    setError(true);
  };

  // 🔥 FIX: Prevent default drag behavior on the entire image container
  const handleTouchMove = (e: React.TouchEvent) => {
    // Allow scrolling within the container but prevent dragging the image away
    e.preventDefault();
  };

  return (
    <>
      <AnimatePresence>
        {previewOpen && previewUrl && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setPreviewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreviewOpen(false)}
                className="absolute -top-12 right-0 z-50 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>

              <div className="max-w-4xl max-h-[90vh]">
                {error ? (
                  <div className="bg-gray-800 rounded-xl p-8 flex flex-col items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-white text-lg">Preview not available</p>
                    <p className="text-gray-400 text-sm mt-2">
                      This image cannot be displayed
                    </p>
                  </div>
                ) : (
                  <img
                    src={previewUrl}
                    alt={filename}
                    className="rounded-xl shadow-2xl max-w-full max-h-[80vh] object-contain"
                    onError={handleImageError}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ y: -5, scale: 1.02 }}
        className="relative group"
        onTouchMove={handleTouchMove}
      >
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
          {/* Image Number Badge */}
          <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
            #{index + 1}
          </div>

          {/* Image Container */}
          <div
            className="relative w-full h-36 mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden cursor-pointer group/image"
            onClick={() => previewUrl && !error && setPreviewOpen(true)}
            onDragStart={(e) => e.preventDefault()}
          >
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : error || !previewUrl ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
                <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Preview not available
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {formatFileSize(file.size || 0)}
                </span>
              </div>
            ) : (
              <>
                <img
                  src={previewUrl}
                  alt={filename}
                  className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-500"
                  onError={handleImageError}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white" />
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/image:translate-x-full transition-transform duration-1000" />
              </>
            )}
          </div>

          {/* File Info */}
          <div className="space-y-2">
            <p
              className="text-sm font-semibold truncate text-gray-900 dark:text-white"
              title={filename}
            >
              {filename}
            </p>

            <div className="flex items-center justify-between">
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor} bg-opacity-10 ${
                  status.includes("Compressed") ? "bg-green-500" : "bg-blue-500"
                }`}
              >
                {status}
              </span>

              {/* File Size Info */}
              {originalSize && compressedSize ? (
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(compressedSize)}
                  </span>
                  {compressionPercent && (
                    <span className="text-xs text-green-600 dark:text-green-400 font-bold">
                      {compressionPercent}% smaller
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatFileSize(file.size)}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons - Always visible on ALL devices */}
          <div className="absolute top-3 right-3 flex gap-2">
            {/* Remove Button (For Input Files) */}
            {onRemove && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                className="p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                aria-label={`Remove ${filename}`}
              >
                <XCircle className="w-4 h-4" />
              </motion.button>
            )}

            {/* Download Button (For Output Files) */}
            {isDownloadable && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleIndividualDownload();
                }}
                className="p-1.5 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
                title={`Download ${filename}`}
                disabled={!file || file.size === 0}
              >
                <Download className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

// --- Download Notification Component ---
const DownloadNotification = ({
  id,
  fileName,
  fileCount,
  timestamp,
  isZip = false,
  onClose,
}: DownloadNotification & { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className={`bg-gradient-to-r ${
        isZip
          ? "from-purple-500 to-indigo-600"
          : "from-green-500 to-emerald-600"
      } text-white p-4 rounded-xl shadow-lg mb-2`}
    >
      <div className="flex items-start gap-3">
        {isZip ? (
          <FolderArchive className="w-5 h-5 mt-0.5 flex-shrink-0" />
        ) : (
          <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm mb-1">
            {isZip ? (
              <>
                {fileCount > 1
                  ? `${fileCount} Files Downloaded as ZIP! 📦`
                  : "File Downloaded as ZIP! 📦"}
              </>
            ) : (
              <>
                {fileCount > 1
                  ? `${fileCount} Files Downloaded! 🎉`
                  : "File Downloaded Successfully! 🎉"}
              </>
            )}
          </h4>
          {fileCount === 1 && !isZip && (
            <p className="text-xs opacity-90 truncate mb-1">{fileName}</p>
          )}
          <p className="text-xs opacity-80 mb-2">
            {isZip
              ? `All ${fileCount} files compressed into ZIP archive`
              : fileCount > 1
              ? `${fileCount} images compressed`
              : "Image successfully compressed"}
          </p>
          <div className="flex items-center gap-1 text-xs opacity-80">
            <Clock className="w-3 h-3" />
            {timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
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

// --- Main Component ---
export default function CompressImage() {
  const [files, setFiles] = useState<File[]>([]);
  const [compressing, setCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressedBlobs, setCompressedBlobs] = useState<ConvertedFile[]>([]);
  const [showFeatures, setShowFeatures] = useState(true);
  const [downloadNotifications, setDownloadNotifications] = useState<
    DownloadNotification[]
  >([]);
  const [creatingZip, setCreatingZip] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const [compressionQuality, setCompressionQuality] = useState<number>(80);
  const [isMobile, setIsMobile] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [processingFiles, setProcessingFiles] = useState<string[]>([]);

  // Detect device type (only for UI hints, no limits)
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate unique filename
  const generateUniqueFileName = (baseName: string, index: number) => {
    const timestamp = new Date().getTime();
    const randomId = Math.random().toString(36).substring(2, 9);
    const extension = baseName.toLowerCase().endsWith('.png') ? 'png' : 'jpg';
    const cleanBaseName = baseName
      .replace(/\.(png|jpg|jpeg)$/i, "")
      .replace(/\.[^/.]+$/, "");
    const sequence = (index + 1).toString().padStart(3, "0");
    return `${cleanBaseName}_compressed_${sequence}_${timestamp}_${randomId}.jpg`;
  };

  // Auto-scroll notifications
  useEffect(() => {
    if (notificationsRef.current && downloadNotifications.length > 0) {
      notificationsRef.current.scrollTop =
        notificationsRef.current.scrollHeight;
    }
  }, [downloadNotifications]);

  // Helper function to compress a single image with retry
  const compressSingleImage = async (
    file: File,
    quality: number,
    retryCount = 0
  ): Promise<Blob> => {
    const maxRetries = 2;
    
    try {
      let compressedBlob: Blob;
      
      // Check if file is valid
      if (file.size === 0) {
        throw new Error("File is empty or corrupted");
      }

      // For PNG files, convert to JPG first
      if (file.type === 'image/png') {
        const jpgBlob = await convertPngToJpg(file, 0.85);
        compressedBlob = await compressImage(jpgBlob, quality);
      } else if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
        compressedBlob = await compressImage(file, quality);
      } else {
        // For other image types, try direct compression
        compressedBlob = await compressImage(file, quality);
      }

      // Validate compressed blob
      if (!compressedBlob || compressedBlob.size === 0) {
        throw new Error("Compression resulted in empty file");
      }

      // If compressed file is larger than original (rare), use original
      if (compressedBlob.size > file.size && file.size > 0) {
        // Try with higher quality
        if (quality < 90) {
          return await compressSingleImage(file, Math.min(quality + 10, 95), retryCount);
        }
        // Return original file if compression didn't help
        return file.slice(0, file.size, file.type);
      }

      return compressedBlob;
      
    } catch (error) {
      // Retry with lower quality if compression failed
      if (retryCount < maxRetries) {
        const newQuality = Math.max(quality - 20, 30);
        console.log(`Retry ${retryCount + 1} for ${file.name} with quality ${newQuality}`);
        return await compressSingleImage(file, newQuality, retryCount + 1);
      }
      
      // If all retries fail, return original file as fallback
      console.warn(`All compression retries failed for ${file.name}, using original`);
      return file.slice(0, file.size, file.type);
    }
  };

  const handleCompress = async () => {
    if (files.length === 0) return;

    setCompressing(true);
    setProgress(0);
    setCompressedBlobs([]);
    setShowFeatures(false);
    setErrorMessage("");
    setProcessingFiles(files.map(f => f.name));

    try {
      const blobs: ConvertedFile[] = [];
      let successCount = 0;
      const failedFiles: string[] = [];

      // Process files one by one with memory management
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const currentProgress = ((i) / files.length) * 100;
        setProgress(currentProgress);
        
        try {
          // Update current processing file
          setProcessingFiles([file.name]);
          
          // Validate file
          if (file.size === 0) {
            failedFiles.push(`${file.name} (corrupted or empty file)`);
            continue;
          }

          // For very large images on mobile, reduce quality automatically
          let effectiveQuality = compressionQuality;
          if (isMobile && file.size > 5 * 1024 * 1024) {
            effectiveQuality = Math.min(compressionQuality, 70);
          }
          if (isMobile && file.size > 10 * 1024 * 1024) {
            effectiveQuality = Math.min(compressionQuality, 50);
          }

          const uniqueFilename = generateUniqueFileName(file.name, i);
          const originalSize = file.size;

          // Compress with retry logic
          let compressedBlob = await compressSingleImage(file, effectiveQuality);

          // Validate compressed blob
          if (!compressedBlob || compressedBlob.size === 0) {
            // Try one more time with lower quality
            compressedBlob = await compressSingleImage(file, 30, 1);
          }

          if (!compressedBlob || compressedBlob.size === 0) {
            failedFiles.push(`${file.name} (compression failed - using original)`);
            // Use original file as fallback
            compressedBlob = file.slice(0, file.size, file.type);
          }

          blobs.push({
            blob: compressedBlob,
            name: uniqueFilename,
            originalFile: file,
            timestamp: Date.now(),
            originalSize: originalSize,
            compressedSize: compressedBlob.size,
          });
          successCount++;
          
        } catch (error: any) {
          console.error(`Error processing ${file.name}:`, error);
          failedFiles.push(`${file.name} (${error.message || 'processing error'})`);
          
          // Try to add original file as fallback
          try {
            const fallbackBlob = file.slice(0, file.size, file.type);
            blobs.push({
              blob: fallbackBlob,
              name: generateUniqueFileName(file.name, i),
              originalFile: file,
              timestamp: Date.now(),
              originalSize: file.size,
              compressedSize: file.size,
            });
          } catch (fallbackError) {
            console.error(`Failed to add fallback for ${file.name}:`, fallbackError);
          }
        }

        // Update progress
        setProgress(((i + 1) / files.length) * 100);

        // Small delay for UI update and memory management
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      
      setCompressedBlobs(blobs);
      setProcessingFiles([]);
      
      // Show error message if any files failed
      if (failedFiles.length > 0 && blobs.length > 0) {
        const successMessage = `Successfully compressed ${successCount} out of ${files.length} files.\n\n`;
        let failureMessage = "";
        
        if (failedFiles.length <= 3) {
          failureMessage = `Failed files:\n${failedFiles.join('\n')}`;
        } else {
          failureMessage = `Failed files (${failedFiles.length}):\n${failedFiles.slice(0, 3).join('\n')}\n...and ${failedFiles.length - 3} more`;
        }
        
        setErrorMessage(successMessage + failureMessage);
      } else if (failedFiles.length === files.length) {
        setErrorMessage("All files failed to compress. Please try with smaller images or lower quality settings.");
      }
      
    } catch (error: any) {
      console.error("Compression error:", error);
      setErrorMessage(error.message || "Failed to compress images. Please try again.");
      
      // Try to recover any successfully processed files
      if (compressedBlobs.length === 0) {
        // If no files were processed, try to add originals as fallback
        try {
          const fallbackBlobs: ConvertedFile[] = [];
          for (let i = 0; i < Math.min(files.length, 5); i++) {
            const file = files[i];
            try {
              fallbackBlobs.push({
                blob: file.slice(0, file.size, file.type),
                name: generateUniqueFileName(file.name, i),
                originalFile: file,
                timestamp: Date.now(),
                originalSize: file.size,
                compressedSize: file.size,
              });
            } catch (e) {
              console.error("Fallback failed:", e);
            }
          }
          if (fallbackBlobs.length > 0) {
            setCompressedBlobs(fallbackBlobs);
            setErrorMessage("Partial recovery: Some files were recovered as originals. Please try compressing smaller batches.");
          }
        } catch (e) {
          console.error("Recovery failed:", e);
        }
      }
    } finally {
      setCompressing(false);
      setProcessingFiles([]);
    }
  };

  const handleDownload = () => {
    // Downloads all compressed files individually
    compressedBlobs.forEach((item) => {
      if (item.blob && item.blob.size > 0) {
        downloadFile(item.blob, item.name);
      }
    });

    // Add download notification
    const notification: DownloadNotification = {
      id: Math.random().toString(36).substring(7),
      fileName: compressedBlobs.length === 1 ? compressedBlobs[0].name : "Multiple files",
      fileCount: compressedBlobs.length,
      timestamp: new Date(),
      isZip: false,
    };
    setDownloadNotifications((prev) => [...prev, notification]);

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setDownloadNotifications((prev) =>
        prev.filter((n) => n.id !== notification.id)
      );
    }, 5000);
  };

  const handleDownloadAsZip = async () => {
    if (compressedBlobs.length === 0) return;

    setCreatingZip(true);

    try {
      // Prepare files for ZIP
      const validFiles = compressedBlobs.filter(item => item.blob && item.blob.size > 0);
      
      if (validFiles.length === 0) {
        throw new Error("No valid files to download");
      }

      const filesForZip = validFiles.map((item) => ({
        name: item.name,
        blob: item.blob,
      }));

      // Generate ZIP filename
      const zipFileName = `compressed_images_${new Date().getTime()}.zip`;

      // Create and download ZIP
      await downloadAsZip(filesForZip, zipFileName);

      // Add ZIP download notification
      const notification: DownloadNotification = {
        id: Math.random().toString(36).substring(7),
        fileName: zipFileName,
        fileCount: validFiles.length,
        timestamp: new Date(),
        isZip: true,
      };
      setDownloadNotifications((prev) => [...prev, notification]);

      // Auto-remove notification after 5 seconds
      setTimeout(() => {
        setDownloadNotifications((prev) =>
          prev.filter((n) => n.id !== notification.id)
        );
      }, 5000);
    } catch (error) {
      console.error("ZIP creation error:", error);
      setErrorMessage("Failed to create ZIP file. Please try downloading files individually.");
    } finally {
      setCreatingZip(false);
    }
  };

  const handleSingleDownload = (index: number) => {
    const item = compressedBlobs[index];
    if (!item || !item.blob || item.blob.size === 0) {
      setErrorMessage("Cannot download this file. It may be corrupted or failed to compress.");
      return;
    }

    downloadFile(item.blob, item.name);

    // Add download notification
    const notification: DownloadNotification = {
      id: Math.random().toString(36).substring(7),
      fileName: item.name,
      fileCount: 1,
      timestamp: new Date(),
      isZip: false,
    };
    setDownloadNotifications((prev) => [...prev, notification]);

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setDownloadNotifications((prev) =>
        prev.filter((n) => n.id !== notification.id)
      );
    }, 5000);
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
    setCompressedBlobs([]);
    if (files.length === 1) {
      setShowFeatures(true);
    }
    setErrorMessage("");
  };

  const handleAddMoreFiles = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setCompressedBlobs([]);
    setShowFeatures(false);
    setErrorMessage("");
  };

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles(newFiles);
    setCompressedBlobs([]);
    setShowFeatures(false);
    setErrorMessage("");
  };

  const handleReset = () => {
    setFiles([]);
    setCompressedBlobs([]);
    setProgress(0);
    setShowFeatures(true);
    setErrorMessage("");
    setProcessingFiles([]);
  };

  const hasFiles = files.length > 0;
  const hasResults = compressedBlobs.length > 0;
  const isReadyToCompress = hasFiles && !hasResults && !compressing;
  const totalSize = files.reduce((acc, file) => acc + file.size, 0);

  // Calculate total size of compressed files
  const compressedTotalSize = compressedBlobs.reduce(
    (acc, item) => acc + (item.compressedSize || 0),
    0
  );
  const sizeReduction =
    totalSize > 0 && compressedTotalSize > 0
      ? Math.max(0, ((totalSize - compressedTotalSize) / totalSize) * 100).toFixed(1)
      : "0";

  // Show error message in alert if exists
  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
    }
  }, [errorMessage]);

  return (
    <>
      {/* SEO Schema */}
      <FAQSchema />
      <BreadcrumbSchema />
      <HowToSchema />
      <ArticleSchema />

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
                onClose={() =>
                  setDownloadNotifications((prev) =>
                    prev.filter((n) => n.id !== notification.id)
                  )
                }
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20 py-6 sm:py-8 md:py-12">
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* --- Header Section --- */}
            <div className="mb-6 sm:mb-8 md:mb-12">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all font-medium group mb-3 sm:mb-6"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm">Back to Tools</span>
              </a>

              <div className="text-center mb-4 sm:mb-6 md:mb-8">
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className={`inline-flex items-center justify-center
                    w-14 h-14 md:w-16 md:h-16
                    bg-gradient-to-br ${tool.color}
                    rounded-2xl md:rounded-3xl
                    mb-3 md:mb-4 shadow-xl`}
                >
                  <span className="text-2xl md:text-3xl text-white select-none">
                    {tool.icon}
                  </span>
                </motion.div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-2 sm:mb-4 bg-gradient-to-r from-orange-600 via-pink-600 to-orange-600 bg-clip-text text-transparent px-2">
                  Compress Image to PDF Online - 100% Free & Fast | PDFSwift
                </h1>

                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
                  Compress images online to reduce file size without losing
                  quality. Fast, secure, browser-based image compressor for JPG
                  & PNG. No signup required.
                  <span className="block text-orange-600 dark:text-orange-400 font-medium mt-1 text-xs sm:text-sm md:text-base">
                    Unlimited files • No size limits
                  </span>
                </p>
              </div>
            </div>

            {/* --- Features Grid --- */}
            <AnimatePresence>
              {showFeatures && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 sm:mb-8 md:mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
                >
                  {[
                    {
                      icon: Zap,
                      title: "Fast Compression",
                      desc: "Compress images quickly with our optimized compression engine",
                      gradient: "from-orange-500 to-pink-600",
                      bg: "from-orange-50 to-pink-50",
                      border: "border-orange-200",
                    },
                    {
                      icon: Palette,
                      title: "Quality Preserved",
                      desc: "Maintain image quality while significantly reducing file size with intelligent compression",
                      gradient: "from-blue-500 to-purple-600",
                      bg: "from-blue-50 to-purple-50",
                      border: "border-blue-200",
                    },
                    {
                      icon: Shield,
                      title: "Secure Processing",
                      desc: "All compression happens locally in your browser. Your images never leave your device",
                      gradient: "from-green-500 to-emerald-600",
                      bg: "from-green-50 to-emerald-50",
                      border: "border-green-200",
                    },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-br ${feature.bg} dark:from-gray-800 dark:to-gray-900 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl border-2 ${feature.border} dark:border-gray-700`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                        <div
                          className={`p-1.5 sm:p-2 bg-gradient-to-r ${feature.gradient} rounded-lg sm:rounded-xl`}
                        >
                          <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        {feature.desc}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* --- Main Compressor Card --- */}
            <div className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-lg sm:shadow-xl md:shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
              {/* Upload Section */}
              <div className="mb-4 sm:mb-6 md:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30 rounded-lg sm:rounded-xl">
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      {hasFiles ? "Add More Images" : "Upload Images"}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Upload JPG or PNG images to compress and reduce file size
                      without losing quality. No limits on number or size of files.
                    </p>
                  </div>
                </div>

                {/* FileUploader */}
                <FileUploader
                  accept="image/png,image/jpeg,image/jpg"
                  multiple={true}
                  onFilesSelected={
                    hasFiles ? handleAddMoreFiles : handleFilesSelected
                  }
                  key={files.length}
                />

                {/* Compression Quality Slider */}
                {hasFiles && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-700/30">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        Compression Quality: {compressionQuality}%
                      </label>
                      <span className="text-xs text-blue-600 dark:text-blue-400">
                        {compressionQuality >= 80 ? "High Quality" : 
                         compressionQuality >= 60 ? "Good Balance" : 
                         compressionQuality >= 40 ? "Medium" : "High Compression"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="95"
                      step="5"
                      value={compressionQuality}
                      onChange={(e) => setCompressionQuality(Number(e.target.value))}
                      className="w-full h-2 bg-blue-200 dark:bg-blue-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 dark:[&::-webkit-slider-thumb]:bg-blue-400"
                    />
                    <div className="flex justify-between text-xs text-blue-600 dark:text-blue-400 mt-1">
                      <span>Smaller Size</span>
                      <span>Better Quality</span>
                    </div>
                    {isMobile && (
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                        📱 Mobile mode: Large images will use optimized settings automatically
                      </p>
                    )}
                  </div>
                )}

                {/* Selected Files Summary */}
                {hasFiles && (
                  <div className="mt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-600 rounded-lg">
                          <Layers className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-orange-700 dark:text-orange-300">
                            {files.length} {files.length === 1 ? 'image' : 'images'} selected
                          </p>
                          <p className="text-xs text-orange-600 dark:text-orange-400">
                            Total size: {(totalSize / 1024 / 1024).toFixed(2)} MB • 
                            {files.filter(f => f.type === 'image/png').length} PNG • 
                            {files.filter(f => f.type.includes('jpeg')).length} JPG
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleReset}
                          className="px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                        >
                          Clear All
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* --- File Previews and Compression Area --- */}
              {hasFiles && (
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                  {/* --- Input Image Previews --- */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                        Uploaded Images ({files.length})
                      </h3>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            document.getElementById("file-upload")?.click()
                          }
                          className="px-3 py-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          Add More
                        </motion.button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-gray-200 dark:border-gray-700">
                      {files.map((file, index) => (
                        <ImagePreview
                          key={index}
                          file={file}
                          filename={file.name}
                          onRemove={() => handleRemoveFile(index)}
                          status={processingFiles.includes(file.name) ? "Compressing..." : "Ready to Compress"}
                          index={index}
                          originalSize={file.size}
                        />
                      ))}
                    </div>
                  </div>

                  {/* --- Progress and Action Buttons --- */}
                  <div className="space-y-4 sm:space-y-6">
                    {compressing && (
                      <div className="space-y-3 sm:space-y-4">
                        <ProgressBar
                          progress={progress}
                          label={`Compressing ${files.length} files...`}
                        />
                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-orange-600 dark:text-orange-400">
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                          <span className="text-xs sm:text-sm font-medium">
                            {processingFiles.length > 0 ? `Processing: ${processingFiles[0]}` : "Compressing your images..."}
                          </span>
                        </div>
                      </div>
                    )}

                    {isReadyToCompress && (
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCompress}
                        disabled={compressing}
                        className="w-full py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-bold rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        Compress {files.length} Images
                        <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      </motion.button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* --- Results and Download Area --- */}
            {hasResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-2 border-green-200 dark:border-green-800/50 p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg sm:shadow-xl md:shadow-2xl mb-6 md:mb-8"
              >
                {/* Success Header */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                  <div className="flex items-center justify-center sm:justify-start">
                    <div className="p-2 sm:p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg sm:rounded-xl shadow-lg">
                      <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-1 sm:mb-2">
                      Compression Complete! 🎉
                    </h2>
                    <p className="text-green-700 dark:text-green-300 font-medium text-sm sm:text-base">
                      Successfully compressed {compressedBlobs.length} images
                      {sizeReduction !== "0" && ` • ${sizeReduction}% average size reduction`}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-1">
                      All PNGs converted to JPG format • Files are ready for download
                    </p>
                  </div>
                  <div className="flex items-center justify-center mt-2 sm:mt-0">
                    <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base">
                      {compressedBlobs.length} Files
                    </div>
                  </div>
                </div>

                {/* --- Output Compressed Images Previews --- */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 md:mb-8">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    Compressed JPG Images
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto p-3 sm:p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-green-100 dark:border-green-800/30">
                    {compressedBlobs.map((item, index) => (
                      <ImagePreview
                        key={index}
                        file={item.blob}
                        filename={item.name}
                        status="Compressed ✓"
                        isDownloadable={true}
                        index={index}
                        originalSize={item.originalSize}
                        compressedSize={item.compressedSize}
                      />
                    ))}
                  </div>
                </div>

                {/* --- Download Buttons --- */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Download All as Individual Files */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownload}
                    className="w-full py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold sm:font-extrabold rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    Download All {compressedBlobs.length} Images
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5" />
                  </motion.button>

                  {/* Download as ZIP */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownloadAsZip}
                    disabled={creatingZip || compressedBlobs.length === 0}
                    className={`w-full py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold sm:font-extrabold rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3 ${
                      creatingZip ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {creatingZip ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:h-6 border-b-2 border-white"></div>
                        <span>Creating ZIP...</span>
                      </>
                    ) : (
                      <>
                        <FolderArchive className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        Download as ZIP File
                        <span className="text-xs px-2 py-1 bg-white/20 rounded-full">
                          {compressedBlobs.length} files
                        </span>
                      </>
                    )}
                  </motion.button>

                  {/* Compress More Button */}
                  <div className="text-center">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium hover:bg-orange-50 dark:hover:bg-orange-950/30 rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm md:text-base"
                    >
                      <ImageIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                      Compress More Images
                    </button>
                  </div>
                </div>

                {/* ZIP Benefits Info */}
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl border border-purple-200 dark:border-purple-800/30">
                  <div className="flex items-start gap-3">
                    <FolderArchive className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-purple-700 dark:text-purple-300 text-sm mb-1">
                        Why Download as ZIP?
                      </h4>
                      <ul className="text-xs text-purple-600 dark:text-purple-400 space-y-1">
                        <li className="flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Single file for easy sharing</span>
                        </li>
                        <li className="flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Preserves folder structure</span>
                        </li>
                        <li className="flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Faster downloads for multiple files</span>
                        </li>
                        <li className="flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Compressed size saves bandwidth</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- Stats Footer (Clean Card Layout) --- */}
            <div className="mt-10 sm:mt-14">
              <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                  {[
                    {
                      value: files.length,
                      label: "Files Uploaded",
                      color: "text-orange-600",
                      bg: "bg-orange-50 dark:bg-orange-900/10",
                    },
                    {
                      value: `${(totalSize / 1024 / 1024).toFixed(1)} MB`,
                      label: "Original Size",
                      color: "text-blue-600",
                      bg: "bg-blue-50 dark:bg-blue-900/10",
                    },
                    {
                      value: compressedBlobs.length,
                      label: "Files Compressed",
                      color: "text-green-600",
                      bg: "bg-green-50 dark:bg-green-900/10",
                    },
                    {
                      value: `${sizeReduction}%`,
                      label: "Size Reduction",
                      color: "text-purple-600",
                      bg: "bg-purple-50 dark:bg-purple-900/10",
                    },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className={`flex flex-col justify-center items-center
          rounded-2xl border border-gray-200 dark:border-gray-800
          ${stat.bg}
          p-4 sm:p-6
          shadow-sm hover:shadow-lg
          transition-all duration-300`}
                    >
                      <div
                        className={`text-xl sm:text-2xl md:text-3xl font-extrabold 
            ${stat.color} dark:${stat.color.replace("600", "400")}`}
                      >
                        {stat.value}
                      </div>

                      <div className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <section className="mt-20">
  <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
    How to Compress Images Online
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    
    {/* Step 1 */}
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm bg-white dark:bg-gray-800">
      <div className="text-4xl font-bold text-purple-600 mb-2">
        1
      </div>

      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
        Upload Images
      </h3>

      <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
        Upload one or multiple images using drag & drop or the upload button
      </p>
    </div>

    {/* Step 2 */}
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm bg-white dark:bg-gray-800">
      <div className="text-4xl font-bold text-purple-600 mb-2">
        2
      </div>

      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
        Select Compression Settings
      </h3>

      <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
        Adjust compression quality slider to balance file size and image quality
      </p>
    </div>

    {/* Step 3 */}
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm bg-white dark:bg-gray-800">
      <div className="text-4xl font-bold text-purple-600 mb-2">
        3
      </div>

      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
        Compress Images
      </h3>

      <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
        Click compress button to reduce image size while maintaining visual quality
      </p>
    </div>

    {/* Step 4 */}
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm bg-white dark:bg-gray-800">
      <div className="text-4xl font-bold text-purple-600 mb-2">
        4
      </div>

      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
        Download Files
      </h3>

      <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
        Download compressed images individually or as a ZIP folder
      </p>
    </div>

  </div>
</section>

            {/* Explore All Tools Section */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    Explore All Tools
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                    15+ specialized PDF, image, and document tools
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {exploreTools.slice(0, 8).map((tool, index) => (
                  <motion.a
                    key={tool.id}
                    href={tool.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="group bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-4 md:p-5 hover:border-blue-300 dark:hover:border-cyan-700 transition-all shadow-lg hover:shadow-2xl"
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div
                        className={`p-2 md:p-3 bg-gradient-to-br ${tool.color} rounded-lg md:rounded-xl shadow-lg`}
                      >
                        <span className="text-xl md:text-2xl">{tool.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg mb-1 md:mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-3 md:mb-4">
                          {tool.description}
                        </p>
                        <div className="flex items-center gap-2 text-blue-600 dark:text-cyan-400 font-medium text-xs md:text-sm">
                          <span>Use Tool</span>
                          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
              <div className="flex justify-end">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 m-4 px-4 py-2 md:px-5 md:py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all text-sm"
                >
                  <Grid className="w-4 h-4" />
                  <span>View All</span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* --- FAQ Section --- */}
          <section className="max-w-4xl mx-auto my-10 sm:my-14 md:my-20 px-3 sm:px-4">
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Everything you need to know about compressing images online
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {[
                {
                  question: "Is there any limit on file size or number of files?",
                  answer: "No, there are no limits. You can upload any number of images of any size. However, very large files may take longer to process depending on your device's performance."
                },
                {
                  question: "Will the image quality be preserved during compression?",
                  answer: "Yes, we use intelligent compression algorithms that reduce file size while maintaining visual quality. You can adjust the compression quality using the slider to find the perfect balance between size and quality."
                },
                {
                  question: "Can I compress PNG files with transparency?",
                  answer: "Yes, PNG files with transparency (alpha channel) are supported. During compression to JPG, transparent areas will be converted to white background as JPG format does not support transparency."
                },
                {
                  question: "How do I download compressed files?",
                  answer: "You can download files individually by clicking the download button on each image, or download all files at once as a ZIP archive using the 'Download as ZIP' button."
                },
                {
                  question: "Is the compression secure? Are my files uploaded to your servers?",
                  answer: "All compression happens directly in your browser (client-side). Your images are never uploaded to any server, ensuring complete privacy and security."
                },
                {
                  question: "What image formats are supported?",
                  answer: "We support JPG, JPEG, and PNG formats. Other image formats like WebP, BMP, or TIFF are not supported. PNG files are automatically converted to JPG during compression for better size reduction."
                },
                {
                  question: "Why does my browser become slow during compression?",
                  answer: "Compressing very large images can be memory-intensive. For best performance on any device, consider compressing files in smaller batches if you notice performance issues."
                }
              ].map((faq, index) => (
                <details
                  key={index}
                  className="
                    group rounded-xl border border-gray-200 dark:border-gray-700
                    bg-white dark:bg-gray-900
                    transition-all duration-300
                    hover:border-blue-400/60 dark:hover:border-blue-500/60
                    open:shadow-lg open:border-blue-500
                  "
                >
                  <summary
                    className="
                      flex cursor-pointer list-none items-center justify-between
                      px-4 sm:px-5 py-3 sm:py-4
                      text-sm sm:text-base md:text-lg
                      font-semibold text-gray-900 dark:text-white
                    "
                  >
                    <span>{faq.question}</span>
                    <span
                      className="
                        ml-3 flex h-6 w-6 items-center justify-center
                        rounded-full bg-gray-100 dark:bg-gray-800
                        text-gray-500 dark:text-gray-400
                        transition-transform duration-300
                        group-open:rotate-180
                      "
                    >
                      ▼
                    </span>
                  </summary>
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}