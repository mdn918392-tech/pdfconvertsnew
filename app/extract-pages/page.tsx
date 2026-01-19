"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from 'next/head';
import FAQSchema from "./FAQSchema";
import { faqData } from "./faqData";
import { motion, AnimatePresence } from "framer-motion";

import {
  Grid,
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
  ArrowRight,
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
  ListMusic,
} from "lucide-react";
import FileUploader from "@/app/components/FileUploader";
import ProgressBar from "@/app/components/ProgressBar";
import { downloadFile } from "../../utils/imageUtils";
import { PDFDocument } from "pdf-lib";
import BreadcrumbSchema from "./BreadcrumbSchema";
import ArticleSchema from "./ArticleSchema";
import HowToSchema from "./HowToSchema";




// Import pdfjs-dist with proper configuration
import * as pdfjsLib from "pdfjs-dist";

// Check if we're in browser before setting worker
if (typeof window !== "undefined" && typeof document !== "undefined") {
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



const tool = {
  id: "extract-pages",
  name: "Extract Pages",
  description: "Extract specific pages from PDF",
  category: "pdf",
  icon: "📑",
  color: "from-indigo-500 to-blue-500",
  href: "/extract-pages",
  path: "/tools/extract-pages",
};
// Explore All Tools Data
const exploreTools: Tool[] = [
  
  {
    id: "split-pdf",
    name: "Split PDF",
    description: "Split PDF into separate pages",
    category: "pdf",
    icon: "✂️",
    color: "from-orange-500 to-red-500",
    href: "/split-pdf",
    path: "/tools/split-pdf",
  },
  {
    id: "rotate-pdf",
    name: "Rotate PDF",
    description: "Rotate PDF pages",
    category: "pdf",
    icon: "🔄",
    color: "from-teal-500 to-cyan-500",
    href: "/rotate-pdf",
    path: "/tools/rotate-pdf",
  },
  {
    id: "jpg-to-pdf",
    name: "JPG to PDF",
    description: "Convert JPG images to PDF documents",
    category: "pdf",
    icon: "🖼️",
    color: "from-green-500 to-emerald-500",
    href: "/jpg-to-pdf",
    path: "/tools/jpg-to-pdf",
  },
  {
    id: "png-to-jpg",
    name: "PNG to JPG",
    description: "Convert PNG images to JPG format",
    category: "image",
    icon: "🔄",
    color: "from-emerald-500 to-green-500",
    href: "/png-to-jpg",
    path: "/tools/png-to-jpg",
  },
  {
    id: "pdf-to-jpg",
    name: "PDF to JPG",
    description: "Convert PDF pages to JPG images",
    category: "pdf",
    icon: "🖼️",
    color: "from-purple-500 to-pink-500",
    href: "/pdf-to-jpg",
    path: "/tools/pdf-to-jpg",
  },
  {
    id: "extract-pages",
    name: "Extract Pages",
    description: "Extract specific pages from PDF",
    category: "pdf",
    icon: "📑",
    color: "from-indigo-500 to-blue-500",
    href: "/extract-pages",
    path: "/tools/extract-pages",
  },
  {
    id: "compress-image",
    name: "Compress Image",
    description: "Reduce JPG/PNG file size",
    category: "image",
    icon: "📉",
    color: "from-blue-500 to-cyan-500",
    href: "/compress-image",
    path: "/tools/compress-image",
  },
  {
    id: "merge-pdf",
    name: "Merge PDF",
    description: "Combine multiple PDF files into one",
    category: "pdf",
    icon: "🔗",
    color: "from-violet-500 to-purple-500",
    href: "/merge-pdf",
    path: "/tools/merge-pdf",
  },
  {
    id: "remove-pages",
    name: "Remove Pages",
    description: "Delete specific pages from PDF",
    category: "pdf",
    icon: "🗑️",
    color: "from-rose-500 to-pink-500",
    href: "/remove-pages",
    path: "/tools/remove-pages",
  },
];

// --- TOOL ICON HELPER FUNCTION ---
const getToolIcon = (label: string): React.ReactNode => {
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes("extract") || lowerLabel.includes("split"))
    return <Scissors className="w-5 h-5 text-white" />;
  if (lowerLabel.includes("editor") || lowerLabel.includes("edit"))
    return <Edit className="w-5 h-5 text-white" />;
  if (
    lowerLabel.includes("jpg") ||
    lowerLabel.includes("png") ||
    lowerLabel.includes("image")
  )
    return <ImageIcon className="w-5 h-5 text-white" />;
  if (lowerLabel.includes("rotate") || lowerLabel.includes("rotator"))
    return <Rotate3D className="w-5 h-5 text-white" />;
  if (lowerLabel.includes("word"))
    return <FileText className="w-5 h-5 text-white" />;
  if (lowerLabel.includes("powerpoint"))
    return <Layers className="w-5 h-5 text-white" />;
  if (lowerLabel.includes("excel"))
    return <SquareGanttChart className="w-5 h-5 text-white" />;
  if (lowerLabel.includes("converter") || lowerLabel.includes("creator"))
    return <Zap className="w-5 h-5 text-white" />;
  if (lowerLabel.includes("mobile app"))
    return <Tablet className="w-5 h-5 text-white" />;
  return <File className="w-5 h-5 text-white" />;
};

