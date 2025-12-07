"use client";
import { useState, useEffect } from 'react'; // useEffect imported
import { motion } from 'framer-motion';
import { Download, ArrowLeft, FileText, File } from 'lucide-react'; // FileText and File for visual context
import FileUploader from '../components/FileUploader';
import ProgressBar from '../components/ProgressBar';
import { mergePdfs } from "../../utils/pdfUtils";
import { downloadFile } from '../../utils/imageUtils';
import { splitPdf } from '../../utils/pdfUtils';
export default function SplitPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfBlobs, setPdfBlobs] = useState<Blob[]>([]);
  
  // State to store the Object URLs for previews
  const [pdfUrls, setPdfUrls] = useState<string[]>([]); 

  // Effect to generate Object URLs for the new blobs
  useEffect(() => {
    if (pdfBlobs.length > 0) {
      // Create a URL for each blob
      const urls = pdfBlobs.map(blob => URL.createObjectURL(blob));
      setPdfUrls(urls);

      // Cleanup function to revoke the URLs when the component unmounts or blobs change
      return () => {
        urls.forEach(url => URL.revokeObjectURL(url));
        setPdfUrls([]);
      };
    }
  }, [pdfBlobs]); // Rerun whenever pdfBlobs changes

  const handleConvert = async () => {
    if (files.length === 0) return;

    // Reset previous results before converting
    setPdfBlobs([]);
    setPdfUrls([]);

    setConverting(true);
    setProgress(0);

    try {
      setProgress(30);
      const blobs = await splitPdf(files[0]);
      setProgress(100);
      setPdfBlobs(blobs);
    } catch (error) {
      console.error('Split error:', error);
      alert('Failed to split PDF');
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    pdfBlobs.forEach((blob, index) => {
      downloadFile(blob, `page-${index + 1}.pdf`);
    });
  };
  
  // Function to display the uploaded file name
  const renderUploadedFile = () => {
    if (files.length === 0) return null;
    const file = files[0];
    return (
      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-3">
        <FileText className="w-5 h-5 text-blue-500" />
        <span className="truncate text-sm font-medium text-gray-900 dark:text-white">
          {file.name}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Back to Home link */}
          <a
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>

          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Split PDF
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Split PDF into individual pages
          </p>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 mb-6">
            <FileUploader
              accept="application/pdf"
              multiple={false}
              onFilesSelected={setFiles}
            />

            {files.length > 0 && (
              <div className="mt-6 space-y-4">
                
                {renderUploadedFile()} {/* Display uploaded file name */}

                {converting && (
                  <ProgressBar progress={progress} label="Splitting PDF..." />
                )}

                {pdfBlobs.length === 0 && !converting && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConvert}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Split PDF
                  </motion.button>
                )}

                {pdfBlobs.length > 0 && (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center">
                      <p className="text-green-800 dark:text-green-200 font-semibold">
                        Split into {pdfBlobs.length} {pdfBlobs.length === 1 ? 'page' : 'pages'}
                      </p>
                    </div>

                        {/* Split Pages Preview Grid 👇 */}
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 pt-2">
                            Page Previews
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto p-2">
                            {pdfUrls.map((url, index) => (
                                <div key={index} className="relative aspect-[3/4] border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-lg">
                                    <p className="absolute top-1 left-1 bg-black/50 text-white text-xs px-2 py-0.5 rounded z-10">
                                        Page {index + 1}
                                    </p>
                                    <iframe
                                        src={url}
                                        title={`Page ${index + 1} Preview`}
                                        className="w-full h-full"
                                        frameBorder="0"
                                        scrolling="no" // Disable iframe scrolling to use parent div's scroll
                                    />
                                </div>
                            ))}
                        </div>
                        {/* Split Pages Preview Grid 👆 */}

                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownload}
                      className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Download All Pages
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