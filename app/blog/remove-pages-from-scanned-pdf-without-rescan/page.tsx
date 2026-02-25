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
  Trash2,
  Scan,
  Eye
} from "lucide-react";

export const metadata = {
  title: "Remove Pages from Scanned PDF (Without Re-scan) – 2026 Guide | PDFSwift",
  description: "Remove unwanted or blank pages from scanned PDFs without rescanning. Step-by-step guide using free online tools and desktop software. Works on any device.",
  keywords: "remove pages from scanned pdf, delete blank pages from pdf, scanned pdf editor, remove unwanted pages from pdf, delete pdf pages free, clean up scanned pdf",
  openGraph: {
    type: "article",
    url: "https://www.pdfswift.online/blog/remove-pages-from-scanned-pdf-without-rescan",
    title: "Remove Pages from Scanned PDF (Without Re-scan) – 2026 Guide",
    description: "Remove unwanted or blank pages from scanned PDFs without rescanning. Step-by-step guide using free online tools and desktop software.",
    images: [
      {
        url: "https://www.pdfswift.online/images/remove-scanned-pdf-pages-guide.png",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "PDFSwift",
    locale: "en_US",
    publishedTime: "2026-02-25T08:00:00+00:00",
    authors: ["PDFSwift Team"],
    tags: ["scanned pdf", "remove pages", "blank pages", "pdf editing", "2026 guide"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Remove Pages from Scanned PDF (Without Re-scan) – 2026 Guide",
    description: "Remove unwanted or blank pages from scanned PDFs without rescanning.",
    images: ["https://www.pdfswift.online/images/remove-scanned-pdf-pages-guide.png"],
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
    canonical: "/blog/remove-pages-from-scanned-pdf-without-rescan",
  },
  category: "How-to Guide",
  other: {
    "article:published_time": "2026-02-25T08:00:00+00:00",
    "article:modified_time": "2026-02-25T08:00:00+00:00",
    "article:section": "How-to Guide",
    "article:tag": ["scanned pdf", "remove pages", "blank pages"],
  },
};

export default function RemoveScannedPDFPages() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://www.pdfswift.online/blog/remove-pages-from-scanned-pdf-without-rescan#article",
        headline: "Remove Pages from Scanned PDF (Without Re-scan) – 2026 Guide",
        description: "Remove unwanted or blank pages from scanned PDFs without rescanning. Step-by-step guide using free online tools and desktop software.",
        datePublished: "2026-02-25T08:00:00+00:00",
        dateModified: "2026-02-25T08:00:00+00:00",
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
          "@id": "https://www.pdfswift.online/blog/remove-pages-from-scanned-pdf-without-rescan",
        },
        wordCount: 1000,
        timeRequired: "PT6M",
        articleSection: "How-to Guide",
        articleBody: `Complete guide to removing pages from scanned PDFs without rescanning. Covers online tools, desktop software, identifying blank pages, and troubleshooting.`,
        keywords: "remove pages from scanned pdf, delete blank pages from pdf, clean up scanned pdf",
        thumbnailUrl: "https://www.pdfswift.online/images/remove-scanned-pdf-pages-guide.png",
        image: {
          "@type": "ImageObject",
          url: "https://www.pdfswift.online/images/remove-scanned-pdf-pages-guide.png",
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.pdfswift.online/blog/remove-pages-from-scanned-pdf-without-rescan#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Can I remove pages from a scanned PDF without Adobe Acrobat?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, absolutely. You don't need Adobe Acrobat to delete pages from scanned PDFs. Free online tools like Smallpdf, PDF24, and PDFSwift let you remove pages directly in your browser. Desktop alternatives like Preview (Mac) or PDF24 Creator (Windows) work offline [citation:1][citation:3].",
            },
          },
          {
            "@type": "Question",
            name: "How do I identify blank pages in a scanned PDF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Upload your scanned PDF to any page removal tool – they show thumbnails of all pages. Blank pages appear as empty white squares. Click any thumbnail to see a larger preview – if nothing appears or only faint shadows/specks show, it's safe to delete [citation:1].",
            },
          },
          {
            "@type": "Question",
            name: "Will removing pages affect the quality of remaining pages?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Deleting pages doesn't compress or re-encode the remaining pages. The pages you keep stay at their original scan resolution and quality [citation:1][citation:6].",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.pdfswift.online/blog/remove-pages-from-scanned-pdf-without-rescan#breadcrumb",
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
            name: "Remove Scanned PDF Pages",
            item: "https://www.pdfswift.online/blog/remove-pages-from-scanned-pdf-without-rescan",
          },
        ],
      },
    ],
  };

  const scannedPDFIssues = [
    {
      issue: "Blank pages from scanner misfeed",
      explanation: "Scanners sometimes add blank pages when sheets feed unevenly or multiple sheets are pulled at once [citation:1].",
      fix: "Delete blank pages using thumbnail view – they're easy to spot"
    },
    {
      issue: "Duplicate pages",
      explanation: "Scanner may capture the same page twice if paper sticks or during batch scanning [citation:7].",
      fix: "Compare thumbnails, select duplicates, and delete"
    },
    {
      issue: "Extra pages from double-sided scanning",
      explanation: "When scanning double-sided documents, you might get extra blank reverse pages [citation:1].",
      fix: "Remove the unwanted reverse pages"
    },
    {
      issue: "Cover pages or dividers",
      explanation: "Scanned documents often include unnecessary title pages or section dividers [citation:3].",
      fix: "Delete them individually or by range"
    },
    {
      issue: "Faint marks that look like content",
      explanation: "Some pages look blank but contain faint scans, shadows, or specks that scanners detect as content [citation:1].",
      fix: "Preview at larger size – if only light texture, safe to delete"
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
                  Remove Scanned PDF Pages
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
                    Scanned PDF
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                    February 25, 2026
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                    No Re-scan Needed
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                  Remove Pages from Scanned PDF
                  <br />
                  <span className="text-2xl md:text-3xl lg:text-4xl text-blue-600">
                    (Without Re-scan) – 2026 Guide
                  </span>
                </h1>

                {/* Date and Reading Time */}
                <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-4">
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 mr-2 text-gray-500" />
                    <time dateTime="2026-02-25">February 25, 2026</time>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gray-500" />
                    <span>6 minute read</span>
                  </div>
                </div>

                {/* Introduction */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-100 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                  <div className="flex items-start">
                    <Scan className="w-7 h-7 text-blue-600 mr-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-800 font-bold text-lg mb-3">
                        Scanned a 20-page document but ended up with 25 pages – blank sheets, duplicates, and extra pages from the scanner.
                      </p>
                      <p className="text-gray-700">
                        Don't re-scan. You can remove those unwanted pages in seconds without Adobe Acrobat. Free online tools and desktop software let you delete pages from scanned PDFs while keeping original quality. Here's exactly how to clean up your scanned documents [citation:1][citation:3].
                      </p>
                    </div>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div className="space-y-10">
                {/* Why Scanned PDFs Have Extra Pages */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Why Scanned PDFs Have Extra Pages
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {scannedPDFIssues.map((item, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl p-5 hover:border-blue-200 transition">
                        <div className="flex items-start">
                          <AlertCircle className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <h3 className="font-bold text-gray-900 mb-1">{item.issue}</h3>
                            <p className="text-sm text-gray-600 mb-2">{item.explanation}</p>
                            <p className="text-sm text-green-600"><span className="font-semibold">Fix:</span> {item.fix}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Step-by-Step Guide */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Step-by-Step: Remove Pages from Scanned PDF
                  </h2>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="space-y-5">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">1</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Choose a page removal tool</h3>
                          <p className="text-gray-700">Use Smallpdf Delete Pages, PDF24, PDFSwift, or Adobe Acrobat online. All work in browser – no install [citation:1][citation:3].</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">2</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Upload your scanned PDF</h3>
                          <p className="text-gray-700">Drag and drop or click to select your file. Wait for thumbnails to load [citation:1].</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">3</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Spot unwanted pages</h3>
                          <p className="text-gray-700">Thumbnail view shows all pages. Blank pages appear empty. Click any thumbnail for larger preview to confirm [citation:1][citation:7].</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">4</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Delete pages</h3>
                          <p className="text-gray-700">Click trash icon on pages to remove. For multiple pages, hold Ctrl (Windows) or Cmd (Mac) while selecting [citation:1][citation:7].</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">5</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Apply changes</h3>
                          <p className="text-gray-700">Click "Apply Changes" or "Delete" to process. Takes a few seconds [citation:1].</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">6</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Download cleaned PDF</h3>
                          <p className="text-gray-700">Save your new file. Original is untouched – tools add "pages-deleted" to filename as backup [citation:1].</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-5 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <span className="font-bold">Total time:</span> About 60 seconds for a 20-page scanned PDF.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Method 2: Preview on Mac (Offline) */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Method 2: Using Preview on Mac (Built-in, Free, Offline)
                  </h2>
                  
                  <div className="border border-green-200 rounded-xl p-6">
                    <p className="text-gray-700 mb-4">
                      If you have a Mac, Preview can delete pages from scanned PDFs without any online tools. Works completely offline – best for sensitive documents [citation:6].
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold text-green-600">1</div>
                        <div>
                          <span className="text-gray-700">Open your scanned PDF in Preview.</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold text-green-600">2</div>
                        <div>
                          <span className="text-gray-700">Click View → Thumbnails (or Shift+Cmd+D) to see all pages.</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold text-green-600">3</div>
                        <div>
                          <span className="text-gray-700">Select the page(s) you want to delete. Click once, or Cmd+click for multiple.</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold text-green-600">4</div>
                        <div>
                          <span className="text-gray-700">Press Delete key. Or right-click → Delete.</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold text-green-600">5</div>
                        <div>
                          <span className="text-gray-700">File → Save to keep changes (or Save As to keep original).</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-yellow-50 p-3 rounded-lg">
                      <p className="text-xs text-yellow-700">
                        <span className="font-bold">Note:</span> Preview saves changes to the original file. Use "Save As" if you want to keep the original scan.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Method 3: Print to PDF Trick */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Method 3: Print to PDF (Windows & Mac)
                  </h2>
                  
                  <div className="border border-purple-200 rounded-xl p-6">
                    <p className="text-gray-700 mb-3">
                      No special tools? Use "Print to PDF" to keep only the pages you want [citation:1].
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Open your scanned PDF in any browser or PDF reader</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Press Ctrl+P (Windows) or Cmd+P (Mac) for Print dialog</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Select "Save as PDF" or "Microsoft Print to PDF" as printer</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Enter page range to keep (e.g., "1-3,5-8" to skip page 4) [citation:1]</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">Click "Print" or "Save" – new PDF contains only selected pages</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-blue-700">
                        <span className="font-bold">Works for:</span> Quick fixes when you don't need to see thumbnails. Just specify which pages to keep.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Desktop Software Option */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Method 4: Free Desktop Software (Windows)
                  </h2>
                  
                  <div className="border border-gray-200 rounded-xl p-6">
                    <p className="text-gray-700 mb-3">
                      For offline editing on Windows, free tools like PDF24 Creator and PDFgear work great [citation:3].
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-bold text-gray-800 mb-2">PDF24 Creator</h3>
                        <p className="text-xs text-gray-600">Free desktop tool. Open PDF, select pages in thumbnail view, delete, save. Works offline [citation:3].</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-bold text-gray-800 mb-2">PDFgear</h3>
                        <p className="text-xs text-gray-600">Modern PDF editor for Windows and Mac. Delete pages, edit, merge – all free [citation:3].</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-sm text-gray-600">
                      <span className="font-bold">Why desktop?</span> Best for large files, sensitive documents, and frequent use. No upload required.
                    </div>
                  </div>
                </section>

                {/* Identifying Blank Pages */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🔍 How to Identify Blank Pages in Scanned PDFs
                  </h2>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Eye className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-semibold">Check thumbnails first</h3>
                          <p className="text-sm text-gray-600">Most tools show thumbnails – blank pages appear as empty white squares. Easy to spot [citation:1].</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Eye className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-semibold">Preview suspicious pages</h3>
                          <p className="text-sm text-gray-600">Click any thumbnail for larger view. Some pages have faint shadows or specks – if no visible text/images, safe to delete [citation:1].</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Eye className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-semibold">Zoom in to confirm</h3>
                          <p className="text-sm text-gray-600">Use zoom feature to check for faint marks. Scanners sometimes detect light shadows as content – but page is effectively blank [citation:7].</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Eye className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-semibold">Look for duplicates</h3>
                          <p className="text-sm text-gray-600">Identical thumbnails = duplicate pages. Compare side by side before deleting [citation:7].</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Privacy & Security */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🔒 Privacy & Security for Scanned Documents
                  </h2>
                  
                  <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
                    <div className="flex items-start">
                      <Shield className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <p className="text-gray-700 mb-3">
                          Scanned PDFs often contain sensitive info – IDs, contracts, personal documents.
                        </p>
                        
                        <h3 className="font-bold text-gray-900 mb-2">Online tools (safe options):</h3>
                        <ul className="space-y-2 mb-4">
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm">TLS encryption during upload [citation:1]</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm">Automatic file deletion after 1-2 hours [citation:1][citation:2]</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm">GDPR-compliant, ISO/IEC 27001 certified (Smallpdf) [citation:1]</span>
                          </li>
                        </ul>
                        
                        <h3 className="font-bold text-gray-900 mb-2">For maximum privacy:</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm">Use browser-based tools that process locally (files never leave your device)</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm">Use offline desktop software – Preview (Mac), PDF24 Creator (Windows) [citation:3][citation:6]</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm">For highly sensitive docs, avoid upload entirely [citation:3]</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Tool Recommendations */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🛠️ Best Free Tools to Remove Scanned PDF Pages
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-blue-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-blue-700 mb-1">Smallpdf Delete Pages</h3>
                      <p className="text-xs text-gray-500 mb-2">Online • Free (limited) • Secure</p>
                      <p className="text-sm text-gray-700">Thumbnail view, multi-select, trash icons. Files deleted after 1 hour. ISO certified [citation:1][citation:6].</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-gray-700 mb-1">PDF24 Tools</h3>
                      <p className="text-xs text-gray-500 mb-2">Online • Free • No limits</p>
                      <p className="text-sm text-gray-700">Delete pages, preview thumbnails. No daily limits. Also has desktop version [citation:2][citation:3].</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-gray-700 mb-1">PDF Candy</h3>
                      <p className="text-xs text-gray-500 mb-2">Online • Free • 2-hour storage</p>
                      <p className="text-sm text-gray-700">Delete selected pages, extract ranges. Files removed after 2 hours [citation:2].</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-gray-700 mb-1">Adobe Acrobat online</h3>
                      <p className="text-xs text-gray-500 mb-2">Online • Free with account</p>
                      <p className="text-sm text-gray-700">Adobe's official tool. Needs free account. Reliable for scanned docs.</p>
                    </div>
                    
                    <div className="border border-green-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-green-700 mb-1">Preview (Mac)</h3>
                      <p className="text-xs text-gray-500 mb-2">Built-in • Free • Offline</p>
                      <p className="text-sm text-gray-700">Completely offline. Best for privacy. Delete pages in Thumbnails view [citation:6].</p>
                    </div>
                    
                    <div className="border border-green-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-green-700 mb-1">PDF24 Creator (Windows)</h3>
                      <p className="text-xs text-gray-500 mb-2">Desktop • Free • Offline</p>
                      <p className="text-sm text-gray-700">Free desktop app. Works offline. No file size limits [citation:3].</p>
                    </div>
                  </div>
                </section>

                {/* Common Problems */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Common Problems and Fixes
                  </h2>
                  
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Can't select multiple pages</h3>
                      <p className="text-sm text-gray-600">Hold Ctrl (Windows) or Cmd (Mac) while clicking thumbnails. If shortcuts fail, click inside thumbnail area first, then try again [citation:1][citation:7].</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Page won't delete</h3>
                      <p className="text-sm text-gray-600">Wait for PDF to fully load – blurry thumbnails mean still processing. If problem persists, PDF may be password protected [citation:7].</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">PDF is password protected</h3>
                      <p className="text-sm text-gray-600">Enter password when prompted. Most tools will ask. If you don't have password, you can't edit [citation:1][citation:3].</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Blank page has faint marks – delete or keep?</h3>
                      <p className="text-sm text-gray-600">If preview shows only light shadows/specks with no readable content, it's safe to delete. Scanners sometimes detect faint marks as content [citation:1].</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">File too large to upload</h3>
                      <p className="text-sm text-gray-600">Compress PDF first using compression tool. Or use desktop software that works offline with no file limits [citation:1][citation:3].</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Accidentally deleted wrong page</h3>
                      <p className="text-sm text-gray-600">Most tools create new file – original remains untouched. Look for "pages-deleted" filename or re-upload original [citation:1].</p>
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
                        Can I remove pages from a scanned PDF without Adobe Acrobat?
                      </h3>
                      <p className="text-gray-700">
                        Yes, absolutely. You don't need Adobe Acrobat to delete pages from scanned PDFs. Free online tools like Smallpdf, PDF24, and PDFSwift let you remove pages directly in your browser. Desktop alternatives like Preview (Mac) or PDF24 Creator (Windows) work offline. No subscription needed [citation:1][citation:3][citation:6].
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        How do I identify blank pages in a scanned PDF?
                      </h3>
                      <p className="text-gray-700">
                        Upload your scanned PDF to any page removal tool – they show thumbnails of all pages. Blank pages appear as empty white squares. Click any thumbnail to see a larger preview – if nothing appears or only faint shadows/specks show, it's safe to delete. Some scanners leave faint marks that look like content, but if no visible text or images, delete it [citation:1][citation:7].
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Will removing pages affect the quality of remaining pages?
                      </h3>
                      <p className="text-gray-700">
                        No. Deleting pages doesn't compress or re-encode the remaining pages. The pages you keep stay at their original scan resolution and quality. Your cleaned PDF will be smaller (fewer pages) but each kept page remains identical to the original [citation:1][citation:6].
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Can I delete multiple pages at once from a scanned PDF?
                      </h3>
                      <p className="text-gray-700">
                        Yes. Most tools let you select multiple pages before deleting. Hold Ctrl (Windows) or Cmd (Mac) while clicking thumbnails to select several pages, then delete them all at once. Some tools also let you specify page ranges like '1-3,5,7-9' to keep or remove in bulk [citation:1][citation:7].
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Is it safe to upload scanned PDFs to online tools?
                      </h3>
                      <p className="text-gray-700">
                        Most reputable tools are safe – they use TLS encryption and automatically delete files after processing (usually 1-2 hours). Smallpdf, for example, is GDPR-compliant and ISO/IEC 27001 certified [citation:1]. For sensitive documents, use browser-based tools that process locally (files never leave your device) or desktop software like Preview (Mac) or PDF24 Creator (Windows) that work completely offline [citation:3][citation:6].
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Can I remove pages from a password-protected scanned PDF?
                      </h3>
                      <p className="text-gray-700">
                        Yes, but you need the password first. Most online tools will prompt for password when you upload a protected file. Once unlocked, you can delete pages normally. Alternatively, use a PDF unlocker tool first (requires password), then delete pages from the unprotected version [citation:1][citation:3].
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        How do I remove pages on my phone?
                      </h3>
                      <p className="text-gray-700">
                        Works on iPhone and Android. Open any online PDF tool in your mobile browser. Upload from phone storage, Google Drive, or Dropbox. Select pages to delete using thumbnails. Download cleaned PDF back to your phone. Takes about a minute – no app needed [citation:1][citation:6].
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
                        <span><span className="font-bold">Don't re-scan</span> – delete pages digitally in seconds</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Thumbnail view</span> makes blank pages and duplicates easy to spot [citation:1]</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Hold Ctrl/Cmd</span> to select and delete multiple pages at once [citation:7]</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Quality stays the same</span> – no compression when deleting pages [citation:6]</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">For sensitive docs</span> use offline tools (Preview, PDF24 Creator) [citation:3]</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Takes 60 seconds</span> – faster than finding the scanner</span>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>

              {/* CTA */}
              <div className="mt-12 pt-10 border-t border-gray-200">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Clean Up Your Scanned PDF Now
                  </h3>
                  <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                    Upload your scanned PDF. Remove blank pages, duplicates, and unwanted sheets. Free, no signup, works on any device. Files stay private.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/delete-pdf-pages"
                      className="inline-flex items-center justify-center px-7 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300"
                    >
                      Remove Pages Now
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