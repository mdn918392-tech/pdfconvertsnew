'use client';

import imageCompression from 'browser-image-compression';
import { PDFDocument, rgb } from 'pdf-lib';

// Interface for PDF settings - CORRECTED TYPES
export interface PdfSettings {
  paperSize: 'AA' | 'A3' | 'Letter' | 'Legal';
  orientation: 'portrait' | 'landscape';
  reverseOrder: boolean;
  imagesPerPage: 1 | 2 | 4;
}

/**
 * Compress an image file
 */
export async function compressImage(
  file: File,
  quality = 0.8
): Promise<Blob> {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: quality,
  };

  const compressedFile = await imageCompression(file, options);
  return compressedFile;
}

// Add this function to your imageUtils.ts
export const processImageForPdf = async (
  blob: Blob, 
  options: { flipHorizontal?: boolean; flipVertical?: boolean } = {}
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(blob);
      
      img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
              reject(new Error('Canvas context not available'));
              return;
          }
          
          // Apply transformations
          if (options.flipHorizontal || options.flipVertical) {
              ctx.save();
              
              // Move to center
              ctx.translate(canvas.width / 2, canvas.height / 2);
              
              // Apply flips
              if (options.flipHorizontal) {
                  ctx.scale(-1, 1);
              }
              if (options.flipVertical) {
                  ctx.scale(1, -1);
              }
              
              // Draw image centered
              ctx.drawImage(img, -img.width / 2, -img.height / 2);
              ctx.restore();
          } else {
              ctx.drawImage(img, 0, 0);
          }
          
          canvas.toBlob((newBlob) => {
              if (newBlob) {
                  resolve(newBlob);
              } else {
                  reject(new Error('Failed to create blob'));
              }
              URL.revokeObjectURL(url);
          }, 'image/jpeg', 0.95);
      };
      
      img.onerror = () => {
          reject(new Error('Failed to load image'));
          URL.revokeObjectURL(url);
      };
      
      img.src = url;
  });
};
// --------------------------------------------------

/**
 * Convert PNG to JPG with white background
 */
export async function convertPngToJpg(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context not available'));

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Conversion failed'))),
        'image/jpeg',
        0.95
      );
    };

    img.onerror = reject;
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// --------------------------------------------------

/**
 * Split PDF into single-page PDFs
 */
export async function pdfToImages(file: File): Promise<Blob[]> {
  const buffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(buffer);
  const pages = pdf.getPageCount();
  const output: Blob[] = [];

  for (let i = 0; i < pages; i++) {
    const newPdf = await PDFDocument.create();
    const [page] = await newPdf.copyPages(pdf, [i]);
    newPdf.addPage(page);

    const bytes = await newPdf.save();

    // ✅ FIX: Convert Uint8Array to ArrayBuffer safely
    // Create a new ArrayBuffer and copy the data
    const arrayBuffer = new ArrayBuffer(bytes.length);
    const view = new Uint8Array(arrayBuffer);
    view.set(bytes); // Copy bytes to the new ArrayBuffer

    output.push(
      new Blob([arrayBuffer], { type: 'application/pdf' })
    );
  }

  return output;
}


// utils/imageUtils.ts में नया फ़ंक्शन जोड़ें

// ZIP डाउनलोड फ़ंक्शन
export const downloadAsZip = async (
  files: Array<{ name: string; blob: Blob }>,
  zipFileName: string = "converted_images.zip"
): Promise<void> => {
  try {
    // JSZip इंस्टॉल करना पड़ेगा
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();

    // सभी फाइलें ZIP में जोड़ें
    files.forEach((file, index) => {
      zip.file(file.name, file.blob);
    });

    // ZIP फाइल जेनरेट करें
    const zipBlob = await zip.generateAsync({ type: "blob" });

    // डाउनलोड लिंक बनाएं
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = zipFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error creating ZIP file:", error);
    throw new Error("Failed to create ZIP file");
  }
};
// --------------------------------------------------

/**
 * Convert images to single PDF with customizable settings
 */
