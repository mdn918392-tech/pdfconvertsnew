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
  RotateCw,
  RotateCcw,
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
  Minimize2,
  Navigation,
  ArrowRightCircle,
  ArrowLeftCircle,
  Rotate3D,
  CornerUpRight,
  CornerUpLeft,
  RefreshCcw as RefreshCcwIcon,
  Edit, // Added Edit icon
  Combine // Added Combine icon
} from "lucide-react";

export const dynamic = "force-static";

// ✅ Fixed: Add metadata in separate export (for Next.js App Router)
export const metadata = {
  title: "How to Rotate PDF Pages Online: Complete 2026 Guide",
  description: "Learn how to rotate PDF pages online for free. Step-by-step guide covering all methods to rotate, flip, and adjust PDF page orientation on any device.",
  keywords: "rotate pdf pages, rotate pdf online, pdf page orientation, flip pdf pages, rotate pdf clockwise, rotate pdf counterclockwise, fix upside down pdf, pdf rotation tool, free pdf rotation, rotate pdf mobile, pdf editing online, adjust pdf orientation, pdf rotation 2026",
  
  // Open Graph / Facebook
  openGraph: {
    type: "article",
    url: "https://pdfswift.online/blog/how-to-rotate-pdf-pages",
    title: "How to Rotate PDF Pages Online: Complete 2026 Guide",
    description: "Complete guide to rotate PDF pages online for free. Fix upside-down pages, adjust orientation, and rotate multiple pages at once on any device.",
    images: [
      {
        url: "https://pdfswift.online/images/rotatepdf.png",
        width: 1200,
        height: 630,
        alt: "PDF Page Rotation Guide",
      },
    ],
    siteName: "PDFSwift",
    locale: "en_US",
    publishedTime: "2026-01-18T012:40:00+00:00",
    modifiedTime: "2026-01-18T12:40:00+00:00",
    authors: ["PDFSwift"],
    tags: ["PDF Editing", "Document Management", "Productivity"],
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
    canonical: "/blog/how-to-rotate-pdf-pages-online",
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

export default function RotatePDFGuide() {
  const rotationMethods = [
    {
      title: "Online PDF Rotators",
      icon: Globe,
      platforms: ["PC", "Mobile", "Tablet"],
      pros: ["No installation required", "Free to use", "Accessible anywhere", "User-friendly interface"],
      cons: ["Internet connection needed", "File size limitations", "Privacy considerations"],
      bestFor: "Quick fixes and occasional use"
    },
    {
      title: "Desktop PDF Software",
      icon: Laptop,
      platforms: ["Windows", "Mac", "Linux"],
      pros: ["Advanced rotation options", "Bulk page rotation", "Offline functionality", "Better security"],
      cons: ["Software installation", "Some software costs money", "Learning curve"],
      bestFor: "Professional editing & frequent use"
    },
    {
      title: "Mobile PDF Apps",
      icon: Smartphone,
      platforms: ["iOS", "Android"],
      pros: ["Portable editing", "Camera document scanning", "Quick sharing options", "Cloud integration"],
      cons: ["Smaller screen", "Limited advanced features", "Touch interface challenges"],
      bestFor: "On-the-go PDF corrections"
    }
  ];

  const rotationTips = [
    "Always rotate in 90-degree increments to maintain proper alignment",
    "Use clockwise rotation for right-side up correction",
    "Use counterclockwise rotation for left-side adjustments",
    "Preview changes before applying to all pages",
    "Save a copy before rotating to preserve original",
    "Check page numbering after rotation changes",
    "Consider document margins when rotating scanned pages"
  ];

  const useCases = [
    {
      title: "Scanned Document Correction",
      description: "Fix upside-down or sideways pages from scanned documents and books"
    },
    {
      title: "Mobile Document Scanning",
      description: "Correct orientation issues from mobile camera scans of documents"
    },
    {
      title: "Presentation Preparation",
      description: "Adjust page orientation for proper display in presentations and slideshows"
    },
    {
      title: "Archival Document Organization",
      description: "Standardize page orientation for digital archives and document management"
    },
    {
      title: "Print Preparation",
      description: "Ensure all pages have correct orientation before printing documents"
    }
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: "Secure SSL Encryption",
      description: "All file transfers use 256-bit SSL encryption"
    },
    {
      icon: ShieldCheck,
      title: "Automatic File Deletion",
      description: "Files automatically deleted from servers after 1 hour"
    },
    {
      icon: Cloud,
      title: "Secure Cloud Processing",
      description: "Files processed in ISO 27001 certified cloud servers"
    },
    {
      icon: AlertTriangle,
      title: "No Third-Party Access",
      description: "Your documents are never shared with third parties"
    }
  ];

  const blogData = data[0] || {};
  const { howto = {}, faq = [] } = blogData;

  const formatTime = (isoTime: string) => {
    if (!isoTime) return "7 minutes";
    return isoTime.replace('PT', '').replace('M', ' minutes');
  };

  // Comprehensive FAQ for PDF Rotation
  const comprehensiveFAQ = [
    {
      question: "Is rotating PDF pages online safe for confidential documents?",
      answer: "Yes, when using reputable online PDF rotators with HTTPS encryption and clear privacy policies. For highly sensitive documents, consider using desktop software or tools that offer end-to-end encryption and guarantee automatic file deletion after processing."
    },
    {
      question: "What's the difference between rotating and flipping PDF pages?",
      answer: "Rotation turns pages in 90-degree increments (clockwise/counterclockwise), while flipping creates mirror images (horizontal/vertical flip). Rotation maintains readability, while flipping reverses text direction."
    },
    {
      question: "Can I rotate specific pages instead of the entire PDF?",
      answer: "Yes, most quality PDF rotators allow selective page rotation. You can choose individual pages or page ranges to rotate while leaving other pages untouched, giving you complete control over your document's orientation."
    },
    {
      question: "Does rotating PDF pages affect text quality or formatting?",
      answer: "No, rotating PDF pages is a lossless operation. Text quality remains unchanged, and formatting is preserved. Rotation only changes the page orientation metadata, not the actual content quality."
    },
    {
      question: "How do I rotate PDF pages scanned from my phone?",
      answer: "Upload the scanned PDF to an online rotator, select the upside-down pages, rotate them 180 degrees (or 90/270 degrees for sideways pages), preview the changes, and download the corrected document."
    },
    {
      question: "Are there free online PDF rotators without watermarks?",
      answer: "Yes, many reputable tools offer free rotation without watermarks including PDFSwift, Smallpdf, ILovePDF, and Adobe Acrobat Online. Most free versions handle multiple pages and standard rotation angles without limitations."
    },
    {
      question: "Can I rotate password-protected PDF pages?",
      answer: "Most online tools cannot process password-protected PDFs. You'll need to use desktop software like Adobe Acrobat Pro that can unlock protected files with the correct password before rotating pages."
    },
    {
      question: "What rotation angles are typically available?",
      answer: "Standard rotation angles are 90° clockwise, 90° counterclockwise, and 180°. Some advanced tools offer custom rotation angles, but 90-degree increments are standard for maintaining proper document formatting."
    }
  ];

  // How-to Schema
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Rotate PDF Pages Online - Complete 2026 Guide",
    "description": "Step-by-step guide to rotate PDF pages online for free. Fix orientation issues, adjust page direction, and rotate multiple pages at once.",
    "totalTime": "PT3M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "supply": [
      {"@type": "HowToSupply", "name": "PDF file with pages needing rotation"},
      {"@type": "HowToSupply", "name": "Internet connection"},
      {"@type": "HowToSupply", "name": "Web browser"}
    ],
    "tool": [
      {"@type": "HowToTool", "name": "Computer or mobile device"},
      {"@type": "HowToTool", "name": "Online PDF rotator tool"},
      {"@type": "HowToTool", "name": "File manager for upload/download"}
    ],
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Select Online PDF Rotator",
        "text": "Choose a reputable online PDF rotation tool that's free, secure, and supports your file size requirements.",
       
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Upload Your PDF File",
        "text": "Click upload and select your PDF file, or drag and drop it directly into the rotator interface.",
        "image": "https://pdfswift.online/images/rotatepdf.png"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Select Pages & Rotation",
        "text": "Choose specific pages to rotate, select rotation direction (clockwise/counterclockwise), and set rotation angle.",
        "image": "https://pdfswift.online/images/rotatepdf.png"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Preview & Apply Rotation",
        "text": "Preview the changes in real-time, then apply the rotation to selected pages while preserving other pages.",
        "image": "https://pdfswift.online/images/rotatepdf.png"
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Download Corrected PDF",
        "text": "Download your rotated PDF file with all pages in correct orientation, ready for viewing or printing.",
        "image": "https://pdfswift.online/images/rotatepdf.png"
      }
    ]
  };

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Rotate PDF Pages Online: Complete 2026 Guide",
    "description": "Step-by-step guide to rotate PDF pages online for free. Learn how to fix upside-down pages, adjust orientation, and rotate multiple pages at once on any device.",
    "image": [
      "https://pdfswift.online/images/rotatepdf.png",
      
    ],


    "datePublished": "2026-01-18T12:40:00+00:00",
    "dateModified": "2026-01-18T12:40:00+00:00",
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
        "url": "https://pdfswift.online/favicon.ico",
        "width": 160,
        "height": 60
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://pdfswift.online/blog/how-to-rotate-pdf-pages"
    },
    "articleSection": "Productivity, Tutorials, Document Editing",
    "keywords": "rotate pdf pages, rotate pdf online, pdf page orientation, flip pdf pages, rotate pdf clockwise, rotate pdf counterclockwise, fix upside down pdf, pdf rotation tool",
    "wordCount": "1850",
    "timeRequired": "PT4M",
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
        "name": "PDF Rotation Guide",
        "item": "https://pdfswift.online/blog/how-to-rotate-pdf-pages"
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PDFSwift - PDF Tools & Editors",
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
              PDF Rotation Guide
            </li>
          </ol>
        </nav>

        {/* Header Section */}
        <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-8">
          <div className="text-center mb-8">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                <RotateCw className="w-4 h-4 mr-2" aria-hidden="true" />
                PDF Editing Guide
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium">
                <BarChart3 className="w-4 h-4 mr-2" aria-hidden="true" />
                Updated January 2026
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" aria-hidden="true" />
                1850+ Words
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              How to <span className="text-blue-600 dark:text-blue-400">Rotate PDF Pages</span> Online
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
              Complete 2026 Guide: Fix upside-down pages, adjust orientation, and rotate PDF documents on any device for free.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
              <div className="flex items-center">
                <CalendarDays className="w-5 h-5 mr-2" aria-hidden="true" />
                <time dateTime="2026-01-18" className="font-medium">January 18, 2026</time>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" aria-hidden="true" />
                <span className="font-medium">4 min read</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" aria-hidden="true" />
                <span className="font-medium">All Skill Levels</span>
              </div>
              <div className="flex items-center">
                <Download className="w-5 h-5 mr-2" aria-hidden="true" />
                <span className="font-medium">100% Free Tools</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}

          <div className="relative rounded-2xl overflow-hidden mb-16 bg-gray-100 aspect-[16/9]">
  <Image
    src="/images/rotatepdf.png" // cropped image
    alt="PDF Rotator Tool interface showing page rotation options"
    fill
    priority
    sizes="100vw"
    className="object-contain"
  />
