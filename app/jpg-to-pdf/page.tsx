"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import FAQSchema from "./FAQSchema";
import { faqData } from "./faqData";

import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  ArrowLeft,
  RotateCw,
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
  Sliders,
  Contrast,
  Droplet,
  Sun,
  Thermometer,
  Scan,
  Filter,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  Crop,
  Circle,
  Square,
  Heart,
  Star,
  Coffee,
  Cloud,
  Sunset,
  Moon,
  Snowflake,
  Waves,
  Zap as ZapIcon,
  Volume2,
  VolumeX,
  Camera,
  RefreshCw,
  Save,
  Undo,
  Redo,
  Maximize,
  Minimize,
  Move,
  PenTool,
  Type,
  Eraser,
  CircleDot,
  File,
  FileImage,
  FileText,
  FilePlus,
  Maximize2,
  Minimize2,
  AlignCenter,
  AlignLeft,
  AlignRight,
  AlignVerticalJustifyCenter,
  AlignHorizontalJustifyCenter,
  Trash2,
  GripVertical,
  Expand,
  Shrink,
  ArrowUpDown,
  ArrowDownUp,
  Repeat,
  MoveVertical,
  MoveHorizontal,
  MousePointerClick,
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

// --- Types ---
interface ProcessedImage {
  id: string;
  blob: Blob;
  name: string;
  originalFile: File;
  timestamp: number;
  originalSize: number;
  processedSize: number;
  previewUrl: string;
  pageNumber?: number;
  pdfName?: string;
  rotation?: number;
}

interface DownloadNotification {
  id: string;
  fileName: string;
  fileCount: number;
  timestamp: Date;
  isSinglePdf?: boolean;
  isZip?: boolean;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  href: string;
  path: string;
}

// --- Page Size Options ---
interface PageSize {
  id: string;
  name: string;
  width: number;
  height: number;
  unit: "mm" | "in" | "px";
}

const PAGE_SIZES: PageSize[] = [
  { id: "a4", name: "A4", width: 210, height: 297, unit: "mm" },
  { id: "a3", name: "A3", width: 297, height: 420, unit: "mm" },
  { id: "letter", name: "Letter", width: 215.9, height: 279.4, unit: "mm" },
  { id: "legal", name: "Legal", width: 215.9, height: 355.6, unit: "mm" },
];

// --- Orientation Options ---
type Orientation = "portrait" | "landscape";

// --- Quality Settings ---
type QualityPreset = "high" | "medium" | "low";

// --- Margin Presets ---
interface MarginPreset {
  id: string;
  name: string;
  top: number;
  bottom: number;
  left: number;
  right: number;
  unit: "mm";
}

const MARGIN_PRESETS: MarginPreset[] = [
  { id: "none", name: "None", top: 0, bottom: 0, left: 0, right: 0, unit: "mm" },
  { id: "small", name: "Small", top: 5, bottom: 5, left: 5, right: 5, unit: "mm" },
  { id: "normal", name: "Normal", top: 10, bottom: 10, left: 10, right: 10, unit: "mm" },
  { id: "large", name: "Large", top: 20, bottom: 20, left: 20, right: 20, unit: "mm" },
];

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