// --- TOOL DESCRIPTION HELPER FUNCTION ---
const getToolDescription = (label: string): string => {
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes("extract") || lowerLabel.includes("split"))
    return "Extract specific pages from PDF documents easily.";
  if (lowerLabel.includes("editor") || lowerLabel.includes("edit"))
    return "Edit and modify your PDF documents easily.";
  if (lowerLabel.includes("rotate") || lowerLabel.includes("rotator"))
    return "Rotate PDF pages to any angle and save as new PDF.";
  if (
    lowerLabel.includes("jpg") ||
    lowerLabel.includes("png") ||
    lowerLabel.includes("image")
  )
    return "Convert PDF pages to high-quality JPG or PNG images.";
  if (lowerLabel.includes("word"))
    return "Convert PDF documents directly to editable DOCX format.";
  if (lowerLabel.includes("creator"))
    return "Combine multiple documents or images into a new PDF.";
  if (lowerLabel.includes("converter"))
    return "Convert files to/from PDF, including JPG, PNG, and more.";
  if (lowerLabel.includes("text editor"))
    return "Quickly edit text content within your PDF pages.";
  if (lowerLabel.includes("mobile app"))
    return "Dedicated tool for optimizing PDF tasks on the go.";
  if (lowerLabel.includes("powerpoint"))
    return "Convert PDF content into editable PPT/PPTX slides.";
  if (lowerLabel.includes("excel"))
    return "Export tables and data directly from PDF to XLSX format.";
  if (lowerLabel === "pdf file" || lowerLabel === "pdf")
    return "View, read, and manage your PDF documents easily.";
  return "Quickly process your document for immediate results.";
};

// PDF data interface
interface PdfData {
  base64: string;
  pageCount: number;
}

// --- SIMPLE PDF PAGE RENDERER ---
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
  onZoomClick,
}: PdfPageRendererProps) => {
  const [pageImage, setPageImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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
          viewport: viewport,
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
          ? "bg-white dark:bg-gray-800 border-blue-500 dark:border-blue-600"
          : "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-gray-300 dark:border-gray-700"
      } ${!isSelected ? "opacity-60" : ""}`}
      onClick={onZoomClick}
    >
      {/* Selection controls */}
      <div
        className={`absolute top-2 left-2 z-30 flex items-center gap-1 transition-all duration-300`}
      >
        <button
          onClick={handleSelectionToggle}
          className={`p-1.5 rounded-full backdrop-blur-sm transition-all duration-300 ${
            isSelected
              ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              : "bg-black/70 hover:bg-black/90"
          }`}
          title={isSelected ? "Extract page" : "Skip page"}
        >
          {isSelected ? (
            <Scissors className="w-3 h-3 text-white" />
          ) : (
            <File className="w-3 h-3 text-white" />
          )}
        </button>
      </div>

      {/* Zoom overlay button */}
      <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="p-1.5 bg-black/70 rounded-full backdrop-blur-sm">
          <ZoomIn className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Selection indicator - ENHANCED COLORS */}
      <div
        className={`absolute bottom-2 right-2 z-20 px-2 py-1 rounded-full text-xs font-medium ${
          isSelected
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30"
            : "bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg shadow-gray-600/30"
        }`}
      >
        {isSelected ? "✓ Extract" : "✗ Skip"}
      </div>

      {/* Page number - ENHANCED COLORS */}
      <div
        className={`absolute top-2 right-2 z-20 px-2 py-1 rounded-full text-xs font-medium ${
          isSelected
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30"
            : "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg shadow-gray-700/30"
        }`}
      >
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
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-4 ${
            isSelected
              ? "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20"
              : "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900/20"
          }`}
        >
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
        <div className="relative w-full h-full flex items-center justify-center p-1">
          <img
            src={pageImage}
            alt={`Page ${pageNumber} of ${fileName}`}
            className="w-full h-full object-contain select-none"
            draggable="false"
          />
        </div>
      ) : null}
    </div>
  );
};

