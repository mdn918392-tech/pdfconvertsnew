"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BreadcrumbSchema from "./BreadcrumbSchema";
import SitelinkSearchSchema from "./SitelinkSearchSchema";
import HowToSchema from "./HowToSchema";
import FAQSchema from "./FAQSchema";
import { 
  Download, 
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
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Loader2,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Palette,
  ImagePlus,
  FileImage,
  Check,
  RotateCw,
  RotateCcw,
  Rotate3D,
  RefreshCw,
  Settings,
  Grid3x3,
  FolderOpen
} from "lucide-react";
import FileUploader from "@/app/components/FileUploader";
import ProgressBar from "@/app/components/ProgressBar";
import { downloadFile } from "../../utils/imageUtils";
import { PDFDocument } from "pdf-lib";

// Import pdfjs-dist with proper configuration
import * as pdfjsLib from "pdfjs-dist";

// Check if we're in browser before setting worker
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  } catch (error) {
    console.warn("Failed to set PDF.js worker source:", error);
  }
}

// Page Info with image data and rotation
type PageData = {
    pageNumber: number;
    fileName: string;
    imageData?: string;
    rotation: number; // 0, 90, 180, 270 degrees
};

// --- TOOL KEYWORDS DATA ---
const toolKeywords = [
    { label: "PDF to JPG", url: "/tool/pdf-to-jpg" },
    { label: "PDF to PNG", url: "/tool/pdf-to-png" },
    { label: "Image Rotator", url: "/tool/image-rotator" },
    { label: "Image Editor", url: "/tool/image-editor" },
    { label: "Batch Rotate Images", url: "/tool/batch-rotate" },
    { label: "Image Converter", url: "/tool/image-converter" },
    { label: "JPG Converter", url: "/tool/jpg-converter" },
    { label: "PNG Converter", url: "/tool/png-converter" },
    { label: "PDF Creator", url: "/tool/pdf-creator" },
    { label: "PDF file", url: "/tool/pdf-viewer" },
    { label: "PDF converter", url: "/tool/pdf-converter" },
    { label: "Microsoft Word", url: "/tool/pdf-to-word" },
    { label: "Word", url: "/tool/word-converter" },
    { label: "Microsoft PowerPoint", url: "/tool/pdf-to-powerpoint" },
    { label: "Microsoft Excel", url: "/tool/pdf-to-excel" },
    { label: "PDF", url: "/tool/pdf-tools" },
];

// --- TOOL ICON HELPER FUNCTION ---
const getToolIcon = (label: string): React.ReactNode => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes("rotate") || lowerLabel.includes("rotator")) return <Rotate3D className="w-5 h-5 text-white" />;
    if (lowerLabel.includes("jpg") || lowerLabel.includes("png") || lowerLabel.includes("image")) return <ImageIcon className="w-5 h-5 text-white" />;
    if (lowerLabel.includes("word")) return <FileText className="w-5 h-5 text-white" />;
    if (lowerLabel.includes("powerpoint")) return <Layers className="w-5 h-5 text-white" />;
    if (lowerLabel.includes("excel")) return <SquareGanttChart className="w-5 h-5 text-white" />;
    if (lowerLabel.includes("editor")) return <Edit className="w-5 h-5 text-white" />;
    if (lowerLabel.includes("converter") || lowerLabel.includes("creator")) return <Zap className="w-5 h-5 text-white" />;
    if (lowerLabel.includes("mobile app")) return <Tablet className="w-5 h-5 text-white" />;
    return <File className="w-5 h-5 text-white" />;
};

// --- TOOL DESCRIPTION HELPER FUNCTION ---
const getToolDescription = (label: string): string => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes("rotate") || lowerLabel.includes("rotator")) return "Rotate PDF pages to any angle before converting to images.";
    if (lowerLabel.includes("jpg") || lowerLabel.includes("png") || lowerLabel.includes("image")) return "Convert PDF pages to high-quality JPG or PNG images.";
    if (lowerLabel.includes("word")) return "Convert PDF documents directly to editable DOCX format.";
    if (lowerLabel.includes("creator")) return "Combine multiple documents or images into a new PDF.";
    if (lowerLabel.includes("converter")) return "Convert files to/from PDF, including JPG, PNG, and more.";
    if (lowerLabel.includes("text editor")) return "Quickly edit text content within your PDF pages.";
    if (lowerLabel.includes("mobile app")) return "Dedicated tool for optimizing PDF tasks on the go.";
    if (lowerLabel.includes("powerpoint")) return "Convert PDF content into editable PPT/PPTX slides.";
    if (lowerLabel.includes("excel")) return "Export tables and data directly from PDF to XLSX format.";
    if (lowerLabel === "pdf file" || lowerLabel === "pdf") return "View, read, and manage your PDF documents easily.";
    if (lowerLabel === "image editor") return "Edit and enhance your converted images.";
    return "Quickly process your document for immediate results.";
};

// Image format options
type ImageFormat = 'jpg' | 'png';
type ImageQuality = 'high' | 'medium' | 'low';

interface ImageSettings {
  format: ImageFormat;
  quality: ImageQuality;
  dpi: number;
}

// PDF data interface
interface PdfData {
  base64: string;
  pageCount: number;
}

// --- IMAGE ROTATOR COMPONENT ---
interface ImageRotatorProps {
  imageData: string;
  rotation: number;
  onRotationChange: (rotation: number) => void;
  onZoomClick?: () => void;
  fileName: string;
  pageNumber: number;
}

