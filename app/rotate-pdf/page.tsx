"use client";
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowLeft, RotateCw, RotateCcw, CheckCircle, RefreshCw, FileText, Shield, Zap, Eye, Maximize2, Minus, Plus, X } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import ProgressBar from '../components/ProgressBar';
import { rotatePdf } from '../../utils/pdfUtils'; 
import { downloadFile } from '../../utils/imageUtils'; 
import { PDFDocument, degrees } from 'pdf-lib';

// --- Page Preview Component ---
interface PageRotation {
    url: string;
    degrees: number;
    originalBytes: Uint8Array;
}

interface PagePreviewProps {
    page: PageRotation;
    index: number;
    onRotate: (index: number) => void;
    onPreview: (url: string, pageNumber: number) => void;
}

const PagePreview = ({ 
    page, 
    index, 
    onRotate, 
    onPreview 
}: PagePreviewProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative group"
        >
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-3 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Page Number Badge */}
                <div className="absolute top-2 left-2 z-10">
                    <div className={`px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                        page.degrees === 90 || page.degrees === 270 ? 'bg-blue-600' : 
                        page.degrees === 180 ? 'bg-orange-600' : 
                        'bg-purple-600'
                    }`}>
                        #{index + 1}
                    </div>
                </div>

                {/* Rotation Indicator */}
                <div className="absolute top-2 right-2 z-10">
                    <div className="px-2 py-1 bg-black/70 text-white text-xs rounded-full font-medium">
                        {page.degrees}°
                    </div>
                </div>

                {/* Preview Container */}
                <div 
                    className="relative w-full h-32 mb-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => onPreview(page.url, index + 1)}
                >
                    {isClient ? (
                        <iframe
                            src={`${page.url}#toolbar=0&navpanes=0&scrollbar=0`}
                            title={`Page ${index + 1} Preview`}
                            className="w-full h-full scale-75 pointer-events-none"
                            style={{ 
                                transform: `rotate(${page.degrees}deg)`,
                                transition: 'transform 0.3s ease-out'
                            }}
                            frameBorder="0"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <FileText className="w-8 h-8 text-gray-400" />
                            <span className="text-xs text-gray-500 mt-1">Page {index + 1}</span>
                        </div>
                    )}
                    
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
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onRotate(index)}
                        className="p-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-md hover:shadow-lg transition-all"
                        title={`Rotate Page ${index + 1}`}
                    >
                        <RefreshCw className="w-4 h-4" />
                    </motion.button>
                    
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                        {page.degrees === 0 ? 'Normal' : 
                         page.degrees === 90 ? '90° CW' :
                         page.degrees === 180 ? '180°' : '90° CCW'}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

// --- Helper Functions ---
const rotatePageBlob = async (originalBytes: Uint8Array, rotation: number): Promise<Blob> => {
    const singlePagePdf = await PDFDocument.load(originalBytes);
    const page = singlePagePdf.getPage(0);
    page.setRotation(degrees(rotation));
    const rotatedBytes = await singlePagePdf.save();
    
    return new Blob([rotatedBytes as BlobPart], { type: 'application/pdf' });
};

const createPagePreviews = async (file: File) => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const count = pdf.getPageCount();

        const previews: PageRotation[] = [];
        for (let i = 1; i <= count; i++) {
            const singlePagePdf = await PDFDocument.create();
            const [copiedPage] = await singlePagePdf.copyPages(pdf, [i - 1]);
            singlePagePdf.addPage(copiedPage);
            const initialSinglePageBytes = await singlePagePdf.save();
            const blob = new Blob([initialSinglePageBytes as BlobPart], { type: "application/pdf" });
            previews.push({ 
                url: URL.createObjectURL(blob), 
                degrees: 0,
                originalBytes: initialSinglePageBytes
            });
        }
        return previews;
    } catch (error) {
        console.error("Failed to create page previews:", error);
        return [];
    }
};

