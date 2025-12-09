"use client"; 
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  ArrowLeft, 
  Image, 
  Zap, 
  Shield, 
  Minimize2 as Compress, 
  TrendingDown, 
  Sparkles, 
  CheckCircle, 
  Settings, 
  Eye, 
  Maximize2, 
  X,
  FileText // Added FileText import
} from 'lucide-react';
import FileUploader from '../components/FileUploader';
import ProgressBar from '../components/ProgressBar';
// Assuming the path to imageUtils is correct
import { compressImage, downloadFile } from '../../utils/imageUtils';

// --- Smart filename generator ---
const generateCompressedFilename = (originalName: string, quality: number, index?: number): string => {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
  
  // Clean original filename
  const cleanName = originalName
    .replace(/\.[^.]+$/, '') // Remove extension
    .replace(/[^a-zA-Z0-9\s-_]/g, '')
    .substring(0, 30)
    .trim();
  
  // Get file extension
  const extension = originalName.split('.').pop()?.toLowerCase() || 'jpg';
  
  if (index !== undefined) {
    // Single file with index
    return `${cleanName}_compressed_${quality}quality_${dateStr}.${extension}`;
  } else {
    // Default for multiple files
    return `${cleanName}_compressed_${quality}quality_${dateStr}.${extension}`;
  }
};

// --- Interface for ImagePreview Component Props ---
interface ImagePreviewProps {
    originalFile: File;
    compressedBlob: Blob | null;
    index: number;
    quality: number;
    onPreview: (url: string, index: number, isCompressed: boolean) => void;
}

