"use client";

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
// CheckCircle आइकन को जोड़ा गया है
import { Download, ArrowLeft, XCircle, CheckCircle } from 'lucide-react'; 
import FileUploader from '../components/FileUploader';
import ProgressBar from '../components/ProgressBar';
// Assuming these utilities are correctly implemented
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
const ImagePreview = ({ file, onRemove, status, isDownloadable = false, filename = 'image.jpg' }: {
    file: Blob | File;
    onRemove?: () => void;
    status: string;
    isDownloadable?: boolean;
    filename: string;
}) => {
    const url = useMemo(() => createObjectURL(file), [file]);

    // Clean up the object URL when the component unmounts
    useMemo(() => {
        return () => revokeObjectURL(url);
    }, [url]);

    const statusColor = status && status.includes('Converted') ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400';

    const handleIndividualDownload = () => {
        downloadFile(file as Blob, filename);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative p-4 border rounded-xl shadow-lg dark:border-gray-700 bg-white dark:bg-gray-800 transition-all hover:shadow-xl group"
        >
            {/* Image Thumbnail */}
            <div className="w-full h-32 mb-3 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
                <img src={url} alt={filename} className="w-full h-full object-contain" />
            </div>
            
            <p className="text-sm font-semibold truncate text-gray-900 dark:text-white mb-1" title={filename}>
                {filename}
            </p>
            <p className={`text-xs ${statusColor} font-semibold`}>{status}</p>
            
            {/* --- Remove Button (For Input Files) --- */}
            {onRemove && (
                <button 
                    onClick={onRemove}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 transition-colors z-10"
                    aria-label={`Remove ${filename}`}
                >
                    <XCircle className="w-5 h-5 bg-white rounded-full dark:bg-gray-800 border dark:border-gray-700" />
                </button>
            )}

            {/* --- Individual Download Button (For Output Files) --- */}
            {isDownloadable && (
                <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleIndividualDownload}
                    className="absolute bottom-2 right-2 p-1.5 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors z-10 shadow-lg opacity-0 group-hover:opacity-100"
                    title={`Download ${filename}`}
                >
                    <Download className="w-4 h-4" />
                </motion.button>
            )}
        </motion.div>
    );
};

// --- Main Component ---
export default function PngToJpg() {
    const [files, setFiles] = useState<File[]>([]);
    const [converting, setConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    // jpgBlobs is an array of objects: { blob, name, originalFile }
    const [jpgBlobs, setJpgBlobs] = useState<ConvertedFile[]>([]); 

    const handleConvert = async () => {
        if (files.length === 0) return;

        setConverting(true);
        setProgress(0);
        setJpgBlobs([]); // Clear previous results

        try {
            const blobs: ConvertedFile[] = [];
            for (let i = 0; i < files.length; i++) {
                const newFilename = files[i].name.replace(/\.png$/i, '.jpg');
                // convertPngToJpg is an async utility function (assumed)
                const blob = await convertPngToJpg(files[i]); 
                
                blobs.push({
                    blob: blob,
                    name: newFilename,
                    originalFile: files[i] 
                });
                setProgress(((i + 1) / files.length) * 100);
            }
            setJpgBlobs(blobs);
        } catch (error) {
            console.error('Conversion error:', error);
            alert('Failed to convert PNG to JPG');
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
        setJpgBlobs([]); // Reset conversion results if file list changes
    };

    const handleFilesSelected = (newFiles: File[]) => {
        setFiles(newFiles);
        setJpgBlobs([]); // Reset results on new upload
    };

    const hasFiles = files.length > 0;
    const hasResults = jpgBlobs.length > 0;
    const isReadyToConvert = hasFiles && !hasResults && !converting;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* --- Back Button & Header (Improved) --- */}
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium mb-6"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back to Tools
                    </a>

                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                        🖼️ PNG to JPG Converter
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        Convert multiple high-quality PNG images to the compressed JPG format in one go.
                    </p>

                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8 shadow-xl">
                        {/* --- File Upload Area --- */}
                        {!hasFiles && (
                            <FileUploader
                                accept="image/png"
                                multiple={true}
                                onFilesSelected={handleFilesSelected}
                            />
                        )}

                        {/* --- File Previews and Conversion Area --- */}
                        {hasFiles && (
                            <div className="space-y-8">
                                {/* --- Input PNG Previews --- */}
                                <h2 className="text-xl font-bold dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">
                                    Input Files ({files.length} PNGs)
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[400px] overflow-y-auto p-2 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                                    {files.map((file, index) => (
                                        <ImagePreview 
                                            key={index} 
                                            file={file} 
                                            filename={file.name}
                                            onRemove={() => handleRemoveFile(index)}
                                            status="Ready to Convert"
                                        />
                                    ))}
                                </div>

                                {/* --- Progress and Action Buttons --- */}
                                <div className="mt-6 space-y-4">
                                    {converting && (
                                        <ProgressBar progress={progress} label={`Converting ${files.length} files...`} />
                                    )}

                                    {isReadyToConvert && (
                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            onClick={handleConvert}
                                            disabled={converting}
                                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            Convert {files.length} PNGs to JPG
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* --- Results and Download Area (Separate Section) --- */}
                    {hasResults && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-xl border border-green-500 dark:border-green-700 p-6 md:p-8 shadow-2xl shadow-green-500/20"
                        >
                            <h2 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">
                                <CheckCircle className="w-6 h-6" /> Conversion Complete!
                            </h2>

                            <h3 className="text-lg font-semibold dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">Output Files ({jpgBlobs.length} JPGs)</h3>
                            
                            {/* --- Output JPG Previews --- */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6 max-h-[400px] overflow-y-auto p-2">
                                {jpgBlobs.map((item, index) => (
                                    <ImagePreview 
                                        key={index} 
                                        file={item.blob} 
                                        filename={item.name}
                                        status="Converted"
                                        isDownloadable={true} 
                                    />
                                ))}
                            </div>

                            {/* --- Download All Button --- */}
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={handleDownload}
                                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-lg transition-colors flex items-center justify-center gap-2 text-lg shadow-lg"
                            >
                                <Download className="w-6 h-6" />
                                Download All {jpgBlobs.length} JPG Files
                            </motion.button>
                        </motion.div>
                    )}

                </motion.div>
            </div>
        </div>
    );
}