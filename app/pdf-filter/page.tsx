"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
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

// --- Import pdfjs-dist with proper configuration ---
import * as pdfjsLib from "pdfjs-dist";

// --- Set PDF.js worker to local file ---
if (typeof window !== "undefined" && typeof document !== "undefined") {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
  } catch (error) {
    console.warn("Failed to set PDF.js worker source:", error);
  }
}

// --- Types ---
interface FilterEffect {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: "basic" | "color" | "artistic";
  apply: (imageData: ImageData) => ImageData;
  description: string;
}

interface ProcessedImage {
  id: string;
  blob: Blob;
  name: string;
  originalFile: File;
  timestamp: number;
  originalSize: number;
  processedSize: number;
  appliedFilters: string[];
  previewUrl: string;
  isPdf?: boolean;
  pageNumber?: number;
  pdfName?: string;
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

// --- Filter Definitions ---
const grayscaleFilter = (imageData: ImageData): ImageData => {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  }
  return imageData;
};

const sepiaFilter = (imageData: ImageData): ImageData => {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
    data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
    data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
  }
  return imageData;
};

const invertFilter = (imageData: ImageData): ImageData => {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i];
    data[i + 1] = 255 - data[i + 1];
    data[i + 2] = 255 - data[i + 2];
  }
  return imageData;
};

const vignetteFilter = (imageData: ImageData): ImageData => {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const vignette = 1 - (dist / maxDist) * 0.7;
      data[idx] = data[idx] * vignette;
      data[idx + 1] = data[idx + 1] * vignette;
      data[idx + 2] = data[idx + 2] * vignette;
    }
  }
  return imageData;
};

const warmFilter = (imageData: ImageData): ImageData => {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, data[i] * 1.2);
    data[i + 1] = Math.min(255, data[i + 1] * 1.05);
    data[i + 2] = Math.min(255, data[i + 2] * 0.8);
  }
  return imageData;
};

const coolFilter = (imageData: ImageData): ImageData => {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, data[i] * 0.8);
    data[i + 1] = Math.min(255, data[i + 1] * 1.05);
    data[i + 2] = Math.min(255, data[i + 2] * 1.2);
  }
  return imageData;
};

const vintageFilter = (imageData: ImageData): ImageData => {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    data[i] = Math.min(255, r * 1.1 + g * 0.1);
    data[i + 1] = Math.min(255, g * 0.9 + b * 0.1);
    data[i + 2] = Math.min(255, b * 0.8);
  }
  return imageData;
};

const noirFilter = (imageData: ImageData): ImageData => {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    const highContrast = Math.min(255, Math.max(0, (gray - 128) * 1.8 + 128));
    data[i] = highContrast;
    data[i + 1] = highContrast;
    data[i + 2] = highContrast;
  }
  return imageData;
};

const oilPaintFilter = (imageData: ImageData): ImageData => {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  const radius = 3;
  const intensity = 20;

  const newData = new Uint8ClampedArray(data);

  for (let y = radius; y < height - radius; y++) {
    for (let x = radius; x < width - radius; x++) {
      const idx = (y * width + x) * 4;
      let r = 0,
        g = 0,
        b = 0,
        count = 0;

      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const px = x + dx;
          const py = y + dy;
          const pIdx = (py * width + px) * 4;
          const diff =
            Math.abs(data[pIdx] - data[idx]) +
            Math.abs(data[pIdx + 1] - data[idx + 1]) +
            Math.abs(data[pIdx + 2] - data[idx + 2]);
          if (diff < intensity * 3) {
            r += data[pIdx];
            g += data[pIdx + 1];
            b += data[pIdx + 2];
            count++;
          }
        }
      }

      if (count > 0) {
        newData[idx] = r / count;
        newData[idx + 1] = g / count;
        newData[idx + 2] = b / count;
      }
    }
  }

  return new ImageData(newData, width, height);
};

