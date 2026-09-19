'use client';

import imageCompression from 'browser-image-compression';
import { PDFDocument, rgb } from 'pdf-lib';

// ============================================================
// TYPES
// ============================================================

export interface PdfSettings {
  paperSize: 'A4' | 'A3' | 'Letter' | 'Legal';
  orientation: 'portrait' | 'landscape';
  reverseOrder: boolean;
  imagesPerPage: 1 | 2 | 4;
}

type TimeoutHandle = ReturnType<typeof setTimeout>;

// ============================================================
// 1. DEVICE DETECTION HELPERS
// ============================================================

const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768
  );
};

const getDeviceLimits = () => {
  const isMobile = isMobileDevice();
  return {
    isMobile,
    MAX_FILE_SIZE: isMobile ? 30 * 1024 * 1024 : 200 * 1024 * 1024,
    MAX_DIMENSION: isMobile ? 4096 : 8192,
    MAX_PIXELS: isMobile ? 2048 * 2048 : 4096 * 4096,
    MAX_IMAGE_SIZE_MB: isMobile ? 30 : 200,
    TIMEOUT_MS: isMobile ? 30000 : 15000,
    DEFAULT_QUALITY: isMobile ? 0.75 : 0.85,
  };
};

// ============================================================
// 2. PNG → JPG CONVERSION (real canvas re-encode)
// ============================================================

export async function convertPngToJpg(
  file: File | Blob,
  quality = 0.9
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('This function can only run in the browser'));
      return;
    }

    const limits = getDeviceLimits();

    if (!file || file.size === 0) {
      reject(new Error('File is empty or corrupted'));
      return;
    }

    if (file.size > limits.MAX_FILE_SIZE) {
      reject(
        new Error(
          `File size too large (${(file.size / 1024 / 1024).toFixed(1)}MB). ` +
            `Maximum supported is ${limits.MAX_IMAGE_SIZE_MB}MB for ${
              limits.isMobile ? 'mobile' : 'desktop'
            }.`
        )
      );
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    let loadTimeout: TimeoutHandle | null = null;
    let settled = false;

    const cleanup = () => {
      if (loadTimeout) {
        clearTimeout(loadTimeout);
        loadTimeout = null;
      }
      img.onload = null;
      img.onerror = null;
      img.src = '';
      URL.revokeObjectURL(objectUrl);
    };

    const fail = (err: Error) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(err);
    };

    const succeed = (blob: Blob) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(blob);
    };

    img.onload = () => {
      if (loadTimeout) {
        clearTimeout(loadTimeout);
        loadTimeout = null;
      }

      try {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        if (!width || !height) {
          return fail(new Error('Image has zero dimensions'));
        }

        const currentPixels = width * height;
        if (currentPixels > limits.MAX_PIXELS) {
          const scale = Math.sqrt(limits.MAX_PIXELS / currentPixels);
          width = Math.floor(width * scale);
          height = Math.floor(height * scale);
        }

        if (width > limits.MAX_DIMENSION || height > limits.MAX_DIMENSION) {
          const ratio = Math.min(
            limits.MAX_DIMENSION / width,
            limits.MAX_DIMENSION / height
          );
          width = Math.floor(width * ratio);
          height = Math.floor(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return fail(new Error('Canvas context not available'));

        // White bg for transparency (JPEG has no alpha)
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        const finalQuality = limits.isMobile
          ? Math.min(quality, 0.85)
          : quality;

        if (typeof canvas.toBlob === 'function') {
          canvas.toBlob(
            (blob) => {
              if (!blob || blob.size === 0) {
                return fail(new Error('Conversion produced empty JPEG'));
              }
              if (blob.type !== 'image/jpeg') {
                return fail(
                  new Error(`Expected image/jpeg, got ${blob.type}`)
                );
              }
              succeed(blob);
            },
            'image/jpeg',
            finalQuality
          );
        } else {
          // Safari fallback
          try {
            const dataUrl = canvas.toDataURL('image/jpeg', finalQuality);
            const base64 = dataUrl.split(',')[1];
            const bin = atob(base64);
            const buf = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
            succeed(new Blob([buf], { type: 'image/jpeg' }));
          } catch (e: any) {
            fail(new Error(`toDataURL fallback failed: ${e.message}`));
          }
        }
      } catch (error: any) {
        fail(new Error(`Image processing error: ${error.message}`));
      }
    };

    img.onerror = () =>
      fail(
        new Error('Failed to load image. The file may be corrupted or too large.')
      );

    loadTimeout = setTimeout(() => {
      fail(new Error(`Image loading timeout (${limits.TIMEOUT_MS}ms)`));
    }, limits.TIMEOUT_MS);

    img.src = objectUrl;
  });
}

