"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import JSZip from "jszip";
import {
  Download,
  ArrowLeft,
  XCircle,
  CheckCircle,
  Image as ImageIcon,
  Sparkles,
  Zap,
  Shield,
  Upload,
  Layers,
  Eye,
  Clock,
  Check,
  ArrowRight,
  Grid,
  X,
  Archive,
  FolderClosed,
  Sliders,
} from "lucide-react";
import FileUploader from "../components/FileUploader";
import ProgressBar from "../components/ProgressBar";
import { compressImageAll, downloadFile } from "../../utils/imageUtils";
import BreadcrumbSchema from "./BreadcrumbSchema";
import ArticleSchema from "./ArticleSchema";
import HowToSchema from "./HowToSchema";
import FAQSchema from "./FAQSchema";

// --- Types ---
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
  id: "compress-image",
  name: "Compress Image",
  description: "Compress images to reduce file size",
  category: "image",
  icon: "📉",
  color: "from-blue-500 to-cyan-500",
  href: "/compress-image",
  path: "/tools/compress-image",
};

const exploreTools: Tool[] = [
  { id: "split-pdf", name: "Split PDF", description: "Split PDF into separate pages", category: "pdf", icon: "✂️", color: "from-orange-500 to-red-500", href: "/split-pdf", path: "/tools/split-pdf" },
  { id: "rotate-pdf", name: "Rotate PDF", description: "Rotate PDF pages", category: "pdf", icon: "🔄", color: "from-teal-500 to-cyan-500", href: "/rotate-pdf", path: "/tools/rotate-pdf" },
  { id: "jpg-to-pdf", name: "JPG to PDF", description: "Convert JPG images to PDF documents", category: "pdf", icon: "🖼️", color: "from-green-500 to-emerald-500", href: "/jpg-to-pdf", path: "/tools/jpg-to-pdf" },
  { id: "png-to-jpg", name: "PNG to JPG", description: "Convert PNG images to JPG format", category: "image", icon: "🔄", color: "from-emerald-500 to-green-500", href: "/png-to-jpg", path: "/tools/png-to-jpg" },
  { id: "pdf-to-jpg", name: "PDF to JPG", description: "Convert PDF pages to JPG images", category: "pdf", icon: "🖼️", color: "from-purple-500 to-pink-500", href: "/pdf-to-jpg", path: "/tools/pdf-to-jpg" },
  { id: "extract-pages", name: "Extract Pages", description: "Extract specific pages from PDF", category: "pdf", icon: "📑", color: "from-indigo-500 to-blue-500", href: "/extract-pages", path: "/tools/extract-pages" },
  { id: "compress-image", name: "Compress Image", description: "Reduce JPG/PNG file size", category: "image", icon: "📉", color: "from-blue-500 to-cyan-500", href: "/compress-image", path: "/tools/compress-image" },
  { id: "merge-pdf", name: "Merge PDF", description: "Combine multiple PDF files into one", category: "pdf", icon: "🔗", color: "from-violet-500 to-purple-500", href: "/merge-pdf", path: "/tools/merge-pdf" },
  { id: "remove-pages", name: "Remove Pages", description: "Delete specific pages from PDF", category: "pdf", icon: "🗑️", color: "from-rose-500 to-pink-500", href: "/remove-pages", path: "/tools/remove-pages" },
];

interface ConvertedFile {
  blob: Blob;
  name: string;
  originalFile: File;
  timestamp: number;
}

interface DownloadNotification {
  id: string;
  fileName: string;
  fileCount: number;
  timestamp: Date;
  type: "single" | "zip" | "multi";
}

// --- Verification helpers ---
async function isRealJpeg(blob: Blob): Promise<boolean> {
  if (!blob || blob.size < 3) return false;
  const h = new Uint8Array(await blob.slice(0, 3).arrayBuffer());
  return h[0] === 0xff && h[1] === 0xd8 && h[2] === 0xff;
}

async function isRealPng(blob: Blob): Promise<boolean> {
  if (!blob || blob.size < 4) return false;
  const h = new Uint8Array(await blob.slice(0, 4).arrayBuffer());
  return h[0] === 0x89 && h[1] === 0x50 && h[2] === 0x4e && h[3] === 0x47;
}

