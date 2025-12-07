"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowLeft, FileText, File, Scissors, Layers, Shield, Zap, CheckCircle, Sparkles, Eye, Maximize2 } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import ProgressBar from '../components/ProgressBar';
import { splitPdf } from '../../utils/pdfUtils';
import { downloadFile } from '../../utils/imageUtils';
// NOTE: PDFDocument, degrees are not used in split-pdf logic, removed unnecessary import.
// import { PDFDocument, degrees } from 'pdf-lib'; 

// --- Interface Definitions (Necessary for TypeScript) ---
interface PreviewModalState {
    url: string | null;
    page: number | null;
}

interface PdfPagePreviewProps {
    pageNumber: number;
    previewUrl: string;
    index: number;
    onPreviewClick: (url: string, pageNumber: number) => void;
    // Added to allow access to pdfBlobs in main component
    pdfBlobs: Blob[]; 
}


// PDF Page Preview Component
const PdfPagePreview = ({ pageNumber, previewUrl, index, onPreviewClick, pdfBlobs }: PdfPagePreviewProps) => {
    const [isHovered, setIsHovered] = useState(false);

    // FIX 1: Correctly use pdfBlobs array for individual download
    const pageBlob = pdfBlobs[index];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative group"
        >
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Page Number Badge */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
                    #{pageNumber}
                </div>
                
                {/* Preview Container */}
                <div 
                    className="relative w-full h-36 mb-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => onPreviewClick(previewUrl, pageNumber)}
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <iframe
                            src={previewUrl}
                            title={`Page ${pageNumber} Preview`}
                            className="w-full h-full scale-75 pointer-events-none"
                            frameBorder="0"
                        />
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                        <div className="flex flex-col items-center gap-1">
                            <Eye className="w-6 h-6 text-white" />
                            <span className="text-xs text-white font-medium">Preview</span>
                        </div>
                    </div>
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
                
                {/* Page Info */}
                <div className="text-center">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                        Page {pageNumber}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Split from PDF
                    </p>
                </div>
                
                {/* Download Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    // FIX 2: Pass the actual Blob to downloadFile, not the URL string
                    onClick={() => pageBlob && downloadFile(pageBlob, `page-${pageNumber}.pdf`)} 
                    className="absolute bottom-3 right-3 p-1.5 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors opacity-0 group-hover:opacity-100"
                    title={`Download Page ${pageNumber}`}
                >
                    <Download className="w-3.5 h-3.5" />
                </motion.button>
            </div>
        </motion.div>
    );
};


export default function SplitPdf() {
    const [files, setFiles] = useState<File[]>([]);
    const [converting, setConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [pdfBlobs, setPdfBlobs] = useState<Blob[]>([]);
    const [pdfUrls, setPdfUrls] = useState<string[]>([]);
    const [showUploadInfo, setShowUploadInfo] = useState(true);
    const [previewModal, setPreviewModal] = useState<PreviewModalState>({ url: null, page: null });

    // Effect to revoke Object URLs when component unmounts or blobs change
    useEffect(() => {
        if (pdfBlobs.length > 0) {
            const urls = pdfBlobs.map(blob => URL.createObjectURL(blob));
            setPdfUrls(urls);

            return () => {
                urls.forEach(url => URL.revokeObjectURL(url));
            };
        }
    }, [pdfBlobs]);

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
            // NOTE: The 'splitPdf' utility must handle the splitting logic and 
            // return an array of Blobs. It should also use the 'as BlobPart' 
            // workaround internally if it saves the pages using pdf-lib.
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

    const handlePreviewClick = (url: string, page: number) => {
        setPreviewModal({ url, page });
    };

    const totalSize = files[0] ? (files[0].size / 1024 / 1024).toFixed(2) : 0;

    return (
        <>
            {/* Preview Modal */}
            <AnimatePresence>
                {previewModal.url && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        onClick={() => setPreviewModal({ url: null, page: null })}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative max-w-4xl max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-2">
                                <iframe
                                    src={previewModal.url}
                                    title={`Page ${previewModal.page} Preview`}
                                    className="w-full h-[70vh] rounded-lg"
                                    frameBorder="0"
                                />
                            </div>
                            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg">
                                Page {previewModal.page}
                            </div>
                            <button
                                onClick={() => setPreviewModal({ url: null, page: null })}
                                className="absolute -top-4 -right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                            >
                                <File className="w-6 h-6" />
                            </button>
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
                        <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-2xl p-6 md:p-8 mb-8">
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
                                    <div className="mt-4 text-center">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full">
                                            <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                            <span className="font-medium text-purple-700 dark:text-purple-300">
                                                {files[0].name} • {totalSize} MB
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
                                                        Processing document pages...
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {pdfBlobs.length === 0 && !converting && (
                                            <motion.button
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleConvert}
                                                className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-3"
                                            >
                                                <Scissors className="w-6 h-6" />
                                                Split PDF into Pages
                                                <Zap className="w-5 h-5" />
                                            </motion.button>
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

                                            {/* Page Previews */}
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                                        <Layers className="w-5 h-5 text-purple-500" />
                                                        Individual Pages ({pdfBlobs.length})
                                                    </h3>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                                        Click to preview
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[500px] overflow-y-auto p-4 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-950/20 rounded-2xl border-2 border-gray-200 dark:border-gray-700">
                                                    {pdfUrls.map((url, index) => (
                                                        <PdfPagePreview
                                                            key={index}
                                                            pageNumber={index + 1}
                                                            previewUrl={url}
                                                            index={index}
                                                            onPreviewClick={handlePreviewClick}
                                                            pdfBlobs={pdfBlobs} // Pass blobs to access for download button
                                                        />
                                                    ))}
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
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                <div>
                                    <div className="text-2xl md:text-3xl font-black text-purple-600 dark:text-purple-400 mb-2">
                                        {files.length > 0 ? '✓' : '—'}
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400 font-medium">
                                        File Uploaded
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-3xl font-black text-pink-600 dark:text-pink-400 mb-2">
                                        {pdfBlobs.length}
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400 font-medium">
                                        Pages Split
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400 mb-2">
                                        {totalSize}
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400 font-medium">
                                        File Size (MB)
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-3xl font-black text-green-600 dark:text-green-400 mb-2">
                                        {pdfBlobs.length > 0 ? '✓' : '—'}
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
        </>
    );
}