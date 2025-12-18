"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { 
  Download, 
  ArrowLeft, 
  CheckCircle, 
  FileText, 
  Image as ImageIcon, 
  Layers,
  ChevronRight,
  Sparkles,
  Zap,
  Edit,
  File,
  Tablet,
  SquareGanttChart,
  Clock,
  Shield,
  X,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Loader2,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Grid3x3,
  FolderOpen,
  FileImage,
  Check,
  Rotate3D,
  Trash2,
  Split,
  Smartphone,
  Users,
  Server,
  Cloud,
  Lock,
  Cpu,
  Battery,
  Wifi,
  Upload,
  Share2,
  Copy,
  Scissors,
  Type,
  PaintBucket,
  PenTool,
  Crop,
  Filter,
  Layers as LayersIcon,
  BookOpen,
  Printer,
  Mail,
  MessageSquare,
  Heart,
  Star,
  ThumbsUp,
  Award,
  Target,
  TrendingUp,
  HelpCircle,
  Info,
  AlertCircle,
  Bell,
  Search,
  Menu,
  MoreVertical,
  Plus,
  Minus,
  Sliders,
  ToggleLeft,
  ToggleRight,
  Sun,
  Moon,
  Volume2,
  Video,
  Music,
  Camera,
  Mic,
  Headphones,
  Gift,
  Coffee,
  Rocket,
  Plane,
  Car,
  Bike,
  Home,
  Building,
  MapPin,
  Navigation,
  Compass,
  Globe2,
  CloudRain,
  CloudSnow,
  Wind,
  Thermometer,
  Umbrella,
  Droplets,
  TreePine,
  Mountain,
  Flower2,
  Leaf,
  Bug,
  Cat,
  Dog,
  Fish,
  Bird,
  Rabbit,
  Turtle,
  Octagon,
  Hexagon,
  Circle,
  Square,
  Triangle,
  Pentagon,
  AlertTriangle,
  XCircle,
  XOctagon,
  XSquare,
  CheckSquare,
  CheckCircle2,
  CircleCheck,
  CircleX,
  SquareCheck,
  SquareX,
  Ban,
  StopCircle,
  PauseCircle,
  PlayCircle,
  SkipBack,
  SkipForward,
  Rewind,
  FastForward,
  Play,
  Pause,
  Repeat,
  Shuffle,
  Volume,
  VolumeX,
  MicOff,
  VideoOff,
  CameraOff,
  Phone,
  PhoneOff,
  PhoneCall,
  PhoneForwarded,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Voicemail,
  MessageCircle,
  MessageSquareDashed,
  MessageSquarePlus,
  Send,
  MailPlus,
  MailOpen,
  Inbox,
  Archive,
  ArchiveX,
  Bookmark,
  BookmarkPlus,
  BookmarkMinus,
  Tag,
  Tags,
  Hash,
  AtSign,
  Percent,
  DollarSign,
  Euro,
  PoundSterling,
  Bitcoin,
  CreditCard,
  Wallet,
  Receipt,
  Package,
  ShoppingCart,
  ShoppingBag,
  Store,
  Truck,
  Factory,
  Banknote,
  Coins,
  Gem,
  Crown,
  Trophy,
  Medal,
  Flag,
  Map,
  MapPinOff,
  Navigation2,
  Globe2 as Globe2Icon,
  CloudOff,
  CloudDrizzle,
  CloudLightning,
  CloudFog,
  Sunrise,
  Sunset,
  MoonStar,
  StarHalf,
  ZapOff,
  ThermometerSun,
  ThermometerSnowflake,
  UmbrellaOff,
  Droplet,
  DropletOff,
  Waves,
  Flame,
  Snowflake,
  CloudSun,
  CloudMoon,
  CloudSunRain,
  CloudMoonRain,
  CloudHail,
  CloudRainWind,
  ShieldCheck,
  ShieldAlert,
  ShieldOff,
  ShieldQuestion,
  ShieldX,
  LockKeyhole,
  LockOpen,
  Key,
  KeyRound,
  KeySquare,
  Fingerprint,
  EyeOff,
  QrCode,
  Scan,
  ScanFace,
  ScanLine,
  ScanText,
  Barcode,
  Radio,
  RadioTower,
  Satellite,
  SatelliteDish,
  Router,
  WifiOff,
  Bluetooth,
  BluetoothConnected,
  BluetoothOff,
  Cpu as CpuIcon,
  MemoryStick,
  HardDrive,
  HardDriveDownload,
  HardDriveUpload,
  Database,
  DatabaseBackup,
  ServerCog, 
  ServerCrash,
  ServerOff,
  Terminal,
  TerminalSquare,
  Code,
  Code2,
  Brackets,
  Braces,
  Parentheses,
  Variable,
  Sigma,
  Infinity,
  Pi,
  Copyright,
  Asterisk,
  Pilcrow,
  Section,
  List,
  ListChecks,
  ListOrdered,
  ListTodo,
  ListX,
  ListMinus,
  ListPlus,
  ListRestart,
  ListEnd,
  ListStart,
  ListTree,
  ListFilter,
  ListCollapse,
  ListVideo,
  ListMusic
} from "lucide-react";
import FileUploader from "@/app/components/FileUploader";
import ProgressBar from "@/app/components/ProgressBar";
import { downloadFile } from "../../utils/imageUtils";
import { PDFDocument, PDFPage, PDFImage } from "pdf-lib";

// Import pdfjs-dist with proper configuration
import * as pdfjsLib from "pdfjs-dist";

// Check if we're in browser before setting worker
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  } catch (error) {
    console.warn("Failed to set PDF.js worker source:", error);
  }
}

// Type declaration for pdf-lib with compress option
declare module "pdf-lib" {
  interface SaveOptions {
    compress?: boolean;
  }
}
// Page Info
type PageData = {
    pageNumber: number;
    fileName: string;
    isSelected: boolean;
    thumbnail?: string;
};

// --- TOOL KEYWORDS DATA ---
const toolKeywords = [
    { label: "PDF Page Remover", url: "/tool/pdf-page-remover" },
    { label: "Remove PDF Pages", url: "/tool/remove-pdf-pages" },
    { label: "Delete PDF Pages", url: "/tool/delete-pdf-pages" },
    { label: "PDF Splitter", url: "/tool/pdf-splitter" },
    { label: "PDF Editor", url: "/tool/pdf-editor" },
    { label: "PDF to JPG", url: "/tool/pdf-to-jpg" },
    { label: "PDF to PNG", url: "/tool/pdf-to-png" },
    { label: "PDF Rotator", url: "/tool/pdf-rotator" },
    { label: "PDF Creator", url: "/tool/pdf-creator" },
    { label: "PDF file", url: "/tool/pdf-viewer" },
    { label: "PDF converter", url: "/tool/pdf-converter" },
    { label: "Microsoft Word", url: "/tool/pdf-to-word" },
    { label: "Word", url: "/tool/word-converter" },
    { label: "Microsoft PowerPoint", url: "/tool/pdf-to-powerpoint" },
    { label: "Microsoft Excel", url: "/tool/pdf-to-excel" },
    { label: "PDF", url: "/tool/pdf-tools" },
];

