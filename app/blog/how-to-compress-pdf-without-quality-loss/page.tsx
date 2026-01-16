import data from "../data.json";
import Link from "next/link";
import Image from "next/image";
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
  // Compression-related icons - using available icons
  MinusCircle,
  FileMinus,
  FolderMinus,
  Gauge,
  Network,
  Scissors,
  FileQuestion,
  DownloadCloud,
  Server,
  PieChart,
  TrendingDown,
  Battery,
  BatteryCharging,
  FileCheck
} from "lucide-react";

export const dynamic = "force-static";

// ✅ Metadata for Next.js App Router
export const metadata = {
  title: "How to Compress PDF Without Quality Loss | Complete 2026 Guide",
  description: "Learn how to compress PDF files without losing quality. Step-by-step guide covering online tools, desktop software, mobile apps, optimization techniques, and best practices for 2026.",
  keywords: "compress pdf without quality loss, reduce pdf file size, pdf compression techniques, shrink pdf file, optimize pdf size, compress pdf online, pdf size reducer, compress pdf for email, high quality pdf compression, compress scanned pdf, batch pdf compression, pdf compressor tools, compress pdf windows, compress pdf mac, compress pdf mobile, adobe pdf compression, free pdf compression",
  
  // Open Graph / Facebook
  openGraph: {
    type: "article",
    url: "https://pdfswift.online/blog/how-to-compress-pdf-without-quality-loss",
    title: "How to Compress PDF Without Quality Loss | 2026 Complete Guide",
    description: "Complete guide to compress PDF files while preserving quality. Learn all methods with step-by-step instructions for Windows, Mac, iOS, and Android.",
    images: [
      {
        url: "https://pdfswift.online/blog/images/pdf-compression-guide.jpg",
        width: 1200,
        height: 630,
        alt: "PDF Compression Guide - Reduce Size Without Quality Loss",
      },
    ],
    siteName: "PDFSwift",
    locale: "en_US",
    publishedTime: "2026-01-17T09:00:00+00:00",
    modifiedTime: "2026-01-17T09:00:00+00:00",
    authors: ["PDFSwift"],
    tags: ["PDF Compression", "File Optimization", "Document Management"],
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
    canonical: "/blog/how-to-compress-pdf-without-quality-loss",
  },
  category: "Technology",
  classification: "Tutorials, Document Optimization",
};

