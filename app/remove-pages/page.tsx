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
  Palette,
  ImagePlus,
  FileImage,
  Check,
  RotateCw,
  RotateCcw,
  Rotate3D,
  RefreshCw,
  Settings,
  Grid3x3,
  FolderOpen,
  FileArchive,
  Merge,
  Split,
  
  Eye,
  Smartphone,
  Monitor,
  Globe,
  Server,
  Cloud,
  Lock,
  Cpu,
  Battery,
  Wifi,
  Upload,
  Trash2,
  Share2,
  Copy,
  Scissors,
  Type,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
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
  Users,
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
  OctagonAlert,
  AlertTriangle,
  AlertOctagon,
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
  
  Bone, // All missing natural disaster, mythical, and server icons removed
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
  CurlyBraces,
  FunctionSquare,
  Variable,
  Sigma,
  Infinity,
  Pi,
  
  Copyright, // Registered, Trademark, and all Greek letters removed
  Asterisk,
  Pilcrow,
  Section,
  List, // Paragraph removed
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
import { PDFDocument } from "pdf-lib";

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

// Page Info
type PageData = {
    pageNumber: number;
    fileName: string;
    isSelected: boolean; // Whether page is included in final PDF
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
        
        // Convert base64 back to Uint8Array
        const binaryString = atob(pdfData.base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        // Load PDF document
        const loadingTask = pdfjsLib.getDocument({ data: bytes });
        const pdf = await loadingTask.promise;
        
        // Get specific page
        const page = await pdf.getPage(pageNumber);
        
        // Set viewport based on device width
        const viewportWidth = Math.min(window.innerWidth * 0.8, 400);
        const scale = viewportWidth / page.getViewport({ scale: 1 }).width;
        const viewport = page.getViewport({ scale });
        
        // Create canvas
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        
        if (!context) {
          throw new Error("Could not get canvas context");
        }
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        // Render page to canvas
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        
        await page.render(renderContext).promise;
        
        // Convert canvas to image URL
        const imageUrl = canvas.toDataURL("image/png", 0.8);
        
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
      if (pageImage) {
        URL.revokeObjectURL(pageImage);
      }
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
      className={`w-full h-48 sm:h-56 flex-shrink-0 rounded-xl shadow-lg flex items-center justify-center border-2 relative overflow-hidden cursor-pointer group transition-all duration-300 ${
        isSelected 
          ? 'bg-white dark:bg-gray-800 border-blue-500 dark:border-blue-600' 
          : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-gray-300 dark:border-gray-700'
      } ${!isSelected ? 'opacity-60' : ''}`}
      onClick={onZoomClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Selection controls */}
      <div className={`absolute top-2 left-2 z-30 flex items-center gap-1 transition-all duration-300`}>
        <button
          onClick={handleSelectionToggle}
          className={`p-1.5 rounded-full backdrop-blur-sm transition-all duration-300 ${
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
        {isHovered && (
          <span className="text-xs font-medium text-white bg-black/70 px-2 py-1 rounded-full whitespace-nowrap">
            {isSelected ? "Keep page" : "Remove page"}
          </span>
        )}
      </div>
      
      {/* Zoom overlay button */}
      <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="p-1.5 bg-black/70 rounded-full backdrop-blur-sm">
          <ZoomIn className="w-4 h-4 text-white" />
        </div>
      </div>
      
      {/* Selection indicator */}
      <div className={`absolute bottom-2 right-2 z-20 px-2 py-1 rounded-full text-xs font-medium ${
        isSelected 
          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
          : 'bg-gradient-to-r from-red-500 to-orange-600 text-white'
      }`}>
        {isSelected ? '✓ Keep' : '✗ Remove'}
      </div>
      
      {/* Tap hint for mobile */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 sm:hidden">
        <div className="px-2 py-1 bg-black/60 rounded-full backdrop-blur-sm">
          <span className="text-xs text-white">Tap to zoom</span>
        </div>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center p-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400 mb-2" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Loading page {pageNumber}...
          </span>
        </div>
      ) : error ? (
        <div className={`absolute inset-0 flex flex-col items-center justify-center p-4 ${
          isSelected 
            ? 'bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-green-900/20' 
            : 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-red-900/20'
        }`}>
          <span className="text-xs font-bold text-blue-800 dark:text-blue-300">
            Page
          </span>
          <span className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
            {pageNumber}
          </span>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Preview not available
          </p>
        </div>
      ) : pageImage ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <img 
            src={pageImage} 
            alt={`Page ${pageNumber} of ${fileName}`}
            className="w-auto h-auto max-w-full max-h-full object-contain p-2 select-none transition-transform duration-300"
            draggable="false"
          />
        </div>
      ) : null}
    </div>
  );
};

// --- ZOOM MODAL COMPONENT ---
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

  useEffect(() => {
    isMounted.current = true;
    
    const renderPageForZoom = async () => {
      if (!isOpen || !pdfData || !isMounted.current) return;

      try {
        setLoading(true);
        
        // Convert base64 back to Uint8Array for zoom
        const binaryString = atob(pdfData.base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        const loadingTask = pdfjsLib.getDocument({ data: bytes });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(pageNumber);
        
        // Calculate viewport with zoom
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
      if (pageImage) {
        URL.revokeObjectURL(pageImage);
      }
    };
  }, [isOpen, pdfData, pageNumber, zoomLevel]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
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

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isFullscreen ? 'bg-black' : 'bg-black/90 backdrop-blur-sm'
      }`}
      onClick={handleClose}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-50 p-2 bg-black/70 rounded-full hover:bg-black/90 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>
      
      {/* Zoom controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/70 rounded-full px-4 py-2 backdrop-blur-sm">
        <button
          onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          disabled={zoomLevel <= 0.5}
        >
          <ZoomOut className="w-5 h-5 text-white" />
        </button>
        
        <span className="text-white text-sm font-medium min-w-[60px] text-center">
          {Math.round(zoomLevel * 100)}%
        </span>
        
        <button
          onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          disabled={zoomLevel >= 3}
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
      
      {/* Page info */}
      <div className="absolute top-4 left-4 z-50 bg-black/70 rounded-full px-4 py-2 backdrop-blur-sm">
        <span className="text-white text-sm font-medium">
          Page {pageNumber} • {fileName}
        </span>
      </div>
      
      {/* Image container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`relative ${isFullscreen ? 'w-full h-full' : 'max-w-[90vw] max-h-[80vh]'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {loading ? (
          <div className="flex items-center justify-center w-full h-full">
            <Loader2 className="w-12 h-12 animate-spin text-white" />
          </div>
        ) : pageImage ? (
          <img
            src={pageImage}
            alt={`Zoomed view - Page ${pageNumber}`}
            className={`${isFullscreen ? 'w-full h-full' : 'w-auto h-auto'} object-contain rounded-lg shadow-2xl`}
            draggable="false"
          />
        ) : null}
      </motion.div>
      
      {/* Mobile gesture hints */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 sm:hidden">
        <div className="flex flex-col items-center gap-2 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <ZoomIn className="w-4 h-4" />
            </div>
            <span>Pinch to zoom</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <Maximize2 className="w-4 h-4" />
            </div>
            <span>Double tap for fullscreen</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <X className="w-4 h-4" />
            </div>
            <span>Swipe down to close</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Smart filename generator for removed PDF ---
const generatePdfFilename = (originalFilename: string): string => {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
  
  // Clean original filename
  const cleanName = originalFilename
    .replace(/\.pdf$/i, '')
    .replace(/[^a-zA-Z0-9\s-_]/g, '')
    .substring(0, 30)
    .trim();
  
  return `${cleanName}_modified_${dateStr}_${timeStr}.pdf`;
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
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [downloadingAll, setDownloadingAll] = useState(false);
    const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
    const [downloadProgress, setDownloadProgress] = useState(0);

    // Mobile detection
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Calculate pagination
    const totalPages = Math.ceil(pageData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, pageData.length);
    const currentPageData = pageData.slice(startIndex, endIndex);

    // Calculate selected pages count
    const selectedPagesCount = pageData.filter(page => page.isSelected).length;

    // Convert ArrayBuffer to base64 for storage
    const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
      const bytes = new Uint8Array(buffer);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    };

    // Load PDF and initialize page data
    const handleProcess = async () => {
        if (files.length === 0) return;

        setProcessing(true);
        setProgress(0);
        setShowUploadInfo(false);

        try {
            const file = files[0];

            // Simulate progress for better UX
            setProgress(20);
            await new Promise(resolve => setTimeout(resolve, 300));

            const arrayBuffer = await file.arrayBuffer();
            
            // Store as base64
            const base64 = arrayBufferToBase64(arrayBuffer);

            setProgress(40);
            await new Promise(resolve => setTimeout(resolve, 200));

            // Use PDF-lib for page count
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const pageCount = pdfDoc.getPageCount();

            setProgress(60);

            // Generate page data with initial selection true (all pages kept by default)
            const newPageData: PageData[] = Array.from(
                { length: pageCount },
                (_, i) => ({
                    pageNumber: i + 1,
                    fileName: generatePdfFilename(file.name),
                    isSelected: true, // All pages selected/kept by default
                })
            );

            setProgress(80);
            await new Promise(resolve => setTimeout(resolve, 200));

            setPageData(newPageData);
            setPdfData({ base64, pageCount });
            setProgress(100);
            
            setTimeout(() => {
                setProcessed(true);
                setProcessing(false);
                setCurrentPage(1); // Reset to first page
            }, 300);

        } catch (error) {
            console.error("PDF loading error:", error);
            alert("Failed to load PDF. Please make sure it's a valid PDF file.");
            setProcessing(false);
            setProgress(0);
        }
    };

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

    // Download PDF with selected pages
    const handleDownloadModifiedPdf = async () => {
        if (!pdfData || pageData.length === 0) {
            alert("PDF not available.");
            return;
        }

        // Check if at least one page is selected
        if (selectedPagesCount === 0) {
            setDownloadSuccess("✗ Please select at least one page to keep");
            setTimeout(() => setDownloadSuccess(null), 3000);
            return;
        }

        setDownloadingAll(true);
        setDownloadProgress(0);

        try {
            // Convert base64 back to Uint8Array
            const binaryString = atob(pdfData.base64);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            // Load original PDF
            const pdfDoc = await PDFDocument.load(bytes);
            const newPdf = await PDFDocument.create();

            // Add only selected pages
            const selectedPageIndices = pageData
                .filter(page => page.isSelected)
                .map(page => page.pageNumber - 1);

            for (let i = 0; i < selectedPageIndices.length; i++) {
                const pageIndex = selectedPageIndices[i];
                const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);
                newPdf.addPage(copiedPage);
                
                // Update progress
                const progress = Math.round(((i + 1) / selectedPageIndices.length) * 100);
                setDownloadProgress(progress);
                
                // Small delay for better UX
                await new Promise(resolve => setTimeout(resolve, 50));
            }

            // Save modified PDF
            const pdfBytes = await newPdf.save();
            const blob = new Blob([new Uint8Array(pdfBytes)], {
                type: "application/pdf",
            });

            const fileName = generatePdfFilename(files[0].name);
            downloadFile(blob, fileName);

            // Success message
            setDownloadSuccess(`✓ Successfully downloaded PDF with ${selectedPagesCount} pages!`);
            setTimeout(() => setDownloadSuccess(null), 5000);

        } catch (error) {
            console.error("Error downloading modified PDF:", error);
            setDownloadSuccess("✗ Failed to generate PDF. Please try again.");
            setTimeout(() => setDownloadSuccess(null), 3000);
        } finally {
            setDownloadingAll(false);
            setDownloadProgress(0);
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
            statusElement.className = "text-xs text-yellow-600 dark:text-yellow-400 mt-1 font-medium animate-pulse";
        }

        try {
            // Convert base64 back to Uint8Array
            const binaryString = atob(pdfData.base64);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            // Load original PDF
            const pdfDoc = await PDFDocument.load(bytes);
            const newPdf = await PDFDocument.create();

            // Copy the specific page
            const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);
            newPdf.addPage(copiedPage);

            // Save single page PDF
            const pdfBytes = await newPdf.save();
            const blob = new Blob([new Uint8Array(pdfBytes)], {
                type: "application/pdf",
            });

            const fileName = `page_${pageIndex + 1}.pdf`;
            downloadFile(blob, fileName);

            // Show success message
            setDownloadSuccess(`✓ Page ${pageIndex + 1} downloaded!`);
            setTimeout(() => setDownloadSuccess(null), 3000);

            if (statusElement) {
                statusElement.innerText = "✓ Downloaded!";
                statusElement.className = "text-xs text-green-600 dark:text-green-400 mt-1 font-medium";
            }

        } catch (error) {
            console.error(`Error downloading page ${pageIndex + 1}:`, error);
            setDownloadSuccess(`✗ Failed to download page ${pageIndex + 1}`);
            setTimeout(() => setDownloadSuccess(null), 3000);
            
            if (statusElement) {
                statusElement.innerText = "✗ Download failed";
                statusElement.className = "text-xs text-red-600 dark:text-red-400 mt-1 font-medium";
            }
        } finally {
            setTimeout(() => {
                if (statusElement) {
                    statusElement.innerText = "Ready to download";
                    statusElement.className = "text-xs text-blue-600 dark:text-blue-400 mt-1";
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
            if (isMobile) {
                const pageGrid = document.getElementById('page-grid');
                if (pageGrid) {
                    pageGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            if (isMobile) {
                const pageGrid = document.getElementById('page-grid');
                if (pageGrid) {
                    pageGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }
    };

    // Items per page options - responsive
    const itemsPerPageOptions = isMobile ? [4, 6, 8] : [6, 9, 12];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20 py-4 sm:py-8 md:py-12">
            <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
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
                                className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
                            >
                                <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl backdrop-blur-sm ${
                                    downloadSuccess.startsWith("✓") 
                                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white" 
                                        : "bg-gradient-to-r from-red-500 to-orange-600 text-white"
                                }`}>
                                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                                        {downloadSuccess.startsWith("✓") ? (
                                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                        ) : (
                                            <X className="w-4 h-4 sm:w-5 sm:h-5" />
                                        )}
                                        <span className="font-medium text-sm sm:text-base">{downloadSuccess}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Header - Responsive */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
                        <a
                            href="/"
                            className="inline-flex items-center gap-2 sm:gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all font-medium group"
                        >
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm sm:text-base">Back to Tools</span>
                        </a>
                        
                        <div className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-purple-950/30 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mt-2 md:mt-0">
                            <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                                Secure & Private
                            </span>
                        </div>
                    </div>

                    {/* Hero Section - Responsive */}
                    <div className="text-center mb-8 sm:mb-10 md:mb-12">
                        <motion.div 
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-xl sm:shadow-2xl"
                        >
                            <Trash2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </motion.div>
                        
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 sm:mb-4 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent px-2">
                            PDF Page Remover Tool
                        </h1>
                        
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
                            Remove unwanted pages from your PDF documents.
                            <span className="block text-red-600 dark:text-red-400 font-medium mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">
                                Select which pages to keep and download a clean PDF!
                            </span>
                        </p>
                    </div>

                    {/* Main Card - Responsive */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-xl sm:shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 mb-6 sm:mb-8">
                        {/* Upload Section */}
                        <div className="mb-6 sm:mb-8">
                            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                <div className="p-1.5 sm:p-2 bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-lg sm:rounded-xl">
                                    <FolderOpen className="w-4 h-4 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                                        Upload PDF
                                    </h2>
                                    <p className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400">
                                        Select your PDF file to remove pages
                                    </p>
                                </div>
                            </div>

                            <FileUploader
                                accept="application/pdf"
                                multiple={false}
                                onFilesSelected={handleFilesSelected}
                            />

                            {/* Features Grid - Responsive */}
                            <AnimatePresence>
                                {showUploadInfo && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4"
                                    >
                                        <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 rounded-lg sm:rounded-xl md:rounded-2xl border border-red-200 dark:border-red-800/50">
                                            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                                                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-red-600 dark:text-red-400" />
                                                <span className="text-xs sm:text-sm md:text-base font-semibold text-red-800 dark:text-red-300">
                                                    Remove Pages
                                                </span>
                                            </div>
                                            <p className="text-xs text-red-700/80 dark:text-red-400/80 mt-1 sm:mt-2">
                                                Select and remove specific pages
                                            </p>
                                        </div>
                                        
                                        <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20 rounded-lg sm:rounded-xl md:rounded-2xl border border-orange-200 dark:border-orange-800/50">
                                            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                                                <Grid3x3 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-orange-600 dark:text-orange-400" />
                                                <span className="text-xs sm:text-sm md:text-base font-semibold text-orange-800 dark:text-orange-300">
                                                    Batch Selection
                                                </span>
                                            </div>
                                            <p className="text-xs text-orange-700/80 dark:text-orange-400/80 mt-1 sm:mt-2">
                                                Select/deselect multiple pages at once
                                            </p>
                                        </div>
                                        
                                        <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-900/20 rounded-lg sm:rounded-xl md:rounded-2xl border border-green-200 dark:border-green-800/50">
                                            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                                                <Clock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-600 dark:text-green-400" />
                                                <span className="text-xs sm:text-sm md:text-base font-semibold text-green-800 dark:text-green-300">
                                                    Real-time Preview
                                                </span>
                                            </div>
                                            <p className="text-xs text-green-700/80 dark:text-green-400/80 mt-1 sm:mt-2">
                                                See page selection changes instantly
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Content Area */}
                        {files.length > 0 && (
                            <div className="space-y-4 sm:space-y-6 md:space-y-8">
                                {/* Selected File Info */}
                                <div className="p-3 sm:p-4 md:p-6 bg-gradient-to-r from-gray-50 to-red-50 dark:from-gray-800 dark:to-red-950/20 rounded-xl sm:rounded-2xl border-2 border-red-200 dark:border-red-800/30">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 md:gap-4">
                                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                                            <div className="p-1.5 sm:p-2 md:p-3 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md">
                                                <FileImage className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-red-600 dark:text-red-400" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg truncate">
                                                    {files[0].name}
                                                </h3>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    {(files[0].size / 1024 / 1024).toFixed(2)} MB • {pageData.length} pages
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleReset}
                                            className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 text-xs sm:text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg sm:rounded-xl transition-colors mt-2 sm:mt-0 w-full sm:w-auto"
                                        >
                                            Change File
                                        </button>
                                    </div>
                                </div>

                                {/* Processing State */}
                                <AnimatePresence mode="wait">
                                    {processing && !processed && (
                                        <motion.div
                                            key="converting"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="space-y-3 sm:space-y-4 md:space-y-6"
                                        >
                                            <div className="text-center">
                                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                                                    Loading PDF 📄
                                                </h3>
                                                <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">
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
                                                <div className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-red-50 dark:bg-red-950/30 rounded-full">
                                                    <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-red-600 dark:text-red-400 animate-pulse" />
                                                    <span className="text-xs sm:text-sm md:text-base text-red-700 dark:text-red-300">
                                                        Preparing page selection editor
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Process Button */}
                                    {!processed && !processing && (
                                        <motion.button
                                            key="convert"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleProcess}
                                            className="w-full py-2.5 sm:py-3 md:py-4 px-4 sm:px-5 md:px-6 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-1 sm:gap-2 md:gap-3"
                                        >
                                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                            <span>Load PDF for Page Removal</span>
                                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                                        </motion.button>
                                    )}

                                    {/* Results */}
                                    {processed && (
                                        <motion.div
                                            key="results"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-4 sm:space-y-6 md:space-y-8"
                                        >
                                            {/* Selection Summary Banner */}
                                            <div className="p-3 sm:p-4 md:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl sm:rounded-2xl border-2 border-green-200 dark:border-green-800/50">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 md:gap-4">
                                                    <div className="flex items-center justify-center sm:justify-start">
                                                        <div className="p-1.5 sm:p-2 md:p-3 bg-green-100 dark:bg-green-900/50 rounded-lg sm:rounded-xl">
                                                            <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-green-600 dark:text-green-400" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 text-center sm:text-left">
                                                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                            PDF Loaded Successfully! 🎉
                                                        </h3>
                                                        <p className="text-green-700 dark:text-green-300 font-medium text-xs sm:text-sm md:text-base">
                                                            {selectedPagesCount} of {pageData.length} pages selected
                                                        </p>
                                                        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1">
                                                            Click on pages to select/deselect them
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <div className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base">
                                                            {selectedPagesCount} Selected
                                                        </div>
                                                        <div className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base">
                                                            {pageData.length - selectedPagesCount} Removed
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Batch Selection Controls - Responsive */}
                                            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-red-200 dark:border-red-800/30">
                                                <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2">
                                                    <Grid3x3 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                                                    Batch Page Selection
                                                </h4>
                                                
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
                                                    <button
                                                        onClick={selectAllPages}
                                                        disabled={processing}
                                                        className="py-1.5 sm:py-2 px-2 sm:px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                                                    >
                                                        <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                                                        <span className="truncate">Select All</span>
                                                    </button>
                                                    <button
                                                        onClick={removeAllPages}
                                                        disabled={processing}
                                                        className="py-1.5 sm:py-2 px-2 sm:px-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                                                    >
                                                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                                                        <span className="truncate">Remove All</span>
                                                    </button>
                                                    <button
                                                        onClick={selectEvenPages}
                                                        disabled={processing}
                                                        className="py-1.5 sm:py-2 px-2 sm:px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                                                    >
                                                        <span className="text-xs font-bold">2</span>
                                                        <span className="truncate">Even Pages</span>
                                                    </button>
                                                    <button
                                                        onClick={selectOddPages}
                                                        disabled={processing}
                                                        className="py-1.5 sm:py-2 px-2 sm:px-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                                                    >
                                                        <span className="text-xs font-bold">1</span>
                                                        <span className="truncate">Odd Pages</span>
                                                    </button>
                                                </div>
                                                
                                                <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 text-center">
                                                    Quick selection options for {pageData.length} pages
                                                </p>
                                            </div>

                                            {/* Pagination Controls - Responsive */}
                                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-blue-200 dark:border-blue-800/30">
                                                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">
                                                            Showing {startIndex + 1}-{endIndex} of {pageData.length} pages
                                                        </h4>
                                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                                            {selectedPagesCount} pages selected • {pageData.length - selectedPagesCount} pages will be removed
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-2 sm:gap-3">
                                                        <label className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                                                            Items per page:
                                                        </label>
                                                        <select
                                                            value={itemsPerPage}
                                                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                                            className="px-2 py-1 sm:px-3 sm:py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-xs sm:text-sm"
                                                        >
                                                            {itemsPerPageOptions.map(option => (
                                                                <option key={option} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                {/* Pagination Buttons */}
                                                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                                                    <button
                                                        onClick={prevPage}
                                                        disabled={currentPage === 1}
                                                        className="px-2 py-1 sm:px-3 sm:py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs sm:text-sm"
                                                    >
                                                        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    </button>
                                                    
                                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                        let pageNum;
                                                        if (totalPages <= 5) {
                                                            pageNum = i + 1;
                                                        } else if (currentPage <= 3) {
                                                            pageNum = i + 1;
                                                        } else if (currentPage >= totalPages - 2) {
                                                            pageNum = totalPages - 4 + i;
                                                        } else {
                                                            pageNum = currentPage - 2 + i;
                                                        }
                                                        
                                                        return (
                                                            <button
                                                                key={pageNum}
                                                                onClick={() => goToPage(pageNum)}
                                                                className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                                                                    currentPage === pageNum
                                                                        ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white'
                                                                        : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                                }`}
                                                            >
                                                                {pageNum}
                                                            </button>
                                                        );
                                                    })}
                                                    
                                                    <button
                                                        onClick={nextPage}
                                                        disabled={currentPage === totalPages}
                                                        className="px-2 py-1 sm:px-3 sm:py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs sm:text-sm"
                                                    >
                                                        <ChevronRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Download Progress */}
                                            {downloadingAll && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="p-3 sm:p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-xl border-2 border-red-200 dark:border-red-800/30"
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-medium text-red-700 dark:text-red-300 text-xs sm:text-sm">
                                                            Downloading {downloadProgress}% complete
                                                        </span>
                                                        <span className="text-xs text-gray-600 dark:text-gray-400">
                                                            {Math.round(downloadProgress / 100 * selectedPagesCount)} of {selectedPagesCount} pages
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${downloadProgress}%` }}
                                                            className="h-1.5 sm:h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-600"
                                                        />
                                                    </div>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">
                                                        Please wait while modified PDF is being generated...
                                                    </p>
                                                </motion.div>
                                            )}

                                            {/* Page Grid */}
                                            <div id="page-grid">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 md:mb-6 gap-1 sm:gap-2">
                                                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-1 sm:gap-2 md:gap-3">
                                                        <Grid3x3 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-500" />
                                                        Pages (Page {currentPage} of {totalPages})
                                                    </h3>
                                                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                                                        {isMobile ? "Tap to select/deselect" : "Click to select/deselect"} • Click to zoom
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                                                    {currentPageData.map((page, index) => {
                                                        const actualIndex = startIndex + index;
                                                        return (
                                                            <motion.div
                                                                key={page.pageNumber}
                                                                initial={{ opacity: 0, scale: 0.9 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                transition={{ delay: index * 0.05 }}
                                                                whileHover={{ y: -2 }}
                                                                className="group"
                                                            >
                                                                <div className={`bg-gradient-to-br rounded-xl sm:rounded-2xl border-2 p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 ${
                                                                    page.isSelected
                                                                        ? 'from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-green-500 dark:border-green-600'
                                                                        : 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-red-500 dark:border-red-600'
                                                                }`}>
                                                                    <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 md:space-y-4">
                                                                        <PdfPageRenderer 
                                                                            pageNumber={page.pageNumber}
                                                                            pdfData={pdfData}
                                                                            fileName={page.fileName}
                                                                            isSelected={page.isSelected}
                                                                            onSelectionToggle={() => togglePageSelection(actualIndex)}
                                                                            onZoomClick={() => handlePageZoom(page.pageNumber, page.fileName)}
                                                                        />
                                                                        
                                                                        <div className="w-full">
                                                                            <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg mb-1">
                                                                                Page {page.pageNumber}
                                                                            </h4>
                                                                            <p className={`text-xs truncate mb-1 sm:mb-2 md:mb-3 ${
                                                                                page.isSelected 
                                                                                    ? 'text-green-600 dark:text-green-400' 
                                                                                    : 'text-red-600 dark:text-red-400'
                                                                            }`}>
                                                                                {page.isSelected ? '✓ Selected (Will be kept)' : '✗ Removed (Will be deleted)'}
                                                                            </p>
                                                                            <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                                                                                <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs rounded-full ${
                                                                                    page.isSelected 
                                                                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                                                                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                                                                }`}>
                                                                                    {page.isSelected ? 'Keep' : 'Remove'}
                                                                                </span>
                                                                            </div>
                                                                            
                                                                            <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
                                                                                <span
                                                                                    id={`status-${actualIndex}`}
                                                                                    className="text-xs text-blue-600 dark:text-blue-400 font-medium"
                                                                                >
                                                                                    Ready to download
                                                                                </span>
                                                                                
                                                                                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                                                                                    <motion.button
                                                                                        whileHover={{ scale: 1.02 }}
                                                                                        whileTap={{ scale: 0.98 }}
                                                                                        onClick={() => togglePageSelection(actualIndex)}
                                                                                        className={`py-1.5 sm:py-2 px-2 sm:px-3 font-bold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-0.5 sm:gap-1 text-xs sm:text-sm ${
                                                                                            page.isSelected
                                                                                                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                                                                                                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                                                                                        }`}
                                                                                    >
                                                                                        {page.isSelected ? (
                                                                                            <>
                                                                                                <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                                                                                Remove
                                                                                            </>
                                                                                        ) : (
                                                                                            <>
                                                                                                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                                                                                Keep
                                                                                            </>
                                                                                        )}
                                                                                    </motion.button>
                                                                                    
                                                                                    <motion.button
                                                                                        whileHover={{ scale: 1.02 }}
                                                                                        whileTap={{ scale: 0.98 }}
                                                                                        onClick={() => handleDownloadPage(actualIndex)}
                                                                                        className="py-1.5 sm:py-2 px-2 sm:px-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-0.5 sm:gap-1 text-xs sm:text-sm"
                                                                                    >
                                                                                        <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                                                                        Download
                                                                                    </motion.button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Download Button Section - Responsive */}
                                            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 border-2 border-red-200 dark:border-red-800/50">
                                                <div className="text-center mb-3 sm:mb-4 md:mb-6">
                                                    <h4 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-1 sm:mb-2">
                                                        Download Modified PDF
                                                    </h4>
                                                    <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                                                        Download PDF with only selected pages
                                                    </p>
                                                    
                                                    <div className="space-y-3 sm:space-y-4">
                                                        <motion.button
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            onClick={handleDownloadModifiedPdf}
                                                            disabled={downloadingAll || selectedPagesCount === 0}
                                                            className={`w-full py-2.5 sm:py-3 md:py-4 px-4 sm:px-5 md:px-6 text-white font-bold rounded-lg sm:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 ${
                                                                selectedPagesCount === 0
                                                                    ? 'bg-gradient-to-r from-gray-500 to-gray-600'
                                                                    : 'bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700'
                                                            }`}
                                                        >
                                                            {downloadingAll ? (
                                                                <>
                                                                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                                                    <span>Processing...</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Download className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                                                    <span>Download PDF ({selectedPagesCount} pages)</span>
                                                                </>
                                                            )}
                                                        </motion.button>
                                                        
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                                            <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-green-200 dark:border-green-700">
                                                                <h5 className="font-bold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm">
                                                                    Pages Kept
                                                                </h5>
                                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                                    {selectedPagesCount} pages will be included
                                                                </p>
                                                            </div>
                                                            
                                                            <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-red-200 dark:border-red-700">
                                                                <h5 className="font-bold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm">
                                                                    Pages Removed
                                                                </h5>
                                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                                    {pageData.length - selectedPagesCount} pages will be excluded
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <p id="status-all-1" className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium mt-2 sm:mt-3">
                                                        {selectedPagesCount === 0 
                                                            ? "Select at least one page to download"
                                                            : "Ready to download modified PDF"
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Reset & Another PDF */}
                                            <div className="text-center space-y-2 sm:space-y-3">
                                                <button
                                                    onClick={handleReset}
                                                    className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm md:text-base"
                                                >
                                                    <FolderOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    Remove Pages from Another PDF
                                                </button>
                                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
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

                    {/* Enhanced Tools Section - Responsive */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 sm:mt-8 md:mt-12 p-3 sm:p-4 md:p-6 lg:p-8 bg-gradient-to-r from-white to-orange-50/50 dark:from-gray-900 dark:to-orange-950/20 rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-orange-300/50 dark:border-orange-800/50 shadow-lg sm:shadow-xl md:shadow-2xl backdrop-blur-sm"
                    >
                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-600 px-2">
                            Explore All PDF Tools 🚀
                        </h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                            {toolKeywords.map((tool, index) => (
                                <motion.div
                                    key={tool.label}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    whileHover={{ 
                                        scale: 1.02, 
                                        boxShadow: "0 10px 30px rgba(255, 80, 80, 0.25)",
                                        y: -2
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full"
                                >
                                    <a
                                        href={tool.url}
                                        className="flex items-center justify-start w-full p-2 sm:p-3 md:p-4 lg:p-5 
                                                 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
                                                 border border-gray-200 dark:border-gray-700 
                                                 rounded-lg sm:rounded-xl md:rounded-2xl hover:border-orange-400 dark:hover:border-orange-500
                                                 transition-all duration-300 group
                                                 shadow-sm hover:shadow-lg"
                                    >
                                        <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 
                                                      flex items-center justify-center 
                                                      bg-gradient-to-br from-red-500 to-orange-600 
                                                      rounded-lg sm:rounded-xl mr-1 sm:mr-2 md:mr-3 lg:mr-4
                                                      group-hover:scale-105 transition-transform duration-300">
                                            <span className="text-xs sm:text-sm md:text-base lg:text-lg">
                                                {getToolIcon(tool.label)}
                                            </span>
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <span className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 dark:text-gray-200 
                                                           group-hover:text-orange-600 dark:group-hover:text-orange-400 
                                                           transition-colors duration-300 block truncate">
                                                {tool.label}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 block line-clamp-2">
                                                {getToolDescription(tool.label)}
                                            </span>
                                        </div>
                                        
                                        <div className="flex-shrink-0 ml-0.5 sm:ml-1 md:ml-2">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-orange-500 
                                                          group-hover:translate-x-0.5 sm:group-hover:translate-x-1 transition-all duration-300" 
                                                 fill="none" 
                                                 stroke="currentColor" 
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" 
                                                      strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                        
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-4 sm:mt-6 md:mt-8 text-center"
                        >
                            <button className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-gradient-to-r from-red-600 to-orange-600 
                                             text-white font-medium rounded-full sm:rounded-xl md:rounded-2xl
                                             hover:from-red-700 hover:to-orange-700
                                             active:scale-95 transition-all duration-300
                                             shadow-lg hover:shadow-xl
                                             text-xs sm:text-sm md:text-base">
                                View All Tools ({toolKeywords.length}+)
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Discover More Tools - Responsive */}
                    <section className="mt-6 sm:mt-8 md:mt-12 lg:mt-16 bg-white dark:bg-gray-900 px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6 lg:py-8 rounded-xl sm:rounded-2xl border border-black/10 shadow-sm">
                        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-black dark:text-white mb-3 sm:mb-4 md:mb-6">
                            Discover More Tools
                        </h2>

                        <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
                            <a href="/pdf-to-word" 
                               className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-3 bg-blue-50 text-blue-600 font-medium rounded-full hover:bg-blue-100 transition text-xs sm:text-sm md:text-base">
                                PDF to Word
                            </a>

                            <a href="/merge-pdf"
                               className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-3 bg-blue-50 text-blue-600 font-medium rounded-full hover:bg-blue-100 transition text-xs sm:text-sm md:text-base">
                                Merge PDF
                            </a>

                            <a href="/split-pdf"
                               className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-3 bg-blue-50 text-blue-600 font-medium rounded-full hover:bg-blue-100 transition text-xs sm:text-sm md:text-base">
                                Split PDF
                            </a>

                            <a href="/compress-pdf"
                               className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-3 bg-blue-50 text-blue-600 font-medium rounded-full hover:bg-blue-100 transition text-xs sm:text-sm md:text-base">
                                Compress PDF
                            </a>
                        </div>
                    </section>

                    {/* Info Footer - Responsive */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 text-center mt-6 sm:mt-8 md:mt-12">
                        <div className="p-2 sm:p-3 md:p-4">
                            <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-lg sm:rounded-xl md:rounded-2xl mb-1.5 sm:mb-2 md:mb-3">
                                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-600 dark:text-red-400" />
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                                Selective Removal
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Choose exactly which pages to keep or remove
                            </p>
                        </div>
                        
                        <div className="p-2 sm:p-3 md:p-4">
                            <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-lg sm:rounded-xl md:rounded-2xl mb-1.5 sm:mb-2 md:mb-3">
                                <Shield className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                                Batch Selection
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Select/deselect multiple pages with one click
                            </p>
                        </div>
                        
                        <div className="p-2 sm:p-3 md:p-4">
                            <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-lg sm:rounded-xl md:rounded-2xl mb-1.5 sm:mb-2 md:mb-3">
                                <Download className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                                Clean PDF Output
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Download PDF with only your selected pages
                            </p>
                        </div>
                    </div>

                    {/* Mobile Tips Banner */}
                    {isMobile && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-3 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-xl border-2 border-red-200 dark:border-red-800/30"
                        >
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                <Smartphone className="w-4 h-4 text-red-600" />
                                Mobile Tips
                            </h4>
                            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-600">•</span>
                                    <span>Tap on pages to select/deselect them</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-600">•</span>
                                    <span>Use batch selection for multiple pages</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-600">•</span>
                                    <span>Pinch to zoom in page preview</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-600">•</span>
                                    <span>At least one page must be selected</span>
                                </li>
                            </ul>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}