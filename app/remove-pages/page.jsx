"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowLeft, FileText, X, Scissors, Eye, Trash2, Check, AlertCircle, Maximize2, Minus, Plus, Shield } from 'lucide-react';
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

// PDF Page Preview Component
const PdfPagePreview = ({ pageNumber, isSelected, onClick, previewUrl, isLoading }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group border-4 ${
                isSelected
                    ? 'border-red-500 ring-4 ring-red-200 dark:ring-red-900/50 shadow-xl'
                    : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 shadow-lg'
            }`}
            title={isSelected ? `Keep Page ${pageNumber}` : `Remove Page ${pageNumber}`}
        >
            {/* Page Number Badge */}
            <div className={`absolute top-2 left-2 z-20 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg ${
                isSelected ? 'bg-red-600' : 'bg-blue-600'
            }`}>
                {pageNumber}
            </div>

            {/* PDF Preview Container */}
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                {isLoading ? (
                    <div className="animate-pulse flex flex-col items-center gap-2">
                        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">Loading...</span>
                    </div>
                ) : previewUrl ? (
                    <iframe
                        src={previewUrl}
                        title={`Page ${pageNumber}`}
                        className="w-full h-full pointer-events-none scale-75"
                        frameBorder="0"
                    />
                ) : (
                    <div className="flex flex-col items-center gap-2 p-4">
                        <FileText className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                        <span className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            Page {pageNumber}
                        </span>
                    </div>
                )}
            </div>

            {/* Selection Overlay */}
            {isSelected && (
                <div className="absolute inset-0 bg-red-900/70 flex flex-col items-center justify-center z-10">
                    <Trash2 className="w-8 h-8 text-white mb-2" />
                    <span className="text-xs font-semibold text-white">Removing</span>
                </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                {isSelected ? (
                    <Check className="w-6 h-6 text-white" />
                ) : (
                    <X className="w-6 h-6 text-white" />
                )}
            </div>
        </motion.div>
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

    // Calculate the pages to be removed dynamically
    const pagesToRemove = useMemo(() => {
        return parsePageNumbers(pageNumbers, totalPages);
    }, [pageNumbers, totalPages]);

    // Calculate remaining pages
    const remainingPages = totalPages - pagesToRemove.length;

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
            downloadFile(pdfBlob, 'pages-removed.pdf');
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-red-950/20 py-8 md:py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header Section */}
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
                                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-3xl mb-6 shadow-2xl"
                            >
                                <Scissors className="w-10 h-10 text-white" />
                            </motion.div>
                            
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                                PDF Page Remover
                            </h1>
                            
                            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                                Remove unwanted pages from your PDF documents with precision
                                <span className="block text-red-600 dark:text-red-400 font-medium mt-1">
                                    Select pages visually or by page numbers
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
                                className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6"
                            >
                                <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 p-6 rounded-2xl border-2 border-red-200 dark:border-red-800/50">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl">
                                            <Eye className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Visual Selection</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Click on page thumbnails to select which pages to remove
                                    </p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-6 rounded-2xl border-2 border-blue-200 dark:border-blue-800/50">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                                            <Scissors className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Precise Control</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Remove single pages, multiple pages, or entire ranges
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
                                        All processing happens locally in your browser
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-2xl p-6 md:p-8 mb-8">
                        {/* Upload Section */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-xl">
                                    <FileText className="w-6 h-6 text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Upload PDF File
                                    </h2>
                                    <p className="text-gray-500 dark:text-gray-400">
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
                            <div className="space-y-8">
                                {/* File Info */}
                                <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800/30">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-md">
                                                <FileText className="w-8 h-8 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                                                    {files[0].name}
                                                </h3>
                                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
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
                                            className="px-6 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                                        >
                                            Change File
                                        </button>
                                    </div>
                                </div>

                                {/* Page Selection Controls */}
                                <div className="space-y-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                            <Scissors className="w-5 h-5 text-red-500" />
                                            Select Pages to Remove
                                        </h3>
                                        
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                onClick={handleSelectAll}
                                                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 rounded-xl transition-all"
                                            >
                                                Select All
                                            </button>
                                            <button
                                                onClick={handleClearAll}
                                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors"
                                            >
                                                Clear All
                                            </button>
                                            <button
                                                onClick={handleAddRange}
                                                className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-xl transition-colors"
                                            >
                                                Add Range
                                            </button>
                                            <button
                                                onClick={() => setExpandedView(!expandedView)}
                                                className="px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-xl transition-colors flex items-center gap-2"
                                            >
                                                {expandedView ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                                {expandedView ? 'Collapse' : 'Expand'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Page Input */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Page Numbers to Remove
                                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
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
                                                className="w-full px-6 py-4 border-2 border-gray-300 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-lg"
                                            />
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400">
                                                {pagesToRemove.length > 0 && (
                                                    <span className="font-semibold text-red-600 dark:text-red-400">
                                                        {pagesToRemove.length} selected
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Page Preview Grid */}
                                    {originalPageUrls.length > 0 && (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                                    Page Previews ({totalPages} total)
                                                </h4>
                                                <span className={`text-sm font-medium ${
                                                    pagesToRemove.length > 0 
                                                        ? 'text-red-600 dark:text-red-400' 
                                                        : 'text-green-600 dark:text-green-400'
                                                }`}>
                                                    {remainingPages} pages will remain
                                                </span>
                                            </div>
                                            
                                            <div className={`grid gap-4 p-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20 rounded-2xl border-2 border-gray-200 dark:border-gray-700 max-h-[600px] overflow-y-auto ${
                                                expandedView ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'
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
                                            className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-2xl border-2 border-blue-200 dark:border-blue-800/50"
                                        >
                                            <div className="flex items-center gap-3">
                                                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                                <p className="text-blue-800 dark:text-blue-200 font-medium">
                                                    Select pages to remove by clicking on thumbnails or entering page numbers above
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}

                                    {pagesToRemove.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-2xl border-2 border-red-200 dark:border-red-800/50"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                <div className="flex items-center justify-center sm:justify-start">
                                                    <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl">
                                                        <Trash2 className="w-8 h-8 text-white" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 text-center sm:text-left">
                                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                                        Removing {pagesToRemove.length} Pages
                                                    </h4>
                                                    <p className="text-red-700 dark:text-red-300 font-medium">
                                                        Pages: {pagesToRemove.join(', ')}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                                        {remainingPages} pages will remain in the final document
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-center">
                                                    <div className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold rounded-xl">
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
                                            className="space-y-4"
                                        >
                                            <ProgressBar progress={progress} label="Removing pages..." />
                                            <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400">
                                                <div className="animate-pulse">⚡</div>
                                                <span className="text-sm font-medium">
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
                                            className="w-full py-4 px-6 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-3"
                                        >
                                            <Scissors className="w-6 h-6" />
                                            Remove {pagesToRemove.length} Pages
                                            <Download className="w-5 h-5" />
                                        </motion.button>
                                    )}

                                    {pdfBlob && (
                                        <motion.div
                                            key="results"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-6"
                                        >
                                            {/* Success Banner */}
                                            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl border-2 border-green-200 dark:border-green-800/50">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                    <div className="flex items-center justify-center sm:justify-start">
                                                        <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                                                            <Check className="w-8 h-8 text-white" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 text-center sm:text-left">
                                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                            Pages Successfully Removed! 🎉
                                                        </h3>
                                                        <p className="text-green-700 dark:text-green-300 font-medium">
                                                            New document has {remainingPages} pages
                                                        </p>
                                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                                            Ready to download your modified PDF
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-center">
                                                        <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl">
                                                            {(pdfBlob.size / 1024 / 1024).toFixed(2)} MB
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Modified PDF Preview */}
                                            {pdfUrl && (
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                                            Preview Modified PDF
                                                        </h4>
                                                        <button
                                                            onClick={() => setExpandedView(!expandedView)}
                                                            className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-2"
                                                        >
                                                            {expandedView ? <Minus className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                                                            {expandedView ? 'Minimize' : 'Maximize'}
                                                        </button>
                                                    </div>
                                                    <div 
                                                        className={`border-2 border-gray-300 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 ${
                                                            expandedView ? 'h-[80vh]' : 'h-[60vh]'
                                                        } transition-all duration-300`}
                                                    >
                                                        <iframe
                                                            src={pdfUrl}
                                                            title="Modified PDF Preview"
                                                            className="w-full h-full"
                                                            frameBorder="0"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Download Button */}
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleDownload}
                                                className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-extrabold rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-3"
                                            >
                                                <Download className="w-6 h-6" />
                                                Download Modified PDF
                                            </motion.button>

                                            {/* Convert Another */}
                                            <div className="text-center">
                                                <button
                                                    onClick={() => {
                                                        setFiles([]);
                                                        setPdfBlob(null);
                                                        setPageNumbers('');
                                                        setShowUploadInfo(true);
                                                    }}
                                                    className="inline-flex items-center gap-2 px-6 py-3 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                                                >
                                                    <Scissors className="w-4 h-4" />
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
                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div>
                                <div className="text-2xl md:text-3xl font-black text-red-600 dark:text-red-400 mb-2">
                                    {files.length > 0 ? totalPages : '—'}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">
                                    Total Pages
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-black text-orange-600 dark:text-orange-400 mb-2">
                                    {pagesToRemove.length}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">
                                    Pages to Remove
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400 mb-2">
                                    {remainingPages}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">
                                    Pages Remaining
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-black text-green-600 dark:text-green-400 mb-2">
                                    {pdfBlob ? '✓' : '—'}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">
                                    Ready to Download
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}