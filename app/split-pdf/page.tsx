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
  Bone,
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
  Infinity as InfinityIcon,
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
import { PDFDocument, degrees } from "pdf-lib";

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

// Page Info with rotation
type PageData = {
    pageNumber: number;
    fileName: string;
    rotation: number; // 0, 90, 180, 270 degrees
    selected: boolean;
};

// --- TOOL KEYWORDS DATA ---
const toolKeywords = [
    { label: "PDF Splitter", url: "/tool/pdf-splitter" },
    { label: "Split PDF Pages", url: "/tool/split-pdf-pages" },
    { label: "PDF Page Splitter", url: "/tool/pdf-page-splitter" },
    { label: "Batch Split PDF", url: "/tool/batch-split-pdf" },
    { label: "PDF Rotator", url: "/tool/pdf-rotator" },
    { label: "PDF to JPG", url: "/tool/pdf-to-jpg" },
    { label: "PDF to PNG", url: "/tool/pdf-to-png" },
    { label: "Image Rotator", url: "/tool/image-rotator" },
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
    if (lowerLabel.includes("split") || lowerLabel.includes("splitter")) return <Scissors className="w-5 h-5 text-white" />;
    if (lowerLabel.includes("rotate") || lowerLabel.includes("rotator")) return <Rotate3D className="w-5 h-5 text-white" />;
    if (lowerLabel.includes("editor") || lowerLabel.includes("edit")) return <Edit className="w-5 h-5 text-white" />;
    if (lowerLabel.includes("jpg") || lowerLabel.includes("png") || lowerLabel.includes("image")) return <ImageIcon className="w-5 h-5 text-white" />;
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
    if (lowerLabel.includes("split") || lowerLabel.includes("splitter")) return "Split PDF into individual pages and download them separately.";
    if (lowerLabel.includes("rotate") || lowerLabel.includes("rotator")) return "Rotate PDF pages to any angle and save as new PDF.";
    if (lowerLabel.includes("editor") || lowerLabel.includes("edit")) return "Edit and modify your PDF documents easily.";
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

// --- PDF PAGE RENDERER WITH ZOOM AND ROTATION ---
interface PdfPageRendererProps {
  pageNumber: number;
  pdfData: PdfData | null;
  fileName: string;
  rotation: number;
  selected: boolean;
  onRotationChange?: (rotation: number) => void;
  onSelectChange?: (selected: boolean) => void;
  onZoomClick?: () => void;
}

const PdfPageRenderer = ({ 
  pageNumber, 
  pdfData, 
  fileName, 
  rotation, 
  selected,
  onRotationChange,
  onSelectChange,
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

  const rotateClockwise = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRotationChange) {
      const newRotation = (rotation + 90) % 360;
      onRotationChange(newRotation);
    }
  };

  const rotateCounterClockwise = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRotationChange) {
      const newRotation = (rotation - 90 + 360) % 360;
      onRotationChange(newRotation);
    }
  };

  const resetRotation = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRotationChange) {
      onRotationChange(0);
    }
  };

  const toggleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelectChange) {
      onSelectChange(!selected);
    }
  };

  const getRotationText = () => {
    switch(rotation) {
      case 0: return "0°";
      case 90: return "90°";
      case 180: return "180°";
      case 270: return "270°";
      default: return `${rotation}°`;
    }
  };

  return (
    <div 
      className="w-full h-48 sm:h-56 flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center border-2 border-gray-200 dark:border-gray-700 relative overflow-hidden cursor-pointer group"
      onClick={onZoomClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Selection checkbox */}
      <div className="absolute top-2 left-2 z-30">
        <button
          onClick={toggleSelect}
          className={`p-1.5 rounded-full backdrop-blur-sm transition-colors ${selected ? 'bg-blue-600' : 'bg-black/70 hover:bg-black/90'}`}
          title={selected ? "Deselect page" : "Select page"}
        >
          {selected ? (
            <Check className="w-3 h-3 text-white" />
          ) : (
            <div className="w-3 h-3 border border-white/70 rounded" />
          )}
        </button>
      </div>

      {/* Rotation controls - Desktop */}
      <div className={`absolute bottom-2 left-2 z-30 hidden sm:flex flex-col gap-1 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <button
          onClick={rotateCounterClockwise}
          className="p-1.5 bg-black/70 hover:bg-black/90 rounded-full backdrop-blur-sm transition-colors"
          title="Rotate counter-clockwise"
        >
          <RotateCcw className="w-3 h-3 text-white" />
        </button>
        <button
          onClick={resetRotation}
          className="p-1.5 bg-black/70 hover:bg-black/90 rounded-full backdrop-blur-sm transition-colors"
          title="Reset rotation"
        >
          <RefreshCw className="w-3 h-3 text-white" />
        </button>
        <button
          onClick={rotateClockwise}
          className="p-1.5 bg-black/70 hover:bg-black/90 rounded-full backdrop-blur-sm transition-colors"
          title="Rotate clockwise"
        >
          <RotateCw className="w-3 h-3 text-white" />
        </button>
      </div>

      {/* Rotation controls - Mobile */}
      <div className="absolute bottom-2 left-2 z-30 flex sm:hidden gap-1">
        <button
          onClick={rotateCounterClockwise}
          className="p-1.5 bg-black/70 hover:bg-black/90 rounded-full backdrop-blur-sm transition-colors"
          title="Rotate left"
        >
          <RotateCcw className="w-3 h-3 text-white" />
        </button>
        <button
          onClick={rotateClockwise}
          className="p-1.5 bg-black/70 hover:bg-black/90 rounded-full backdrop-blur-sm transition-colors"
          title="Rotate right"
        >
          <RotateCw className="w-3 h-3 text-white" />
        </button>
      </div>
      
      {/* Zoom overlay button */}
      <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="p-1.5 bg-black/70 rounded-full backdrop-blur-sm">
          <ZoomIn className="w-4 h-4 text-white" />
        </div>
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
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
            style={{ transform: `rotate(${rotation}deg)` }}
            draggable="false"
          />
          
          {/* Rotation indicator */}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-70 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            <RotateCw className="w-3 h-3" />
            <span>{getRotationText()}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

// --- SIMPLE ZOOM MODAL COMPONENT WITH ROTATION ---
interface SimpleZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageNumber: number;
  pdfData: PdfData | null;
  fileName: string;
  rotation: number; // ✅ rotation prop जोड़ा
}

const SimpleZoomModal = ({ 
  isOpen, 
  onClose, 
  pageNumber, 
  pdfData, 
  fileName,
  rotation // ✅ rotation prop प्राप्त करें
}: SimpleZoomModalProps) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pageImage, setPageImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentRotation, setCurrentRotation] = useState(rotation); // ✅ rotation state
  const isMounted = useRef(true);

  useEffect(() => {
    // ✅ जब rotation prop बदले, तो state update करें
    setCurrentRotation(rotation);
  }, [rotation]);

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

  // ✅ Rotation functions for zoom modal
  const rotateClockwise = () => {
    setCurrentRotation(prev => (prev + 90) % 360);
  };

  const rotateCounterClockwise = () => {
    setCurrentRotation(prev => (prev - 90 + 360) % 360);
  };

  const resetRotation = () => {
    setCurrentRotation(0);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
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

  // Handle wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (e.deltaY < 0) {
      // Zoom in
      handleZoomIn();
    } else {
      // Zoom out
      handleZoomOut();
    }
  };

  // Reset zoom on close
  useEffect(() => {
    if (!isOpen) {
      setZoomLevel(1);
    }
  }, [isOpen]);

  const getRotationText = () => {
    switch(currentRotation) {
      case 0: return "0°";
      case 90: return "90°";
      case 180: return "180°";
      case 270: return "270°";
      default: return `${currentRotation}°`;
    }
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
      
      {/* ✅ Rotation controls in zoom modal */}
      <div className="absolute top-4 left-4 z-50 flex gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); rotateCounterClockwise(); }}
          className="p-2 bg-black/70 hover:bg-black/90 rounded-full transition-colors"
          title="Rotate left"
        >
          <RotateCcw className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); rotateClockwise(); }}
          className="p-2 bg-black/70 hover:bg-black/90 rounded-full transition-colors"
          title="Rotate right"
        >
          <RotateCw className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); resetRotation(); }}
          className="p-2 bg-black/70 hover:bg-black/90 rounded-full transition-colors"
          title="Reset rotation"
        >
          <RefreshCw className="w-5 h-5 text-white" />
        </button>
      </div>
      
      {/* Zoom controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/70 rounded-full px-4 py-2 backdrop-blur-sm z-50">
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
      
      {/* Page info with rotation indicator */}
      <div className="absolute top-4 right-20 z-50 bg-black/70 rounded-full px-4 py-2 backdrop-blur-sm flex items-center gap-2">
        <span className="text-white text-sm font-medium">
          Page {pageNumber} • {fileName.substring(0, 15)}...
        </span>
        <div className="w-px h-4 bg-white/30"></div>
        <div className="flex items-center gap-1">
          <RotateCw className="w-3 h-3 text-white" />
          <span className="text-white text-sm font-medium">{getRotationText()}</span>
        </div>
      </div>
      
      {/* Image container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`relative ${
          isFullscreen 
            ? 'w-full h-full flex items-center justify-center' 
            : 'w-[90vw] h-[80vh] max-w-[90vw] max-h-[80vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
      >
        {loading ? (
          <div className="flex items-center justify-center w-full h-full">
            <Loader2 className="w-12 h-12 animate-spin text-white" />
          </div>
        ) : pageImage ? (
          <div className="w-full h-full flex items-center justify-center overflow-auto">
            <img 
              src={pageImage} 
              alt={`Zoomed view - Page ${pageNumber}`}
              className="max-w-none max-h-none"
              style={{ 
                transform: `scale(${zoomLevel}) rotate(${currentRotation}deg)`, // ✅ rotation लागू करें
                transition: 'transform 0.1s ease-out'
              }}
              draggable="false"
            />
          </div>
        ) : null}
      </motion.div>
      
      {/* Simple instructions */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/70 text-white text-xs px-3 py-2 rounded-full backdrop-blur-sm">
          <span>Scroll to zoom • Use rotation buttons • Click outside to close</span>
        </div>
      </div>
    </motion.div>
  );
};

// --- Ultra Simple Zoom Modal (Simplest Version) WITH ROTATION ---
interface UltraSimpleZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageImage: string | null;
  pageNumber: number;
  fileName: string;
  rotation: number; // ✅ rotation prop जोड़ा
}

const UltraSimpleZoomModal = ({ 
  isOpen, 
  onClose, 
  pageImage, 
  pageNumber, 
  fileName,
  rotation // ✅ rotation prop प्राप्त करें
}: UltraSimpleZoomModalProps) => {
  const [zoom, setZoom] = useState(1);
  const [currentRotation, setCurrentRotation] = useState(rotation); // ✅ rotation state

  useEffect(() => {
    // ✅ जब rotation prop बदले, तो state update करें
    setCurrentRotation(rotation);
  }, [rotation]);

  if (!isOpen || !pageImage) return null;

  const handleZoomIn = () => {
    setZoom(z => Math.min(z + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(z => Math.max(z - 0.25, 0.5));
  };

  // ✅ Rotation functions
  const rotateClockwise = () => {
    setCurrentRotation(prev => (prev + 90) % 360);
  };

  const rotateCounterClockwise = () => {
    setCurrentRotation(prev => (prev - 90 + 360) % 360);
  };

  const resetRotation = () => {
    setCurrentRotation(0);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
    setZoom(1);
    setCurrentRotation(rotation); // ✅ Reset to original rotation
  };

  const getRotationText = () => {
    switch(currentRotation) {
      case 0: return "0°";
      case 90: return "90°";
      case 180: return "180°";
      case 270: return "270°";
      default: return `${currentRotation}°`;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div 
        className="relative max-w-full max-h-full bg-black/80 rounded-lg overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-50 p-2 bg-black/70 rounded-full hover:bg-black/90 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        
        {/* ✅ Rotation controls */}
        <div className="absolute top-2 left-2 z-50 flex gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); rotateCounterClockwise(); }}
            className="p-1.5 bg-black/70 hover:bg-black/90 rounded-full transition-colors"
            title="Rotate left"
          >
            <RotateCcw className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); rotateClockwise(); }}
            className="p-1.5 bg-black/70 hover:bg-black/90 rounded-full transition-colors"
            title="Rotate right"
          >
            <RotateCw className="w-4 h-4 text-white" />
          </button>
        </div>
        
        {/* Zoom controls */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/70 rounded-full px-3 py-1.5 z-50">
          <button
            onClick={handleZoomOut}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
            disabled={zoom <= 0.5}
          >
            <Minus className="w-4 h-4 text-white" />
          </button>
          
          <span className="text-white text-xs font-medium min-w-[50px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          
          <button
            onClick={handleZoomIn}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
            disabled={zoom >= 3}
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
        
        {/* Page info with rotation */}
        <div className="absolute top-3 left-12 z-50 bg-black/70 rounded-full px-3 py-1.5 flex items-center gap-2">
          <span className="text-white text-xs">
            Page {pageNumber} • {fileName.substring(0, 20)}...
          </span>
          <div className="w-px h-3 bg-white/30"></div>
          <div className="flex items-center gap-1">
            <RotateCw className="w-3 h-3 text-white" />
            <span className="text-white text-xs">{getRotationText()}</span>
          </div>
        </div>
        
        {/* Image with rotation */}
        <img 
          src={pageImage} 
          alt={`Page ${pageNumber}`}
          className="max-w-full max-h-screen object-contain"
          style={{ 
            transform: `scale(${zoom}) rotate(${currentRotation}deg)`, // ✅ rotation लागू करें
            transition: 'transform 0.2s ease-out'
          }}
        />
        
        {/* Instructions */}
        <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/70 text-white text-xs px-3 py-1.5 rounded-full">
            <span>Click outside to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Smart filename generator for split PDF pages ---
const generateSplitPdfFilename = (originalFilename: string, pageNumber: number, totalPages: number, rotation: number = 0): string => {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
  
  // Clean original filename
  const cleanName = originalFilename
    .replace(/\.pdf$/i, '')
    .replace(/[^a-zA-Z0-9\s-_]/g, '')
    .substring(0, 30)
    .trim();
  
  // Add rotation info to filename if rotated
  const rotationSuffix = rotation !== 0 ? `_rotated${rotation}` : '';
  
  if (totalPages === 1) {
    return `${cleanName}_${dateStr}${rotationSuffix}.pdf`;
  } else {
    return `${cleanName}_page${pageNumber}_of_${totalPages}_${dateStr}${rotationSuffix}.pdf`;
  }
};

export default function PdfSplitRotatorTool() {
    const [files, setFiles] = useState<File[]>([]);
    const [converting, setConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [converted, setConverted] = useState(false);
    const [pageData, setPageData] = useState<PageData[]>([]);
    const [pdfData, setPdfData] = useState<PdfData | null>(null);
    const [showUploadInfo, setShowUploadInfo] = useState(true);
    const [zoomModal, setZoomModal] = useState<{
      isOpen: boolean;
      pageNumber: number;
      fileName: string;
      rotation: number; // ✅ rotation जोड़ा
    }>({
      isOpen: false,
      pageNumber: 1,
      fileName: '',
      rotation: 0 // ✅ डिफ़ॉल्ट rotation
    });

    // Simple zoom modal state
    const [simpleZoomModal, setSimpleZoomModal] = useState<{
      isOpen: boolean;
      pageNumber: number;
      fileName: string;
      pageImage: string | null;
      rotation: number; // ✅ rotation जोड़ा
    }>({
      isOpen: false,
      pageNumber: 1,
      fileName: '',
      pageImage: null,
      rotation: 0 // ✅ डिफ़ॉल्ट rotation
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
    const handleConvert = async () => {
        if (files.length === 0) return;

        setConverting(true);
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

            // Generate page data with initial rotation 0
            const newPageData: PageData[] = Array.from(
                { length: pageCount },
                (_, i) => ({
                    pageNumber: i + 1,
                    fileName: generateSplitPdfFilename(file.name, i + 1, pageCount, 0),
                    rotation: 0,
                    selected: false,
                })
            );

            setProgress(80);
            await new Promise(resolve => setTimeout(resolve, 200));

            setPageData(newPageData);
            setPdfData({ base64, pageCount });
            setProgress(100);
            
            setTimeout(() => {
                setConverted(true);
                setConverting(false);
                setCurrentPage(1); // Reset to first page
            }, 300);

        } catch (error) {
            console.error("PDF loading error:", error);
            alert("Failed to load PDF. Please make sure it's a valid PDF file.");
            setConverting(false);
            setProgress(0);
        }
    };

    // Update rotation for a single page
    const handleRotationChange = async (pageIndex: number, newRotation: number) => {
        const updatedPageData = [...pageData];
        const pageInfo = updatedPageData[pageIndex];
        
        if (pageInfo) {
            // Update rotation and filename
            updatedPageData[pageIndex] = {
                ...pageInfo,
                rotation: newRotation,
                fileName: generateSplitPdfFilename(files[0].name, pageInfo.pageNumber, pageData.length, newRotation),
            };
            
            setPageData(updatedPageData);
            
            // ✅ Zoom modal में अगर यही page खुला है, तो उसका rotation भी update करें
            if (zoomModal.isOpen && zoomModal.pageNumber === pageInfo.pageNumber) {
                setZoomModal(prev => ({
                    ...prev,
                    rotation: newRotation
                }));
            }
            
            if (simpleZoomModal.isOpen && simpleZoomModal.pageNumber === pageInfo.pageNumber) {
                setSimpleZoomModal(prev => ({
                    ...prev,
                    rotation: newRotation
                }));
            }
            
            // Show success message for mobile
            if (isMobile) {
              setDownloadSuccess(`✓ Page ${pageIndex + 1} rotated to ${newRotation}°`);
              setTimeout(() => setDownloadSuccess(null), 2000);
            }
        }
    };

    // Update selection for a single page
    const handleSelectChange = async (pageIndex: number, selected: boolean) => {
        const updatedPageData = [...pageData];
        const pageInfo = updatedPageData[pageIndex];
        
        if (pageInfo) {
            updatedPageData[pageIndex] = {
                ...pageInfo,
                selected: selected,
            };
            
            setPageData(updatedPageData);
        }
    };

    // Rotate all pages
    const rotateAllPages = async (rotation: number) => {
        if (pageData.length === 0) return;

        setConverting(true);
        setProgress(0);

        try {
            const updatedPageData = [...pageData];
            
            for (let i = 0; i < updatedPageData.length; i++) {
                const pageInfo = updatedPageData[i];
                // Apply rotation to each page
                updatedPageData[i] = {
                    ...pageInfo,
                    rotation: rotation,
                    fileName: generateSplitPdfFilename(files[0].name, pageInfo.pageNumber, pageData.length, rotation),
                };
                
                // Update progress
                const progress = Math.round(((i + 1) / updatedPageData.length) * 100);
                setProgress(progress);
            }

            setPageData(updatedPageData);
            
            // ✅ अगर zoom modal खुला है, तो उसका rotation भी update करें
            if (zoomModal.isOpen) {
                const currentPageIndex = zoomModal.pageNumber - 1;
                if (currentPageIndex >= 0 && currentPageIndex < updatedPageData.length) {
                    setZoomModal(prev => ({
                        ...prev,
                        rotation: rotation
                    }));
                }
            }
            
            if (simpleZoomModal.isOpen) {
                const currentPageIndex = simpleZoomModal.pageNumber - 1;
                if (currentPageIndex >= 0 && currentPageIndex < updatedPageData.length) {
                    setSimpleZoomModal(prev => ({
                        ...prev,
                        rotation: rotation
                    }));
                }
            }
            
            setDownloadSuccess(`✓ All ${updatedPageData.length} pages rotated to ${rotation}°!`);
            setTimeout(() => setDownloadSuccess(null), 3000);

        } catch (error) {
            console.error("Error rotating all pages:", error);
            setDownloadSuccess("✗ Failed to rotate pages. Please try again.");
            setTimeout(() => setDownloadSuccess(null), 3000);
        } finally {
            setConverting(false);
            setProgress(0);
        }
    };

    // Select/Deselect all pages
    const toggleSelectAll = (select: boolean) => {
        const updatedPageData = [...pageData];
        
        for (let i = 0; i < updatedPageData.length; i++) {
            updatedPageData[i] = {
                ...updatedPageData[i],
                selected: select,
            };
        }

        setPageData(updatedPageData);
        setDownloadSuccess(`✓ ${select ? 'All' : 'No'} pages selected!`);
        setTimeout(() => setDownloadSuccess(null), 2000);
    };

    // Download a single page
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
            
            // Apply rotation to the page
            const pageInfo = pageData[pageIndex];
            if (pageInfo.rotation !== 0) {
                copiedPage.setRotation(degrees(pageInfo.rotation));
            }
            
            newPdf.addPage(copiedPage);

            // Save single page PDF
            const pdfBytes = await newPdf.save();
            const blob = new Blob([new Uint8Array(pdfBytes)], {
                type: "application/pdf",
            });

            downloadFile(blob, pageInfo.fileName);

            // Show success message
            setDownloadSuccess(`✓ Page ${pageIndex + 1} downloaded as rotated PDF!`);
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

    // Download selected pages
    const handleDownloadSelected = async () => {
        if (!pdfData) {
            alert("PDF not available.");
            return;
        }

        const selectedPages = pageData.filter(page => page.selected);
        if (selectedPages.length === 0) {
            setDownloadSuccess("✗ Please select at least one page to download.");
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
            
            for (let i = 0; i < selectedPages.length; i++) {
                const pageInfo = selectedPages[i];
                const pageIndex = pageInfo.pageNumber - 1;

                const newPdf = await PDFDocument.create();
                const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);
                
                // Apply rotation to the page
                if (pageInfo.rotation !== 0) {
                    copiedPage.setRotation(degrees(pageInfo.rotation));
                }
                
                newPdf.addPage(copiedPage);

                // Save single page PDF
                const pdfBytes = await newPdf.save();
                const blob = new Blob([new Uint8Array(pdfBytes)], {
                    type: "application/pdf",
                });

                downloadFile(blob, pageInfo.fileName);
                
                // Update progress
                const progress = Math.round(((i + 1) / selectedPages.length) * 100);
                setDownloadProgress(progress);
                
                // Small delay for better UX
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            // Success message
            setDownloadSuccess(`✓ Successfully downloaded ${selectedPages.length} selected pages!`);
            setTimeout(() => setDownloadSuccess(null), 5000);

        } catch (error) {
            console.error("Error downloading selected pages:", error);
            setDownloadSuccess("✗ Failed to download selected pages. Please try again.");
            setTimeout(() => setDownloadSuccess(null), 3000);
        } finally {
            setDownloadingAll(false);
            setDownloadProgress(0);
        }
    };

    // Download all pages
    const handleDownloadAll = async () => {
        if (!pdfData || pageData.length === 0) {
            alert("PDF not available.");
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
            
            for (let i = 0; i < pageData.length; i++) {
                const pageInfo = pageData[i];

                const newPdf = await PDFDocument.create();
                const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
                
                // Apply rotation to the page
                if (pageInfo.rotation !== 0) {
                    copiedPage.setRotation(degrees(pageInfo.rotation));
                }
                
                newPdf.addPage(copiedPage);

                // Save single page PDF
                const pdfBytes = await newPdf.save();
                const blob = new Blob([new Uint8Array(pdfBytes)], {
                    type: "application/pdf",
                });

                downloadFile(blob, pageInfo.fileName);
                
                // Update progress
                const progress = Math.round(((i + 1) / pageData.length) * 100);
                setDownloadProgress(progress);
                
                // Small delay for better UX
                await new Promise(resolve => setTimeout(resolve, 50));
            }

            // Success message
            setDownloadSuccess(`✓ Successfully downloaded all ${pageData.length} pages!`);
            setTimeout(() => setDownloadSuccess(null), 5000);

        } catch (error) {
            console.error("Error downloading all pages:", error);
            setDownloadSuccess("✗ Failed to generate PDFs. Please try again.");
            setTimeout(() => setDownloadSuccess(null), 3000);
        } finally {
            setDownloadingAll(false);
            setDownloadProgress(0);
        }
    };

    // Download current page (visible pages)
    const handleDownloadCurrentPage = async () => {
        if (!pdfData) return;

        setDownloadingAll(true);
        setDownloadProgress(0);

        try {
            const binaryString = atob(pdfData.base64);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            
            const pdfDoc = await PDFDocument.load(bytes);
            
            for (let i = startIndex; i < endIndex; i++) {
                const pageInfo = pageData[i];

                const newPdf = await PDFDocument.create();
                const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
                
                // Apply rotation to the page
                if (pageInfo.rotation !== 0) {
                    copiedPage.setRotation(degrees(pageInfo.rotation));
                }
                
                newPdf.addPage(copiedPage);

                const pdfBytes = await newPdf.save();
                const blob = new Blob([new Uint8Array(pdfBytes)], {
                    type: "application/pdf",
                });

                downloadFile(blob, pageInfo.fileName);
                
                const progress = Math.round(((i - startIndex + 1) / (endIndex - startIndex)) * 100);
                setDownloadProgress(progress);
                
                // Small delay to prevent browser freezing
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            setDownloadSuccess(`✓ Successfully downloaded ${endIndex - startIndex} pages!`);
            setTimeout(() => setDownloadSuccess(null), 3000);

        } catch (error) {
            console.error("Error downloading current page:", error);
            setDownloadSuccess("✗ Failed to download pages. Please try again.");
            setTimeout(() => setDownloadSuccess(null), 3000);
        } finally {
            setDownloadingAll(false);
            setDownloadProgress(0);
        }
    };

    const handleFilesSelected = (newFiles: File[]) => {
        setFiles(newFiles);
        setConverted(false);
        setPageData([]);
        setPdfData(null);
        setShowUploadInfo(false);
        setCurrentPage(1);
        setDownloadSuccess(null);
        setZoomModal({
            isOpen: false,
            pageNumber: 1,
            fileName: '',
            rotation: 0
        });
        setSimpleZoomModal({
            isOpen: false,
            pageNumber: 1,
            fileName: '',
            pageImage: null,
            rotation: 0
        });
    };

    const handleReset = () => {
        setFiles([]);
        setConverted(false);
        setPageData([]);
        setPdfData(null);
        setProgress(0);
        setShowUploadInfo(true);
        setCurrentPage(1);
        setDownloadSuccess(null);
        setZoomModal({
            isOpen: false,
            pageNumber: 1,
            fileName: '',
            rotation: 0
        });
        setSimpleZoomModal({
            isOpen: false,
            pageNumber: 1,
            fileName: '',
            pageImage: null,
            rotation: 0
        });
    };

    const handlePageZoom = (pageNumber: number, fileName: string) => {
        setZoomModal({
            isOpen: true,
            pageNumber,
            fileName,
            rotation: 0 // ✅ Initial rotation 0
        });
    };

    // Simple zoom handler
    const handleSimpleZoom = async (pageNumber: number, fileName: string) => {
        if (!pdfData) return;

        try {
            // Convert base64 back to Uint8Array
            const binaryString = atob(pdfData.base64);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            
            const loadingTask = pdfjsLib.getDocument({ data: bytes });
            const pdf = await loadingTask.promise;
            const page = await pdf.getPage(pageNumber);
            
            // Create a larger canvas for zoom
            const viewport = page.getViewport({ scale: 2 });
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
            
            // ✅ Current page का rotation ढूंढें
            const pageIndex = pageNumber - 1;
            const currentRotation = pageData[pageIndex]?.rotation || 0;
            
            setSimpleZoomModal({
                isOpen: true,
                pageNumber,
                fileName,
                pageImage: imageUrl,
                rotation: currentRotation // ✅ rotation भेजें
            });
            
        } catch (error) {
            console.error("Error creating zoom image:", error);
        }
    };

    // Pagination controls
    const goToPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        // Scroll to top of page grid on mobile
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
            // Scroll to top on mobile
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
            // Scroll to top on mobile
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

    // Count selected pages
    const selectedCount = pageData.filter(page => page.selected).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20 py-4 sm:py-8 md:py-12">
            <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Success Message Overlay - Mobile friendly */}
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
                            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-xl sm:shadow-2xl"
                        >
                            <Scissors className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </motion.div>
                        
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent px-2">
                            PDF Split & Rotate Tool
                        </h1>
                        
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
                            Split PDF into individual pages and rotate them as needed.
                            <span className="block text-blue-600 dark:text-blue-400 font-medium mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">
                                Select, rotate, and download pages individually or in batches!
                            </span>
                        </p>
                    </div>

                    {/* Main Card - Responsive */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-xl sm:shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 mb-6 sm:mb-8">
                        {/* Upload Section */}
                        <div className="mb-6 sm:mb-8">
                            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg sm:rounded-xl">
                                    <FolderOpen className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                                        Upload PDF
                                    </h2>
                                    <p className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400">
                                        Select your PDF file to split and rotate pages
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
                                        <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 rounded-lg sm:rounded-xl md:rounded-2xl border border-blue-200 dark:border-blue-800/50">
                                            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                                                <Scissors className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-600 dark:text-blue-400" />
                                                <span className="text-xs sm:text-sm md:text-base font-semibold text-blue-800 dark:text-blue-300">
                                                    Split & Rotate
                                                </span>
                                            </div>
                                            <p className="text-xs text-blue-700/80 dark:text-blue-400/80 mt-1 sm:mt-2">
                                                Split PDF and rotate pages individually
                                            </p>
                                        </div>
                                        
                                        <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-900/20 rounded-lg sm:rounded-xl md:rounded-2xl border border-purple-200 dark:border-purple-800/50">
                                            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                                                <Grid3x3 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-600 dark:text-purple-400" />
                                                <span className="text-xs sm:text-sm md:text-base font-semibold text-purple-800 dark:text-purple-300">
                                                    Batch Operations
                                                </span>
                                            </div>
                                            <p className="text-xs text-purple-700/80 dark:text-purple-400/80 mt-1 sm:mt-2">
                                                Select multiple pages and process together
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
                                                See rotation changes instantly
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
                                <div className="p-3 sm:p-4 md:p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20 rounded-xl sm:rounded-2xl border-2 border-blue-200 dark:border-blue-800/30">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 md:gap-4">
                                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                                            <div className="p-1.5 sm:p-2 md:p-3 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md">
                                                <FileImage className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
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
                                    {converting && !converted && (
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
                                                <div className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-blue-50 dark:bg-blue-950/30 rounded-full">
                                                    <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
                                                    <span className="text-xs sm:text-sm md:text-base text-blue-700 dark:text-blue-300">
                                                        Preparing split and rotate editor
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Convert Button */}
                                    {!converted && !converting && (
                                        <motion.button
                                            key="convert"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleConvert}
                                            className="w-full py-2.5 sm:py-3 md:py-4 px-4 sm:px-5 md:px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-1 sm:gap-2 md:gap-3"
                                        >
                                            <Scissors className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                            <span>Load PDF for Splitting</span>
                                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                                        </motion.button>
                                    )}

                                    {/* Results */}
                                    {converted && (
                                        <motion.div
                                            key="results"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-4 sm:space-y-6 md:space-y-8"
                                        >
                                            {/* Success Banner */}
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
                                                            {pageData.length} pages ready for splitting and rotation
                                                        </p>
                                                        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1">
                                                            Select pages, rotate them, and download individually or in batches
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-center">
                                                        <div className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base">
                                                            {pageData.length} Pages
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Global Controls - Select All and Batch Rotate */}
                                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-indigo-200 dark:border-indigo-800/30">
                                                <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2">
                                                    <Grid3x3 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                                                    Global Controls
                                                </h4>
                                                
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                                                    {/* Selection Controls */}
                                                    <div className="space-y-2">
                                                        <h5 className="font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                                                            Selection ({selectedCount} selected)
                                                        </h5>
                                                        <div className="flex flex-wrap gap-2">
                                                            <button
                                                                onClick={() => toggleSelectAll(true)}
                                                                className="py-1.5 sm:py-2 px-2 sm:px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                                                            >
                                                                <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                                                                <span>Select All</span>
                                                            </button>
                                                            <button
                                                                onClick={() => toggleSelectAll(false)}
                                                                className="py-1.5 sm:py-2 px-2 sm:px-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-medium rounded-lg flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                                                            >
                                                                <X className="w-3 h-3 sm:w-4 sm:h-4" />
                                                                <span>Deselect All</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Batch Rotation Controls */}
                                                    <div className="space-y-2">
                                                        <h5 className="font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                                                            Batch Rotate
                                                        </h5>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <button
                                                                onClick={() => rotateAllPages(90)}
                                                                disabled={converting}
                                                                className="py-1.5 sm:py-2 px-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 text-xs sm:text-sm"
                                                            >
                                                                <RotateCw className="w-3 h-3 sm:w-4 sm:h-4" />
                                                                <span>90°</span>
                                                            </button>
                                                            <button
                                                                onClick={() => rotateAllPages(180)}
                                                                disabled={converting}
                                                                className="py-1.5 sm:py-2 px-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 text-xs sm:text-sm"
                                                            >
                                                                <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                                                                <span>180°</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 text-center">
                                                    Apply actions to all {pageData.length} pages at once
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
                                                            Navigate through pages using pagination
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
                                                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
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

                                            {/* Download All Progress */}
                                            {downloadingAll && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border-2 border-blue-200 dark:border-blue-800/30"
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-medium text-blue-700 dark:text-blue-300 text-xs sm:text-sm">
                                                            Downloading {downloadProgress}% complete
                                                        </span>
                                                        <span className="text-xs text-gray-600 dark:text-gray-400">
                                                            {Math.round(downloadProgress / 100 * pageData.length)} of {pageData.length} pages
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${downloadProgress}%` }}
                                                            className="h-1.5 sm:h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                                                        />
                                                    </div>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">
                                                        Please wait while pages are being downloaded...
                                                    </p>
                                                </motion.div>
                                            )}

                                            {/* Page Grid */}
                                            <div id="page-grid">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 md:mb-6 gap-1 sm:gap-2">
                                                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-1 sm:gap-2 md:gap-3">
                                                        <Grid3x3 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-500" />
                                                        Pages (Page {currentPage} of {totalPages})
                                                    </h3>
                                                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                                                        {isMobile ? "Tap buttons to rotate/select" : "Hover for rotation controls"} • Click to zoom
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
                                                                <div className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl border-2 p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 ${page.selected ? 'border-blue-500 dark:border-blue-500' : 'border-gray-200 dark:border-gray-700'}`}>
                                                                    <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 md:space-y-4">
                                                                        <PdfPageRenderer 
                                                                            pageNumber={page.pageNumber}
                                                                            pdfData={pdfData}
                                                                            fileName={page.fileName}
                                                                            rotation={page.rotation}
                                                                            selected={page.selected}
                                                                            onRotationChange={(newRotation) => handleRotationChange(actualIndex, newRotation)}
                                                                            onSelectChange={(selected) => handleSelectChange(actualIndex, selected)}
                                                                            onZoomClick={() => handleSimpleZoom(page.pageNumber, page.fileName)}
                                                                        />
                                                                        
                                                                        <div className="w-full">
                                                                            <div className="flex items-center justify-between mb-1">
                                                                                <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">
                                                                                    Page {page.pageNumber}
                                                                                </h4>
                                                                                <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs rounded-full ${
                                                                                    page.selected 
                                                                                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                                                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                                                                }`}>
                                                                                    {page.selected ? 'Selected' : 'Not selected'}
                                                                                </span>
                                                                            </div>
                                                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-1 sm:mb-2 md:mb-3">
                                                                                Rotation: {page.rotation}° • {page.fileName}
                                                                            </p>
                                                                            
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
                                                                                        onClick={() => handleRotationChange(actualIndex, (page.rotation + 90) % 360)}
                                                                                        className="py-1.5 sm:py-2 px-2 sm:px-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-0.5 sm:gap-1 text-xs sm:text-sm"
                                                                                    >
                                                                                        <RotateCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                                                                        Rotate
                                                                                    </motion.button>
                                                                                    
                                                                                    <motion.button
                                                                                        whileHover={{ scale: 1.02 }}
                                                                                        whileTap={{ scale: 0.98 }}
                                                                                        onClick={() => handleDownloadPage(actualIndex)}
                                                                                        className="py-1.5 sm:py-2 px-2 sm:px-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-0.5 sm:gap-1 text-xs sm:text-sm"
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

                                            {/* Download Options Section - Responsive */}
                                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 border-2 border-indigo-200 dark:border-indigo-800/50">
                                                <div className="text-center mb-3 sm:mb-4 md:mb-6">
                                                    <h4 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-1 sm:mb-2">
                                                        Batch Download Options
                                                    </h4>
                                                    <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                                                        Choose how you want to download pages
                                                    </p>
                                                    
                                                    <div className="space-y-3 sm:space-y-4">
                                                        {/* Download Selected Button */}
                                                        <motion.button
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            onClick={handleDownloadSelected}
                                                            disabled={downloadingAll || selectedCount === 0}
                                                            className="w-full py-2.5 sm:py-3 md:py-4 px-4 sm:px-5 md:px-6 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold rounded-lg sm:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3"
                                                        >
                                                            {downloadingAll ? (
                                                                <>
                                                                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                                                    <span>Processing...</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Download className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                                                    <span>Download Selected ({selectedCount} pages)</span>
                                                                </>
                                                            )}
                                                        </motion.button>
                                                        
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                                            <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-blue-200 dark:border-blue-700">
                                                                <h5 className="font-bold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm">
                                                                    Current View
                                                                </h5>
                                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                                    Download {endIndex - startIndex} pages from current view
                                                                </p>
                                                                <motion.button
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={handleDownloadCurrentPage}
                                                                    disabled={downloadingAll}
                                                                    className="w-full mt-2 py-1.5 px-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                                                >
                                                                    Download {endIndex - startIndex} Pages
                                                                </motion.button>
                                                            </div>
                                                            
                                                            <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-purple-200 dark:border-purple-700">
                                                                <h5 className="font-bold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm">
                                                                    All Pages
                                                                </h5>
                                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                                    Download all {pageData.length} pages in one go
                                                                </p>
                                                                <motion.button
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={handleDownloadAll}
                                                                    disabled={downloadingAll}
                                                                    className="w-full mt-2 py-1.5 px-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold rounded-lg text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                                                >
                                                                    Download All {pageData.length} Pages
                                                                </motion.button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <p id="status-all-1" className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium mt-2 sm:mt-3">
                                                        Ready for batch download • {selectedCount} pages selected
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
                                                    Split Another PDF
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

                    {/* Simple Zoom Modal with rotation */}
                    <SimpleZoomModal
                        isOpen={zoomModal.isOpen}
                        onClose={() => setZoomModal({ ...zoomModal, isOpen: false })}
                        pageNumber={zoomModal.pageNumber}
                        pdfData={pdfData}
                        fileName={zoomModal.fileName}
                        rotation={zoomModal.rotation} // ✅ rotation भेजें
                    />

                    {/* Ultra Simple Zoom Modal with rotation */}
                    <UltraSimpleZoomModal
                        isOpen={simpleZoomModal.isOpen}
                        onClose={() => setSimpleZoomModal({ ...simpleZoomModal, isOpen: false })}
                        pageImage={simpleZoomModal.pageImage}
                        pageNumber={simpleZoomModal.pageNumber}
                        fileName={simpleZoomModal.fileName}
                        rotation={simpleZoomModal.rotation} // ✅ rotation भेजें
                    />

                    {/* Enhanced Tools Section - Responsive */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 sm:mt-8 md:mt-12 p-3 sm:p-4 md:p-6 lg:p-8 bg-gradient-to-r from-white to-purple-50/50 dark:from-gray-900 dark:to-purple-950/20 rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-purple-300/50 dark:border-purple-800/50 shadow-lg sm:shadow-xl md:shadow-2xl backdrop-blur-sm"
                    >
                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 px-2">
                            Explore All PDF Tools 🚀
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                            {toolKeywords.map((tool, index) => (
                                <motion.div
                                    key={tool.label}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    whileHover={{ 
                                        scale: 1.02, 
                                        boxShadow: "0 10px 30px rgba(120, 80, 255, 0.25)",
                                        y: -4
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full"
                                >
                                    <a
                                        href={tool.url}
                                        className="flex items-center justify-start w-full p-3 sm:p-4 md:p-5 
                                                 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
                                                 border border-gray-200 dark:border-gray-700 
                                                 rounded-lg sm:rounded-2xl hover:border-purple-400 dark:hover:border-purple-500
                                                 transition-all duration-300 group
                                                 shadow-sm hover:shadow-xl"
                                    >
                                        {/* Icon */}
                                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
                                                      flex items-center justify-center 
                                                      bg-gradient-to-br from-blue-500 to-purple-600 
                                                      rounded-lg sm:rounded-xl mr-2 sm:mr-3 md:mr-4
                                                      group-hover:scale-110 transition-transform duration-300">
                                            <span className="text-base sm:text-lg md:text-xl">
                                                {getToolIcon(tool.label)}
                                            </span>
                                        </div>
                                        
                                        {/* Text */}
                                        <div className="flex-1 min-w-0">
                                            <span className="text-sm sm:text-base md:text-lg 
                                                           font-semibold text-gray-800 dark:text-gray-200 
                                                           group-hover:text-purple-600 dark:group-hover:text-purple-400 
                                                           transition-colors duration-300 block truncate">
                                                {tool.label}
                                            </span>
                                            <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400 
                                                           mt-1 block line-clamp-2">
                                                {getToolDescription(tool.label)}
                                            </span>
                                        </div>
                                        
                                        {/* Arrow */}
                                        <div className="flex-shrink-0 ml-1 sm:ml-2">
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 
                                                          group-hover:text-purple-500 
                                                          group-hover:translate-x-1 transition-all duration-300" 
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
                            <button className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                                             text-white font-medium rounded-full sm:rounded-xl md:rounded-2xl
                                             hover:from-blue-700 hover:to-purple-700
                                             active:scale-95 transition-all duration-300
                                             shadow-lg hover:shadow-xl
                                             text-xs sm:text-sm md:text-base">
                                View All Tools ({toolKeywords.length}+)
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Info Footer - Responsive */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 text-center mt-6 sm:mt-8 md:mt-12">
                        <div className="p-2 sm:p-3 md:p-4">
                            <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg sm:rounded-xl md:rounded-2xl mb-1.5 sm:mb-2 md:mb-3">
                                <Scissors className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                                Split & Rotate
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Split PDF and rotate individual pages as needed
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
                                Select multiple pages and process them together
                            </p>
                        </div>
                        
                        <div className="p-2 sm:p-3 md:p-4">
                            <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg sm:rounded-xl md:rounded-2xl mb-1.5 sm:mb-2 md:mb-3">
                                <Download className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                                Multiple Downloads
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Download individual pages or in batches
                            </p>
                        </div>
                    </div>

                    {/* Mobile Tips Banner */}
                    {isMobile && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border-2 border-blue-200 dark:border-blue-800/30"
                        >
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                <Smartphone className="w-4 h-4 text-blue-600" />
                                Mobile Tips
                            </h4>
                            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600">•</span>
                                    <span>Tap selection checkbox to select/deselect</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600">•</span>
                                    <span>Tap rotation buttons to rotate pages</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600">•</span>
                                    <span>Pinch to zoom in page preview</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600">•</span>
                                    <span>Use global controls for batch operations</span>
                                </li>
                            </ul>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}