// --- SIMPLE ZOOM MODAL (Mobile Friendly) ---
interface SimpleZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageNumber: number;
  pdfData: PdfData | null;
  fileName: string;
}

const SimpleZoomModal = ({
  isOpen,
  onClose,
  pageNumber,
  pdfData,
  fileName,
}: SimpleZoomModalProps) => {
  const [zoom, setZoom] = useState(1);
  const [pageImage, setPageImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [rotation, setRotation] = useState(0);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const renderPageForZoom = async () => {
      if (!isOpen || !pdfData || !isMounted.current) return;

      try {
        setLoading(true);

        // Convert base64 back to Uint8Array
        const binaryString = atob(pdfData.base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Load PDF with higher resolution for zoom
        const loadingTask = pdfjsLib.getDocument({ data: bytes });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(pageNumber);

        // Higher quality for zoom
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport: viewport,
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
  }, [isOpen, pdfData, pageNumber]);

  const handleZoomIn = () => {
    setZoom((z) => Math.min(z + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((z) => Math.max(z - 0.25, 0.5));
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
    setZoom(1);
    setRotation(0);
  };

  const rotateLeft = () => {
    setRotation((prev) => (prev - 90) % 360);
  };

  const rotateRight = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const resetRotation = () => {
    setRotation(0);
  };

  // Handle wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setZoom(1);
      setRotation(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="relative max-w-full max-h-full bg-black/80 rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-50 p-2 bg-black/70 rounded-full hover:bg-black/90 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Zoom controls */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/70 rounded-full px-4 py-2 z-50">
          <button
            onClick={handleZoomOut}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
            disabled={zoom <= 0.5}
          >
            <ZoomOut className="w-4 h-4 text-white" />
          </button>

          <span className="text-white text-sm font-medium min-w-[50px] text-center">
            {Math.round(zoom * 100)}%
          </span>

          <button
            onClick={handleZoomIn}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
            disabled={zoom >= 3}
          >
            <ZoomIn className="w-4 h-4 text-white" />
          </button>

          {/* Rotation controls */}
          <div className="h-6 w-px bg-white/30 mx-1"></div>

          <button
            onClick={rotateLeft}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={resetRotation}
            className="px-2 py-1 hover:bg-white/10 rounded transition-colors text-xs text-white"
          >
            0°
          </button>

          <button
            onClick={rotateRight}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <RotateCw className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Page info */}
        <div className="absolute top-3 left-3 z-50 bg-black/70 rounded-full px-3 py-1.5 max-w-[80%]">
          <span className="text-white text-xs sm:text-sm truncate block">
            Page {pageNumber} • {fileName}
          </span>
        </div>

        {/* Loading indicator */}
        {loading ? (
          <div className="w-96 h-96 flex items-center justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-white" />
          </div>
        ) : pageImage ? (
          <div className="overflow-auto max-h-screen p-4">
            <img
              src={pageImage}
              alt={`Page ${pageNumber}`}
              className="mx-auto"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                transformOrigin: "center center",
                transition: "transform 0.2s ease",
              }}
            />
          </div>
        ) : (
          <div className="w-96 h-96 flex items-center justify-center">
            <div className="text-center text-white">
              <File className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg">Unable to load page</p>
              <p className="text-gray-400 text-sm mt-2">Page {pageNumber}</p>
            </div>
          </div>
        )}

        {/* Mobile instructions */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 sm:hidden">
          <div className="bg-black/70 text-white text-xs px-3 py-2 rounded-full backdrop-blur-sm">
            <span>Pinch to zoom • Tap outside to close</span>
          </div>
        </div>

        {/* Desktop instructions */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 hidden sm:block">
          <div className="bg-black/70 text-white text-xs px-3 py-2 rounded-full backdrop-blur-sm">
            <span>Scroll to zoom • Click outside to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ULTRA SIMPLE ZOOM MODAL (Even Simpler) ---
interface UltraSimpleZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageImage: string | null;
  pageNumber: number;
  fileName: string;
}

const UltraSimpleZoomModal = ({
  isOpen,
  onClose,
  pageImage,
  pageNumber,
  fileName,
}: UltraSimpleZoomModalProps) => {
  const [zoom, setZoom] = useState(1);

  if (!isOpen || !pageImage) return null;

  const handleZoomIn = () => {
    setZoom((z) => Math.min(z + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((z) => Math.max(z - 0.25, 0.5));
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
    setZoom(1);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="relative max-w-full max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Simple controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/70 rounded-full px-4 py-2 z-50">
          <button
            onClick={handleZoomOut}
            className="p-1.5 hover:bg-white/10 rounded-full"
            disabled={zoom <= 0.5}
          >
            <Minus className="w-4 h-4 text-white" />
          </button>

          <span className="text-white text-sm font-medium min-w-[60px] text-center">
            {Math.round(zoom * 100)}%
          </span>

          <button
            onClick={handleZoomIn}
            className="p-1.5 hover:bg-white/10 rounded-full"
            disabled={zoom >= 3}
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-50 p-2 bg-black/70 rounded-full hover:bg-black/90"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Image */}
        <img
          src={pageImage}
          alt={`Page ${pageNumber}`}
          className="max-w-full max-h-screen"
          style={{ transform: `scale(${zoom})` }}
        />

        {/* Page info */}
        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          Page {pageNumber} • {fileName.substring(0, 20)}...
        </div>

        {/* Mobile hint */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 sm:hidden">
          <div className="bg-black/70 text-white text-xs px-3 py-1.5 rounded">
            Tap outside to close
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Smart filename generator for extracted PDF ---
const generatePdfFilename = (
  originalFilename: string,
  pages: number[] = []
): string => {
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  const timeStr = now.toTimeString().split(" ")[0].replace(/:/g, "-");

  // Clean original filename
  const cleanName = originalFilename
    .replace(/\.pdf$/i, "")
    .replace(/[^a-zA-Z0-9\s-_]/g, "")
    .substring(0, 30)
    .trim();

  // Add page info if extracting specific pages
  let pageSuffix = "";
  if (pages.length > 0) {
    if (pages.length <= 3) {
      pageSuffix = `_pages_${pages.join("-")}`;
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
    fileName: "",
  });

  // Simple zoom state
  const [simpleZoomModal, setSimpleZoomModal] = useState<{
    isOpen: boolean;
    pageNumber: number;
    fileName: string;
    pageImage: string | null;
  }>({
    isOpen: false,
    pageNumber: 1,
    fileName: "",
    pageImage: null,
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
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(pageData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, pageData.length);
  const currentPageData = pageData.slice(startIndex, endIndex);

  // Calculate selected pages count and numbers
  const selectedPagesCount = pageData.filter((page) => page.isSelected).length;
  const selectedPageNumbers = pageData
    .filter((page) => page.isSelected)
    .map((page) => page.pageNumber);

  // Convert ArrayBuffer to base64 for storage
  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = "";
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
      await new Promise((resolve) => setTimeout(resolve, 300));

      const arrayBuffer = await file.arrayBuffer();

      // Store as base64
      const base64 = arrayBufferToBase64(arrayBuffer);

      setProgress(40);
      await new Promise((resolve) => setTimeout(resolve, 200));

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
      await new Promise((resolve) => setTimeout(resolve, 200));

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
      isSelected: !updatedPageData[pageIndex].isSelected,
    };
    setPageData(updatedPageData);
  };

  // Select all pages
  const selectAllPages = () => {
    const updatedPageData = pageData.map((page) => ({
      ...page,
      isSelected: true,
    }));
    setPageData(updatedPageData);
    setDownloadSuccess(
      `✓ All ${pageData.length} pages selected for extraction`
    );
    setTimeout(() => setDownloadSuccess(null), 2000);
  };

  // Deselect all pages
  const deselectAllPages = () => {
    const updatedPageData = pageData.map((page) => ({
      ...page,
      isSelected: false,
    }));
    setPageData(updatedPageData);
    setDownloadSuccess(`✗ All ${pageData.length} pages deselected`);
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
        .filter((page) => page.isSelected)
        .map((page) => page.pageNumber - 1);

      for (let i = 0; i < selectedPageIndices.length; i++) {
        const pageIndex = selectedPageIndices[i];
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);
        newPdf.addPage(copiedPage);

        // Update progress
        const progress = Math.round(
          ((i + 1) / selectedPageIndices.length) * 100
        );
        setDownloadProgress(progress);

        // Small delay for better UX
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      // Save extracted PDF
      const pdfBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], {
        type: "application/pdf",
      });

      const fileName = generatePdfFilename(files[0].name, selectedPageNumbers);
      downloadFile(blob, fileName);

      // Success message
      setDownloadSuccess(
        `✓ Successfully extracted ${selectedPagesCount} pages!`
      );
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
      statusElement.className =
        "text-sm text-yellow-600 dark:text-yellow-400 mt-1 font-medium animate-pulse";
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
        statusElement.className =
          "text-sm text-green-600 dark:text-green-400 mt-1 font-medium";
      }
    } catch (error) {
      console.error(`Error extracting page ${pageIndex + 1}:`, error);
      setDownloadSuccess(`✗ Failed to extract page ${pageIndex + 1}`);
      setTimeout(() => setDownloadSuccess(null), 3000);

      if (statusElement) {
        statusElement.innerText = "✗ Extraction failed";
        statusElement.className =
          "text-sm text-red-600 dark:text-red-400 mt-1 font-medium";
      }
    } finally {
      setTimeout(() => {
        if (statusElement) {
          statusElement.innerText = "Ready to extract";
          statusElement.className =
            "text-sm text-blue-600 dark:text-blue-400 mt-1";
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
      fileName,
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
        viewport: viewport,
      }).promise;

      const imageUrl = canvas.toDataURL("image/png", 1.0);

      setSimpleZoomModal({
        isOpen: true,
        pageNumber,
        fileName,
        pageImage: imageUrl,
      });
    } catch (error) {
      console.error("Error creating zoom image:", error);
    }
  };

  // Pagination controls
  const goToPage = (pageNumber: number) => {
    const page = Math.min(Math.max(1, pageNumber), totalPages);
    setCurrentPage(page);
    if (isMobile) {
      const pageGrid = document.getElementById("page-grid");
      if (pageGrid) {
        pageGrid.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      if (isMobile) {
        const pageGrid = document.getElementById("page-grid");
        if (pageGrid) {
          pageGrid.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      if (isMobile) {
        const pageGrid = document.getElementById("page-grid");
        if (pageGrid) {
          pageGrid.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  // Items per page options - responsive
  const itemsPerPageOptions = isMobile ? [4, 6, 8] : [6, 9, 12];

  return (
    <>
     
      {/* SEO Schema */}
      <FAQSchema />
        <BreadcrumbSchema />
        {/* rest of page */}
      
      <HowToSchema />
      <ArticleSchema />
      
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
                  <div
                    className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl backdrop-blur-sm ${
                      downloadSuccess.startsWith("✓")
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                        : "bg-gradient-to-r from-red-500 to-orange-600 text-white"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      {downloadSuccess.startsWith("✓") ? (
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                      <span className="font-medium text-sm sm:text-base">
                        {downloadSuccess}
                      </span>
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
                className={`inline-flex items-center justify-center
    w-14 h-14 md:w-16 md:h-16
    bg-gradient-to-br ${tool.color}
    rounded-2xl md:rounded-3xl
    mb-3 md:mb-4 shadow-xl`}
              >
                <span className="text-2xl md:text-3xl text-white select-none">
                  {tool.icon}
                </span>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent px-2">
                Extract Pages from PDF Online Free

              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
                Extract specific pages from PDF files online free without watermark.

                <span className="block text-blue-600 dark:text-blue-400 font-medium mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">
                  Select pages to extract and download them as a new PDF!
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
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4"
                    >
                      <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 rounded-lg sm:rounded-xl md:rounded-2xl border border-blue-200 dark:border-blue-800/50">
                        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                          <Scissors className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-600 dark:text-blue-400" />
                          <span className="text-xs sm:text-sm md:text-base font-semibold text-blue-800 dark:text-blue-300">
                            Extract Pages
                          </span>
                        </div>
                        <p className="text-xs text-blue-700/80 dark:text-blue-400/80 mt-1 sm:mt-2">
                          Select specific pages to extract
                        </p>
                      </div>

                      <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-900/20 rounded-lg sm:rounded-xl md:rounded-2xl border border-purple-200 dark:border-purple-800/50">
                        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                          <Grid3x3 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-600 dark:text-purple-400" />
                          <span className="text-xs sm:text-sm md:text-base font-semibold text-purple-800 dark:text-purple-300">
                            Batch Selection
                          </span>
                        </div>
                        <p className="text-xs text-purple-700/80 dark:text-purple-400/80 mt-1 sm:mt-2">
                          Select multiple pages at once
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
                          See selected pages instantly
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
                            {(files[0].size / 1024 / 1024).toFixed(2)} MB •{" "}
                            {pageData.length} pages
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
                              : "Preparing extractor..."
                          }
                        />

                        <div className="flex justify-center">
                          <div className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-blue-50 dark:bg-blue-950/30 rounded-full">
                            <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
                            <span className="text-xs sm:text-sm md:text-base text-blue-700 dark:text-blue-300">
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
                        className="w-full py-2.5 sm:py-3 md:py-4 px-4 sm:px-5 md:px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-1 sm:gap-2 md:gap-3"
                      >
                        <Scissors className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        <span>Load PDF for Extraction</span>
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
                                {selectedPagesCount} of {pageData.length} pages
                                selected for extraction
                              </p>
                              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1">
                                Click on pages to select/deselect them for
                                extraction
                              </p>
                            </div>
                            <div className="flex items-center justify-center">
                              <div className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base">
                                {selectedPagesCount} Selected
                              </div>
                            </div>
                          </div>
                        </div>

                      

                        {/* Download Progress */}
                        {downloadingAll && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border-2 border-blue-200 dark:border-blue-800/30"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-blue-700 dark:text-blue-300 text-xs sm:text-sm">
                                Extracting {downloadProgress}% complete
                              </span>
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                {Math.round(
                                  (downloadProgress / 100) * selectedPagesCount
                                )}{" "}
                                of {selectedPagesCount} pages
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
                              Please wait while pages are being extracted...
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
                              {isMobile
                                ? "Tap to select/deselect"
                                : "Click to select/deselect"}{" "}
                              • Click to zoom
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
                                  <div
                                    className={`bg-gradient-to-br rounded-xl sm:rounded-2xl border-2 p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 ${
                                      page.isSelected
                                        ? "from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-blue-500 dark:border-blue-600"
                                        : "from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-gray-300 dark:border-gray-700"
                                    }`}
                                  >
                                    <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 md:space-y-4">
                                      <PdfPageRenderer
                                        pageNumber={page.pageNumber}
                                        pdfData={pdfData}
                                        fileName={page.fileName}
                                        isSelected={page.isSelected}
                                        onSelectionToggle={() =>
                                          togglePageSelection(actualIndex)
                                        }
                                        onZoomClick={() =>
                                          handleSimpleZoom(
                                            page.pageNumber,
                                            page.fileName
                                          )
                                        }
                                      />

                                      <div className="w-full">
                                        <div className="flex items-center justify-between mb-1">
                                          <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">
                                            Page {page.pageNumber}
                                          </h4>
                                          <span
                                            className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs rounded-full ${
                                              page.isSelected
                                                ? "bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 font-bold"
                                                : "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 font-bold"
                                            }`}
                                          >
                                            {page.isSelected
                                              ? "Selected ✓"
                                              : "Not Selected ✗"}
                                          </span>
                                        </div>
                                        <p
                                          className={`text-xs truncate mb-1 sm:mb-2 md:mb-3 ${
                                            page.isSelected
                                              ? "text-green-600 dark:text-green-400 font-bold"
                                              : "text-red-600 dark:text-red-400 font-bold"
                                          }`}
                                        >
                                          {page.isSelected
                                            ? "✓ Selected for extraction"
                                            : "✗ Not selected for extraction"}
                                        </p>

                                        <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
                                          <span
                                            id={`status-${actualIndex}`}
                                            className="text-xs font-medium ${
                                                                                        page.isSelected 
                                                                                            ? 'text-green-600 dark:text-green-400' 
                                                                                            : 'text-blue-600 dark:text-blue-400'
                                                                                    }"
                                          >
                                            {page.isSelected
                                              ? "✓ Ready to extract"
                                              : "Ready to extract"}
                                          </span>

                                          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                                            <motion.button
                                              whileHover={{ scale: 1.02 }}
                                              whileTap={{ scale: 0.98 }}
                                              onClick={() =>
                                                togglePageSelection(actualIndex)
                                              }
                                              className={`py-1.5 sm:py-2 px-2 sm:px-3 font-bold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-0.5 sm:gap-1 text-xs sm:text-sm ${
                                                page.isSelected
                                                  ? "bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white"
                                                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                                              }`}
                                            >
                                              {page.isSelected ? (
                                                <>
                                                  <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                                  Deselect
                                                </>
                                              ) : (
                                                <>
                                                  <Scissors className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                                  Select
                                                </>
                                              )}
                                            </motion.button>

                                            <motion.button
                                              whileHover={{ scale: 1.02 }}
                                              whileTap={{ scale: 0.98 }}
                                              onClick={() =>
                                                handleDownloadPage(actualIndex)
                                              }
                                              className="py-1.5 sm:py-2 px-2 sm:px-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-0.5 sm:gap-1 text-xs sm:text-sm"
                                            >
                                              <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
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

                          {/* Pagination Controls - Responsive */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-blue-200 dark:border-blue-800/30">
                          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
                            <div>
                              <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">
                                Showing {startIndex + 1}-{endIndex} of{" "}
                                {pageData.length} pages
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
                                onChange={(e) =>
                                  setItemsPerPage(Number(e.target.value))
                                }
                                className="px-2 py-1 sm:px-3 sm:py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-xs sm:text-sm"
                              >
                                {itemsPerPageOptions.map((option) => (
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

                            {Array.from(
                              { length: Math.min(5, totalPages) },
                              (_, i) => {
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
                                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                        : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    }`}
                                  >
                                    {pageNum}
                                  </button>
                                );
                              }
                            )}

                            <button
                              onClick={nextPage}
                              disabled={currentPage === totalPages}
                              className="px-2 py-1 sm:px-3 sm:py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs sm:text-sm"
                            >
                              <ChevronRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>

                          {/* Batch Selection Controls - Responsive */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-blue-200 dark:border-blue-800/30">
                          <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2">
                            <Grid3x3 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                            Quick Page Selection
                          </h4>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <button
                              onClick={selectAllPages}
                              disabled={processing}
                              className="py-1.5 sm:py-2 px-2 sm:px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg sm:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                            >
                              <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>Select All</span>
                            </button>
                            <button
                              onClick={deselectAllPages}
                              disabled={processing}
                              className="py-1.5 sm:py-2 px-2 sm:px-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-medium rounded-lg sm:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                            >
                              <X className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>Deselect All</span>
                            </button>
                            <button
                              onClick={handleDownloadExtractedPdf}
                              disabled={
                                downloadingAll || selectedPagesCount === 0
                              }
                              className="py-1.5 sm:py-2 px-2 sm:px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg sm:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm col-span-2 sm:col-span-1"
                            >
                              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>Extract {selectedPagesCount} Pages</span>
                            </button>
                          </div>

                          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 text-center">
                            Quick selection options for {pageData.length} pages
                          </p>
                        </div>

                      

                        {/* Download Button Section - Responsive */}
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 border-2 border-indigo-200 dark:border-indigo-800/50">
                          <div className="text-center mb-3 sm:mb-4 md:mb-6">
                            <h4 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-1 sm:mb-2">
                              Download Extracted Pages
                            </h4>
                            <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                              Download selected pages as a new PDF document
                            </p>

                            <div className="space-y-3 sm:space-y-4">
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleDownloadExtractedPdf}
                                disabled={
                                  downloadingAll || selectedPagesCount === 0
                                }
                                className="w-full py-2.5 sm:py-3 md:py-4 px-4 sm:px-5 md:px-6 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold rounded-lg sm:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base md:text-lg flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3"
                              >
                                {downloadingAll ? (
                                  <>
                                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                    <span>Extracting...</span>
                                  </>
                                ) : (
                                  <>
                                    <Scissors className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                    <span>
                                      Extract {selectedPagesCount} Pages
                                    </span>
                                  </>
                                )}
                              </motion.button>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-blue-200 dark:border-blue-700">
                                  <h5 className="font-bold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm">
                                    Pages to Extract
                                  </h5>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {selectedPagesCount} pages selected
                                  </p>
                                </div>

                                <div className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-purple-200 dark:border-purple-700">
                                  <h5 className="font-bold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm">
                                    Page Numbers
                                  </h5>
                                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                    {selectedPageNumbers.length > 0
                                      ? selectedPageNumbers.join(", ")
                                      : "None selected"}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <p
                              id="status-all-1"
                              className="text-xs sm:text-sm font-medium mt-2 sm:mt-3 ${
                                                        selectedPagesCount === 0 
                                                            ? 'text-red-600 dark:text-red-400'
                                                            : 'text-green-600 dark:text-green-400'
                                                    }"
                            >
                              {selectedPagesCount === 0
                                ? "✗ Please select at least one page to extract"
                                : `✓ Ready to extract pages: ${selectedPageNumbers.join(
                                    ", "
                                  )}`}
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
                            Extract Pages from Another PDF
                          </button>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            All processing happens in your browser • No files
                            are uploaded
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            

            {/* Simple Zoom Modal */}
            <SimpleZoomModal
              isOpen={zoomModal.isOpen}
              onClose={() => setZoomModal({ ...zoomModal, isOpen: false })}
              pageNumber={zoomModal.pageNumber}
              pdfData={pdfData}
              fileName={zoomModal.fileName}
            />

            {/* Ultra Simple Zoom Modal */}
            <UltraSimpleZoomModal
              isOpen={simpleZoomModal.isOpen}
              onClose={() =>
                setSimpleZoomModal({ ...simpleZoomModal, isOpen: false })
              }
              pageImage={simpleZoomModal.pageImage}
              pageNumber={simpleZoomModal.pageNumber}
              fileName={simpleZoomModal.fileName}
            />




            {/* Explore All Tools Section */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    Explore All Tools
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                    10+ specialized PDF, image, and document tools
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {exploreTools.slice(0, 8).map((tool, index) => (
                  <motion.a
                    key={tool.id}
                    href={tool.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="group bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-4 md:p-5 hover:border-blue-300 dark:hover:border-cyan-700 transition-all shadow-lg hover:shadow-2xl"
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div
                        className={`p-2 md:p-3 bg-gradient-to-br ${tool.color} rounded-lg md:rounded-xl shadow-lg`}
                      >
                        <span className="text-xl md:text-2xl">{tool.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg mb-1 md:mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-3 md:mb-4">
                          {tool.description}
                        </p>
                        <div className="flex items-center gap-2 text-blue-600 dark:text-cyan-400 font-medium text-xs md:text-sm">
                          <span>Use Tool</span>
                          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
              <div className="flex justify-end">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 m-4 px-4 py-2 md:px-5 md:py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all text-sm"
                >
                  <Grid className="w-4 h-4" />
                  <span>View All</span>
                </Link>
              </div>
            </div>

{/* Visible FAQ Section */}
<section className="max-w-3xl mx-auto my-16 px-4">
  {/* Title */}
  <div className="text-center mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
      Frequently Asked Questions
    </h2>
    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
     Everything you need to know about extracting pages from PDF files online
    </p>
  </div>

  {/* FAQ List */}
  <div className="space-y-4">
    {faqData.map((faq, index) => (
      <details
        key={index}
        className="group border border-gray-200 dark:border-gray-700 rounded-lg p-4 
        bg-white dark:bg-gray-800"
      >
        <summary className="cursor-pointer font-semibold text-base md:text-lg text-gray-900 dark:text-white">
          {faq.question}
        </summary>
        <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          {faq.answer}
        </p>
      </details>
    ))}
  </div>
</section>
            {/* Info Footer - Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 text-center mt-6 sm:mt-8 md:mt-12">
              <div className="p-2 sm:p-3 md:p-4">
                <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg sm:rounded-xl md:rounded-2xl mb-1.5 sm:mb-2 md:mb-3">
                  <Scissors className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                  Selective Extraction
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Choose exactly which pages to extract
                </p>
              </div>

              <div className="p-2 sm:p-3 md:p-4">
                <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg sm:rounded-xl md:rounded-2xl mb-1.5 sm:mb-2 md:mb-3">
                  <Grid3x3 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                  Batch Selection
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Select multiple pages at once
                </p>
              </div>

              <div className="p-2 sm:p-3 md:p-4">
                <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-lg sm:rounded-xl md:rounded-2xl mb-1.5 sm:mb-2 md:mb-3">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                  Clean PDF Output
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Download extracted pages as new PDF
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
                    <span>Tap on pages to select/deselect them</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Use quick selection for multiple pages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Pinch to zoom in page preview</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>At least one page must be selected</span>
                  </li>
                </ul>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
