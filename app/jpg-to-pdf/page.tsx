"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Suspense } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import ReactCrop, {
  type Crop as ReactCropType,
  type PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import {
  Download,
  ArrowLeft,
  X,
  Image as ImageIcon,
  Upload,
  CheckCircle,
  Loader2,
  Maximize2,
  Settings,
  Check,
  Crop as CropIcon,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Lock,
  Unlock,
  Square,
} from "lucide-react";

import FileUploader from "../components/FileUploader";
import ProgressBar from "../components/ProgressBar";
import { imageToPdf } from "../../utils/pdfUtils";
import { downloadFile } from "../../utils/imageUtils";

import type { PaperSize, Orientation } from "../../types";

interface FileWithPreview {
  file: File;
  previewUrl?: string;
  croppedUrl?: string;
  id: string;
  crop?: ReactCropType;
  rotation: number;
  scale: number;
  aspectRatio: "free" | "1:1" | "4:3" | "16:9" | "A4";
}

const MAX_PAGES_COUNT = 1000;

const aspectRatioOptions = {
  "free": { label: "Free", value: undefined },
  "1:1": { label: "Square (1:1)", value: 1 },
  "4:3": { label: "Standard (4:3)", value: 4/3 },
  "16:9": { label: "Widescreen (16:9)", value: 16/9 },
  "A4": { label: "A4 Paper", value: 210/297 },
};

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
    let newProgress =
      initial + ((final - initial) * elapsed) / durationMs;

    if (newProgress >= final) {
      newProgress = final;
      clearInterval(progressId);
    }
    callback(Math.floor(newProgress));
  }, interval);

  return () => clearInterval(progressId);
};

function getCroppedImg(
  imageSrc: string,
  crop: PixelCrop,
  rotation: number = 0,
  scale: number = 1
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('No 2d context'));
          return;
        }

        const scaleX = img.naturalWidth / img.width;
        const scaleY = img.naturalHeight / img.height;

        const pixelRatio = window.devicePixelRatio || 1;

        const canvasWidth = Math.max(1, Math.floor(crop.width * scaleX * pixelRatio * scale));
        const canvasHeight = Math.max(1, Math.floor(crop.height * scaleY * pixelRatio * scale));
        
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        ctx.scale(pixelRatio, pixelRatio);
        ctx.imageSmoothingQuality = 'high';

        const cropX = crop.x * scaleX;
        const cropY = crop.y * scaleY;

        ctx.save();

        const translateX = canvas.width / 2 / pixelRatio / scale;
        const translateY = canvas.height / 2 / pixelRatio / scale;
        ctx.translate(translateX, translateY);
        
        if (rotation !== 0) {
          ctx.rotate((rotation * Math.PI) / 180);
        }

        const drawX = -canvas.width / 2 / pixelRatio / scale;
        const drawY = -canvas.height / 2 / pixelRatio / scale;
        const drawWidth = canvas.width / pixelRatio / scale;
        const drawHeight = canvas.height / pixelRatio / scale;

        ctx.drawImage(
          img,
          cropX,
          cropY,
          crop.width * scaleX,
          crop.height * scaleY,
          drawX,
          drawY,
          drawWidth,
          drawHeight
        );

        ctx.restore();

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas is empty'));
              return;
            }
            resolve(URL.createObjectURL(blob));
          },
          'image/jpeg',
          0.95
        );
      } catch (drawError) {
        reject(new Error(`Failed to draw image: ${drawError instanceof Error ? drawError.message : 'Unknown error'}`));
      }
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image for cropping'));
    };
    
    img.src = imageSrc;
  });
}

