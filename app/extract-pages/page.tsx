"use client"; 

import { useState, useEffect } from 'react'; // Import useEffect
import { motion } from 'framer-motion';
import { Download, ArrowLeft } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import ProgressBar from '../components/ProgressBar';
import { extractPages } from '../../utils/pdfUtils';
import { downloadFile } from '../../utils/imageUtils';
import { PDFDocument } from 'pdf-lib';

export default function ExtractPages() {
  const [files, setFiles] = useState<File[]>([]);
  const [pageNumbers, setPageNumbers] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  // New state for the temporary PDF URL
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleFileSelect = async (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setPdfBlob(null); // Reset extracted PDF on new file selection
    setPdfUrl(null); // Reset URL as well
    setPageNumbers(''); // Clear page numbers

    if (selectedFiles.length > 0) {
      const arrayBuffer = await selectedFiles[0].arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setTotalPages(pdf.getPageCount());
    } else {
      setTotalPages(0);
    }
  };

  const handleConvert = async () => {
    if (files.length === 0 || !pageNumbers.trim()) return;
    
    // Clear previous results (Already here, which is correct for button press)
    setPdfBlob(null);
    setPdfUrl(null);

    // Page number parsing logic (kept same as user code)
    const pages = pageNumbers
      .split(',')
      .map((p) => parseInt(p.trim()))
      .filter((p) => !isNaN(p) && p > 0 && p <= totalPages);

    if (pages.length === 0) {
      alert('Please enter valid page numbers');
      return;
    }

    setConverting(true);
    setProgress(0);

    try {
      setProgress(30);
      const blob = await extractPages(files[0], pages);
      setProgress(100);
      setPdfBlob(blob);
    } catch (error) {
      console.error('Extraction error:', error);
      alert('Failed to extract pages');
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (pdfBlob) {
      downloadFile(pdfBlob, 'extracted-pages.pdf');
    }
  };

  // 📄 Effect to create and clean up the Blob URL for PDF preview
  useEffect(() => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);

      // Cleanup function to revoke the object URL
      return () => {
        URL.revokeObjectURL(url);
        setPdfUrl(null);
      };
    }
  }, [pdfBlob]); // Re-run effect when pdfBlob changes

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
            Extract PDF Pages
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Extract specific pages from a PDF document
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
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    Total pages: **{totalPages}**
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Page numbers to extract (comma-separated, e.g., 1,3,5-7)
                  </label>
                  <input
                    type="text"
                    value={pageNumbers}
                    onChange={(e) => {
                          setPageNumbers(e.target.value);
                          // 🚨 जब भी पेज नंबर बदलें, प्रीव्यू छिपा दें
                          setPdfBlob(null);
                          setPdfUrl(null);
                      }}
                    placeholder="e.g., 1,3,5"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {converting && (
                  <ProgressBar progress={progress} label="Extracting pages..." />
                )}
                
                {/* PDF Preview Section 👇 */}
                {pdfUrl && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            Extracted PDF Preview
                        </h3>
                        <div 
                            className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg" 
                            style={{ height: '70vh', minHeight: '400px' }}
                        >
                            <iframe
                                src={pdfUrl}
                                title="Extracted PDF Preview"
                                className="w-full h-full"
                                frameBorder="0"
                            />
                        </div>
                    </div>
                )}
                {/* PDF Preview Section 👆 */}

                {!pdfBlob && !converting && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConvert}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Extract Pages
                  </motion.button>
                )}

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
                    Download Extracted PDF
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