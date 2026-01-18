import data from "../data.json";
import Link from "next/link";
import Image from "next/image";
import BlogToolsSection from "@/app/components/BlogToolsSection";

import { 
  CalendarDays, 
  File, 
  Shield, 
  CheckCircle, 
  Lightbulb,
  ArrowRight,
  Sparkles,
  Clock,
  FileText,
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
  Tablet,
  Folder,
  FileStack,
  Combine,
  SortAsc,
  ArrowDownUp,
  FileInput,
  FileOutput,
  FolderOpen,
  Archive,
  Book,
  Library,
  Copy,
  Scissors,
  RotateCcw,
  Eye,
  Printer,
  Send,
  Mail,
  MessageCircle,
  Network,
  Server,
  Database,
  Wifi,
  WifiOff,
  Battery,
  Power,
  RefreshCw,
  Filter,
  Grid,
  List,
  Columns,
  PanelLeft,
  PanelRight,
  Layout,
  Package,
  Box,
  Container,
  FolderTree,
  Minimize2
} from "lucide-react";

export const dynamic = "force-static";

// ✅ Fixed: Add metadata in separate export (for Next.js App Router)
export const metadata = {
  title: "How to Merge PDF Files: Complete 2026 Guide for Desktop, Mobile & Online",
  description: "Learn how to merge multiple PDF files into one document. Step-by-step guide covering online tools, desktop software, mobile apps, organization tips, and security best practices.",
  keywords: "merge pdf files, combine pdf, pdf merger, merge pdf online, merge pdf free, combine pdf files into one, how to merge pdf, pdf merger online, merge pdf windows, merge pdf mac, merge pdf android, merge pdf ios, batch merge pdf, secure pdf merger, organize pdf",
  
  // Open Graph / Facebook
  openGraph: {
    type: "article",
    url: "https://pdfswift.online/blog/how-to-merge-pdf-files",
    title: "How to Merge PDF Files: Complete 2026 Guide for All Devices",
    description: "Complete guide to merge multiple PDF files into one document on Windows, Mac, iOS, and Android. Learn all methods with organization and security tips.",
    images: [
      {
        url: "https://pdfswift.online/blog/images/how-to-merge.jpg",
        width: 1200,
        height: 630,
        alt: "PDF Merger Guide - Combine Multiple PDFs",
      },
    ],
    siteName: "PDFSwift",
    locale: "en_US",
    publishedTime: "2026-01-15T09:00:00+00:00",
    modifiedTime: "2026-01-15T09:00:00+00:00",
    authors: ["PDFSwift"],
    tags: ["PDF Tools", "Document Management", "Productivity"],
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
    canonical: "/blog/how-to-merge-pdf-files",
  },
  category: "Productivity",
  classification: "Tutorials, Document Management",
};

