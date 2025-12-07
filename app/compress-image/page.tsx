"use client"; 
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowLeft } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import ProgressBar from '../components/ProgressBar';
import { compressImage, downloadFile } from '../../utils/imageUtils';

export default function CompressImage() {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(80);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressedBlobs, setCompressedBlobs] = useState<Blob[]>([]);
  const [compressionStats, setCompressionStats] = useState<{ original: number; compressed: number } | null>(null);

  const handleConvert = async () => {
    if (files.length === 0) return;

    setConverting(true);
    setProgress(0);

    try {
      const blobs: Blob[] = [];
      let totalOriginal = 0;
      let totalCompressed = 0;

      for (let i = 0; i < files.length; i++) {
        const blob = await compressImage(files[i], quality / 100);
        blobs.push(blob);
        totalOriginal += files[i].size;
        totalCompressed += blob.size;
        setProgress(((i + 1) / files.length) * 100);
      }

      setCompressedBlobs(blobs);
      setCompressionStats({ original: totalOriginal, compressed: totalCompressed });
    } catch (error) {
      console.error('Compression error:', error);
      alert('Failed to compress images');
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    compressedBlobs.forEach((blob, index) => {
      const filename = files[index].name.replace(/\.[^.]+$/, '-compressed$&');
      downloadFile(blob, filename);
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const getCompressionPercent = () => {
    if (!compressionStats) return 0;
    return ((1 - compressionStats.compressed / compressionStats.original) * 100).toFixed(1);
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
            Compress Image
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Reduce JPG/PNG file size with adjustable quality
          </p>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 mb-6">
            <FileUploader
              accept="image/jpeg,image/jpg,image/png"
              multiple={true}
              onFilesSelected={setFiles}
            />

            {files.length > 0 && (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quality: {quality}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Lower size</span>
                    <span>Higher quality</span>
                  </div>
                </div>

                {converting && (
                  <ProgressBar progress={progress} label="Compressing..." />
                )}

                {compressedBlobs.length === 0 && !converting && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConvert}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Compress Images
                  </motion.button>
                )}

                {compressedBlobs.length > 0 && compressionStats && (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <p className="text-green-800 dark:text-green-200 mb-2">
                        Compression successful!
                      </p>
                      <div className="text-sm space-y-1">
                        <p className="text-green-700 dark:text-green-300">
                          Original size: {formatFileSize(compressionStats.original)}
                        </p>
                        <p className="text-green-700 dark:text-green-300">
                          Compressed size: {formatFileSize(compressionStats.compressed)}
                        </p>
                        <p className="text-green-700 dark:text-green-300 font-semibold">
                          Reduced by: {getCompressionPercent()}%
                        </p>
                      </div>
                    </div>

                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownload}
                      className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Download Compressed Images
                    </motion.button>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
