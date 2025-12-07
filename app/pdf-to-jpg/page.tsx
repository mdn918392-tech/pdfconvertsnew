"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, 
  ArrowLeft, 
  CheckCircle, 
  FileText, 
  Scissors, 
  Layers,
  ChevronRight,
  Sparkles,
  Zap,
  Clock,
  Shield
} from "lucide-react";
import FileUploader from "@/app/components/FileUploader";
import ProgressBar from "@/app/components/ProgressBar";
import { downloadFile } from "../../utils/imageUtils";
import { PDFDocument } from "pdf-lib";

// Page Info
type PageData = {
    pageNumber: number;
    fileName: string;
};

// Placeholder Renderer
const PdfPageRenderer = ({ pageNumber }: { pageNumber: number }) => {
    return (
        <div className="w-20 h-28 sm:w-24 sm:h-36 flex-shrink-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg flex items-center justify-center border-2 border-white dark:border-gray-700 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-gray-800/80 dark:to-gray-900/80 flex flex-col items-center justify-center p-2">
                <span className="text-xs font-bold text-blue-800 dark:text-blue-300 text-center opacity-90">
                    Page
                </span>
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
                    {pageNumber}
                </span>
            </div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-lg group-hover:scale-125 transition-transform" />
            <div className="w-14 h-20 sm:w-18 sm:h-28 bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-800/50 absolute shadow-2xl rounded-md transform rotate-3" />
        </div>
    );
};