export default function JpgToPdf() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [paperSize, setPaperSize] = useState<PaperSize>("A4");
  const [orientation, setOrientation] = useState<Orientation>("Portrait");
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const [cropModal, setCropModal] = useState<{
    isOpen: boolean;
    fileIndex: number;
    imageSrc: string;
    crop: ReactCropType;
    rotation: number;
    scale: number;
    lockedAspectRatio: "free" | "1:1" | "4:3" | "16:9" | "A4";
  } | null>(null);
  
  const cropImageRef = useRef<HTMLImageElement>(null);
  const [cropImageLoaded, setCropImageLoaded] = useState(false);
  const [cropImageError, setCropImageError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
// app/jpg-to-pdf/page.tsx
// Naya useEffect (line 315 ke aaspaas, jahan puraana galat useEffect tha)

useEffect(() => {
  // Jab component unmount hoga, tab yeh return function chalega.
  return () => {
    files.forEach((item) => {
      // Sirf previewUrl aur croppedUrl ko revoke karein
      if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      if (item.croppedUrl) URL.revokeObjectURL(item.croppedUrl);
    });
  };
}, []); // Dependency array mein [files] nahi hona chahiye!
 

  const handleRemoveFile = useCallback((fileToRemove: FileWithPreview) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileToRemove.id));
    if (fileToRemove.previewUrl) URL.revokeObjectURL(fileToRemove.previewUrl);
    if (fileToRemove.croppedUrl) URL.revokeObjectURL(fileToRemove.croppedUrl);
    setPdfBlob(null);
    setProgress(0);
    setShowDownloadSuccess(false);
    setHasDownloaded(false);
  }, []);

  // app/jpg-to-pdf/page.tsx
  const handleFilesUpdate = useCallback((newFiles: File[]) => {
    const filesWithIds: FileWithPreview[] = newFiles.map(file => ({
      file: file,
      previewUrl: file.type && file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      id: Math.random().toString(36).substr(2, 9),
      rotation: 0,
      scale: 1,
      aspectRatio: "free"
    }));

    let filesToSet = filesWithIds;

    if (filesWithIds.length > MAX_PAGES_COUNT) {
      alert(
        `Maximum ${MAX_PAGES_COUNT} files allowed. Only first ${MAX_PAGES_COUNT} are used.`
      );
      filesToSet = filesWithIds.slice(0, MAX_PAGES_COUNT);
    }

    setFiles(filesToSet);
    setPdfBlob(null);
    setProgress(0);
    setShowDownloadSuccess(false);
    setHasDownloaded(false);
  }, []);

  const openCropModal = (index: number) => {
    const file = files[index];
    if (!file.previewUrl) return;

    const initialCrop: ReactCropType = file.crop || {
      unit: '%',
      x: 0,
      y: 0,
      width: 100,
      height: 100
    };

    // Reset states
    setCropImageLoaded(false);
    setCropImageError(false);
    
    setCropModal({
      isOpen: true,
      fileIndex: index,
      imageSrc: file.previewUrl,
      crop: initialCrop,
      rotation: file.rotation,
      scale: file.scale,
      lockedAspectRatio: file.aspectRatio
    });
  };

  const handleCropChange = (crop: ReactCropType) => {
    if (cropModal) {
      setCropModal(prev => prev ? { ...prev, crop } : null);
    }
  };

  const handleRotationChange = (rotation: number) => {
    if (cropModal) {
      setCropModal(prev => prev ? { ...prev, rotation } : null);
    }
  };

  const handleScaleChange = (scale: number) => {
    if (cropModal) {
      setCropModal(prev => prev ? { ...prev, scale: Math.max(0.5, Math.min(3, scale)) } : null);
    }
  };

  const handleAspectRatioChange = (ratio: "free" | "1:1" | "4:3" | "16:9" | "A4") => {
    if (cropModal && cropImageRef.current && cropImageLoaded) {
      const { width, height } = cropImageRef.current;
      let newCrop: ReactCropType;
      
      if (ratio === "free") {
        newCrop = { ...cropModal.crop };
      } else {
        const aspectValue = aspectRatioOptions[ratio].value;
        const crop = centerCrop(
          makeAspectCrop(
            {
              unit: '%',
              width: 90,
            },
            aspectValue!,
            width,
            height
          ),
          width,
          height
        );
        newCrop = crop;
      }

      setCropModal(prev => prev ? { 
        ...prev, 
        crop: newCrop,
        lockedAspectRatio: ratio 
      } : null);
    }
  };

  const handleCropImageLoad = () => {
    setCropImageLoaded(true);
    setCropImageError(false);
  };

  const handleCropImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // FIX: Hanya log error tanpa akses ke searchParams
    console.error("Failed to load crop image:", e.currentTarget.src); 
    setCropImageLoaded(false);
    setCropImageError(true);
  };

  const applyCrop = async () => {
    if (!cropModal) {
      alert("Crop modal is not open");
      return;
    }

    if (cropImageError) {
      alert("Cannot crop image because it failed to load. Please try again.");
      return;
    }

    try {
      const croppedImageUrl = await getCroppedImg(
        cropModal.imageSrc,
        cropModal.crop as PixelCrop,
        cropModal.rotation,
        cropModal.scale
      );

      setFiles(prev => prev.map((file, index) => {
        if (index === cropModal.fileIndex) {
          if (file.croppedUrl) URL.revokeObjectURL(file.croppedUrl);
          
          return {
            ...file,
            croppedUrl: croppedImageUrl,
            crop: cropModal.crop,
            rotation: cropModal.rotation,
            scale: cropModal.scale,
            aspectRatio: cropModal.lockedAspectRatio
          };
        }
        return file;
      }));

      setCropModal(null);
      setCropImageLoaded(false);
      setCropImageError(false);
    } catch (error) {
      console.error("Failed to crop image:", error);
      alert(`Failed to crop image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleConvert = async () => {
    if (files.length === 0) return;

    setConverting(true);
    setPdfBlob(null);
    setShowDownloadSuccess(false);
    setHasDownloaded(false);

    const filesToConvert = await Promise.all(files.map(async (f) => {
      if (f.croppedUrl) {
        const response = await fetch(f.croppedUrl);
        const blob = await response.blob();
        return new File([blob], f.file.name, { type: 'image/jpeg' });
      }
      return f.file;
    }));

    let cleanup: (() => void) | null = null;

    try {
      setProgress(10);
      cleanup = simulateProgress(setProgress, 10, 90, 5000);

      const blob = await imageToPdf(
        filesToConvert, 
        paperSize,
        orientation
      );

      if (cleanup) cleanup();
      setProgress(100);

      setTimeout(() => {
        setPdfBlob(blob);
        setConverting(false);
      }, 500);
    } catch (err) {
      if (cleanup) cleanup();
      console.error("Conversion error:", err);
      alert("Failed to convert images to PDF.");
      setProgress(0);
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (pdfBlob) {
      downloadFile(pdfBlob, "converted.pdf");
      setShowDownloadSuccess(true);
      setHasDownloaded(true);
      setTimeout(() => {
        setShowDownloadSuccess(false);
      }, 3000);
    }
  };

  const resetCrop = (index: number) => {
    setFiles(prev => prev.map((file, i) => {
      if (i === index && file.croppedUrl) {
        URL.revokeObjectURL(file.croppedUrl);
        return {
          ...file,
          croppedUrl: undefined,
          crop: undefined,
          rotation: 0,
          scale: 1,
          aspectRatio: "free"
        };
      }
      return file;
    }));
  };

  if (!isClient) return null;

  return (
    <>
      <AnimatePresence>
        {showDownloadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Download Complete! ✅</p>
                <p className="text-sm opacity-90">PDF saved to your device</p>
              </div>
              <button
                onClick={() => setShowDownloadSuccess(false)}
                className="ml-4 text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setExpandedImage(null)}
          >
            <motion.img
  initial={{ scale: 0.9 }}
  animate={{ scale: 1 }}
  exit={{ scale: 0.9 }}
  src={expandedImage}
  alt="Expanded preview"
  className="max-w-full max-h-[90vh] object-contain rounded-lg"
  onError={(e) => {
    // 💡 Logging the source confirms the revoked Blob URL
    console.error("Failed to load expanded image:", e.currentTarget.src); 
    e.currentTarget.style.display = 'none';
  }}
/>
            <button
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setExpandedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cropModal?.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 overflow-y-auto"
            key={`crop-modal-${cropModal.fileIndex}`}
          >
            <div className="min-h-screen flex flex-col items-center justify-center p-4 py-8">
              <div className="w-full max-w-6xl">
                <div className="flex items-center justify-between text-white mb-6">
                  <div>
                    <h3 className="text-2xl font-bold">Crop & Edit Image</h3>
                    <p className="text-sm opacity-80">Adjust your image before converting</p>
                  </div>
                  <button
                    onClick={() => {
                      setCropModal(null);
                      setCropImageLoaded(false);
                      setCropImageError(false);
                    }}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className={`flex ${isMobile ? 'flex-col' : 'flex-col lg:flex-row'} gap-6`}>
                  {/* Image Section */}
                  <div className={`${isMobile ? 'w-full' : 'lg:w-2/3'}`}>
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 relative">
                      <div className={`relative w-full ${isMobile ? 'h-[60vh]' : 'h-[400px] lg:h-[500px]'} rounded-lg overflow-hidden`}>
                        {cropModal && !cropImageError && (
                          <ReactCrop
                            crop={cropModal.crop}
                            onChange={handleCropChange}
                            aspect={aspectRatioOptions[cropModal.lockedAspectRatio].value}
                            minWidth={50}
                            minHeight={50}
                            className="w-full h-full"
                            disabled={!cropImageLoaded}
                          >
                            <img
                              ref={cropImageRef}
                              key={`crop-image-${cropModal.fileIndex}`}
                              src={cropModal.imageSrc}
                              alt="Crop preview"
                              className="max-w-full max-h-full object-contain"
                              style={{
                                transform: `rotate(${cropModal.rotation}deg) scale(${cropModal.scale})`,
                                transition: 'transform 0.2s',
                                display: cropImageLoaded ? 'block' : 'none'
                              }}
                              onLoad={handleCropImageLoad}
                              onError={handleCropImageError}
                              crossOrigin="anonymous"
                            />
                          </ReactCrop>
                        )}

                        {!cropImageLoaded && !cropImageError && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                            <div className="text-white text-center">
                              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                              <p>Loading image...</p>
                            </div>
                          </div>
                        )}

                        {cropImageError && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-lg">
                            <div className="text-white text-center p-4">
                              <X className="w-12 h-12 text-red-400 mx-auto mb-3" />
                              <h4 className="text-xl font-bold mb-2">Failed to Load Image</h4>
                              <p className="text-gray-300 mb-4">
                                The image could not be loaded for cropping.
                              </p>
                              <div className="flex gap-3 justify-center">
                                <button
                                  onClick={() => {
                                    setCropImageError(false);
                                    setCropImageLoaded(false);
                                  }}
                                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                                >
                                  Retry
                                </button>
                                <button
                                  onClick={() => {
                                    setCropModal(null);
                                    setCropImageLoaded(false);
                                    setCropImageError(false);
                                  }}
                                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {isMobile ? (
                      <div className="mt-4 text-center text-gray-400 text-sm">
                        <p>👆 Drag to move crop area • Pinch to resize</p>
                      </div>
                    ) : (
                      <div className="mt-4 text-center text-gray-400 text-sm lg:hidden">
                        <p>👆 Drag to move crop area • Pinch to resize • Tap buttons to adjust</p>
                      </div>
                    )}
                  </div>

                  {/* Controls Section - Hidden on mobile when in simple mode */}
                  {!isMobile && (
                    <div className="lg:w-1/3 space-y-6">
                      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Square className="w-5 h-5 text-blue-400" />
                          <h4 className="text-white font-semibold">Aspect Ratio</h4>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-2 xl:grid-cols-5 gap-2">
                          {Object.entries(aspectRatioOptions).map(([key, option]) => (
                            <button
                              key={key}
                              onClick={() => handleAspectRatioChange(key as any)}
                              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                cropModal?.lockedAspectRatio === key
                                  ? 'bg-blue-500 text-white shadow-lg'
                                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                              }`}
                              disabled={!cropImageLoaded || cropImageError}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <RotateCw className="w-5 h-5 text-purple-400" />
                            <h4 className="text-white font-semibold">Rotation</h4>
                          </div>
                          <span className="text-white font-bold">{cropModal?.rotation}°</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleRotationChange((cropModal?.rotation || 0) - 90)}
                            className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors"
                            disabled={!cropImageLoaded || cropImageError}
                          >
                            <RotateCw className="w-5 h-5" />
                          </button>
                          <input
                            type="range"
                            min="0"
                            max="360"
                            value={cropModal?.rotation || 0}
                            onChange={(e) => handleRotationChange(parseInt(e.target.value))}
                            className="flex-1"
                            disabled={!cropImageLoaded || cropImageError}
                          />
                          <button
                            onClick={() => handleRotationChange((cropModal?.rotation || 0) + 90)}
                            className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors"
                            disabled={!cropImageLoaded || cropImageError}
                          >
                            <RotateCw className="w-5 h-5 rotate-90" />
                          </button>
                        </div>
                      </div>

                      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            {cropModal?.scale && cropModal.scale > 1 ? (
                              <ZoomIn className="w-5 h-5 text-green-400" />
                            ) : (
                              <ZoomOut className="w-5 h-5 text-yellow-400" />
                            )}
                            <h4 className="text-white font-semibold">Zoom</h4>
                          </div>
                          <span className="text-white font-bold">{cropModal?.scale?.toFixed(1)}x</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleScaleChange((cropModal?.scale || 1) - 0.1)}
                            className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors"
                            disabled={!cropImageLoaded || cropImageError || (cropModal?.scale !== undefined && cropModal.scale <= 0.5)}
                          >
                            <ZoomOut className="w-5 h-5" />
                          </button>
                          <input
                            type="range"
                            min="0.5"
                            max="3"
                            step="0.1"
                            value={cropModal?.scale || 1}
                            onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
                            className="flex-1"
                            disabled={!cropImageLoaded || cropImageError}
                          />
                          <button
                            onClick={() => handleScaleChange((cropModal?.scale || 1) + 0.1)}
                            className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors"
                            disabled={!cropImageLoaded || cropImageError || (cropModal?.scale !== undefined && cropModal.scale >= 3)}
                          >
                            <ZoomIn className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 pt-4">
                        <button
                          onClick={applyCrop}
                          className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!cropImageLoaded || cropImageError}
                        >
                          {!cropImageLoaded && !cropImageError ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Loading...
                            </>
                          ) : cropImageError ? (
                            <>
                              <X className="w-5 h-5" />
                              Image Failed to Load
                            </>
                          ) : (
                            <>
                              <Check className="w-5 h-5" />
                              Apply Crop
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setCropModal(null);
                            setCropImageLoaded(false);
                            setCropImageError(false);
                          }}
                          className="w-full py-3.5 px-6 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                          <X className="w-5 h-5" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Mobile-only simplified controls */}
{isMobile && (
  <div className="w-full mt-4">
    {/* Loading state */}
    {!cropImageLoaded && !cropImageError && (
      <div className="text-center p-4 mb-4">
        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-white" />
        <p className="text-gray-300">Loading image...</p>
        {/* Cancel button even while loading */}
        <button
          onClick={() => {
            setCropModal(null);
            setCropImageLoaded(false);
            setCropImageError(false);
          }}
          className="w-full mt-4 py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <X className="w-5 h-5" />
          Cancel
        </button>
      </div>
    )}

    {/* Error state */}
    {cropImageError && (
      <div className="text-center p-4 bg-red-900/30 rounded-xl mb-4">
        <X className="w-8 h-8 text-red-400 mx-auto mb-2" />
        <p className="text-red-300">Image failed to load</p>
        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={() => {
              setCropImageError(false);
              setCropImageLoaded(false);
            }}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors text-white"
          >
            Retry Loading
          </button>
          <button
            onClick={() => {
              setCropModal(null);
              setCropImageLoaded(false);
              setCropImageError(false);
            }}
            className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            Cancel
          </button>
        </div>
      </div>
    )}

    {/* Loaded state - show all controls */}
    {cropImageLoaded && !cropImageError && (
      <>
        <div className="grid grid-cols-4 gap-3 mb-4">
          <button
            onClick={() => handleRotationChange((cropModal?.rotation || 0) - 90)}
            className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors flex flex-col items-center justify-center"
          >
            <RotateCw className="w-5 h-5 mb-1" />
            <span className="text-xs">-90°</span>
          </button>
          
          <button
            onClick={() => handleRotationChange((cropModal?.rotation || 0) + 90)}
            className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors flex flex-col items-center justify-center"
          >
            <RotateCw className="w-5 h-5 rotate-90 mb-1" />
            <span className="text-xs">+90°</span>
          </button>
          
          <button
            onClick={() => handleScaleChange((cropModal?.scale || 1) - 0.1)}
            className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors flex flex-col items-center justify-center"
            disabled={cropModal?.scale !== undefined && cropModal.scale <= 0.5}
          >
            <ZoomOut className="w-5 h-5 mb-1" />
            <span className="text-xs">Zoom -</span>
          </button>
          
          <button
            onClick={() => handleScaleChange((cropModal?.scale || 1) + 0.1)}
            className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors flex flex-col items-center justify-center"
            disabled={cropModal?.scale !== undefined && cropModal.scale >= 3}
          >
            <ZoomIn className="w-5 h-5 mb-1" />
            <span className="text-xs">Zoom +</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <button
            onClick={() => handleAspectRatioChange("free")}
            className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${
              cropModal?.lockedAspectRatio === "free"
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Free
          </button>
          <button
            onClick={() => handleAspectRatioChange("1:1")}
            className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${
              cropModal?.lockedAspectRatio === "1:1"
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            1:1
          </button>
          <button
            onClick={() => handleAspectRatioChange("A4")}
            className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${
              cropModal?.lockedAspectRatio === "A4"
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            A4
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={applyCrop}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Apply Crop
          </button>
          <button
            onClick={() => {
              setCropModal(null);
              setCropImageLoaded(false);
              setCropImageError(false);
            }}
            className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            Cancel
          </button>
        </div>
      </>
    )}
  </div>
)}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-gray-900 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </a>

            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                JPG to PDF Converter
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Transform your images into a polished PDF document with advanced editing features
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl p-4 md:p-8 mb-8">
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Upload className="w-5 h-5 text-blue-500" />
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
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
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>JPG, PNG, WebP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Crop & Edit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Multiple selection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Secure & private</span>
                  </div>
                </div>
              </div>

              {files.length > 0 && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Selected Images ({files.length})
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Click on crop button to edit each image
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        files.forEach(file => {
                          if (file.previewUrl) URL.revokeObjectURL(file.previewUrl);
                          if (file.croppedUrl) URL.revokeObjectURL(file.croppedUrl);
                        });
                        setFiles([]);
                        setPdfBlob(null);
                        setProgress(0);
                        setShowDownloadSuccess(false);
                        setHasDownloaded(false);
                      }}
                      className="px-4 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Clear All
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <AnimatePresence initial={false}>
                      {files.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          layout
                          className="group relative"
                        >
                          <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 aspect-square cursor-pointer"
                              onClick={() => setExpandedImage(item.croppedUrl || item.previewUrl || '')}>
                            {item.croppedUrl && (
                              <div className="absolute top-2 left-2 z-10 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                <CropIcon className="w-3 h-3" />
                                <span>Cropped</span>
                              </div>
                            )}
                            
                            {(item.croppedUrl || item.previewUrl) ? (
                              <>
                                <img
                                  src={item.croppedUrl || item.previewUrl}
                                  alt={item.file.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  onError={(e) => {
                                    console.error("Failed to load thumbnail image");
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                              </>
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                                <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center truncate w-full">
                                  {item.file.name}
                                </p>
                              </div>
                            )}
                            
                            {(item.croppedUrl || item.previewUrl) && (
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-xs truncate font-medium">{item.file.name}</p>
                                <p className="text-xs opacity-80">
                                  {(item.file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                                {item.croppedUrl && (
                                  <p className="text-xs text-green-300 mt-1">
                                    ✓ Edited
                                  </p>
                                )}
                              </div>
                            )}
                            
                            <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                              {index + 1}
                            </div>
                            
                            {(item.croppedUrl || item.previewUrl) && (
                              <button
                                className="absolute top-2 right-10 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedImage(item.croppedUrl || item.previewUrl || '');
                                }}
                              >
                                <Maximize2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          
                          <div className="absolute bottom-2 left-2 right-2 flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openCropModal(index);
                              }}
                              className="flex-1 py-2 px-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs rounded-lg font-medium flex items-center justify-center gap-1 transition-all"
                            >
                              <CropIcon className="w-3 h-3" />
                              {item.croppedUrl ? 'Edit' : 'Crop'}
                            </button>
                            
                            {item.croppedUrl && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  resetCrop(index);
                                }}
                                className="px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-xs rounded-lg font-medium flex items-center justify-center gap-1 transition-all"
                                title="Reset to original"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFile(item);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors z-10"
                            aria-label={`Remove ${item.file.name}`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Settings className="w-5 h-5 text-blue-500" />
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        PDF Settings
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Paper Size
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {(["A4", "Letter", "Legal", "A3"] as PaperSize[]).map((size) => (
                            <button
                              key={size}
                              onClick={() => setPaperSize(size)}
                              className={`px-4 py-3 rounded-lg border transition-all ${
                                paperSize === size
                                  ? "bg-blue-500 text-white border-blue-500 shadow-md"
                                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Orientation
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setOrientation("Portrait")}
                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                              orientation === "Portrait"
                                ? "bg-blue-500 text-white border-blue-500 shadow-md"
                                : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
                            }`}
                          >
                            <div className="w-4 h-6 border-2 border-current rounded" />
                            <span>Portrait</span>
                          </button>
                          <button
                            onClick={() => setOrientation("Landscape")}
                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                              orientation === "Landscape"
                                ? "bg-blue-500 text-white border-blue-500 shadow-md"
                                : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
                            }`}
                          >
                            <div className="w-6 h-4 border-2 border-current rounded" />
                            <span>Landscape</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>Total Pages:</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{files.length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                        <span>Edited Images:</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          {files.filter(f => f.croppedUrl).length} of {files.length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                        <span>Paper Size:</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{paperSize} ({orientation})</span>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {converting && (
                      <motion.div
                        key="converting"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-8"
                      >
                        <ProgressBar
                          progress={progress}
                          label={
                            progress < 90
                              ? "Processing images..."
                              : "Finalizing PDF..."
                          }
                        />
                        <div className="flex items-center justify-center gap-2 mt-4 text-blue-600 dark:text-blue-400">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span className="text-sm font-medium">
                            Creating your PDF document...
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
                        className="mt-8 space-y-4"
                      >
                        <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-850 rounded-2xl border border-green-200 dark:border-emerald-800">
                          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            Conversion Complete! 🎉
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Your PDF is ready to download
                          </p>
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              File Size: {(pdfBlob.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                              Pages: {files.length}
                            </span>
                            <span className="text-green-600 dark:text-green-400">
                              Edited: {files.filter(f => f.croppedUrl).length} images
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <button
                            onClick={() => {
                              files.forEach(file => {
                                if (file.previewUrl) URL.revokeObjectURL(file.previewUrl);
                                if (file.croppedUrl) URL.revokeObjectURL(file.croppedUrl);
                              });
                              setFiles([]);
                              setPdfBlob(null);
                              setProgress(0);
                              setShowDownloadSuccess(false);
                              setHasDownloaded(false);
                            }}
                            className="py-3 px-6 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                          >
                            Convert More Files
                          </button>
                          <button
                            onClick={handleDownload}
                            className="py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl font-medium flex items-center justify-center gap-3"
                          >
                            <Download className="w-5 h-5" />
                            Download PDF
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
                        className="mt-8"
                      >
                        <button
                          onClick={handleConvert}
                          disabled={files.length === 0}
                          className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold flex items-center justify-center gap-3"
                        >
                          <ImageIcon className="w-6 h-6" />
                          Convert {files.length} Image{files.length !== 1 ? "s" : ""} to PDF
                        </button>
                        
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                          {files.filter(f => f.croppedUrl).length > 0 ? (
                            <span className="text-green-600 dark:text-green-400">
                              ✓ {files.filter(f => f.croppedUrl).length} image(s) edited • 
                            </span>
                          ) : ''} Your images will be converted to a single PDF document
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {files.length === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="inline-flex p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4">
                    <CropIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                    Advanced Crop Tools
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Crop, rotate, zoom, and adjust aspect ratios for perfect images
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="inline-flex p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg mb-4">
                    <Maximize2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                    Touch Optimized
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Perfect for mobile & tablet with pinch-to-zoom and touch gestures
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="inline-flex p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mb-4">
                    <Settings className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                    Custom Settings
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Multiple paper sizes, orientations, and aspect ratio presets
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}