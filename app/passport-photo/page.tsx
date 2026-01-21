"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
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
  Check,
  ArrowRight,
  Grid,
  X,
  Plus,
  Archive,
  FolderClosed,
  User,
  Camera,
  Ruler,
  Square,
  Grid3x3,
  Columns,
  Rows,
  Hash,
  Printer,
  File,
  Calculator,
} from "lucide-react";
import FileUploader from "../components/FileUploader";
import ProgressBar from "../components/ProgressBar";
import {
  resizeImage,
  downloadFile,
  downloadMultipleFiles,
} from "../../utils/imageUtils";
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
  id: "passport-photo",
  name: "Passport Photo Maker",
  description: "Create passport size photos online",
  category: "image",
  icon: "📸",
  color: "from-blue-500 to-indigo-600",
  href: "/passport-photo",
  path: "/tools/passport-photo",
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

// Passport Photo Sizes
const passportSizes = [
  {
    name: "USA Passport",
    width: 600,
    height: 600,
    description: "2×2 inches",
    aspectRatio: "1:1",
    country: "🇺🇸",
    dpi: 300,
    printSize: "2×2 inches",
  },
  {
    name: "UK Passport",
    width: 413,
    height: 531,
    description: "35×45 mm",
    aspectRatio: "1:1.29",
    country: "🇬🇧",
    dpi: 300,
    printSize: "35×45 mm",
  },
  {
    name: "India Passport",
    width: 350,
    height: 350,
    description: "35×35 mm",
    aspectRatio: "1:1",
    country: "🇮🇳",
    dpi: 300,
    printSize: "35×35 mm",
  },
  {
    name: "Canada Passport",
    width: 420,
    height: 540,
    description: "50×70 mm",
    aspectRatio: "1:1.29",
    country: "🇨🇦",
    dpi: 300,
    printSize: "50×70 mm",
  },
  {
    name: "Australia Passport",
    width: 420,
    height: 530,
    description: "35×45 mm",
    aspectRatio: "1:1.26",
    country: "🇦🇺",
    dpi: 300,
    printSize: "35×45 mm",
  },
  {
    name: "Visa Photo",
    width: 600,
    height: 600,
    description: "2×2 inches",
    aspectRatio: "1:1",
    country: "🌍",
    dpi: 300,
    printSize: "2×2 inches",
  },
];

// Photo Layout Options
const layoutOptions = [
  { id: "single", name: "Single Photo", grid: "1×1", value: 1, icon: Square },
  { id: "2x2", name: "2×2 Grid", grid: "2×2", value: 4, icon: Grid3x3 },
  { id: "3x3", name: "3×3 Grid", grid: "3×3", value: 9, icon: Grid3x3 },
  { id: "4x4", name: "4×4 Grid", grid: "4×4", value: 16, icon: Grid3x3 },
  { id: "4x6", name: "4×6 Sheet", grid: "4×6", value: 24, icon: Rows },
  { id: "6x4", name: "6×4 Sheet", grid: "6×4", value: 24, icon: Columns },
];

// Paper Sizes for Print
const paperSizes = [
  {
    id: "4x6",
    name: "4×6 inches",
    width: 1200,
    height: 1800,
    description: "Standard photo print size",
  },
  {
    id: "letter",
    name: "Letter (8.5×11)",
    width: 2550,
    height: 3300,
    description: "US Letter paper",
  },
  {
    id: "a4",
    name: "A4 Paper",
    width: 2480,
    height: 3508,
    description: "International A4 paper (21×29.7 cm)",
  },
  {
    id: "custom",
    name: "Custom Size",
    width: 0,
    height: 0,
    description: "Set your own dimensions",
  },
];

// --- Component Interface ---
interface ProcessedPhoto {
  blob: Blob;
  name: string;
  originalFile: File;
  timestamp: number;
  photoType: string;
  dimensions: { width: number; height: number };
  layout: string;
  photosPerPage: number;
}

interface ProcessedSheet {
  blob: Blob;
  name: string;
  sheetNumber: number;
  totalSheets: number;
  photosInSheet: number;
}

interface DownloadNotification {
  id: string;
  fileName: string;
  timestamp: Date;
}

