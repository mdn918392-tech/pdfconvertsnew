"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import JSZip from "jszip";
import { PDFDocument } from "pdf-lib";
import {
  Download,
  RefreshCw,
  ArrowLeft,
  CheckCircle,
  Image as ImageIcon,
  Sparkles,
  Shield,
  Upload,
  AlertTriangle,
  Trash2,
  FileText,
  Archive,
  X,
  Camera,
} from "lucide-react";
import ProgressBar from "../components/ProgressBar";
import { downloadFile } from "../../utils/imageUtils";
import BreadcrumbSchema from "./BreadcrumbSchema";
import ArticleSchema from "./ArticleSchema";
import HowToSchema from "./HowToSchema";
import FAQSchema from "./FAQSchema";
import { faqData } from "./faqData";

// ─── Types ──────────────────────────────────────────────────────────
interface FileItem {
  id: string;
  file: File | null;
  blob: Blob;
  name: string;
  previewUrl: string;
  error?: string;
  converted?: Blob;
  convertedName?: string;
  status: "pending" | "converting" | "done" | "error";
  isScreenshot?: boolean;
}

interface ConvertedFile {
  blob: Blob;
  name: string;
  originalName: string;
}

interface DownloadNotification {
  id: string;
  fileName: string;
  fileCount: number;
  timestamp: Date;
  type: "single" | "zip" | "pdf" | "multi";
}

// ─── Helpers ──────────────────────────────────────────────────────
async function convertImageToJpg(blob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Canvas context unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (result) => {
          URL.revokeObjectURL(url);
          if (result) resolve(result);
          else reject(new Error("Failed to convert to JPG"));
        },
        "image/jpeg",
        0.92
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

async function captureWebpageScreenshot(url: string): Promise<Blob> {
  const response = await fetch("/api/url-to-jpg", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, width: 1440, mode: "fullPage", quality: 0.92 }),
  });
  if (!response.ok) {
    let errMsg = "Failed to capture screenshot";
    try {
      const data = await response.json();
      errMsg = data.error || errMsg;
    } catch {}
    throw new Error(errMsg);
  }
  return response.blob();
}

const generateScreenshotName = (url: string) => {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 9);
  let domain = "website";
  try {
    const urlObj = new URL(url);
    domain = urlObj.hostname.replace(/^www\./, "");
  } catch {}
  return `${domain}_${timestamp}_${randomId}.jpg`;
};

// ─── Tool metadata ──────────────────────────────────────────────
const tool = {
  id: "url-to-jpg",
  name: "Image & Webpage to JPG",
  description: "Upload images or paste a website URL to get JPG",
  icon: "🖼️",
  color: "from-blue-500 to-cyan-500",
  href: "/url-to-jpg",
};

const exploreTools = [
  {
    id: "image-to-jpg",
    name: "Image to JPG",
    description: "Convert any image to JPG",
    icon: "🖼️",
    color: "from-purple-500 to-pink-500",
    href: "/image-to-jpg",
  },
  {
    id: "png-to-jpg",
    name: "PNG to JPG",
    description: "Convert PNG to JPG",
    icon: "📷",
    color: "from-green-500 to-teal-500",
    href: "/png-to-jpg",
  },
  {
    id: "webp-to-jpg",
    name: "WebP to JPG",
    description: "Convert WebP to JPG",
    icon: "🌐",
    color: "from-orange-500 to-red-500",
    href: "/webp-to-jpg",
  },
];

