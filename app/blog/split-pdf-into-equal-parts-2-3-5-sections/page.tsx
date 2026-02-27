import Link from "next/link";
import BlogToolsSection from "@/app/components/BlogToolsSection";
import {
  CalendarDays,
  Clock,
  CheckCircle,
  ChevronRight,
  HelpCircle,
  AlertTriangle,
  AlertCircle,
  Globe,
  X,
  Lightbulb,
  Image,
  Shield,
  FileText,
  Smartphone,
  Download,
  Scissors,
  Layers,
  Settings,
  Zap,
  BookOpen
} from "lucide-react";

export const metadata = {
  title: "How to Split PDF into Equal Parts (2, 3, 5 Sections Easily) – 2026 Guide | PDFSwift",
  description: "Learn how to split a PDF into 2, 3, or 5 equal parts for free. Step-by-step guide using online tools, desktop software, and mobile methods. Perfect for distributing chapters, sections, or reports.",
  keywords: "split pdf into equal parts, split pdf into 2 parts, split pdf into 3 sections, split pdf into 5 files, divide pdf equally, pdf splitter equal parts",
  openGraph: {
    type: "article",
    url: "https://www.pdfswift.online/blog/split-pdf-into-equal-parts-2-3-5-sections",
    title: "How to Split PDF into Equal Parts (2, 3, 5 Sections Easily) – 2026 Guide",
    description: "Learn how to split a PDF into 2, 3, or 5 equal parts for free. Step-by-step guide with online tools and mobile methods.",
    images: [
      {
        url: "https://www.pdfswift.online/images/split-pdf-equal-parts-guide.png",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "PDFSwift",
    locale: "en_US",
    publishedTime: "2026-02-27T08:00:00+00:00",
    authors: ["PDFSwift Team"],
    tags: ["split pdf", "equal parts", "pdf sections", "2026 guide"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Split PDF into Equal Parts (2, 3, 5 Sections Easily) – 2026 Guide",
    description: "Learn how to split a PDF into 2, 3, or 5 equal parts for free. Step-by-step guide with online tools and mobile methods.",
    images: ["https://www.pdfswift.online/images/split-pdf-equal-parts-guide.png"],
  },
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
  authors: [{ name: "PDFSwift Team", url: "https://www.pdfswift.online" }],
  publisher: "PDFSwift",
  metadataBase: new URL("https://www.pdfswift.online"),
  alternates: {
    canonical: "/blog/split-pdf-into-equal-parts-2-3-5-sections",
  },
  category: "PDF Guide",
  other: {
    "article:published_time": "2026-02-27T08:00:00+00:00",
    "article:modified_time": "2026-02-27T08:00:00+00:00",
    "article:section": "PDF Guide",
    "article:tag": ["split pdf", "equal parts", "pdf sections"],
  },
};

export default function SplitPDFEqualParts() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://www.pdfswift.online/blog/split-pdf-into-equal-parts-2-3-5-sections#article",
        headline: "How to Split PDF into Equal Parts (2, 3, 5 Sections Easily) – 2026 Guide",
        description: "Learn how to split a PDF into 2, 3, or 5 equal parts for free. Step-by-step guide using online tools, desktop software, and mobile methods.",
        datePublished: "2026-02-27T08:00:00+00:00",
        dateModified: "2026-02-27T08:00:00+00:00",
        author: {
          "@type": "Organization",
          "@id": "https://www.pdfswift.online#organization",
          name: "PDFSwift",
          url: "https://www.pdfswift.online",
          logo: {
            "@type": "ImageObject",
            "@id": "https://www.pdfswift.online#logo",
            url: "https://www.pdfswift.online/logo.png",
            width: 300,
            height: 60,
          },
        },
        publisher: {
          "@id": "https://www.pdfswift.online#organization",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://www.pdfswift.online/blog/split-pdf-into-equal-parts-2-3-5-sections",
        },
        wordCount: 1100,
        timeRequired: "PT6M",
        articleSection: "PDF Guide",
        articleBody: `Complete guide to splitting PDFs into 2, 3, or 5 equal parts. Covers online tools, desktop software, mobile methods, and practical examples.`,
        keywords: "split pdf into equal parts, split pdf into 2 parts, split pdf into 3 sections",
        thumbnailUrl: "https://www.pdfswift.online/images/split-pdf-equal-parts-guide.png",
        image: {
          "@type": "ImageObject",
          url: "https://www.pdfswift.online/images/split-pdf-equal-parts-guide.png",
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.pdfswift.online/blog/split-pdf-into-equal-parts-2-3-5-sections#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "How do I split a PDF into 2 equal parts?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Upload your PDF to a splitter tool like PDFSwift. Choose 'Split by number of sections' and enter 2. The tool will divide the document into two halves.",
            },
          },
          {
            "@type": "Question",
            name: "Can I split a PDF into 3 equal parts for free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, completely free. Use online tools like PDFSwift, Aspose Splitter, or PDF Candy. Upload your file, select 'Split by number of sections' and enter 3.",
            },
          },
          {
            "@type": "Question",
            name: "What if my PDF doesn't split evenly?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most tools handle this automatically. They distribute pages as evenly as possible – the first files get one extra page if needed.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.pdfswift.online/blog/split-pdf-into-equal-parts-2-3-5-sections#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.pdfswift.online",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://www.pdfswift.online/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Split PDF into Equal Parts",
            item: "https://www.pdfswift.online/blog/split-pdf-into-equal-parts-2-3-5-sections",
          },
        ],
      },
    ],
  };

  const splitMethods = [
    {
      method: "Split by intervals (every N pages)",
      description: "Divide PDF into sections of equal page count (e.g., every 10 pages) [citation:1][citation:3]",
      bestFor: "Creating equal-sized chunks when you know how many pages per section",
      example: "30-page PDF, interval 10 → 3 files (10 pages each)"
    },
    {
      method: "Split by number of sections",
      description: "Split into a specific number of equal parts (2, 3, 5, etc.) [citation:6]",
      bestFor: "When you need exactly X sections regardless of page count",
      example: "25-page PDF, 5 sections → 5 files (5 pages each)"
    },
    {
      method: "Split by page ranges",
      description: "Custom ranges for uneven splits (e.g., 1-10, 11-20, 21-25) [citation:4][citation:7]",
      bestFor: "When sections need different page counts or you want specific grouping",
      example: "Pages 1-8 (Chapter 1), 9-15 (Chapter 2), 16-25 (Chapter 3)"
    },
    {
      method: "Split every page",
      description: "Each page becomes its own PDF file [citation:1][citation:4]",
      bestFor: "Extracting individual pages for separate use",
      example: "10-page PDF → 10 files"
    }
  ];

  const examples = [
    {
      scenario: "Split into 2 equal halves",
      totalPages: 20,
      method: "Split by number of sections: 2",
      result: "File 1: pages 1-10, File 2: pages 11-20"
    },
    {
      scenario: "Split into 3 equal parts",
      totalPages: 30,
      method: "Split by intervals: 10 pages",
      result: "File 1: pages 1-10, File 2: pages 11-20, File 3: pages 21-30"
    },
    {
      scenario: "Split into 5 equal parts (odd total)",
      totalPages: 27,
      method: "Split by number of sections: 5",
      result: "Files with 6,6,5,5,5 pages (distributed evenly) [citation:8]"
    },
    {
      scenario: "Split textbook into chapters",
      totalPages: 150,
      method: "Split by page ranges: 1-30, 31-60, 61-90, 91-120, 121-150",
      result: "5 files matching chapter boundaries"
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Breadcrumb Navigation */}
        <nav className="bg-white shadow-sm border-b" aria-label="Breadcrumb">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <ol className="flex items-center text-sm text-gray-600">
              <li className="flex items-center">
                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              </li>
              <li className="flex items-center">
                <Link href="/blog" className="hover:text-blue-600">
                  Blog
                </Link>
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              </li>
              <li aria-current="page">
                <span className="text-gray-900 font-semibold">
                  Split PDF into Equal Parts
                </span>
              </li>
            </ol>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <article className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8 lg:p-10">
              <header className="mb-10">
                {/* Category Badges */}
                <div className="flex flex-wrap gap-3 mb-5">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                    PDF Splitting
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                    February 27, 2026
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                    Equal Parts Guide
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                  How to Split PDF into Equal Parts
                  <br />
                  <span className="text-2xl md:text-3xl lg:text-4xl text-blue-600">
                    (2, 3, 5 Sections Easily) – 2026 Guide
                  </span>
                </h1>

                {/* Date and Reading Time */}
                <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-4">
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 mr-2 text-gray-500" />
                    <time dateTime="2026-02-27">February 27, 2026</time>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gray-500" />
                    <span>6 minute read</span>
                  </div>
                </div>

                {/* Introduction */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-100 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                  <div className="flex items-start">
                    <Scissors className="w-7 h-7 text-blue-600 mr-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-800 font-bold text-lg mb-3">
                        Need to split a textbook into 3 chapters? A report into 5 sections? A contract into 2 halves?
                      </p>
                      <p className="text-gray-700">
                        You don't need Adobe Acrobat or complicated software. Split any PDF into 2, 3, or 5 equal parts in seconds – free, online, and works on any device. Here's exactly how to do it with PDFSwift and other tools [citation:1][citation:2][citation:6].
                      </p>
                    </div>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div className="space-y-10">
                {/* Quick Steps */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    ⚡ Quick Steps: Split PDF into Equal Parts
                  </h2>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">1</div>
                        <div>
                          <span className="text-gray-700">Go to <span className="font-bold">PDFSwift Split PDF</span> tool (no signup, files stay in browser)</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">2</div>
                        <div>
                          <span className="text-gray-700">Upload your PDF file (drag & drop or click to select)</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">3</div>
                        <div>
                          <span className="text-gray-700">Choose <span className="font-bold">"Split by number of sections"</span> mode [citation:6]</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">4</div>
                        <div>
                          <span className="text-gray-700">For 2 equal parts: Enter <span className="font-bold">2</span></span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">5</div>
                        <div>
                          <span className="text-gray-700">For 3 equal parts: Enter <span className="font-bold">3</span></span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">6</div>
                        <div>
                          <span className="text-gray-700">For 5 equal parts: Enter <span className="font-bold">5</span></span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">7</div>
                        <div>
                          <span className="text-gray-700">Click "Split" and download your files as a ZIP archive</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-5 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <span className="font-bold">Total time:</span> About 1-2 minutes for most documents.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Split Methods Table */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    📊 PDF Splitting Methods Compared
                  </h2>
                  
                  <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Method</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Best For</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Example</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {splitMethods.map((method, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{method.method}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{method.description}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{method.bestFor}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{method.example}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Practical Examples */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    📋 Practical Examples: Split into Equal Parts
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {examples.map((example, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl p-5 hover:border-blue-200 transition">
                        <h3 className="font-bold text-gray-900 mb-2 flex items-start">
                          <BookOpen className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          {example.scenario}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">Total pages:</span> {example.totalPages}</p>
                        <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">Method:</span> {example.method}</p>
                        <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded mt-2">{example.result}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Method 1: Online Tools (Detailed) */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🌐 Method 1: Using Online PDF Splitters (Easiest)
                  </h2>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <p className="text-gray-700 mb-4">
                      Online tools work on any device – no installation required. Here's how to use them:
                    </p>
                    
                    <div className="space-y-5">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-green-600">1</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Choose your tool</h3>
                          <p className="text-sm text-gray-600">PDFSwift, Aspose Splitter, PDF Candy, or Soda PDF – all free [citation:1][citation:2][citation:4].</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-green-600">2</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Upload your PDF</h3>
                          <p className="text-sm text-gray-600">Drag and drop or click to select your file [citation:4].</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-green-600">3</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Select split mode</h3>
                          <p className="text-sm text-gray-600">Choose "Split by number of sections" or "Split by intervals" [citation:2][citation:6].</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-green-600">4</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Enter your number</h3>
                          <p className="text-sm text-gray-600">For 2 parts → enter 2. For 3 parts → enter 3. For 5 parts → enter 5 [citation:6].</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-green-600">5</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Split and download</h3>
                          <p className="text-sm text-gray-600">Click split, wait a few seconds, download ZIP with all files [citation:2][citation:8].</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-700">
                        <span className="font-bold">Pro tip:</span> PDFSwift processes files locally in your browser – they never leave your device. Other tools delete files after 24 hours [citation:2][citation:8].
                      </p>
                    </div>
                  </div>
                </section>

                {/* Method 2: Google Chrome (Free, No Software) */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🌐 Method 2: Using Google Chrome (Built-in, No Apps)
                  </h2>
                  
                  <div className="border border-yellow-200 rounded-xl p-6 bg-yellow-50">
                    <p className="text-gray-700 mb-3">
                      You can split PDFs using Chrome's Print to PDF feature – completely free and no extra software [citation:4].
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold text-yellow-700">1</div>
                        <div>
                          <span className="text-sm">Open your PDF in Chrome (drag and drop into Chrome window) [citation:4]</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold text-yellow-700">2</div>
                        <div>
                          <span className="text-sm">Click Print icon (or Ctrl+P / Cmd+P) [citation:4]</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold text-yellow-700">3</div>
                        <div>
                          <span className="text-sm">Under Destination, select "Save as PDF" [citation:4]</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold text-yellow-700">4</div>
                        <div>
                          <span className="text-sm">In Pages, select "Custom" and enter first range (e.g., 1-10 for first half) [citation:4]</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold text-yellow-700">5</div>
                        <div>
                          <span className="text-sm">Click Save, name your file, repeat for remaining ranges  [citation:4]</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-white p-3 rounded-lg">
                      <p className="text-xs">
                        <span className="font-bold">Note:</span> This method requires manual work for each part. For automatic splitting, use dedicated tools [citation:4].
                      </p>
                    </div>
                  </div>
                </section>

                {/* Method 3: Mobile Splitting */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    📱 Method 3: Split PDF on Mobile (iPhone & Android)
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-blue-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-blue-700 mb-2">iPhone (Online)</h3>
                      <p className="text-sm text-gray-700">Open PDFSwift in Safari, upload from Files or Photos, split into 2/3/5 parts, download ZIP. No app needed [citation:4].</p>
                      <p className="text-xs text-gray-500 mt-2">Alternative: Use iOS Print tool for manual splitting [citation:4]</p>
                    </div>
                    
                    <div className="border border-green-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-green-700 mb-2">Android (Online)</h3>
                      <p className="text-sm text-gray-700">Use PDFSwift in Chrome, upload from storage, split, download. Works on any Android browser [citation:4].</p>
                      <p className="text-xs text-gray-500 mt-2">Alternative: PDF Splitter apps from Play Store</p>
                    </div>
                  </div>
                </section>

                {/* Method 4: Desktop Software (Offline) */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    💻 Method 4: Desktop Software (For Large Files)
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="font-bold text-gray-900 mb-2">PDF Candy Desktop (Windows)</h3>
                      <p className="text-sm text-gray-600">Download free desktop app. Supports splitting by number of sections, intervals, or page ranges. Works offline, no file size limits [citation:4].</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="font-bold text-gray-900 mb-2">Preview (Mac)</h3>
                      <p className="text-sm text-gray-600">Built-in Mac app. Use Thumbnails view, select pages, drag to desktop to create new PDFs. Manual but works offline [citation:4].</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="font-bold text-gray-900 mb-2">Stirling-PDF (Self-hosted)</h3>
                      <p className="text-sm text-gray-600">Open source, locally hosted web app with 50+ PDF operations. Perfect for enterprises and privacy-conscious users [citation:9].</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="font-bold text-gray-900 mb-2">Soda PDF (Windows)</h3>
                      <p className="text-sm text-gray-600">Desktop app with split by interval, page range, or file size. Right-click integration for quick access [citation:3].</p>
                    </div>
                  </div>
                </section>

                {/* Split by Intervals Explained */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🔢 How "Split by Intervals" Works
                  </h2>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <p className="text-gray-700 mb-4">
                      "Split by intervals" (or "Split every N pages") divides your PDF into chunks of equal page count [citation:1][citation:3][citation:8].
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-bold text-gray-800 mb-2">Example 1: Every 5 pages</h3>
                        <p className="text-sm">25-page PDF → 5 files (5 pages each)</p>
                        <p className="text-xs text-gray-500 mt-1">File1: 1-5, File2: 6-10, File3: 11-15, File4: 16-20, File5: 21-25</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-bold text-gray-800 mb-2">Example 2: Every 10 pages</h3>
                        <p className="text-sm">32-page PDF → 4 files (10,10,10,2 pages)</p>
                        <p className="text-xs text-gray-500 mt-1">Last file contains remaining pages [citation:3][citation:8]</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm">
                        <span className="font-bold">For equal parts:</span> Calculate interval = total pages ÷ number of parts. Example: 30 pages ÷ 3 = 10 pages per file [citation:6].
                      </p>
                    </div>
                  </div>
                </section>

                {/* Split by Number of Sections Explained */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🔢 How "Split by Number of Sections" Works
                  </h2>
                  
                  <div className="border border-green-200 rounded-xl p-6 bg-green-50">
                    <p className="text-gray-700 mb-4">
                      This mode automatically calculates how many pages go into each file to create the exact number of sections you want [citation:6].
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm"><span className="font-bold">Even split:</span> 20 pages into 2 sections → 10 pages each</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm"><span className="font-bold">Uneven split:</span> 25 pages into 3 sections → 9, 8, 8 pages (distributed evenly) [citation:8]</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm"><span className="font-bold">Perfect for:</span> Creating chapter files without calculating page counts</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-white p-3 rounded-lg">
                      <p className="text-xs">
                        <span className="font-bold">Formula:</span> Pages per file = total pages ÷ number of sections (rounded). Extra pages go to first files [citation:8].
                      </p>
                    </div>
                  </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
                    <HelpCircle className="w-7 h-7 mr-3 text-purple-500" />
                    Questions People Actually Ask
                  </h2>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        How do I split a PDF into 2 equal parts?
                      </h3>
                      <p className="text-gray-700">
                        Upload your PDF to a splitter tool like PDFSwift. Choose 'Split by number of sections' and enter 2. The tool will divide the document into two halves. If the PDF has an odd number of pages, the first half gets one extra page (e.g., 13 pages → 7 and 6) [citation:6][citation:8]. For a 20-page PDF, you'll get File 1: pages 1-10, File 2: pages 11-20.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Can I split a PDF into 3 equal parts for free?
                      </h3>
                      <p className="text-gray-700">
                        Yes, completely free. Use online tools like PDFSwift, Aspose Splitter, or PDF Candy. Upload your file, select 'Split by number of sections' and enter 3. The tool automatically distributes pages into three files. For a 30-page PDF, you'll get three 10-page files. For a 25-page PDF, you'll get files with 9, 8, and 8 pages [citation:2][citation:6][citation:8].
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        What if my PDF doesn't split evenly (e.g., 25 pages into 3 parts)?
                      </h3>
                      <p className="text-gray-700">
                        Most tools handle this automatically. They distribute pages as evenly as possible – the first files get one extra page if needed. For 25 pages into 3 parts, you'll get files with 9, 8, and 8 pages. The content order is preserved, and no pages are lost. This is standard behavior for all major PDF splitters [citation:8].
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Can I split a PDF into 5 parts on my phone?
                      </h3>
                      <p className="text-gray-700">
                        Yes, works on iPhone and Android. Open PDFSwift in your mobile browser, upload from phone storage, choose split by number of sections (5), and download the ZIP file. No app needed. For iPhone, you can also use the Files app with built-in PDF tools or the Print method for manual splitting [citation:4].
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Is there a file size limit for splitting PDFs?
                      </h3>
                      <p className="text-gray-700">
                        Most free online tools accept up to 50-100MB per file [citation:4][citation:8]. For larger files, use desktop software like PDF Candy Desktop or Stirling-PDF which have no size limits. PDFSwift processes files locally in your browser, so very large files may be slower but still work [citation:9]. Some tools also offer premium plans for larger files.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Will splitting a PDF reduce quality?
                      </h3>
                      <p className="text-gray-700">
                        No, splitting does not compress or re-encode the content. Each split file maintains the exact quality and resolution of the original. Pages are simply copied into new files without any quality loss [citation:8]. This applies to all splitting methods – online tools, desktop software, and Chrome's Print to PDF.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Can I split a password-protected PDF?
                      </h3>
                      <p className="text-gray-700">
                        You need the password first. Most online tools will prompt for password when you upload a protected file. Enter the password, then split normally. If you don't have the password, you cannot edit or split the file [citation:8]. Some desktop tools like Stirling-PDF support password removal if you have the password [citation:9].
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        What's the difference between splitting and extracting?
                      </h3>
                      <p className="text-gray-700">
                        Splitting divides a PDF into multiple files, each containing a range of pages (e.g., 1-10, 11-20). Extracting creates a new PDF from specific pages while keeping the original intact. For equal parts, you want splitting. For pulling out specific chapters, you might want extraction [citation:6]. Most tools offer both options.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Quick Summary */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    What Actually Matters
                  </h2>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Split into 2 parts:</span> Use "Split by number of sections: 2" [citation:6]</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Split into 3 parts:</span> Use "Split by number of sections: 3" [citation:6]</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Split into 5 parts:</span> Use "Split by number of sections: 5" [citation:6]</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Uneven pages?</span> Tools distribute evenly – first files get extra pages [citation:8]</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">No quality loss</span> – splitting just copies pages [citation:8]</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Works on phone</span> – no app needed [citation:4]</span>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>

              {/* CTA */}
              <div className="mt-12 pt-10 border-t border-gray-200">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Split Your PDF into Equal Parts Now
                  </h3>
                  <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                    Upload your PDF. Split into 2, 3, or 5 equal sections in seconds. Free, no signup, works on any device. Files stay private – processed locally in your browser.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/split-pdf"
                      className="inline-flex items-center justify-center px-7 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300"
                    >
                      Split PDF Now
                    </Link>
                    <Link
                      href="/blog"
                      className="inline-flex items-center justify-center px-7 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10"
                    >
                      More PDF Guides
                    </Link>
                  </div>
                  <p className="mt-6 text-blue-200 text-sm">
                    Files stay in your browser • No uploads • Free forever
                  </p>
                </div>
              </div>
            </div>
          </article>
        </main>

        <BlogToolsSection />
      </div>
    </>
  );
}