// --- TOOL ICON HELPER FUNCTION ---
const getToolIcon = (label: string): React.ReactNode => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes("remove") || lowerLabel.includes("delete")) return <Trash2 className="w-5 h-5 text-white" />;
    if (lowerLabel.includes("split") || lowerLabel.includes("splitter")) return <Split className="w-5 h-5 text-white" />;
    if (lowerLabel.includes("editor") || lowerLabel.includes("edit")) return <Edit className="w-5 h-5 text-white" />;
    if (lowerLabel.includes("jpg") || lowerLabel.includes("png") || lowerLabel.includes("image")) return <ImageIcon className="w-5 h-5 text-white" />;
    if (lowerLabel.includes("rotate") || lowerLabel.includes("rotator")) return <Rotate3D className="w-5 h-5 text-white" />;
    if (lowerLabel.includes("word")) return <FileText className="w-5 h-5 text-white" />;
    if (lowerLabel.includes("powerpoint")) return <Layers className="w-5 h-5 text-white" />;
    if (lowerLabel.includes("excel")) return <SquareGanttChart className="w-5 h-5 text-white" />;
    if (lowerLabel.includes("converter") || lowerLabel.includes("creator")) return <Zap className="w-5 h-5 text-white" />;
    if (lowerLabel.includes("mobile app")) return <Tablet className="w-5 h-5 text-white" />;
    return <File className="w-5 h-5 text-white" />;
};

// --- TOOL DESCRIPTION HELPER FUNCTION ---
const getToolDescription = (label: string): string => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes("remove") || lowerLabel.includes("delete")) return "Remove specific pages from PDF documents easily.";
    if (lowerLabel.includes("split") || lowerLabel.includes("splitter")) return "Split PDF into multiple documents by page range.";
    if (lowerLabel.includes("editor") || lowerLabel.includes("edit")) return "Edit and modify your PDF documents easily.";
    if (lowerLabel.includes("rotate") || lowerLabel.includes("rotator")) return "Rotate PDF pages to any angle and save as new PDF.";
    if (lowerLabel.includes("jpg") || lowerLabel.includes("png") || lowerLabel.includes("image")) return "Convert PDF pages to high-quality JPG or PNG images.";
    if (lowerLabel.includes("word")) return "Convert PDF documents directly to editable DOCX format.";
    if (lowerLabel.includes("creator")) return "Combine multiple documents or images into a new PDF.";
    if (lowerLabel.includes("converter")) return "Convert files to/from PDF, including JPG, PNG, and more.";
    if (lowerLabel.includes("text editor")) return "Quickly edit text content within your PDF pages.";
    if (lowerLabel.includes("mobile app")) return "Dedicated tool for optimizing PDF tasks on the go.";
    if (lowerLabel.includes("powerpoint")) return "Convert PDF content into editable PPT/PPTX slides.";
    if (lowerLabel.includes("excel")) return "Export tables and data directly from PDF to XLSX format.";
    if (lowerLabel === "pdf file" || lowerLabel === "pdf") return "View, read, and manage your PDF documents easily.";
    return "Quickly process your document for immediate results.";
};

// PDF data interface
interface PdfData {
  base64: string;
  pageCount: number;
  fileName: string;
  fileSize: number;
}

// --- PDF PAGE RENDERER ---
interface PdfPageRendererProps {
  pageNumber: number;
  pdfData: PdfData | null;
  fileName: string;
  isSelected: boolean;
  onSelectionToggle?: () => void;
  onZoomClick?: () => void;
}

