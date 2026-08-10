"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument, degrees } from 'pdf-lib';
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
  GripVertical,
  RotateCw,
  RotateCcw,
  Trash2,
  Move,
  Copy,
  Scissors,
  RefreshCw,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Minimize2,
  Maximize2,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
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

// --- Types ---
interface PageData {
  id: string;
  fileIndex: number;
  pageNumber: number;
  rotation: number; // user-applied rotation (0, 90, 180, 270)
  originalRotation: number; // source page's inherent rotation
  previewUrl?: string;
  originalFile: File;
  pageIndex: number;
}

interface UploadedFile {
  file: File;
  pages: PageData[];
  name: string;
  size: number;
  totalPages: number;
}

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
  id: "organize-pdf",
  name: "Organize PDF",
  description: "Reorder, rotate, and delete pages in your PDF documents",
  category: "pdf",
  icon: "📑",
  color: "from-purple-500 to-pink-500",
  href: "/organize-pdf",
  path: "/tools/organize-pdf",
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

// --- Page Thumbnail Component ---
const PageThumbnail = ({
  page,
  index,
  isSelected,
  onSelect,
  onDelete,
  onRotateLeft,
  onRotateRight,
  onDragStart,
  onDragEnd,
  onDrop,
  isDragging,
  isMobile,
  // Mobile touch props
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  isTouchDragging,
  isDropTarget,
}: {
  page: PageData;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  isDragging: boolean;
  isMobile: boolean;
  // Mobile touch
  onTouchStart?: (e: React.TouchEvent, index: number) => void;
  onTouchMove?: (e: React.TouchEvent, index: number) => void;
  onTouchEnd?: (e: React.TouchEvent, index: number) => void;
  isTouchDragging?: boolean;
  isDropTarget?: boolean;
}) => {
  const [previewError, setPreviewError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Rotate preview based on user rotation state
  const rotationStyle = {
    transform: `rotate(${page.rotation}deg)`,
    transition: 'transform 0.3s ease',
  };

  // Combine dragging states
  const dragging = isDragging || isTouchDragging || false;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03 }}
      className={`relative ${
        dragging ? 'opacity-50 scale-95' : 'opacity-100'
      } ${
        isSelected ? 'ring-4 ring-purple-500 ring-offset-2 dark:ring-offset-gray-900' : ''
      } ${
        isDropTarget ? 'ring-4 ring-blue-400 ring-offset-2 dark:ring-offset-gray-900' : ''
      }`}
      data-page-index={index}
    >
      {/* Inner div for native drag and touch events */}
      <div
        draggable={!isMobile}
        onDragStart={(e) => onDragStart(e, index)}
        onDragEnd={onDragEnd}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => onDrop(e, index)}
        onTouchStart={(e) => {
          if (onTouchStart) onTouchStart(e, index);
        }}
        onTouchMove={(e) => {
          if (onTouchMove) onTouchMove(e, index);
        }}
        onTouchEnd={(e) => {
          if (onTouchEnd) onTouchEnd(e, index);
        }}
        className="touch-none select-none cursor-grab active:cursor-grabbing"
      >
        <div
          className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden 
          border-2 ${isSelected ? 'border-purple-500' : 'border-gray-200 dark:border-gray-700'}
          shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          {/* Page Number & Controls */}
          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={onSelect}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  aria-label={`Select page ${index + 1}`}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Page {page.pageNumber}
                </span>
              </div>
              {page.rotation !== 0 && (
                <span className="text-[10px] bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded">
                  {page.rotation}°
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); onRotateLeft(); }}
                className="p-1 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded transition-colors"
                title="Rotate Left"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onRotateRight(); }}
                className="p-1 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded transition-colors"
                title="Rotate Right"
              >
                <RotateCw className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                title="Delete Page"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-500" />
              </button>
            </div>
          </div>

          {/* Thumbnail */}
          <div className="relative aspect-[3/4] bg-gray-100 dark:bg-gray-700 overflow-hidden">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              </div>
            )}
            {!previewError && page.previewUrl ? (
              <div className="w-full h-full flex items-center justify-center" style={rotationStyle}>
                <img
                  src={page.previewUrl}
                  alt={`Page ${page.pageNumber}`}
                  className="w-full h-full object-contain"
                  onLoad={() => setLoading(false)}
                  onError={() => {
                    setPreviewError(true);
                    setLoading(false);
                  }}
                />
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                <FileText className="w-12 h-12" />
                <span className="text-xs mt-2">Preview unavailable</span>
              </div>
            )}
          </div>

          {/* File Source Label */}
          <div className="px-2 py-1 text-[10px] text-gray-500 dark:text-gray-400 truncate border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            {page.originalFile.name}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Selection Toolbar Component ---
