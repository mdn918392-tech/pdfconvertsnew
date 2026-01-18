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
  Smartphone as Mobile,
  Laptop,
  ShieldCheck,
  Lock,
  Cloud,
  ArrowUpDown,
  Image as ImageIcon,
  Layers,
  Smartphone as Phone,
  Monitor,
  ExternalLink,
  AlertTriangle,
  Cpu,
  HardDrive,
  PaintBucket,
  Smartphone as SmartphoneIcon,
  Tablet,
  Scissors,
  FilePlus,
  FileMinus,
  FileStack,
  Split,
  Folder,
  Package,
  Grid,
  List,
  Layout,
  Copy,
  Filter,
  RefreshCw,
  Save,
  Eye,
  EyeOff,
  Printer,
  Mail,
  Share
} from "lucide-react";

export const dynamic = "force-static";

// ✅ Fixed: Add metadata in separate export (for Next.js App Router)
export const metadata = {
  title: "How to Split PDF Page Wise | Complete 2026 Guide for All Devices",
  description: "Learn how to split PDF files page by page on Windows, Mac, iOS, and Android. Step-by-step guide covering online tools, desktop software, mobile apps, and best practices for PDF splitting.",
  keywords: "split pdf, split pdf pages, extract pdf pages, separate pdf pages, pdf splitter, split pdf online, split pdf free, split pdf desktop, split pdf mobile, pdf page extraction, split pdf by page, divide pdf, split large pdf, batch split pdf, pdf organization",
  
  // Open Graph / Facebook
  openGraph: {
    type: "article",
    url: "https://pdfswift.online/blog/how-to-split-pdf-page-wise",
    title: "How to Split PDF Page Wise | Complete 2026 Guide",
    description: "Complete guide to split PDF files page by page on all devices. Learn online methods, desktop software, mobile apps, and professional tips for PDF splitting.",
    images: [
      {
        url: "https://pdfswift.online/blog/images/split-pdf.png",
        width: 1200,
        height: 630,
        alt: "Split PDF Page Wise Guide",
      },
    ],
    siteName: "PDFSwift",
    locale: "en_US",
    publishedTime: "2026-01-16T09:00:00+00:00",
    modifiedTime: "2026-01-16T09:00:00+00:00",
    authors: ["PDFSwift"],
    tags: ["PDF Editing", "Document Management", "PDF Tools"],
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@PDFSwift",
    creator: "@PDFSwift",
    title: "How to Split PDF Page Wise | Complete 2026 Guide",
    description: "Learn all methods to split PDF files page by page across all platforms. Free tools and professional software included.",
    images: ["https://pdfswift.online/blog/images/split-pdf.png"],
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
    canonical: "/blog/how-to-split-pdf-page-wise",
  },
  category: "Technology",
  classification: "Tutorials, Document Management",
};

