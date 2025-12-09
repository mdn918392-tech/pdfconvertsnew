"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowLeft, FileText, File, Scissors, Layers, Shield, Zap, CheckCircle, Sparkles, Eye, Maximize2, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import FileUploader from '../components/FileUploader';
import ProgressBar from '../components/ProgressBar';
import { splitPdf } from '../../utils/pdfUtils';
import { downloadFile } from '../../utils/imageUtils';

// pdfjs-dist को dynamic import करें और worker configure करें
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?url';

// PDF.js worker को configure करें


// react-pdf को dynamic import करें (SSR disable करके)
const Document = dynamic(
  () => import('react-pdf').then((mod) => {
    // pdfjsLib को react-pdf के pdfjs में set करें
    mod.pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    return mod.Document;
  }),
  { 
    ssr: false,
    loading: () => <div className="flex items-center justify-center p-4"><div className="text-gray-500">Loading PDF viewer...</div></div>
  }
);

const Page = dynamic(
  () => import('react-pdf').then((mod) => mod.Page),
  { 
    ssr: false,
    loading: () => <div className="flex items-center justify-center"><div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>
  }
);

// --- Interface Definitions ---
interface PreviewModalState {
    url: string | null;
    page: number | null;
    blob: Blob | null;
}

interface PdfPagePreviewProps {
    pageNumber: number;
    previewUrl: string;
    index: number;
    onPreviewClick: (url: string, pageNumber: number, blob: Blob) => void;
    pdfBlobs: Blob[]; 
    isExpanded?: boolean;
}