const PdfPageRenderer = ({ 
  pageNumber, 
  pdfData, 
  fileName, 
  isSelected,
  onSelectionToggle,
  onZoomClick 
}: PdfPageRendererProps) => {
  const [pageImage, setPageImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    
    const renderPage = async () => {
      if (!pdfData || !isMounted.current) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(false);
        
        const binaryString = atob(pdfData.base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        const loadingTask = pdfjsLib.getDocument({ data: bytes });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(pageNumber);
        
        const viewportWidth = Math.min(window.innerWidth * 0.15, 120);
        const scale = viewportWidth / page.getViewport({ scale: 1 }).width;
        const viewport = page.getViewport({ scale });
        
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        
        if (!context) {
          throw new Error("Could not get canvas context");
        }
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        
        await page.render(renderContext).promise;
        
        const imageUrl = canvas.toDataURL("image/jpeg", 0.6);
        
        if (isMounted.current) {
          setPageImage(imageUrl);
        }
        
      } catch (error) {
        console.error("Error rendering page:", error);
        if (isMounted.current) {
          setError(true);
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    renderPage();
    
    return () => {
      isMounted.current = false;
    };
  }, [pdfData, pageNumber]);

  const handleSelectionToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelectionToggle) {
      onSelectionToggle();
    }
  };

  return (
    <div 
      className={`w-full h-36 md:h-40 flex-shrink-0 rounded-lg shadow-md flex items-center justify-center border relative overflow-hidden cursor-pointer group transition-all duration-300 ${
        isSelected 
          ? 'bg-white dark:bg-gray-800 border-green-500 dark:border-green-600' 
          : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-red-500 dark:border-red-600'
      } ${!isSelected ? 'opacity-70' : ''}`}
      onClick={onZoomClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute top-2 left-2 z-30 flex items-center gap-1 transition-all duration-300`}>
        <button
          onClick={handleSelectionToggle}
          className={`p-1.5 rounded-full backdrop-blur-sm transition-all duration-200 ${
            isSelected 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' 
              : 'bg-black/70 hover:bg-black/90'
          }`}
          title={isSelected ? "Keep page" : "Remove page"}
        >
          {isSelected ? (
            <Check className="w-3 h-3 text-white" />
          ) : (
            <X className="w-3 h-3 text-white" />
          )}
        </button>
      </div>
      
      <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="p-1.5 bg-black/70 rounded-full backdrop-blur-sm">
          <ZoomIn className="w-3.5 h-3.5 text-white" />
        </div>
      </div>
      
      <div className={`absolute bottom-2 right-2 z-20 px-2 py-1 rounded text-sm font-bold ${
        isSelected 
          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
          : 'bg-gradient-to-r from-red-500 to-orange-600 text-white'
      }`}>
        {isSelected ? '✓' : '✗'}
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center p-2">
          <Loader2 className="w-7 h-7 animate-spin text-blue-600 dark:text-blue-400 mb-2" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Page {pageNumber}
          </span>
        </div>
      ) : error ? (
        <div className={`absolute inset-0 flex flex-col items-center justify-center p-2 ${
          isSelected 
            ? 'bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-green-900/20' 
            : 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-red-900/20'
        }`}>
          <span className="text-sm font-bold text-blue-800 dark:text-blue-300">
            Page
          </span>
          <span className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
            {pageNumber}
          </span>
        </div>
      ) : pageImage ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <img 
            src={pageImage} 
            alt={`Page ${pageNumber} of ${fileName}`}
            className="w-auto h-auto max-w-full max-h-full object-contain p-1 select-none transition-transform duration-300 group-hover:scale-105"
            draggable="false"
          />
        </div>
      ) : null}
    </div>
  );
};

// --- ZOOM MODAL COMPONENT - IMPROVED FOR DESKTOP SCROLLING ---
interface ZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageNumber: number;
  pdfData: PdfData | null;
  fileName: string;
}

const ZoomModal = ({ isOpen, onClose, pageNumber, pdfData, fileName }: ZoomModalProps) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pageImage, setPageImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    isMounted.current = true;
    
    const renderPageForZoom = async () => {
      if (!isOpen || !pdfData || !isMounted.current) return;

      try {
        setLoading(true);
        
        const binaryString = atob(pdfData.base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        const loadingTask = pdfjsLib.getDocument({ data: bytes });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(pageNumber);
        
        const baseScale = 2;
        const scale = baseScale * zoomLevel;
        const viewport = page.getViewport({ scale });
        
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        
        if (!context) return;
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;
        
        const imageUrl = canvas.toDataURL("image/png", 1.0);
        
        if (isMounted.current) {
          setPageImage(imageUrl);
        }
        
      } catch (error) {
        console.error("Error rendering zoom page:", error);
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    if (isOpen) {
      renderPageForZoom();
    }
    
    return () => {
      isMounted.current = false;
    };
  }, [isOpen, pdfData, pageNumber, zoomLevel]);

  // Mouse event handlers for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setStartY(e.pageY - containerRef.current.offsetTop);
    setScrollLeft(containerRef.current.scrollLeft);
    setScrollTop(containerRef.current.scrollTop);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const y = e.pageY - containerRef.current.offsetTop;
    const walkX = (x - startX) * 2;
    const walkY = (y - startY) * 2;
    containerRef.current.scrollLeft = scrollLeft - walkX;
    containerRef.current.scrollTop = scrollTop - walkY;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
    setZoomLevel(1);
    setIsFullscreen(false);
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    setStartX(touch.pageX - containerRef.current.offsetLeft);
    setStartY(touch.pageY - containerRef.current.offsetTop);
    setScrollLeft(containerRef.current.scrollLeft);
    setScrollTop(containerRef.current.scrollTop);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    e.preventDefault();
    const touch = e.touches[0];
    const x = touch.pageX - containerRef.current.offsetLeft;
    const y = touch.pageY - containerRef.current.offsetTop;
    const walkX = (x - startX) * 2;
    const walkY = (y - startY) * 2;
    containerRef.current.scrollLeft = scrollLeft - walkX;
    containerRef.current.scrollTop = scrollTop - walkY;
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isFullscreen ? 'bg-black' : 'bg-black/95 backdrop-blur-sm'
      }`}
      onClick={handleClose}
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-50 p-3 bg-black/80 rounded-full hover:bg-black transition-colors shadow-lg"
      >
        <X className="w-6 h-6 text-white" />
      </button>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/80 rounded-full px-4 py-2 backdrop-blur-sm z-50 shadow-lg">
        <button
          onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
          className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
          disabled={zoomLevel <= 0.5}
        >
          <ZoomOut className="w-5 h-5 text-white" />
        </button>
        
        <span className="text-white text-sm font-medium min-w-[60px] text-center">
          {Math.round(zoomLevel * 100)}%
        </span>
        
        <button
          onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
          className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
          disabled={zoomLevel >= 5}
        >
          <ZoomIn className="w-5 h-5 text-white" />
        </button>
        
        <div className="h-6 w-px bg-white/30 mx-1"></div>
        
        <button
          onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5 text-white" />
          ) : (
            <Maximize2 className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
      
      <div className="absolute top-4 left-4 z-50 bg-black/80 rounded-full px-4 py-2 backdrop-blur-sm shadow-lg">
        <span className="text-white text-sm font-medium">
          Page {pageNumber} • {fileName}
        </span>
      </div>
      
      {/* Scroll instructions */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 bg-black/80 rounded-full px-4 py-2 backdrop-blur-sm shadow-lg">
        <div className="flex items-center gap-2 text-white text-sm">
          <span>Ctrl+Scroll to zoom • Drag to pan</span>
        </div>
      </div>
      
      <motion.div
        ref={containerRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`relative ${isFullscreen ? 'w-full h-full' : 'w-[90vw] h-[80vh]'} overflow-auto`}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {loading ? (
          <div className="flex items-center justify-center w-full h-full">
            <Loader2 className="w-12 h-12 animate-spin text-white" />
          </div>
        ) : pageImage ? (
          <img
            ref={imageRef}
            src={pageImage}
            alt={`Zoomed view - Page ${pageNumber}`}
            className={`${isFullscreen ? 'min-w-full min-h-full' : 'min-w-[90vw] min-h-[80vh]'} object-contain transition-transform duration-300`}
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: '0 0'
            }}
            draggable="false"
          />
        ) : null}
      </motion.div>
    </motion.div>
  );
};

// Smart filename generator for removed PDF
const generatePdfFilename = (originalFilename: string): string => {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
  
  const cleanName = originalFilename
    .replace(/\.pdf$/i, '')
    .replace(/[^a-zA-Z0-9\s-_]/g, '')
    .substring(0, 30)
    .trim();
  
  return `${cleanName}_modified_${dateStr}_${timeStr}.pdf`;
};

// PDF Compression Function - FIXED WITH TYPE ASSERTION
const compressPdf = async (pdfBytes: Uint8Array): Promise<Uint8Array> => {
  try {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Optimize PDF settings with type assertion
    const optimizedBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      updateFieldAppearances: false,
      compress: true,
    } as any); // Type assertion to fix TypeScript error
    
    // Check if compression actually reduced size
    if (optimizedBytes.length >= pdfBytes.length) {
      console.log("Compression didn't reduce size, returning original");
      return pdfBytes;
    }
    
    return optimizedBytes;
  } catch (error) {
    console.warn("PDF compression failed, returning original:", error);
    return pdfBytes;
  }
};

