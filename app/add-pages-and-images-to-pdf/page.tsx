

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
  Loader2,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Grid3x3,
  FolderOpen,
  FileImage,
  Check,
  Trash2,
  Split,
  Smartphone,
  Plus,
  FilePlus,
  ChevronsRight,
  ChevronsLeft,
  FileInput,
  Upload,
  ImageUp,
  Maximize2,
  Minus,
  Type,
  Layout,
  Smartphone as MobileIcon,
  Monitor,
} from "lucide-react";

import { faqData } from "./faqData";
import FileUploader from "@/app/components/FileUploader";
import ProgressBar from "@/app/components/ProgressBar";
import { downloadFile } from "../../utils/imageUtils";
import { PDFDocument } from "pdf-lib";
import BreadcrumbSchema from "./BreadcrumbSchema";
import ArticleSchema from "./ArticleSchema";
import HowToSchema from "./HowToSchema";
import FAQSchema from "./FAQSchema";

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

// Page Info with inserted pages
type PageType = 'original' | 'inserted' | 'image';
type InsertContentType = 'blank' | 'image';
type PageSize = 'A4' | 'A3' | 'Letter' | 'Legal' | 'Custom';

interface PageData {
  pageNumber: number; // Current page number in the document
  fileName: string;
  pageType: PageType;
  thumbnail?: string;
  originalIndex?: number; // For original pages: index in original PDF
  insertedIndex?: number; // For inserted pages: order of insertion
  imageData?: string; // For image pages: base64 image data
  imageName?: string; // For image pages: original image name
  pageSize?: PageSize; // Size of inserted page
  customWidth?: number; // Custom width in points
  customHeight?: number; // Custom height in points
}

// Page size definitions in points (1 point = 1/72 inch)
const PAGE_SIZES: Record<PageSize, { width: number; height: number; label: string }> = {
  'A4': { width: 595, height: 842, label: 'A4 (210 × 297 mm)' },
  'A3': { width: 842, height: 1191, label: 'A3 (297 × 420 mm)' },
  'Letter': { width: 612, height: 792, label: 'Letter (8.5 × 11 in)' },
  'Legal': { width: 612, height: 1008, label: 'Legal (8.5 × 14 in)' },
  'Custom': { width: 595, height: 842, label: 'Custom Size' },
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
  id: "add-page",
  name: "Add Page to PDF",
  description: "Insert pages into PDF documents",
  category: "pdf",
  icon: "📄➕",
  color: "from-green-500 to-emerald-500",
  href: "/add-page",
  path: "/tools/add-page",
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
    id: "remove-pages",
    name: "Remove Pages",
    description: "Delete specific pages from PDF",
    category: "pdf",
    icon: "🗑️",
    color: "from-rose-500 to-pink-500",
    href: "/remove-pages",
    path: "/tools/remove-pages",
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
    id: "compress-pdf",
    name: "Compress PDF",
    description: "Reduce PDF file size",
    category: "pdf",
    icon: "📉",
    color: "from-blue-500 to-cyan-500",
    href: "/compress-pdf",
    path: "/tools/compress-pdf",
  },
];

// PDF data interface
interface PdfData {
  base64: string;
  pageCount: number;
  fileName: string;
  fileSize: number;
  originalPages: number; // Store original page count for reference
}

// --- FULL SCREEN VIEWER (FOR BOTH IMAGES AND PDF PAGES) ---
interface FullScreenViewerProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string;
  pdfData?: PdfData | null;
  pageNumber?: number;
  pageType?: PageType;
  imageName?: string;
  pageData?: PageData;
}

const FullScreenViewer = ({ 
  isOpen, 
  onClose, 
  imageUrl, 
  pdfData, 
  pageNumber, 
  pageType,
  imageName,
  pageData
}: FullScreenViewerProps) => {
  const [loading, setLoading] = useState(true);
  const [pdfPageImage, setPdfPageImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setLoading(true);
      setError(null);
      
      // Load PDF page if needed
      const loadPdfPage = async () => {
        if (pageType === 'original' && pdfData && pageNumber && pdfData.base64 && pageData?.originalIndex !== undefined) {
          try {
            const binaryString = atob(pdfData.base64);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }

            const loadingTask = pdfjsLib.getDocument({ data: bytes });
            const pdf = await loadingTask.promise;
            const page = await pdf.getPage(pageData.originalIndex + 1);

            // Create canvas for rendering
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            if (!context) {
              throw new Error("Could not get canvas context");
            }

            // Set canvas size - higher resolution for full screen
            const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better quality
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render page to canvas
            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };

            await page.render(renderContext).promise;

            // Convert to data URL
            const imageUrl = canvas.toDataURL("image/jpeg", 0.9);
            setPdfPageImage(imageUrl);
          } catch (error) {
            console.error("Error rendering PDF page for full screen:", error);
            setError("Failed to load PDF page");
          }
        }
        setLoading(false);
      };

      loadPdfPage();
    } else {
      document.body.style.overflow = 'auto';
      setPdfPageImage(null);
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, pdfData, pageNumber, pageType, pageData]);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getTitle = () => {
    if (pageType === 'image' && imageName) {
      return imageName;
    } else if (pageType === 'original' && pageNumber) {
      return `PDF Page ${pageNumber}`;
    } else if (pageType === 'inserted' && pageNumber) {
      return `Blank Page ${pageNumber}`;
    }
    return 'Full Screen View';
  };

  const getContent = () => {
    if (loading) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-white animate-spin mb-2" />
            <span className="text-white/80 text-sm">Loading...</span>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <X className="w-8 h-8 text-red-400 mb-2" />
            <span className="text-white/80 text-sm">{error}</span>
          </div>
        </div>
      );
    }

    if (pageType === 'image' && imageUrl) {
      return (
        <img
          src={imageUrl}
          alt="Full screen preview"
          className="max-w-full max-h-full object-contain"
        />
      );
    } else if (pageType === 'original' && pdfPageImage) {
      return (
        <img
          src={pdfPageImage}
          alt={`PDF Page ${pageNumber}`}
          className="max-w-full max-h-full object-contain"
        />
      );
    } else if (pageType === 'inserted') {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="p-8 bg-gradient-to-br from-blue-100 to-cyan-200 dark:from-blue-800/40 dark:to-cyan-900/40 rounded-full mb-6">
            <FilePlus className="w-16 h-16 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            Blank Page
          </span>
          {pageData?.pageSize && (
            <span className="text-lg text-blue-600/80 dark:text-blue-400/80 mt-2">
              {pageData.pageSize}
              {pageData.customWidth && pageData.customHeight && pageData.pageSize === 'Custom' && 
                ` (${pageData.customWidth}×${pageData.customHeight} pt)`}
            </span>
          )}
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            This is a blank page inserted into the PDF
          </span>
        </div>
      );
    }

    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col"
      onClick={onClose}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <span className="text-white text-sm truncate max-w-[200px]">
            {getTitle()}
          </span>
          {pageNumber && (
            <span className="text-xs text-white/60 ml-2">
              Page {pageNumber}
            </span>
          )}
        </div>
        
        <div className="text-xs text-white/60">
          Press ESC to close
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center p-4">
        {getContent()}
      </div>

      {/* Info Footer */}
      <div className="p-4 bg-black/80 backdrop-blur-sm text-center">
        <div className="text-white/60 text-sm">
          {pageType === 'image' ? 'Image Page' : 
           pageType === 'original' ? 'Original PDF Page' : 
           pageType === 'inserted' ? 'Inserted Blank Page' : 'Full Screen View'}
        </div>
      </div>
    </motion.div>
  );
};