// ✅ Fixed: themeColor moved to viewport export
export const viewport = {
  themeColor: "#3B82F6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function MergePDFGuide() {
  const mergingMethods = [
    {
      title: "Online PDF Mergers",
      icon: Globe,
      platforms: ["PC", "Mobile", "Tablet"],
      pros: ["No software installation", "Free options available", "Accessible anywhere"],
      cons: ["Internet connection required", "File size limitations", "Privacy concerns"],
      bestFor: "Quick, occasional merging"
    },
    {
      title: "Desktop Software",
      icon: Laptop,
      platforms: ["Windows", "Mac", "Linux"],
      pros: ["Bulk processing", "Advanced features", "Offline functionality", "Better security"],
      cons: ["Installation required", "Some software is paid", "Storage space needed"],
      bestFor: "Professional & frequent use"
    },
    {
      title: "Mobile Apps",
      icon: Smartphone,
      platforms: ["iOS", "Android"],
      pros: ["Portable", "Camera integration", "Cloud storage sync", "Quick sharing"],
      cons: ["Limited screen size", "Fewer advanced options", "Smaller file handling"],
      bestFor: "On-the-go merging"
    }
  ];

  const organizationTips = [
    "Sort files by date or name before merging for better organization",
    "Use clear naming conventions for merged files (e.g., 'ProjectName_Date_Merged.pdf')",
    "Add page numbers to merged documents for easy reference",
    "Create bookmarks for different sections in large merged PDFs",
    "Compress large files before merging to reduce final file size",
    "Use table of contents for documents with multiple sections",
    "Consider splitting large merged files into volumes if exceeding 100 pages"
  ];

  const useCases = [
    {
      title: "Academic Submissions",
      description: "Combine research papers, assignments, and references into a single PDF for submission"
    },
    {
      title: "Business Reports",
      description: "Merge financial statements, presentations, and documents for comprehensive reports"
    },
    {
      title: "Legal Documentation",
      description: "Combine contracts, agreements, and supporting documents into organized case files"
    },
    {
      title: "Portfolio Creation",
      description: "Merge design samples, resumes, and certificates for professional portfolios"
    },
    {
      title: "Project Documentation",
      description: "Combine proposals, plans, and progress reports into cohesive project documentation"
    }
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All files are encrypted during upload and processing"
    },
    {
      icon: ShieldCheck,
      title: "Automatic File Deletion",
      description: "Uploaded files are automatically deleted within 24 hours"
    },
    {
      icon: Cloud,
      title: "Secure Cloud Processing",
      description: "Files are processed in secure, encrypted cloud servers"
    },
    {
      icon: AlertTriangle,
      title: "No Data Retention",
      description: "No copies of your files are stored after processing"
    }
  ];

  const blogData = data[0] || {};
  const { howto = {}, faq = [] } = blogData;

  const formatTime = (isoTime: string) => {
    if (!isoTime) return "7 minutes";
    return isoTime.replace('PT', '').replace('M', ' minutes');
  };

  // Comprehensive FAQ for PDF Merging
  const comprehensiveFAQ = [
    {
      question: "Is it safe to merge PDF files online?",
      answer: "Yes, it's safe when using reputable online PDF mergers that use HTTPS encryption, have clear privacy policies, and automatically delete files after processing. Avoid uploading highly sensitive documents to unknown websites and always check for security certificates."
    },
    {
      question: "What's the maximum number of PDFs I can merge at once?",
      answer: "Most online tools allow merging 10-20 files at once, with total size limits of 50-100MB. Desktop software like Adobe Acrobat can handle hundreds of files. Some advanced tools support batch processing of unlimited files with proper system resources."
    },
    {
      question: "Can I control the order of pages when merging PDFs?",
      answer: "Yes, all quality PDF mergers allow you to rearrange files before merging. You can drag and drop files into your preferred order, preview individual pages, and even rearrange pages within documents before finalizing the merge."
    },
    {
      question: "Does merging PDFs reduce quality?",
      answer: "No, merging PDFs is a non-destructive process that preserves the original quality of all documents. The content remains exactly the same; only the file structure changes to combine multiple documents into one."
    },
    {
      question: "Can I merge password-protected PDF files?",
      answer: "Most online tools cannot process password-protected PDFs. You'll need desktop software like Adobe Acrobat Pro that can unlock protected files with the correct password before merging them."
    },
    {
      question: "What's the difference between merging and combining PDFs?",
      answer: "These terms are often used interchangeably, but technically: Merging usually implies bringing together multiple files into one. Combining might also include arranging pages in specific orders or interleaving pages from different documents."
    },
    {
      question: "How do I reduce file size after merging multiple PDFs?",
      answer: "You can reduce file size by: 1) Using compression features in your PDF software, 2) Converting images to lower resolution, 3) Removing unnecessary pages, 4) Using online compression tools after merging, or 5) Saving with reduced quality settings."
    },
    {
      question: "Are there free PDF mergers without watermarks?",
      answer: "Yes, many reputable tools offer free merging without watermarks including PDFSwift, Smallpdf, ILovePDF, and Adobe Acrobat Online (free tier). Most free versions have limitations like file size restrictions or daily usage limits."
    }
  ];

  // How-to Schema
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Merge PDF Files - Complete 2026 Guide",
    "description": "Step-by-step guide to merge multiple PDF files into one document on all devices including Windows, Mac, iOS, and Android.",
    "totalTime": "PT5M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "supply": [
      {"@type": "HowToSupply", "name": "PDF files to merge"},
      {"@type": "HowToSupply", "name": "Internet connection (for online tools)"},
      {"@type": "HowToSupply", "name": "Sufficient storage space"}
    ],
    "tool": [
      {"@type": "HowToTool", "name": "Computer or mobile device"},
      {"@type": "HowToTool", "name": "Web browser or PDF merger app"},
      {"@type": "HowToTool", "name": "File manager"}
    ],
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Select Your Merger Tool",
        "text": "Choose between online mergers (quick and free), desktop software (professional features), or mobile apps (portable convenience).",
        "image": "https://pdfswift.online/blog/images/how-to-merge.jpg"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Upload Your PDF Files",
        "text": "Select multiple PDF files from your device or drag and drop them into the merger interface.",
        "image": "https://pdfswift.online/blog/images/how-to-merge.jpg"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Arrange and Organize",
        "text": "Drag files into your preferred order, preview pages, and set organization options like page numbering.",
        "image": "https://pdfswift.online/blog/images/arrange-files.png"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Merge and Process",
        "text": "Click the merge button and wait for processing. Larger files or more documents will take longer to process.",
        "image": "https://pdfswift.online/blog/images/process-merge.png"
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Download and Verify",
        "text": "Download the merged PDF file and verify all pages are included in the correct order.",
        "image": "https://pdfswift.online/blog/images/download-merged.png"
      }
    ]
  };

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Merge PDF Files: Complete 2026 Guide for Desktop, Mobile & Online",
    "description": "Step-by-step guide to merge multiple PDF files into one document. Learn online methods, desktop software options, mobile apps, and best practices for organization and security.",
    "image": [
      "https://pdfswift.online/blog/images/how-to-merge.jpg",
      "https://pdfswift.online/blog/images/how-to-merge.jpg"
    ],
    "datePublished": "2026-01-15T09:00:00+00:00",
    "dateModified": "2026-01-15T09:00:00+00:00",
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
        "url": "https://pdfswift.online/favicon.png",
        "width": 160,
        "height": 60
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://pdfswift.online/merge-pdf"
    },
    "articleSection": "Productivity, Tutorials, Document Management",
    "keywords": "merge pdf files, combine pdf, pdf merger, merge pdf online, merge pdf free, combine pdf files into one, how to merge pdf, pdf merger online",
    "wordCount": "1950",
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
        "name": "PDF Merger Guide",
        "item": "https://pdfswift.online/blog/how-to-merge-pdf"
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PDFSwift - PDF Tools & Converters",
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
              Merge PDF Guide
            </li>
          </ol>
        </nav>

        {/* Header Section */}
        <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-8">
          <div className="text-center mb-8">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                <FileStack className="w-4 h-4 mr-2" aria-hidden="true" />
                Document Management Guide
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium">
                <BarChart3 className="w-4 h-4 mr-2" aria-hidden="true" />
                Updated January 2026
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" aria-hidden="true" />
                1950+ Words
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              How to <span className="text-blue-600 dark:text-blue-400">Merge PDF Files</span> in 2026
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
              Complete Guide: Combine multiple PDF documents into one file on Windows, Mac, iOS, Android, and online tools.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
              <div className="flex items-center">
                <CalendarDays className="w-5 h-5 mr-2" aria-hidden="true" />
                <time dateTime="2026-01-15" className="font-medium">January 15, 2026</time>
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
            aria-label="PDF merging process illustration"
          >
           