// ============================================================
// 3. WEBP → JPG CONVERSION (real canvas re-encode)
// ============================================================

export const convertWebpToJpg = (
  file: File | Blob,
  quality = 0.92
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('This function can only run in the browser'));
      return;
    }

    const limits = getDeviceLimits();

    if (!file || file.size === 0) {
      reject(new Error('File is empty or corrupted'));
      return;
    }

    if (file.size > limits.MAX_FILE_SIZE) {
      reject(
        new Error(
          `File size too large (${(file.size / 1024 / 1024).toFixed(1)}MB). ` +
            `Maximum supported is ${limits.MAX_IMAGE_SIZE_MB}MB for ${
              limits.isMobile ? 'mobile' : 'desktop'
            }.`
        )
      );
      return;
    }

    const img = new Image();
    const url = URL.createObjectURL(file);
    let timeout: TimeoutHandle | null = null;
    let settled = false;

    const cleanup = () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      img.onload = null;
      img.onerror = null;
      img.src = '';
      URL.revokeObjectURL(url);
    };

    const fail = (err: Error) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(err);
    };

    const succeed = (out: Blob) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(out);
    };

    timeout = setTimeout(() => {
      fail(new Error(`WebP conversion timeout (${limits.TIMEOUT_MS}ms)`));
    }, limits.TIMEOUT_MS);

    img.onload = () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      try {
        const w = img.naturalWidth || img.width;
        const h = img.naturalHeight || img.height;

        if (!w || !h) {
          return fail(new Error('WebP image has zero dimensions'));
        }

        let width = w;
        let height = h;

        // Scale down huge images
        const currentPixels = width * height;
        if (currentPixels > limits.MAX_PIXELS) {
          const scale = Math.sqrt(limits.MAX_PIXELS / currentPixels);
          width = Math.floor(width * scale);
          height = Math.floor(height * scale);
        }

        if (width > limits.MAX_DIMENSION || height > limits.MAX_DIMENSION) {
          const ratio = Math.min(
            limits.MAX_DIMENSION / width,
            limits.MAX_DIMENSION / height
          );
          width = Math.floor(width * ratio);
          height = Math.floor(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return fail(new Error('Canvas context not available'));

        // White background (JPEG has no alpha)
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        if (typeof canvas.toBlob === 'function') {
          canvas.toBlob(
            (blob) => {
              if (!blob || blob.size === 0) {
                return fail(new Error('WebP→JPG produced empty blob'));
              }
              if (blob.type !== 'image/jpeg') {
                return fail(
                  new Error(`Expected image/jpeg, got ${blob.type}`)
                );
              }
              succeed(blob);
            },
            'image/jpeg',
            quality
          );
        } else {
          // Safari fallback
          try {
            const dataUrl = canvas.toDataURL('image/jpeg', quality);
            const base64 = dataUrl.split(',')[1];
            const bin = atob(base64);
            const buf = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
            succeed(new Blob([buf], { type: 'image/jpeg' }));
          } catch (e: any) {
            fail(new Error(`toDataURL fallback failed: ${e.message}`));
          }
        }
      } catch (error: any) {
        fail(new Error(`WebP processing error: ${error.message}`));
      }
    };

    img.onerror = () =>
      fail(
        new Error('Failed to decode WebP. File may be corrupted or unsupported.')
      );

    img.src = url;
  });
};

// ============================================================
// 4. IMAGE COMPRESSION
// ============================================================