// Image Preview Component
const ImagePreview = ({ originalFile, compressedBlob, index, quality, onPreview }: ImagePreviewProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const originalUrl = useMemo(() => URL.createObjectURL(originalFile), [originalFile]);
    const compressedUrl = useMemo(() => compressedBlob ? URL.createObjectURL(compressedBlob) : null, [compressedBlob]);
    
    const originalSize = (originalFile.size / 1024).toFixed(1);
    const compressedSize = compressedBlob ? (compressedBlob.size / 1024).toFixed(1) : null;
    const savings = compressedBlob ? (((originalFile.size - compressedBlob.size) / originalFile.size) * 100).toFixed(1) : null;

    // Cleanup URLs on unmount
    useEffect(() => {
        return () => {
            URL.revokeObjectURL(originalUrl);
            if (compressedUrl) {
                URL.revokeObjectURL(compressedUrl);
            }
        };
    }, [originalUrl, compressedUrl]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative group"
        >
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-3 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Image Number Badge */}
                <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
                    #{index + 1}
                </div>
                
                {/* Quality Badge */}
                {compressedBlob && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                        {quality}%
                    </div>
                )}

                {/* Image Container */}
                <div 
                    className="relative w-full h-32 mb-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => onPreview(compressedUrl || originalUrl, index + 1, !!compressedBlob)}
                >
                    <img 
                        src={compressedUrl || originalUrl} 
                        alt={`Image ${index + 1}`} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                            console.error("Failed to load image preview");
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                    
                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                        <div className="flex flex-col items-center gap-1">
                            <Eye className="w-5 h-5 text-white" />
                            <span className="text-xs text-white font-medium">Preview</span>
                        </div>
                    </div>
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    {/* Compressed Indicator */}
                    {compressedBlob && (
                        <div className="absolute bottom-2 left-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-2 py-0.5 rounded-full">
                            ✓ Compressed
                        </div>
                    )}
                </div>

                {/* Image Info */}
                <div className="space-y-2">
                    <p className="text-sm font-semibold truncate text-gray-900 dark:text-white px-1" title={originalFile.name}>
                        {originalFile.name}
                    </p>
                    
                    <div className="flex justify-between items-center px-1">
                        <div className={`text-xs ${compressedBlob ? 'text-gray-500 line-through' : 'text-gray-500 dark:text-gray-400'}`}>
                            {originalSize} KB
                        </div>
                        
                        {compressedBlob && (
                            <div className="flex items-center gap-1">
                                <div className="text-xs text-green-600 dark:text-green-400 font-semibold">
                                    {compressedSize} KB
                                </div>
                                {savings && (
                                    <div className="text-xs px-1 py-0.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full ml-1">
                                        -{savings}%
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default function CompressImage() {
    const [files, setFiles] = useState<File[]>([]);
    const [quality, setQuality] = useState(80);
    const [converting, setConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [compressedBlobs, setCompressedBlobs] = useState<Blob[]>([]);
    const [compressionStats, setCompressionStats] = useState<{ original: number; compressed: number } | null>(null);
    const [showUploadInfo, setShowUploadInfo] = useState(true);
    const [expandedView, setExpandedView] = useState(false);
    const [previewModal, setPreviewModal] = useState<{ 
        url: string | null, 
        index: number | null,
        isCompressed: boolean 
    }>({ url: null, index: null, isCompressed: false });
    const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
    const [downloading, setDownloading] = useState(false);
    const [compressionComplete, setCompressionComplete] = useState(false);

    const handleConvert = async () => {
        if (files.length === 0) return;

        setConverting(true);
        setProgress(0);
        setCompressedBlobs([]);
        setCompressionStats(null);
        setShowUploadInfo(false);
        setDownloadSuccess(null);
        setCompressionComplete(false);

        try {
            const blobs: Blob[] = [];
            let totalOriginal = 0;
            let totalCompressed = 0;

            for (let i = 0; i < files.length; i++) {
                setProgress(20 + (i / files.length) * 60);
                const blob = await compressImage(files[i], quality / 100);
                blobs.push(blob);
                totalOriginal += files[i].size;
                totalCompressed += blob.size;
                await new Promise(resolve => setTimeout(resolve, 200));
            }

            setProgress(90);
            await new Promise(resolve => setTimeout(resolve, 300));
            
            setProgress(100);
            setCompressedBlobs(blobs);
            setCompressionStats({ original: totalOriginal, compressed: totalCompressed });
            setCompressionComplete(true);
            
            // Show compression success message
            const savingsPercent = ((1 - totalCompressed / totalOriginal) * 100).toFixed(1);
            setDownloadSuccess(`✓ Successfully compressed ${files.length} images! (Saved ${savingsPercent}%)`);
            setTimeout(() => setDownloadSuccess(null), 5000);
        } catch (error) {
            console.error('Compression error:', error);
            setDownloadSuccess("✗ Failed to compress images. Please try again.");
            setTimeout(() => setDownloadSuccess(null), 3000);
        } finally {
            setConverting(false);
        }
    };

    const handleDownload = async () => {
        if (compressedBlobs.length === 0) return;

        setDownloading(true);
        try {
            for (let i = 0; i < compressedBlobs.length; i++) {
                const filename = generateCompressedFilename(files[i].name, quality, i);
                downloadFile(compressedBlobs[i], filename);
                
                // Small delay between downloads
                if (i < compressedBlobs.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
            
            // Show download success message
            setDownloadSuccess(`✓ Downloaded ${compressedBlobs.length} images successfully!`);
            setTimeout(() => setDownloadSuccess(null), 5000);
        } catch (error) {
            console.error('Download error:', error);
            setDownloadSuccess("✗ Failed to download some images");
            setTimeout(() => setDownloadSuccess(null), 3000);
        } finally {
            setDownloading(false);
        }
    };

    const handleDownloadSingle = async (index: number) => {
        if (!compressedBlobs[index]) return;

        try {
            const filename = generateCompressedFilename(files[index].name, quality, index);
            downloadFile(compressedBlobs[index], filename);
            
            setDownloadSuccess(`✓ Downloaded: ${filename}`);
            setTimeout(() => setDownloadSuccess(null), 3000);
        } catch (error) {
            console.error('Single download error:', error);
            setDownloadSuccess("✗ Failed to download image");
            setTimeout(() => setDownloadSuccess(null), 3000);
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    const getCompressionPercent = () => {
        if (!compressionStats) return 0;
        return ((1 - compressionStats.compressed / compressionStats.original) * 100).toFixed(1);
    };

    const totalSize = files.reduce((acc, file) => acc + file.size, 0);

    const qualityPresets = [
        { value: 40, label: 'Low', color: 'from-red-500 to-orange-600', desc: 'Smallest size' },
        { value: 60, label: 'Medium', color: 'from-yellow-500 to-amber-600', desc: 'Good balance' },
        { value: 80, label: 'High', color: 'from-green-500 to-emerald-600', desc: 'Recommended' },
        { value: 95, label: 'Max', color: 'from-blue-500 to-purple-600', desc: 'Best quality' },
    ];

    const handlePreviewClick = (url: string, index: number, isCompressed: boolean) => {
        setPreviewModal({ url, index, isCompressed });
    };

    const handleFileSelect = (selectedFiles: File[]) => {
        setFiles(selectedFiles);
        setCompressedBlobs([]);
        setCompressionStats(null);
        setDownloadSuccess(null);
        setCompressionComplete(false);
        setShowUploadInfo(false);
    };

    const handleReset = () => {
        setFiles([]);
        setCompressedBlobs([]);
        setCompressionStats(null);
        setDownloadSuccess(null);
        setCompressionComplete(false);
        setShowUploadInfo(true);
    };

    return (
        <>
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
                                <span className="font-medium text-sm">{downloadSuccess}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Preview Modal */}
            <AnimatePresence>
                {previewModal.url && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        onClick={() => setPreviewModal({ url: null, index: null, isCompressed: false })}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative max-w-4xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-2">
                                <img 
                                    src={previewModal.url} 
                                    alt={`Image ${previewModal.index}`}
                                    className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                                    onError={(e) => {
                                        console.error("Failed to load preview image");
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-600 to-pink-600 text-white px-4 py-2 rounded-full shadow-lg text-sm">
                                Image {previewModal.index} • {previewModal.isCompressed ? 'Compressed' : 'Original'}
                            </div>
                            <button
                                onClick={() => setPreviewModal({ url: null, index: null, isCompressed: false })}
                                className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-orange-950/20 py-6 md:py-12 px-3 md:px-4">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Header Section */}
                        <div className="mb-6 md:mb-12">
                            <a
                                href="/"
                                className="inline-flex items-center gap-2 md:gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all font-medium mb-4 md:mb-6 text-sm md:text-base"
                            >
                                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
                                <span>Back to Tools</span>
                            </a>

                            <div className="text-center mb-6 md:mb-8">
                                <motion.div 
                                    initial={{ scale: 0.5 }}
                                    animate={{ scale: 1 }}
                                    className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-500 to-pink-600 rounded-3xl mb-4 md:mb-6 shadow-2xl"
                                >
                                    <Compress className="w-8 h-8 md:w-10 md:h-10 text-white" />
                                </motion.div>
                                
                                <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-3 md:mb-4 bg-gradient-to-r from-orange-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                                    Image Compressor
                                </h1>
                                
                                <p className="text-sm md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
                                    Reduce JPG/PNG file size while maintaining visual quality
                                    <span className="block text-orange-600 dark:text-orange-400 font-medium mt-1 text-sm md:text-base">
                                        Smart filename generation • Success feedback
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Features Grid */}
                        <AnimatePresence>
                            {showUploadInfo && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mb-8 md:mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                                >
                                    <div className="bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-950/30 dark:to-pink-950/30 p-4 md:p-6 rounded-2xl border-2 border-orange-200 dark:border-orange-800/50">
                                        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                                            <div className="p-1.5 md:p-2 bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl">
                                                <TrendingDown className="w-4 h-4 md:w-6 md:h-6 text-white" />
                                            </div>
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Smart Compression</h3>
                                        </div>
                                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                            Reduce image size by up to 90% with minimal quality loss
                                        </p>
                                    </div>
                                    
                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-4 md:p-6 rounded-2xl border-2 border-blue-200 dark:border-blue-800/50">
                                        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                                            <div className="p-1.5 md:p-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
                                                <Settings className="w-4 h-4 md:w-6 md:h-6 text-white" />
                                            </div>
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Smart Filenames</h3>
                                        </div>
                                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                            Automatically generate descriptive filenames
                                        </p>
                                    </div>
                                    
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-4 md:p-6 rounded-2xl border-2 border-green-200 dark:border-green-800/50">
                                        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                                            <div className="p-1.5 md:p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                                                <Shield className="w-4 h-4 md:w-6 md:h-6 text-white" />
                                            </div>
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Secure Processing</h3>
                                        </div>
                                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                            All processing happens locally in your browser
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Main Card */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-xl md:shadow-2xl p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
                            {/* Upload Section */}
                            <div className="mb-6 md:mb-8">
                                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                                    <div className="p-1.5 md:p-2 bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30 rounded-xl">
                                        <Image className="w-4 h-4 md:w-6 md:h-6 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                                            Upload Images
                                        </h2>
                                        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                                            Select JPG/PNG images to compress
                                        </p>
                                    </div>
                                </div>

                                <FileUploader
                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                    multiple={true}
                                    onFilesSelected={handleFileSelect}
                                />

                                {files.length > 0 && (
                                    <div className="mt-3 md:mt-4 text-center">
                                        <div className="inline-flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30 rounded-full text-xs md:text-sm">
                                            <Image className="w-3 h-3 md:w-4 md:h-4 text-orange-600 dark:text-orange-400" />
                                            <span className="font-medium text-orange-700 dark:text-orange-300">
                                                {files.length} images • {formatFileSize(totalSize)}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            Files will be saved as: image_compressed_80quality_2024-01-15.jpg
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Content Area */}
                            {files.length > 0 && (
                                <div className="space-y-6 md:space-y-8">
                                    {/* Quality Controls */}
                                    <div className="space-y-4 md:space-y-6">
                                        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 md:gap-3">
                                            <Settings className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                                            Compression Settings
                                        </h3>

                                        {/* Quality Presets */}
                                        <div>
                                            <div className="flex items-center justify-between mb-2 md:mb-3">
                                                <label className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                    Quality Presets
                                                </label>
                                                <span className="text-xs md:text-sm text-orange-600 dark:text-orange-400 font-medium">
                                                    Current: {quality}%
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
                                                {qualityPresets.map((preset) => (
                                                    <motion.button
                                                        key={preset.value}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => setQuality(preset.value)}
                                                        className={`p-2 md:p-3 rounded-xl border-2 transition-all flex flex-col items-center ${
                                                            quality === preset.value
                                                                ? `border-orange-600 bg-gradient-to-r ${preset.color} text-white shadow-lg`
                                                                : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-orange-400 dark:hover:border-orange-500'
                                                        }`}
                                                    >
                                                        <span className={`text-xs md:text-sm font-medium ${quality === preset.value ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                                                            {preset.label}
                                                        </span>
                                                        <span className={`text-xs mt-0.5 ${quality === preset.value ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'}`}>
                                                            {preset.desc}
                                                        </span>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Quality Slider */}
                                        <div>
                                            <div className="flex items-center justify-between mb-1 md:mb-2">
                                                <label className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                    Fine Tune: <span className="text-orange-600 dark:text-orange-400">{quality}%</span>
                                                </label>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
                                                    {quality < 50 ? 'Smaller size' : quality < 80 ? 'Balanced' : 'Better quality'}
                                                </span>
                                            </div>
                                            <div className="relative pt-2 md:pt-4">
                                                <input
                                                    type="range"
                                                    min="10"
                                                    max="100"
                                                    value={quality}
                                                    onChange={(e) => setQuality(Number(e.target.value))}
                                                    className="w-full h-1.5 md:h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 md:[&::-webkit-slider-thumb]:h-5 md:[&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-orange-600 [&::-webkit-slider-thumb]:shadow-lg"
                                                />
                                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    <span>Small size</span>
                                                    <span className="sm:hidden">
                                                        {quality < 50 ? 'Small' : quality < 80 ? 'Medium' : 'High'}
                                                    </span>
                                                    <span>Best quality</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Image Previews */}
                                    {files.length > 0 && (
                                        <div className="space-y-3 md:space-y-4">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 md:gap-4">
                                                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 md:gap-3">
                                                    <Eye className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                                                    Images ({files.length})
                                                </h3>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setExpandedView(!expandedView)}
                                                        className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-xl transition-colors flex items-center gap-1 md:gap-2"
                                                    >
                                                        {expandedView ? <Maximize2 className="w-3 h-3 md:w-4 md:h-4" /> : <Eye className="w-3 h-3 md:w-4 md:h-4" />}
                                                        {expandedView ? 'Compact' : 'Expand'}
                                                    </button>
                                                    <button
                                                        onClick={handleReset}
                                                        className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-xl transition-colors flex items-center gap-1 md:gap-2"
                                                    >
                                                        <X className="w-3 h-3 md:w-4 md:h-4" />
                                                        Clear All
                                                    </button>
                                                </div>
                                            </div>

                                            <div className={`grid gap-2 md:gap-4 p-2 md:p-4 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-800 dark:to-orange-950/20 rounded-2xl border-2 border-gray-200 dark:border-gray-700 max-h-[400px] md:max-h-[600px] overflow-y-auto ${
                                                expandedView ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'
                                            }`}>
                                                {files.map((file, index) => (
                                                    <ImagePreview
                                                        key={index}
                                                        originalFile={file}
                                                        compressedBlob={compressedBlobs[index] || null}
                                                        index={index}
                                                        quality={quality}
                                                        onPreview={handlePreviewClick}
                                                    />
                                                ))}
                                            </div>
                                            
                                            {/* Single Download Buttons for each compressed image */}
                                            {compressedBlobs.length > 0 && (
                                                <div className="mt-4">
                                                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                        Quick Download Options:
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {compressedBlobs.map((blob, index) => (
                                                            <motion.button
                                                                key={index}
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => handleDownloadSingle(index)}
                                                                className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium rounded-lg flex items-center gap-1"
                                                            >
                                                                <Download className="w-3 h-3" />
                                                                Image {index + 1}
                                                            </motion.button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="space-y-3 md:space-y-4">
                                        {converting && (
                                            <div className="space-y-3 md:space-y-4">
                                                <ProgressBar 
                                                    progress={progress} 
                                                    label={`Compressing ${files.length} images...`} 
                                                />
                                                <div className="flex items-center justify-center gap-1 md:gap-2 text-orange-600 dark:text-orange-400">
                                                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
                                                    <span className="text-xs md:text-sm font-medium">
                                                        Optimizing at {quality}% quality...
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {compressedBlobs.length === 0 && !converting && (
                                            <motion.button
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleConvert}
                                                className="w-full py-3 md:py-4 px-4 md:px-6 bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white font-bold rounded-xl md:rounded-2xl shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm md:text-lg flex items-center justify-center gap-2 md:gap-3"
                                            >
                                                <Compress className="w-4 h-4 md:w-6 md:h-6" />
                                                <span>Compress {files.length} Images</span>
                                                <Zap className="w-3 h-3 md:w-5 md:h-5" />
                                            </motion.button>
                                        )}
                                    </div>

                                    {/* Results Section */}
                                    {compressedBlobs.length > 0 && compressionStats && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-4 md:space-y-8"
                                        >
                                            {/* Success Banner */}
                                            <div className="p-4 md:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl md:rounded-2xl border-2 border-green-200 dark:border-green-800/50">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
                                                    <div className="flex items-center justify-center sm:justify-start">
                                                        <div className="p-2 md:p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                                                            <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 text-center sm:text-left">
                                                        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                            Compression Complete! 🎉
                                                        </h3>
                                                        <p className="text-green-700 dark:text-green-300 font-medium text-sm md:text-base">
                                                            Saved {getCompressionPercent()}% • Quality: {quality}%
                                                        </p>
                                                        <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-0.5 md:mt-1">
                                                            Files will be saved with descriptive names
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-center mt-2 sm:mt-0">
                                                        <div className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl text-sm md:text-base">
                                                            {files.length} Files
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Stats Cards */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
                                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-4 md:p-6 rounded-xl md:rounded-2xl border-2 border-blue-200 dark:border-blue-800/50">
                                                    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                                                        <div className="p-1.5 md:p-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg md:rounded-xl">
                                                            <Image className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                                        </div>
                                                        <h4 className="font-bold text-gray-900 dark:text-white text-sm md:text-base">Original Size</h4>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-xl md:text-2xl lg:text-3xl font-black text-blue-600 dark:text-blue-400 mb-1 md:mb-2">
                                                            {formatFileSize(compressionStats.original)}
                                                        </div>
                                                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                                            Before compression
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-950/30 dark:to-pink-950/30 p-4 md:p-6 rounded-xl md:rounded-2xl border-2 border-orange-200 dark:border-orange-800/50">
                                                    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                                                        <div className="p-1.5 md:p-2 bg-gradient-to-r from-orange-500 to-pink-600 rounded-lg md:rounded-xl">
                                                            <TrendingDown className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                                        </div>
                                                        <h4 className="font-bold text-gray-900 dark:text-white text-sm md:text-base">Savings</h4>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-xl md:text-2xl lg:text-3xl font-black text-orange-600 dark:text-orange-400 mb-1 md:mb-2">
                                                            {getCompressionPercent()}%
                                                        </div>
                                                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                                            Size reduction
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-4 md:p-6 rounded-xl md:rounded-2xl border-2 border-green-200 dark:border-green-800/50">
                                                    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                                                        <div className="p-1.5 md:p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg md:rounded-xl">
                                                            <Compress className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                                        </div>
                                                        <h4 className="font-bold text-gray-900 dark:text-white text-sm md:text-base">Compressed Size</h4>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-xl md:text-2xl lg:text-3xl font-black text-green-600 dark:text-green-400 mb-1 md:mb-2">
                                                            {formatFileSize(compressionStats.compressed)}
                                                        </div>
                                                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                                            After compression
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Filename Preview */}
                                            {files.length > 0 && (
                                                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl border-2 border-purple-200 dark:border-purple-800/30">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                                        <h4 className="font-semibold text-gray-900 dark:text-white">Filenames will be:</h4>
                                                    </div>
                                                    <div className="space-y-1 max-h-32 overflow-y-auto">
                                                        {files.slice(0, 3).map((file, index) => (
                                                            <div key={index} className="text-xs text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-2 rounded">
                                                                {generateCompressedFilename(file.name, quality, index)}
                                                            </div>
                                                        ))}
                                                        {files.length > 3 && (
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 italic">
                                                                ...and {files.length - 3} more files
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Download Button */}
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleDownload}
                                                disabled={downloading}
                                                className="w-full py-3 md:py-4 px-4 md:px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold md:font-extrabold rounded-xl md:rounded-2xl shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm md:text-lg flex items-center justify-center gap-2 md:gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {downloading ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                        <span>Downloading...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Download className="w-4 h-4 md:w-6 md:h-6" />
                                                        <span>Download {files.length} Images</span>
                                                        <Sparkles className="w-3 h-3 md:w-5 md:h-5" />
                                                    </>
                                                )}
                                            </motion.button>

                                            {/* Convert Another */}
                                            <div className="text-center">
                                                <button
                                                    onClick={handleReset}
                                                    className="inline-flex items-center gap-1 md:gap-2 px-4 py-2 md:px-6 md:py-3 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium hover:bg-orange-50 dark:hover:bg-orange-950/30 rounded-xl transition-colors text-sm md:text-base"
                                                >
                                                    <Compress className="w-3 h-3 md:w-4 md:h-4" />
                                                    Compress More Images
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Stats Footer */}
                        <div className="mt-8 md:mt-12 pt-4 md:pt-8 border-t border-gray-200 dark:border-gray-800">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6 text-center">
                                <div>
                                    <div className="text-lg md:text-2xl lg:text-3xl font-black text-orange-600 dark:text-orange-400 mb-1 md:mb-2">
                                        {files.length}
                                    </div>
                                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                                        Images Uploaded
                                    </div>
                                </div>
                                <div>
                                    <div className="text-lg md:text-2xl lg:text-3xl font-black text-pink-600 dark:text-pink-400 mb-1 md:mb-2">
                                        {formatFileSize(totalSize)}
                                    </div>
                                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                                        Total Size
                                    </div>
                                </div>
                                <div>
                                    <div className="text-lg md:text-2xl lg:text-3xl font-black text-blue-600 dark:text-blue-400 mb-1 md:mb-2">
                                        {quality}%
                                    </div>
                                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                                        Quality Setting
                                    </div>
                                </div>
                                <div>
                                    <div className="text-lg md:text-2xl lg:text-3xl font-black text-green-600 dark:text-green-400 mb-1 md:mb-2">
                                        {compressedBlobs.length > 0 ? '✓' : '—'}
                                    </div>
                                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                                        Compressed
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}