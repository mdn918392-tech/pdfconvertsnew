'use client';

import { PDFDocument, rgb, degrees } from 'pdf-lib';

// Import types from your types file
import type { PaperSize, Orientation } from '../types';
import { PAPER_SIZES } from '../types';

/* ============================================================
    Helper: Convert to PDF Blob
============================================================ */
function toPdfBlob(bytes: Uint8Array | ArrayBuffer | any): Blob {
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
    Helper: Advanced image compression for PDF
============================================================ */
async function compressAndResizeImageForPdf(
    arrayBuffer: ArrayBuffer, 
    fileType: string, 
    paperWidth: number, 
    paperHeight: number
): Promise<{ buffer: ArrayBuffer; width: number; height: number; format: string }> {
    return new Promise((resolve, reject) => {
        try {
            const blob = new Blob([arrayBuffer], { type: fileType });
            const url = URL.createObjectURL(blob);
            
            const img = new Image();
            img.onload = () => {
                try {
                    // Calculate paper dimensions in pixels (assuming 96 DPI screen)
                    const paperWidthPx = paperWidth * (96 / 72); // Convert points to pixels
                    const paperHeightPx = paperHeight * (96 / 72);
                    
                    // Calculate optimal dimensions to fit paper size
                    const scaleX = paperWidthPx / img.width;
                    const scaleY = paperHeightPx / img.height;
                    const scale = Math.min(scaleX, scaleY, 1); // Don't upscale images
                    
                    // Apply additional compression for large files
                    const fileSizeMB = arrayBuffer.byteLength / (1024 * 1024);
                    let quality = 0.85; // Default quality
                    let maxDimension = 1200; // Default max dimension
                    
                    // Adjust settings based on file size
                    if (fileSizeMB > 10) {
                        quality = 0.5;
                        maxDimension = 800;
                    } else if (fileSizeMB > 5) {
                        quality = 0.6;
                        maxDimension = 1000;
                    } else if (fileSizeMB > 2) {
                        quality = 0.7;
                        maxDimension = 1200;
                    }
                    
                    // Calculate final dimensions
                    let newWidth = Math.floor(img.width * scale);
                    let newHeight = Math.floor(img.height * scale);
                    
                    // Ensure dimensions don't exceed maximum
                    if (newWidth > maxDimension || newHeight > maxDimension) {
                        const maxScale = maxDimension / Math.max(newWidth, newHeight);
                        newWidth = Math.floor(newWidth * maxScale);
                        newHeight = Math.floor(newHeight * maxScale);
                    }
                    
                    // Minimum dimensions
                    newWidth = Math.max(newWidth, 100);
                    newHeight = Math.max(newHeight, 100);
                    
                    console.log(`Resizing image: ${img.width}x${img.height} → ${newWidth}x${newHeight}, quality: ${quality}`);
                    
                    const canvas = document.createElement('canvas');
                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    const ctx = canvas.getContext('2d');
                    
                    if (!ctx) {
                        reject(new Error('Could not get canvas context'));
                        return;
                    }
                    
                    // Optimize canvas settings for compression
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'low'; // Use low for better compression
                    
                    // Draw resized image
                    ctx.drawImage(img, 0, 0, newWidth, newHeight);
                    
                    // Always convert to JPEG for better compression (except when transparency is needed)
                    const hasTransparency = fileType.includes('png') || fileType.includes('webp');
                    const outputFormat = hasTransparency ? 'image/png' : 'image/jpeg';
                    
                    canvas.toBlob(async (blob) => {
                        URL.revokeObjectURL(url);
                        
                        if (!blob) {
                            reject(new Error('Failed to create compressed image'));
                            return;
                        }
                        
                        const compressedBuffer = await blob.arrayBuffer();
                        const originalSize = arrayBuffer.byteLength / 1024 / 1024;
                        const compressedSize = compressedBuffer.byteLength / 1024 / 1024;
                        const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
                        
                        console.log(`Compression: ${originalSize.toFixed(2)}MB → ${compressedSize.toFixed(2)}MB (${compressionRatio}% reduction)`);
                        
                        resolve({
                            buffer: compressedBuffer,
                            width: newWidth,
                            height: newHeight,
                            format: outputFormat
                        });
                    }, outputFormat, outputFormat === 'image/jpeg' ? quality : 0.9);
                    
                } catch (error) {
                    URL.revokeObjectURL(url);
                    reject(error);
                }
            };
            
            img.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error('Failed to load image'));
            };
            
            img.src = url;
        } catch (error) {
            reject(error);
        }
    });
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
    
    // Special handling for WebP files
    if (detectedFormat === 'webp' || file.name.toLowerCase().endsWith('.webp') || file.type === 'image/webp') {
        console.warn(`WebP image detected: ${fileName}. Converting to JPEG for better compression...`);
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
                        }, 'image/jpeg', 0.7); // Use JPEG with 70% quality for WebP
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
    
    // Try to compress and resize image before embedding
    try {
        console.log(`Compressing ${fileName} for PDF...`);
        const compressed = await compressAndResizeImageForPdf(arrayBuffer, file.type, paperWidth, paperHeight);
        
        // Use compressed image for embedding
        if (compressed.format === 'image/png') {
            return await pdfDoc.embedPng(compressed.buffer);
        } else {
            return await pdfDoc.embedJpg(compressed.buffer);
        }
    } catch (compressError) {
        console.warn(`Compression failed for ${fileName}, using original:`, compressError);
        // Fallback to original embedding
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
    
    // Try both PNG and JPEG regardless of detection
    try {
        return await pdfDoc.embedJpg(arrayBuffer);
    } catch (jpgError) {
        console.warn(`Failed to embed as JPEG, trying PNG: ${fileName}`, jpgError);
        
        try {
            return await pdfDoc.embedPng(arrayBuffer);
        } catch (pngError) {
            console.warn(`Failed to embed as PNG: ${fileName}`, pngError);
            
            // Last resort: create a proper placeholder image
            return await createPlaceholderImage(pdfDoc);
        }
    }
}