// ✅ Fixed: themeColor moved to viewport export
export const viewport = {
  themeColor: "#3B82F6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function SplitPDFGuide() {
  const splittingMethods = [
    {
      title: "Online PDF Splitters",
      icon: Globe,
      platforms: ["PC", "Mobile", "Tablet"],
      pros: ["No installation required", "Free options available", "Accessible anywhere"],
      cons: ["File size limitations", "Requires internet", "Privacy concerns"],
      bestFor: "Quick, one-time splitting tasks"
    },
    {
      title: "Desktop Software",
      icon: Laptop,
      platforms: ["Windows", "Mac", "Linux"],
      pros: ["No file size limits", "Advanced features", "Complete privacy", "Batch processing"],
      cons: ["Software installation", "Some cost money", "Platform specific"],
      bestFor: "Professional and frequent use"
    },
    {
      title: "Mobile Apps",
      icon: Smartphone,
      platforms: ["iOS", "Android"],
      pros: ["Portable", "Camera scanning", "Cloud integration"],
      cons: ["Screen size limitations", "Fewer features", "Storage constraints"],
      bestFor: "On-the-go document splitting"
    },
    {
      title: "Command Line Tools",
      icon: Cpu,
      platforms: ["Windows", "Mac", "Linux"],
      pros: ["Automation friendly", "Scriptable", "High performance"],
      cons: ["Technical knowledge required", "No GUI", "Steep learning curve"],
      bestFor: "Developers and power users"
    }
  ];

  const useCases = [
    {
      title: "Separate Chapters from E-books",
      description: "Split large e-books into individual chapters for easier reading and sharing"
    },
    {
      title: "Extract Specific Pages for Reports",
      description: "Extract only necessary pages from lengthy documents for presentations"
    },
    {
      title: "Organize Scanned Documents",
      description: "Split multi-page scanned documents into individual files for better organization"
    },
    {
      title: "Prepare Documents for Email",
      description: "Split large PDFs into smaller files to bypass email attachment limits"
    },
    {
      title: "Create Individual Invoices",
      description: "Extract individual invoices from a consolidated monthly statement"
    },
    {
      title: "Separate Meeting Minutes",
      description: "Split combined meeting minutes into individual session documents"
    }
  ];

  const splittingOptions = [
    {
      method: "Split by Page Range",
      description: "Select specific page numbers or ranges to extract",
      icon: List,
      bestFor: "Extracting multiple consecutive pages"
    },
    {
      method: "Extract Every Page",
      description: "Create separate PDF for each individual page",
      icon: Copy,
      bestFor: "Creating page-by-page archives"
    },
    {
      method: "Split by Size",
      description: "Divide PDF when it reaches specific file size",
      icon: Package,
      bestFor: "Email attachment preparation"
    },
    {
      method: "Split by Bookmarks",
      description: "Use document bookmarks as split points",
      icon: BookOpen,
      bestFor: "Structured documents with bookmarks"
    }
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: "Local Processing",
      description: "Files processed locally without uploading to servers"
    },
    {
      icon: ShieldCheck,
      title: "No Data Retention",
      description: "Files automatically deleted after processing"
    },
    {
      icon: Cloud,
      title: "Secure Transfers",
      description: "End-to-end encrypted file transfers"
    },
    {
      icon: AlertTriangle,
      title: "Privacy Guarantee",
      description: "Strict no-sharing policy with third parties"
    }
  ];

  const qualityTips = [
    "Always backup original PDF before splitting",
    "Check page numbers carefully before splitting",
    "Use descriptive filenames for split documents",
    "Verify file integrity after splitting",
    "Maintain original quality settings",
    "Consider compression for large splits",
    "Organize split files in dedicated folders"
  ];

  const comprehensiveFAQ = [
    {
      question: "Is splitting PDF pages legal?",
      answer: "Yes, splitting PDF pages is legal as long as you have the right to edit the document. For copyrighted materials, ensure you have permission or are using it under fair use guidelines for personal purposes."
    },
    {
      question: "Can I split password-protected PDFs?",
      answer: "Most online tools cannot split password-protected PDFs. You'll need desktop software like Adobe Acrobat Pro that can open protected files with the correct password before splitting."
    },
    {
      question: "What's the best format for split documents?",
      answer: "PDF is usually best for maintaining formatting and quality. However, you can convert split pages to other formats like JPG or Word if needed for specific purposes."
    },
    {
      question: "How do I split a 1000-page PDF efficiently?",
      answer: "For large PDFs, use desktop software with batch processing capabilities. Split by ranges (e.g., 1-100, 101-200) or use automatic splitting by file size. Online tools may have limitations with very large files."
    },
    {
      question: "Can I undo a PDF split?",
      answer: "Once split, you cannot automatically 'undo' the operation. Always keep the original file backed up. You can recombine split files using PDF merger tools if needed."
    },
    {
      question: "Are free PDF splitters safe to use?",
      answer: "Reputable free tools from trusted companies are generally safe. Look for HTTPS encryption, clear privacy policies, and automatic file deletion features. Avoid unknown websites with suspicious ads."
    },
    {
      question: "How do I split PDF without losing quality?",
      answer: "Quality loss during splitting is rare since PDF splitting is typically lossless. Ensure you're using tools that preserve original resolution and formatting. Avoid tools that compress files during splitting."
    },
    {
      question: "Can I split PDFs on my phone?",
      answer: "Yes, many mobile apps like Adobe Scan, PDF Element, and Smallpdf offer PDF splitting functionality. Mobile apps are convenient but may have fewer features than desktop versions."
    }
  ];

  // How-to Schema
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Split PDF Page Wise - Complete Guide",
    "description": "Step-by-step guide to split PDF files page by page using online tools, desktop software, and mobile apps.",
    "totalTime": "PT5M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "supply": [
      {"@type": "HowToSupply", "name": "PDF file to split"},
      {"@type": "HowToSupply", "name": "Internet connection (for online tools)"},
      {"@type": "HowToSupply", "name": "Sufficient storage space"}
    ],
    "tool": [
      {"@type": "HowToTool", "name": "PDF splitting tool or software"},
      {"@type": "HowToTool", "name": "File manager"},
      {"@type": "HowToTool", "name": "Web browser or mobile app"}
    ],
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Choose Your Splitting Tool",
        "text": "Select between online splitters (quick and free), desktop software (advanced features), or mobile apps (portability).",
        "image": "https://pdfswift.online/blog/images/split-pdf.png"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Upload Your PDF File",
        "text": "Drag and drop your PDF or select it from your device. Ensure it's not password-protected for online tools.",
        "image": "https://pdfswift.online/blog/images/split-pdf.png"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Select Splitting Method",
        "text": "Choose how to split: by page range, extract every page, by file size, or using bookmarks.",
        "image": "https://pdfswift.online/blog/images/split-pdf.png"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Configure Page Selection",
        "text": "Specify which pages to extract. You can select individual pages, ranges, or use automatic splitting.",
        "image": "https://pdfswift.online/blog/images/split-pdf.png"
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Split and Download",
        "text": "Click split button and download the individual PDF files. Organize them appropriately for your needs.",
        "image": "https://pdfswift.online/blog/images/split-pdf.png"
      }
    ]
  };

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Split PDF Page Wise - Complete 2026 Guide",
    "description": "Learn all methods to split PDF files page by page. Comprehensive guide covering online tools, desktop software, mobile apps, and best practices for efficient PDF splitting.",
    "image": [
      "https://pdfswift.online/blog/images/split-pdf.png",
      "https://pdfswift.online/blog/images/split-pdf.png"
    ],
    "datePublished": "2026-01-16T09:00:00+00:00",
    "dateModified": "2026-01-16T09:00:00+00:00",
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
      "@id": "https://pdfswift.online/blog/how-to-split-pdf"
    },
    "articleSection": "Technology, Tutorials, Document Management",
    "keywords": "split pdf, split pdf pages, extract pdf pages, pdf splitter, split pdf online, split pdf free, desktop pdf splitter, mobile pdf splitter",
    "wordCount": "2200",
    "timeRequired": "PT5M",
    "inLanguage": "en-US",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".article-content"]
    }
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://pdfswift.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://pdfswift.online/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Split PDF Guide",
        "item": "https://pdfswift.online/blog/how-to-split-pdf-page-wise"
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PDFSwift - PDF Tools",
    "url": "https://pdfswift.online",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://pdfswift.online/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
          <ol className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <li>
              <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="Home">Home</a>
            </li>
            <li className="mx-2">
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </li>
            <li>
              <a href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="Blog">Blog</a>
            </li>
            <li className="mx-2">
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </li>
            <li aria-current="page" className="text-gray-900 dark:text-white font-medium">
              Split PDF Guide
            </li>
          </ol>
        </nav>

        {/* Header Section */}
        <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-8">
          <div className="text-center mb-8">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                <Scissors className="w-4 h-4 mr-2" aria-hidden="true" />
                PDF Editing Guide
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium">
                <BarChart3 className="w-4 h-4 mr-2" aria-hidden="true" />
                Updated January 2026
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" aria-hidden="true" />
                2200+ Words
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              How to <span className="text-blue-600 dark:text-blue-400">Split PDF Page Wise</span> on All Devices
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
              Complete 2026 Guide: Step-by-step instructions for splitting PDF files page by page on Windows, Mac, iOS, and Android with free and professional tools.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
              <div className="flex items-center">
                <CalendarDays className="w-5 h-5 mr-2" aria-hidden="true" />
                <time dateTime="2026-01-16" className="font-medium">January 16, 2026</time>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" aria-hidden="true" />
                <span className="font-medium">5 min read</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" aria-hidden="true" />
                <span className="font-medium">All Skill Levels</span>
              </div>
              <div className="flex items-center">
                <Download className="w-5 h-5 mr-2" aria-hidden="true" />
                <span className="font-medium">Free Tools Included</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div
            className="relative rounded-2xl overflow-hidden mb-12 h-[420px]"
            role="img"
            aria-label="PDF splitting illustration"
          >
            {/* Background Image */}
            <Image
              src="/images/split-pdf.png"
              alt="Split PDF page by page illustration"
              fill
              priority
              className="object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 text-white h-full flex items-center">
              <div className="px-8 max-w-xl">
                <h2 className="text-2xl font-bold mb-4">
                  Split Large PDFs into Individual Pages
                </h2>

                <p className="text-gray-200 mb-6">
                  Extract, organize, and manage PDF pages efficiently. Perfect for reports, e-books, invoices, and document organization.
                </p>

                <div className="flex items-center space-x-3">
                  <div className="px-4 py-2 bg-white/20 rounded-lg flex items-center">
                    <FileStack className="w-5 h-5 mr-2" />
                    <span>Multi-page PDF</span>
                  </div>

                  <ArrowRight className="w-6 h-6" />

                  <div className="px-4 py-2 bg-white/20 rounded-lg flex items-center">
                    <File className="w-5 h-5 mr-2" />
                    <span>Individual Pages</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <article className="lg:w-2/3 article-content">
              {/* Table of Contents */}
              <nav aria-label="Article sections" className="mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-blue-500" aria-hidden="true" />
                    Table of Contents
                  </h3>
                  <ol className="space-y-2">
                    {[
                      "Introduction to PDF Splitting",
                      "Why Split PDF Pages?",
                      "Method 1: Online PDF Splitters",
                      "Method 2: Desktop Software",
                      "Method 3: Mobile Apps",
                      "Step-by-Step Splitting Guide",
                      "Advanced Splitting Options",
                      "Quality & Security Tips",
                      "Frequently Asked Questions",
                      "Conclusion & Recommendations"
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
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Introduction to PDF Splitting</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    PDF splitting is an essential skill for anyone working with digital documents. Whether you need to extract specific pages from a report, separate chapters from an e-book, or divide a large document for email sharing, knowing how to split PDFs efficiently can save you significant time and effort.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    This comprehensive guide covers all methods of splitting PDF files page by page. We'll explore online tools, desktop software, mobile applications, and provide expert tips for maintaining quality and security throughout the process.
                  </p>
                </div>
              </section>

              {/* Why Split Section */}
              <section id="section-2" className="scroll-mt-20 mb-12">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                    <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Split PDF Pages?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {useCases.map((useCase, index) => (
                    <div 
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                          <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{useCase.title}</h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{useCase.description}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800/30">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Zap className="w-5 h-5 text-blue-500 mr-3" />
                    Key Benefits
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">Better document organization</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">Easier file sharing</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">Focused content extraction</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">Reduced file sizes</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Splitting Methods */}
              <section id="section-3" className="scroll-mt-20 mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Splitting Methods Comparison</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {splittingMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <div 
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex items-center mb-4">
                          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-4">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{method.title}</h3>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">PLATFORMS</h4>
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

              {/* Advanced Options */}
              <section id="section-4" className="scroll-mt-20 mb-12">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                    <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Advanced Splitting Options</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {splittingOptions.map((option, index) => {
                    const Icon = option.icon;
                    return (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center mb-4">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                            <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{option.method}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{option.bestFor}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{option.description}</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Step-by-Step Guide */}
              <section id="section-5" className="scroll-mt-20 mb-12">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                    <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Step-by-Step Splitting Guide</h2>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" aria-hidden="true" />
                        <span className="font-semibold text-gray-900 dark:text-white">Time Required</span>
                      </div>
                      <p className="text-lg font-bold text-blue-700 dark:text-blue-300">2-5 minutes</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Cpu className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" aria-hidden="true" />
                        <span className="font-semibold text-gray-900 dark:text-white">Difficulty Level</span>
                      </div>
                      <p className="text-lg font-bold text-green-700 dark:text-green-300">Beginner Friendly</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <HardDrive className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" aria-hidden="true" />
                        <span className="font-semibold text-gray-900 dark:text-white">Cost</span>
                      </div>
                      <p className="text-lg font-bold text-purple-700 dark:text-purple-300">Free Options Available</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {[
                      {
                        step: 1,
                        title: "Select Your Tool",
                        description: "Choose an online splitter for quick tasks, desktop software for advanced features, or mobile apps for portability."
                      },
                      {
                        step: 2,
                        title: "Upload PDF File",
                        description: "Upload your PDF document. Most tools support files up to 50-100MB for free users. Remove passwords if using online tools."
                      },
                      {
                        step: 3,
                        title: "Choose Splitting Method",
                        description: "Select how to split: by page range, extract every page, by file size, or using bookmarks/headings."
                      },
                      {
                        step: 4,
                        title: "Specify Pages",
                        description: "Enter page numbers or ranges (e.g., 1-5, 7, 10-15). Preview selection if available."
                      },
                      {
                        step: 5,
                        title: "Split and Download",
                        description: "Click split button. Download as individual files or a ZIP archive. Verify all pages are correctly extracted."
                      }
                    ].map((step) => (
                      <div key={step.step} className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mr-6">
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
              </section>

              {/* Quality Tips */}
              <section id="section-6" className="scroll-mt-20 mb-12">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-800/30">
                  <div className="flex items-center mb-6">
                    <PaintBucket className="w-8 h-8 text-amber-600 dark:text-amber-400 mr-4" aria-hidden="true" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Quality & Organization Tips</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {qualityTips.map((tip, index) => (
                      <div 
                        key={index}
                        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-5 rounded-xl border border-amber-100 dark:border-amber-800/30"
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mr-4 mt-0.5">
                            <span className="text-amber-600 dark:text-amber-400 font-bold">
                              {index + 1}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{tip}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Security Section */}
              <section id="section-7" className="scroll-mt-20 mb-12">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800/30">
                  <div className="flex items-center mb-6">
                    <ShieldCheck className="w-8 h-8 text-green-600 dark:text-green-400 mr-4" aria-hidden="true" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Security Best Practices</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {securityFeatures.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="flex items-start">
                          <Icon className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">{feature.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="bg-white/50 dark:bg-gray-800/50 p-5 rounded-lg">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">Security Checklist</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span>Use HTTPS websites only for online splitting</span>
                      </li>
                      <li className="flex items-center text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span>Remove sensitive information before using online tools</span>
                      </li>
                      <li className="flex items-center text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span>Choose desktop software for confidential documents</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section id="section-8" className="scroll-mt-20 mb-12">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                    <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                  {comprehensiveFAQ.map((item, index) => (
                    <div 
                      key={index} 
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                      itemScope
                      itemProp="mainEntity"
                      itemType="https://schema.org/Question"
                    >
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center" itemProp="name">
                        <HelpCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" aria-hidden="true" />
                        {item.question}
                      </h4>
                      <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                        <p className="text-gray-700 dark:text-gray-300 pl-8" itemProp="text">{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Related Content */}
              <section className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related PDF Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-3">
                      <FilePlus className="w-5 h-5 text-blue-500 mr-2" />
                      <h4 className="font-bold text-gray-900 dark:text-white">Merge PDF Files</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Learn how to combine multiple PDF files into a single document with proper formatting.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-3">
                      <FileMinus className="w-5 h-5 text-green-500 mr-2" />
                      <h4 className="font-bold text-gray-900 dark:text-white">Compress PDF</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Reduce PDF file sizes without significant quality loss for easier sharing and storage.
                    </p>
                  </div>
                </div>
              </section>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-1/3">
              <div className="sticky top-8 space-y-6">
                {/* Quick Stats */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-blue-500" aria-hidden="true" />
                    Quick Facts
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Guide Length</span>
                      <span className="font-semibold text-gray-900 dark:text-white">2200+ Words</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Reading Time</span>
                      <span className="font-semibold text-gray-900 dark:text-white">5 Minutes</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
                      <span className="font-semibold text-gray-900 dark:text-white">Jan 16, 2026</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 dark:text-gray-400">Tools Covered</span>
                      <span className="font-semibold text-gray-900 dark:text-white">12+ Methods</span>
                    </div>
                  </div>
                </div>

                {/* Recommended Tools */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                    Recommended Tools by PDFSwift
                  </h4>

                  <div className="space-y-4">
                    {/* Split PDF Tool */}
                    <a
                      href="/split-pdf"
                      className="block p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30 hover:shadow-md transition"
                      aria-label="Split PDF Tool by PDFSwift"
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Split PDF Tool
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Split PDF files by page range or extract every page into individual files.
                      </p>

                      <div className="flex items-center text-xs text-gray-500">
                        <Scissors className="w-3 h-3 mr-1" />
                        <span>Free • Secure • No Limits</span>
                      </div>
                    </a>

                    {/* Merge PDF Tool */}
                    <a
                      href="/merge-pdf"
                      className="block p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800/30 hover:shadow-md transition"
                      aria-label="Merge PDF Tool by PDFSwift"
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Merge PDF Tool
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Combine multiple PDF files into a single document with drag-and-drop ease.
                      </p>

                      <div className="flex items-center text-xs text-gray-500">
                        <FilePlus className="w-3 h-3 mr-1" />
                        <span>Fast • Unlimited Files</span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Platform Comparison */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">Platform Comparison</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="flex items-center">
                        <Monitor className="w-4 h-4 text-blue-500 mr-2" />
                        <span className="text-sm">Desktop</span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                        Most Features
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="flex items-center">
                        <SmartphoneIcon className="w-4 h-4 text-green-500 mr-2" />
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
                <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl p-6 text-white">
                  <h4 className="font-bold mb-4 text-lg">Ready to Split Your PDF?</h4>
                  <p className="text-blue-100 mb-6 text-sm">
                    Start splitting your PDF files page by page today with our recommended tools and methods.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" aria-hidden="true" />
                      <span className="text-sm">No installation required</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" aria-hidden="true" />
                      <span className="text-sm">Multiple splitting options</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" aria-hidden="true" />
                      <span className="text-sm">Quality guaranteed</span>
                    </li>
                  </ul>

                  {/* Link to Split PDF page */}
                  <Link href="/split-pdf" passHref>
                    <button 
                      className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
                      aria-label="Start splitting PDF now"
                    >
                      <Scissors className="w-5 h-5 mr-2" />
                      Start Splitting Now
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