export default function PdfPageRemoverTool() {
    const [files, setFiles] = useState<File[]>([]);
    const [processing, setProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [processed, setProcessed] = useState(false);
    const [pageData, setPageData] = useState<PageData[]>([]);
    const [pdfData, setPdfData] = useState<PdfData | null>(null);
    const [showUploadInfo, setShowUploadInfo] = useState(true);
    const [zoomModal, setZoomModal] = useState<{
      isOpen: boolean;
      pageNumber: number;
      fileName: string;
    }>({
      isOpen: false,
      pageNumber: 1,
      fileName: ''
    });

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8); // Default to mobile value
    const [downloadingAll, setDownloadingAll] = useState(false);
    const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [originalFileSize, setOriginalFileSize] = useState<number>(0);
    const [estimatedFileSize, setEstimatedFileSize] = useState<number>(0);
    const [optimizing, setOptimizing] = useState(false);
    const [compressionRatio, setCompressionRatio] = useState<number>(0);

    // Mobile detection and responsive items per page
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    
    useEffect(() => {
      const checkDevice = () => {
        const width = window.innerWidth;
        setIsMobile(width < 768);
        setIsTablet(width >= 768 && width < 1024);
        setIsDesktop(width >= 1024);
        
        // Set items per page based on device
        if (width < 768) {
          setItemsPerPage(8); // Mobile: 8 pages
        } else if (width < 1024) {
          setItemsPerPage(12); // Tablet: 12 pages
        } else {
          setItemsPerPage(10); // Desktop/Laptop: 20 pages
        }
      };
      
      checkDevice();
      window.addEventListener('resize', checkDevice);
      return () => window.removeEventListener('resize', checkDevice);
    }, []);

    // Calculate pagination
    const totalPages = Math.ceil(pageData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, pageData.length);
    const currentPageData = pageData.slice(startIndex, endIndex);

    // Calculate selected pages count
    const selectedPagesCount = pageData.filter(page => page.isSelected).length;

    // Update estimated file size when selection changes
    useEffect(() => {
      if (originalFileSize > 0 && pageData.length > 0) {
        const selectionRatio = selectedPagesCount / pageData.length;
        const compressionFactor = 0.85; // Assume 15% compression from optimization
        const estimatedSize = Math.round(originalFileSize * selectionRatio * compressionFactor);
        setEstimatedFileSize(estimatedSize);
        setCompressionRatio(Math.round((1 - (estimatedSize / originalFileSize)) * 100));
      }
    }, [selectedPagesCount, pageData.length, originalFileSize]);

    // Convert ArrayBuffer to base64 for storage
    const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
      const bytes = new Uint8Array(buffer);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    };

    // Load PDF and initialize page data AUTOMATICALLY when file is uploaded
    useEffect(() => {
      const loadPdf = async () => {
        if (files.length === 0) return;
        
        const file = files[0];
        setOriginalFileSize(file.size);
        setProcessing(true);
        setProgress(0);
        setShowUploadInfo(false);

        try {
          setProgress(20);
          
          const arrayBuffer = await file.arrayBuffer();
          const base64 = arrayBufferToBase64(arrayBuffer);

          setProgress(40);

          const pdfDoc = await PDFDocument.load(arrayBuffer);
          const pageCount = pdfDoc.getPageCount();

          setProgress(60);

          const newPageData: PageData[] = Array.from(
            { length: pageCount },
            (_, i) => ({
              pageNumber: i + 1,
              fileName: generatePdfFilename(file.name),
              isSelected: true,
            })
          );

          setProgress(80);

          setPageData(newPageData);
          setPdfData({ 
            base64, 
            pageCount, 
            fileName: file.name,
            fileSize: file.size 
          });
          
          const initialEstimatedSize = file.size * 0.85;
          setEstimatedFileSize(initialEstimatedSize);
          setCompressionRatio(Math.round((1 - (initialEstimatedSize / file.size)) * 100));
          
          setProgress(100);
          
          setTimeout(() => {
            setProcessed(true);
            setProcessing(false);
            setCurrentPage(1);
          }, 300);

        } catch (error) {
          console.error("PDF loading error:", error);
          alert("Failed to load PDF. Please make sure it's a valid PDF file.");
          setProcessing(false);
          setProgress(0);
        }
      };

      loadPdf();
    }, [files]);

    // Toggle page selection
    const togglePageSelection = (pageIndex: number) => {
        const updatedPageData = [...pageData];
        updatedPageData[pageIndex] = {
            ...updatedPageData[pageIndex],
            isSelected: !updatedPageData[pageIndex].isSelected
        };
        setPageData(updatedPageData);
    };

    // Select all pages
    const selectAllPages = () => {
        const updatedPageData = pageData.map(page => ({
            ...page,
            isSelected: true
        }));
        setPageData(updatedPageData);
        setDownloadSuccess(`✓ All ${pageData.length} pages selected`);
        setTimeout(() => setDownloadSuccess(null), 2000);
    };

    // Remove all pages (deselect all)
    const removeAllPages = () => {
        const updatedPageData = pageData.map(page => ({
            ...page,
            isSelected: false
        }));
        setPageData(updatedPageData);
        setDownloadSuccess(`✗ All ${pageData.length} pages removed`);
        setTimeout(() => setDownloadSuccess(null), 2000);
    };

    // Select even pages
    const selectEvenPages = () => {
        const updatedPageData = pageData.map((page, index) => ({
            ...page,
            isSelected: (index + 1) % 2 === 0
        }));
        setPageData(updatedPageData);
        setDownloadSuccess("✓ Even pages selected");
        setTimeout(() => setDownloadSuccess(null), 2000);
    };

    // Select odd pages
    const selectOddPages = () => {
        const updatedPageData = pageData.map((page, index) => ({
            ...page,
            isSelected: (index + 1) % 2 === 1
        }));
        setPageData(updatedPageData);
        setDownloadSuccess("✓ Odd pages selected");
        setTimeout(() => setDownloadSuccess(null), 2000);
    };

    // Download PDF with selected pages - WITH COMPRESSION FIXED
    const handleDownloadModifiedPdf = async () => {
        if (!pdfData || pageData.length === 0) {
            alert("PDF not available.");
            return;
        }

        if (selectedPagesCount === 0) {
            setDownloadSuccess("✗ Please select at least one page to keep");
            setTimeout(() => setDownloadSuccess(null), 3000);
            return;
        }

        setDownloadingAll(true);
        setDownloadProgress(0);
        setOptimizing(false);

        try {
          setDownloadProgress(10);
          
          const binaryString = atob(pdfData.base64);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
          }

          setDownloadProgress(10);
          const pdfDoc = await PDFDocument.load(bytes);
          const newPdf = await PDFDocument.create();

          const selectedPageIndices = pageData
              .filter(page => page.isSelected)
              .map(page => page.pageNumber - 1);

          setDownloadProgress(30);
          for (let i = 0; i < selectedPageIndices.length; i++) {
              const pageIndex = selectedPageIndices[i];
              const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);
              newPdf.addPage(copiedPage);
              
              const progress = 30 + Math.round(((i + 1) / selectedPageIndices.length) * 40);
              setDownloadProgress(progress);
              
              if (selectedPagesCount > 10) {
                await new Promise(resolve => setTimeout(resolve, 10));
              }
          }

          setOptimizing(true);
          setDownloadProgress(80);
          
          // First save without compression
          const pdfBytes = await newPdf.save({
            useObjectStreams: true,
            addDefaultPage: false,
            updateFieldAppearances: false,
          });

          // Apply compression
          setDownloadProgress(90);
          const compressedBytes = await compressPdf(
            pdfBytes instanceof Uint8Array ? pdfBytes : new Uint8Array(pdfBytes)
          );

   // Convert to ArrayBuffer for Blob