/* ============================================================
    Helper: Create placeholder image page
============================================================ */
function createPlaceholderPage(pdfDoc: PDFDocument, pageWidth: number, pageHeight: number, fileName: string): void {
    try {
        const page = pdfDoc.addPage([pageWidth, pageHeight]);
        
        page.drawRectangle({
            x: 20,
            y: 20,
            width: pageWidth - 40,
            height: pageHeight - 40,
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

/* ============================================================
    IMAGE → PDF with REAL Compression
============================================================ */
export async function imageToPdf(files: File[], paperSize: PaperSize, orientation: Orientation): Promise<Blob> {
    const pdfDoc = await PDFDocument.create();
    
    const sizeConfig = PAPER_SIZES[paperSize] || PAPER_SIZES['A4'];
    let { width: pageWidth, height: pageHeight } = sizeConfig;

    if (orientation === 'Landscape') {
        [pageWidth, pageHeight] = [pageHeight, pageWidth];
    }

    let successCount = 0;
    let errorCount = 0;
    let placeholderCount = 0;
    let totalOriginalSize = 0;
    let totalCompressedSize = 0;

    console.log(`Creating PDF with ${files.length} images, paper: ${paperSize}, orientation: ${orientation}`);

    for (const file of files) {
        try {
            const arrayBuffer = await file.arrayBuffer();
            totalOriginalSize += arrayBuffer.byteLength;
            
            if (arrayBuffer.byteLength === 0) {
                console.warn(`Empty file: ${file.name}`);
                createPlaceholderPage(pdfDoc, pageWidth, pageHeight, file.name);
                placeholderCount++;
                continue;
            }
            
            let image;
            try {
                image = await embedImageWithValidation(pdfDoc, file, arrayBuffer, pageWidth, pageHeight);
            } catch (embedError: any) {
                console.warn(`Could not embed image ${file.name}:`, embedError.message);
                createPlaceholderPage(pdfDoc, pageWidth, pageHeight, file.name);
                placeholderCount++;
                continue;
            }

            if (!image || typeof image !== 'object' || !image.scale) {
                console.warn(`Invalid image object for ${file.name}`);
                createPlaceholderPage(pdfDoc, pageWidth, pageHeight, file.name);
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
                
                // Scale to fit page with 5% margin
                const margin = 0.05;
                const maxWidth = pageWidth * (1 - 2 * margin);
                const maxHeight = pageHeight * (1 - 2 * margin);
                
                const scale = Math.min(maxWidth / imgDims.width, maxHeight / imgDims.height, 1);
                const scaledWidth = imgDims.width * scale;
                const scaledHeight = imgDims.height * scale;

                // Center the image with margin
                page.drawImage(image, {
                    x: (pageWidth - scaledWidth) / 2,
                    y: (pageHeight - scaledHeight) / 2,
                    width: scaledWidth,
                    height: scaledHeight,
                });
                
                successCount++;
                console.log(`✓ Added ${file.name} (${(arrayBuffer.byteLength / 1024).toFixed(0)}KB)`);
                
            } catch (drawError: any) {
                console.warn(`Could not draw image ${file.name}:`, drawError.message);
                page.drawText(`Error: Could not display ${file.name}`, {
                    x: 50,
                    y: pageHeight / 2,
                    size: 12,
                    color: rgb(1, 0, 0),
                });
                placeholderCount++;
            }
            
        } catch (error: any) {
            console.error(`Error processing ${file.name}:`, error.message);
            errorCount++;
            createPlaceholderPage(pdfDoc, pageWidth, pageHeight, file.name);
        }
    }

    if (pdfDoc.getPageCount() === 0) {
        throw new Error('No images could be processed. Please check your image files.');
    }
    
    // Add summary page if there were any issues
    if (errorCount > 0 || placeholderCount > 0) {
        try {
            const summaryPage = pdfDoc.addPage([pageWidth, pageHeight]);
            summaryPage.drawText(`PDF Generation Summary`, {
                x: 50,
                y: pageHeight - 100,
                size: 16,
                color: rgb(0, 0, 0),
            });
            summaryPage.drawText(`Successfully processed: ${successCount} images`, {
                x: 50,
                y: pageHeight - 140,
                size: 12,
                color: rgb(0, 0.5, 0),
            });
            if (placeholderCount > 0) {
                summaryPage.drawText(`Placeholder created for: ${placeholderCount} images`, {
                    x: 50,
                    y: pageHeight - 170,
                    size: 12,
                    color: rgb(0.8, 0.5, 0),
                });
            }
            if (errorCount > 0) {
                summaryPage.drawText(`Failed to process: ${errorCount} images`, {
                    x: 50,
                    y: pageHeight - (placeholderCount > 0 ? 200 : 170),
                    size: 12,
                    color: rgb(1, 0, 0),
                });
            }
        } catch (error) {
            console.error('Failed to create summary page:', error);
        }
    }

    // Save with MAXIMUM compression
    console.log(`Saving PDF with maximum compression...`);
    const bytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 100,
        updateFieldAppearances: false,
        compress: true, // Enable PDF compression
    });
    
    totalCompressedSize = bytes.byteLength;
    const originalMB = totalOriginalSize / 1024 / 1024;
    const compressedMB = totalCompressedSize / 1024 / 1024;
    const reduction = ((originalMB - compressedMB) / originalMB * 100).toFixed(1);
    
    console.log(`PDF created! Size: ${originalMB.toFixed(2)}MB → ${compressedMB.toFixed(2)}MB (${reduction}% smaller)`);
    
    return toPdfBlob(bytes);
}

/* ============================================================
    COMPRESS PDF (Enhanced Version)
============================================================ */
export async function compressPdf(file: File): Promise<Blob> {
    const originalSize = file.size;
    const pdfBytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(pdfBytes);
    
    // Save with maximum compression settings
    const bytes = await pdf.save({ 
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 100,
        updateFieldAppearances: false,
        compress: true,
    }); 

    const compressedSize = bytes.byteLength;
    const originalMB = originalSize / 1024 / 1024;
    const compressedMB = compressedSize / 1024 / 1024;
    const reduction = ((originalMB - compressedMB) / originalMB * 100).toFixed(1);
    
    console.log(`PDF compressed: ${originalMB.toFixed(2)}MB → ${compressedMB.toFixed(2)}MB (${reduction}% reduction)`);
    
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
        compress: true,
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
        compress: true,
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
        compress: true,
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
        compress: true,
    });
    return toPdfBlob(bytes);
}