// ─── Preview Component ──────────────────────────────────────────
const ImagePreview = ({
  item,
  onRemove,
  onRetry,
  index,
}: {
  item: FileItem;
  onRemove: () => void;
  onRetry: () => void;
  index: number;
}) => {
  const statusText = item.error
    ? "Error"
    : item.status === "done"
    ? "Converted ✓"
    : item.status === "converting"
    ? "Converting…"
    : "Ready";
  const statusColor = item.error
    ? "text-red-600 dark:text-red-400"
    : item.status === "done"
    ? "text-green-600 dark:text-green-400"
    : item.status === "converting"
    ? "text-yellow-600 dark:text-yellow-400"
    : "text-blue-600 dark:text-blue-400";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative group"
    >
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
        <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
          #{index + 1}
          {item.isScreenshot && <span className="ml-1 text-[10px]">📸</span>}
        </div>

        <div className="relative w-full h-36 mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden">
          {item.previewUrl && !item.error ? (
            <img src={item.previewUrl} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center flex-col gap-2">
              {item.isScreenshot ? (
                <Camera className="w-8 h-8 text-gray-400" />
              ) : (
                <ImageIcon className="w-8 h-8 text-gray-400" />
              )}
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[90%]">
                {item.name}
              </span>
            </div>
          )}
          {item.error && (
            <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
              <span className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-2 py-1 rounded text-xs">
                {item.error}
              </span>
            </div>
          )}
          {item.status === "converting" && (
            <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold truncate text-gray-900 dark:text-white" title={item.name}>
            {item.name}
          </p>
          <div className="flex items-center justify-between">
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor} bg-opacity-10 ${
                item.error ? "bg-red-500" : item.status === "done" ? "bg-green-500" : "bg-blue-500"
              }`}
            >
              {statusText}
            </span>
            {item.blob && <span className="text-xs text-gray-500 dark:text-gray-400">{(item.blob.size / 1024).toFixed(1)} KB</span>}
          </div>
        </div>

        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {item.error && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onRetry}
              className="p-1.5 bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
              title="Retry"
            >
              <RefreshCw className="w-4 h-4" />
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onRemove}
            className="p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
            aria-label="Remove"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Download Notification ─────────────────────────────────────
const DownloadNotification = ({
  id,
  fileName,
  fileCount,
  timestamp,
  type,
  onClose,
}: DownloadNotification & { onClose: () => void }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const getIcon = () => {
    switch (type) {
      case "zip":
        return <Archive className="w-4 h-4" />;
      case "pdf":
        return <FileText className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 50 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-3 flex items-start gap-3"
    >
      <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {type === "zip" && "ZIP archive"}
          {type === "pdf" && "PDF document"}
          {type === "single" && "Image"}
          {type === "multi" && "Multiple images"}
          {fileName && ` – ${fileName}`}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {fileCount} file{fileCount > 1 ? "s" : ""} • {timestamp.toLocaleTimeString()}
        </p>
      </div>
      <button
        onClick={handleClose}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

// ─── Main Component ─────────────────────────────────────────────
export default function UrlToJpg() {
  const [items, setItems] = useState<FileItem[]>([]);
  const [urlInput, setUrlInput] = useState("");
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
  const [showFeatures, setShowFeatures] = useState(true);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const [zipDownloading, setZipDownloading] = useState(false);
  const [pdfDownloading, setPdfDownloading] = useState(false);
  const [notifications, setNotifications] = useState<DownloadNotification[]>([]);
  const [capturingScreenshot, setCapturingScreenshot] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addNotification = (notification: Omit<DownloadNotification, "id" | "timestamp">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newNotif: DownloadNotification = {
      ...notification,
      id,
      timestamp: new Date(),
    };
    setNotifications((prev) => [newNotif, ...prev]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 6000);
  };

  // ─── File Upload ──────────────────────────────────────────────
  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;
    const newItems: FileItem[] = [];
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        alert(`"${file.name}" is not a supported image type.`);
        continue;
      }
      const id = Math.random().toString(36).substring(2, 9);
      const previewUrl = URL.createObjectURL(file);
      newItems.push({
        id,
        file,
        blob: file,
        name: file.name,
        previewUrl,
        status: "pending",
        isScreenshot: false,
      });
    }
    if (newItems.length > 0) {
      setItems((prev) => [...prev, ...newItems]);
      setShowFeatures(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // ─── Webpage Screenshot ──────────────────────────────────────
  const handleAddUrl = async () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;

    if (items.some((item) => item.name === trimmed)) {
      alert("This URL is already in the list.");
      return;
    }

    const id = Math.random().toString(36).substring(2, 9);
    const tempName = trimmed.length > 40 ? trimmed.slice(0, 40) + "…" : trimmed;
    const newItem: FileItem = {
      id,
      file: null,
      blob: new Blob(),
      name: tempName,
      previewUrl: "",
      status: "converting",
      isScreenshot: true,
    };
    setItems((prev) => [...prev, newItem]);
    setUrlInput("");
    setShowFeatures(false);
    setCapturingScreenshot(true);
    setProcessingError(null);

    try {
      const jpgBlob = await captureWebpageScreenshot(trimmed);
      const fileName = generateScreenshotName(trimmed);
      const previewUrl = URL.createObjectURL(jpgBlob);

      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                blob: jpgBlob,
                name: fileName,
                previewUrl,
                status: "done",
                converted: jpgBlob,
                convertedName: fileName,
                error: undefined,
              }
            : item
        )
      );

      setConvertedFiles((prev) => [
        ...prev,
        { blob: jpgBlob, name: fileName, originalName: fileName },
      ]);

      addNotification({
        fileName,
        fileCount: 1,
        type: "single",
      });
    } catch (err: any) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, error: err.message || "Failed to capture screenshot", status: "error" }
            : item
        )
      );
    } finally {
      setCapturingScreenshot(false);
    }
  };

  // ─── Remove Item ──────────────────────────────────────────────
  const handleRemove = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      URL.revokeObjectURL(item.previewUrl);
    }
    setItems((prev) => prev.filter((i) => i.id !== id));
    // Remove the corresponding converted file (by originalName)
    if (item) {
      setConvertedFiles((prev) => prev.filter((c) => c.originalName !== item.name));
    }
  };

  // ─── Retry ──────────────────────────────────────────────────────
  const handleRetry = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    if (item.isScreenshot) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === id ? { ...i, error: "Please re-add the URL", status: "error" } : i
        )
      );
    } else {
      setItems((prev) =>
        prev.map((i) =>
          i.id === id ? { ...i, error: "Please re-upload the file", status: "error" } : i
        )
      );
    }
  };

  // ─── Convert Uploaded Images ──────────────────────────────────
  const handleConvert = async () => {
    const pendingItems = items.filter(
      (i) => i.blob && i.status !== "done" && !i.error && !i.isScreenshot
    );
    if (pendingItems.length === 0) {
      alert("No pending images to convert. Add images or use URL for screenshots.");
      return;
    }

    setConverting(true);
    setProgress(0);
    setProcessingError(null);

    setItems((prev) =>
      prev.map((i) =>
        pendingItems.some((p) => p.id === i.id) ? { ...i, status: "converting" } : i
      )
    );

    try {
      const results: ConvertedFile[] = [];
      for (let i = 0; i < pendingItems.length; i++) {
        const item = pendingItems[i];
        try {
          const jpgBlob = await convertImageToJpg(item.blob);
          const baseName = item.name.replace(/\.[^.]+$/, "");
          const jpgName = `${baseName}.jpg`;
          results.push({
            blob: jpgBlob,
            name: jpgName,
            originalName: item.name,
          });
          setItems((prev) =>
            prev.map((p) =>
              p.id === item.id
                ? { ...p, status: "done", converted: jpgBlob, convertedName: jpgName }
                : p
            )
          );
          setProgress(((i + 1) / pendingItems.length) * 100);
        } catch (err: any) {
          setItems((prev) =>
            prev.map((p) =>
              p.id === item.id
                ? { ...p, status: "error", error: err.message || "Conversion failed" }
                : p
            )
          );
        }
      }

      // Append new results to existing convertedFiles, avoid duplicates
      const pendingNames = new Set(pendingItems.map((i) => i.name));
      setConvertedFiles((prev) => {
        const filtered = prev.filter((f) => !pendingNames.has(f.originalName));
        return [...filtered, ...results];
      });

      if (results.length === 0 && convertedFiles.length === 0) {
        setProcessingError("No images could be converted.");
      }
    } catch (err: any) {
      setProcessingError(err.message);
    } finally {
      setConverting(false);
      setItems((prev) =>
        prev.map((i) => (i.status === "converting" ? { ...i, status: "pending" } : i))
      );
    }
  };

  // ─── Download Handlers ──────────────────────────────────────
  const handleSingleDownload = (index: number) => {
    const file = convertedFiles[index];
    if (!file) return;
    downloadFile(file.blob, file.name);
    addNotification({ fileName: file.name, fileCount: 1, type: "single" });
  };

  const handleDownloadAllAsZip = async () => {
    if (convertedFiles.length === 0) return;
    setZipDownloading(true);
    try {
      const zip = new JSZip();
      convertedFiles.forEach((file) => {
        zip.file(file.name, file.blob);
      });
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const fileName = `converted_images_${Date.now()}.zip`;
      downloadFile(zipBlob, fileName);
      addNotification({ fileName, fileCount: convertedFiles.length, type: "zip" });
    } catch (err) {
      alert("Failed to create ZIP file.");
    } finally {
      setZipDownloading(false);
    }
  };

 const handleDownloadAsPDF = async () => {
  if (convertedFiles.length === 0) return;
  setPdfDownloading(true);
  try {
    const pdfDoc = await PDFDocument.create();
    for (const file of convertedFiles) {
      const arrayBuffer = await file.blob.arrayBuffer();
      let image;
      try {
        image = await pdfDoc.embedJpg(arrayBuffer);
      } catch (_) {
        image = await pdfDoc.embedPng(arrayBuffer);
      }
      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    }
    const pdfBytes = await pdfDoc.save();
    // ✅ Uint8Array is a valid BlobPart – no need for .buffer

       const pdfBlob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    const fileName = `converted_images_${Date.now()}.pdf`;   // ← fixed template literal
    downloadFile(pdfBlob, fileName);
    addNotification({ fileName, fileCount: convertedFiles.length, type: "pdf" });
  } catch (err) {
    alert("Failed to create PDF.");
  } finally {
    setPdfDownloading(false);
  }
};

  const handleDownloadAllSeparate = () => {
    convertedFiles.forEach((file, index) => {
      setTimeout(() => {
        downloadFile(file.blob, file.name);
        addNotification({ fileName: file.name, fileCount: 1, type: "multi" });
      }, index * 200);
    });
  };

  // ─── Reset ──────────────────────────────────────────────────
  const handleReset = () => {
    items.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    setItems([]);
    setConvertedFiles([]);
    setProgress(0);
    setShowFeatures(true);
    setProcessingError(null);
  };

  // ─── Render ──────────────────────────────────────────────────
  return (
    <>
      <FAQSchema />
      <BreadcrumbSchema />
      <HowToSchema />
      <ArticleSchema />

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 w-full max-w-xs sm:max-w-sm">
        <div ref={notificationsRef} className="space-y-2 max-h-64 overflow-y-auto pr-2">
          <AnimatePresence>
            {notifications.map((notification) => (
              <DownloadNotification
                key={notification.id}
                {...notification}
                onClose={() =>
                  setNotifications((prev) => prev.filter((n) => n.id !== notification.id))
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
            {/* Header */}
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
                  <span className="text-2xl md:text-3xl text-white select-none">{tool.icon}</span>
                </motion.div>

                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-2 sm:mb-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent px-2">
                  Webpage to JPG & PDF Converter | Convert Any URL to JPG or PDF Online
                </h1>

                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
                 Easily convert any webpage to JPG or PDF online for free. Just enter the URL to convert and download high-quality JPG images or PDF documents in seconds with PDFSwift.
                  <span className="block text-blue-600 dark:text-blue-400 font-medium mt-1 text-xs sm:text-sm md:text-base">
                    No limits • Bulk upload • ZIP & PDF export
                  </span>
                </p>
              </div>
            </div>

            {/* Features */}
            <AnimatePresence>
              {showFeatures && items.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 sm:mb-8 md:mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
                >
                  {[
                    {
                      icon: Upload,
                      title: "Upload Images",
                      desc: "Drag & drop or click to select WebP, PNG, GIF, etc.",
                      gradient: "from-blue-500 to-cyan-600",
                      bg: "from-blue-50 to-cyan-50",
                      border: "border-blue-200",
                    },
                    {
                      icon: Camera,
                      title: "Webpage Screenshot",
                      desc: "Paste any website URL to capture a full‑page JPG",
                      gradient: "from-indigo-500 to-purple-600",
                      bg: "from-indigo-50 to-purple-50",
                      border: "border-indigo-200",
                    },
                    {
                      icon: Shield,
                      title: "100% Private",
                      desc: "All processing is client‑side – nothing is stored on our servers.",
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

            {/* Main Card */}
            <div className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-lg sm:shadow-xl md:shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
              <div className="mb-4 sm:mb-6 md:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg sm:rounded-xl">
                    <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      Add Images or Website URL
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Upload files or paste a webpage URL to capture a screenshot
                    </p>
                  </div>
                </div>

                {/* Drag & Drop */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 sm:p-8 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-gray-50 dark:bg-gray-800/50"
                >
                  <Upload className="w-10 h-10 mx-auto text-gray-400 dark:text-gray-500 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Drop images here or click to browse</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Supports WebP, PNG, GIF, SVG, BMP, and more
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileSelect(e.target.files)}
                  />
                </div>

                {/* URL Input */}
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Paste website URL to capture screenshot (e.g., https://example.com)"
                    className="flex-1 px-4 py-2.5 border-2 border-gray-300 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                    onKeyDown={(e) => e.key === "Enter" && handleAddUrl()}
                    disabled={capturingScreenshot}
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddUrl}
                    disabled={!urlInput.trim() || capturingScreenshot}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {capturingScreenshot ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                    {capturingScreenshot ? "Capturing..." : "Capture Screenshot"}
                  </motion.button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  The screenshot will be added as a JPG image. You can also upload images for conversion.
                </p>
              </div>

              {/* Item List */}
              {items.length > 0 && (
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                        Added Items ({items.length})
                      </h3>
                      <button
                        onClick={handleReset}
                        className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg sm:rounded-xl transition-colors"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-gray-200 dark:border-gray-700">
                      {items.map((item, index) => (
                        <ImagePreview
                          key={item.id}
                          item={item}
                          onRemove={() => handleRemove(item.id)}
                          onRetry={() => handleRetry(item.id)}
                          index={index}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Convert Button – shows only when there are pending uploads */}
                  <div className="space-y-4 sm:space-y-6">
                    {processingError && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                          <div>
                            <h4 className="font-medium text-red-800 dark:text-red-300">Error</h4>
                            <p className="text-sm text-red-600 dark:text-red-400">{processingError}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {converting && (
                      <div className="space-y-3 sm:space-y-4">
                        <ProgressBar
                          progress={progress}
                          label={`Converting ${
                            items.filter(
                              (i) => i.status === "converting" || (i.status === "pending" && !i.isScreenshot)
                            ).length
                          } images to JPG...`}
                        />
                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-blue-600 dark:text-blue-400">
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                          <span className="text-xs sm:text-sm font-medium">Processing...</span>
                        </div>
                      </div>
                    )}

                    {!converting &&
                      items.some((i) => i.blob && !i.error && !i.isScreenshot && i.status !== "done") && (
                        <motion.button
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleConvert}
                          className="w-full py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3"
                        >
                          <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                          Convert{" "}
                          {
                            items.filter((i) => i.blob && !i.error && !i.isScreenshot && i.status !== "done")
                              .length
                          }{" "}
                          Uploaded Images to JPG
                        </motion.button>
                      )}
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            {convertedFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-2 border-green-200 dark:border-green-800/50 p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg sm:shadow-xl md:shadow-2xl mb-6 md:mb-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                  <div className="flex items-center justify-center sm:justify-start">
                    <div className="p-2 sm:p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg sm:rounded-xl shadow-lg">
                      <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-1 sm:mb-2">
                      Ready! 🎉
                    </h2>
                    <p className="text-green-700 dark:text-green-300 font-medium text-sm sm:text-base">
                      {convertedFiles.length} JPG file{convertedFiles.length > 1 ? "s" : ""} available for download
                    </p>
                  </div>
                  <div className="flex items-center justify-center mt-2 sm:mt-0">
                    <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base">
                      {convertedFiles.length} Files
                    </div>
                  </div>
                </div>

                {/* Preview of converted JPGs */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 md:mb-8">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    Converted JPGs
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto p-3 sm:p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-green-100 dark:border-green-800/30">
                    {convertedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700"
                      >
                        <div className="relative h-32 bg-gray-100 dark:bg-gray-700">
                          {file.blob && (
                            <img
                              src={URL.createObjectURL(file.blob)}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                          <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                            JPG
                          </div>
                        </div>
                        <div className="p-2 flex items-center justify-between">
                          <span className="text-xs truncate text-gray-700 dark:text-gray-300 max-w-[70%]">
                            {file.name}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleSingleDownload(index)}
                            className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                            title="Download"
                          >
                            <Download className="w-3 h-3" />
                          </motion.button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Download buttons */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownloadAllAsZip}
                      disabled={zipDownloading}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {zipDownloading ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <Archive className="w-5 h-5" />
                      )}
                      Download as ZIP
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownloadAsPDF}
                      disabled={pdfDownloading}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {pdfDownloading ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <FileText className="w-5 h-5" />
                      )}
                      Download as PDF
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownloadAllSeparate}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                      <Download className="w-5 h-5" />
                      Download All Separately
                    </motion.button>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm md:text-base"
                    >
                      <Upload className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                      Add More
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stats */}
            {(items.length > 0 || convertedFiles.length > 0) && (
              <div className="mt-6 sm:mt-10 md:mt-14">
                <div className="max-w-6xl mx-auto px-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                    {[
                      {
                        value: items.length,
                        label: "Items Added",
                        color: "text-blue-600",
                        bg: "bg-blue-50 dark:bg-blue-900/10",
                      },
                      {
                        value: items.filter((i) => i.status === "done" || i.converted).length,
                        label: "Converted",
                        color: "text-green-600",
                        bg: "bg-green-50 dark:bg-green-900/10",
                      },
                      {
                        value: convertedFiles.length,
                        label: "JPGs Ready",
                        color: "text-emerald-600",
                        bg: "bg-emerald-50 dark:bg-emerald-900/10",
                      },
                      {
                        value: "Unlimited",
                        label: "No Limits",
                        color: "text-cyan-600",
                        bg: "bg-cyan-50 dark:bg-cyan-900/10",
                      },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className={`flex flex-col items-center justify-center rounded-2xl border border-gray-200 dark:border-gray-800 ${stat.bg} p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300`}
                      >
                        <div
                          className={`text-xl sm:text-2xl md:text-3xl xl:text-4xl font-extrabold ${stat.color} dark:${stat.color.replace(
                            "600",
                            "400"
                          )}`}
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

            {/* How‑to Section */}
            <section id="how-to" className="mt-20 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10">How to Use</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { step: 1, title: "Add Source", description: "Upload images or paste a webpage URL" },
                  {
                    step: 2,
                    title: "Review",
                    description: "Check previews and remove any if needed",
                  },
                  {
                    step: 3,
                    title: "Convert",
                    description: "Click Convert to turn uploaded images to JPG (screenshots are automatic)",
                  },
                  {
                    step: 4,
                    title: "Download",
                    description: "Download individually, as ZIP, or as PDF",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-4 sm:p-6 text-center shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition"
                  >
                    <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-base sm:text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Explore Tools */}
            <section className="mt-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Explore More Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {exploreTools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className="group block p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-2 bg-gradient-to-r ${tool.color} rounded-lg text-white text-xl`}
                      >
                        {tool.icon}
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{tool.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-3xl mx-auto my-8 sm:my-12 md:my-16 px-2 sm:px-3 md:px-4">
              <div className="text-center mb-4 sm:mb-6 md:mb-8">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Everything you need to know
                </p>
              </div>
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {faqData.map((faq, index) => (
                  <details
                    key={index}
                    className="group border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 bg-white dark:bg-gray-800"
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
          </motion.div>
        </div>
      </div>
    </>
  );
}