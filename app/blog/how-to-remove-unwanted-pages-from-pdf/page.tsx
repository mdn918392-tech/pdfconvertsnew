import data from "../data.json";
import Link from "next/link";
import Image from "next/image";
import BlogToolsSection from "@/app/components/BlogToolsSection";
import { 
  CalendarDays, 
  FileImage, 
  Shield, 
  CheckCircle, 
  Lightbulb,
  ArrowRight,
  Sparkles,
  Clock,
  FileText,
  File,
  Upload,
  Settings,
  HelpCircle,
  Zap,
  Users,
  BarChart3,
  ChevronRight,
  Search,
  Share2,
  BookOpen,
  Download,
  Smartphone,
  Globe,
  Camera,
  Laptop,
  ShieldCheck,
  Lock,
  Cloud,
  ArrowUpDown,
  Layers,
  Monitor,
  ExternalLink,
  AlertTriangle,
  Cpu,
  HardDrive,
  PaintBucket,
  Scissors,
  FileMinus,
  Trash2,
  SmartphoneIcon,
  Tablet,
  MousePointerClick,
  Filter,
  Eye,
  EyeOff,
  X,
  RotateCcw,
  Smartphone as Phone,
  Printer,
  Share,
  Save,
  Copy,
  Edit,
  Maximize2,
  Minimize2,
  Grid,
  List,
  ZoomIn,
  ZoomOut,
  XCircle,
  AlertCircle,
  Info,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RefreshCw,
  Power,
  Battery,
  Wifi,
  Bluetooth,
  Radio,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Headphones,
  Speaker,
  Bell,
  BellOff,
  Star,
  Heart,
  ThumbsUp,
  MessageCircle,
  Mail,
  PhoneCall,
  MapPin,
  Navigation,
  Compass,
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  Thermometer,
  Droplets,
  Sunrise,
  Sunset,
  Cloudy,
} from "lucide-react";

export const dynamic = "force-static";

// ✅ Metadata for Next.js App Router
export const metadata = {
  title: "How to Remove Unwanted Pages from PDF on Mobile & PC | Step-by-Step Guide 2026",
  description: "Complete guide to delete, extract, or remove unwanted pages from PDF files on Windows, Mac, iOS, and Android. Easy step-by-step instructions for all devices.",
  keywords: "remove pages from pdf, delete pdf pages, extract pdf pages, split pdf, remove unwanted pages, pdf editor mobile, pdf editor pc, how to delete pdf pages, pdf page remover, online pdf editor, adobe acrobat remove pages, free pdf editor, remove pages from pdf online, pdf splitter, extract pages from pdf",
  
  // Open Graph / Facebook
  openGraph: {
    type: "article",
    url: "https://pdfswift.online/blog/how-to-remove-unwanted-pages-from-pdf",
    title: "How to Remove Unwanted Pages from PDF on Mobile & PC | 2026 Guide",
    description: "Step-by-step guide to remove, delete, or extract pages from PDF files on all devices. Learn Windows, Mac, iOS, and Android methods.",
    images: [
      {
        url: "https://pdfswift.online/blog/images/pdf-page-removal-guide.jpg",
        width: 1200,
        height: 630,
        alt: "Remove PDF Pages Guide - Delete Unwanted Pages on Mobile and PC",
      },
    ],
    siteName: "PDFSwift",
    locale: "en_US",
    publishedTime: "2026-01-19T12:20:00+00:00",
    modifiedTime: "2026-01-19T012:30:00+00:00",
    authors: ["PDFSwift"],
    tags: ["PDF Editing", "Page Removal", "Document Management"],
  },
  
  // Additional SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  authors: [{ name: "PDFSwift", url: "https://pdfswift.online" }],
  publisher: "PDFSwift",
  creator: "PDFSwift",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://pdfswift.online"),
  alternates: {
    canonical: "/blog/how-to-remove-unwanted-pages-from-pdf",
  },
  category: "Technology",
  classification: "Tutorials, PDF Editing",
};