// --- SIMPLIFIED PDF PAGE RENDERER ---
interface PdfPageRendererProps {
  pageData: PageData;
  pdfData: PdfData | null;
  onViewFullScreen?: (pageData: PageData) => void;
}

const PdfPageRenderer = ({
  pageData,
  pdfData,
  onViewFullScreen,
}: PdfPageRendererProps) => {
  const [pageImage, setPageImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPage = async () => {
      // For inserted pages (blank), show blank page preview
      if (pageData.pageType === 'inserted') {
        setLoading(false);
        setPageImage(null);
        return;
      }

      // For image pages, show image directly
      if (pageData.pageType === 'image' && pageData.imageData) {
        setLoading(false);
        setPageImage(pageData.imageData);
        return;
      }

      // For original pages, try to render PDF page
      if (!pdfData || pageData.originalIndex === undefined) {
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
        const page = await pdf.getPage(pageData.originalIndex + 1);

        // Create canvas for rendering
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error("Could not get canvas context");
        }

        // Set canvas size
        const viewport = page.getViewport({ scale: 0.5 }); // Smaller scale for thumbnail
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render page to canvas
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;

        // Convert to data URL
        const imageUrl = canvas.toDataURL("image/jpeg", 0.8);
        setPageImage(imageUrl);
      } catch (error) {
        console.error("Error rendering page:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [pdfData, pageData]);

  const getPageColor = () => {
    switch (pageData.pageType) {
      case 'inserted':
        return {
          bg: "from-blue-50 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30",
          border: "border-blue-400 dark:border-blue-600",
          text: "text-blue-700 dark:text-blue-300",
          badge: "from-blue-500 to-cyan-600"
        };
      case 'image':
        return {
          bg: "from-purple-50 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30",
          border: "border-purple-400 dark:border-purple-600",
          text: "text-purple-700 dark:text-purple-300",
          badge: "from-purple-500 to-pink-600"
        };
      default:
        return {
          bg: "from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900",
          border: "border-gray-300 dark:border-gray-700",
          text: "text-gray-700 dark:text-gray-300",
          badge: "from-gray-700 to-gray-800"
        };
    }
  };

  const colors = getPageColor();

  const handleClick = () => {
    if (onViewFullScreen) {
      onViewFullScreen(pageData);
    }
  };

  return (
    <div
      className={`w-full h-36 md:h-40 flex-shrink-0 rounded-lg shadow-md flex items-center justify-center border relative overflow-hidden cursor-pointer group transition-all duration-300 ${colors.bg} ${colors.border}`}
      onClick={handleClick}
    >
      {/* Page type indicator */}
      <div
        className={`absolute top-2 left-2 z-20 px-2 py-1 rounded text-xs font-bold bg-gradient-to-r ${colors.badge} text-white`}
      >
        {pageData.pageType === 'inserted' ? '📄 Blank' : 
         pageData.pageType === 'image' ? '🖼️ Image' : '📄 Original'}
      </div>

      {/* Page number */}
      <div className="absolute bottom-2 left-2 z-20">
        <div className={`px-2 py-1 rounded text-sm font-bold bg-gray-800 text-white`}>
          {pageData.pageNumber}
        </div>
      </div>

      {/* Full screen button */}
      <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="p-1.5 bg-black/70 rounded-full backdrop-blur-sm">
          <Maximize2 className="w-3.5 h-3.5 text-white" />
        </div>
      </div>

      {/* Content based on page type */}
      {pageData.pageType === 'inserted' ? (
        <div className="flex flex-col items-center justify-center p-2 w-full h-full">
          <div className="p-4 bg-gradient-to-br from-blue-100 to-cyan-200 dark:from-blue-800/40 dark:to-cyan-900/40 rounded-full mb-3">
            <FilePlus className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Blank Page
          </span>
          {pageData.pageSize && (
            <span className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-1">
              {pageData.pageSize}
            </span>
          )}
        </div>
      ) : pageData.pageType === 'image' ? (
        <div className="flex flex-col items-center justify-center p-2 w-full h-full">
          <div className="relative w-20 h-20 mb-2 overflow-hidden rounded-lg">
            {pageData.imageData ? (
              <img
                src={pageData.imageData}
                alt={pageData.imageName || "Inserted image"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800/40 dark:to-pink-900/40 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            )}
          </div>
          <span className="text-sm font-medium text-purple-700 dark:text-purple-300 truncate max-w-full px-2">
            {pageData.imageName ? pageData.imageName.substring(0, 15) + (pageData.imageName.length > 15 ? '...' : '') : 'Image Page'}
          </span>
          <span className="text-xs text-purple-600/80 dark:text-purple-400/80 mt-1">
            Click for full screen
          </span>
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center p-2">
          <Loader2 className="w-7 h-7 animate-spin text-blue-600 dark:text-blue-400 mb-2" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Page {pageData.pageNumber}
          </span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center p-2">
          <div className="p-3 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg mb-2">
            <FileText className="w-8 h-8 text-gray-600 dark:text-gray-400" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Page {pageData.pageNumber}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Original PDF page
          </span>
        </div>
      ) : pageImage ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={pageImage}
            alt={`Page ${pageData.pageNumber}`}
            className="w-auto h-auto max-w-full max-h-full object-contain p-1"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-2">
          <div className="p-3 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg mb-2">
            <FileText className="w-8 h-8 text-gray-600 dark:text-gray-400" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Page {pageData.pageNumber}
          </span>
        </div>
      )}
    </div>
  );
};

// --- INSERT PAGE MODAL ---
interface InsertPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (position: 'before' | 'after', pageNumber: number, count: number, contentType: InsertContentType, images?: File[], pageSize?: PageSize, customWidth?: number, customHeight?: number) => void;
  totalPages: number;
  selectedPage?: number;
}

const InsertPageModal = ({ isOpen, onClose, onInsert, totalPages, selectedPage = 1 }: InsertPageModalProps) => {
  const [position, setPosition] = useState<'before' | 'after'>('after');
  const [pageNumber, setPageNumber] = useState<number>(selectedPage);
  const [count, setCount] = useState<number>(1);
  const [contentType, setContentType] = useState<InsertContentType>('blank');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>('A4');
  const [customWidth, setCustomWidth] = useState<string>('595');
  const [customHeight, setCustomHeight] = useState<string>('842');
  const [showCustomSize, setShowCustomSize] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewImages, setPreviewImages] = useState<{url: string, file: File}[]>([]);

  useEffect(() => {
    if (isOpen) {
      setPageNumber(selectedPage);
      setCount(1);
      setContentType('blank');
      setImageFiles([]);
      setPreviewImages([]);
      setPageSize('A4');
      setCustomWidth('595');
      setCustomHeight('842');
      setShowCustomSize(false);
      setError(null);
    }
  }, [isOpen, selectedPage]);

  // Generate preview images when imageFiles changes
  useEffect(() => {
    const generatePreviews = async () => {
      const previews: {url: string, file: File}[] = [];
      for (const file of imageFiles) {
        const reader = new FileReader();
        const previewUrl = await new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
        previews.push({url: previewUrl, file});
      }
      setPreviewImages(previews);
    };

    if (imageFiles.length > 0) {
      generatePreviews();
    } else {
      setPreviewImages([]);
    }
  }, [imageFiles]);

  useEffect(() => {
    if (pageSize === 'Custom') {
      setShowCustomSize(true);
    } else {
      setShowCustomSize(false);
    }
  }, [pageSize]);

  const handleImageUpload = (files: File[]) => {
    if (files.length + imageFiles.length > 20) {
      setError('Maximum 20 images can be inserted at once');
      return;
    }
    
    // Validate image files
    const validImages = files.filter(file => 
      file.type.startsWith('image/') && 
      ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'].includes(file.type)
    );
    
    if (validImages.length === 0) {
      setError('Please upload valid image files (JPG, PNG, WebP, GIF)');
      return;
    }
    
    setImageFiles(prev => [...prev, ...validImages]);
    setCount(validImages.length);
    setError(null);
  };

  const removeImage = (index: number) => {
    const newImages = [...imageFiles];
    newImages.splice(index, 1);
    setImageFiles(newImages);
    setCount(Math.max(1, newImages.length));
  };

  const validateCustomSize = (): boolean => {
    const width = parseInt(customWidth);
    const height = parseInt(customHeight);
    
    if (isNaN(width) || width < 100 || width > 5000) {
      setError('Width must be between 100 and 5000 points');
      return false;
    }
    
    if (isNaN(height) || height < 100 || height > 5000) {
      setError('Height must be between 100 and 5000 points');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pageNumber < 1 || pageNumber > totalPages) {
      setError(`Page number must be between 1 and ${totalPages}`);
      return;
    }
    
    if (contentType === 'image' && imageFiles.length === 0) {
      setError('Please upload at least one image');
      return;
    }
    
    if (contentType === 'blank' && (count < 1 || count > 20)) {
      setError('You can insert 1 to 20 blank pages at a time');
      return;
    }

    if (pageSize === 'Custom' && !validateCustomSize()) {
      return;
    }

    const insertCount = contentType === 'image' ? imageFiles.length : count;
    const customWidthNum = pageSize === 'Custom' ? parseInt(customWidth) : undefined;
    const customHeightNum = pageSize === 'Custom' ? parseInt(customHeight) : undefined;
    
    onInsert(position, pageNumber, insertCount, contentType, imageFiles, pageSize, customWidthNum, customHeightNum);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl">
              <FilePlus className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Insert Pages
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Content Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              What to insert?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setContentType('blank');
                  setImageFiles([]);
                  setPreviewImages([]);
                  setCount(1);
                }}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  contentType === 'blank'
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700'
                }`}
              >
                <FilePlus className={`w-5 h-5 ${
                  contentType === 'blank' ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                }`} />
                <span className={`font-medium ${
                  contentType === 'blank' ? 'text-green-700 dark:text-green-300' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  Blank Pages
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Add empty pages
                </span>
              </button>
              <button
                type="button"
                onClick={() => setContentType('image')}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  contentType === 'image'
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                }`}
              >
                <ImageIcon className={`w-5 h-5 ${
                  contentType === 'image' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'
                }`} />
                <span className={`font-medium ${
                  contentType === 'image' ? 'text-purple-700 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  Images
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Upload JPG, PNG, etc.
                </span>
              </button>
            </div>
          </div>

          {/* Page Size Selection (for blank pages only) */}
          {contentType === 'blank' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Page Size
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(['A4', 'A3', 'Letter', 'Legal'] as PageSize[]).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setPageSize(size)}
                    className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                      pageSize === size && size !== 'Custom'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                    }`}
                  >
                    <Layout className={`w-4 h-4 ${
                      pageSize === size && size !== 'Custom' 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`} />
                    <span className={`text-xs font-medium ${
                      pageSize === size && size !== 'Custom'
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {size}
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">
                      {PAGE_SIZES[size].label.split('(')[1].replace(')', '')}
                    </span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPageSize('Custom')}
                  className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                    pageSize === 'Custom'
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700'
                  }`}
                >
                  <Edit className={`w-4 h-4 ${
                    pageSize === 'Custom' 
                      ? 'text-orange-600 dark:text-orange-400' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`} />
                  <span className={`text-xs font-medium ${
                    pageSize === 'Custom'
                      ? 'text-orange-700 dark:text-orange-300'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    Custom
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">
                    Set your size
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Custom Size Inputs */}
          {showCustomSize && contentType === 'blank' && (
            <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl border-2 border-orange-200 dark:border-orange-800/30">
              <h4 className="font-medium text-orange-800 dark:text-orange-300 mb-3">
                Custom Page Size (in points)
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-orange-700 dark:text-orange-400 mb-1">
                    Width (100-5000)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="100"
                      max="5000"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-orange-300 dark:border-orange-700 rounded-lg text-gray-900 dark:text-white"
                      placeholder="Width"
                    />
                    <span className="text-sm text-orange-600 dark:text-orange-400">pt</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-orange-700 dark:text-orange-400 mb-1">
                    Height (100-5000)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="100"
                      max="5000"
                      value={customHeight}
                      onChange={(e) => setCustomHeight(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-orange-300 dark:border-orange-700 rounded-lg text-gray-900 dark:text-white"
                      placeholder="Height"
                    />
                    <span className="text-sm text-orange-600 dark:text-orange-400">pt</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-orange-600/80 dark:text-orange-400/80 mt-2">
                1 point = 1/72 inch • Common sizes: A4 (595×842), Letter (612×792)
              </p>
            </div>
          )}

          {/* Image Upload Section */}
          {contentType === 'image' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Upload Images ({imageFiles.length} selected)
              </label>
              <div 
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all hover:border-purple-500 dark:hover:border-purple-400 ${
                  imageFiles.length > 0 
                    ? 'border-purple-300 dark:border-purple-700 bg-purple-50/50 dark:bg-purple-900/10' 
                    : 'border-gray-300 dark:border-gray-700'
                }`}
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleImageUpload(Array.from(e.target.files || []))}
                />
                <ImageUp className="w-12 h-12 mx-auto mb-3 text-purple-600 dark:text-purple-400" />
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {imageFiles.length > 0 
                    ? `${imageFiles.length} image${imageFiles.length !== 1 ? 's' : ''} selected` 
                    : 'Click to upload images'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  JPG, PNG, WebP, GIF supported • Max 20 images
                </p>
              </div>

              {/* Image Previews */}
              {previewImages.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preview ({previewImages.length} images):
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    {previewImages.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview.url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <div className="text-xs text-gray-500 truncate mt-1">
                          {preview.file.name.substring(0, 10)}...
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Position Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Insert Position
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPosition('before')}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  position === 'before'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <ChevronsLeft className={`w-5 h-5 ${
                  position === 'before' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                }`} />
                <span className={`font-medium ${
                  position === 'before' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  Before Page
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Page becomes #{pageNumber}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setPosition('after')}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  position === 'after'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <ChevronsRight className={`w-5 h-5 ${
                  position === 'after' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                }`} />
                <span className={`font-medium ${
                  position === 'after' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  After Page
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Page becomes #{pageNumber + 1}
                </span>
              </button>
            </div>
          </div>

          {/* Page Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Page Number (1 to {totalPages})
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Minus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </button>
              <div className="flex-1 text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {pageNumber}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Insert {position === 'before' ? 'before' : 'after'} this page
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPageNumber(prev => Math.min(totalPages, prev + 1))}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Plus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>

          {/* Page Count (for blank pages only) */}
          {contentType === 'blank' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                How many pages to insert? (1-20)
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCount(prev => Math.max(1, prev - 1))}
                  className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Minus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </button>
                <div className="flex-1 text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {count}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {count === 1 ? 'page' : 'pages'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCount(prev => Math.min(20, prev + 1))}
                  className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Plus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Preview Info */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">
              How it works:
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              • {contentType === 'image' ? 'Image pages' : 'Inserted pages'} become normal PDF pages
              <br />
              • All following page numbers shift automatically
              <br />
              • Total pages: {totalPages} → {totalPages + (contentType === 'image' ? imageFiles.length : count)}
              {contentType === 'blank' && pageSize !== 'Custom' && (
                <>
                  <br />
                  • Page size: {PAGE_SIZES[pageSize].label}
                </>
              )}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {contentType === 'image' ? (
                <>
                  <ImageIcon className="w-5 h-5" />
                  Insert {imageFiles.length} Image{imageFiles.length !== 1 ? 's' : ''}
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Insert {count} Page{count !== 1 ? 's' : ''}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Smart filename generator
const generatePdfFilename = (originalFilename: string): string => {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');

  const cleanName = originalFilename
    .replace(/\.pdf$/i, '')
    .replace(/[^a-zA-Z0-9\s-_]/g, '')
    .substring(0, 30)
    .trim();

  return `${cleanName}_with_added_pages_${dateStr}_${timeStr}.pdf`;
};

// Function to convert image to base64
const imageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default function PdfPageAdderTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processed, setProcessed] = useState(false);
  const [pageData, setPageData] = useState<PageData[]>([]);
  const [pdfData, setPdfData] = useState<PdfData | null>(null);
  const [showUploadInfo, setShowUploadInfo] = useState(true);
  
  // Insert modal state
  const [insertModal, setInsertModal] = useState<{
    isOpen: boolean;
    selectedPage: number;
  }>({
    isOpen: false,
    selectedPage: 1,
  });

  // Full screen viewer state
  const [fullScreenViewer, setFullScreenViewer] = useState<{
    isOpen: boolean;
    pageData?: PageData;
    imageUrl?: string;
    imageName?: string;
  }>({
    isOpen: false,
    pageData: undefined,
    imageUrl: '',
    imageName: '',
  });

  // Download states
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Track inserted pages count
  const [insertedPagesCount, setInsertedPagesCount] = useState(0);
  const [imagePagesCount, setImagePagesCount] = useState(0);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);

      if (width < 768) {
        setItemsPerPage(8);
      } else if (width < 1024) {
        setItemsPerPage(12);
      } else {
        setItemsPerPage(20);
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(pageData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, pageData.length);
  const currentPageData = pageData.slice(startIndex, endIndex);

  // Convert ArrayBuffer to base64
  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // Load PDF and initialize page data
  useEffect(() => {
    const loadPdf = async () => {
      if (files.length === 0) return;

      const file = files[0];
      setProcessing(true);
      setProgress(0);
      setShowUploadInfo(false);
      setInsertedPagesCount(0);
      setImagePagesCount(0);

      try {
        setProgress(20);

        const arrayBuffer = await file.arrayBuffer();
        const base64 = arrayBufferToBase64(arrayBuffer);

        setProgress(40);

        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pageCount = pdfDoc.getPageCount();

        setProgress(60);

        // Initialize page data for original pages only
        const newPageData: PageData[] = Array.from({ length: pageCount }, (_, i) => ({
          pageNumber: i + 1,
          fileName: generatePdfFilename(file.name),
          pageType: 'original' as PageType,
          originalIndex: i,
        }));

        setProgress(80);

        setPageData(newPageData);
        setPdfData({
          base64,
          pageCount,
          fileName: file.name,
          fileSize: file.size,
          originalPages: pageCount,
        });

        setProgress(100);

        setTimeout(() => {
          setProcessed(true);
          setProcessing(false);
          setCurrentPage(1);
        }, 300);
      } catch (error) {
        console.error('PDF loading error:', error);
        alert('Failed to load PDF. Please make sure it\'s a valid PDF file.');
        setProcessing(false);
        setProgress(0);
      }
    };

    loadPdf();
  }, [files]);

  // Function to insert pages
  const handleInsertPages = async (
    position: 'before' | 'after', 
    targetPageNumber: number, 
    count: number, 
    contentType: InsertContentType, 
    images?: File[],
    pageSize?: PageSize,
    customWidth?: number,
    customHeight?: number
  ) => {
    // Find the index of the target page in pageData
    const targetIndex = pageData.findIndex(page => page.pageNumber === targetPageNumber);
    
    if (targetIndex === -1) {
      console.error('Target page not found');
      return;
    }

    // Calculate insert position
    const insertIndex = position === 'after' ? targetIndex + 1 : targetIndex;
    
    // Create new inserted pages
    const newInsertedPages: PageData[] = [];

    if (contentType === 'blank') {
      // Create blank pages with specified size
      const size = pageSize || 'A4';
      const width = size === 'Custom' && customWidth ? customWidth : PAGE_SIZES[size].width;
      const height = size === 'Custom' && customHeight ? customHeight : PAGE_SIZES[size].height;
      
      for (let i = 0; i < count; i++) {
        newInsertedPages.push({
          pageNumber: 0, // Temporary, will be recalculated
          fileName: pdfData?.fileName || 'document.pdf',
          pageType: 'inserted' as PageType,
          insertedIndex: insertedPagesCount + i,
          pageSize: size,
          customWidth: size === 'Custom' ? width : undefined,
          customHeight: size === 'Custom' ? height : undefined,
        });
      }
      setInsertedPagesCount(prev => prev + count);
    } else if (contentType === 'image' && images) {
      // Create image pages
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const imageBase64 = await imageToBase64(image);
        newInsertedPages.push({
          pageNumber: 0, // Temporary, will be recalculated
          fileName: pdfData?.fileName || 'document.pdf',
          pageType: 'image' as PageType,
          insertedIndex: insertedPagesCount + i,
          imageData: imageBase64,
          imageName: image.name,
        });
      }
      setImagePagesCount(prev => prev + images.length);
    }

    // Insert the new pages
    const newPageData = [...pageData];
    newPageData.splice(insertIndex, 0, ...newInsertedPages);

    // Recalculate ALL page numbers (1, 2, 3, 4, 5, ...)
    newPageData.forEach((page, index) => {
      page.pageNumber = index + 1;
    });

    setPageData(newPageData);

    // Show success message
    const insertedCount = contentType === 'image' ? images?.length || 0 : count;
    const contentTypeLabel = contentType === 'image' ? 'image' : 'page';
    const sizeInfo = contentType === 'blank' && pageSize ? ` (${pageSize})` : '';
    setDownloadSuccess(`✓ ${insertedCount} ${contentTypeLabel}${insertedCount > 1 ? 's' : ''} inserted ${position} page ${targetPageNumber}${sizeInfo}`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  // Function to remove inserted page
  const handleRemovePage = (pageNumber: number) => {
    const targetIndex = pageData.findIndex(page => page.pageNumber === pageNumber);
    
    if (targetIndex === -1 || (pageData[targetIndex].pageType !== 'inserted' && pageData[targetIndex].pageType !== 'image')) {
      setDownloadSuccess('✗ Can only remove inserted pages or images');
      setTimeout(() => setDownloadSuccess(null), 2000);
      return;
    }

    const pageType = pageData[targetIndex].pageType;
    
    // Remove the page
    const newPageData = [...pageData];
    newPageData.splice(targetIndex, 1);

    // Recalculate ALL page numbers
    newPageData.forEach((page, index) => {
      page.pageNumber = index + 1;
    });

    setPageData(newPageData);
    
    if (pageType === 'inserted') {
      setInsertedPagesCount(prev => prev - 1);
    } else if (pageType === 'image') {
      setImagePagesCount(prev => prev - 1);
    }

    setDownloadSuccess(`✓ ${pageType === 'image' ? 'Image' : 'Inserted'} page removed`);
    setTimeout(() => setDownloadSuccess(null), 2000);
  };

  // Function to create a COMPLETELY BLANK PDF page (no text, no border)
  const createBlankPage = async (pdfDoc: PDFDocument, pageSize?: PageSize, customWidth?: number, customHeight?: number) => {
    let width: number;
    let height: number;
    
    if (pageSize && pageSize !== 'Custom') {
      width = PAGE_SIZES[pageSize].width;
      height = PAGE_SIZES[pageSize].height;
    } else if (customWidth && customHeight) {
      width = customWidth;
      height = customHeight;
    } else {
      // Default to A4
      width = PAGE_SIZES['A4'].width;
      height = PAGE_SIZES['A4'].height;
    }
    
    // Create completely blank page - NO TEXT, NO BORDER
    const page = pdfDoc.addPage([width, height]);
    
    // Completely white background (default)
    // No drawing, no text, no border - just blank
    
    return page;
  };

  // Function to embed image in PDF
  const embedImageInPdf = async (pdfDoc: PDFDocument, imageData: string): Promise<void> => {
    const page = pdfDoc.addPage([612, 792]); // Standard A4 size for images
    
    // Parse base64 image
    const base64Data = imageData.split(',')[1];
    const imageBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
    
    let image;
    try {
      // Try to embed as JPEG
      image = await pdfDoc.embedJpg(imageBytes);
    } catch {
      try {
        // Try to embed as PNG
        image = await pdfDoc.embedPng(imageBytes);
      } catch {
        // If both fail, create a blank page
        return;
      }
    }
    
    // Scale image to fit page (with small margins)
    const margin = 20;
    const maxWidth = 612 - (margin * 2);
    const maxHeight = 792 - (margin * 2);
    const { width, height } = image.scaleToFit(maxWidth, maxHeight);
    
    // Center image on page
    const x = (612 - width) / 2;
    const y = (792 - height) / 2;
    
    page.drawImage(image, {
      x,
      y,
      width,
      height,
    });
  };

  // Open full screen viewer
  const handleViewFullScreen = (pageData: PageData) => {
    setFullScreenViewer({
      isOpen: true,
      pageData,
      imageUrl: pageData.pageType === 'image' ? pageData.imageData : undefined,
      imageName: pageData.pageType === 'image' ? pageData.imageName : undefined,
    });
  };

  // Download modified PDF
  const handleDownloadModifiedPdf = async () => {
    if (!pdfData || pageData.length === 0) {
      alert('PDF not available.');
      return;
    }

    setDownloading(true);
    setDownloadProgress(0);

    try {
      setDownloadProgress(10);

      // Load original PDF
      const binaryString = atob(pdfData.base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      setDownloadProgress(20);
      const originalPdfDoc = await PDFDocument.load(bytes);
      const newPdfDoc = await PDFDocument.create();

      setDownloadProgress(30);

      // Process each page in the current order
      for (let i = 0; i < pageData.length; i++) {
        const page = pageData[i];
        
        if (page.pageType === 'original' && page.originalIndex !== undefined) {
          // Copy original page
          const [copiedPage] = await newPdfDoc.copyPages(originalPdfDoc, [page.originalIndex]);
          newPdfDoc.addPage(copiedPage);
        } else if (page.pageType === 'inserted') {
          // Add COMPLETELY BLANK page
          await createBlankPage(newPdfDoc, page.pageSize, page.customWidth, page.customHeight);
        } else if (page.pageType === 'image' && page.imageData) {
          // Add image page
          await embedImageInPdf(newPdfDoc, page.imageData);
        }

        // Update progress
        const progress = 30 + Math.round(((i + 1) / pageData.length) * 60);
        setDownloadProgress(progress);

        // Small delay for large documents
        if (pageData.length > 10) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }
      }

      setDownloadProgress(95);

      // Save PDF
      const pdfBytes = await newPdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        updateFieldAppearances: false,
      });

      const uint8Array = pdfBytes instanceof Uint8Array ? pdfBytes : new Uint8Array(pdfBytes);
      const blob = new Blob([uint8Array as any], {
        type: 'application/pdf',
      });

      const fileName = generatePdfFilename(files[0].name);
      downloadFile(blob, fileName);

      // Calculate stats
      const originalSizeMB = (pdfData.fileSize / (1024 * 1024)).toFixed(2);
      const newSizeMB = (blob.size / (1024 * 1024)).toFixed(2);
      const totalAdded = insertedPagesCount + imagePagesCount;

      setDownloadSuccess(
        `✓ Downloaded! ${originalSizeMB}MB → ${newSizeMB}MB • Added ${totalAdded} page${totalAdded !== 1 ? 's' : ''} (${insertedPagesCount} blank, ${imagePagesCount} images)`
      );
      setTimeout(() => setDownloadSuccess(null), 5000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setDownloadSuccess('✗ Failed to generate PDF. Please try again.');
      setTimeout(() => setDownloadSuccess(null), 3000);
    } finally {
      setDownloading(false);
      setDownloadProgress(0);
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
    setInsertedPagesCount(0);
    setImagePagesCount(0);
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
    setInsertedPagesCount(0);
    setImagePagesCount(0);
  };

  // Open insert modal with selected page
  const handleInsertAtPage = (pageNumber: number) => {
    setInsertModal({
      isOpen: true,
      selectedPage: pageNumber,
    });
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

  return (
    <>
      <Head>
        <ArticleSchema />
        <HowToSchema />
        <FAQSchema />
        <BreadcrumbSchema />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-green-950/20 py-4 sm:py-8 md:py-12">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Success Message */}
            <AnimatePresence>
              {downloadSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
                >
                  <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl backdrop-blur-sm ${
                    downloadSuccess.startsWith('✓')
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                      : 'bg-gradient-to-r from-red-500 to-orange-600 text-white'
                  }`}>
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      {downloadSuccess.startsWith('✓') ? (
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                      <span className="font-medium text-sm sm:text-base">{downloadSuccess}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
              <a
                href="/"
                className="inline-flex items-center gap-2 sm:gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all font-medium"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm sm:text-base">Back to Tools</span>
              </a>

              <div className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-gray-800 dark:to-emerald-950/30 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mt-2 md:mt-0">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
                <span className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">
                  Secure & Private
                </span>
              </div>
            </div>

            {/* Hero Section */}
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

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 sm:mb-4 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 bg-clip-text text-transparent px-2">
                Add Pages & Images to PDF Online Free | PDFSwift
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
               Add new pages and insert images anywhere in your PDF online for free. Easily merge extra pages, add photos, and download updated PDF instantly — secure and browser-based
                <span className="block text-green-600 dark:text-green-400 font-medium mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">
                  Click any page for full screen view!
                </span>
              </p>
            </div>

            {/* Main Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-xl sm:shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 mb-6 sm:mb-8">
              {/* Upload Section */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg sm:rounded-xl">
                    <FolderOpen className="w-4 h-4 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
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

                {/* Features Grid */}
                <AnimatePresence>
                  {showUploadInfo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4"
                    >
                      <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-900/20 rounded-lg sm:rounded-xl md:rounded-2xl border border-green-200 dark:border-green-800/50">
                        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-600 dark:text-green-400" />
                          <span className="text-xs sm:text-sm md:text-base font-semibold text-green-800 dark:text-green-300">
                            Clean Blank Pages
                          </span>
                        </div>
                        <p className="text-xs text-green-700/80 dark:text-green-400/80 mt-1 sm:mt-2">
                          Completely blank pages • No text, no watermark
                        </p>
                      </div>

                      <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-900/20 rounded-lg sm:rounded-xl md:rounded-2xl border border-purple-200 dark:border-purple-800/50">
                        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                          <Layout className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-600 dark:text-purple-400" />
                          <span className="text-xs sm:text-sm md:text-base font-semibold text-purple-800 dark:text-purple-300">
                            Multiple Page Sizes
                          </span>
                        </div>
                        <p className="text-xs text-purple-700/80 dark:text-purple-400/80 mt-1 sm:mt-2">
                          A4, A3, Letter, Legal, Custom sizes
                        </p>
                      </div>

                      <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-900/20 rounded-lg sm:rounded-xl md:rounded-2xl border border-blue-200 dark:border-blue-800/50">
                        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                          <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-600 dark:text-blue-400" />
                          <span className="text-xs sm:text-sm md:text-base font-semibold text-blue-800 dark:text-blue-300">
                            Full Screen View
                          </span>
                        </div>
                        <p className="text-xs text-blue-700/80 dark:text-blue-400/80 mt-1 sm:mt-2">
                          Click any page for full screen • PDF & images both
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
                              ? 'Loading PDF...'
                              : progress < 70
                              ? 'Analyzing pages...'
                              : 'Preparing editor...'
                          }
                        />

                        <div className="flex justify-center">
                          <div className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-green-50 dark:bg-green-950/30 rounded-full">
                            <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-green-600 dark:text-green-400 animate-pulse" />
                            <span className="text-xs sm:text-sm md:text-base text-green-700 dark:text-green-300">
                              Preparing page insertion editor
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
                                {pageData.length} total pages ({pdfData?.originalPages || 0} original + {insertedPagesCount} blank + {imagePagesCount} images)
                              </p>
                              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1">
                                Click on any page for full screen view or to insert after it
                              </p>
                            </div>
                            <div className="flex items-center justify-center">
                              <div className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base">
                                {pageData.length} Pages
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Insert Options */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-green-200 dark:border-green-800/30">
                          <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                            Insert Options
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <button
                              onClick={() => setInsertModal({ isOpen: true, selectedPage: 1 })}
                              className="p-3 sm:p-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 sm:gap-3"
                            >
                              <FilePlus className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span className="text-sm sm:text-base">Insert Blank Pages</span>
                            </button>
                            <button
                              onClick={() => {
                                setInsertModal({ 
                                  isOpen: true, 
                                  selectedPage: 1 
                                });
                              }}
                              className="p-3 sm:p-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 sm:gap-3"
                            >
                              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span className="text-sm sm:text-base">Insert Images</span>
                            </button>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center mt-3">
                            Or click on any page below to insert after that specific page
                          </p>
                        </div>

                        {/* Page Flow Explanation */}
                        <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl border-2 border-blue-200 dark:border-blue-800/30">
                          <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                            <FilePlus className="w-4 h-4" />
                            Page Flow Rules:
                          </h4>
                          <ul className="text-xs sm:text-sm text-blue-700 dark:text-blue-400 space-y-1">
                            <li className="flex items-start gap-2">
                              <span className="text-blue-600">•</span>
                              <span><strong>Click any page for full screen view</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-600">•</span>
                              <span><strong>Inserted pages become normal PDF pages</strong> (no special labels)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-600">•</span>
                              <span><strong>Continuous numbering:</strong> 1, 2, 3, 4, 5... (inserted pages included)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-600">•</span>
                              <span><strong>Automatic shift:</strong> All following page numbers update automatically</span>
                            </li>
                          </ul>
                        </div>

                        {/* Download Progress */}
                        {downloading && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl border-2 border-green-200 dark:border-green-800/30"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-green-700 dark:text-green-300 text-xs sm:text-sm">
                                Generating PDF {downloadProgress}% complete
                              </span>
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                Processing {pageData.length} pages
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${downloadProgress}%` }}
                                className="h-1.5 sm:h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
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
                              <Grid3x3 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-500" />
                              Pages (Page {currentPage} of {totalPages})
                            </h3>
                            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                              {isMobile ? 'Tap' : 'Click'} page for full screen • {isMobile ? 'Tap' : 'Click'} to insert after • {isMobile ? 'Tap' : 'Click'} inserted pages to remove
                            </span>
                          </div>

                          <div className={`grid ${
                            itemsPerPage <= 8
                              ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                              : itemsPerPage <= 12
                              ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                              : itemsPerPage <= 16
                              ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                              : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                          } gap-3 sm:gap-4 md:gap-6`}>
                            {currentPageData.map((page, index) => {
                              const actualIndex = startIndex + index;
                              return (
                                <motion.div
                                  key={`${page.pageNumber}-${page.pageType}-${page.imageName || ''}`}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.02 }}
                                  whileHover={{ y: -2 }}
                                  className="group"
                                >
                                  <div className={`bg-gradient-to-br rounded-xl sm:rounded-2xl border-2 p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 ${
                                    page.pageType === 'inserted'
                                      ? 'from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border-blue-300 dark:border-blue-700'
                                      : page.pageType === 'image'
                                      ? 'from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-300 dark:border-purple-700'
                                      : 'from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700'
                                  }`}>
                                    <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 md:space-y-4">
                                      <PdfPageRenderer
                                        pageData={page}
                                        pdfData={pdfData}
                                        onViewFullScreen={handleViewFullScreen}
                                      />

                                      <div className="w-full">
                                        <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg mb-1">
                                          Page {page.pageNumber}
                                        </h4>
                                        <p className={`text-xs sm:text-sm md:text-base font-medium mb-2 ${
                                          page.pageType === 'inserted'
                                            ? 'text-blue-600 dark:text-blue-400'
                                            : page.pageType === 'image'
                                            ? 'text-purple-600 dark:text-purple-400'
                                            : 'text-gray-600 dark:text-gray-400'
                                        }`}>
                                          {page.pageType === 'inserted' 
                                            ? `📄 ${page.pageSize || 'Blank'} Page` 
                                            : page.pageType === 'image'
                                            ? `🖼️ ${page.imageName ? page.imageName.substring(0, 15) + (page.imageName.length > 15 ? '...' : '') : 'Image'}`
                                            : '📄 Original Page'}
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                                          <button
                                            onClick={() => handleInsertAtPage(page.pageNumber)}
                                            className="py-1.5 sm:py-2 px-2 sm:px-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm transition-all"
                                          >
                                            Insert After
                                          </button>
                                          
                                          {(page.pageType === 'inserted' || page.pageType === 'image') && (
                                            <button
                                              onClick={() => handleRemovePage(page.pageNumber)}
                                              className="py-1.5 sm:py-2 px-2 sm:px-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm transition-all"
                                            >
                                              Remove
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>

                          {/* Pagination Controls - NEWLY ADDED SECTION */}
                          {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8">
                              <button
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl flex items-center gap-1 sm:gap-2 ${
                                  currentPage === 1
                                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white hover:shadow-lg transition-all'
                                }`}
                              >
                                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="text-sm sm:text-base font-medium">Previous</span>
                              </button>
                              
                              <div className="flex items-center gap-1 sm:gap-2">
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
                                  
                                  if (pageNum < 1 || pageNum > totalPages) return null;
                                  
                                  return (
                                    <button
                                      key={pageNum}
                                      onClick={() => goToPage(pageNum)}
                                      className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center font-medium ${
                                        currentPage === pageNum
                                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                      }`}
                                    >
                                      {pageNum}
                                    </button>
                                  );
                                })}
                                
                                {totalPages > 5 && currentPage < totalPages - 2 && (
                                  <>
                                    <span className="text-gray-500 px-1">...</span>
                                    <button
                                      onClick={() => goToPage(totalPages)}
                                      className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center font-medium ${
                                        currentPage === totalPages
                                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                      }`}
                                    >
                                      {totalPages}
                                    </button>
                                  </>
                                )}
                              </div>
                              
                              <button
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl flex items-center gap-1 sm:gap-2 ${
                                  currentPage === totalPages
                                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white hover:shadow-lg transition-all'
                                }`}
                              >
                                <span className="text-sm sm:text-base font-medium">Next</span>
                                <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Download Button */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 border-2 border-green-200 dark:border-green-800/50">
                          <div className="text-center mb-3 sm:mb-4 md:mb-6">
                            <h4 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-1 sm:mb-2">
                              Download Modified PDF
                            </h4>
                            <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                              Download PDF with {insertedPagesCount + imagePagesCount} added page{(insertedPagesCount + imagePagesCount) !== 1 ? 's' : ''}
                            </p>

                            <div className="space-y-3 sm:space-y-4">
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleDownloadModifiedPdf}
                                disabled={downloading}
                                className="w-full py-2.5 sm:py-3 md:py-4 px-4 sm:px-5 md:px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-lg sm:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3"
                              >
                                {downloading ? (
                                  <>
                                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                    <span>Processing...</span>
                                  </>
                                ) : (
                                  <>
                                    <Download className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                    <span>
                                      Download PDF ({pageData.length} pages)
                                    </span>
                                  </>
                                )}
                              </motion.button>
                            </div>

                            <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium mt-2 sm:mt-3">
                              {insertedPagesCount + imagePagesCount === 0
                                ? 'Insert pages or images before downloading'
                                : `Ready to download with ${insertedPagesCount} blank page${insertedPagesCount !== 1 ? 's' : ''} and ${imagePagesCount} image${imagePagesCount !== 1 ? 's' : ''}`}
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
                            Add Pages to Another PDF
                          </button>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            All processing happens in your browser • No files are uploaded
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Insert Page Modal */}
            <InsertPageModal
              isOpen={insertModal.isOpen}
              onClose={() => setInsertModal({ ...insertModal, isOpen: false })}
              onInsert={handleInsertPages}
              totalPages={pageData.length}
              selectedPage={insertModal.selectedPage}
            />

            {/* Full Screen Viewer */}
            <FullScreenViewer
              isOpen={fullScreenViewer.isOpen}
              onClose={() => setFullScreenViewer({ ...fullScreenViewer, isOpen: false })}
              imageUrl={fullScreenViewer.imageUrl}
              pdfData={pdfData}
              pageNumber={fullScreenViewer.pageData?.pageNumber}
              pageType={fullScreenViewer.pageData?.pageType}
              imageName={fullScreenViewer.imageName}
              pageData={fullScreenViewer.pageData}
            />
<section
  id="how-to-add-pages-images-to-pdf"
  className="mt-20 scroll-mt-24"
>
  <h2 className="text-3xl font-bold text-center mb-10">
    How to Add Pages & Images to PDF Online
  </h2>

  <div className="grid gap-6 md:grid-cols-5">
    <div className="border rounded-xl p-6 text-center shadow-sm bg-white hover:shadow-md transition">
      <div className="text-4xl font-bold text-green-600 mb-2">1</div>
      <h3 className="font-semibold text-lg">Upload PDF File</h3>
      <p className="text-gray-600 text-sm mt-2">
        Upload your PDF file using drag & drop or file picker. The PDF will be
        processed instantly in your browser.
      </p>
    </div>

    <div className="border rounded-xl p-6 text-center shadow-sm bg-white hover:shadow-md transition">
      <div className="text-4xl font-bold text-green-600 mb-2">2</div>
      <h3 className="font-semibold text-lg">Choose Insert Option</h3>
      <p className="text-gray-600 text-sm mt-2">
        Select whether you want to insert blank pages or add images into your PDF.
      </p>
    </div>

    <div className="border rounded-xl p-6 text-center shadow-sm bg-white hover:shadow-md transition">
      <div className="text-4xl font-bold text-green-600 mb-2">3</div>
      <h3 className="font-semibold text-lg">Select Page Size</h3>
      <p className="text-gray-600 text-sm mt-2">
        Choose the page size like A4, A3, Letter, Legal, or custom size for inserted pages.
      </p>
    </div>

    <div className="border rounded-xl p-6 text-center shadow-sm bg-white hover:shadow-md transition">
      <div className="text-4xl font-bold text-green-600 mb-2">4</div>
      <h3 className="font-semibold text-lg">Set Insert Position</h3>
      <p className="text-gray-600 text-sm mt-2">
        Insert pages before or after any page number. You can also select how many pages to insert.
      </p>
    </div>

    <div className="border rounded-xl p-6 text-center shadow-sm bg-white hover:shadow-md transition">
      <div className="text-4xl font-bold text-green-600 mb-2">5</div>
      <h3 className="font-semibold text-lg">Download Updated PDF</h3>
      <p className="text-gray-600 text-sm mt-2">
        Download your modified PDF instantly with inserted blank pages or added images.
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
                    10+ specialized PDF, image, and document tools
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

             {/* Visible FAQ Section */}
              <section className="max-w-3xl mx-auto my-8 sm:my-12 md:my-16 px-2 sm:px-3 md:px-4">
                <div className="text-center mb-4 sm:mb-6 md:mb-8">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Everything you need to know about converting WebP to JPG
                  </p>
                </div>

                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  {faqData.map((faq, index) => (
                    <details
                      key={index}
                      className="group border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 
                      bg-white dark:bg-gray-800"
                    >
                      <summary className="cursor-pointer font-semibold text-sm sm:text-base md:text-lg text-gray-900 dark:text-white">
                        {faq.question}
                      </summary>
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>

            {/* Info Footer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 text-center mt-6 sm:mt-8 md:mt-12">
              <div className="p-2 sm:p-3 md:p-4">
                <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/30 rounded-lg sm:rounded-xl md:rounded-2xl mb-1.5 sm:mb-2 md:mb-3">
                  <Layout className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                  Clean Blank Pages
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  No text, no watermark • Pure white pages
                </p>
              </div>

              <div className="p-2 sm:p-3 md:p-4">
                <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-800/30 rounded-lg sm:rounded-xl md:rounded-2xl mb-1.5 sm:mb-2 md:mb-3">
                  <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                  Full Screen View
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Click any page for full screen • PDF & images both
                </p>
              </div>

              <div className="p-2 sm:p-3 md:p-4">
                <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-800/30 rounded-lg sm:rounded-xl md:rounded-2xl mb-1.5 sm:mb-2 md:mb-3">
                  <MobileIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                  Mobile Friendly
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Simple interface • Easy to use • Fast loading
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}