"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Head from 'next/head';
import { motion, AnimatePresence } from "framer-motion";
import JSZip from "jszip";
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument, rgb } from 'pdf-lib';
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
  Check,
  ArrowRight,
  Grid,
  X,
  Plus,
  Archive,
  FolderClosed,
  FileText,
  FileImage,
  File,
  Smartphone,
  Monitor,
  FileDown,
  Target,
  Sliders,
  Info,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import FileUploader from "../components/FileUploader";
import ProgressBar from "../components/ProgressBar";
import { downloadFile } from "../../utils/imageUtils";
import BreadcrumbSchema from "./BreadcrumbSchema";
import ArticleSchema from "./ArticleSchema";
import HowToSchema from "./HowToSchema";
import FAQSchema from "./FAQSchema";
import { faqData } from "./faqData";

// --- Helper Functions ---
const createObjectURL = (fileOrBlob: Blob | File) =>
  URL.createObjectURL(fileOrBlob);
const revokeObjectURL = (url: string) => URL.revokeObjectURL(url);

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

const tool = {
  id: "compress-pdf",
  name: "Compress PDF",
  description: "Compress PDF files by converting to images and rebuilding",
  category: "pdf",
  icon: "📦",
  color: "from-blue-500 to-cyan-500",
  href: "/compress-pdf",
  path: "/tools/compress-pdf",
};

