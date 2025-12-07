"use client";
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
// CheckCircle आइकन को जोड़ा गया है ताकि रूपांतरण पूरा होने पर उपयोग किया जा सके
import { Download, ArrowLeft, RotateCw, RotateCcw, CheckCircle } from 'lucide-react';
// FileUploader, ProgressBar, rotatePdf, downloadFile, और PDFDocument imports को आपकी आवश्यकतानुसार बनाए रखा गया है
import FileUploader from '../components/FileUploader';
import ProgressBar from '../components/ProgressBar';
import { rotatePdf } from '../../utils/pdfUtils'; 
import { downloadFile } from '../../utils/imageUtils'; 
import { PDFDocument, degrees } from 'pdf-lib';

// Helper function to rotate a single page's blob/bytes
const rotatePageBlob = async (originalBytes, rotation) => {
    const singlePagePdf = await PDFDocument.load(originalBytes);
    const page = singlePagePdf.getPage(0);
    
    // Apply the absolute rotation (0, 90, 180, 270)
    page.setRotation(degrees(rotation));

    const rotatedBytes = await singlePagePdf.save();
    
    return new Blob([rotatedBytes.buffer], { type: 'application/pdf' });
};


// Helper function to create temporary PDF Blobs for page previews
const createPagePreviews = async (file) => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const count = pdf.getPageCount();

        const previews = [];
        for (let i = 1; i <= count; i++) {
            const singlePagePdf = await PDFDocument.create();
            const [copiedPage] = await singlePagePdf.copyPages(pdf, [i - 1]);
            singlePagePdf.addPage(copiedPage);
            
            const initialSinglePageBytes = await singlePagePdf.save();
            const blob = new Blob([initialSinglePageBytes], { type: 'application/pdf' });
            
            // For the Rotate tool, we need degrees and originalBytes for immediate rotation preview
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

export default function RotatePdf() {
    const [files, setFiles] = useState([]);
    const [globalRotation, setGlobalRotation] = useState(90);
    const [converting, setConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [pdfBlob, setPdfBlob] = useState(null);
    
    const [pageRotations, setPageRotations] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const previewRef = useRef(null); 

    useEffect(() => {
        // Cleanup for old Blob URLs when pageRotations changes
        return () => {
            pageRotations.forEach(p => URL.revokeObjectURL(p.url));
        };
    }, [pageRotations]);


    const handlePageClick = async (index) => {
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


    const handleFileSelect = async (selectedFiles) => {
        setFiles(selectedFiles);
        setPdfBlob(null);
        
        pageRotations.forEach(p => URL.revokeObjectURL(p.url));
        
        setPageRotations([]);
        setTotalPages(0);

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

    const handleConvert = async (rotationType) => {
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
            const blob = await rotatePdf(files[0], rotationData); 
            setProgress(100);
            setPdfBlob(blob);

            setTimeout(() => {
                previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
            
        } catch (error) {
            console.error('Rotation error:', error);
            alert('Failed to rotate PDF'); 
        } finally {
            setConverting(false);
        }
    };

    const handleDownload = () => {
        if (pdfBlob) {
            downloadFile(pdfBlob, 'rotated.pdf');
        }
    };

    // --- Component for Global Rotation Buttons ---
    const GlobalRotationButton = ({ degree, icon: Icon, label, iconStyle = {} }) => {
        const isSelected = globalRotation === degree;
        
        return (
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setGlobalRotation(degree)}
                className={`p-4 border-2 rounded-lg transition-all flex flex-col items-center group shadow-sm ${
                    isSelected
                        ? 'border-blue-600 bg-blue-100 dark:bg-blue-900/30'
                        : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500'
                }`}
            >
                <Icon className={`w-6 h-6 mx-auto mb-2 transition-colors ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 group-hover:text-blue-500'}`} style={iconStyle} />
                <p className={`text-sm font-medium ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>
                    {label}
                </p>
            </motion.button>
        );
    };

    // --- Main Component Render ---
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
            <div className="container mx-auto px-4 max-w-7xl"> {/* max-w-7xl for wider layout */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* --- Back Button & Header --- */}
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium mb-6"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back to Tools
                    </a>

                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                        🔄 Rotate PDF Pages
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        Select a file to rotate all pages globally, or click on individual thumbnails to adjust specific pages.
                    </p>

                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-6 shadow-xl">
                        
                        {/* 1. File Uploader / Conversion Status */}
                        {files.length === 0 ? (
                            <FileUploader
                                accept="application/pdf"
                                multiple={false}
                                onFilesSelected={handleFileSelect}
                            />
                        ) : (
                            <>
                                {/* Conversion Status (Top Center) */}
                                {converting && (
                                    <div className="mb-4">
                                        <ProgressBar progress={progress} label="Processing PDF Rotation..." />
                                    </div>
                                )}
                                
                                {/* Final Download Area (Top Center if successful) */}
                                {pdfBlob && (
                                    <motion.div 
                                        ref={previewRef} 
                                        className="mb-8"
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className="flex justify-center p-4 border border-green-500 rounded-xl bg-green-50 dark:bg-green-900/40">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleDownload}
                                                className="py-3 px-8 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-lg transition-colors flex items-center justify-center gap-2 text-lg shadow-lg shadow-green-500/50"
                                            >
                                                <Download className="w-6 h-6" />
                                                Download Rotated PDF
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            
                                {/* --- Main Working Area: Grid Layout (Image-like Structure) --- */}
                                <div className={`grid ${pdfBlob ? 'grid-cols-1' : 'md:grid-cols-3'} gap-8`}>
                                    
                                    {/* A) Left/Main Panel: Page Previews */}
                                    <div className={`${pdfBlob ? 'col-span-1' : 'md:col-span-2'}`}>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                            Page Previews ({totalPages} Pages)
                                        </h2>
                                        
                                        {/* Thumbnail Grid - Scrollable */}
                                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-h-[700px] overflow-y-auto p-2 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-dashed dark:border-gray-700">
                                            {pageRotations.map((page, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="relative aspect-[3/4] cursor-pointer rounded-lg shadow-md transition-all ring-offset-2 ring-indigo-500 hover:ring-2 overflow-hidden"
                                                    onClick={() => handlePageClick(index)}
                                                    title={`Click to rotate Page ${index + 1}. Current: ${page.degrees}°`}
                                                >
                                                    {/* Page Number and Current Rotation */}
                                                    <div className="absolute top-0 left-0 right-0 p-1 bg-black/70 text-white text-xs flex justify-between items-center z-10">
                                                        <span>P{index + 1}</span>
                                                        <span className='font-bold'>{page.degrees}°</span>
                                                    </div>
                                                    
                                                    {/* Iframe for PDF preview (Visually reflects rotation immediately) */}
                                                    <iframe
                                                        src={page.url} 
                                                        title={`Page ${index + 1} Preview`}
                                                        className="w-full h-full pointer-events-none"
                                                        style={{ transform: `rotate(${page.degrees}deg)`, transition: 'transform 0.3s ease-out' }}
                                                        frameBorder="0"
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* B) Right Panel: Controls (Image-like) */}
                                    {!pdfBlob && (
                                        <div className="md:col-span-1 space-y-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner">
                                            
                                            {/* Individual Apply Button */}
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2 mb-4">
                                                    Apply Individual Rotations
                                                </h3>
                                                <motion.button
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.99 }}
                                                    onClick={() => handleConvert('individual')}
                                                    disabled={converting}
                                                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                                >
                                                    Apply Custom Rotation
                                                </motion.button>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                                    *Thumbnails पर क्लिक करके पेजों को Rotate करें.
                                                </p>
                                            </div>
                                            
                                            {/* Global Rotation Controls */}
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2 mb-4">
                                                    Global Rotation
                                                </h3>
                                                <div className="grid grid-cols-3 gap-2">
                                                    <GlobalRotationButton degree={90} icon={RotateCw} label="90° Cw" />
                                                    <GlobalRotationButton degree={180} icon={RotateCw} label="180° Flip" iconStyle={{ transform: 'rotate(90deg)' }} />
                                                    <GlobalRotationButton degree={270} icon={RotateCcw} label="90° CCw" />
                                                </div>

                                                <motion.button
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.99 }}
                                                    onClick={() => handleConvert('global')}
                                                    disabled={converting}
                                                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
                                                >
                                                    Apply Global {globalRotation}°
                                                </motion.button>
                                            </div>

                                        </div>
                                    )}
                                </div>

                                {/* Full Width Final Preview Area (If pdfBlob exists) */}
                                {pdfBlob && (
                                    <div className="mt-8">
                                        <div className="border border-green-500 dark:border-green-700 rounded-xl overflow-hidden shadow-2xl shadow-green-500/20">
                                            <h3 className="text-lg font-bold p-4 flex items-center gap-2 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/40 border-b border-green-200 dark:border-green-700">
                                                <CheckCircle className="w-5 h-5" />
                                                Rotation Complete! Final Preview ({totalPages} Pages)
                                            </h3>
                                            <div className="p-4 bg-gray-100 dark:bg-gray-900">
                                                <iframe
                                                    src={URL.createObjectURL(pdfBlob)}
                                                    title="Rotated PDF"
                                                    className="w-full rounded-lg shadow-inner border border-gray-300 dark:border-gray-700"
                                                    style={{ height: '75vh', minHeight: '500px' }}
                                                    frameBorder="0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}