const sketchFilter = (imageData: ImageData): ImageData => {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  const newData = new Uint8ClampedArray(data);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      const gray =
        data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114;
      const gx =
        -data[(y - 1) * width + (x - 1)] * 0.299 +
        data[(y - 1) * width + (x + 1)] * 0.299 -
        2 * data[y * width + (x - 1)] * 0.299 +
        2 * data[y * width + (x + 1)] * 0.299 -
        data[(y + 1) * width + (x - 1)] * 0.299 +
        data[(y + 1) * width + (x + 1)] * 0.299;
      const gy =
        -data[(y - 1) * width + (x - 1)] * 0.299 -
        2 * data[(y - 1) * width + x] * 0.299 -
        data[(y - 1) * width + (x + 1)] * 0.299 +
        data[(y + 1) * width + (x - 1)] * 0.299 +
        2 * data[(y + 1) * width + x] * 0.299 +
        data[(y + 1) * width + (x + 1)] * 0.299;
      const magnitude = Math.sqrt(gx * gx + gy * gy);
      const edge = Math.min(255, Math.max(0, 255 - magnitude * 2));
      newData[idx] = edge;
      newData[idx + 1] = edge;
      newData[idx + 2] = edge;
    }
  }

  return new ImageData(newData, width, height);
};

const neonFilter = (imageData: ImageData): ImageData => {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    data[i] = Math.min(255, r * 1.5 + g * 0.3);
    data[i + 1] = Math.min(255, g * 1.5 + b * 0.3);
    data[i + 2] = Math.min(255, b * 1.5 + r * 0.3);
  }
  return imageData;
};

// Filter definitions with categories
const filterDefinitions: FilterEffect[] = [
  {
    id: "original",
    name: "Original",
    icon: <ImageIcon className="w-4 h-4" />,
    category: "basic",
    description: "Original image without any filter",
    apply: (imageData) => imageData,
  },
  {
    id: "grayscale",
    name: "Grayscale",
    icon: <div className="w-4 h-4 rounded bg-gradient-to-r from-gray-300 to-gray-500" />,
    category: "basic",
    description: "Convert image to black and white",
    apply: grayscaleFilter,
  },
  {
    id: "sepia",
    name: "Sepia",
    icon: <div className="w-4 h-4 rounded bg-gradient-to-r from-amber-300 to-amber-600" />,
    category: "basic",
    description: "Warm vintage brown tone",
    apply: sepiaFilter,
  },
  {
    id: "invert",
    name: "Invert",
    icon: <div className="w-4 h-4 rounded bg-gradient-to-r from-black to-white" />,
    category: "basic",
    description: "Invert all colors (negative effect)",
    apply: invertFilter,
  },
  {
    id: "vignette",
    name: "Vignette",
    icon: <div className="w-4 h-4 rounded border-2 border-gray-500 bg-gradient-to-br from-transparent to-black" />,
    category: "basic",
    description: "Darken edges for focus effect",
    apply: vignetteFilter,
  },
  {
    id: "warm",
    name: "Warm",
    icon: <Sun className="w-4 h-4" />,
    category: "color",
    description: "Warm golden tone",
    apply: warmFilter,
  },
  {
    id: "cool",
    name: "Cool",
    icon: <Snowflake className="w-4 h-4" />,
    category: "color",
    description: "Cool blue tone",
    apply: coolFilter,
  },
  {
    id: "vintage",
    name: "Vintage",
    icon: <Coffee className="w-4 h-4" />,
    category: "color",
    description: "Retro vintage color tone",
    apply: vintageFilter,
  },
  {
    id: "noir",
    name: "Noir",
    icon: <div className="w-4 h-4 rounded bg-gradient-to-r from-gray-700 to-black" />,
    category: "color",
    description: "High contrast film noir style",
    apply: noirFilter,
  },
  {
    id: "oil-paint",
    name: "Oil Paint",
    icon: <Palette className="w-4 h-4" />,
    category: "artistic",
    description: "Oil painting effect",
    apply: oilPaintFilter,
  },
  {
    id: "sketch",
    name: "Sketch",
    icon: <PenTool className="w-4 h-4" />,
    category: "artistic",
    description: "Pencil sketch effect",
    apply: sketchFilter,
  },
  {
    id: "neon",
    name: "Neon",
    icon: <ZapIcon className="w-4 h-4" />,
    category: "artistic",
    description: "Glowing neon colors",
    apply: neonFilter,
  },
];