export async function compressImage(
  file: File | Blob,
  quality = 0.8,
  retryCount = 0
): Promise<Blob> {
  const limits = getDeviceLimits();
  const maxRetries = 2;

  try {
    if (!file || file.size === 0) {
      throw new Error('File is empty or corrupted');
    }

    if (file.size > limits.MAX_FILE_SIZE) {
      throw new Error(
        `File size too large (${(file.size / 1024 / 1024).toFixed(1)}MB). ` +
          `Maximum supported file size is ${limits.MAX_IMAGE_SIZE_MB}MB for ${
            limits.isMobile ? 'mobile' : 'desktop'
          } devices.`
      );
    }

    const options: any = {
      maxSizeMB: limits.isMobile ? 1 : 5,
      maxWidthOrHeight: limits.isMobile ? 1920 : 4096,
      useWebWorker: true,
      initialQuality: quality,
      onProgress: undefined,
    };

    if (file instanceof File && file.type === 'image/png') {
      const jpgBlob = await convertPngToJpg(file);
      const jpgFile = new File([jpgBlob], 'converted.jpg', {
        type: 'image/jpeg',
      });
      const compressedFile = await imageCompression(jpgFile, options);

      if (!compressedFile || compressedFile.size === 0) {
        throw new Error('Compression resulted in empty file');
      }
      return compressedFile;
    }

    let fileToCompress: File;
    if (file instanceof Blob && !(file instanceof File)) {
      fileToCompress = new File([file], 'image.jpg', {
        type: file.type || 'image/jpeg',
      });
    } else {
      fileToCompress = file as File;
    }

    const compressedFile = await imageCompression(fileToCompress, options);

    if (!compressedFile || compressedFile.size === 0) {
      throw new Error('Compression resulted in empty file');
    }

    if (
      compressedFile.size > fileToCompress.size &&
      quality > 0.4 &&
      retryCount < maxRetries
    ) {
      const newQuality = Math.max(quality - 0.2, 0.3);
      return await compressImage(file, newQuality, retryCount + 1);
    }

    return compressedFile;
  } catch (error: any) {
    console.error('Compression error:', error);

    if (retryCount < maxRetries && quality > 0.3) {
      const newQuality = Math.max(quality - 0.2, 0.3);
      return await compressImage(file, newQuality, retryCount + 1);
    }

    if (file instanceof Blob && file.size > 0) {
      console.warn('Using original file as fallback');
      return file.slice(0, file.size, file.type);
    }

    throw new Error(`Failed to compress image: ${error.message}`);
  }
}

/**
 * Compress image and (by default) force output as real JPEG.
 * - PNG (or any format) with forceJpeg=true → real JPEG re-encode via canvas
 * - Verifies output MIME type
 */
export async function compressImageAll(
  file: File | Blob,
  quality = 0.8,
  forceJpeg = true
): Promise<Blob> {
  try {
    if (!file || file.size === 0) {
      throw new Error('File is empty or corrupted');
    }

    const isPng =
      file.type === 'image/png' ||
      (file instanceof File && file.name.toLowerCase().endsWith('.png'));

    // PNG with forceJpeg → convert via canvas first
    if (forceJpeg && isPng) {
      const jpgBlob = await convertPngToJpg(file, quality);
      const jpgFile = new File([jpgBlob], 'temp.jpg', { type: 'image/jpeg' });

      const options: any = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: quality,
        fileType: 'image/jpeg',
      };

      const compressed = await imageCompression(jpgFile, options);

      if (!compressed || compressed.size === 0) {
        throw new Error('Compression produced empty file');
      }
      if (forceJpeg && compressed.type !== 'image/jpeg') {
        throw new Error(`Expected image/jpeg, got ${compressed.type}`);
      }
      return compressed;
    }

    let fileToCompress: File;
    if (file instanceof Blob && !(file instanceof File)) {
      fileToCompress = new File([file], 'image.jpg', {
        type: file.type || 'image/jpeg',
      });
    } else {
      fileToCompress = file as File;
    }

    const options: any = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: quality,
    };

    if (forceJpeg) {
      options.fileType = 'image/jpeg';
    }

    const compressed = await imageCompression(fileToCompress, options);

    if (!compressed || compressed.size === 0) {
      throw new Error('Compression produced empty file');
    }

    if (forceJpeg && compressed.type !== 'image/jpeg') {
      console.warn(
        `compressImageAll: got ${compressed.type}, forcing JPEG via canvas`
      );
      const forcedJpeg = await convertPngToJpg(compressed, quality);
      return forcedJpeg;
    }

    return compressed;
  } catch (error) {
    console.error('Compression error:', error);
    throw new Error('Failed to compress image');
  }
}