const buffer = new Uint8Array(compressedBytes).buffer;
const blob = new Blob([buffer], {
  type: "application/pdf",
});

          setDownloadProgress(95);
          const fileName = generatePdfFilename(files[0].name);
          downloadFile(blob, fileName);

          // Calculate actual size reduction
          const originalSizeMB = (pdfData.fileSize / (1024 * 1024)).toFixed(2);
          const newSizeMB = (blob.size / (1024 * 1024)).toFixed(2);
          const reduction = Math.round((1 - (blob.size / pdfData.fileSize)) * 100);

          // Update compression ratio
          setCompressionRatio(reduction);
          
          setDownloadSuccess(`✓ Downloaded! ${originalSizeMB}MB → ${newSizeMB}MB (${reduction}% smaller)`);
          setTimeout(() => setDownloadSuccess(null), 5000);

        } catch (error) {
          console.error("Error downloading modified PDF:", error);
          setDownloadSuccess("✗ Failed to generate PDF. Please try again.");
          setTimeout(() => setDownloadSuccess(null), 3000);
        } finally {
          setDownloadingAll(false);
          setDownloadProgress(0);
          setOptimizing(false);
        }
    };

    // Download individual page as PDF
    const handleDownloadPage = async (pageIndex: number) => {
        if (!pdfData) {
            alert("PDF not available.");
            return;
        }

        const statusElement = document.getElementById(`status-${pageIndex}`);
        if (statusElement) {
            statusElement.innerText = "Processing...";
            statusElement.className = "text-sm text-yellow-600 dark:text-yellow-400 mt-1 font-medium animate-pulse";
        }

        try {
            const binaryString = atob(pdfData.base64);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            const pdfDoc = await PDFDocument.load(bytes);
            const newPdf = await PDFDocument.create();

            const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);
            newPdf.addPage(copiedPage);

            // Apply compression to single page
            const pdfBytes = await newPdf.save({
              useObjectStreams: true,
              compress: true,
            } as any); // Type assertion to fix TypeScript error

            const blob = new Blob([new Uint8Array(pdfBytes)], {
                type: "application/pdf",
            });

            const fileName = `page_${pageIndex + 1}.pdf`;
            downloadFile(blob, fileName);

            setDownloadSuccess(`✓ Page ${pageIndex + 1} downloaded!`);
            setTimeout(() => setDownloadSuccess(null), 3000);

            if (statusElement) {
                statusElement.innerText = "✓ Downloaded!";
                statusElement.className = "text-sm text-green-600 dark:text-green-400 mt-1 font-medium";
            }

        } catch (error) {
            console.error(`Error downloading page ${pageIndex + 1}:`, error);
            setDownloadSuccess(`✗ Failed to download page ${pageIndex + 1}`);
            setTimeout(() => setDownloadSuccess(null), 3000);
            
            if (statusElement) {
                statusElement.innerText = "✗ Download failed";
                statusElement.className = "text-sm text-red-600 dark:text-red-400 mt-1 font-medium";
            }
        } finally {
            setTimeout(() => {
                if (statusElement) {
                    statusElement.innerText = "Ready to download";
                    statusElement.className = "text-sm text-blue-600 dark:text-blue-400 mt-1";
                }
            }, 2000);
        }
    };

    const handleFilesSelected = (newFiles: File[]) => {
        setFiles(newFiles);
        setProcessed(false);
        setPageData([]);
        setPdfData(null);
        setShowUploadInfo(false);
        setCurrentPage(1);
        setDownloadSuccess(null);
        setCompressionRatio(0);
    };

    const handleReset = () => {
        setFiles([]);
        setProcessed(false);
        setPageData([]);
        setPdfData(null);
        setProgress(0);
        setShowUploadInfo(true);
        setCurrentPage(1);
        setDownloadSuccess(null);
        setOriginalFileSize(0);
        setEstimatedFileSize(0);
        setCompressionRatio(0);
    };

    const handlePageZoom = (pageNumber: number, fileName: string) => {
        setZoomModal({
            isOpen: true,
            pageNumber,
            fileName
        });
    };

    // Pagination controls
    const goToPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        if (isMobile) {
            const pageGrid = document.getElementById('page-grid');
            if (pageGrid) {
                pageGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Items per page options - responsive
    const itemsPerPageOptions = isMobile ? [8, 12, 16] : 
                               isTablet ? [12, 16, 20] : 
                               [10, 20, 30];

    // Function to render pagination buttons with better UX
    const renderPaginationButtons = () => {
        const buttons = [];
        const maxVisibleButtons = isMobile ? 3 : 5;
        
        let startPage = 1;
        let endPage = totalPages;
        
        if (totalPages > maxVisibleButtons) {
            if (currentPage <= Math.ceil(maxVisibleButtons / 2)) {
                startPage = 1;
                endPage = maxVisibleButtons;
            } else if (currentPage >= totalPages - Math.floor(maxVisibleButtons / 2)) {
                startPage = totalPages - maxVisibleButtons + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - Math.floor(maxVisibleButtons / 2);
                endPage = currentPage + Math.floor(maxVisibleButtons / 2);
            }
        }

        
        
        // Previous button
        buttons.push(
            <button
                key="prev"
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-3 py-2 md:px-4 md:py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-base flex items-center gap-1"
            >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev</span>
            </button>
        );
        
        // First page button (if needed)
        if (startPage > 1) {
            buttons.push(
                <button
                    key={1}
                    onClick={() => goToPage(1)}
                    className={`px-3 py-2 md:px-4 md:py-2.5 rounded-xl font-bold transition-colors text-base ${
                        currentPage === 1
                            ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white'
                            : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                >
                    1
                </button>
            );
            
            if (startPage > 2) {
                buttons.push(
                    <span key="ellipsis-start" className="px-2 text-gray-500 dark:text-gray-400">
                        ...
                    </span>
                );
            }
        }
        
        // Page number buttons
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`px-3 py-2 md:px-4 md:py-2.5 rounded-xl font-bold transition-colors text-base min-w-[40px] ${
                        currentPage === i
                            ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white'
                            : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                >
                    {i}
                </button>
            );
        }
        
        // Last page button (if needed)
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                buttons.push(
                    <span key="ellipsis-end" className="px-2 text-gray-500 dark:text-gray-400">
                        ...
                    </span>
                );
            }
            
            buttons.push(
                <button
                    key={totalPages}
                    onClick={() => goToPage(totalPages)}
                    className={`px-3 py-2 md:px-4 md:py-2.5 rounded-xl font-bold transition-colors text-base ${
                        currentPage === totalPages
                            ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white'
                            : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                >
                    {totalPages}
                </button>
            );
        }
        
        // Next button
        buttons.push(
            <button
                key="next"
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-2 md:px-4 md:py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-base flex items-center gap-1"
            >
                <span className="hidden sm:inline">Next</span>
                <ChevronRightIcon className="w-4 h-4" />
            </button>
        );
        
        return buttons;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-red-950/20 py-8 md:py-12 lg:py-16">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Success Message Overlay */}
                    <AnimatePresence>
                        {downloadSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
                            >
                                <div className={`p-4 md:p-5 rounded-2xl shadow-2xl backdrop-blur-sm ${
                                    downloadSuccess.startsWith("✓") 
                                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white" 
                                        : "bg-gradient-to-r from-red-500 to-orange-600 text-white"
                                }`}>
                                    <div className="flex items-center justify-center gap-3">
                                        {downloadSuccess.startsWith("✓") ? (
                                            <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                                        ) : (
                                            <X className="w-5 h-5 md:w-6 md:h-6" />
                                        )}
                                        <span className="font-bold text-base md:text-lg">{downloadSuccess}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-12">
                        <a
                            href="/"
                            className="inline-flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all font-medium group"
                        >
                            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-base md:text-lg font-medium">Back to Tools</span>
                        </a>
                        
                        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-purple-950/30 px-4 py-2 md:px-5 md:py-2.5 rounded-full mt-2 md:mt-0">
                            <Shield className="w-4 h-4 md:w-5 md:h-5 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm md:text-base text-blue-700 dark:text-blue-300 font-medium">
                                Secure & Private • No Uploads
                            </span>
                        </div>
                    </div>

                    {/* Hero Section */}
                    <div className="text-center mb-10 md:mb-14 lg:mb-16">
                        <motion.div 
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-red-500 to-orange-600 rounded-3xl md:rounded-[2rem] mb-6 md:mb-8 shadow-2xl"
                        >
                            <Trash2 className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-white" />
                        </motion.div>
                        
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-4 md:mb-6 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent px-2">
                            PDF Page Remover
                        </h1>
                        
                        <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed px-4">
                            Remove unwanted pages from your PDF documents instantly.
                            <span className="block text-red-600 dark:text-red-400 font-bold mt-3 md:mt-4 text-xl md:text-2xl">
                                Select which pages to keep and download a clean PDF!
                            </span>
                        </p>
                    </div>

                    {/* Main Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-3xl md:rounded-[2rem] border-2 border-gray-200 dark:border-gray-800 shadow-2xl p-5 md:p-8 lg:p-10 mb-10 md:mb-14">
                        {/* Upload Section */}
                        <div className="mb-10 md:mb-14">
                            <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
                                <div className="p-3 md:p-4 bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-2xl">
                                    <FolderOpen className="w-7 h-7 md:w-9 md:h-9 text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                                        Upload Your PDF
                                    </h2>
                                    <p className="text-base md:text-lg lg:text-xl text-gray-500 dark:text-gray-400 mt-1">
                                        Select your PDF file (auto-processed after upload)
                                    </p>
                                </div>
                            </div>

                            {/* Upload Area with file name display */}
                            <div className="mb-6 md:mb-8">
                                <FileUploader
                                    accept="application/pdf"
                                    multiple={false}
                                    onFilesSelected={handleFilesSelected}
                                />

                                {files.length > 0 && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 p-4 md:p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl border border-green-200 dark:border-green-800/50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <File className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 truncate">
                                                    {files[0].name}
                                                </p>
                                                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                    {(files[0].size / (1024 * 1024)).toFixed(2)} MB • Processing...
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Features Grid */}
                            <AnimatePresence>
                                {showUploadInfo && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
                                    >
                                        <div className="p-5 md:p-7 lg:p-8 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 rounded-2xl md:rounded-3xl border border-red-200 dark:border-red-800/50">
                                            <div className="flex items-center gap-4 md:gap-5 mb-4">
                                                <Trash2 className="w-7 h-7 md:w-9 md:h-9 text-red-600 dark:text-red-400" />
                                                <span className="text-xl md:text-2xl font-bold text-red-800 dark:text-red-300">
                                                    Remove Pages
                                                </span>
                                            </div>
                                            <p className="text-base md:text-lg text-red-700/80 dark:text-red-400/80">
                                                Select and remove specific pages from your PDF document
                                            </p>
                                        </div>

                                        <div className="p-5 md:p-7 lg:p-8 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20 rounded-2xl md:rounded-3xl border border-orange-200 dark:border-orange-800/50">
                                            <div className="flex items-center gap-4 md:gap-5 mb-4">
                                                <Grid3x3 className="w-7 h-7 md:w-9 md:h-9 text-orange-600 dark:text-orange-400" />
                                                <span className="text-xl md:text-2xl font-bold text-orange-800 dark:text-orange-300">
                                                    Smart Compression
                                                </span>
                                            </div>
                                            <p className="text-base md:text-lg text-orange-700/80 dark:text-orange-400/80">
                                                Up to {compressionRatio}% size reduction with intelligent optimization
                                            </p>
                                        </div>

                                        <div className="p-5 md:p-7 lg:p-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-900/20 rounded-2xl md:rounded-3xl border border-green-200 dark:border-green-800/50">
                                            <div className="flex items-center gap-4 md:gap-5 mb-4">
                                                <Clock className="w-7 h-7 md:w-9 md:h-9 text-green-600 dark:text-green-400" />
                                                <span className="text-xl md:text-2xl font-bold text-green-800 dark:text-green-300">
                                                    Instant Processing
                                                </span>
                                            </div>
                                            <p className="text-base md:text-lg text-green-700/80 dark:text-green-400/80">
                                                Automatically loads after upload with preview
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Content Area */}
                        {files.length > 0 && (
                            <div className="space-y-6 md:space-y-10">
                                {/* File Size Info */}
                                {originalFileSize > 0 && (
                                    <div className="p-5 md:p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800/30">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <File className="w-6 h-6 text-blue-600" />
                                                <div>
                                                    <span className="text-lg font-bold text-blue-700 dark:text-blue-300">
                                                        File Size Analysis
                                                    </span>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                        See how much space you'll save
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 md:gap-6">
                                                <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-xl">
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">Original</div>
                                                    <div className="text-lg font-bold text-gray-700 dark:text-gray-300">
                                                        {(originalFileSize / (1024 * 1024)).toFixed(2)} MB
                                                    </div>
                                                </div>
                                                <div className="text-center p-3 bg-green-50 dark:bg-green-950/30 rounded-xl">
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">Estimated</div>
                                                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                                                        {(estimatedFileSize / (1024 * 1024)).toFixed(2)} MB
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <div className="flex justify-between text-base text-gray-600 dark:text-gray-400 mb-2">
                                                <span className="font-medium">Expected reduction:</span>
                                                <span className="font-bold text-red-600 dark:text-red-400">{compressionRatio}% smaller</span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                                <div 
                                                    className="h-3 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500"
                                                    style={{ width: `${100 - compressionRatio}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Processing State */}
                                <AnimatePresence mode="wait">
                                    {processing && !processed && (
                                        <motion.div
                                            key="converting"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="space-y-6 md:space-y-8"
                                        >
                                            <div className="text-center p-8 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-2xl border border-red-200 dark:border-red-800/30">
                                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                                    Loading PDF Document 📄
                                                </h3>
                                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
                                                    Processing {pageData.length} pages...
                                                </p>
                                            </div>
                                            
                                            <ProgressBar
                                                progress={progress}
                                                label={
                                                    progress < 40 
                                                    ? "Loading PDF..." 
                                                    : progress < 70 
                                                    ? "Analyzing pages..." 
                                                    : "Preparing editor..."
                                                }
                                            />
                                            
                                            <div className="flex justify-center">
                                                <div className="inline-flex items-center gap-3 px-6 py-3 bg-red-50 dark:bg-red-950/30 rounded-full">
                                                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-red-600 dark:text-red-400 animate-pulse" />
                                                    <span className="text-base md:text-lg text-red-700 dark:text-red-300 font-medium">
                                                        Preparing page selection editor
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Results */}
                                    {processed && (
                                        <motion.div
                                            key="results"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-8 md:space-y-12"
                                        >
                                            {/* Selection Summary Banner */}
                                            <div className="p-6 md:p-8 lg:p-10 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl md:rounded-3xl border-2 border-green-200 dark:border-green-800/50">
                                                <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                                                    <div className="flex items-center justify-center md:justify-start">
                                                        <div className="p-3 md:p-4 bg-green-100 dark:bg-green-900/50 rounded-2xl">
                                                            <CheckCircle className="w-9 h-9 md:w-12 md:h-12 text-green-600 dark:text-green-400" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 text-center md:text-left">
                                                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                                                            PDF Loaded Successfully! 🎉
                                                        </h3>
                                                        <p className="text-green-700 dark:text-green-300 font-bold text-lg md:text-xl mb-2">
                                                            {selectedPagesCount} of {pageData.length} pages selected
                                                        </p>
                                                        {originalFileSize > 0 && (
                                                            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg mb-3">
                                                                • Estimated size: {(estimatedFileSize / (1024 * 1024)).toFixed(2)}MB
                                                                • {compressionRatio}% size reduction
                                                            </p>
                                                        )}
                                                        <p className="text-gray-600 dark:text-gray-400 text-base">
                                                            Click on pages to select/deselect them
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-center gap-4">
                                                        <div className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl md:rounded-2xl text-lg md:text-xl">
                                                            {selectedPagesCount} Kept
                                                        </div>
                                                        <div className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold rounded-xl md:rounded-2xl text-lg md:text-xl">
                                                            {pageData.length - selectedPagesCount} Removed
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Batch Selection Controls */}
                                            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-red-200 dark:border-red-800/30">
                                                <h4 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                                    <Grid3x3 className="w-7 h-7 md:w-9 md:h-9 text-red-600" />
                                                    Batch Page Selection
                                                </h4>
                                                
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
                                                    <button
                                                        onClick={selectAllPages}
                                                        disabled={processing}
                                                        className="py-3 px-4 md:py-4 md:px-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-base md:text-lg"
                                                    >
                                                        <Check className="w-4 h-4 md:w-5 md:h-5" />
                                                        <span>Select All</span>
                                                    </button>
                                                    <button
                                                        onClick={removeAllPages}
                                                        disabled={processing}
                                                        className="py-3 px-4 md:py-4 md:px-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-base md:text-lg"
                                                    >
                                                        <X className="w-4 h-4 md:w-5 md:h-5" />
                                                        <span>Remove All</span>
                                                    </button>
                                                    <button
                                                        onClick={selectEvenPages}
                                                        disabled={processing}
                                                        className="py-3 px-4 md:py-4 md:px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-base md:text-lg"
                                                    >
                                                        <span className="text-lg font-bold">2</span>
                                                        <span>Even Pages</span>
                                                    </button>
                                                    <button
                                                        onClick={selectOddPages}
                                                        disabled={processing}
                                                        className="py-3 px-4 md:py-4 md:px-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-base md:text-lg"
                                                    >
                                                        <span className="text-lg font-bold">1</span>
                                                        <span>Odd Pages</span>
                                                    </button>
                                                </div>
                                                
                                                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 text-center">
                                                    Quick selection options for {pageData.length} pages
                                                </p>
                                            </div>

                                            {/* Page Grid - Optimized for many pages */}
                                            <div id="page-grid">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-3">
                                                    <div>
                                                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                                            <Grid3x3 className="w-7 h-7 md:w-9 md:h-9 text-red-500" />
                                                            Pages Preview
                                                        </h3>
                                                        <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 mt-1">
                                                            Showing {startIndex + 1}-{endIndex} of {pageData.length} pages
                                                            <span className="block md:inline md:ml-2">
                                                                ({selectedPagesCount} selected • {pageData.length - selectedPagesCount} to remove)
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-3 mt-2 md:mt-0">
                                                        <label className="text-base md:text-lg text-gray-700 dark:text-gray-300 font-medium">
                                                            Pages per view:
                                                        </label>
                                                        <select
                                                            value={itemsPerPage}
                                                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                                            className="px-3 py-1.5 md:px-4 md:py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm md:text-base"
                                                        >
                                                            {itemsPerPageOptions.map(option => (
                                                                <option key={option} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className={`grid ${
                                                    itemsPerPage <= 8 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' :
                                                    itemsPerPage <= 12 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' :
                                                    itemsPerPage <= 16 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' :
                                                    'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'
                                                } gap-4 md:gap-5`}>
                                                    {currentPageData.map((page, index) => {
                                                        const actualIndex = startIndex + index;
                                                        return (
                                                            <motion.div
                                                                key={page.pageNumber}
                                                                initial={{ opacity: 0, scale: 0.9 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                transition={{ delay: index * 0.02 }}
                                                                whileHover={{ y: -4 }}
                                                                className="group"
                                                            >
                                                                <div className={`bg-gradient-to-br rounded-2xl border-2 p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 ${
                                                                    page.isSelected
                                                                        ? 'from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-green-500 dark:border-green-600'
                                                                        : 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-red-500 dark:border-red-600'
                                                                }`}>
                                                                    <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                                                                        <PdfPageRenderer 
                                                                            pageNumber={page.pageNumber}
                                                                            pdfData={pdfData}
                                                                            fileName={page.fileName}
                                                                            isSelected={page.isSelected}
                                                                            onSelectionToggle={() => togglePageSelection(actualIndex)}
                                                                            onZoomClick={() => handlePageZoom(page.pageNumber, page.fileName)}
                                                                        />
                                                                        
                                                                        <div className="w-full">
                                                                            <h4 className="font-bold text-lg md:text-xl text-gray-900 dark:text-white">
                                                                                Page {page.pageNumber}
                                                                            </h4>
                                                                            <p className={`text-base md:text-lg font-medium mb-2 ${
                                                                                page.isSelected 
                                                                                    ? 'text-green-600 dark:text-green-400' 
                                                                                    : 'text-red-600 dark:text-red-400'
                                                                            }`}>
                                                                                {page.isSelected ? '✓ Keep' : '✗ Remove'}
                                                                            </p>
                                                                            
                                                                            <div className="grid grid-cols-2 gap-2">
                                                                                <button
                                                                                    onClick={() => togglePageSelection(actualIndex)}
                                                                                    className={`py-2 px-3 font-bold rounded-lg text-base transition-all ${
                                                                                        page.isSelected
                                                                                            ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                                                                                            : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                                                                                    }`}
                                                                                >
                                                                                    {page.isSelected ? 'Remove' : 'Keep'}
                                                                                </button>
                                                                                
                                                                                <button
                                                                                    onClick={() => handleDownloadPage(actualIndex)}
                                                                                    className="py-2 px-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg text-base transition-all"
                                                                                >
                                                                                    Download
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Bottom Pagination Controls */}
                                            {pageData.length > itemsPerPage && (
                                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl md:rounded-3xl p-4 md:p-6 border-2 border-blue-200 dark:border-blue-800/30">
                                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                                                        <div className="text-center sm:text-left">
                                                            <h4 className="font-bold text-lg md:text-xl text-gray-900 dark:text-white">
                                                                Page {currentPage} of {totalPages}
                                                            </h4>
                                                            <p className="text-base text-gray-600 dark:text-gray-400 mt-1">
                                                                Showing {itemsPerPage} pages per view
                                                            </p>
                                                        </div>
                                                        
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-base text-gray-700 dark:text-gray-300 font-medium">
                                                                Go to page:
                                                            </span>
                                                            <input
                                                                type="number"
                                                                min="1"
                                                                max={totalPages}
                                                                value={currentPage}
                                                                onChange={(e) => {
                                                                    const page = Math.min(Math.max(1, parseInt(e.target.value) || 1), totalPages);
                                                                    goToPage(page);
                                                                }}
                                                                className="w-16 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-center text-base"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Pagination Buttons - Bottom */}
                                                    <div className="flex flex-wrap items-center justify-center gap-2">
                                                        {renderPaginationButtons()}
                                                    </div>
                                                    
                                                    <div className="text-center mt-4">
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {isMobile ? "Mobile: 8 pages per view" : isTablet ? "Tablet: 12 pages per view" : "Desktop: 20 pages per view"}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Download Progress */}
                                            {(downloadingAll || optimizing) && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="p-6 md:p-8 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-2xl border-2 border-red-200 dark:border-red-800/30"
                                                >
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className="font-bold text-red-700 dark:text-red-300 text-lg">
                                                            {optimizing ? "Optimizing PDF..." : `Downloading ${downloadProgress}% complete`}
                                                        </span>
                                                        <span className="text-base text-gray-600 dark:text-gray-400">
                                                            {Math.round(downloadProgress / 100 * selectedPagesCount)} of {selectedPagesCount} pages
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${downloadProgress}%` }}
                                                            className="h-3 rounded-full bg-gradient-to-r from-red-500 to-orange-600"
                                                        />
                                                    </div>
                                                    <p className="text-base text-gray-600 dark:text-gray-400 mt-3">
                                                        {optimizing ? 
                                                            "Compressing PDF for smaller file size..." : 
                                                            "Please wait while modified PDF is being generated..."
                                                        }
                                                    </p>
                                                </motion.div>
                                            )}

                                            {/* Download Button Section */}
                                            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-2xl md:rounded-3xl p-8 md:p-10 border-2 border-red-200 dark:border-red-800/50">
                                                <div className="text-center mb-8">
                                                    <h4 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4">
                                                        Download Modified PDF
                                                    </h4>
                                                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6">
                                                        Download PDF with only selected pages (automatically compressed for smaller file size)
                                                    </p>
                                                    
                                                    {originalFileSize > 0 && (
                                                        <div className="mb-6 p-4 md:p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                                                            <div className="flex justify-between items-center mb-2">
                                                                <span className="text-base md:text-lg text-gray-600 dark:text-gray-400">
                                                                    Original size:
                                                                </span>
                                                                <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
                                                                    {(originalFileSize / (1024 * 1024)).toFixed(2)} MB
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between items-center mb-2">
                                                                <span className="text-base md:text-lg text-green-600 dark:text-green-400">
                                                                    Estimated new size:
                                                                </span>
                                                                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                                                                    {(estimatedFileSize / (1024 * 1024)).toFixed(2)} MB
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-base md:text-lg text-red-600 dark:text-red-400">
                                                                    Expected reduction:
                                                                </span>
                                                                <span className="text-lg font-bold text-red-600 dark:text-red-400">
                                                                    {compressionRatio}%
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    
                                                    <div className="space-y-4 md:space-y-6">
                                                        <motion.button
                                                            whileHover={{ scale: 1.03 }}
                                                            whileTap={{ scale: 0.97 }}
                                                            onClick={handleDownloadModifiedPdf}
                                                            disabled={downloadingAll || selectedPagesCount === 0}
                                                            className={`w-full py-4 md:py-5 px-6 md:px-8 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all text-lg md:text-xl flex items-center justify-center gap-3 md:gap-4 ${
                                                                selectedPagesCount === 0
                                                                    ? 'bg-gradient-to-r from-gray-500 to-gray-600'
                                                                    : 'bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700'
                                                            }`}
                                                        >
                                                            {downloadingAll ? (
                                                                <>
                                                                    <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
                                                                    <span>{optimizing ? "Compressing..." : "Processing..."}</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Download className="w-5 h-5 md:w-6 md:h-6" />
                                                                    <span>Download PDF ({selectedPagesCount} pages)</span>
                                                                </>
                                                            )}
                                                        </motion.button>
                                                    </div>
                                                    
                                                    <p className="text-base md:text-lg text-blue-600 dark:text-blue-400 font-medium mt-4">
                                                        {selectedPagesCount === 0 
                                                            ? "Select at least one page to download"
                                                            : "Ready to download compressed PDF"
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Reset & Another PDF */}
                                            <div className="text-center space-y-4">
                                                <button
                                                    onClick={handleReset}
                                                    className="inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-colors text-base md:text-lg"
                                                >
                                                    <FolderOpen className="w-5 h-5 md:w-6 md:h-6" />
                                                    Remove Pages from Another PDF
                                                </button>
                                                <p className="text-base md:text-lg text-gray-500 dark:text-gray-400">
                                                    All processing happens in your browser • No files are uploaded
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    {/* Zoom Modal */}
                    <ZoomModal
                        isOpen={zoomModal.isOpen}
                        onClose={() => setZoomModal({ ...zoomModal, isOpen: false })}
                        pageNumber={zoomModal.pageNumber}
                        pdfData={pdfData}
                        fileName={zoomModal.fileName}
                    />

                    {/* Enhanced Tools Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-10 md:mt-14 lg:mt-16 p-6 md:p-8 lg:p-10 bg-gradient-to-r from-white to-orange-50/50 dark:from-gray-900 dark:to-orange-950/20 rounded-2xl md:rounded-3xl border-2 border-orange-300/50 dark:border-orange-800/50 shadow-xl backdrop-blur-sm"
                    >
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 md:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-600">
                            Explore All PDF Tools 🚀
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {toolKeywords.map((tool, index) => (
                                <motion.div
                                    key={tool.label}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    whileHover={{ 
                                        scale: 1.02, 
                                        boxShadow: "0 10px 30px rgba(255, 80, 80, 0.25)",
                                        y: -3
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full"
                                >
                                    <a
                                        href={tool.url}
                                        className="flex items-center w-full p-4 md:p-5 
                                                 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
                                                 border border-gray-200 dark:border-gray-700 
                                                 rounded-xl hover:rounded-2xl
                                                 hover:border-orange-400 dark:hover:border-orange-500
                                                 transition-all duration-300 group
                                                 shadow-sm hover:shadow-lg"
                                    >
                                        {/* Icon */}
                                        <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12
                                                      flex items-center justify-center 
                                                      bg-gradient-to-br from-red-500 to-orange-600 
                                                      rounded-xl mr-3 md:mr-4
                                                      group-hover:scale-110 transition-transform duration-300">
                                            <span className="text-lg md:text-xl">
                                                {getToolIcon(tool.label)}
                                            </span>
                                        </div>
                                        
                                        {/* Text */}
                                        <div className="flex-1 min-w-0">
                                            <span className="text-base md:text-lg font-bold text-gray-800 dark:text-gray-200 
                                                           group-hover:text-orange-600 dark:group-hover:text-orange-400 
                                                           transition-colors duration-300 block truncate">
                                                {tool.label}
                                            </span>

                                            <span className="text-sm md:text-base text-gray-500 dark:text-gray-400 
                                                           mt-1 block line-clamp-2">
                                                {getToolDescription(tool.label)}
                                            </span>
                                        </div>
                                        
                                        {/* Arrow */}
                                        <div className="flex-shrink-0 ml-2">
                                            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 
                                              text-gray-400 group-hover:text-orange-500 
                                              group-hover:translate-x-1 transition-all duration-300" />
                                        </div>
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    
                </motion.div>
            </div>
        </div>
    );
}