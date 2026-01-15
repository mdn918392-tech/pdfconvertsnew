"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";


import Head from 'next/head';

import Link from "next/link";
import {
  Download,
  ArrowRight,
  ArrowLeft,
  X,
  Image as ImageIcon,
  Upload,
  CheckCircle,
  Loader2,
  Maximize2,
  Settings,
  RotateCw,
  Clock,
  FileText,
  ArrowUpDown,
  RotateCcw,
  Grid,
  List,
  GripVertical,
  Move,
  Zap,
  ZapOff,
  Percent,
  Palette,
  Layers,
  Target,
  AlertTriangle,
  RefreshCw,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import FileUploader from "../components/FileUploader";
import ProgressBar from "../components/ProgressBar";
import { imageToPdf } from "../../utils/pdfUtils";
import { downloadFile } from "../../utils/imageUtils";

import type { PaperSize, Orientation } from "../../types";
import BreadcrumbSchema from "./BreadcrumbSchema";
import ArticleSchema from "./ArticleSchema";
import HowToSchema from "./HowToSchema";
import FAQSchema from "./FAQSchema";

interface FileWithPreview {
  file: File;
  previewUrl?: string;
  id: string;
  rotation: number;
  scale: number;
  aspectRatio: "free" | "1:1" | "4:3" | "16:9" | "A4";
  previewError?: boolean;
  compressedSize?: number;
}

interface DownloadNotification {
  id: string;
  fileName: string;
  fileCount: number;
  timestamp: Date;
  fileSize: number;
}

// Compression Quality Options
type CompressionQuality = "custom" | "high" | "medium" | "low" | "none";

const MAX_PAGES_COUNT = 1000;

const simulateProgress = (
  callback: (p: number) => void,
  initial: number,
  final: number,
  durationMs: number
) => {
  const startTime = Date.now();
  const interval = 100;

  const progressId = setInterval(() => {
    const elapsed = Date.now() - startTime;
    let newProgress = initial + ((final - initial) * elapsed) / durationMs;

    if (newProgress >= final) {
      newProgress = final;
      clearInterval(progressId);
    }
    callback(Math.floor(newProgress));
  }, interval);

  return () => clearInterval(progressId);
};

const generatePdfFilename = (
  files: FileWithPreview[],
  paperSize: PaperSize,
  orientation: Orientation,
  reverseOrder: boolean,
  compressionQuality: CompressionQuality,
  customQualityValue?: number
): string => {
  const now = new Date();
  const timestamp = now.getTime();
  const randomId = Math.random().toString(36).substring(2, 9);

  const orderSuffix = reverseOrder ? "_reverse" : "";

  let qualitySuffix = "";
  if (compressionQuality === "custom" && customQualityValue !== undefined) {
    qualitySuffix = `_${customQualityValue}%`;
  } else if (compressionQuality !== "none") {
    qualitySuffix = `_${compressionQuality}`;
  } else {
    qualitySuffix = "_original";
  }

  if (files.length === 1) {
    const originalName = files[0].file.name.split(".")[0];
    return `${originalName}_${paperSize}${qualitySuffix}_${timestamp}_${randomId}${orderSuffix}.pdf`;
  } else {
    return `images_${files.length}_pages_${paperSize}${qualitySuffix}_${timestamp}_${randomId}${orderSuffix}.pdf`;
  }
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
  id: "jpg-to-pdf",
  name: "JPG to PDF",
  description: "Convert JPG images to PDF documents",
  category: "pdf",
  icon: "📄",
  color: "from-blue-500 to-cyan-500",
  href: "/jpg-to-pdf",
  path: "/tools/jpg-to-pdf",
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

// Enhanced compression function with quality options and white background
const compressImageForPdf = async (
  file: File,
  rotation: number = 0,
  quality: CompressionQuality = "medium",
  customQualityValue: number = 85
): Promise<File> => {
  return new Promise((resolve, reject) => {
    // If quality is "none", return original file
    if (quality === "none") {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;

      img.onload = () => {
        // Calculate dimensions based on quality setting
        let maxDimension = 4096;
        let qualityValue = 1.0;
        let additionalScale = 1.0;

        switch (quality) {
          case "custom":
            maxDimension = 4096;
            qualityValue = customQualityValue / 100;
            additionalScale =
              customQualityValue >= 90
                ? 1.0
                : customQualityValue >= 75
                ? 0.95
                : 0.9;
            break;
          case "high":
            maxDimension = 4096;
            qualityValue = 0.95;
            additionalScale = 1.0;
            break;
          case "medium":
            maxDimension = 2048;
            qualityValue = 0.85;
            additionalScale = 0.9;
            break;
          case "low":
            maxDimension = 1024;
            qualityValue = 0.7;
            additionalScale = 0.8;
            break;
        }

        // Calculate scale to fit within max dimension
        let scale = 1;
        const largerDimension = Math.max(img.width, img.height);
        if (largerDimension > maxDimension) {
          scale = maxDimension / largerDimension;
        }

        // Apply additional scale for medium/low quality
        scale *= additionalScale;

        const newWidth = Math.floor(img.width * scale);
        const newHeight = Math.floor(img.height * scale);

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas size based on rotation
        if (rotation === 90 || rotation === 270) {
          canvas.width = newHeight;
          canvas.height = newWidth;
        } else {
          canvas.width = newWidth;
          canvas.height = newHeight;
        }

        if (ctx) {
          // Set white background for the entire canvas
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Set image smoothing for better quality
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";

          // If rotation needed, apply it
          if (rotation !== 0) {
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((rotation * Math.PI) / 180);
            ctx.drawImage(
              img,
              -newWidth / 2,
              -newHeight / 2,
              newWidth,
              newHeight
            );
            ctx.restore();
          } else {
            // No rotation, just draw with scaling
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
          }

          // Use appropriate format
          const outputFormat = file.type.includes("png")
            ? "image/png"
            : "image/jpeg";

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: outputFormat,
                  lastModified: Date.now(),
                });

                // Log compression results
                const compressionRatio = (
                  ((file.size - blob.size) / file.size) *
                  100
                ).toFixed(1);
                const isLarger = blob.size > file.size;

                console.log(
                  `${
                    quality === "custom"
                      ? `${customQualityValue}%`
                      : quality.toUpperCase()
                  } Compression: ${file.name}`
                );
                console.log(
                  `Original: ${(file.size / 1024 / 1024).toFixed(
                    2
                  )}MB → Compressed: ${(blob.size / 1024 / 1024).toFixed(2)}MB`
                );
                console.log(
                  `Change: ${isLarger ? "+" : ""}${compressionRatio}% (${
                    isLarger ? "larger" : "reduced"
                  })`
                );

                resolve(compressedFile);
              } else {
                reject(new Error("Failed to create blob"));
              }
            },
            outputFormat,
            outputFormat === "image/jpeg" ? qualityValue : 0.95
          );
        } else {
          reject(new Error("Failed to get canvas context"));
        }
      };

      img.onerror = () => reject(new Error("Image loading failed"));
    };

    reader.onerror = () => reject(new Error("File reading failed"));
  });
};

