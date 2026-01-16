"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Head from 'next/head';

import {
  Download,
  ArrowRight,
  Grid,
  ArrowLeft,
  CheckCircle,
  FileText,
  Image as ImageIcon,
  Layers,
  ChevronRight,
  Sparkles,
  Zap,
  Edit,
  File,
  Tablet,
  SquareGanttChart,
  Clock,
  Shield,
  X,
  ZoomIn,
  ZoomOut,
  Loader2,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Grid3x3,
  FolderOpen,
  FileImage,
  Check,
  Rotate3D,
  Trash2,
  Split,
  Smartphone,
} from "lucide-react";

import FileUploader from "@/app/components/FileUploader";
import ProgressBar from "@/app/components/ProgressBar";
import { downloadFile } from "../../utils/imageUtils";
import { PDFDocument } from "pdf-lib";
import BreadcrumbSchema from "./BreadcrumbSchema";

import FAQSchema from "./FAQSchema";
import { faqData } from "./faqData";


// Import pdfjs-dist with proper configuration
import * as pdfjsLib from "pdfjs-dist";

// Check if we're in browser before setting worker
if (typeof window !== "undefined" && typeof document !== "undefined") {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  } catch (error) {
    console.warn("Failed to set PDF.js worker source:", error);
  }
}

// Page Info
type PageData = {
  pageNumber: number;
  fileName: string;
  isSelected: boolean;
  thumbnail?: string;
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

const tool = {
  id: "remove-pages",
  name: "Remove Pages",
  description: "Delete specific pages from PDF",
  category: "pdf",
  icon: "🗑️",
  color: "from-rose-500 to-pink-500",
  href: "/remove-pages",
  path: "/tools/remove-pages",
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

// --- TOOL ICON HELPER FUNCTION ---
const getToolIcon = (label: string): React.ReactNode => {
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes("remove") || lowerLabel.includes("delete"))
    return <Trash2 className="w-5 h-5 text-white" />;
  if (lowerLabel.includes("split") || lowerLabel.includes("splitter"))
    return <Split className="w-5 h-5 text-white" />;
  if (lowerLabel.includes("editor") || lowerLabel.includes("edit"))
    return <Edit className="w-5 h-5 text-white" />;
  if (
    lowerLabel.includes("jpg") ||
    lowerLabel.includes("png") ||
    lowerLabel.includes("image")
  )
    return <ImageIcon className="w-5 h-5 text-white" />;
  if (lowerLabel.includes("rotate") || lowerLabel.includes("rotator"))
    return <Rotate3D className="w-5 h-5 text-white" />;
  if (lowerLabel.includes("word"))
    return <FileText className="w-5 h-5 text-white" />;
  if (lowerLabel.includes("powerpoint"))
    return <Layers className="w-5 h-5 text-white" />;
  if (lowerLabel.includes("excel"))
    return <SquareGanttChart className="w-5 h-5 text-white" />;
  if (lowerLabel.includes("converter") || lowerLabel.includes("creator"))
    return <Zap className="w-5 h-5 text-white" />;
  if (lowerLabel.includes("mobile app"))
    return <Tablet className="w-5 h-5 text-white" />;
  return <File className="w-5 h-5 text-white" />;
};

// --- TOOL DESCRIPTION HELPER FUNCTION ---
const getToolDescription = (label: string): string => {
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes("remove") || lowerLabel.includes("delete"))
    return "Remove specific pages from PDF documents easily.";
  if (lowerLabel.includes("split") || lowerLabel.includes("splitter"))
    return "Split PDF into multiple documents by page range.";
  if (lowerLabel.includes("editor") || lowerLabel.includes("edit"))
    return "Edit and modify your PDF documents easily.";
  if (lowerLabel.includes("rotate") || lowerLabel.includes("rotator"))
    return "Rotate PDF pages to any angle and save as new PDF.";
  if (
    lowerLabel.includes("jpg") ||
    lowerLabel.includes("png") ||
    lowerLabel.includes("image")
  )
    return "Convert PDF pages to high-quality JPG or PNG images.";
  if (lowerLabel.includes("word"))
    return "Convert PDF documents directly to editable DOCX format.";
  if (lowerLabel.includes("creator"))
    return "Combine multiple documents or images into a new PDF.";
  if (lowerLabel.includes("converter"))
    return "Convert files to/from PDF, including JPG, PNG, and more.";
  if (lowerLabel.includes("text editor"))
    return "Quickly edit text content within your PDF pages.";
  if (lowerLabel.includes("mobile app"))
    return "Dedicated tool for optimizing PDF tasks on the go.";
  if (lowerLabel.includes("powerpoint"))
    return "Convert PDF content into editable PPT/PPTX slides.";
  if (lowerLabel.includes("excel"))
    return "Export tables and data directly from PDF to XLSX format.";
  if (lowerLabel === "pdf file" || lowerLabel === "pdf")
    return "View, read, and manage your PDF documents easily.";
  return "Quickly process your document for immediate results.";
};

// PDF data interface
interface PdfData {
  base64: string;
  pageCount: number;
  fileName: string;
  fileSize: number;
}

