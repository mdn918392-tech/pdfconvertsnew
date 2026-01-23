'use client';

import { PDFDocument, rgb, degrees } from 'pdf-lib';

// Import types from your types file
import type { PaperSize, Orientation } from '../types';
import { PAPER_SIZES } from '../types';

/* ============================================================
    Helper: Convert to PDF Blob
============================================================ */
function toPdfBlob(bytes: Uint8Array | ArrayBuffer | any): Blob {
    // Casting to any bypasses the SharedArrayBuffer type error in build environments
    return new Blob([bytes as any], { type: "application/pdf" });
}

/* ============================================================
    Helper: Validate JPEG image
============================================================ */
function isValidJpeg(arrayBuffer: ArrayBuffer): boolean {
    try {
        if (arrayBuffer.byteLength < 2) return false;
        const view = new DataView(arrayBuffer);
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
    Helper: Create a proper placeholder image
============================================================ */
async function createPlaceholderImage(pdfDoc: PDFDocument): Promise<any> {
    try {
        const placeholderDoc = await PDFDocument.create();
        const page = placeholderDoc.addPage([200, 150]);
        
        page.drawRectangle({
            x: 0,
            y: 0,
            width: 200,
            height: 150,
            color: rgb(0.95, 0.95, 0.95),
        });
        
        page.drawRectangle({
            x: 5,
            y: 5,
            width: 190,
            height: 140,
            borderWidth: 1,
            borderColor: rgb(0.7, 0.7, 0.7),
        });
        
        page.drawText('Placeholder', {
            x: 60,
            y: 70,
            size: 14,
            color: rgb(0.5, 0.5, 0.5),
        });
        
        page.drawText('Image unavailable', {
            x: 50,
            y: 50,
            size: 10,
            color: rgb(0.6, 0.6, 0.6),
        });
        
        const placeholderBytes = await placeholderDoc.save();
        const placeholderPdf = await PDFDocument.load(placeholderBytes);
        return await pdfDoc.embedPdf(placeholderPdf);
    } catch (error) {
        throw new Error('Failed to create placeholder image');
    }
}

/* ============================================================
    Helper: Convert image with validation and fallbacks
============================================================ */
async function embedImageWithValidation(
    pdfDoc: PDFDocument, 
    file: File, 
    arrayBuffer: ArrayBuffer,
    paperWidth: number,
    paperHeight: number
): Promise<any> {
    const fileName = file.name;
    const detectedFormat = detectImageFormat(arrayBuffer);
    
    console.log(`Processing ${fileName}: ${(arrayBuffer.byteLength / 1024 / 1024).toFixed(2)}MB`);
    
    if (detectedFormat === 'webp' || file.name.toLowerCase().endsWith('.webp') || file.type === 'image/webp') {
        try {
            const blob = new Blob([arrayBuffer], { type: 'image/webp' });
            const url = URL.createObjectURL(blob);
            
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = async () => {
                    try {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext('2d');
                        if (!ctx) {
                            reject(new Error('Could not get canvas context'));
                            return;
                        }
                        
                        ctx.drawImage(img, 0, 0);
                        canvas.toBlob(async (blob) => {
                            try {
                                if (!blob) {
                                    reject(new Error('Canvas conversion failed'));
                                    return;
                                }
                                
                                const jpegBuffer = await blob.arrayBuffer();
                                const jpegImage = await pdfDoc.embedJpg(jpegBuffer);
                                URL.revokeObjectURL(url);
                                resolve(jpegImage);
                            } catch (error) {
                                URL.revokeObjectURL(url);
                                reject(error);
                            }
                        }, 'image/jpeg', 0.7);
                    } catch (error) {
                        URL.revokeObjectURL(url);
                        reject(error);
                    }
                };
                
                img.onerror = () => {
                    URL.revokeObjectURL(url);
                    reject(new Error('Failed to load WebP image'));
                };
                
                img.src = url;
            });
        } catch (webpError) {
            console.warn(`WebP conversion failed for ${fileName}:`, webpError);
        }
    }
    
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
    
    try {
        return await pdfDoc.embedJpg(arrayBuffer);
    } catch (jpgError) {
        console.warn(`Failed to embed as JPEG, trying PNG: ${fileName}`, jpgError);
        
        try {
            return await pdfDoc.embedPng(arrayBuffer);
        } catch (pngError) {
            console.warn(`Failed to embed as PNG: ${fileName}`, pngError);
            return await createPlaceholderImage(pdfDoc);
        }
    }
}

/* ============================================================
    Helper: Create placeholder image page with margin support
============================================================ */
function createPlaceholderPage(
    pdfDoc: PDFDocument, 
    pageWidth: number, 
    pageHeight: number, 
    fileName: string,
    margin?: number
): void {
    try {
        const page = pdfDoc.addPage([pageWidth, pageHeight]);
        const m = margin || 36;
        
        // Draw placeholder within margins
        const x = m + 20;
        const y = m + 20;
        const width = pageWidth - (m * 2) - 40;
        const height = pageHeight - (m * 2) - 40;
        
        page.drawRectangle({
            x: x,
            y: y,
            width: width,
            height: height,
            borderWidth: 2,
            borderColor: rgb(0.8, 0.8, 0.8),
        });
        
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
        pdfDoc.addPage([pageWidth, pageHeight]);
    }
}

