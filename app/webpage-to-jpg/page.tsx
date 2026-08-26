// app/webp-to-jpg/page.tsx
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import JSZip from "jszip";
import { PDFDocument } from "pdf-lib";
import {
  Download,
  ArrowLeft,
  XCircle,
  CheckCircle,
  Image as ImageIcon,
  Sparkles,
  Zap,
  Shield,
  Upload,
  Layers,
  Eye,
  Clock,
  Check,
  ArrowRight,
  Grid,
  X,
  Archive,
  AlertTriangle,
  Smartphone,
  Cpu,
  Monitor,
  FileText,
} from "lucide-react";
import FileUploader from "../components/FileUploader";
import ProgressBar from "../components/ProgressBar";
import { convertWebpToJpg, downloadFile } from "../../utils/imageUtils";
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
  id: "webp-to-jpg",
  name: "WebP to JPG Converter",
  description: "Convert WebP images to JPG format online for free",
  category: "image",
  icon: "🔄",
  color: "from-purple-500 to-pink-500",
  href: "/webp-to-jpg",
  path: "/tools/webp-to-jpg",
};

// ─── 🔥 ALL LIMITS REMOVED ──────────────────────────────────────────
// No limits – unlimited files, unlimited size

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
    id: "webp-to-jpg",
    name: "WebP to JPG",
    description: "Convert WebP images to JPG format",
    category: "image",
    icon: "🔄",
    color: "from-purple-500 to-pink-500",
    href: "/webp-to-jpg",
    path: "/tools/webp-to-jpg",
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
interface ConvertedFile {
  blob: Blob;
  name: string;
  originalFile: File;
  timestamp: number;
}

interface DownloadNotification {
  id: string;
  fileName: string;
  fileCount: number;
  timestamp: Date;
  type: 'single' | 'zip' | 'pdf' | 'multi';
}