<div className="absolute inset-0">
  <Image
    src="/images/how-to-merge.jpg"
    alt="Background"
    fill
    className="object-contain bg-black"
    priority
  />
  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 to-purple-700/70" />
</div>



            {/* Content */}
            <div className="relative z-10 text-white h-full flex items-center">
              <div className="px-8 max-w-xl">
                <h2 className="text-2xl font-bold mb-4">
                  Combine Multiple PDFs into One Organized Document
                </h2>

                <p className="text-gray-200 mb-6">
                  Merge reports, contracts, images, and documents into professionally organized PDF files for business, academic, and personal use.
                </p>

                <div className="flex items-center space-x-3">
                  <div className="px-4 py-2 bg-white/20 rounded-lg flex items-center">
                    <FolderTree className="w-5 h-5 mr-2" />
                    <span>Multiple PDFs</span>
                  </div>

                  <ArrowRight className="w-6 h-6" />

                  <div className="px-4 py-2 bg-white/20 rounded-lg flex items-center">
                    <File className="w-5 h-5 mr-2" />
                    <span>Single PDF</span>
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
                      "Introduction to PDF Merging",
                      "Why Merge PDF Files?",
                      "Method 1: Online PDF Mergers",
                      "Method 2: Desktop Software",
                      "Method 3: Mobile Apps",
                      "Step-by-Step Merging Guide",
                      "Organization Best Practices",
                      "Security Considerations",
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
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Introduction to PDF Merging</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Merging PDF files is an essential skill for organizing digital documents efficiently. Whether you're compiling reports, combining research papers, or organizing business documents, knowing how to properly merge PDFs can save time and improve workflow.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    This comprehensive guide covers all methods for merging PDF files across platforms. We'll explore online tools, desktop applications, mobile apps, and provide expert tips for maintaining document organization and security.
                  </p>
                </div>
              </section>

              {/* Why Merge Section */}
              <section id="section-2" className="scroll-mt-20 mb-12">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                    <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Merge PDF Files?</h2>
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
                    Key Benefits of PDF Merging
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">Improved document organization</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">Reduced file management overhead</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">Easier sharing and distribution</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">Professional presentation of materials</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Merging Methods */}
              <section id="section-3" className="scroll-mt-20 mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">PDF Merging Methods Comparison</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {mergingMethods.map((method, index) => {
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

              {/* Step-by-Step Guide */}
              <section id="section-4" className="scroll-mt-20 mb-12">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                    <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Step-by-Step Merging Guide</h2>
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
                        title: "Select Your PDF Merger",
                        description: "Choose between online tools for quick merging, desktop software for advanced features, or mobile apps for on-the-go convenience."
                      },
                      {
                        step: 2,
                        title: "Upload Multiple PDF Files",
                        description: "Select all PDF files you want to merge. Most tools support batch selection or drag-and-drop functionality."
                      },
                      {
                        step: 3,
                        title: "Arrange and Organize",
                        description: "Drag files into your preferred order. Preview pages and set organization options like adding page numbers or bookmarks."
                      },
                      {
                        step: 4,
                        title: "Configure Settings",
                        description: "Adjust compression settings, choose output quality, and set file naming conventions before merging."
                      },
                      {
                        step: 5,
                        title: "Merge and Download",
                        description: "Click 'Merge' and wait for processing. Download the combined PDF file and verify all content is included correctly."
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

              {/* Organization Tips */}
              <section id="section-5" className="scroll-mt-20 mb-12">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-800/30">
                  <div className="flex items-center mb-6">
                    <Folder className="w-8 h-8 text-amber-600 dark:text-amber-400 mr-4" aria-hidden="true" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Organization Best Practices</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {organizationTips.map((tip, index) => (
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
              <section id="section-6" className="scroll-mt-20 mb-12">
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
                        <span>Always use HTTPS websites for online merging</span>
                      </li>
                      <li className="flex items-center text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span>Read privacy policies before uploading confidential documents</span>
                      </li>
                      <li className="flex items-center text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span>Use desktop software for sensitive business documents</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section id="section-7" className="scroll-mt-20 mb-12">
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
                      <Scissors className="w-5 h-5 text-blue-500 mr-2" />
                      <h4 className="font-bold text-gray-900 dark:text-white">Split PDF Guide</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Learn how to split large PDF files into smaller documents or extract specific pages.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-3">
                      <Minimize2 className="w-5 h-5 text-green-500 mr-2" />
                      <h4 className="font-bold text-gray-900 dark:text-white">Compress PDF Files</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Techniques for reducing PDF file sizes without compromising quality for email and web.
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
                      <span className="font-semibold text-gray-900 dark:text-white">1950+ Words</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Reading Time</span>
                      <span className="font-semibold text-gray-900 dark:text-white">5 Minutes</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
                      <span className="font-semibold text-gray-900 dark:text-white">Jan 15, 2026</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Max Files to Merge</span>
                      <span className="font-semibold text-gray-900 dark:text-white">20+ (most tools)</span>
                    </div>
                  </div>
                </div>

                {/* Recommended Tools */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                    Recommended Tools by PDFSwift
                  </h4>

                  <div className="space-y-4">
                    {/* PDF Merger */}
                    <a
                      href="/merge-pdf"
                      className="block p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30 hover:shadow-md transition"
                      aria-label="PDF Merger by PDFSwift"
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          PDF Merger Tool
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Combine multiple PDF files into one organized document instantly.
                      </p>

                      <div className="flex items-center text-xs text-gray-500">
                        <Combine className="w-3 h-3 mr-1" />
                        <span>Free • Secure • Unlimited</span>
                      </div>
                    </a>

                    {/* Split PDF */}
                    <a
                      href="/split-pdf"
                      className="block p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800/30 hover:shadow-md transition"
                      aria-label="Split PDF by PDFSwift"
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Split PDF Tool
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Split large PDF files into smaller documents or extract specific pages.
                      </p>

                      <div className="flex items-center text-xs text-gray-500">
                        <Scissors className="w-3 h-3 mr-1" />
                        <span>Fast • Precise</span>
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
                        <span className="text-sm">Desktop Software</span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                        Most Features
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="flex items-center">
                        <Smartphone className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm">Mobile Apps</span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
                        Most Portable
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 text-purple-500 mr-2" />
                        <span className="text-sm">Online Tools</span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">
                        Most Accessible
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl p-6 text-white">
                  <h4 className="font-bold mb-4 text-lg">Ready to Merge?</h4>
                  <p className="text-blue-100 mb-6 text-sm">
                    Start merging your PDF files today with our recommended tools and methods for organized document management.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" aria-hidden="true" />
                      <span className="text-sm">No registration required</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" aria-hidden="true" />
                      <span className="text-sm">Multiple file support</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" aria-hidden="true" />
                      <span className="text-sm">Organization tools included</span>
                    </li>
                  </ul>

                  {/* Link to Merge PDF page */}
                  <Link href="/merge-pdf" passHref>
                    <button 
                      className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
                      aria-label="Start merging PDFs now"
                    >
                      <Combine className="w-5 h-5 mr-2" />
                      Merge PDFs Now
                    </button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
      <BlogToolsSection />
    </>
  );
}