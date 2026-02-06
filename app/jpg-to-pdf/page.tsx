"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Columns,
  Square,
  Expand,
  Replace,
} from "lucide-react";

// Make sure these components are client components
import FileUploader from "../components/FileUploader";
import ProgressBar from "../components/ProgressBar";
import { imageToPdf } from "../../utils/pdfUtils";
import { downloadFile } from "../../utils/imageUtils";

import type { PaperSize, Orientation } from "../../types";
import BreadcrumbSchema from "./BreadcrumbSchema";
import ArticleSchema from "./ArticleSchema";
import HowToSchema from "./HowToSchema";
import FAQSchema from "./FAQSchema";
import { faqData } from "./faqData";

// Add MarginSize type
type MarginSize = "no-margin" | "small" | "big";

interface FileWithPreview {
  file: File;
  previewUrl?: string;
  id: string;
  rotation: number;
  scale: number;
  aspectRatio: "free" | "1:1" | "4:3" | "16:9" | "A4";
  previewError?: boolean;
  compressedSize?: number;
  originalOrder?: number;
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

// REMOVED ALL PAGE LIMITS - Allow unlimited uploads
// File size limits in bytes - Increased for better user experience
const MAX_SIZE_DESKTOP = 1000 * 1024 * 1024; // 1GB for desktop
const MAX_SIZE_MOBILE = 500 * 1024 * 1024;   // 500MB for mobile
const MAX_TOTAL_SIZE_DESKTOP = 5000 * 1024 * 1024; // 5GB total for desktop
const MAX_TOTAL_SIZE_MOBILE = 2000 * 1024 * 1024;  // 2GB total for mobile

// ✅ FIXED: Paper Size Definitions with correct dimensions
const PAPER_SIZES = {
  A4: { width: 210, height: 297 }, // 210mm x 297mm (8.27" x 11.69")
  Letter: { width: 215.9, height: 279.4 }, // 8.5" x 11"
  Legal: { width: 215.9, height: 355.6 }, // 8.5" x 14"
  A3: { width: 297, height: 420 }, // 297mm x 420mm (11.69" x 16.54")
} as const;

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
  marginSize: MarginSize,
  customQualityValue?: number
): string => {
  const now = new Date();
  const timestamp = now.getTime();
  const randomId = Math.random().toString(36).substring(2, 9);

  const orderSuffix = reverseOrder ? "_reverse" : "";

  const marginLabels = {
    "no-margin": "no-margin",
    small: "small-margin",
    big: "big-margin",
  };

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
    return `${originalName}_${paperSize}_${marginLabels[marginSize]}${qualitySuffix}_${timestamp}_${randomId}${orderSuffix}.pdf`;
  } else {
    return `images_${files.length}_pages_${paperSize}_${marginLabels[marginSize]}${qualitySuffix}_${timestamp}_${randomId}${orderSuffix}.pdf`;
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

// ✅ FIXED: Enhanced compression function with SPECIAL MOBILE MAXIMUM QUALITY SUPPORT
const compressImageForPdf = async (
  file: File,
  rotation: number = 0,
  quality: CompressionQuality = "medium",
  customQualityValue: number = 75,
  isMobile: boolean = false,
  targetWidth?: number,
  targetHeight?: number
): Promise<string> => {
  // If quality is "none" (maximum quality), use simpler approach for mobile
  if (quality === "none") {
    console.log(`Maximum Quality mode for ${file.name} (${(file.size/1024).toFixed(0)}KB)`);
    
    // ✅ MOBILE FIX: Maximum quality के लिए simpler approach
    if (isMobile) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (result && typeof result === 'string') {
            console.log(`Mobile - Maximum quality: ${file.name} loaded as base64 (${(result.length/1024).toFixed(0)}KB)`);
            resolve(result);
          } else {
            reject(new Error("Failed to read file as base64"));
          }
        };
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });
    }
    
    // Desktop के लिए original approach
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            
            if (!ctx) {
              console.warn("Canvas context not available, returning original");
              resolve(e.target?.result as string);
              return;
            }
            
            // Set canvas size based on rotation
            if (rotation === 90 || rotation === 270) {
              canvas.width = img.height;
              canvas.height = img.width;
            } else {
              canvas.width = img.width;
              canvas.height = img.height;
            }
            
            // White background
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Apply rotation
            if (rotation !== 0) {
              ctx.save();
              ctx.translate(canvas.width / 2, canvas.height / 2);
              ctx.rotate((rotation * Math.PI) / 180);
              ctx.drawImage(
                img,
                -img.width / 2,
                -img.height / 2,
                img.width,
                img.height
              );
              ctx.restore();
            } else {
              ctx.drawImage(img, 0, 0, img.width, img.height);
            }
            
            // Convert to base64 with maximum quality
            try {
              const base64Data = canvas.toDataURL("image/jpeg", 1.0);
              console.log(`Maximum quality processed: ${file.name} -> ${(base64Data.length/1024).toFixed(0)}KB`);
              resolve(base64Data);
            } catch (canvasError) {
              console.warn("Canvas toDataURL failed:", canvasError);
              resolve(e.target?.result as string);
            }
          } catch (error) {
            console.error("Maximum quality processing error:", error);
            resolve(e.target?.result as string);
          }
        };
        
        img.onerror = () => {
          console.warn("Image loading failed, returning original");
          resolve(e.target?.result as string);
        };
        
        img.src = e.target?.result as string;
      };
      
      reader.onerror = () => {
        console.warn(`File reading failed for maximum quality`);
        reject(new Error("Failed to read image file"));
      };
      
      reader.readAsDataURL(file);
    });
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        try {
          // ✅ MOBILE FIX: Simpler approach for mobile devices
          if (isMobile) {
            console.log(`Mobile device - processing image: ${file.name} (${(file.size/1024).toFixed(0)}KB)`);
            
            // Mobile के लिए basic settings
            let maxDimension = 1200; // Mobile के लिए reasonable size
            let qualityValue = 0.8; // Good quality for mobile
            
            // Quality settings for mobile
            switch (quality) {
              case "custom":
                qualityValue = Math.max(0.5, Math.min(1, customQualityValue / 100));
                break;
              case "high":
                maxDimension = 1600;
                qualityValue = 0.85;
                break;
              case "medium":
                maxDimension = 1200;
                qualityValue = 0.75;
                break;
              case "low":
                maxDimension = 800;
                qualityValue = 0.6;
                break;
            }
            
            // Calculate scale to fit within max dimension
            let scale = 1;
            const largerDimension = Math.max(img.width, img.height);
            
            if (largerDimension > maxDimension) {
              scale = maxDimension / largerDimension;
            }
            
            // Ensure minimum scale
            scale = Math.max(0.1, Math.min(1, scale));
            
            const newWidth = Math.floor(img.width * scale);
            const newHeight = Math.floor(img.height * scale);
            
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            
            if (!ctx) {
              console.warn("Mobile: Canvas context not available, returning original");
              // Return original image
              resolve(e.target?.result as string);
              return;
            }
            
            // Set canvas size based on rotation
            if (rotation === 90 || rotation === 270) {
              canvas.width = newHeight;
              canvas.height = newWidth;
            } else {
              canvas.width = newWidth;
              canvas.height = newHeight;
            }
            
            // White background
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Set image smoothing
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "medium";
            
            // Apply rotation if needed
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
              ctx.drawImage(img, 0, 0, newWidth, newHeight);
            }
            
            // Convert to base64
            try {
              const base64Data = canvas.toDataURL("image/jpeg", qualityValue);
              console.log(`Mobile compressed: ${file.name} -> ${(base64Data.length/1024).toFixed(0)}KB`);
              resolve(base64Data);
            } catch (canvasError) {
              console.warn("Mobile canvas toDataURL failed:", canvasError);
              // Return original if canvas fails
              resolve(e.target?.result as string);
            }
            return;
          }
          
          // Desktop processing (original code with improvements)
          let maxDimension = 4096;
          let qualityValue = 0.75;

          // Set target dimensions and quality
          switch (quality) {
            case "custom":
              maxDimension = 4096;
              qualityValue = Math.max(0.1, Math.min(1, customQualityValue / 100));
              break;
            case "high":
              maxDimension = 2048;
              qualityValue = 0.85;
              break;
            case "medium":
              maxDimension = 1200;
              qualityValue = 0.75;
              break;
            case "low":
              maxDimension = 800;
              qualityValue = 0.60;
              break;
          }

          // Calculate scale
          let scale = 1;
          const largerDimension = Math.max(img.width, img.height);
          
          // If target dimensions are provided, use them
          if (targetWidth && targetHeight) {
            const widthScale = targetWidth / img.width;
            const heightScale = targetHeight / img.height;
            scale = Math.min(widthScale, heightScale);
          } else if (largerDimension > maxDimension) {
            scale = maxDimension / largerDimension;
          }

          // Extra scaling for medium/low quality on desktop
          if (!isMobile) {
            if (quality === "medium" && largerDimension > 800) {
              scale = Math.min(scale, 0.8);
            } else if (quality === "low" && largerDimension > 600) {
              scale = Math.min(scale, 0.6);
            }
          }

          // Ensure minimum scale
          scale = Math.max(0.1, Math.min(1, scale));

          const newWidth = Math.floor(img.width * scale);
          const newHeight = Math.floor(img.height * scale);

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            console.warn("Canvas context not available, returning original image");
            resolve(e.target?.result as string);
            return;
          }

          // Set canvas size based on rotation
          if (rotation === 90 || rotation === 270) {
            canvas.width = newHeight;
            canvas.height = newWidth;
          } else {
            canvas.width = newWidth;
            canvas.height = newHeight;
          }

          // White background
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // High quality rendering
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";

          // Apply rotation
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
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
          }

          // Convert to base64
          const outputFormat = "image/jpeg";
          const adjustedQuality = file.type.includes("png") 
            ? Math.max(0.1, qualityValue * 0.7)
            : qualityValue;

          try {
            const base64Data = canvas.toDataURL(outputFormat, adjustedQuality);
            
            console.log(`Compressed: ${file.name} | Device: ${isMobile ? 'Mobile' : 'Desktop'} | Quality: ${quality}(${adjustedQuality}) | Original: ${img.width}x${img.height} -> Compressed: ${newWidth}x${newHeight} | Size: ${(file.size/1024).toFixed(0)}KB -> ${(base64Data.length/1024).toFixed(0)}KB`);
            
            resolve(base64Data);
          } catch (error) {
            console.warn("Canvas toDataURL error:", error);
            resolve(e.target?.result as string);
          }
        } catch (error) {
          console.error("Image processing error:", error);
          resolve(e.target?.result as string);
        }
      };

      img.onerror = () => {
        console.warn(`Image loading failed, returning original image`);
        resolve(e.target?.result as string);
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      console.warn(`File reading failed`);
      reject(new Error("Failed to read image file"));
    };

    reader.readAsDataURL(file);
  });
};

