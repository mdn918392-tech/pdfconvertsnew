import Link from "next/link";
import BlogToolsSection from "@/app/components/BlogToolsSection";
import {
  CalendarDays,
  Clock,
  CheckCircle,
  ChevronRight,
  HelpCircle,
  Shield,
  Scissors,
  Printer,
  Zap
} from "lucide-react";

export const metadata = {
  title: "How to Extract Only Odd or Even Pages from PDF (2026 Guide) | PDFSwift",
  description: "Learn how to extract odd or even pages from PDF files using PDFSwift. Free online tool for double-sided printing, document organization, and more. No upload, 100% private.",
  keywords: "extract odd pages from pdf, extract even pages from pdf, split pdf odd even, separate odd even pages pdf, pdf odd even splitter, double-sided printing pdf",
  openGraph: {
    type: "article",
    url: "https://www.pdfswift.online/blog/extract-odd-even-pages-from-pdf-2026",
    title: "How to Extract Only Odd or Even Pages from PDF (2026 Guide) | PDFSwift",
    description: "Learn how to extract odd or even pages from PDF files using PDFSwift. Free online tool, no upload, 100% private.",
    siteName: "PDFSwift",
    locale: "en_US",
    publishedTime: "2026-02-28T08:00:00+00:00",
    authors: ["PDFSwift Team"],
    tags: ["pdf odd pages", "pdf even pages", "extract pages", "2026 guide"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Extract Only Odd or Even Pages from PDF (2026 Guide) | PDFSwift",
    description: "Learn how to extract odd or even pages from PDF files using PDFSwift. Free online tool, no upload, 100% private.",
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
    canonical: "/blog/extract-odd-even-pages-from-pdf-2026",
  },
  category: "PDF Guide",
  other: {
    "article:published_time": "2026-02-28T08:00:00+00:00",
    "article:modified_time": "2026-02-28T08:00:00+00:00",
    "article:section": "PDF Guide",
    "article:tag": ["extract odd pages", "extract even pages", "pdf splitting"],
  },
};

export default function ExtractOddEvenPages() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://www.pdfswift.online/blog/extract-odd-even-pages-from-pdf-2026#article",
        headline: "How to Extract Only Odd or Even Pages from PDF (2026 Guide) | PDFSwift",
        description: "Learn how to extract odd or even pages from PDF files using PDFSwift. Free online tool, no upload, 100% private.",
        datePublished: "2026-02-28T08:00:00+00:00",
        dateModified: "2026-02-28T08:00:00+00:00",
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
          "@id": "https://www.pdfswift.online/blog/extract-odd-even-pages-from-pdf-2026",
        },
        wordCount: 1000,
        timeRequired: "PT6M",
        articleSection: "PDF Guide",
        articleBody: `Complete guide to extracting odd or even pages from PDF files using PDFSwift. Covers use cases, step-by-step instructions, and privacy benefits.`,
        keywords: "extract odd pages from pdf, extract even pages from pdf, split pdf odd even",
        thumbnailUrl: "https://www.pdfswift.online/images/extract-odd-even-pages-guide.png",
        image: {
          "@type": "ImageObject",
          url: "https://www.pdfswift.online/images/extract-odd-even-pages-guide.png",
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.pdfswift.online/blog/extract-odd-even-pages-from-pdf-2026#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Can I extract only odd or even pages from a PDF for free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, completely free with PDFSwift. Our online tool lets you split PDFs by odd and even pages at no cost. No signup, no hidden charges.",
            },
          },
          {
            "@type": "Question",
            name: "Why would I need to separate odd and even pages?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The most common reason is double-sided printing – print odd pages first, then flip the paper and print even pages on the back. It's also useful when scanning double-sided documents or removing blank back pages.",
            },
          },
          {
            "@type": "Question",
            name: "Is it safe to upload my PDF to PDFSwift?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "PDFSwift processes files locally in your browser – they never leave your device. No upload, no servers, 100% private. Your sensitive documents stay with you.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.pdfswift.online/blog/extract-odd-even-pages-from-pdf-2026#breadcrumb",
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
            name: "Extract Odd/Even Pages",
            item: "https://www.pdfswift.online/blog/extract-odd-even-pages-from-pdf-2026",
          },
        ],
      },
    ],
  };

  const useCases = [
    {
      scenario: "Double-sided printing",
      explanation: "Print odd pages first, reload paper, then print even pages on the back"
    },
    {
      scenario: "Scanning duplex documents",
      explanation: "When you scan both sides and need to separate front from back"
    },
    {
      scenario: "Document reorganization",
      explanation: "Split a merged file into two separate documents based on page parity"
    },
    {
      scenario: "Creating booklets",
      explanation: "Prepare pages for booklet printing that requires odd/even separation"
    },
    {
      scenario: "Removing blank back pages",
      explanation: "Extract only the odd pages that contain content, discard blank evens"
    }
  ];

 const methods = [
  {
    tool: "PDFSwift",
    type: "Online (Browser-based)",
    features: "✓ 100% free ✓ No upload - files stay in browser ✓ Privacy-first ✓ No signup ✓ Works on all devices",
    steps: [
      "Open PDFSwift Split Tool",
      "Upload or drag your PDF (stays in browser)",
      "Select 'Split by Odd & Even Pages'",
      "Click 'Split PDF'",
      "Download both files instantly"
    ]
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
                  Extract Odd/Even Pages
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
                    PDF Extraction
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                    February 28, 2026
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                    PDFSwift Tool
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                  How to Extract Only Odd or Even Pages from PDF
                  <br />
                  <span className="text-2xl md:text-3xl lg:text-4xl text-blue-600">
                    (2026 Guide) - PDFSwift
                  </span>
                </h1>

                {/* Date and Reading Time */}
                <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-4">
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 mr-2 text-gray-500" />
                    <time dateTime="2026-02-28">February 28, 2026</time>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gray-500" />
                    <span>5 minute read</span>
                  </div>
                </div>

                {/* Introduction */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-100 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                  <div className="flex items-start">
                    <Scissors className="w-7 h-7 text-blue-600 mr-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-800 font-bold text-lg mb-3">
                        Need to print double-sided? Or maybe you scanned a book and want to separate front from back?
                      </p>
                      <p className="text-gray-700">
                        With <span className="font-bold text-blue-600">PDFSwift</span>, extracting only odd or even pages from a PDF is completely free and takes just seconds. Whether you need pages 1,3,5... or 2,4,6..., our tool does it instantly - right in your browser with no upload required.
                      </p>
                    </div>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div className="space-y-10">
                {/* Quick Steps - PDFSwift Focused */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    ⚡ Quick Steps: Extract Odd or Even Pages with PDFSwift
                  </h2>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">1</div>
                        <div>
                          <span className="text-gray-700">Go to <span className="font-bold text-blue-600">PDFSwift Split Tool</span> (no signup needed)</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">2</div>
                        <div>
                          <span className="text-gray-700">Upload your PDF file (drag & drop or click to select) - <span className="font-semibold">file stays in your browser</span></span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">3</div>
                        <div>
                          <span className="text-gray-700">Select the split mode: <span className="font-bold">"Split by Odd & Even Pages"</span></span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">4</div>
                        <div>
                          <span className="text-gray-700">Click <span className="font-bold">"Split PDF"</span> - takes 2-3 seconds</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">5</div>
                        <div>
                          <span className="text-gray-700">Download both files: <span className="font-mono bg-gray-100 px-2 py-1 rounded">odd_pages.pdf</span> and <span className="font-mono bg-gray-100 px-2 py-1 rounded">even_pages.pdf</span></span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-5 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <span className="font-bold">Total time:</span> Less than 1 minute. Completely free.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Why Extract Odd/Even Pages */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    📋 Why Would You Need to Extract Odd or Even Pages?
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {useCases.map((item, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl p-5 hover:border-blue-200 transition">
                        <h3 className="font-bold text-gray-900 mb-2 flex items-start">
                          <Printer className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          {item.scenario}
                        </h3>
                        <p className="text-sm text-gray-600 ml-7">{item.explanation}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Why Choose PDFSwift */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    ✨ Why Choose PDFSwift for Odd/Even Extraction?
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                      <Shield className="w-10 h-10 text-blue-600 mb-3" />
                      <h3 className="font-bold text-gray-900 mb-2">100% Private</h3>
                      <p className="text-sm text-gray-600">Files never leave your device. No upload, no servers, no tracking.</p>
                    </div>
                    
                    <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                      <Zap className="w-10 h-10 text-green-600 mb-3" />
                      <h3 className="font-bold text-gray-900 mb-2">Super Fast</h3>
                      <p className="text-sm text-gray-600">Processes instantly in your browser. No waiting for uploads/downloads.</p>
                    </div>
                    
                    <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                      <CheckCircle className="w-10 h-10 text-purple-600 mb-3" />
                      <h3 className="font-bold text-gray-900 mb-2">Completely Free</h3>
                      <p className="text-sm text-gray-600">No signup, no hidden charges, no daily limits. Free forever.</p>
                    </div>
                  </div>
                </section>

                {/* How It Works */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🔢 How Odd/Even Extraction Works in PDFSwift
                  </h2>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <p className="text-gray-700 mb-4">
                      PDFSwift examines each page number and creates two new files automatically:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-bold text-blue-700 mb-2">Odd Pages File</h3>
                        <p className="text-sm">Contains pages: <span className="font-mono bg-white px-2 py-1 rounded">1, 3, 5, 7, 9...</span></p>
                        <p className="text-xs text-gray-600 mt-2">Example: 10-page PDF → 5 pages (1,3,5,7,9)</p>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-bold text-green-700 mb-2">Even Pages File</h3>
                        <p className="text-sm">Contains pages: <span className="font-mono bg-white px-2 py-1 rounded">2, 4, 6, 8, 10...</span></p>
                        <p className="text-xs text-gray-600 mt-2">Example: 10-page PDF → 5 pages (2,4,6,8,10)</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm">
                        <span className="font-bold">Odd number of pages?</span> For a 7-page PDF, odds: 4 pages (1,3,5,7), evens: 3 pages (2,4,6). PDFSwift handles it automatically.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Privacy Section */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🔒 Privacy First: Your Files Never Leave Your Device
                  </h2>
                  
                  <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
                    <div className="flex items-start">
                      <Shield className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <p className="text-gray-700 mb-3">
                          Unlike other online PDF tools that upload your documents to their servers, PDFSwift works differently:
                        </p>
                        
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm"><span className="font-bold">No upload:</span> Your PDF stays in your browser</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm"><span className="font-bold">Local processing:</span> All splitting happens on your device</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm"><span className="font-bold">No servers:</span> We never see your documents</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm"><span className="font-bold">Perfect for sensitive docs:</span> IDs, contracts, personal information</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Mobile Method */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    📱 Works on All Devices - iPhone, Android, iPad
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-blue-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-blue-700 mb-2">iPhone / iPad</h3>
                      <p className="text-sm text-gray-700">Open Safari, go to PDFSwift, upload from Files or Photos, split odd/even pages, download. No app needed.</p>
                    </div>
                    
                    <div className="border border-green-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-green-700 mb-2">Android</h3>
                      <p className="text-sm text-gray-700">Open Chrome, visit PDFSwift, select PDF from storage, split instantly, save files to your device.</p>
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
                        Can I extract only odd or even pages from a PDF for free?
                      </h3>
                      <p className="text-gray-700">
                        Yes, completely free with <span className="font-bold text-blue-600">PDFSwift</span>. No signup, no hidden charges, no daily limits. Upload your PDF, select odd/even split, and download both files instantly.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Why would I need to separate odd and even pages?
                      </h3>
                      <p className="text-gray-700">
                        The most common reason is double-sided printing – print odd pages first, then flip the paper and print even pages on the back. It's also useful when scanning double-sided documents, reorganizing files, or removing blank back pages from scanned documents.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        What happens if my PDF has an odd number of pages?
                      </h3>
                      <p className="text-gray-700">
                        PDFSwift handles this automatically. For a 7-page PDF, odd pages file will have 4 pages (1,3,5,7) and even pages file will have 3 pages (2,4,6). The content order is preserved perfectly.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Is it safe to upload my PDF to PDFSwift?
                      </h3>
                      <p className="text-gray-700">
                        <span className="font-bold">100% safe.</span> PDFSwift processes files locally in your browser – they never leave your device. No upload, no servers, no third-party access. Your sensitive documents stay with you.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Can I extract odd/even pages on my phone?
                      </h3>
                      <p className="text-gray-700">
                        Yes! PDFSwift works perfectly on all mobile browsers. Open Safari (iPhone) or Chrome (Android), visit our website, upload from your phone storage, and download the split files. No app installation needed.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        What's the file size limit?
                      </h3>
                      <p className="text-gray-700">
                        Since PDFSwift processes files locally in your browser, the limit depends on your device's memory. Most users can handle PDFs up to 100MB without issues. For extremely large files, we recommend using a desktop computer.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Can I merge odd and even pages back together after extracting?
                      </h3>
                      <p className="text-gray-700">
                        Yes! You can use PDFSwift's Merge tool to combine them back. Upload both files, arrange them in order (odd pages first, then even pages), and merge. For proper double-sided documents, use the "Alternate & Mix" feature.
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
                        <span><span className="font-bold">Extract odd pages</span> for front sides, double-sided printing</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Extract even pages</span> for back sides, reverse scanning</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">PDFSwift:</span> Free, private, no upload, works on all devices</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Takes 30 seconds</span> – faster than finding other tools</span>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>

              {/* CTA */}
              <div className="mt-12 pt-10 border-t border-gray-200">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Extract Odd or Even Pages Now - 100% Free
                  </h3>
                  <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                    No signup, no upload, no hidden costs. Your files stay private in your browser. Works on iPhone, Android, and desktop.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/extract-pages"
                      className="inline-flex items-center justify-center px-7 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300"
                    >
                      Try PDFSwift Free
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