const SelectionToolbar = ({
  selectedCount,
  totalPages,
  onDeleteSelected,
  onClearSelection,
  onSelectAll,
  isMobile,
}: {
  selectedCount: number;
  totalPages: number;
  onDeleteSelected: () => void;
  onClearSelection: () => void;
  onSelectAll: () => void;
  isMobile: boolean;
}) => {
  if (selectedCount === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 
        bg-gradient-to-r from-purple-600 to-pink-600 text-white 
        rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3
        ${isMobile ? 'w-[calc(100%-2rem)] flex-wrap justify-center' : ''}`}
    >
      <span className="text-sm font-medium">
        {selectedCount} page{selectedCount !== 1 ? 's' : ''} selected
      </span>
      <div className={`flex items-center gap-2 ${isMobile ? 'w-full justify-center' : ''}`}>
        {selectedCount < totalPages && (
          <button
            onClick={onSelectAll}
            className="px-3 py-1.5 text-xs bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            Select All
          </button>
        )}
        <button
          onClick={onDeleteSelected}
          className="px-3 py-1.5 text-xs bg-red-500 hover:bg-red-600 rounded-lg transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>
        <button
          onClick={onClearSelection}
          className="px-3 py-1.5 text-xs bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
        >
          Clear
        </button>
      </div>
    </motion.div>
  );
};

// --- Main Component ---
export default function OrganizePdf() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [allPages, setAllPages] = useState<PageData[]>([]);
  const [selectedPages, setSelectedPages] = useState<Set<string>>(new Set());
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showFeatures, setShowFeatures] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [pdfWorkerLoaded, setPdfWorkerLoaded] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [showPageNumbers, setShowPageNumbers] = useState(true);
  const [isReversed, setIsReversed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Touch drag state
  const [touchDragIndex, setTouchDragIndex] = useState<number | null>(null);
  const [touchOverIndex, setTouchOverIndex] = useState<number | null>(null);
  const [touchStartPos, setTouchStartPos] = useState<{ x: number; y: number } | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null); // for visual feedback
  const gridRef = useRef<HTMLDivElement>(null);
  // Ghost element ref
  const ghostRef = useRef<HTMLDivElement>(null);

  // Conversion state
  const [convertedPdfBlob, setConvertedPdfBlob] = useState<Blob | null>(null);
  const [isConverted, setIsConverted] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  // Reset conversion state when pages change
  const resetConversionState = useCallback(() => {
    setConvertedPdfBlob(null);
    setIsConverted(false);
  }, []);

  // Initialize pdf.js worker - use local worker
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      try {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
        setPdfWorkerLoaded(true);
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

  // Generate page preview AND capture original rotation
  const generatePagePreview = async (
    file: File,
    pageNumber: number
  ): Promise<{ previewUrl: string | null; rotation: number }> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(pageNumber);
      
      // Get original rotation from pdf.js (0, 90, 180, 270)
      const originalRotation = page.rotate || 0;
      
      const scale = 0.5;
      const viewport = page.getViewport({ scale });
      
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) return { previewUrl: null, rotation: originalRotation };
      
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;
      
      const previewUrl = canvas.toDataURL('image/jpeg', 0.8);
      return { previewUrl, rotation: originalRotation };
    } catch (error) {
      console.error(`Error generating preview for page ${pageNumber}:`, error);
      return { previewUrl: null, rotation: 0 };
    }
  };

  // Handle file upload
  const handleFilesSelected = async (newFiles: File[]) => {
    const maxSize = isMobile ? 30 * 1024 * 1024 : 200 * 1024 * 1024;
    const maxFiles = isMobile ? 10 : 50;
    
    const filteredFiles = newFiles.filter(file => {
      if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
        alert(`File "${file.name}" is not a PDF document.`);
        return false;
      }
      
      if (file.size === 0 || file.size > maxSize) {
        alert(`File "${file.name}" is too large (${(file.size/1024/1024).toFixed(1)}MB). Maximum size is ${isMobile ? '30MB' : '200MB'}.`);
        return false;
      }
      return true;
    });
    
    const totalFiles = uploadedFiles.length + filteredFiles.length;
    if (totalFiles > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed.`);
      return;
    }
    
    if (filteredFiles.length === 0) return;

    resetConversionState();

    setProcessing(true);
    setProgress(0);
    setShowFeatures(false);
    setIsReversed(false);

    const newUploadedFiles: UploadedFile[] = [];
    let allNewPages: PageData[] = [];
    let processed = 0;

    for (const file of filteredFiles) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const totalPages = pdf.numPages;
        
        const pages: PageData[] = [];
        const fileIndex = uploadedFiles.length + newUploadedFiles.length;
        
        for (let i = 1; i <= totalPages; i++) {
          const { previewUrl, rotation } = await generatePagePreview(file, i);
          pages.push({
            id: `${fileIndex}-${i}-${Date.now()}-${Math.random()}`,
            fileIndex: fileIndex,
            pageNumber: i,
            rotation: 0, // user rotation starts at 0
            originalRotation: rotation, // store the source page's rotation
            previewUrl: previewUrl || undefined,
            originalFile: file,
            pageIndex: i - 1,
          });
          
          processed++;
          setProgress((processed / (filteredFiles.length * 10)) * 100);
        }
        
        newUploadedFiles.push({
          file,
          pages,
          name: file.name,
          size: file.size,
          totalPages,
        });
        
        allNewPages = [...allNewPages, ...pages];
      } catch (error) {
        console.error(`Error processing ${file.name}:`, error);
        alert(`Failed to process "${file.name}". Please check if it's a valid PDF file.`);
      }
    }

    setUploadedFiles([...uploadedFiles, ...newUploadedFiles]);
    setAllPages([...allPages, ...allNewPages]);
    setProcessing(false);
    setProgress(100);
    
    // Auto-select all pages for the first upload
    if (allPages.length === 0 && allNewPages.length > 0) {
      const newIds = allNewPages.map(p => p.id);
      setSelectedPages(new Set(newIds));
    }
  };

  // Handle page operations - all reset conversion
  const handlePageSelect = (pageId: string) => {
    const newSelected = new Set(selectedPages);
    if (newSelected.has(pageId)) {
      newSelected.delete(pageId);
    } else {
      newSelected.add(pageId);
    }
    setSelectedPages(newSelected);
    resetConversionState();
  };

  const handleSelectAll = () => {
    if (selectedPages.size === allPages.length) {
      setSelectedPages(new Set());
    } else {
      setSelectedPages(new Set(allPages.map(p => p.id)));
    }
    resetConversionState();
  };

  const handleClearSelection = () => {
    setSelectedPages(new Set());
    resetConversionState();
  };

  const handleDeletePage = (pageId: string) => {
    setAllPages(prev => prev.filter(p => p.id !== pageId));
    setSelectedPages(prev => {
      const newSet = new Set(prev);
      newSet.delete(pageId);
      return newSet;
    });
    resetConversionState();
  };

  const handleDeleteSelected = () => {
    const idsToDelete = new Set(selectedPages);
    setAllPages(prev => prev.filter(p => !idsToDelete.has(p.id)));
    setSelectedPages(new Set());
    resetConversionState();
  };

  const handleRotatePage = (pageId: string, direction: 'left' | 'right') => {
    setAllPages(prev => prev.map(p => {
      if (p.id === pageId) {
        const rotationChange = direction === 'left' ? -90 : 90;
        const newRotation = ((p.rotation + rotationChange) % 360 + 360) % 360;
        return { ...p, rotation: newRotation };
      }
      return p;
    }));
    resetConversionState();
  };

  const handleRotateSelected = (direction: 'left' | 'right') => {
    const rotationChange = direction === 'left' ? -90 : 90;
    setAllPages(prev => prev.map(p => {
      if (selectedPages.has(p.id)) {
        const newRotation = ((p.rotation + rotationChange) % 360 + 360) % 360;
        return { ...p, rotation: newRotation };
      }
      return p;
    }));
    resetConversionState();
  };

  // Reverse page order
  const handleReverseOrder = () => {
    if (allPages.length <= 1) {
      alert('Need at least 2 pages to reverse order.');
      return;
    }
    
    setAllPages(prev => [...prev].reverse());
    setIsReversed(true);
    setSelectedPages(new Set());
    resetConversionState();
    
    setTimeout(() => {
      setIsReversed(false);
    }, 3000);
  };

  // Clear all uploaded files
  const handleClearAll = () => {
    if (allPages.length === 0) return;
    
    if (confirm('This will clear all uploaded files and reset the tool. Are you sure?')) {
      setUploadedFiles([]);
      setAllPages([]);
      setSelectedPages(new Set());
      setProgress(0);
      setShowFeatures(true);
      setIsReversed(false);
      resetConversionState();
    }
  };

  // Drag and drop for reordering (desktop)
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggingIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggingIndex(null);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (isNaN(sourceIndex) || sourceIndex === targetIndex) return;

    const newPages = [...allPages];
    const [removed] = newPages.splice(sourceIndex, 1);
    newPages.splice(targetIndex, 0, removed);
    setAllPages(newPages);
    setDraggingIndex(null);
    resetConversionState();
  };

  // --- Mobile Touch Drag Handlers ---
  const handleTouchStart = (e: React.TouchEvent, index: number) => {
    // Ignore if target is a button, input, etc.
    const target = e.target as HTMLElement;
    if (target.closest('button, input, a, .no-drag')) return;

    const touch = e.touches[0];
    if (!touch) return;

    // Prevent default to avoid scrolling or other gestures
    e.preventDefault();

    setTouchDragIndex(index);
    setTouchOverIndex(index);
    setTouchStartPos({ x: touch.clientX, y: touch.clientY });
    setDropTargetIndex(index); // highlight itself initially

    // Create ghost element
    const ghost = document.createElement('div');
    ghost.className = 'fixed z-50 pointer-events-none w-48 h-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-purple-500 opacity-80';
    ghost.style.left = `${touch.clientX - 80}px`;
    ghost.style.top = `${touch.clientY - 100}px`;
    ghost.style.transform = 'scale(1.05)';
    // Copy thumbnail content
    const pageEl = (e.target as HTMLElement).closest('[data-page-index]');
    if (pageEl) {
      const thumbnail = pageEl.querySelector('.aspect-\\[3\\/4\\]');
      if (thumbnail) {
        ghost.innerHTML = thumbnail.innerHTML;
      }
    }
    document.body.appendChild(ghost);
    ghostRef.current = ghost;
  };

  // Global touch move and end are attached via useEffect
  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault(); // Prevent scrolling while dragging

    const touch = e.touches[0];
    if (!touch || touchDragIndex === null) return;

    // Update ghost position
    if (ghostRef.current) {
      ghostRef.current.style.left = `${touch.clientX - 80}px`;
      ghostRef.current.style.top = `${touch.clientY - 100}px`;
    }

    // Find element under finger
    const elementUnder = document.elementFromPoint(touch.clientX, touch.clientY);
    if (elementUnder) {
      const pageContainer = elementUnder.closest('[data-page-index]');
      if (pageContainer) {
        const idx = parseInt(pageContainer.getAttribute('data-page-index') || '-1');
        if (idx >= 0 && idx < allPages.length && idx !== touchDragIndex) {
          setTouchOverIndex(idx);
          setDropTargetIndex(idx);
        } else if (idx === touchDragIndex) {
          setTouchOverIndex(idx);
          setDropTargetIndex(null);
        } else {
          setTouchOverIndex(null);
          setDropTargetIndex(null);
        }
      } else {
        setTouchOverIndex(null);
        setDropTargetIndex(null);
      }
    } else {
      setTouchOverIndex(null);
      setDropTargetIndex(null);
    }
  }, [touchDragIndex, allPages]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    // Remove ghost
    if (ghostRef.current) {
      ghostRef.current.remove();
      ghostRef.current = null;
    }

    // Finalize reorder if valid
    if (touchDragIndex !== null && touchOverIndex !== null && touchDragIndex !== touchOverIndex) {
      const newPages = [...allPages];
      const [removed] = newPages.splice(touchDragIndex, 1);
      newPages.splice(touchOverIndex, 0, removed);
      setAllPages(newPages);
      resetConversionState();
    }

    // Reset touch states
    setTouchDragIndex(null);
    setTouchOverIndex(null);
    setTouchStartPos(null);
    setDropTargetIndex(null);
  }, [touchDragIndex, touchOverIndex, allPages, resetConversionState]);

  // Attach global touchmove/touchend when dragging
  useEffect(() => {
    if (touchDragIndex !== null) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      document.addEventListener('touchcancel', handleTouchEnd);
      return () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        document.removeEventListener('touchcancel', handleTouchEnd);
        // Clean up ghost if still present
        if (ghostRef.current) {
          ghostRef.current.remove();
          ghostRef.current = null;
        }
      };
    }
  }, [touchDragIndex, handleTouchMove, handleTouchEnd]);

  // ========== FIXED CONVERT FUNCTION ==========
  // Combines original rotation + user rotation so exported PDF matches preview
  const handleConvert = async () => {
    if (allPages.length === 0) {
      alert('No pages to convert. Please add some PDF files first.');
      return;
    }

    setIsConverting(true);
    setDownloadLoading(true);

    try {
      const newPdf = await PDFDocument.create();
      
      // Cache loaded source PDFs by fileIndex
      const sourcePdfCache: { [key: number]: PDFDocument } = {};

      // Iterate over allPages in the exact order (user's arranged order)
      for (const pageData of allPages) {
        const fileIndex = pageData.fileIndex;
        let sourcePdf = sourcePdfCache[fileIndex];
        
        if (!sourcePdf) {
          const file = pageData.originalFile;
          const arrayBuffer = await file.arrayBuffer();
          sourcePdf = await PDFDocument.load(arrayBuffer);
          sourcePdfCache[fileIndex] = sourcePdf;
        }

        // Get the source page to retrieve its original rotation
        const sourcePageIndex = pageData.pageNumber - 1;
        const sourcePage = sourcePdf.getPage(sourcePageIndex);
        const originalRotation = sourcePage.getRotation().angle; // 0, 90, 180, 270

        // Combine original rotation with user rotation
        const totalRotation = (originalRotation + pageData.rotation) % 360;

        // Copy the page from source
        const [copiedPage] = await newPdf.copyPages(sourcePdf, [sourcePageIndex]);
        
        // Apply total rotation (original + user)
        copiedPage.setRotation(degrees(totalRotation));
        
        newPdf.addPage(copiedPage);
      }

      const pdfBytes = await newPdf.save();
      // Ensure we have a plain ArrayBuffer (not SharedArrayBuffer) for the Blob
      const buffer = new Uint8Array(pdfBytes).buffer;
      const blob = new Blob([buffer], { type: 'application/pdf' });
      
      setConvertedPdfBlob(blob);
      setIsConverted(true);
      
    } catch (error) {
      console.error('Error creating PDF:', error);
      alert('Failed to convert PDF. Please try again.');
    } finally {
      setIsConverting(false);
      setDownloadLoading(false);
    }
  };
  // ==========================================

  // Download the already converted PDF
  const handleDownload = () => {
    if (!convertedPdfBlob) {
      alert('Please convert the PDF first.');
      return;
    }
    const fileName = `organized_pdf_${new Date().getTime()}.pdf`;
    downloadFile(convertedPdfBlob, fileName);
  };

  // Trigger file input for "Add More PDFs"
  const handleAddMoreClick = () => {
    fileInputRef.current?.click();
  };

  const filteredPages = allPages;
  const totalPages = allPages.length;
  const selectedCount = selectedPages.size;

  // Determine if touch dragging is active
  const isTouchDragging = touchDragIndex !== null;

  return (
    <>
      {/* SEO Schema */}
      <FAQSchema />
      <BreadcrumbSchema />
      <HowToSchema />
      <ArticleSchema />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 py-6 sm:py-8 md:py-12">
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header Section */}
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
                    bg-gradient-to-br from-purple-500 to-pink-500
                    rounded-2xl md:rounded-3xl
                    mb-3 md:mb-4 shadow-xl"
                >
                  <span className="text-2xl md:text-3xl text-white select-none">
                    {tool.icon}
                  </span>
                </motion.div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-2 sm:mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent px-2">
                  Organize PDF Pages Online - Rearrange & Merge Free | PDFSwift
                </h1>

                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
                  Rearrange, rotate, and delete pages from your PDF documents
                  <span className="block text-purple-600 dark:text-purple-400 font-medium mt-1 text-xs sm:text-sm md:text-base">
                    {isMobile ? "📱 Mobile: Up to 30MB per PDF" : "💻 Desktop: Up to 200MB per PDF"}
                  </span>
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <AnimatePresence>
              {showFeatures && uploadedFiles.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 sm:mb-8 md:mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
                >
                  {[
                    {
                      icon: Layers,
                      title: "Reorder Pages",
                      desc: "Drag and drop pages to rearrange them in any order you want",
                      gradient: "from-purple-500 to-pink-600",
                      bg: "from-purple-50 to-pink-50",
                      border: "border-purple-200",
                    },
                    {
                      icon: RotateCw,
                      title: "Rotate Pages",
                      desc: "Rotate individual pages left or right with a single click",
                      gradient: "from-blue-500 to-cyan-600",
                      bg: "from-blue-50 to-cyan-50",
                      border: "border-blue-200",
                    },
                    {
                      icon: Trash2,
                      title: "Delete Pages",
                      desc: "Remove unwanted pages from your PDF document",
                      gradient: "from-red-500 to-rose-600",
                      bg: "from-red-50 to-rose-50",
                      border: "border-red-200",
                    },
                    {
                      icon: ArrowUpDown,
                      title: "Reverse Order",
                      desc: "Reverse the order of all pages with one click",
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

            {/* Main Tool Card */}
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
                      Select PDF files to organize their pages
                      {isMobile && (
                        <span className="block text-purple-600 dark:text-purple-400 mt-1">
                          Max 30MB per file • 10 files max
                        </span>
                      )}
                    </p>
                  </div>
                </div>

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

                {uploadedFiles.length > 0 && (
                  <div className="text-center mt-4">
                    <div className="inline-flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg sm:rounded-full">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400" />
                        <span className="font-medium text-purple-700 dark:text-purple-300">
                          {uploadedFiles.length} PDF {uploadedFiles.length === 1 ? 'file' : 'files'} uploaded
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
                        <span>• {allPages.length} pages total</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Processing Indicator */}
              {processing && (
                <div className="space-y-3 sm:space-y-4 mb-4">
                  <ProgressBar
                    progress={progress}
                    label="Processing PDF files..."
                  />
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-purple-600 dark:text-purple-400">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                    <span className="text-xs sm:text-sm font-medium">
                      Extracting pages and generating previews...
                    </span>
                  </div>
                </div>
              )}

              {/* Page Organization Interface */}
              {allPages.length > 0 && !processing && (
                <div className="space-y-4">
                  {/* Success Message for Reverse */}
                  <AnimatePresence>
                    {isReversed && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-3 text-center"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 inline mr-2" />
                        <span className="text-green-700 dark:text-green-300 font-medium">
                          Pages reversed successfully! The order has been updated.
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Conversion status message */}
                  {!isConverted && allPages.length > 0 && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-2 text-center text-sm text-yellow-700 dark:text-yellow-300">
                      ⚡ Changes detected. Please click <strong>Convert</strong> to apply them before downloading.
                    </div>
                  )}
                  {isConverted && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-2 text-center text-sm text-green-700 dark:text-green-300">
                      ✅ PDF is ready for download. Rotation and order are applied.
                    </div>
                  )}

                  {/* Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {allPages.length} pages
                      </span>
                      {selectedCount > 0 && (
                        <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full">
                          {selectedCount} selected
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* Select All / Deselect All */}
                      <button
                        onClick={handleSelectAll}
                        className="text-xs px-2 py-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        {selectedCount === allPages.length ? 'Deselect All' : 'Select All'}
                      </button>

                      {/* Rotate Left */}
                      <button
                        onClick={() => handleRotateSelected('left')}
                        className="text-xs px-2 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Rotate Left
                      </button>

                      {/* Rotate Right */}
                      <button
                        onClick={() => handleRotateSelected('right')}
                        className="text-xs px-2 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-1"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        Rotate Right
                      </button>

                      {/* Delete Selected */}
                      <button
                        onClick={handleDeleteSelected}
                        className="text-xs px-2 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete Selected
                      </button>

                      {/* Reverse */}
                      <button
                        onClick={handleReverseOrder}
                        className="text-xs px-2 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center gap-1"
                      >
                        <ArrowUpDown className="w-3.5 h-3.5" />
                        Reverse
                      </button>

                      {/* Clear All */}
                      <button
                        onClick={handleClearAll}
                        className="text-xs px-2 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        Clear All
                      </button>

                      {/* Add More PDFs - hidden input */}
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept=".pdf,application/pdf"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files && files.length > 0) {
                            handleFilesSelected(Array.from(files));
                          }
                          e.target.value = '';
                        }}
                      />
                      <button
                        onClick={handleAddMoreClick}
                        className="text-xs px-2 py-1.5 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add More
                      </button>
                    </div>
                  </div>

                 {/* Page Grid */}
<div
  ref={gridRef}
  className={`grid ${
    isMobile
      ? 'grid-cols-2'
      : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
  } gap-3 sm:gap-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl`}
>
  {filteredPages.map((page, index) => (
    <PageThumbnail
      key={page.id}
      page={page}
      index={index}
      isSelected={selectedPages.has(page.id)}
      onSelect={() => handlePageSelect(page.id)}
      onDelete={() => handleDeletePage(page.id)}
      onRotateLeft={() => handleRotatePage(page.id, 'left')}
      onRotateRight={() => handleRotatePage(page.id, 'right')}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
      isDragging={draggingIndex === index}
      isMobile={isMobile}
      onTouchStart={handleTouchStart}
      isTouchDragging={touchDragIndex === index}
      isDropTarget={dropTargetIndex === index}
    />
  ))}
</div>

                  {/* Convert & Download Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleConvert}
                      disabled={isConverting}
                      className={`flex-1 py-3 sm:py-4 px-4 md:px-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3 ${
                        isConverting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isConverting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Converting...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                          {isConverted ? 'Re-convert PDF' : 'Convert PDF'}
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownload}
                      disabled={!convertedPdfBlob || isConverting}
                      className={`flex-1 py-3 sm:py-4 px-4 md:px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3 ${
                        (!convertedPdfBlob || isConverting) ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                      Download PDF
                      {convertedPdfBlob && (
                        <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                          {allPages.length} pages
                        </span>
                      )}
                    </motion.button>
                  </div>
                </div>
              )}
            </div>

            {/* How To Section */}
            <section
              id="how-to-organize-pdf"
              className="mt-20 scroll-mt-24"
            >
              <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center mb-10`}>
                How to Organize Your PDF Online
              </h2>

              <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-6'}`}>
                {[
                  {
                    step: "1",
                    title: "Upload PDF Files",
                    desc: `Upload PDF files (${isMobile ? "max 30MB" : "up to 200MB"}) using drag & drop or file picker.`
                  },
                  {
                    step: "2",
                    title: "View All Pages",
                    desc: "See all pages from your PDFs displayed as thumbnails."
                  },
                  {
                    step: "3",
                    title: "Reorder Pages",
                    desc: "Drag and drop pages to rearrange them in your preferred order."
                  },
                  {
                    step: "4",
                    title: "Reverse Order",
                    desc: "Click Reverse to flip the order of all pages instantly."
                  },
                  {
                    step: "5",
                    title: "Edit Pages",
                    desc: isMobile ? "Tap the icons on each page to rotate or delete." : "Click the icons on each page to rotate or delete."
                  },
                  {
                    step: "6",
                    title: "Clear & Start Fresh",
                    desc: "Use Clear All to reset and start over with new files."
                  },
                  {
                    step: "7",
                    title: "Convert & Download",
                    desc: "Click Convert to apply changes (including proper rotation), then Download to save your reorganized PDF."
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
                  Everything you need to know about organizing PDF pages
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    question: "What can I do with the Organize PDF tool?",
                    answer: "You can reorder pages, rotate individual pages, delete unwanted pages, reverse the entire page order, and merge pages from multiple PDFs into one organized PDF document."
                  },
                  {
                    question: "How does the Reverse Order feature work?",
                    answer: "Click the 'Reverse' button to instantly flip the order of all pages. The last page becomes first, and the first page becomes last. The thumbnails update immediately to show the new order with a success message."
                  },
                  {
                    question: "How do I clear all uploaded files?",
                    answer: "Click the 'Clear All' button in the toolbar. This will remove all uploaded PDFs and reset the tool to its initial state, allowing you to start fresh with new files."
                  },
                  {
                    question: "What is the maximum file size for upload?",
                    answer: `For mobile devices: Maximum 30MB per PDF file. For desktop browsers: Up to 200MB per PDF file. We recommend using desktop browsers for files larger than 30MB.`
                  },
                  {
                    question: "Is there a limit on the number of PDF files?",
                    answer: `Mobile: Up to 10 files at once. Desktop: Up to 50 files at once. You can upload multiple PDFs and organize all pages together.`
                  },
                  {
                    question: "Can I reorder pages from different PDFs?",
                    answer: "Yes! You can upload multiple PDFs and all pages will be displayed together. You can drag and drop any page to reorganize them, regardless of which PDF they came from."
                  },
                  {
                    question: "How do I rotate a page?",
                    answer: "Click the rotate left or rotate right button on each page thumbnail. You can also select multiple pages and use the 'Rotate Left' or 'Rotate Right' buttons in the toolbar to rotate all selected pages at once."
                  },
                  {
                    question: "Can I delete multiple pages at once?",
                    answer: "Yes. Select multiple pages by clicking the checkbox on each page, then click the 'Delete Selected' button in the toolbar."
                  },
                  {
                    question: "Is the PDF processing secure?",
                    answer: "All processing happens directly in your browser (client-side). Your PDF files are never uploaded to any server, ensuring complete privacy and security."
                  },
                  {
                    question: "What happens to the original PDF when I download?",
                    answer: "The original PDF files remain untouched. The download creates a new PDF with your changes applied, preserving all content and formatting."
                  },
                  {
                    question: "Is the Organize PDF tool free to use?",
                    answer: "Yes, the Organize PDF tool is completely free to use. You can reorganize your PDF pages without any signup, subscription, or hidden charges."
                  },
                  {
                    question: "Will page rotations affect the final PDF quality?",
                    answer: "No, rotating pages preserves the original quality. The PDF-lib library we use applies rotation without any loss of quality."
                  },
                  {
                    question: "Can I organize password-protected PDFs?",
                    answer: "Currently, we do not support password-protected PDF files. Please remove the password protection before organizing the pages."
                  },
                  {
                    question: "What happens to text and images when I reorder pages?",
                    answer: "All content (text, images, formatting) is preserved exactly as it was in the original PDF. Reordering pages simply changes their order in the document."
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