export async function downloadAsPdf(
  images: Array<{ blob: Blob; name: string }>,
  settings: PdfSettings = {
    paperSize: 'AA',
    orientation: 'portrait',
    reverseOrder: false,
    imagesPerPage: 1
  }
): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();

  // Add metadata
  pdfDoc.setTitle('Compressed Images');
  pdfDoc.setAuthor('Image Compressor Tool');
  pdfDoc.setCreationDate(new Date());
  pdfDoc.setModificationDate(new Date());

  // Define paper sizes in points (1 point = 1/72 inch)
  const paperSizes = {
    'AA': { width: 595, height: 842 },
    'Letter': { width: 612, height: 792 },
    'Legal': { width: 612, height: 1008 },
    'A3': { width: 842, height: 1191 },
  };

  // Get paper size
  const { width: baseWidth, height: baseHeight } = paperSizes[settings.paperSize];
  
  // Adjust for orientation
  const pageWidth = settings.orientation === 'landscape' ? baseHeight : baseWidth;
  const pageHeight = settings.orientation === 'landscape' ? baseWidth : baseHeight;

  // Prepare images array (reverse if needed)
  let processedImages = [...images];
  if (settings.reverseOrder) {
    processedImages.reverse();
  }

  // Calculate grid layout based on images per page
  const gridCols = settings.imagesPerPage === 1 ? 1 : settings.imagesPerPage === 2 ? 2 : 2;
  const gridRows = settings.imagesPerPage === 1 ? 1 : settings.imagesPerPage === 2 ? 1 : 2;

  // Process images in batches based on images per page
  for (let pageIndex = 0; pageIndex < Math.ceil(processedImages.length / settings.imagesPerPage); pageIndex++) {
    // Add a new page
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    
    // Get images for this page
    const startIndex = pageIndex * settings.imagesPerPage;
    const endIndex = Math.min(startIndex + settings.imagesPerPage, processedImages.length);
    const pageImages = processedImages.slice(startIndex, endIndex);
    
    // Calculate cell dimensions
    const margin = 30;
    const availableWidth = pageWidth - (2 * margin);
    const availableHeight = pageHeight - (2 * margin);
    const cellWidth = availableWidth / gridCols;
    const cellHeight = availableHeight / gridRows;
    
    // Place each image in its cell
    for (let i = 0; i < pageImages.length; i++) {
      const { blob, name } = pageImages[i];
      
      try {
        // Calculate grid position
        const row = Math.floor(i / gridCols);
        const col = i % gridCols;
        
        const x = margin + (col * cellWidth);
        const y = pageHeight - margin - ((row + 1) * cellHeight);
        
        // Convert blob to base64
        const base64 = await blobToBase64(blob);
        const data = base64.split(',')[1];
        
        // Determine image type and embed
        let embedded;
        try {
          if (blob.type.includes('png')) {
            embedded = await pdfDoc.embedPng(data);
          } else if (blob.type.includes('jpeg') || blob.type.includes('jpg')) {
            embedded = await pdfDoc.embedJpg(data);
          } else {
            // Try as PNG first, then JPEG
            try {
              embedded = await pdfDoc.embedPng(data);
            } catch {
              embedded = await pdfDoc.embedJpg(data);
            }
          }
        } catch (error) {
          console.warn('Failed to embed image:', name);
          continue;
        }
        
        // Calculate dimensions to fit cell (with padding)
        const padding = 10;
        const maxWidth = cellWidth - (2 * padding);
        const maxHeight = cellHeight - (2 * padding);
        
        let imgWidth = embedded.width;
        let imgHeight = embedded.height;
        
        // Maintain aspect ratio
        const scale = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
        imgWidth *= scale;
        imgHeight *= scale;
        
        // Center in cell
        const centerX = x + (cellWidth - imgWidth) / 2;
        const centerY = y + (cellHeight - imgHeight) / 2;
        
        // Draw image on page
        page.drawImage(embedded, {
          x: centerX,
          y: centerY,
          width: imgWidth,
          height: imgHeight,
        });
        
        // Add caption
        page.drawText(`Image ${startIndex + i + 1}: ${name.substring(0, 30)}`, {
          x: x + padding,
          y: y + padding,
          size: 8,
          color: rgb(0.3, 0.3, 0.3),
        });
        
      } catch (error) {
        console.error(`Error processing image ${startIndex + i + 1}:`, error);
      }
    }
    
    // Add page number
    page.drawText(`Page ${pageIndex + 1} of ${Math.ceil(processedImages.length / settings.imagesPerPage)}`, {
      x: pageWidth - 80,
      y: 20,
      size: 9,
      color: rgb(0.4, 0.4, 0.4),
    });
    
    // Add PDF settings info
    page.drawText(
      `Settings: ${settings.paperSize} ${settings.orientation}, ${settings.imagesPerPage} per page`,
      {
        x: margin,
        y: 20,
        size: 8,
        color: rgb(0.5, 0.5, 0.5),
      }
    );
  }

  // If no images were added successfully, add a message page
  if (pdfDoc.getPageCount() === 0) {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    const centerX = pageWidth / 2;
    const centerY = pageHeight / 2;
    
    page.drawText('No images could be added to PDF', {
      x: centerX - 100,
      y: centerY,
      size: 16,
    });
  }

  const pdfBytes = await pdfDoc.save();
  
  // ✅ FIX: Convert Uint8Array to ArrayBuffer for Blob creation
  const arrayBuffer = new ArrayBuffer(pdfBytes.length);
  const view = new Uint8Array(arrayBuffer);
  view.set(pdfBytes);
  
  return new Blob([arrayBuffer], { type: 'application/pdf' });
}

// --------------------------------------------------

/**
 * Download blob
 */
export function downloadFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// --------------------------------------------------

/**
 * Blob → Base64
 */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}