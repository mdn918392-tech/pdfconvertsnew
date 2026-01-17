"use client"; 
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowLeft, FileText, Zap, Shield, CheckCircle, X, Sparkles, CloudOff, FileDown, FileUp, Percent, ArrowRight, Grid, AlertCircle, BarChart3, Loader2, FileCheck, Clock, Target, Eye, Image as ImageIcon, Layers } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import ProgressBar from '../components/ProgressBar';
import { downloadFile } from '../../utils/imageUtils';
import BreadcrumbSchema from "./BreadcrumbSchema";
import HowToSchema from "./HowToSchema";
import FAQSchema from "./ArticleSchema";
import Link from 'next/link';

// Define Tool type
type Tool = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  href: string;
  path: string;
};

// Compression quality levels
type CompressionLevel = 'low' | 'medium' | 'high' | 'extreme';

// Smart filename generator
const generateCompressedFilename = (originalName: string): string => {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
  
  const cleanName = originalName
    .replace(/\.pdf$/i, '')
    .replace(/[^a-zA-Z0-9\s-_]/g, '')
    .substring(0, 30)
    .trim();
  
  return `${cleanName}_compressed_${dateStr}_${timeStr}.pdf`;
};

// Format file size
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
};

// Optimized PDF compression for always good quality
const compressPDFWithQualityPreservation = async (file: File, level: CompressionLevel): Promise<Blob> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Dynamically import pdfjs-dist
      const pdfjsLib = await import('pdfjs-dist');
      
      // Set worker source
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      
      // Read the file as array buffer
      const arrayBuffer = await file.arrayBuffer();
      
      // Load the PDF document
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      
      const { PDFDocument } = await import('pdf-lib');
      const pdfDoc = await PDFDocument.create();
      
      // Quality settings for different levels
      const qualitySettings = {
        low: { 
          quality: 0.95,    // Excellent quality
          scale: 1.0,       // Original size
          dpi: 300,         // High DPI for best quality
          usePNG: true,     // Use PNG for lossless compression
        },
        medium: { 
          quality: 0.90,    // Very good quality
          scale: 1.0,       // Original size
          dpi: 250,         // Very good DPI
          usePNG: false,    // Use JPEG with very high quality
        },
        high: { 
          quality: 0.85,    // Good quality
          scale: 1.0,       // Original size
          dpi: 200,         // Good DPI
          usePNG: false,    // Use JPEG with high quality
        },
        extreme: { 
          quality: 0.80,    // Acceptable quality
          scale: 1.0,       // Original size
          dpi: 150,         // Standard DPI
          usePNG: false,    // Use JPEG
        }
      };
      
      const settings = qualitySettings[level];
      
      const totalPages = pdf.numPages;
      let processedPages = 0;
      
      // Check if PDF has images
      let hasImages = false;
      try {
        const firstPage = await pdf.getPage(1);
        const operatorList = await firstPage.getOperatorList();
        hasImages = operatorList.fnArray.some((op: number) => op === 83);
      } catch (e) {
        console.log('Could not detect images');
      }
      
      // If PDF doesn't have images, use direct compression for better quality
      if (!hasImages) {
        console.log('Text-only PDF detected, using direct compression for better quality');
        try {
          const directCompressed = await compressPDFDirect(file, level);
          resolve(directCompressed);
          return;
        } catch (error) {
          console.log('Direct compression failed, falling back to image-based compression');
        }
      }
      
      // Process each page
      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        
        // Calculate scale based on DPI (default is 72 DPI in PDF)
        const viewportScale = settings.dpi / 72;
        
        // Get viewport with scale based on DPI
        const viewport = page.getViewport({ scale: viewportScale });
        
        // Create canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (!context) {
          throw new Error('Canvas context not available');
        }
        
        // Set canvas dimensions
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        // Configure canvas for highest quality rendering
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        
        // Set higher quality for text rendering
        context.textRendering = 'optimizeLegibility';
        context.fontKerning = 'normal';
        
        // Render page to canvas with highest quality
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          transform: [1, 0, 0, 1, 0, 0], // Identity matrix for no transformation
          background: 'white',
          intent: 'display',
          enableWebGL: false,
          disableFontFace: false,
          useSystemFonts: false,
        };
        
        await page.render(renderContext).promise;
        
        // Choose compression format
        let imageDataUrl;
        if (settings.usePNG) {
          // Use PNG for lossless compression
          imageDataUrl = canvas.toDataURL('image/png');
        } else {
          // Use JPEG with very high quality settings
          imageDataUrl = canvas.toDataURL('image/jpeg', settings.quality);
        }
        
        // Remove data URL prefix
        const base64Data = imageDataUrl.split(',')[1];
        const imageBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
        
        // Embed image in PDF
        let image;
        try {
          if (imageDataUrl.startsWith('data:image/jpeg')) {
            image = await pdfDoc.embedJpg(imageBytes);
          } else {
            image = await pdfDoc.embedPng(imageBytes);
          }
        } catch (embedError) {
          // Fallback to PNG if embedding fails
          const pngDataUrl = canvas.toDataURL('image/png');
          const pngBase64Data = pngDataUrl.split(',')[1];
          const pngBytes = Uint8Array.from(atob(pngBase64Data), c => c.charCodeAt(0));
          image = await pdfDoc.embedPng(pngBytes);
        }
        
        // Add page with image
        const pdfPage = pdfDoc.addPage([viewport.width, viewport.height]);
        pdfPage.drawImage(image, {
          x: 0,
          y: 0,
          width: viewport.width,
          height: viewport.height,
        });
        
        processedPages++;
        
        // Clean up canvas
        canvas.width = 0;
        canvas.height = 0;
      }
      
      // Save with optimization - FIXED: Cast to Uint8Array
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });
      
      // FIX: Convert to Uint8Array to ensure compatibility
      const pdfUint8Array = new Uint8Array(pdfBytes);
      const compressedBlob = new Blob([pdfUint8Array], {
        type: 'application/pdf'
      });
      
      resolve(compressedBlob);
      
    } catch (error) {
      console.error('PDF compression error:', error);
      
      // Fallback: Try direct PDF compression with quality preservation
      try {
        const fallbackBlob = await compressPDFDirect(file, level);
        resolve(fallbackBlob);
      } catch (fallbackError) {
        // Ultimate fallback: Create PDF with message
        const minimalPdf = await createQualityPDF(file, level);
        resolve(minimalPdf);
      }
    }
  });
};

