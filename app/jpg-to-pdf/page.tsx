"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  ArrowLeft,
  X,
  File as FileIcon,
  Loader2,
} from "lucide-react";

// Assuming these are correct relative paths based on your provided code structure
import FileUploader from "../components/FileUploader";
import ProgressBar from "../components/ProgressBar";
import { imageToPdf } from "../../utils/pdfUtils";
import { downloadFile } from "../../utils/imageUtils";
import { PaperSize, Orientation, PAPER_SIZES } from "../../types";

interface FileWithPreview extends File {
  previewUrl?: string;
}

const MAX_PAGES_COUNT = 1000;

// Progress animation
const simulateProgress = (
  callback: (p: number) => void,
  initial: number,
  final: number,
  durationMs: number
) => {
  const startTime = Date.now();
  const interval = 100;

  const progressId = setInterval(() => {
    const elapsed = Date.now() - startTime;
    let newProgress =
      initial + ((final - initial) * elapsed) / durationMs;

    if (newProgress >= final) {
      newProgress = final;
      clearInterval(progressId);
    }
    callback(Math.floor(newProgress));
  }, interval);

  return () => clearInterval(progressId);
};

export default function JpgToPdf() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [paperSize, setPaperSize] = useState<PaperSize>("A4");
  const [orientation, setOrientation] = useState<Orientation>("Portrait");
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  

  /* --------------------- File Preview Loader --------------------- */
  useEffect(() => {
    files.forEach((file) => {
      if (file.type.startsWith("image/") && !file.previewUrl) {
        file.previewUrl = URL.createObjectURL(file);
      }
    });

    return () => {
      files.forEach(
        (file) => file.previewUrl && URL.revokeObjectURL(file.previewUrl)
      );
    };
  }, [files]);

  

  /* -------------------- Remove Selected File --------------------- */
  const handleRemoveFile = useCallback((fileToRemove: FileWithPreview) => {
    setFiles((prev) => prev.filter((f) => f !== fileToRemove));
    if (fileToRemove.previewUrl)
      URL.revokeObjectURL(fileToRemove.previewUrl);

    setPdfBlob(null);
    setProgress(0);
  }, []);

  /* ------------------------ Add Files ---------------------------- */
  const handleFilesUpdate = useCallback(
    (newFiles: FileWithPreview[]) => {
      let filesToSet = newFiles;

      if (newFiles.length > MAX_PAGES_COUNT) {
        alert(
          `Maximum ${MAX_PAGES_COUNT} files allowed. Only first ${MAX_PAGES_COUNT} are used.`
        );
        filesToSet = newFiles.slice(0, MAX_PAGES_COUNT);
      }

      setFiles(filesToSet);
      setPdfBlob(null);
      setProgress(0);
    },
    []
  );

  /* ---------------------- Convert Images ------------------------- */
  const handleConvert = async () => {
    if (files.length === 0) return;

    setConverting(true);
    setPdfBlob(null);

    const filesToConvert = files.map((f) => f as File);
    let cleanup: (() => void) | null = null;

    try {
      setProgress(10);
      cleanup = simulateProgress(setProgress, 10, 90, 5000);

      const blob = await imageToPdf(
        filesToConvert,
        paperSize,
        orientation
      );

      if (cleanup) cleanup();
      setProgress(100);

      setTimeout(() => {
        setPdfBlob(blob);
        setConverting(false);
      }, 500);
    } catch (err) {
      if (cleanup) cleanup();
      console.error("Conversion error:", err);
      alert("Failed to convert images to PDF.");
      setProgress(0);
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (pdfBlob) downloadFile(pdfBlob, "converted.pdf");
  };

  /* ---------------------------- UI ------------------------------ */
  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Back Button */}
            <a
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              JPG to PDF Converter 🖼️
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Convert JPG images into high-quality PDF in one click.
            </p>

            {/* Upload Box */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 mb-6">
              <FileUploader
                accept="image/jpeg,image/jpg"
                multiple={true}
                onFilesSelected={handleFilesUpdate}
                maxSize={100}
              />

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner">
                    <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3">
                      Selected Files ({files.length})
                    </h3>

                    <div className="max-h-48 overflow-y-auto space-y-2">
                      <AnimatePresence initial={false}>
                        {files.map((file, index) => (
                          <motion.div
                            key={file.name + file.size + index}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm border border-gray-200 dark:border-gray-600"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {file.previewUrl ? (
                                <img
                                  src={file.previewUrl}
                                  className="w-10 h-10 object-cover rounded-md"
                                />
                              ) : (
                                <FileIcon className="w-5 h-5 text-blue-500" />
                              )}

                              <div className="min-w-0">
                                <p
                                  className="text-sm font-medium text-gray-900 dark:text-white truncate"
                                >
                                  {file.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {(file.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={() => handleRemoveFile(file)}
                              className="p-1 text-red-500 hover:text-red-700 dark:hover:text-red-400"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Paper Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Paper Size
                      </label>
                      <select
                        value={paperSize}
                        onChange={(e) =>
                          setPaperSize(e.target.value as PaperSize)
                        }
                        className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800"
                      >
                        {Object.keys(PAPER_SIZES).map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Orientation
                      </label>
                      <select
                        value={orientation}
                        onChange={(e) =>
                          setOrientation(e.target.value as Orientation)
                        }
                        className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800"
                      >
                        <option value="Portrait">Portrait</option>
                        <option value="Landscape">Landscape</option>
                      </select>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <AnimatePresence mode="wait">
                    {converting && (
                      <motion.div
                        key="converting"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4"
                      >
                        <ProgressBar
                          progress={progress}
                          label={
                            progress < 90
                              ? "Processing images..."
                              : "Finalizing PDF..."
                          }
                        />
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center justify-center gap-1">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          This may take a moment...
                        </p>
                      </motion.div>
                    )}

                    {/* Download Button */}
                    {pdfBlob && !converting && (
                      <motion.button
                        key="download"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={handleDownload}
                        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg mt-4 flex items-center justify-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        Download PDF ({(pdfBlob.size / 1024 / 1024).toFixed(2)}{" "}
                        MB)
                      </motion.button>
                    )}

                    {/* Convert Button */}
                    {!pdfBlob && !converting && (
                      <motion.button
                        key="convert"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={handleConvert}
                        disabled={files.length === 0}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg mt-4 disabled:opacity-50"
                      >
                        Convert {files.length} Image
                        {files.length !== 1 ? "s" : ""} to PDF
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}