</div>

        



        </header>

        {/* Main Content */}
        <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <article className="lg:w-2/3 article-content">
              {/* Table of Contents */}
              <nav aria-label="Article sections" className="mb-8">
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-6 shadow-lg border border-cyan-200 dark:border-cyan-800/30">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-cyan-500" aria-hidden="true" />
                    Table of Contents
                  </h3>
                  <ol className="space-y-2">
                    {[
                      "Introduction to PDF Page Rotation",
                      "Why Rotate PDF Pages?",
                      "Method 1: Online Rotation Tools",
                      "Method 2: Desktop Software",
                      "Method 3: Mobile Apps",
                      "Step-by-Step Rotation Guide",
                      "Best Practices & Tips",
                      "Security Considerations",
                      "Frequently Asked Questions",
                      "Conclusion & Recommendations"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-cyan-600 dark:text-cyan-400 font-medium mr-2">{index + 1}.</span>
                        <a 
                          href={`#section-${index + 1}`}
                          className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
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
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg mr-4">
                      <Rotate3D className="w-6 h-6 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Introduction to PDF Page Rotation</h2>
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    PDF page rotation is an essential editing skill for fixing orientation issues in digital documents. Whether you're dealing with scanned pages that came out upside-down, mobile scans with incorrect orientation, or documents needing presentation adjustments, knowing how to rotate PDF pages can save time and frustration.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    This comprehensive guide covers all methods for rotating PDF pages across platforms. We'll explore online tools, desktop applications, mobile apps, and provide expert tips for maintaining document quality and security.
                  </p>
                </div>
              </section>

              {/* Why Rotate Section */}
              <section id="section-2" className="scroll-mt-20 mb-12">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg mr-4">
                    <Lightbulb className="w-6 h-6 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Rotate PDF Pages?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {useCases.map((useCase, index) => (
                    <div 
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow hover:border-cyan-300 dark:hover:border-cyan-700"
                    >
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg mr-3">
                          <CheckCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{useCase.title}</h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{useCase.description}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-cyan-200 dark:border-cyan-800/30">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Zap className="w-5 h-5 text-cyan-500 mr-3" />
                    Key Benefits of PDF Rotation
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">Improved document readability</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">Professional document presentation</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">Correct scanning errors</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">Better printing results</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Rotation Methods */}
              <section id="section-3" className="scroll-mt-20 mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">PDF Rotation Methods Comparison</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {rotationMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <div 
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 dark:hover:border-cyan-700"
                      >
                        <div className="flex items-center mb-4">
                          <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg mr-4">
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
                  <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg mr-4">
                    <Zap className="w-6 h-6 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Step-by-Step Rotation Guide</h2>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mr-2" aria-hidden="true" />
                        <span className="font-semibold text-gray-900 dark:text-white">Time Required</span>
                      </div>
                      <p className="text-lg font-bold text-cyan-700 dark:text-cyan-300">1-3 minutes</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Cpu className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" aria-hidden="true" />
                        <span className="font-semibold text-gray-900 dark:text-white">Difficulty Level</span>
                      </div>
                      <p className="text-lg font-bold text-green-700 dark:text-green-300">Very Easy</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <HardDrive className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" aria-hidden="true" />
                        <span className="font-semibold text-gray-900 dark:text-white">Cost</span>
                      </div>
                      <p className="text-lg font-bold text-purple-700 dark:text-purple-300">Completely Free</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {[
                      {
                        step: 1,
                        title: "Choose Your Rotation Tool",
                        description: "Select an online PDF rotator, desktop software, or mobile app based on your needs and device."
                      },
                      {
                        step: 2,
                        title: "Upload PDF Document",
                        description: "Upload your PDF file to the rotation tool. Most tools support drag-and-drop for easy uploading."
                      },
                      {
                        step: 3,
                        title: "Select Pages & Direction",
                        description: "Choose specific pages to rotate, select rotation direction (clockwise/counterclockwise), and set angle."
                      },
                      {
                        step: 4,
                        title: "Preview Rotation",
                        description: "Preview the changes before applying. Most tools show a live preview of rotated pages."
                      },
                      {
                        step: 5,
                        title: "Apply & Download",
                        description: "Apply the rotation and download your corrected PDF with all pages in proper orientation."
                      }
                    ].map((step) => (
                      <div key={step.step} className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl mr-6">
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

              {/* Rotation Tips */}
              <section id="section-5" className="scroll-mt-20 mb-12">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-800/30">
                  <div className="flex items-center mb-6">
                    <CornerUpRight className="w-8 h-8 text-amber-600 dark:text-amber-400 mr-4" aria-hidden="true" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Best Rotation Practices & Tips</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {rotationTips.map((tip, index) => (
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
                        <span>Always check for HTTPS in the URL</span>
                      </li>
                      <li className="flex items-center text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span>Review privacy policy before uploading</span>
                      </li>
                      <li className="flex items-center text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span>Use desktop software for confidential documents</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section id="section-7" className="scroll-mt-20 mb-12">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg mr-4">
                    <HelpCircle className="w-6 h-6 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                  {comprehensiveFAQ.map((item, index) => (
                    <div 
                      key={index} 
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:border-cyan-300 dark:hover:border-cyan-700 transition-colors"
                      itemScope
                      itemProp="mainEntity"
                      itemType="https://schema.org/Question"
                    >
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center" itemProp="name">
                        <HelpCircle className="w-5 h-5 text-cyan-500 mr-3 flex-shrink-0" aria-hidden="true" />
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
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow hover:border-cyan-300 dark:hover:border-cyan-700">
                    <div className="flex items-center mb-3">
                      <Scissors className="w-5 h-5 text-cyan-500 mr-2" />
                      <h4 className="font-bold text-gray-900 dark:text-white">Split PDF Guide</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Learn how to split large PDF files into smaller documents or extract specific pages.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow hover:border-cyan-300 dark:hover:border-cyan-700">
                    <div className="flex items-center mb-3">
                      <Combine className="w-5 h-5 text-cyan-500 mr-2" />
                      <h4 className="font-bold text-gray-900 dark:text-white">Merge PDF Files</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Combine multiple PDF documents into one organized file with proper page order.
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
                    <Sparkles className="w-5 h-5 mr-2 text-cyan-500" aria-hidden="true" />
                    Quick Facts
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Guide Length</span>
                      <span className="font-semibold text-gray-900 dark:text-white">1850+ Words</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Reading Time</span>
                      <span className="font-semibold text-gray-900 dark:text-white">4 Minutes</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
                      <span className="font-semibold text-gray-900 dark:text-white">Jan 18, 2026</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Rotation Speed</span>
                      <span className="font-semibold text-gray-900 dark:text-white">Under 30 Seconds</span>
                    </div>
                  </div>
                </div>

                {/* Recommended Tools */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                    Recommended Tools by PDFSwift
                  </h4>

                  <div className="space-y-4">
                    {/* PDF Rotator */}
                    <a
                      href="/rotate-pdf"
                      className="block p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg border border-cyan-200 dark:border-cyan-800/30 hover:shadow-md transition hover:border-cyan-300 dark:hover:border-cyan-700"
                      aria-label="PDF Rotator by PDFSwift"
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          PDF Rotator Tool
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Rotate PDF pages clockwise, counterclockwise, or flip them for perfect orientation.
                      </p>

                      <div className="flex items-center text-xs text-gray-500">
                        <RotateCw className="w-3 h-3 mr-1" />
                        <span>Free • Fast • Secure</span>
                      </div>
                    </a>

                    {/* PDF Editor */}
                    <a
                      href="/remove-pages"
                      className="block p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800/30 hover:shadow-md transition"
                      aria-label="PDF Editor by PDFSwift"
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          PDF Editor Tool
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Edit text, images, and pages in your PDF documents with our advanced editor.
                      </p>

                      <div className="flex items-center text-xs text-gray-500">
                        <Edit className="w-3 h-3 mr-1" />
                        <span>Comprehensive • User-Friendly</span>
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
                        <Monitor className="w-4 h-4 text-cyan-500 mr-2" />
                        <span className="text-sm">Desktop Software</span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded">
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
                <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-xl p-6 text-white">
                  <h4 className="font-bold mb-4 text-lg">Ready to Rotate?</h4>
                  <p className="text-cyan-100 mb-6 text-sm">
                    Fix your PDF page orientation in seconds with our free, secure online rotation tool.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" aria-hidden="true" />
                      <span className="text-sm">No registration required</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" aria-hidden="true" />
                      <span className="text-sm">Multiple page selection</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" aria-hidden="true" />
                      <span className="text-sm">Instant processing</span>
                    </li>
                  </ul>

                  {/* Link to Rotate PDF page */}
                  <Link href="/rotate-pdf" passHref>
                    <button 
                      className="w-full bg-white text-cyan-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
                      aria-label="Start rotating PDF pages now"
                    >
                      <RotateCw className="w-5 h-5 mr-2" />
                      Rotate PDF Pages Now
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