// PDF Page Preview Component
const PdfPagePreview = ({ pageNumber, previewUrl, index, onPreviewClick, pdfBlobs, isExpanded = false }: PdfPagePreviewProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [pageWidth, setPageWidth] = useState(120);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isExpanded) {
            setPageWidth(180);
        } else {
            setPageWidth(120);
        }
    }, [isExpanded]);

    const pageBlob = pdfBlobs[index];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative group"
        >
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Page Number Badge */}
                <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                    #{pageNumber}
                </div>
                
                {/* Preview Container */}
                <div 
                    className="relative w-full h-32 sm:h-36 mb-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => pageBlob && onPreviewClick(previewUrl, pageNumber, pageBlob)}
                >
                    {previewUrl && isClient ? (
                        <div className="w-full h-full flex items-center justify-center p-2">
                            <Document
                                file={previewUrl}
                                loading={
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                        <span className="text-xs text-gray-500">Loading...</span>
                                    </div>
                                }
                                error={<div className="text-xs text-red-500 p-2">Failed to load</div>}
                                className="flex items-center justify-center"
                            >
                                <Page
                                    pageNumber={1}
                                    width={pageWidth}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    className="pdf-page-preview"
                                />
                            </Document>
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <FileText className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-xs text-gray-500">Page {pageNumber}</span>
                        </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                        <div className="flex flex-col items-center gap-1">
                            <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            <span className="text-xs text-white font-medium">Preview</span>
                        </div>
                    </div>
                </div>
                
                {/* Page Info */}
                <div className="text-center px-1">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1 truncate">
                        Page {pageNumber}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Individual PDF
                    </p>
                </div>
                
                {/* Download Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        pageBlob && downloadFile(pageBlob, `page-${pageNumber}.pdf`);
                    }}
                    className="absolute bottom-2 right-2 p-1.5 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors opacity-0 group-hover:opacity-100"
                    title={`Download Page ${pageNumber}`}
                >
                    <Download className="w-3.5 h-3.5" />
                </motion.button>
            </div>
        </motion.div>
    );
};

// यदि उपरोक्त तरीका काम न करे, तो यह सरल विकल्प आज़माएं
export default function SplitPdf() {
    const [files, setFiles] = useState<File[]>([]);
    const [converting, setConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [pdfBlobs, setPdfBlobs] = useState<Blob[]>([]);
    const [pdfUrls, setPdfUrls] = useState<string[]>([]);
    const [showUploadInfo, setShowUploadInfo] = useState(true);
    const [previewModal, setPreviewModal] = useState<PreviewModalState>({ url: null, page: null, blob: null });
    const [isExpandedView, setIsExpandedView] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [isClient, setIsClient] = useState(false);

    // Set client flag
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Effect to revoke Object URLs
    useEffect(() => {
        if (pdfBlobs.length > 0) {
            const urls = pdfBlobs.map(blob => URL.createObjectURL(blob));
            setPdfUrls(urls);

            return () => {
                urls.forEach(url => URL.revokeObjectURL(url));
            };
        }
    }, [pdfBlobs]);

    // Get total pages when file is uploaded
    useEffect(() => {
        if (files.length > 0) {
            const getPageCount = async () => {
                try {
                    const { PDFDocument } = await import('pdf-lib');
                    const arrayBuffer = await files[0].arrayBuffer();
                    const pdf = await PDFDocument.load(arrayBuffer);
                    setTotalPages(pdf.getPageCount());
                } catch (error) {
                    console.error("Error getting page count:", error);
                }
            };
            getPageCount();
        }
    }, [files]);

    const handleConvert = async () => {
        if (files.length === 0) return;

        setConverting(true);
        setProgress(0);
        setPdfBlobs([]);
        setPdfUrls([]);
        setShowUploadInfo(false);

        try {
            setProgress(20);
            await new Promise(resolve => setTimeout(resolve, 300));
            
            setProgress(50);
            const blobs = await splitPdf(files[0]);
            
            setProgress(80);
            await new Promise(resolve => setTimeout(resolve, 300));
            
            setProgress(100);
            setPdfBlobs(blobs);
        } catch (error) {
            console.error('Split error:', error);
            alert('Failed to split PDF. Please try again.');
        } finally {
            setConverting(false);
        }
    };

    const handleDownload = () => {
        pdfBlobs.forEach((blob, index) => {
            downloadFile(blob, `page-${index + 1}.pdf`);
        });
    };

    const handlePreviewClick = (url: string, page: number, blob: Blob) => {
        setPreviewModal({ url, page, blob });
    };

    const handleDownloadFromModal = () => {
        if (previewModal.blob && previewModal.page) {
            downloadFile(previewModal.blob, `page-${previewModal.page}.pdf`);
        }
    };

    const totalSize = files[0] ? (files[0].size / 1024 / 1024).toFixed(2) : 0;

    return (
        <>
            {/* Preview Modal - Simplifed without react-pdf */}
            <AnimatePresence>
                {previewModal.url && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        onClick={() => setPreviewModal({ url: null, page: null, blob: null })}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-white" />
                                    <h3 className="text-white font-bold">
                                        Page {previewModal.page} Preview
                                    </h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleDownloadFromModal}
                                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                                        title="Download this page"
                                    >
                                        <Download className="w-4 h-4 text-white" />
                                    </button>
                                    <button
                                        onClick={() => setPreviewModal({ url: null, page: null, blob: null })}
                                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </div>

                            {/* PDF Preview - Simple iframe */}
                            <div className="h-[calc(90vh-80px)] p-4">
                                {previewModal.url && (
                                    <div className="w-full h-full bg-white rounded-lg overflow-hidden">
                                        <iframe
                                            src={previewModal.url}
                                            title={`Page ${previewModal.page} Preview`}
                                            className="w-full h-full"
                                            frameBorder="0"
                                        />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 py-8 md:py-12">
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
                                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl mb-6 shadow-2xl"
                                >
                                    <Scissors className="w-10 h-10 text-white" />
                                </motion.div>
                                
                                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                                    PDF Splitter
                                </h1>
                                
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                                    Split PDF documents into individual pages with one click
                                    <span className="block text-purple-600 dark:text-purple-400 font-medium mt-1">
                                        Each page becomes a separate PDF file
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
                                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-2xl border-2 border-purple-200 dark:border-purple-800/50">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                                                <Scissors className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">One-Click Split</h3>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Split entire PDF documents into individual pages instantly
                                        </p>
                                    </div>
                                    
                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-2xl border-2 border-blue-200 dark:border-blue-800/50">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
                                                <Layers className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Page Preview</h3>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Preview each page before downloading individually or in bulk
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
                        <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-2xl p-4 sm:p-6 md:p-8 mb-8">
                            {/* Upload Section */}
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl">
                                        <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            Upload PDF File
                                        </h2>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Select a PDF file to split into individual pages
                                        </p>
                                    </div>
                                </div>

                                <FileUploader
                                    accept="application/pdf"
                                    multiple={false}
                                    onFilesSelected={setFiles}
                                />

                                {files.length > 0 && (
                                    <div className="mt-4">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full">
                                            <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                            <span className="font-medium text-purple-700 dark:text-purple-300 text-sm">
                                                {files[0].name}
                                            </span>
                                            <span className="text-xs text-purple-600 dark:text-purple-400">
                                                • {totalSize} MB • {totalPages} pages
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Content Area */}
                            {files.length > 0 && (
                                <div className="space-y-8">
                                    {/* Action Buttons */}
                                    <div className="space-y-4">
                                        {converting && (
                                            <div className="space-y-4">
                                                <ProgressBar 
                                                    progress={progress} 
                                                    label="Splitting PDF into individual pages..." 
                                                />
                                                <div className="flex items-center justify-center gap-2 text-purple-600 dark:text-purple-400">
                                                    <Sparkles className="w-4 h-4 animate-pulse" />
                                                    <span className="text-sm font-medium">
                                                        Processing {totalPages} pages...
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {pdfBlobs.length === 0 && !converting && (
                                            <div className="space-y-4">
                                                <motion.button
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={handleConvert}
                                                    className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-3"
                                                >
                                                    <Scissors className="w-6 h-6" />
                                                    Split PDF into {totalPages} Pages
                                                    <Zap className="w-5 h-5" />
                                                </motion.button>
                                                
                                                <div className="text-center">
                                                    <button
                                                        onClick={() => setIsExpandedView(!isExpandedView)}
                                                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium hover:bg-purple-50 dark:hover:bg-purple-950/30 rounded-xl transition-colors"
                                                    >
                                                        {isExpandedView ? (
                                                            <>
                                                                <Maximize2 className="w-4 h-4" />
                                                                Collapse View
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Maximize2 className="w-4 h-4" />
                                                                Expand View
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Results Section */}
                                    {pdfBlobs.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-8"
                                        >
                                            {/* Success Banner */}
                                            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl border-2 border-green-200 dark:border-green-800/50">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                    <div className="flex items-center justify-center sm:justify-start">
                                                        <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-xl">
                                                            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 text-center sm:text-left">
                                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                            PDF Successfully Split! 🎉
                                                        </h3>
                                                        <p className="text-green-700 dark:text-green-300 font-medium">
                                                            Split into {pdfBlobs.length} individual pages
                                                        </p>
                                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                                            Each page is now available as a separate PDF file
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-center">
                                                        <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl">
                                                            {pdfBlobs.length} Pages
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Page Previews Header */}
                                            <div className="space-y-4">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                                        <Layers className="w-5 h-5 text-purple-500" />
                                                        Individual Pages ({pdfBlobs.length})
                                                    </h3>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                                            Click to preview
                                                        </span>
                                                        <button
                                                            onClick={() => setIsExpandedView(!isExpandedView)}
                                                            className="px-3 py-1.5 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-xl transition-colors flex items-center gap-2"
                                                        >
                                                            {isExpandedView ? (
                                                                <>
                                                                    <Maximize2 className="w-3.5 h-3.5" />
                                                                    Collapse
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Maximize2 className="w-3.5 h-3.5" />
                                                                    Expand
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Page Previews Grid - Alternative approach */}
                                                <div className={`p-4 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-950/20 rounded-2xl border-2 border-gray-200 dark:border-gray-700 max-h-[500px] overflow-y-auto ${
                                                    isExpandedView 
                                                        ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
                                                        : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4'
                                                }`}>
                                                    {pdfUrls.map((url, index) => {
                                                        const pageBlob = pdfBlobs[index];
                                                        const pageNumber = index + 1;
                                                        
                                                        return (
                                                            <div key={index} className="relative group">
                                                                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                                                                    {/* Page Number Badge */}
                                                                    <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                                                                        #{pageNumber}
                                                                    </div>
                                                                    
                                                                    {/* Preview Container - Simple iframe */}
                                                                    <div 
                                                                        className="relative w-full h-32 sm:h-36 mb-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden cursor-pointer"
                                                                        onClick={() => handlePreviewClick(url, pageNumber, pageBlob)}
                                                                    >
                                                                        <iframe
                                                                            src={url}
                                                                            title={`Page ${pageNumber} Preview`}
                                                                            className="w-full h-full scale-75 pointer-events-none"
                                                                            frameBorder="0"
                                                                        />
                                                                        
                                                                        {/* Hover Overlay */}
                                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                                            <div className="flex flex-col items-center gap-1">
                                                                                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                                                                <span className="text-xs text-white font-medium">Preview</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    {/* Page Info */}
                                                                    <div className="text-center px-1">
                                                                        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1 truncate">
                                                                            Page {pageNumber}
                                                                        </h4>
                                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                            Individual PDF
                                                                        </p>
                                                                    </div>
                                                                    
                                                                    {/* Download Button */}
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            downloadFile(pageBlob, `page-${pageNumber}.pdf`);
                                                                        }}
                                                                        className="absolute bottom-2 right-2 p-1.5 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors opacity-0 group-hover:opacity-100"
                                                                        title={`Download Page ${pageNumber}`}
                                                                    >
                                                                        <Download className="w-3.5 h-3.5" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Download Buttons */}
                                            <div className="space-y-6">
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={handleDownload}
                                                    className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-extrabold rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-3"
                                                >
                                                    <Download className="w-6 h-6" />
                                                    Download All {pdfBlobs.length} Pages
                                                    <Sparkles className="w-5 h-5" />
                                                </motion.button>

                                                {/* Convert Another */}
                                                <div className="text-center">
                                                    <button
                                                        onClick={() => {
                                                            setFiles([]);
                                                            setPdfBlobs([]);
                                                            setPdfUrls([]);
                                                            setTotalPages(0);
                                                            setIsExpandedView(false);
                                                            setShowUploadInfo(true);
                                                        }}
                                                        className="inline-flex items-center gap-2 px-6 py-3 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium hover:bg-purple-50 dark:hover:bg-purple-950/30 rounded-xl transition-colors"
                                                    >
                                                        <Scissors className="w-4 h-4" />
                                                        Split Another PDF
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Stats Footer */}
                        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
                                <div>
                                    <div className="text-2xl md:text-3xl font-black text-purple-600 dark:text-purple-400 mb-2">
                                        {files.length > 0 ? '✓' : '—'}
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base">
                                        File Uploaded
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-3xl font-black text-pink-600 dark:text-pink-400 mb-2">
                                        {pdfBlobs.length || totalPages}
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base">
                                        {pdfBlobs.length > 0 ? 'Pages Split' : 'Total Pages'}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400 mb-2">
                                        {totalSize}
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base">
                                        File Size (MB)
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-3xl font-black text-green-600 dark:text-green-400 mb-2">
                                        {pdfBlobs.length > 0 ? '✓' : '—'}
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base">
                                        Ready to Download
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