// ============================================================
// 5. IMAGE PROCESSING FOR PDF
// ============================================================

export const processImageForPdf = async (
  blob: Blob,
  options: { flipHorizontal?: boolean; flipVertical?: boolean } = {}
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const limits = getDeviceLimits();
    const img = new Image();
    const url = URL.createObjectURL(blob);
    let timeout: TimeoutHandle | null = null;
    let settled = false;

    const cleanup = () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      img.onload = null;
      img.onerror = null;
      img.src = '';
      URL.revokeObjectURL(url);
    };

    const fail = (err: Error) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(err);
    };

    const succeed = (out: Blob) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(out);
    };

    timeout = setTimeout(() => {
      fail(new Error('Image loading timeout for PDF processing'));
    }, limits.TIMEOUT_MS);

    img.onload = () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return fail(new Error('Canvas context not available'));

        if (options.flipHorizontal || options.flipVertical) {
          ctx.save();
          ctx.translate(canvas.width / 2, canvas.height / 2);
          if (options.flipHorizontal) ctx.scale(-1, 1);
          if (options.flipVertical) ctx.scale(1, -1);
          ctx.drawImage(
            img,
            -canvas.width / 2,
            -canvas.height / 2,
            canvas.width,
            canvas.height
          );
          ctx.restore();
        } else {
          ctx.drawImage(img, 0, 0);
        }

        canvas.toBlob(
          (newBlob) => {
            if (!newBlob || newBlob.size === 0) {
              return fail(new Error('Failed to create blob'));
            }
            succeed(newBlob);
          },
          'image/jpeg',
          0.95
        );
      } catch (error: any) {
        fail(error);
      }
    };

    img.onerror = () => fail(new Error('Failed to load image'));
    img.src = url;
  });
};

// ============================================================
// 6. IMAGE RESIZE
// ============================================================

export const resizeImage = async (
  file: File,
  width: number,
  height: number,
  quality: number = 85,
  format: 'jpg' | 'png' | 'webp' = 'jpg'
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const limits = getDeviceLimits();
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const url = URL.createObjectURL(file);
    let timeout: TimeoutHandle | null = null;
    let settled = false;

    if (!ctx) {
      URL.revokeObjectURL(url);
      reject(new Error('Canvas context not available'));
      return;
    }

    const cleanup = () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      img.onload = null;
      img.onerror = null;
      img.src = '';
      URL.revokeObjectURL(url);
    };

    const fail = (err: Error) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(err);
    };

    const succeed = (out: Blob) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(out);
    };

    timeout = setTimeout(() => {
      fail(new Error(`Image resize timeout (${limits.TIMEOUT_MS}ms)`));
    }, limits.TIMEOUT_MS);

    img.onload = () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      try {
        canvas.width = width;
        canvas.height = height;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size === 0) {
              return fail(new Error('Failed to create blob'));
            }
            succeed(blob);
          },
          `image/${format}`,
          quality / 100
        );
      } catch (error: any) {
        fail(error);
      }
    };

    img.onerror = () => fail(new Error('Failed to load image'));
    img.src = url;
  });
};

// ============================================================
// 7. IMAGE ROTATION
// ============================================================

