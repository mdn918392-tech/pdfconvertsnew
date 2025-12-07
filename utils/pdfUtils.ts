'use client';

import { PDFDocument, rgb, degrees } from 'pdf-lib';
// The error is likely caused by an invalid or missing key in PAPER_SIZES
import { PAPER_SIZES, PaperSize, Orientation } from '../types';

/* ============================================================
    Helper: Convert to PDF Blob
============================================================ */
function toPdfBlob(bytes: Uint8Array | ArrayBuffer | any): Blob {
    // Ensure we are working with an ArrayBuffer derived from the bytes
    const arrayBuffer = bytes instanceof ArrayBuffer ? bytes : new Uint8Array(bytes).buffer;
    return new Blob([arrayBuffer], { type: "application/pdf" });
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

    for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        
        let image;
        if (file.type === 'image/png') {
            image = await pdfDoc.embedPng(arrayBuffer);
        } else if (file.type.match(/^image\/(jpeg|jpg|webp)$/)) {
            image = await pdfDoc.embedJpg(arrayBuffer);
        } else {
            // Handle other types gracefully or skip
            console.warn(`Skipping unsupported image type: ${file.type}`);
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