// --- PDF Preview Component (Mobile Disabled) ---
const PdfPreview = ({
  file,
  filename,
  onDownload,
}: {
  file: Blob | File;
  filename: string;
  onDownload?: () => void;
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      return () => {
        if (url) URL.revokeObjectURL(url);
      };
    }
  }, [file]);

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handlePreviewClick = () => {
    if (isMobile) {
      alert("PDF preview is not available on mobile devices. Please download the file to view it.");
      return;
    }
    setPreviewOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {previewOpen && pdfUrl && !isMobile && (
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
              className="relative w-full max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -top-12 right-0 z-50 flex gap-2">
                {onDownload && (
                  <button
                    onClick={onDownload}
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                  >
                    <Download className="w-6 h-6" />
                  </button>
                )}
                <button
                  onClick={() => setPreviewOpen(false)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                    {filename}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <iframe
                  src={pdfUrl}
                  className="w-full h-[80vh]"
                  title={`PDF Preview: ${filename}`}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -5, scale: 1.02 }}
        className="relative group"
      >
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300">
          <div
            className={`relative w-full h-48 mb-4 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 rounded-xl overflow-hidden flex items-center justify-center ${
              !isMobile ? 'cursor-pointer group/pdf' : 'cursor-default'
            }`}
            onClick={handlePreviewClick}
          >
            <div className="text-center p-4">
              <File className="w-16 h-16 text-red-500 mx-auto mb-3" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[200px] mx-auto">
                  {filename}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatFileSize(file.size)}
                </p>
                <p className="text-xs text-red-500 font-medium">PDF Document</p>
                {isMobile && (
                  <p className="text-xs text-amber-500 font-medium mt-1">
                    📱 Tap to download
                  </p>
                )}
              </div>
            </div>
            {!isMobile && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/pdf:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Eye className="w-8 h-8 text-white" />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
              {formatFileSize(file.size)}
            </span>
            <button
              onClick={onDownload}
              className="p-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:from-red-600 hover:to-pink-700 transition-colors shadow-lg hover:shadow-xl"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

// --- Full Screen Image Preview Component with Rotation Support ---
const FullScreenImagePreview = ({
  previewUrl,
  filename,
  onClose,
  rotation = 0,
}: {
  previewUrl: string;
  filename: string;
  onClose: () => void;
  rotation?: number;
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative max-w-7xl max-h-[95vh] w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 bg-red-500 hover:bg-red-600 text-white p-2 sm:p-3 rounded-full transition-colors shadow-lg flex items-center gap-2"
        >
          <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-xs sm:text-sm hidden sm:inline">Close</span>
          <span className="text-xs sm:hidden">✕</span>
        </button>

        <div className="bg-black/50 rounded-xl overflow-hidden shadow-2xl w-full h-full flex items-center justify-center">
          <img
            src={previewUrl}
            alt={filename}
            className="max-w-full max-h-full object-contain"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[90%]">
          {filename} {rotation !== 0 && `• Rotated ${rotation}°`}
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Image Preview Component ---
const ImagePreview = ({
  file,
  onRemove,
  status,
  isDownloadable = false,
  filename = "image.jpg",
  index,
  originalSize,
  processedSize,
  isPdf = false,
  pageNumber,
  pdfName,
  onDownloadPdf,
  dragHandleProps,
  rotation = 0,
  onRotate,
  onReplace,
  onMoveUp,
  onMoveDown,
  onSwap,
  canMoveUp,
  canMoveDown,
  totalImages,
  isSelected = false,
  onSelect,
  showRotationControls = true,
  onRotateCounterClockwise,
  onRotateClockwise,
}: {
  file: Blob | File;
  onRemove?: () => void;
  status: string;
  isDownloadable?: boolean;
  filename: string;
  index: number;
  originalSize?: number;
  processedSize?: number;
  isPdf?: boolean;
  pageNumber?: number;
  pdfName?: string;
  onDownloadPdf?: () => void;
  dragHandleProps?: any;
  rotation?: number;
  onRotate?: () => void;
  onRotateCounterClockwise?: () => void;
  onRotateClockwise?: () => void;
  onReplace?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onSwap?: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  totalImages?: number;
  isSelected?: boolean;
  onSelect?: () => void;
  showRotationControls?: boolean;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isPdfFile, setIsPdfFile] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapTarget, setSwapTarget] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;
      setIsMobileDevice(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const isPdfByType = file.type === "application/pdf";
    const isPdfByExtension = filename.toLowerCase().endsWith('.pdf');
    const isPdfByFlag = isPdf === true;
    
    if (isPdfByType || isPdfByExtension || isPdfByFlag) {
      setIsPdfFile(true);
      setLoading(false);
      return;
    }

    if (!file) {
      setError(true);
      setLoading(false);
      return;
    }

    let url: string | null = null;
    let img: HTMLImageElement | null = null;
    let timeoutId: NodeJS.Timeout;

    try {
      url = URL.createObjectURL(file);
      setPreviewUrl(url);

      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;

      const timeoutDuration = isMobile ? 3000 : 5000;

      img = new Image();
      img.onload = () => {
        clearTimeout(timeoutId);
        setLoading(false);
        setError(false);
      };
      img.onerror = () => {
        clearTimeout(timeoutId);
        setError(true);
        setLoading(false);
        if (process.env.NODE_ENV === "development") {
          console.warn("Failed to load image:", filename);
        }
      };

      timeoutId = setTimeout(() => {
        if (loading) {
          setError(true);
          setLoading(false);
          if (img) {
            img.onload = null;
            img.onerror = null;
          }
        }
      }, timeoutDuration);

      if (img) img.src = url;

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
  }, [file, filename, loading, isPdf]);

  const statusColor =
    status && status.includes("Ready")
      ? "text-green-600 dark:text-green-400"
      : "text-blue-600 dark:text-blue-400";

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const handleImageError = () => {
    setError(true);
  };

  if (isPdfFile) {
    return (
      <PdfPreview
        file={file}
        filename={filename}
        onDownload={onDownloadPdf}
      />
    );
  }

  const handleImageClick = () => {
    if (previewUrl && !error) {
      setFullScreenOpen(true);
    }
  };

  const handleFullScreenClose = () => {
    setFullScreenOpen(false);
  };

  const getTransformStyle = () => {
    return `rotate(${rotation}deg)`;
  };

  const handleSwapClick = () => {
    if (totalImages && totalImages > 1) {
      setShowSwapModal(true);
    }
  };

  const handleSwapConfirm = () => {
    if (swapTarget !== null && onSwap) {
      onSwap();
      setShowSwapModal(false);
      setSwapTarget(null);
    }
  };

  const handleSwapCancel = () => {
    setShowSwapModal(false);
    setSwapTarget(null);
  };

  return (
    <>
      {fullScreenOpen && previewUrl && !error && (
        <FullScreenImagePreview
          previewUrl={previewUrl}
          filename={filename}
          onClose={handleFullScreenClose}
          rotation={rotation}
        />
      )}

      {showSwapModal && totalImages && totalImages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/70 flex items-center justify-center p-4"
          onClick={handleSwapCancel}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Repeat className="w-5 h-5 text-blue-500" />
              Swap Pages
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Swap page #{index + 1} with which page?
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto mb-4">
              {Array.from({ length: totalImages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setSwapTarget(i)}
                  className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                    swapTarget === i
                      ? "bg-blue-500 text-white"
                      : i === index
                      ? "bg-green-100 dark:bg-green-900/30 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  disabled={i === index}
                >
                  #{i + 1}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSwapCancel}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSwapConfirm}
                disabled={swapTarget === null || swapTarget === index}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  swapTarget !== null && swapTarget !== index
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                }`}
              >
                Swap
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ y: -5, scale: 1.02 }}
        className="relative group"
      >
        <div className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 border-2 ${isSelected ? 'border-blue-500 ring-2 ring-blue-400' : 'border-gray-200 dark:border-gray-700'} shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden`}>
          <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
            #{index + 1}
            {isPdf && pageNumber && ` (Pg ${pageNumber})`}
            {isPdf && pdfName && ` - ${pdfName.substring(0, 15)}${pdfName.length > 15 ? "..." : ""}`}
          </div>

          {isSelected && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 animate-pulse">
              Selected
            </div>
          )}

          {dragHandleProps && (
            <div 
              {...dragHandleProps}
              className="absolute top-3 left-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            >
              <GripVertical className="w-4 h-4 text-gray-400" />
            </div>
          )}

          <div
            className={`relative w-full h-36 mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden cursor-pointer group/image`}
            onClick={handleImageClick}
          >
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : error || !previewUrl ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
                {isPdf ? (
                  <File className="w-10 h-10 text-red-400 mb-2" />
                ) : (
                  <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
                )}
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {isPdf ? "PDF Page" : "Preview not available"}
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
                  className="w-full h-full object-cover transition-transform duration-500"
                  style={{ transform: getTransformStyle() }}
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <Eye className="w-8 h-8 text-white" />
                  <Expand className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/image:translate-x-full transition-transform duration-1000" />
                {rotation !== 0 && (
                  <div className="absolute top-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                    {rotation}°
                  </div>
                )}
              </>
            )}
          </div>

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
                  status.includes("Ready") ? "bg-green-500" : "bg-blue-500"
                }`}
              >
                {status}
              </span>

              {originalSize && processedSize ? (
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(processedSize)}
                  </span>
                  {processedSize < originalSize && (
                    <span className="text-xs text-green-600 dark:text-green-400 font-bold">
                      {((1 - processedSize / originalSize) * 100).toFixed(1)}% smaller
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

          {(onRotateCounterClockwise || onRotateClockwise || onRotate || onReplace || onMoveUp || onMoveDown || onSwap || onSelect) && (
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-lg p-1 flex-wrap">
              {onSelect && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect();
                  }}
                  className={`p-1.5 ${isSelected ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded hover:bg-blue-600 transition-colors text-xs`}
                  title={isSelected ? "Deselect" : "Select to swap"}
                >
                  <MousePointerClick className="w-3 h-3" />
                </button>
              )}
              {onMoveUp && canMoveUp && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveUp();
                  }}
                  className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-xs"
                  title="Move Up"
                >
                  ↑
                </button>
              )}
              {onMoveDown && canMoveDown && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveDown();
                  }}
                  className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-xs"
                  title="Move Down"
                >
                  ↓
                </button>
              )}
              {onSwap && totalImages && totalImages > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSwap();
                  }}
                  className="p-1.5 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-xs"
                  title="Swap with another page"
                >
                  <Repeat className="w-3 h-3" />
                </button>
              )}
              {showRotationControls && onRotateCounterClockwise && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRotateCounterClockwise();
                  }}
                  className="p-1.5 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors text-xs"
                  title="Rotate 90° Counter-Clockwise"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
              {showRotationControls && onRotateClockwise && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRotateClockwise();
                  }}
                  className="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-xs"
                  title="Rotate 90° Clockwise"
                >
                  <RotateCw className="w-3 h-3" />
                </button>
              )}
              {onReplace && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onReplace();
                  }}
                  className="p-1.5 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors text-xs"
                  title="Replace Image"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              )}
              <span className="text-white text-[10px] ml-1">
                {rotation !== 0 && `${rotation}°`}
              </span>
            </div>
          )}

          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {onRemove && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onRemove}
                className="p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                aria-label={`Remove ${filename}`}
              >
                <XCircle className="w-4 h-4" />
              </motion.button>
            )}

            {isDownloadable && onDownloadPdf && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onDownloadPdf}
                className="p-1.5 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
                title="Download as PDF"
              >
                <File className="w-4 h-4" />
              </motion.button>
            )}
          </div>

          {isMobileDevice && (
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] text-gray-400 opacity-50 group-hover:opacity-100 transition-opacity">
              Tap to view
            </div>
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
  isSinglePdf = false,
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
          : isSinglePdf
          ? "from-red-500 to-pink-600"
          : "from-green-500 to-emerald-600"
      } text-white p-4 rounded-xl shadow-lg mb-2`}
    >
      <div className="flex items-start gap-3">
        {isZip ? (
          <FolderArchive className="w-5 h-5 mt-0.5 flex-shrink-0" />
        ) : isSinglePdf ? (
          <File className="w-5 h-5 mt-0.5 flex-shrink-0" />
        ) : (
          <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm mb-1">
            {isZip ? (
              <>
                {fileCount > 1
                  ? `${fileCount} PDFs Downloaded as ZIP! 📦`
                  : "PDF Downloaded as ZIP! 📦"}
              </>
            ) : isSinglePdf ? (
              <>
                {fileCount > 1
                  ? `${fileCount} Pages Combined into Single PDF! 📄`
                  : "PDF Downloaded Successfully! 📄"}
              </>
            ) : (
              <>
                {fileCount > 1
                  ? `${fileCount} Files Downloaded! 🎉`
                  : "File Downloaded Successfully! 🎉"}
              </>
            )}
          </h4>
          {fileCount === 1 && !isZip && !isSinglePdf && (
            <p className="text-xs opacity-90 truncate mb-1">{fileName}</p>
          )}
          <p className="text-xs opacity-80 mb-2">
            {isZip
              ? `All ${fileCount} PDFs in ZIP archive`
              : isSinglePdf
              ? `All ${fileCount} pages combined into one PDF`
              : fileCount > 1
              ? `${fileCount} images processed`
              : "Image successfully processed"}
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
export default function ImageToPdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [showFeatures, setShowFeatures] = useState(true);
  const [downloadNotifications, setDownloadNotifications] = useState<
    DownloadNotification[]
  >([]);
  const [creatingZip, setCreatingZip] = useState(false);
  const [creatingSinglePdf, setCreatingSinglePdf] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [imageStates, setImageStates] = useState<Map<number, { rotation: number }>>(new Map());
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // --- PDF Settings State ---
  const [selectedPageSize, setSelectedPageSize] = useState<string>("a4");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [qualityPreset, setQualityPreset] = useState<QualityPreset>("high");
  const [selectedMargin, setSelectedMargin] = useState<string>("normal");
  const [customMargin, setCustomMargin] = useState({ top: 10, bottom: 10, left: 10, right: 10 });
  const [useCustomMargin, setUseCustomMargin] = useState(false);
  const [reverseOrder, setReverseOrder] = useState(false);
  const [showSettings, setShowSettings] = useState(true);

  // Detect device type
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-scroll notifications
  useEffect(() => {
    if (notificationsRef.current && downloadNotifications.length > 0) {
      notificationsRef.current.scrollTop = notificationsRef.current.scrollHeight;
    }
  }, [downloadNotifications]);

  // Get current page size
  const getPageSize = useCallback(() => {
    const size = PAGE_SIZES.find(s => s.id === selectedPageSize);
    if (!size) return PAGE_SIZES[0];
    
    if (orientation === "landscape") {
      return { ...size, width: size.height, height: size.width };
    }
    return size;
  }, [selectedPageSize, orientation]);

  // Get margin values
  const getMarginValues = useCallback(() => {
    if (useCustomMargin) {
      return customMargin;
    }
    const preset = MARGIN_PRESETS.find(m => m.id === selectedMargin);
    return preset ? { top: preset.top, bottom: preset.bottom, left: preset.left, right: preset.right } : MARGIN_PRESETS[2];
  }, [selectedMargin, useCustomMargin, customMargin]);

  // Convert mm to points (1 mm = 2.83465 points)
  const mmToPoints = (mm: number) => mm * 2.83465;

  // Helper function to safely embed images
  const safelyEmbedImage = async (pdfDoc: any, imageBlob: Blob, filename: string) => {
    try {
      const imageArrayBuffer = await imageBlob.arrayBuffer();
      
      const uint8Array = new Uint8Array(imageArrayBuffer);
      const isJpeg = uint8Array[0] === 0xFF && uint8Array[1] === 0xD8;
      const isPng = uint8Array[0] === 0x89 && uint8Array[1] === 0x50 && 
                    uint8Array[2] === 0x4E && uint8Array[3] === 0x47;
      
      if (isPng) {
        return await pdfDoc.embedPng(imageArrayBuffer);
      } else if (isJpeg) {
        return await pdfDoc.embedJpg(imageArrayBuffer);
      } else {
        try {
          return await pdfDoc.embedJpg(imageArrayBuffer);
        } catch (jpgError) {
          try {
            return await pdfDoc.embedPng(imageArrayBuffer);
          } catch (pngError) {
            const img = new Image();
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            return new Promise((resolve, reject) => {
              const url = URL.createObjectURL(imageBlob);
              img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);
                canvas.toBlob(async (blob) => {
                  if (blob) {
                    const buffer = await blob.arrayBuffer();
                    try {
                      const embedded = await pdfDoc.embedJpg(buffer);
                      resolve(embedded);
                    } catch (e) {
                      try {
                        const embedded = await pdfDoc.embedPng(buffer);
                        resolve(embedded);
                      } catch (e2) {
                        reject(new Error(`Cannot embed image: ${filename}`));
                      }
                    }
                  } else {
                    reject(new Error(`Cannot convert image: ${filename}`));
                  }
                  URL.revokeObjectURL(url);
                }, 'image/jpeg', 0.92);
              };
              img.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error(`Cannot load image: ${filename}`));
              };
              img.src = url;
            });
          }
        }
      }
    } catch (error) {
      console.error('Error in safelyEmbedImage:', error);
      throw error;
    }
  };

  // --- Process image blob: rotate (if needed) and compress as JPEG with quality ---
  const processImageBlob = async (blob: Blob, rotation: number, quality: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(blob);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        let width = img.width, height = img.height;
        if (rotation === 90 || rotation === 270) {
          canvas.width = height;
          canvas.height = width;
        } else {
          canvas.width = width;
          canvas.height = height;
        }
        ctx?.translate(canvas.width / 2, canvas.height / 2);
        ctx?.rotate((rotation * Math.PI) / 180);
        ctx?.drawImage(img, -width / 2, -height / 2, width, height);
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Processing failed'));
          URL.revokeObjectURL(url);
        }, 'image/jpeg', quality);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load image for processing'));
      };
      img.src = url;
    });
  };

  // --- Convert image to PDF (rotation and compression handled) ---
  const convertImageToPdfWithSettings = async (
    imageBlob: Blob,
    filename: string,
    index: number,
    total: number,
    rotation: number = 0,
    quality: number = 0.92
  ): Promise<Blob> => {
    const { PDFDocument } = await import('pdf-lib');
    const pdfDoc = await PDFDocument.create();

    const pageSize = getPageSize();
    const margin = getMarginValues();

    const pageWidth = mmToPoints(pageSize.width);
    const pageHeight = mmToPoints(pageSize.height);
    const marginTop = mmToPoints(margin.top);
    const marginBottom = mmToPoints(margin.bottom);
    const marginLeft = mmToPoints(margin.left);
    const marginRight = mmToPoints(margin.right);

    const processedBlob = await processImageBlob(imageBlob, rotation, quality);

    const embeddedImage = await safelyEmbedImage(pdfDoc, processedBlob, filename);
    const imageWidth = embeddedImage.width;
    const imageHeight = embeddedImage.height;

    const availWidth = pageWidth - marginLeft - marginRight;
    const availHeight = pageHeight - marginTop - marginBottom;

    const scaleX = availWidth / imageWidth;
    const scaleY = availHeight / imageHeight;
    const scale = Math.min(scaleX, scaleY, 1);

    const finalWidth = imageWidth * scale;
    const finalHeight = imageHeight * scale;

    const centerX = marginLeft + availWidth / 2;
    const centerY = marginTop + availHeight / 2;

    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    page.drawImage(embeddedImage, {
      x: centerX - finalWidth / 2,
      y: centerY - finalHeight / 2,
      width: finalWidth,
      height: finalHeight,
    });

    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
  };

  // --- Convert multiple images to PDF (rotation + compression) ---
  const convertImagesToPdfWithSettings = async (images: ProcessedImage[], quality: number): Promise<Blob> => {
    const { PDFDocument } = await import('pdf-lib');
    const pdfDoc = await PDFDocument.create();

    const pageSize = getPageSize();
    const margin = getMarginValues();

    const pageWidth = mmToPoints(pageSize.width);
    const pageHeight = mmToPoints(pageSize.height);
    const marginTop = mmToPoints(margin.top);
    const marginBottom = mmToPoints(margin.bottom);
    const marginLeft = mmToPoints(margin.left);
    const marginRight = mmToPoints(margin.right);

    const availWidth = pageWidth - marginLeft - marginRight;
    const availHeight = pageHeight - marginTop - marginBottom;
    const centerX = marginLeft + availWidth / 2;
    const centerY = marginTop + availHeight / 2;

    for (const image of images) {
      try {
        const rotation = image.rotation || 0;
        const processedBlob = await processImageBlob(image.blob, rotation, quality);

        const embeddedImage = await safelyEmbedImage(pdfDoc, processedBlob, image.name);
        const imageWidth = embeddedImage.width;
        const imageHeight = embeddedImage.height;

        const scaleX = availWidth / imageWidth;
        const scaleY = availHeight / imageHeight;
        const scale = Math.min(scaleX, scaleY, 1);

        const finalWidth = imageWidth * scale;
        const finalHeight = imageHeight * scale;

        const page = pdfDoc.addPage([pageWidth, pageHeight]);
        page.drawImage(embeddedImage, {
          x: centerX - finalWidth / 2,
          y: centerY - finalHeight / 2,
          width: finalWidth,
          height: finalHeight,
        });
      } catch (error) {
        console.error('Error processing image:', error);
        continue;
      }
    }

    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
  };

  // Process images - PRESERVES UPLOAD ORDER
  const processImages = async () => {
    if (files.length === 0) return;

    setProcessing(true);
    setProgress(0);
    setProcessedImages([]);
    setShowFeatures(false);
    setErrorMessage("");

    try {
      const results: ProcessedImage[] = [];
      const totalFiles = files.length;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const previewUrl = URL.createObjectURL(file);
        
        const state = imageStates.get(i) || { rotation: 0 };
        
        results.push({
          id: `img_${Date.now()}_${i}`,
          blob: file,
          name: file.name,
          originalFile: file,
          timestamp: Date.now(),
          originalSize: file.size,
          processedSize: file.size,
          previewUrl: previewUrl,
          rotation: state.rotation,
        });

        setProgress(((i + 1) / totalFiles) * 100);
      }

      setProcessedImages(results);

      if (results.length === 0) {
        setErrorMessage("No images could be processed. Please try again with valid image files.");
      }
    } catch (error: any) {
      console.error("Processing error:", error);
      setErrorMessage(error.message || "Failed to process files. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  // Download as Single PDF - PRESERVES ORDER AND ROTATIONS, uses quality
  const handleDownloadAsSinglePdf = async () => {
    if (processedImages.length === 0) return;

    setCreatingSinglePdf(true);

    try {
      const validFiles = processedImages.filter((item) => item.blob && item.blob.size > 0);

      if (validFiles.length === 0) {
        throw new Error("No valid files to combine into PDF");
      }

      const qualityMap: Record<QualityPreset, number> = { high: 0.92, medium: 0.80, low: 0.60 };
      const quality = qualityMap[qualityPreset] || 0.92;

      const pdfBlob = await convertImagesToPdfWithSettings(validFiles, quality);
      
      const timestamp = new Date().getTime();
      const finalFileName = `converted_images_${timestamp}.pdf`;
      
      downloadFile(pdfBlob, finalFileName);

      const notification: DownloadNotification = {
        id: Math.random().toString(36).substring(7),
        fileName: finalFileName,
        fileCount: validFiles.length,
        timestamp: new Date(),
        isSinglePdf: true,
      };
      setDownloadNotifications((prev) => [...prev, notification]);

      setTimeout(() => {
        setDownloadNotifications((prev) => prev.filter((n) => n.id !== notification.id));
      }, 5000);
    } catch (error) {
      console.error("PDF creation error:", error);
      setErrorMessage("Failed to create PDF. Please try again.");
    } finally {
      setCreatingSinglePdf(false);
    }
  };

  // Download All as PDFs in ZIP - PRESERVES ORDER AND ROTATIONS, uses quality
  const handleDownloadAllAsZip = async () => {
    if (processedImages.length === 0) return;

    setCreatingZip(true);

    try {
      const validFiles = processedImages.filter((item) => item.blob && item.blob.size > 0);

      if (validFiles.length === 0) {
        throw new Error("No valid files to download");
      }

      const qualityMap: Record<QualityPreset, number> = { high: 0.92, medium: 0.80, low: 0.60 };
      const quality = qualityMap[qualityPreset] || 0.92;

      const filesForZip = await Promise.all(
        validFiles.map(async (item, index) => {
          const pdfBlob = await convertImageToPdfWithSettings(
            item.blob, 
            item.name,
            index,
            validFiles.length,
            item.rotation || 0,
            quality
          );
          const baseName = item.name.replace(/\.[^.]+$/, '');
          const pdfFileName = `${baseName}.pdf`;
          return {
            name: pdfFileName,
            blob: pdfBlob,
          };
        })
      );

      const timestamp = new Date().getTime();
      const zipFileName = `converted_images_${timestamp}.zip`;
      await downloadAsZip(filesForZip, zipFileName);

      const notification: DownloadNotification = {
        id: Math.random().toString(36).substring(7),
        fileName: zipFileName,
        fileCount: filesForZip.length,
        timestamp: new Date(),
        isZip: true,
      };
      setDownloadNotifications((prev) => [...prev, notification]);

      setTimeout(() => {
        setDownloadNotifications((prev) => prev.filter((n) => n.id !== notification.id));
      }, 5000);
    } catch (error) {
      console.error("ZIP creation error:", error);
      setErrorMessage("Failed to create ZIP file. Please try again.");
    } finally {
      setCreatingZip(false);
    }
  };

  // Individual PDF download - PRESERVES ROTATION, uses quality
  const handleIndividualPdfDownload = async (item: ProcessedImage, index: number) => {
    try {
      const qualityMap: Record<QualityPreset, number> = { high: 0.92, medium: 0.80, low: 0.60 };
      const quality = qualityMap[qualityPreset] || 0.92;

      const pdfBlob = await convertImageToPdfWithSettings(
        item.blob,
        item.name,
        index,
        processedImages.length,
        item.rotation || 0,
        quality
      );
      const baseName = item.name.replace(/\.[^.]+$/, '');
      const pdfFileName = `${baseName}.pdf`;
      downloadFile(pdfBlob, pdfFileName);
      
      const notification: DownloadNotification = {
        id: Math.random().toString(36).substring(7),
        fileName: pdfFileName,
        fileCount: 1,
        timestamp: new Date(),
        isSinglePdf: true,
      };
      setDownloadNotifications((prev) => [...prev, notification]);
      setTimeout(() => {
        setDownloadNotifications((prev) => prev.filter((n) => n.id !== notification.id));
      }, 5000);
    } catch (error) {
      console.error("PDF creation error:", error);
      setErrorMessage("Failed to create PDF for this image.");
    }
  };

  // Handle rotation - USER CONTROLLED, NO AUTO-CORRECTION
  const handleRotate = (index: number) => {
    setImageStates(prev => {
      const newMap = new Map(prev);
      const current = newMap.get(index) || { rotation: 0 };
      newMap.set(index, {
        rotation: (current.rotation + 90) % 360
      });
      return newMap;
    });
  };

  // Handle counter-clockwise rotation
  const handleRotateCounterClockwise = (index: number) => {
    setImageStates(prev => {
      const newMap = new Map(prev);
      const current = newMap.get(index) || { rotation: 0 };
      newMap.set(index, {
        rotation: (current.rotation - 90 + 360) % 360
      });
      return newMap;
    });
  };

  // Handle clockwise rotation
  const handleRotateClockwise = (index: number) => {
    setImageStates(prev => {
      const newMap = new Map(prev);
      const current = newMap.get(index) || { rotation: 0 };
      newMap.set(index, {
        rotation: (current.rotation + 90) % 360
      });
      return newMap;
    });
  };

  // Handle reverse order toggle - PRESERVES ROTATIONS
  const handleReverseOrderToggle = () => {
    setReverseOrder(!reverseOrder);
    const reversedFiles = [...files].reverse();
    setFiles(reversedFiles);
    
    setImageStates(prev => {
      const newMap = new Map();
      const entries = Array.from(prev.entries());
      const reversedEntries = entries.reverse();
      reversedEntries.forEach(([_, value], newIndex) => {
        newMap.set(newIndex, value);
      });
      return newMap;
    });
  };

  // Move image up - PRESERVES ORDER AND ROTATIONS
  const moveImageUp = (index: number) => {
    if (index === 0) return;
    const newFiles = [...files];
    [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
    setFiles(newFiles);
    
    setImageStates(prev => {
      const newMap = new Map();
      const entries = Array.from(prev.entries());
      const temp = entries[index - 1];
      entries[index - 1] = entries[index];
      entries[index] = temp;
      entries.forEach(([_, value], newIndex) => {
        newMap.set(newIndex, value);
      });
      return newMap;
    });
  };

  // Move image down - PRESERVES ORDER AND ROTATIONS
  const moveImageDown = (index: number) => {
    if (index === files.length - 1) return;
    const newFiles = [...files];
    [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
    setFiles(newFiles);
    
    setImageStates(prev => {
      const newMap = new Map();
      const entries = Array.from(prev.entries());
      const temp = entries[index];
      entries[index] = entries[index + 1];
      entries[index + 1] = temp;
      entries.forEach(([_, value], newIndex) => {
        newMap.set(newIndex, value);
      });
      return newMap;
    });
  };

  // Swap pages - PRESERVES ROTATIONS
  const swapPages = (indexA: number, indexB: number) => {
    if (indexA === indexB) return;
    
    const newFiles = [...files];
    [newFiles[indexA], newFiles[indexB]] = [newFiles[indexB], newFiles[indexA]];
    setFiles(newFiles);
    
    setImageStates(prev => {
      const newMap = new Map();
      const entries = Array.from(prev.entries());
      const temp = entries[indexA];
      entries[indexA] = entries[indexB];
      entries[indexB] = temp;
      entries.forEach(([_, value], newIndex) => {
        newMap.set(newIndex, value);
      });
      return newMap;
    });
  };

  // Handle select image for swap
  const handleSelectImage = (index: number) => {
    if (selectedIndex === null) {
      setSelectedIndex(index);
    } else if (selectedIndex === index) {
      setSelectedIndex(null);
    } else {
      swapPages(selectedIndex, index);
      setSelectedIndex(null);
    }
  };

  // Handle replace image
  const handleReplaceImage = (index: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = false;
    
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const newFile = target.files[0];
        if (!newFile.type.startsWith('image/') && !newFile.name.match(/\.(jpg|jpeg|png|gif|bmp|webp|tiff|tif)$/i)) {
          alert('Please select a valid image file.');
          return;
        }
        
        const newFiles = [...files];
        newFiles[index] = newFile;
        setFiles(newFiles);
        setErrorMessage("");
      }
    };
    input.click();
  };

  // Full Reset
  const handleFullReset = () => {
    setFiles([]);
    setProcessedImages([]);
    setProgress(0);
    setShowFeatures(true);
    setErrorMessage("");
    setImageStates(new Map());
    setDraggedIndex(null);
    setSelectedIndex(null);
    setSelectedPageSize("a4");
    setOrientation("portrait");
    setQualityPreset("high");
    setSelectedMargin("normal");
    setCustomMargin({ top: 10, bottom: 10, left: 10, right: 10 });
    setUseCustomMargin(false);
    setReverseOrder(false);
    setShowSettings(true);
    setDownloadNotifications([]);
  };

  // Handle drag and drop reordering - PRESERVES ROTATIONS
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newFiles = [...files];
    const [draggedFile] = newFiles.splice(draggedIndex, 1);
    newFiles.splice(index, 0, draggedFile);
    setFiles(newFiles);
    
    setImageStates(prev => {
      const newMap = new Map();
      const entries = Array.from(prev.entries());
      const [draggedState] = entries.splice(draggedIndex, 1);
      entries.splice(index, 0, draggedState);
      entries.forEach(([_, value], newIndex) => {
        newMap.set(newIndex, value);
      });
      return newMap;
    });
    
    setDraggedIndex(index);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    setImageStates(prev => {
      const newMap = new Map();
      let newIndex = 0;
      for (let i = 0; i < files.length; i++) {
        if (i !== index) {
          const state = prev.get(i) || { rotation: 0 };
          newMap.set(newIndex, state);
          newIndex++;
        }
      }
      return newMap;
    });
    if (newFiles.length === 0) {
      setProcessedImages([]);
      setShowFeatures(true);
      setSelectedIndex(null);
    }
    setErrorMessage("");
  };

  const handleRemoveAll = () => {
    setFiles([]);
    setProcessedImages([]);
    setShowFeatures(true);
    setErrorMessage("");
    setImageStates(new Map());
    setSelectedIndex(null);
  };

  const handleFilesSelected = (newFiles: File[]) => {
    const imageFiles = newFiles.filter(f => 
      f.type.startsWith('image/') || 
      f.name.match(/\.(jpg|jpeg|png|gif|bmp|webp|tiff|tif)$/i)
    );
    
    if (imageFiles.length === 0) {
      alert("Please select valid image files (JPG, PNG, GIF, BMP, WEBP, TIFF).");
      return;
    }

    if (isMobile) {
      const maxSize = 30 * 1024 * 1024;
      const oversized = imageFiles.some(f => f.size > maxSize);
      if (oversized) {
        alert(`Some files are too large. Maximum size for mobile is 30MB per file.`);
        return;
      }
    }

    if (files.length + imageFiles.length > 50) {
      alert("Maximum 50 files allowed at a time.");
      return;
    }

    const startIndex = files.length;
    setFiles(prev => [...prev, ...imageFiles]);
    
    setImageStates(prev => {
      const newMap = new Map(prev);
      imageFiles.forEach((_, idx) => {
        const actualIndex = startIndex + idx;
        if (!newMap.has(actualIndex)) {
          newMap.set(actualIndex, { rotation: 0 });
        }
      });
      return newMap;
    });
    
    setProcessedImages([]);
    setShowFeatures(false);
    setErrorMessage("");
  };

  const hasFiles = files.length > 0;
  const hasResults = processedImages.length > 0;
  const isReadyToProcess = hasFiles && !hasResults && !processing;
  const totalSize = files.reduce((acc, f) => acc + f.size, 0);
  const totalProcessedSize = processedImages.reduce(
    (acc, item) => acc + (item.processedSize || 0),
    0
  );
  const sizeReduction =
    totalSize > 0 && totalProcessedSize > 0
      ? Math.max(0, ((totalSize - totalProcessedSize) / totalSize) * 100).toFixed(1)
      : "0";

  const getQualityLabel = (preset: QualityPreset) => {
    switch (preset) {
      case "high": return "High (Best Quality)";
      case "medium": return "Medium (Balanced)";
      case "low": return "Low (Smallest Size)";
      default: return "High (Best Quality)";
    }
  };

  const getQualityDescription = (preset: QualityPreset) => {
    switch (preset) {
      case "high": return "Best quality, larger file size";
      case "medium": return "Balanced quality and file size";
      case "low": return "Smallest file size, lower quality";
      default: return "Best quality, larger file size";
    }
  };

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    return () => {
      processedImages.forEach((item) => {
        if (item.previewUrl) {
          URL.revokeObjectURL(item.previewUrl);
        }
      });
    };
  }, [processedImages]);

  return (
    <>
      <FAQSchema />
      <BreadcrumbSchema />
      <HowToSchema />
      <ArticleSchema />

      <div className="fixed top-4 right-4 z-50 w-full max-w-xs sm:max-w-sm">
        <div ref={notificationsRef} className="space-y-2 max-h-64 overflow-y-auto pr-2">
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
                  className="inline-flex items-center justify-center w-16 h-14 md:w-20 md:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl md:rounded-3xl mb-3 md:mb-4 shadow-xl"
                >
                  <span className="flex items-center justify-center gap-1 text-2xl md:text-3xl text-white select-none">
                    <span>🖼️</span>
                    <span>📄</span>
                  </span>
                </motion.div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-2 sm:mb-4 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 bg-clip-text text-transparent px-2">
                  Convert JPG to PDF Online - Free, Fast & No Watermark | PDFSwift
                </h1>

                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
                  Convert your images to PDF online for free. Upload multiple images, set page size, orientation, margins, and quality.
                  <span className="block text-green-600 dark:text-green-400 font-medium mt-1 text-xs sm:text-sm md:text-base">
                    Supports JPG, PNG, GIF, BMP, WEBP, TIFF - Up to 50 images
                  </span>
                </p>
              </div>
            </div>

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
                      icon: File,
                      title: "Multiple Images",
                      desc: "Upload up to 50 images at once and convert all to PDF",
                      gradient: "from-green-500 to-emerald-600",
                      bg: "from-green-50 to-emerald-50",
                      border: "border-green-200",
                    },
                    {
                      icon: Shield,
                      title: "Secure Processing",
                      desc: "All processing happens locally in your browser. Your images never leave your device",
                      gradient: "from-blue-500 to-cyan-600",
                      bg: "from-blue-50 to-cyan-50",
                      border: "border-blue-200",
                    },
                    {
                      icon: Sliders,
                      title: "Custom Settings",
                      desc: "Choose page size, orientation, margins, and quality for your PDF",
                      gradient: "from-purple-500 to-pink-600",
                      bg: "from-purple-50 to-pink-50",
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

            <div className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-lg sm:shadow-xl md:shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
              <div className="mb-4 sm:mb-6 md:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg sm:rounded-xl">
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      {hasFiles ? `${files.length} Images Uploaded` : "Upload Images"}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Upload multiple images to convert to PDF
                      {isMobile && (
                        <span className="block text-green-600 dark:text-green-400 mt-1">
                          Max 30MB per file
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <FileUploader
                  accept="image/*"
                  multiple={true}
                  onFilesSelected={handleFilesSelected}
                  key={files.length > 0 ? files.map(f => f.name).join(',') : 'uploader'}
                  maxSize={isMobile ? 30 * 1024 * 1024 : 200 * 1024 * 1024}
                  maxFiles={50}
                />

                {hasFiles && (
                  <div className="mt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                          <FileImage className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-green-700 dark:text-green-300">
                            {files.length} image{files.length > 1 ? 's' : ''} uploaded
                          </p>
                          <p className="text-xs text-green-600 dark:text-green-400">
                            Total: {(totalSize / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleRemoveAll}
                          className="px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                        >
                          Remove All
                        </button>
                        <button
                          onClick={handleFullReset}
                          className="px-3 py-2 text-xs font-medium bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 rounded-lg transition-colors shadow-md"
                        >
                          🔄 Reset Everything
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

             {hasFiles && !hasResults && (
  <div className="mb-4 sm:mb-6">
    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2 flex-wrap">
      <GripVertical className="w-4 h-4" />
      Drag • Use ↑↓ buttons • Click 👆 to select & swap • Click ↻ to rotate • Click 📷 to replace

      {selectedIndex !== null && (
        <span className="text-blue-500 font-bold">
          Selected: #{selectedIndex + 1} - Click another to swap
        </span>
      )}
    </h3>

    {/* Image Grid - No Internal Scrollbar */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 p-3 bg-gray-50 dark:bg-gray-800/30 rounded-xl">
      {files.map((file, index) => {
        const state = imageStates.get(index) || { rotation: 0 };

        return (
          <ImagePreview
            key={`upload-${index}`}
            file={file}
            filename={file.name}
            status="Uploaded"
            index={index}
            rotation={state.rotation}
            onRotateCounterClockwise={() =>
              handleRotateCounterClockwise(index)
            }
            onRotateClockwise={() =>
              handleRotateClockwise(index)
            }
            onReplace={() => handleReplaceImage(index)}
            onRemove={() => handleRemoveFile(index)}
            onMoveUp={() => moveImageUp(index)}
            onMoveDown={() => moveImageDown(index)}
            onSelect={() => handleSelectImage(index)}
            isSelected={selectedIndex === index}
            canMoveUp={index > 0}
            canMoveDown={index < files.length - 1}
            totalImages={files.length}
            showRotationControls={true}
            dragHandleProps={{
              draggable: true,
              onDragStart: () => handleDragStart(index),
              onDragEnd: handleDragEnd,
              onDragOver: (e: React.DragEvent) =>
                handleDragOver(e, index),
            }}
          />
        );
      })}
    </div>

    {selectedIndex !== null && (
      <div className="mt-2 text-center text-sm text-blue-600 dark:text-blue-400">
        Click on another image to swap with #{selectedIndex + 1}, or click the
        selected image to deselect.
      </div>
    )}
  </div>
)}

              {/* PDF Settings */}
              {hasFiles && !processing && (
                <div className="space-y-4 mb-6">
                 

                  {showSettings && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Maximize2 className="w-3.5 h-3.5 inline mr-1" />
                          Page Size
                        </label>
                        <select
                          value={selectedPageSize}
                          onChange={(e) => setSelectedPageSize(e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        >
                          {PAGE_SIZES.map((size) => (
                            <option key={size.id} value={size.id}>
                              {size.name} ({size.width} × {size.height} {size.unit})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                          Orientation
                        </label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setOrientation("portrait")}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              orientation === "portrait"
                                ? "bg-green-600 text-white"
                                : "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                            }`}
                          >
                            Portrait
                          </button>
                          <button
                            onClick={() => setOrientation("landscape")}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              orientation === "landscape"
                                ? "bg-green-600 text-white"
                                : "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                            }`}
                          >
                            Landscape
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Save className="w-3.5 h-3.5 inline mr-1" />
                          Quality
                        </label>
                        <select
                          value={qualityPreset}
                          onChange={(e) => setQualityPreset(e.target.value as QualityPreset)}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        >
                          <option value="high">High (Best Quality)</option>
                          <option value="medium">Medium (Balanced)</option>
                          <option value="low">Low (Smallest Size)</option>
                        </select>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {getQualityDescription(qualityPreset)}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <AlignCenter className="w-3.5 h-3.5 inline mr-1" />
                          Margins
                        </label>
                        <select
                          value={selectedMargin}
                          onChange={(e) => {
                            setSelectedMargin(e.target.value);
                            if (e.target.value === "custom") {
                              setUseCustomMargin(true);
                            } else {
                              setUseCustomMargin(false);
                            }
                          }}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        >
                          {MARGIN_PRESETS.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name} ({m.top}mm)
                            </option>
                          ))}
                          <option value="custom">Custom</option>
                        </select>
                      </div>

                      {useCustomMargin && (
                        <div className="sm:col-span-2 lg:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Custom Margin (mm)
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div>
                              <label className="text-xs text-gray-500 dark:text-gray-400">Top</label>
                              <input
                                type="number"
                                min="0"
                                max="50"
                                value={customMargin.top}
                                onChange={(e) => setCustomMargin({ ...customMargin, top: Number(e.target.value) })}
                                className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 dark:text-gray-400">Bottom</label>
                              <input
                                type="number"
                                min="0"
                                max="50"
                                value={customMargin.bottom}
                                onChange={(e) => setCustomMargin({ ...customMargin, bottom: Number(e.target.value) })}
                                className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 dark:text-gray-400">Left</label>
                              <input
                                type="number"
                                min="0"
                                max="50"
                                value={customMargin.left}
                                onChange={(e) => setCustomMargin({ ...customMargin, left: Number(e.target.value) })}
                                className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 dark:text-gray-400">Right</label>
                              <input
                                type="number"
                                min="0"
                                max="50"
                                value={customMargin.right}
                                onChange={(e) => setCustomMargin({ ...customMargin, right: Number(e.target.value) })}
                                className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className={useCustomMargin ? "sm:col-span-2 lg:col-span-1" : ""}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                          Order
                        </label>
                        <div className="flex items-center gap-3 p-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700">
                          <button
                            onClick={() => {
                              if (reverseOrder) handleReverseOrderToggle();
                            }}
                            className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                              !reverseOrder
                                ? "bg-green-600 text-white"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                          >
                            Normal
                          </button>
                          <button
                            onClick={() => {
                              if (!reverseOrder) handleReverseOrderToggle();
                            }}
                            className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                              reverseOrder
                                ? "bg-green-600 text-white"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                          >
                            Reverse
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {reverseOrder ? "Images are reversed" : "Images in upload order"}
                        </p>
                      </div>
                    </div>
                  )}

                  {isReadyToProcess && (
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={processImages}
                      disabled={processing}
                      className="w-full py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      Convert to PDF
                      <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    </motion.button>
                  )}
                </div>
              )}

              {processing && (
                <div className="space-y-3 sm:space-y-4">
                  <ProgressBar
                    progress={progress}
                    label="Processing images..."
                  />
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-green-600 dark:text-green-400">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                    <span className="text-xs sm:text-sm font-medium">
                      Preparing images for PDF conversion...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {hasResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-2 border-green-200 dark:border-green-800/50 p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg sm:shadow-xl md:shadow-2xl mb-6 md:mb-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                  <div className="flex items-center justify-center sm:justify-start">
                    <div className="p-2 sm:p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg sm:rounded-xl shadow-lg">
                      <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-1 sm:mb-2">
                      Images Ready for PDF! 🎉
                    </h2>
                    <p className="text-green-700 dark:text-green-300 font-medium text-sm sm:text-base">
                      Successfully loaded {processedImages.length} image{processedImages.length > 1 ? 's' : ''}
                      {sizeReduction !== "0" && ` • ${sizeReduction}% average size reduction`}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-1">
                      Page Size: {PAGE_SIZES.find(s => s.id === selectedPageSize)?.name} • 
                      Orientation: {orientation === "portrait" ? "Portrait" : "Landscape"} • 
                      Quality: {getQualityLabel(qualityPreset)}
                    </p>
                  </div>
                  <div className="flex items-center justify-center mt-2 sm:mt-0">
                    <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base">
                      {processedImages.length} Image{processedImages.length > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 p-3 sm:p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-green-100 dark:border-green-800/30">
  {processedImages.map((item, index) => (
    <ImagePreview
      key={index}
      file={item.blob}
      filename={item.name}
      status="Ready ✓"
      isDownloadable={true}
      index={index}
      originalSize={item.originalSize}
      processedSize={item.processedSize}
      rotation={item.rotation || 0}
      showRotationControls={false}
      onDownloadPdf={() => handleIndividualPdfDownload(item, index)}
    />
  ))}
</div>

                <div className="space-y-4 sm:space-y-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownloadAsSinglePdf}
                    disabled={creatingSinglePdf || processedImages.length === 0}
                    className={`w-full py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold sm:font-extrabold rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3 ${
                      creatingSinglePdf ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {creatingSinglePdf ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:h-6 border-b-2 border-white"></div>
                        <span>Creating PDF...</span>
                      </>
                    ) : (
                      <>
                        <File className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        Download as Single PDF
                        <span className="text-xs px-2 py-1 bg-white/20 rounded-full">
                          {processedImages.length} image{processedImages.length > 1 ? 's' : ''}
                        </span>
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownloadAllAsZip}
                    disabled={creatingZip || processedImages.length === 0}
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
                        Download All as PDFs (ZIP)
                        <span className="text-xs px-2 py-1 bg-white/20 rounded-full">
                          {processedImages.length} file{processedImages.length > 1 ? 's' : ''}
                        </span>
                      </>
                    )}
                  </motion.button>

                  <div className="text-center">
                    <button
                      onClick={handleFullReset}
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 text-white font-medium bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm md:text-base shadow-lg hover:shadow-xl"
                    >
                      <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                      Start Over - Reset Everything
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {(hasFiles || hasResults) && (
              <div className="mt-10 sm:mt-14">
                <div className="max-w-6xl mx-auto px-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                    {[
                      {
                        value: files.length,
                        label: "Images Uploaded",
                        color: "text-blue-600",
                        bg: "bg-blue-50 dark:bg-blue-900/10",
                      },
                      {
                        value: totalSize > 0 ? `${(totalSize / 1024 / 1024).toFixed(1)} MB` : "0 MB",
                        label: "Total Size",
                        color: "text-purple-600",
                        bg: "bg-purple-50 dark:bg-purple-900/10",
                      },
                      {
                        value: processedImages.length,
                        label: "Ready for PDF",
                        color: "text-green-600",
                        bg: "bg-green-50 dark:bg-green-900/10",
                      },
                      {
                        value: `${sizeReduction}%`,
                        label: "Size Reduction",
                        color: "text-pink-600",
                        bg: "bg-pink-50 dark:bg-pink-900/10",
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
            )}

            <section className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-10">
                How to Convert Images to PDF
              </h2>

              <div className="grid gap-6 md:grid-cols-4">
                <div className="border rounded-xl p-6 text-center shadow-sm bg-white dark:bg-gray-800">
                  <div className="text-4xl font-bold text-green-600 mb-2">1</div>
                  <h3 className="font-semibold text-lg">Upload Images</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    Upload one or multiple images
                  </p>
                </div>

                <div className="border rounded-xl p-6 text-center shadow-sm bg-white dark:bg-gray-800">
                  <div className="text-4xl font-bold text-green-600 mb-2">2</div>
                  <h3 className="font-semibold text-lg">Configure Settings</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    Choose page size, orientation, margins, and quality
                  </p>
                </div>

                <div className="border rounded-xl p-6 text-center shadow-sm bg-white dark:bg-gray-800">
                  <div className="text-4xl font-bold text-green-600 mb-2">3</div>
                  <h3 className="font-semibold text-lg">Convert</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    Click convert to create your PDF
                  </p>
                </div>

                <div className="border rounded-xl p-6 text-center shadow-sm bg-white dark:bg-gray-800">
                  <div className="text-4xl font-bold text-green-600 mb-2">4</div>
                  <h3 className="font-semibold text-lg">Download</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    Download as single PDF or individual PDFs in ZIP
                  </p>
                </div>
              </div>
            </section>

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
                    className="group bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-4 md:p-5 hover:border-green-300 dark:hover:border-emerald-700 transition-all shadow-lg hover:shadow-2xl"
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div
                        className={`p-2 md:p-3 bg-gradient-to-br ${tool.color} rounded-lg md:rounded-xl shadow-lg`}
                      >
                        <span className="text-xl md:text-2xl">{tool.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg mb-1 md:mb-2 group-hover:text-green-600 dark:group-hover:text-emerald-400 transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-3 md:mb-4">
                          {tool.description}
                        </p>
                        <div className="flex items-center gap-2 text-green-600 dark:text-emerald-400 font-medium text-xs md:text-sm">
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

            <section className="max-w-4xl mx-auto my-10 sm:my-14 md:my-20 px-3 sm:px-4">
              <div className="text-center mb-6 sm:mb-8 md:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </h2>
                <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Everything you need to know about converting images to PDF
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {[
                  {
                    question: "What image formats are supported?",
                    answer: `We support JPG, PNG, GIF, BMP, WEBP, and TIFF formats. All major image types are supported.`
                  },
                  {
                    question: "How many images can I convert at once?",
                    answer: `You can upload up to 50 images at a time for conversion to PDF.`
                  },
                  {
                    question: "What page sizes are available?",
                    answer: `We offer A4, A3, Letter, and Legal page sizes. You can also choose between portrait and landscape orientation.`
                  },
                  {
                    question: "Can I set custom margins?",
                    answer: `Yes! You can choose from preset margins (None, Small, Normal, Large) or set custom margins in millimeters.`
                  },
                  {
                    question: "What quality options are available?",
                    answer: `You can choose from High (best quality), Medium (balanced), and Low (smallest file size) quality presets.`
                  },
                  {
                    question: "Can I reorder images before converting?",
                    answer: `Yes! You can drag and drop images, use the up/down arrow buttons on each image, or use the click-to-select swap feature.`
                  },
                  {
                    question: "How does the click-to-select swap work?",
                    answer: `Click the select button (👆) on any image to select it. Then click the select button on another image to swap their positions. Click the selected image again to deselect it.`
                  },
                  {
                    question: "Can I swap two pages?",
                    answer: `Yes! You can use either the click-to-select swap feature or the swap button (🔄) on each image.`
                  },
                  {
                    question: "Can I rotate images?",
                    answer: `Yes! Hover over any image and use the rotate buttons (↻ and ↺) to rotate it 90° clockwise or counter-clockwise. The rotation will be applied to the final PDF.`
                  },
                  {
                    question: "Can I replace an image?",
                    answer: `Yes! Click the refresh icon on any image to replace it with a new image while keeping its position and rotation.`
                  },
                  {
                    question: "Can I view images in full screen?",
                    answer: `Yes! Click on any image to view it in full screen mode. The close button is at the top right corner and you can also press ESC key to close.`
                  },
                  {
                    question: "Can I reverse the order of images?",
                    answer: `Yes! Click the "Reverse" button in the settings to immediately reverse the order of all images.`
                  },
                  {
                    question: "What does the Reset Everything button do?",
                    answer: `The "Reset Everything" button clears all uploaded images, resets all PDF settings to default, and clears all transformations. It's a complete fresh start.`
                  },
                  {
                    question: "Are my files uploaded to a server?",
                    answer: `No. All processing happens locally in your browser. Your images never leave your device, ensuring complete privacy and security.`
                  },
                  {
                    question: "Is this tool free to use?",
                    answer: `Yes! This image to PDF converter is completely free to use with no sign-up required.`
                  },
                ].map((faq, index) => (
                  <details
                    key={index}
                    className="
                      group rounded-xl border border-gray-200 dark:border-gray-700
                      bg-white dark:bg-gray-900
                      transition-all duration-300
                      hover:border-green-400/60 dark:hover:border-emerald-500/60
                      open:shadow-lg open:border-green-500
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
          </motion.div>
        </div>
      </div>
    </>
  );
}