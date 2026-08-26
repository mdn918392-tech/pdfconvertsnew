"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import BreadcrumbSchema from "./BreadcrumbSchema";
import ArticleSchema from "./ArticleSchema";
import HowToSchema from "./HowToSchema";
import FAQSchema from "./FAQSchema";
import {
  Upload,
  Download,
  FileImage,
  Grid,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Copy,
  Trash2,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Ruler,
  ZoomIn,
  ZoomOut,
  Plus,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Trash,
  Maximize2,
  X,
  AlertCircle,
} from "lucide-react";

// --- Types ---
interface ImageItem {
  id: string;
  file: File;
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  aspectRatio: number;
  lockedRatio: boolean;
  zIndex: number;
  page: number;
  loaded: boolean;
}

interface PageSettings {
  width: number;
  height: number;
  margin: number;
  gap: number;
  backgroundColor: string;
  paperSize: "a4" | "a3" | "custom";
}

// Toast/Notification Types
interface ToastMessage {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  duration?: number;
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
// --- Paper Size Constants ---
const PAPER_SIZES = {
  a4: {
    label: "A4",
    width: 2480,
    height: 3508,
    mm: "210 × 297",
    cm: "21.0 × 29.7",
    inches: "8.3 × 11.7",
  },
  a3: {
    label: "A3",
    width: 3508,
    height: 4961,
    mm: "297 × 420",
    cm: "29.7 × 42.0",
    inches: "11.7 × 16.5",
  },
  custom: {
    label: "Custom",
    width: 2480,
    height: 3508,
    mm: "—",
    cm: "—",
    inches: "—",
  },
};

const PREVIEW_SCALE = 0.35;
const MAX_SCALE = 0.8;
const MIN_SCALE = 0.05;

const DEFAULT_PAGE_SETTINGS: PageSettings = {
  width: PAPER_SIZES.a4.width,
  height: PAPER_SIZES.a4.height,
  margin: 50,
  gap: 20,
  backgroundColor: "#ffffff",
  paperSize: "a4",
};

const SNAP_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

const generateId = () => Math.random().toString(36).substring(2, 11);

// --- Optimized Image Loader ---
const loadImage = (file: File): Promise<{ url: string; width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        resolve({
          url: e.target?.result as string,
          width: img.width,
          height: img.height,
        });
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// --- Toast/Notification Component ---
const Toast: React.FC<{ toast: ToastMessage; onClose: (id: string) => void }> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, toast.duration || 4000);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onClose]);

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "📢";
    }
  };

  const getBgColor = () => {
    switch (toast.type) {
      case "success":
        return "bg-green-50 dark:bg-green-900/30 border-green-500";
      case "error":
        return "bg-red-50 dark:bg-red-900/30 border-red-500";
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/30 border-yellow-500";
      case "info":
        return "bg-blue-50 dark:bg-blue-900/30 border-blue-500";
      default:
        return "bg-gray-50 dark:bg-gray-800 border-gray-500";
    }
  };

  const getTextColor = () => {
    switch (toast.type) {
      case "success":
        return "text-green-800 dark:text-green-200";
      case "error":
        return "text-red-800 dark:text-red-200";
      case "warning":
        return "text-yellow-800 dark:text-yellow-200";
      case "info":
        return "text-blue-800 dark:text-blue-200";
      default:
        return "text-gray-800 dark:text-gray-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      className={`fixed top-4 right-4 z-[100] max-w-sm w-full border-l-4 shadow-xl rounded-lg p-4 ${getBgColor()}`}
      style={{ maxWidth: "380px" }}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl flex-shrink-0">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-bold text-sm ${getTextColor()}`}>{toast.title}</h4>
          <p className={`text-sm mt-0.5 ${getTextColor()} opacity-80`}>{toast.message}</p>
        </div>
        <button
          onClick={() => onClose(toast.id)}
          className="flex-shrink-0 p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </motion.div>
  );
};

