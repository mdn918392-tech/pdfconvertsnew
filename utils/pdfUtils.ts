'use client';

import { PDFDocument, rgb, degrees } from 'pdf-lib';

// Import types from your types file
import type { PaperSize, Orientation } from '../types';
import { PAPER_SIZES } from '../types';

/* ============================================================
    Helper: Convert to PDF Blob
============================================================ */
function toPdfBlob(bytes: Uint8Array | ArrayBuffer | any): Blob {
    // Ensure we are working with an ArrayBuffer derived from the bytes
    const arrayBuffer = bytes instanceof ArrayBuffer ? bytes : new Uint8Array(bytes).buffer;
    return new Blob([arrayBuffer], { type: "application/pdf" });
}

/* ============================================================
    Helper: Validate JPEG image
============================================================ */
function isValidJpeg(arrayBuffer: ArrayBuffer): boolean {
    try {
        if (arrayBuffer.byteLength < 2) return false;
        const view = new DataView(arrayBuffer);
        // Check for JPEG SOI (Start of Image) marker: 0xFFD8
        return view.getUint16(0) === 0xFFD8;
    } catch (error) {
        return false;
    }
}

/* ============================================================
    Helper: Validate PNG image
============================================================ */
function isValidPng(arrayBuffer: ArrayBuffer): boolean {
    try {
        if (arrayBuffer.byteLength < 8) return false;
        const view = new DataView(arrayBuffer);
        // Check for PNG signature: 0x89504E470D0A1A0A
        return view.getUint32(0) === 0x89504E47 && view.getUint32(4) === 0x0D0A1A0A;
    } catch (error) {
        return false;
    }
}

/* ============================================================
    Helper: Try to detect image format from bytes
============================================================ */
function detectImageFormat(arrayBuffer: ArrayBuffer): string | null {
    if (isValidPng(arrayBuffer)) return 'png';
    if (isValidJpeg(arrayBuffer)) return 'jpeg';
    
    // Try to check for WebP
    try {
        if (arrayBuffer.byteLength >= 12) {
            const view = new DataView(arrayBuffer);
            // Check for WebP signature: "RIFF" + "WEBP"
            if (view.getUint32(0) === 0x52494646 && // "RIFF"
                view.getUint32(8) === 0x57454250) { // "WEBP"
                return 'webp';
            }
        }
    } catch (error) {
        // Ignore detection errors
    }
    
    return null;
}

/* ============================================================
    Helper: Convert image with validation and fallbacks
============================================================ */
async function embedImageWithValidation(pdfDoc: PDFDocument, file: File, arrayBuffer: ArrayBuffer): Promise<any> {
    const fileName = file.name;
    const detectedFormat = detectImageFormat(arrayBuffer);
    
    console.log(`Processing ${fileName}: MIME type=${file.type}, detected format=${detectedFormat}`);
    
    // If MIME type doesn't match detected format, log a warning
    if (detectedFormat && !file.type.includes(detectedFormat)) {
        console.warn(`MIME type mismatch for ${fileName}: type=${file.type}, detected=${detectedFormat}`);
    }
    
    // Try embedding based on detected format first
    if (detectedFormat === 'png') {
        try {
            return await pdfDoc.embedPng(arrayBuffer);
        } catch (error) {
            console.warn(`Failed to embed as PNG, trying JPEG: ${fileName}`, error);
        }
    }
    
    if (detectedFormat === 'jpeg') {
        try {
            return await pdfDoc.embedJpg(arrayBuffer);
        } catch (error) {
            console.warn(`Failed to embed as JPEG, trying PNG: ${fileName}`, error);
        }
    }
    
    // Try both PNG and JPEG regardless of detection (for corrupted but recoverable files)
    try {
        return await pdfDoc.embedJpg(arrayBuffer);
    } catch (jpgError) {
        console.warn(`Failed to embed as JPEG, trying PNG: ${fileName}`, jpgError);
        
        try {
            return await pdfDoc.embedPng(arrayBuffer);
        } catch (pngError) {
            console.warn(`Failed to embed as PNG: ${fileName}`, pngError);
            
            // Last resort: try to create a placeholder image
            try {
                // Create a simple placeholder image for corrupted files
                const placeholderWidth = 100;
                const placeholderHeight = 100;
                const placeholderImage = pdfDoc.embedPage(
                    pdfDoc.addPage([placeholderWidth, placeholderHeight])
                );
                return placeholderImage;
            } catch (placeholderError) {
                throw new Error(`Could not process image ${fileName}: Invalid or corrupted image file`);
            }
        }
    }
}

/* ============================================================
    Helper: Create error page
============================================================ */
function createErrorPage(pdfDoc: PDFDocument, pageWidth: number, pageHeight: number, fileName: string, errorMsg: string): void {
    try {
        const page = pdfDoc.addPage([pageWidth, pageHeight]);
        
        // Add error message
        page.drawText(`Error loading image: ${fileName}`, {
            x: 50,
            y: pageHeight - 100,
            size: 12,
            color: rgb(1, 0, 0), // Red color
        });
        
        page.drawText(errorMsg, {
            x: 50,
            y: pageHeight - 130,
            size: 10,
            color: rgb(0, 0, 0),
        });
        
        page.drawText("This page could not be processed.", {
            x: 50,
            y: pageHeight - 160,
            size: 10,
            color: rgb(0, 0, 0),
        });
    } catch (error) {
        console.error('Failed to create error page:', error);
    }
}

