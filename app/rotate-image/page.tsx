"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Head from 'next/head';
import { motion, AnimatePresence } from "framer-motion";
import JSZip from "jszip";
import {
  Download,
  ArrowLeft,
  XCircle,
  CheckCircle,
  Image,
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
  RotateCw,
  RotateCcw,
  RefreshCw,
  Rotate3D,
  Undo,
} from "lucide-react";
import FileUploader from "../components/FileUploader";
import ProgressBar from "../components/ProgressBar";
import { rotateImage, downloadFile } from "../../utils/imageUtils";
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
  id: "rotate-image",
  name: "Rotate Image",
  description: "Rotate JPG, PNG, WebP images",
  category: "image",
  icon: "↻",
  color: "from-blue-500 to-cyan-500",
  href: "/rotate-image",
  path: "/tools/rotate-image",
};

// Explore All Tools Data
const exploreTools: Tool[] = [
  {
    id: "word-to-pdf",
    name: "Word to PDF",
    description: "Convert Word to PDF",
    category: "pdf",
    icon: "📄",
    color: "from-blue-500 to-cyan-500",
    href: "/word-to-pdf",
    path: "/tools/word-to-pdf",
  },
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
    id: "rotate-image",
    name: "Rotate Image",
    description: "Rotate JPG, PNG, WebP images",
    category: "image",
    icon: "↻",
    color: "from-blue-500 to-cyan-500",
    href: "/rotate-image",
    path: "/tools/rotate-image",
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

// --- Component Interface ---
interface RotatedFile {
  blob: Blob;
  name: string;
  originalFile: File;
  timestamp: number;
  rotation: number;
  currentRotation: number; // Add current rotation for dynamic updates
}

interface DownloadNotification {
  id: string;
  fileName: string;
  fileCount: number;
  timestamp: Date;
  type: 'single' | 'zip' | 'multi';
}

// Rotation Options
const rotationOptions = [
  { degrees: 90, label: "90° Clockwise", icon: RotateCw },
  { degrees: 180, label: "180°", icon: RefreshCw },
  { degrees: 270, label: "90° Counter-clockwise", icon: RotateCcw },
];

// --- Image Preview Component ---
const ImagePreview = ({
  file,
  onRemove,
  status,
  isDownloadable = false,
  filename = "image.jpg",
  index,
  onSingleDownload,
  rotation = 0,
  currentRotation = 0,
  onRotateChange,
  isRotating = false,
  onApplyRotation,
  showApplyButton = false,
}: {
  file: Blob | File;
  onRemove?: () => void;
  status: string;
  isDownloadable?: boolean;
  filename: string;
  index: number;
  onSingleDownload?: () => void;
  rotation?: number;
  currentRotation?: number;
  onRotateChange?: (rotation: number) => void;
  isRotating?: boolean;
  onApplyRotation?: () => void;
  showApplyButton?: boolean;
}) => {
  const url = useMemo(() => createObjectURL(file), [file]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [rotationDegrees, setRotationDegrees] = useState(currentRotation);

  // Clean up the object URL when the component unmounts
  useMemo(() => {
    return () => revokeObjectURL(url);
  }, [url]);

  const statusColor =
    status && status.includes("Rotated")
      ? "text-green-600 dark:text-green-400"
      : "text-blue-600 dark:text-blue-400";

  const handleIndividualDownload = () => {
    if (onSingleDownload) {
      onSingleDownload();
    } else {
      downloadFile(file as Blob, filename);
    }
  };

  const handleRotate = (degrees: number) => {
    const newRotation = (rotationDegrees + degrees) % 360;
    setRotationDegrees(newRotation);
    if (onRotateChange) {
      onRotateChange(newRotation);
    }
  };

  const resetRotation = () => {
    setRotationDegrees(0);
    if (onRotateChange) {
      onRotateChange(0);
    }
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
        {/* ❌ CLOSE BUTTON — IMAGE SE JUST UPAR */}
        <button
          onClick={() => setPreviewOpen(false)}
          className="absolute -top-12 right-0 z-50 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
        >
          <XCircle className="w-6 h-6" />
        </button>

        {/* IMAGE CONTAINER */}
        <div className="max-w-4xl max-h-[90vh] flex items-center justify-center">
          <img
            src={url}
            alt={filename}
            className="rounded-xl shadow-2xl max-w-full max-h-[80vh] object-contain"
            style={{
              transform: `rotate(${rotationDegrees}deg)`,
              transition: "transform 0.3s ease",
            }}
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
          {/* Image Number Badge */}
          <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
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
              style={{
                transform: `rotate(${rotationDegrees}deg)`,
                transition: 'transform 0.3s ease'
              }}
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

            <div className="flex items-center justify-between">
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor} bg-opacity-10 ${
                  status.includes("Rotated") ? "bg-green-500" : "bg-blue-500"
                }`}
              >
                {status}
              </span>

              {/* Rotation Info */}
              {rotationDegrees !== 0 && (
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  {rotationDegrees}°
                </span>
              )}
            </div>

            {/* File Size (if available) */}
            {file.size && (
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Size: {(file.size / 1024).toFixed(1)} KB</span>
              </div>
            )}
          </div>

          {/* Rotation Controls for Converted Images */}
          {isDownloadable && onRotateChange && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400">Adjust Rotation:</span>
                <button
                  onClick={resetRotation}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  <Undo className="w-3 h-3" />
                  Reset
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRotate(-90)}
                  disabled={isRotating}
                  className="flex-1 py-1.5 px-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/50 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium flex items-center justify-center gap-1 disabled:opacity-50"
                >
                  <RotateCcw className="w-3 h-3" />
                  -90°
                </button>
                <button
                  onClick={() => handleRotate(90)}
                  disabled={isRotating}
                  className="flex-1 py-1.5 px-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/50 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium flex items-center justify-center gap-1 disabled:opacity-50"
                >
                  <RotateCw className="w-3 h-3" />
                  +90°
                </button>
                <button
                  onClick={() => handleRotate(180)}
                  disabled={isRotating}
                  className="flex-1 py-1.5 px-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/50 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium flex items-center justify-center gap-1 disabled:opacity-50"
                >
                  <RefreshCw className="w-3 h-3" />
                  180°
                </button>
              </div>
              
              {/* Apply Button - दिखेगा जब rotation बदले */}
              {showApplyButton && rotationDegrees !== rotation && onApplyRotation && (
                <motion.button
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={onApplyRotation}
                  disabled={isRotating}
                  className="w-full mt-2 py-1.5 px-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xs font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-1"
                >
                  {isRotating ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                      Applying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-3 h-3" />
                      Apply {rotationDegrees}° Rotation
                    </>
                  )}
                </motion.button>
              )}
            </div>
          )}

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

// --- Download Notification Component ---
const DownloadNotification = ({
  id,
  fileName,
  fileCount,
  timestamp,
  type,
  onClose,
}: DownloadNotification & { onClose: () => void }) => {
  const getMessage = () => {
    switch (type) {
      case 'zip':
        return `ZIP archive downloaded with ${fileCount} files`;
      case 'multi':
        return `${fileCount} files downloaded individually`;
      default:
        return 'File downloaded successfully! 🎉';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className={`bg-gradient-to-r ${
        type === 'zip' 
          ? 'from-purple-500 to-indigo-600' 
          : 'from-green-500 to-emerald-600'
      } text-white p-4 rounded-xl shadow-lg mb-2`}
    >
      <div className="flex items-start gap-3">
        {type === 'zip' ? (
          <Archive className="w-5 h-5 mt-0.5 flex-shrink-0" />
        ) : (
          <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm mb-1">
            {type === 'zip' ? 'ZIP Archive Downloaded! 📦' : getMessage()}
          </h4>
          {type === 'single' && (
            <p className="text-xs opacity-90 truncate mb-1">{fileName}</p>
          )}
          <p className="text-xs opacity-80 mb-2">
            {type === 'zip' 
              ? `All ${fileCount} files are now in a single ZIP archive`
              : `${fileCount} ${fileCount === 1 ? 'image' : 'images'} rotated successfully`
            }
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
export default function RotateImage() {
  const [files, setFiles] = useState<File[]>([]);
  const [rotating, setRotating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rotatedBlobs, setRotatedBlobs] = useState<RotatedFile[]>([]);
  const [showFeatures, setShowFeatures] = useState(true);
  const [downloadNotifications, setDownloadNotifications] = useState<
    DownloadNotification[]
  >([]);
  const [zipDownloading, setZipDownloading] = useState(false);
  const [individualRotating, setIndividualRotating] = useState<number | null>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const [selectedRotation, setSelectedRotation] = useState<number>(90);
  const [currentRotations, setCurrentRotations] = useState<number[]>([]);

  // Generate unique filename
  const generateUniqueFileName = (baseName: string, index: number, rotation: number) => {
    const timestamp = new Date().getTime();
    const randomId = Math.random().toString(36).substring(2, 9);
    const cleanBaseName = baseName.replace(/\.[^/.]+$/, "");
    const sequence = (index + 1).toString().padStart(3, "0");
    const rotationLabel = rotation === 90 ? "clockwise" : rotation === 270 ? "counterclockwise" : "180";
    return `${cleanBaseName}_rotated_${rotationLabel}_${sequence}_${timestamp}_${randomId}.${baseName.split('.').pop()?.toLowerCase() || 'jpg'}`;
  };

  // Auto-scroll notifications
  useEffect(() => {
    if (notificationsRef.current && downloadNotifications.length > 0) {
      notificationsRef.current.scrollTop =
        notificationsRef.current.scrollHeight;
    }
  }, [downloadNotifications]);

  // Initialize current rotations when files are rotated
  useEffect(() => {
    if (rotatedBlobs.length > 0) {
      setCurrentRotations(rotatedBlobs.map(item => item.rotation));
    }
  }, [rotatedBlobs]);

  const handleRotate = async () => {
    if (files.length === 0) return;

    setRotating(true);
    setProgress(0);
    setRotatedBlobs([]);
    setShowFeatures(false);

    try {
      const blobs: RotatedFile[] = [];
      for (let i = 0; i < files.length; i++) {
        const uniqueFilename = generateUniqueFileName(files[i].name, i, selectedRotation);
        const blob = await rotateImage(files[i], selectedRotation);

        blobs.push({
          blob: blob,
          name: uniqueFilename,
          originalFile: files[i],
          timestamp: Date.now(),
          rotation: selectedRotation,
          currentRotation: selectedRotation,
        });

        // Animate progress smoothly
        setProgress(((i + 1) / files.length) * 100);

        // Small delay for smooth progress animation
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
      setRotatedBlobs(blobs);
    } catch (error) {
      console.error("Rotation error:", error);
      alert("Failed to rotate images. Please try again.");
    } finally {
      setRotating(false);
    }
  };

  const handleIndividualRotation = async (index: number, newRotation: number) => {
    if (index < 0 || index >= rotatedBlobs.length) return;

    setIndividualRotating(index);
    
    try {
      const item = rotatedBlobs[index];
      // Rotate from the original file with new rotation amount
      const newRotationDegrees = newRotation;
      const blob = await rotateImage(item.originalFile, newRotationDegrees);
      
      // Update the rotated file with new blob and rotation
      const updatedBlobs = [...rotatedBlobs];
      updatedBlobs[index] = {
        ...item,
        blob: blob,
        rotation: newRotationDegrees,
        currentRotation: newRotationDegrees,
        name: generateUniqueFileName(item.originalFile.name, index, newRotationDegrees),
      };
      
      setRotatedBlobs(updatedBlobs);
      
      // Update current rotations array
      const updatedRotations = [...currentRotations];
      updatedRotations[index] = newRotationDegrees;
      setCurrentRotations(updatedRotations);
      
      // Show success notification
      const notification: DownloadNotification = {
        id: Math.random().toString(36).substring(7),
        fileName: updatedBlobs[index].name,
        fileCount: 1,
        timestamp: new Date(),
        type: 'single',
      };
      setDownloadNotifications((prev) => [...prev, notification]);
      
      setTimeout(() => {
        setDownloadNotifications((prev) =>
          prev.filter((n) => n.id !== notification.id)
        );
      }, 5000);
      
    } catch (error) {
      console.error("Individual rotation error:", error);
      alert("Failed to rotate individual image. Please try again.");
    } finally {
      setIndividualRotating(null);
    }
  };

  const handleRotationChange = (index: number, newRotation: number) => {
    // Only update the preview rotation, not the actual file
    const updatedRotations = [...currentRotations];
    updatedRotations[index] = newRotation;
    setCurrentRotations(updatedRotations);
  };

  const applyIndividualRotation = async (index: number) => {
    await handleIndividualRotation(index, currentRotations[index]);
  };

  const handleDownloadAllAsZip = async () => {
    if (rotatedBlobs.length === 0) return;

    setZipDownloading(true);
    try {
      const zip = new JSZip();
      
      // Add all rotated files to the zip
      rotatedBlobs.forEach((item, index) => {
        zip.file(item.name, item.blob);
      });

      // Generate zip file
      const zipBlob = await zip.generateAsync({ type: "blob" });
      
      // Create download link
      const zipName = `rotated_images_${new Date().getTime()}.zip`;
      downloadFile(zipBlob, zipName);

      // Add download notification
      const notification: DownloadNotification = {
        id: Math.random().toString(36).substring(7),
        fileName: zipName,
        fileCount: rotatedBlobs.length,
        timestamp: new Date(),
        type: 'zip',
      };
      setDownloadNotifications((prev) => [...prev, notification]);

      // Auto-remove notification after 5 seconds
      setTimeout(() => {
        setDownloadNotifications((prev) =>
          prev.filter((n) => n.id !== notification.id)
        );
      }, 5000);
    } catch (error) {
      console.error("ZIP creation error:", error);
      alert("Failed to create ZIP archive. Please try again.");
    } finally {
      setZipDownloading(false);
    }
  };

  const handleDownloadAllSeparate = () => {
    // Downloads all rotated files individually
    rotatedBlobs.forEach((item) => {
      downloadFile(item.blob, item.name);
    });

    // Add download notification
    const notification: DownloadNotification = {
      id: Math.random().toString(36).substring(7),
      fileName: rotatedBlobs.length === 1 ? rotatedBlobs[0].name : "Multiple files",
      fileCount: rotatedBlobs.length,
      timestamp: new Date(),
      type: rotatedBlobs.length === 1 ? 'single' : 'multi',
    };
    setDownloadNotifications((prev) => [...prev, notification]);

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setDownloadNotifications((prev) =>
        prev.filter((n) => n.id !== notification.id)
      );
    }, 5000);
  };

  const handleSingleDownload = (index: number) => {
    const item = rotatedBlobs[index];
    if (!item) return;

    downloadFile(item.blob, item.name);

    // Add download notification
    const notification: DownloadNotification = {
      id: Math.random().toString(36).substring(7),
      fileName: item.name,
      fileCount: 1,
      timestamp: new Date(),
      type: 'single',
    };
    setDownloadNotifications((prev) => [...prev, notification]);

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setDownloadNotifications((prev) =>
        prev.filter((n) => n.id !== notification.id)
      );
    }, 5000);
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
    setRotatedBlobs([]);
  };

  const handleFilesSelected = (newFiles: File[]) => {
    // Add new files to existing files
    setFiles((prev) => [...prev, ...newFiles]);
    setRotatedBlobs([]);
    setShowFeatures(false);
  };

  const handleReset = () => {
    setFiles([]);
    setRotatedBlobs([]);
    setCurrentRotations([]);
    setProgress(0);
    setShowFeatures(true);
  };

  const hasFiles = files.length > 0;
  const hasResults = rotatedBlobs.length > 0;
  const isReadyToRotate = hasFiles && !hasResults && !rotating;
  const totalSize = files.reduce((acc, file) => acc + file.size, 0);

  return (
    <>
      {/* SEO Schema */}
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

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-2 sm:mb-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent px-2">
                  Rotate Image Online – Rotate JPG, PNG & WebP Free
                </h1>

                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
                  Rotate images online for free. Easily rotate JPG, PNG, and WebP images clockwise or counter-clockwise using PDFSwift. No signup required.
                  <span className="block text-blue-600 dark:text-blue-400 font-medium mt-1 text-xs sm:text-sm md:text-base">
                    Supports batch rotation • Dynamic rotation after conversion • Download as ZIP or individual files
                  </span>
                </p>
              </div>
            </div>

            {/* --- Features Grid --- */}
            <AnimatePresence>
              {showFeatures && !hasFiles && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 sm:mb-8 md:mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
                >
                  {[
                    {
                      icon: RotateCw,
                      title: "Multiple Rotations",
                      desc: "Rotate images 90°, 180°, or 270° in either direction with precise control",
                      gradient: "from-blue-500 to-cyan-600",
                      bg: "from-blue-50 to-cyan-50",
                      border: "border-blue-200",
                    },
                    {
                      icon: Rotate3D,
                      title: "Dynamic Adjustment",
                      desc: "Fine-tune rotation after conversion with individual rotation controls for each image",
                      gradient: "from-green-500 to-emerald-600",
                      bg: "from-green-50 to-emerald-50",
                      border: "border-green-200",
                    },
                    {
                      icon: Archive,
                      title: "Batch Processing",
                      desc: "Rotate multiple images at once and download all rotated files as ZIP archive",
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

            {/* --- Main Rotator Card --- */}
            <div className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-lg sm:shadow-xl md:shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
              {/* Upload Section */}
              <div className="mb-4 sm:mb-6 md:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg sm:rounded-xl">
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      Upload Images to Rotate
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Select JPG, PNG, or WebP files to rotate
                    </p>
                  </div>
                </div>

                {/* FileUploader हमेशा दिखेगा */}
                <div className="mb-6">
                  <FileUploader
                    accept="image/*"
                    multiple={true}
                    onFilesSelected={handleFilesSelected}
                  />
                </div>

                {hasFiles && (
                  <div className="text-center mb-6">
                    <div className="inline-flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg sm:rounded-full">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-blue-700 dark:text-blue-300">
                          {files.length} images selected
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                        <span>
                          • {(totalSize / 1024 / 1024).toFixed(2)} MB total
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* --- File Previews and Rotation Area --- */}
              {hasFiles && (
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                  {/* --- Input Image Previews --- */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Image className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                        Uploaded Images
                      </h3>
                      <button
                        onClick={handleReset}
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
                          status="Ready to Rotate"
                          index={index}
                        />
                      ))}
                    </div>
                  </div>

                  {/* --- Progress and Action Buttons --- */}
                  <div className="space-y-4 sm:space-y-6">
                    {rotating && (
                      <div className="space-y-3 sm:space-y-4">
                        <ProgressBar
                          progress={progress}
                          label={`Rotating ${files.length} files...`}
                        />
                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-blue-600 dark:text-blue-400">
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                          <span className="text-xs sm:text-sm font-medium">
                            Rotating your images by {selectedRotation}°...
                          </span>
                        </div>
                      </div>
                    )}

                    {isReadyToRotate && (
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleRotate}
                        className="w-full py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3"
                      >
                        <RotateCw className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        Rotate {files.length} Images by {selectedRotation}°
                        <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      </motion.button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* --- Rotation Options --- */}
{hasFiles && !hasResults && (
  <div className="mb-6 sm:mb-8 bg-gradient-to-br from-blue-50 to-cyan-50 
  dark:from-blue-900/20 dark:to-cyan-900/20 
  rounded-xl p-3 sm:p-4 border border-blue-200 dark:border-blue-700">

    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
      <RotateCw className="w-4 h-4 text-blue-500" />
      Select Rotation Angle
    </h3>

    {/* Options Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {rotationOptions.map((option) => {
        const Icon = option.icon;
        const active = selectedRotation === option.degrees;

        return (
          <button
            key={option.degrees}
            onClick={() => setSelectedRotation(option.degrees)}
            className={`relative rounded-lg border transition-all p-3 flex flex-col items-center gap-2
              ${active
                ? "border-blue-500 bg-white dark:bg-gray-900 shadow-sm"
                : "border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 hover:border-blue-300"
              }`}
          >
            {/* Icon */}
            <div
              className={`p-2 rounded-md ${
                active
                  ? "bg-gradient-to-r from-blue-500 to-cyan-600"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  active ? "text-white" : "text-gray-600 dark:text-gray-400"
                }`}
              />
            </div>

            {/* Degree */}
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              {option.degrees}°
            </div>

            {/* Label */}
            <div className="text-[11px] text-gray-500 dark:text-gray-400">
              {option.label}
            </div>

            {/* Active dot */}
            {active && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
            )}
          </button>
        );
      })}
    </div>

    {/* Selected Info */}
    <div className="mt-4 flex items-center gap-3 p-3 rounded-lg bg-white/70 dark:bg-gray-900/70 border border-blue-200 dark:border-blue-700">
      <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/30">
        <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
          Selected Rotation: {selectedRotation}°
        </p>
        <p className="text-xs text-blue-600 dark:text-blue-400">
          {files.length} image{files.length > 1 ? "s" : ""} will be rotated
        </p>
      </div>
    </div>
  </div>
)}

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
                      Rotation Complete! 🎉
                    </h2>
                    <p className="text-green-700 dark:text-green-300 font-medium text-sm sm:text-base">
                      Successfully rotated {files.length} images by {selectedRotation}°
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-1">
                      Adjust individual rotations below • All formats preserved • Choose your download option
                    </p>
                  </div>
                  <div className="flex items-center justify-center mt-2 sm:mt-0">
                    <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base">
                      {rotatedBlobs.length} Files
                    </div>
                  </div>
                </div>

                {/* --- Dynamic Rotation Instructions --- */}
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Rotate3D className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
                        Fine-tune Your Rotations
                      </h3>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        Adjust individual image rotations using the controls below each preview.
                        Preview updates in real-time. Click "Apply Rotation" to save changes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* --- Output Rotated Previews --- */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 md:mb-8">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    Rotated Images
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto p-3 sm:p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-green-100 dark:border-green-800/30">
                    {rotatedBlobs.map((item, index) => (
                      <ImagePreview
                        key={index}
                        file={item.blob}
                        filename={item.name}
                        status={`Rotated ${currentRotations[index]}°`}
                        isDownloadable={true}
                        index={index}
                        onSingleDownload={() => handleSingleDownload(index)}
                        rotation={item.rotation}
                        currentRotation={currentRotations[index]}
                        onRotateChange={(newRotation) => handleRotationChange(index, newRotation)}
                        onApplyRotation={() => applyIndividualRotation(index)}
                        isRotating={individualRotating === index}
                        showApplyButton={currentRotations[index] !== item.rotation}
                      />
                    ))}
                  </div>
                </div>

                {/* --- Download Options Section --- */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Download as ZIP Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownloadAllAsZip}
                      disabled={zipDownloading}
                      className={`w-full py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold sm:font-extrabold rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3 ${
                        zipDownloading ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {zipDownloading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                          Creating ZIP...
                        </>
                      ) : (
                        <>
                          <Archive className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                          Download as ZIP Archive ({rotatedBlobs.length} files)
                          <FolderClosed className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5" />
                        </>
                      )}
                    </motion.button>

                    {/* Download All Separately Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownloadAllSeparate}
                      className="w-full py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold sm:font-extrabold rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3"
                    >
                      <Download className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      Download All {rotatedBlobs.length} Files Separately
                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5" />
                    </motion.button>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm md:text-base"
                    >
                      <RotateCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                      Rotate More Images
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- Stats Footer (Card Style) --- */}
{(hasFiles || hasResults) && (
  <div className="mt-6 sm:mt-10 md:mt-14">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {[
          {
            value: files.length,
            label: "Files Uploaded",
            color: "text-blue-600",
            bg: "bg-blue-50 dark:bg-blue-900/10",
          },
          {
            value: `${(totalSize / 1024 / 1024).toFixed(1)} MB`,
            label: "Total Size",
            color: "text-cyan-600",
            bg: "bg-cyan-50 dark:bg-cyan-900/10",
          },
          {
            value: rotatedBlobs.length,
            label: "Files Rotated",
            color: "text-green-600",
            bg: "bg-green-50 dark:bg-green-900/10",
          },
          {
            value: hasResults ? `${(currentRotations.reduce((a, b) => a + b, 0) / currentRotations.length).toFixed(0)}° avg` : `${selectedRotation}°`,
            label: "Rotation Angle",
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
              className={`text-xl sm:text-2xl md:text-3xl xl:text-4xl font-extrabold
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
<section className="max-w-3xl mx-auto my-16 px-4">
  {/* Title */}
  <div className="text-center mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
      Frequently Asked Questions
    </h2>
    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
      Everything you need to know about rotating images online
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
           
          </motion.div>
        </div>
      </div>
    </>
  );
}