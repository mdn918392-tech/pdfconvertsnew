'use client'; // ensures this module runs on the client-side

import imageCompression from 'browser-image-compression';
import { PDFDocument } from 'pdf-lib';

/**
 * Compress an image file using browser-image-compression
 * @param {File} file Input image file
 * @param {number} [quality=0.8] Compression quality (0 to 1)
 * @returns {Promise<Blob>} Compressed Blob
 */
export async function compressImage(
  file,
  quality = 0.8
) {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: quality,
  };

  const compressedFile = await imageCompression(file, options);
  return compressedFile;
}

// ---

/**
 * Convert PNG image to JPG with white background
 * @param {File} file PNG file
 * @returns {Promise<Blob>} JPG Blob
 */
export async function convertPngToJpg(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context not available'));

      // Fill with white background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Conversion failed'));
        },
        'image/jpeg',
        0.95
      );
    };

    img.onerror = reject;
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ---

/**
 * Convert a PDF into separate PDF blobs per page
 * @param {File} file PDF File
 * @returns {Promise<Blob[]>} Array of single-page PDF blobs
 */
export async function pdfToImages(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pageCount = pdf.getPageCount();
  const images = [];

  for (let i = 0; i < pageCount; i++) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdf, [i]);
    newPdf.addPage(copiedPage);
    const pdfBytes = await newPdf.save();
    
    // Using pdfBytes.buffer for compatibility with Blob constructor in many environments
    images.push(new Blob([pdfBytes.buffer], { type: 'application/pdf' }));
  }

  return images;
}

// ---

/**
 * Download a Blob file
 * @param {Blob} blob Blob object
 * @param {string} filename Name of the downloaded file
 */
export function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}