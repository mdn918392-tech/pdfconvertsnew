"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowLeft, XCircle, CheckCircle, Image, Sparkles, Zap, Shield, Palette, Upload, Layers, Eye } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import ProgressBar from '../components/ProgressBar';
import { convertPngToJpg, downloadFile } from '../../utils/imageUtils';

// --- Helper Functions ---
const createObjectURL = (fileOrBlob: Blob | File) => URL.createObjectURL(fileOrBlob);
const revokeObjectURL = (url: string) => URL.revokeObjectURL(url);

// --- Component Interface ---
interface ConvertedFile {
    blob: Blob;
    name: string;
    originalFile: File;
}

// --- Image Preview Component ---
const ImagePreview = ({ file, onRemove, status, isDownloadable = false, filename = 'image.jpg', index }: {
    file: Blob | File;
    onRemove?: () => void;
    status: string;
    isDownloadable?: boolean;
    filename: string;
    index: number;
}) => {
    const url = useMemo(() => createObjectURL(file), [file]);
    const [previewOpen, setPreviewOpen] = useState(false);

    // Clean up the object URL when the component unmounts
    useMemo(() => {
        return () => revokeObjectURL(url);
    }, [url]);

    const statusColor = status && status.includes('Converted') 
        ? 'text-green-600 dark:text-green-400' 
        : 'text-blue-600 dark:text-blue-400';

    const handleIndividualDownload = () => {
        downloadFile(file as Blob, filename);
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
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative max-w-4xl max-h-[90vh]"
                        >
                            <img 
                                src={url} 
                                alt={filename} 
                                className="rounded-xl shadow-2xl max-w-full max-h-[80vh] object-contain"
                            />
                            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg">
                                {filename}
                            </div>
                            <button
                                onClick={() => setPreviewOpen(false)}
                                className="absolute -top-4 -right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
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
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
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
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Eye className="w-8 h-8 text-white" />
                        </div>
                        
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/image:translate-x-full transition-transform duration-1000" />
                    </div>
                    
                    {/* File Info */}
                    <div className="space-y-2">
                        <p className="text-sm font-semibold truncate text-gray-900 dark:text-white" title={filename}>
                            {filename}
                        </p>
                        
                        <div className="flex items-center justify-between">
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor} bg-opacity-10 ${status.includes('Converted') ? 'bg-green-500' : 'bg-blue-500'}`}>
                                {status}
                            </span>
                            
                            {/* File Size (if available) */}
                            {file.size && (
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {(file.size / 1024).toFixed(1)} KB
                                </span>
                            )}
                        </div>
                    </div>
                    
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

// --- Main Component ---
export default function PngToJpg() {
    const [files, setFiles] = useState<File[]>([]);
    const [converting, setConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [jpgBlobs, setJpgBlobs] = useState<ConvertedFile[]>([]);
    const [showFeatures, setShowFeatures] = useState(true);

    const handleConvert = async () => {
        if (files.length === 0) return;

        setConverting(true);
        setProgress(0);
        setJpgBlobs([]);
        setShowFeatures(false);

        try {
            const blobs: ConvertedFile[] = [];
            for (let i = 0; i < files.length; i++) {
                const newFilename = files[i].name.replace(/\.png$/i, '.jpg');
                const blob = await convertPngToJpg(files[i]);
                
                blobs.push({
                    blob: blob,
                    name: newFilename,
                    originalFile: files[i]
                });
                
                // Animate progress smoothly
                setProgress(((i + 1) / files.length) * 100);
                
                // Small delay for smooth progress animation
                await new Promise(resolve => setTimeout(resolve, 200));
            }
            setJpgBlobs(blobs);
        } catch (error) {
            console.error('Conversion error:', error);
            alert('Failed to convert PNG to JPG. Please try again.');
        } finally {
            setConverting(false);
        }
    };

    const handleDownload = () => {
        // Downloads all converted files
        jpgBlobs.forEach(item => {
            downloadFile(item.blob, item.name);
        });
    };

    const handleRemoveFile = (indexToRemove: number) => {
        setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
        setJpgBlobs([]);
        setShowFeatures(files.length === 1); // Show features when last file is removed
    };

    const handleFilesSelected = (newFiles: File[]) => {
        setFiles(newFiles);
        setJpgBlobs([]);
        setShowFeatures(false);
    };

    const handleReset = () => {
        setFiles([]);
        setJpgBlobs([]);
        setProgress(0);
        setShowFeatures(true);
    };

    const hasFiles = files.length > 0;
    const hasResults = jpgBlobs.length > 0;
    const isReadyToConvert = hasFiles && !hasResults && !converting;
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20 py-8 md:py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* --- Header Section --- */}
                    <div className="mb-8 md:mb-12">
                        <a
                            href="/"
                            className="inline-flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all font-medium group mb-6"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="hidden sm:inline">Back to Tools</span>
                        </a>

                        <div className="text-center mb-8">
                            <motion.div 
                                initial={{ scale: 0.5 }}
                                animate={{ scale: 1 }}
                                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-600 rounded-3xl mb-6 shadow-2xl"
                            >
                                <Image className="w-10 h-10 text-white" />
                            </motion.div>
                            
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-orange-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                                PNG to JPG Converter
                            </h1>
                            
                            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                                Convert your PNG images to high-quality JPG format with superior compression
                                <span className="block text-orange-600 dark:text-orange-400 font-medium mt-1">
                                    Preserve quality while reducing file size
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* --- Features Grid --- */}
                    <AnimatePresence>
                        {showFeatures && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6"
                            >
                                <div className="bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-950/30 dark:to-pink-950/30 p-6 rounded-2xl border-2 border-orange-200 dark:border-orange-800/50">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl">
                                            <Zap className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Fast Conversion</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Convert multiple PNG files to JPG format in seconds with our optimized engine
                                    </p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-6 rounded-2xl border-2 border-blue-200 dark:border-blue-800/50">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                                            <Palette className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Quality Preserved</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Maintain image quality while significantly reducing file size with intelligent compression
                                    </p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-2xl border-2 border-green-200 dark:border-green-800/50">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                                            <Shield className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Secure Processing</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        All conversions happen locally in your browser. Your images never leave your device
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* --- Main Converter Card --- */}
                    <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-2xl p-6 md:p-8 mb-8">
                        {/* Upload Section */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30 rounded-xl">
                                    <Upload className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Upload PNG Images
                                    </h2>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Select PNG files to convert to JPG format
                                    </p>
                                </div>
                            </div>

                            {!hasFiles ? (
                                <FileUploader
                                    accept="image/png"
                                    multiple={true}
                                    onFilesSelected={handleFilesSelected}
                                />
                            ) : (
                                <div className="text-center mb-4">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30 rounded-full">
                                        <Layers className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                                        <span className="font-medium text-orange-700 dark:text-orange-300">
                                            {files.length} PNG files selected • {(totalSize / 1024 / 1024).toFixed(2)} MB total
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* --- File Previews and Conversion Area --- */}
                        {hasFiles && (
                            <div className="space-y-8">
                                {/* --- Input PNG Previews --- */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                            <Image className="w-5 h-5 text-orange-500" />
                                            Uploaded PNG Images
                                        </h3>
                                        <button
                                            onClick={handleReset}
                                            className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                                        >
                                            Clear All
                                        </button>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[500px] overflow-y-auto p-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20 rounded-2xl border-2 border-gray-200 dark:border-gray-700">
                                        {files.map((file, index) => (
                                            <ImagePreview 
                                                key={index} 
                                                file={file} 
                                                filename={file.name}
                                                onRemove={() => handleRemoveFile(index)}
                                                status="Ready to Convert"
                                                index={index}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* --- Progress and Action Buttons --- */}
                                <div className="space-y-6">
                                    {converting && (
                                        <div className="space-y-4">
                                            <ProgressBar 
                                                progress={progress} 
                                                label={`Converting ${files.length} files...`} 
                                            />
                                            <div className="flex items-center justify-center gap-2 text-orange-600 dark:text-orange-400">
                                                <Sparkles className="w-4 h-4 animate-pulse" />
                                                <span className="text-sm font-medium">
                                                    Processing your images...
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
                                            className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-3"
                                        >
                                            <Image className="w-6 h-6" />
                                            Convert {files.length} PNG to JPG
                                            <Zap className="w-5 h-5" />
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
                            className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-3xl border-2 border-green-200 dark:border-green-800/50 p-6 md:p-8 shadow-2xl mb-8"
                        >
                            {/* Success Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                                <div className="flex items-center justify-center sm:justify-start">
                                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
                                        <CheckCircle className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2">
                                        Conversion Complete! 🎉
                                    </h2>
                                    <p className="text-green-700 dark:text-green-300 font-medium">
                                        Successfully converted {files.length} PNG files to JPG format
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                        All images are ready for download
                                    </p>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl">
                                        {jpgBlobs.length} Files
                                    </div>
                                </div>
                            </div>

                            {/* --- Output JPG Previews --- */}
                            <div className="space-y-4 mb-8">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                    <Download className="w-5 h-5 text-green-500" />
                                    Converted JPG Images
                                </h3>
                                
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[500px] overflow-y-auto p-4 bg-white/50 dark:bg-gray-900/50 rounded-2xl border-2 border-green-100 dark:border-green-800/30">
                                    {jpgBlobs.map((item, index) => (
                                        <ImagePreview 
                                            key={index} 
                                            file={item.blob} 
                                            filename={item.name}
                                            status="Converted ✓"
                                            isDownloadable={true}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* --- Download All Button --- */}
                            <div className="space-y-6">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleDownload}
                                    className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-extrabold rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-3"
                                >
                                    <Download className="w-6 h-6" />
                                    Download All {jpgBlobs.length} JPG Files
                                    <Sparkles className="w-5 h-5" />
                                </motion.button>
                                
                                <div className="text-center">
                                    <button
                                        onClick={handleReset}
                                        className="inline-flex items-center gap-2 px-6 py-3 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium hover:bg-orange-50 dark:hover:bg-orange-950/30 rounded-xl transition-colors"
                                    >
                                        <Image className="w-4 h-4" />
                                        Convert More Images
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* --- Stats Footer --- */}
                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div>
                                <div className="text-2xl md:text-3xl font-black text-orange-600 dark:text-orange-400 mb-2">
                                    {files.length}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">
                                    Files Uploaded
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400 mb-2">
                                    {(totalSize / 1024 / 1024).toFixed(1)} MB
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">
                                    Total Size
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-black text-green-600 dark:text-green-400 mb-2">
                                    {jpgBlobs.length}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">
                                    Files Converted
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-black text-purple-600 dark:text-purple-400 mb-2">
                                    100%
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">
                                    Quality Preserved
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}