// ✅ themeColor moved to viewport export
export const viewport = {
  themeColor: "#10B981",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function PDFCompressionGuide() {
  const compressionMethods = [
    {
      title: "Online PDF Compressors",
      icon: Globe,
      platforms: ["PC", "Mobile", "Tablet"],
      compressionRatio: "Up to 90%",
      pros: ["No software installation", "Instant results", "Cross-platform access"],
      cons: ["File size limits", "Internet required"],
      bestFor: "Quick compression needs"
    },
    {
      title: "Desktop Software",
      icon: Laptop,
      platforms: ["Windows", "Mac", "Linux"],
      compressionRatio: "Up to 95%",
      pros: ["Advanced settings", "Batch processing", "Offline operation"],
      cons: ["Installation required", "May have cost"],
      bestFor: "Professional & bulk compression"
    },
    {
      title: "Mobile Apps",
      icon: Smartphone,
      platforms: ["iOS", "Android"],
      compressionRatio: "Up to 85%",
      pros: ["On-the-go access", "Easy sharing", "Camera integration"],
      cons: ["Limited features", "Smaller screens"],
      bestFor: "Mobile document management"
    }
  ];

  const compressionTechniques = [
    "Image downsampling to 150 DPI for screen viewing",
    "Remove embedded fonts and substitute with standard fonts",
    "Optimize image compression using JPEG2000 or JBIG2",
    "Remove embedded thumbnails and duplicate resources",
    "Compress text and line art with Flate encoding",
    "Use object streams for better compression",
    "Remove unnecessary metadata and annotations",
    "Set appropriate color space (RGB for web, CMYK for print)"
  ];

  const useCases = [
    {
      title: "Email Attachments",
      description: "Reduce PDF size to meet email attachment limits while keeping documents readable"
    },
    {
      title: "Website Uploads",
      description: "Optimize PDFs for faster website loading and better user experience"
    },
    {
      title: "Cloud Storage",
      description: "Save storage space on cloud platforms like Google Drive, Dropbox, or OneDrive"
    },
    {
      title: "Mobile Sharing",
      description: "Compress documents for quick sharing via WhatsApp, Telegram, or messaging apps"
    },
    {
      title: "Archival Storage",
      description: "Create space-efficient archives while maintaining document integrity"
    }
  ];

  const qualityPreservationTips = [
    {
      icon: FileCheck,
      title: "Selective Compression",
      description: "Apply different compression levels to images and text separately"
    },
    {
      icon: ShieldCheck,
      title: "Quality Preview",
      description: "Always preview compressed file before finalizing"
    },
    {
      icon: Gauge,
      title: "Progressive Optimization",
      description: "Gradually increase compression to find optimal balance"
    },
    {
      icon: Settings,
      title: "Custom Settings",
      description: "Adjust compression parameters for different document types"
    }
  ];

  const blogData = data[0] || {};
  const { howto = {}, faq = [] } = blogData;

  // Comprehensive FAQ for PDF Compression
  const comprehensiveFAQ = [
    {
      question: "Can I compress a PDF without losing quality?",
      answer: "Yes, you can compress PDFs significantly without noticeable quality loss using intelligent compression techniques. Modern tools use lossless compression for text and vector graphics, and optimized lossy compression for images that maintains visual quality while reducing file size."
    },
    {
      question: "What's the best compression ratio for PDF files?",
      answer: "A compression ratio of 70-90% is typically optimal for most documents. For text-heavy PDFs, you can achieve up to 90% reduction. For image-heavy PDFs, aim for 50-70% reduction while maintaining quality. Always test different levels to find the best balance for your specific document."
    },
    {
      question: "How do I compress scanned PDF documents?",
      answer: "Scanned PDFs compress best using specialized OCR compression that analyzes document content. Use tools that support MRC (Mixed Raster Content) compression, apply JBIG2 for monochrome images, and set appropriate DPI (150 for screen viewing, 300 for printing). Remove blank pages and unnecessary margins first."
    },
    {
      question: "What's the difference between lossy and lossless compression?",
      answer: "Lossless compression reduces file size without any quality loss by eliminating redundant data. Lossy compression achieves higher reduction by removing some data, potentially affecting quality. For PDFs, use lossless for text/vector and optimized lossy for images to maintain quality while maximizing compression."
    },
    {
      question: "How can I compress PDF for email attachments?",
      answer: "For email attachments: 1) Compress to under 10MB for most email services, 2) Use 'Optimize for Web' or 'Email ready' presets, 3) Reduce image resolution to 96-150 DPI, 4) Remove embedded fonts, 5) Use online tools with direct email integration for large files."
    },
    {
      question: "Are online PDF compressors safe to use?",
      answer: "Reputable online compressors are safe when they use HTTPS encryption, have clear privacy policies, automatically delete files after processing, and don't store your documents. Look for services with 'bank-level security', 'SSL encryption', and 'automatic file deletion' features."
    },
    {
      question: "Can I compress password-protected PDFs?",
      answer: "Most online tools cannot process password-protected PDFs. Use desktop software like Adobe Acrobat Pro that can open protected files with the correct password. Alternatively, remove the password (if you have rights), compress, then re-add protection if needed."
    },
    {
      question: "How do I compress multiple PDF files at once?",
      answer: "Use batch compression features available in desktop software or online tools that support multiple file uploads. For best results: 1) Group similar documents together, 2) Apply consistent settings, 3) Use file naming conventions, 4) Verify each compressed file individually."
    }
  ];

  // How-to Schema
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Compress PDF Without Quality Loss",
    "description": "Step-by-step guide to compress PDF files while preserving quality. Learn techniques for different document types and platforms.",
    "totalTime": "PT5M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "supply": [
      {"@type": "HowToSupply", "name": "PDF file to compress"},
      {"@type": "HowToSupply", "name": "Internet connection (for online tools)"},
      {"@type": "HowToSupply", "name": "Sufficient storage for backup"}
    ],
    "tool": [
      {"@type": "HowToTool", "name": "PDF compression software or website"},
      {"@type": "HowToTool", "name": "Computer or mobile device"},
      {"@type": "HowToTool", "name": "File comparison tool"}
    ],
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Analyze Your PDF",
        "text": "Check current file size, document type (text/image heavy), and identify compression opportunities.",
        "image": "https://pdfswift.online/blog/images/analyze-pdf.png"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Choose Compression Method",
        "text": "Select online tools for convenience, desktop software for advanced features, or mobile apps for on-the-go compression.",
        "image": "https://pdfswift.online/blog/images/choose-method.png"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Configure Settings",
        "text": "Adjust compression level, image resolution, font embedding, and other optimization parameters.",
        "image": "https://pdfswift.online/blog/images/choose-method.png"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Preview & Compare",
        "text": "Preview compressed version, compare quality with original, and adjust settings if needed.",
        "image": "https://pdfswift.online/blog/images/choose-method.png"
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Save & Verify",
        "text": "Save compressed file with appropriate name and verify it meets your size and quality requirements.",
        "image": "https://pdfswift.online/blog/images/choose-method.png"
      }
    ]
  };

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Compress PDF Without Quality Loss - Complete 2026 Guide",
    "description": "Learn how to reduce PDF file size while maintaining quality. Step-by-step instructions for online tools, desktop software, mobile apps, and optimization techniques.",
    "image": [
      "https://pdfswift.online/blog/images/choose-method.png",
      "https://pdfswift.online/blog/images/compress-pdf-featured.jpg"
    ],
    "datePublished": "2026-01-17T09:00:00+00:00",
    "dateModified": "2026-01-17T09:00:00+00:00",
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
      "@id": "https://pdfswift.online/blog/how-to-compress-pdf-without-quality-loss"
    },
    "articleSection": "Technology, Tutorials, Document Optimization",
    "keywords": "compress pdf, reduce pdf size, pdf optimization, shrink pdf file, compress pdf online, pdf compression techniques, compress pdf without quality loss, pdf size reducer",
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
        "name": "PDF Compression Guide",
        "item": "https://pdfswift.online/blog/how-to-compress-pdf-without-quality-loss"
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PDFSwift - PDF Compression Tools",
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
              <a href="/" className="hover:text-green-600 dark:hover:text-green-400 transition-colors" aria-label="Home">Home</a>
            </li>
            <li className="mx-2">
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </li>
            <li>
              <a href="/blog" className="hover:text-green-600 dark:hover:text-green-400 transition-colors" aria-label="Blog">Blog</a>
            </li>
            <li className="mx-2">
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </li>
            <li aria-current="page" className="text-gray-900 dark:text-white font-medium">
              PDF Compression Guide
            </li>
          </ol>
        </nav>

        {/* Header Section */}
        <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-8">
          <div className="text-center mb-8">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium">
                <MinusCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                File Optimization Guide
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                <BarChart3 className="w-4 h-4 mr-2" aria-hidden="true" />
                Updated January 2026
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" aria-hidden="true" />
                1950+ Words
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              How to <span className="text-green-600 dark:text-green-400">Compress PDF</span> Without Quality Loss
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
              Complete 2026 Guide: Reduce PDF file size by up to 90% while maintaining document quality for email, web, and storage.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
              <div className="flex items-center">
                <CalendarDays className="w-5 h-5 mr-2" aria-hidden="true" />
                <time dateTime="2026-01-17" className="font-medium">January 17, 2026</time>
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
                <span className="font-medium">Free Methods Included</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div
            className="relative rounded-2xl overflow-hidden mb-12 h-[420px]"
            role="img"
            aria-label="PDF compression illustration showing file size reduction"
          >
            {/* Background Image */}
            <Image
              src="/images/choose-method.png"
              alt="PDF compression process illustration showing file size reduction"
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
                  Reduce PDF Size While Preserving Quality
                </h2>

                <p className="text-gray-200 mb-6">
                  Intelligent compression techniques to shrink PDF files for email, web, and storage without compromising document integrity.
                </p>

                <div className="flex items-center space-x-3">
                  <div className="px-4 py-2 bg-white/20 rounded-lg flex items-center">
                    <HardDrive className="w-5 h-5 mr-2" />
                    <span>Large PDF</span>
                  </div>

                  <ArrowRight className="w-6 h-6" />

                  <div className="px-4 py-2 bg-white/20 rounded-lg flex items-center">
                    <FileMinus className="w-5 h-5 mr-2" />
                    <span>Compressed PDF</span>
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
                    <BookOpen className="w-5 h-5 mr-2 text-green-500" aria-hidden="true" />
                    Table of Contents
                  </h3>
                  <ol className="space-y-2">
                    {[
                      "Introduction to PDF Compression",
                      "Why Compress PDF Files?",
                      "Method 1: Online Compressors",
                      "Method 2: Desktop Software",
                      "Method 3: Mobile Apps",
                      "Step-by-Step Compression Guide",
                      "Quality Preservation Techniques",
                      "Security Considerations",
                      "Frequently Asked Questions",
                      "Conclusion & Recommendations"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-green-600 dark:text-green-400 font-medium mr-2">{index + 1}.</span>
                        <a 
                          href={`#section-${index + 1}`}
                          className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
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
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Introduction to PDF Compression</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    PDF compression is essential in today's digital workflow where file size impacts email delivery, storage costs, and user experience. Modern compression techniques allow you to reduce PDF file size by up to 90% while maintaining visual quality and document integrity.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    This comprehensive 2026 guide covers intelligent compression methods that analyze document content to apply optimal compression without noticeable quality loss. Whether you're sending documents via email, uploading to websites, or optimizing cloud storage, this guide has you covered.
                  </p>
                </div>
              </section>

              {/* Why Compress Section */}
              <section id="section-2" className="scroll-mt-20 mb-12">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mr-4">
                    <Lightbulb className="w-6 h-6 text-green-600 dark:text-green-400" aria-hidden="true" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Compress PDF Files?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {useCases.map((useCase, index) => (
                    <div 
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{useCase.title}</h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{useCase.description}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800/30">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Zap className="w-5 h-5 text-green-500 mr-3" />
                    Key Benefits
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">Faster email delivery and attachment</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">Reduced cloud storage costs</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">Improved website loading speed</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">Easier mobile sharing and access</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Compression Methods */}
              <section id="section-3" className="scroll-mt-20 mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Compression Methods Comparison</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {compressionMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <div 
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex items-center mb-4">
                          <div className="p-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg mr-4">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{method.title}</h3>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">COMPRESSION RATIO</h4>
                            <span className="text-lg font-bold text-green-600 dark:text-green-400">{method.compressionRatio}</span>
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

              {/* Step-by-Step Guide */}
              <section id="section-4" className="scroll-mt-20 mb-12">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mr-4">
                    <Zap className="w-6 h-6 text-green-600 dark:text-green-400" aria-hidden="true" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Step-by-Step Compression Guide</h2>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" aria-hidden="true" />
                        <span className="font-semibold text-gray-900 dark:text-white">Time Required</span>
                      </div>
                      <p className="text-lg font-bold text-green-700 dark:text-green-300">2-5 minutes</p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" aria-hidden="true" />
                        <span className="font-semibold text-gray-900 dark:text-white">Difficulty Level</span>
                      </div>
                      <p className="text-lg font-bold text-blue-700 dark:text-blue-300">Beginner Friendly</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <HardDrive className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" aria-hidden="true" />
                        <span className="font-semibold text-gray-900 dark:text-white">Average Reduction</span>
                      </div>
                      <p className="text-lg font-bold text-purple-700 dark:text-purple-300">70-90%</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {[
                      {
                        step: 1,
                        title: "Analyze PDF Content",
                        description: "Determine if your PDF is text-heavy, image-heavy, or scanned. Different content types require different compression strategies for optimal results."
                      },
                      {
                        step: 2,
                        title: "Select Compression Tool",
                        description: "Choose between online compressors (quick results), desktop software (advanced features), or mobile apps (convenience) based on your needs."
                      },
                      {
                        step: 3,
                        title: "Configure Compression Settings",
                        description: "Adjust image resolution (72-300 DPI), compression level (low/medium/high), and other optimization parameters specific to your document type."
                      },
                      {
                        step: 4,
                        title: "Preview & Compare Quality",
                        description: "Always preview the compressed version side-by-side with original. Zoom in to check text clarity and image detail preservation."
                      },
                      {
                        step: 5,
                        title: "Save & Verify Results",
                        description: "Save compressed file with clear naming convention. Verify file size reduction and ensure document remains fully functional."
                      }
                    ].map((step) => (
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
              </section>

              {/* Compression Techniques */}
              <section id="section-5" className="scroll-mt-20 mb-12">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-800/30">
                  <div className="flex items-center mb-6">
                    <Settings className="w-8 h-8 text-amber-600 dark:text-amber-400 mr-4" aria-hidden="true" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Advanced Compression Techniques</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {compressionTechniques.map((technique, index) => (
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
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{technique}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Quality Preservation */}
              <section id="section-6" className="scroll-mt-20 mb-12">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800/30">
                  <div className="flex items-center mb-6">
                    <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-4" aria-hidden="true" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Quality Preservation Tips</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {qualityPreservationTips.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="flex items-start">
                          <Icon className="w-6 h-6 text-blue-500 mr-4 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">{feature.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="bg-white/50 dark:bg-gray-800/50 p-5 rounded-lg">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">Quality Checklist</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span>Text remains crisp and readable at 100% zoom</span>
                      </li>
                      <li className="flex items-center text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span>Images maintain color accuracy and detail</span>
                      </li>
                      <li className="flex items-center text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span>Document formatting remains intact</span>
                      </li>
                      <li className="flex items-center text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span>Interactive elements (links, forms) still functional</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section id="section-7" className="scroll-mt-20 mb-12">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mr-4">
                    <HelpCircle className="w-6 h-6 text-green-600 dark:text-green-400" aria-hidden="true" />
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
                        <HelpCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" aria-hidden="true" />
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
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Optimization Guides</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-3">
                      <FileImage className="w-5 h-5 text-blue-500 mr-2" />
                      <h4 className="font-bold text-gray-900 dark:text-white">PDF to JPG Guide</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Learn how to convert PDF files to high-quality JPG images for web and print use.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-3">
                      <Layers className="w-5 h-5 text-green-500 mr-2" />
                      <h4 className="font-bold text-gray-900 dark:text-white">PDF Merge & Split Guide</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Advanced techniques for combining and splitting PDF documents efficiently.
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
                    <Sparkles className="w-5 h-5 mr-2 text-green-500" aria-hidden="true" />
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
                      <span className="font-semibold text-gray-900 dark:text-white">Jan 2026</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 dark:text-gray-400">Avg. Size Reduction</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">70-90%</span>
                    </div>
                  </div>
                </div>

                {/* Recommended Tools */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                    Recommended Tools by PDFSwift
                  </h4>

                  <div className="space-y-4">
                    {/* PDF Compressor */}
                    <a
                      href="/compress-pdf"
                      className="block p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg border border-green-200 dark:border-green-800/30 hover:shadow-md transition"
                      aria-label="PDF Compressor by PDFSwift"
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          PDF Compressor
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Reduce PDF file size without quality loss using intelligent compression algorithms.
                      </p>

                      <div className="flex items-center text-xs text-gray-500">
                        <MinusCircle className="w-3 h-3 mr-1" />
                        <span>Free • Secure • High Quality</span>
                      </div>
                    </a>

                    {/* PDF to JPG */}
                    <a
                      href="/pdf-to-jpg"
                      className="block p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30 hover:shadow-md transition"
                      aria-label="PDF to JPG Converter by PDFSwift"
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          PDF to JPG Converter
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Convert PDF pages to high-quality JPG images with customizable resolution.
                      </p>

                      <div className="flex items-center text-xs text-gray-500">
                        <FileImage className="w-3 h-3 mr-1" />
                        <span>Fast • High Resolution</span>
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
                        <Monitor className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm">Desktop</span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
                        Best Features
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="flex items-center">
                        <Smartphone className="w-4 h-4 text-blue-500 mr-2" />
                        <span className="text-sm">Mobile</span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
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
                <div className="bg-gradient-to-br from-green-600 to-teal-700 rounded-xl p-6 text-white">
                  <h4 className="font-bold mb-4 text-lg">Ready to Compress?</h4>
                  <p className="text-green-100 mb-6 text-sm">
                    Start reducing your PDF file sizes today with our intelligent compression tools that preserve quality.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" aria-hidden="true" />
                      <span className="text-sm">No quality loss guaranteed</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" aria-hidden="true" />
                      <span className="text-sm">Bank-level security</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" aria-hidden="true" />
                      <span className="text-sm">Batch processing support</span>
                    </li>
                  </ul>

                  {/* Link to Compress PDF page */}
                  <Link href="/compress-pdf" passHref>
                    <button 
                      className="w-full bg-white text-green-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
                      aria-label="Start compressing PDF files now"
                    >
                      <MinusCircle className="w-5 h-5 mr-2" />
                      Compress PDF Now
                    </button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}