// ✅ themeColor moved to viewport export
export const viewport = {
  themeColor: "#3B82F6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RemovePDFPagesGuide() {
  const removalMethods = [
    {
      title: "Online PDF Editors",
      icon: Globe,
      platforms: ["PC", "Mobile", "Tablet"],
      timeRequired: "1-2 minutes",
      pros: ["No installation", "Works on all devices", "Instant access"],
      cons: ["Internet required", "File size limits", "Privacy concerns"],
      bestFor: "Quick one-time edits"
    },
    {
      title: "Desktop Software",
      icon: Laptop,
      platforms: ["Windows", "Mac", "Linux"],
      timeRequired: "2-5 minutes",
      pros: ["Advanced features", "Offline access", "Batch processing"],
      cons: ["Installation needed", "May cost money", "Device dependent"],
      bestFor: "Professional & frequent use"
    },
    {
      title: "Mobile Apps",
      icon: Smartphone,
      platforms: ["iOS", "Android"],
      timeRequired: "3-7 minutes",
      pros: ["On-the-go editing", "Camera integration", "Easy sharing"],
      cons: ["Small screen", "Limited features", "Storage limits"],
      bestFor: "Mobile document editing"
    }
  ];

  const commonScenarios = [
    {
      title: "Remove Confidential Pages",
      description: "Delete sensitive information before sharing documents"
    },
    {
      title: "Extract Specific Sections",
      description: "Pull out only the pages you need from large documents"
    },
    {
      title: "Clean Up Scanned Documents",
      description: "Remove blank or duplicate pages from scanned PDFs"
    },
    {
      title: "Prepare Presentations",
      description: "Extract key slides or remove unnecessary content"
    },
    {
      title: "Organize Documents",
      description: "Remove outdated or irrelevant pages from archives"
    }
  ];

  const stepByStepPC = [
    {
      step: 1,
      title: "Open PDF File",
      description: "Launch your chosen PDF editor and open the document you want to edit"
    },
    {
      step: 2,
      title: "View Page Thumbnails",
      description: "Access the page navigation panel to see all pages as thumbnails"
    },
    {
      step: 3,
      title: "Select Pages to Remove",
      description: "Click or drag to select the unwanted pages (hold Ctrl/Cmd for multiple)"
    },
    {
      step: 4,
      title: "Delete Pages",
      description: "Right-click and choose 'Delete' or use the toolbar delete option"
    },
    {
      step: 5,
      title: "Save New PDF",
      description: "Save the edited document with a new name to preserve original"
    }
  ];

  const stepByStepMobile = [
    {
      step: 1,
      title: "Open PDF App",
      description: "Launch your PDF editor app and import the document"
    },
    {
      step: 2,
      title: "Enter Edit Mode",
      description: "Tap the edit/pencil icon to enable editing features"
    },
    {
      step: 3,
      title: "Select Pages",
      description: "Tap page thumbnails or use multi-select option"
    },
    {
      step: 4,
      title: "Remove Pages",
      description: "Tap delete/trash icon to remove selected pages"
    },
    {
      step: 5,
      title: "Export & Share",
      description: "Save changes and share the edited PDF directly from app"
    }
  ];

  const toolsComparison = [
    {
      name: "PDFSwift Online Editor",
      platforms: ["Web"],
      free: true,
      features: ["Drag & drop", "Batch remove", "No watermark", "Secure processing"],
      bestFor: "Quick online editing"
    },
    {
      name: "Adobe Acrobat",
      platforms: ["Windows", "Mac", "Mobile"],
      free: false,
      features: ["Advanced editing", "OCR", "Form filling", "Professional tools"],
      bestFor: "Professional users"
    },
    {
      name: "Preview (Mac)",
      platforms: ["Mac"],
      free: true,
      features: ["Built-in", "Simple interface", "Basic editing", "Quick Look"],
      bestFor: "Mac users (basic needs)"
    },
    {
      name: "Google Drive",
      platforms: ["Web", "Mobile"],
      free: true,
      features: ["Cloud storage", "Basic editing", "Collaboration", "Integration"],
      bestFor: "Google ecosystem users"
    }
  ];

  const tipsAndBestPractices = [
    {
      icon: Save,
      title: "Always Backup First",
      description: "Save a copy of original PDF before making any changes"
    },
    {
      icon: Eye,
      title: "Preview Changes",
      description: "Always preview the edited PDF before finalizing"
    },
    {
      icon: Shield,
      title: "Check Security",
      description: "Ensure sensitive data is completely removed from metadata"
    },
    {
      icon: Layers,
      title: "Organize Pages",
      description: "Consider reordering pages after removal for better flow"
    }
  ];

  const comprehensiveFAQ = [
    {
      question: "Can I remove pages from a PDF for free?",
      answer: "Yes, there are several free methods: Use PDFSwift's online editor, Preview on Mac, Google Drive's PDF editor, or free mobile apps like Adobe Fill & Sign. Most online tools offer basic page removal for free with limitations."
    },
    {
      question: "How do I delete multiple pages at once?",
      answer: "Select multiple pages by holding Ctrl (Windows) or Cmd (Mac) while clicking pages, or drag to select a range. In mobile apps, use multi-select mode. Professional tools allow selecting non-consecutive pages and batch removal."
    },
    {
      question: "Will removing pages affect the PDF quality?",
      answer: "No, removing pages doesn't affect the quality of remaining pages. The process simply extracts or deletes selected pages without altering the content or resolution of other pages."
    },
    {
      question: "Can I undo page removal?",
      answer: "Most editors have undo functionality (Ctrl+Z or Cmd+Z). However, once you save and close the file, changes are permanent. Always save a backup copy before editing."
    },
    {
      question: "How do I extract pages instead of deleting?",
      answer: "Use 'Extract Pages' feature to save selected pages as a new PDF while keeping original intact. This is safer than deletion and useful for creating separate documents."
    },
    {
      question: "Can I remove pages from password-protected PDFs?",
      answer: "You need the password to edit protected PDFs. Some tools require unlocking first, then you can remove pages. PDFSwift's online tool supports password-protected files with proper authorization."
    },
    {
      question: "What's the difference between delete and extract?",
      answer: "Delete removes pages permanently from the document. Extract copies selected pages into a new PDF while keeping original unchanged. Use extract when you want to preserve the source document."
    },
    {
      question: "How do I remove pages on iPhone without apps?",
      answer: "Use iOS Files app: Open PDF > tap Share > Markup > tap + icon > tap page icon > select pages > tap bin icon to delete. Limited but works for basic needs."
    }
  ];

  // Schema Markup
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Remove Unwanted Pages from PDF Files",
    "description": "Step-by-step guide to delete or extract pages from PDF documents on Windows, Mac, iOS, and Android devices.",
    "totalTime": "PT5M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Choose Your Tool",
        "text": "Select online editor for convenience, desktop software for advanced features, or mobile app for on-the-go editing.",
        "image": "https://pdfswift.online/blog/images/https://pdfswift.online/blog/images/pdf-page-removal-guide.jpg"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Upload or Open PDF",
        "text": "Upload your PDF to online tool or open it in your chosen software/app.",
        "image": "https://pdfswift.online/blog/images/https://pdfswift.online/blog/images/pdf-page-removal-guide.jpg"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Select Unwanted Pages",
        "text": "Use page thumbnails or navigation to select pages you want to remove. Select multiple by holding Ctrl/Cmd.",
        "image": "https://pdfswift.online/blog/images/https://pdfswift.online/blog/images/pdf-page-removal-guide.jpg"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Delete or Extract",
        "text": "Choose delete to remove pages permanently, or extract to save them as separate PDF.",
        "image": "https://pdfswift.online/blog/images/https://pdfswift.online/blog/images/pdf-page-removal-guide.jpg"
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Save & Verify",
        "text": "Save edited PDF with new name and verify all unwanted pages are removed correctly.",
        "image": "https://pdfswift.online/blog/images/https://pdfswift.online/blog/images/pdf-page-removal-guide.jpg"
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Remove Unwanted Pages from PDF on Mobile and PC - Complete 2026 Guide",
    "description": "Learn to delete, remove, or extract pages from PDF files on all devices. Step-by-step instructions for Windows, Mac, iOS, and Android.",
    "image": [
      "https://pdfswift.online/blog/images/https://pdfswift.online/blog/images/pdf-page-removal-guide.jpg"
    ],
    "datePublished": "2026-01-19T012:20:00+00:00",
    "dateModified": "2026-01-19T12:020:00+00:00",
    "author": {
      "@type": "Organization",
      "name": "PDFSwift",
      "url": "https://pdfswift.online"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PDFSwift",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pdfswift.online/logo.png",
        "width": 160,
        "height": 60
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://pdfswift.online/blog/how-to-remove-unwanted-pages-from-pdf"
    },
    "articleSection": "Technology, Tutorials, PDF Editing",
    "keywords": "remove pdf pages, delete pdf pages, extract pdf pages, pdf editor, edit pdf, split pdf, remove pages from pdf online",
    "wordCount": "1850",
    "timeRequired": "PT5M",
    "inLanguage": "en-US"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": comprehensiveFAQ.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
          <ol className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <li>
              <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a>
            </li>
            <li className="mx-2">
              <ChevronRight className="w-4 h-4" />
            </li>
            <li>
              <a href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</a>
            </li>
            <li className="mx-2">
              <ChevronRight className="w-4 h-4" />
            </li>
            <li className="text-gray-900 dark:text-white font-medium">
              Remove PDF Pages Guide
            </li>
          </ol>
        </nav>

        {/* Header Section */}
        <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-8">
          <div className="text-center mb-8">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                <Scissors className="w-4 h-4 mr-2" />
                PDF Editing Guide
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium">
                <BarChart3 className="w-4 h-4 mr-2" />
                Updated January 2026
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" />
                1850+ Words
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              How to <span className="text-blue-600 dark:text-blue-400">Remove Unwanted Pages</span> from PDF
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
              Complete 2026 Guide: Delete, extract, or remove pages from PDF files on Windows, Mac, iOS, and Android devices.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
              <div className="flex items-center">
                <CalendarDays className="w-5 h-5 mr-2" />
                <time dateTime="2026-01-19" className="font-medium">January 19, 2026</time>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-medium">5 min read</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span className="font-medium">Beginner to Intermediate</span>
              </div>
              <div className="flex items-center">
                <Download className="w-5 h-5 mr-2" />
                <span className="font-medium">Free Methods Included</span>
              </div>
            </div>
          </div>

         
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <article className="lg:w-2/3">
              {/* Table of Contents */}
              <nav aria-label="Article sections" className="mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                    Table of Contents
                  </h3>
                  <ol className="space-y-2">
                    {[
                      "Introduction to PDF Page Removal",
                      "Why Remove Pages from PDF?",
                      "Method 1: Online PDF Editors",
                      "Method 2: Desktop Software",
                      "Method 3: Mobile Apps",
                      "Step-by-Step: PC/Mac Guide",
                      "Step-by-Step: Mobile Guide",
                      "Tools Comparison",
                      "Tips & Best Practices",
                      "Frequently Asked Questions",
                      "Conclusion"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-blue-600 dark:text-blue-400 font-medium mr-2">{index + 1}.</span>
                        <a 
                          href={`#section-${index + 1}`}
                          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </nav>

              {/* Introduction */}
              <section id="section-1" className="scroll-mt-20 mb-12">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Introduction to PDF Page Removal</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Removing unwanted pages from PDF documents is a common need for students, professionals, and everyday users. Whether you need to delete confidential information, extract specific sections, or simply clean up a document, this guide covers all methods for 2026.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Modern PDF editors make page removal incredibly simple, with intuitive interfaces that work across all devices. From quick online tools to professional desktop software and mobile apps, you have multiple options depending on your needs.
                  </p>
                </div>
              </section>

              {/* Why Remove Pages */}
              <section id="section-2" className="scroll-mt-20 mb-12">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                    <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Remove Pages from PDF?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {commonScenarios.map((scenario, index) => (
                    <div 
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                          <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{scenario.title}</h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{scenario.description}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800/30">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Zap className="w-5 h-5 text-blue-500 mr-3" />
                    Key Benefits
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">Protect sensitive information</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">Reduce file size for sharing</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">Focus on relevant content</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">Organize documents better</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Methods Comparison */}
              <section id="section-3" className="scroll-mt-20 mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Methods Comparison</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {removalMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <div 
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex items-center mb-4">
                          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg mr-4">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{method.title}</h3>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">TIME REQUIRED</h4>
                            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{method.timeRequired}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {method.platforms.map((platform, idx) => (
                              <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                                {platform}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">PROS</h4>
                          <ul className="space-y-1">
                            {method.pros.map((pro, idx) => (
                              <li key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-sm">{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">CONS</h4>
                          <ul className="space-y-1">
                            {method.cons.map((con, idx) => (
                              <li key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                                <div className="w-4 h-4 flex items-center justify-center mr-2">
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                </div>
                                <span className="text-sm">{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-semibold">Best for:</span> {method.bestFor}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* PC/Mac Guide */}
              <section id="section-4" className="scroll-mt-20 mb-12">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                    <Laptop className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Step-by-Step: PC & Mac Guide</h2>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                        <span className="font-semibold text-gray-900 dark:text-white">Time Required</span>
                      </div>
                      <p className="text-lg font-bold text-blue-700 dark:text-blue-300">2-5 minutes</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Cpu className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                        <span className="font-semibold text-gray-900 dark:text-white">Difficulty Level</span>
                      </div>
                      <p className="text-lg font-bold text-green-700 dark:text-green-300">Beginner</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <MousePointerClick className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                        <span className="font-semibold text-gray-900 dark:text-white">Tools Needed</span>
                      </div>
                      <p className="text-lg font-bold text-purple-700 dark:text-purple-300">PDF Editor</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {stepByStepPC.map((step) => (
                      <div key={step.step} className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl mr-6">
                          {step.step}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h4>
                          <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800/30">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Pro Tips for PC/Mac</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">Use Ctrl/Cmd + click to select multiple non-consecutive pages</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">Always use "Save As" to keep original file intact</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">Check "Document Properties" to remove metadata if needed</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Mobile Guide */}
              <section id="section-5" className="scroll-mt-20 mb-12">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mr-4">
                    <Smartphone className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Step-by-Step: Mobile Guide</h2>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                        <span className="font-semibold text-gray-900 dark:text-white">Time Required</span>
                      </div>
                      <p className="text-lg font-bold text-green-700 dark:text-green-300">3-7 minutes</p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                        <span className="font-semibold text-gray-900 dark:text-white">Difficulty Level</span>
                      </div>
                      <p className="text-lg font-bold text-blue-700 dark:text-blue-300">Easy</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Download className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                        <span className="font-semibold text-gray-900 dark:text-white">App Required</span>
                      </div>
                      <p className="text-lg font-bold text-purple-700 dark:text-purple-300">PDF Editor App</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {stepByStepMobile.map((step) => (
                      <div key={step.step} className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl mr-6">
                          {step.step}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h4>
                          <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800/30">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Mobile-Specific Tips</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">Use pinch-to-zoom to preview pages before deleting</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">Enable "Select Multiple" mode for batch operations</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">Share directly from app to save storage space</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Tools Comparison */}
              <section id="section-6" className="scroll-mt-20 mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Tools Comparison 2026</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="py-4 px-6 text-left font-semibold text-gray-900 dark:text-white">Tool</th>
                        <th className="py-4 px-6 text-left font-semibold text-gray-900 dark:text-white">Platforms</th>
                        <th className="py-4 px-6 text-left font-semibold text-gray-900 dark:text-white">Free</th>
                        <th className="py-4 px-6 text-left font-semibold text-gray-900 dark:text-white">Key Features</th>
                        <th className="py-4 px-6 text-left font-semibold text-gray-900 dark:text-white">Best For</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {toolsComparison.map((tool, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                          <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">{tool.name}</td>
                          <td className="py-4 px-6">
                            <div className="flex flex-wrap gap-1">
                              {tool.platforms.map((platform, idx) => (
                                <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs">
                                  {platform}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            {tool.free ? (
                              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                                Free
                              </span>
                            ) : (
                              <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-medium">
                                Paid
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <ul className="space-y-1">
                              {tool.features.map((feature, idx) => (
                                <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                                  <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">
                            {tool.bestFor}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Tips & Best Practices */}
              <section id="section-7" className="scroll-mt-20 mb-12">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg mr-4">
                    <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Tips & Best Practices</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tipsAndBestPractices.map((tip, index) => {
                    const Icon = tip.icon;
                    return (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center mb-4">
                          <Icon className="w-6 h-6 text-blue-500 mr-4" />
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{tip.title}</h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{tip.description}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800/30">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Safety Checklist</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">Backup original file before editing</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">Verify all pages removed correctly</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">Check document properties for hidden data</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">Use secure tools for confidential documents</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* FAQ Section */}
              <section id="section-8" className="scroll-mt-20 mb-12">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                    <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                  {comprehensiveFAQ.map((item, index) => (
                    <div 
                      key={index} 
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <HelpCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                        {item.question}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 pl-8">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-1/3">
              <div className="sticky top-8 space-y-6">
                {/* Quick Stats */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-blue-500" />
                    Quick Facts
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Guide Length</span>
                      <span className="font-semibold text-gray-900 dark:text-white">1850+ Words</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Reading Time</span>
                      <span className="font-semibold text-gray-900 dark:text-white">5 Minutes</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
                      <span className="font-semibold text-gray-900 dark:text-white">Jan 2026</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 dark:text-gray-400">Skill Level</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">Beginner</span>
                    </div>
                  </div>
                </div>

                {/* PDFSwift Tools */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                    PDFSwift Tools
                  </h4>

                  <div className="space-y-4">
                   

                    {/* PDF Splitter */}
                    <a
                      href="/split-pdf"
                      className="block p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg border border-green-200 dark:border-green-800/30 hover:shadow-md transition"
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          PDF Splitter
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Split PDF by pages or extract specific sections into separate files.
                      </p>

                      <div className="flex items-center text-xs text-gray-500">
                        <Scissors className="w-3 h-3 mr-1" />
                        <span>Fast • Precise • Batch Processing</span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Device Comparison */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">Device Recommendations</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="flex items-center">
                        <Monitor className="w-4 h-4 text-blue-500 mr-2" />
                        <span className="text-sm">Desktop</span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                        Best Features
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="flex items-center">
                        <Smartphone className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm">Mobile</span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
                        Most Convenient
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 text-purple-500 mr-2" />
                        <span className="text-sm">Online</span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">
                        Most Accessible
                      </span>
                    </div>
                  </div>
                </div>

                

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
                  <h4 className="font-bold mb-4 text-lg">Ready to Edit?</h4>
                  <p className="text-blue-100 mb-6 text-sm">
                    Start removing pages from your PDF documents with our secure online editor.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" />
                      <span className="text-sm">No software installation</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" />
                      <span className="text-sm">Bank-level security</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" />
                      <span className="text-sm">Works on all devices</span>
                    </li>
                  </ul>

                  <Link href="/edit-pdf" passHref>
                    <button 
                      className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
                    >
                      <Scissors className="w-5 h-5 mr-2" />
                      Edit PDF Online
                    </button>
                  </Link>
                </div>

                
              </div>
            </aside>
          </div>

          
          
        </main>

        <BlogToolsSection />
      </div>

      
    </>
  );
}