// --- PDF PAGE RENDERER ---
interface PdfPageRendererProps {
  pageNumber: number;
  pdfData: PdfData | null;
  fileName: string;
  isSelected: boolean;
  onSelectionToggle?: () => void;
  onZoomClick?: () => void;
}

const PdfPageRenderer = ({
  pageNumber,
  pdfData,
  fileName,
  isSelected,
  onSelectionToggle,
  onZoomClick,
}: PdfPageRendererProps) => {
  const [pageImage, setPageImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const renderPage = async () => {
      if (!pdfData || !isMounted.current) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(false);

        const binaryString = atob(pdfData.base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const loadingTask = pdfjsLib.getDocument({ data: bytes });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(pageNumber);

        const viewportWidth = Math.min(window.innerWidth * 0.15, 120);
        const scale = viewportWidth / page.getViewport({ scale: 1 }).width;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error("Could not get canvas context");
        }

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;

        const imageUrl = canvas.toDataURL("image/jpeg", 0.6);

        if (isMounted.current) {
          setPageImage(imageUrl);
        }
      } catch (error) {
        console.error("Error rendering page:", error);
        if (isMounted.current) {
          setError(true);
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    renderPage();

    return () => {
      isMounted.current = false;
    };
  }, [pdfData, pageNumber]);

  const handleSelectionToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelectionToggle) {
      onSelectionToggle();
    }
  };

  return (
    <div
      className={`w-full h-36 md:h-40 flex-shrink-0 rounded-lg shadow-md flex items-center justify-center border relative overflow-hidden cursor-pointer group transition-all duration-300 ${
        isSelected
          ? "bg-white dark:bg-gray-800 border-green-500 dark:border-green-600"
          : "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-red-500 dark:border-red-600"
      } ${!isSelected ? "opacity-70" : ""}`}
      onClick={onZoomClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute top-2 left-2 z-30 flex items-center gap-1 transition-all duration-300`}
      >
        <button
          onClick={handleSelectionToggle}
          className={`p-1.5 rounded-full backdrop-blur-sm transition-all duration-200 ${
            isSelected
              ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              : "bg-black/70 hover:bg-black/90"
          }`}
          title={isSelected ? "Keep page" : "Remove page"}
        >
          {isSelected ? (
            <Check className="w-3 h-3 text-white" />
          ) : (
            <X className="w-3 h-3 text-white" />
          )}
        </button>
      </div>

      <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="p-1.5 bg-black/70 rounded-full backdrop-blur-sm">
          <ZoomIn className="w-3.5 h-3.5 text-white" />
        </div>
      </div>

      <div
        className={`absolute bottom-2 right-2 z-20 px-2 py-1 rounded text-sm font-bold ${
          isSelected
            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
            : "bg-gradient-to-r from-red-500 to-orange-600 text-white"
        }`}
      >
        {isSelected ? "✓" : "✗"}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-2">
          <Loader2 className="w-7 h-7 animate-spin text-blue-600 dark:text-blue-400 mb-2" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Page {pageNumber}
          </span>
        </div>
      ) : error ? (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-2 ${
            isSelected
              ? "bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-green-900/20"
              : "bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-red-900/20"
          }`}
        >
          <span className="text-sm font-bold text-blue-800 dark:text-blue-300">
            Page
          </span>
          <span className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
            {pageNumber}
          </span>
        </div>
      ) : pageImage ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={pageImage}
            alt={`Page ${pageNumber} of ${fileName}`}
            className="w-auto h-auto max-w-full max-h-full object-contain p-1 select-none transition-transform duration-300 group-hover:scale-105"
            draggable="false"
          />
        </div>
      ) : null}
    </div>
  );
};

// --- SIMPLE ZOOM MODAL WITHOUT SCROLLING ---
interface ZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageNumber: number;
  pdfData: PdfData | null;
  fileName: string;
}

