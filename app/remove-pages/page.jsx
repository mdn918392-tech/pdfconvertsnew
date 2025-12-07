"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowLeft, FileText, X } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import ProgressBar from '../components/ProgressBar';
import { removePages } from '../../utils/pdfUtils';
import { downloadFile } from '../../utils/imageUtils'; 
import { PDFDocument } from 'pdf-lib';

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

export default function RemovePages() {
    const [files, setFiles] = useState([]);
    const [pageNumbers, setPageNumbers] = useState(''); 
    const [totalPages, setTotalPages] = useState(0);
    const [converting, setConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [pdfBlob, setPdfBlob] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [originalPageUrls, setOriginalPageUrls] = useState([]);

    // Calculate the pages to be removed dynamically (for display/validation)
    const pagesToRemove = useMemo(() => {
        return parsePageNumbers(pageNumbers, totalPages);
    }, [pageNumbers, totalPages]);


    // 📄 Effect to create and clean up the MODIFIED PDF Blob URL
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


    // 🖼️ Helper function to handle creating previews for the original PDF
    const createOriginalPreviews = async (file) => {
        setOriginalPageUrls([]);
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            const count = pdf.getPageCount();
            
            const urls = [];
            for (let i = 1; i <= count; i++) {
                // Create a temporary PDF containing only page i
                const singlePagePdf = await PDFDocument.create();
                // Pages are 0-indexed in PDF-lib, so page i is index i-1
                const [copiedPage] = await singlePagePdf.copyPages(pdf, [i - 1]); 
                singlePagePdf.addPage(copiedPage);
                // singlePageBytes is a Uint8Array
                const singlePageBytes = await singlePagePdf.save();
                
               // FIX: Explicitly wrap the underlying buffer in a Uint8Array view
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
        setOriginalPageUrls([]);
        setTotalPages(0);

        if (selectedFiles.length > 0) {
            const file = selectedFiles[0];
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            const count = pdf.getPageCount();
            setTotalPages(count);
            
            // Start generating previews for the original file
            createOriginalPreviews(file); 
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
            // Assumes removePages is a JavaScript utility function
            const blob = await removePages(files[0], pagesToRemove); 
            setProgress(100);
            setPdfBlob(blob);
        } catch (error) {
            console.error('Remove error:', error);
            alert('Failed to remove pages');
        } finally {
            setConverting(false);
        }
    };

    const handleDownload = () => {
        if (pdfBlob) {
            // Assumes downloadFile is a JavaScript utility function
            downloadFile(pdfBlob, 'pages-removed.pdf');
        }
    };

    /**
     * ✅ New Handler: Toggles the removal status of a page by clicking its thumbnail.
     * @param {number} pageNumber - The 1-based index of the page that was clicked.
     */
    const handleToggleRemovePage = (pageNumber) => {
        // Clear modified PDF preview when user changes selection
        setPdfBlob(null); 
        setPdfUrl(null);

        const currentPages = pagesToRemove;
        let newPages;

        if (currentPages.includes(pageNumber)) {
            // Page is already selected, remove it
            newPages = currentPages.filter(p => p !== pageNumber);
        } else {
            // Page is not selected, add it and keep sorted
            newPages = [...currentPages, pageNumber].sort((a, b) => a - b);
        }

        // Convert the new array of page numbers back into a comma-separated string
        setPageNumbers(newPages.join(','));
    };


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </a>
                    
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        ✂️ Remove PDF Pages
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Delete specific pages from a PDF document by typing the numbers or clicking the previews.
                    </p>

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 mb-6">
                        <FileUploader
                            accept="application/pdf"
                            multiple={false}
                            onFilesSelected={handleFileSelect}
                        />

                        {files.length > 0 && (
                            <div className="mt-6 space-y-4">
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                    <p className="text-blue-800 dark:text-blue-200 text-sm font-semibold">
                                        Total pages: **{totalPages}**
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Page numbers to remove (e.g., 1,3,5)
                                    </label>
                                    <input
                                        type="text"
                                        value={pageNumbers}
                                        onChange={(e) => {
                                            setPageNumbers(e.target.value);
                                            // Reset modified PDF preview when input changes
                                            setPdfBlob(null);
                                            setPdfUrl(null);
                                        }}
                                        placeholder="e.g., 1,3,5"
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    />
                                    {pagesToRemove.length > 0 && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400 font-medium">
                                            <X className="w-4 h-4 inline-block mr-1 align-text-bottom" />
                                            **{pagesToRemove.length}** {pagesToRemove.length === 1 ? 'page' : 'pages'} will be removed.
                                        </p>
                                    )}
                                </div>

                                {/* 1. Original PDF Pages Preview */}
                                {originalPageUrls.length > 0 && !converting && !pdfBlob && (
                                    <div className="mt-6 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                            Original Pages Preview (Click to Toggle Removal)
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto p-2">
                                            {originalPageUrls.map((url, index) => {
                                                const pageNum = index + 1;
                                                const isSelected = pagesToRemove.includes(pageNum);
                                                return (
                                                    <div 
                                                        key={index} 
                                                        onClick={() => handleToggleRemovePage(pageNum)} 
                                                        className={`relative aspect-[3/4] border-4 rounded-lg overflow-hidden shadow-md transition-all cursor-pointer group ${
                                                            isSelected
                                                                ? 'border-red-500 opacity-60' // Highlight page to be removed
                                                                : 'border-transparent hover:border-blue-300'
                                                        }`}
                                                        title={isSelected ? `Click to KEEP Page ${pageNum}` : `Click to REMOVE Page ${pageNum}`}
                                                    >
                                                        <p className={`absolute top-1 left-1 text-xs px-2 py-0.5 rounded z-10 transition-colors ${
                                                            isSelected 
                                                                ? 'bg-red-500 text-white font-bold' 
                                                                : 'bg-black/70 text-white'
                                                        }`}>
                                                            Page {pageNum}
                                                        </p>
                                                        {isSelected && (
                                                            <X className="absolute top-1 right-1 w-6 h-6 p-0.5 text-white bg-red-600 rounded-full z-10" />
                                                        )}
                                                        <iframe
                                                            src={url}
                                                            title={`Original Page ${pageNum}`}
                                                            className="w-full h-full pointer-events-none" // Disable interaction inside iframe
                                                            frameBorder="0"
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                                {/* End of Original Pages Preview */}

                                {converting && (
                                    <ProgressBar progress={progress} label="Removing pages..." />
                                )}

                                {!pdfBlob && !converting && (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleConvert}
                                        disabled={pagesToRemove.length === 0}
                                        className={`w-full py-3 text-white font-medium rounded-lg transition-colors ${
                                            pagesToRemove.length === 0
                                                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                    >
                                        Remove Pages
                                    </motion.button>
                                )}

                                {/* 2. Modified PDF Preview */}
                                {pdfUrl && (
                                    <div className="mt-6">
                                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                            Modified PDF Preview ({totalPages - pagesToRemove.length} pages left)
                                        </h3>
                                        <div 
                                            className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg" 
                                            style={{ height: '70vh', minHeight: '400px' }}
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
                                {/* End of Modified PDF Preview */}

                                {pdfBlob && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleDownload}
                                        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Download className="w-5 h-5" />
                                        Download Modified PDF
                                    </motion.button>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}