// --- Image Preview Component ---
const ImagePreview = ({
  file,
  onRemove,
  status,
  isDownloadable = false,
  filename = "image.jpg",
  index,
  photoType = "",
  dimensions = { width: 0, height: 0 },
  photosPerPage = 1,
}: {
  file: Blob | File;
  onRemove?: () => void;
  status: string;
  isDownloadable?: boolean;
  filename: string;
  index: number;
  photoType?: string;
  dimensions?: { width: number; height: number };
  photosPerPage?: number;
}) => {
  const url = useMemo(() => createObjectURL(file), [file]);
  const [previewOpen, setPreviewOpen] = useState(false);

  useMemo(() => {
    return () => revokeObjectURL(url);
  }, [url]);

  const statusColor = status.includes("Processed")
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
            {/* OUTER WRAPPER */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE BUTTON — IMAGE SE JUST UPAR */}
              <button
                onClick={() => setPreviewOpen(false)}
                className="absolute -top-14 right-0 z-50 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>

              {/* IMAGE CONTAINER */}
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
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
          {/* Photo Type Badge */}
          {photoType && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
              {photoType}
            </div>
          )}

          {/* Photos per page badge */}
          {photosPerPage > 1 && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
              {photosPerPage} photos
            </div>
          )}

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

            {/* Shine Effect */}
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
            {dimensions && dimensions.width > 0 && dimensions.height > 0 && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">Size:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {dimensions.width} × {dimensions.height}px
                </span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor} bg-opacity-10 ${
                  status.includes("Processed")
                    ? "bg-green-500"
                    : status.includes("Error")
                    ? "bg-red-500"
                    : "bg-blue-500"
                }`}
              >
                {status}
              </span>

              {/* File Size (if available) */}
              {file.size && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
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

            {/* Download Button (For Output Files) */}
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

// --- Sheet Preview Component ---
const SheetPreview = ({
  sheet,
  index,
  onDownload,
}: {
  sheet: ProcessedSheet;
  index: number;
  onDownload: (sheet: ProcessedSheet) => void;
}) => {
  const url = useMemo(() => createObjectURL(sheet.blob), [sheet.blob]);
  const [previewOpen, setPreviewOpen] = useState(false);

  useMemo(() => {
    return () => revokeObjectURL(url);
  }, [url]);

  return (
    <>
      {/* Sheet Preview Modal */}
     <AnimatePresence>
  {previewOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={() => setPreviewOpen(false)}
    >
      {/* OUTER WRAPPER */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative"
        onClick={(e) => e.stopPropagation()}
       >
        {/* CLOSE BUTTON — IMAGE SE UPAR */}
        <button
          onClick={() => setPreviewOpen(false)}
          className="absolute -top-12 right-0 z-50 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
        >
          <XCircle className="w-6 h-6" />
        </button>

        {/* IMAGE CONTAINER */}
        <div className="max-w-4xl max-h-[90vh]">
          <img
            src={url}
            alt={sheet.name}
            className="rounded-xl shadow-2xl max-w-full max-h-[80vh] object-contain"
          />
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


      {/* Sheet Preview Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ y: -5, scale: 1.02 }}
        className="relative group"
      >
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 border-2 border-blue-200 dark:border-blue-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
          {/* Sheet Number Badge */}
          <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
            Sheet {sheet.sheetNumber}/{sheet.totalSheets}
          </div>

          {/* Photos Count Badge */}
          <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
            {sheet.photosInSheet} photos
          </div>

          {/* Image Container */}
          <div
            className="relative w-full h-36 mb-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl overflow-hidden cursor-pointer group/image"
            onClick={() => setPreviewOpen(true)}
          >
            <img
              src={url}
              alt={sheet.name}
              className="w-full h-full object-contain group-hover/image:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Eye className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Sheet Info */}
          <div className="space-y-2">
            <p
              className="text-sm font-semibold truncate text-gray-900 dark:text-white"
              title={sheet.name}
            >
              {sheet.name}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                <File className="w-3 h-3" />
                <span>A4 Sheet</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {(sheet.blob.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPreviewOpen(true)}
              className="flex-1 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-lg hover:from-blue-200 hover:to-indigo-200 transition-all"
            >
              Preview
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDownload(sheet)}
              className="flex-1 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-1"
            >
              <Download className="w-3 h-3" />
              Download
            </motion.button>
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
          <h4 className="font-bold text-sm mb-1">Passport Photo Created! 🎉</h4>
          <p className="text-xs opacity-90 truncate mb-1">{fileName}</p>
          <p className="text-xs opacity-80 mb-2">
            Passport size photo is ready for download
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
export default function PassportPhotoMaker() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedPhoto, setProcessedPhoto] = useState<ProcessedPhoto | null>(
    null
  );
  const [processedSheets, setProcessedSheets] = useState<ProcessedSheet[]>([]);
  const [showFeatures, setShowFeatures] = useState(true);
  const [downloadNotifications, setDownloadNotifications] = useState<
    DownloadNotification[]
  >([]);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // ✅ डिफ़ॉल्ट India Passport पर सेट करें
  const [selectedSize, setSelectedSize] = useState(() => {
    const indiaSize = passportSizes.find(
      (size) => size.name === "India Passport"
    );
    return indiaSize || passportSizes[0];
  });

  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [photoQuality, setPhotoQuality] = useState(100);
  const [selectedLayout, setSelectedLayout] = useState(layoutOptions[0]);
  const [selectedPaperSize, setSelectedPaperSize] = useState(paperSizes[2]); // Default to A4
  const [customWidth, setCustomWidth] = useState<number>(300);
  const [customHeight, setCustomHeight] = useState<number>(300);
  const [spacing, setSpacing] = useState(20);
  const [margin, setMargin] = useState(50);
  const [isHD, setIsHD] = useState(true);
  const [dpi, setDpi] = useState(300);

  // New states for dynamic photo count and sheet management
  const [photoCount, setPhotoCount] = useState<number>(1);
  const [maxPhotosPerSheet, setMaxPhotosPerSheet] = useState<number>(1);
  const [totalSheetsNeeded, setTotalSheetsNeeded] = useState<number>(1);
  const [layoutCalculation, setLayoutCalculation] = useState<{
    cols: number;
    rows: number;
    photosPerSheet: number;
  }>({ cols: 1, rows: 1, photosPerSheet: 1 });

  // Generate unique filename
  const generateUniqueFileName = (
    baseName: string,
    photoType: string,
    layout: string,
    isGrid: boolean,
    sheetNumber?: number,
    totalSheets?: number
  ) => {
    const timestamp = new Date().getTime();
    const randomId = Math.random().toString(36).substring(2, 9);
    const cleanBaseName = baseName.replace(/\.[^/.]+$/, "");
    const dimensions = `${selectedSize.width}x${selectedSize.height}`;
    const countryCode = photoType.replace(/\s+/g, "_").toLowerCase();
    const layoutText = isGrid ? `_${layout}_grid` : "_single";
    const qualityText = isHD ? "_hd" : "_standard";
    const sheetText = sheetNumber
      ? `_sheet${sheetNumber}_of_${totalSheets}`
      : "";
    return `${cleanBaseName}_${countryCode}_${dimensions}${layoutText}${qualityText}${sheetText}_${timestamp}_${randomId}.jpg`;
  };

  // Calculate maximum photos that fit on A4 sheet
  const calculateMaxPhotosOnSheet = () => {
    const paperWidth = selectedPaperSize.width;
    const paperHeight = selectedPaperSize.height;
    const photoWidth = selectedSize.width + spacing;
    const photoHeight = selectedSize.height + spacing;

    const maxCols = Math.floor((paperWidth - margin * 2) / photoWidth);
    const maxRows = Math.floor((paperHeight - margin * 2) / photoHeight);

    return {
      cols: maxCols,
      rows: maxRows,
      photosPerSheet: maxCols * maxRows,
    };
  };

  // Update layout calculation when parameters change
  useEffect(() => {
    if (file && selectedSize && selectedPaperSize) {
      const calculation = calculateMaxPhotosOnSheet();
      setLayoutCalculation(calculation);
      setMaxPhotosPerSheet(calculation.photosPerSheet);

      // Update photo count if it exceeds new maximum
      if (photoCount > calculation.photosPerSheet) {
        setPhotoCount(calculation.photosPerSheet);
      }

      // Calculate total sheets needed
      const sheetsNeeded = Math.ceil(photoCount / calculation.photosPerSheet);
      setTotalSheetsNeeded(sheetsNeeded);
    }
  }, [file, selectedSize, selectedPaperSize, spacing, margin, photoCount]);

  // Function to create grid layout for a sheet
  const createGridLayoutForSheet = async (
    singlePhotoBlob: Blob,
    cols: number,
    rows: number,
    photosToCreate: number,
    sheetNumber: number
  ) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) throw new Error("Canvas context not available");

    // Calculate total grid dimensions
    const totalWidth = selectedPaperSize.width;
    const totalHeight = selectedPaperSize.height;

    // Set canvas size
    canvas.width = totalWidth;
    canvas.height = totalHeight;

    // Fill with background color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, totalWidth, totalHeight);

    // Load single photo
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = URL.createObjectURL(singlePhotoBlob);
    });

    // Draw photos in grid
    let photosCreated = 0;
    for (let row = 0; row < rows && photosCreated < photosToCreate; row++) {
      for (let col = 0; col < cols && photosCreated < photosToCreate; col++) {
        const x = margin + col * (selectedSize.width + spacing);
        const y = margin + row * (selectedSize.height + spacing);

        // Draw the passport photo with white background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x, y, selectedSize.width, selectedSize.height);
        ctx.drawImage(img, x, y, selectedSize.width, selectedSize.height);
        photosCreated++;
      }
    }

    // Convert canvas to blob with high quality
    return new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else throw new Error("Failed to create grid photo");
        },
        "image/jpeg",
        photoQuality / 100
      );
    });
  };

  // Main function to create passport photos with multiple sheets
  const createPassportPhotos = async () => {
    if (!file || !selectedSize) return;

    setProcessing(true);
    setProgress(0);
    setProcessedPhoto(null);
    setProcessedSheets([]);
    setShowFeatures(false);

    try {
      // Calculate DPI scaling factor for HD quality
      const scaleFactor = isHD ? dpi / 96 : 1;
      const scaledWidth = Math.floor(selectedSize.width * scaleFactor);
      const scaledHeight = Math.floor(selectedSize.height * scaleFactor);

      // Step 1: Resize image to passport size with HD quality
      setProgress(10);
      const resizedBlob = await resizeImage(
        file,
        scaledWidth,
        scaledHeight,
        photoQuality / 100,
        "jpg"
      );

      // Step 2: Create single passport photo with background
      setProgress(30);
      const singlePhotoBlob = await createSinglePassportPhoto(resizedBlob);

      // Step 3: Create multiple sheets based on photo count
      setProgress(50);
      const sheets: ProcessedSheet[] = [];
      const { cols, rows, photosPerSheet } = layoutCalculation;

      let remainingPhotos = photoCount;
      let currentSheet = 1;

      while (remainingPhotos > 0) {
        const photosInThisSheet = Math.min(remainingPhotos, photosPerSheet);

        setProgress(50 + ((currentSheet - 1) * 40) / totalSheetsNeeded);

        const sheetBlob = await createGridLayoutForSheet(
          singlePhotoBlob,
          cols,
          rows,
          photosInThisSheet,
          currentSheet
        );

        const isGrid = photosInThisSheet > 1;
        const sheetFilename = generateUniqueFileName(
          file.name,
          selectedSize.name,
          `${cols}x${rows}`,
          isGrid,
          currentSheet,
          totalSheetsNeeded
        );

        sheets.push({
          blob: sheetBlob,
          name: sheetFilename,
          sheetNumber: currentSheet,
          totalSheets: totalSheetsNeeded,
          photosInSheet: photosInThisSheet,
        });

        remainingPhotos -= photosInThisSheet;
        currentSheet++;
      }

      setProcessedSheets(sheets);
      setProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (error) {
      console.error("Passport photo creation error:", error);
      alert("Failed to create passport photos. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  // Helper function to create single passport photo
  const createSinglePassportPhoto = (resizedBlob: Blob): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Canvas context not available"));
        return;
      }

      img.onload = () => {
        // Set canvas dimensions with DPI scaling
        const scaleFactor = isHD ? dpi / 96 : 1;
        canvas.width = Math.floor(selectedSize.width * scaleFactor);
        canvas.height = Math.floor(selectedSize.height * scaleFactor);

        // Fill with background color
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the resized image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert to blob with high quality
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Failed to create passport photo"));
          },
          "image/jpeg",
          photoQuality / 100
        );
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = URL.createObjectURL(resizedBlob);
    });
  };

  const handleDownloadSheet = (sheet: ProcessedSheet) => {
    downloadFile(sheet.blob, sheet.name);

    const notification: DownloadNotification = {
      id: Math.random().toString(36).substring(7),
      fileName: sheet.name,
      timestamp: new Date(),
    };
    setDownloadNotifications((prev) => [...prev, notification]);

    setTimeout(() => {
      setDownloadNotifications((prev) =>
        prev.filter((n) => n.id !== notification.id)
      );
    }, 5000);
  };

  const handleDownloadAllSheets = () => {
    const files = processedSheets.map((sheet) => ({
      blob: sheet.blob,
      filename: sheet.name,
    }));

    downloadMultipleFiles(files);

    const notification: DownloadNotification = {
      id: Math.random().toString(36).substring(7),
      fileName: `${totalSheetsNeeded} sheets`,
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
    setProcessedPhoto(null);
    setProcessedSheets([]);
    setShowFeatures(true);
  };

  const handleFileSelected = (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFile(newFiles[0]);
      setProcessedPhoto(null);
      setProcessedSheets([]);
      setShowFeatures(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setProcessedPhoto(null);
    setProcessedSheets([]);
    setProgress(0);
    setShowFeatures(true);
    setPhotoCount(1);
  };

  const handleSizeSelect = (size: (typeof passportSizes)[0]) => {
    setSelectedSize(size);
  };

  const handlePaperSizeSelect = (paperSize: (typeof paperSizes)[0]) => {
    setSelectedPaperSize(paperSize);
  };

  const hasFile = file !== null;
  const hasResult = processedSheets.length > 0;
  const isReadyToProcess = hasFile && !hasResult && !processing;

  // Predefined background colors
  const backgroundColors = [
    { name: "White", value: "#ffffff" },
    { name: "Light Blue", value: "#e6f2ff" },
    { name: "Off White", value: "#f8f8f8" },
    { name: "Light Gray", value: "#f0f0f0" },
  ];

  // DPI options for HD quality
  const dpiOptions = [
    { value: 150, label: "150 DPI (Good)" },
    { value: 300, label: "300 DPI (Excellent - Recommended)" },
    { value: 600, label: "600 DPI (Professional)" },
  ];

  return (
    <>
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

               <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black 
               text-gray-900 dark:text-white 
               mb-2 sm:mb-4 
               bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 
               bg-clip-text text-transparent 
               px-2 leading-tight text-center">
  Passport Size Photo Maker Online
  <br className="hidden sm:block" />
  <span className="font-extrabold">
    – Free, HD & Print Ready
  </span>
  <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mt-2">
    | PDFSwift
  </span>
</h1>


                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
                  Create passport size photos online instantly with PDFSwift. Choose official sizes for USA, India, UK, Canada & more. Select background color, DPI, and layouts to print multiple photos per page. Free, secure, and no signup required.
                  options
                  <span className="block text-blue-600 dark:text-blue-400 font-medium mt-1 text-xs sm:text-sm md:text-base">
                    Official sizes • Multiple photos per page • HD quality •
                    Print-ready
                  </span>
                </p>
              </div>
            </div>

            {/* --- Main Passport Photo Maker Card --- */}
            <div className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-lg sm:shadow-xl md:shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
              {/* Upload Section */}
              <div className="mb-4 sm:mb-6 md:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg sm:rounded-xl">
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      {hasFile ? "Change Photo" : "Upload Photo"}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Upload a portrait photo to create passport size photo
                    </p>
                  </div>
                </div>

                <FileUploader
                  accept="image/*"
                  multiple={false}
                  onFilesSelected={handleFileSelected}
                />

                {hasFile && (
                  <div className="mt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                          <ImageIcon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-blue-700 dark:text-blue-300">
                            1 photo selected
                          </p>
                          <p className="text-xs text-blue-600 dark:text-blue-400">
                            Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleReset}
                          className="px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                        >
                          Clear Photo
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* --- Passport Size Options --- */}
              {hasFile && (
                <div className="mb-6 sm:mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 sm:p-6 border-2 border-blue-200 dark:border-blue-700">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Ruler className="w-5 h-5 text-blue-500" />
                    Select Passport Size
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {passportSizes.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => handleSizeSelect(size)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          selectedSize && selectedSize.name === size.name
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{size.country}</span>
                          <span className="font-bold text-gray-900 dark:text-white">
                            {size.name}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          {size.description} • {size.dpi} DPI
                        </div>
                        <div className="text-xs font-medium text-blue-600 dark:text-blue-400">
                          {size.width} × {size.height}px
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          Print: {size.printSize}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* ✅ FIXED: India Passport डिफ़ॉल्ट रूप से सेलेक्ट रहेगा */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-blue-700 dark:text-blue-300 text-sm">
                          {selectedSize ? (
                            <>
                              Selected: {selectedSize.name} (
                              {selectedSize.country})
                            </>
                          ) : (
                            <>India Passport (🇮🇳) - Default</>
                          )}
                        </p>
                        <p className="text-xs text-blue-600 dark:text-blue-400">
                          {selectedSize ? (
                            <>
                              Dimensions: {selectedSize.width} ×{" "}
                              {selectedSize.height}px •{" "}
                              {selectedSize.description}
                            </>
                          ) : (
                            <>35×35 mm • 300 DPI • Print size: 35×35 mm</>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- Dynamic Photo Count and Sheet Management --- */}
              {hasFile && selectedSize && (
                <div className="mb-6 sm:mb-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 sm:p-6 border-2 border-purple-200 dark:border-purple-700">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-purple-500" />
                    Photo Quantity & Sheet Management
                  </h3>

                  <div className="space-y-6">
                    {/* Photo Count Selection */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">
                          Number of Photos Needed
                        </h4>
                        <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                          {photoCount} photo{photoCount > 1 ? "s" : ""}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max={maxPhotosPerSheet * 5} // Allow up to 5 sheets worth of photos
                        value={photoCount}
                        onChange={(e) =>
                          setPhotoCount(parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                        <span>1 Photo</span>
                        <span>{maxPhotosPerSheet * 5} Photos</span>
                      </div>

                      {/* Quick Selection Buttons */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {[1, 2, 4, 6, 8, 12, 16, 24].map((count) => (
                          <button
                            key={count}
                            onClick={() => setPhotoCount(count)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                              photoCount === count
                                ? "bg-purple-500 text-white"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                          >
                            {count}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Paper Size Selection */}
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Paper Size
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {paperSizes.map((paperSize) => (
                          <button
                            key={paperSize.id}
                            onClick={() => handlePaperSizeSelect(paperSize)}
                            className={`p-4 rounded-xl border-2 text-left ${
                              selectedPaperSize.id === paperSize.id
                                ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                                : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
                            }`}
                          >
                            <div className="font-bold text-purple-600 dark:text-purple-400 mb-1">
                              {paperSize.name}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {paperSize.description}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Layout Calculation Display */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Max per sheet
                          </p>
                          <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                            {maxPhotosPerSheet} photos
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Layout per sheet
                          </p>
                          <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                            {layoutCalculation.cols} × {layoutCalculation.rows}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Total sheets needed
                          </p>
                          <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                            {totalSheetsNeeded} sheet
                            {totalSheetsNeeded > 1 ? "s" : ""}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Paper size
                          </p>
                          <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                            {selectedPaperSize.name}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Grid Spacing Control */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-700 dark:text-gray-300">
                            Spacing Between Photos
                          </h4>
                          <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                            {spacing}px
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={spacing}
                          onChange={(e) => setSpacing(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-700 dark:text-gray-300">
                            Page Margin
                          </h4>
                          <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                            {margin}px
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="200"
                          value={margin}
                          onChange={(e) => setMargin(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- Quality & Customization Options --- */}
              {hasFile && selectedSize && (
                <div className="mb-6 sm:mb-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 sm:p-6 border-2 border-green-200 dark:border-green-700">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-green-500" />
                    Quality & Customization
                  </h3>

                  <div className="space-y-6">
                    {/* HD Quality Toggle */}
                    <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">
                          High Definition (HD)
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {isHD
                            ? "Enabled - Professional print quality"
                            : "Disabled - Standard quality"}
                        </p>
                      </div>
                      <button
                        onClick={() => setIsHD(!isHD)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          isHD ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            isHD ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* DPI Selection (Only shown when HD is enabled) */}
                    {isHD && (
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Print Resolution (DPI)
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {dpiOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => setDpi(option.value)}
                              className={`p-3 rounded-lg border-2 text-left ${
                                dpi === option.value
                                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                  : "border-gray-200 dark:border-gray-700"
                              }`}
                            >
                              <div className="font-bold text-green-600 dark:text-green-400">
                                {option.value} DPI
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                {option.label}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Photo Quality */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">
                          Photo Quality
                        </h4>
                        <span className="text-sm font-bold text-green-600 dark:text-green-400">
                          {photoQuality}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="80"
                        max="100"
                        value={photoQuality}
                        onChange={(e) =>
                          setPhotoQuality(parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>Good</span>
                        <span>Best</span>
                      </div>
                    </div>

                    {/* Background Color */}
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Background Color
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {backgroundColors.map((color, index) => (
                          <button
                            key={index}
                            onClick={() => setBackgroundColor(color.value)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 ${
                              backgroundColor === color.value
                                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                : "border-gray-200 dark:border-gray-700"
                            }`}
                          >
                            <div
                              className="w-6 h-6 rounded-full border border-gray-300"
                              style={{ backgroundColor: color.value }}
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {color.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

             {/* --- Photo Preview and Processing Area --- */}
{hasFile && (
  <div className="space-y-4 sm:space-y-6 md:space-y-8">

    {/* --- Input Photo Preview --- */}
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
          Uploaded Photo
        </h3>
      </div>

      {/* ✅ FIXED PREVIEW WRAPPER (MOBILE SAFE) */}
      <div
        className="
          w-full
          flex justify-center
          overflow-x-hidden
          p-2 sm:p-3 md:p-4
          bg-gradient-to-br from-gray-50 to-blue-50
          dark:from-gray-800 dark:to-blue-950/20
          rounded-lg sm:rounded-xl md:rounded-2xl
          border border-gray-200 dark:border-gray-700
        "
      >
        {/* ✅ WIDTH CONTROL (VERY IMPORTANT) */}
        <div className="w-full max-w-[480px]">
          <ImagePreview
            file={file}
            filename={file.name}
            onRemove={handleRemoveFile}
            status="Ready to Process"
            index={0}
          />
        </div>
      </div>
    </div>

    {/* --- Progress and Action Buttons --- */}
    <div className="space-y-4 sm:space-y-6">
      {processing && (
        <div className="space-y-3 sm:space-y-4">
          <ProgressBar
            progress={progress}
            label={`Creating ${photoCount} photos across ${totalSheetsNeeded} sheet${
              totalSheetsNeeded > 1 ? "s" : ""
            }...`}
          />
          <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium">
              Processing {selectedSize?.name || "passport"} photos...
            </span>
          </div>
        </div>
      )}

      {isReadyToProcess && selectedSize && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={createPassportPhotos}
          disabled={!selectedSize}
          className={`
            w-full
            py-2.5 sm:py-3 md:py-4
            px-3 sm:px-4 md:px-6
            bg-gradient-to-r from-blue-500 to-indigo-600
            hover:from-blue-600 hover:to-indigo-700
            text-white font-bold
            rounded-lg sm:rounded-xl md:rounded-2xl
            shadow-md sm:shadow-lg md:shadow-xl
            transition-all
            text-sm sm:text-base md:text-lg
            flex items-center justify-center gap-2 sm:gap-3
            ${!selectedSize ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <Camera className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          {selectedSize ? (
            <>Create {photoCount} {selectedSize.name} Photos</>
          ) : (
            <>Select Passport Size First</>
          )}
          <Printer className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      )}
    </div>


        <section className="mt-20">
      <h2 className="text-3xl font-bold text-center mb-10">
        How to Create Passport Size Photo Online
      </h2>

      <div className="grid gap-6 md:grid-cols-5">

        <div className="border rounded-xl p-6 text-center shadow-sm bg-white">
          <div className="text-4xl font-bold text-blue-600 mb-2">1</div>
          <h3 className="font-semibold text-lg">Upload Photo</h3>
          <p className="text-gray-600 text-sm mt-2">
            Upload a clear portrait photo from your device.
          </p>
        </div>

        <div className="border rounded-xl p-6 text-center shadow-sm bg-white">
          <div className="text-4xl font-bold text-blue-600 mb-2">2</div>
          <h3 className="font-semibold text-lg">Choose Country</h3>
          <p className="text-gray-600 text-sm mt-2">
            Select passport size for India, USA, UK or other countries.
          </p>
        </div>

        <div className="border rounded-xl p-6 text-center shadow-sm bg-white">
          <div className="text-4xl font-bold text-blue-600 mb-2">3</div>
          <h3 className="font-semibold text-lg">Customize Settings</h3>
          <p className="text-gray-600 text-sm mt-2">
            Set DPI, background color, photo quantity and paper size.
          </p>
        </div>

        <div className="border rounded-xl p-6 text-center shadow-sm bg-white">
          <div className="text-4xl font-bold text-blue-600 mb-2">4</div>
          <h3 className="font-semibold text-lg">Generate Photos</h3>
          <p className="text-gray-600 text-sm mt-2">
            Create HD, print-ready passport photo sheets instantly.
          </p>
        </div>

        <div className="border rounded-xl p-6 text-center shadow-sm bg-white">
          <div className="text-4xl font-bold text-blue-600 mb-2">5</div>
          <h3 className="font-semibold text-lg">Download & Print</h3>
          <p className="text-gray-600 text-sm mt-2">
            Download and print your passport photos without signup.
          </p>
        </div>

      </div>
    </section>


  </div>
)}

            </div>

            {/* --- Results and Download Area --- */}
            {hasResult && processedSheets.length > 0 && (
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
                      Passport Photos Ready! 🎉
                    </h2>
                    <p className="text-green-700 dark:text-green-300 font-medium text-sm sm:text-base">
                      {photoCount} photos created across {totalSheetsNeeded}{" "}
                      sheet{totalSheetsNeeded > 1 ? "s" : ""}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-1">
                      Layout: {layoutCalculation.cols} ×{" "}
                      {layoutCalculation.rows} per sheet •{" "}
                      {isHD ? `${dpi} DPI HD` : "Standard"} quality • Ready to
                      print
                    </p>
                  </div>
                  <div className="flex items-center justify-center mt-2 sm:mt-0">
                    <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base">
                      {photoCount} Photos
                    </div>
                  </div>
                </div>

                {/* --- Sheets Preview Grid --- */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 md:mb-8">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <File className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    Generated A4 Sheets ({totalSheetsNeeded} sheets)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {processedSheets.map((sheet, index) => (
                      <SheetPreview
                        key={sheet.sheetNumber}
                        sheet={sheet}
                        index={index}
                        onDownload={handleDownloadSheet}
                      />
                    ))}
                  </div>
                </div>

                {/* --- Download Buttons --- */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Download All Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownloadAllSheets}
                    className="w-full py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold sm:font-extrabold rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    Download All Sheets ({totalSheetsNeeded} files)
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5" />
                  </motion.button>

                  {/* Create Another Button */}
                  <div className="text-center">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm md:text-base"
                    >
                      <Camera className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                      Create Another Passport Photo
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

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
                      icon: Grid3x3,
                      title: "Dynamic Photo Count",
                      desc: "Select any number of photos (1-100+). Automatically split across multiple A4 sheets as needed",
                      gradient: "from-blue-500 to-indigo-600",
                      bg: "from-blue-50 to-indigo-50",
                      border: "border-blue-200",
                    },
                    {
                      icon: Calculator,
                      title: "Smart Sheet Management",
                      desc: "Automatically calculates optimal layout and creates multiple A4 sheets when photos overflow",
                      gradient: "from-purple-500 to-pink-600",
                      bg: "from-purple-50 to-pink-50",
                      border: "border-purple-200",
                    },
                    {
                      icon: Printer,
                      title: "Print-Ready A4 Sheets",
                      desc: "Standard 21×29.7 cm A4 format. Perfect for home or professional printing",
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

            {/* --- Stats Footer --- */}
            <div className="mt-10 sm:mt-14">
              <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                  {[
                    {
                      value: file ? 1 : 0,
                      label: "Photo Uploaded",
                      color: "text-blue-600",
                      bg: "bg-blue-50 dark:bg-blue-900/10",
                    },
                    {
                      value: photoCount,
                      label: "Photos to Create",
                      color: "text-purple-600",
                      bg: "bg-purple-50 dark:bg-purple-900/10",
                    },
                    {
                      value: totalSheetsNeeded,
                      label: "A4 Sheets Needed",
                      color: "text-green-600",
                      bg: "bg-green-50 dark:bg-green-900/10",
                    },
                    {
                      value: `${layoutCalculation.cols}×${layoutCalculation.rows}`,
                      label: "Layout Per Sheet",
                      color: "text-indigo-600",
                      bg: "bg-indigo-50 dark:bg-indigo-900/10",
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

            {/* Explore All Tools Section */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-center justify-between mb-6 m-4 md:mb-8">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    Explore All Tools
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                    40+ specialized PDF, image, and document tools
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
              {/* --- FAQ Section --- */}
<section className="max-w-4xl mx-auto my-10 sm:my-14 md:my-20 px-3 sm:px-4">
  {/* Header */}
  <div className="text-center mb-6 sm:mb-8 md:mb-12">
    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
      Frequently Asked Questions
    </h2>
    <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
      Everything you need to know about editing PDFs online
    </p>
  </div>

  {/* FAQ Cards */}
  <div className="space-y-3 sm:space-y-4">
    {faqData.map((faq, index) => (
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
        {/* Question */}
        <summary
          className="
            flex cursor-pointer list-none items-center justify-between
            px-4 sm:px-5 py-3 sm:py-4
            text-sm sm:text-base md:text-lg
            font-semibold text-gray-900 dark:text-white
          "
        >
          <span>{faq.question}</span>

          {/* Arrow */}
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

        {/* Answer */}
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

           
          </motion.div>
        </div>
      </div>
    </>
  );
}