const DownloadNotification = ({
  id,
  fileName,
  fileCount,
  timestamp,
  fileSize,
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
        <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-base mb-1">
            PDF Downloaded Successfully! 🎉
          </h4>
          <p className="text-sm opacity-90 truncate mb-1">{fileName}</p>
          <p className="text-xs opacity-80 mb-1">
            {fileCount} image{fileCount !== 1 ? "s" : ""} converted •{" "}
            {(fileSize / (1024 * 1024)).toFixed(2)} MB
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

const FloatingPageCounter = ({
  count,
  reverseOrder,
  compressionQuality,
  customQualityValue,
  showWarning,
}: {
  count: number;
  reverseOrder: boolean;
  compressionQuality: CompressionQuality;
  customQualityValue?: number;
  showWarning: boolean;
}) => {
  if (count === 0) return null;

  const qualityLabels = {
    none: "100% Quality",
    custom: `${customQualityValue}% Quality`,
    high: "High Quality (95%)",
    medium: "Medium Quality (85%)",
    low: "Low Quality (70%)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 z-40 group"
    >
      <div
        className={`flex items-center gap-2 ${
          showWarning
            ? "bg-gradient-to-r from-amber-500 to-orange-600"
            : "bg-gradient-to-r from-blue-500 to-purple-600"
        } text-white px-5 py-4 rounded-xl shadow-lg ${
          showWarning ? "animate-pulse" : ""
        }`}
      >
        {showWarning ? (
          <AlertTriangle className="w-6 h-6 animate-pulse" />
        ) : (
          <FileText className="w-6 h-6" />
        )}
        <div className="text-center">
          <div className="text-3xl font-bold">{count}</div>
          <div className="text-sm opacity-90">Pages</div>
          <div className="text-xs opacity-80 mt-1">
            {qualityLabels[compressionQuality]}
          </div>
          {reverseOrder && (
            <div className="text-xs opacity-80 mt-1 flex items-center justify-center gap-1">
              <ArrowUpDown className="w-3 h-3" />
              Reverse Order
            </div>
          )}
        </div>
      </div>

      <div className="absolute -top-32 right-0 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="font-medium">Total pages: {count}</div>
        <div className="text-xs mt-1">
          Quality: {qualityLabels[compressionQuality]}
        </div>
        {reverseOrder && (
          <div className="text-xs mt-1">• Images in Reverse Order</div>
        )}
        {showWarning && (
          <div className="text-xs mt-1 text-amber-300 font-semibold">
            • Changes detected - Convert Again
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Drag and Drop Component
const DraggableItem = ({
  children,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
}: {
  children: React.ReactNode;
  index: number;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent, fromIndex: number, toIndex: number) => void;
  isDragging: boolean;
}) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index, index)}
      className={`relative ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 cursor-move text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
        <GripVertical className="w-4 h-4" />
      </div>
      {children}
    </div>
  );
};

export default function JpgToPdf() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [paperSize, setPaperSize] = useState<PaperSize>("A4");
  const [orientation, setOrientation] = useState<Orientation>("Portrait");
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [expandedImage, setExpandedImage] = useState<{
    url: string;
    rotation: number;
  } | null>(null);
  const [rotatedUrls, setRotatedUrls] = useState<Record<string, string>>({});
  const [downloadNotifications, setDownloadNotifications] = useState<
    DownloadNotification[]
  >([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [reverseOrder, setReverseOrder] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [compressing, setCompressing] = useState(false);
  const [showCompressionInfo, setShowCompressionInfo] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [compressionQuality, setCompressionQuality] =
    useState<CompressionQuality>("none");
  const [customQualityValue, setCustomQualityValue] = useState<number>(85);
  const [showChangesWarning, setShowChangesWarning] = useState(false);
  const [originalStateHash, setOriginalStateHash] = useState<string>("");
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Function to calculate hash of current state
  const calculateStateHash = useCallback(() => {
    const state = {
      files: files.map((f) => ({
        id: f.id,
        rotation: f.rotation,
        order: files.indexOf(f),
      })),
      paperSize,
      orientation,
      reverseOrder,
      compressionQuality,
      customQualityValue,
    };
    return JSON.stringify(state);
  }, [
    files,
    paperSize,
    orientation,
    reverseOrder,
    compressionQuality,
    customQualityValue,
  ]);

  // Check for changes when state changes
  useEffect(() => {
    if (
      pdfBlob &&
      originalStateHash &&
      calculateStateHash() !== originalStateHash
    ) {
      setShowChangesWarning(true);
    }
  }, [
    files,
    paperSize,
    orientation,
    reverseOrder,
    compressionQuality,
    customQualityValue,
    pdfBlob,
    originalStateHash,
    calculateStateHash,
  ]);

  useEffect(() => {
    setIsClient(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (notificationsRef.current && downloadNotifications.length > 0) {
      notificationsRef.current.scrollTop =
        notificationsRef.current.scrollHeight;
    }
  }, [downloadNotifications]);

  useEffect(() => {
    const currentFiles = files;

    return () => {
      currentFiles.forEach((file) => {
        if (file.previewUrl) URL.revokeObjectURL(file.previewUrl);
      });
    };
  }, [files]);

  // Handle setting PDF blob and resetting warning
  const setPdfBlobWithState = useCallback(
    (blob: Blob | null) => {
      setPdfBlob(blob);
      if (blob) {
        setOriginalStateHash(calculateStateHash());
        setShowChangesWarning(false);
      } else {
        setOriginalStateHash("");
        setShowChangesWarning(false);
      }
    },
    [calculateStateHash]
  );

  const handleRemoveFile = useCallback(
    (fileToRemove: FileWithPreview) => {
      setFiles((prev) => prev.filter((f) => f.id !== fileToRemove.id));
      if (fileToRemove.previewUrl) URL.revokeObjectURL(fileToRemove.previewUrl);
      if (rotatedUrls[fileToRemove.id]) {
        if (rotatedUrls[fileToRemove.id].startsWith("data:")) {
          URL.revokeObjectURL(rotatedUrls[fileToRemove.id]);
        }
        setRotatedUrls((prev) => {
          const newUrls = { ...prev };
          delete newUrls[fileToRemove.id];
          return newUrls;
        });
      }
      setPdfBlobWithState(null);
      setProgress(0);
    },
    [rotatedUrls, setPdfBlobWithState]
  );

  // Drag and Drop Handlers
  const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, fromIndex: number, toIndex: number) => {
      e.preventDefault();
      if (draggedIndex === null) return;

      const newFiles = [...files];
      const [draggedItem] = newFiles.splice(draggedIndex, 1);
      newFiles.splice(toIndex, 0, draggedItem);

      setFiles(newFiles);
      setDraggedIndex(null);
      setPdfBlobWithState(null);
    },
    [files, draggedIndex, setPdfBlobWithState]
  );

  const handleMoveUp = useCallback(
    (index: number) => {
      if (index <= 0) return;

      const newFiles = [...files];
      [newFiles[index], newFiles[index - 1]] = [
        newFiles[index - 1],
        newFiles[index],
      ];
      setFiles(newFiles);
      setPdfBlobWithState(null);
    },
    [files, setPdfBlobWithState]
  );

  const handleMoveDown = useCallback(
    (index: number) => {
      if (index >= files.length - 1) return;

      const newFiles = [...files];
      [newFiles[index], newFiles[index + 1]] = [
        newFiles[index + 1],
        newFiles[index],
      ];
      setFiles(newFiles);
      setPdfBlobWithState(null);
    },
    [files, setPdfBlobWithState]
  );

  const handleRotateFile = useCallback(
    (id: string, degrees: number) => {
      const file = files.find((f) => f.id === id);
      if (!file || !file.previewUrl) return;

      const newRotation = (file.rotation + degrees) % 360;

      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, rotation: newRotation } : f))
      );

      setPdfBlobWithState(null);

      // Clear rotated URL for this file since rotation changed
      if (rotatedUrls[id]) {
        if (rotatedUrls[id].startsWith("data:")) {
          URL.revokeObjectURL(rotatedUrls[id]);
        }
        setRotatedUrls((prev) => {
          const newUrls = { ...prev };
          delete newUrls[id];
          return newUrls;
        });
      }
    },
    [files, rotatedUrls, setPdfBlobWithState]
  );

  const handleRotateAll = useCallback(
    (degrees: number) => {
      setFiles((prev) =>
        prev.map((file) => ({
          ...file,
          rotation: (file.rotation + degrees) % 360,
        }))
      );

      setPdfBlobWithState(null);

      // Clear all rotated URLs
      Object.values(rotatedUrls).forEach((url) => {
        if (url.startsWith("data:")) {
          URL.revokeObjectURL(url);
        }
      });
      setRotatedUrls({});
    },
    [rotatedUrls, setPdfBlobWithState]
  );

  const handleFilesUpdate = useCallback(
    async (newFiles: File[]) => {
      if (newFiles.length === 0) return;

      setCompressing(true);

      try {
        const filesWithIds: FileWithPreview[] = newFiles.map((file) => ({
          file: file,
          id: Math.random().toString(36).substr(2, 9),
          rotation: 0,
          scale: 1,
          aspectRatio: "free",
          previewError: false,
        }));

        let filesToSet = filesWithIds;

        if (filesWithIds.length > MAX_PAGES_COUNT) {
          alert(
            `Maximum ${MAX_PAGES_COUNT} files allowed. Only first ${MAX_PAGES_COUNT} are used.`
          );
          filesToSet = filesWithIds.slice(0, MAX_PAGES_COUNT);
        }

        // Create preview URLs for new files only
        const filesWithPreviews = filesToSet.map((file) => {
          try {
            const previewUrl = URL.createObjectURL(file.file);
            return { ...file, previewUrl, previewError: false };
          } catch (error) {
            console.error("Failed to create preview URL:", error);
            return { ...file, previewError: true };
          }
        });

        // Add only new files to the existing files
        setFiles((prev) => [...prev, ...filesWithPreviews]);
        setPdfBlobWithState(null);
        setProgress(0);
      } catch (error) {
        console.error("File processing error:", error);
        alert("Error processing files. Please try again.");
      } finally {
        setCompressing(false);
      }
    },
    [setPdfBlobWithState]
  );

  const handleImageError = useCallback((id: string) => {
    setFiles((prev) =>
      prev.map((file) => {
        if (file.id === id) {
          return { ...file, previewError: true };
        }
        return file;
      })
    );
  }, []);

  const handleConvert = async () => {
    if (files.length === 0) return;

    setConverting(true);
    setPdfBlobWithState(null);
    setShowCompressionInfo(true);

    try {
      // Prepare files in current order
      let filesToConvert = [...files];

      // Show compression progress
      setProgress(10);

      // First, compress all images (with rotation applied)
      let cleanup: (() => void) | null = null;
      cleanup = simulateProgress(setProgress, 10, 50, 3000);

      const compressedFiles = await Promise.all(
        filesToConvert.map(async (fileWithPreview, index) => {
          try {
            // Update progress based on file index
            const fileProgress = 10 + (index / filesToConvert.length) * 40;
            setProgress(Math.floor(fileProgress));

            // Compress image with rotation applied
            const compressedFile = await compressImageForPdf(
              fileWithPreview.file,
              fileWithPreview.rotation,
              compressionQuality,
              customQualityValue
            );

            // Calculate compression ratio
            const originalSize = fileWithPreview.file.size;
            const compressedSize = compressedFile.size;
            const compressionRatio = (
              ((originalSize - compressedSize) / originalSize) *
              100
            ).toFixed(1);

            console.log(
              `File ${index + 1}/${filesToConvert.length}: ${
                fileWithPreview.file.name
              }`
            );
            console.log(
              `Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`
            );
            console.log(
              `Compressed: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`
            );
            console.log(`Change: ${compressionRatio}%`);

            return compressedFile;
          } catch (error) {
            console.error(
              `Failed to process image ${fileWithPreview.file.name}:`,
              error
            );
            // If compression fails, use original file
            return fileWithPreview.file;
          }
        })
      );

      if (cleanup) cleanup();

      // Now create PDF with compressed files
      try {
        setProgress(50);
        cleanup = simulateProgress(setProgress, 50, 90, 3000);

        const blob = await imageToPdf(compressedFiles, paperSize, orientation);

        if (cleanup) cleanup();
        setProgress(100);

        setTimeout(() => {
          setPdfBlobWithState(blob);
          setConverting(false);

          // Log final PDF size
          const totalOriginalSize = filesToConvert.reduce(
            (sum, f) => sum + f.file.size,
            0
          );
          const pdfSize = blob.size;
          const totalCompressionRatio = (
            ((totalOriginalSize - pdfSize) / totalOriginalSize) *
            100
          ).toFixed(1);

          console.log(`\n=== PDF Generation Complete ===`);
          console.log(
            `Quality Setting: ${compressionQuality}${
              compressionQuality === "custom" ? ` (${customQualityValue}%)` : ""
            }`
          );
          console.log(
            `Original total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`
          );
          console.log(`Final PDF: ${(pdfSize / 1024 / 1024).toFixed(2)} MB`);
          console.log(`Total change: ${totalCompressionRatio}%`);

          // Hide compression info after 3 seconds
          setTimeout(() => {
            setShowCompressionInfo(false);
          }, 3000);
        }, 500);
      } catch (err) {
        if (cleanup) cleanup();
        throw err;
      }
    } catch (err) {
      console.error("Conversion error:", err);
      alert("Failed to convert images to PDF. Please try again.");
      setProgress(0);
      setConverting(false);
      setShowCompressionInfo(false);
    }
  };

  const handleDownload = () => {
    if (pdfBlob) {
      const filename = generatePdfFilename(
        files,
        paperSize,
        orientation,
        reverseOrder,
        compressionQuality,
        customQualityValue
      );
      downloadFile(pdfBlob, filename);

      const notification: DownloadNotification = {
        id: Math.random().toString(36).substring(7),
        fileName: filename,
        fileCount: files.length,
        timestamp: new Date(),
        fileSize: pdfBlob.size,
      };
      setDownloadNotifications((prev) => [...prev, notification]);

      setTimeout(() => {
        setDownloadNotifications((prev) =>
          prev.filter((n) => n.id !== notification.id)
        );
      }, 5000);
    }
  };

  const toggleReverseOrder = () => {
    setReverseOrder(!reverseOrder);
    setPdfBlobWithState(null);
  };

  // Handle quality change
  const handleCompressionQualityChange = (quality: CompressionQuality) => {
    setCompressionQuality(quality);
    setPdfBlobWithState(null);
  };

  // Handle custom quality change
  const handleCustomQualityChange = (value: number) => {
    setCustomQualityValue(value);
    setPdfBlobWithState(null);
  };

  // Handle paper size change
  const handlePaperSizeChange = (size: PaperSize) => {
    setPaperSize(size);
    setPdfBlobWithState(null);
  };

  // Handle orientation change
  const handleOrientationChange = (orient: Orientation) => {
    setOrientation(orient);
    setPdfBlobWithState(null);
  };

  const displayFiles = reverseOrder ? [...files].reverse() : files;

  const getPageNumber = (displayIndex: number) => {
    return displayIndex + 1;
  };

  const getImageUrl = (file: FileWithPreview) => {
    if (rotatedUrls[file.id]) {
      return rotatedUrls[file.id];
    }
    return file.previewUrl;
  };

  const handleExpandImage = async (file: FileWithPreview) => {
    if (!file.previewUrl || file.previewError) return;

    try {
      if (file.rotation === 0) {
        setExpandedImage({
          url: file.previewUrl,
          rotation: 0,
        });
        return;
      }

      if (!rotatedUrls[file.id]) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
          if (file.rotation === 90 || file.rotation === 270) {
            canvas.width = img.height;
            canvas.height = img.width;
          } else {
            canvas.width = img.width;
            canvas.height = img.height;
          }

          if (ctx) {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((file.rotation * Math.PI) / 180);
            ctx.drawImage(img, -img.width / 2, -img.height / 2);

            const rotatedUrl = canvas.toDataURL("image/jpeg", 0.8);
            setRotatedUrls((prev) => ({
              ...prev,
              [file.id]: rotatedUrl,
            }));
            setExpandedImage({
              url: rotatedUrl,
              rotation: file.rotation,
            });
          }
        };

        img.src = file.previewUrl;
      } else {
        setExpandedImage({
          url: rotatedUrls[file.id],
          rotation: file.rotation,
        });
      }
    } catch (error) {
      console.error("Failed to prepare expanded image:", error);
      setExpandedImage({
        url: file.previewUrl,
        rotation: 0,
      });
    }
  };

  const handleConvertMore = () => {
    files.forEach((file) => {
      if (file.previewUrl) URL.revokeObjectURL(file.previewUrl);
    });

    Object.values(rotatedUrls).forEach((url) => {
      if (url.startsWith("data:")) {
        URL.revokeObjectURL(url);
      }
    });

    setFiles([]);
    setRotatedUrls({});
    setPdfBlobWithState(null);
    setProgress(0);
    setReverseOrder(false);
    setShowCompressionInfo(false);
    setShowChangesWarning(false);
  };

  // Function to handle changes and show warning
  const handleSettingChange = (
    setter: React.Dispatch<React.SetStateAction<any>>,
    value: any
  ) => {
    setter(value);
    if (pdfBlob) {
      setShowChangesWarning(true);
    }
  };

  if (!isClient) return null;

  return (
    <>
     
    
                  <BreadcrumbSchema />
                  

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

      <FloatingPageCounter
        count={files.length}
        reverseOrder={reverseOrder}
        compressionQuality={compressionQuality}
        customQualityValue={customQualityValue}
        showWarning={showChangesWarning}
      />

      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setExpandedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-full max-h-[90vh]"
            >
              <img
                src={expandedImage.url}
                alt="Expanded preview"
                className="max-w-full max-h-[90vh] object-contain rounded-lg bg-white"
                style={{
                  transform:
                    expandedImage.rotation !== 0
                      ? `rotate(${expandedImage.rotation}deg)`
                      : "none",
                }}
                onError={() => setExpandedImage(null)}
              />
            </motion.div>
            <button
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setExpandedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Changes Warning Banner */}
      <AnimatePresence>
        {showChangesWarning && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-amber-500 to-orange-600 text-white p-4 shadow-lg"
          >
            <div className="container mx-auto max-w-7xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 animate-pulse" />
                  <div>
                    <h3 className="font-bold text-lg">Changes Detected!</h3>
                    <p className="text-sm opacity-90">
                      You've made changes to images or settings. Click "Convert
                      Again" to update your PDF.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleConvert}
                  className="px-4 py-2 bg-white text-amber-700 font-semibold rounded-lg hover:bg-amber-50 transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Convert Again
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-gray-900 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-base">Back to Home</span>
            </a>

            <div className="text-center mb-10">
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

              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                JPG to PDF Converter
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Transform images with maximum quality control and professional
                PDF output
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl p-6 md:p-8 mb-8">
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <Upload className="w-6 h-6 text-blue-500" />
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    Upload Images
                  </h2>
                </div>

                <FileUploader
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  multiple={true}
                  onFilesSelected={handleFilesUpdate}
                  maxSize={100}
                />

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Maximum Quality</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Drag & Drop Reorder</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Professional Layout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Precise Control</span>
                  </div>
                </div>

                {compressing && (
                  <div className="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Processing images...</span>
                  </div>
                )}
              </div>

              {files.length > 0 && (
                <div className="space-y-8">
                  {/* Changes Warning Box */}
                  {showChangesWarning && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-amber-800 dark:text-amber-300 mb-1">
                            Changes Detected - Convert Again Required
                          </h3>
                          <p className="text-amber-700 dark:text-amber-400 mb-3">
                            You've made changes to your images or settings. Your
                            current PDF is outdated. Click the button below to
                            convert again with the latest changes.
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={handleConvert}
                              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all shadow-md flex items-center gap-2"
                            >
                              <RefreshCw className="w-4 h-4" />
                              Convert Again with Changes
                            </button>
                            <button
                              onClick={() => setShowChangesWarning(false)}
                              className="px-5 py-2.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                            >
                              Dismiss Warning
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Selected Images Section */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Selected Images ({files.length})
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Drag to reorder • Click to preview • Rotate to adjust
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                        <button
                          onClick={() => setViewMode("grid")}
                          className={`px-3 py-1.5 rounded-md transition-colors ${
                            viewMode === "grid"
                              ? "bg-white dark:bg-gray-700 shadow-sm"
                              : "hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          <Grid className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setViewMode("list")}
                          className={`px-3 py-1.5 rounded-md transition-colors ${
                            viewMode === "list"
                              ? "bg-white dark:bg-gray-700 shadow-sm"
                              : "hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          <List className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex gap-1">
                        <button
                          onClick={() => handleRotateAll(-90)}
                          className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          title="Rotate all counter-clockwise"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRotateAll(90)}
                          className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          title="Rotate all clockwise"
                        >
                          <RotateCw className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={toggleReverseOrder}
                        className={`px-4 py-2 flex items-center gap-2 rounded-xl transition-all text-sm ${
                          reverseOrder
                            ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        <ArrowUpDown className="w-4 h-4" />
                        {reverseOrder ? "Normal Order" : "Reverse Order"}
                      </button>

                      <button
                        onClick={handleConvertMore}
                        className="px-4 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Clear All
                      </button>
                    </div>
                  </div>

                  {/* Images Grid/List View */}
                  <div
                    className={`${
                      viewMode === "grid"
                        ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                        : "space-y-3"
                    }`}
                  >
                    {displayFiles.map((item, displayIndex) => {
                      const pageNumber = getPageNumber(displayIndex);
                      const imageUrl = getImageUrl(item);

                      return (
                        <DraggableItem
                          key={item.id}
                          index={displayIndex}
                          onDragStart={handleDragStart}
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          isDragging={draggedIndex === displayIndex}
                        >
                          <div
                            className={`group relative ${
                              viewMode === "list"
                                ? "flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl ml-6"
                                : ""
                            }`}
                          >
                            {viewMode === "list" && (
                              <div className="flex flex-col gap-1">
                                <button
                                  onClick={() => handleMoveUp(displayIndex)}
                                  disabled={displayIndex === 0}
                                  className="p-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-30"
                                >
                                  <ChevronUp className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => handleMoveDown(displayIndex)}
                                  disabled={displayIndex === files.length - 1}
                                  className="p-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-30"
                                >
                                  <ChevronDown className="w-3 h-3" />
                                </button>
                              </div>
                            )}

                            <div
                              className={`relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 cursor-pointer ${
                                viewMode === "list"
                                  ? "w-20 h-20 flex-shrink-0"
                                  : "aspect-square"
                              }`}
                              onClick={() => handleExpandImage(item)}
                            >
                              {imageUrl && !item.previewError ? (
                                <>
                                  <img
                                    src={imageUrl}
                                    alt={item.file.name}
                                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${
                                      item.rotation !== 0 &&
                                      !rotatedUrls[item.id]
                                        ? "transform"
                                        : ""
                                    }`}
                                    style={
                                      item.rotation !== 0 &&
                                      !rotatedUrls[item.id]
                                        ? {
                                            transform: `rotate(${item.rotation}deg)`,
                                          }
                                        : undefined
                                    }
                                    onError={() => handleImageError(item.id)}
                                    loading="lazy"
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                </>
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center p-3">
                                  <div className="relative mb-2">
                                    <ImageIcon className="w-8 h-8 text-gray-400" />
                                    {item.previewError && (
                                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                                        <X className="w-2 h-2 text-white" />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              <div
                                className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {pageNumber}
                              </div>

                              {item.rotation !== 0 && (
                                <div
                                  className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <RotateCw className="w-2 h-2" />
                                  {item.rotation}°
                                </div>
                              )}
                            </div>

                            {viewMode === "list" && (
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">
                                  {item.file.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {(item.file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRotateFile(item.id, -90);
                                    }}
                                    className="p-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                    title="Rotate counter-clockwise"
                                  >
                                    <RotateCcw className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRotateFile(item.id, 90);
                                    }}
                                    className="p-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                    title="Rotate clockwise"
                                  >
                                    <RotateCw className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveFile(item);
                                    }}
                                    className="p-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/30 rounded-lg transition-colors ml-auto"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            )}

                            {viewMode === "grid" && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveFile(item);
                                  }}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors z-10"
                                  aria-label={`Remove ${item.file.name}`}
                                >
                                  <X className="w-3 h-3" />
                                </button>

                                <div className="absolute bottom-2 left-2 flex gap-1">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRotateFile(item.id, -90);
                                    }}
                                    className="p-1.5 bg-black/70 text-white hover:bg-black/90 rounded-lg transition-colors"
                                    title="Rotate counter-clockwise"
                                  >
                                    <RotateCcw className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRotateFile(item.id, 90);
                                    }}
                                    className="p-1.5 bg-black/70 text-white hover:bg-black/90 rounded-lg transition-colors"
                                    title="Rotate clockwise"
                                  >
                                    <RotateCw className="w-3 h-3" />
                                  </button>
                                </div>

                                {imageUrl && !item.previewError && (
                                  <button
                                    className="absolute bottom-2 right-2 p-1.5 bg-black/70 text-white hover:bg-black/90 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleExpandImage(item);
                                    }}
                                  >
                                    <Maximize2 className="w-3 h-3" />
                                  </button>
                                )}
                              </>
                            )}

                            {reverseOrder && viewMode === "grid" && (
                              <div
                                className="absolute -top-2 -left-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ArrowUpDown className="w-2 h-2" />R
                              </div>
                            )}
                          </div>
                        </DraggableItem>
                      );
                    })}
                  </div>

                  {/* Advanced Settings Section - Always Visible */}
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-850 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-6">
                      <Target className="w-7 h-7 text-blue-500" />
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Quality Control Settings
                      </h3>
                    </div>

                    <div className="space-y-6">
                      {/* Quality Settings */}
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <Palette className="w-4 h-4" />
                          Image Quality Preset
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                          {(
                            [
                              {
                                value: "none",
                                label: "Maximum Quality",
                                icon: ZapOff,
                                desc: "100% Original",
                                color: "from-emerald-500 to-green-600",
                              },
                              {
                                value: "custom",
                                label: "Custom Quality",
                                icon: Percent,
                                desc: "Precise Control",
                                color: "from-blue-500 to-purple-600",
                              },
                              {
                                value: "high",
                                label: "High Quality",
                                icon: Zap,
                                desc: "95% Quality",
                                color: "from-cyan-500 to-blue-600",
                              },
                              {
                                value: "medium",
                                label: "Balanced",
                                icon: Layers,
                                desc: "85% Quality",
                                color: "from-amber-500 to-orange-600",
                              },
                              {
                                value: "low",
                                label: "Small Size",
                                icon: Zap,
                                desc: "70% Quality",
                                color: "from-rose-500 to-pink-600",
                              },
                            ] as const
                          ).map((option) => {
                            const Icon = option.icon;
                            return (
                              <button
                                key={option.value}
                                onClick={() =>
                                  handleCompressionQualityChange(option.value)
                                }
                                className={`px-4 py-4 rounded-xl border transition-all transform hover:scale-[1.02] ${
                                  compressionQuality === option.value
                                    ? `bg-gradient-to-r ${option.color} text-white border-transparent shadow-lg scale-[1.02]`
                                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
                                }`}
                              >
                                <div className="flex flex-col items-center gap-2">
                                  <Icon className="w-6 h-6 mb-1" />
                                  <span className="font-semibold">
                                    {option.label}
                                  </span>
                                  <span className="text-xs opacity-90">
                                    {option.desc}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Custom Quality Slider */}
                        {compressionQuality === "custom" && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-850 rounded-xl border border-blue-200 dark:border-blue-800"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                Custom Quality: {customQualityValue}%
                              </label>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    handleCustomQualityChange(
                                      Math.max(10, customQualityValue - 5)
                                    )
                                  }
                                  className="p-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700"
                                >
                                  <span className="text-sm font-medium">
                                    -5%
                                  </span>
                                </button>
                                <button
                                  onClick={() =>
                                    handleCustomQualityChange(
                                      Math.min(100, customQualityValue + 5)
                                    )
                                  }
                                  className="p-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700"
                                >
                                  <span className="text-sm font-medium">
                                    +5%
                                  </span>
                                </button>
                              </div>
                            </div>
                            <input
                              type="range"
                              min="10"
                              max="100"
                              step="1"
                              value={customQualityValue}
                              onChange={(e) =>
                                handleCustomQualityChange(
                                  parseInt(e.target.value)
                                )
                              }
                              className="w-full h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500"
                            />
                            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-3">
                              <span className="flex flex-col items-center">
                                <span>10%</span>
                                <span className="text-[10px]">Smallest</span>
                              </span>
                              <span className="flex flex-col items-center">
                                <span>50%</span>
                                <span className="text-[10px]">Balanced</span>
                              </span>
                              <span className="flex flex-col items-center">
                                <span>90%</span>
                                <span className="text-[10px]">
                                  High Quality
                                </span>
                              </span>
                              <span className="flex flex-col items-center">
                                <span>100%</span>
                                <span className="text-[10px]">Maximum</span>
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
                              <span className="font-semibold">
                                Higher percentage = Better quality = Larger file
                                size
                              </span>
                            </p>
                          </motion.div>
                        )}
                      </div>

                      {/* Quality Info Bar */}
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-3 mb-2">
                          <Settings className="w-5 h-5 text-blue-500" />
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                            Quality Settings Summary
                          </h4>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                            <div className="font-semibold text-gray-700 dark:text-gray-300">
                              Quality Preset
                            </div>
                            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {compressionQuality === "none"
                                ? "Maximum"
                                : compressionQuality === "custom"
                                ? "Custom"
                                : compressionQuality.charAt(0).toUpperCase() +
                                  compressionQuality.slice(1)}
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                            <div className="font-semibold text-gray-700 dark:text-gray-300">
                              Quality Value
                            </div>
                            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                              {compressionQuality === "none"
                                ? "100%"
                                : compressionQuality === "custom"
                                ? `${customQualityValue}%`
                                : compressionQuality === "high"
                                ? "95%"
                                : compressionQuality === "medium"
                                ? "85%"
                                : "70%"}
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                            <div className="font-semibold text-gray-700 dark:text-gray-300">
                              File Size Impact
                            </div>
                            <div className="text-lg font-bold text-green-600 dark:text-green-400">
                              {compressionQuality === "none"
                                ? "Largest"
                                : compressionQuality === "custom"
                                ? "Variable"
                                : compressionQuality === "high"
                                ? "Large"
                                : compressionQuality === "medium"
                                ? "Medium"
                                : "Small"}
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                            <div className="font-semibold text-gray-700 dark:text-gray-300">
                              Recommended For
                            </div>
                            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              {compressionQuality === "none"
                                ? "Print & Professional"
                                : compressionQuality === "custom"
                                ? "Specific Requirements"
                                : compressionQuality === "high"
                                ? "High-Quality Display"
                                : compressionQuality === "medium"
                                ? "General Use"
                                : "Web & Email"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PDF Settings */}
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-850 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-6">
                      <Settings className="w-6 h-6 text-blue-500" />
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        PDF Output Settings
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Paper Size
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {(["A4", "Letter", "Legal", "A3"] as PaperSize[]).map(
                            (size) => (
                              <button
                                key={size}
                                onClick={() => handlePaperSizeChange(size)}
                                className={`px-4 py-3 rounded-lg border transition-all text-base ${
                                  paperSize === size
                                    ? "bg-blue-500 text-white border-blue-500 shadow-md"
                                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
                                }`}
                              >
                                {size}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Orientation
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => handleOrientationChange("Portrait")}
                            className={`flex items-center justify-center gap-3 px-4 py-3 rounded-lg border transition-all text-base ${
                              orientation === "Portrait"
                                ? "bg-blue-500 text-white border-blue-500 shadow-md"
                                : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
                            }`}
                          >
                            <div className="w-4 h-5 border-2 border-current rounded" />
                            <span>Portrait</span>
                          </button>
                          <button
                            onClick={() => handleOrientationChange("Landscape")}
                            className={`flex items-center justify-center gap-3 px-4 py-3 rounded-lg border transition-all text-base ${
                              orientation === "Landscape"
                                ? "bg-blue-500 text-white border-blue-500 shadow-md"
                                : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
                            }`}
                          >
                            <div className="w-5 h-4 border-2 border-current rounded" />
                            <span>Landscape</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-3">
                            <ArrowUpDown className="w-5 h-5" />
                            Reverse Page Order
                          </label>
                          <button
                            onClick={toggleReverseOrder}
                            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                              reverseOrder
                                ? "bg-purple-600"
                                : "bg-gray-300 dark:bg-gray-700"
                            }`}
                          >
                            <span
                              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                                reverseOrder ? "translate-x-8" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {reverseOrder
                            ? "Images will be arranged in reverse order (last image first)"
                            : "Images will be arranged in normal order (first image first)"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Total Pages:
                          </span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200 ml-2">
                            {files.length}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Paper Size:
                          </span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200 ml-2">
                            {paperSize} ({orientation})
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Quality:
                          </span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200 ml-2">
                            {compressionQuality === "none"
                              ? "100% Maximum"
                              : compressionQuality === "custom"
                              ? `${customQualityValue}% Custom`
                              : compressionQuality === "high"
                              ? "High (95%)"
                              : compressionQuality === "medium"
                              ? "Medium (85%)"
                              : "Low (70%)"}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Page Order:
                          </span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200 ml-2">
                            {reverseOrder ? "Reverse" : "Normal"}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Total Size:
                          </span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200 ml-2">
                            {(
                              files.reduce(
                                (acc, file) => acc + file.file.size,
                                0
                              ) /
                              (1024 * 1024)
                            ).toFixed(2)}{" "}
                            MB
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Expected PDF Size:
                          </span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200 ml-2">
                            {compressionQuality === "none"
                              ? "Large"
                              : compressionQuality === "custom"
                              ? customQualityValue >= 80
                                ? "Large"
                                : customQualityValue >= 50
                                ? "Medium"
                                : "Small"
                              : compressionQuality === "high"
                              ? "Large"
                              : compressionQuality === "medium"
                              ? "Medium"
                              : "Small"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                 

                  {/* Convert/Progress/Download Buttons */}
                  <AnimatePresence mode="wait">
                    {converting && (
                      <motion.div
                        key="converting"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6"
                      >
                        <ProgressBar
                          progress={progress}
                          label={
                            progress < 30
                              ? "Processing images..."
                              : progress < 60
                              ? compressionQuality === "custom"
                                ? `Applying ${customQualityValue}% quality...`
                                : `Applying ${compressionQuality} quality...`
                              : progress < 90
                              ? "Creating professional PDF..."
                              : "Finalizing..."
                          }
                        />
                        <div className="flex items-center justify-center gap-3 mt-4 text-blue-600 dark:text-blue-400">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span className="text-base font-medium">
                            {progress < 30
                              ? "Processing images..."
                              : progress < 60
                              ? compressionQuality === "custom"
                                ? `Applying ${customQualityValue}% quality...`
                                : `Applying ${compressionQuality} quality...`
                              : "Creating professional PDF..."}
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {pdfBlob && !converting && (
                      <motion.div
                        key="download"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mt-6 space-y-6"
                      >
                        <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-850 rounded-2xl border border-green-200 dark:border-emerald-800">
                          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                          <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            Professional PDF Ready! 🎉
                          </h4>
                          <p className="text-base text-gray-600 dark:text-gray-400 mb-4">
                            Your high-quality PDF is ready for download
                            {compressionQuality !== "none" && (
                              <span className="text-blue-600 dark:text-blue-400">
                                {" "}
                                (
                                {compressionQuality === "custom"
                                  ? `${customQualityValue}%`
                                  : compressionQuality}{" "}
                                quality)
                              </span>
                            )}
                          </p>
                          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              File Size:{" "}
                              {(pdfBlob.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                              Pages: {files.length}
                            </span>
                            {compressionQuality !== "none" && (
                              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                                {compressionQuality === "custom"
                                  ? `${customQualityValue}%`
                                  : compressionQuality}{" "}
                                Quality
                              </span>
                            )}
                            <span className="text-purple-600 dark:text-purple-400 font-semibold">
                              Professional Layout
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <button
                            onClick={handleConvertMore}
                            className="py-3 px-6 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium text-base"
                          >
                            Convert More Files
                          </button>
                          <button
                            onClick={handleDownload}
                            className="py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl font-medium flex items-center justify-center gap-3 text-base"
                          >
                            <Download className="w-5 h-5" />
                            Download Professional PDF
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {!pdfBlob && !converting && (
                      <motion.div
                        key="convert"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mt-6"
                      >
                        <button
                          onClick={handleConvert}
                          disabled={files.length === 0}
                          className={`w-full py-4 px-6 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold flex items-center justify-center gap-3 ${
                            showChangesWarning
                              ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 animate-pulse"
                              : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                          }`}
                        >
                          {showChangesWarning ? (
                            <>
                              <RefreshCw className="w-6 h-6" />
                              Convert Again with Changes
                            </>
                          ) : (
                            <>
                              <ImageIcon className="w-6 h-6" />
                              {`Convert ${files.length} Image${
                                files.length !== 1 ? "s" : ""
                              } to Professional PDF`}
                            </>
                          )}
                          {!showChangesWarning &&
                            compressionQuality !== "none" &&
                            ` (${
                              compressionQuality === "custom"
                                ? `${customQualityValue}%`
                                : compressionQuality
                            } quality)`}
                        </button>

                        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                          {showChangesWarning ? (
                            <span className="text-amber-600 dark:text-amber-400 font-semibold">
                              ⚠️ You have made changes to images or settings.
                              Click above to convert again with the latest
                              changes.
                            </span>
                          ) : compressionQuality === "none" ? (
                            "Images will be converted with maximum 100% quality for professional output"
                          ) : (
                            `Images will be converted with ${
                              compressionQuality === "custom"
                                ? `${customQualityValue}%`
                                : compressionQuality
                            } quality for optimal results`
                          )}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {files.length === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                  <div className="inline-flex p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl mb-4">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                    Maximum Quality
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Choose 100% original quality for print-ready PDFs with no
                    compression loss
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                  <div className="inline-flex p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-4">
                    <Move className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                    Professional Reordering
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Drag & drop to arrange images in perfect order for your
                    professional PDF document
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                  <div className="inline-flex p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl mb-4">
                    <Percent className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                    Precise Quality Control
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Custom quality slider from 10% to 100% for perfect balance
                    of size and quality
                  </p>
                </div>
              </div>
            )}
          </motion.div>

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
          </div>
        </div>
      </div>
    </>
  );
}