export default function PdfToJpg() {
    const [files, setFiles] = useState<File[]>([]);
    const [converting, setConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [converted, setConverted] = useState(false);
    const [pageData, setPageData] = useState<PageData[]>([]);
    const [pdfArrayBuffer, setPdfArrayBuffer] = useState<ArrayBuffer | null>(null);
    const [showUploadInfo, setShowUploadInfo] = useState(true);

    // Convert PDF into page list
    const handleConvert = async () => {
        if (files.length === 0) return;

        setConverting(true);
        setProgress(0);
        setShowUploadInfo(false);

        try {
            const file = files[0];

            // Simulate progress for better UX
            setProgress(30);
            await new Promise(resolve => setTimeout(resolve, 500));

            const arrayBuffer = await file.arrayBuffer();
            setPdfArrayBuffer(arrayBuffer);

            setProgress(60);
            await new Promise(resolve => setTimeout(resolve, 300));

            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const pages = pdfDoc.getPageCount();

            setProgress(85);

            const newPageData: PageData[] = Array.from(
                { length: pages },
                (_, i) => ({
                    pageNumber: i + 1,
                    fileName: `${file.name.replace(".pdf", "")}_page-${i + 1}.pdf`,
                })
            );

            await new Promise(resolve => setTimeout(resolve, 500));
            setPageData(newPageData);
            setProgress(100);
            
            setTimeout(() => {
                setConverted(true);
                setConverting(false);
            }, 300);

        } catch (error) {
            console.error("Conversion error:", error);
            alert("Failed to process PDF. Please make sure it's a valid PDF file.");
            setConverting(false);
            setProgress(0);
        }
    };

    // Download a single page
    const handleDownloadPage = async (pageIndex: number, fileName: string) => {
        if (!pdfArrayBuffer) {
            alert("PDF not loaded.");
            return;
        }

        const statusElement = document.getElementById(`status-${pageIndex}`);
        if (statusElement) {
            statusElement.innerText = "Downloading...";
            statusElement.className = "text-xs text-yellow-600 dark:text-yellow-400 mt-1 font-medium animate-pulse";
        }

        try {
            const pdfDoc = await PDFDocument.load(pdfArrayBuffer);

            const newPdf = await PDFDocument.create();
            const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);
            newPdf.addPage(copiedPage);

            const pdfBytes = await newPdf.save();
            const blob = new Blob([new Uint8Array(pdfBytes)], {
                type: "application/pdf",
            });

            downloadFile(blob, fileName);

            if (statusElement) {
                statusElement.innerText = "✓ Downloaded successfully!";
                statusElement.className = "text-xs text-green-600 dark:text-green-400 mt-1 font-medium";
            }

        } catch (error) {
            console.error(`Error downloading page ${pageIndex + 1}:`, error);
            alert(`Failed to download page ${pageIndex + 1}`);
            
            if (statusElement) {
                statusElement.innerText = "✗ Download failed";
                statusElement.className = "text-xs text-red-600 dark:text-red-400 mt-1 font-medium";
            }
        } finally {
            setTimeout(() => {
                if (statusElement) {
                    statusElement.innerText = "Ready to download";
                    statusElement.className = "text-xs text-blue-600 dark:text-blue-400 mt-1";
                }
            }, 2000);
        }
    };

    // Download all pages
    const handleDownloadAll = async () => {
        if (!pdfArrayBuffer) {
            alert("PDF not loaded.");
            return;
        }

        const statusElements = document.querySelectorAll('[id^="status-all-"]');
        statusElements.forEach(el => {
            (el as HTMLElement).innerText = "Processing all pages...";
            el.className = "text-sm text-yellow-600 dark:text-yellow-400 font-medium animate-pulse";
        });

        try {
            const pdfDoc = await PDFDocument.load(pdfArrayBuffer);
            const pages = pdfDoc.getPageCount();

            for (let i = 0; i < pages; i++) {
                const pageInfo = pageData[i];
                const fileName = pageInfo ? pageInfo.fileName : `page-${i + 1}.pdf`;

                const newPdf = await PDFDocument.create();
                const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
                newPdf.addPage(copiedPage);

                const pdfBytes = await newPdf.save();
                const blob = new Blob([new Uint8Array(pdfBytes)], {
                    type: "application/pdf",
                });

                downloadFile(blob, fileName);
            }

            statusElements.forEach(el => {
                (el as HTMLElement).innerText = "✓ All pages downloaded!";
                el.className = "text-sm text-green-600 dark:text-green-400 font-medium";
            });

        } catch (error) {
            console.error("Error downloading all pages:", error);
            alert("Failed to download all pages");
            
            statusElements.forEach(el => {
                (el as HTMLElement).innerText = "✗ Download failed";
                el.className = "text-sm text-red-600 dark:text-red-400 font-medium";
            });
        }
    };

    const handleFilesSelected = (newFiles: File[]) => {
        setFiles(newFiles);
        setConverted(false);
        setPageData([]);
        setPdfArrayBuffer(null);
        setShowUploadInfo(false);
    };

    const handleReset = () => {
        setFiles([]);
        setConverted(false);
        setPageData([]);
        setPdfArrayBuffer(null);
        setProgress(0);
        setShowUploadInfo(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20 py-8 md:py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <a
                            href="/"
                            className="inline-flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all font-medium group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="hidden sm:inline">Back to Tools</span>
                        </a>
                        
                        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-purple-950/30 px-4 py-2 rounded-full">
                            <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                                Secure & Private
                            </span>
                        </div>
                    </div>

                    {/* Hero Section */}
                    <div className="text-center mb-10 md:mb-12">
                        <motion.div 
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-2xl"
                        >
                            <Scissors className="w-10 h-10 text-white" />
                        </motion.div>
                        
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                            PDF Page Splitter
                        </h1>
                        
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Split PDF documents into individual pages instantly. 
                            <span className="block text-blue-600 dark:text-blue-400 font-medium mt-1">
                                Extract, download, and organize pages with one click!
                            </span>
                        </p>
                    </div>

                    {/* Main Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-2xl p-6 md:p-8 mb-8">
                        {/* Upload Section */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl">
                                    <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Upload PDF
                                    </h2>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Select your PDF file to split
                                    </p>
                                </div>
                            </div>

                            <FileUploader
                                accept="application/pdf"
                                multiple={false}
                                onFilesSelected={handleFilesSelected}
                            />

                            {/* Features Grid */}
                            <AnimatePresence>
                                {showUploadInfo && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
                                    >
                                        <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800/50">
                                            <div className="flex items-center gap-3">
                                                <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                                <span className="font-semibold text-blue-800 dark:text-blue-300">
                                                    Fast Processing
                                                </span>
                                            </div>
                                            <p className="text-sm text-blue-700/80 dark:text-blue-400/80 mt-2">
                                                Split large PDFs in seconds
                                            </p>
                                        </div>
                                        
                                        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-900/20 rounded-2xl border border-purple-200 dark:border-purple-800/50">
                                            <div className="flex items-center gap-3">
                                                <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                                <span className="font-semibold text-purple-800 dark:text-purple-300">
                                                    Page Preview
                                                </span>
                                            </div>
                                            <p className="text-sm text-purple-700/80 dark:text-purple-400/80 mt-2">
                                                Visual preview of each page
                                            </p>
                                        </div>
                                        
                                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800/50">
                                            <div className="flex items-center gap-3">
                                                <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                                                <span className="font-semibold text-green-800 dark:text-green-300">
                                                    Batch Download
                                                </span>
                                            </div>
                                            <p className="text-sm text-green-700/80 dark:text-green-400/80 mt-2">
                                                Download all pages at once
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Content Area */}
                        {files.length > 0 && (
                            <div className="space-y-8">
                                {/* Selected File Info */}
                                <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800/30">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                                                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                                                    {files[0].name}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                    {(files[0].size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleReset}
                                            className="px-6 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                                        >
                                            Change File
                                        </button>
                                    </div>
                                </div>

                                {/* Processing State */}
                                <AnimatePresence mode="wait">
                                    {converting && (
                                        <motion.div
                                            key="converting"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="space-y-6"
                                        >
                                            <div className="text-center">
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                    Splitting Your PDF ✂️
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    Analyzing document structure...
                                                </p>
                                            </div>
                                            
                                            <ProgressBar
                                                progress={progress}
                                                label={
                                                    progress < 50 
                                                    ? "Loading PDF..." 
                                                    : progress < 85 
                                                    ? "Extracting pages..." 
                                                    : "Preparing download..."
                                                }
                                            />
                                            
                                            <div className="flex justify-center">
                                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/30 rounded-full">
                                                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
                                                    <span className="text-sm text-blue-700 dark:text-blue-300">
                                                        Processing pages
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Convert Button */}
                                    {!converted && !converting && (
                                        <motion.button
                                            key="convert"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleConvert}
                                            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-3"
                                        >
                                            <Scissors className="w-6 h-6" />
                                            Split PDF into Pages
                                            <ChevronRight className="w-5 h-5" />
                                        </motion.button>
                                    )}

                                    {/* Results */}
                                    {converted && (
                                        <motion.div
                                            key="results"
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
                                                            Found {pageData.length} pages in your document
                                                        </p>
                                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                                            Each page is now available for individual download
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-center">
                                                        <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl">
                                                            {pageData.length} Pages
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Page Grid */}
                                            <div>
                                                <div className="flex items-center justify-between mb-6">
                                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                                        <Layers className="w-6 h-6 text-blue-500" />
                                                        Individual Pages
                                                    </h3>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                                        Click to download
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                    {pageData.map((page, index) => (
                                                        <motion.div
                                                            key={page.pageNumber}
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: index * 0.1 }}
                                                            whileHover={{ y: -4 }}
                                                            className="group"
                                                        >
                                                            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-5 shadow-lg hover:shadow-2xl transition-all duration-300">
                                                                <div className="flex flex-col items-center text-center space-y-4">
                                                                    <PdfPageRenderer pageNumber={page.pageNumber} />
                                                                    
                                                                    <div className="w-full">
                                                                        <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                                                                            Page {page.pageNumber}
                                                                        </h4>
                                                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-3">
                                                                            {page.fileName}
                                                                        </p>
                                                                        
                                                                        <div className="space-y-3">
                                                                            <span
                                                                                id={`status-${index}`}
                                                                                className="text-xs text-blue-600 dark:text-blue-400 font-medium"
                                                                            >
                                                                                Ready to download
                                                                            </span>
                                                                            
                                                                            <motion.button
                                                                                whileHover={{ scale: 1.05 }}
                                                                                whileTap={{ scale: 0.95 }}
                                                                                onClick={() => handleDownloadPage(index, page.fileName)}
                                                                                className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                                                            >
                                                                                <Download className="w-4 h-4" />
                                                                                Download Page
                                                                            </motion.button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Download All Button */}
                                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl p-8 border-2 border-indigo-200 dark:border-indigo-800/50">
                                                <div className="text-center mb-6">
                                                    <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                                                        Download All Pages
                                                    </h4>
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        Get all {pageData.length} pages in one go
                                                    </p>
                                                    <p id="status-all-1" className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-2">
                                                        Ready for batch download
                                                    </p>
                                                </div>
                                                
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={handleDownloadAll}
                                                    className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-3"
                                                >
                                                    <Download className="w-6 h-6" />
                                                    Download ALL {pageData.length} Pages
                                                    <Sparkles className="w-5 h-5" />
                                                </motion.button>
                                                
                                                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                                                    Each page will be downloaded as a separate PDF file
                                                </p>
                                            </div>

                                            {/* Convert Another */}
                                            <div className="text-center">
                                                <button
                                                    onClick={handleReset}
                                                    className="inline-flex items-center gap-2 px-6 py-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-colors"
                                                >
                                                    <FileText className="w-4 h-4" />
                                                    Split Another PDF
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    {/* Info Footer */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="p-4">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl mb-3">
                                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                Secure Processing
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Your files are processed locally and never uploaded to any server
                            </p>
                        </div>
                        
                        <div className="p-4">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl mb-3">
                                <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                Fast & Efficient
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Split PDFs instantly with our optimized processing engine
                            </p>
                        </div>
                        
                        <div className="p-4">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl mb-3">
                                <Download className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                Batch Download
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Download individual pages or all at once with a single click
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}