// --- Image Preview Component ---
const ImagePreview = ({
  file,
  onRemove,
  status,
  isDownloadable = false,
  filename = "image.jpg",
  index,
  onSingleDownload,
  showFileSize = false,
  originalSize = 0,
}: {
  file: Blob | File;
  onRemove?: () => void;
  status: string;
  isDownloadable?: boolean;
  filename: string;
  index: number;
  onSingleDownload?: () => void;
  showFileSize?: boolean;
  originalSize?: number;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const objectUrlRef = useRef<string | null>(null);

  const formatFileSizeDisplay = (size: number) => {
    if (size === 0) return "0 B";
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    if (size < 1024 * 1024 * 1024)
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const getSizeReduction = () => {
    if (!showFileSize || !originalSize || originalSize === 0) return null;
    const currentSize = file.size || 0;
    if (currentSize === 0) return null;
    const reduction = ((originalSize - currentSize) / originalSize) * 100;
    return reduction > 0 ? reduction : 0;
  };

  const sizeReduction = getSizeReduction();

  useEffect(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    if (!file || file.size === 0) {
      setError(true);
      setLoading(false);
      return;
    }

    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setPreviewUrl(url);
    setLoading(true);
    setError(false);

    const img = new Image();
    let cancelled = false;

    const isMobileUA =
      typeof navigator !== "undefined" &&
      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) ||
        window.innerWidth < 768);

    const timeoutMs = isMobileUA ? 15000 : 8000;

    const timeoutId = setTimeout(() => {
      if (!cancelled) {
        setError(true);
        setLoading(false);
      }
    }, timeoutMs);

    img.onload = () => {
      if (cancelled) return;
      clearTimeout(timeoutId);
      setLoading(false);
      setError(false);
    };
    img.onerror = () => {
      if (cancelled) return;
      clearTimeout(timeoutId);
      setError(true);
      setLoading(false);
    };
    img.src = url;

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      img.onload = null;
      img.onerror = null;
      img.src = "";
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [file]);

  const statusColor = status?.includes("Compressed")
    ? "text-green-600 dark:text-green-400"
    : "text-blue-600 dark:text-blue-400";

  const handleIndividualDownload = () => {
    if (onSingleDownload) onSingleDownload();
    else if (file) downloadFile(file as Blob, filename);
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
                <img
                  src={previewUrl}
                  alt={filename}
                  className="rounded-xl shadow-2xl max-w-full max-h-[80vh] object-contain"
                  draggable={false}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ y: -5, scale: 1.02 }}
        className="relative group"
      >
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
          <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
            #{index + 1}
          </div>

          <div
            className="relative w-full h-36 mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden cursor-pointer group/image"
            onClick={() => previewUrl && !error && setPreviewOpen(true)}
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
                  {formatFileSizeDisplay(file.size || 0)}
                </span>
              </div>
            ) : (
              <>
                <img
                  src={previewUrl}
                  alt={filename}
                  className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-500"
                  loading="lazy"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white" />
                </div>
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
                  status.includes("Compressed") ? "bg-green-500" : "bg-blue-500"
                }`}
              >
                {status}
              </span>

              {showFileSize && originalSize > 0 && file.size > 0 ? (
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Original: {formatFileSizeDisplay(originalSize)}
                  </span>
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">
                    Compressed: {formatFileSizeDisplay(file.size)}
                  </span>
                  {sizeReduction !== null && sizeReduction > 0 && (
                    <span className="text-xs font-bold text-green-600 dark:text-green-400">
                      ↓ {sizeReduction.toFixed(1)}% smaller
                    </span>
                  )}
                </div>
              ) : (
                file.size !== undefined && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSizeDisplay(file.size)}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="absolute top-3 right-3 flex gap-2">
            {onRemove && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onRemove}
                className="p-1.5 sm:p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                aria-label={`Remove ${filename}`}
              >
                <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            )}

            {isDownloadable && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleIndividualDownload}
                className="p-1.5 sm:p-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
                title={`Download ${filename}`}
                disabled={!file}
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

// --- Download Notification ---
const DownloadNotificationCard = ({
  fileName,
  fileCount,
  timestamp,
  type,
  onClose,
}: DownloadNotification & { onClose: () => void }) => {
  const getMessage = () => {
    switch (type) {
      case "zip":
        return `ZIP archive downloaded with ${fileCount} files`;
      case "multi":
        return `${fileCount} files downloaded individually`;
      default:
        return "File downloaded successfully! 🎉";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className={`bg-gradient-to-r ${
        type === "zip"
          ? "from-purple-500 to-indigo-600"
          : "from-green-500 to-emerald-600"
      } text-white p-4 rounded-xl shadow-lg mb-2`}
    >
      <div className="flex items-start gap-3">
        {type === "zip" ? (
          <Archive className="w-5 h-5 mt-0.5 flex-shrink-0" />
        ) : (
          <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm mb-1">
            {type === "zip" ? "ZIP Archive Downloaded! 📦" : getMessage()}
          </h4>
          {type === "single" && (
            <p className="text-xs opacity-90 truncate mb-1">{fileName}</p>
          )}
          <p className="text-xs opacity-80 mb-2">
            {type === "zip"
              ? `All ${fileCount} files are now in a single ZIP archive`
              : `${fileCount} image ${
                  fileCount === 1 ? "file" : "files"
                } compressed`}
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

// --- Quality Slider ---
const QualitySlider = ({
  quality,
  onQualityChange,
}: {
  quality: number;
  onQualityChange: (value: number) => void;
}) => {
  const [inputValue, setInputValue] = useState<string>(quality.toString());

  useEffect(() => {
    setInputValue(quality.toString());
  }, [quality]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    onQualityChange(value);
    setInputValue(value.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 10 && numValue <= 100) {
      onQualityChange(numValue);
    }
  };

  const handleInputBlur = () => {
    let numValue = parseInt(inputValue);
    if (isNaN(numValue)) {
      setInputValue(quality.toString());
      return;
    }
    numValue = Math.max(10, Math.min(100, numValue));
    onQualityChange(numValue);
    setInputValue(numValue.toString());
  };

  const getQualityLabel = (value: number) => {
    if (value >= 90) return "Best Quality";
    if (value >= 70) return "High Quality";
    if (value >= 50) return "Good Quality";
    if (value >= 30) return "Medium Quality";
    return "Low Quality";
  };

  const getQualityColor = (value: number) => {
    if (value >= 90) return "text-green-600 dark:text-green-400";
    if (value >= 70) return "text-blue-600 dark:text-blue-400";
    if (value >= 50) return "text-yellow-600 dark:text-yellow-400";
    if (value >= 30) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20 rounded-xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
            Compression Quality
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-sm font-bold ${getQualityColor(quality)}`}>
            {quality}%
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({getQualityLabel(quality)})
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <input
            type="range"
            min="10"
            max="100"
            value={quality}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-blue-600
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:hover:bg-blue-700
              [&::-webkit-slider-thumb]:transition-colors
              [&::-moz-range-thumb]:w-4
              [&::-moz-range-thumb]:h-4
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-blue-600
              [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:hover:bg-blue-700"
            style={{
              background: `linear-gradient(to right, #2563eb 0%, #2563eb ${quality}%, #e5e7eb ${quality}%, #e5e7eb 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>10%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="number"
              min="10"
              max="100"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="w-16 sm:w-20 px-2 py-1.5 text-sm sm:text-base text-center
                bg-white dark:bg-gray-700
                border-2 border-gray-300 dark:border-gray-600
                rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                text-gray-900 dark:text-white
                [appearance:textfield]
                [&::-webkit-outer-spin-button]:appearance-none
                [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="absolute right-1 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-gray-500 pointer-events-none">
              %
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-gray-600 dark:text-gray-400">90-100%: Best</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-gray-600 dark:text-gray-400">70-89%: High</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <span className="text-gray-600 dark:text-gray-400">50-69%: Good</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
          <span className="text-gray-600 dark:text-gray-400">30-49%: Medium</span>
        </div>
      </div>
    </div>
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
  const [zipDownloading, setZipDownloading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const [allCompressedFiles, setAllCompressedFiles] = useState<ConvertedFile[]>(
    []
  );
  const [processingFile, setProcessingFile] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userQuality, setUserQuality] = useState<number>(85);
  const [totalOriginalSize, setTotalOriginalSize] = useState<number>(0);
  const [totalCompressedSize, setTotalCompressedSize] = useState<number>(0);

  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768;
      setIsMobile(mobile);
      setUserQuality(mobile ? 75 : 85);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Extension based on actual MIME type
  const generateUniqueFileName = (
    baseName: string,
    index: number,
    mimeType: string = "image/jpeg"
  ) => {
    const timestamp = new Date().getTime();
    const randomId = Math.random().toString(36).substring(2, 9);
    const cleanBaseName = baseName.replace(/\.[^/.]+$/, "");
    const sequence = (index + 1).toString().padStart(3, "0");
    const ext =
      mimeType === "image/png"
        ? "png"
        : mimeType === "image/webp"
        ? "webp"
        : mimeType === "image/gif"
        ? "gif"
        : "jpg";
    return `${cleanBaseName}_compressed_${sequence}_${timestamp}_${randomId}.${ext}`;
  };

  useEffect(() => {
    if (notificationsRef.current && downloadNotifications.length > 0) {
      notificationsRef.current.scrollTop =
        notificationsRef.current.scrollHeight;
    }
  }, [downloadNotifications]);

  const formatFileSize = (size: number) => {
    if (size === 0) return "0 MB";
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    if (size < 1024 * 1024 * 1024)
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  // ✅ compressSingleFile with magic-byte verification
  const compressSingleFile = async (
    file: File,
    quality: number,
    retryCount = 0
  ): Promise<Blob> => {
    const maxRetries = 2;

    try {
      if (file.size === 0) {
        throw new Error("File is empty or corrupted");
      }

      if (isMobile && file.size > 30 * 1024 * 1024) {
        throw new Error(
          `File size (${(file.size / 1024 / 1024).toFixed(
            1
          )}MB) exceeds mobile limit of 30MB`
        );
      }

      const qualityValue = quality / 100;
      // ✅ forceJpeg = true to always produce real JPEG
      const blob = await compressImageAll(file, qualityValue, true);

      if (!blob || blob.size === 0) {
        throw new Error("Compression resulted in empty file");
      }

      // ✅ Verify output is a real image (magic bytes)
      if (blob.type === "image/jpeg") {
        const valid = await isRealJpeg(blob);
        if (!valid) {
          throw new Error(
            "Output claims JPEG but has invalid magic bytes"
          );
        }
      } else if (blob.type === "image/png") {
        const valid = await isRealPng(blob);
        if (!valid) {
          throw new Error("Output claims PNG but has invalid magic bytes");
        }
      }

      return blob;
    } catch (error: any) {
      console.error(
        `Compression error for ${file.name} (attempt ${retryCount + 1}):`,
        error
      );

      if (retryCount < maxRetries && quality > 30) {
        const newQuality = Math.max(quality - 15, 30);
        return await compressSingleFile(file, newQuality, retryCount + 1);
      }

      throw new Error(`Failed to compress ${file.name}: ${error.message}`);
    }
  };

  const handleCompress = async () => {
    if (files.length === 0) return;

    setCompressing(true);
    setProgress(0);
    setShowFeatures(false);
    setErrorMessage("");

    const currentBatchOriginalSize = files.reduce((acc, f) => acc + f.size, 0);
    const newTotalOriginalSize = totalOriginalSize + currentBatchOriginalSize;
    setTotalOriginalSize(newTotalOriginalSize);

    try {
      const blobs: ConvertedFile[] = [];
      let successCount = 0;
      const failedFiles: { name: string; error: string }[] = [];
      let batchCompressedSize = 0;
      const totalFiles = files.length;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setProcessingFile(file.name);

        try {
          if (file.size === 0) {
            failedFiles.push({
              name: file.name,
              error: "File is empty or corrupted",
            });
            continue;
          }

          let quality = userQuality;
          if (isMobile && file.size > 20 * 1024 * 1024 && quality > 60) {
            quality = 60;
          }
          if (isMobile && file.size > 30 * 1024 * 1024 && quality > 50) {
            quality = 50;
          }

          if (i > 0) await new Promise((r) => setTimeout(r, 100));

          const blob = await compressSingleFile(file, quality);

          if (!blob || blob.size === 0) {
            throw new Error("Compression failed after all retries");
          }

          // ✅ Use actual blob.type for extension
          const uniqueFilename = generateUniqueFileName(
            file.name,
            i,
            blob.type
          );

          batchCompressedSize += blob.size;

          blobs.push({
            blob,
            name: uniqueFilename,
            originalFile: file,
            timestamp: Date.now(),
          });
          successCount++;

          const progressValue = ((i + 1) / totalFiles) * 100;
          setProgress(Math.min(progressValue, 100));
        } catch (error: any) {
          console.error(`Error compressing file ${file.name}:`, error);
          failedFiles.push({
            name: file.name,
            error: error.message || "Compression failed",
          });
        }
      }

      setProcessingFile(null);

      if (blobs.length > 0) {
        setAllCompressedFiles((prev) => [...prev, ...blobs]);
        setCompressedBlobs(blobs);
        setTotalCompressedSize((prev) => prev + batchCompressedSize);
      }

      setFiles([]);

      if (failedFiles.length > 0) {
        let msg = `✅ Successfully compressed ${successCount} out of ${totalFiles} files.\n\n`;
        msg += `❌ Failed to compress ${failedFiles.length} file(s):\n\n`;
        failedFiles.slice(0, 5).forEach((file, index) => {
          msg += `${index + 1}. ${file.name}\n   Error: ${file.error}\n\n`;
        });
        if (failedFiles.length > 5) {
          msg += `... and ${failedFiles.length - 5} more files failed\n\n`;
        }
        msg +=
          `\n💡 Possible solutions:\n` +
          `• Try compressing fewer files at once\n` +
          `• Check if your image files are valid\n` +
          `• On mobile, try files under 30MB`;
        setErrorMessage(msg);
        alert(msg);
      } else if (successCount > 0) {
        const totalCompressedSizeNow =
          totalCompressedSize + batchCompressedSize;
        const reduction =
          newTotalOriginalSize > 0
            ? ((newTotalOriginalSize - totalCompressedSizeNow) /
                newTotalOriginalSize) *
              100
            : 0;
        setErrorMessage(
          `✅ Successfully compressed ${successCount} image files!\n\n` +
            `📊 Total Size Reduction: ${reduction.toFixed(1)}%\n` +
            `📁 Total Original Size: ${formatFileSize(newTotalOriginalSize)}\n` +
            `📁 Total Compressed Size: ${formatFileSize(
              totalCompressedSizeNow
            )}\n\n` +
            `💾 Total Saved: ${formatFileSize(
              newTotalOriginalSize - totalCompressedSizeNow
            )}\n\n` +
            `⚙️ Compression Quality: ${userQuality}%`
        );
      }
    } catch (error: any) {
      console.error("Compression error:", error);
      const msg = `❌ Compression Failed\n\nError: ${
        error.message || "Unknown error"
      }\n\nPlease try again with fewer files or check if your images are valid.`;
      setErrorMessage(msg);
      alert(msg);
    } finally {
      setCompressing(false);
      setProcessingFile(null);
    }
  };

  const handleDownloadAllAsZip = async () => {
    const filesToDownload =
      allCompressedFiles.length > 0 ? allCompressedFiles : compressedBlobs;
    if (filesToDownload.length === 0) return;

    setZipDownloading(true);
    try {
      const zip = new JSZip();
      filesToDownload.forEach((item) => {
        if (item.blob && item.blob.size > 0) zip.file(item.name, item.blob);
      });

      const zipBlob = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 6 },
      });

      const zipName = `compressed_images_${Date.now()}.zip`;
      downloadFile(zipBlob, zipName);

      const notification: DownloadNotification = {
        id: Math.random().toString(36).substring(7),
        fileName: zipName,
        fileCount: filesToDownload.length,
        timestamp: new Date(),
        type: "zip",
      };
      setDownloadNotifications((prev) => [...prev, notification]);
      setTimeout(
        () =>
          setDownloadNotifications((prev) =>
            prev.filter((n) => n.id !== notification.id)
          ),
        5000
      );
    } catch (error) {
      console.error("ZIP creation error:", error);
      alert(
        "Failed to create ZIP archive. Please try again or download files individually."
      );
    } finally {
      setZipDownloading(false);
    }
  };

  const handleDownloadAllSeparate = () => {
    const filesToDownload =
      allCompressedFiles.length > 0 ? allCompressedFiles : compressedBlobs;
    if (filesToDownload.length === 0) return;

    filesToDownload.forEach((item, index) => {
      if (item.blob && item.blob.size > 0) {
        setTimeout(() => downloadFile(item.blob, item.name), index * 200);
      }
    });

    const notification: DownloadNotification = {
      id: Math.random().toString(36).substring(7),
      fileName:
        filesToDownload.length === 1
          ? filesToDownload[0].name
          : "Multiple files",
      fileCount: filesToDownload.length,
      timestamp: new Date(),
      type: filesToDownload.length === 1 ? "single" : "multi",
    };
    setDownloadNotifications((prev) => [...prev, notification]);
    setTimeout(
      () =>
        setDownloadNotifications((prev) =>
          prev.filter((n) => n.id !== notification.id)
        ),
      5000
    );
  };

  const handleSingleDownload = (index: number) => {
    const filesToDownload =
      allCompressedFiles.length > 0 ? allCompressedFiles : compressedBlobs;
    const item = filesToDownload[index];
    if (!item || !item.blob || item.blob.size === 0) {
      alert("Cannot download this file. It may be corrupted.");
      return;
    }
    downloadFile(item.blob, item.name);

    const notification: DownloadNotification = {
      id: Math.random().toString(36).substring(7),
      fileName: item.name,
      fileCount: 1,
      timestamp: new Date(),
      type: "single",
    };
    setDownloadNotifications((prev) => [...prev, notification]);
    setTimeout(
      () =>
        setDownloadNotifications((prev) =>
          prev.filter((n) => n.id !== notification.id)
        ),
      5000
    );
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleFilesSelected = (newFiles: File[]) => {
    const filteredFiles = newFiles.filter((file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        alert(
          `❌ File "${file.name}" is not an image.\n\nPlease select valid image files only.`
        );
        return false;
      }
      if (file.size === 0) {
        alert(`❌ File "${file.name}" appears to be empty or corrupted.`);
        return false;
      }
      if (isMobile && file.size > 30 * 1024 * 1024) {
        if (
          !confirm(
            `⚠️ File "${file.name}" is ${(file.size / 1024 / 1024).toFixed(
              1
            )}MB.\n\nLarge files may take longer or fail on mobile devices.\n\nDo you want to continue?`
          )
        ) {
          return false;
        }
      }
      return true;
    });

    if (filteredFiles.length === 0) return;
    setFiles((prev) => [...prev, ...filteredFiles]);
    setShowFeatures(false);
  };

  const handleReset = () => {
    setFiles([]);
    setCompressedBlobs([]);
    setAllCompressedFiles([]);
    setProgress(0);
    setShowFeatures(true);
    setErrorMessage("");
    setProcessingFile(null);
    setTotalOriginalSize(0);
    setTotalCompressedSize(0);
  };

  const hasFiles = files.length > 0;
  const hasResults = compressedBlobs.length > 0;
  const hasAllCompressed = allCompressedFiles.length > 0;
  const isReadyToCompress = hasFiles && !compressing;
  const currentFilesSize = files.reduce((acc, file) => acc + file.size, 0);

  const allCompressedTotalSize = allCompressedFiles.reduce(
    (acc, item) => acc + (item.blob?.size || 0),
    0
  );

  const totalCompressedSizeDisplay =
    totalCompressedSize > 0 ? totalCompressedSize : allCompressedTotalSize;

  const originalTotalSizeDisplay =
    totalOriginalSize > 0
      ? totalOriginalSize
      : allCompressedFiles.reduce(
          (acc, item) => acc + (item.originalFile?.size || 0),
          0
        );

  const sizeReduction =
    originalTotalSizeDisplay > 0 && totalCompressedSizeDisplay > 0
      ? Math.max(
          0,
          ((originalTotalSizeDisplay - totalCompressedSizeDisplay) /
            originalTotalSizeDisplay) *
            100
        )
      : 0;

  const savedSpace = originalTotalSizeDisplay - totalCompressedSizeDisplay;

  return (
    <>
      <FAQSchema />
      <BreadcrumbSchema />
      <HowToSchema />
      <ArticleSchema />

      <div className="fixed top-4 right-4 z-50 w-full max-w-xs sm:max-w-sm">
        <div
          ref={notificationsRef}
          className="space-y-2 max-h-64 overflow-y-auto pr-2"
        >
          <AnimatePresence>
            {downloadNotifications.map((notification) => (
              <DownloadNotificationCard
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
            {/* Header */}
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

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-2 sm:mb-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent px-2">
                  Compress Image Online - Free, Fast & No Watermark | PDFSwift
                </h1>

                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
                  Compress your images to reduce file size while maintaining
                  quality
                  <span className="block text-blue-600 dark:text-blue-400 font-medium mt-1 text-xs sm:text-sm md:text-base">
                    No limits • Unlimited files • Any size • Custom quality
                    control
                  </span>
                </p>
              </div>
            </div>

            {/* Features */}
            <AnimatePresence>
              {showFeatures && !hasFiles && !hasAllCompressed && (
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
                      desc: "Compress images instantly on any device",
                      gradient: "from-blue-500 to-cyan-600",
                      bg: "from-blue-50 to-cyan-50",
                      border: "border-blue-200",
                    },
                    {
                      icon: Shield,
                      title: "Quality Preserved",
                      desc: "Maintain image quality while significantly reducing file size",
                      gradient: "from-green-500 to-emerald-600",
                      bg: "from-green-50 to-emerald-50",
                      border: "border-green-200",
                    },
                    {
                      icon: Sliders,
                      title: "Custom Quality",
                      desc: "Adjust compression quality from 10% to 100% for perfect balance",
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

            {/* Main Compressor Card */}
            <div className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-lg sm:shadow-xl md:shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
              <div className="mb-4 sm:mb-6 md:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg sm:rounded-xl">
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      Upload Images
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Select images to compress – no limits
                      <span className="block text-blue-600 dark:text-blue-400 mt-1">
                        Unlimited files • Any size • All formats supported
                      </span>
                      {allCompressedFiles.length > 0 && (
                        <span className="block text-green-600 dark:text-green-400 mt-1 text-xs">
                          ✓ {allCompressedFiles.length} files already compressed
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <FileUploader
                    accept="image/*"
                    multiple={true}
                    onFilesSelected={handleFilesSelected}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                    No file limits – upload as many images as you want
                  </p>
                </div>

                {hasFiles && (
                  <div className="text-center mb-6">
                    <div className="inline-flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg sm:rounded-full">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-blue-700 dark:text-blue-300">
                          {files.length} image files selected
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                        <span>
                          • {(currentFilesSize / 1024 / 1024).toFixed(2)} MB total
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {hasFiles && (
                <div className="mb-6">
                  <QualitySlider
                    quality={userQuality}
                    onQualityChange={setUserQuality}
                  />
                </div>
              )}

              {hasFiles && (
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                        Uploaded Images ({files.length})
                      </h3>
                      <button
                        onClick={() => setFiles([])}
                        className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg sm:rounded-xl transition-colors"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-gray-200 dark:border-gray-700">
                      {files.map((file, index) => (
                        <ImagePreview
                          key={index}
                          file={file}
                          filename={file.name}
                          onRemove={() => handleRemoveFile(index)}
                          status={
                            processingFile === file.name
                              ? "Compressing..."
                              : "Ready to Compress"
                          }
                          index={index}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    {compressing && (
                      <div className="space-y-3 sm:space-y-4">
                        <ProgressBar
                          progress={progress}
                          label={`Compressing ${files.length} files at ${userQuality}% quality...`}
                        />
                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-blue-600 dark:text-blue-400">
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                          <span className="text-xs sm:text-sm font-medium">
                            {processingFile
                              ? `Processing: ${processingFile}`
                              : "Compressing your images..."}
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
                        className="w-full py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3"
                      >
                        <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        Compress {files.length} Images at {userQuality}% Quality
                        <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      </motion.button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            {(hasResults || hasAllCompressed) && (
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
                      Compression Complete! 🎉
                    </h2>
                    <p className="text-green-700 dark:text-green-300 font-medium text-sm sm:text-base">
                      Successfully compressed {allCompressedFiles.length} image
                      files at {userQuality}% quality
                    </p>
                    {originalTotalSizeDisplay > 0 && (
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          Original:{" "}
                          <span className="font-medium">
                            {formatFileSize(originalTotalSizeDisplay)}
                          </span>
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          → Compressed:{" "}
                          <span className="font-medium text-green-600 dark:text-green-400">
                            {formatFileSize(totalCompressedSizeDisplay)}
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full font-bold">
                          ↓ {sizeReduction.toFixed(1)}% smaller
                        </span>
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                          Saved: {formatFileSize(savedSpace)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-center mt-2 sm:mt-0">
                    <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base">
                      {allCompressedFiles.length} Files
                    </div>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 md:mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Download className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 shrink-0" />
                      <span>
                        All Compressed Images ({allCompressedFiles.length})
                      </span>
                    </h3>

                    <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3">
                      <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base whitespace-nowrap">
                        {allCompressedFiles.length} Files
                      </div>

                      <button
                        onClick={handleReset}
                        className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 font-medium rounded-xl transition-colors text-xs sm:text-sm md:text-base active:scale-95 touch-manipulation whitespace-nowrap"
                      >
                        <span className="flex items-center gap-1.5 sm:gap-2">
                          <X className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>Clear All & Start Over</span>
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto p-3 sm:p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-green-100 dark:border-green-800/30">
                    {allCompressedFiles.map((item, index) => (
                      <ImagePreview
                        key={index}
                        file={item.blob}
                        filename={item.name}
                        status="Compressed ✓"
                        isDownloadable={true}
                        index={index}
                        onSingleDownload={() => handleSingleDownload(index)}
                        showFileSize={true}
                        originalSize={item.originalFile?.size || 0}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownloadAllAsZip}
                      disabled={zipDownloading}
                      className={`w-full py-3 sm:py-3 md:py-4 px-4 sm:px-4 md:px-6 
                        bg-gradient-to-r from-purple-500 to-indigo-600 
                        hover:from-purple-600 hover:to-indigo-700 
                        text-white font-bold rounded-xl sm:rounded-xl md:rounded-2xl 
                        shadow-lg hover:shadow-2xl transition-all 
                        text-sm sm:text-base md:text-lg 
                        flex items-center justify-center gap-2 sm:gap-3
                        active:scale-95 touch-manipulation
                        ${
                          zipDownloading
                            ? "opacity-75 cursor-not-allowed"
                            : ""
                        }`}
                    >
                      {zipDownloading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                          Creating ZIP...
                        </>
                      ) : (
                        <>
                          <Archive className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                          <span className="text-center">Download as ZIP</span>
                          <span className="hidden sm:inline">
                            ({allCompressedFiles.length} files)
                          </span>
                          <FolderClosed className="w-4 h-4 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5" />
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownloadAllSeparate}
                      className="w-full py-3 sm:py-3 md:py-4 px-4 sm:px-4 md:px-6 
                        bg-gradient-to-r from-green-500 to-emerald-600 
                        hover:from-green-600 hover:to-emerald-700 
                        text-white font-bold rounded-xl sm:rounded-xl md:rounded-2xl 
                        shadow-lg hover:shadow-2xl transition-all 
                        text-sm sm:text-base md:text-lg 
                        flex items-center justify-center gap-2 sm:gap-3
                        active:scale-95 touch-manipulation"
                    >
                      <Download className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      <span className="text-center">Download All</span>
                      <span className="hidden sm:inline">
                        ({allCompressedFiles.length} files)
                      </span>
                      <Sparkles className="w-4 h-4 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5" />
                    </motion.button>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={handleReset}
                      className="px-4 py-2.5 sm:px-6 sm:py-3 
                        text-red-600 dark:text-red-400 
                        hover:text-red-700 dark:hover:text-red-300 
                        font-medium hover:bg-red-50 dark:hover:bg-red-950/30 
                        rounded-xl transition-colors 
                        text-sm sm:text-base 
                        active:scale-95 touch-manipulation"
                    >
                      <span className="flex items-center gap-2">
                        <X className="w-4 h-4" />
                        Clear All & Start Over
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stats Footer */}
            {(hasFiles || hasAllCompressed) && (
              <div className="mt-6 sm:mt-10 md:mt-14">
                <div className="max-w-6xl mx-auto px-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                    {[
                      {
                        value:
                          files.length > 0
                            ? files.length
                            : allCompressedFiles.length,
                        label: "Files Uploaded",
                        color: "text-blue-600",
                        bg: "bg-blue-50 dark:bg-blue-900/10",
                      },
                      {
                        value:
                          originalTotalSizeDisplay > 0
                            ? `${(
                                originalTotalSizeDisplay /
                                1024 /
                                1024
                              ).toFixed(2)} MB`
                            : `${(currentFilesSize / 1024 / 1024).toFixed(
                                2
                              )} MB`,
                        label: "Total Input Size",
                        color: "text-orange-600",
                        bg: "bg-orange-50 dark:bg-orange-900/10",
                      },
                      {
                        value: allCompressedFiles.length,
                        label: "Files Compressed",
                        color: "text-green-600",
                        bg: "bg-green-50 dark:bg-green-900/10",
                      },
                      {
                        value:
                          totalCompressedSizeDisplay > 0
                            ? `${(
                                totalCompressedSizeDisplay /
                                1024 /
                                1024
                              ).toFixed(2)} MB`
                            : "0 MB",
                        label: "Total Output Size",
                        color: "text-purple-600",
                        bg: "bg-purple-50 dark:bg-purple-900/10",
                      },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className={`flex flex-col items-center justify-center
                        rounded-2xl border border-gray-200 dark:border-gray-800
                        ${stat.bg}
                        p-4 sm:p-6
                        shadow-sm hover:shadow-lg
                        transition-all duration-300`}
                      >
                        <div
                          className={`text-xl sm:text-2xl md:text-3xl xl:text-4xl font-extrabold ${stat.color}`}
                        >
                          {stat.value}
                        </div>
                        <div className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {allCompressedFiles.length > 0 &&
                    originalTotalSizeDisplay > 0 && (
                      <div className="mt-6 text-center">
                        <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border-2 border-green-200 dark:border-green-800/50">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Total Size Reduction:
                          </span>
                          <span className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                            ↓ {sizeReduction.toFixed(1)}%
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            ({formatFileSize(originalTotalSizeDisplay)} →{" "}
                            {formatFileSize(totalCompressedSizeDisplay)})
                          </span>
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            Saved: {formatFileSize(savedSpace)}
                          </span>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            )}

            {/* How To */}
            <section id="how-to-compress-image" className="mt-20 scroll-mt-24">
              <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
                How to Compress Images Online
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
                {[
                  {
                    n: 1,
                    title: "Upload Images",
                    desc: "Upload images using drag & drop or file picker.",
                  },
                  {
                    n: 2,
                    title: "Set Quality",
                    desc: "Adjust the quality slider from 10% to 100% as needed.",
                  },
                  {
                    n: 3,
                    title: "Review Files",
                    desc: "Check uploaded images and remove any file if needed.",
                  },
                  {
                    n: 4,
                    title: "Compress Images",
                    desc: "Click the compress button to reduce image file sizes.",
                  },
                  {
                    n: 5,
                    title: "Preview Results",
                    desc: "Preview compressed images with reduced file size.",
                  },
                  {
                    n: 6,
                    title: "Download Files",
                    desc: "Download images individually or as a single ZIP archive.",
                  },
                ].map((step) => (
                  <div
                    key={step.n}
                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition"
                  >
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {step.n}
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Explore Tools */}
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
                {exploreTools.slice(0, 8).map((toolItem, index) => (
                  <motion.a
                    key={toolItem.id}
                    href={toolItem.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="group bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-4 md:p-5 hover:border-blue-300 dark:hover:border-cyan-700 transition-all shadow-lg hover:shadow-2xl"
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div
                        className={`p-2 md:p-3 bg-gradient-to-br ${toolItem.color} rounded-lg md:rounded-xl shadow-lg`}
                      >
                        <span className="text-xl md:text-2xl">
                          {toolItem.icon}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg mb-1 md:mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                          {toolItem.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-3 md:mb-4">
                          {toolItem.description}
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

            {/* FAQ */}
            <section className="max-w-3xl mx-auto my-16 px-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  Frequently Asked Questions
                </h2>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Everything you need to know about compressing images online
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    question:
                      "Is there any limit on file size or number of files?",
                    answer:
                      "No! There are no limits. You can upload any number of images of any size. All processing happens in your browser.",
                  },
                  {
                    question: "What does the quality slider do?",
                    answer:
                      "The quality slider lets you control the compression level from 10% to 100%. Higher quality means larger file size but better image quality. Lower quality means smaller file size but more compression artifacts. We recommend 70-90% for most use cases.",
                  },
                  {
                    question: "What image formats are supported?",
                    answer:
                      "All common image formats are supported including JPG, PNG, WebP, BMP, GIF, and TIFF. The tool will compress them and output real JPEG files.",
                  },
                  {
                    question: "How do I download compressed files?",
                    answer:
                      "You can download files individually by clicking the download button on each image, or download all files at once as a ZIP archive using the 'Download as ZIP Archive' button.",
                  },
                  {
                    question:
                      "Is the compression secure? Are my files uploaded to your servers?",
                    answer:
                      "All compression happens directly in your browser (client-side). Your images are never uploaded to any server, ensuring complete privacy and security.",
                  },
                  {
                    question:
                      "How much file size reduction can I expect?",
                    answer:
                      "File size reduction varies based on the image content, format, and the quality setting you choose. At 70% quality, you can typically expect 40-70% reduction in file size while maintaining good visual quality.",
                  },
                  {
                    question:
                      "Can I compress images with transparency?",
                    answer:
                      "PNG transparency is preserved when the output format supports it. Our compressor outputs JPEG by default (with a white background for transparent areas) to maximize compression. This is standard behavior for PNG-to-JPEG compression.",
                  },
                ].map((faq, index) => (
                  <details
                    key={index}
                    className="group border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800"
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