// --- Helper Functions ---
// Convert a single image blob to PDF
const convertImageToPdf = async (imageBlob: Blob, filename: string): Promise<Blob> => {
  const { PDFDocument } = await import('pdf-lib');
  const pdfDoc = await PDFDocument.create();
  
  const imageArrayBuffer = await imageBlob.arrayBuffer();
  let embeddedImage;
  
  if (imageBlob.type === 'image/png') {
    embeddedImage = await pdfDoc.embedPng(imageArrayBuffer);
  } else {
    embeddedImage = await pdfDoc.embedJpg(imageArrayBuffer);
  }

  const page = pdfDoc.addPage([embeddedImage.width, embeddedImage.height]);
  page.drawImage(embeddedImage, {
    x: 0,
    y: 0,
    width: embeddedImage.width,
    height: embeddedImage.height,
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
};

// Convert images to PDF using pdf-lib
const convertImagesToPdf = async (images: ProcessedImage[]): Promise<Blob> => {
  const { PDFDocument } = await import('pdf-lib');
  const pdfDoc = await PDFDocument.create();

  for (const image of images) {
    try {
      const imageArrayBuffer = await image.blob.arrayBuffer();
      let embeddedImage;
      
      if (image.blob.type === 'image/png') {
        embeddedImage = await pdfDoc.embedPng(imageArrayBuffer);
      } else {
        embeddedImage = await pdfDoc.embedJpg(imageArrayBuffer);
      }

      const page = pdfDoc.addPage([embeddedImage.width, embeddedImage.height]);
      page.drawImage(embeddedImage, {
        x: 0,
        y: 0,
        width: embeddedImage.width,
        height: embeddedImage.height,
      });
    } catch (error) {
      console.error('Error embedding image:', error);
    }
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
};

// --- PDF Preview Component (Mobile Disabled - Kept as requested) ---
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

  // Detect mobile device - KEPT for mobile preview disabled
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

  // Handle click to open preview - DISABLED ON MOBILE (KEPT)
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

// --- Image Preview with Filter Component ---
const FilteredImagePreview = ({
  file,
  onRemove,
  status,
  isDownloadable = false,
  filename = "image.jpg",
  index,
  originalSize,
  processedSize,
  selectedFilter,
  isPdf = false,
  pageNumber,
  pdfName,
  onDownloadPdf,
}: {
  file: Blob | File;
  onRemove?: () => void;
  status: string;
  isDownloadable?: boolean;
  filename: string;
  index: number;
  originalSize?: number;
  processedSize?: number;
  selectedFilter?: string;
  isPdf?: boolean;
  pageNumber?: number;
  pdfName?: string;
  onDownloadPdf?: () => void;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isPdfFile, setIsPdfFile] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Detect mobile device - KEPT for mobile preview disabled
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

      // REMOVED mobile timeout - now same for all devices
      const timeoutDuration = 5000;

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
    status && status.includes("Applied")
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

  const getFilterName = (id?: string) => {
    if (!id || id === "original") return "Original";
    const filter = filterDefinitions.find(f => f.id === id);
    return filter ? filter.name : "Original";
  };

  // If it's a PDF file, show PDF preview with mobile disabled (KEPT)
  if (isPdfFile) {
    return (
      <PdfPreview
        file={file}
        filename={filename}
        onDownload={onDownloadPdf}
      />
    );
  }

  // Handle image preview click - REMOVED mobile restriction for images (only PDF preview disabled on mobile)
  const handleImageClick = () => {
    // Check if it's a PDF file - only PDF preview disabled on mobile
    const isPdfByType = file.type === "application/pdf";
    const isPdfByExtension = filename.toLowerCase().endsWith('.pdf');
    const isPdfByFlag = isPdf === true;
    
    if ((isPdfByType || isPdfByExtension || isPdfByFlag) && isMobileDevice) {
      alert("PDF preview is not available on mobile devices. Please download the file to view it.");
      return;
    }
    
    if (previewUrl && !error) {
      setPreviewOpen(true);
    }
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
                  />
                )}
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
          {/* Image Number Badge */}
          <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
            #{index + 1}
            {isPdf && pageNumber && ` (Pg ${pageNumber})`}
            {isPdf && pdfName && ` - ${pdfName.substring(0, 15)}${pdfName.length > 15 ? "..." : ""}`}
          </div>

          {/* Filter Badge */}
          {selectedFilter && selectedFilter !== "original" && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
              {getFilterName(selectedFilter)}
            </div>
          )}

          {/* Image Container */}
          <div
            className={`relative w-full h-36 mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden ${
              !(isPdf && isMobileDevice) ? 'cursor-pointer group/image' : 'cursor-default'
            }`}
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
                {isPdf && isMobileDevice && (
                  <span className="text-xs text-amber-500 mt-1">
                    📱 Tap download to view
                  </span>
                )}
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
                  <Eye className="w-8 h-8 text-white" />
                </div>
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
                  status.includes("Applied") ? "bg-green-500" : "bg-blue-500"
                }`}
              >
                {status}
              </span>

              {/* File Size Info */}
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

          {/* Action Buttons - Only PDF Download */}
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Remove Button (For Input Files) */}
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

            {/* Download as PDF Button */}
            {isDownloadable && onDownloadPdf && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onDownloadPdf}
                className="p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                title="Download as PDF"
              >
                <File className="w-4 h-4" />
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
export default function ImageFilterTool() {
  const [file, setFile] = useState<File | null>(null);
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
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [processingPdf, setProcessingPdf] = useState(false);

  // Filter state
  const [selectedFilter, setSelectedFilter] = useState<string>("original");
  const [activeCategory, setActiveCategory] = useState<string>("basic");

  // Generate unique filename
  const generateUniqueFileName = (
    baseName: string,
    index: number,
    filterId: string,
    isPdf: boolean = false,
    pageNum?: number
  ) => {
    const timestamp = new Date().getTime();
    const randomId = Math.random().toString(36).substring(2, 9);
    const cleanBaseName = baseName
      .replace(/\.(png|jpg|jpeg|pdf)$/i, "")
      .replace(/\.[^/.]+$/, "");
    const filterName = filterId === "original" ? "" : `_${filterId}`;
    const sequence = (index + 1).toString().padStart(3, "0");
    const pageSuffix = isPdf && pageNum ? `_page${pageNum}` : "";
    return `${cleanBaseName}${filterName}${pageSuffix}_${sequence}_${timestamp}_${randomId}.jpg`;
  };

  // Auto-scroll notifications
  useEffect(() => {
    if (notificationsRef.current && downloadNotifications.length > 0) {
      notificationsRef.current.scrollTop = notificationsRef.current.scrollHeight;
    }
  }, [downloadNotifications]);

  // Apply filters and adjustments to an image
  const applyFiltersToImage = useCallback(
    (imageData: ImageData): ImageData => {
      let result = imageData;

      if (selectedFilter && selectedFilter !== "original") {
        const filter = filterDefinitions.find((f) => f.id === selectedFilter);
        if (filter) {
          result = filter.apply(result);
        }
      }

      return result;
    },
    [selectedFilter]
  );

  // Process a single image blob
  const processImageBlob = useCallback(
    async (blob: Blob, originalFile: File, index: number, isPdf: boolean = false, pageNum?: number): Promise<ProcessedImage> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Cannot get canvas context"));
          return;
        }

        const url = URL.createObjectURL(blob);
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          imageData = applyFiltersToImage(imageData);
          ctx.putImageData(imageData, 0, 0);

          canvas.toBlob(
            (processedBlob) => {
              if (processedBlob) {
                const uniqueFilename = generateUniqueFileName(
                  originalFile.name,
                  index,
                  selectedFilter,
                  isPdf,
                  pageNum
                );
                const previewUrl = URL.createObjectURL(processedBlob);

                resolve({
                  id: `processed_${Date.now()}_${index}`,
                  blob: processedBlob,
                  name: uniqueFilename,
                  originalFile: originalFile,
                  timestamp: Date.now(),
                  originalSize: blob.size,
                  processedSize: processedBlob.size,
                  appliedFilters: [selectedFilter],
                  previewUrl: previewUrl,
                  isPdf: isPdf,
                  pageNumber: pageNum,
                  pdfName: isPdf ? originalFile.name : undefined,
                });
              } else {
                reject(new Error("Failed to create blob"));
              }
            },
            "image/jpeg",
            0.92
          );

          URL.revokeObjectURL(url);
        };

        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error("Failed to load image"));
        };

        img.src = url;
      });
    },
    [applyFiltersToImage, selectedFilter]
  );

  // Process PDF file
  const processPdfFile = useCallback(
    async (pdfFile: File): Promise<ProcessedImage[]> => {
      const results: ProcessedImage[] = [];
      
      try {
        const arrayBuffer = await pdfFile.arrayBuffer();
        const { getDocument } = pdfjsLib;
        const pdf = await getDocument({ data: arrayBuffer }).promise;

        const totalPages = pdf.numPages;

        for (let i = 1; i <= totalPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d")!;
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          await page.render(renderContext).promise;

          const blob = await new Promise<Blob>((resolve) => {
            canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.92);
          });

          const processed = await processImageBlob(blob, pdfFile, results.length, true, i);
          results.push(processed);

          setProgress((i / totalPages) * 100);
        }
      } catch (error) {
        console.error("Error processing PDF:", error);
        setErrorMessage(`Failed to process PDF: ${pdfFile.name}`);
      }

      return results;
    },
    [processImageBlob]
  );

  // Process file (only single PDF)
  const handleProcess = async () => {
    if (!file) return;

    setProcessing(true);
    setProgress(0);
    setProcessedImages([]);
    setShowFeatures(false);
    setErrorMessage("");

    try {
      if (file.type !== "application/pdf") {
        setErrorMessage("Only PDF files are allowed.");
        setProcessing(false);
        return;
      }

      setProcessingPdf(true);
      const pdfResults = await processPdfFile(file);
      setProcessedImages(pdfResults);
      setProcessingPdf(false);

      if (pdfResults.length === 0) {
        setErrorMessage("No pages could be processed. Please try again with a valid PDF file.");
      }
    } catch (error: any) {
      console.error("Processing error:", error);
      setErrorMessage(error.message || "Failed to process file. Please try again.");
    } finally {
      setProcessing(false);
      setProcessingPdf(false);
    }
  };

  // Download individual page as PDF
  const handleDownloadIndividualPdf = async (index: number) => {
    const item = processedImages[index];
    if (!item || !item.blob || item.blob.size === 0) {
      setErrorMessage("Cannot download this file. It may be corrupted or failed to process.");
      return;
    }

    try {
      const pdfBlob = await convertImageToPdf(item.blob, item.name);
      const pdfFileName = item.name.replace(/\.(jpg|jpeg|png)$/i, '.pdf');
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
      setErrorMessage("Failed to create PDF. Please try again.");
    }
  };

  // Download as Single PDF (combine all pages)
  const handleDownloadAsSinglePdf = async () => {
    if (processedImages.length === 0) return;

    setCreatingSinglePdf(true);

    try {
      const validFiles = processedImages.filter((item) => item.blob && item.blob.size > 0);

      if (validFiles.length === 0) {
        throw new Error("No valid files to combine into PDF");
      }

      const pdfBlob = await convertImagesToPdf(validFiles);
      
      const timestamp = new Date().getTime();
      const filterName = selectedFilter !== "original" ? `_${selectedFilter}` : "";
      const pdfFileName = file ? file.name.replace(/\.pdf$/i, '') : 'document';
      const finalFileName = `${pdfFileName}${filterName}_filtered_${timestamp}.pdf`;
      
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

  // Download All Pages as PDFs in ZIP
  const handleDownloadAllAsZip = async () => {
    if (processedImages.length === 0) return;

    setCreatingZip(true);

    try {
      const validFiles = processedImages.filter((item) => item.blob && item.blob.size > 0);

      if (validFiles.length === 0) {
        throw new Error("No valid files to download");
      }

      const filesForZip = await Promise.all(
        validFiles.map(async (item) => {
          const pdfBlob = await convertImageToPdf(item.blob, item.name);
          const pdfFileName = item.name.replace(/\.(jpg|jpeg|png)$/i, '.pdf');
          return {
            name: pdfFileName,
            blob: pdfBlob,
          };
        })
      );

      const timestamp = new Date().getTime();
      const zipFileName = file ? `pages_${file.name.replace(/\.pdf$/i, '')}_${timestamp}.zip` : `pdf_pages_${timestamp}.zip`;
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

  const handleRemoveFile = () => {
    setFile(null);
    setProcessedImages([]);
    setShowFeatures(true);
    setErrorMessage("");
  };

  const handleFilesSelected = (newFiles: File[]) => {
    // Only allow single file
    const pdfFiles = newFiles.filter(f => f.type === "application/pdf");
    
    if (pdfFiles.length === 0) {
      alert("Only PDF files are allowed. Please select a PDF file.");
      return;
    }

    if (pdfFiles.length > 1) {
      alert("Please select only one PDF file at a time.");
      return;
    }

    const selectedFile = pdfFiles[0];

    // REMOVED mobile file size limit - now unlimited for all devices

    setFile(selectedFile);
    setProcessedImages([]);
    setShowFeatures(false);
    setErrorMessage("");
  };

  const handleReset = () => {
    setFile(null);
    setProcessedImages([]);
    setProgress(0);
    setShowFeatures(true);
    setErrorMessage("");
  };

  const handleFilterSelect = (filterId: string) => {
    setSelectedFilter(filterId);
    setProcessedImages([]);
  };

  const hasFile = file !== null;
  const hasResults = processedImages.length > 0;
  const isReadyToProcess = hasFile && !hasResults && !processing;
  const totalSize = file ? file.size : 0;
  const totalProcessedSize = processedImages.reduce(
    (acc, item) => acc + (item.processedSize || 0),
    0
  );
  const sizeReduction =
    totalSize > 0 && totalProcessedSize > 0
      ? Math.max(0, ((totalSize - totalProcessedSize) / totalSize) * 100).toFixed(1)
      : "0";

  const getFiltersByCategory = (category: string) => {
    return filterDefinitions.filter((f) => f.category === category);
  };

  const categories = [
    { id: "basic", name: "Basic", icon: <Filter className="w-4 h-4" /> },
    { id: "color", name: "Color", icon: <Palette className="w-4 h-4" /> },
    { id: "artistic", name: "Artistic", icon: <PenTool className="w-4 h-4" /> },
  ];

  // Show error message in alert if exists
  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
    }
  }, [errorMessage]);

  // Clean up object URLs
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

      {/* Download Success Notifications */}
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
                  className="inline-flex items-center justify-center w-16 h-14 md:w-20 md:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl md:rounded-3xl mb-3 md:mb-4 shadow-xl"
                >
                  <span className="flex items-center justify-center gap-1 text-2xl md:text-3xl text-white select-none">
                    <span>📄</span>
                    <span>✨</span>
                  </span>
                </motion.div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-2 sm:mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent px-2">
                  PDF Filter Online Free - Grayscale & More | PDFSwift
                </h1>

                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
                  Filter PDF online for free. Apply Grayscale, Sepia, Invert, Black & White, Vintage, Warm, Cool, Oil Paint and Neon effects. Preview your filtered PDF before downloading, then download as a single PDF file or individual PDFs in ZIP.
                  <span className="block text-purple-600 dark:text-purple-400 font-medium mt-1 text-xs sm:text-sm md:text-base">
                    Upload a single PDF file to apply filters on each page
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
                      icon: Filter,
                      title: "Professional Filters",
                      desc: "Apply grayscale, sepia, vintage, oil paint, sketch and more to PDF pages",
                      gradient: "from-purple-500 to-pink-600",
                      bg: "from-purple-50 to-pink-50",
                      border: "border-purple-200",
                    },
                    {
                      icon: Shield,
                      title: "Secure Processing",
                      desc: "All processing happens locally in your browser. Your PDFs never leave your device",
                      gradient: "from-green-500 to-emerald-600",
                      bg: "from-green-50 to-emerald-50",
                      border: "border-green-200",
                    },
                    {
                      icon: File,
                      title: "Single PDF",
                      desc: "Upload a single PDF file and apply filters to all pages",
                      gradient: "from-red-500 to-pink-600",
                      bg: "from-red-50 to-pink-50",
                      border: "border-red-200",
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

            {/* --- Main Filter Studio Card --- */}
            <div className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-lg sm:shadow-xl md:shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
              {/* Upload Section */}
              <div className="mb-4 sm:mb-6 md:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg sm:rounded-xl">
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      {hasFile ? "Uploaded PDF" : "Upload a Single PDF File"}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Upload one PDF file to apply filters to each page
                    </p>
                  </div>
                </div>

                <FileUploader
                  accept="application/pdf"
                  multiple={false}
                  onFilesSelected={handleFilesSelected}
                  key={file ? file.name : 'uploader'}
                />

                {hasFile && (
                  <div className="mt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                          <File className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-purple-700 dark:text-purple-300">
                            {file.name}
                          </p>
                          <p className="text-xs text-purple-600 dark:text-purple-400">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleRemoveFile}
                          className="px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                        <button
                          onClick={handleReset}
                          className="px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          Clear All
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* --- Filter Selection Section --- */}
              {hasFile && !hasResults && !processing && (
                <div className="space-y-4 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                      Choose Filter Effect
                    </h3>
                  </div>

                  {/* Category Tabs */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-1 ${
                          activeCategory === category.id
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        {category.icon}
                        {category.name}
                      </button>
                    ))}
                  </div>

                  {/* Filter Grid */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    {getFiltersByCategory(activeCategory).map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => handleFilterSelect(filter.id)}
                        className={`p-2 rounded-lg text-center transition-all ${
                          selectedFilter === filter.id
                            ? "bg-purple-600 text-white shadow-lg ring-2 ring-purple-400"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                        }`}
                      >
                        <div className="flex justify-center mb-1">{filter.icon}</div>
                        <span className="text-xs font-medium">{filter.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Process Button */}
                  {isReadyToProcess && (
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleProcess}
                      disabled={processing}
                      className="w-full py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      Process PDF Pages
                      <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    </motion.button>
                  )}
                </div>
              )}

              {/* --- Progress Indicator --- */}
              {processing && (
                <div className="space-y-3 sm:space-y-4">
                  <ProgressBar
                    progress={progress}
                    label={
                      processingPdf
                        ? "Processing PDF pages..."
                        : "Processing file..."
                    }
                  />
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-purple-600 dark:text-purple-400">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                    <span className="text-xs sm:text-sm font-medium">
                      {processingPdf
                        ? "Extracting and processing PDF pages..."
                        : "Applying filters to PDF pages..."}
                    </span>
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
                      PDF Processing Complete! 🎉
                    </h2>
                    <p className="text-green-700 dark:text-green-300 font-medium text-sm sm:text-base">
                      Successfully processed {processedImages.length} pages
                      {sizeReduction !== "0" && ` • ${sizeReduction}% average size reduction`}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-1">
                      Applied filter:{" "}
                      {selectedFilter !== "original"
                        ? filterDefinitions.find((f) => f.id === selectedFilter)?.name ||
                          selectedFilter
                        : "Original"}
                    </p>
                  </div>
                  <div className="flex items-center justify-center mt-2 sm:mt-0">
                    <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base">
                      {processedImages.length} Pages
                    </div>
                  </div>
                </div>

                {/* Output Processed Images Previews */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 md:mb-8">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    Processed Pages
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto p-3 sm:p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-green-100 dark:border-green-800/30">
                    {processedImages.map((item, index) => (
                      <FilteredImagePreview
                        key={index}
                        file={item.blob}
                        filename={item.name}
                        status="Applied ✓"
                        isDownloadable={true}
                        index={index}
                        originalSize={item.originalSize}
                        processedSize={item.processedSize}
                        selectedFilter={selectedFilter}
                        isPdf={item.isPdf}
                        pageNumber={item.pageNumber}
                        pdfName={item.pdfName}
                        onDownloadPdf={() => handleDownloadIndividualPdf(index)}
                      />
                    ))}
                  </div>
                </div>

                {/* Download Buttons - Only PDF Downloads */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Download as Single PDF */}
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
                          {processedImages.length} pages
                        </span>
                      </>
                    )}
                  </motion.button>

                  {/* Download All Pages as PDFs in ZIP */}
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
                        Download All Pages as PDFs (ZIP)
                        <span className="text-xs px-2 py-1 bg-white/20 rounded-full">
                          {processedImages.length} files
                        </span>
                      </>
                    )}
                  </motion.button>

                  <div className="text-center">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium hover:bg-purple-50 dark:hover:bg-purple-950/30 rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm md:text-base"
                    >
                      <File className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                      Process Another PDF
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- Stats Footer --- */}
            {(hasFile || hasResults) && (
              <div className="mt-10 sm:mt-14">
                <div className="max-w-6xl mx-auto px-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                    {[
                      {
                        value: file ? 1 : 0,
                        label: "PDF Uploaded",
                        color: "text-purple-600",
                        bg: "bg-purple-50 dark:bg-purple-900/10",
                      },
                      {
                        value: file ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : "0 MB",
                        label: "File Size",
                        color: "text-blue-600",
                        bg: "bg-blue-50 dark:bg-blue-900/10",
                      },
                      {
                        value: processedImages.length,
                        label: "Pages Processed",
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

            {/* --- How to Use Section --- */}
            <section className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-10">
                How to Apply Filters to PDF Pages
              </h2>

              <div className="grid gap-6 md:grid-cols-4">
                <div className="border rounded-xl p-6 text-center shadow-sm bg-white dark:bg-gray-800">
                  <div className="text-4xl font-bold text-purple-600 mb-2">1</div>
                  <h3 className="font-semibold text-lg">Upload PDF</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    Upload a single PDF file
                  </p>
                </div>

                <div className="border rounded-xl p-6 text-center shadow-sm bg-white dark:bg-gray-800">
                  <div className="text-4xl font-bold text-purple-600 mb-2">2</div>
                  <h3 className="font-semibold text-lg">Choose Filter</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    Browse and select from professional filter effects
                  </p>
                </div>

                <div className="border rounded-xl p-6 text-center shadow-sm bg-white dark:bg-gray-800">
                  <div className="text-4xl font-bold text-purple-600 mb-2">3</div>
                  <h3 className="font-semibold text-lg">Process</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    Click process to apply filters to all pages
                  </p>
                </div>

                <div className="border rounded-xl p-6 text-center shadow-sm bg-white dark:bg-gray-800">
                  <div className="text-4xl font-bold text-purple-600 mb-2">4</div>
                  <h3 className="font-semibold text-lg">Download</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    Download as single PDF or individual PDFs in ZIP
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

            {/* --- FAQ Section --- */}
            <section className="max-w-4xl mx-auto my-10 sm:my-14 md:my-20 px-3 sm:px-4">
              <div className="text-center mb-6 sm:mb-8 md:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </h2>
                <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Everything you need to know about applying filters to PDFs
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {[
                  {
                    question: "Can I upload multiple PDF files?",
                    answer: `No, this tool supports uploading only a single PDF file at a time. You can process one PDF file and then upload another if needed.`
                  },
                  {
                    question: "Can I download individual pages as PDF?",
                    answer: `Yes! Each processed page has a download button. Click the PDF icon on any page to download it as a separate PDF file.`
                  },
                  {
                    question: "Can I download all pages as a single PDF?",
                    answer: `Yes! After processing, you can click "Download as Single PDF" to combine all filtered pages into one PDF document.`
                  },
                  {
                    question: "Can I download all pages as separate PDFs?",
                    answer: `Yes! Click "Download All Pages as PDFs (ZIP)" to download each page as an individual PDF file in a ZIP archive.`
                  },
                  {
                    question: "What types of filters are available?",
                    answer: `We offer a wide range of filters including basic (grayscale, sepia, invert, vignette), color (warm, cool, vintage, noir), and artistic (oil paint, sketch, neon).`
                  },
                  {
                    question: "Are my files uploaded to a server?",
                    answer: `No. All processing happens locally in your browser. Your PDFs never leave your device, ensuring complete privacy and security.`
                  },
                  {
                    question: "Is this tool free to use?",
                    answer: `Yes! This PDF filter tool is completely free to use with no sign-up required.`
                  },
                ].map((faq, index) => (
                  <details
                    key={index}
                    className="
                      group rounded-xl border border-gray-200 dark:border-gray-700
                      bg-white dark:bg-gray-900
                      transition-all duration-300
                      hover:border-purple-400/60 dark:hover:border-purple-500/60
                      open:shadow-lg open:border-purple-500
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