// --- Main Component ---
export default function ImageToA4Sheet() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pageSettings, setPageSettings] = useState<PageSettings>(DEFAULT_PAGE_SETTINGS);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(PREVIEW_SCALE);
  const [isUploading, setIsUploading] = useState(false);
  const [exportFormat, setExportFormat] = useState<"pdf" | "jpg" | "png">("pdf");
  const [isExporting, setIsExporting] = useState(false);
  const [imageCache, setImageCache] = useState<Map<string, HTMLImageElement>>(new Map());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [lastTapTime, setLastTapTime] = useState<{ [key: string]: number }>({});
  const [touchStartPos, setTouchStartPos] = useState<{ x: number; y: number; id: string | null } | null>(null);
  const [isPinching, setIsPinching] = useState(false);
  const [lastPinchDist, setLastPinchDist] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [autoAdjustImages, setAutoAdjustImages] = useState(true);
  const [isCanvasFocused, setIsCanvasFocused] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // --- Toast Functions ---
  const showToast = useCallback((type: ToastMessage["type"], title: string, message: string, duration?: number) => {
    const id = generateId();
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // --- Check if mobile and container size ---
  useEffect(() => {
    const checkSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerWidth(rect.width);
        setContainerHeight(rect.height);
      }
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    window.addEventListener("orientationchange", () => {
      setTimeout(checkSize, 300);
    });
    return () => {
      window.removeEventListener("resize", checkSize);
      window.removeEventListener("orientationchange", checkSize);
    };
  }, []);

  // --- Auto-fit canvas on resize ---
  useEffect(() => {
    if (containerWidth > 0 && containerHeight > 0) {
      const pageAspect = pageSettings.width / pageSettings.height;
      const containerAspect = containerWidth / containerHeight;
      let newScale;
      
      if (pageAspect > containerAspect) {
        newScale = (containerWidth - 40) / pageSettings.width;
      } else {
        newScale = (containerHeight - 40) / pageSettings.height;
      }
      
      newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
      
      if (newScale > 0.01) {
        setScale(newScale);
      }
    }
  }, [containerWidth, containerHeight, pageSettings.width, pageSettings.height]);

  const dragState = useRef<{
    id: string | null;
    offsetX: number;
    offsetY: number;
    startX: number;
    startY: number;
    resizeHandle: string | null;
    startWidth: number;
    startHeight: number;
    imageX: number;
    imageY: number;
  }>({
    id: null,
    offsetX: 0,
    offsetY: 0,
    startX: 0,
    startY: 0,
    resizeHandle: null,
    startWidth: 0,
    startHeight: 0,
    imageX: 0,
    imageY: 0,
  });

  // --- Memoized page images ---
  const pageImages = useMemo(() => {
    return images.filter((img) => img.page === currentPage);
  }, [images, currentPage]);

  const allPages = useMemo(() => {
    const pages = new Set(images.map((img) => img.page));
    return pages.size > 0 ? Array.from(pages).sort((a, b) => a - b) : [1];
  }, [images]);

  const totalPages = useMemo(() => {
    return allPages.length > 0 ? Math.max(...allPages) : 1;
  }, [allPages]);

  const cleanupEmptyPages = useCallback((currentImages: ImageItem[]) => {
    const pagesWithImages = new Set(currentImages.map((img) => img.page));
    if (currentImages.length === 0) return [];

    const pageMap = new Map<number, number>();
    let newPageNum = 1;
    const sortedPages = Array.from(pagesWithImages).sort((a, b) => a - b);
    
    for (const oldPage of sortedPages) {
      pageMap.set(oldPage, newPageNum);
      newPageNum++;
    }

    return currentImages.map((img) => ({
      ...img,
      page: pageMap.get(img.page) || 1,
    }));
  }, []);

  const handleDeleteImage = useCallback((id: string) => {
    setShowDeleteConfirm(id);
  }, []);

  const confirmDeleteImage = useCallback((id: string) => {
    const imgToDelete = images.find((i) => i.id === id);
    if (!imgToDelete) return;

    setImages((prev) => {
      const filtered = prev.filter((i) => i.id !== id);
      
      if (filtered.length === 0) {
        setCurrentPage(1);
        showToast("success", "Image Deleted", "Image has been removed successfully");
        return filtered;
      }

      const hasImagesOnCurrentPage = filtered.some((i) => i.page === currentPage);
      if (!hasImagesOnCurrentPage && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      const renumbered = cleanupEmptyPages(filtered);
      const maxPage = Math.max(...renumbered.map((i) => i.page));
      if (currentPage > maxPage) {
        setCurrentPage(1);
      }

      showToast("success", "Image Deleted", "Image has been removed successfully");
      return renumbered;
    });

    if (selectedId === id) setSelectedId(null);
    setShowDeleteConfirm(null);
  }, [currentPage, selectedId, cleanupEmptyPages, images, showToast]);

  // --- Load images into cache ---
  const loadImagesToCache = useCallback(async (newImages: ImageItem[]) => {
    const cache = new Map(imageCache);
    for (const img of newImages) {
      if (!cache.has(img.id)) {
        const image = new Image();
        image.src = img.url;
        await new Promise((resolve) => {
          image.onload = resolve;
          image.onerror = resolve;
        });
        cache.set(img.id, image);
      }
    }
    setImageCache(cache);
    setImages((prev) =>
      prev.map((i) => {
        if (newImages.some((ni) => ni.id === i.id)) {
          return { ...i, loaded: true };
        }
        return i;
      })
    );
  }, [imageCache]);

  // --- Auto-adjust images to fit the page ---
  const autoAdjustImagesOnPage = useCallback((pageNum: number, imagesList: ImageItem[]) => {
    const pageImagesList = imagesList.filter(img => img.page === pageNum);
    if (pageImagesList.length === 0) return imagesList;

    const margin = pageSettings.margin;
    const usableWidth = pageSettings.width - margin * 2;
    const usableHeight = pageSettings.height - margin * 2;

    const count = pageImagesList.length;
    const cols = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / cols);

    const cellWidth = (usableWidth - (cols - 1) * pageSettings.gap) / cols;
    const cellHeight = (usableHeight - (rows - 1) * pageSettings.gap) / rows;
    const cellSize = Math.min(cellWidth, cellHeight);

    return imagesList.map((img) => {
      if (img.page !== pageNum) return img;
      
      const idx = pageImagesList.findIndex(i => i.id === img.id);
      const col = idx % cols;
      const row = Math.floor(idx / cols);

      let width, height;
      if (img.aspectRatio >= 1) {
        width = cellSize * 0.9;
        height = width / img.aspectRatio;
      } else {
        height = cellSize * 0.9;
        width = height * img.aspectRatio;
      }

      const x = margin + col * (cellSize + pageSettings.gap) + (cellSize - width) / 2;
      const y = margin + row * (cellSize + pageSettings.gap) + (cellSize - height) / 2;

      return {
        ...img,
        x,
        y,
        width,
        height,
        rotation: 0,
      };
    });
  }, [pageSettings]);

  // --- Upload Handler ---
  const handleUpload = useCallback(async (files: FileList | null) => {
    if (!files) return;
    setIsUploading(true);

    try {
      const newImages: ImageItem[] = [];
      for (const file of Array.from(files)) {
        const { url, width, height } = await loadImage(file);
        const aspectRatio = width / height;
        const maxSize = Math.min(
          pageSettings.width - pageSettings.margin * 2,
          pageSettings.height - pageSettings.margin * 2
        ) * 0.35;
        const imgWidth = Math.min(maxSize, width * 0.3);
        const imgHeight = imgWidth / aspectRatio;

        const targetPage = currentPage;

        newImages.push({
          id: generateId(),
          file,
          url,
          x: pageSettings.margin + Math.random() * 50 + 20,
          y: pageSettings.margin + Math.random() * 50 + 20,
          width: imgWidth,
          height: imgHeight,
          rotation: 0,
          aspectRatio,
          lockedRatio: true,
          zIndex: images.filter(i => i.page === currentPage).length + 1,
          page: targetPage,
          loaded: false,
        });
      }

      let updatedImages = [...images, ...newImages];

      if (autoAdjustImages) {
        updatedImages = autoAdjustImagesOnPage(currentPage, updatedImages);
      }

      setImages(updatedImages);
      await loadImagesToCache(newImages);
      showToast("success", "Upload Successful", `${newImages.length} image(s) uploaded to page ${currentPage}`);

    } catch (error) {
      console.error("Upload error:", error);
      showToast("error", "Upload Failed", "Failed to upload images. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }, [currentPage, images, pageSettings, loadImagesToCache, autoAdjustImages, autoAdjustImagesOnPage, showToast]);

  // --- Add New Page ---
  const addNewPage = useCallback(() => {
    const newPage = totalPages + 1;
    setCurrentPage(newPage);
    setSelectedId(null);
    showToast("success", "Page Added", `Page ${newPage} has been created`);
  }, [totalPages, showToast]);

  // --- Paper Size Change Handler ---
  const handlePaperSizeChange = (size: "a4" | "a3" | "custom") => {
    const sizeData = PAPER_SIZES[size];
    setPageSettings({
      ...pageSettings,
      paperSize: size,
      width: sizeData.width,
      height: sizeData.height,
    });
    showToast("info", "Page Size Updated", `Switched to ${PAPER_SIZES[size].label} format`);
  };

  // --- Get current scale for rendering ---
  const getCurrentScale = useCallback(() => {
    return isMobile ? Math.min(scale, 0.4) : scale;
  }, [scale, isMobile]);

  // --- Handle double tap for rotation ---
  const handleImageDoubleTap = useCallback((e: React.MouseEvent | React.TouchEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    
    const now = Date.now();
    const lastTap = lastTapTime[id] || 0;
    
    if (now - lastTap < 500) {
      setImages((prev) =>
        prev.map((img) =>
          img.id === id ? { ...img, rotation: (img.rotation + 90) % 360 } : img
        )
      );
      setLastTapTime(prev => ({ ...prev, [id]: 0 }));
      showToast("info", "Image Rotated", "Image rotated 90° clockwise");
    } else {
      setLastTapTime(prev => ({ ...prev, [id]: now }));
    }
  }, [lastTapTime, showToast]);

  // --- Drag & Resize Handlers with Touch Support ---
  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent, id: string, handle?: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const img = images.find((i) => i.id === id);
    if (!img) return;

    setSelectedId(id);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const currentScale = getCurrentScale();
    const mouseX = (clientX - rect.left) / currentScale;
    const mouseY = (clientY - rect.top) / currentScale;

    if (handle) {
      dragState.current = {
        id,
        offsetX: 0,
        offsetY: 0,
        startX: clientX,
        startY: clientY,
        resizeHandle: handle,
        startWidth: img.width,
        startHeight: img.height,
        imageX: img.x,
        imageY: img.y,
      };
    } else {
      const offsetX = mouseX - img.x;
      const offsetY = mouseY - img.y;

      dragState.current = {
        id,
        offsetX,
        offsetY,
        startX: clientX,
        startY: clientY,
        resizeHandle: null,
        startWidth: img.width,
        startHeight: img.height,
        imageX: img.x,
        imageY: img.y,
      };
      setIsDragging(true);
    }
  }, [images, getCurrentScale]);

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!dragState.current.id) return;
    const img = images.find((i) => i.id === dragState.current.id);
    if (!img) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    }

    const currentScale = getCurrentScale();
    const mouseX = (clientX - rect.left) / currentScale;
    const mouseY = (clientY - rect.top) / currentScale;

    if (isDragging && !dragState.current.resizeHandle) {
      const newX = mouseX - dragState.current.offsetX;
      const newY = mouseY - dragState.current.offsetY;

      const clampedX = Math.max(
        pageSettings.margin,
        Math.min(pageSettings.width - img.width - pageSettings.margin, newX)
      );
      const clampedY = Math.max(
        pageSettings.margin,
        Math.min(pageSettings.height - img.height - pageSettings.margin, newY)
      );

      setImages((prev) =>
        prev.map((i) =>
          i.id === dragState.current.id ? { ...i, x: clampedX, y: clampedY } : i
        )
      );
    } else if (dragState.current.resizeHandle) {
      const dx = (clientX - dragState.current.startX) / currentScale;
      const dy = (clientY - dragState.current.startY) / currentScale;
      let newWidth = dragState.current.startWidth;
      let newHeight = dragState.current.startHeight;

      const handle = dragState.current.resizeHandle;
      if (handle === "se") {
        newWidth = Math.max(20, dragState.current.startWidth + dx);
        newHeight = Math.max(20, dragState.current.startHeight + dy);
      } else if (handle === "e") {
        newWidth = Math.max(20, dragState.current.startWidth + dx);
      } else if (handle === "s") {
        newHeight = Math.max(20, dragState.current.startHeight + dy);
      }

      if (img.lockedRatio) {
        const ratio = img.aspectRatio;
        if (handle === "se" || handle === "e") {
          newHeight = newWidth / ratio;
        } else if (handle === "s") {
          newWidth = newHeight * ratio;
        }
      }

      setImages((prev) =>
        prev.map((i) =>
          i.id === dragState.current.id ? { ...i, width: newWidth, height: newHeight } : i
        )
      );
    }
  }, [isDragging, images, pageSettings, getCurrentScale]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dragState.current = {
      id: null,
      offsetX: 0,
      offsetY: 0,
      startX: 0,
      startY: 0,
      resizeHandle: null,
      startWidth: 0,
      startHeight: 0,
      imageX: 0,
      imageY: 0,
    };
  }, []);

  // --- Touch & Mouse Events ---
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleMouseMove as any, { passive: false });
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove as any);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // --- Pinch zoom support ---
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
      setLastPinchDist(dist);
      setIsPinching(true);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isPinching && e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
      const scaleFactor = dist / lastPinchDist;
      const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale * scaleFactor));
      setScale(newScale);
      setLastPinchDist(dist);
    }
  }, [isPinching, lastPinchDist, scale]);

  const handleTouchEnd = useCallback(() => {
    setIsPinching(false);
  }, []);

  // --- Rotation Functions ---
  const handleRotate = (id: string, angle: number) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, rotation: (img.rotation + angle) % 360 } : img
      )
    );
  };

  const handleSetRotation = (id: string, angle: number) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, rotation: angle } : img
      )
    );
  };

  const handleSnapRotation = (id: string) => {
    const img = images.find((i) => i.id === id);
    if (!img) return;
    let closest = SNAP_ANGLES[0];
    for (const angle of SNAP_ANGLES) {
      if (Math.abs(angle - img.rotation) < Math.abs(closest - img.rotation)) {
        closest = angle;
      }
    }
    handleSetRotation(id, closest);
    showToast("info", "Rotation Snapped", `Image snapped to ${closest}°`);
  };

  const handleResetRotation = (id: string) => {
    handleSetRotation(id, 0);
    showToast("info", "Rotation Reset", "Image rotation has been reset to 0°");
  };

  // --- Image Actions ---
  const handleUpdateImage = (id: string, updates: Partial<ImageItem>) => {
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, ...updates } : img)));
  };

  const handleDuplicateImage = (id: string) => {
    const img = images.find((i) => i.id === id);
    if (!img) return;
    const newId = generateId();
    setImages((prev) => [
      ...prev,
      {
        ...img,
        id: newId,
        x: img.x + 30,
        y: img.y + 30,
        zIndex: Math.max(...prev.filter(i => i.page === img.page).map((i) => i.zIndex)) + 1,
        loaded: true,
      },
    ]);
    showToast("success", "Image Duplicated", "Image has been duplicated successfully");
  };

  const handleBringForward = (id: string) => {
    setImages((prev) => {
      const pageImgs = prev.filter(i => i.page === currentPage);
      const sorted = [...pageImgs].sort((a, b) => a.zIndex - b.zIndex);
      const idx = sorted.findIndex((i) => i.id === id);
      if (idx === -1 || idx === sorted.length - 1) return prev;
      const swap = sorted[idx + 1];
      return prev.map((img) => {
        if (img.id === id) return { ...img, zIndex: swap.zIndex };
        if (img.id === swap.id) return { ...img, zIndex: sorted[idx].zIndex };
        return img;
      });
    });
  };

  const handleSendBackward = (id: string) => {
    setImages((prev) => {
      const pageImgs = prev.filter(i => i.page === currentPage);
      const sorted = [...pageImgs].sort((a, b) => a.zIndex - b.zIndex);
      const idx = sorted.findIndex((i) => i.id === id);
      if (idx === -1 || idx === 0) return prev;
      const swap = sorted[idx - 1];
      return prev.map((img) => {
        if (img.id === id) return { ...img, zIndex: swap.zIndex };
        if (img.id === swap.id) return { ...img, zIndex: sorted[idx].zIndex };
        return img;
      });
    });
  };

  const handleResetPosition = (id: string) => {
    const img = images.find((i) => i.id === id);
    if (!img) return;
    handleUpdateImage(id, {
      x: pageSettings.margin + 20,
      y: pageSettings.margin + 20,
      rotation: 0,
    });
    showToast("info", "Position Reset", "Image position has been reset");
  };

  // --- Auto-adjust all images on current page ---
  const handleAutoAdjust = useCallback(() => {
    setImages((prev) => autoAdjustImagesOnPage(currentPage, prev));
    showToast("success", "Auto-Adjust Complete", `Images on page ${currentPage} have been arranged in a grid`);
  }, [currentPage, autoAdjustImagesOnPage, showToast]);

  // --- Export ---
  const handleExport = async () => {
    setIsExporting(true);
    try {
      const pages = allPages;
      const canvases: HTMLCanvasElement[] = [];

      const dpiScale = 72 / 300;
      const exportWidth = Math.round(pageSettings.width * dpiScale);
      const exportHeight = Math.round(pageSettings.height * dpiScale);

      for (const pageNum of pages) {
        const canvas = document.createElement("canvas");
        canvas.width = exportWidth;
        canvas.height = exportHeight;
        const ctx = canvas.getContext("2d")!;

        ctx.fillStyle = pageSettings.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const pageImagesData = images.filter((img) => img.page === pageNum);
        
        const imageElements: { img: HTMLImageElement; data: ImageItem }[] = [];
        for (const imgData of pageImagesData) {
          const img = new Image();
          img.src = imgData.url;
          await new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
          imageElements.push({ img, data: imgData });
        }

        for (const { img, data } of imageElements) {
          ctx.save();
          const scaledX = data.x * dpiScale;
          const scaledY = data.y * dpiScale;
          const scaledWidth = data.width * dpiScale;
          const scaledHeight = data.height * dpiScale;
          
          ctx.translate(scaledX + scaledWidth / 2, scaledY + scaledHeight / 2);
          ctx.rotate((data.rotation * Math.PI) / 180);
          ctx.drawImage(img, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
          ctx.restore();
        }

        canvases.push(canvas);
      }

      if (exportFormat === "pdf") {
        const { PDFDocument } = await import("pdf-lib");
        const pdfDoc = await PDFDocument.create();
        
        for (const canvas of canvases) {
          const pngData = canvas.toDataURL("image/png");
          const pngBytes = await fetch(pngData).then((res) => res.arrayBuffer());
          const image = await pdfDoc.embedPng(pngBytes);
          
          const page = pdfDoc.addPage([image.width, image.height]);
          page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
        }

        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(pdfBlob); 
        link.download = `custom-sheet-${Date.now()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        showToast("success", "Export Successful", `PDF exported with ${pages.length} page(s)`);
      } else {
        const mimeType = exportFormat === "jpg" ? "image/jpeg" : "image/png";
        const ext = exportFormat === "jpg" ? "jpg" : "png";
        for (const pageNum of pages) {
          const canvas = document.createElement("canvas");
          canvas.width = pageSettings.width;
          canvas.height = pageSettings.height;
          const ctx = canvas.getContext("2d")!;

          ctx.fillStyle = pageSettings.backgroundColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          const pageImagesData = images.filter((img) => img.page === pageNum);
          
          const imageElements: { img: HTMLImageElement; data: ImageItem }[] = [];
          for (const imgData of pageImagesData) {
            const img = new Image();
            img.src = imgData.url;
            await new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            });
            imageElements.push({ img, data: imgData });
          }

          for (const { img, data } of imageElements) {
            ctx.save();
            ctx.translate(data.x + data.width / 2, data.y + data.height / 2);
            ctx.rotate((data.rotation * Math.PI) / 180);
            ctx.drawImage(img, -data.width / 2, -data.height / 2, data.width, data.height);
            ctx.restore();
          }

          const link = document.createElement("a");
          link.href = canvas.toDataURL(mimeType, 0.95);
          link.download = `custom-sheet-page-${pageNum}.${ext}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        showToast("success", "Export Successful", `${pages.length} page(s) exported as ${exportFormat.toUpperCase()}`);
      }
    } catch (error) {
      console.error("Export error:", error);
      showToast("error", "Export Failed", "Failed to export. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  // --- Navigation ---
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectedId(null);
    }
  };

  // --- Clear All Images with Toast ---
  const handleClearAll = () => {
    setShowClearConfirm(true);
  };

  const confirmClearAll = () => {
    const count = images.length;
    setImages([]);
    setSelectedId(null);
    setCurrentPage(1);
    setImageCache(new Map());
    setShowClearConfirm(false);
    showToast("warning", "All Images Cleared", `${count} image(s) have been removed`);
  };

  const cancelClearAll = () => {
    setShowClearConfirm(false);
  };

  const canvasSize = useMemo(() => {
    const currentScale = getCurrentScale();
    return {
      width: pageSettings.width * currentScale,
      height: pageSettings.height * currentScale,
    };
  }, [pageSettings, getCurrentScale]);

  const selectedImage = images.find((img) => img.id === selectedId);
  const currentPaperSize = PAPER_SIZES[pageSettings.paperSize];
  const currentPageImageCount = images.filter(i => i.page === currentPage).length;
  const hasImages = images.length > 0;

  return (
    <>

    <ArticleSchema />
        <HowToSchema />
        <FAQSchema />
        <BreadcrumbSchema />
      {/* Toast Container */}
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20 py-2 sm:py-6">
        <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
          {/* Header */}
          <div className="mb-3 sm:mb-6">
            <a href="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-all font-medium group text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Tools</span>
            </a>
            <div className="text-center mt-2 sm:mt-4">
              <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white">
               Create Custom Image Sheets Online – Arrange Multiple Images
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
               Create custom image sheets online by arranging multiple photos your way. Resize, move, rotate and organize images on A4, A3 or custom pages, then download as PDF, JPG or PNG.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-3 sm:gap-6">
            {/* Left Panel */}
            <div className="xl:col-span-1 space-y-3 sm:space-y-4 order-2 xl:order-1">
              {/* Upload */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Page {currentPage} • {currentPageImageCount} images
                  </span>
                  <span className="text-xs text-gray-400">
                    Total: {images.length}
                  </span>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  {isUploading ? "Uploading..." : `Upload to Page ${currentPage}`}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleUpload(e.target.files)}
                />
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1.5 text-center">
                  Supports JPG, PNG, WebP
                </p>
                
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={handleAutoAdjust}
                    className="flex-1 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    Auto-Adjust
                  </button>
                  <label className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoAdjustImages}
                      onChange={(e) => setAutoAdjustImages(e.target.checked)}
                      className="w-3.5 h-3.5 accent-green-500"
                    />
                    Auto
                  </label>
                </div>
              </div>

              {/* Page Settings */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
                <h3 className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm mb-2 sm:mb-3 flex items-center gap-2">
                  <Ruler className="w-4 h-4" />
                  Page Settings
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <label className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 block mb-1">Paper Size</label>
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                      {(["a4", "a3", "custom"] as const).map((size) => (
                        <button
                          key={size}
                          onClick={() => handlePaperSizeChange(size)}
                          className={`p-2 sm:p-2.5 rounded-lg border-2 text-center transition-all ${
                            pageSettings.paperSize === size
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md"
                              : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                          }`}
                        >
                          <div className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm">
                            {PAPER_SIZES[size].label}
                          </div>
                          {size !== "custom" && (
                            <div className="text-[8px] sm:text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                              {PAPER_SIZES[size].mm} mm
                            </div>
                          )}
                          {size === "custom" && (
                            <div className="text-[8px] sm:text-[10px] text-gray-400 mt-0.5">Custom</div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {pageSettings.paperSize !== "custom" && (
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-2 sm:p-3">
                      <div className="grid grid-cols-3 gap-1 text-center text-[10px] sm:text-xs">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400 block">mm</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200 text-[10px] sm:text-xs">
                            {currentPaperSize.mm}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400 block">cm</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200 text-[10px] sm:text-xs">
                            {currentPaperSize.cm}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400 block">inches</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200 text-[10px] sm:text-xs">
                            {currentPaperSize.inches}
                          </span>
                        </div>
                      </div>
                      <div className="text-center text-[8px] sm:text-[10px] text-gray-400 mt-1">
                        {pageSettings.width} × {pageSettings.height} px @ 300 DPI
                      </div>
                    </div>
                  )}

                  {pageSettings.paperSize === "custom" && (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 block mb-1">Width (px)</label>
                        <input
                          type="number"
                          value={pageSettings.width}
                          onChange={(e) => setPageSettings({ ...pageSettings, width: parseInt(e.target.value) || 2480 })}
                          className="w-full p-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm"
                          min="100"
                          max="10000"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 block mb-1">Height (px)</label>
                        <input
                          type="number"
                          value={pageSettings.height}
                          onChange={(e) => setPageSettings({ ...pageSettings, height: parseInt(e.target.value) || 3508 })}
                          className="w-full p-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm"
                          min="100"
                          max="10000"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 block mb-1">Margin (px)</label>
                      <input
                        type="number"
                        value={pageSettings.margin}
                        onChange={(e) => setPageSettings({ ...pageSettings, margin: parseInt(e.target.value) || 0 })}
                        className="w-full p-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm"
                        min="0"
                        max="500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 block mb-1">Background</label>
                      <input
                        type="color"
                        value={pageSettings.backgroundColor}
                        onChange={(e) => setPageSettings({ ...pageSettings, backgroundColor: e.target.value })}
                        className="w-full h-9 sm:h-10 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer p-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Controls */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
                {!selectedImage ? (
                  <div className="text-center py-3 sm:py-4">
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                      Select an image on the canvas to adjust its settings
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm flex items-center gap-2 truncate">
                        <FileImage className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate max-w-[80px] sm:max-w-[150px]">{selectedImage.file.name}</span>
                      </h3>
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => handleDuplicateImage(selectedImage.id)}
                          className="p-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 transition-colors"
                          title="Duplicate"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteImage(selectedImage.id)}
                          className="p-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 block mb-1">Width (px)</label>
                        <input
                          type="number"
                          value={Math.round(selectedImage.width)}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            if (val > 0) {
                              handleUpdateImage(selectedImage.id, {
                                width: val,
                                height: selectedImage.lockedRatio ? val / selectedImage.aspectRatio : selectedImage.height,
                              });
                            }
                          }}
                          className="w-full p-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm"
                          min="10"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 block mb-1">Height (px)</label>
                        <input
                          type="number"
                          value={Math.round(selectedImage.height)}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            if (val > 0) {
                              handleUpdateImage(selectedImage.id, {
                                height: val,
                                width: selectedImage.lockedRatio ? val * selectedImage.aspectRatio : selectedImage.width,
                              });
                            }
                          }}
                          className="w-full p-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm"
                          min="10"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <RotateCw className="w-3.5 h-3.5" />
                          Rotation: {Math.round(selectedImage.rotation)}°
                        </label>
                        <button
                          onClick={() => handleResetRotation(selectedImage.id)}
                          className="text-[10px] sm:text-xs text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Reset
                        </button>
                      </div>

                      <input
                        type="range"
                        min="0"
                        max="360"
                        step="1"
                        value={selectedImage.rotation}
                        onChange={(e) => handleSetRotation(selectedImage.id, parseFloat(e.target.value))}
                        className="w-full h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />

                      <div className="flex flex-wrap gap-1">
                        {SNAP_ANGLES.slice(0, 4).map((angle) => (
                          <button
                            key={angle}
                            onClick={() => handleSetRotation(selectedImage.id, angle)}
                            className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[9px] sm:text-xs font-medium transition-colors ${
                              Math.abs(selectedImage.rotation - angle) < 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                            }`}
                          >
                            {angle}°
                          </button>
                        ))}
                      </div>

                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleRotate(selectedImage.id, -15)}
                          className="flex-1 py-1 sm:py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-[9px] sm:text-xs hover:bg-gray-200 transition-colors flex items-center justify-center gap-0.5 sm:gap-1"
                        >
                          <RotateCcw className="w-3 h-3" />
                          -15°
                        </button>
                        <button
                          onClick={() => handleRotate(selectedImage.id, 15)}
                          className="flex-1 py-1 sm:py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-[9px] sm:text-xs hover:bg-gray-200 transition-colors flex items-center justify-center gap-0.5 sm:gap-1"
                        >
                          +15°
                          <RotateCw className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleSnapRotation(selectedImage.id)}
                          className="flex-1 py-1 sm:py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg text-[9px] sm:text-xs hover:bg-purple-200 transition-colors flex items-center justify-center gap-0.5 sm:gap-1"
                        >
                          <RotateCw className="w-3 h-3" />
                          Snap
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <label className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                        <input
                          type="checkbox"
                          checked={selectedImage.lockedRatio}
                          onChange={(e) => handleUpdateImage(selectedImage.id, { lockedRatio: e.target.checked })}
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 accent-blue-500"
                        />
                        Lock Ratio
                      </label>
                      <button
                        onClick={() => handleResetPosition(selectedImage.id)}
                        className="flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-[10px] sm:text-xs hover:bg-gray-200 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Reset
                      </button>
                    </div>

                    <div className="flex gap-1">
                      <button
                        onClick={() => handleBringForward(selectedImage.id)}
                        className="flex-1 py-1 sm:py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-[10px] sm:text-xs hover:bg-indigo-200 transition-colors flex items-center justify-center gap-0.5 sm:gap-1"
                      >
                        <ArrowUp className="w-3 h-3" />
                        Forward
                      </button>
                      <button
                        onClick={() => handleSendBackward(selectedImage.id)}
                        className="flex-1 py-1 sm:py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-[10px] sm:text-xs hover:bg-indigo-200 transition-colors flex items-center justify-center gap-0.5 sm:gap-1"
                      >
                        <ArrowDown className="w-3 h-3" />
                        Backward
                      </button>
                    </div>

                    <button
                      onClick={() => handleDeleteImage(selectedImage.id)}
                      className="w-full py-2 sm:py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm mt-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Image
                    </button>
                  </div>
                )}
              </div>

              {/* Export */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
                <h3 className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm mb-2 sm:mb-3 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex gap-1.5 sm:gap-2">
                    {["pdf", "jpg", "png"].map((format) => (
                      <button
                        key={format}
                        onClick={() => setExportFormat(format as any)}
                        className={`flex-1 py-1 sm:py-1.5 rounded-lg text-[9px] sm:text-xs font-medium transition-colors uppercase ${
                          exportFormat === format
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
                        }`}
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleExport}
                    disabled={isExporting || !hasImages}
                    className="w-full py-2 sm:py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm disabled:opacity-50"
                  >
                    {isExporting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        Exporting...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Export {hasImages ? `${allPages.length} page${allPages.length > 1 ? "s" : ""}` : ""}
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleClearAll}
                    className="w-full py-1.5 sm:py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium rounded-xl hover:bg-red-100 transition-colors text-xs sm:text-sm"
                  >
                    Clear All Images
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel - Canvas */}
            <div className="xl:col-span-3 order-1 xl:order-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-2 sm:p-4 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2 sm:mb-4 pb-2 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => setScale(Math.max(MIN_SCALE, scale - 0.05))}
                      className="p-1 sm:p-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <span className="text-[10px] sm:text-xs font-medium text-gray-600 dark:text-gray-400 min-w-[40px] text-center">
                      {Math.round(scale * 100)}%
                    </span>
                    <button
                      onClick={() => setScale(Math.min(MAX_SCALE, scale + 0.05))}
                      className="p-1 sm:p-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (containerWidth > 0 && containerHeight > 0) {
                          const pageAspect = pageSettings.width / pageSettings.height;
                          const containerAspect = containerWidth / containerHeight;
                          let newScale;
                          if (pageAspect > containerAspect) {
                            newScale = (containerWidth - 40) / pageSettings.width;
                          } else {
                            newScale = (containerHeight - 40) / pageSettings.height;
                          }
                          setScale(Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale)));
                        }
                      }}
                      className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 transition-colors text-[9px] sm:text-xs"
                    >
                      Fit
                    </button>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                      {images.length} img | {currentPage}/{allPages.length}
                    </span>
                    <button
                      onClick={addNewPage}
                      className="p-1 sm:p-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 transition-colors"
                      title="Add new page"
                    >
                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>

                {/* Page Navigation */}
                {allPages.length > 0 && (
                  <div className="flex items-center gap-0.5 sm:gap-1 mb-2 sm:mb-4 overflow-x-auto pb-1 sm:pb-2">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-1 sm:p-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 flex-shrink-0"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <div className="flex gap-0.5 sm:gap-1 overflow-x-auto flex-1 justify-center">
                      {allPages.map((page) => {
                        const pageImageCount = images.filter(i => i.page === page).length;
                        return (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-medium transition-colors flex-shrink-0 flex items-center gap-0.5 sm:gap-1 ${
                              currentPage === page
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
                            }`}
                          >
                            {page}
                            <span className={`text-[8px] sm:text-[9px] ${currentPage === page ? "text-blue-200" : "text-gray-400"}`}>
                              ({pageImageCount})
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === allPages.length}
                      className="p-1 sm:p-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 flex-shrink-0"
                    >
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                )}

                {/* Canvas Container */}
                <div 
                  ref={containerRef}
                  className="overflow-auto flex justify-center items-start p-2 sm:p-4 bg-gray-100 dark:bg-gray-900/50 rounded-xl touch-none"
                  style={{ 
                    minHeight: isMobile ? "400px" : "500px",
                    maxHeight: isMobile ? "80vh" : "75vh",
                    height: "100%",
                    width: "100%",
                    position: "relative",
                    overflowY: "auto",
                    overflowX: "auto",
                    WebkitOverflowScrolling: "touch",
                    touchAction: "pan-x pan-y",
                  }}
                  onMouseLeave={handleMouseUp}
                  onTouchCancel={handleMouseUp}
                  onTouchStart={(e) => {
                    handleTouchStart(e);
                    setIsCanvasFocused(true);
                  }}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={(e) => {
                    handleTouchEnd();
                    setTimeout(() => setIsCanvasFocused(false), 100);
                  }}
                  onClick={() => {
                    if (!isDragging) setSelectedId(null);
                  }}
                >
                  <div
                    ref={canvasRef}
                    className="relative border-2 border-gray-300 dark:border-gray-700 shadow-xl rounded-xl overflow-hidden flex-shrink-0"
                    style={{
                      width: canvasSize.width,
                      height: canvasSize.height,
                      backgroundColor: pageSettings.backgroundColor,
                      flexShrink: 0,
                      minWidth: canvasSize.width,
                      minHeight: canvasSize.height,
                      maxWidth: "100%",
                      maxHeight: "100%",
                      touchAction: "none",
                      position: "relative",
                    }}
                    onClick={(e) => {
                      if (!isDragging) {
                        e.stopPropagation();
                        setSelectedId(null);
                      }
                    }}
                  >
                    {/* Page Background */}
                    <div
                      className="absolute inset-0"
                      style={{ backgroundColor: pageSettings.backgroundColor }}
                    />

                    {/* Margin Guides */}
                    {pageSettings.margin > 0 && (
                      <div
                        className="absolute border-2 border-dashed border-blue-400/30 pointer-events-none"
                        style={{
                          left: pageSettings.margin * getCurrentScale(),
                          top: pageSettings.margin * getCurrentScale(),
                          right: pageSettings.margin * getCurrentScale(),
                          bottom: pageSettings.margin * getCurrentScale(),
                        }}
                      />
                    )}

                    {/* Images */}
                    {pageImages.map((img) => {
                      const currentScale = getCurrentScale();
                      return (
                        <div
                          key={img.id}
                          className={`absolute cursor-move group ${
                            selectedId === img.id ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-transparent" : ""
                          }`}
                          style={{
                            left: img.x * currentScale,
                            top: img.y * currentScale,
                            width: img.width * currentScale,
                            height: img.height * currentScale,
                            transform: `rotate(${img.rotation}deg)`,
                            transformOrigin: "center center",
                            zIndex: img.zIndex,
                            touchAction: "none",
                            position: "absolute",
                          }}
                          onMouseDown={(e) => handleMouseDown(e, img.id)}
                          onTouchStart={(e) => {
                            const touch = e.touches[0];
                            if (touch) {
                              setTouchStartPos({ x: touch.clientX, y: touch.clientY, id: img.id });
                            }
                            handleMouseDown(e, img.id);
                            e.stopPropagation();
                          }}
                          onTouchEnd={(e) => {
                            if (touchStartPos && touchStartPos.id === img.id) {
                              const touch = e.changedTouches[0];
                              if (touch) {
                                const dx = touch.clientX - touchStartPos.x;
                                const dy = touch.clientY - touchStartPos.y;
                                if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
                                  handleImageDoubleTap(e, img.id);
                                }
                              }
                              setTouchStartPos(null);
                            }
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isDragging) {
                              setSelectedId(img.id);
                            }
                          }}
                          onDoubleClick={(e) => {
                            handleImageDoubleTap(e, img.id);
                          }}
                        >
                          <img
                            src={img.url}
                            alt={img.file.name}
                            className="w-full h-full object-contain select-none pointer-events-none"
                            draggable={false}
                            style={{ opacity: img.loaded ? 1 : 0.5 }}
                            loading="lazy"
                          />

                          {!img.loaded && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="animate-spin rounded-full h-4 w-4 sm:h-6 sm:w-6 border-2 border-blue-500 border-t-transparent" />
                            </div>
                          )}

                          {selectedId === img.id && img.loaded && img.rotation !== 0 && (
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[7px] sm:text-[8px] px-1 py-0.5 rounded-full whitespace-nowrap">
                              {Math.round(img.rotation)}°
                            </div>
                          )}

                          {selectedId === img.id && img.loaded && (
                            <>
                              <div
                                className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full cursor-se-resize border-2 border-white shadow-lg touch-none"
                                onMouseDown={(e) => {
                                  e.stopPropagation();
                                  handleMouseDown(e, img.id, "se");
                                }}
                                onTouchStart={(e) => {
                                  e.stopPropagation();
                                  handleMouseDown(e, img.id, "se");
                                }}
                              />
                              <div
                                className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-4 sm:w-3 sm:h-6 bg-blue-500 rounded-full cursor-e-resize border-2 border-white shadow-lg touch-none"
                                onMouseDown={(e) => {
                                  e.stopPropagation();
                                  handleMouseDown(e, img.id, "e");
                                }}
                                onTouchStart={(e) => {
                                  e.stopPropagation();
                                  handleMouseDown(e, img.id, "e");
                                }}
                              />
                              <div
                                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-2 sm:w-6 sm:h-3 bg-blue-500 rounded-full cursor-s-resize border-2 border-white shadow-lg touch-none"
                                onMouseDown={(e) => {
                                  e.stopPropagation();
                                  handleMouseDown(e, img.id, "s");
                                }}
                                onTouchStart={(e) => {
                                  e.stopPropagation();
                                  handleMouseDown(e, img.id, "s");
                                }}
                              />
                              <div className="hidden sm:flex absolute -top-1 -right-1 sm:-top-2 sm:-right-2 gap-0.5 sm:gap-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDuplicateImage(img.id);
                                  }}
                                  className="p-0.5 sm:p-1 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
                                  title="Duplicate"
                                >
                                  <Copy className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteImage(img.id);
                                  }}
                                  className="p-0.5 sm:p-1 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}

                    {/* Empty State */}
                    {pageImages.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                        <div className="text-center p-4">
                          <FileImage className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 opacity-50" />
                          <p className="text-xs sm:text-sm">No images on this page</p>
                          <p className="text-[10px] sm:text-xs">Upload images to get started</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 text-center flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
                  <span>🖱️ Drag to move</span>
                  <span>📐 Drag corners to resize</span>
                  <span>🔄 Double-tap to rotate 90°</span>
                  <span>📄 {allPages.length} page{allPages.length > 1 ? "s" : ""}</span>
                  {autoAdjustImages && (
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-[8px]">
                      Auto-adjust ON
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ===== HOW TO USE SECTION ===== */}
          <section className="mb-8 md:mb-12 mt-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                  <span className="text-2xl">📋</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  How to Use This Tool
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  {
                    step: "1",
                    icon: "📤",
                    title: "Upload Images",
                    description: "Click 'Upload to Page X' to add images. Supports JPG, PNG, WebP formats. Images are added to the current page."
                  },
                  {
                    step: "2",
                    icon: "✋",
                    title: "Arrange Freely",
                    description: "Drag images to reposition, use corner handles to resize. Lock ratio option maintains aspect ratio while resizing."
                  },
                  {
                    step: "3",
                    icon: "🔄",
                    title: "Rotate & Adjust",
                    description: "Use rotation controls (0-360°) or snap to angles (0°, 45°, 90°). Double-tap on mobile for 90° rotation."
                  },
                  {
                    step: "4",
                    icon: "📄",
                    title: "Export & Download",
                    description: "Choose PDF, JPG, or PNG format. Export single pages or all pages at once with high-quality 300 DPI output."
                  }
                ].map((item) => (
                  <div key={item.step} className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 md:p-5 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base shadow-lg flex-shrink-0">
                        {item.step}
                      </div>
                      <span className="text-2xl md:text-3xl">{item.icon}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm md:text-base mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quick Tips */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">💡</span>
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 text-sm md:text-base">
                      Pro Tips
                    </h4>
                    <ul className="text-blue-700 dark:text-blue-400 text-xs md:text-sm space-y-1 mt-1 list-disc list-inside">
                      <li>Enable "Auto-Adjust" to automatically arrange images in a grid</li>
                      <li>Double-tap an image to rotate 90° clockwise</li>
                      <li>Pinch to zoom on mobile devices</li>
                      <li>Use the "Fit" button to auto-fit the canvas</li>
                      <li>Page navigation buttons show image count per page</li>
                      <li>Delete button is always visible on mobile when image is selected</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Delete Confirmation Modal */}
          <AnimatePresence>
            {showDeleteConfirm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={() => setShowDeleteConfirm(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Delete Image?
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                      This action cannot be undone. The image will be permanently removed.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => confirmDeleteImage(showDeleteConfirm)}
                        className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Clear All Confirmation Modal */}
          <AnimatePresence>
            {showClearConfirm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={cancelClearAll}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Clear All Images?
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                      This will permanently remove all {images.length} image(s) from all pages. This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={cancelClearAll}
                        className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={confirmClearAll}
                        className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Explore All Tools Section */}
          <div className="mb-6 md:mb-8 mt-12">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div>
                <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 dark:text-white`}>
                  Explore All Tools
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                  15+ specialized PDF, image, and document tools
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
                Everything you need to know about Image to A4/A3 Custom Sheet
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "What image formats are supported?",
                  answer: "The tool supports JPG, PNG, and WebP image formats. You can upload multiple images at once and arrange them on your custom sheet."
                },
                {
                  question: "What paper sizes are available?",
                  answer: "You can choose from A4 (210 × 297 mm), A3 (297 × 420 mm), or Custom size. Custom size allows you to set any width and height in pixels at 300 DPI."
                },
                {
                  question: "Can I rotate images?",
                  answer: "Yes! You can rotate images freely from 0° to 360°. There are snap angles (0°, 45°, 90°) and +/-15° buttons for precise control. On mobile, double-tap to rotate 90°."
                },
                {
                  question: "How do I resize an image while keeping its aspect ratio?",
                  answer: "Enable the 'Lock Ratio' checkbox in the image controls. When locked, resizing one dimension automatically adjusts the other to maintain the original aspect ratio."
                },
                {
                  question: "What is the Auto-Adjust feature?",
                  answer: "Auto-Adjust automatically arranges all images on the current page into a neat grid layout. It calculates the optimal grid size based on the page dimensions and margin settings."
                },
                {
                  question: "Can I have multiple pages?",
                  answer: "Yes! You can add new pages using the '+' button in the toolbar. Each page can hold multiple images. Navigate between pages using the page buttons."
                },
                {
                  question: "What export formats are available?",
                  answer: "You can export as PDF, JPG, or PNG. PDF exports all pages as a single document. JPG and PNG export each page as a separate image file."
                },
                {
                  question: "What is the resolution of exported files?",
                  answer: "Export uses 300 DPI (dots per inch) quality. A4 is 2480 × 3508 pixels, A3 is 3508 × 4961 pixels at 300 DPI."
                },
                {
                  question: "Can I duplicate an image?",
                  answer: "Yes, select an image and click the duplicate button (copy icon) or use the duplicate option on the image itself. The duplicate will be offset by 30px."
                },
                {
                  question: "How do I change the background color?",
                  answer: "Use the color picker in the Page Settings panel. The background color applies to the current page and all exported pages."
                },
                {
                  question: "Can I rearrange image layers?",
                  answer: "Yes, use the 'Forward' and 'Backward' buttons in the image controls to change the z-index (stacking order) of selected images."
                },
                {
                  question: "What is the margin guide?",
                  answer: "The margin guide shows a dashed border inside the page. You can adjust the margin size in Page Settings. Images can be placed anywhere on the page."
                },
                {
                  question: "Is my data secure?",
                  answer: "Yes! All processing happens locally in your browser. Your images are never uploaded to any server, ensuring complete privacy and security."
                },
                {
                  question: "Can I use this tool for free?",
                  answer: "Yes, the Image to A4/A3 Custom Sheet tool is completely free to use with no signup or subscription required."
                },
                {
                  question: "How many images can I upload?",
                  answer: "There is no limit! You can upload as many images as you want. Performance may vary based on your device's capabilities and image sizes."
                }
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
        </div>
      </div>
    </>
  );
}