// utils/pdfUtils.ts

// यदि downloadAsZip function नहीं है, तो इसे add करें:

import JSZip from 'jszip';

export const downloadAsZip = async (files: { name: string; blob: Blob }[], zipName: string) => {
  const zip = new JSZip();
  
  // Add each file to the zip
  files.forEach((file, index) => {
    zip.file(file.name, file.blob);
  });
  
  // Generate the zip file
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  
  // Create download link
  const url = URL.createObjectURL(zipBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = zipName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  // Clean up
  URL.revokeObjectURL(url);
};

export const downloadFile = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// अन्य PDF related functions...
export const addPagesToPDF = async (mainPDF: File, pagesToAdd: any[]) => {
  // PDF processing logic यहाँ implement करें
  // आप pdf-lib library का use कर सकते हैं
  return new Blob([], { type: 'application/pdf' });
};

export const mergePDFs = async (pdfFiles: File[]) => {
  // Merge PDFs logic
  return new Blob([], { type: 'application/pdf' });
};

/* ============================================================
    IMAGE → PDF with REAL Compression and Margin Support
============================================================ */
export async function imageToPdf(
    files: File[], 
    paperSize: PaperSize, 
    orientation: Orientation,
    marginPoints?: number // Add margin parameter (in points, 1 inch = 72 points)
): Promise<Blob> {
    const pdfDoc = await PDFDocument.create();
    
    const sizeConfig = PAPER_SIZES[paperSize] || PAPER_SIZES['A4'];
    let { width: pageWidth, height: pageHeight } = sizeConfig;

    if (orientation === 'Landscape') {
        [pageWidth, pageHeight] = [pageHeight, pageWidth];
    }

    // Set default margin if not provided (36 points = 0.5 inch)
    const margin = marginPoints !== undefined ? marginPoints : 36;
    
    // Calculate usable area after margins
    const usableWidth = pageWidth - (margin * 2);
    const usableHeight = pageHeight - (margin * 2);

    let successCount = 0;
    let errorCount = 0;
    let placeholderCount = 0;
    let totalOriginalSize = 0;

    for (const file of files) {
        try {
            const arrayBuffer = await file.arrayBuffer();
            totalOriginalSize += arrayBuffer.byteLength;
            
            if (arrayBuffer.byteLength === 0) {
                console.warn(`Empty file: ${file.name}`);
                createPlaceholderPage(pdfDoc, pageWidth, pageHeight, file.name, margin);
                placeholderCount++;
                continue;
            }
            
            let image;
            try {
                image = await embedImageWithValidation(pdfDoc, file, arrayBuffer, pageWidth, pageHeight);
            } catch (embedError: any) {
                console.warn(`Could not embed image ${file.name}:`, embedError.message);
                createPlaceholderPage(pdfDoc, pageWidth, pageHeight, file.name, margin);
                placeholderCount++;
                continue;
            }

            if (!image || typeof image !== 'object' || !image.scale) {
                console.warn(`Invalid image object for ${file.name}`);
                createPlaceholderPage(pdfDoc, pageWidth, pageHeight, file.name, margin);
                placeholderCount++;
                continue;
            }

            const page = pdfDoc.addPage([pageWidth, pageHeight]);
            
            try {
                const imgDims = image.scale(1);
                
                if (typeof imgDims.width !== 'number' || typeof imgDims.height !== 'number' ||
                    imgDims.width <= 0 || imgDims.height <= 0) {
                    throw new Error('Invalid image dimensions');
                }
                
                // Use the usable area instead of full page for margin calculation
                const marginFactor = 0.05; // Small additional margin inside the usable area
                const maxWidth = usableWidth * (1 - 2 * marginFactor);
                const maxHeight = usableHeight * (1 - 2 * marginFactor);
                
                const scale = Math.min(maxWidth / imgDims.width, maxHeight / imgDims.height, 1);
                const scaledWidth = imgDims.width * scale;
                const scaledHeight = imgDims.height * scale;

                // Center the image within the usable area (margins applied)
                const x = margin + (usableWidth - scaledWidth) / 2;
                const y = margin + (usableHeight - scaledHeight) / 2;

                page.drawImage(image, {
                    x: x,
                    y: y,
                    width: scaledWidth,
                    height: scaledHeight,
                });
                
                // Add page number in the margin area if there's enough space
                if (margin >= 36) {
                    const pageNumber = successCount + 1;
                    page.drawText(
                        `Page ${pageNumber}`,
                        {
                            x: pageWidth / 2,
                            y: margin / 2,
                            size: 10,
                            color: rgb(0.5, 0.5, 0.5),
                        }
                    );
                }
                
                successCount++;
                console.log(`✓ Added ${file.name} (${(arrayBuffer.byteLength / 1024).toFixed(0)}KB) with ${margin}pt margins`);
                
            } catch (drawError: any) {
                console.warn(`Could not draw image ${file.name}:`, drawError.message);
                page.drawText(`Error: Could not display ${file.name}`, {
                    x: margin + 20,
                    y: pageHeight / 2,
                    size: 12,
                    color: rgb(1, 0, 0),
                });
                placeholderCount++;
            }
            
        } catch (error: any) {
            console.error(`Error processing ${file.name}:`, error.message);
            errorCount++;
            createPlaceholderPage(pdfDoc, pageWidth, pageHeight, file.name, margin);
        }
    }

    if (pdfDoc.getPageCount() === 0) {
        throw new Error('No images could be processed. Please check your image files.');
    }
    
    const bytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 100,
        updateFieldAppearances: false,
    });
    
    return toPdfBlob(bytes);
}