export const rotateImage = (
  file: File,
  degrees: number,
  outputMime: string = 'image/jpeg'
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const limits = getDeviceLimits();
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const url = URL.createObjectURL(file);
    let timeout: TimeoutHandle | null = null;
    let settled = false;

    if (!ctx) {
      URL.revokeObjectURL(url);
      reject(new Error('Canvas context not available'));
      return;
    }

    const cleanup = () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      img.onload = null;
      img.onerror = null;
      img.src = '';
      URL.revokeObjectURL(url);
    };

    const fail = (err: Error) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(err);
    };

    const succeed = (out: Blob) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(out);
    };

    timeout = setTimeout(() => {
      fail(new Error(`Image rotation timeout (${limits.TIMEOUT_MS}ms)`));
    }, limits.TIMEOUT_MS);

    img.onload = () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      try {
        const w = img.naturalWidth || img.width;
        const h = img.naturalHeight || img.height;

        if (degrees === 90 || degrees === 270) {
          canvas.width = h;
          canvas.height = w;
        } else {
          canvas.width = w;
          canvas.height = h;
        }

        const ctx2 = canvas.getContext('2d');
        if (!ctx2) return fail(new Error('Canvas context lost'));

        if (outputMime === 'image/jpeg') {
          ctx2.fillStyle = '#FFFFFF';
          ctx2.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx2.imageSmoothingEnabled = true;
        ctx2.imageSmoothingQuality = 'high';
        ctx2.translate(canvas.width / 2, canvas.height / 2);
        ctx2.rotate((degrees * Math.PI) / 180);
        ctx2.translate(-w / 2, -h / 2);
        ctx2.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size === 0) {
              return fail(new Error('Failed to rotate image'));
            }
            succeed(blob);
          },
          outputMime,
          0.92
        );
      } catch (error: any) {
        fail(error);
      }
    };

    img.onerror = () => fail(new Error('Failed to load image'));
    img.src = url;
  });
};

// ============================================================
// 8. DOWNLOAD FUNCTIONS
// ============================================================

export function downloadFile(blob: Blob, filename: string) {
  if (typeof window === 'undefined') {
    console.error('Download function can only run in browser');
    return;
  }

  if (!blob || blob.size === 0) {
    console.warn('Cannot download empty file:', filename);
    return;
  }

  try {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  } catch (error) {
    console.error('Download failed:', error);
  }
}

export function downloadImageFile(blob: Blob, filename: string) {
  downloadFile(blob, filename);
}

export const downloadMultipleFiles = (
  files: { blob: Blob; filename: string }[]
) => {
  files.forEach((file, index) => {
    if (!file.blob || file.blob.size === 0) return;
    const delay = Math.min(index * 300, 5000);
    setTimeout(() => {
      downloadFile(file.blob, file.filename);
    }, delay);
  });
};

// ============================================================
// 9. ZIP DOWNLOAD
// ============================================================

