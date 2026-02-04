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
  Maximize2,
  Square,
  Ruler,
  RefreshCw,
  EyeOff,
  Monitor,
  Smartphone,
  Tablet,
  Tv,
  Camera,
  Film,
} from "lucide-react";
import FileUploader from "../components/FileUploader";
import ProgressBar from "../components/ProgressBar";
import { resizeImage, downloadFile } from "../../utils/imageUtils";
import BreadcrumbSchema from "./BreadcrumbSchema";
import ArticleSchema from "./ArticleSchema";
import HowToSchema from "./HowToSchema";

const tool = {
  id: "resize-image",
  name: "Resize Image",
  description: "Resize JPG, PNG, WebP images",
  category: "image",
  icon: "📏",
  color: "from-green-500 to-emerald-500",
  href: "/resize-image",
  path: "/tools/resize-image",
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

// Get image dimensions function
const getImageDimensions = (
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => {
      resolve({ width: 0, height: 0 });
      if (img.src) URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  });
};

// --- Component Interface ---
interface ResizedFile {
  blob: Blob;
  name: string;
  originalFile: File;
  timestamp: number;
  originalSize: { width: number; height: number };
  newSize: { width: number; height: number };
}

interface DownloadNotification {
  id: string;
  fileName: string;
  timestamp: Date;
}

// Resize Options Interface
interface ResizeOptions {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  quality: number;
  format: "jpg" | "png" | "webp";
}

// Preset Sizes with HD categories
const presetSizes = [
  // Mobile & Small Sizes
  {
    name: "Thumbnail",
    width: 150,
    height: 150,
    description: "Profile picture",
    category: "mobile",
    icon: Smartphone,
  },
  {
    name: "Small",
    width: 640,
    height: 480,
    description: "Web use",
    category: "mobile",
    icon: Smartphone,
  },

  // Tablet Sizes
  {
    name: "Medium",
    width: 1024,
    height: 768,
    description: "Social media",
    category: "tablet",
    icon: Tablet,
  },
  {
    name: "iPad Pro",
    width: 1366,
    height: 1024,
    description: "Tablet display",
    category: "tablet",
    icon: Tablet,
  },

  // HD Resolutions
  {
    name: "HD Ready",
    width: 1280,
    height: 720,
    description: "720p HD",
    category: "hd",
    icon: Monitor,
  },
  {
    name: "Full HD",
    width: 1920,
    height: 1080,
    description: "1080p Full HD",
    category: "hd",
    icon: Tv,
  },
  {
    name: "2K QHD",
    width: 2560,
    height: 1440,
    description: "1440p Quad HD",
    category: "hd",
    icon: Monitor,
  },
  {
    name: "4K UHD",
    width: 3840,
    height: 2160,
    description: "2160p Ultra HD",
    category: "hd",
    icon: Tv,
  },
  {
    name: "8K UHD",
    width: 7680,
    height: 4320,
    description: "4320p 8K Ultra HD",
    category: "hd",
    icon: Tv,
  },

  // Social Media
  {
    name: "Instagram Post",
    width: 1080,
    height: 1080,
    description: "Square format",
    category: "social",
    icon: Camera,
  },
  {
    name: "Instagram Story",
    width: 1080,
    height: 1920,
    description: "Vertical format",
    category: "social",
    icon: Smartphone,
  },
  {
    name: "Facebook Cover",
    width: 820,
    height: 312,
    description: "Facebook cover",
    category: "social",
    icon: Camera,
  },
  {
    name: "Twitter Header",
    width: 1500,
    height: 500,
    description: "Twitter/X header",
    category: "social",
    icon: Camera,
  },
  {
    name: "YouTube Thumbnail",
    width: 1280,
    height: 720,
    description: "YouTube thumbnail",
    category: "social",
    icon: Film,
  },
];