/* ============================================================
    Helper: Create placeholder image page
============================================================ */
function createPlaceholderPage(pdfDoc: PDFDocument, pageWidth: number, pageHeight: number, fileName: string): void {
    try {
        const page = pdfDoc.addPage([pageWidth, pageHeight]);
        
        // Add border
        page.drawRectangle({
            x: 20,
            y: 20,
            width: pageWidth - 40,
            height: pageHeight - 40,
            borderWidth: 2,
            borderColor: rgb(0.8, 0.8, 0.8),
        });
        
        // Add placeholder text
        page.drawText(`Image: ${fileName}`, {
            x: pageWidth / 2 - 100,
            y: pageHeight / 2 + 20,
            size: 16,
            color: rgb(0.5, 0.5, 0.5),
        });
        
        page.drawText("(Image could not be loaded)", {
            x: pageWidth / 2 - 80,
            y: pageHeight / 2 - 20,
            size: 12,
            color: rgb(0.7, 0.7, 0.7),
        });
    } catch (error) {
        console.error('Failed to create placeholder page:', error);
        // If even placeholder fails, just add a blank page
        pdfDoc.addPage([pageWidth, pageHeight]);
    }
}

/* ============================================================
    IMAGE → PDF
============================================================ */
export async function imageToPdf(files: File[], paperSize: PaperSize, orientation: Orientation): Promise<Blob> {
    const pdfDoc = await PDFDocument.create();
    
    // FIX: Use a defensive lookup with a fallback size (e.g., 'A4')
    // This prevents destructuring 'width' and 'height' from an 'undefined' object
    const sizeConfig = PAPER_SIZES[paperSize] || PAPER_SIZES['A4'];
    let { width, height } = sizeConfig;

    if (orientation === 'Landscape') {
        // Swap dimensions for Landscape
        [width, height] = [height, width];
    }

    let successCount = 0;
    let errorCount = 0;
    let placeholderCount = 0;

    for (const file of files) {
        try {
            const arrayBuffer = await file.arrayBuffer();
            
            // Validate file is not empty
            if (arrayBuffer.byteLength === 0) {
                console.warn(`Empty file: ${file.name}, creating placeholder`);
                createPlaceholderPage(pdfDoc, width, height, file.name);
                placeholderCount++;
                continue;
            }
            
            let image;
            try {
                image = await embedImageWithValidation(pdfDoc, file, arrayBuffer);
            } catch (embedError: any) {
                console.warn(`Could not embed image ${file.name}, creating placeholder:`, embedError.message);
                createPlaceholderPage(pdfDoc, width, height, file.name);
                placeholderCount++;
                continue;
            }

            const page = pdfDoc.addPage([width, height]);
            const imgDims = image.scale(1);

            // Calculate scale factor to fit the image to the page size
            const scale = Math.min(width / imgDims.width, height / imgDims.height);
            const scaledWidth = imgDims.width * scale;
            const scaledHeight = imgDims.height * scale;

            // Center the image
            page.drawImage(image, {
                x: (width - scaledWidth) / 2,
                y: (height - scaledHeight) / 2,
                width: scaledWidth,
                height: scaledHeight,
            });
            
            successCount++;
            
        } catch (error: any) {
            console.error(`Unexpected error processing image ${file.name}:`, error.message);
            errorCount++;
            
            // Add a placeholder page instead of error page
            createPlaceholderPage(pdfDoc, width, height, file.name);
        }
    }

    // If no pages were created at all
    if (pdfDoc.getPageCount() === 0) {
        throw new Error('No images could be processed. Please check your image files.');
    }
    
    // Add summary page if there were any issues
    if (errorCount > 0 || placeholderCount > 0) {
        try {
            const summaryPage = pdfDoc.addPage([width, height]);
            summaryPage.drawText(`PDF Generation Summary`, {
                x: 50,
                y: height - 100,
                size: 16,
                color: rgb(0, 0, 0),
            });
            summaryPage.drawText(`Successfully processed: ${successCount} images`, {
                x: 50,
                y: height - 140,
                size: 12,
                color: rgb(0, 0.5, 0), // Green
            });
            if (placeholderCount > 0) {
                summaryPage.drawText(`Placeholder created for: ${placeholderCount} images`, {
                    x: 50,
                    y: height - 170,
                    size: 12,
                    color: rgb(0.8, 0.5, 0), // Orange
                });
            }
            if (errorCount > 0) {
                summaryPage.drawText(`Failed to process: ${errorCount} images`, {
                    x: 50,
                    y: height - (placeholderCount > 0 ? 200 : 170),
                    size: 12,
                    color: rgb(1, 0, 0), // Red
                });
            }
            summaryPage.drawText(`Total pages: ${pdfDoc.getPageCount()}`, {
                x: 50,
                y: height - (placeholderCount > 0 && errorCount > 0 ? 230 : 200),
                size: 14,
                color: rgb(0, 0, 0), // Black
            });
        } catch (error) {
            console.error('Failed to create summary page:', error);
        }
    }

    const bytes = await pdfDoc.save();
    return toPdfBlob(bytes);
}

