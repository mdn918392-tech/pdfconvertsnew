"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, ArrowLeft, CheckCircle } from "lucide-react";
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
const PdfPageRenderer = ({
    pageNumber,
}: {
    pdfArrayBuffer: ArrayBuffer | null;
    pageNumber: number;
}) => {
    return (
        <div className="w-20 h-28 sm:w-24 sm:h-36 flex-shrink-0 bg-white dark:bg-gray-700 rounded-md shadow-inner flex items-center justify-center border border-gray-300 dark:border-gray-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-50 dark:bg-gray-800/50 flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600 dark:text-blue-300 p-1 text-center opacity-80">
                    Page <br /> {pageNumber}
                </span>
            </div>
            <div className="w-16 h-24 sm:w-20 sm:h-32 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-600 absolute shadow-lg" />
        </div>
    );
};

export default function PdfToJpg() {
    const [files, setFiles] = useState<File[]>([]);
    const [converting, setConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [converted, setConverted] = useState(false);
    const [pageData, setPageData] = useState<PageData[]>([]);
    const [pdfArrayBuffer, setPdfArrayBuffer] = useState<ArrayBuffer | null>(
        null
    );

    // Convert PDF into page list
    const handleConvert = async () => {
        if (files.length === 0) return;

        setConverting(true);
        setProgress(0);

        try {
            const file = files[0];

            const arrayBuffer = await file.arrayBuffer();
            setPdfArrayBuffer(arrayBuffer);

            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const pages = pdfDoc.getPageCount();

            setProgress(50);

            const newPageData: PageData[] = Array.from(
                { length: pages },
                (_, i) => ({
                    pageNumber: i + 1,
                    fileName: `${file.name.replace(".pdf", "")}_page-${
                        i + 1
                    }.pdf`,
                })
            );

            setPageData(newPageData);
            setProgress(100);
            setConverted(true);
        } catch (error) {
            console.error("Conversion error:", error);
            alert("Failed to process PDF");
        } finally {
            setConverting(false);
        }
    };

    // Download a single page
    const handleDownloadPage = async (pageIndex: number, fileName: string) => {
        if (!pdfArrayBuffer) {
            alert("PDF not loaded.");
            return;
        }

        const statusElement = document.getElementById(`status-${pageIndex}`);
        if (statusElement) statusElement.innerText = "Downloading...";

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
        } catch (error) {
            console.error(`Error downloading page ${pageIndex + 1}:`, error);
            alert(`Failed to download page ${pageIndex + 1}`);
        } finally {
            if (statusElement) statusElement.innerText = "Download successful";

            setTimeout(() => {
                if (statusElement) statusElement.innerText = "Ready to download";
            }, 2000);
        }
    };

    // Download all pages
    const handleDownloadAll = async () => {
        if (!pdfArrayBuffer) {
            alert("PDF not loaded.");
            return;
        }

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
    };

    const handleFilesSelected = (newFiles: File[]) => {
        setFiles(newFiles);
        setConverted(false);
        setPageData([]);
        setPdfArrayBuffer(null);
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
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium mb-6"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back to Tools
                    </a>

                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                        ✂️ PDF Page Splitter
                    </h1>

                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        Extract individual pages from a PDF and download them as
                        separate files.
                    </p>

                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-6 shadow-xl">
                        <FileUploader
                            accept="application/pdf"
                            multiple={false}
                            onFilesSelected={handleFilesSelected}
                        />

                        {files.length > 0 && (
                            <div className="mt-8 space-y-6">
                                {converting && (
                                    <ProgressBar
                                        progress={progress}
                                        label="Processing PDF..."
                                    />
                                )}

                                {!converted && !converting && (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleConvert}
                                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                                    >
                                        Extract Pages
                                    </motion.button>
                                )}

                                {converted && (
                                    <div className="space-y-6">
                                        <div className="p-4 flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                                            <p className="text-green-800 dark:text-green-200 font-medium">
                                                Found {pageData.length} pages in{" "}
                                                {files[0].name}. Ready to
                                                download!
                                            </p>
                                        </div>

                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">
                                            Individual Page Downloads
                                        </h2>

                                        <ul className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                                            {pageData.map((page, index) => (
                                                <motion.li
                                                    key={page.pageNumber}
                                                    initial={{
                                                        opacity: 0,
                                                        x: -10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        delay: index * 0.05,
                                                    }}
                                                    className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md"
                                                >
                                                    <PdfPageRenderer
                                                        pdfArrayBuffer={
                                                            pdfArrayBuffer
                                                        }
                                                        pageNumber={
                                                            page.pageNumber
                                                        }
                                                    />

                                                    <div className="flex flex-col flex-grow mx-4">
                                                        <span className="font-semibold text-gray-900 dark:text-white">
                                                            Page{" "}
                                                            {page.pageNumber}
                                                        </span>
                                                        <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                            File:{" "}
                                                            {page.fileName}
                                                        </span>
                                                        <span
                                                            id={`status-${index}`}
                                                            className="text-xs text-blue-600 dark:text-blue-400 mt-1"
                                                        >
                                                            Ready to download
                                                        </span>
                                                    </div>

                                                    <motion.button
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95,
                                                        }}
                                                        onClick={() =>
                                                            handleDownloadPage(
                                                                index,
                                                                page.fileName
                                                            )
                                                        }
                                                        className="flex items-center gap-2 py-2 px-4 text-sm bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                        Download
                                                    </motion.button>
                                                </motion.li>
                                            ))}
                                        </ul>

                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            onClick={handleDownloadAll}
                                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-lg transition-colors flex items-center justify-center gap-2 text-lg shadow-lg"
                                        >
                                            <Download className="w-6 h-6" />
                                            Download ALL {pageData.length} Pages
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
