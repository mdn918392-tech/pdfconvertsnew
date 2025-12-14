"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowLeft, FileText, X, Scissors, Eye, Trash2, Check, AlertCircle, Maximize2, Minus, Plus, Shield, Sparkles, Clock, Smartphone } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import ProgressBar from '../components/ProgressBar';
import { removePages } from '../../utils/pdfUtils';
import { downloadFile } from '../../utils/imageUtils';

// Helper function to parse page numbers (only comma-separated numbers)
const parsePageNumbers = (input, totalPages) => {
    if (!input) return [];

    const pages = new Set();
    const segments = input.split(',');

    for (const segment of segments) {
        const trimmed = segment.trim();
        const page = parseInt(trimmed);
        
        // Ensure page is a valid number, greater than 0, and within totalPages
        if (!isNaN(page) && page > 0 && page <= totalPages) {
            pages.add(page);
        }
    }
    // Return sorted array of unique valid page numbers
    return Array.from(pages).sort((a, b) => a - b);
};

// Interface for download notifications
const DownloadNotification = ({ id, fileName, removedPages, timestamp, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl shadow-lg mb-2"
        >
            <div className="flex items-start gap-3">
                <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm mb-1">
                        PDF Successfully Downloaded! 🎉
                    </h4>
                    <p className="text-xs opacity-90 truncate mb-1">
                        {fileName}
                    </p>
                    <p className="text-xs opacity-80 mb-2">
                        Removed {removedPages} pages
                    </p>
                    <div className="flex items-center gap-1 text-xs opacity-80">
                        <Clock className="w-3 h-3" />
                        {timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
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

// Mobile Detection Hook
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
};

// PDF Page Preview Component - FIXED FOR MOBILE & DESKTOP
const PdfPagePreview = ({ pageNumber, isSelected, onClick, previewUrl, isLoading }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showImageFallback, setShowImageFallback] = useState(false);
    const isMobile = useIsMobile();

    // Handle iframe load error
    const handleIframeError = () => {
        setShowImageFallback(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group border-3 ${
                isSelected
                    ? 'border-red-500 ring-3 ring-red-200 dark:ring-red-900/50 shadow-lg'
                    : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 shadow-md'
            }`}
            title={isSelected ? `Keep Page ${pageNumber}` : `Remove Page ${pageNumber}`}
        >
            {/* Page Number Badge */}
            <div className={`absolute top-2 left-2 z-20 px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                isSelected ? 'bg-red-600' : 'bg-blue-600'
            }`}>
                {pageNumber}
            </div>

            {/* PDF Preview Container - FIXED FOR ALL DEVICES */}
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-2">
                {isLoading ? (
                    <div className="animate-pulse flex flex-col items-center gap-2">
                        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">Loading...</span>
                    </div>
                ) : previewUrl ? (
                    // MOBILE FIXED: Use object tag for mobile, iframe for desktop
                    isMobile || showImageFallback ? (
                        // MOBILE COMPATIBLE SOLUTION
                        <div className="w-full h-full relative">
                            <object
                                data={`${previewUrl}#view=fitH&toolbar=0&navpanes=0`}
                                type="application/pdf"
                                className="w-full h-full"
                                aria-label={`PDF Page ${pageNumber}`}
                            >
                                {/* Fallback content if object doesn't load */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 p-4">
                                    <FileText className="w-8 h-8 text-gray-400 dark:text-gray-600 mb-2" />
                                    <span className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                        Page {pageNumber}
                                    </span>
                                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 text-center">
                                        {isSelected ? 'Selected for removal' : 'Tap to select'}
                                    </span>
                                </div>
                            </object>
                        </div>
                    ) : (
                        // DESKTOP: Use iframe
                        <div className="w-full h-full">
                            <iframe
                                src={`${previewUrl}#view=fitH&toolbar=0&navpanes=0`}
                                title={`Page ${pageNumber}`}
                                className="w-full h-full"
                                frameBorder="0"
                                onError={handleIframeError}
                                style={{ 
                                    pointerEvents: 'none'
                                }}
                                loading="lazy"
                            />
                        </div>
                    )
                ) : (
                    <div className="flex flex-col items-center gap-2 p-3">
                        <FileText className="w-6 h-6 text-gray-400 dark:text-gray-600" />
                        <span className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            Page {pageNumber}
                        </span>
                    </div>
                )}
            </div>

            {/* Mobile Tap Indicator */}
            {isMobile && !isSelected && (
                <div className="absolute bottom-2 right-2 z-10">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Eye className="w-3 h-3 text-white" />
                    </div>
                </div>
            )}

            {/* Selection Overlay */}
            {isSelected && (
                <div className="absolute inset-0 bg-red-900/70 flex flex-col items-center justify-center z-10">
                    <Trash2 className="w-6 h-6 text-white mb-1" />
                    <span className="text-xs font-semibold text-white">Removing</span>
                </div>
            )}

            {/* Hover Overlay (Desktop only) */}
            {!isMobile && (
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                }`}>
                    {isSelected ? (
                        <Check className="w-5 h-5 text-white" />
                    ) : (
                        <X className="w-5 h-5 text-white" />
                    )}
                </div>
            )}
        </motion.div>
    );
};

// Mobile PDF Preview Component (Alternative solution)
const MobilePdfPreview = ({ pdfUrl, pageNumber, isSelected }) => {
    return (
        <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-800 dark:to-blue-900/30 rounded-lg flex flex-col items-center justify-center">
                <FileText className="w-10 h-10 text-blue-500 dark:text-blue-400 mb-2" />
                <div className="text-center">
                    <div className={`text-sm font-bold ${isSelected ? 'text-red-600' : 'text-blue-600'}`}>
                        Page {pageNumber}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        {isSelected ? 'Will be removed' : 'Will be kept'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function RemovePages() {
    const [files, setFiles] = useState([]);
    const [pageNumbers, setPageNumbers] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [converting, setConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [pdfBlob, setPdfBlob] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [originalPageUrls, setOriginalPageUrls] = useState([]);
    const [expandedView, setExpandedView] = useState(false);
    const [showUploadInfo, setShowUploadInfo] = useState(true);
    const [downloadNotifications, setDownloadNotifications] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const notificationsRef = useRef(null);

    // Mobile detection
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Calculate the pages to be removed dynamically
    const pagesToRemove = useMemo(() => {
        return parsePageNumbers(pageNumbers, totalPages);
    }, [pageNumbers, totalPages]);

    // Calculate remaining pages
    const remainingPages = totalPages - pagesToRemove.length;

    // Generate unique filename
    const generateUniqueFileName = (baseName, removedPagesCount) => {
        const timestamp = new Date().getTime();
        const randomId = Math.random().toString(36).substring(2, 9);
        const cleanBaseName = baseName.replace(/\.[^/.]+$/, ""); // Remove extension
        return `${cleanBaseName}_removed_${removedPagesCount}_pages_${timestamp}_${randomId}.pdf`;
    };

    // Auto-scroll notifications
    useEffect(() => {
        if (notificationsRef.current && downloadNotifications.length > 0) {
            notificationsRef.current.scrollTop = notificationsRef.current.scrollHeight;
        }
    }, [downloadNotifications]);

    // Effect to create and clean up the MODIFIED PDF Blob URL
    useEffect(() => {
        if (pdfBlob) {
            const url = URL.createObjectURL(pdfBlob);
            setPdfUrl(url);

            return () => {
                URL.revokeObjectURL(url);
                setPdfUrl(null);
            };
        }
    }, [pdfBlob]);

    // Helper function to create previews for the original PDF
    const createOriginalPreviews = async (file) => {
        setOriginalPageUrls([]);
        try {
            const { PDFDocument } = await import('pdf-lib');
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            const count = pdf.getPageCount();
            
            const urls = [];
            for (let i = 1; i <= count; i++) {
                const singlePagePdf = await PDFDocument.create();
                const [copiedPage] = await singlePagePdf.copyPages(pdf, [i - 1]);
                singlePagePdf.addPage(copiedPage);
                const singlePageBytes = await singlePagePdf.save();
                
                const dataToBlob = new Uint8Array(singlePageBytes.buffer);
                const blob = new Blob([dataToBlob], { type: "application/pdf" });
                urls.push(URL.createObjectURL(blob));
            }
            setOriginalPageUrls(urls);

            // Cleanup function for original previews
            return () => {
                urls.forEach(url => URL.revokeObjectURL(url));
                setOriginalPageUrls([]);
            };
        } catch (error) {
            console.error("Failed to create original previews:", error);
            setOriginalPageUrls([]);
        }
    };

    const handleFileSelect = async (selectedFiles) => {
        setFiles(selectedFiles);
        setPdfBlob(null);
        setPdfUrl(null);
        setPageNumbers('');
        setTotalPages(0);
        setOriginalPageUrls([]);
        setShowUploadInfo(false);

        if (selectedFiles.length > 0) {
            const file = selectedFiles[0];
            try {
                const { PDFDocument } = await import('pdf-lib');
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const count = pdf.getPageCount();
                setTotalPages(count);
                
                // Start generating previews for the original file
                createOriginalPreviews(file);
            } catch (error) {
                console.error("Error loading PDF for page count:", error);
                setTotalPages(0);
            }
        }
    };

    const handleConvert = async () => {
        if (files.length === 0 || pagesToRemove.length === 0) {
            alert('Please enter valid page numbers to remove.');
            return;
        }

        setConverting(true);
        setProgress(0);
        setPdfBlob(null);
        setPdfUrl(null);

        try {
            setProgress(30);
            await new Promise(resolve => setTimeout(resolve, 300));
            
            setProgress(60);
            const blob = await removePages(files[0], pagesToRemove);
            
            setProgress(90);
            await new Promise(resolve => setTimeout(resolve, 300));
            
            setProgress(100);
            setPdfBlob(blob);
        } catch (error) {
            console.error('Remove error:', error);
            alert('Failed to remove pages. Please try again.');
        } finally {
            setConverting(false);
        }
    };

    const handleDownload = () => {
        if (pdfBlob) {
            const fileName = generateUniqueFileName(files[0].name, pagesToRemove.length);
            downloadFile(pdfBlob, fileName);
            
            // Add download notification
            const notification = {
                id: Math.random().toString(36).substring(7),
                fileName: fileName,
                removedPages: pagesToRemove.length,
                timestamp: new Date()
            };
            setDownloadNotifications(prev => [...prev, notification]);
            
            // Auto-remove notification after 5 seconds
            setTimeout(() => {
                setDownloadNotifications(prev => 
                    prev.filter(n => n.id !== notification.id)
                );
            }, 5000);
        }
    };

    const handleToggleRemovePage = (pageNumber) => {
        setPdfBlob(null);
        setPdfUrl(null);

        const currentPages = pagesToRemove;
        let newPages;

        if (currentPages.includes(pageNumber)) {
            newPages = currentPages.filter(p => p !== pageNumber);
        } else {
            newPages = [...currentPages, pageNumber].sort((a, b) => a - b);
        }

        setPageNumbers(newPages.join(','));
    };

    const handleSelectAll = () => {
        const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);
        setPageNumbers(allPages.join(','));
    };

    const handleClearAll = () => {
        setPageNumbers('');
    };

    const handleAddRange = () => {
        if (totalPages > 0) {
            const range = prompt('Enter page range (e.g., 1-5)');
            if (range) {
                const [start, end] = range.split('-').map(Number);
                if (!isNaN(start) && !isNaN(end) && start > 0 && end <= totalPages && start <= end) {
                    const newPages = [];
                    for (let i = start; i <= end; i++) {
                        newPages.push(i);
                    }
                    const combined = Array.from(new Set([...pagesToRemove, ...newPages])).sort((a, b) => a - b);
                    setPageNumbers(combined.join(','));
                }
            }
        }
    };

    const fileSize = files[0] ? (files[0].size / 1024 / 1024).toFixed(2) : 0;

    return (
        <>
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
                                onClose={() => setDownloadNotifications(prev => 
                                    prev.filter(n => n.id !== notification.id)
                                )}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-red-950/20 py-6 sm:py-8 md:py-12">
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
                                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all font-medium group mb-3 sm:mb-6"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                <span className="text-sm">Back to Tools</span>
                            </a>

                            <div className="text-center mb-4 sm:mb-6 md:mb-8">
                                <motion.div 
                                    initial={{ scale: 0.5 }}
                                    animate={{ scale: 1 }}
                                    className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl sm:rounded-3xl mb-3 sm:mb-6 shadow-2xl"
                                >
                                    <Scissors className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                                </motion.div>
                                
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-2 sm:mb-4 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent px-2">
                                    PDF Page Remover
                                </h1>
                                
                                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
                                    Remove unwanted pages from your PDF documents with precision
                                    <span className="block text-red-600 dark:text-red-400 font-medium mt-1 text-xs sm:text-sm md:text-base">
                                        Select pages visually or by page numbers
                                    </span>
                                </p>
                                
                                {/* Mobile Compatibility Notice */}
                                {isMobile && (
                                    <div className="mt-4 flex items-center justify-center gap-2">
                                        <Smartphone className="w-4 h-4 text-blue-500" />
                                        <span className="text-xs text-blue-600 font-medium">
                                            Optimized for mobile viewing
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Features Grid */}
                        <AnimatePresence>
                            {showUploadInfo && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mb-6 sm:mb-8 md:mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
                                >
                                    {[
                                        {
                                            icon: Eye,
                                            title: "Visual Selection",
                                            desc: "Click on page thumbnails to select which pages to remove",
                                            gradient: "from-red-500 to-orange-600",
                                            bg: "from-red-50 to-orange-50",
                                            border: "border-red-200"
                                        },
                                        {
                                            icon: Scissors,
                                            title: "Precise Control",
                                            desc: "Remove single pages, multiple pages, or entire ranges",
                                            gradient: "from-blue-500 to-purple-600",
                                            bg: "from-blue-50 to-purple-50",
                                            border: "border-blue-200"
                                        },
                                        {
                                            icon: Shield,
                                            title: "Secure Processing",
                                            desc: "All processing happens locally in your browser",
                                            gradient: "from-green-500 to-emerald-600",
                                            bg: "from-green-50 to-emerald-50",
                                            border: "border-green-200"
                                        }
                                    ].map((feature, index) => (
                                        <div 
                                            key={index}
                                            className={`bg-gradient-to-br ${feature.bg} dark:from-gray-800 dark:to-gray-900 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl border-2 ${feature.border} dark:border-gray-700`}
                                        >
                                            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                                                <div className={`p-1.5 sm:p-2 bg-gradient-to-r ${feature.gradient} rounded-lg sm:rounded-xl`}>
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
                            {/* Upload Section */}
                            <div className="mb-4 sm:mb-6 md:mb-8">
                                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                                    <div className="p-1.5 sm:p-2 bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-lg sm:rounded-xl">
                                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-600 dark:text-red-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                                            Upload PDF File
                                        </h2>
                                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                            Select a PDF file to remove pages from
                                        </p>
                                    </div>
                                </div>

                                <FileUploader
                                    accept="application/pdf"
                                    multiple={false}
                                    onFilesSelected={handleFileSelect}
                                />
                            </div>

                            {/* Content Area */}
                            {files.length > 0 && (
                                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                                    {/* File Info */}
                                    <div className="p-3 sm:p-4 md:p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-blue-200 dark:border-blue-800/30">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 md:gap-4">
                                            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                                                <div className="p-1.5 sm:p-2 md:p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg sm:rounded-xl shadow-md">
                                                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg truncate max-w-[180px] sm:max-w-[250px] md:max-w-[350px]">
                                                        {files[0].name}
                                                    </h3>
                                                    <div className="flex items-center gap-1 sm:gap-2 md:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                                                        <span>{fileSize} MB</span>
                                                        <span>•</span>
                                                        <span>{totalPages} pages</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setFiles([]);
                                                    setPdfBlob(null);
                                                    setPageNumbers('');
                                                    setShowUploadInfo(true);
                                                }}
                                                className="px-3 py-1 sm:px-4 sm:py-1.5 md:px-6 md:py-2.5 text-xs sm:text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg sm:rounded-xl transition-colors mt-2 sm:mt-0"
                                            >
                                                Change File
                                            </button>
                                        </div>
                                    </div>

                                    {/* Mobile Preview Instructions */}
                                    {isMobile && (
                                        <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <Smartphone className="w-4 h-4 text-blue-500" />
                                                <p className="text-xs text-blue-700 dark:text-blue-300">
                                                    👆 <strong>Tap on page previews</strong> to select/deselect pages for removal
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Page Selection Controls */}
                                    <div className="space-y-3 sm:space-y-4 md:space-y-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 md:gap-4">
                                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                                <Scissors className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-red-500" />
                                                Select Pages to Remove
                                            </h3>
                                            
                                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                <button
                                                    onClick={handleSelectAll}
                                                    className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 rounded-lg sm:rounded-xl transition-all"
                                                >
                                                    Select All
                                                </button>
                                                <button
                                                    onClick={handleClearAll}
                                                    className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg sm:rounded-xl transition-colors"
                                                >
                                                    Clear All
                                                </button>
                                                <button
                                                    onClick={handleAddRange}
                                                    className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg sm:rounded-xl transition-colors"
                                                >
                                                    Add Range
                                                </button>
                                                <button
                                                    onClick={() => setExpandedView(!expandedView)}
                                                    className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-lg sm:rounded-xl transition-colors flex items-center gap-1.5"
                                                >
                                                    {expandedView ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                                    {expandedView ? 'Collapse' : 'Expand'}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Page Input */}
                                        <div>
                                            <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                                                Page Numbers to Remove
                                                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                                                    (e.g., 1,3,5 or 1-5)
                                                </span>
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={pageNumbers}
                                                    onChange={(e) => {
                                                        setPageNumbers(e.target.value);
                                                        setPdfBlob(null);
                                                        setPdfUrl(null);
                                                    }}
                                                    placeholder="Enter page numbers (e.g., 1,3,5 or 1-5)"
                                                    className="w-full px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 border-2 border-gray-300 dark:border-gray-700 rounded-lg sm:rounded-xl md:rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-sm sm:text-base md:text-lg"
                                                />
                                                <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2">
                                                    {pagesToRemove.length > 0 && (
                                                        <span className="text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-1.5 sm:px-2 py-0.5 rounded-full">
                                                            {pagesToRemove.length} selected
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Page Preview Grid - MOBILE FIXED */}
                                        {originalPageUrls.length > 0 && (
                                            <div className="space-y-2 sm:space-y-3">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                                                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                                                        Page Previews ({totalPages} total)
                                                    </h4>
                                                    <span className={`text-xs sm:text-sm font-medium ${
                                                        pagesToRemove.length > 0 
                                                            ? 'text-red-600 dark:text-red-400' 
                                                            : 'text-green-600 dark:text-green-400'
                                                    }`}>
                                                        {remainingPages} pages will remain
                                                    </span>
                                                </div>
                                                
                                                {/* Mobile Alternative View */}
                                                {isMobile && (
                                                    <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                                                        <p className="text-xs text-yellow-700 dark:text-yellow-300 text-center">
                                                            📱 <strong>Mobile View:</strong> Showing simplified page previews
                                                        </p>
                                                    </div>
                                                )}
                                                
                                                <div className={`grid gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 md:p-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-gray-200 dark:border-gray-700 max-h-[400px] sm:max-h-[500px] md:max-h-[600px] overflow-y-auto ${
                                                    // Mobile: grid-cols-2, Tablet: grid-cols-3, Desktop: grid-cols-4/5
                                                    expandedView 
                                                        ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' 
                                                        : 'grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'
                                                }`}>
                                                    {originalPageUrls.map((url, index) => {
                                                        const pageNum = index + 1;
                                                        return (
                                                            <PdfPagePreview
                                                                key={pageNum}
                                                                pageNumber={pageNum}
                                                                isSelected={pagesToRemove.includes(pageNum)}
                                                                onClick={() => handleToggleRemovePage(pageNum)}
                                                                previewUrl={url}
                                                                isLoading={false}
                                                            />
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* Status Messages */}
                                        {pagesToRemove.length === 0 && files.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-2 sm:p-3 md:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-blue-200 dark:border-blue-800/50"
                                            >
                                                <div className="flex items-center gap-2 sm:gap-3">
                                                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                                    <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 font-medium">
                                                        Select pages to remove by clicking on thumbnails or entering page numbers above
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}

                                        {pagesToRemove.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-3 sm:p-4 md:p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-red-200 dark:border-red-800/50"
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 md:gap-4">
                                                    <div className="flex items-center justify-center sm:justify-start">
                                                        <div className="p-2 sm:p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg sm:rounded-xl">
                                                            <Trash2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 text-center sm:text-left">
                                                        <h4 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white mb-0.5 sm:mb-1">
                                                            Removing {pagesToRemove.length} Pages
                                                        </h4>
                                                        <p className="text-red-700 dark:text-red-300 font-medium text-xs sm:text-sm">
                                                            Pages: {pagesToRemove.join(', ')}
                                                        </p>
                                                        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-1">
                                                            {remainingPages} pages will remain in the final document
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-center">
                                                        <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base">
                                                            Remove {pagesToRemove.length}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <AnimatePresence mode="wait">
                                        {converting && (
                                            <motion.div
                                                key="converting"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                className="space-y-3 sm:space-y-4"
                                            >
                                                <ProgressBar progress={progress} label="Removing pages..." />
                                                <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-red-600 dark:text-red-400">
                                                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                                                    <span className="text-xs sm:text-sm font-medium">
                                                        Processing document...
                                                    </span>
                                                </div>
                                            </motion.div>
                                        )}

                                        {!pdfBlob && !converting && pagesToRemove.length > 0 && (
                                            <motion.button
                                                key="convert"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleConvert}
                                                className="w-full py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3"
                                            >
                                                <Scissors className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                                Remove {pagesToRemove.length} Pages
                                                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                                            </motion.button>
                                        )}

                                        {pdfBlob && (
                                            <motion.div
                                                key="results"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="space-y-4 sm:space-y-6"
                                            >
                                                {/* Success Banner */}
                                                <div className="p-3 sm:p-4 md:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-green-200 dark:border-green-800/50">
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 md:gap-4">
                                                        <div className="flex items-center justify-center sm:justify-start">
                                                            <div className="p-2 sm:p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg sm:rounded-xl">
                                                                <Check className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 text-center sm:text-left">
                                                            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-0.5 sm:mb-1">
                                                                Pages Successfully Removed! 🎉
                                                            </h3>
                                                            <p className="text-green-700 dark:text-green-300 font-medium text-xs sm:text-sm md:text-base">
                                                                New document has {remainingPages} pages
                                                            </p>
                                                            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-0.5">
                                                                Ready to download your modified PDF
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center justify-center mt-1 sm:mt-0">
                                                            <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base">
                                                                {(pdfBlob.size / 1024 / 1024).toFixed(2)} MB
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Modified PDF Preview */}
                                                {pdfUrl && (
                                                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white">
                                                                Preview Modified PDF
                                                            </h4>
                                                            <button
                                                                onClick={() => setExpandedView(!expandedView)}
                                                                className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1.5"
                                                            >
                                                                {expandedView ? <Minus className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                                                                {expandedView ? 'Minimize' : 'Maximize'}
                                                            </button>
                                                        </div>
                                                        <div 
                                                            className={`border-2 border-gray-300 dark:border-gray-700 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-md sm:shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 ${
                                                                expandedView ? 'h-[70vh] sm:h-[80vh]' : 'h-[40vh] sm:h-[50vh] md:h-[60vh]'
                                                            }`}
                                                        >
                                                            {/* MOBILE COMPATIBLE PDF VIEWER */}
                                                            {isMobile ? (
                                                                <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
                                                                    <FileText className="w-16 h-16 text-blue-400 dark:text-blue-500 mb-4" />
                                                                    <h5 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                                                                        PDF Preview
                                                                    </h5>
                                                                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                                                                        PDF preview is best viewed on desktop
                                                                    </p>
                                                                    <div className="text-center">
                                                                        <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                                                                            ✅ {remainingPages} pages in final document
                                                                        </p>
                                                                        <p className="text-xs text-gray-500 dark:text-gray-500">
                                                                            ⬇️ Download to view full PDF
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <iframe
                                                                    src={`${pdfUrl}#view=fitH`}
                                                                    title="Modified PDF Preview"
                                                                    className="w-full h-full"
                                                                    frameBorder="0"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Download Button */}
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={handleDownload}
                                                    className="w-full py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold sm:font-extrabold rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3"
                                                >
                                                    <Download className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                                    Download Modified PDF
                                                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5" />
                                                </motion.button>

                                                {/* Mobile Download Info */}
                                                {isMobile && (
                                                    <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                                        <p className="text-xs text-green-700 dark:text-green-300 text-center">
                                                            📱 <strong>Mobile Tip:</strong> The downloaded PDF will contain all images and formatting properly
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Convert Another */}
                                                <div className="text-center">
                                                    <button
                                                        onClick={() => {
                                                            setFiles([]);
                                                            setPdfBlob(null);
                                                            setPageNumbers('');
                                                            setShowUploadInfo(true);
                                                        }}
                                                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm md:text-base"
                                                    >
                                                        <Scissors className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                                                        Remove Pages from Another PDF
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>

                        {/* Stats Footer */}
                        <div className="mt-4 sm:mt-8 md:mt-12 pt-3 sm:pt-6 md:pt-8 border-t border-gray-200 dark:border-gray-800">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 text-center">
                                {[
                                    { value: files.length > 0 ? totalPages : '—', label: 'Total Pages', color: 'text-red-600' },
                                    { value: pagesToRemove.length, label: 'Pages to Remove', color: 'text-orange-600' },
                                    { value: remainingPages, label: 'Pages Remaining', color: 'text-blue-600' },
                                    { value: pdfBlob ? '✓' : '—', label: 'Ready to Download', color: 'text-green-600' }
                                ].map((stat, index) => (
                                    <div key={index}>
                                        <div className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-black ${stat.color} dark:${stat.color.replace('600', '400')} mb-0.5 sm:mb-1 md:mb-2`}>
                                            {stat.value}
                                        </div>
                                        <div className="text-xs sm:text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Mobile Compatibility Note */}
                            {isMobile && (
                                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                                    <div className="flex items-center justify-center gap-2">
                                        <Smartphone className="w-4 h-4 text-gray-400" />
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Mobile optimized • All processing happens locally
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}