// ------------------------------------------------------------

/* ============================================================
    MERGE PDFs
============================================================ */
export async function mergePdfs(files: File[]): Promise<Blob> {
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
        const pdf = await PDFDocument.load(await file.arrayBuffer());
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(p => mergedPdf.addPage(p));
    }

    const bytes = await mergedPdf.save();
    return toPdfBlob(bytes);
}

// ------------------------------------------------------------

/* ============================================================
    SPLIT PDF
============================================================ */
export async function splitPdf(file: File): Promise<Blob[]> {
    const pdf = await PDFDocument.load(await file.arrayBuffer());
    const result: Blob[] = [];

    for (let i = 0; i < pdf.getPageCount(); i++) {
        const newPdf = await PDFDocument.create();
        const [page] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(page);

        const bytes = await newPdf.save();
        result.push(toPdfBlob(bytes));
    }

    return result;
}

// ------------------------------------------------------------

/* ============================================================
    EXTRACT PAGES
============================================================ */
export async function extractPages(file: File, pageNumbers: number[]): Promise<Blob> {
    const pdf = await PDFDocument.load(await file.arrayBuffer());

    // Subtract 1 from page numbers to get 0-based index
    const indicesToCopy = pageNumbers.map(n => n - 1).filter(n => n >= 0 && n < pdf.getPageCount());
    
    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(pdf, indicesToCopy);
    pages.forEach(p => newPdf.addPage(p));

    const bytes = await newPdf.save();
    return toPdfBlob(bytes);
}

// ------------------------------------------------------------

/* ============================================================
    REMOVE PAGES
============================================================ */
export async function removePages(file: File, pageNumbers: number[]): Promise<Blob> {
    const pdf = await PDFDocument.load(await file.arrayBuffer());
    const count = pdf.getPageCount();

    // Create array of 0-based indices to KEEP
    const keepIndices = Array.from({ length: count }, (_, i) => i) // [0, 1, 2, ...]
        .filter(index => !pageNumbers.includes(index + 1)); // Filter out pages specified (1-based)

    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(pdf, keepIndices);
    pages.forEach(p => newPdf.addPage(p));

    const bytes = await newPdf.save();
    return toPdfBlob(bytes);
}

// ------------------------------------------------------------

/* ============================================================
    ROTATE PDF
============================================================ */
export async function rotatePdf(file: File, rotationData: number | number[]): Promise<Blob> {
    const pdf = await PDFDocument.load(await file.arrayBuffer());
    const pages = pdf.getPages();

    if (typeof rotationData === 'number') {
        // Apply same rotation to all pages
        pages.forEach(p => p.setRotation(degrees(rotationData)));
    } else if (Array.isArray(rotationData)) {
        // Apply specific rotation to each page
        pages.forEach((p, i) => {
            if (rotationData[i] !== undefined) {
                p.setRotation(degrees(rotationData[i]));
            }
        });
    }

    const bytes = await pdf.save();
    return toPdfBlob(bytes);
}

// ------------------------------------------------------------

/* ============================================================
    COMPRESS PDF (Structural Optimization)
============================================================ */
/**
 * Optimizes the PDF file structure for smaller size using pdf-lib's object stream feature.
 * Note: This does not perform lossy image compression/downsampling.
 */
export async function compressPdf(file: File): Promise<Blob> {
    const pdf = await PDFDocument.load(await file.arrayBuffer());
    
    // ✅ FIX/OPTIMIZATION: Use useObjectStreams for structural compression
    const bytes = await pdf.save({ 
        useObjectStreams: true, 
        // using useObjectStreams: true enables PDF stream objects which can significantly 
        // reduce file size by allowing internal compression and more efficient data storage.
    }); 

    return toPdfBlob(bytes);
}

// ------------------------------------------------------------

/* ============================================================
    REVERSE PDF ORDER
============================================================ */
export async function reversePdfOrder(file: File | Blob): Promise<Blob> {
    let pdfBytes: ArrayBuffer;
    
    // Handle both File and Blob inputs
    if (file instanceof File) {
        pdfBytes = await file.arrayBuffer();
    } else if (file instanceof Blob) {
        pdfBytes = await file.arrayBuffer();
    } else {
        throw new Error('Input must be a File or Blob');
    }
    
    const pdf = await PDFDocument.load(pdfBytes);
    const pageCount = pdf.getPageCount();
    
    if (pageCount === 0) {
        throw new Error('PDF has no pages to reverse');
    }
    
    // Create a new PDF document
    const newPdf = await PDFDocument.create();
    
    // Copy pages in reverse order
    for (let i = pageCount - 1; i >= 0; i--) {
        const [page] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(page);
    }
    
    const bytes = await newPdf.save();
    return toPdfBlob(bytes);
}
// ------------------------------------------------------------