/* ============================================================
    REVERSE PDF ORDER
============================================================ */
export async function reversePdfOrder(file: File | Blob): Promise<Blob> {
    let pdfBytes: ArrayBuffer;
    
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
    
    const newPdf = await PDFDocument.create();
    
    for (let i = pageCount - 1; i >= 0; i--) {
        const [page] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(page);
    }
    
    const bytes = await newPdf.save({
        compress: true,
    });
    return toPdfBlob(bytes);
}

/* ============================================================
    OPTIMIZE PDF (Alternative to compressPdf)
============================================================ */
export async function optimizePdf(file: File, quality: 'low' | 'medium' | 'high' = 'medium'): Promise<Blob> {
    const pdfBytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(pdfBytes);
    
    const options: any = {
        useObjectStreams: true,
        addDefaultPage: false,
        compress: true,
    };
    
    if (quality === 'low') {
        // Maximum compression
        options.objectsPerTick = 50;
    } else if (quality === 'high') {
        // Better quality, less compression
        options.objectsPerTick = 200;
    }
    
    const bytes = await pdf.save(options);
    
    const originalMB = file.size / 1024 / 1024;
    const optimizedMB = bytes.byteLength / 1024 / 1024;
    const reduction = ((originalMB - optimizedMB) / originalMB * 100).toFixed(1);
    
    console.log(`PDF optimized (${quality}): ${originalMB.toFixed(2)}MB → ${optimizedMB.toFixed(2)}MB (${reduction}% smaller)`);
    
    return toPdfBlob(bytes);
}