// Function to estimate compressed size
const estimateCompressedSize = (files: FileWithPreview[], quality: CompressionQuality, customValue?: number): number => {
  if (files.length === 0) return 0;
  
  let reductionFactor = 1.0;
  switch (quality) {
    case "none": reductionFactor = 1.0; break;
    case "custom": 
      reductionFactor = customValue ? Math.min(0.9, Math.max(0.1, customValue / 100)) : 0.7; 
      break;
    case "high": reductionFactor = 0.5; break;
    case "medium": reductionFactor = 0.3; break;
    case "low": reductionFactor = 0.2; break;
  }
  
  const totalOriginalSize = files.reduce((sum, f) => sum + f.file.size, 0);
  return Math.max(totalOriginalSize * reductionFactor, 1024);
};

// ✅ FIXED: PDF creation function with correct paper sizes and better image fitting
const createPdfFromImages = async (
  imageDataUrls: string[], // Array of base64 image data
  paperSize: PaperSize,
  orientation: Orientation,
  marginPoints: number,
  isMobile: boolean
): Promise<Blob> => {
  try {
    // Dynamic import for jsPDF to reduce initial bundle size
    const { jsPDF } = await import("jspdf");
    
    // Get paper dimensions from our fixed sizes
    const paperDimensions = PAPER_SIZES[paperSize];
    let pageWidth, pageHeight;
    
    if (orientation === "Landscape") {
      pageWidth = paperDimensions.height;
      pageHeight = paperDimensions.width;
    } else {
      pageWidth = paperDimensions.width;
      pageHeight = paperDimensions.height;
    }
    
    // Create PDF with correct dimensions
    const pdf = new jsPDF({
      orientation: orientation === "Landscape" ? "landscape" : "portrait",
      unit: "mm",
      format: paperSize.toLowerCase(),
    });

    // Verify page size
    const actualPageWidth = pdf.internal.pageSize.getWidth();
    const actualPageHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate available space after margins
    const margin = marginPoints / 2.834; // Convert points to mm (72 points = 1 inch)
    const availableWidth = actualPageWidth - (margin * 2);
    const availableHeight = actualPageHeight - (margin * 2);

    console.log(`Creating PDF with ${imageDataUrls.length} images`);
    console.log(`Paper Size: ${paperSize} (${paperDimensions.width}x${paperDimensions.height}mm)`);
    console.log(`Orientation: ${orientation}`);
    console.log(`Page size: ${actualPageWidth.toFixed(1)}x${actualPageHeight.toFixed(1)}mm`);
    console.log(`Margin: ${margin}mm (${marginPoints} points = ${(marginPoints/72).toFixed(2)} inch)`);
    console.log(`Available space: ${availableWidth.toFixed(1)}x${availableHeight.toFixed(1)}mm`);

    for (let i = 0; i < imageDataUrls.length; i++) {
      const imgData = imageDataUrls[i];
      
      // Add page for each image except first
      if (i > 0) {
        pdf.addPage(paperSize.toLowerCase(), orientation === "Landscape" ? "landscape" : "portrait");
      }

      try {
        // Create temporary image to get dimensions
        const tempImg = new Image();
        
        await new Promise<void>((resolve, reject) => {
          tempImg.onload = () => {
            const imgWidth = tempImg.width;
            const imgHeight = tempImg.height;
            
            // Calculate aspect ratio
            const imgAspectRatio = imgWidth / imgHeight;
            const availableAspectRatio = availableWidth / availableHeight;
            
            let finalWidth, finalHeight;
            
            // ✅ FIXED: Calculate dimensions to fit within available space while maintaining aspect ratio
            if (imgAspectRatio > availableAspectRatio) {
              // Image is wider than available space (fit to width)
              finalWidth = availableWidth;
              finalHeight = availableWidth / imgAspectRatio;
            } else {
              // Image is taller than available space (fit to height)
              finalHeight = availableHeight;
              finalWidth = availableHeight * imgAspectRatio;
            }
            
            // Center the image
            const x = margin + (availableWidth - finalWidth) / 2;
            const y = margin + (availableHeight - finalHeight) / 2;
            
            // Add image to PDF
            try {
              pdf.addImage(imgData, 'JPEG', x, y, finalWidth, finalHeight, undefined, 'FAST');
              console.log(`Added image ${i+1}: ${imgWidth}x${imgHeight} -> ${finalWidth.toFixed(1)}x${finalHeight.toFixed(1)}mm at (${x.toFixed(1)}, ${y.toFixed(1)})`);
              resolve();
            } catch (addImageError) {
              console.warn(`Failed to add image to PDF:`, addImageError);
              // Add error message instead
              pdf.text(`Failed to add image ${i+1}`, margin, margin + 10);
              resolve();
            }
          };
          
          tempImg.onerror = () => {
            console.warn(`Failed to load image ${i+1}`);
            // Add error message for failed image
            pdf.text(`Failed to load image ${i+1}`, margin, margin + 10);
            resolve();
          };
          
          tempImg.src = imgData;
        });
      } catch (imgError) {
        console.warn(`Failed to process image ${i+1}:`, imgError);
        // Add error message for failed image
        if (i > 0) pdf.addPage();
        pdf.text(`Failed to process image ${i+1}`, margin, margin + 10);
      }
    }

    // Generate PDF blob
    const pdfBlob = pdf.output('blob');
    
    if (!pdfBlob || pdfBlob.size === 0) {
      throw new Error("Generated PDF is empty");
    }
    
    console.log(`PDF Generation Complete: ${imageDataUrls.length} images, Size: ${(pdfBlob.size / 1024 / 1024).toFixed(2)}MB`);
    
    return pdfBlob;
    
  } catch (error) {
    console.error("PDF generation failed:", error);
    
    // Fallback: Create a simple PDF with error message
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF();
      pdf.text("Failed to generate PDF. Please try again.", 10, 10);
      pdf.text("Error: " + (error instanceof Error ? error.message : 'Unknown error'), 10, 20);
      return pdf.output('blob');
    } catch (fallbackError) {
      throw new Error(`PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
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
  marginSize,
  customQualityValue,
  showWarning,
  isMobile,
}: {
  count: number;
  reverseOrder: boolean;
  compressionQuality: CompressionQuality;
  marginSize: MarginSize;
  customQualityValue?: number;
  showWarning: boolean;
  isMobile: boolean;
}) => {
  if (count === 0) return null;

  const qualityLabels: Record<CompressionQuality, string> = {
    none: "100% Quality",
    custom: customQualityValue ? `${customQualityValue}% Quality` : "Custom Quality",
    high: "High Quality (85%)",
    medium: "Medium Quality (75%)",
    low: "Low Quality (60%)",
  };

  const marginLabels: Record<MarginSize, string> = {
    "no-margin": "No Margin",
    small: "Small Margin (0.25 inch)",
    big: "Big Margin (1 inch)",
  };

  // Calculate estimated size
  const estimatedSize = estimateCompressedSize(
    Array.from({ length: count }, (_, i) => {
      const fileName = "image" + i + ".jpg";
      return {
        file: new File([], fileName),
        id: String(i),
        rotation: 0,
        scale: 1,
        aspectRatio: "free" as const,
        previewError: false,
      };
    }) as FileWithPreview[],
    compressionQuality,
    customQualityValue
  );

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
          <div className="text-xs opacity-80 mt-1">
            {marginLabels[marginSize]}
          </div>
          <div className="text-xs opacity-80 mt-1">
            Est. PDF: {(estimatedSize / (1024 * 1024)).toFixed(1)}MB
          </div>
          {reverseOrder && (
            <div className="text-xs opacity-80 mt-1 flex items-center justify-center gap-1">
              <ArrowUpDown className="w-3 h-3" />
              Reverse Order
            </div>
          )}
          {isMobile && count > 100 && (
            <div className="text-xs text-amber-300 mt-1">
              ⚠️ Large conversion on mobile
            </div>
          )}
        </div>
      </div>

      <div className="absolute -top-32 right-0 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="font-medium">Total pages: {count}</div>
        <div className="text-xs mt-1">
          Quality: {qualityLabels[compressionQuality]}
        </div>
        <div className="text-xs mt-1">Margin: {marginLabels[marginSize]}</div>
        <div className="text-xs mt-1">
          Est. PDF Size: {(estimatedSize / (1024 * 1024)).toFixed(2)}MB
        </div>
        {reverseOrder && (
          <div className="text-xs mt-1">• Images in Reverse Order</div>
        )}
        {showWarning && (
          <div className="text-xs mt-1 text-amber-300 font-semibold">
            • Changes detected - Convert Again
          </div>
        )}
        {isMobile && (
          <div className="text-xs mt-1 text-blue-300">
            • Mobile: Max {MAX_SIZE_MOBILE / (1024 * 1024)}MB per file
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

// Replace Image Modal Component
const ReplaceImageModal = ({
  onReplace,
  onCancel,
  imageName,
}: {
  onReplace: (file: File) => void;
  onCancel: () => void;
  imageName: string;
}) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onReplace(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      onReplace(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Replace Image
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Replace: <span className="font-medium">{imageName}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              dragOver
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-700 hover:border-blue-400"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
              onChange={handleFileSelect}
            />
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-blue-500 dark:text-blue-400" />
              </div>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {dragOver ? "Drop image here" : "Click or drag to replace"}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Select a new image to replace the current one
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>JPG</span>
              <span>•</span>
              <span>PNG</span>
              <span>•</span>
              <span>WEBP</span>
              <span>•</span>
              <span>Max {MAX_SIZE_MOBILE / (1024 * 1024)}MB (mobile)</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 font-medium transition-all flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Choose File
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ✅ FIXED: Image Container Component with proper image fitting
const ImageContainer = ({ 
  file, 
  imageUrl, 
  rotation, 
  hasRotation, 
  previewError,
  onClick 
}: { 
  file: FileWithPreview; 
  imageUrl: string | undefined; 
  rotation: number; 
  hasRotation: boolean;
  previewError: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className="relative w-full h-48 md:h-56 lg:h-64 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 cursor-pointer"
      onClick={onClick}
    >
      {imageUrl && !previewError ? (
        <>
          <img
            src={imageUrl}
            alt={file.file.name}
            className="w-full h-full object-contain transition-transform duration-300"
            style={{
              transform: `rotate(${rotation}deg)`,
              objectFit: 'contain',
            }}
            loading="lazy"
            onError={(e) => {
              console.error("Image loading error:", file.file.name);
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors" />
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-3">
          <div className="relative mb-2">
            <ImageIcon className="w-8 h-8 text-gray-400" />
            {previewError && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <X className="w-2 h-2 text-white" />
              </div>
            )}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 text-center truncate max-w-full px-2">
            {previewError ? 'Failed to load' : 'Loading...'}
          </span>
        </div>
      )}
    </div>
  );
};

export default function JpgToPdf() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [paperSize, setPaperSize] = useState<PaperSize>("A4");
  const [orientation, setOrientation] = useState<Orientation>("Portrait");
  const [marginSize, setMarginSize] = useState<MarginSize>("small");
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [expandedImage, setExpandedImage] = useState<{
    url: string;
    rotation: number;
    naturalWidth?: number;
    naturalHeight?: number;
    id: string;
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
    useState<CompressionQuality>(() => {
      if (typeof window !== 'undefined') {
        const isMobile = window.innerWidth < 768 || 
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        return isMobile ? "high" : "medium";
      }
      return "medium";
    });
  const [customQualityValue, setCustomQualityValue] = useState<number>(80);
  const [showChangesWarning, setShowChangesWarning] = useState(false);
  const [originalStateHash, setOriginalStateHash] = useState<string>("");
  const [replacingImageId, setReplacingImageId] = useState<string | null>(null);
  const [showReplaceOptions, setShowReplaceOptions] = useState<string | null>(
    null
  );
  const notificationsRef = useRef<HTMLDivElement>(null);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const [sizeLimitExceeded, setSizeLimitExceeded] = useState(false);
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});

  // Limits definition
  const maxSizePerFile = isMobile ? MAX_SIZE_MOBILE : MAX_SIZE_DESKTOP;
  const maxTotalSize = isMobile ? MAX_TOTAL_SIZE_MOBILE : MAX_TOTAL_SIZE_DESKTOP;

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
      marginSize,
      reverseOrder,
      compressionQuality,
      customQualityValue,
    };
    return JSON.stringify(state);
  }, [
    files,
    paperSize,
    orientation,
    marginSize,
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
    marginSize,
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
      const mobileCheck = window.innerWidth < 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobileCheck);
      
      if (mobileCheck && compressionQuality === "medium") {
        setCustomQualityValue(80);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [compressionQuality]);

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

  // Handle margin change
  const handleMarginChange = (margin: MarginSize) => {
    setMarginSize(margin);
    setPdfBlob(null);
    setOriginalStateHash("");
    setShowChangesWarning(false);
    setProcessingError(null);
    setProgress(0);
  };

  // Handle quality change
  const handleCompressionQualityChange = (quality: CompressionQuality) => {
    setCompressionQuality(quality);
    setPdfBlob(null);
    setOriginalStateHash("");
    setShowChangesWarning(false);
    setProcessingError(null);
    setProgress(0);
  };

  // Handle custom quality change
  const handleCustomQualityChange = (value: number) => {
    setCustomQualityValue(value);
    setPdfBlob(null);
    setOriginalStateHash("");
    setShowChangesWarning(false);
    setProcessingError(null);
    setProgress(0);
  };

  // Handle paper size change
  const handlePaperSizeChange = (size: PaperSize) => {
    setPaperSize(size);
    setPdfBlob(null);
    setOriginalStateHash("");
    setShowChangesWarning(false);
    setProcessingError(null);
    setProgress(0);
  };

  // Handle orientation change
  const handleOrientationChange = (orient: Orientation) => {
    setOrientation(orient);
    setPdfBlob(null);
    setOriginalStateHash("");
    setShowChangesWarning(false);
    setProcessingError(null);
    setProgress(0);
  };

  // Toggle reverse order
  const toggleReverseOrder = () => {
    setReverseOrder(!reverseOrder);
    setPdfBlob(null);
    setOriginalStateHash("");
    setShowChangesWarning(false);
    setProcessingError(null);
    setProgress(0);
  };

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
      setPdfBlob(null);
      setOriginalStateHash("");
      setShowChangesWarning(false);
      setProcessingError(null);
      setProgress(0);
    },
    [rotatedUrls]
  );

  // Handle Replace Image
  const handleReplaceImage = useCallback(
    async (id: string, newFile: File) => {
      const fileIndex = files.findIndex((f) => f.id === id);
      if (fileIndex === -1) return;

      // Check file size limit
      if (newFile.size > maxSizePerFile) {
        alert(`File size exceeds ${maxSizePerFile / (1024 * 1024)}MB limit. Maximum file size allowed is ${maxSizePerFile / (1024 * 1024)}MB.`);
        return;
      }

      // New file object
      const newFileWithPreview: FileWithPreview = {
        file: newFile,
        id: Math.random().toString(36).substr(2, 9),
        rotation: 0,
        scale: 1,
        aspectRatio: "free",
        previewError: false,
        previewUrl: URL.createObjectURL(newFile),
        originalOrder: files[fileIndex].originalOrder || fileIndex,
      };

      // Old file cleanup
      const oldFile = files[fileIndex];
      if (oldFile.previewUrl) URL.revokeObjectURL(oldFile.previewUrl);
      if (rotatedUrls[oldFile.id]) {
        if (rotatedUrls[oldFile.id].startsWith("data:")) {
          URL.revokeObjectURL(rotatedUrls[oldFile.id]);
        }
        setRotatedUrls((prev) => {
          const newUrls = { ...prev };
          delete newUrls[oldFile.id];
          return newUrls;
        });
      }

      // Update files array
      const updatedFiles = [...files];
      updatedFiles[fileIndex] = newFileWithPreview;
      setFiles(updatedFiles);

      // Reset states
      setPdfBlob(null);
      setOriginalStateHash("");
      setShowChangesWarning(false);
      setProcessingError(null);
      setProgress(0);
      setReplacingImageId(null);
      setShowReplaceOptions(null);
    },
    [files, rotatedUrls, maxSizePerFile]
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
      setPdfBlob(null);
      setOriginalStateHash("");
      setShowChangesWarning(false);
      setProcessingError(null);
      setProgress(0);
    },
    [files, draggedIndex]
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
      setPdfBlob(null);
      setOriginalStateHash("");
      setShowChangesWarning(false);
      setProcessingError(null);
      setProgress(0);
    },
    [files]
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
      setPdfBlob(null);
      setOriginalStateHash("");
      setShowChangesWarning(false);
      setProcessingError(null);
      setProgress(0);
    },
    [files]
  );

  // Handle rotate file
  const handleRotateFile = useCallback(
    async (id: string, degrees: number) => {
      const file = files.find((f) => f.id === id);
      if (!file || !file.previewUrl) return;

      const newRotation = (file.rotation + degrees) % 360;

      // Update file rotation
      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, rotation: newRotation } : f))
      );

      // Clear any existing rotated URL for this file
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

      // Reset other states
      setPdfBlob(null);
      setOriginalStateHash("");
      setShowChangesWarning(false);
      setProcessingError(null);
      setProgress(0);

      // Update expanded image if it's the same file
      if (expandedImage?.id === id) {
        setExpandedImage((prev) =>
          prev ? { ...prev, rotation: newRotation } : null
        );
      }
    },
    [files, rotatedUrls, expandedImage]
  );

  const handleRotateAll = useCallback(
    (degrees: number) => {
      setFiles((prev) =>
        prev.map((file) => ({
          ...file,
          rotation: (file.rotation + degrees) % 360,
        }))
      );

      setPdfBlob(null);
      setOriginalStateHash("");
      setShowChangesWarning(false);
      setProcessingError(null);
      setProgress(0);

      // Clear all rotated URLs
      Object.values(rotatedUrls).forEach((url) => {
        if (url.startsWith("data:")) {
          URL.revokeObjectURL(url);
        }
      });
      setRotatedUrls({});
    },
    [rotatedUrls]
  );

  const handleFilesUpdate = useCallback(
    async (newFiles: File[]) => {
      if (newFiles.length === 0) return;

      setCompressing(true);
      setProcessingError(null);
      setSizeLimitExceeded(false);

      try {
        // 1. File size check per file
        const oversizedFiles = newFiles.filter(file => file.size > maxSizePerFile);
        if (oversizedFiles.length > 0) {
          alert(
            `${oversizedFiles.length} file(s) exceed maximum ${maxSizePerFile / (1024 * 1024)}MB size limit on ${isMobile ? 'mobile' : 'desktop'}. They will not be added.`
          );
          newFiles = newFiles.filter(file => file.size <= maxSizePerFile);
          if (newFiles.length === 0) {
            setCompressing(false);
            return;
          }
        }

        // 2. Total size check
        const currentTotalSize = files.reduce((sum, f) => sum + f.file.size, 0);
        const newFilesTotalSize = newFiles.reduce((sum, f) => sum + f.size, 0);
        const totalSizeAfterAdd = currentTotalSize + newFilesTotalSize;
        
        if (totalSizeAfterAdd > maxTotalSize) {
          alert(
            `Maximum total size ${maxTotalSize / (1024 * 1024)}MB exceeded on ${isMobile ? 'mobile' : 'desktop'}. Current total: ${(currentTotalSize / 1024 / 1024).toFixed(2)}MB. Can only add ${((maxTotalSize - currentTotalSize) / 1024 / 1024).toFixed(2)}MB more.`
          );
          setSizeLimitExceeded(true);
          // Calculate how many files we can add
          let addedSize = 0;
          const allowedFiles: File[] = [];
          for (const file of newFiles) {
            if (addedSize + file.size <= maxTotalSize - currentTotalSize) {
              allowedFiles.push(file);
              addedSize += file.size;
            } else {
              break;
            }
          }
          newFiles = allowedFiles;
          if (newFiles.length === 0) {
            setCompressing(false);
            return;
          }
        }

        const filesWithIds: FileWithPreview[] = newFiles.map((file, index) => ({
          file: file,
          id: Math.random().toString(36).substr(2, 9),
          rotation: 0,
          scale: 1,
          aspectRatio: "free",
          previewError: false,
          previewUrl: URL.createObjectURL(file),
          originalOrder: files.length + index,
        }));

        // Add only new files to the existing files
        setFiles((prev) => [...prev, ...filesWithIds]);
        setPdfBlob(null);
        setOriginalStateHash("");
        setShowChangesWarning(false);
        setProcessingError(null);
        setProgress(0);
        
        // Mobile के लिए warning
        const totalFiles = files.length + newFiles.length;
        if (isMobile && totalFiles > 30) {
          console.log(`Mobile: ${totalFiles} images loaded, may affect performance`);
        }
      } catch (error) {
        console.error("File processing error:", error);
        setProcessingError("Error processing files. Please try again.");
      } finally {
        setCompressing(false);
      }
    },
    [files, isMobile, maxSizePerFile, maxTotalSize]
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

  const handleImageLoad = useCallback((id: string) => {
    setImageLoading((prev) => ({ ...prev, [id]: false }));
  }, []);

  // ✅ FIXED: handleConvert function with SPECIAL MOBILE MAXIMUM QUALITY SUPPORT
  // ✅ FIXED: handleConvert function with SPECIAL MOBILE MAXIMUM QUALITY SUPPORT
const handleConvert = async () => {
  if (files.length === 0) return;

  setConverting(true);
  setPdfBlob(null);
  setOriginalStateHash("");
  setShowCompressionInfo(true);
  setProcessingError(null);
  setSizeLimitExceeded(false);
  setProgress(0);

  try {
    // Prepare files in current order
    let filesToProcess = [...files];

    // Apply reverse order when converting to PDF
    if (reverseOrder) {
      filesToProcess = [...files].reverse();
    }

    // Show compression progress
    setProgress(10);

    // ✅ MOBILE MAXIMUM QUALITY WARNING AND LIMITS
    if (isMobile) {
      console.log(`Mobile device processing ${filesToProcess.length} images`);
      
      // Maximum quality के लिए special warning
      if (compressionQuality === "none") {
        console.log("Mobile: Maximum quality (no compression) mode detected");
        
        // Memory limitations के लिए check
        const totalSize = filesToProcess.reduce((sum, f) => sum + f.file.size, 0);
        
        if (filesToProcess.length > 30 || totalSize > 50 * 1024 * 1024) { // 50MB
          const shouldContinue = window.confirm(
            `⚠️ Maximum Quality Mode on Mobile\n\nProcessing ${filesToProcess.length} images (${(totalSize/1024/1024).toFixed(1)}MB) with maximum quality may cause memory issues on mobile.\n\nFor better results:\n1. Limit to 20-30 images at once\n2. Use "High Quality" (85%) instead\n3. Close other apps\n\nContinue anyway?`
          );
          if (!shouldContinue) {
            setConverting(false);
            setShowCompressionInfo(false);
            return;
          }
        }
      }
      else if (filesToProcess.length > 100) {
        const shouldContinue = window.confirm(
          `⚠️ Processing ${filesToProcess.length} images on mobile may take time.\n\nContinue anyway?`
        );
        if (!shouldContinue) {
          setConverting(false);
          setShowCompressionInfo(false);
          return;
        }
      }
    }

    console.log("Converting files:", filesToProcess.length);
    console.log("Paper Size:", paperSize, "Orientation:", orientation);
    console.log("Quality Setting:", compressionQuality);
    
    let cleanup: (() => void) | null = null;
    cleanup = simulateProgress(setProgress, 10, 50, 3000);

    console.log("Starting image processing...");
    console.log(`Compression Quality: ${compressionQuality}${compressionQuality === "custom" ? ` (${customQualityValue}%)` : ""}`);
    console.log(`Device: ${isMobile ? 'Mobile' : 'Desktop'}`);
    
    // Calculate target dimensions
    const marginPoints = {
      "no-margin": 0,
      small: 18,
      big: 72,
    }[marginSize];
    
    const marginMm = marginPoints / 2.834;
    const paperDimensions = PAPER_SIZES[paperSize];
    
    let targetWidth, targetHeight;
    if (orientation === "Landscape") {
      targetWidth = paperDimensions.height - (marginMm * 2);
      targetHeight = paperDimensions.width - (marginMm * 2);
    } else {
      targetWidth = paperDimensions.width - (marginMm * 2);
      targetHeight = paperDimensions.height - (marginMm * 2);
    }
    
    console.log(`Target dimensions: ${targetWidth.toFixed(1)}x${targetHeight.toFixed(1)}mm`);

    const compressedImages: string[] = [];
    const failedImages: number[] = [];

    // ✅ FIXED: Better processing with MOBILE MAXIMUM QUALITY optimization
    for (let i = 0; i < filesToProcess.length; i++) {
      const fileWithPreview = filesToProcess[i];
      
      try {
        // Update progress
        const fileProgress = 10 + (i / filesToProcess.length) * 40;
        setProgress(Math.floor(fileProgress));

        console.log(`Processing ${i + 1}/${filesToProcess.length}: ${fileWithPreview.file.name}`);

        let compressedImageData: string | null = null; // ✅ FIXED: Added type annotation
        
        // ✅ IMPORTANT: Mobile maximum quality के लिए special handling
        if (isMobile && compressionQuality === "none") {
          console.log(`Mobile maximum quality processing for ${fileWithPreview.file.name}`);
          
          // Mobile पर maximum quality के लिए simpler और safer approach
          compressedImageData = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const result = e.target?.result;
              if (result && typeof result === 'string') {
                console.log(`✅ Mobile max quality loaded: ${fileWithPreview.file.name} (${(result.length/1024).toFixed(0)}KB)`);
                resolve(result);
              } else {
                reject(new Error("Invalid result"));
              }
            };
            reader.onerror = () => reject(new Error("Failed to read file"));
            reader.readAsDataURL(fileWithPreview.file);
          }).catch(error => {
            console.warn(`❌ Mobile max quality failed for ${fileWithPreview.file.name}:`, error);
            return null;
          });
          
          // यदि data मिला तब ही rotation apply करें
          if (compressedImageData && fileWithPreview.rotation !== 0) {
            try {
              // Simple rotation using canvas
              const img = new Image();
              await new Promise<void>((resolve, reject) => {
                img.onload = () => {
                  const canvas = document.createElement("canvas");
                  const ctx = canvas.getContext("2d");
                  
                  if (ctx) {
                    // Set canvas size based on rotation
                    if (fileWithPreview.rotation === 90 || fileWithPreview.rotation === 270) {
                      canvas.width = img.height;
                      canvas.height = img.width;
                    } else {
                      canvas.width = img.width;
                      canvas.height = img.height;
                    }
                    
                    // White background
                    ctx.fillStyle = "#FFFFFF";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    
                    // Apply rotation
                    ctx.save();
                    ctx.translate(canvas.width / 2, canvas.height / 2);
                    ctx.rotate((fileWithPreview.rotation * Math.PI) / 180);
                    ctx.drawImage(
                      img,
                      -img.width / 2,
                      -img.height / 2,
                      img.width,
                      img.height
                    );
                    ctx.restore();
                    
                    compressedImageData = canvas.toDataURL("image/jpeg", 1.0);
                    console.log(`✅ Rotation applied for ${fileWithPreview.file.name}`);
                  }
                  resolve();
                };
                img.onerror = reject;
                img.src = compressedImageData!;
              });
            } catch (rotationError) {
              console.warn(`Rotation failed for ${fileWithPreview.file.name}:`, rotationError);
              // Rotation fail हुआ तो original image ही use करें
            }
          }
        } else {
          // Normal compression processing
          compressedImageData = await compressImageForPdf(
            fileWithPreview.file,
            fileWithPreview.rotation,
            compressionQuality,
            customQualityValue,
            isMobile,
            targetWidth * 3.78,
            targetHeight * 3.78
          );
        }

        if (compressedImageData && compressedImageData.startsWith('data:')) {
          compressedImages.push(compressedImageData);
          console.log(`✅ Image ${i + 1} processed successfully`);
        } else {
          console.warn(`⚠️ Image ${i + 1} returned invalid data`);
          failedImages.push(i);
          
          // Skip this image but continue
          if (i < filesToProcess.length - 1) {
            continue;
          }
        }
      } catch (error) {
        console.error(`❌ Failed to process image ${fileWithPreview.file.name}:`, error);
        failedImages.push(i);
        
        // Continue with next image
        if (i < filesToProcess.length - 1) {
          continue;
        }
      }
      
      // Mobile के लिए delay दें ताकि UI responsive रहे
      if (isMobile && i % 3 === 0) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    if (cleanup) cleanup();

    // ✅ Check if we have any images
    if (compressedImages.length === 0) {
      throw new Error("No images could be processed. This might be due to large file sizes or mobile device limitations.");
    }

    // Report failed images
    if (failedImages.length > 0) {
      console.warn(`⚠️ ${failedImages.length} images failed to process:`, failedImages);
      
      if (isMobile && compressionQuality === "none" && failedImages.length > 0) {
        // Mobile maximum quality में failures हुए हैं
        alert(`Warning: ${failedImages.length} images could not be processed in maximum quality mode on mobile. They have been skipped. Try using "High Quality" (85%) instead for better mobile performance.`);
      }
    }

    // Now create PDF with compressed images and margin
    try {
      setProgress(50);
      cleanup = simulateProgress(setProgress, 50, 90, 3000);

      console.log(`Creating PDF with ${compressedImages.length} images...`);
      console.log(`PDF Margin: ${marginSize} (${marginPoints} points)`);

      // PDF creation
      const blob = await createPdfFromImages(
        compressedImages,
        paperSize,
        orientation,
        marginPoints,
        isMobile
      );

      if (cleanup) cleanup();
      setProgress(100);

      if (!blob || blob.size === 0) {
        throw new Error("Generated PDF is empty");
      }
      
      setTimeout(() => {
        setPdfBlob(blob);
        setOriginalStateHash(calculateStateHash());
        setShowChangesWarning(false);
        setConverting(false);
        setSizeLimitExceeded(false);

        // Log final PDF size
        const totalOriginalSize = filesToProcess.reduce(
          (sum, f) => sum + f.file.size,
          0
        );
        const pdfSize = blob.size;

        console.log(`\n=== PDF Generation Complete ===`);
        console.log(`Device: ${isMobile ? 'Mobile' : 'Desktop'}`);
        console.log(`Quality Setting: ${compressionQuality}`);
        console.log(`Successfully processed: ${compressedImages.length}/${filesToProcess.length} images`);
        console.log(`Failed: ${failedImages.length} images`);
        console.log(`Original total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Final PDF: ${(pdfSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`PDF created successfully!`);

        // Hide compression info after 3 seconds
        setTimeout(() => {
          setShowCompressionInfo(false);
        }, 3000);
      }, 500);
    } catch (err) {
      if (cleanup) cleanup();
      console.error("PDF creation error:", err);
      
      let errorMessage = `Failed to convert images to PDF: ${err instanceof Error ? err.message : 'Unknown error'}.`;
      
      if (isMobile && compressionQuality === "none") {
        errorMessage += "\n\n📱 Mobile Maximum Quality Issue:\n• Maximum quality mode uses more memory on mobile\n• Try 'High Quality' (85%) instead\n• Process fewer images at once (max 30 recommended)\n• Use smaller image files\n• Close other apps";
      } else if (isMobile) {
        errorMessage += "\n\n📱 Mobile Device Tip:\n• Try 'High Quality' (85%) instead of Maximum\n• Process fewer images at once\n• Use smaller image files\n• Close other apps";
      } else {
        errorMessage += "\n\nPlease try again with fewer images or lower quality settings.";
      }
      
      setProcessingError(errorMessage);
      setProgress(0);
      setConverting(false);
      setShowCompressionInfo(false);
      setPdfBlob(null);
      setOriginalStateHash("");
    }
  } catch (err) {
    console.error("Conversion error:", err);
    
    let errorMessage = `Failed to convert images to PDF: ${err instanceof Error ? err.message : 'Unknown error'}.`;
    
    if (isMobile && compressionQuality === "none") {
      errorMessage += "\n\n📱 Mobile Maximum Quality Issue:\n• Maximum quality mode uses more memory on mobile\n• Try 'High Quality' (85%) instead\n• Process fewer images at once (max 30 recommended)";
    }
    
    setProcessingError(errorMessage);
    setProgress(0);
    setConverting(false);
    setShowCompressionInfo(false);
    setPdfBlob(null);
    setOriginalStateHash("");
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
        marginSize,
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

  const displayFiles = reverseOrder ? [...files].reverse() : files;

  const getPageNumber = (displayIndex: number) => {
    if (reverseOrder) {
      return files.length - displayIndex;
    }
    return displayIndex + 1;
  };

  const getImageUrl = (file: FileWithPreview) => {
    return file.previewUrl;
  };

 const handleExpandImage = async (file: FileWithPreview) => {
  if (!file.previewUrl || file.previewError) return;

  try {
    const img = new Image();
    
    img.onload = () => {
      let displayWidth = img.naturalWidth;
      let displayHeight = img.naturalHeight;
      
      // Calculate rotated dimensions
      if (file.rotation === 90 || file.rotation === 270) {
        displayWidth = img.naturalHeight;
        displayHeight = img.naturalWidth;
      }
      
      // Calculate scale according to viewport
      const viewportWidth = window.innerWidth * 0.9;
      const viewportHeight = window.innerHeight * 0.8;
      
      let scale = 1;
      if (displayWidth > viewportWidth) {
        scale = Math.min(scale, viewportWidth / displayWidth);
      }
      if (displayHeight > viewportHeight) {
        scale = Math.min(scale, viewportHeight / displayHeight);
      }
      
      const finalWidth = Math.floor(displayWidth * scale);
      const finalHeight = Math.floor(displayHeight * scale);
      
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        setExpandedImage({
          url: file.previewUrl!,
          rotation: file.rotation,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          id: file.id,
        });
        return;
      }
      
      // Set canvas size based on original rotated dimensions
      if (file.rotation === 90 || file.rotation === 270) {
        canvas.width = finalHeight;
        canvas.height = finalWidth;
      } else {
        canvas.width = finalWidth;
        canvas.height = finalHeight;
      }
      
      // White background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // High quality rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      
      // Rotate and draw
      ctx.save();
      
      // Move to canvas center
      ctx.translate(canvas.width / 2, canvas.height / 2);
      
      // Apply rotation
      ctx.rotate((file.rotation * Math.PI) / 180);
      
      // Draw image (centered)
      ctx.drawImage(
        img,
        -finalWidth / 2,
        -finalHeight / 2,
        finalWidth,
        finalHeight
      );
      
      ctx.restore();
      
      const rotatedUrl = canvas.toDataURL("image/jpeg", 0.95);
      
      // Pass correct dimensions
      setExpandedImage({
        url: rotatedUrl,
        rotation: file.rotation,
        naturalWidth: canvas.width,
        naturalHeight: canvas.height,
        id: file.id,
      });
    };
    
    img.onerror = () => {
      // Fallback
      setExpandedImage({
        url: file.previewUrl!,
        rotation: file.rotation,
        naturalWidth: 0,
        naturalHeight: 0,
        id: file.id,
      });
    };
    
    img.src = file.previewUrl;
  } catch (error) {
    console.error("Failed to prepare expanded image:", error);
    setExpandedImage({
      url: file.previewUrl!,
      rotation: file.rotation,
      naturalWidth: 0,
      naturalHeight: 0,
      id: file.id,
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
    setPdfBlob(null);
    setOriginalStateHash("");
    setProgress(0);
    setReverseOrder(false);
    setShowCompressionInfo(false);
    setShowChangesWarning(false);
    setReplacingImageId(null);
    setShowReplaceOptions(null);
    setProcessingError(null);
    setSizeLimitExceeded(false);
    setImageLoading({});
  };

  // Handle image rotation in full screen mode
  const handleRotateInFullScreen = (degrees: number) => {
    if (!expandedImage) return;

    const newRotation = (expandedImage.rotation + degrees) % 360;
    const fileId = expandedImage.id;

    // Update the file's rotation
    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileId ? { ...f, rotation: newRotation } : f
      )
    );

    // Update expanded image rotation
    setExpandedImage((prev) =>
      prev ? { ...prev, rotation: newRotation } : null
    );

    // Clear cached rotated URL
    if (rotatedUrls[fileId]) {
      URL.revokeObjectURL(rotatedUrls[fileId]);
      setRotatedUrls((prev) => {
        const newUrls = { ...prev };
        delete newUrls[fileId];
        return newUrls;
      });
    }

    setPdfBlob(null);
    setOriginalStateHash("");
    setShowChangesWarning(false);
    setProcessingError(null);
    setProgress(0);
  };

  if (!isClient) return null;

  // Calculate estimated PDF size
  const estimatedPdfSize = estimateCompressedSize(files, compressionQuality, customQualityValue);

  return (
    <>
      <FAQSchema />
      <BreadcrumbSchema />
      <HowToSchema />
      <ArticleSchema />

      {/* Replace Image Modal */}
      <AnimatePresence>
        {replacingImageId && (
          <ReplaceImageModal
            imageName={
              files.find((f) => f.id === replacingImageId)?.file.name || ""
            }
            onReplace={(file) => handleReplaceImage(replacingImageId, file)}
            onCancel={() => setReplacingImageId(null)}
          />
        )}
      </AnimatePresence>

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
        marginSize={marginSize}
        customQualityValue={customQualityValue}
        showWarning={showChangesWarning}
        isMobile={isMobile}
      />

      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            style={{
              overflow: 'hidden',
            }}
          >
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                onClick={() => handleRotateInFullScreen(-90)}
                className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
                title="Rotate counter-clockwise"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleRotateInFullScreen(90)}
                className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
                title="Rotate clockwise"
              >
                <RotateCw className="w-5 h-5" />
              </button>
              <button
                className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
                onClick={() => setExpandedImage(null)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                height: '100%',
                overflow: 'auto',
              }}
            >
              <div className="flex items-center justify-center w-full h-full">
                <img
                  src={expandedImage.url}
                  alt="Expanded preview"
                  className="max-w-full max-h-full object-contain rounded-lg bg-white"
                  style={{
                    transform: `rotate(${expandedImage.rotation}deg)`,
                    maxHeight: '90vh',
                    maxWidth: '90vw',
                  }}
                  onError={() => setExpandedImage(null)}
                />
              </div>
            </motion.div>

            {/* Mobile close button */}
            <button
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 md:hidden p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
              onClick={() => setExpandedImage(null)}
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Size Limit Exceeded Banner */}
      <AnimatePresence>
        {sizeLimitExceeded && (
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
                    <h3 className="font-bold text-lg">Storage Limit Warning</h3>
                    <p className="text-sm opacity-90">
                      You're approaching the total size limit. Max total: {maxTotalSize / (1024 * 1024)}MB on {isMobile ? 'mobile' : 'desktop'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSizeLimitExceeded(false)}
                  className="px-4 py-2 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ FIXED: Processing Error Banner with SPECIAL MOBILE MAXIMUM QUALITY MESSAGE */}
      <AnimatePresence>
        {processingError && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-red-500 to-orange-600 text-white p-4 shadow-lg"
          >
            <div className="container mx-auto max-w-7xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 animate-pulse flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">Conversion Failed</h3>
                    <p className="text-sm opacity-90 whitespace-pre-line">
                      {processingError}
                    </p>
                    {isMobile && compressionQuality === "none" && (
                      <div className="mt-2 text-xs bg-white/20 p-2 rounded">
                        📱 <strong>Maximum Quality Issue:</strong> On mobile, use "High Quality" (85%) instead for better results
                      </div>
                    )}
                    {isMobile && compressionQuality !== "none" && (
                      <div className="mt-2 text-xs bg-white/20 p-2 rounded">
                        📱 <strong>Quick Fix:</strong> Switch to "High Quality" (85%) in Quality Settings
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setProcessingError(null);
                      // Mobile maximum quality के लिए automatic fallback to high quality
                      if (isMobile && compressionQuality === "none") {
                        setCompressionQuality("high");
                        setTimeout(() => handleConvert(), 1000);
                      } else {
                        handleConvert();
                      }
                    }}
                    className="px-4 py-2 bg-white text-red-700 font-semibold rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    {isMobile && compressionQuality === "none" 
                      ? "Try with High Quality (85%)" 
                      : isMobile && compressionQuality !== "none"
                      ? "Try with High Quality"
                      : "Try Again"}
                  </button>
                  <button
                    onClick={() => setProcessingError(null)}
                    className="px-4 py-2 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
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
                      You've made changes to images or settings. Click "Convert Again" to update your PDF.
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
                Convert JPG to PDF Online Free
              </h1>

              
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
  maxSize={isMobile ? 500 : 1000}
/>

<div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600 dark:text-gray-400">
  <div className="flex items-center gap-2">
    <CheckCircle className="w-5 h-5 text-green-500" />
    <span>Unlimited Pages</span>
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
    <span>Size Reduction up to 80%</span>
  </div>
</div>

                {compressing && (
                  <div className="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">
                      Processing images...
                    </span>
                  </div>
                )}
              </div>

              {files.length > 0 && (
                <div className="space-y-8">
                  {/* Size Limit Warning */}
                  {sizeLimitExceeded && (
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-amber-800 dark:text-amber-300">
                            ⚠️ Storage Limit Warning
                          </h4>
                          <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                            You're approaching the total size limit of {maxTotalSize / (1024 * 1024)}MB on {isMobile ? 'mobile' : 'desktop'}.
                            Current total: {(files.reduce((sum, f) => sum + f.file.size, 0) / 1024 / 1024).toFixed(2)}MB
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ✅ FIXED: Processing Error Box with Mobile Support */}
                  {processingError && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-red-800 dark:text-red-300 mb-1">
                            Processing Error
                          </h3>
                          <p className="text-red-700 dark:text-red-400 mb-3 whitespace-pre-line">
                            {processingError}
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={() => {
                                setProcessingError(null);
                                if (isMobile && compressionQuality === "none") {
                                  setCompressionQuality("high");
                                  setTimeout(() => handleConvert(), 1000);
                                } else {
                                  handleConvert();
                                }
                              }}
                              className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-orange-700 transition-all shadow-md flex items-center gap-2"
                            >
                              <RefreshCw className="w-4 h-4" />
                              {isMobile && compressionQuality === "none" 
                                ? "Try with High Quality (85%)" 
                                : "Try Again"}
                            </button>
                            <button
                              onClick={() => setProcessingError(null)}
                              className="px-5 py-2.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                            >
                              Dismiss
                            </button>
                          </div>
                          {isMobile && (
                            <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                              <p className="text-sm text-blue-700 dark:text-blue-300">
                                <strong>📱 Mobile Tip:</strong> For best results on mobile, use "High Quality" (85%) setting instead of Maximum Quality.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

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
                            You've made changes to your images or settings. Your current PDF is outdated. Click the button below to convert again with the latest changes.
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
                        {files.length > 100 && (
                          <span className="ml-2 text-sm text-amber-600 dark:text-amber-400">
                            (Large conversion)
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Drag to reorder • Click to preview • Rotate to adjust
                        {isMobile && (
                          <span className="block text-xs text-blue-600 dark:text-blue-400 mt-1">
                            Max {MAX_SIZE_MOBILE / (1024 * 1024)}MB per file, {MAX_TOTAL_SIZE_MOBILE / (1024 * 1024)}MB total
                          </span>
                        )}
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

                            {/* Image Container */}
                            <div className={viewMode === "list" ? "w-20 h-20 flex-shrink-0" : "w-full"}>
                              <ImageContainer
                                file={item}
                                imageUrl={imageUrl}
                                rotation={item.rotation}
                                hasRotation={!!rotatedUrls[item.id]}
                                previewError={item.previewError || false}
                                onClick={() => handleExpandImage(item)}
                              />
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
                                  <div className="relative ml-auto">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowReplaceOptions(
                                          showReplaceOptions === item.id
                                            ? null
                                            : item.id
                                        );
                                      }}
                                      className="p-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                      title="Replace image"
                                    >
                                      <Replace className="w-3 h-3" />
                                    </button>

                                    {/* Replace Options Dropdown */}
                                    {showReplaceOptions === item.id && (
                                      <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setReplacingImageId(item.id);
                                            setShowReplaceOptions(null);
                                          }}
                                          className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                                        >
                                          Replace this image
                                        </button>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveFile(item);
                                            setShowReplaceOptions(null);
                                          }}
                                          className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center gap-2"
                                        >
                                          <X className="w-3 h-3" />
                                          Remove image
                                        </button>
                                      </div>
                                    )}
                                  </div>
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

                                {/* Replace Button for Grid View */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setReplacingImageId(item.id);
                                  }}
                                  className="absolute -top-2 -left-2 bg-blue-500 text-white p-1.5 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-10"
                                  title="Replace image"
                                >
                                  <Replace className="w-3 h-3" />
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
                                    title="Expand image"
                                  >
                                    <Maximize2 className="w-3 h-3" />
                                  </button>
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

                                {reverseOrder && (
                                  <div
                                    className="absolute -top-2 left-8 bg-purple-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <ArrowUpDown className="w-2 h-2" />R
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </DraggableItem>
                      );
                    })}
                  </div>

                  {/* Margin Settings Section */}
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-850 rounded-2xl p-4 md:p-5 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                      <Columns className="w-5 h-5 md:w-6 md:h-6 text-blue-500 flex-shrink-0" />
                      <div>
                        <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200">
                          Page Margins
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                          Choose margin size for printing & readability
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Compact Margin Options */}
                      <div className="grid grid-cols-3 gap-2 md:gap-3">
                        {(
                          [
                            {
                              value: "no-margin" as MarginSize,
                              label: "No",
                              icon: Expand,
                              color: "from-gray-500 to-gray-700",
                              size: '0"',
                            },
                            {
                              value: "small" as MarginSize,
                              label: "Small",
                              icon: Columns,
                              color: "from-blue-500 to-cyan-600",
                              size: '0.25"',
                            },
                            {
                              value: "big" as MarginSize,
                              label: "Big",
                              icon: Square,
                              color: "from-purple-500 to-pink-600",
                              size: '1"',
                            },
                          ] as const
                        ).map((option) => {
                          const Icon = option.icon;
                          return (
                            <button
                              key={option.value}
                              onClick={() => handleMarginChange(option.value)}
                              className={`flex flex-col items-center p-3 md:p-4 rounded-xl border transition-all ${
                                marginSize === option.value
                                  ? `bg-gradient-to-r ${option.color} text-white border-transparent shadow-md`
                                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
                              }`}
                            >
                              <div
                                className={`p-2 rounded-lg mb-2 ${
                                  marginSize === option.value
                                    ? "bg-white/20"
                                    : "bg-gray-100 dark:bg-gray-700"
                                }`}
                              >
                                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                              </div>
                              <div className="text-center">
                                <span className="font-semibold text-sm">
                                  {option.label}
                                </span>
                                <div className="text-xs opacity-80 mt-0.5">
                                  {option.size}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Current Selection Indicator */}
                      <div className="flex items-center justify-between px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              marginSize === "no-margin"
                                ? "bg-gray-500"
                                : marginSize === "small"
                                ? "bg-blue-500"
                                : "bg-purple-500"
                            }`}
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                            {marginSize === "no-margin"
                              ? "No Margin"
                              : marginSize === "small"
                              ? "Small Margin (0.25\")"
                              : "Big Margin (1\")"}
                          </span>
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {marginSize === "no-margin"
                            ? "Full page"
                            : marginSize === "small"
                            ? "0.25 inch"
                            : "1 inch"}
                        </span>
                      </div>

                      {/* Compact Margin Preview */}
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                            Preview
                          </h4>
                          <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                            <span className="hidden sm:inline">Current:</span>
                            <span className="font-medium">
                              {marginSize === "no-margin"
                                ? "No Margin"
                                : marginSize === "small"
                                ? "Small (0.25\")"
                                : "Big (1\")"}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Mini Preview */}
                        <div
                          className="relative mx-auto"
                          style={{ maxWidth: "200px" }}
                        >
                          {/* Page */}
                          <div className="relative w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 rounded-lg border-2 border-gray-300 dark:border-gray-600">
                            {/* Margin Area */}
                            <div
                              className={`absolute rounded-md transition-all duration-200 ${
                                marginSize === "no-margin"
                                  ? "inset-1 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600"
                                  : marginSize === "small"
                                  ? "inset-4 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 border border-blue-200 dark:border-blue-700"
                                  : "inset-5 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 border border-purple-200 dark:border-purple-700"
                              }`}
                            >
                              {/* Image Placeholder */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-10 h-12 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded flex items-center justify-center">
                                  <ImageIcon className="w-4 h-4 text-blue-400 dark:text-blue-300" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Margin Indicator */}
                          {marginSize !== "no-margin" && (
                            <div className="mt-2 flex items-center justify-center">
                              <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                                <div
                                  className={`w-8 h-0.5 ${
                                    marginSize === "small"
                                      ? "bg-blue-500"
                                      : "bg-purple-500"
                                  }`}
                                ></div>
                                <span>
                                  {marginSize === "small" ? '0.25"' : '1"'}
                                </span>
                                <div
                                  className={`w-8 h-0.5 ${
                                    marginSize === "small"
                                      ? "bg-blue-500"
                                      : "bg-purple-500"
                                  }`}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Usage Tips - Compact */}
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          <div className="text-center">
                            <div
                              className={`text-xs font-medium ${
                                marginSize === "no-margin"
                                  ? "text-gray-700 dark:text-gray-300"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              Digital
                            </div>
                            <div className="text-[10px] text-gray-500 dark:text-gray-500">
                              Screens
                            </div>
                          </div>
                          <div className="text-center">
                            <div
                              className={`text-xs font-medium ${
                                marginSize === "small"
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              Standard
                            </div>
                            <div className="text-[10px] text-gray-500 dark:text-gray-500">
                              Documents
                            </div>
                          </div>
                          <div className="text-center">
                            <div
                              className={`text-xs font-medium ${
                                marginSize === "big"
                                  ? "text-purple-600 dark:text-purple-400"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              Print
                            </div>
                            <div className="text-[10px] text-gray-500 dark:text-gray-500">
                              Notes
                            </div>
                          </div>
                        </div>

                        {/* Quick Tip */}
                        <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <div className="flex items-start gap-2">
                            <Target className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium text-[10px] text-blue-700 dark:text-blue-300">
                                {marginSize === "no-margin"
                                  ? "Best for digital viewing"
                                  : marginSize === "small"
                                  ? "Ideal for general documents (0.25\")"
                                  : "Perfect for printing (1\")"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Advanced Settings Section */}
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-850 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-6">
                      <Target className="w-7 h-7 text-blue-500" />
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Quality Control Settings
                        {isMobile && (
                          <span className="ml-2 text-sm text-blue-600 dark:text-blue-400">
                            (Mobile Optimized)
                          </span>
                        )}
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
                                desc: "85% Quality",
                                color: "from-cyan-500 to-blue-600",
                              },
                              {
                                value: "medium",
                                label: "Balanced",
                                icon: Layers,
                                desc: "75% Quality",
                                color: "from-amber-500 to-orange-600",
                              },
                              {
                                value: "low",
                                label: "Small Size",
                                icon: Zap,
                                desc: "60% Quality",
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
                                  {compressionQuality === option.value && (
                                    <span className="text-[10px] text-blue-500">
                                      ✓ Selected
                                    </span>
                                  )}
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
                                <span className="text-[10px]">Smallest Size</span>
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
                                Higher percentage = Better quality = Larger file size
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
                                ? "85%"
                                : compressionQuality === "medium"
                                ? "75%"
                                : "60%"}
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                            <div className="font-semibold text-gray-700 dark:text-gray-300">
                              Est. Size Reduction
                            </div>
                            <div className="text-lg font-bold text-green-600 dark:text-green-400">
                              {compressionQuality === "none"
                                ? "0%"
                                : compressionQuality === "custom"
                                ? `${Math.round((1 - (customQualityValue/100 * 0.7)) * 100)}%`
                                : compressionQuality === "high"
                                ? "50%"
                                : compressionQuality === "medium"
                                ? "70%"
                                : "80%"}
                            </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                            <div className="font-semibold text-gray-700 dark:text-gray-300">
                              Est. PDF Size
                            </div>
                            <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
                              {(estimatedPdfSize / (1024 * 1024)).toFixed(1)} MB
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

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                                className={`px-4 py-3 rounded-lg border transition-all text-base flex flex-col items-center justify-center ${
                                  paperSize === size
                                    ? "bg-blue-500 text-white border-blue-500 shadow-md"
                                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
                                }`}
                              >
                                <span className="font-bold">{size}</span>
                                <span className="text-xs mt-1 opacity-80">
                                  {size === "A4" 
                                    ? "210 × 297 mm" 
                                    : size === "Letter" 
                                    ? "8.5 × 11 in" 
                                    : size === "Legal" 
                                    ? "8.5 × 14 in" 
                                    : "297 × 420 mm"}
                                </span>
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

                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <Columns className="w-4 h-4" />
                          Page Margin
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {(["no-margin", "small", "big"] as MarginSize[]).map(
                            (margin) => (
                              <button
                                key={margin}
                                onClick={() => handleMarginChange(margin)}
                                className={`px-3 py-2.5 rounded-lg border transition-all text-sm flex flex-col items-center justify-center ${
                                  marginSize === margin
                                    ? margin === "no-margin"
                                      ? "bg-gray-500 text-white border-gray-500"
                                      : margin === "small"
                                      ? "bg-blue-500 text-white border-blue-500"
                                      : "bg-purple-500 text-white border-purple-500"
                                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
                                }`}
                              >
                                <span>
                                  {margin === "no-margin"
                                    ? "No Margin"
                                    : margin === "small"
                                    ? "Small (0.25\")"
                                    : "Big (1\")"}
                                </span>
                                <span className="text-xs mt-1 opacity-80">
                                  {margin === "no-margin"
                                    ? "0 mm"
                                    : margin === "small"
                                    ? "6.35 mm"
                                    : "25.4 mm"}
                                </span>
                              </button>
                            )
                          )}
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
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Total Pages:
                          </span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200 ml-2">
                            {files.length}
                            {files.length > 100 && (
                              <span className="text-amber-600 ml-1">⚠️</span>
                            )}
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
                            Margin:
                          </span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200 ml-2">
                            {marginSize === "no-margin"
                              ? "No Margin"
                              : marginSize === "small"
                              ? "Small Margin (0.25\")"
                              : "Big Margin (1\")"}
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
                              ? "High (85%)"
                              : compressionQuality === "medium"
                              ? "Medium (75%)"
                              : "Low (60%)"}
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
                            Est. PDF Size:
                          </span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200 ml-2">
                            {(estimatedPdfSize / (1024 * 1024)).toFixed(1)} MB
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Margin Size:
                          </span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200 ml-2">
                            {marginSize === "no-margin"
                              ? "0 mm"
                              : marginSize === "small"
                              ? "6.35 mm (0.25\")"
                              : "25.4 mm (1\")"}
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
                        {files.length > 50 && (
                          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                            <p className="text-sm text-amber-700 dark:text-amber-400 text-center">
                              ⏳ Processing {files.length} images may take time. Please be patient...
                            </p>
                          </div>
                        )}
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
                            Your high-quality PDF with{" "}
                            {marginSize === "no-margin"
                              ? "no margin"
                              : marginSize + " margin"}{" "}
                            is ready for download
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
                            <span className="text-gray-600 dark:text-gray-400">
                              Margin:{" "}
                              {marginSize === "no-margin"
                                ? "No Margin"
                                : marginSize === "small"
                                ? "Small (0.25\")"
                                : "Big (1\")"}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                              Order: {reverseOrder ? "Reverse" : "Normal"}
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
                            {isMobile && (
                              <span className="text-green-600 dark:text-green-400 font-semibold">
                                ✓ Mobile Optimized
                              </span>
                            )}
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
                          {!showChangesWarning && reverseOrder && " (Reverse Order)"}
                        </button>

                        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                          {showChangesWarning ? (
                            <span className="text-amber-600 dark:text-amber-400 font-semibold">
                              ⚠️ You have made changes to images or settings. Click above to convert again with the latest
                              changes.
                            </span>
                          ) : compressionQuality === "none" ? (
                            `Images will be converted with maximum 100% quality, ${
                              marginSize === "no-margin"
                                ? "no margin"
                                : marginSize + " margin"
                            } and ${reverseOrder ? "reverse" : "normal"} order for professional output`
                          ) : (
                            `Images will be converted with ${
                              compressionQuality === "custom"
                                ? `${customQualityValue}%`
                                : compressionQuality
                            } quality (${compressionQuality === "custom" ? `${customQualityValue}%` : compressionQuality === "high" ? "85%" : compressionQuality === "medium" ? "75%" : "60%"} compression), ${
                              marginSize === "no-margin"
                                ? "no margin"
                                : marginSize + " margin"
                            } and ${reverseOrder ? "reverse" : "normal"} order for optimal results`
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
                    Unlimited Uploads
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Upload unlimited images on both mobile and desktop. Max {maxSizePerFile / (1024 * 1024)}MB per file, {maxTotalSize / (1024 * 1024)}MB total.
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
                    <Columns className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                    Smart Size Reduction
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Reduce PDF file size up to 80% with smart compression while maintaining quality
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
      </div>
    </>
  );
}