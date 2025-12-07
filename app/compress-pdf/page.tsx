"use client"; 
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowLeft } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import ProgressBar from '../components/ProgressBar';
import { compressPdf } from '../../utils/pdfUtils';
import { downloadFile } from '../../utils/imageUtils';

export default function CompressPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [compressionStats, setCompressionStats] = useState<{ original: number; compressed: number } | null>(null);

  const handleConvert = async () => {
    if (files.length === 0) return;

    setConverting(true);
    setProgress(0);

    try {
      setProgress(30);
      const blob = await compressPdf(files[0]);
      setProgress(100);
      setPdfBlob(blob);
      setCompressionStats({
        original: files[0].size,
        compressed: blob.size,
      });
    } catch (error) {
      console.error('Compression error:', error);
      alert('Failed to compress PDF');
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (pdfBlob) {
      downloadFile(pdfBlob, 'compressed.pdf');
    }
  };

  const formatFileSize = (bytes: number) => {
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
            Compress PDF
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Reduce PDF file size while maintaining quality
          </p>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 mb-6">
            <FileUploader
              accept="application/pdf"
              multiple={false}
              onFilesSelected={setFiles}
            />

            {files.length > 0 && (
              <div className="mt-6 space-y-4">
                {converting && (
                  <ProgressBar progress={progress} label="Compressing PDF..." />
                )}

                {!pdfBlob && !converting && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConvert}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Compress PDF
                  </motion.button>
                )}

                {pdfBlob && compressionStats && (
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
                      Download Compressed PDF
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