const ZoomModal = ({
  isOpen,
  onClose,
  pageNumber,
  pdfData,
  fileName,
}: ZoomModalProps) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pageImage, setPageImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const renderPageForZoom = async () => {
      if (!isOpen || !pdfData || !isMounted.current) return;

      try {
        setLoading(true);

        // Convert base64 back to Uint8Array
        const binaryString = atob(pdfData.base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const loadingTask = pdfjsLib.getDocument({ data: bytes });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(pageNumber);

        // High quality rendering (3x scale for crisp zoom)
        const viewport = page.getViewport({
          scale: 3.0, // High scale for excellent quality
        });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) return;

        // Set canvas size
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Set high quality rendering
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        await page.render({
          canvasContext: context,
          viewport: viewport,
          intent: "print", // High quality rendering
        }).promise;

        // Get image at maximum quality (1.0)
        const imageUrl = canvas.toDataURL("image/png", 1.0);

        if (isMounted.current) {
          setPageImage(imageUrl);
        }
      } catch (error) {
        console.error("Error rendering zoom page:", error);
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    if (isOpen) {
      renderPageForZoom();
    }

    return () => {
      isMounted.current = false;
    };
  }, [isOpen, pdfData, pageNumber]);

  // Zoom levels (50% to 200%)
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 2.0)); // Max 200%
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.5)); // Min 50%
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
    setZoomLevel(1); // Reset zoom on close
  };

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Reset zoom on close
  useEffect(() => {
    if (!isOpen) {
      setZoomLevel(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      onClick={handleClose}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-50 p-3 bg-black/80 hover:bg-black/90 rounded-full transition-colors shadow-lg"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Zoom controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/80 rounded-full px-6 py-3 z-50 shadow-xl">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleZoomOut();
          }}
          className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
          disabled={zoomLevel <= 0.5}
        >
          <ZoomOut className="w-5 h-5 text-white" />
        </button>

        <div className="flex flex-col items-center min-w-[100px]">
          <span className="text-white text-lg font-medium">
            {Math.round(zoomLevel * 100)}%
          </span>
          <div className="text-xs text-gray-300 mt-1">Full Quality Image</div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleZoomIn();
          }}
          className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
          disabled={zoomLevel >= 2.0}
        >
          <ZoomIn className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Page info */}
      <div className="absolute top-6 left-6 z-50 bg-black/80 rounded-full px-4 py-2">
        <span className="text-white text-sm font-medium">
          Page {pageNumber} • {fileName}
        </span>
      </div>

      {/* Image container - No scrolling, centered */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-[90vw] h-[80vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {loading ? (
          <div className="flex items-center justify-center w-full h-full">
            <Loader2 className="w-12 h-12 animate-spin text-white" />
            <span className="ml-3 text-white">
              Loading full quality image...
            </span>
          </div>
        ) : pageImage ? (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <motion.img
              src={pageImage}
              alt={`Zoomed view - Page ${pageNumber}`}
              className="max-w-full max-h-full object-contain rounded-lg"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: "center",
                transition: "transform 0.2s ease-out",
              }}
              draggable="false"
            />
          </div>
        ) : null}
      </motion.div>

      {/* Instructions */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-white/80 text-sm bg-black/70 backdrop-blur-sm px-4 py-2 rounded-xl">
          <div className="flex items-center gap-2">
            <span>Use buttons to zoom (50%-200%)</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Click anywhere outside to close
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Smart filename generator for removed PDF
const generatePdfFilename = (originalFilename: string): string => {
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  const timeStr = now.toTimeString().split(" ")[0].replace(/:/g, "-");

  const cleanName = originalFilename
    .replace(/\.pdf$/i, "")
    .replace(/[^a-zA-Z0-9\s-_]/g, "")
    .substring(0, 30)
    .trim();

  return `${cleanName}_modified_${dateStr}_${timeStr}.pdf`;
};

export default function PdfPageRemoverTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processed, setProcessed] = useState(false);
  const [pageData, setPageData] = useState<PageData[]>([]);
  const [pdfData, setPdfData] = useState<PdfData | null>(null);
  const [showUploadInfo, setShowUploadInfo] = useState(true);
  const [zoomModal, setZoomModal] = useState<{
    isOpen: boolean;
    pageNumber: number;
    fileName: string;
  }>({
    isOpen: false,
    pageNumber: 1,
    fileName: "",
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Default to mobile value
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [originalFileSize, setOriginalFileSize] = useState<number>(0);
  const [estimatedFileSize, setEstimatedFileSize] = useState<number>(0);
  const [compressionRatio, setCompressionRatio] = useState<number>(0);

  // Mobile detection and responsive items per page
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);

      // Set items per page based on device
      if (width < 768) {
        setItemsPerPage(8); // Mobile: 8 pages
      } else if (width < 1024) {
        setItemsPerPage(12); // Tablet: 12 pages
      } else {
        setItemsPerPage(20); // Desktop/Laptop: 20 pages
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(pageData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, pageData.length);
  const currentPageData = pageData.slice(startIndex, endIndex);

  // Calculate selected pages count
  const selectedPagesCount = pageData.filter((page) => page.isSelected).length;

  // Update estimated file size when selection changes
  useEffect(() => {
    if (originalFileSize > 0 && pageData.length > 0) {
      const selectionRatio = selectedPagesCount / pageData.length;
      const compressionFactor = 0.85; // Assume 15% compression from optimization
      const estimatedSize = Math.round(
        originalFileSize * selectionRatio * compressionFactor
      );
      setEstimatedFileSize(estimatedSize);
      setCompressionRatio(
        Math.round((1 - estimatedSize / originalFileSize) * 100)
      );
    }
  }, [selectedPagesCount, pageData.length, originalFileSize]);

  // Convert ArrayBuffer to base64 for storage
  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // Load PDF and initialize page data AUTOMATICALLY when file is uploaded
  useEffect(() => {
    const loadPdf = async () => {
      if (files.length === 0) return;

      const file = files[0];
      setOriginalFileSize(file.size);
      setProcessing(true);
      setProgress(0);
      setShowUploadInfo(false);

      try {
        setProgress(20);

        const arrayBuffer = await file.arrayBuffer();
        const base64 = arrayBufferToBase64(arrayBuffer);

        setProgress(40);

        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pageCount = pdfDoc.getPageCount();

        setProgress(60);

        const newPageData: PageData[] = Array.from(
          { length: pageCount },
          (_, i) => ({
            pageNumber: i + 1,
            fileName: generatePdfFilename(file.name),
            isSelected: true,
          })
        );

        setProgress(80);

        setPageData(newPageData);
        setPdfData({
          base64,
          pageCount,
          fileName: file.name,
          fileSize: file.size,
        });

        const initialEstimatedSize = file.size * 0.85;
        setEstimatedFileSize(initialEstimatedSize);
        setCompressionRatio(
          Math.round((1 - initialEstimatedSize / file.size) * 100)
        );

        setProgress(100);

        setTimeout(() => {
          setProcessed(true);
          setProcessing(false);
          setCurrentPage(1);
        }, 300);
      } catch (error) {
        console.error("PDF loading error:", error);
        alert("Failed to load PDF. Please make sure it's a valid PDF file.");
        setProcessing(false);
        setProgress(0);
      }
    };

    loadPdf();
  }, [files]);

  // Toggle page selection
  const togglePageSelection = (pageIndex: number) => {
    const updatedPageData = [...pageData];
    updatedPageData[pageIndex] = {
      ...updatedPageData[pageIndex],
      isSelected: !updatedPageData[pageIndex].isSelected,
    };
    setPageData(updatedPageData);
  };

  // Select all pages
  const selectAllPages = () => {
    const updatedPageData = pageData.map((page) => ({
      ...page,
      isSelected: true,
    }));
    setPageData(updatedPageData);
    setDownloadSuccess(`✓ All ${pageData.length} pages selected`);
    setTimeout(() => setDownloadSuccess(null), 2000);
  };

  // Remove all pages (deselect all)
  const removeAllPages = () => {
    const updatedPageData = pageData.map((page) => ({
      ...page,
      isSelected: false,
    }));
    setPageData(updatedPageData);
    setDownloadSuccess(`✗ All ${pageData.length} pages removed`);
    setTimeout(() => setDownloadSuccess(null), 2000);
  };

  // Select even pages
  const selectEvenPages = () => {
    const updatedPageData = pageData.map((page, index) => ({
      ...page,
      isSelected: (index + 1) % 2 === 0,
    }));
    setPageData(updatedPageData);
    setDownloadSuccess("✓ Even pages selected");
    setTimeout(() => setDownloadSuccess(null), 2000);
  };

  // Select odd pages
  const selectOddPages = () => {
    const updatedPageData = pageData.map((page, index) => ({
      ...page,
      isSelected: (index + 1) % 2 === 1,
    }));
    setPageData(updatedPageData);
    setDownloadSuccess("✓ Odd pages selected");
    setTimeout(() => setDownloadSuccess(null), 2000);
  };

  // Download PDF with selected pages
  const handleDownloadModifiedPdf = async () => {
    if (!pdfData || pageData.length === 0) {
      alert("PDF not available.");
      return;
    }

    if (selectedPagesCount === 0) {
      setDownloadSuccess("✗ Please select at least one page to keep");
      setTimeout(() => setDownloadSuccess(null), 3000);
      return;
    }

    setDownloadingAll(true);
    setDownloadProgress(0);

    try {
      setDownloadProgress(10);

      const binaryString = atob(pdfData.base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      setDownloadProgress(30);
      const pdfDoc = await PDFDocument.load(bytes);
      const newPdf = await PDFDocument.create();

      const selectedPageIndices = pageData
        .filter((page) => page.isSelected)
        .map((page) => page.pageNumber - 1);

      setDownloadProgress(30);
      for (let i = 0; i < selectedPageIndices.length; i++) {
        const pageIndex = selectedPageIndices[i];
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);
        newPdf.addPage(copiedPage);

        const progress =
          30 + Math.round(((i + 1) / selectedPageIndices.length) * 40);
        setDownloadProgress(progress);

        if (selectedPagesCount > 10) {
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
      }

      setDownloadProgress(80);

      // Save with compression
      const pdfBytes = await newPdf.save({
        useObjectStreams: true,
        addDefaultPage: false,
        updateFieldAppearances: false,
      });

      setDownloadProgress(90);
      // FIXED SECTION START
      const uint8Array =
        pdfBytes instanceof Uint8Array ? pdfBytes : new Uint8Array(pdfBytes);

      // Use "as any" to bypass the SharedArrayBuffer vs BlobPart type conflict
      const blob = new Blob([uint8Array as any], {
        type: "application/pdf",
      });
      // FIXED SECTION END

      setDownloadProgress(95);
      const fileName = generatePdfFilename(files[0].name);
      downloadFile(blob, fileName);

      // Calculate actual size reduction
      const originalSizeMB = (pdfData.fileSize / (1024 * 1024)).toFixed(2);
      const newSizeMB = (blob.size / (1024 * 1024)).toFixed(2);
      const reduction = Math.round((1 - blob.size / pdfData.fileSize) * 100);

      // Update compression ratio
      setCompressionRatio(reduction);

      setDownloadSuccess(
        `✓ Downloaded! ${originalSizeMB}MB → ${newSizeMB}MB (${reduction}% smaller)`
      );
      setTimeout(() => setDownloadSuccess(null), 5000);
    } catch (error) {
      console.error("Error downloading modified PDF:", error);
      setDownloadSuccess("✗ Failed to generate PDF. Please try again.");
      setTimeout(() => setDownloadSuccess(null), 3000);
    } finally {
      setDownloadingAll(false);
      setDownloadProgress(0);
    }
  };

  // Download individual page as PDF
  const handleDownloadPage = async (pageIndex: number) => {
    if (!pdfData) {
      alert("PDF not available.");
      return;
    }

    const statusElement = document.getElementById(`status-${pageIndex}`);
    if (statusElement) {
      statusElement.innerText = "Processing...";
      statusElement.className =
        "text-sm text-yellow-600 dark:text-yellow-400 mt-1 font-medium animate-pulse";
    }

    try {
      const binaryString = atob(pdfData.base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const pdfDoc = await PDFDocument.load(bytes);
      const newPdf = await PDFDocument.create();

      const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);
      newPdf.addPage(copiedPage);

      const pdfBytes = await newPdf.save();
      const uint8Array =
        pdfBytes instanceof Uint8Array ? pdfBytes : new Uint8Array(pdfBytes);
      const blob = new Blob([uint8Array as any], {
        type: "application/pdf",
      });

      const fileName = `page_${pageIndex + 1}.pdf`;
      downloadFile(blob, fileName);

      setDownloadSuccess(`✓ Page ${pageIndex + 1} downloaded!`);
      setTimeout(() => setDownloadSuccess(null), 3000);

      if (statusElement) {
        statusElement.innerText = "✓ Downloaded!";
        statusElement.className =
          "text-sm text-green-600 dark:text-green-400 mt-1 font-medium";
      }
    } catch (error) {
      console.error(`Error downloading page ${pageIndex + 1}:`, error);
      setDownloadSuccess(`✗ Failed to download page ${pageIndex + 1}`);
      setTimeout(() => setDownloadSuccess(null), 3000);

      if (statusElement) {
        statusElement.innerText = "✗ Download failed";
        statusElement.className =
          "text-sm text-red-600 dark:text-red-400 mt-1 font-medium";
      }
    } finally {
      setTimeout(() => {
        if (statusElement) {
          statusElement.innerText = "Ready to download";
          statusElement.className =
            "text-sm text-blue-600 dark:text-blue-400 mt-1";
        }
      }, 2000);
    }
  };

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles(newFiles);
    setProcessed(false);
    setPageData([]);
    setPdfData(null);
    setShowUploadInfo(false);
    setCurrentPage(1);
    setDownloadSuccess(null);
    setCompressionRatio(0);
  };

  const handleReset = () => {
    setFiles([]);
    setProcessed(false);
    setPageData([]);
    setPdfData(null);
    setProgress(0);
    setShowUploadInfo(true);
    setCurrentPage(1);
    setDownloadSuccess(null);
    setOriginalFileSize(0);
    setEstimatedFileSize(0);
    setCompressionRatio(0);
  };

  const handlePageZoom = (pageNumber: number, fileName: string) => {
    setZoomModal({
      isOpen: true,
      pageNumber,
      fileName,
    });
  };

  // Pagination controls
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (isMobile) {
      const pageGrid = document.getElementById("page-grid");
      if (pageGrid) {
        pageGrid.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Items per page options - responsive
  const itemsPerPageOptions = isMobile
    ? [8, 12, 16]
    : isTablet
    ? [12, 16, 20]
    : [20, 30, 40];

  return (
  <>
  <Head>
  {/* SEO Schema */}
      <FAQSchema />
   
      <BreadcrumbSchema />
      </Head>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-red-950/20 py-4 sm:py-8 md:py-12">
      <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Success Message Overlay - Mobile friendly */}
          <AnimatePresence>
            {downloadSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
              >
                <div
                  className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl backdrop-blur-sm ${
                    downloadSuccess.startsWith("✓")
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                      : "bg-gradient-to-r from-red-500 to-orange-600 text-white"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    {downloadSuccess.startsWith("✓") ? (
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                    <span className="font-medium text-sm sm:text-base">
                      {downloadSuccess}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header - Responsive */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <a
              href="/"
              className="inline-flex items-center gap-2 sm:gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all font-medium"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm sm:text-base">Back to Tools</span>
            </a>

            <div className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-purple-950/30 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mt-2 md:mt-0">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                Secure & Private
              </span>
            </div>
          </div>

          {/* Hero Section - Responsive */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
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

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 sm:mb-4 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent px-2">
              PDF Page Remover
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
              Remove unwanted pages from your PDF documents instantly.
              <span className="block text-red-600 dark:text-red-400 font-medium mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">
                Select which pages to keep and download a clean PDF!
              </span>
            </p>
          </div>

          {/* Main Card - Responsive */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-xl sm:shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 mb-6 sm:mb-8">
            {/* Upload Section */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-1.5 sm:p-2 bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-lg sm:rounded-xl">
                  <FolderOpen className="w-4 h-4 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    Upload PDF
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400">
                    Select your PDF file (auto-processed after upload)
                  </p>
                </div>
              </div>

              <FileUploader
                accept="application/pdf"
                multiple={false}
                onFilesSelected={handleFilesSelected}
              />

              {/* Features Grid - Responsive */}
              <AnimatePresence>
                {showUploadInfo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4"
                  >
                    <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 rounded-lg sm:rounded-xl md:rounded-2xl border border-red-200 dark:border-red-800/50">
                      <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-red-600 dark:text-red-400" />
                        <span className="text-xs sm:text-sm md:text-base font-semibold text-red-800 dark:text-red-300">
                          Remove Pages
                        </span>
                      </div>
                      <p className="text-xs text-red-700/80 dark:text-red-400/80 mt-1 sm:mt-2">
                        Select and remove specific pages from PDF
                      </p>
                    </div>

                    <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20 rounded-lg sm:rounded-xl md:rounded-2xl border border-orange-200 dark:border-orange-800/50">
                      <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                        <Grid3x3 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-orange-600 dark:text-orange-400" />
                        <span className="text-xs sm:text-sm md:text-base font-semibold text-orange-800 dark:text-orange-300">
                          Smart Preview
                        </span>
                      </div>
                      <p className="text-xs text-orange-700/80 dark:text-orange-400/80 mt-1 sm:mt-2">
                        Click any page to zoom in full quality
                      </p>
                    </div>

                    <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-900/20 rounded-lg sm:rounded-xl md:rounded-2xl border border-green-200 dark:border-green-800/50">
                      <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-600 dark:text-green-400" />
                        <span className="text-xs sm:text-sm md:text-base font-semibold text-green-800 dark:text-green-300">
                          Auto Processing
                        </span>
                      </div>
                      <p className="text-xs text-green-700/80 dark:text-green-400/80 mt-1 sm:mt-2">
                        Automatically loads after upload
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Content Area */}
            {files.length > 0 && (
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                {/* Processing State */}
                <AnimatePresence mode="wait">
                  {processing && !processed && (
                    <motion.div
                      key="converting"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-3 sm:space-y-4"
                    >
                      <div className="text-center">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                          Loading PDF 📄
                        </h3>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">
                          Processing {pageData.length} pages...
                        </p>
                      </div>

                      <ProgressBar
                        progress={progress}
                        label={
                          progress < 40
                            ? "Loading PDF..."
                            : progress < 70
                            ? "Analyzing pages..."
                            : "Preparing editor..."
                        }
                      />

                      <div className="flex justify-center">
                        <div className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-red-50 dark:bg-red-950/30 rounded-full">
                          <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-red-600 dark:text-red-400 animate-pulse" />
                          <span className="text-xs sm:text-sm md:text-base text-red-700 dark:text-red-300">
                            Preparing page selection editor
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Results */}
                  {processed && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 sm:space-y-6 md:space-y-8"
                    >
                      {/* Success Banner */}
                      <div className="p-3 sm:p-4 md:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl sm:rounded-2xl border-2 border-green-200 dark:border-green-800/50">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 md:gap-4">
                          <div className="flex items-center justify-center sm:justify-start">
                            <div className="p-1.5 sm:p-2 md:p-3 bg-green-100 dark:bg-green-900/50 rounded-lg sm:rounded-xl">
                              <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-green-600 dark:text-green-400" />
                            </div>
                          </div>
                          <div className="flex-1 text-center sm:text-left">
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                              PDF Loaded Successfully! 🎉
                            </h3>
                            <p className="text-green-700 dark:text-green-300 font-medium text-xs sm:text-sm md:text-base">
                              {selectedPagesCount} of {pageData.length} pages
                              selected
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1">
                              Click on pages to select/deselect them
                            </p>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base">
                              {selectedPagesCount} Kept
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* File Size Info */}
                      {originalFileSize > 0 && (
                        <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl border-2 border-blue-200 dark:border-blue-800/30">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300">
                              Original Size:
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">
                              {(originalFileSize / (1024 * 1024)).toFixed(2)} MB
                            </span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400">
                              Estimated New Size:
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-green-600 dark:text-green-400">
                              {(estimatedFileSize / (1024 * 1024)).toFixed(2)}{" "}
                              MB
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div
                              className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500"
                              style={{ width: `${100 - compressionRatio}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Expected reduction: {compressionRatio}%
                          </p>
                        </div>
                      )}

                      {/* Batch Selection Controls - Responsive */}
                      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-red-200 dark:border-red-800/30">
                        <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2">
                          <Grid3x3 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                          Batch Selection
                        </h4>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <button
                            onClick={selectAllPages}
                            disabled={processing}
                            className="py-1.5 sm:py-2 px-2 sm:px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="truncate">Select All</span>
                          </button>
                          <button
                            onClick={removeAllPages}
                            disabled={processing}
                            className="py-1.5 sm:py-2 px-2 sm:px-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <X className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="truncate">Remove All</span>
                          </button>
                          <button
                            onClick={selectEvenPages}
                            disabled={processing}
                            className="py-1.5 sm:py-2 px-2 sm:px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <span className="text-sm font-bold">2</span>
                            <span className="truncate">Even Pages</span>
                          </button>
                          <button
                            onClick={selectOddPages}
                            disabled={processing}
                            className="py-1.5 sm:py-2 px-2 sm:px-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <span className="text-sm font-bold">1</span>
                            <span className="truncate">Odd Pages</span>
                          </button>
                        </div>

                        <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 text-center">
                          Quick selection options for {pageData.length} pages
                        </p>
                      </div>

                      {/* Pagination Controls - Responsive */}
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-blue-200 dark:border-blue-800/30">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">
                              Showing {startIndex + 1}-{endIndex} of{" "}
                              {pageData.length} pages
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                              Navigate through pages using pagination
                            </p>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3">
                            <label className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                              Items per page:
                            </label>
                            <select
                              value={itemsPerPage}
                              onChange={(e) =>
                                setItemsPerPage(Number(e.target.value))
                              }
                              className="px-2 py-1 sm:px-3 sm:py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-xs sm:text-sm"
                            >
                              {itemsPerPageOptions.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Pagination Buttons */}
                        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                          <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="px-2 py-1 sm:px-3 sm:py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs sm:text-sm"
                          >
                            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>

                          {Array.from(
                            { length: Math.min(5, totalPages) },
                            (_, i) => {
                              let pageNum;
                              if (totalPages <= 5) {
                                pageNum = i + 1;
                              } else if (currentPage <= 3) {
                                pageNum = i + 1;
                              } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                              } else {
                                pageNum = currentPage - 2 + i;
                              }

                              return (
                                <button
                                  key={pageNum}
                                  onClick={() => goToPage(pageNum)}
                                  className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                                    currentPage === pageNum
                                      ? "bg-gradient-to-r from-red-500 to-orange-600 text-white"
                                      : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              );
                            }
                          )}

                          <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="px-2 py-1 sm:px-3 sm:py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs sm:text-sm"
                          >
                            <ChevronRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Download Progress */}
                      {downloadingAll && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-3 sm:p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-xl border-2 border-red-200 dark:border-red-800/30"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-red-700 dark:text-red-300 text-xs sm:text-sm">
                              Downloading {downloadProgress}% complete
                            </span>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {Math.round(
                                (downloadProgress / 100) * selectedPagesCount
                              )}{" "}
                              of {selectedPagesCount} pages
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${downloadProgress}%` }}
                              className="h-1.5 sm:h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-600"
                            />
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">
                            Please wait while modified PDF is being generated...
                          </p>
                        </motion.div>
                      )}

                      {/* Page Grid */}
                      <div id="page-grid">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 md:mb-6 gap-1 sm:gap-2">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-1 sm:gap-2 md:gap-3">
                            <Grid3x3 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-500" />
                            Pages (Page {currentPage} of {totalPages})
                          </h3>
                          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                            {isMobile
                              ? "Tap to select/deselect"
                              : "Click to select/deselect"}{" "}
                            • Click to zoom
                          </span>
                        </div>

                        <div
                          className={`grid ${
                            itemsPerPage <= 8
                              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                              : itemsPerPage <= 12
                              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                              : itemsPerPage <= 16
                              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                          } gap-3 sm:gap-4 md:gap-6`}
                        >
                          {currentPageData.map((page, index) => {
                            const actualIndex = startIndex + index;
                            return (
                              <motion.div
                                key={page.pageNumber}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.02 }}
                                whileHover={{ y: -2 }}
                                className="group"
                              >
                                <div
                                  className={`bg-gradient-to-br rounded-xl sm:rounded-2xl border-2 p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 ${
                                    page.isSelected
                                      ? "from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-green-500 dark:border-green-600"
                                      : "from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-red-500 dark:border-red-600"
                                  }`}
                                >
                                  <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 md:space-y-4">
                                    <PdfPageRenderer
                                      pageNumber={page.pageNumber}
                                      pdfData={pdfData}
                                      fileName={page.fileName}
                                      isSelected={page.isSelected}
                                      onSelectionToggle={() =>
                                        togglePageSelection(actualIndex)
                                      }
                                      onZoomClick={() =>
                                        handlePageZoom(
                                          page.pageNumber,
                                          page.fileName
                                        )
                                      }
                                    />

                                    <div className="w-full">
                                      <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg mb-1">
                                        Page {page.pageNumber}
                                      </h4>
                                      <p
                                        className={`text-xs sm:text-sm md:text-base font-medium mb-2 ${
                                          page.isSelected
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-red-600 dark:text-red-400"
                                        }`}
                                      >
                                        {page.isSelected
                                          ? "✓ Keep"
                                          : "✗ Remove"}
                                      </p>

                                      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                                        <button
                                          onClick={() =>
                                            togglePageSelection(actualIndex)
                                          }
                                          className={`py-1.5 sm:py-2 px-2 sm:px-3 font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm transition-all ${
                                            page.isSelected
                                              ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                                              : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                                          }`}
                                        >
                                          {page.isSelected ? "Remove" : "Keep"}
                                        </button>

                                        <button
                                          onClick={() =>
                                            handleDownloadPage(actualIndex)
                                          }
                                          className="py-1.5 sm:py-2 px-2 sm:px-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm transition-all"
                                        >
                                          Download
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>

                     

                      {/* Download Button Section - Responsive */}
                      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 border-2 border-red-200 dark:border-red-800/50">
                        <div className="text-center mb-3 sm:mb-4 md:mb-6">
                          <h4 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-1 sm:mb-2">
                            Download Modified PDF
                          </h4>
                          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                            Download PDF with only selected pages
                          </p>

                          {originalFileSize > 0 && (
                            <div className="mb-4 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                  Original size:
                                </span>
                                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                  {(originalFileSize / (1024 * 1024)).toFixed(
                                    2
                                  )}{" "}
                                  MB
                                </span>
                              </div>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs sm:text-sm text-green-600 dark:text-green-400">
                                  Estimated new size:
                                </span>
                                <span className="text-sm font-bold text-green-600 dark:text-green-400">
                                  {(estimatedFileSize / (1024 * 1024)).toFixed(
                                    2
                                  )}{" "}
                                  MB
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs sm:text-sm text-red-600 dark:text-red-400">
                                  Expected reduction:
                                </span>
                                <span className="text-sm font-bold text-red-600 dark:text-red-400">
                                  {compressionRatio}%
                                </span>
                              </div>
                            </div>
                          )}

                          <div className="space-y-3 sm:space-y-4">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={handleDownloadModifiedPdf}
                              disabled={
                                downloadingAll || selectedPagesCount === 0
                              }
                              className={`w-full py-2.5 sm:py-3 md:py-4 px-4 sm:px-5 md:px-6 text-white font-bold rounded-lg sm:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 ${
                                selectedPagesCount === 0
                                  ? "bg-gradient-to-r from-gray-500 to-gray-600"
                                  : "bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
                              }`}
                            >
                              {downloadingAll ? (
                                <>
                                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                  <span>Processing...</span>
                                </>
                              ) : (
                                <>
                                  <Download className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                  <span>
                                    Download PDF ({selectedPagesCount} pages)
                                  </span>
                                </>
                              )}
                            </motion.button>
                          </div>

                          <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium mt-2 sm:mt-3">
                            {selectedPagesCount === 0
                              ? "Select at least one page to download"
                              : "Ready to download modified PDF"}
                          </p>
                        </div>
                      </div>

                      {/* Reset & Another PDF */}
                      <div className="text-center space-y-2 sm:space-y-3">
                        <button
                          onClick={handleReset}
                          className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm md:text-base"
                        >
                          <FolderOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                          Remove Pages from Another PDF
                        </button>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          All processing happens in your browser • No files are
                          uploaded
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Zoom Modal */}
          <ZoomModal
            isOpen={zoomModal.isOpen}
            onClose={() => setZoomModal({ ...zoomModal, isOpen: false })}
            pageNumber={zoomModal.pageNumber}
            pdfData={pdfData}
            fileName={zoomModal.fileName}
          />

          {/* Visible FAQ Section */}
<section className="max-w-3xl mx-auto my-16 px-4">
  {/* Title */}
  <div className="text-center mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
      Frequently Asked Questions
    </h2>
    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
     Everything you need to know about removing pages from PDF files online
    </p>
  </div>

  {/* FAQ List */}
  <div className="space-y-4">
    {faqData.map((faq, index) => (
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


          {/* Explore All Tools Section */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-center justify-between mb-6 md:mb-8">
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
            </div>

          {/* Info Footer - Responsive */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 text-center mt-6 sm:mt-8 md:mt-12">
            <div className="p-2 sm:p-3 md:p-4">
              <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-lg sm:rounded-xl md:rounded-2xl mb-1.5 sm:mb-2 md:mb-3">
                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-600 dark:text-red-400" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                Smart Removal
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Select specific pages to remove or keep
              </p>
            </div>

            <div className="p-2 sm:p-3 md:p-4">
              <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-lg sm:rounded-xl md:rounded-2xl mb-1.5 sm:mb-2 md:mb-3">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                Batch Selection
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Select all, even, odd, or deselect all pages at once
              </p>
            </div>

            <div className="p-2 sm:p-3 md:p-4">
              <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-lg sm:rounded-xl md:rounded-2xl mb-1.5 sm:mb-2 md:mb-3">
                <Download className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                Size Optimization
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Download smaller PDF with only selected pages
              </p>
            </div>
          </div>

          {/* Mobile Tips Banner */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-xl border-2 border-red-200 dark:border-red-800/30"
            >
              <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-red-600" />
                Mobile Tips
              </h4>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>Tap page thumbnails to select/deselect</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>Click page to zoom (50%-200%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>Full quality image at any zoom level</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>Use batch selection for multiple pages</span>
                </li>
              </ul>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
    </>
  );
}