/* ============================================================
    COMPRESS PDF
============================================================ */
export async function compressPdf(file: File): Promise<Blob> {
    const pdfBytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(pdfBytes);
    
    const bytes = await pdf.save({ 
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 100,
        updateFieldAppearances: false,
    }); 

    return toPdfBlob(bytes);
}

/* ============================================================
    MERGE PDFs
============================================================ */
export async function mergePdfs(files: File[]): Promise<Blob> {
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
        const pdfBytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(pdfBytes);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(p => mergedPdf.addPage(p));
    }

    const bytes = await mergedPdf.save({
        useObjectStreams: true,
    });
    return toPdfBlob(bytes);
}

/* ============================================================
    SPLIT PDF
============================================================ */
export async function splitPdf(file: File): Promise<Blob[]> {
    const pdfBytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(pdfBytes);
    const pageCount = pdf.getPageCount();
    const result: Blob[] = [];

    for (let i = 0; i < pageCount; i++) {
        const newPdf = await PDFDocument.create();
        const [page] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(page);

        const bytes = await newPdf.save();
        result.push(toPdfBlob(bytes));
    }

    return result;
}

/* ============================================================
    EXTRACT PAGES
============================================================ */
export async function extractPages(file: File, pageNumbers: number[]): Promise<Blob> {
    const pdfBytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(pdfBytes);

    const indicesToCopy = pageNumbers.map(n => n - 1).filter(n => n >= 0 && n < pdf.getPageCount());
    
    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(pdf, indicesToCopy);
    pages.forEach(p => newPdf.addPage(p));

    const bytes = await newPdf.save({
        useObjectStreams: true,
    });
    return toPdfBlob(bytes);
}

/* ============================================================
    REMOVE PAGES
============================================================ */
export async function removePages(file: File, pageNumbers: number[]): Promise<Blob> {
    const pdfBytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(pdfBytes);
    const count = pdf.getPageCount();

    const keepIndices = Array.from({ length: count }, (_, i) => i)
        .filter(index => !pageNumbers.includes(index + 1));

    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(pdf, keepIndices);
    pages.forEach(p => newPdf.addPage(p));

    const bytes = await newPdf.save({
        useObjectStreams: true,
    });
    return toPdfBlob(bytes);
}

/* ============================================================
    ROTATE PDF
============================================================ */
export async function rotatePdf(file: File, rotationData: number | number[]): Promise<Blob> {
    const pdfBytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(pdfBytes);
    const pages = pdf.getPages();

    if (typeof rotationData === 'number') {
        pages.forEach(p => p.setRotation(degrees(rotationData)));
    } else if (Array.isArray(rotationData)) {
        pages.forEach((p, i) => {
            if (rotationData[i] !== undefined) {
                p.setRotation(degrees(rotationData[i]));
            }
        });
    }

    const bytes = await pdf.save({
        useObjectStreams: true,
    });
    return toPdfBlob(bytes);
}

/* ============================================================
    REVERSE PDF ORDER
============================================================ */
export async function reversePdfOrder(file: File | Blob): Promise<Blob> {
    const pdfBytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(pdfBytes);
    const pageCount = pdf.getPageCount();
    
    if (pageCount === 0) {
        throw new Error('PDF has no pages to reverse');
    }
    
    const newPdf = await PDFDocument.create();
    
    for (let i = pageCount - 1; i >= 0; i--) {
        const [page] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(page);
    }
    
    const bytes = await newPdf.save({
        useObjectStreams: true,
    });
    return toPdfBlob(bytes);
}

/* ============================================================
    OPTIMIZE PDF
============================================================ */
export async function optimizePdf(file: File, quality: 'low' | 'medium' | 'high' = 'medium'): Promise<Blob> {
    const pdfBytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(pdfBytes);
    
    const options: any = {
        useObjectStreams: true,
        addDefaultPage: false,
    };
    
    if (quality === 'low') {
        options.objectsPerTick = 50;
    } else if (quality === 'high') {
        options.objectsPerTick = 200;
    }
    
    const bytes = await pdf.save(options);
    return toPdfBlob(bytes);
}