// --- Main Component ---
export default function RotatePdf() {
    const [files, setFiles] = useState<File[]>([]);
    const [globalRotation, setGlobalRotation] = useState(90);
    const [converting, setConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
    const [pageRotations, setPageRotations] = useState<PageRotation[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [expandedView, setExpandedView] = useState(false);
    const [showUploadInfo, setShowUploadInfo] = useState(true);
    const [previewModal, setPreviewModal] = useState<{ url: string | null, page: number | null }>({ url: null, page: null });
    const [isClient, setIsClient] = useState(false);

    const previewRef = useRef<HTMLDivElement>(null);

    // Client-side detection
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Cleanup URLs
    useEffect(() => {
        return () => {
            pageRotations.forEach(p => URL.revokeObjectURL(p.url));
        };
    }, [pageRotations]);

    const handlePageRotate = async (index: number) => {
        setPdfBlob(null);
        const pageToUpdate = pageRotations[index];
        if (pageToUpdate) {
            const currentDegrees = pageToUpdate.degrees;
            const nextDegrees = (currentDegrees + 90) % 360;
            const rotatedBlob = await rotatePageBlob(pageToUpdate.originalBytes, nextDegrees);
            const newUrl = URL.createObjectURL(rotatedBlob);

            setPageRotations(prevRotations => {
                const finalRotations = [...prevRotations];
                URL.revokeObjectURL(finalRotations[index].url);
                finalRotations[index] = {
                    ...finalRotations[index],
                    degrees: nextDegrees,
                    url: newUrl
                };
                return finalRotations;
            });
        }
    };

    const handleFileSelect = async (selectedFiles: File[]) => {
        setFiles(selectedFiles);
        setPdfBlob(null);
        pageRotations.forEach(p => URL.revokeObjectURL(p.url));
        setPageRotations([]);
        setTotalPages(0);
        setShowUploadInfo(false);

        if (selectedFiles.length > 0) {
            const file = selectedFiles[0];
            const previews = await createPagePreviews(file);
            if (previews.length > 0) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                setTotalPages(pdf.getPageCount());
            }
            setPageRotations(previews);
        }
    };

    const handleConvert = async (rotationType: 'global' | 'individual') => {
        if (files.length === 0) return;

        setPdfBlob(null);
        setConverting(true);
        setProgress(0);

        try {
            let rotationData;
            if (rotationType === 'global') {
                rotationData = globalRotation;
            } else {
                rotationData = pageRotations.map(p => p.degrees);
            }

            setProgress(30);
            await new Promise(resolve => setTimeout(resolve, 300));
            
            setProgress(60);
            const blob = await rotatePdf(files[0], rotationData);
            
            setProgress(90);
            await new Promise(resolve => setTimeout(resolve, 300));
            
            setProgress(100);
            setPdfBlob(blob);

            setTimeout(() => {
                previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } catch (error) {
            console.error('Rotation error:', error);
            alert('Failed to rotate PDF. Please try again.');
        } finally {
            setConverting(false);
        }
    };

    const handleDownload = () => {
        if (pdfBlob) {
            downloadFile(pdfBlob, 'rotated.pdf');
        }
    };

    const handlePreviewClick = (url: string, page: number) => {
        setPreviewModal({ url, page });
    };

    const handleResetRotations = () => {
        const resetRotations = pageRotations.map(p => ({
            ...p,
            degrees: 0
        }));
        setPageRotations(resetRotations);
        setPdfBlob(null);
    };

    const fileSize = files[0] ? (files[0].size / 1024 / 1024).toFixed(2) : 0;

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
                            className="relative w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600">
                                <div className="flex items-center gap-3">
                                    <Eye className="w-5 h-5 text-white" />
                                    <h3 className="text-white font-bold">
                                        Page {previewModal.page} Preview
                                    </h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => {
                                            if (previewModal.url) {
                                                window.open(previewModal.url, '_blank');
                                            }
                                        }}
                                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                                        title="Open in new tab"
                                    >
                                        <Download className="w-4 h-4 text-white" />
                                    </button>
                                    <button
                                        onClick={() => setPreviewModal({ url: null, page: null })}
                                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </div>

                            {/* PDF Preview */}
                            <div className="h-[calc(90vh-80px)] p-4">
                                {previewModal.url && isClient ? (
                                    <div className="w-full h-full bg-white rounded-lg overflow-hidden">
                                        <iframe
                                            src={`${previewModal.url}#toolbar=0&navpanes=0`}
                                            title={`Page ${previewModal.page} Preview`}
                                            className="w-full h-full"
                                            frameBorder="0"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                            <span className="text-gray-600">Loading PDF...</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20 py-8 md:py-12">
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
                                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-2xl"
                                >
                                    <RefreshCw className="w-10 h-10 text-white" />
                                </motion.div>
                                
                                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    PDF Rotator
                                </h1>
                                
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                                    Rotate PDF pages individually or apply global rotation
                                    <span className="block text-blue-600 dark:text-blue-400 font-medium mt-1">
                                        Preview changes in real-time before downloading
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
                                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-6 rounded-2xl border-2 border-blue-200 dark:border-blue-800/50">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                                                <RefreshCw className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Individual Control</h3>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Rotate each page independently with one click
                                        </p>
                                    </div>
                                    
                                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-2xl border-2 border-purple-200 dark:border-purple-800/50">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                                                <RotateCw className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Global Rotation</h3>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Apply same rotation to all pages at once
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
                                    <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl">
                                        <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            Upload PDF File
                                        </h2>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Select a PDF file to rotate pages
                                        </p>
                                    </div>
                                </div>

                                <FileUploader
                                    accept="application/pdf"
                                    multiple={false}
                                    onFilesSelected={handleFileSelect}
                                />

                                {files.length > 0 && (
                                    <div className="mt-4 text-center">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full">
                                            <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                            <span className="font-medium text-blue-700 dark:text-blue-300">
                                                {files[0].name} • {fileSize} MB • {totalPages} pages
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Content Area */}
                            {files.length > 0 && (
                                <div className="space-y-8">
                                    {/* Page Previews Section */}
                                    <div className="space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                                <Eye className="w-5 h-5 text-purple-500" />
                                                Page Previews ({totalPages})
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    onClick={() => setExpandedView(!expandedView)}
                                                    className="px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-xl transition-colors flex items-center gap-2"
                                                >
                                                    {expandedView ? <Minus className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                                                    {expandedView ? 'Collapse' : 'Expand'}
                                                </button>
                                                <button
                                                    onClick={handleResetRotations}
                                                    className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-xl transition-colors flex items-center gap-2"
                                                >
                                                    <RefreshCw className="w-4 h-4" />
                                                    Reset All
                                                </button>
                                            </div>
                                        </div>

                                        {/* Mobile Preview Warning */}
                     <div className="md:hidden p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
    <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300 text-center">
        Tap on any page to view the image clearly.
    </p>
</div>



                                        <div className={`grid gap-4 p-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20 rounded-2xl border-2 border-gray-200 dark:border-gray-700 max-h-[600px] overflow-y-auto ${
                                            expandedView ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'
                                        }`} ref={previewRef}>
                                            {pageRotations.map((page, index) => (
                                                <PagePreview
                                                    key={index}
                                                    page={page}
                                                    index={index}
                                                    onRotate={handlePageRotate}
                                                    onPreview={handlePreviewClick}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Controls Section */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Global Rotation Controls */}
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3">
                                                Global Rotation
                                            </h3>
                                            
                                            <div className="grid grid-cols-3 gap-4">
                                                {[
                                                    { degree: 90, icon: RotateCw, label: "90° CW", color: "from-blue-500 to-blue-600" },
                                                    { degree: 180, icon: RotateCw, label: "180° Flip", color: "from-orange-500 to-orange-600", iconStyle: { transform: 'rotate(90deg)' } },
                                                    { degree: 270, icon: RotateCcw, label: "90° CCW", color: "from-purple-500 to-purple-600" }
                                                ].map(({ degree, icon: Icon, label, color, iconStyle }) => (
                                                    <motion.button
                                                        key={degree}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => setGlobalRotation(degree)}
                                                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center ${
                                                            globalRotation === degree
                                                                ? `border-blue-600 bg-gradient-to-r ${color} text-white shadow-lg`
                                                                : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-500'
                                                        }`}
                                                    >
                                                        <Icon className={`w-6 h-6 mb-2 ${globalRotation === degree ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`} style={iconStyle} />
                                                        <p className={`text-sm font-medium ${globalRotation === degree ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                                                            {label}
                                                        </p>
                                                    </motion.button>
                                                ))}
                                            </div>

                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleConvert('global')}
                                                disabled={converting}
                                                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-3"
                                            >
                                                <RotateCw className="w-6 h-6" />
                                                Apply Global {globalRotation}° Rotation
                                                <Zap className="w-5 h-5" />
                                            </motion.button>
                                        </div>

                                        {/* Individual Rotation Controls */}
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3">
                                                Individual Rotation
                                            </h3>
                                            
                                            <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800/30">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                                                        <RefreshCw className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 dark:text-white">
                                                            Custom Page Rotation
                                                        </h4>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            Click on page thumbnails to rotate individually
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-4">
                                                    <motion.button
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => handleConvert('individual')}
                                                        disabled={converting}
                                                        className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-3"
                                                    >
                                                        <RefreshCw className="w-6 h-6" />
                                                        Apply Custom Rotations
                                                    </motion.button>
                                                    
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                                                        Click on page previews above to rotate individual pages
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Processing and Results */}
                                    <AnimatePresence mode="wait">
                                        {converting && (
                                            <motion.div
                                                key="converting"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                className="space-y-4"
                                            >
                                                <ProgressBar progress={progress} label="Applying rotations..." />
                                                <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400">
                                                    <div className="animate-spin"><RefreshCw className="w-4 h-4" /></div>
                                                    <span className="text-sm font-medium">
                                                        Processing your PDF document...
                                                    </span>
                                                </div>
                                            </motion.div>
                                        )}

                                        {pdfBlob && (
                                            <motion.div
                                                key="results"
                                                ref={previewRef}
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
                                                                PDF Successfully Rotated! 🎉
                                                            </h3>
                                                            <p className="text-green-700 dark:text-green-300 font-medium">
                                                                All rotations have been applied
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

                                                {/* Download Button */}
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={handleDownload}
                                                    className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-extrabold rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-3"
                                                >
                                                    <Download className="w-6 h-6" />
                                                    Download Rotated PDF
                                                </motion.button>

                                                {/* Convert Another */}
                                                <div className="text-center">
                                                    <button
                                                        onClick={() => {
                                                            setFiles([]);
                                                            setPdfBlob(null);
                                                            setPageRotations([]);
                                                            setShowUploadInfo(true);
                                                        }}
                                                        className="inline-flex items-center gap-2 px-6 py-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-colors"
                                                    >
                                                        <RefreshCw className="w-4 h-4" />
                                                        Rotate Another PDF
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
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
                                <div>
                                    <div className="text-xl md:text-2xl lg:text-3xl font-black text-blue-600 dark:text-blue-400 mb-2">
                                        {files.length > 0 ? totalPages : '—'}
                                    </div>
                                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                                        Total Pages
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xl md:text-2xl lg:text-3xl font-black text-purple-600 dark:text-purple-400 mb-2">
                                        {pageRotations.filter(p => p.degrees !== 0).length}
                                    </div>
                                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                                        Pages Rotated
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xl md:text-2xl lg:text-3xl font-black text-orange-600 dark:text-orange-400 mb-2">
                                        {globalRotation}°
                                    </div>
                                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                                        Global Rotation
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xl md:text-2xl lg:text-3xl font-black text-green-600 dark:text-green-400 mb-2">
                                        {pdfBlob ? '✓' : '—'}
                                    </div>
                                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
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