export const downloadAsZip = async (
  files: Array<{ name: string; blob: Blob }>,
  zipFileName: string = 'converted_images.zip'
): Promise<void> => {
  try {
    const validFiles = files.filter((f) => f.blob && f.blob.size > 0);
    if (validFiles.length === 0) {
      throw new Error('No valid files to zip');
    }

    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();

    validFiles.forEach((file) => {
      zip.file(file.name, file.blob);
    });

    const zipBlob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    });

    downloadFile(zipBlob, zipFileName);
  } catch (error) {
    console.error('Error creating ZIP file:', error);
    throw new Error(
      `Failed to create ZIP file: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};

// ============================================================
// 10. PDF → SEPARATE PDF PAGES
// ============================================================

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
    const arrayBuffer = new ArrayBuffer(bytes.length);
    const view = new Uint8Array(arrayBuffer);
    view.set(bytes);

    output.push(new Blob([arrayBuffer], { type: 'application/pdf' }));
  }

  return output;
}

// ============================================================
// 11. BUILD PDF FROM IMAGES
// ============================================================

export async function downloadAsPdf(
  images: Array<{ blob: Blob; name: string }>,
  settings: PdfSettings = {
    paperSize: 'A4',
    orientation: 'portrait',
    reverseOrder: false,
    imagesPerPage: 1,
  }
): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();

  pdfDoc.setTitle('Compressed Images');
  pdfDoc.setAuthor('Image Compressor Tool');
  pdfDoc.setCreationDate(new Date());
  pdfDoc.setModificationDate(new Date());

  const paperSizes: Record<string, { width: number; height: number }> = {
    A4: { width: 595, height: 842 },
    Letter: { width: 612, height: 792 },
    Legal: { width: 612, height: 1008 },
    A3: { width: 842, height: 1191 },
  };

  const chosen = paperSizes[settings.paperSize] ?? paperSizes.A4;
  const pageWidth =
    settings.orientation === 'landscape' ? chosen.height : chosen.width;
  const pageHeight =
    settings.orientation === 'landscape' ? chosen.width : chosen.height;

  let processedImages = [...images];
  if (settings.reverseOrder) processedImages.reverse();

  const gridCols =
    settings.imagesPerPage === 1 ? 1 : settings.imagesPerPage === 2 ? 2 : 2;
  const gridRows =
    settings.imagesPerPage === 1 ? 1 : settings.imagesPerPage === 2 ? 1 : 2;

  const totalPages = Math.ceil(processedImages.length / settings.imagesPerPage);

  for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    const startIndex = pageIndex * settings.imagesPerPage;
    const endIndex = Math.min(
      startIndex + settings.imagesPerPage,
      processedImages.length
    );
    const pageImages = processedImages.slice(startIndex, endIndex);

    const margin = 30;
    const availableWidth = pageWidth - 2 * margin;
    const availableHeight = pageHeight - 2 * margin;
    const cellWidth = availableWidth / gridCols;
    const cellHeight = availableHeight / gridRows;

    for (let i = 0; i < pageImages.length; i++) {
      const { blob, name } = pageImages[i];

      try {
        const row = Math.floor(i / gridCols);
        const col = i % gridCols;

        const x = margin + col * cellWidth;
        const y = pageHeight - margin - (row + 1) * cellHeight;

        const base64 = await blobToBase64(blob);
        const data = base64.split(',')[1];

        let embedded;
        try {
          if (blob.type.includes('png')) {
            embedded = await pdfDoc.embedPng(data);
          } else if (
            blob.type.includes('jpeg') ||
            blob.type.includes('jpg')
          ) {
            embedded = await pdfDoc.embedJpg(data);
          } else {
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

        const padding = 10;
        const maxWidth = cellWidth - 2 * padding;
        const maxHeight = cellHeight - 2 * padding;

        let imgWidth = embedded.width;
        let imgHeight = embedded.height;
        const scale = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
        imgWidth *= scale;
        imgHeight *= scale;

        const centerX = x + (cellWidth - imgWidth) / 2;
        const centerY = y + (cellHeight - imgHeight) / 2;

        page.drawImage(embedded, {
          x: centerX,
          y: centerY,
          width: imgWidth,
          height: imgHeight,
        });

        page.drawText(
          `Image ${startIndex + i + 1}: ${name.substring(0, 30)}`,
          {
            x: x + padding,
            y: y + padding,
            size: 8,
            color: rgb(0.3, 0.3, 0.3),
          }
        );
      } catch (error) {
        console.error(`Error processing image ${startIndex + i + 1}:`, error);
      }
    }

    page.drawText(`Page ${pageIndex + 1} of ${totalPages}`, {
      x: pageWidth - 80,
      y: 20,
      size: 9,
      color: rgb(0.4, 0.4, 0.4),
    });

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

  if (pdfDoc.getPageCount() === 0) {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    page.drawText('No images could be added to PDF', {
      x: pageWidth / 2 - 100,
      y: pageHeight / 2,
      size: 16,
    });
  }

  const pdfBytes = await pdfDoc.save();
  const arrayBuffer = new ArrayBuffer(pdfBytes.length);
  const view = new Uint8Array(arrayBuffer);
  view.set(pdfBytes);

  return new Blob([arrayBuffer], { type: 'application/pdf' });
}

// ============================================================
// 12. UTILITY
// ============================================================

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// ============================================================
// 13. DEFAULT EXPORT
// ============================================================

export default {
  compressImage,
  compressImageAll,
  convertPngToJpg,
  convertWebpToJpg,
  processImageForPdf,
  resizeImage,
  rotateImage,
  downloadFile,
  downloadImageFile,
  downloadMultipleFiles,
  downloadAsZip,
  pdfToImages,
  downloadAsPdf,
  isMobileDevice,
  getDeviceLimits,
};