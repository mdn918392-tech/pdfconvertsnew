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
    isSelected: boolean; // Whether page is selected for extraction
};

// --- TOOL KEYWORDS DATA ---
const toolKeywords = [
    { label: "PDF Page Extractor", url: "/tool/pdf-page-extractor" },
    { label: "Extract PDF Pages", url: "/tool/extract-pdf-pages" },
    { label: "Split PDF Pages", url: "/tool/split-pdf-pages" },
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
    if (lowerLabel.includes("extract") || lowerLabel.includes("split")) return <Scissors className="w-5 h-5 text-white" />;
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
    if (lowerLabel.includes("extract") || lowerLabel.includes("split")) return "Extract specific pages from PDF documents easily.";
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
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' 
              : 'bg-black/70 hover:bg-black/90'
          }`}
          title={isSelected ? "Extract page" : "Skip page"}
        >
          {isSelected ? (
            <Scissors className="w-3 h-3 text-white" />
          ) : (
            <File className="w-3 h-3 text-white" />
          )}
        </button>
        {isHovered && (
          <span className="text-xs font-medium text-white bg-black/70 px-2 py-1 rounded-full whitespace-nowrap">
            {isSelected ? "Will be extracted" : "Will be skipped"}
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
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
          : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
      }`}>
        {isSelected ? '✓ Extract' : '✗ Skip'}
      </div>
      
      {/* Page number */}
      <div className={`absolute top-2 right-2 z-20 px-2 py-1 rounded-full text-xs font-medium ${
        isSelected 
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
          : 'bg-black/70 text-white'
      }`}>
        Page {pageNumber}
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
            ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20' 
            : 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900/20'
        }`}>
          <span className="text-sm font-bold text-blue-800 dark:text-blue-300">
            Page
          </span>
          <span className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
            {pageNumber}
          </span>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
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

// --- IMPROVED ZOOM MODAL COMPONENT WITH SCROLL AND ROTATION ---
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
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(true);

  // Mouse event handlers for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current || !imageRef.current) return;
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

  // Zoom with mouse wheel
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
    setRotation(0);
  };

  const rotateLeft = () => {
    setRotation(prev => (prev - 90) % 360);
  };

  const rotateRight = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const resetRotation = () => {
    setRotation(0);
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
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-50 p-3 bg-black/80 rounded-full hover:bg-black transition-colors shadow-lg"
      >
        <X className="w-6 h-6 text-white" />
      </button>
      
      {/* Zoom controls */}
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
        
        {/* Rotation controls */}
        <div className="h-6 w-px bg-white/30 mx-1"></div>
        
        <button
          onClick={(e) => { e.stopPropagation(); rotateLeft(); }}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          title="Rotate Left"
        >
          <RotateCcw className="w-5 h-5 text-white" />
        </button>
        
        <button
          onClick={(e) => { e.stopPropagation(); resetRotation(); }}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-xs font-medium text-white"
          title="Reset Rotation"
        >
          0°
        </button>
        
        <button
          onClick={(e) => { e.stopPropagation(); rotateRight(); }}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          title="Rotate Right"
        >
          <RotateCw className="w-5 h-5 text-white" />
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
      
      {/* Image container with scroll */}
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
          <div 
            ref={imageRef}
            className="flex items-center justify-center min-w-full min-h-full"
          >
            <img
              src={pageImage}
              alt={`Zoomed view - Page ${pageNumber}`}
              className={`${isFullscreen ? 'min-w-full min-h-full' : 'min-w-[90vw] min-h-[80vh]'} object-contain transition-transform duration-300`}
              style={{
                transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                transformOrigin: 'center center'
              }}
              draggable="false"
            />
          </div>
        ) : null}
      </motion.div>
      
      {/* Mobile gesture hints */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 sm:hidden">
        <div className="flex flex-col items-center gap-1 text-white/80 text-xs bg-black/70 rounded-lg p-2">
          <div className="flex items-center gap-1">
            <div className="p-1 bg-white/20 rounded">
              <ZoomIn className="w-3 h-3" />
            </div>
            <span>Pinch to zoom</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="p-1 bg-white/20 rounded">
              <RotateCw className="w-3 h-3" />
            </div>
            <span>Rotate buttons above</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="p-1 bg-white/20 rounded">
              <Maximize2 className="w-3 h-3" />
            </div>
            <span>Tap for fullscreen</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Smart filename generator for extracted PDF ---
const generatePdfFilename = (originalFilename: string, pages: number[] = []): string => {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
  
  // Clean original filename
  const cleanName = originalFilename
    .replace(/\.pdf$/i, '')
    .replace(/[^a-zA-Z0-9\s-_]/g, '')
    .substring(0, 30)
    .trim();
  
  // Add page info if extracting specific pages
  let pageSuffix = '';
  if (pages.length > 0) {
    if (pages.length <= 3) {
      pageSuffix = `_pages_${pages.join('-')}`;
    } else {
      pageSuffix = `_${pages.length}_pages`;
    }
  }
  
  return `${cleanName}_extracted${pageSuffix}_${dateStr}.pdf`;
};

export default function PdfPageExtractorTool() {
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

    // Enhanced Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [downloadingAll, setDownloadingAll] = useState(false);
    const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
    const [downloadProgress, setDownloadProgress] = useState(0);
    
    // New pagination features
    const [showGoToPage, setShowGoToPage] = useState(false);
    const [goToPageInput, setGoToPageInput] = useState("");
    const [jumpToSection, setJumpToSection] = useState<"first" | "last" | "middle" | null>(null);

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

    // Calculate selected pages count and numbers
    const selectedPagesCount = pageData.filter(page => page.isSelected).length;
    const selectedPageNumbers = pageData
      .filter(page => page.isSelected)
      .map(page => page.pageNumber);

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

            // Generate page data with initial selection false (no pages selected by default)
            const newPageData: PageData[] = Array.from(
                { length: pageCount },
                (_, i) => ({
                    pageNumber: i + 1,
                    fileName: generatePdfFilename(file.name),
                    isSelected: false, // No pages selected by default
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
        setDownloadSuccess(`✓ All ${pageData.length} pages selected for extraction`);
        setTimeout(() => setDownloadSuccess(null), 2000);
    };

    // Deselect all pages
    const deselectAllPages = () => {
        const updatedPageData = pageData.map(page => ({
            ...page,
            isSelected: false
        }));
        setPageData(updatedPageData);
        setDownloadSuccess(`✗ All ${pageData.length} pages deselected`);
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

    // Select first page only
    const selectFirstPage = () => {
        const updatedPageData = pageData.map((page, index) => ({
            ...page,
            isSelected: index === 0
        }));
        setPageData(updatedPageData);
        setDownloadSuccess("✓ First page selected");
        setTimeout(() => setDownloadSuccess(null), 2000);
    };

    // Select last page only
    const selectLastPage = () => {
        const updatedPageData = pageData.map((page, index) => ({
            ...page,
            isSelected: index === pageData.length - 1
        }));
        setPageData(updatedPageData);
        setDownloadSuccess("✓ Last page selected");
        setTimeout(() => setDownloadSuccess(null), 2000);
    };

    // Download extracted PDF with selected pages
    const handleDownloadExtractedPdf = async () => {
        if (!pdfData || pageData.length === 0) {
            alert("PDF not available.");
            return;
        }

        // Check if at least one page is selected
        if (selectedPagesCount === 0) {
            setDownloadSuccess("✗ Please select at least one page to extract");
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

            // Save extracted PDF
            const pdfBytes = await newPdf.save();
            const blob = new Blob([new Uint8Array(pdfBytes)], {
                type: "application/pdf",
            });

            const fileName = generatePdfFilename(files[0].name, selectedPageNumbers);
            downloadFile(blob, fileName);

            // Success message
            setDownloadSuccess(`✓ Successfully extracted ${selectedPagesCount} pages!`);
            setTimeout(() => setDownloadSuccess(null), 5000);

        } catch (error) {
            console.error("Error downloading extracted PDF:", error);
            setDownloadSuccess("✗ Failed to extract PDF. Please try again.");
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
            statusElement.innerText = "Extracting...";
            statusElement.className = "text-sm text-yellow-600 dark:text-yellow-400 mt-1 font-medium animate-pulse";
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

            const fileName = `page_${pageIndex + 1}_extracted.pdf`;
            downloadFile(blob, fileName);

            // Show success message
            setDownloadSuccess(`✓ Page ${pageIndex + 1} extracted successfully!`);
            setTimeout(() => setDownloadSuccess(null), 3000);

            if (statusElement) {
                statusElement.innerText = "✓ Extracted!";
                statusElement.className = "text-sm text-green-600 dark:text-green-400 mt-1 font-medium";
            }

        } catch (error) {
            console.error(`Error extracting page ${pageIndex + 1}:`, error);
            setDownloadSuccess(`✗ Failed to extract page ${pageIndex + 1}`);
            setTimeout(() => setDownloadSuccess(null), 3000);
            
            if (statusElement) {
                statusElement.innerText = "✗ Extraction failed";
                statusElement.className = "text-sm text-red-600 dark:text-red-400 mt-1 font-medium";
            }
        } finally {
            setTimeout(() => {
                if (statusElement) {
                    statusElement.innerText = "Ready to extract";
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

    // Enhanced Pagination controls
    const goToPage = (pageNumber: number) => {
        const page = Math.min(Math.max(1, pageNumber), totalPages);
        setCurrentPage(page);
        setShowGoToPage(false);
        setGoToPageInput("");
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

    const jumpToFirstPage = () => {
        setCurrentPage(1);
        setJumpToSection("first");
        setTimeout(() => setJumpToSection(null), 1000);
    };

    const jumpToLastPage = () => {
        setCurrentPage(totalPages);
        setJumpToSection("last");
        setTimeout(() => setJumpToSection(null), 1000);
    };

    const jumpToMiddlePage = () => {
        const middlePage = Math.ceil(totalPages / 2);
        setCurrentPage(middlePage);
        setJumpToSection("middle");
        setTimeout(() => setJumpToSection(null), 1000);
    };

    const handleGoToPageSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (goToPageInput.trim()) {
            const pageNum = parseInt(goToPageInput);
            if (!isNaN(pageNum)) {
                goToPage(pageNum);
            }
        }
    };

    // Items per page options - responsive
    const itemsPerPageOptions = isMobile ? [4, 6, 8] : [6, 9, 12];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20 py-8 sm:py-12 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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
                                className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
                            >
                                <div className={`p-4 md:p-5 rounded-2xl shadow-2xl backdrop-blur-sm ${
                                    downloadSuccess.startsWith("✓") 
                                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white" 
                                        : "bg-gradient-to-r from-red-500 to-orange-600 text-white"
                                }`}>
                                    <div className="flex items-center justify-center gap-3">
                                        {downloadSuccess.startsWith("✓") ? (
                                            <CheckCircle className="w-6 h-6 md:w-7 md:h-7" />
                                        ) : (
                                            <X className="w-6 h-6 md:w-7 md:h-7" />
                                        )}
                                        <span className="font-bold text-lg md:text-xl">{downloadSuccess}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Header - Responsive */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8 md:mb-12">
                        <a
                            href="/"
                            className="inline-flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all font-medium group text-base md:text-lg"
                        >
                            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Tools</span>
                        </a>
                        
                        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-purple-950/30 px-4 py-2 md:px-5 md:py-2.5 rounded-full mt-2 md:mt-0">
                            <Shield className="w-4 h-4 md:w-5 md:h-5 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm md:text-base text-blue-700 dark:text-blue-300 font-medium">
                                Secure & Private • No Uploads
                            </span>
                        </div>
                    </div>

                    {/* Hero Section - Responsive */}
                    <div className="text-center mb-12 md:mb-16 lg:mb-20">
                        <motion.div 
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl md:rounded-[2rem] mb-4 md:mb-6 shadow-2xl"
                        >
                            <Scissors className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-white" />
                        </motion.div>
                        
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-3 md:mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent px-2">
                            PDF Page Extractor Tool
                        </h1>
                        
                        <p className="text-base md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed px-4">
                            Extract specific pages from your PDF documents.
                            <span className="block text-blue-600 dark:text-blue-400 font-bold mt-2 md:mt-3 text-lg md:text-2xl">
                                Select pages to extract and download them as a new PDF!
                            </span>
                        </p>
                    </div>

                    {/* Main Card - Responsive */}
                    <div className="bg-white dark:bg-gray-900 rounded-3xl md:rounded-[2rem] border-2 border-gray-200 dark:border-gray-800 shadow-2xl p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
                        {/* Upload Section */}
                        <div className="mb-6 md:mb-8">
                            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                                <div className="p-2 md:p-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl">
                                    <FolderOpen className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                                        Upload PDF
                                    </h2>
                                    <p className="text-sm md:text-base lg:text-lg text-gray-500 dark:text-gray-400 mt-1">
                                        Select your PDF file to extract pages
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
                                        className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
                                    >
                                        <div className="p-3 md:p-4 lg:p-5 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 rounded-xl md:rounded-2xl border border-blue-200 dark:border-blue-800/50">
                                            <div className="flex items-center gap-2 md:gap-3 mb-2">
                                                <Scissors className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                                                <span className="text-base md:text-lg font-bold text-blue-800 dark:text-blue-300">
                                                    Extract Pages
                                                </span>
                                            </div>
                                            <p className="text-sm md:text-base text-blue-700/80 dark:text-blue-400/80">
                                                Select specific pages to extract
                                            </p>
                                        </div>
                                        
                                        <div className="p-3 md:p-4 lg:p-5 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 rounded-xl md:rounded-2xl border border-purple-200 dark:border-purple-800/50">
                                            <div className="flex items-center gap-2 md:gap-3 mb-2">
                                                <Grid3x3 className="w-5 h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" />
                                                <span className="text-base md:text-lg font-bold text-purple-800 dark:text-purple-300">
                                                    Batch Selection
                                                </span>
                                            </div>
                                            <p className="text-sm md:text-base text-purple-700/80 dark:text-purple-400/80">
                                                Select multiple pages at once
                                            </p>
                                        </div>
                                        
                                        <div className="p-3 md:p-4 lg:p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-900/20 rounded-xl md:rounded-2xl border border-green-200 dark:border-green-800/50">
                                            <div className="flex items-center gap-2 md:gap-3 mb-2">
                                                <Clock className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" />
                                                <span className="text-base md:text-lg font-bold text-green-800 dark:text-green-300">
                                                    Real-time Preview
                                                </span>
                                            </div>
                                            <p className="text-sm md:text-base text-green-700/80 dark:text-green-400/80">
                                                See selected pages instantly
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Content Area */}
                        {files.length > 0 && (
                            <div className="space-y-4 md:space-y-6">
                                {/* Selected File Info */}
                                <div className="p-4 md:p-5 lg:p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20 rounded-xl md:rounded-2xl border-2 border-blue-200 dark:border-blue-800/30">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
                                        <div className="flex items-center gap-3 md:gap-4">
                                            <div className="p-2 md:p-3 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-md">
                                                <FileImage className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg lg:text-xl truncate">
                                                    {files[0].name}
                                                </h3>
                                                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                                                    {(files[0].size / 1024 / 1024).toFixed(2)} MB • {pageData.length} pages
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleReset}
                                            className="px-3 py-2 md:px-4 md:py-2.5 text-sm md:text-base font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg md:rounded-xl transition-colors mt-3 md:mt-0 w-full md:w-auto"
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
                                            className="space-y-4 md:space-y-6"
                                        >
                                            <div className="text-center">
                                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
                                                    Loading PDF 📄
                                                </h3>
                                                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
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
                                                    : "Preparing extractor..."
                                                }
                                            />
                                            
                                            <div className="flex justify-center">
                                                <div className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-blue-50 dark:bg-blue-950/30 rounded-full">
                                                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
                                                    <span className="text-sm md:text-base text-blue-700 dark:text-blue-300">
                                                        Preparing page selection for extraction
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
                                            className="w-full py-3 md:py-4 px-4 md:px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl hover:shadow-3xl transition-all text-base md:text-lg flex items-center justify-center gap-2"
                                        >
                                            <Scissors className="w-5 h-5 md:w-6 md:h-6" />
                                            <span>Load PDF for Extraction</span>
                                            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                                        </motion.button>
                                    )}

                                    {/* Results */}
                                    {processed && (
                                        <motion.div
                                            key="results"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-6 md:space-y-8"
                                        >
                                            {/* Selection Summary Banner */}
                                            <div className="p-4 md:p-5 lg:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl md:rounded-2xl border-2 border-green-200 dark:border-green-800/50">
                                                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                                                    <div className="flex items-center justify-center md:justify-start">
                                                        <div className="p-2 md:p-3 bg-green-100 dark:bg-green-900/50 rounded-lg md:rounded-xl">
                                                            <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-600 dark:text-green-400" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 text-center md:text-left">
                                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                                            PDF Loaded Successfully! 🎉
                                                        </h3>
                                                        <p className="text-green-700 dark:text-green-300 font-bold text-base md:text-lg">
                                                            {selectedPagesCount} of {pageData.length} pages selected for extraction
                                                        </p>
                                                        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mt-1">
                                                            Click on pages to select/deselect them for extraction
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <div className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg md:rounded-xl text-sm md:text-base">
                                                            {selectedPagesCount} Selected
                                                        </div>
                                                        <div className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-lg md:rounded-xl text-sm md:text-base">
                                                            Pages {selectedPageNumbers.length > 0 ? selectedPageNumbers.join(', ') : 'None'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Batch Selection Controls - Responsive */}
                                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl md:rounded-2xl p-4 md:p-5 border-2 border-blue-200 dark:border-blue-800/30">
                                                <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                                                    <Grid3x3 className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                                                    Quick Page Selection
                                                </h4>
                                                
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-3 md:mb-4">
                                                    <button
                                                        onClick={selectAllPages}
                                                        disabled={processing}
                                                        className="py-2 md:py-3 px-3 md:px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-lg md:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1 text-sm md:text-base"
                                                    >
                                                        <Check className="w-3 h-3 md:w-4 md:h-4" />
                                                        <span>Select All</span>
                                                    </button>
                                                    <button
                                                        onClick={deselectAllPages}
                                                        disabled={processing}
                                                        className="py-2 md:py-3 px-3 md:px-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold rounded-lg md:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1 text-sm md:text-base"
                                                    >
                                                        <X className="w-3 h-3 md:w-4 md:h-4" />
                                                        <span>Deselect All</span>
                                                    </button>
                                                    <button
                                                        onClick={selectEvenPages}
                                                        disabled={processing}
                                                        className="py-2 md:py-3 px-3 md:px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg md:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1 text-sm md:text-base"
                                                    >
                                                        <span className="text-base font-bold">2</span>
                                                        <span>Even Pages</span>
                                                    </button>
                                                    <button
                                                        onClick={selectOddPages}
                                                        disabled={processing}
                                                        className="py-2 md:py-3 px-3 md:px-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold rounded-lg md:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1 text-sm md:text-base"
                                                    >
                                                        <span className="text-base font-bold">1</span>
                                                        <span>Odd Pages</span>
                                                    </button>
                                                </div>
                                                
                                                <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-3">
                                                    <button
                                                        onClick={selectFirstPage}
                                                        disabled={processing}
                                                        className="py-2 md:py-3 px-3 md:px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg md:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1 text-sm md:text-base"
                                                    >
                                                        <span className="text-base font-bold">1st</span>
                                                        <span>First Page</span>
                                                    </button>
                                                    <button
                                                        onClick={selectLastPage}
                                                        disabled={processing}
                                                        className="py-2 md:py-3 px-3 md:px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-lg md:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1 text-sm md:text-base"
                                                    >
                                                        <span className="text-base font-bold">Last</span>
                                                        <span>Last Page</span>
                                                    </button>
                                                </div>
                                                
                                                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 text-center mt-3 md:mt-4">
                                                    Quick selection options for {pageData.length} pages
                                                </p>
                                            </div>

                                            {/* Enhanced Pagination Controls - Responsive */}
                                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl md:rounded-2xl p-4 md:p-5 border-2 border-blue-200 dark:border-blue-800/30">
                                                <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 mb-3 md:mb-4">
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 dark:text-white text-lg md:text-xl">
                                                            Showing {startIndex + 1}-{endIndex} of {pageData.length} pages
                                                        </h4>
                                                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                                                            {selectedPagesCount} pages selected for extraction
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-2 md:gap-3">
                                                        <label className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium">
                                                            Items per page:
                                                        </label>
                                                        <select
                                                            value={itemsPerPage}
                                                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                                            className="px-2 py-1.5 md:px-3 md:py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm"
                                                        >
                                                            {itemsPerPageOptions.map(option => (
                                                                <option key={option} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                {/* Enhanced Pagination Buttons */}
                                                <div className="space-y-3">
                                                    {/* Quick Navigation Buttons */}
                                                    <div className="flex flex-wrap items-center justify-center gap-2">
                                                        <button
                                                            onClick={jumpToFirstPage}
                                                            disabled={currentPage === 1}
                                                            className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg text-sm flex items-center gap-1 disabled:opacity-50"
                                                        >
                                                            <ChevronLeft className="w-3 h-3" />
                                                            <span>First</span>
                                                        </button>
                                                        
                                                        <button
                                                            onClick={jumpToMiddlePage}
                                                            disabled={totalPages <= 2}
                                                            className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold rounded-lg text-sm flex items-center gap-1 disabled:opacity-50"
                                                        >
                                                            <span>Middle</span>
                                                        </button>
                                                        
                                                        <button
                                                            onClick={jumpToLastPage}
                                                            disabled={currentPage === totalPages}
                                                            className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg text-sm flex items-center gap-1 disabled:opacity-50"
                                                        >
                                                            <span>Last</span>
                                                            <ChevronRightIcon className="w-3 h-3" />
                                                        </button>
                                                    </div>

                                                    {/* Main Pagination */}
                                                    <div className="flex flex-wrap items-center justify-center gap-2">
                                                        <button
                                                            onClick={prevPage}
                                                            disabled={currentPage === 1}
                                                            className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                                                        >
                                                            <ChevronLeft className="w-3 h-3" />
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
                                                                    className={`px-3 py-1.5 rounded-lg font-bold transition-colors text-sm ${
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
                                                            className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                                                        >
                                                            <ChevronRightIcon className="w-3 h-3" />
                                                        </button>
                                                    </div>

                                                    {/* Go to Page Section */}
                                                    <div className="flex flex-col items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                                                        {!showGoToPage ? (
                                                            <button
                                                                onClick={() => setShowGoToPage(true)}
                                                                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1"
                                                            >
                                                                <Navigation className="w-3 h-3" />
                                                                Go to page
                                                            </button>
                                                        ) : (
                                                            <form onSubmit={handleGoToPageSubmit} className="flex items-center gap-2">
                                                                <input
                                                                    type="number"
                                                                    min="1"
                                                                    max={totalPages}
                                                                    value={goToPageInput}
                                                                    onChange={(e) => setGoToPageInput(e.target.value)}
                                                                    placeholder="Page number"
                                                                    className="w-20 px-2 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-center text-sm"
                                                                />
                                                                <button
                                                                    type="submit"
                                                                    className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg text-sm"
                                                                >
                                                                    Go
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setShowGoToPage(false);
                                                                        setGoToPageInput("");
                                                                    }}
                                                                    className="px-3 py-1.5 bg-gray-500 text-white font-bold rounded-lg text-sm"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </form>
                                                        )}
                                                        
                                                        {/* Page Info */}
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                                            Page {currentPage} of {totalPages} • {pageData.length} total pages
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Download Progress */}
                                            {downloadingAll && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="p-4 md:p-5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl border-2 border-blue-200 dark:border-blue-800/30"
                                                >
                                                    <div className="flex items-center justify-between mb-2 md:mb-3">
                                                        <span className="font-bold text-blue-700 dark:text-blue-300 text-sm md:text-base">
                                                            Extracting {downloadProgress}% complete
                                                        </span>
                                                        <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                                            {Math.round(downloadProgress / 100 * selectedPagesCount)} of {selectedPagesCount} pages
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 md:h-3">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${downloadProgress}%` }}
                                                            className="h-2 md:h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                                                        />
                                                    </div>
                                                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1 md:mt-2">
                                                        Please wait while pages are being extracted...
                                                    </p>
                                                </motion.div>
                                            )}

                                            {/* Page Grid */}
                                            <div id="page-grid">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-1 md:gap-2">
                                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-1 md:gap-2">
                                                        <Grid3x3 className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                                                        Pages (Page {currentPage} of {totalPages})
                                                    </h3>
                                                    <span className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium">
                                                        {isMobile ? "Tap to select/deselect" : "Click to select/deselect"} • Click to zoom
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
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
                                                                <div className={`bg-gradient-to-br rounded-xl md:rounded-2xl border-2 p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 ${
                                                                    page.isSelected
                                                                        ? 'from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-blue-500 dark:border-blue-600'
                                                                        : 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-gray-300 dark:border-gray-700'
                                                                }`}>
                                                                    <div className="flex flex-col items-center text-center space-y-2 md:space-y-3">
                                                                        <PdfPageRenderer 
                                                                            pageNumber={page.pageNumber}
                                                                            pdfData={pdfData}
                                                                            fileName={page.fileName}
                                                                            isSelected={page.isSelected}
                                                                            onSelectionToggle={() => togglePageSelection(actualIndex)}
                                                                            onZoomClick={() => handlePageZoom(page.pageNumber, page.fileName)}
                                                                        />
                                                                        
                                                                        <div className="w-full">
                                                                            <h4 className="font-bold text-gray-900 dark:text-white text-base md:text-lg mb-1">
                                                                                Page {page.pageNumber}
                                                                            </h4>
                                                                            <p className={`text-sm md:text-base mb-1 md:mb-2 ${
                                                                                page.isSelected 
                                                                                    ? 'text-blue-600 dark:text-blue-400' 
                                                                                    : 'text-gray-600 dark:text-gray-400'
                                                                            }`}>
                                                                                {page.isSelected ? '✓ Selected for extraction' : '✗ Not selected'}
                                                                            </p>
                                                                            <div className="flex items-center justify-center gap-1 mb-2 md:mb-3">
                                                                                <span className={`px-2 py-0.5 text-xs md:text-sm rounded-full ${
                                                                                    page.isSelected 
                                                                                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                                                                        : 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300'
                                                                                }`}>
                                                                                    {page.isSelected ? 'Extract' : 'Skip'}
                                                                                </span>
                                                                            </div>
                                                                            
                                                                            <div className="space-y-1 md:space-y-2">
                                                                                <span
                                                                                    id={`status-${actualIndex}`}
                                                                                    className="text-sm md:text-base text-blue-600 dark:text-blue-400 font-medium"
                                                                                >
                                                                                    Ready to extract
                                                                                </span>
                                                                                
                                                                                <div className="grid grid-cols-2 gap-2">
                                                                                    <motion.button
                                                                                        whileHover={{ scale: 1.02 }}
                                                                                        whileTap={{ scale: 0.98 }}
                                                                                        onClick={() => togglePageSelection(actualIndex)}
                                                                                        className={`py-2 px-3 md:py-2.5 md:px-4 font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1 text-sm md:text-base ${
                                                                                            page.isSelected
                                                                                                ? 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white'
                                                                                                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                                                                                        }`}
                                                                                    >
                                                                                        {page.isSelected ? (
                                                                                            <>
                                                                                                <X className="w-3 h-3 md:w-4 md:h-4" />
                                                                                                Deselect
                                                                                            </>
                                                                                        ) : (
                                                                                            <>
                                                                                                <Scissors className="w-3 h-3 md:w-4 md:h-4" />
                                                                                                Extract
                                                                                            </>
                                                                                        )}
                                                                                    </motion.button>
                                                                                    
                                                                                    <motion.button
                                                                                        whileHover={{ scale: 1.02 }}
                                                                                        whileTap={{ scale: 0.98 }}
                                                                                        onClick={() => handleDownloadPage(actualIndex)}
                                                                                        className="py-2 px-3 md:py-2.5 md:px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1 text-sm md:text-base"
                                                                                    >
                                                                                        <Download className="w-3 h-3 md:w-4 md:h-4" />
                                                                                        Extract
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

                                            {/* Enhanced Pagination Controls - Bottom */}
                                            {totalPages > 1 && (
                                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl md:rounded-2xl p-4 md:p-5 border-2 border-blue-200 dark:border-blue-800/30">
                                                    <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 mb-3 md:mb-4">
                                                        <div>
                                                            <h4 className="font-bold text-gray-900 dark:text-white text-lg md:text-xl">
                                                                Page {currentPage} of {totalPages}
                                                            </h4>
                                                            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                                                                Navigate between pages
                                                            </p>
                                                        </div>
                                                        
                                                        <div className="flex items-center gap-2 md:gap-3">
                                                            <span className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium">
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
                                                                className="w-16 md:w-20 px-2 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-center text-sm"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Enhanced Pagination Buttons */}
                                                    <div className="space-y-3">
                                                        {/* Quick Navigation Buttons */}
                                                        <div className="flex flex-wrap items-center justify-center gap-2">
                                                            <button
                                                                onClick={jumpToFirstPage}
                                                                disabled={currentPage === 1}
                                                                className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg text-sm flex items-center gap-1 disabled:opacity-50"
                                                            >
                                                                <ChevronLeft className="w-3 h-3" />
                                                                First
                                                            </button>
                                                            
                                                            <button
                                                                onClick={jumpToMiddlePage}
                                                                disabled={totalPages <= 2}
                                                                className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold rounded-lg text-sm flex items-center gap-1 disabled:opacity-50"
                                                            >
                                                                Middle
                                                            </button>
                                                            
                                                            <button
                                                                onClick={jumpToLastPage}
                                                                disabled={currentPage === totalPages}
                                                                className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg text-sm flex items-center gap-1 disabled:opacity-50"
                                                            >
                                                                Last
                                                                <ChevronRightIcon className="w-3 h-3" />
                                                            </button>
                                                        </div>

                                                        {/* Main Pagination */}
                                                        <div className="flex flex-wrap items-center justify-center gap-2">
                                                            <button
                                                                onClick={prevPage}
                                                                disabled={currentPage === 1}
                                                                className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm flex items-center gap-1"
                                                            >
                                                                <ChevronLeft className="w-3 h-3" />
                                                                <span>Prev</span>
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
                                                                        className={`px-3 py-1.5 rounded-lg font-bold transition-colors text-sm ${
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
                                                                className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm flex items-center gap-1"
                                                            >
                                                                <span>Next</span>
                                                                <ChevronRightIcon className="w-3 h-3" />
                                                            </button>
                                                        </div>

                                                        {/* Page Statistics */}
                                                        <div className="flex flex-wrap justify-center gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                                                            <div className="text-center">
                                                                <div className="text-xs text-gray-500 dark:text-gray-400">Current Position</div>
                                                                <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                                                    {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, pageData.length)}
                                                                </div>
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="text-xs text-gray-500 dark:text-gray-400">Progress</div>
                                                                <div className="text-sm font-bold text-green-600 dark:text-green-400">
                                                                    {Math.round((currentPage / totalPages) * 100)}%
                                                                </div>
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="text-xs text-gray-500 dark:text-gray-400">Remaining</div>
                                                                <div className="text-sm font-bold text-orange-600 dark:text-orange-400">
                                                                    {totalPages - currentPage} pages
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Download Button Section - Responsive */}
                                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 border-2 border-blue-200 dark:border-blue-800/50">
                                                <div className="text-center mb-4 md:mb-6">
                                                    <h4 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-2 md:mb-3">
                                                        Download Extracted Pages
                                                    </h4>
                                                    <p className="text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 mb-3 md:mb-4">
                                                        Download selected pages as a new PDF document
                                                    </p>
                                                    
                                                    <div className="space-y-3 md:space-y-4">
                                                        <motion.button
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            onClick={handleDownloadExtractedPdf}
                                                            disabled={downloadingAll || selectedPagesCount === 0}
                                                            className={`w-full py-3 md:py-4 px-4 md:px-6 text-white font-bold rounded-xl md:rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all text-base md:text-lg flex items-center justify-center gap-2 ${
                                                                selectedPagesCount === 0
                                                                    ? 'bg-gradient-to-r from-gray-500 to-gray-600'
                                                                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                                                            }`}
                                                        >
                                                            {downloadingAll ? (
                                                                <>
                                                                    <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
                                                                    <span>Extracting...</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Scissors className="w-5 h-5 md:w-6 md:h-6" />
                                                                    <span>Extract {selectedPagesCount} Pages</span>
                                                                </>
                                                            )}
                                                        </motion.button>
                                                        
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                                                            <div className="p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl border border-blue-200 dark:border-blue-700">
                                                                <h5 className="font-bold text-gray-900 dark:text-white mb-1 text-sm md:text-base">
                                                                    Pages to Extract
                                                                </h5>
                                                                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                                                                    {selectedPagesCount} pages selected
                                                                </p>
                                                            </div>
                                                            
                                                            <div className="p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl border border-purple-200 dark:border-purple-700">
                                                                <h5 className="font-bold text-gray-900 dark:text-white mb-1 text-sm md:text-base">
                                                                    Page Numbers
                                                                </h5>
                                                                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 truncate">
                                                                    {selectedPageNumbers.length > 0 ? selectedPageNumbers.join(', ') : 'None selected'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <p id="status-all-1" className="text-sm md:text-base text-blue-600 dark:text-blue-400 font-medium mt-2 md:mt-3">
                                                        {selectedPagesCount === 0 
                                                            ? "Select at least one page to extract"
                                                            : `Ready to extract pages: ${selectedPageNumbers.join(', ')}`
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Reset & Another PDF */}
                                            <div className="text-center space-y-2 md:space-y-3">
                                                <button
                                                    onClick={handleReset}
                                                    className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg md:rounded-xl transition-colors text-sm md:text-base"
                                                >
                                                    <FolderOpen className="w-4 h-4 md:w-5 md:h-5" />
                                                    Extract Pages from Another PDF
                                                </button>
                                                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
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
                        className="mt-8 md:mt-12 lg:mt-16 p-4 md:p-5 lg:p-6 bg-gradient-to-r from-white to-purple-50/50 dark:from-gray-900 dark:to-purple-950/20 rounded-xl md:rounded-2xl border-2 border-purple-300/50 dark:border-purple-800/50 shadow-xl backdrop-blur-sm"
                    >
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white mb-4 md:mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 px-2">
                            Explore All PDF Tools 🚀
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
                            {toolKeywords.map((tool, index) => (
                                <motion.div
                                    key={tool.label}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    whileHover={{ 
                                        scale: 1.01, 
                                        boxShadow: "0 8px 20px rgba(120, 80, 255, 0.2)",
                                        y: -2
                                    }}
                                    whileTap={{ scale: 0.99 }}
                                    className="w-full"
                                >
                                    <a
                                        href={tool.url}
                                        className="flex items-center justify-start w-full p-3 md:p-4 
                                                 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
                                                 border border-gray-200 dark:border-gray-700 
                                                 rounded-lg md:rounded-xl hover:border-purple-400 dark:hover:border-purple-500
                                                 transition-all duration-300 group
                                                 shadow-md hover:shadow-lg"
                                    >
                                        <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 
                                                      flex items-center justify-center 
                                                      bg-gradient-to-br from-blue-500 to-purple-600 
                                                      rounded-lg md:rounded-xl mr-2 md:mr-3
                                                      group-hover:scale-105 transition-transform duration-300">
                                            <span className="text-sm md:text-base">
                                                {getToolIcon(tool.label)}
                                            </span>
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <span className="text-sm md:text-base font-bold text-gray-800 dark:text-gray-200 
                                                           group-hover:text-purple-600 dark:group-hover:text-purple-400 
                                                           transition-colors duration-300 block truncate">
                                                {tool.label}
                                            </span>
                                            <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-0.5 block line-clamp-2">
                                                {getToolDescription(tool.label)}
                                            </span>
                                        </div>
                                        
                                        <div className="flex-shrink-0 ml-1">
                                            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-purple-500 
                                                          group-hover:translate-x-0.5 transition-all duration-300" />
                                        </div>
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                        
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-4 md:mt-6 text-center"
                        >
                            <a href="/tools" className="inline-block px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                                             text-white font-bold rounded-full md:rounded-xl
                                             hover:from-blue-700 hover:to-purple-700
                                             active:scale-95 transition-all duration-300
                                             shadow-lg hover:shadow-xl
                                             text-sm md:text-base">
                                View All Tools ({toolKeywords.length}+)
                            </a>
                        </motion.div>
                    </motion.div>

                  

                    {/* Info Footer - Responsive */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center mt-8 md:mt-12">
                        <div className="p-3 md:p-4 lg:p-5">
                            <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl md:rounded-2xl mb-2 md:mb-3">
                                <Scissors className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1 md:mb-2 text-sm md:text-base lg:text-lg">
                                Selective Extraction
                            </h4>
                            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                Choose exactly which pages to extract
                            </p>
                        </div>
                        
                        <div className="p-3 md:p-4 lg:p-5">
                            <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl md:rounded-2xl mb-2 md:mb-3">
                                <Grid3x3 className="w-5 h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1 md:mb-2 text-sm md:text-base lg:text-lg">
                                Batch Selection
                            </h4>
                            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                Select multiple pages with one click
                            </p>
                        </div>
                        
                        <div className="p-3 md:p-4 lg:p-5">
                            <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-xl md:rounded-2xl mb-2 md:mb-3">
                                <Download className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1 md:mb-2 text-sm md:text-base lg:text-lg">
                                Clean PDF Output
                            </h4>
                            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                Download extracted pages as new PDF
                            </p>
                        </div>
                    </div>

                    {/* Mobile Tips Banner */}
                    {isMobile && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl border-2 border-blue-200 dark:border-blue-800/30"
                        >
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-1 text-sm">
                                <Smartphone className="w-4 h-4 text-blue-600" />
                                Mobile Tips
                            </h4>
                            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                <li className="flex items-start gap-1">
                                    <span className="text-blue-600">•</span>
                                    <span>Tap on pages to select/deselect them</span>
                                </li>
                                <li className="flex items-start gap-1">
                                    <span className="text-blue-600">•</span>
                                    <span>Use quick selection for multiple pages</span>
                                </li>
                                <li className="flex items-start gap-1">
                                    <span className="text-blue-600">•</span>
                                    <span>Pinch to zoom in page preview</span>
                                </li>
                                <li className="flex items-start gap-1">
                                    <span className="text-blue-600">•</span>
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