"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Head from 'next/head';
import { motion, AnimatePresence } from "framer-motion";
import JSZip from "jszip";
import * as pdfjsLib from 'pdfjs-dist';
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
  id: "pdf-to-image",
  name: "PDF to Image",
  description: "Convert PDF pages to JPG or PNG images",
  category: "pdf",
  icon: "🖼️",
  color: "from-purple-500 to-pink-500",
  href: "/pdf-to-image",
  path: "/tools/pdf-to-image",
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

// --- Component Interface ---
interface ConvertedFile {
  blob: Blob;
  name: string;
  originalFile: File;
  timestamp: number;
  pageNumber: number;
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
}: {
  file: Blob | File;
  onRemove?: () => void;
  status: string;
  isDownloadable?: boolean;
  filename: string;
  index: number;
  onSingleDownload?: () => void;
  pageNumber?: number;
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
    status && status.includes("Converted")
      ? "text-green-600 dark:text-green-400"
      : "text-blue-600 dark:text-blue-400";

  // Improved download handler with mobile support
  const handleIndividualDownload = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    setDownloadSuccess(false);
    
    try {
      if (onSingleDownload) {
        onSingleDownload();
      } else if (file) {
        // For mobile devices, use a different approach if needed
        if (isMobile) {
          // Create a temporary anchor element for mobile
          const link = document.createElement('a');
          const url = URL.createObjectURL(file);
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          
          // Trigger download
          link.click();
          
          // Clean up
          setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }, 100);
        } else {
          // Desktop download
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

      {/* Preview Card - Mobile Optimized */}
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
          <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full z-10">
            Page {pageNumber || index + 1}
          </div>

          {/* Image Container */}
          <div
            className={`relative w-full ${isMobile ? 'h-28' : 'h-36'} mb-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden cursor-pointer group/image`}
            onClick={() => previewUrl && !error && setPreviewOpen(true)}
          >
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className={`animate-spin rounded-full border-b-2 border-purple-500 ${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`}></div>
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

                {/* Shine Effect */}
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

            <div className="flex items-center justify-between">
              <span
                className={`${isMobile ? 'text-[8px] px-2 py-0.5' : 'text-xs px-3 py-1'} rounded-full font-medium ${statusColor} bg-opacity-10 ${
                  status.includes("Converted") ? "bg-green-500" : "bg-purple-500"
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
          </div>

          {/* Action Buttons - Mobile Optimized */}
          <div className={`absolute top-2 right-2 flex gap-1.5 
            ${!isMobile ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'} 
            transition-opacity duration-300`}
          >
            {/* Remove Button (For Input Files) */}
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

            {/* Download Button (For Output Files) - Larger on Mobile */}
            {isDownloadable && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleIndividualDownload}
                disabled={isDownloading || !file}
                className={`relative ${isMobile ? 'p-2.5' : 'p-1.5'} 
                  ${downloadSuccess ? 'bg-green-500' : 'bg-green-500'} 
                  text-white rounded-full shadow-lg hover:bg-green-600 transition-colors
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

          {/* Mobile Download Success Toast */}
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
          ? 'from-purple-500 to-indigo-600' 
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
              : `${fileCount} PDF ${fileCount === 1 ? 'page' : 'pages'} converted to images`
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
export default function PdfToImage() {
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageBlobs, setImageBlobs] = useState<ConvertedFile[]>([]);
  const [showFeatures, setShowFeatures] = useState(true);
  const [downloadNotifications, setDownloadNotifications] = useState<
    DownloadNotification[]
  >([]);
  const [zipDownloading, setZipDownloading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [outputFormat, setOutputFormat] = useState<'jpg' | 'png'>('jpg');
  const [imageQuality, setImageQuality] = useState<number>(90);
  const [pageRange, setPageRange] = useState<{start: number, end: number}>({start: 1, end: 0});
  const [showPageRange, setShowPageRange] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pdfWorkerLoaded, setPdfWorkerLoaded] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Initialize pdf.js worker - use local worker
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      try {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
        setPdfWorkerLoaded(true);
        console.log('PDF worker initialized with local worker');
      } catch (error) {
        console.warn("Failed to set PDF.js worker source:", error);
      }
    }
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

  // Get total pages from PDF
  const getPdfPageCount = async (file: File): Promise<number> => {
    try {
      const pdfUrl = URL.createObjectURL(file);
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      const count = pdf.numPages;
      URL.revokeObjectURL(pdfUrl);
      return count;
    } catch (error) {
      console.error('Error getting page count:', error);
      return 0;
    }
  };

  // Handle file selection and get page counts
  const handleFilesSelected = async (newFiles: File[]) => {
    const maxSize = isMobile ? 30 * 1024 * 1024 : 200 * 1024 * 1024;
    const maxFiles = isMobile ? 10 : 50;
    
    const filteredFiles = newFiles.filter(file => {
      if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
        alert(`File "${file.name}" is not a PDF document.`);
        return false;
      }
      
      if (file.size === 0 || file.size > maxSize) {
        alert(`File "${file.name}" is too large (${(file.size/1024/1024).toFixed(1)}MB) or corrupted. Maximum size is ${isMobile ? '30MB' : '200MB'} for ${isMobile ? 'mobile' : 'desktop'}.`);
        return false;
      }
      return true;
    });
    
    const totalFiles = files.length + filteredFiles.length;
    if (totalFiles > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed for ${isMobile ? 'mobile' : 'desktop'} devices.`);
      return;
    }
    
    if (filteredFiles.length > 0) {
      setFiles((prev) => [...prev, ...filteredFiles]);
      setImageBlobs([]);
      setShowFeatures(false);
      
      // Get total pages for the first file (for page range feature)
      if (filteredFiles.length > 0) {
        const pages = await getPdfPageCount(filteredFiles[0]);
        setTotalPages(pages);
        setPageRange({start: 1, end: pages});
      }
    }
  };

  const convertPdfToImages = async (pdfFile: File): Promise<ConvertedFile[]> => {
    const convertedFiles: ConvertedFile[] = [];
    
    try {
      const pdfUrl = URL.createObjectURL(pdfFile);
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      const pageCount = pdf.numPages;
      
      if (pageCount === 0) {
        throw new Error('PDF has no pages');
      }
      
      // Determine which pages to convert
      let startPage = 1;
      let endPage = pageCount;
      
      if (showPageRange) {
        startPage = Math.max(1, pageRange.start);
        endPage = Math.min(pageCount, pageRange.end || pageCount);
      }
      
      // Update progress based on total pages
      const totalPagesToConvert = endPage - startPage + 1;
      
      for (let i = startPage; i <= endPage; i++) {
        try {
          const page = await pdf.getPage(i);
          const scale = 2.0; // 2x for high quality
          const viewport = page.getViewport({ scale });
          
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
          const quality = outputFormat === 'jpg' ? imageQuality / 100 : undefined;
          
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
          
          convertedFiles.push({
            blob,
            name: filename,
            originalFile: pdfFile,
            timestamp: Date.now(),
            pageNumber: i,
          });
          
          // Update progress
          const progressValue = ((i - startPage + 1) / totalPagesToConvert) * 100;
          setProgress(progressValue);
          
          canvas.width = 0;
          canvas.height = 0;
          
        } catch (pageError) {
          console.error(`Error rendering page ${i}:`, pageError);
        }
      }
      
      URL.revokeObjectURL(pdfUrl);
      
      if (convertedFiles.length === 0) {
        throw new Error('Failed to convert any pages from the PDF');
      }
      
      return convertedFiles;
      
    } catch (error) {
      console.error('PDF conversion error:', error);
      throw new Error(`Failed to convert PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleConvert = async () => {
    if (files.length === 0) return;

    if (!pdfWorkerLoaded) {
      alert('PDF worker is still loading. Please wait a moment and try again.');
      return;
    }

    setConverting(true);
    setProgress(0);
    setImageBlobs([]);
    setShowFeatures(false);

    try {
      let allConverted: ConvertedFile[] = [];
      let failedFiles: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        try {
          const file = files[i];
          
          if (file.size === 0 || file.size > (isMobile ? 30 * 1024 * 1024 : 200 * 1024 * 1024)) {
            failedFiles.push(`${file.name} (invalid size)`);
            continue;
          }
          
          const converted = await convertPdfToImages(file);
          allConverted = [...allConverted, ...converted];
          
        } catch (error: any) {
          console.error(`Error converting PDF ${i}:`, error);
          failedFiles.push(files[i].name);
        }
      }
      
      setImageBlobs(allConverted);
      
      if (failedFiles.length > 0) {
        const message = `Successfully converted ${allConverted.length > 0 ? 'some' : 'none'} of ${files.length} PDF files.\n\nFailed files (${failedFiles.length}):\n${failedFiles.slice(0, 3).join('\n')}${failedFiles.length > 3 ? `\n...and ${failedFiles.length - 3} more` : ''}`;
        alert(message);
      }
      
      if (allConverted.length === 0 && failedFiles.length > 0) {
        throw new Error('All PDF files failed to convert. Please check the files and try again.');
      }
      
    } catch (error: any) {
      console.error("Conversion error:", error);
      alert(error.message || "Failed to convert PDF to images. Please try again.");
    } finally {
      setConverting(false);
    }
  };

  const handleDownloadAllAsZip = async () => {
    if (imageBlobs.length === 0) return;

    setZipDownloading(true);
    try {
      const zip = new JSZip();
      
      imageBlobs.forEach((item) => {
        if (item.blob && item.blob.size > 0) {
          zip.file(item.name, item.blob);
        }
      });

      const zipBlob = await zip.generateAsync({ type: "blob" });
      
      const zipName = `pdf_images_${new Date().getTime()}.zip`;
      downloadFile(zipBlob, zipName);

      const notification: DownloadNotification = {
        id: Math.random().toString(36).substring(7),
        fileName: zipName,
        fileCount: imageBlobs.length,
        timestamp: new Date(),
        type: 'zip',
      };
      setDownloadNotifications((prev) => [...prev, notification]);

      setTimeout(() => {
        setDownloadNotifications((prev) =>
          prev.filter((n) => n.id !== notification.id)
        );
      }, 5000);
    } catch (error) {
      console.error("ZIP creation error:", error);
      alert("Failed to create ZIP archive. Please try again.");
    } finally {
      setZipDownloading(false);
    }
  };

  const handleDownloadAllSeparate = () => {
    imageBlobs.forEach((item) => {
      if (item.blob && item.blob.size > 0) {
        downloadFile(item.blob, item.name);
      }
    });

    const notification: DownloadNotification = {
      id: Math.random().toString(36).substring(7),
      fileName: imageBlobs.length === 1 ? imageBlobs[0].name : "Multiple files",
      fileCount: imageBlobs.length,
      timestamp: new Date(),
      type: imageBlobs.length === 1 ? 'single' : 'multi',
    };
    setDownloadNotifications((prev) => [...prev, notification]);

    setTimeout(() => {
      setDownloadNotifications((prev) =>
        prev.filter((n) => n.id !== notification.id)
      );
    }, 5000);
  };

  // Improved single download handler with mobile support
  const handleSingleDownload = (index: number) => {
    const item = imageBlobs[index];
    if (!item || !item.blob || item.blob.size === 0) {
      alert("Cannot download this file. It may be corrupted.");
      return;
    }

    // For mobile devices, use a more compatible approach
    if (isMobile) {
      try {
        const link = document.createElement('a');
        const url = URL.createObjectURL(item.blob);
        link.href = url;
        link.download = item.name;
        document.body.appendChild(link);
        link.click();
        
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 100);
      } catch (error) {
        console.error('Mobile download error:', error);
        // Fallback: Try opening in new tab
        const url = URL.createObjectURL(item.blob);
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    } else {
      // Desktop download
      downloadFile(item.blob, item.name);
    }

    const notification: DownloadNotification = {
      id: Math.random().toString(36).substring(7),
      fileName: item.name,
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
    setImageBlobs([]);
  };

  const handleReset = () => {
    setFiles([]);
    setImageBlobs([]);
    setProgress(0);
    setShowFeatures(true);
    setPageRange({start: 1, end: totalPages});
  };

  const hasFiles = files.length > 0;
  const hasResults = imageBlobs.length > 0;
  const isReadyToConvert = hasFiles && !hasResults && !converting && pdfWorkerLoaded;
  const totalSize = files.reduce((acc, file) => acc + file.size, 0);

  return (
    <>
      {/* SEO Schema */}
      <FAQSchema />
      <BreadcrumbSchema />
      <HowToSchema />
      <ArticleSchema />
      
      {/* Download Success Notifications */}
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

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 py-6 sm:py-8 md:py-12">
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
                className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-all font-medium group mb-3 sm:mb-6"
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
    bg-gradient-to-br from-green-500 to-emerald-500
    rounded-2xl md:rounded-3xl
    mb-3 md:mb-4 shadow-xl"
 >
  <span className="text-2xl md:text-3xl text-white select-none">
    {tool.icon}
  </span>
</motion.div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-2 sm:mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent px-2">
                  Convert PDF to JPG/PNG - Free, Fast & No Watermark | PDFSwift
                </h1>

                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
                  Convert your PDF pages to high-quality JPG or PNG images with
                  superior quality
                  <span className="block text-purple-600 dark:text-purple-400 font-medium mt-1 text-xs sm:text-sm md:text-base">
                    {isMobile ? "📱 Mobile: Up to 30MB per PDF" : "💻 Desktop: Up to 200MB per PDF"}
                  </span>
                </p>
              </div>
            </div>

            {/* --- Features Grid --- */}
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
                      icon: FileText,
                      title: "PDF to Image",
                      desc: isMobile 
                        ? "Convert PDF pages to images on mobile devices"
                        : "Convert PDF documents to high-quality images",
                      gradient: "from-purple-500 to-pink-600",
                      bg: "from-purple-50 to-pink-50",
                      border: "border-purple-200",
                    },
                    {
                      icon: Palette,
                      title: "Multiple Formats",
                      desc: "Choose between JPG (with adjustable quality) or PNG (lossless) output",
                      gradient: "from-blue-500 to-cyan-600",
                      bg: "from-blue-50 to-cyan-50",
                      border: "border-blue-200",
                    },
                    {
                      icon: Archive,
                      title: "ZIP Download",
                      desc: "Download all converted images in a single ZIP archive for easy organization",
                      gradient: "from-purple-500 to-indigo-600",
                      bg: "from-purple-50 to-indigo-50",
                      border: "border-purple-200",
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

            {/* --- Main Converter Card --- */}
            <div className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-lg sm:shadow-xl md:shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
              {/* Upload Section */}
              <div className="mb-4 sm:mb-6 md:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg sm:rounded-xl">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      Upload PDF Documents
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Select PDF files to convert to images
                      {isMobile && (
                        <span className="block text-purple-600 dark:text-purple-400 mt-1">
                          Max 30MB per file • 10 files max
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* FileUploader */}
                <div className="mb-6">
                  <FileUploader
                    accept="application/pdf"
                    multiple={true}
                    onFilesSelected={handleFilesSelected}
                    maxFiles={isMobile ? 10 : 50}
                    maxSize={isMobile ? 30 * 1024 * 1024 : 200 * 1024 * 1024}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                    {isMobile 
                      ? "For best results on mobile, use PDF files under 30MB"
                      : "Desktop browser recommended for files above 30MB"
                    }
                  </p>
                </div>

                {/* Format & Quality Selection */}
                {hasFiles && (
                  <div className="flex flex-wrap items-center gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Output Format:</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setOutputFormat('jpg')}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            outputFormat === 'jpg'
                              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          JPG
                        </button>
                        <button
                          onClick={() => setOutputFormat('png')}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            outputFormat === 'png'
                              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          PNG
                        </button>
                      </div>
                    </div>
                    
                    {outputFormat === 'jpg' && (
                      <div className="flex items-center gap-3 ml-auto">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quality:</span>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={imageQuality}
                          onChange={(e) => setImageQuality(parseInt(e.target.value))}
                          className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-purple-600"
                        />
                        <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 min-w-[2.5rem]">
                          {imageQuality}%
                        </span>
                      </div>
                    )}

                    {/* Page Range Toggle */}
                    <div className="flex items-center gap-3 ml-auto">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showPageRange}
                          onChange={(e) => setShowPageRange(e.target.checked)}
                          className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                        />
                        Custom Page Range
                      </label>
                    </div>
                  </div>
                )}

                {/* Page Range Inputs */}
                {hasFiles && showPageRange && (
                  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">From:</span>
                      <input
                        type="number"
                        min="1"
                        max={totalPages || 1}
                        value={pageRange.start}
                        onChange={(e) => setPageRange({...pageRange, start: parseInt(e.target.value) || 1})}
                        className="w-20 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">To:</span>
                      <input
                        type="number"
                        min="1"
                        max={totalPages || 1}
                        value={pageRange.end}
                        onChange={(e) => setPageRange({...pageRange, end: parseInt(e.target.value) || 1})}
                        className="w-20 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                      />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      (Total: {totalPages} pages)
                    </span>
                  </div>
                )}

                {/* PDF Worker Loading Status */}
                {!pdfWorkerLoaded && (
                  <div className="text-center p-2 text-amber-600 dark:text-amber-400 text-sm">
                    ⏳ Loading PDF renderer... Please wait.
                  </div>
                )}

                {hasFiles && (
                  <div className="text-center mb-6">
                    <div className="inline-flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg sm:rounded-full">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400" />
                        <span className="font-medium text-purple-700 dark:text-purple-300">
                          {files.length} PDF {files.length === 1 ? 'file' : 'files'} selected
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
                        <span>
                          • {(totalSize / 1024 / 1024).toFixed(2)} MB total
                        </span>
                        {isMobile && totalSize > 100 * 1024 * 1024 && (
                          <span className="text-red-600"> • Large files may cause issues on mobile</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* --- File Previews and Conversion Area --- */}
              {hasFiles && (
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                  {/* --- Input PDF Previews --- */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                        Uploaded PDF Files
                      </h3>
                      <button
                        onClick={handleReset}
                        className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg sm:rounded-xl transition-colors"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'} gap-3 sm:gap-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-950/20 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-gray-200 dark:border-gray-700`}>
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className={`relative bg-white dark:bg-gray-800 rounded-xl ${isMobile ? 'p-2' : 'p-4'} border-2 border-gray-200 dark:border-gray-700 shadow-md`}
                        >
                          <div className="flex flex-col items-center text-center">
                            <div className={`${isMobile ? 'w-12 h-16' : 'w-16 h-20'} mb-2 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg`}>
                              <FileText className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-white`} />
                            </div>
                            <p className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-medium truncate w-full text-gray-900 dark:text-white`}>
                              {file.name}
                            </p>
                            <p className={`${isMobile ? 'text-[8px]' : 'text-xs'} text-gray-500 dark:text-gray-400 mt-0.5`}>
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <button
                              onClick={() => handleRemoveFile(index)}
                              className={`mt-1.5 ${isMobile ? 'p-1.5' : 'p-1.5'} bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors`}
                            >
                              <XCircle className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* --- Progress and Action Buttons --- */}
                  <div className="space-y-4 sm:space-y-6">
                    {converting && (
                      <div className="space-y-3 sm:space-y-4">
                        <ProgressBar
                          progress={progress}
                          label={`Converting ${files.length} PDF ${files.length === 1 ? 'file' : 'files'}...`}
                        />
                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-purple-600 dark:text-purple-400">
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                          <span className="text-xs sm:text-sm font-medium">
                            {isMobile ? "Processing on mobile..." : "Processing your PDFs..."}
                          </span>
                        </div>
                        {isMobile && totalSize > 50 * 1024 * 1024 && (
                          <div className="text-center text-xs text-purple-600 dark:text-purple-400">
                            Large files may take longer on mobile devices
                          </div>
                        )}
                      </div>
                    )}

                    {isReadyToConvert && (
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleConvert}
                        className={`w-full py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3 ${isMobile ? 'text-base' : ''}`}
                      >
                        <FileImage className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6'}`} />
                        Convert {files.length} PDF to {outputFormat.toUpperCase()}
                        <Sparkles className={`${isMobile ? 'w-4 h-4' : 'w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5'}`} />
                      </motion.button>
                    )}

                    {hasFiles && !isReadyToConvert && !converting && !pdfWorkerLoaded && (
                      <div className="text-center text-amber-600 dark:text-amber-400 text-sm p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                        ⏳ PDF renderer is initializing. Please wait a moment...
                      </div>
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
                className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-2 border-purple-200 dark:border-purple-800/50 p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg sm:shadow-xl md:shadow-2xl mb-6 md:mb-8"
              >
                {/* Success Header */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                  <div className="flex items-center justify-center sm:justify-start">
                    <div className={`p-2 sm:p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg sm:rounded-xl shadow-lg`}>
                      <CheckCircle className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8'} text-white`} />
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-1 sm:mb-2">
                      Conversion Complete! 🎉
                    </h2>
                    <p className="text-purple-700 dark:text-purple-300 font-medium text-sm sm:text-base">
                      Successfully converted {imageBlobs.length} PDF pages to {outputFormat.toUpperCase()} images
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-1">
                      Choose your download option below
                    </p>
                  </div>
                  <div className="flex items-center justify-center mt-2 sm:mt-0">
                    <div className={`px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base ${isMobile ? 'text-base px-4 py-2' : ''}`}>
                      {imageBlobs.length} Pages
                    </div>
                  </div>
                </div>

                {/* --- Output Image Previews --- */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 md:mb-8">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Download className={`${isMobile ? 'w-4 h-4' : 'w-4 h-4 sm:w-5 sm:h-5'} text-purple-500`} />
                    Converted {outputFormat.toUpperCase()} Images
                    {isMobile && (
                      <span className="text-xs text-blue-600 dark:text-blue-400 ml-2">
                        (Tap download icon below)
                      </span>
                    )}
                  </h3>

                  <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'} gap-3 sm:gap-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto p-3 sm:p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-purple-100 dark:border-purple-800/30`}>
                    {imageBlobs.map((item, index) => (
                      <ImagePreview
                        key={index}
                        file={item.blob}
                        filename={item.name}
                        status="Converted ✓"
                        isDownloadable={true}
                        index={index}
                        pageNumber={item.pageNumber}
                        onSingleDownload={() => handleSingleDownload(index)}
                      />
                    ))}
                  </div>
                </div>

                {/* --- Download Options Section --- */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Download as ZIP Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownloadAllAsZip}
                      disabled={zipDownloading}
                      className={`w-full py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold sm:font-extrabold rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3 ${
                        zipDownloading ? 'opacity-75 cursor-not-allowed' : ''
                      } ${isMobile ? 'text-base py-3.5' : ''}`}
                    >
                      {zipDownloading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                          Creating ZIP...
                        </>
                      ) : (
                        <>
                          <Archive className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6'}`} />
                          Download as ZIP Archive ({imageBlobs.length} images)
                          <FolderClosed className={`${isMobile ? 'w-4 h-4' : 'w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5'}`} />
                        </>
                      )}
                    </motion.button>

                    {/* Download All Separately Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownloadAllSeparate}
                      className={`w-full py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold sm:font-extrabold rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3 ${isMobile ? 'text-base py-3.5' : ''}`}
                    >
                      <Download className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6'}`} />
                      Download All {imageBlobs.length} Images Separately
                      <Sparkles className={`${isMobile ? 'w-4 h-4' : 'w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5'}`} />
                    </motion.button>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={handleReset}
                      className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium hover:bg-purple-50 dark:hover:bg-purple-950/30 rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm md:text-base ${isMobile ? 'text-sm py-2.5' : ''}`}
                    >
                      <FileText className={`${isMobile ? 'w-3.5 h-3.5' : 'w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4'}`} />
                      Convert More PDFs
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- Stats Footer --- */}
            {(hasFiles || hasResults) && (
              <div className="mt-6 sm:mt-10 md:mt-14">
                <div className="max-w-6xl mx-auto px-4">
                  <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'} gap-4 sm:gap-6`}>
                    {[
                      {
                        value: files.length,
                        label: "PDFs Uploaded",
                        color: "text-purple-600",
                        bg: "bg-purple-50 dark:bg-purple-900/10",
                      },
                      {
                        value: `${(totalSize / 1024 / 1024).toFixed(1)} MB`,
                        label: "Total Size",
                        color: "text-blue-600",
                        bg: "bg-blue-50 dark:bg-blue-900/10",
                      },
                      {
                        value: imageBlobs.length,
                        label: "Pages Converted",
                        color: "text-green-600",
                        bg: "bg-green-50 dark:bg-green-900/10",
                      },
                      {
                        value: outputFormat.toUpperCase(),
                        label: "Output Format",
                        color: "text-pink-600",
                        bg: "bg-pink-50 dark:bg-pink-900/10",
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

            {/* How To Section */}
            <section
              id="how-to-pdf-to-image"
              className="mt-20 scroll-mt-24"
            >
              <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center mb-10`}>
                How to Convert PDF to {outputFormat.toUpperCase()} Online
              </h2>

              <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-5'}`}>
                {[
                  {
                    step: "1",
                    title: "Upload PDF Files",
                    desc: `Upload PDF files (${isMobile ? "max 30MB" : "up to 200MB"}) using drag & drop or file picker.`
                  },
                  {
                    step: "2",
                    title: "Choose Format & Quality",
                    desc: "Select JPG or PNG output format and adjust quality for JPG."
                  },
                  {
                    step: "3",
                    title: "Convert PDF to Images",
                    desc: "Click the convert button to transform PDF pages into images."
                  },
                  {
                    step: "4",
                    title: "Preview Results",
                    desc: "Preview converted images with page numbers."
                  },
                  {
                    step: "5",
                    title: "Download Images",
                    desc: isMobile ? "Tap the download icon on each image or use the bulk download options below." : "Download images individually or as a single ZIP archive."
                  }
                ].map((item, idx) => (
                  <div key={idx} className={`border rounded-xl p-6 text-center shadow-sm bg-white hover:shadow-md transition ${isMobile ? 'p-4' : ''}`}>
                    <div className="text-4xl font-bold text-purple-600 mb-2">{item.step}</div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Explore All Tools Section */}
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
                    className="group bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-4 md:p-5 hover:border-purple-300 dark:hover:border-purple-700 transition-all shadow-lg hover:shadow-2xl"
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div
                        className={`p-2 md:p-3 bg-gradient-to-br ${tool.color} rounded-lg md:rounded-xl shadow-lg`}
                      >
                        <span className={`${isMobile ? 'text-xl' : 'text-2xl'}`}>{tool.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold text-gray-900 dark:text-white ${isMobile ? 'text-base' : 'text-lg'} mb-1 md:mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors`}>
                          {tool.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-3 md:mb-4">
                          {tool.description}
                        </p>
                        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium text-xs md:text-sm">
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
                  className="inline-flex items-center gap-2 m-4 px-4 py-2 md:px-5 md:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all text-sm"
                >
                  <Grid className="w-4 h-4" />
                  <span>View All</span>
                </Link>
              </div>
            </div>

            {/* FAQ Section */}
            <section className="max-w-3xl mx-auto my-16 px-4">
              <div className="text-center mb-8">
                <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900 dark:text-white mb-3`}>
                  Frequently Asked Questions
                </h2>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Everything you need to know about converting PDF files to images
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    question: "What is the maximum file size for conversion?",
                    answer: `For mobile devices: Maximum 35MB per PDF file. For desktop browsers: Up to 200MB per PDF file. We recommend using desktop browsers for files larger than 30MB.`
                  },
                  {
                    question: "Is there any limit on the number of PDF files I can convert at once?",
                    answer: `Mobile: Up to 10 files at once. Desktop: Up to 50 files at once. For best performance, convert files in batches if you have many large files.`
                  },
                  {
                    question: "What image formats are available for output?",
                    answer: `You can choose between JPG (with adjustable quality from 10% to 100%) and PNG (lossless format). JPG files are smaller in size, while PNG files preserve transparency and have better quality.`
                  },
                  {
                    question: "Can I convert password-protected PDF files?",
                    answer: `Currently, we do not support password-protected PDF files. Please remove the password protection before converting to images.`
                  },
                  {
                    question: "How do I download converted images?",
                    answer: isMobile 
                      ? `On mobile: Tap the download icon (↓) on each image to download individually. You can also use the "Download as ZIP Archive" button for bulk download.`
                      : `You can download images individually by clicking the download button on each image, or download all images at once as a ZIP archive using the "Download as ZIP Archive" button.`
                  },
                  {
                    question: "Is the conversion secure? Are my files uploaded to your servers?",
                    answer: `All conversion happens directly in your browser (client-side). Your PDF files are never uploaded to any server, ensuring complete privacy and security.`
                  },
                  {
                    question: "What quality settings are available?",
                    answer: `For JPG output, you can adjust quality from 10% (smallest file size, lower quality) to 100% (largest file size, best quality). PNG output uses lossless compression with no quality loss.`
                  },
                  {
                    question: "Is the PDF to JPG converter on pdfswift free to use?",
                    answer: "Yes, the PDF to JPG converter on pdfswift is completely free to use. You can convert PDF files to JPG images online without any signup, subscription, or hidden charges.",
                  },
                  {
                    question: "Is it safe to convert PDF files to JPG on pdfswift?",
                    answer: "Yes, it is 100% safe and secure. All PDF to JPG conversions on pdfswift happen directly in your browser. Your PDF files are never uploaded, stored, or shared on any server, ensuring complete privacy and data security.",
                  },
                  {
                    question: "Will converting PDF to JPG reduce image quality?",
                    answer: "No, pdfswift preserves the original quality of your PDF pages while converting them to JPG images. Text clarity, colors, and resolution remain sharp and accurate in the output images.",
                  },
                  {
                    question: "Can I convert all pages of a PDF into JPG images?",
                    answer: "Yes, you can convert all pages of a PDF into individual JPG images or select specific pages only. Each page is converted into a high-quality JPG file for easy viewing and sharing.",
                  },
                  {
                    question: "Can I download PDF pages as separate JPG files?",
                    answer: "Yes, each PDF page is converted into a separate JPG image. You can download them individually or as a ZIP file for convenience.",
                  },
                  {
                    question: "Are the converted JPG images watermarked?",
                    answer: "No, pdfswift does not add any watermarks, logos, or branding to the converted JPG images. All output files are clean and fully owned by you.",
                  },
                  {
                    question: "How fast is the PDF to JPG conversion process?",
                    answer: "The PDF to JPG conversion is very fast because it runs directly in your browser. Most PDFs are converted within seconds, depending on file size and the number of pages.",
                  },
                  {
                    question: "Do I need to install software or create an account to use pdfswift?",
                    answer: "No installation or account creation is required. pdfswift works entirely online in your browser and is fully compatible with mobile, tablet, and desktop devices.",
                  },
                  {
                    question: "What happens to text and fonts in the PDF?",
                    answer: `All text, fonts, and images from the PDF are rendered as images. The text will no longer be selectable or searchable after conversion, which is why this is called PDF to Image conversion.`
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