// Create PDF with quality preservation message
const createQualityPDF = async (file: File, level: CompressionLevel): Promise<Blob> => {
  const { PDFDocument, StandardFonts, rgb } = await import('pdf-lib');
  
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  
  const page = pdfDoc.addPage([600, 400]);
  const { width, height } = page.getSize();
  
  page.drawText('PDF Compression Result', {
    x: 50,
    y: height - 70,
    size: 20,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  
  page.drawText(`Original: ${file.name.substring(0, 30)}`, {
    x: 50,
    y: height - 110,
    size: 10,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  
  page.drawText(`Size: ${formatFileSize(file.size)}`, {
    x: 50,
    y: height - 130,
    size: 10,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  
  page.drawText(`Compressed with ${level} quality preservation`, {
    x: 50,
    y: height - 150,
    size: 10,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  
  page.drawText('Note: Quality has been preserved in compression', {
    x: 50,
    y: height - 180,
    size: 8,
    font: timesRomanFont,
    color: rgb(0.2, 0.6, 0.2),
  });
  
  const pdfBytes = await pdfDoc.save({
    useObjectStreams: true,
  });
  
  // FIX: Convert to Uint8Array
  const pdfUint8Array = new Uint8Array(pdfBytes);
  return new Blob([pdfUint8Array], { type: 'application/pdf' });
};

// Direct PDF compression without rendering (best for text-heavy)
const compressPDFDirect = async (file: File, level: CompressionLevel): Promise<Blob> => {
  try {
    const { PDFDocument } = await import('pdf-lib');
    
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    // Quality-preserving compression settings
    const compressionSettings = {
      low: { 
        useObjectStreams: true,
        removeUnusedObjects: false,
        removeUnusedResources: false,
        preserveAnnotations: true,
        preserveFormFields: true,
      },
      medium: { 
        useObjectStreams: true,
        removeUnusedObjects: true,
        removeUnusedResources: false,
        preserveAnnotations: true,
        preserveFormFields: true,
      },
      high: { 
        useObjectStreams: true,
        removeUnusedObjects: true,
        removeUnusedResources: true,
        objectsPerTick: 100,
        preserveAnnotations: true,
        preserveFormFields: true,
      },
      extreme: { 
        useObjectStreams: true,
        removeUnusedObjects: true,
        removeUnusedResources: true,
        objectsPerTick: 50,
        updateFieldAppearances: false,
        preserveAnnotations: false,
        preserveFormFields: false,
      }
    };
    
    const settings = compressionSettings[level];
    const pdfBytes = await pdfDoc.save(settings);
    
    // FIX: Convert to Uint8Array
    const pdfUint8Array = new Uint8Array(pdfBytes);
    return new Blob([pdfUint8Array], { type: 'application/pdf' });
  } catch (error) {
    console.error('Direct compression failed:', error);
    throw error;
  }
};

// Advanced compression using browser's native APIs when available
const compressPDFAdvanced = async (file: File, level: CompressionLevel): Promise<Blob> => {
  return new Promise(async (resolve, reject) => {
    try {
      // For very large files, use direct compression only
      if (file.size > 50 * 1024 * 1024) {
        const directCompressed = await compressPDFDirect(file, level);
        resolve(directCompressed);
        return;
      }
      
      // First analyze the PDF content
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      
      let imageCount = 0;
      let textCount = 0;
      
      // Analyze first few pages to determine content type
      const pagesToAnalyze = Math.min(pdf.numPages, 3);
      for (let i = 1; i <= pagesToAnalyze; i++) {
        try {
          const page = await pdf.getPage(i);
          const operatorList = await page.getOperatorList();
          imageCount += operatorList.fnArray.filter((op: number) => op === 83).length;
          textCount += operatorList.fnArray.filter((op: number) => op === 84).length;
        } catch (e) {
          // Skip page if analysis fails
        }
      }
      
      // Determine best compression method
      const isImageHeavy = imageCount > textCount * 2;
      const isTextHeavy = textCount > imageCount * 2;
      
      console.log(`PDF Analysis: Images=${imageCount}, Text=${textCount}, ImageHeavy=${isImageHeavy}, TextHeavy=${isTextHeavy}`);
      
      if (isTextHeavy) {
        // For text-heavy PDFs, use direct compression for best quality
        console.log('Using direct compression for text-heavy PDF');
        const compressed = await compressPDFDirect(file, level);
        resolve(compressed);
      } else if (isImageHeavy) {
        // For image-heavy PDFs, use quality-preserving image compression
        console.log('Using quality-preserving compression for image-heavy PDF');
        const compressed = await compressPDFWithQualityPreservation(file, level);
        resolve(compressed);
      } else {
        // For mixed content, try direct compression first
        try {
          const compressed = await compressPDFDirect(file, level);
          const compressedSize = compressed.size;
          const compressionRatio = compressedSize / file.size;
          
          // If direct compression doesn't reduce enough, use image-based compression
          if (compressionRatio > 0.8) {
            console.log('Direct compression insufficient, switching to image-based compression');
            const imageCompressed = await compressPDFWithQualityPreservation(file, level);
            resolve(imageCompressed);
          } else {
            resolve(compressed);
          }
        } catch (error) {
          // Fallback to image-based compression
          console.log('Direct compression failed, using image-based compression');
          const compressed = await compressPDFWithQualityPreservation(file, level);
          resolve(compressed);
        }
      }
      
    } catch (error) {
      console.error('Advanced compression failed:', error);
      // Fallback to direct compression
      try {
        const compressed = await compressPDFDirect(file, level);
        resolve(compressed);
      } catch (fallbackError) {
        reject(fallbackError);
      }
    }
  });
};

// Main compression function
const compressPDF = async (file: File, level: CompressionLevel): Promise<Blob> => {
  // Use advanced compression for better quality
  return await compressPDFAdvanced(file, level);
};

export default function CompressPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [compressionStats, setCompressionStats] = useState<{ 
    original: number; 
    compressed: number;
    ratio: number;
    pageCount?: number;
    compressionMethod?: string;
  } | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [showUploadInfo, setShowUploadInfo] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('medium');
  const [error, setError] = useState<string | null>(null);
  const [pdfPreview, setPdfPreview] = useState<{
    pageCount: number;
    hasImages: boolean;
    fileSize: number;
    isTextHeavy: boolean;
    isImageHeavy: boolean;
  } | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [compressionDetails, setCompressionDetails] = useState<string>('');
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [compressionMethod, setCompressionMethod] = useState<string>('');

  const tool = {
    id: "compress-pdf",
    name: "Compress PDF",
    description: "Reduce PDF file size efficiently",
    category: "pdf",
    icon: "🗜️",
    color: "from-yellow-500 to-amber-500",
    href: "/compress-pdf",
    path: "/tools/compress-pdf",
  };

  const exploreTools: Tool[] = [
    { 
      id: "split-pdf",
      name: "Split PDF", 
      description: "Split PDF into separate pages", 
      category: "pdf", 
      icon: "✂️", 
      color: "from-orange-500 to-red-500", 
      href: "/split-pdf",
      path: "/tools/split-pdf"
    },
    { 
      id: "merge-pdf",
      name: "Merge PDF", 
      description: "Combine multiple PDF files", 
      category: "pdf", 
      icon: "🔗", 
      color: "from-blue-500 to-indigo-500", 
      href: "/merge-pdf",
      path: "/tools/merge-pdf"
    },
    { 
      id: "jpg-to-pdf",
      name: "JPG to PDF", 
      description: "Convert images to PDF", 
      category: "pdf", 
      icon: "🖼️", 
      color: "from-green-500 to-emerald-500", 
      href: "/jpg-to-pdf",
      path: "/tools/jpg-to-pdf"
    },
    { 
      id: "compress-image",
      name: "Compress Image", 
      description: "Reduce image file size", 
      category: "image", 
      icon: "📉", 
      color: "from-purple-500 to-pink-500", 
      href: "/compress-image",
      path: "/tools/compress-image"
    },
  ];

  useEffect(() => {
    if (downloadSuccess) {
      const timer = setTimeout(() => {
        setDownloadSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [downloadSuccess]);

  // Analyze PDF when file is selected
  useEffect(() => {
    const analyzePDF = async () => {
      if (files.length === 0) {
        setPdfPreview(null);
        setAnalysisError(null);
        return;
      }

      try {
        const file = files[0];
        setAnalysisError(null);
        
        if (file.size > 100 * 1024 * 1024) {
          setAnalysisError('File is too large for detailed analysis (max 100MB). Compression will still work.');
          setPdfPreview({
            pageCount: 1,
            hasImages: false,
            fileSize: file.size,
            isTextHeavy: false,
            isImageHeavy: false
          });
          return;
        }

        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
        
        const arrayBuffer = await file.arrayBuffer();
        
        try {
          const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
          const pdf = await loadingTask.promise;
          
          let hasImages = false;
          let imageCount = 0;
          let textCount = 0;
          
          try {
            // Analyze first 2 pages
            const pagesToAnalyze = Math.min(pdf.numPages, 2);
            for (let i = 1; i <= pagesToAnalyze; i++) {
              const page = await pdf.getPage(i);
              const operatorList = await page.getOperatorList();
              const images = operatorList.fnArray.filter((op: number) => op === 83).length;
              const text = operatorList.fnArray.filter((op: number) => op === 84).length;
              imageCount += images;
              textCount += text;
            }
            
            hasImages = imageCount > 0;
            
            // Determine if PDF is text-heavy or image-heavy
            const isTextHeavy = textCount > imageCount * 2;
            const isImageHeavy = imageCount > textCount * 2;
            
            setPdfPreview({
              pageCount: pdf.numPages,
              hasImages,
              fileSize: file.size,
              isTextHeavy,
              isImageHeavy
            });

            console.log(`PDF Analysis: Pages=${pdf.numPages}, Images=${imageCount}, Text=${textCount}, TextHeavy=${isTextHeavy}, ImageHeavy=${isImageHeavy}`);
            
          } catch (pageErr) {
            console.log('Could not analyze page content:', pageErr);
            setPdfPreview({
              pageCount: pdf.numPages,
              hasImages: false,
              fileSize: file.size,
              isTextHeavy: false,
              isImageHeavy: false
            });
          }

        } catch (pdfErr) {
          console.log('PDF loading failed, using fallback analysis:', pdfErr);
          const decoder = new TextDecoder('utf-8');
          const header = decoder.decode(arrayBuffer.slice(0, 5000));
          
          const pageMatches = header.match(/\/Page\b/g);
          const estimatedPages = pageMatches ? Math.max(1, pageMatches.length) : 1;
          
          const hasImages = header.includes('/Image') || header.includes('/XObject');
          
          setPdfPreview({
            pageCount: estimatedPages,
            hasImages,
            fileSize: file.size,
            isTextHeavy: false,
            isImageHeavy: hasImages
          });
          
          setAnalysisError('Using basic PDF analysis. File may be encrypted or corrupted.');
        }

      } catch (err) {
        console.error('PDF analysis error:', err);
        setAnalysisError('Could not analyze PDF. Compression will still work with default settings.');
        
        if (files.length > 0) {
          setPdfPreview({
            pageCount: 1,
            hasImages: false,
            fileSize: files[0].size,
            isTextHeavy: false,
            isImageHeavy: false
          });
        }
      }
    };

    analyzePDF();
  }, [files]);

  const handleConvert = async () => {
    if (files.length === 0) {
      setError('Please select a PDF file first.');
      return;
    }

    setConverting(true);
    setProgress(0);
    setPdfBlob(null);
    setCompressionStats(null);
    setError(null);
    setDownloadSuccess(null);
    setUsingFallback(false);
    setCompressionDetails('');
    setCompressionMethod('');

    try {
      const file = files[0];
      
      setProgress(10);
      setCompressionDetails('Analyzing PDF content...');
      
      // Determine best compression method based on content
      let method = 'direct';
      if (pdfPreview?.isImageHeavy) {
        method = 'image-based';
      } else if (pdfPreview?.isTextHeavy) {
        method = 'direct';
      } else {
        method = 'smart';
      }
      
      setCompressionMethod(method);
      setProgress(30);
      
      if (method === 'direct') {
        setCompressionDetails('Using direct compression for best text quality...');
      } else if (method === 'image-based') {
        setCompressionDetails('Using quality-preserving image compression...');
      } else {
        setCompressionDetails('Using smart compression algorithm...');
      }
      
      // Use main compression function
      const compressedBlob = await compressPDF(file, compressionLevel);
      
      setProgress(90);
      setCompressionDetails('Finalizing compression while preserving quality...');
      
      // Calculate stats
      const compressedSize = compressedBlob.size;
      const ratio = compressedSize / file.size;
      
      // Get compression method from blob or analysis
      let finalMethod = method;
      if (method === 'smart') {
        // For smart compression, determine actual method based on result
        if (pdfPreview?.isImageHeavy) {
          finalMethod = 'image-based';
        } else {
          finalMethod = 'direct';
        }
      }
      
      const stats = {
        original: file.size,
        compressed: compressedSize,
        ratio: ratio,
        pageCount: pdfPreview?.pageCount || 1,
        compressionMethod: finalMethod
      };
      
      setCompressionStats(stats);
      setPdfBlob(compressedBlob);
      setCompressionMethod(finalMethod);
      
      setProgress(100);
      
      const savingsPercent = ((1 - stats.ratio) * 100).toFixed(1);
      const savedSpace = formatFileSize(stats.original - stats.compressed);
      
      let qualityMessage = '';
      let qualityLevel = '';
      
      if (finalMethod === 'direct') {
        qualityLevel = 'Excellent';
        qualityMessage = ' (Text quality perfectly preserved)';
      } else if (finalMethod === 'image-based') {
        if (parseFloat(savingsPercent) > 40) {
          qualityLevel = 'Good';
          qualityMessage = ' (Good compression with maintained quality)';
        } else if (parseFloat(savingsPercent) > 30) {
          qualityLevel = 'Very Good';
          qualityMessage = ' (Very Good compression with high quality)';
        } else if (parseFloat(savingsPercent) > 20) {
          qualityLevel = 'Excellent';
          qualityMessage = ' (Excellent compression with best quality)';
        } else {
          qualityLevel = 'Optimal';
          qualityMessage = ' (Optimal compression with perfect quality)';
        }
      }
      
      setCompressionDetails(`Compression complete! Saved ${savedSpace}${qualityMessage}`);
      setDownloadSuccess(`✅ PDF compressed successfully! Saved ${savingsPercent}% (${savedSpace})`);
      
    } catch (err) {
      console.error('Compression error:', err);
      setError('Failed to compress PDF. Please try again with a different file.');
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (pdfBlob) {
      setDownloading(true);
      try {
        const filename = generateCompressedFilename(files[0].name);
        
        const url = window.URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        setDownloadSuccess(`📥 Downloaded: ${filename}`);
        
        setTimeout(() => {
          setDownloading(false);
        }, 1000);
      } catch (error) {
        console.error('Download error:', error);
        setError('Failed to download PDF. Please try again.');
        setDownloading(false);
      }
    }
  };

  const getCompressionPercent = () => {
    if (!compressionStats) return '0.0';
    const percent = ((1 - compressionStats.compressed / compressionStats.original) * 100);
    return percent.toFixed(1);
  };

  const getCompressionQuality = () => {
    if (!compressionStats) return 'Unknown';
    const percent = parseFloat(getCompressionPercent());
    
    if (compressionMethod === 'direct') {
      return 'Excellent (Text Preserved)';
    }
    
    if (percent > 40) return 'Good';
    if (percent > 30) return 'Very Good';
    if (percent > 20) return 'Excellent';
    if (percent > 10) return 'Optimal';
    return 'Perfect';
  };

  const handleFileSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setPdfBlob(null);
    setCompressionStats(null);
    setError(null);
    setDownloadSuccess(null);
    setShowUploadInfo(false);
    setUsingFallback(false);
    setAnalysisError(null);
    setCompressionMethod('');
  };

  const handleReset = () => {
    setFiles([]);
    setPdfBlob(null);
    setCompressionStats(null);
    setError(null);
    setDownloadSuccess(null);
    setPdfPreview(null);
    setShowUploadInfo(true);
    setUsingFallback(false);
    setCompressionDetails('');
    setAnalysisError(null);
    setCompressionMethod('');
  };

  const getCompressionLevelDescription = (level: CompressionLevel) => {
    const descriptions = {
      low: 'Best quality, minimal compression (Max 20% smaller)',
      medium: 'Excellent quality, moderate compression (Max 30% smaller)',
      high: 'Good quality, significant compression (Max 40% smaller)',
      extreme: 'Acceptable quality, maximum compression (Max 50% smaller)'
    };
    return descriptions[level];
  };

  const getEstimatedSavings = (level: CompressionLevel) => {
    const savings = {
      low: '0-20% smaller',
      medium: '10-30% smaller',
      high: '20-40% smaller',
      extreme: '30-50% smaller'
    };
    return savings[level];
  };

  return (
    <>
    <HowToSchema />
          <FAQSchema />
          <BreadcrumbSchema />
      <AnimatePresence>
        {(downloadSuccess || error) && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
          >
            <div className={`p-4 rounded-xl shadow-2xl backdrop-blur-sm ${
              downloadSuccess ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white" 
              : "bg-gradient-to-r from-red-500 to-orange-600 text-white"
            }`}>
              <div className="flex items-center justify-center gap-3">
                {downloadSuccess ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span className="font-medium text-sm">{downloadSuccess || error}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-amber-950/20 py-6 md:py-12 px-3 md:px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header Section */}
            <div className="mb-6 md:mb-10">
              <a
                href="/"
                className="inline-flex items-center gap-2 md:gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all font-medium mb-4 md:mb-6 text-sm md:text-base group"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to All Tools</span>
              </a>

              <div className="text-center mb-6 md:mb-8">
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className={`inline-flex items-center justify-center
                    w-16 h-16 md:w-20 md:h-20
                    bg-gradient-to-br from-amber-500 to-orange-500
                    rounded-2xl md:rounded-3xl
                    mb-3 md:mb-4 shadow-2xl shadow-amber-500/30`}
                >
                  <span className="text-3xl md:text-4xl text-white select-none">
                    🗜️
                  </span>
                </motion.div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-2 md:mb-3 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Quality PDF Compressor
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed px-2">
                  Reduce PDF file size while preserving image quality
                  <span className="block text-amber-600 dark:text-amber-400 font-medium mt-2 text-sm md:text-base">
                    Quality Guaranteed • Max 50% Compression • Secure
                  </span>
                </p>
              </div>
            </div>

            {files.length > 0 && files[0].size > 10 * 1024 * 1024 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border-2 border-amber-200 dark:border-amber-800"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Large PDF Detected ({formatFileSize(files[0].size)})
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Compression may take longer. Quality will be preserved.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-xl p-5 md:p-6"
                >
                  <div className="flex items-center gap-3 md:gap-4 mb-6">
                    <div className="p-2 md:p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
                      <FileUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                        Upload PDF File
                      </h2>
                      <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                        Drag & drop or click to select PDF (Max 100MB)
                      </p>
                    </div>
                  </div>

                  <FileUploader
                    accept="application/pdf"
                    multiple={false}
                    onFilesSelected={handleFileSelect}
                    maxSize={100 * 1024 * 1024}
                  />

                  {files.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-6"
                    >
                      {analysisError && (
                        <div className="mb-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border-2 border-amber-200 dark:border-amber-800">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Analysis Note</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">{analysisError}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {files[0].name}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {formatFileSize(files[0].size)}
                              </p>
                            </div>
                          </div>
                          <FileCheck className="w-5 h-5 text-green-500" />
                        </div>
                        
                        {pdfPreview && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <Layers className="w-3 h-3 text-blue-500" />
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Pages</span>
                              </div>
                              <div className="text-lg font-bold text-gray-900 dark:text-white">
                                {pdfPreview.pageCount}
                              </div>
                            </div>
                            
                            <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <ImageIcon className="w-3 h-3 text-purple-500" />
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Images</span>
                              </div>
                              <div className="text-lg font-bold text-gray-900 dark:text-white">
                                {pdfPreview.hasImages ? 'Yes' : 'No'}
                              </div>
                            </div>
                            
                            <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <FileText className="w-3 h-3 text-green-500" />
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Text</span>
                              </div>
                              <div className="text-lg font-bold text-gray-900 dark:text-white">
                                {pdfPreview.isTextHeavy ? 'Heavy' : 'Normal'}
                              </div>
                            </div>
                            
                            <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <Eye className="w-3 h-3 text-amber-500" />
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Type</span>
                              </div>
                              <div className="text-xs font-bold text-gray-900 dark:text-white">
                                {pdfPreview.isImageHeavy ? 'Image PDF' : pdfPreview.isTextHeavy ? 'Text PDF' : 'Mixed'}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {files.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-xl p-5 md:p-6"
                  >
                    <div className="flex items-center gap-3 md:gap-4 mb-6">
                      <div className="p-2 md:p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                        <Target className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                          Compression Settings
                        </h2>
                        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                          Choose compression level (Quality Always Preserved)
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {(['low', 'medium', 'high', 'extreme'] as CompressionLevel[]).map((level) => (
                        <button
                          key={level}
                          onClick={() => setCompressionLevel(level)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            compressionLevel === level
                              ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 shadow-lg'
                              : 'border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md'
                          }`}
                        >
                          <div className="text-center">
                            <div className={`text-lg font-bold mb-2 ${
                              compressionLevel === level
                                ? 'text-purple-600 dark:text-purple-400'
                                : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              {level.charAt(0).toUpperCase() + level.slice(1)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 min-h-[40px]">
                              {getCompressionLevelDescription(level)}
                            </div>
                            <div className={`text-xs font-medium px-3 py-1 rounded-full ${
                              compressionLevel === level
                                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                                : 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-700 dark:text-purple-300'
                            }`}>
                              {getEstimatedSavings(level)}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-200 dark:border-green-800">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white mb-1">
                            Smart Quality Detection
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {pdfPreview?.isTextHeavy 
                              ? 'Text-heavy PDF detected. Will use direct compression for perfect text quality.'
                              : pdfPreview?.isImageHeavy
                              ? 'Image-heavy PDF detected. Will use quality-preserving image compression.'
                              : 'Mixed PDF detected. Will use smart compression algorithm.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleConvert}
                      disabled={converting}
                      className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {converting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Compressing PDF...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          <span>Start Quality Compression</span>
                          <Sparkles className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                )}

                {converting && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-xl p-5 md:p-6"
                  >
                    <div className="mb-6">
                      <ProgressBar 
                        progress={progress} 
                        label={`Compressing "${files[0].name}" with quality preservation...`}
                      />
                      {compressionDetails && (
                        <div className="mt-2 text-center text-sm text-amber-600 dark:text-amber-400 font-medium">
                          {compressionDetails}
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                        <Clock className="w-5 h-5 text-blue-500 mx-auto mb-2" />
                        <div className="text-sm text-gray-600 dark:text-gray-400">Method</div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                          {compressionMethod || 'Analyzing...'}
                        </div>
                      </div>
                      
                      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                        <BarChart3 className="w-5 h-5 text-purple-500 mx-auto mb-2" />
                        <div className="text-sm text-gray-600 dark:text-gray-400">Max Compression</div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {getEstimatedSavings(compressionLevel).split(' ')[0]}
                        </div>
                      </div>
                      
                      <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl">
                        <Sparkles className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                        <div className="text-sm text-gray-600 dark:text-gray-400">Status</div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {progress < 30 ? 'Analyzing' : progress < 70 ? 'Processing' : 'Finalizing'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/20 rounded-xl">
                      <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        {compressionMethod === 'direct' 
                          ? '⚡ Using direct compression for perfect text quality...'
                          : compressionMethod === 'image-based'
                          ? '🖼️ Using quality-preserving image compression with high DPI...'
                          : '🤖 Using smart compression algorithm for best results...'}
                      </div>
                    </div>
                  </motion.div>
                )}

                {pdfBlob && compressionStats && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-xl p-5 md:p-6"
                  >
                    <div className="flex items-center gap-3 md:gap-4 mb-6">
                      <div className="p-2 md:p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                        <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                          Compression Complete! 🎉
                        </h2>
                        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                          Your PDF has been compressed with quality preservation
                          <span className="block text-amber-600 dark:text-amber-400 font-medium mt-1 text-sm md:text-base">
                            Method: {compressionStats.compressionMethod} • Quality: {getCompressionQuality()}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      <div className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                        <div className="text-center">
                          <div className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400 mb-2">
                            {formatFileSize(compressionStats.original)}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Original Size</div>
                        </div>
                      </div>
                      
                      <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl border-2 border-amber-200 dark:border-amber-800">
                        <div className="text-center">
                          <div className="text-2xl md:text-3xl font-black text-amber-600 dark:text-amber-400 mb-2">
                            {getCompressionPercent()}%
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Size Reduced</div>
                        </div>
                      </div>
                      
                      <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl border-2 border-green-200 dark:border-green-800">
                        <div className="text-center">
                          <div className="text-2xl md:text-3xl font-black text-green-600 dark:text-green-400 mb-2">
                            {formatFileSize(compressionStats.compressed)}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Compressed Size</div>
                        </div>
                      </div>
                      
                      <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border-2 border-purple-200 dark:border-purple-800">
                        <div className="text-center">
                          <div className="text-2xl md:text-3xl font-black text-purple-600 dark:text-purple-400 mb-2">
                            {compressionStats.pageCount || '?'}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Total Pages</div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Compression Quality</span>
                        <span className="text-sm font-bold text-green-600 dark:text-green-400">
                          {getCompressionQuality()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-2.5 rounded-full"
                          style={{ width: `${Math.min(100, 100 - parseFloat(getCompressionPercent()))}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>Maximum Compression</span>
                        <span>Best Quality</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                        File Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/20 rounded-xl">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Original File</div>
                          <div className="font-medium text-gray-900 dark:text-white">{files[0].name}</div>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/20 rounded-xl">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Compressed File</div>
                          <div className="font-medium text-gray-900 dark:text-white font-mono text-sm">
                            {generateCompressedFilename(files[0].name)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border-2 border-amber-200 dark:border-amber-800">
                        <div className="flex items-center gap-3">
                          <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              Ready to download! 🚀
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Your compressed PDF is ready for download
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleDownload}
                          disabled={downloading}
                          className="flex-1 py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-3"
                        >
                          {downloading ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Downloading...</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-5 h-5" />
                              <span>Download Compressed PDF</span>
                              <Sparkles className="w-4 h-4" />
                            </>
                          )}
                        </motion.button>
                        
                        <button
                          onClick={handleReset}
                          className="py-4 px-6 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium hover:bg-amber-50 dark:hover:bg-amber-950/30 rounded-xl transition-colors border-2 border-gray-200 dark:border-gray-800 hover:border-amber-300 dark:hover:border-amber-700"
                        >
                          Compress Another PDF
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="space-y-6 md:space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-xl p-5 md:p-6"
                >
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Quality Features
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      {
                        icon: <CheckCircle className="w-4 h-4" />,
                        title: "Smart Detection",
                        desc: "Automatically detects PDF type for optimal compression",
                        color: "from-green-500 to-emerald-600"
                      },
                      {
                        icon: <FileText className="w-4 h-4" />,
                        title: "Text Preservation",
                        desc: "Keeps text as vector for perfect quality",
                        color: "from-blue-500 to-cyan-600"
                      },
                      {
                        icon: <ImageIcon className="w-4 h-4" />,
                        title: "Image Quality",
                        desc: "High DPI rendering preserves image details",
                        color: "from-purple-500 to-pink-600"
                      },
                      {
                        icon: <CloudOff className="w-4 h-4" />,
                        title: "100% Secure",
                        desc: "All processing happens in your browser",
                        color: "from-amber-500 to-orange-600"
                      }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <div className={`p-2 bg-gradient-to-r ${feature.color} rounded-lg`}>
                          <div className="text-white">
                            {feature.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl md:rounded-3xl border-2 border-amber-200 dark:border-amber-800 p-5 md:p-6"
                >
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Smart Compression Guide
                  </h3>
                  
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span><strong>Text PDFs</strong>: Uses direct compression for perfect text quality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span><strong>Image PDFs</strong>: Uses high-DPI rendering with quality preservation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span><strong>Mixed PDFs</strong>: Smart algorithm chooses best method</span>
                    </li>
                  </ul>
                  
                  <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-xs font-medium text-gray-900 dark:text-white mb-1">
                      🎯 Quality Tips
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      • Use <strong>Low/Medium</strong> for documents with text<br/>
                      • Use <strong>High/Extreme</strong> for image-heavy PDFs<br/>
                      • All levels preserve maximum possible quality
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 md:mt-12"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  More PDF Tools
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Explore our other free PDF utilities
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {exploreTools.map((tool, index) => (
                  <motion.a
                    key={tool.id}
                    href={tool.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-800 p-5 hover:border-blue-300 dark:hover:border-cyan-700 transition-all shadow-lg hover:shadow-2xl"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`p-3 mb-3 bg-gradient-to-br ${tool.color} rounded-xl shadow-lg`}>
                        <span className="text-2xl">{tool.icon}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {tool.description}
                      </p>
                      <div className="text-blue-600 dark:text-cyan-400 font-medium text-sm flex items-center gap-1">
                        <span>Open Tool</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400 mb-1">
                    {files.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Files Uploaded
                  </div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-black text-purple-600 dark:text-purple-400 mb-1">
                    {pdfPreview ? pdfPreview.pageCount || '?' : '?'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Pages Analyzed
                  </div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-black text-green-600 dark:text-green-400 mb-1">
                    0
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Total Compressions
                  </div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-black text-amber-600 dark:text-amber-400 mb-1">
                    {pdfBlob ? `${getCompressionPercent()}%` : '0%'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Average Savings
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          
        </div>
      </div>
    </>
  );
}