const ImageRotator = ({ imageData, rotation, onRotationChange, onZoomClick, fileName, pageNumber }: ImageRotatorProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const rotateClockwise = () => {
    const newRotation = (rotation + 90) % 360;
    onRotationChange(newRotation);
  };

  const rotateCounterClockwise = () => {
    const newRotation = (rotation - 90 + 360) % 360;
    onRotationChange(newRotation);
  };

  const resetRotation = () => {
    onRotationChange(0);
  };

  const getRotationText = () => {
    switch(rotation) {
      case 0: return "0° (Normal)";
      case 90: return "90° (Right)";
      case 180: return "180° (Upside down)";
      case 270: return "270° (Left)";
      default: return `${rotation}°`;
    }
  };

  return (
    <div 
      className="w-full h-48 sm:h-56 flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center border-2 border-gray-200 dark:border-gray-700 relative overflow-hidden cursor-pointer group"
      onClick={onZoomClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Rotation overlay button */}
      <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="p-1.5 bg-black/70 rounded-full backdrop-blur-sm">
          <ZoomIn className="w-4 h-4 text-white" />
        </div>
      </div>
      
      {/* Rotation controls */}
      <div className={`absolute bottom-2 left-2 z-30 flex flex-col gap-1 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <button
          onClick={(e) => { e.stopPropagation(); rotateCounterClockwise(); }}
          className="p-1.5 bg-black/70 hover:bg-black/90 rounded-full backdrop-blur-sm transition-colors"
          title="Rotate counter-clockwise"
        >
          <RotateCcw className="w-3 h-3 text-white" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); resetRotation(); }}
          className="p-1.5 bg-black/70 hover:bg-black/90 rounded-full backdrop-blur-sm transition-colors"
          title="Reset rotation"
        >
          <RefreshCw className="w-3 h-3 text-white" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); rotateClockwise(); }}
          className="p-1.5 bg-black/70 hover:bg-black/90 rounded-full backdrop-blur-sm transition-colors"
          title="Rotate clockwise"
        >
          <RotateCw className="w-3 h-3 text-white" />
        </button>
      </div>
      
      {/* Tap hint for mobile */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 sm:hidden">
        <div className="px-2 py-1 bg-black/60 rounded-full backdrop-blur-sm">
          <span className="text-xs text-white">Tap to zoom</span>
        </div>
      </div>
      
      {/* Rotated image */}
      <div className="relative w-full h-full flex items-center justify-center">
        <img 
          src={imageData} 
          alt={`Page ${pageNumber} of ${fileName}`}
          className="w-auto h-auto max-w-full max-h-full object-contain p-2 select-none transition-transform duration-300"
          style={{ transform: `rotate(${rotation}deg)` }}
          draggable="false"
        />
        
        {/* Rotation indicator */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-70 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <RotateCw className="w-3 h-3" />
          <span>{getRotationText()}</span>
        </div>
      </div>
    </div>
  );
};

// --- PDF PAGE RENDERER WITH ZOOM FUNCTIONALITY ---
interface PdfPageRendererProps {
  pageNumber: number;
  pdfData: PdfData | null;
  fileName: string;
  onZoomClick?: () => void;
}

const PdfPageRenderer = ({ pageNumber, pdfData, fileName, onZoomClick }: PdfPageRendererProps) => {
  const [pageImage, setPageImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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
        
        // Convert base64 back to Uint8Array
        const binaryString = atob(pdfData.base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        // Load PDF document
        const loadingTask = pdfjsLib.getDocument({ data: bytes });
        const pdf = await loadingTask.promise;
        
        // Get specific page
        const page = await pdf.getPage(pageNumber);
        
        // Set viewport based on device width
        const viewportWidth = Math.min(window.innerWidth * 0.8, 400);
        const scale = viewportWidth / page.getViewport({ scale: 1 }).width;
        const viewport = page.getViewport({ scale });
        
        // Create canvas
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        
        if (!context) {
          throw new Error("Could not get canvas context");
        }
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        // Render page to canvas
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        
        await page.render(renderContext).promise;
        
        // Convert canvas to image URL
        const imageUrl = canvas.toDataURL("image/png", 0.8);
        
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
      if (pageImage) {
        URL.revokeObjectURL(pageImage);
      }
    };
  }, [pdfData, pageNumber]);

  return (
    <div 
      className="w-full h-48 sm:h-56 flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center border-2 border-gray-200 dark:border-gray-700 relative overflow-hidden cursor-pointer group"
      onClick={onZoomClick}
    >
      {/* Zoom overlay button */}
      <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="p-1.5 bg-black/70 rounded-full backdrop-blur-sm">
          <ZoomIn className="w-4 h-4 text-white" />
        </div>
      </div>
      
      {/* Tap hint for mobile */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 sm:hidden">
        <div className="px-2 py-1 bg-black/60 rounded-full backdrop-blur-sm">
          <span className="text-xs text-white">Tap to zoom</span>
        </div>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center p-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400 mb-2" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Loading page {pageNumber}...
          </span>
        </div>
      ) : error ? (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
          <span className="text-xs font-bold text-blue-800 dark:text-blue-300">
            Page
          </span>
          <span className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
            {pageNumber}
          </span>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Preview not available
          </p>
        </div>
      ) : pageImage ? (
        <div className="relative w-full h-full">
          <img 
            src={pageImage} 
            alt={`Page ${pageNumber} of ${fileName}`}
            className="w-full h-full object-contain p-2 select-none"
            draggable="false"
          />
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-70 group-hover:opacity-100 transition-opacity">
            Page {pageNumber}
          </div>
        </div>
      ) : null}
    </div>
  );
};

// --- ZOOM MODAL COMPONENT ---
interface ZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageNumber: number;
  pdfData: PdfData | null;
  fileName: string;
}

const ZoomModal = ({ isOpen, onClose, pageNumber, pdfData, fileName }: ZoomModalProps) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pageImage, setPageImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    
    const renderPageForZoom = async () => {
      if (!isOpen || !pdfData || !isMounted.current) return;

      try {
        setLoading(true);
        
        // Convert base64 back to Uint8Array for zoom
        const binaryString = atob(pdfData.base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        const loadingTask = pdfjsLib.getDocument({ data: bytes });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(pageNumber);
        
        // Calculate viewport with zoom
        const baseScale = 2;
        const scale = baseScale * zoomLevel;
        const viewport = page.getViewport({ scale });
        
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        
        if (!context) return;
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;
        
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
      if (pageImage) {
        URL.revokeObjectURL(pageImage);
      }
    };
  }, [isOpen, pdfData, pageNumber, zoomLevel]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
    setZoomLevel(1);
    setIsFullscreen(false);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isFullscreen ? 'bg-black' : 'bg-black/90 backdrop-blur-sm'
      }`}
      onClick={handleClose}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-50 p-2 bg-black/70 rounded-full hover:bg-black/90 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>
      
      {/* Zoom controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/70 rounded-full px-4 py-2 backdrop-blur-sm">
        <button
          onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          disabled={zoomLevel <= 0.5}
        >
          <ZoomOut className="w-5 h-5 text-white" />
        </button>
        
        <span className="text-white text-sm font-medium min-w-[60px] text-center">
          {Math.round(zoomLevel * 100)}%
        </span>
        
        <button
          onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          disabled={zoomLevel >= 3}
        >
          <ZoomIn className="w-5 h-5 text-white" />
        </button>
        
        <div className="h-6 w-px bg-white/30 mx-1"></div>
        
        <button
          onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5 text-white" />
          ) : (
            <Maximize2 className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
      
      {/* Page info */}
      <div className="absolute top-4 left-4 z-50 bg-black/70 rounded-full px-4 py-2 backdrop-blur-sm">
        <span className="text-white text-sm font-medium">
          Page {pageNumber} • {fileName}
        </span>
      </div>
      
      {/* Image container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`relative ${isFullscreen ? 'w-full h-full' : 'max-w-[90vw] max-h-[80vh]'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {loading ? (
          <div className="flex items-center justify-center w-full h-full">
            <Loader2 className="w-12 h-12 animate-spin text-white" />
          </div>
        ) : pageImage ? (
          <img
            src={pageImage}
            alt={`Zoomed view - Page ${pageNumber}`}
            className={`${isFullscreen ? 'w-full h-full' : 'w-auto h-auto'} object-contain rounded-lg shadow-2xl`}
            draggable="false"
          />
        ) : null}
      </motion.div>
      
      {/* Gesture hints for mobile */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 sm:hidden">
        <div className="flex items-center gap-4 text-white/80 text-sm">
          <div className="flex items-center gap-1">
            <div className="p-1 bg-white/20 rounded">
              <ZoomIn className="w-4 h-4" />
            </div>
            <span>Pinch to zoom</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="p-1 bg-white/20 rounded">
              <Maximize2 className="w-4 h-4" />
            </div>
            <span>Double tap for fullscreen</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Smart filename generator for converted images ---
const generateImageFilename = (
  originalFilename: string, 
  pageNumber: number, 
  totalPages: number,
  format: ImageFormat,
  rotation: number = 0
): string => {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  
  // Clean original filename
  const cleanName = originalFilename
    .replace(/\.pdf$/i, '')
    .replace(/[^a-zA-Z0-9\s-_]/g, '')
    .substring(0, 30)
    .trim();
  
  // Add rotation info to filename if rotated
  const rotationSuffix = rotation !== 0 ? `_rotated${rotation}` : '';
  
  if (totalPages === 1) {
    return `${cleanName}_${dateStr}${rotationSuffix}.${format}`;
  } else {
    return `${cleanName}_page${pageNumber}_${dateStr}${rotationSuffix}.${format}`;
  }
};

// --- Function to rotate an image ---
const rotateImage = (imageData: string, rotation: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      // Swap width and height for 90° or 270° rotations
      if (rotation === 90 || rotation === 270) {
        canvas.width = img.height;
        canvas.height = img.width;
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      
      // Translate to center, rotate, then translate back
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-img.width / 2, -img.height / 2);
      ctx.drawImage(img, 0, 0);
      
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = imageData;
  });
};

export default function PdfToImageConverterWithRotation() {
    const [files, setFiles] = useState<File[]>([]);
    const [converting, setConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [converted, setConverted] = useState(false);
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
      fileName: ''
    });

    // Image settings state
    const [imageSettings, setImageSettings] = useState<ImageSettings>({
      format: 'jpg',
      quality: 'high',
      dpi: 300
    });

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [downloadingAll, setDownloadingAll] = useState(false);
    const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
    const [downloadProgress, setDownloadProgress] = useState(0);

    // Calculate pagination
    const totalPages = Math.ceil(pageData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, pageData.length);
    const currentPageData = pageData.slice(startIndex, endIndex);

    // Convert ArrayBuffer to base64 for storage
    const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
      const bytes = new Uint8Array(buffer);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    };

    // Convert PDF to images
    const handleConvert = async () => {
        if (files.length === 0) return;

        setConverting(true);
        setProgress(0);
        setShowUploadInfo(false);

        try {
            const file = files[0];

            // Simulate progress for better UX
            setProgress(20);
            await new Promise(resolve => setTimeout(resolve, 500));

            const arrayBuffer = await file.arrayBuffer();
            
            // Store as base64
            const base64 = arrayBufferToBase64(arrayBuffer);

            setProgress(40);
            await new Promise(resolve => setTimeout(resolve, 300));

            // Use PDF-lib for page count
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const pageCount = pdfDoc.getPageCount();

            setProgress(60);

            // Generate page data with initial rotation 0
            const newPageData: PageData[] = Array.from(
                { length: pageCount },
                (_, i) => ({
                    pageNumber: i + 1,
                    fileName: generateImageFilename(file.name, i + 1, pageCount, imageSettings.format, 0),
                    rotation: 0,
                })
            );

            // Render all pages to images
            setProgress(70);
            
            // Convert base64 back to Uint8Array for rendering
            const binaryString = atob(base64);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            const loadingTask = pdfjsLib.getDocument({ data: bytes });
            const pdf = await loadingTask.promise;

            // Render all pages
            for (let i = 0; i < pageCount; i++) {
                const page = await pdf.getPage(i + 1);
                
                // Calculate scale based on DPI
                const scale = imageSettings.dpi / 96;
                const viewport = page.getViewport({ scale });
                
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                
                if (!context) continue;
                
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                
                await page.render({
                    canvasContext: context,
                    viewport: viewport
                }).promise;
                
                // Convert to image data URL
                const quality = imageSettings.quality === 'high' ? 0.9 : 
                               imageSettings.quality === 'medium' ? 0.7 : 0.5;
                const imageUrl = canvas.toDataURL(
                    `image/${imageSettings.format}`, 
                    quality
                );
                
                newPageData[i].imageData = imageUrl;
                
                // Update progress
                setProgress(70 + Math.round((i + 1) / pageCount * 25));
            }

            await new Promise(resolve => setTimeout(resolve, 500));
            setPageData(newPageData);
            setPdfData({ base64, pageCount });
            setProgress(100);
            
            setTimeout(() => {
                setConverted(true);
                setConverting(false);
                setCurrentPage(1); // Reset to first page
            }, 300);

        } catch (error) {
            console.error("Conversion error:", error);
            alert("Failed to process PDF. Please make sure it's a valid PDF file.");
            setConverting(false);
            setProgress(0);
        }
    };

    // Update rotation for a single page
    const handleRotationChange = async (pageIndex: number, newRotation: number) => {
        const updatedPageData = [...pageData];
        const pageInfo = updatedPageData[pageIndex];
        
        if (pageInfo?.imageData) {
            // Update rotation
            updatedPageData[pageIndex] = {
                ...pageInfo,
                rotation: newRotation,
                fileName: generateImageFilename(
                    files[0].name,
                    pageInfo.pageNumber,
                    pageData.length,
                    imageSettings.format,
                    newRotation
                )
            };
            
            setPageData(updatedPageData);
        }
    };

    // Rotate all images
    const rotateAllImages = async (rotation: number) => {
        if (pageData.length === 0) return;

        setConverting(true);
        setProgress(0);

        try {
            const updatedPageData = [...pageData];
            
            for (let i = 0; i < updatedPageData.length; i++) {
                const pageInfo = updatedPageData[i];
                if (pageInfo?.imageData) {
                    // Apply rotation to each image
                    updatedPageData[i] = {
                        ...pageInfo,
                        rotation: rotation,
                        fileName: generateImageFilename(
                            files[0].name,
                            pageInfo.pageNumber,
                            pageData.length,
                            imageSettings.format,
                            rotation
                        )
                    };
                }
                
                // Update progress
                const progress = Math.round(((i + 1) / updatedPageData.length) * 100);
                setProgress(progress);
            }

            setPageData(updatedPageData);
            setDownloadSuccess(`✓ All ${updatedPageData.length} images rotated to ${rotation}°!`);
            setTimeout(() => setDownloadSuccess(null), 3000);

        } catch (error) {
            console.error("Error rotating all images:", error);
            setDownloadSuccess("✗ Failed to rotate images. Please try again.");
            setTimeout(() => setDownloadSuccess(null), 3000);
        } finally {
            setConverting(false);
            setProgress(0);
        }
    };

    // Download a single image with rotation applied
    const handleDownloadImage = async (pageIndex: number, fileName: string) => {
        const pageInfo = pageData[pageIndex];
        if (!pageInfo?.imageData) {
            alert("Image not available.");
            return;
        }

        const statusElement = document.getElementById(`status-${pageIndex}`);
        if (statusElement) {
            statusElement.innerText = "Processing...";
            statusElement.className = "text-xs text-yellow-600 dark:text-yellow-400 mt-1 font-medium animate-pulse";
        }

        try {
            let imageData = pageInfo.imageData;
            
            // Apply rotation if needed
            if (pageInfo.rotation !== 0) {
                imageData = await rotateImage(pageInfo.imageData, pageInfo.rotation);
            }

            // Convert data URL to blob
            const response = await fetch(imageData);
            const blob = await response.blob();
            
            downloadFile(blob, fileName);

            // Show success message
            setDownloadSuccess(`✓ Page ${pageIndex + 1} downloaded as ${imageSettings.format.toUpperCase()}!`);
            setTimeout(() => setDownloadSuccess(null), 3000);

            if (statusElement) {
                statusElement.innerText = "✓ Downloaded!";
                statusElement.className = "text-xs text-green-600 dark:text-green-400 mt-1 font-medium";
            }

        } catch (error) {
            console.error(`Error downloading image ${pageIndex + 1}:`, error);
            setDownloadSuccess(`✗ Failed to download page ${pageIndex + 1}`);
            setTimeout(() => setDownloadSuccess(null), 3000);
            
            if (statusElement) {
                statusElement.innerText = "✗ Download failed";
                statusElement.className = "text-xs text-red-600 dark:text-red-400 mt-1 font-medium";
            }
        } finally {
            setTimeout(() => {
                if (statusElement) {
                    statusElement.innerText = "Ready to download";
                    statusElement.className = "text-xs text-blue-600 dark:text-blue-400 mt-1";
                }
            }, 2000);
        }
    };

    // Download all images with rotation applied
    const handleDownloadAll = async () => {
        if (pageData.length === 0) {
            alert("No images available.");
            return;
        }

        setDownloadingAll(true);
        setDownloadProgress(0);

        try {
            for (let i = 0; i < pageData.length; i++) {
                const pageInfo = pageData[i];
                if (!pageInfo?.imageData) continue;

                const fileName = pageInfo.fileName;

                let imageData = pageInfo.imageData;
                
                // Apply rotation if needed
                if (pageInfo.rotation !== 0) {
                    imageData = await rotateImage(pageInfo.imageData, pageInfo.rotation);
                }

                // Convert data URL to blob
                const response = await fetch(imageData);
                const blob = await response.blob();
                
                downloadFile(blob, fileName);
                
                // Update progress
                const progress = Math.round(((i + 1) / pageData.length) * 100);
                setDownloadProgress(progress);
                
                // Small delay to prevent browser freezing
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            // Success message
            setDownloadSuccess(`✓ Successfully downloaded all ${pageData.length} images!`);
            setTimeout(() => setDownloadSuccess(null), 5000);

        } catch (error) {
            console.error("Error downloading all images:", error);
            setDownloadSuccess("✗ Failed to download some images. Please try again.");
            setTimeout(() => setDownloadSuccess(null), 3000);
        } finally {
            setDownloadingAll(false);
            setDownloadProgress(0);
        }
    };

    // Download current page images
    const handleDownloadCurrentPage = async () => {
        if (currentPageData.length === 0) return;

        setDownloadingAll(true);
        setDownloadProgress(0);

        try {
            for (let i = 0; i < currentPageData.length; i++) {
                const pageInfo = currentPageData[i];
                if (!pageInfo?.imageData) continue;

                const fileName = pageInfo.fileName;

                let imageData = pageInfo.imageData;
                
                // Apply rotation if needed
                if (pageInfo.rotation !== 0) {
                    imageData = await rotateImage(pageInfo.imageData, pageInfo.rotation);
                }

                // Convert data URL to blob
                const response = await fetch(imageData);
                const blob = await response.blob();
                
                downloadFile(blob, fileName);
                
                const progress = Math.round(((i + 1) / currentPageData.length) * 100);
                setDownloadProgress(progress);
                
                // Small delay to prevent browser freezing
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            setDownloadSuccess(`✓ Successfully downloaded ${currentPageData.length} images!`);
            setTimeout(() => setDownloadSuccess(null), 3000);

        } catch (error) {
            console.error("Error downloading current page images:", error);
            setDownloadSuccess("✗ Failed to download images. Please try again.");
            setTimeout(() => setDownloadSuccess(null), 3000);
        } finally {
            setDownloadingAll(false);
            setDownloadProgress(0);
        }
    };

    const handleFilesSelected = (newFiles: File[]) => {
        setFiles(newFiles);
        setConverted(false);
        setPageData([]);
        setPdfData(null);
        setShowUploadInfo(false);
        setCurrentPage(1);
        setDownloadSuccess(null);
    };

    const handleReset = () => {
        setFiles([]);
        setConverted(false);
        setPageData([]);
        setPdfData(null);
        setProgress(0);
        setShowUploadInfo(true);
        setCurrentPage(1);
        setDownloadSuccess(null);
    };

    const handlePageZoom = (pageNumber: number, fileName: string) => {
        setZoomModal({
            isOpen: true,
            pageNumber,
            fileName
        });
    };

    // Update image settings
    const updateImageFormat = (format: ImageFormat) => {
        setImageSettings(prev => ({ ...prev, format }));
        
        // Update filenames
        if (files.length > 0 && pageData.length > 0) {
            const updatedPageData = pageData.map((page, index) => ({
                ...page,
                fileName: generateImageFilename(files[0].name, index + 1, pageData.length, format, page.rotation)
            }));
            setPageData(updatedPageData);
        }
    };

    const updateImageQuality = (quality: ImageQuality) => {
        setImageSettings(prev => ({ ...prev, quality }));
    };

    const updateDPI = (dpi: number) => {
        setImageSettings(prev => ({ ...prev, dpi }));
    };

    // Pagination controls
    const goToPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
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

    // Items per page options
    const itemsPerPageOptions = [10, 20, 30, 50];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20 py-8 md:py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Success Message Overlay */}
                    <AnimatePresence>
                        {downloadSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
                            >
                                <div className={`p-4 rounded-xl shadow-2xl backdrop-blur-sm ${
                                    downloadSuccess.startsWith("✓") 
                                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white" 
                                        : "bg-gradient-to-r from-red-500 to-orange-600 text-white"
                                }`}>
                                    <div className="flex items-center justify-center gap-3">
                                        {downloadSuccess.startsWith("✓") ? (
                                            <CheckCircle className="w-5 h-5" />
                                        ) : (
                                            <X className="w-5 h-5" />
                                        )}
                                        <span className="font-medium">{downloadSuccess}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <a
                            href="/"
                            className="inline-flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all font-medium group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="hidden sm:inline">Back to Tools</span>
                        </a>
                        
                        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-purple-950/30 px-4 py-2 rounded-full">
                            <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                                Secure & Private
                            </span>
                        </div>
                    </div>

                    {/* Hero Section */}
                    <div className="text-center mb-10 md:mb-12">
                        <motion.div 
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-2xl"
                        >
                            <Rotate3D className="w-10 h-10 text-white" />
                        </motion.div>
                        
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                            PDF to Image Converter with Rotation
                        </h1>
                        
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Convert PDF documents to images and rotate them to any angle. 
                            <span className="block text-blue-600 dark:text-blue-400 font-medium mt-1">
                                Rotate individual images or batch rotate all pages!
                            </span>
                        </p>
                    </div>

                    {/* Main Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-2xl p-4 sm:p-6 md:p-8 mb-8">
                        {/* Upload Section */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl">
                                    <FolderOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                        Upload PDF
                                    </h2>
                                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                                        Select your PDF file to convert and rotate
                                    </p>
                                </div>
                            </div>

                            <FileUploader
                                accept="application/pdf"
                                multiple={false}
                                onFilesSelected={handleFilesSelected}
                            />

                            {/* Image Settings */}
                            {files.length > 0 && !converted && !converting && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-6 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl sm:rounded-2xl border-2 border-blue-200 dark:border-blue-800/30"
                                >
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Settings className="w-5 h-5 text-blue-600" />
                                        Conversion Settings
                                    </h3>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {/* Format Selection */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Output Format
                                            </label>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => updateImageFormat('jpg')}
                                                    className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all ${
                                                        imageSettings.format === 'jpg'
                                                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                                                            : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                    }`}
                                                >
                                                    JPG
                                                </button>
                                                <button
                                                    onClick={() => updateImageFormat('png')}
                                                    className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all ${
                                                        imageSettings.format === 'png'
                                                            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md'
                                                            : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                    }`}
                                                >
                                                    PNG
                                                </button>
                                            </div>
                                        </div>

                                        {/* Quality Selection */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Image Quality
                                            </label>
                                            <div className="flex gap-2">
                                                {(['low', 'medium', 'high'] as ImageQuality[]).map((quality) => (
                                                    <button
                                                        key={quality}
                                                        onClick={() => updateImageQuality(quality)}
                                                        className={`flex-1 py-2 px-2 text-xs rounded-lg font-medium transition-all ${
                                                            imageSettings.quality === quality
                                                                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                                                                : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                        }`}
                                                    >
                                                        {quality.charAt(0).toUpperCase() + quality.slice(1)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* DPI Selection */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Resolution (DPI)
                                            </label>
                                            <div className="flex gap-2">
                                                {[150, 300, 600].map((dpi) => (
                                                    <button
                                                        key={dpi}
                                                        onClick={() => updateDPI(dpi)}
                                                        className={`flex-1 py-2 px-2 text-xs rounded-lg font-medium transition-all ${
                                                            imageSettings.dpi === dpi
                                                                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                                                                : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                        }`}
                                                    >
                                                        {dpi} DPI
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Features Grid - Responsive */}
                            <AnimatePresence>
                                {showUploadInfo && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
                                    >
                                        <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 rounded-xl sm:rounded-2xl border border-blue-200 dark:border-blue-800/50">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <Rotate3D className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                                                <span className="text-sm sm:text-base font-semibold text-blue-800 dark:text-blue-300">
                                                    Image Rotation
                                                </span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-blue-700/80 dark:text-blue-400/80 mt-1 sm:mt-2">
                                                Rotate images to any angle before download
                                            </p>
                                        </div>
                                        
                                        <div className="p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-900/20 rounded-xl sm:rounded-2xl border border-purple-200 dark:border-purple-800/50">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <Grid3x3 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                                                <span className="text-sm sm:text-base font-semibold text-purple-800 dark:text-purple-300">
                                                    Batch Rotate
                                                </span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-purple-700/80 dark:text-purple-400/80 mt-1 sm:mt-2">
                                                Rotate all images at once with one click
                                            </p>
                                        </div>
                                        
                                        <div className="p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-900/20 rounded-xl sm:rounded-2xl border border-green-200 dark:border-green-800/50">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                                                <span className="text-sm sm:text-base font-semibold text-green-800 dark:text-green-300">
                                                    Real-time Preview
                                                </span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-green-700/80 dark:text-green-400/80 mt-1 sm:mt-2">
                                                See rotation changes instantly
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Content Area */}
                        {files.length > 0 && (
                            <div className="space-y-6 sm:space-y-8">
                                {/* Selected File Info */}
                                <div className="p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20 rounded-xl sm:rounded-2xl border-2 border-blue-200 dark:border-blue-800/30">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md">
                                                <FileImage className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg truncate">
                                                    {files[0].name}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                                    {(files[0].size / 1024 / 1024).toFixed(2)} MB • 
                                                    <span className="ml-1 text-blue-600 dark:text-blue-400 font-medium">
                                                        Output: {imageSettings.format.toUpperCase()} ({imageSettings.dpi} DPI)
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleReset}
                                            className="px-4 py-2 sm:px-6 sm:py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg sm:rounded-xl transition-colors mt-2 sm:mt-0"
                                        >
                                            Change File
                                        </button>
                                    </div>
                                </div>

                                {/* Processing State */}
                                <AnimatePresence mode="wait">
                                    {converting && !converted && (
                                        <motion.div
                                            key="converting"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="space-y-4 sm:space-y-6"
                                        >
                                            <div className="text-center">
                                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                                                    Converting PDF to Images 🖼️
                                                </h3>
                                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                                                    Processing pages with {imageSettings.dpi} DPI...
                                                </p>
                                            </div>
                                            
                                            <ProgressBar
                                                progress={progress}
                                                label={
                                                    progress < 40 
                                                    ? "Loading PDF..." 
                                                    : progress < 70 
                                                    ? "Converting pages to images..." 
                                                    : "Preparing downloads..."
                                                }
                                            />
                                            
                                            <div className="flex justify-center">
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-50 dark:bg-blue-950/30 rounded-full">
                                                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
                                                    <span className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                                                        Converting to {imageSettings.format.toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Convert Button */}
                                    {!converted && !converting && (
                                        <motion.button
                                            key="convert"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleConvert}
                                            className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3"
                                        >
                                            <Rotate3D className="w-5 h-5 sm:w-6 sm:h-6" />
                                            <span>Convert to {imageSettings.format.toUpperCase()}</span>
                                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </motion.button>
                                    )}

                                    {/* Results */}
                                    {converted && (
                                        <motion.div
                                            key="results"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-6 sm:space-y-8"
                                        >
                                            {/* Success Banner */}
                                            <div className="p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl sm:rounded-2xl border-2 border-green-200 dark:border-green-800/50">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                                    <div className="flex items-center justify-center sm:justify-start">
                                                        <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900/50 rounded-lg sm:rounded-xl">
                                                            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 text-center sm:text-left">
                                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                            PDF Successfully Converted! 🎉
                                                        </h3>
                                                        <p className="text-green-700 dark:text-green-300 font-medium text-sm sm:text-base">
                                                            Converted {pageData.length} pages to {imageSettings.format.toUpperCase()} images
                                                        </p>
                                                        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1">
                                                            Rotate images before downloading
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-center">
                                                        <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg sm:rounded-xl text-sm sm:text-base">
                                                            {pageData.length} Images
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Batch Rotation Controls */}
                                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-indigo-200 dark:border-indigo-800/30">
                                                <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                                    <Rotate3D className="w-5 h-5 text-indigo-600" />
                                                    Batch Rotate All Images
                                                </h4>
                                                
                                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
                                                    <button
                                                        onClick={() => rotateAllImages(90)}
                                                        disabled={converting}
                                                        className="py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                                    >
                                                        <RotateCw className="w-4 h-4" />
                                                        Rotate 90° Right
                                                    </button>
                                                    <button
                                                        onClick={() => rotateAllImages(180)}
                                                        disabled={converting}
                                                        className="py-2 px-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                                    >
                                                        <RefreshCw className="w-4 h-4" />
                                                        Rotate 180°
                                                    </button>
                                                    <button
                                                        onClick={() => rotateAllImages(270)}
                                                        disabled={converting}
                                                        className="py-2 px-4 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                                    >
                                                        <RotateCcw className="w-4 h-4" />
                                                        Rotate 90° Left
                                                    </button>
                                                    <button
                                                        onClick={() => rotateAllImages(0)}
                                                        disabled={converting}
                                                        className="py-2 px-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                                    >
                                                        <RefreshCw className="w-4 h-4" />
                                                        Reset All
                                                    </button>
                                                </div>
                                                
                                                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                                                    Apply the same rotation to all {pageData.length} images at once
                                                </p>
                                            </div>

                                            {/* Pagination Controls */}
                                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-blue-200 dark:border-blue-800/30">
                                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">
                                                            Showing {startIndex + 1}-{endIndex} of {pageData.length} images
                                                        </h4>
                                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                                            Navigate through images using pagination
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-3">
                                                        <label className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                                                            Items per page:
                                                        </label>
                                                        <select
                                                            value={itemsPerPage}
                                                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                                            className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm"
                                                        >
                                                            {itemsPerPageOptions.map(option => (
                                                                <option key={option} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                {/* Pagination Buttons */}
                                                <div className="flex flex-wrap items-center justify-center gap-2">
                                                    <button
                                                        onClick={prevPage}
                                                        disabled={currentPage === 1}
                                                        className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                                    >
                                                        <ChevronLeft className="w-4 h-4" />
                                                    </button>
                                                    
                                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                                                                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                                                                    currentPage === pageNum
                                                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                                                        : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                                }`}
                                                            >
                                                                {pageNum}
                                                            </button>
                                                        );
                                                    })}
                                                    
                                                    <button
                                                        onClick={nextPage}
                                                        disabled={currentPage === totalPages}
                                                        className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                                    >
                                                        <ChevronRightIcon className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Download All Progress */}
                                            {downloadingAll && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border-2 border-blue-200 dark:border-blue-800/30"
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-medium text-blue-700 dark:text-blue-300">
                                                            Downloading {downloadProgress}% complete
                                                        </span>
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                            {Math.round(downloadProgress / 100 * pageData.length)} of {pageData.length} images
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${downloadProgress}%` }}
                                                            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                                                        />
                                                    </div>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                                                        Please wait while all images are being downloaded...
                                                    </p>
                                                </motion.div>
                                            )}

                                            {/* Image Grid */}
                                            <div>
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 sm:gap-3">
                                                        <Grid3x3 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                                                        Converted Images with Rotation (Page {currentPage} of {totalPages})
                                                    </h3>
                                                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                                                        Hover for rotation controls • Click to zoom
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                                    {currentPageData.map((page, index) => {
                                                        const actualIndex = startIndex + index;
                                                        return (
                                                            <motion.div
                                                                key={page.pageNumber}
                                                                initial={{ opacity: 0, scale: 0.9 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                transition={{ delay: index * 0.05 }}
                                                                whileHover={{ y: -4 }}
                                                                className="group"
                                                            >
                                                                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-lg hover:shadow-2xl transition-all duration-300">
                                                                    <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                                                                        {page.imageData ? (
                                                                            <ImageRotator
                                                                                imageData={page.imageData}
                                                                                rotation={page.rotation}
                                                                                onRotationChange={(newRotation) => handleRotationChange(actualIndex, newRotation)}
                                                                                onZoomClick={() => handlePageZoom(page.pageNumber, page.fileName)}
                                                                                fileName={page.fileName}
                                                                                pageNumber={page.pageNumber}
                                                                            />
                                                                        ) : (
                                                                            <PdfPageRenderer 
                                                                                pageNumber={page.pageNumber}
                                                                                pdfData={pdfData}
                                                                                fileName={page.fileName}
                                                                                onZoomClick={() => handlePageZoom(page.pageNumber, page.fileName)}
                                                                            />
                                                                        )}
                                                                        
                                                                        <div className="w-full">
                                                                            <h4 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mb-1">
                                                                                Page {page.pageNumber}
                                                                            </h4>
                                                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-2 sm:mb-3">
                                                                                {page.fileName}
                                                                            </p>
                                                                            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
                                                                                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                                                                                    {imageSettings.format.toUpperCase()}
                                                                                </span>
                                                                                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                                                                                    {imageSettings.dpi} DPI
                                                                                </span>
                                                                                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full">
                                                                                    {page.rotation}°
                                                                                </span>
                                                                            </div>
                                                                            
                                                                            <div className="space-y-2 sm:space-y-3">
                                                                                <span
                                                                                    id={`status-${actualIndex}`}
                                                                                    className="text-xs text-blue-600 dark:text-blue-400 font-medium"
                                                                                >
                                                                                    Ready to download
                                                                                </span>
                                                                                
                                                                                <motion.button
                                                                                    whileHover={{ scale: 1.05 }}
                                                                                    whileTap={{ scale: 0.95 }}
                                                                                    onClick={() => handleDownloadImage(actualIndex, page.fileName)}
                                                                                    className="w-full py-2 sm:py-2.5 px-3 sm:px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base"
                                                                                >
                                                                                    <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                                                                                    Download {imageSettings.format.toUpperCase()}
                                                                                </motion.button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            

                                            {/* Download All Buttons Section */}
                                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl sm:rounded-2xl p-4 sm:p-8 border-2 border-indigo-200 dark:border-indigo-800/50">
                                                <div className="text-center mb-4 sm:mb-6">
                                                    <h4 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-1 sm:mb-2">
                                                        Batch Download Options
                                                    </h4>
                                                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                                                        Choose how you want to download images
                                                    </p>
                                                    
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                                        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-200 dark:border-blue-700">
                                                            <h5 className="font-bold text-gray-900 dark:text-white mb-2">
                                                                Download Current Page
                                                            </h5>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                                                Download {endIndex - startIndex} images from current view
                                                            </p>
                                                            <motion.button
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                onClick={handleDownloadCurrentPage}
                                                                disabled={downloadingAll}
                                                                className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                                            >
                                                                {downloadingAll ? (
                                                                    <>
                                                                        <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                                                                        Downloading...
                                                                    </>
                                                                ) : (
                                                                    `Download ${endIndex - startIndex} Images`
                                                                )}
                                                            </motion.button>
                                                        </div>
                                                        
                                                        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-purple-200 dark:border-purple-700">
                                                            <h5 className="font-bold text-gray-900 dark:text-white mb-2">
                                                                Download All Images
                                                            </h5>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                                                Download all {pageData.length} images in one go
                                                            </p>
                                                            <motion.button
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                onClick={handleDownloadAll}
                                                                disabled={downloadingAll}
                                                                className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                                            >
                                                                {downloadingAll ? (
                                                                    <>
                                                                        <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                                                                        Downloading...
                                                                    </>
                                                                ) : (
                                                                    `Download All ${pageData.length} Images`
                                                                )}
                                                            </motion.button>
                                                        </div>
                                                    </div>
                                                    
                                                    <p id="status-all-1" className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1 sm:mt-2">
                                                        Ready for batch download
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Convert Another */}
                                            <div className="text-center">
                                                <button
                                                    onClick={handleReset}
                                                    className="inline-flex items-center gap-1 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg sm:rounded-xl transition-colors text-sm sm:text-base"
                                                >
                                                    <FolderOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    Convert Another PDF
                                                </button>
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

                    {/* Enhanced Tools Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-8 sm:mt-12 p-4 sm:p-6 md:p-8 bg-gradient-to-r from-white to-purple-50/50 dark:from-gray-900 dark:to-purple-950/20 rounded-xl sm:rounded-3xl border-2 border-purple-300/50 dark:border-purple-800/50 shadow-xl sm:shadow-2xl backdrop-blur-sm"
                    >
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 px-2">
                            Explore All PDF Tools 🚀
                        </h3>
                        
                        <div className="grid 
                grid-cols-1          /* 📱 Mobile: 1 */
                md:grid-cols-3       /* 💻 Desktop: 3 */
                gap-3 sm:gap-4 md:gap-6">
    {toolKeywords.map((tool, index) => (
        <motion.div
            key={tool.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 10px 30px rgba(120, 80, 255, 0.25)",
                y: -4
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full"
        >
            <a
                href={tool.url}
                className="flex items-center justify-start w-full p-3 sm:p-4 md:p-5 
                         bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
                         border border-gray-200 dark:border-gray-700 
                         rounded-lg sm:rounded-2xl hover:border-purple-400 dark:hover:border-purple-500
                         transition-all duration-300 group
                         shadow-sm hover:shadow-xl"
            >
                {/* Icon */}
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
                              flex items-center justify-center 
                              bg-gradient-to-br from-blue-500 to-purple-600 
                              rounded-lg sm:rounded-xl mr-2 sm:mr-3 md:mr-4
                              group-hover:scale-110 transition-transform duration-300">
                    <span className="text-base sm:text-lg md:text-xl">
                        {getToolIcon(tool.label)}
                    </span>
                </div>
                
                {/* Text */}
                <div className="flex-1 min-w-0">
                    <span className="text-sm sm:text-base md:text-lg 
                                   font-semibold text-gray-800 dark:text-gray-200 
                                   group-hover:text-purple-600 dark:group-hover:text-purple-400 
                                   transition-colors duration-300 block truncate">
                        {tool.label}
                    </span>
                    <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400 
                                   mt-1 block line-clamp-2">
                        {getToolDescription(tool.label)}
                    </span>
                </div>
                
                {/* Arrow */}
                <div className="flex-shrink-0 ml-1 sm:ml-2">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 
                                  group-hover:text-purple-500 
                                  group-hover:translate-x-1 transition-all duration-300" 
                         fill="none" 
                         stroke="currentColor" 
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" 
                              strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </a>
        </motion.div>
    ))}
</div>


                        <HowToSchema />
                        <FAQSchema />
                        <BreadcrumbSchema />
                        <SitelinkSearchSchema />
                        
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 sm:mt-8 text-center"
                        >
                            <button className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                                             text-white font-medium rounded-full
                                             hover:from-blue-700 hover:to-purple-700
                                             active:scale-95 transition-all duration-300
                                             shadow-lg hover:shadow-xl
                                             text-sm sm:text-base">
                                View All Tools ({toolKeywords.length}+)
                            </button>
                        </motion.div>
                    </motion.div>

                   

                    {/* Info Footer */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-center mt-8 sm:mt-12">
                        <div className="p-3 sm:p-4">
                            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl sm:rounded-2xl mb-2 sm:mb-3">
                                <Rotate3D className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">
                                Smart Rotation
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                Rotate individual images or apply batch rotation to all pages
                            </p>
                        </div>
                        
                        <div className="p-3 sm:p-4">
                            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-xl sm:rounded-2xl mb-2 sm:mb-3">
                                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">
                                Real-time Preview
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                See rotation changes instantly without downloading
                            </p>
                        </div>
                        
                        <div className="p-3 sm:p-4">
                            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl sm:rounded-2xl mb-2 sm:mb-3">
                                <Download className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">
                                Batch Download
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                Download rotated images individually or all at once
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}