// Explore All Tools Data
const exploreTools: Tool[] = [
  {
    id: "pdf-to-image",
    name: "PDF to Image",
    description: "Convert PDF pages to JPG or PNG images",
    category: "pdf",
    icon: "🖼️",
    color: "from-purple-500 to-pink-500",
    href: "/pdf-to-image",
    path: "/tools/pdf-to-image",
  },
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

// --- Component Interface ---
interface ConvertedFile {
  blob: Blob;
  name: string;
  originalFile: File;
  timestamp: number;
  pageNumber: number;
  compressedSize?: number;
  originalSize?: number;
  isOriginal?: boolean;
  isAlreadyCompressed?: boolean;
}

interface DownloadNotification {
  id: string;
  fileName: string;
  fileCount: number;
  timestamp: Date;
  type: 'single' | 'zip' | 'multi';
}

// --- Image Preview Component (Mobile-Optimized) ---
const ImagePreview = ({
  file,
  onRemove,
  status,
  isDownloadable = false,
  filename = "image.jpg",
  index,
  onSingleDownload,
  pageNumber,
  originalSize,
  compressedSize,
}: {
  file: Blob | File;
  onRemove?: () => void;
  status: string;
  isDownloadable?: boolean;
  filename: string;
  index: number;
  onSingleDownload?: () => void;
  pageNumber?: number;
  originalSize?: number;
  compressedSize?: number;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Detect mobile
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

  // Create object URL
  useEffect(() => {
    if (!file) {
      setError(true);
      setLoading(false);
      return;
    }

    let url: string | null = null;
    let img: HTMLImageElement | null = null;

    try {
      url = URL.createObjectURL(file);
      setPreviewUrl(url);

      img = new Image();
      img.onload = () => {
        setLoading(false);
        setError(false);
      };
      img.onerror = () => {
        setError(true);
        setLoading(false);
        if (process.env.NODE_ENV === 'development') {
          console.warn('Failed to load image preview:', filename);
        }
      };
      
      const timeoutId = setTimeout(() => {
        if (loading) {
          setError(true);
          setLoading(false);
          if (img) {
            img.onload = null;
            img.onerror = null;
          }
        }
      }, 5000);

      img.src = url;

      return () => {
        clearTimeout(timeoutId);
        if (url) {
          URL.revokeObjectURL(url);
        }
        if (img) {
          img.onload = null;
          img.onerror = null;
        }
      };
    } catch (err) {
      setError(true);
      setLoading(false);
      if (url) {
        URL.revokeObjectURL(url);
      }
    }
  }, [file, filename, loading]);

  const statusColor =
    status && status.includes("Compressed")
      ? "text-green-600 dark:text-green-400"
      : status && status.includes("Processing")
      ? "text-blue-600 dark:text-blue-400"
      : "text-purple-600 dark:text-purple-400";

  // Improved download handler with mobile support
  const handleIndividualDownload = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    setDownloadSuccess(false);
    
    try {
      if (onSingleDownload) {
        onSingleDownload();
      } else if (file) {
        if (isMobile) {
          const link = document.createElement('a');
          const url = URL.createObjectURL(file);
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          
          setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }, 100);
        } else {
          downloadFile(file as Blob, filename);
        }
        
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleImageError = () => {
    setError(true);
  };

  // Calculate compression ratio
  const getCompressionRatio = () => {
    if (originalSize && compressedSize && originalSize > 0) {
      const ratio = ((originalSize - compressedSize) / originalSize * 100);
      return ratio > 0 ? `-${ratio.toFixed(0)}%` : `${Math.abs(ratio).toFixed(0)}%`;
    }
    return null;
  };

  const compressionRatio = getCompressionRatio();

  return (
    <>
      <AnimatePresence>
        {previewOpen && previewUrl && (
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
                className="absolute -top-10 right-0 z-50 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
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
        whileHover={!isMobile ? { y: -5, scale: 1.02 } : {}}
        className="relative group"
      >
        <div className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 
          ${isMobile ? 'rounded-xl p-3' : 'rounded-2xl p-4'} 
          border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden`}
        >
          {/* Page Number Badge */}
          <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full z-10">
            Page {pageNumber || index + 1}
          </div>

          {/* Compression Ratio Badge */}
          {compressionRatio && (
            <div className={`absolute top-2 right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full z-10`}>
              {compressionRatio}
            </div>
          )}

          {/* Image Container */}
          <div
            className={`relative w-full ${isMobile ? 'h-28' : 'h-36'} mb-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden cursor-pointer group/image`}
            onClick={() => previewUrl && !error && setPreviewOpen(true)}
          >
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className={`animate-spin rounded-full border-b-2 border-blue-500 ${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`}></div>
              </div>
            ) : error || !previewUrl ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
                <FileImage className={`${isMobile ? 'w-6 h-6' : 'w-10 h-10'} text-gray-400 mb-1`} />
                <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-gray-500 dark:text-gray-400`}>
                  Preview not available
                </span>
                <span className={`${isMobile ? 'text-[8px]' : 'text-xs'} text-gray-400 dark:text-gray-500 mt-0.5`}>
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
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Eye className={`${isMobile ? 'w-5 h-5' : 'w-8 h-8'} text-white`} />
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/image:translate-x-full transition-transform duration-1000" />
              </>
            )}
          </div>

          {/* File Info */}
          <div className="space-y-1.5">
            <p
              className={`${isMobile ? 'text-[10px]' : 'text-sm'} font-semibold truncate text-gray-900 dark:text-white`}
              title={filename}
            >
              {filename}
            </p>

            <div className="flex items-center justify-between flex-wrap gap-1">
              <span
                className={`${isMobile ? 'text-[8px] px-2 py-0.5' : 'text-xs px-3 py-1'} rounded-full font-medium ${statusColor} bg-opacity-10 ${
                  status.includes("Compressed") ? "bg-green-500" : 
                  status.includes("Processing") ? "bg-blue-500" : "bg-purple-500"
                }`}
              >
                {status}
              </span>

              {/* File Size */}
              {file.size && (
                <span className={`${isMobile ? 'text-[8px]' : 'text-xs'} text-gray-500 dark:text-gray-400`}>
                  {formatFileSize(file.size)}
                </span>
              )}
            </div>

            {/* Size comparison */}
            {originalSize && compressedSize && (
              <div className="flex items-center gap-1 text-[8px] sm:text-[10px] text-gray-500 dark:text-gray-400">
                <span>Original: {formatFileSize(originalSize)}</span>
                <span>→</span>
                <span className={`font-medium ${compressedSize < originalSize ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {formatFileSize(compressedSize)}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className={`absolute top-2 right-2 flex gap-1.5 
            ${!isMobile ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'} 
            transition-opacity duration-300`}
          >
            {onRemove && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onRemove}
                className={`${isMobile ? 'p-2' : 'p-1.5'} bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors`}
                aria-label={`Remove ${filename}`}
              >
                <XCircle className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`} />
              </motion.button>
            )}

            {isDownloadable && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleIndividualDownload}
                disabled={isDownloading || !file}
                className={`relative ${isMobile ? 'p-2.5' : 'p-1.5'} 
                  ${downloadSuccess ? 'bg-green-500' : 'bg-blue-500'} 
                  text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors
                  ${isDownloading ? 'opacity-75 cursor-not-allowed' : ''}`}
                title={`Download ${filename}`}
              >
                {isDownloading ? (
                  <div className={`animate-spin rounded-full border-2 border-white border-t-transparent ${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`} />
                ) : downloadSuccess ? (
                  <Check className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`} />
                ) : (
                  <Download className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`} />
                )}
              </motion.button>
            )}
          </div>

          {isMobile && downloadSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-12 left-2 right-2 bg-green-500 text-white text-[10px] font-medium py-1 px-2 rounded-lg text-center"
            >
              Downloaded ✓
            </motion.div>
          )}
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
  type,
  onClose,
}: DownloadNotification & { onClose: () => void }) => {
  const getMessage = () => {
    switch (type) {
      case 'zip':
        return `ZIP archive downloaded with ${fileCount} files`;
      case 'multi':
        return `${fileCount} files downloaded individually`;
      default:
        return 'File downloaded successfully! 🎉';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className={`bg-gradient-to-r ${
        type === 'zip' 
          ? 'from-blue-500 to-cyan-600' 
          : 'from-green-500 to-emerald-600'
      } text-white p-4 rounded-xl shadow-lg mb-2`}
    >
      <div className="flex items-start gap-3">
        {type === 'zip' ? (
          <Archive className="w-5 h-5 mt-0.5 flex-shrink-0" />
        ) : (
          <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm mb-1">
            {type === 'zip' ? 'ZIP Archive Downloaded! 📦' : getMessage()}
          </h4>
          {type === 'single' && (
            <p className="text-xs opacity-90 truncate mb-1">{fileName}</p>
          )}
          <p className="text-xs opacity-80 mb-2">
            {type === 'zip' 
              ? `All ${fileCount} files are now in a single ZIP archive`
              : `${fileCount} PDF ${fileCount === 1 ? 'page' : 'pages'} compressed`
            }
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
export default function CompressPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [compressing, setCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressedFiles, setCompressedFiles] = useState<ConvertedFile[]>([]);
  const [showFeatures, setShowFeatures] = useState(true);
  const [downloadNotifications, setDownloadNotifications] = useState<
    DownloadNotification[]
  >([]);
  const [zipDownloading, setZipDownloading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState<number>(70);
  const [outputFormat, setOutputFormat] = useState<'jpg' | 'png'>('jpg');
  const [imageQuality, setImageQuality] = useState<number>(70);
  const [pdfWorkerLoaded, setPdfWorkerLoaded] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const [originalFileSizes, setOriginalFileSizes] = useState<Map<string, number>>(new Map());
  const [compressionResult, setCompressionResult] = useState<'success' | 'failed' | 'already-compressed' | null>(null);
  const [compressionPercentage, setCompressionPercentage] = useState<number | null>(null);
  const [compressionError, setCompressionError] = useState<string | null>(null);
  
  // Target size feature
  const [targetSizeMode, setTargetSizeMode] = useState<'manual' | 'target'>('manual');
  const [targetSize, setTargetSize] = useState<number>(100); // in KB
  const [targetSizeUnit, setTargetSizeUnit] = useState<'KB' | 'MB'>('KB');
  const [isTargetModeActive, setIsTargetModeActive] = useState(false);
  const [estimatedCompression, setEstimatedCompression] = useState<number>(0);

  // Initialize pdf.js worker
  useEffect(() => {
    const version = '3.11.174';
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${version}/build/pdf.worker.min.js`;
    setPdfWorkerLoaded(true);
    console.log('PDF worker initialized with CDN');
  }, []);

  // Detect device type
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
  const generateUniqueFileName = (baseName: string, pageNumber: number) => {
    const timestamp = new Date().getTime();
    const randomId = Math.random().toString(36).substring(2, 9);
    const cleanBaseName = baseName
      .replace(/\.pdf$/i, "")
      .replace(/\.[^/.]+$/, "");
    const page = pageNumber.toString().padStart(3, "0");
    return `${cleanBaseName}_page_${page}_${timestamp}_${randomId}.${outputFormat}`;
  };

  // Auto-scroll notifications
  useEffect(() => {
    if (notificationsRef.current && downloadNotifications.length > 0) {
      notificationsRef.current.scrollTop =
        notificationsRef.current.scrollHeight;
    }
  }, [downloadNotifications]);

  // ─── 🔥 UPDATED: Only allow 1 file ───
  const handleFilesSelected = (newFiles: File[]) => {
    // Filter valid PDF files
    const filteredFiles = newFiles.filter(file => {
      if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
        alert(`File "${file.name}" is not a PDF document.`);
        return false;
      }
      
      if (file.size === 0) {
        alert(`File "${file.name}" appears to be empty or corrupted.`);
        return false;
      }
      return true;
    });
    
    if (filteredFiles.length === 0) return;
    
    // 🔥 Only keep the FIRST file, ignore the rest
    const firstFile = filteredFiles[0];
    
    // 🔥 Automatically remove previous file and replace with new one
    setFiles([firstFile]);
    setCompressedFiles([]);
    setShowFeatures(false);
    setCompressionResult(null);
    setCompressionPercentage(null);
    setCompressionError(null);
    setProgress(0);
    
    // Store original file size
    const sizeMap = new Map();
    sizeMap.set(firstFile.name, firstFile.size);
    setOriginalFileSizes(sizeMap);
  };

  // ─── UPDATED: Compress PDF and return targetMet flag ───
  const compressPdfToImages = async (
    pdfFile: File, 
    targetSizeBytes?: number,
    onProgress?: (progress: number) => void
  ): Promise<{ files: ConvertedFile[]; targetMet: boolean }> => {
    const convertedFiles: ConvertedFile[] = [];
    const originalSize = pdfFile.size;
    let targetMet = true; // default true if no target specified
    
    try {
      const pdfUrl = URL.createObjectURL(pdfFile);
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      const pageCount = pdf.numPages;
      
      if (pageCount === 0) {
        throw new Error('PDF has no pages');
      }
      
      let currentScale = Math.max(0.3, Math.min(2.0, 1.0 + (compressionLevel - 50) / 100));
      let totalCompressedSize = 0;
      let bestBlobs: Blob[] = [];
      let bestFilenames: string[] = [];
      let attempts = 0;
      const maxAttempts = 15;
      let totalPagesProcessed = 0;
      
      while (attempts < maxAttempts) {
        const tempBlobs: Blob[] = [];
        const tempFilenames: string[] = [];
        let tempTotalSize = 0;
        let pagesProcessed = 0;
        
        for (let i = 1; i <= pageCount; i++) {
          try {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: currentScale });
            
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            
            if (!context) {
              throw new Error('Could not get canvas context');
            }
            
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            
            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };
            
            await page.render(renderContext).promise;
            
            const mimeType = outputFormat === 'jpg' ? 'image/jpeg' : 'image/png';
            const quality = outputFormat === 'jpg' ? Math.max(0.05, compressionLevel / 100) : undefined;
            
            const blob = await new Promise<Blob>((resolve, reject) => {
              canvas.toBlob(
                (blob) => {
                  if (blob) {
                    resolve(blob);
                  } else {
                    reject(new Error('Failed to create blob from canvas'));
                  }
                },
                mimeType,
                quality
              );
            });
            
            const filename = generateUniqueFileName(pdfFile.name, i);
            tempBlobs.push(blob);
            tempFilenames.push(filename);
            tempTotalSize += blob.size;
            pagesProcessed++;
            totalPagesProcessed++;
            
            const baseProgress = Math.min(70, (totalPagesProcessed / (pageCount * maxAttempts)) * 70);
            if (onProgress) {
              onProgress(baseProgress);
            }
            
            canvas.width = 0;
            canvas.height = 0;
            
          } catch (pageError) {
            console.error(`Error processing page ${i}:`, pageError);
            // Continue with other pages
          }
        }
        
        // Check if target is met (only if targetSizeBytes is provided)
        if (targetSizeBytes) {
          const targetRange = targetSizeBytes * 0.9;
          
          if (tempTotalSize <= targetSizeBytes && tempTotalSize >= targetRange) {
            bestBlobs = tempBlobs;
            bestFilenames = tempFilenames;
            totalCompressedSize = tempTotalSize;
            targetMet = true;
            break;
          } else if (tempTotalSize < targetRange) {
            currentScale = Math.min(2.0, currentScale * 1.15);
            setCompressionLevel(Math.min(95, compressionLevel + 5));
          } else {
            currentScale = Math.max(0.3, currentScale * 0.85);
            setCompressionLevel(Math.max(10, compressionLevel - 5));
          }
          
          // Keep best attempt (closest to target without exceeding)
          if (tempTotalSize <= targetSizeBytes && (bestBlobs.length === 0 || tempTotalSize > totalCompressedSize)) {
            bestBlobs = tempBlobs;
            bestFilenames = tempFilenames;
            totalCompressedSize = tempTotalSize;
          }
        } else {
          // No target: use this iteration and mark targetMet true
          bestBlobs = tempBlobs;
          bestFilenames = tempFilenames;
          totalCompressedSize = tempTotalSize;
          targetMet = true;
          break;
        }
        
        attempts++;
        const adaptiveProgress = 70 + (attempts / maxAttempts) * 20;
        if (onProgress) {
          onProgress(Math.min(90, adaptiveProgress));
        }
      }
      
      // After loop, if targetSizeBytes provided but targetMet is false, we need to check if we have a best attempt
      if (targetSizeBytes && !targetMet) {
        // If we have bestBlobs, we can still use them but mark targetMet false
        if (bestBlobs.length === 0) {
          // No blobs at all -> throw error
          throw new Error('Failed to compress any pages');
        }
        // Use best attempt
        totalCompressedSize = bestBlobs.reduce((acc, blob) => acc + blob.size, 0);
        // targetMet remains false
      }
      
      if (bestBlobs.length > 0) {
        for (let i = 0; i < bestBlobs.length; i++) {
          convertedFiles.push({
            blob: bestBlobs[i],
            name: bestFilenames[i],
            originalFile: pdfFile,
            timestamp: Date.now(),
            pageNumber: i + 1,
            originalSize: originalSize,
            compressedSize: bestBlobs[i].size,
            isOriginal: false,
            isAlreadyCompressed: false,
          });
        }
      }
      
      URL.revokeObjectURL(pdfUrl);
      
      if (convertedFiles.length === 0) {
        throw new Error('Failed to compress any pages from the PDF');
      }
      
      return { files: convertedFiles, targetMet };
      
    } catch (error) {
      console.error('PDF compression error:', error);
      throw new Error(`Failed to compress PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Rebuild PDF from images
  const rebuildPdfFromImages = async (
    images: ConvertedFile[],
    onProgress?: (progress: number) => void
  ): Promise<Blob> => {
    try {
      const pdfDoc = await PDFDocument.create();
      const totalImages = images.length;
      
      for (let i = 0; i < totalImages; i++) {
        const image = images[i];
        const imageArrayBuffer = await image.blob.arrayBuffer();
        
        let imageRef;
        if (outputFormat === 'png') {
          imageRef = await pdfDoc.embedPng(imageArrayBuffer);
        } else {
          imageRef = await pdfDoc.embedJpg(imageArrayBuffer);
        }
        
        const page = pdfDoc.addPage([imageRef.width, imageRef.height]);
        page.drawImage(imageRef, {
          x: 0,
          y: 0,
          width: imageRef.width,
          height: imageRef.height,
        });
        
        const rebuildProgress = 90 + ((i + 1) / totalImages) * 8;
        if (onProgress) {
          onProgress(Math.min(98, rebuildProgress));
        }
      }
      
      const pdfBytes = await pdfDoc.save();
      
      if (onProgress) {
        onProgress(99);
      }
      
      const uint8Array = new Uint8Array(pdfBytes);
      return new Blob([uint8Array], { type: 'application/pdf' });
      
    } catch (error) {
      console.error('Error rebuilding PDF:', error);
      throw new Error('Failed to rebuild PDF from images');
    }
  };

  const handleCompress = async () => {
    if (files.length === 0) return;

    if (!pdfWorkerLoaded) {
      alert('PDF worker is still loading. Please wait a moment and try again.');
      return;
    }

    setCompressing(true);
    setProgress(0);
    setCompressedFiles([]);
    setShowFeatures(false);
    setCompressionResult(null);
    setCompressionPercentage(null);
    setCompressionError(null);

    try {
      let allCompressedPages: ConvertedFile[] = [];
      let failedFiles: string[] = [];
      let targetMet = true;
      
      let targetSizeBytes: number | undefined;
      if (isTargetModeActive) {
        targetSizeBytes = targetSizeUnit === 'KB' ? targetSize * 1024 : targetSize * 1024 * 1024;
        if (targetSizeBytes < 1024) {
          targetSizeBytes = 1024;
        }
      }
      
      for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
        const file = files[fileIndex];
        
        try {
          if (file.size === 0) {
            failedFiles.push(`${file.name} (empty file)`);
            continue;
          }
          
          setProgress(5 + (fileIndex / files.length) * 5);
          
          const result = await compressPdfToImages(file, targetSizeBytes, (progressValue) => {
            const baseProgress = 10 + (fileIndex / files.length) * 80;
            setProgress(baseProgress + progressValue * 0.8);
          });
          allCompressedPages = [...allCompressedPages, ...result.files];
          // If any file fails to meet target, overall targetMet becomes false
          if (!result.targetMet) {
            targetMet = false;
          }
          
        } catch (error: any) {
          console.error(`Error compressing PDF ${file.name}:`, error);
          failedFiles.push(file.name);
          // Continue to next file
        }
      }
      
      // ─── Check if we have pages ───
      if (allCompressedPages.length === 0) {
        let errorMsg = 'Failed to compress PDF. No pages could be processed.';
        if (failedFiles.length > 0) {
          errorMsg = `Failed to compress the PDF file. The file may be corrupted, password-protected, or in an unsupported format.\n\nPlease try:\n• Using a different PDF file\n• Checking if the file is password-protected\n• Using a smaller or simpler PDF\n• Making sure the PDF is not damaged`;
        }
        if (isTargetModeActive) {
          errorMsg += `\n\n💡 Tip: The target size (${formatTargetSize()}) might be too small. Try increasing the target size or using Manual mode.`;
        }
        setCompressionError(errorMsg);
        setCompressionResult('failed');
        setProgress(0);
        setCompressing(false);
        alert('❌ Compression failed: No pages could be processed. Please check your file and try again.');
        return;
      }
      
      // ─── Handle target not met ───
      if (isTargetModeActive && !targetMet) {
        // Target not met: show specific error and do not proceed
        const targetDisplay = formatTargetSize();
        const errorMsg = `Your PDF could not be compressed to ${targetDisplay} without significantly affecting its quality. Please choose a larger target size and try again.`;
        setCompressionError(errorMsg);
        setCompressionResult('failed');
        setProgress(0);
        setCompressing(false);
        // Optionally, we could still offer the best attempt but we choose not to.
        return;
      }
      
      // ─── Success path: target met (or manual mode) ───
      setProgress(85);
      const compressedPdfBlob = await rebuildPdfFromImages(allCompressedPages, (progressValue) => {
        setProgress(Math.min(98, progressValue));
      });
      
      const originalSize = files.reduce((acc, f) => acc + f.size, 0);
      const compressedSize = compressedPdfBlob.size;
      
      const percentage = ((originalSize - compressedSize) / originalSize * 100);
      setCompressionPercentage(percentage);
      
      // Check if compression was successful (size reduced)
      if (compressedSize < originalSize) {
        setCompressionResult('success');
      } else {
        setCompressionResult('already-compressed');
      }
      
      // 🔥 FIX: Keep the original filename without adding "compressed_" prefix
      const originalFileName = files[0]?.name || 'document.pdf';
      // Remove .pdf extension if present, then add .pdf
      const baseNameWithoutExt = originalFileName.replace(/\.pdf$/i, '');
      const finalName = `${baseNameWithoutExt}.pdf`;
      
      const compressedPdfFile: ConvertedFile = {
        blob: compressedPdfBlob,
        name: finalName, // Use original filename
        originalFile: files[0],
        timestamp: Date.now(),
        pageNumber: 0,
        originalSize: originalSize,
        compressedSize: compressedSize,
        isOriginal: false,
        isAlreadyCompressed: compressedSize >= originalSize,
      };
      
      setCompressedFiles([compressedPdfFile]);
      
      if (failedFiles.length > 0 && allCompressedPages.length > 0) {
        // Partial success - some files failed but we have results
        const message = `⚠️ Partial success: ${allCompressedPages.length > 0 ? files.length - failedFiles.length : 0} of ${files.length} PDF files compressed.\n\nFailed files:\n${failedFiles.slice(0, 3).join('\n')}`;
        alert(message);
      }
      
      setProgress(100);
      
    } catch (error: any) {
      console.error("Compression error:", error);
      setProgress(0);
      setCompressionError(error.message || "Failed to compress PDF. Please try again.");
      setCompressionResult('failed');
      alert(error.message || "❌ Failed to compress PDF. Please try again.");
    } finally {
      setCompressing(false);
    }
  };

  const handleDownloadCompressedPdf = () => {
    if (compressedFiles.length === 0) return;
    
    const file = compressedFiles[0];
    if (!file || !file.blob || file.blob.size === 0) {
      alert("Cannot download this file. It may be corrupted.");
      return;
    }

    if (isMobile) {
      try {
        const link = document.createElement('a');
        const url = URL.createObjectURL(file.blob);
        link.href = url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 100);
      } catch (error) {
        console.error('Mobile download error:', error);
        const url = URL.createObjectURL(file.blob);
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    } else {
      downloadFile(file.blob, file.name);
    }

    const notification: DownloadNotification = {
      id: Math.random().toString(36).substring(7),
      fileName: file.name,
      fileCount: 1,
      timestamp: new Date(),
      type: 'single',
    };
    setDownloadNotifications((prev) => [...prev, notification]);

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
    setCompressedFiles([]);
    setCompressionResult(null);
    setCompressionPercentage(null);
    setCompressionError(null);
    setProgress(0);
  };

  const handleReset = () => {
    setFiles([]);
    setCompressedFiles([]);
    setProgress(0);
    setShowFeatures(true);
    setIsTargetModeActive(false);
    setCompressionResult(null);
    setCompressionPercentage(null);
    setCompressionError(null);
  };

  const hasFiles = files.length > 0;
  const hasResults = compressedFiles.length > 0;
  const hasError = compressionError !== null && compressionResult === 'failed';
  const isReadyToCompress = hasFiles && !hasResults && !compressing && pdfWorkerLoaded && !hasError;
  const totalSize = files.reduce((acc, file) => acc + file.size, 0);
  
  const totalOriginalSize = compressedFiles.reduce((acc, f) => acc + (f.originalSize || 0), 0);
  const totalCompressedSize = compressedFiles.reduce((acc, f) => acc + (f.compressedSize || 0), 0);
  const compressionRatio = totalOriginalSize > 0 
    ? ((totalOriginalSize - totalCompressedSize) / totalOriginalSize * 100).toFixed(1)
    : '0';

  const formatTargetSize = () => {
    if (targetSizeUnit === 'KB') {
      if (targetSize >= 1024) {
        return `${(targetSize / 1024).toFixed(1)} MB`;
      }
      return `${targetSize} KB`;
    }
    return `${targetSize} MB`;
  };

  const isAlreadyCompressed = compressionResult === 'already-compressed';

  // ─── Error UI Component (updated for target size message) ───
  const ErrorDisplay = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-red-200 dark:border-red-800/50 p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg sm:shadow-xl md:shadow-2xl mb-6 md:mb-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
        <div className="flex-shrink-0">
          <div className="p-2 sm:p-3 bg-gradient-to-r from-red-500 to-rose-600 rounded-lg sm:rounded-xl shadow-lg">
            <AlertCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-red-700 dark:text-red-400 mb-1 sm:mb-2">
            ❌ Compression Failed
          </h2>
          <div className="text-sm sm:text-base text-red-600 dark:text-red-300 whitespace-pre-line">
            {compressionError}
          </div>
          <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-medium rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all text-xs sm:text-sm"
            >
              <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Try Again
            </button>
            <button
              onClick={() => setCompressionError(null)}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm"
            >
              Dismiss
            </button>
          </div>
          {isTargetModeActive && (
            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800/50 rounded-lg">
              <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-400">
                💡 <strong>Tip:</strong> Target size of {formatTargetSize()} might be too small for this PDF. Try increasing the target size or switching to Manual mode.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <FAQSchema />
      <BreadcrumbSchema />
      <HowToSchema />
      <ArticleSchema />
      
      <div className={`fixed ${isMobile ? 'bottom-4' : 'top-4'} right-4 z-50 w-full max-w-xs sm:max-w-sm`}>
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
                  className="inline-flex items-center justify-center
                    w-14 h-14 md:w-16 md:h-16
                    bg-gradient-to-br from-blue-500 to-cyan-500
                    rounded-2xl md:rounded-3xl
                    mb-3 md:mb-4 shadow-xl"
                 >
                  <span className="text-2xl md:text-3xl text-white select-none">
                    {tool.icon}
                  </span>
                </motion.div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-2 sm:mb-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent px-2">
                  Compress PDF - Reduce File Size Online for Free | PDFSwift
                </h1>

                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
                  Compress your PDF files by converting to images and rebuilding
                  <span className="block text-blue-600 dark:text-blue-400 font-medium mt-1 text-xs sm:text-sm md:text-base">
                    One file at a time • No file size restrictions • All devices supported
                  </span>
                </p>
              </div>
            </div>

            <AnimatePresence>
              {showFeatures && !hasFiles && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 sm:mb-8 md:mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
                >
                  {[
                    {
                      icon: Target,
                      title: "Target Size Control",
                      desc: "Set exact file size target (e.g., 50KB, 1MB) and let the tool automatically adjust compression",
                      gradient: "from-blue-500 to-cyan-600",
                      bg: "from-blue-50 to-cyan-50",
                      border: "border-blue-200",
                    },
                    {
                      icon: Sliders,
                      title: "Smart Compression",
                      desc: "Intelligently compress PDFs by optimizing images to achieve your desired file size",
                      gradient: "from-purple-500 to-pink-600",
                      bg: "from-purple-50 to-pink-50",
                      border: "border-purple-200",
                    },
                    {
                      icon: Download,
                      title: "One Click Download",
                      desc: "Download your compressed PDF instantly with a single click",
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

            {/* ─── MAIN TOOL CARD ─── */}
            <div className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-lg sm:shadow-xl md:shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
              <div className="mb-4 sm:mb-6 md:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg sm:rounded-xl">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      Upload PDF Document
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Select a PDF file to compress
                      <span className="block text-blue-600 dark:text-blue-400 mt-1">
                        One file at a time • No size restrictions
                      </span>
                    </p>
                  </div>
                </div>

                {/* ─── File Uploader ─── */}
                <div className="mb-6">
                  <FileUploader
                    accept="application/pdf"
                    multiple={false}
                    onFilesSelected={handleFilesSelected}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                    Upload one PDF at a time • Previous file will be replaced
                  </p>
                </div>

                {hasFiles && (
                  <div className="space-y-4 mb-4">
                    <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mode:</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setTargetSizeMode('manual');
                              setIsTargetModeActive(false);
                              setCompressionError(null);
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              targetSizeMode === 'manual' && !isTargetModeActive
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                          >
                            Manual
                          </button>
                          <button
                            onClick={() => {
                              setTargetSizeMode('target');
                              setIsTargetModeActive(true);
                              setCompressionError(null);
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              isTargetModeActive
                                ? 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                          >
                            Target Size 🎯
                          </button>
                        </div>
                      </div>
                    </div>

                    {isTargetModeActive && (
                      <div className="flex flex-wrap items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border-2 border-green-200 dark:border-green-800/50">
                        <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                          <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Target Size:</span>
                          <input
                            type="number"
                            min="1"
                            max={targetSizeUnit === 'KB' ? 999999 : 999}
                            value={targetSize}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value);
                              if (!isNaN(val) && val > 0) {
                                setTargetSize(val);
                              }
                            }}
                            className="w-24 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                          />
                          <select
                            value={targetSizeUnit}
                            onChange={(e) => setTargetSizeUnit(e.target.value as 'KB' | 'MB')}
                            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                          >
                            <option value="KB">KB</option>
                            <option value="MB">MB</option>
                          </select>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {files.length > 0 && (
                            <span>
                              Current: {(totalSize / 1024).toFixed(1)} KB → Target: {formatTargetSize()}
                              {estimatedCompression > 0 && (
                                <span className="ml-2 text-green-600 dark:text-green-400">
                                  ({(estimatedCompression).toFixed(0)}% reduction needed)
                                </span>
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {!isTargetModeActive && (
                      <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Compression:</span>
                          <input
                            type="range"
                            min="10"
                            max="100"
                            value={compressionLevel}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              setCompressionLevel(val);
                              setImageQuality(val);
                            }}
                            className="w-32 sm:w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
                          />
                          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 min-w-[2.5rem]">
                            {compressionLevel}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {!pdfWorkerLoaded && (
                  <div className="text-center p-2 text-amber-600 dark:text-amber-400 text-sm">
                    ⏳ Loading PDF renderer... Please wait.
                  </div>
                )}

                {hasFiles && (
                  <div className="text-center mb-6">
                    <div className="inline-flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg sm:rounded-full">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-blue-700 dark:text-blue-300">
                          {files.length} PDF file selected
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                        <span>
                          • {(totalSize / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {hasFiles && (
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                        Uploaded PDF File
                      </h3>
                      <button
                        onClick={handleReset}
                        className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg sm:rounded-xl transition-colors"
                      >
                        Clear
                      </button>
                    </div>

                    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'} gap-3 sm:gap-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-gray-200 dark:border-gray-700`}>
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className={`relative bg-white dark:bg-gray-800 rounded-xl ${isMobile ? 'p-3' : 'p-4'} border-2 border-gray-200 dark:border-gray-700 shadow-md`}
                        >
                          <div className="flex flex-col items-center text-center">
                            <div className={`${isMobile ? 'w-14 h-20' : 'w-20 h-28'} mb-2 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg`}>
                              <FileText className={`${isMobile ? 'w-7 h-7' : 'w-10 h-10'} text-white`} />
                            </div>
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium truncate w-full text-gray-900 dark:text-white max-w-[150px]`}>
                              {file.name}
                            </p>
                            <p className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-gray-500 dark:text-gray-400 mt-0.5`}>
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <button
                              onClick={() => handleRemoveFile(index)}
                              className={`mt-2 ${isMobile ? 'p-2' : 'p-1.5'} bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors`}
                            >
                              <XCircle className={`${isMobile ? 'w-4 h-4' : 'w-4 h-4'}`} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    {compressing && (
                      <div className="space-y-3 sm:space-y-4">
                        <ProgressBar
                          progress={progress}
                          label={
                            isTargetModeActive 
                              ? `Optimizing to ${formatTargetSize()}... ${Math.round(progress)}%`
                              : `Compressing PDF... ${Math.round(progress)}%`
                          }
                        />
                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-blue-600 dark:text-blue-400">
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                          <span className="text-xs sm:text-sm font-medium">
                            {isTargetModeActive 
                              ? `🎯 Targeting ${formatTargetSize()} (${Math.round(progress)}%)`
                              : `Compressing your PDF... (${Math.round(progress)}%)`
                            }
                          </span>
                        </div>
                      </div>
                    )}

                    {isReadyToCompress && !hasError && (
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCompress}
                        className={`w-full py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 bg-gradient-to-r ${
                          isTargetModeActive 
                            ? 'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                            : 'from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700'
                        } text-white font-bold rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3`}
                      >
                        {isTargetModeActive ? (
                          <>
                            <Target className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6'}`} />
                            Compress PDF to {formatTargetSize()}
                          </>
                        ) : (
                          <>
                            <FileDown className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6'}`} />
                            Compress PDF
                          </>
                        )}
                        <Sparkles className={`${isMobile ? 'w-4 h-4' : 'w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5'}`} />
                      </motion.button>
                    )}

                    {hasFiles && !isReadyToCompress && !compressing && !pdfWorkerLoaded && (
                      <div className="text-center text-amber-600 dark:text-amber-400 text-sm p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                        ⏳ PDF renderer is initializing. Please wait a moment...
                      </div>
                    )}

                    {hasError && (
                      <div className="text-center text-sm text-red-600 dark:text-red-400 p-3 bg-red-50 dark:bg-red-950/30 rounded-lg">
                        <AlertCircle className="w-4 h-4 inline-block mr-1.5" />
                        {compressionError?.split('\n')[0] || 'Compression failed. Please try again.'}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ─── ERROR DISPLAY ─── */}
            {hasError && <ErrorDisplay />}

            {/* ─── SUCCESS DISPLAY ─── */}
            {hasResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gradient-to-br ${
                  isAlreadyCompressed 
                    ? 'from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30'
                    : 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30'
                } rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-2 ${
                  isAlreadyCompressed
                    ? 'border-blue-200 dark:border-blue-800/50'
                    : 'border-green-200 dark:border-green-800/50'
                } p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg sm:shadow-xl md:shadow-2xl mb-6 md:mb-8`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                  <div className="flex items-center justify-center sm:justify-start">
                    <div className={`p-2 sm:p-3 bg-gradient-to-r ${
                      isAlreadyCompressed
                        ? 'from-blue-500 to-cyan-600'
                        : 'from-green-500 to-emerald-600'
                    } rounded-lg sm:rounded-xl shadow-lg`}>
                      {isAlreadyCompressed ? (
                        <CheckCircle className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8'} text-white`} />
                      ) : (
                        <CheckCircle className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8'} text-white`} />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-1 sm:mb-2">
                      {isAlreadyCompressed 
                        ? '📄 PDF Already Optimized'
                        : 'Compression Complete! 🎉'
                      }
                    </h2>
                    <p className={`font-medium text-sm sm:text-base ${
                      isAlreadyCompressed
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-green-700 dark:text-green-300'
                    }`}>
                      {isAlreadyCompressed 
                        ? `This PDF is already optimized. The file size cannot be reduced further.`
                        : `Successfully compressed PDF file`
                      }
                      {isTargetModeActive && ` to ${formatTargetSize()}`}
                    </p>
                    {totalOriginalSize > 0 && !isAlreadyCompressed && (
                      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-1">
                        Size reduced from {(totalOriginalSize / 1024 / 1024).toFixed(2)} MB to {(totalCompressedSize / 1024 / 1024).toFixed(2)} MB 
                        <span className="text-green-600 dark:text-green-400 font-bold ml-1">
                          ({compressionRatio}% smaller)
                        </span>
                        {isTargetModeActive && (
                          <span className="ml-2 text-blue-600 dark:text-blue-400">
                            🎯 Target: {formatTargetSize()}
                          </span>
                        )}
                      </p>
                    )}
                    {isAlreadyCompressed && (
                      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-1">
                        File size: {(totalOriginalSize / 1024 / 1024).toFixed(2)} MB ({Math.round(totalOriginalSize / 1024)} KB)
                        {isTargetModeActive && (
                          <span className="ml-2 text-yellow-600 dark:text-yellow-400">
                            ⚠️ File is already smaller than target
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-center mt-2 sm:mt-0">
                    <div className={`px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-gradient-to-r ${
                      isAlreadyCompressed
                        ? 'from-blue-500 to-cyan-600'
                        : 'from-green-500 to-emerald-600'
                    } text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base ${isMobile ? 'text-base px-4 py-2' : ''}`}>
                      1 PDF
                    </div>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 md:mb-8">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <FileDown className={`${isMobile ? 'w-4 h-4' : 'w-4 h-4 sm:w-5 sm:h-5'} text-blue-500`} />
                    {isAlreadyCompressed 
                      ? 'Original PDF (Already Optimized)'
                      : 'Compressed PDF'
                    }
                    {isMobile && (
                      <span className="text-xs text-blue-600 dark:text-blue-400 ml-2">
                        (Tap download below)
                      </span>
                    )}
                  </h3>

                  <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-3 sm:gap-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto p-3 sm:p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg sm:rounded-xl md:rounded-2xl border-2 ${
                    isAlreadyCompressed ? 'border-blue-100 dark:border-blue-800/30' : 'border-green-100 dark:border-green-800/30'
                  }`}>
                    {compressedFiles.map((item, index) => (
                      <div key={index} className="relative bg-white dark:bg-gray-800 rounded-xl p-4 border-2 ${
                        isAlreadyCompressed ? 'border-blue-200 dark:border-blue-700' : 'border-green-200 dark:border-green-700'
                      } shadow-md">
                        <div className="flex flex-col items-center text-center">
                          <div className={`w-20 h-24 mb-2 bg-gradient-to-br ${
                            isAlreadyCompressed
                              ? 'from-blue-500 to-cyan-600'
                              : 'from-green-500 to-emerald-600'
                          } rounded-lg flex items-center justify-center shadow-lg`}>
                            {isAlreadyCompressed ? (
                              <FileText className="w-10 h-10 text-white" />
                            ) : (
                              <FileDown className="w-10 h-10 text-white" />
                            )}
                            {isAlreadyCompressed && (
                              <div className="absolute top-1 right-1 bg-blue-400 rounded-full p-0.5">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs font-medium truncate w-full text-gray-900 dark:text-white max-w-[150px]">
                            {item.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
                              {(item.originalSize || 0) / 1024 / 1024 > 1 
                                ? `${((item.originalSize || 0) / 1024 / 1024).toFixed(2)} MB` 
                                : `${((item.originalSize || 0) / 1024).toFixed(1)} KB`}
                            </span>
                            <span className={`text-xs font-bold text-green-600 dark:text-green-400`}>
                              {item.compressedSize && item.compressedSize / 1024 / 1024 > 1 
                                ? `${(item.compressedSize / 1024 / 1024).toFixed(2)} MB` 
                                : item.compressedSize 
                                  ? `${(item.compressedSize / 1024).toFixed(1)} KB` 
                                  : '0 KB'}
                            </span>
                          </div>
                          {isAlreadyCompressed && (
                            <div className="mt-1 text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                              ✅ File is already optimized
                            </div>
                          )}
                          {isTargetModeActive && !isAlreadyCompressed && (
                            <div className="mt-1 text-[10px] text-blue-600 dark:text-blue-400">
                              🎯 Target: {formatTargetSize()}
                            </div>
                          )}
                          {isTargetModeActive && isAlreadyCompressed && (
                            <div className="mt-1 text-[10px] text-yellow-600 dark:text-yellow-400">
                              ⚠️ Already smaller than target
                            </div>
                          )}
                          <button
                            onClick={handleDownloadCompressedPdf}
                            className={`mt-2 px-4 py-2 bg-gradient-to-r ${
                              isAlreadyCompressed
                                ? 'from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700'
                                : 'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                            } text-white text-xs font-bold rounded-lg transition-colors shadow-lg flex items-center gap-1`}
                          >
                            <Download className="w-3.5 h-3.5" />
                            {isAlreadyCompressed ? 'Download Original' : 'Download'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownloadCompressedPdf}
                      className={`w-full py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 bg-gradient-to-r ${
                        isAlreadyCompressed
                          ? 'from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700'
                          : 'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                      } text-white font-bold sm:font-extrabold rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3 ${isMobile ? 'text-base py-3.5' : ''}`}
                    >
                      <FileDown className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6'}`} />
                      {isAlreadyCompressed 
                        ? 'Download Original PDF'
                        : 'Download Compressed PDF'
                      }
                      <Sparkles className={`${isMobile ? 'w-4 h-4' : 'w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5'}`} />
                    </motion.button>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={handleReset}
                      className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm md:text-base ${isMobile ? 'text-sm py-2.5' : ''}`}
                    >
                      <FileText className={`${isMobile ? 'w-3.5 h-3.5' : 'w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4'}`} />
                      {isAlreadyCompressed ? 'Upload Another PDF' : 'Compress Another PDF'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {(hasFiles || hasResults) && !hasError && (
              <div className="mt-6 sm:mt-10 md:mt-14">
                <div className="max-w-6xl mx-auto px-4">
                  <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'} gap-4 sm:gap-6`}>
                    {[
                      {
                        value: files.length,
                        label: "PDFs Uploaded",
                        color: "text-blue-600",
                        bg: "bg-blue-50 dark:bg-blue-900/10",
                      },
                      {
                        value: `${(totalSize / 1024 / 1024).toFixed(1)} MB`,
                        label: "Original Size",
                        color: "text-red-600",
                        bg: "bg-red-50 dark:bg-red-900/10",
                      },
                      {
                        value: hasResults ? `${(totalCompressedSize / 1024 / 1024).toFixed(1)} MB` : '—',
                        label: isAlreadyCompressed ? "Current Size" : "Compressed Size",
                        color: isAlreadyCompressed ? "text-blue-600" : "text-green-600",
                        bg: isAlreadyCompressed ? "bg-blue-50 dark:bg-blue-900/10" : "bg-green-50 dark:bg-green-900/10",
                      },
                      {
                        value: hasResults && !isAlreadyCompressed ? `${compressionRatio}%` : 
                               hasResults && isAlreadyCompressed ? 'Already optimized' :
                               '—',
                        label: isAlreadyCompressed ? "Status" : "Reduction",
                        color: isAlreadyCompressed ? "text-blue-600" : "text-cyan-600",
                        bg: isAlreadyCompressed ? "bg-blue-50 dark:bg-blue-900/10" : "bg-cyan-50 dark:bg-cyan-900/10",
                      },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className={`flex flex-col items-center justify-center
                        rounded-2xl border border-gray-200 dark:border-gray-800
                        ${stat.bg}
                        ${isMobile ? 'p-3' : 'p-4 sm:p-6'}
                        shadow-sm hover:shadow-lg
                        transition-all duration-300`}
                      >
                        <div
                          className={`${isMobile ? 'text-lg' : 'text-xl sm:text-2xl md:text-3xl xl:text-4xl'} font-extrabold
                          ${stat.color} dark:${stat.color.replace("600", "400")}`}
                        >
                          {stat.value}
                        </div>

                        <div className={`mt-1 ${isMobile ? 'text-[10px]' : 'text-xs sm:text-sm'} text-gray-600 dark:text-gray-400 font-medium`}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <section
              id="how-to-compress-pdf"
              className="mt-20 scroll-mt-24"
            >
              <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center mb-10`}>
                How to Compress PDF Online
              </h2>

              <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-5'}`}>
                {[
                  {
                    step: "1",
                    title: "Upload PDF File",
                    desc: `Upload a PDF file using drag & drop or file picker.`
                  },
                  {
                    step: "2",
                    title: "Choose Compression Mode",
                    desc: "Select 'Manual' to adjust compression level or 'Target Size' to set exact file size."
                  },
                  {
                    step: "3",
                    title: "Set Target Size (Optional)",
                    desc: "If using Target Size mode, enter desired file size (e.g., 50KB, 1MB)."
                  },
                  {
                    step: "4",
                    title: "Compress PDF",
                    desc: "Click the compress button to reduce PDF file size to your target."
                  },
                  {
                    step: "5",
                    title: "Download Result",
                    desc: "Download your compressed PDF file with the exact size you wanted."
                  }
                ].map((item, idx) => (
                  <div key={idx} className={`border rounded-xl p-6 text-center shadow-sm bg-white hover:shadow-md transition ${isMobile ? 'p-4' : ''}`}>
                    <div className="text-4xl font-bold text-blue-600 mb-2">{item.step}</div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="mb-6 md:mb-8 mt-12">
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <div>
                  <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 dark:text-white`}>
                    Explore All Tools
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                    10+ specialized PDF, image, and document tools
                  </p>
                </div>
              </div>

              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'} gap-4 md:gap-6`}>
                {exploreTools.slice(0, 8).map((tool, index) => (
                  <motion.a
                    key={tool.id}
                    href={tool.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="group bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-4 md:p-5 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-lg hover:shadow-2xl"
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div
                        className={`p-2 md:p-3 bg-gradient-to-br ${tool.color} rounded-lg md:rounded-xl shadow-lg`}
                      >
                        <span className={`${isMobile ? 'text-xl' : 'text-2xl'}`}>{tool.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold text-gray-900 dark:text-white ${isMobile ? 'text-base' : 'text-lg'} mb-1 md:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors`}>
                          {tool.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-3 md:mb-4">
                          {tool.description}
                        </p>
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium text-xs md:text-sm">
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
                  className="inline-flex items-center gap-2 m-4 px-4 py-2 md:px-5 md:py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all text-sm"
                >
                  <Grid className="w-4 h-4" />
                  <span>View All</span>
                </Link>
              </div>
            </div>

            <section className="max-w-3xl mx-auto my-16 px-4">
              <div className="text-center mb-8">
                <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900 dark:text-white mb-3`}>
                  Frequently Asked Questions
                </h2>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Everything you need to know about compressing PDF files
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    question: "Can I compress multiple PDF files at once?",
                    answer: `Yes! You can upload and compress multiple PDF files at the same time. There is no limit on the number of files you can process.`
                  },
                  {
                    question: "Is there any file size limit?",
                    answer: `No! There are no file size restrictions for compression. You can compress PDF files of any size on any device.`
                  },
                  {
                    question: "How does the Target Size feature work?",
                    answer: `The Target Size feature automatically adjusts compression settings to achieve your desired file size. The tool iteratively compresses pages and checks the resulting size until it reaches your target.`
                  },
                  {
                    question: "What's the difference between Manual and Target Size mode?",
                    answer: `Manual mode lets you set compression level from 10-100%. Target Size mode lets you specify exact file size (e.g., 50KB, 2MB) and the tool automatically finds the right compression settings.`
                  },
                  {
                    question: "How does PDF compression work?",
                    answer: `The tool converts each page of your PDF to an image (JPG or PNG), then rebuilds a new PDF from these images. This process significantly reduces file size by optimizing the images within the document.`
                  },
                  {
                    question: "Will the text remain searchable in the compressed PDF?",
                    answer: `No. Since the tool converts pages to images and rebuilds the PDF, the text will no longer be selectable or searchable. This is the trade-off for significant file size reduction.`
                  },
                  {
                    question: "Is the compression secure? Are my files uploaded to your servers?",
                    answer: `All compression happens directly in your browser (client-side). Your PDF files are never uploaded to any server, ensuring complete privacy and security.`
                  },
                  {
                    question: "Can I compress password-protected PDF files?",
                    answer: `Currently, we do not support password-protected PDF files. Please remove the password protection before compressing.`
                  },
                  {
                    question: "Is the PDF compressor on pdfswift free to use?",
                    answer: "Yes, the PDF compressor on pdfswift is completely free to use. You can compress PDF files online without any signup, subscription, or hidden charges.",
                  },
                  {
                    question: "Is it safe to compress PDF files on pdfswift?",
                    answer: "Yes, it is 100% safe and secure. All PDF compression on pdfswift happens directly in your browser. Your PDF files are never uploaded, stored, or shared on any server, ensuring complete privacy and data security.",
                  },
                  {
                    question: "Do I need to install software or create an account to use pdfswift?",
                    answer: "No installation or account creation is required. pdfswift works entirely online in your browser and is fully compatible with mobile, tablet, and desktop devices.",
                  }
                ].map((faq, index) => (
                  <details
                    key={index}
                    className="group border border-gray-200 dark:border-gray-700 rounded-lg p-4 
                    bg-white dark:bg-gray-800"
                  >
                    <summary className="cursor-pointer font-semibold text-base md:text-lg text-gray-900 dark:text-white">
                      {faq.question}
                    </summary>
                    <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </>
  );
}