// Preset categories with colors and icons
const presetCategories = [
  {
    id: "mobile",
    name: "Mobile & Small",
    icon: Smartphone,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    id: "tablet",
    name: "Tablet",
    icon: Tablet,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    id: "hd",
    name: "HD Resolutions",
    icon: Monitor,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    id: "social",
    name: "Social Media",
    icon: Camera,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
];

// --- Real-time Preview Component ---
const RealTimePreview = ({
  file,
  width,
  height,
  maintainAspectRatio,
  format,
  quality,
}: {
  file: File;
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  format: "jpg" | "png" | "webp";
  quality: number;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [previewDimensions, setPreviewDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  // Get original dimensions on mount
  useEffect(() => {
    getImageDimensions(file).then((dimensions) => {
      setOriginalDimensions(dimensions);
    });
  }, [file]);

  // Calculate dimensions based on aspect ratio
  const calculateDimensions = useMemo(() => {
    return (): { width: number; height: number } => {
      if (!originalDimensions) return { width, height };

      let targetWidth = width;
      let targetHeight = height;

      if (
        maintainAspectRatio &&
        originalDimensions.width > 0 &&
        originalDimensions.height > 0
      ) {
        const aspectRatio =
          originalDimensions.width / originalDimensions.height;
        if (targetWidth / targetHeight > aspectRatio) {
          targetWidth = Math.round(targetHeight * aspectRatio);
        } else {
          targetHeight = Math.round(targetWidth / aspectRatio);
        }
      }

      return { width: targetWidth, height: targetHeight };
    };
  }, [originalDimensions, width, height, maintainAspectRatio]);

  // Create real-time preview
  useEffect(() => {
    let isMounted = true;

    const createPreview = async () => {
      if (!file || !originalDimensions) return;

      setLoading(true);
      setError(null);

      try {
        // Calculate actual dimensions
        const dimensions = calculateDimensions();
        setPreviewDimensions(dimensions);

        // Create canvas for resizing
        const img = new window.Image();
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          throw new Error("Canvas context not available");
        }

        // Load image
        img.onload = () => {
          if (!isMounted) return;

          // Set canvas dimensions
          canvas.width = dimensions.width;
          canvas.height = dimensions.height;

          // Draw with high quality
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);

          // Convert to blob
          canvas.toBlob(
            (blob) => {
              if (!isMounted || !blob) return;

              const url = URL.createObjectURL(blob);
              if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
              }
              setPreviewUrl(url);
              setLoading(false);
            },
            `image/${format}`,
            quality / 100
          );
        };

        img.onerror = () => {
          if (!isMounted) return;
          setError("Failed to load image");
          setLoading(false);
        };

        img.src = URL.createObjectURL(file);
      } catch (err) {
        if (!isMounted) return;
        setError("Failed to create preview");
        setLoading(false);
        console.error("Preview error:", err);
      }
    };

    // Debounce the preview generation
    const timeoutId = setTimeout(createPreview, 300);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [
    file,
    width,
    height,
    maintainAspectRatio,
    format,
    quality,
    calculateDimensions,
    originalDimensions,
  ]);

  const originalUrl = useMemo(() => createObjectURL(file), [file]);

  return (
    <div className="space-y-4">
      {/* File Name */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <p className="text-base font-medium text-gray-900 dark:text-white truncate">
            {file.name}
          </p>
        </div>
      </div>

      {/* Mobile: Stacked, Desktop: Side-by-side */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Original Image */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 text-sm md:text-base">
              <ImageIcon className="w-4 h-4 md:w-5 md:h-5" />
              Original Image
            </h4>
            {originalDimensions && (
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                {originalDimensions.width} × {originalDimensions.height}px
              </span>
            )}
          </div>
          <div className="relative aspect-square md:aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <img
              src={originalUrl}
              alt="Original"
              className="w-full h-full object-contain"
            />
            {!originalDimensions && (
              <div className="absolute inset-0 flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-gray-400 animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Resized Preview */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-green-700 dark:text-green-300 flex items-center gap-2 text-sm md:text-base">
              <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
              Live Preview
            </h4>
            <span className="text-xs md:text-sm text-green-600 dark:text-green-400 font-medium">
              {previewDimensions.width} × {previewDimensions.height}px
            </span>
          </div>
          <div className="relative aspect-square md:aspect-video bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg overflow-hidden border border-green-200 dark:border-green-700">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <RefreshCw className="w-8 h-8 text-green-500 animate-spin" />
                  <span className="text-sm text-green-600 dark:text-green-400">
                    Generating preview...
                  </span>
                </div>
              </div>
            ) : error ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4">
                  <EyeOff className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <span className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </span>
                </div>
              </div>
            ) : previewUrl ? (
              <img
                src={previewUrl}
                alt="Resized Preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4">
                  <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Adjust settings to see preview
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Stats */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-800 dark:to-green-900/20 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-1">
            Original Size
          </div>
          <div className="font-bold text-gray-900 dark:text-white text-base md:text-lg">
            {(file.size / 1024).toFixed(1)} KB
          </div>
          {originalDimensions && (
            <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
              {originalDimensions.width} × {originalDimensions.height}px
            </div>
          )}
        </div>
        <div className="text-center">
          <div className="text-xs md:text-sm text-green-600 dark:text-green-400 mb-1">
            Preview Size
          </div>
          <div className="font-bold text-green-700 dark:text-green-300 text-base md:text-lg">
            {previewDimensions.width} × {previewDimensions.height}px
          </div>
          <div className="text-xs md:text-sm text-green-500 dark:text-green-400 mt-1">
            {maintainAspectRatio
              ? "Aspect ratio maintained"
              : "Custom dimensions"}
          </div>
        </div>
      </div>
    </div>
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
  originalDimensions,
  newDimensions,
}: {
  file: Blob | File;
  onRemove?: () => void;
  status: string;
  isDownloadable?: boolean;
  filename: string;
  index: number;
  originalDimensions?: { width: number; height: number };
  newDimensions?: { width: number; height: number };
}) => {
  const url = useMemo(() => createObjectURL(file), [file]);
  const [previewOpen, setPreviewOpen] = useState(false);

  useMemo(() => {
    return () => revokeObjectURL(url);
  }, [url]);

  const statusColor = status.includes("Resized")
    ? "text-green-600 dark:text-green-400"
    : status.includes("Error")
    ? "text-red-600 dark:text-red-400"
    : "text-blue-600 dark:text-blue-400";

  const handleIndividualDownload = () => {
    downloadFile(file as Blob, filename);
  };

  return (
    <>
      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewOpen && (
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
                  src={url}
                  alt={filename}
                  className="rounded-xl shadow-2xl max-w-full max-h-[80vh] object-contain"
                />
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
      >
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
          {/* Image Number Badge */}
          <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
            #{index + 1}
          </div>

          {/* Image Container */}
          <div
            className="relative w-full h-36 mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden cursor-pointer group/image"
            onClick={() => setPreviewOpen(true)}
          >
            <img
              src={url}
              alt={filename}
              className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/image:translate-x-full transition-transform duration-1000" />
          </div>

          {/* File Info */}
          <div className="space-y-2">
            <p
              className="text-sm font-semibold truncate text-gray-900 dark:text-white"
              title={filename}
            >
              {filename}
            </p>

            {/* Dimensions Display */}
            {(originalDimensions || newDimensions) && (
              <div className="space-y-1">
                {originalDimensions && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">
                      Original:
                    </span>
                    <span className="font-medium">
                      {originalDimensions.width} × {originalDimensions.height}
                    </span>
                  </div>
                )}
                {newDimensions && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      New:
                    </span>
                    <span className="font-bold text-green-700 dark:text-green-300">
                      {newDimensions.width} × {newDimensions.height}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between">
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor} bg-opacity-10 ${
                  status.includes("Resized")
                    ? "bg-green-500"
                    : status.includes("Error")
                    ? "bg-red-500"
                    : "bg-blue-500"
                }`}
              >
                {status}
              </span>

              {/* File Size */}
              {file.size && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Remove Button */}
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

            {/* Download Button */}
            {isDownloadable && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleIndividualDownload}
                className="p-1.5 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
                title={`Download ${filename}`}
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
  timestamp,
  onClose,
}: DownloadNotification & { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl shadow-lg mb-2"
    >
      <div className="flex items-start gap-3">
        <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm mb-1">
            Image Resized Successfully! 🎉
          </h4>
          <p className="text-xs opacity-90 truncate mb-1">
            {fileName}
          </p>
          <p className="text-xs opacity-80 mb-2">
            Image successfully resized and ready for download
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
export default function ResizeImage() {
  const [file, setFile] = useState<File | null>(null);
  const [resizing, setResizing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resizedFile, setResizedFile] = useState<ResizedFile | null>(null);
  const [showFeatures, setShowFeatures] = useState(true);
  const [downloadNotifications, setDownloadNotifications] = useState<
    DownloadNotification[]
  >([]);
  const [activePresetCategory, setActivePresetCategory] = useState<string>("all");
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Resize options state
  const [resizeOptions, setResizeOptions] = useState<ResizeOptions>({
    width: 1920,
    height: 1080,
    maintainAspectRatio: true,
    quality: 90,
    format: "jpg" as const,
  });

  // Filter presets based on active category
  const filteredPresets = useMemo(() => {
    if (activePresetCategory === "all") return presetSizes;
    return presetSizes.filter(preset => preset.category === activePresetCategory);
  }, [activePresetCategory]);

  // Generate unique filename
  const generateUniqueFileName = (baseName: string, format: string) => {
    const timestamp = new Date().getTime();
    const randomId = Math.random().toString(36).substring(2, 9);
    const cleanBaseName = baseName.replace(/\.[^/.]+$/, "");
    const dimensions = `${resizeOptions.width}x${resizeOptions.height}`;
    return `${cleanBaseName}_${dimensions}_${timestamp}_${randomId}.${format}`;
  };

  // Auto-scroll notifications
  useEffect(() => {
    if (notificationsRef.current && downloadNotifications.length > 0) {
      notificationsRef.current.scrollTop =
        notificationsRef.current.scrollHeight;
    }
  }, [downloadNotifications]);

  const handleResize = async () => {
    if (!file) return;

    setResizing(true);
    setProgress(0);
    setResizedFile(null);
    setShowFeatures(false);

    try {
      const originalDimensions = await getImageDimensions(file);

      let targetWidth = resizeOptions.width;
      let targetHeight = resizeOptions.height;

      if (resizeOptions.maintainAspectRatio) {
        const aspectRatio =
          originalDimensions.width / originalDimensions.height;
        if (targetWidth / targetHeight > aspectRatio) {
          targetWidth = Math.round(targetHeight * aspectRatio);
        } else {
          targetHeight = Math.round(targetWidth / aspectRatio);
        }
      }

      const uniqueFilename = generateUniqueFileName(
        file.name,
        resizeOptions.format
      );
      const blob = await resizeImage(
        file,
        targetWidth,
        targetHeight,
        resizeOptions.quality,
        resizeOptions.format
      );

      setResizedFile({
        blob: blob,
        name: uniqueFilename,
        originalFile: file,
        timestamp: Date.now(),
        originalSize: originalDimensions,
        newSize: { width: targetWidth, height: targetHeight },
      });

      setProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (error) {
      console.error("Resize error:", error);
      alert("Failed to resize image. Please try again.");
    } finally {
      setResizing(false);
    }
  };

  const handleDownload = () => {
    if (!resizedFile) return;

    downloadFile(resizedFile.blob, resizedFile.name);

    const notification: DownloadNotification = {
      id: Math.random().toString(36).substring(7),
      fileName: resizedFile.name,
      timestamp: new Date(),
    };
    setDownloadNotifications((prev) => [...prev, notification]);

    setTimeout(() => {
      setDownloadNotifications((prev) =>
        prev.filter((n) => n.id !== notification.id)
      );
    }, 5000);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setResizedFile(null);
    setShowFeatures(true);
  };

  const handleFileSelected = (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFile(newFiles[0]);
      setResizedFile(null);
      setShowFeatures(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResizedFile(null);
    setProgress(0);
    setShowFeatures(true);
  };

  const handlePresetSelect = (preset: (typeof presetSizes)[0]) => {
    setResizeOptions((prev) => ({
      ...prev,
      width: preset.width,
      height: preset.height,
    }));
  };

  const hasFile = file !== null;
  const hasResult = resizedFile !== null;
  const isReadyToResize = hasFile && !hasResult && !resizing;

  return (
    <>
      {/* SEO Schema */}
      <FAQSchema />
      <BreadcrumbSchema />
      <HowToSchema />
      <ArticleSchema />

      {/* Download Success Notifications */}
      <div className="fixed top-4 right-4 z-50 w-[calc(100%-2rem)] max-w-xs sm:max-w-sm">
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

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/20 py-6 md:py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* --- Header Section --- */}
            <div className="mb-8 md:mb-12">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-all font-medium group mb-4 md:mb-6 text-sm md:text-base"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Tools</span>
              </a>

              <div className="text-center mb-6 md:mb-8">
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl md:rounded-3xl mb-4 shadow-lg md:shadow-xl"
                >
                  <span className="text-2xl md:text-3xl text-white select-none">
                    {tool.icon}
                  </span>
                </motion.div>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-3 md:mb-4 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Resize Image Online – Free Image Resizer Tool
                </h1>

                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  Resize JPG, PNG, and WebP images online with PDFSwift. Set
                  custom dimensions, maintain aspect ratio, and resize images
                  securely without signup.
                  <span className="block text-green-600 dark:text-green-400 font-medium mt-1 md:mt-2 text-sm md:text-base">
                    Full HD (1920x1080), 4K UHD, Mobile & Social Media Presets
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
                  className="mb-8 md:mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
                >
                  {[
                    {
                      icon: Monitor,
                      title: "HD & 4K Support",
                      desc: "Resize to Full HD (1920x1080), 2K, 4K, and even 8K resolutions",
                      gradient: "from-green-500 to-emerald-600",
                      bg: "from-green-50 to-emerald-50",
                      border: "border-green-200",
                    },
                    {
                      icon: Smartphone,
                      title: "Mobile & Social Media",
                      desc: "Optimized presets for Instagram, Facebook, Twitter, and mobile devices",
                      gradient: "from-blue-500 to-cyan-600",
                      bg: "from-blue-50 to-cyan-50",
                      border: "border-blue-200",
                    },
                    {
                      icon: Square,
                      title: "Aspect Ratio Lock",
                      desc: "Automatically maintain original aspect ratio to prevent distortion",
                      gradient: "from-purple-500 to-indigo-600",
                      bg: "from-purple-50 to-indigo-50",
                      border: "border-purple-200",
                    },
                    {
                      icon: Shield,
                      title: "Secure Processing",
                      desc: "All resizing happens locally in your browser. Your image never leaves your device",
                      gradient: "from-orange-500 to-red-600",
                      bg: "from-orange-50 to-red-50",
                      border: "border-orange-200",
                    },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-br ${feature.bg} dark:from-gray-800 dark:to-gray-900 p-4 md:p-5 rounded-xl border ${feature.border} dark:border-gray-700`}
                    >
                      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                        <div
                          className={`p-2 bg-gradient-to-r ${feature.gradient} rounded-xl`}
                        >
                          <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* --- Main Resizer Card --- */}
            <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl md:shadow-2xl p-4 md:p-6 mb-8">
              {/* Upload Section */}
              <div className="mb-6 md:mb-8">
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                  <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl">
                    <Upload className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                      {hasFile ? "Change Image" : "Upload Image"}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Upload one JPG, PNG, or WebP image to resize
                    </p>
                  </div>
                </div>

                {/* FileUploader - Single file only */}
                <FileUploader
                  accept="image/*"
                  multiple={false}
                  onFilesSelected={handleFileSelected}
                />

                {/* Selected File Summary */}
                {hasFile && (
                  <div className="mt-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                          <ImageIcon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-green-700 dark:text-green-300 text-sm">
                            1 image selected
                          </p>
                          <p className="text-xs text-green-600 dark:text-green-400">
                            Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2 md:mt-0">
                        <button
                          onClick={handleReset}
                          className="px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors whitespace-nowrap"
                        >
                          Clear Image
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* --- Real-time Preview --- */}
              {hasFile && file && (
                <div className="mb-6 md:mb-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 md:p-6 border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Eye className="w-5 h-5 text-blue-500" />
                      Live Preview
                    </h3>
                  </div>

                  <RealTimePreview
                    file={file}
                    width={resizeOptions.width}
                    height={resizeOptions.height}
                    maintainAspectRatio={resizeOptions.maintainAspectRatio}
                    format={resizeOptions.format}
                    quality={resizeOptions.quality}
                  />

                  <div className="mt-4 text-sm text-blue-600 dark:text-blue-400">
                    <p className="flex items-center gap-2">
                      <RefreshCw className="w-3 h-3" />
                      Preview updates automatically as you change settings
                    </p>
                  </div>
                </div>
              )}

              {/* --- Resize Options --- */}
              {hasFile && (
                <div className="mb-8 md:mb-10 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-green-950/20 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Maximize2 className="w-5 h-5 text-green-500" />
                    Resize Options
                  </h3>

                  <div className="space-y-8">
                    {/* Preset Categories Filter */}
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3 text-base">
                        <Grid className="w-4 h-4 inline mr-2" />
                        Preset Categories
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <button
                          onClick={() => setActivePresetCategory("all")}
                          className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                            activePresetCategory === "all"
                              ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white border-gray-900"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          All Presets
                        </button>
                        {presetCategories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setActivePresetCategory(category.id)}
                            className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all flex items-center gap-1.5 ${
                              activePresetCategory === category.id
                                ? `bg-gradient-to-r ${category.color} text-white border-transparent`
                                : `${category.bgColor} text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600`
                            }`}
                          >
                            <category.icon className="w-3.5 h-3.5" />
                            {category.name}
                          </button>
                        ))}
                      </div>

                      {/* Preset Sizes Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {filteredPresets.map((preset, index) => (
                          <button
                            key={index}
                            onClick={() => handlePresetSelect(preset)}
                            className={`p-3 rounded-lg border transition-all duration-300 text-left group ${
                              resizeOptions.width === preset.width &&
                              resizeOptions.height === preset.height
                                ? "border-green-500 bg-green-50 dark:bg-green-900/20 shadow-md"
                                : "border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 hover:shadow-lg"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <preset.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              </div>
                              <div className="font-medium text-sm text-gray-900 dark:text-white">
                                {preset.name}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {preset.width} × {preset.height}
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              {preset.description}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Left Column - Custom Dimensions */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3 text-base">
                            Custom Dimensions
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                Width (px)
                              </label>
                              <input
                                type="number"
                                min="1"
                                max="10000"
                                value={resizeOptions.width}
                                onChange={(e) =>
                                  setResizeOptions((prev) => ({
                                    ...prev,
                                    width: parseInt(e.target.value) || 1,
                                  }))
                                }
                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900/50 text-base"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                Height (px)
                              </label>
                              <input
                                type="number"
                                min="1"
                                max="10000"
                                value={resizeOptions.height}
                                onChange={(e) =>
                                  setResizeOptions((prev) => ({
                                    ...prev,
                                    height: parseInt(e.target.value) || 1,
                                  }))
                                }
                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900/50 text-base"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Settings */}
                      <div className="space-y-6">
                        {/* Format Options */}
                        <div>
                          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3 text-base">
                            Output Format
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {(["jpg", "png", "webp"] as const).map((format) => (
                              <button
                                key={format}
                                onClick={() =>
                                  setResizeOptions((prev) => ({
                                    ...prev,
                                    format,
                                  }))
                                }
                                className={`px-3 py-2 rounded-lg border font-medium text-sm ${
                                  resizeOptions.format === format
                                    ? "border-green-500 bg-green-500 text-white"
                                    : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-green-300 dark:hover:border-green-700"
                                }`}
                              >
                                {format.toUpperCase()}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Quality Slider */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-700 dark:text-gray-300 text-base">
                              Quality
                            </h4>
                            <span className="text-sm font-bold text-green-600 dark:text-green-400">
                              {resizeOptions.quality}%
                            </span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="100"
                            value={resizeOptions.quality}
                            onChange={(e) =>
                              setResizeOptions((prev) => ({
                                ...prev,
                                quality: parseInt(e.target.value),
                              }))
                            }
                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500"
                          />
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>Low</span>
                            <span>High</span>
                          </div>
                        </div>

                        {/* Aspect Ratio Toggle */}
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-800 dark:to-green-900/20 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div>
                            <h4 className="font-medium text-gray-700 dark:text-gray-300 text-base">
                              Maintain Aspect Ratio
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Prevent image distortion
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              setResizeOptions((prev) => ({
                                ...prev,
                                maintainAspectRatio: !prev.maintainAspectRatio,
                              }))
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              resizeOptions.maintainAspectRatio
                                ? "bg-green-500"
                                : "bg-gray-300 dark:bg-gray-700"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                resizeOptions.maintainAspectRatio
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- File Preview and Resize Area --- */}
              {hasFile && (
                <div className="space-y-6 md:space-y-8">
                  {/* --- Input Image Preview --- */}
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-green-500" />
                        Uploaded Image Preview
                      </h3>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                        className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Change Image
                      </motion.button>
                    </div>

                    {/* Image Preview Container */}
                    <div className="w-full flex justify-center p-4 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-green-950/20 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="w-full max-w-md">
                        <ImagePreview
                          file={file}
                          filename={file.name}
                          onRemove={handleRemoveFile}
                          status="Ready to Resize"
                          index={0}
                        />
                      </div>
                    </div>
                  </div>

                  {/* --- Progress and Action Buttons --- */}
                  <div className="space-y-6">
                    {resizing && (
                      <div className="space-y-4">
                        <ProgressBar
                          progress={progress}
                          label="Resizing image..."
                        />
                        <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                          <Sparkles className="w-5 h-5 animate-pulse" />
                          <span className="text-sm font-medium">
                            Processing your image...
                          </span>
                        </div>
                      </div>
                    )}

                    {isReadyToResize && (
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleResize}
                        className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg flex items-center justify-center gap-3"
                      >
                        <Maximize2 className="w-5 h-5" />
                        {resizeOptions.width >= 3840 ? "Resize to 4K UHD" :
                         resizeOptions.width >= 2560 ? "Resize to 2K QHD" :
                         resizeOptions.width >= 1920 ? "Resize to Full HD" :
                         `Resize to ${resizeOptions.width}×${resizeOptions.height}px`}
                        <Zap className="w-5 h-5" />
                      </motion.button>
                    )}
                  </div>
                </div>
              )}

              {/* How-to Steps Section */}
              <section className="mt-12 md:mt-20">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10">
                  How to Resize Images Online
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {[
                    {
                      number: "1",
                      title: "Upload Image",
                      desc: "Upload JPG, PNG, or WebP images using drag & drop or file picker.",
                    },
                    {
                      number: "2",
                      title: "Select Size & Presets",
                      desc: "Choose presets like Full HD, 4K, Instagram, or enter custom dimensions.",
                    },
                    {
                      number: "3",
                      title: "Resize with Live Preview",
                      desc: "Adjust quality, maintain aspect ratio, and preview changes instantly.",
                    },
                    {
                      number: "4",
                      title: "Download Image",
                      desc: "Download resized images in high quality instantly.",
                    },
                  ].map((step, index) => (
                    <div
                      key={index}
                      className="border rounded-xl p-6 text-center shadow-sm bg-white dark:bg-gray-800"
                    >
                      <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                        {step.number}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* --- Results and Download Area --- */}
            {hasResult && resizedFile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl md:rounded-2xl border border-green-200 dark:border-green-800/50 p-4 md:p-8 shadow-xl mb-8"
              >
                {/* Success Header */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 md:mb-8">
                  <div className="flex items-center justify-center md:justify-start">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2">
                      Resizing Complete! 🎉
                    </h2>
                    <p className="text-green-700 dark:text-green-300 font-medium text-base md:text-lg">
                      {resizeOptions.width >= 3840 ? "Successfully resized to 4K UHD" :
                       resizeOptions.width >= 2560 ? "Successfully resized to 2K QHD" :
                       resizeOptions.width >= 1920 ? "Successfully resized to Full HD" :
                       `Successfully resized to ${resizeOptions.width}×${resizeOptions.height}px`}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      Format: {resizeOptions.format.toUpperCase()} • Quality:{" "}
                      {resizeOptions.quality}% • Ready for download
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl text-sm md:text-base">
                      HD Ready
                    </div>
                  </div>
                </div>

                {/* --- Output Resized Preview --- */}
                <div className="space-y-4 mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Download className="w-5 h-5 text-green-500" />
                    Resized Image
                  </h3>

                  {/* Image Preview Container */}
                  <div className="w-full flex justify-center p-4 bg-white/60 dark:bg-gray-900/60 rounded-xl border border-green-100 dark:border-green-800/30">
                    <div className="w-full max-w-md">
                      <ImagePreview
                        file={resizedFile.blob}
                        filename={resizedFile.name}
                        status="Resized ✓"
                        isDownloadable={true}
                        index={0}
                        originalDimensions={resizedFile.originalSize}
                        newDimensions={resizedFile.newSize}
                      />
                    </div>
                  </div>
                </div>

                {/* --- Download Button --- */}
                <div className="space-y-6">
                  {/* Download Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownload}
                    className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-3"
                  >
                    <Download className="w-6 h-6" />
                    Download HD Image
                    <Sparkles className="w-5 h-5" />
                  </motion.button>

                  {/* Resize More Button */}
                  <div className="text-center">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-6 py-3 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium hover:bg-green-50 dark:hover:bg-green-950/30 rounded-xl transition-colors text-base"
                    >
                      <Maximize2 className="w-5 h-5" />
                      Resize Another Image
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- Stats Footer --- */}
            <div className="mt-10 md:mt-14">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {[
                    {
                      value: file ? 1 : 0,
                      label: "File Uploaded",
                      color: "text-green-600",
                      bg: "bg-green-50 dark:bg-green-900/10",
                    },
                    {
                      value: file
                        ? `${(file.size / 1024 / 1024).toFixed(1)} MB`
                        : "0 MB",
                      label: "Original Size",
                      color: "text-blue-600",
                      bg: "bg-blue-50 dark:bg-blue-900/10",
                    },
                    {
                      value: resizedFile ? 1 : 0,
                      label: "File Resized",
                      color: "text-emerald-600",
                      bg: "bg-emerald-50 dark:bg-emerald-900/10",
                    },
                    {
                      value: resizedFile
                        ? `${(
                            ((file!.size - resizedFile.blob.size) /
                              file!.size) *
                            100
                          ).toFixed(1)}%`
                        : "0%",
                      label: "Size Change",
                      color: "text-purple-600",
                      bg: "bg-purple-50 dark:bg-purple-900/10",
                    },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className={`flex flex-col justify-center items-center rounded-xl border border-gray-200 dark:border-gray-800 ${stat.bg} p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300`}
                    >
                      <div
                        className={`text-xl md:text-2xl font-extrabold ${stat.color} dark:${stat.color.replace("600", "400")}`}
                      >
                        {stat.value}
                      </div>
                      <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Explore All Tools Section */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    Explore All Tools
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                    10+ specialized PDF, image, and document tools
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {exploreTools.slice(0, 8).map((tool, index) => (
                  <motion.a
                    key={tool.id}
                    href={tool.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 md:p-5 hover:border-blue-300 dark:hover:border-cyan-700 transition-all shadow-lg hover:shadow-2xl"
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div
                        className={`p-2 md:p-3 bg-gradient-to-br ${tool.color} rounded-xl shadow-lg`}
                      >
                        <span className="text-lg md:text-xl">
                          {tool.icon}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg mb-1 md:mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mb-3 md:mb-4">
                          {tool.description}
                        </p>
                        <div className="flex items-center gap-2 text-blue-600 dark:text-cyan-400 font-medium text-sm">
                          <span>Use Tool</span>
                          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all text-sm"
                >
                  <Grid className="w-4 h-4" />
                  <span>View All</span>
                </Link>
              </div>

              {/* Visible FAQ Section */}
              <section className="max-w-3xl mx-auto my-12 md:my-16">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Everything you need to know about resizing images online
                  </p>
                </div>

                <div className="space-y-3 md:space-y-4">
                  {faqData.map((faq, index) => (
                    <details
                      key={index}
                      className="group border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800"
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
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}