// --- Image Preview Component ---
const ImagePreview = ({
  file,
  onRemove,
  status,
  isDownloadable = false,
  filename = "image.jpg",
  index,
  onSingleDownload,
}: {
  file: Blob | File;
  onRemove?: () => void;
  status: string;
  isDownloadable?: boolean;
  filename: string;
  index: number;
  onSingleDownload?: () => void;
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    let url: string | null = null;
    let isMounted = true;

    const loadImage = async () => {
      try {
        if (file && typeof file === 'object' && 'size' in file) {
          url = URL.createObjectURL(file);
          if (isMounted) {
            setImageUrl(url);
            const img = new Image();
            img.onload = () => {
              if (isMounted) setImageLoaded(true);
            };
            img.onerror = () => {
              if (isMounted) setImageError(true);
            };
            img.src = url;
          }
        }
      } catch (error) {
        console.error("Error creating object URL:", error);
        if (isMounted) setImageError(true);
      }
    };

    loadImage();

    return () => {
      isMounted = false;
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [file]);

  const statusColor =
    status && (status.includes("Converted") || status.includes("Screenshot"))
      ? "text-green-600 dark:text-green-400"
      : "text-blue-600 dark:text-blue-400";

  const handleIndividualDownload = () => {
    if (onSingleDownload) {
      onSingleDownload();
    } else {
      downloadFile(file as Blob, filename);
    }
  };

  const renderFallback = () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
      <div className="text-center">
        <ImageIcon className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-1" />
        <span className="text-xs text-gray-500 dark:text-gray-400">No preview</span>
      </div>
    </div>
  );

  return (
    <>
      {previewOpen && imageUrl && !imageError && (
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
                src={imageUrl}
                alt={filename}
                className="rounded-xl shadow-2xl max-w-full max-h-[80vh] object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ y: -5, scale: 1.02 }}
        className="relative group"
      >
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
          <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
            #{index + 1}
          </div>

          <div
            className="relative w-full h-36 mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden cursor-pointer group/image"
            onClick={() => {
              if (imageUrl && !imageError) {
                setPreviewOpen(true);
              }
            }}
          >
            {imageUrl && !imageError ? (
              <img
                src={imageUrl}
                alt={filename}
                className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-500"
                onError={() => setImageError(true)}
              />
            ) : (
              renderFallback()
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/image:translate-x-full transition-transform duration-1000" />
          </div>

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
                  status.includes("Converted") || status.includes("Screenshot") ? "bg-green-500" : "bg-blue-500"
                }`}
              >
                {status}
              </span>
              {file && typeof file === 'object' && 'size' in file && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              )}
            </div>
          </div>

          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
      case 'pdf':
        return `PDF document downloaded with ${fileCount} images`;
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
          : type === 'pdf'
          ? 'from-red-500 to-rose-600'
          : 'from-green-500 to-emerald-600'
      } text-white p-4 rounded-xl shadow-lg mb-2`}
    >
      <div className="flex items-start gap-3">
        {type === 'zip' ? (
          <Archive className="w-5 h-5 mt-0.5 flex-shrink-0" />
        ) : type === 'pdf' ? (
          <FileText className="w-5 h-5 mt-0.5 flex-shrink-0" />
        ) : (
          <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm mb-1">
            {type === 'zip' ? 'ZIP Archive Downloaded! 📦' : 
             type === 'pdf' ? 'PDF Document Downloaded! 📄' : 
             getMessage()}
          </h4>
          {type === 'single' && (
            <p className="text-xs opacity-90 truncate mb-1">{fileName}</p>
          )}
          <p className="text-xs opacity-80 mb-2">
            {type === 'zip' 
              ? `All ${fileCount} files are now in a single ZIP archive`
              : type === 'pdf'
              ? `${fileCount} image${fileCount === 1 ? '' : 's'} combined into one PDF`
              : `${fileCount} file${fileCount === 1 ? '' : 's'} processed`
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
export default function WebpToJpg() {
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [jpgBlobs, setJpgBlobs] = useState<ConvertedFile[]>([]);
  const [showFeatures, setShowFeatures] = useState(true);
  const [downloadNotifications, setDownloadNotifications] = useState<
    DownloadNotification[]
  >([]);
  const [zipDownloading, setZipDownloading] = useState(false);
  const [pdfDownloading, setPdfDownloading] = useState(false);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  // Detect device type (only for display, no limits applied)
  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /mobile|android|iphone|ipad|ipod/.test(userAgent);
      
      if (isMobile || width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  // ─── 🔥 UPDATED: handleFilesSelected – NO LIMITS ───
  const handleFilesSelected = (newFiles: File[]) => {
    const validFiles: File[] = [];
    const errors: string[] = [];

    for (const file of newFiles) {
      // Check if it's a WebP file
      const isWebP = file.type.includes('webp') || file.name.endsWith('.webp');
      
      if (!isWebP) {
        errors.push(`"${file.name}" is not a WebP image.`);
        continue;
      }

      if (file.size === 0) {
        errors.push(`"${file.name}" appears to be empty or corrupted.`);
        continue;
      }

      validFiles.push(file);
    }

    if (errors.length > 0) {
      alert(`Some files were not added:\n${errors.join('\n')}`);
    }
    
    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
      setJpgBlobs([]);
      setShowFeatures(false);
    }
  };

  // Generate unique filename for JPG
  const generateUniqueFileName = (baseName: string, index: number) => {
    const timestamp = new Date().getTime();
    const randomId = Math.random().toString(36).substring(2, 9);
    const cleanBaseName = baseName
      .replace(/\.webp$/i, "")
      .replace(/\.[^/.]+$/, "");
    const sequence = (index + 1).toString().padStart(3, "0");
    return `${cleanBaseName}_converted_${sequence}_${timestamp}_${randomId}.jpg`;
  };

  // Auto-scroll notifications
  useEffect(() => {
    if (notificationsRef.current && downloadNotifications.length > 0) {
      notificationsRef.current.scrollTop =
        notificationsRef.current.scrollHeight;
    }
  }, [downloadNotifications]);

  // ─── 🔥 FIXED: handleConvert – using files[i].name instead of file.name ───
  const handleConvert = async () => {
    if (files.length === 0) return;

    setConverting(true);
    setProgress(0);
    setJpgBlobs([]);
    setShowFeatures(false);
    setProcessingError(null);

    try {
      const blobs: ConvertedFile[] = [];

      for (let i = 0; i < files.length; i++) {
        try {
          const file = files[i];
          const blob = await convertWebpToJpg(file);

          if (!blob || blob.size === 0) {
            throw new Error(`Conversion resulted in empty file for "${file.name}"`);
          }

          const baseName = file.name
            .replace(/\.webp$/i, '')
            .replace(/\.[^/.]+$/, '');
          const uniqueFilename = generateUniqueFileName(baseName, i);

          blobs.push({
            blob: blob,
            name: uniqueFilename,
            originalFile: file,
            timestamp: Date.now(),
          });

          setProgress(((i + 1) / files.length) * 100);
        } catch (error) {
          // FIXED: Use files[i].name instead of file.name
          console.error(`Error converting ${files[i].name}:`, error);
          throw new Error(`Failed to convert "${files[i].name}". Please try again.`);
        }
      }
      
      setJpgBlobs(blobs);
    } catch (error: any) {
      console.error("Conversion error:", error);
      setProcessingError(error.message || "Failed to convert files to JPG. Please try again.");
      alert(error.message || "Failed to convert files to JPG. Please try again.");
    } finally {
      setConverting(false);
    }
  };

  const handleDownloadAllAsZip = async () => {
    if (jpgBlobs.length === 0) return;

    setZipDownloading(true);
    try {
      const zip = new JSZip();
      
      jpgBlobs.forEach((item, index) => {
        zip.file(item.name, item.blob);
      });

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const zipName = `converted_images_${new Date().getTime()}.zip`;
      downloadFile(zipBlob, zipName);

      const notification: DownloadNotification = {
        id: Math.random().toString(36).substring(7),
        fileName: zipName,
        fileCount: jpgBlobs.length,
        timestamp: new Date(),
        type: 'zip',
      };
      setDownloadNotifications((prev) => [...prev, notification]);

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

  // PDF generation using pdf-lib
  const handleDownloadAsPDF = async () => {
    if (jpgBlobs.length === 0) return;

    setPdfDownloading(true);
    try {
      const pdfDoc = await PDFDocument.create();
      
      for (let i = 0; i < jpgBlobs.length; i++) {
        const item = jpgBlobs[i];
        const arrayBuffer = await item.blob.arrayBuffer();
        const image = await pdfDoc.embedJpg(arrayBuffer);
        
        const imgWidth = image.width;
        const imgHeight = image.height;
        
        const pageWidth = 595.28;
        const pageHeight = 841.89;
        const margin = 28.35;
        
        const maxWidth = pageWidth - (margin * 2);
        const maxHeight = pageHeight - (margin * 2);
        
        let finalWidth = maxWidth;
        let finalHeight = (maxWidth / imgWidth) * imgHeight;
        
        if (finalHeight > maxHeight) {
          finalHeight = maxHeight;
          finalWidth = (maxHeight / imgHeight) * imgWidth;
        }
        
        const x = (pageWidth - finalWidth) / 2;
        const y = (pageHeight - finalHeight) / 2;
        
        const page = pdfDoc.addPage([pageWidth, pageHeight]);
        page.drawImage(image, {
          x: x,
          y: y,
          width: finalWidth,
          height: finalHeight,
        });
      }
      
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: false,
      });
      
      const arrayBuffer = new ArrayBuffer(pdfBytes.length);
      const view = new Uint8Array(arrayBuffer);
      view.set(pdfBytes);
      
      const pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' });
      const pdfName = `converted_images_${new Date().getTime()}.pdf`;
      
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = pdfName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      const notification: DownloadNotification = {
        id: Math.random().toString(36).substring(7),
        fileName: pdfName,
        fileCount: jpgBlobs.length,
        timestamp: new Date(),
        type: 'pdf',
      };
      setDownloadNotifications((prev) => [...prev, notification]);

      setTimeout(() => {
        setDownloadNotifications((prev) =>
          prev.filter((n) => n.id !== notification.id)
        );
      }, 5000);
    } catch (error) {
      console.error("PDF creation error:", error);
      alert("Failed to create PDF. Please try again.");
    } finally {
      setPdfDownloading(false);
    }
  };

  const handleDownloadAllSeparate = () => {
    jpgBlobs.forEach((item) => {
      downloadFile(item.blob, item.name);
    });

    const notification: DownloadNotification = {
      id: Math.random().toString(36).substring(7),
      fileName: jpgBlobs.length === 1 ? jpgBlobs[0].name : "Multiple files",
      fileCount: jpgBlobs.length,
      timestamp: new Date(),
      type: jpgBlobs.length === 1 ? 'single' : 'multi',
    };
    setDownloadNotifications((prev) => [...prev, notification]);

    setTimeout(() => {
      setDownloadNotifications((prev) =>
        prev.filter((n) => n.id !== notification.id)
      );
    }, 5000);
  };

  const handleSingleDownload = (index: number) => {
    const item = jpgBlobs[index];
    if (!item) return;

    downloadFile(item.blob, item.name);

    const notification: DownloadNotification = {
      id: Math.random().toString(36).substring(7),
      fileName: item.name,
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
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
    setJpgBlobs([]);
  };

  const handleReset = () => {
    setFiles([]);
    setJpgBlobs([]);
    setProgress(0);
    setShowFeatures(true);
    setProcessingError(null);
  };

  const hasFiles = files.length > 0;
  const hasResults = jpgBlobs.length > 0;
  const isReadyToConvert = hasFiles && !hasResults && !converting;
  const totalSize = files.reduce((acc, file) => acc + file.size, 0);

  const convertedTotalSize = jpgBlobs.reduce(
    (acc, item) => acc + item.blob.size,
    0
  );
  const sizeReduction =
    totalSize > 0
      ? (((totalSize - convertedTotalSize) / totalSize) * 100).toFixed(1)
      : "0";

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

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 py-6 sm:py-8 md:py-12">
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
                className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-all font-medium group mb-3 sm:mb-6"
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

                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-2 sm:mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent px-2">
                  WebP to JPG Converter Free – Convert WebP Images Online | PDFSwift
                </h1>

                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
                  Upload WebP images and convert them to JPG format instantly. 
                  Fast, secure, and browser-based. Download individually, as ZIP, or as PDF.
                  <span className="block text-purple-600 dark:text-purple-400 font-medium mt-1 text-xs sm:text-sm md:text-base">
                    No limits • Unlimited files • Any size
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
                      icon: Zap,
                      title: "Unlimited Conversions",
                      desc: "Convert unlimited WebP files to JPG format with no restrictions",
                      gradient: "from-purple-500 to-pink-600",
                      bg: "from-purple-50 to-pink-50",
                      border: "border-purple-200",
                    },
                    {
                      icon: FileText,
                      title: "Export as PDF",
                      desc: "Combine all converted JPG images into a single PDF document",
                      gradient: "from-red-500 to-rose-600",
                      bg: "from-red-50 to-rose-50",
                      border: "border-red-200",
                    },
                    {
                      icon: Shield,
                      title: "Secure & Private",
                      desc: "All processing happens in your browser. Your files stay private and secure.",
                      gradient: "from-indigo-500 to-purple-600",
                      bg: "from-indigo-50 to-purple-50",
                      border: "border-indigo-200",
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

            {/* --- Main Converter Card --- */}
            <div className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-lg sm:shadow-xl md:shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
              {/* Upload Section */}
              <div className="mb-4 sm:mb-6 md:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg sm:rounded-xl">
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      Upload WebP Images
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Select unlimited WebP files to convert to JPG format – No limits, any size
                    </p>
                  </div>
                </div>

                {/* ─── 🔥 UPDATED: FileUploader – unlimited ─── */}
                <div className="mb-6">
                  <FileUploader
                    accept="image/webp"
                    multiple={true}
                    onFilesSelected={handleFilesSelected}
                  />
                </div>

                {hasFiles && (
                  <div className="text-center mb-6">
                    <div className="inline-flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg sm:rounded-full">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400" />
                        <span className="font-medium text-purple-700 dark:text-purple-300">
                          {files.length} WebP files selected
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
                        <span>
                          • {(totalSize / 1024 / 1024).toFixed(2)} MB total
                        </span>
                        <span className="flex items-center gap-1">
                          • <Monitor className="w-3 h-3" /> Unlimited
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* --- File Previews and Conversion Area --- */}
              {hasFiles && (
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                  {/* --- Input WebP Previews --- */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                        Uploaded WebP Files ({files.length})
                      </h3>
                      <button
                        onClick={handleReset}
                        className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg sm:rounded-xl transition-colors"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-950/20 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-gray-200 dark:border-gray-700">
                      {files.map((file, index) => (
                        <ImagePreview
                          key={index}
                          file={file}
                          filename={file.name}
                          onRemove={() => handleRemoveFile(index)}
                          status="WebP Ready"
                          index={index}
                        />
                      ))}
                    </div>
                  </div>

                  {/* --- Progress and Action Buttons --- */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Processing Error */}
                    {processingError && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                          <div>
                            <h4 className="font-medium text-red-800 dark:text-red-300">Processing Error</h4>
                            <p className="text-sm text-red-600 dark:text-red-400">{processingError}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {converting && (
                      <div className="space-y-3 sm:space-y-4">
                        <ProgressBar
                          progress={progress}
                          label={`Converting ${files.length} WebP files to JPG...`}
                        />
                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-purple-600 dark:text-purple-400">
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                          <span className="text-xs sm:text-sm font-medium">
                            Processing your WebP files...
                          </span>
                        </div>
                      </div>
                    )}

                    {isReadyToConvert && (
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleConvert}
                        className="w-full py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3"
                      >
                        <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        Convert {files.length} WebP to JPG
                      </motion.button>
                    )}
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
                      Conversion Complete! 🎉
                    </h2>
                    <p className="text-green-700 dark:text-green-300 font-medium text-sm sm:text-base">
                      Successfully converted {files.length} WebP files to JPG format
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-1">
                      {sizeReduction}% average size change • Choose your download option below
                    </p>
                  </div>
                  <div className="flex items-center justify-center mt-2 sm:mt-0">
                    <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base">
                      {jpgBlobs.length} Files
                    </div>
                  </div>
                </div>

                {/* --- Output JPG Previews --- */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 md:mb-8">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    Converted JPG Images
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto p-3 sm:p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-green-100 dark:border-green-800/30">
                    {jpgBlobs.map((item, index) => (
                      <ImagePreview
                        key={index}
                        file={item.blob}
                        filename={item.name}
                        status="Converted ✓"
                        isDownloadable={true}
                        index={index}
                        onSingleDownload={() => handleSingleDownload(index)}
                      />
                    ))}
                  </div>
                </div>

                {/* --- Download Options Section --- */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
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
                          Download ZIP
                        </>
                      )}
                    </motion.button>

                    {/* Download as PDF Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownloadAsPDF}
                      disabled={pdfDownloading}
                      className={`w-full py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold sm:font-extrabold rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3 ${
                        pdfDownloading ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {pdfDownloading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                          Creating PDF...
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                          Download as PDF
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
                      Download All Separately
                    </motion.button>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium hover:bg-purple-50 dark:hover:bg-purple-950/30 rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm md:text-base"
                    >
                      <ImageIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                      Convert More Images
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- Stats Footer --- */}
            {(hasFiles || hasResults) && (
              <div className="mt-6 sm:mt-10 md:mt-14">
                <div className="max-w-6xl mx-auto px-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                    {[
                      {
                        value: files.length,
                        label: "Files Uploaded",
                        color: "text-purple-600",
                        bg: "bg-purple-50 dark:bg-purple-900/10",
                      },
                      {
                        value: `${(totalSize / 1024 / 1024).toFixed(1)} MB`,
                        label: "Total Size",
                        color: "text-blue-600",
                        bg: "bg-blue-50 dark:bg-blue-900/10",
                      },
                      {
                        value: jpgBlobs.length,
                        label: "Files Converted",
                        color: "text-green-600",
                        bg: "bg-green-50 dark:bg-green-900/10",
                      },
                      {
                        value: "Unlimited",
                        label: "Device Mode",
                        color: "text-emerald-600",
                        bg: "bg-emerald-50 dark:bg-emerald-900/10",
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

            {/* --- How to Section --- */}
            <section
              id="how-to-webp-to-jpg"
              className="mt-20 scroll-mt-24"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10">
                How to Convert WebP to JPG Online
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
                {[
                  {
                    step: 1,
                    title: "Upload WebP Images",
                    description: "Select WebP images from your device",
                  },
                  {
                    step: 2,
                    title: "Review Selection",
                    description: "Preview uploaded WebP images",
                  },
                  {
                    step: 3,
                    title: "Convert to JPG",
                    description: "Click convert to transform WebP to JPG",
                  },
                  {
                    step: 4,
                    title: "Preview Results",
                    description: "Check converted JPG images quality",
                  },
                  {
                    step: 5,
                    title: "Download",
                    description: "Download as ZIP, PDF, or individual files",
                  },
                ].map((item, index) => (
                  <div key={index} className="border rounded-xl p-4 sm:p-6 text-center shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition">
                    <div className="text-3xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">{item.step}</div>
                    <h3 className="font-semibold text-base sm:text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                      {item.description}
                    </p>
                  </div>
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

              {/* FAQ Section */}
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
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}