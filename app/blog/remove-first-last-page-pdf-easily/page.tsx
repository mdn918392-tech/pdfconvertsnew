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
  Scissors,
  Layers,
  Trash2,
  Copy,
  Download
} from "lucide-react";

export const metadata = {
  title: "Remove First / Last Page from PDF Easily (2026 Guide) | PDFSwift",
  description: "Need to delete the first or last page from a PDF? Here's how to remove pages instantly without Adobe. Works on phone and computer. Free, no signup.",
  keywords: "remove first page from pdf, delete last page of pdf, remove pages from pdf, pdf page remover, delete pdf pages free, cut pdf pages",
  openGraph: {
    type: "article",
    url: "https://www.pdfswift.online/blog/remove-first-last-page-pdf-easily",
    title: "Remove First / Last Page from PDF Easily (2026 Guide)",
    description: "Need to delete the first or last page from a PDF? Here's how to remove pages instantly without Adobe. Works on phone and computer.",
    images: [
      {
        url: "https://www.pdfswift.online/images/remove-pdf-pages-guide.png",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "PDFSwift",
    locale: "en_US",
    publishedTime: "2026-02-22T08:00:00+00:00",
    authors: ["PDFSwift Team"],
    tags: ["remove pdf pages", "delete pdf pages", "pdf editing", "without adobe", "2026 guide"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Remove First / Last Page from PDF Easily (2026 Guide)",
    description: "Need to delete the first or last page from a PDF? Here's how to remove pages instantly without Adobe.",
    images: ["https://www.pdfswift.online/images/remove-pdf-pages-guide.png"],
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
    canonical: "/blog/remove-first-last-page-pdf-easily",
  },
  category: "How-to Guide",
  other: {
    "article:published_time": "2026-02-22T08:00:00+00:00",
    "article:modified_time": "2026-02-22T08:00:00+00:00",
    "article:section": "How-to Guide",
    "article:tag": ["remove pdf pages", "delete pdf pages", "pdf editing", "how-to guide"],
  },
};

export default function RemovePDFPages() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://www.pdfswift.online/blog/remove-first-last-page-pdf-easily#article",
        headline: "Remove First / Last Page from PDF Easily (2026 Guide)",
        description: "Need to delete the first or last page from a PDF? Here's how to remove pages instantly without Adobe. Works on phone and computer. Free, no signup.",
        datePublished: "2026-02-22T08:00:00+00:00",
        dateModified: "2026-02-22T08:00:00+00:00",
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
          "@id": "https://www.pdfswift.online/blog/remove-first-last-page-pdf-easily",
        },
        wordCount: 900,
        timeRequired: "PT6M",
        articleSection: "How-to Guide",
        articleBody: `Complete guide to removing first or last pages from PDFs without Adobe. Covers online tools, page range selection, privacy considerations, and step-by-step instructions for phone and computer.`,
        keywords: "remove first page from pdf, delete last page of pdf, remove pages from pdf, pdf page remover",
        thumbnailUrl: "https://www.pdfswift.online/images/remove-pdf-pages-guide.png",
        image: {
          "@type": "ImageObject",
          url: "https://www.pdfswift.online/images/remove-pdf-pages-guide.png",
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.pdfswift.online/blog/remove-first-last-page-pdf-easily#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Can I remove the first page of a PDF for free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, completely free. Tools like PDFSwift, iLovePDF, and Smallpdf let you delete pages without paying. No signup required. Just upload, select pages to keep, and download. Takes 30 seconds.",
            },
          },
          {
            "@type": "Question",
            name: "How do I delete the last page of a PDF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Upload your PDF to any page remover tool. You'll see thumbnails of all pages. Either click the last page and hit delete, or specify the page range to keep (e.g., keep pages 1-9 if your PDF has 10 pages). Download the result.",
            },
          },
          {
            "@type": "Question",
            name: "Will the page numbers stay correct after removing pages?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, the PDF renumbers automatically. If you remove page 1, the old page 2 becomes the new page 1. Page numbers in the document content (like headers) won't change – that's part of the PDF content itself. But the actual page order renumbers correctly.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.pdfswift.online/blog/remove-first-last-page-pdf-easily#breadcrumb",
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
            name: "Remove PDF Pages Guide",
            item: "https://www.pdfswift.online/blog/remove-first-last-page-pdf-easily",
          },
        ],
      },
    ],
  };

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
                  Remove PDF Pages
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
                    PDF Editing
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                    February 22, 2026
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                    No Adobe Needed
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                  Remove First / Last Page from PDF Easily
                  <br />
                  <span className="text-2xl md:text-3xl lg:text-4xl text-blue-600">
                    (2026 Step-by-Step Guide)
                  </span>
                </h1>

                <img
  src="/images/remove-pdf-pages-guide.png"
  alt="Remove first or last page from PDF guide"
  className="w-full rounded-xl mb-8"
/>

                {/* Date and Reading Time */}
                <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-4">
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 mr-2 text-gray-500" />
                    <time dateTime="2026-02-22">February 22, 2026</time>
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
                        Got a PDF with an extra cover page or blank last page that needs to go?
                      </p>
                      <p className="text-gray-700">
                        You don't need Adobe Acrobat or any expensive software. Whether it's removing the first page from a scanned document, deleting the last page from a report, or cutting out multiple pages from the middle – it's free, takes 30 seconds, and works on your phone. Here's exactly how to do it.
                      </p>
                    </div>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div className="space-y-10">
                {/* Why Remove Pages? */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Why Would You Need to Remove PDF Pages?
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                      <h3 className="font-bold text-gray-900 mb-1">Remove cover pages</h3>
                      <p className="text-sm text-gray-600">Scanned documents often have extra title pages you don't need.</p>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                      <h3 className="font-bold text-gray-900 mb-1">Delete blank last page</h3>
                      <p className="text-sm text-gray-600">Many PDFs end with an unnecessary blank page.</p>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                      <h3 className="font-bold text-gray-900 mb-1">Remove confidential info</h3>
                      <p className="text-sm text-gray-600">Delete pages with sensitive data before sharing.</p>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                      <h3 className="font-bold text-gray-900 mb-1">Extract specific sections</h3>
                      <p className="text-sm text-gray-600">Keep only the pages you need from a long document.</p>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                      <h3 className="font-bold text-gray-900 mb-1">Fix scanning errors</h3>
                      <p className="text-sm text-gray-600">Scanner added extra pages? Remove them in seconds.</p>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                      <h3 className="font-bold text-gray-900 mb-1">Reduce file size</h3>
                      <p className="text-sm text-gray-600">Removing pages makes the PDF smaller and faster to email.</p>
                    </div>
                  </div>
                </section>

                {/* Step-by-Step: Remove Pages */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Method 1: Using an Online PDF Page Remover (Easiest)
                  </h2>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <p className="text-gray-700 mb-4">
                      Works on any device. Phone, computer, tablet. No software installation needed.
                    </p>
                    
                    <div className="space-y-5">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">1</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Find a page remover tool</h3>
                          <p className="text-gray-700">Open PDFSwift, iLovePDF, Smallpdf, or any PDF page remover. No signup needed.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">2</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Upload your PDF</h3>
                          <p className="text-gray-700">Drag and drop or click to select your file. Wait for it to load (takes 2-3 seconds).</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">3</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Choose pages to keep (or remove)</h3>
                          <p className="text-gray-700">Most tools show thumbnails. Click pages to select, then hit delete. Or specify page ranges.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">4</div>
                        <div>
                          <h3 className="font-bold text-gray-900">For first page only</h3>
                          <p className="text-gray-700">Keep pages "2 to end". If your PDF has 10 pages, keep 2-10. First page is gone.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">5</div>
                        <div>
                          <h3 className="font-bold text-gray-900">For last page only</h3>
                          <p className="text-gray-700">Keep pages "1 to second-last". For 10 pages, keep 1-9. Last page deleted.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">6</div>
                        <div>
                          <h3 className="font-bold text-gray-900">For multiple pages</h3>
                          <p className="text-gray-700">Use ranges like "1-3,5,7-9" to keep specific pages. Everything else gets removed.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">7</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Download</h3>
                          <p className="text-gray-700">Click "Remove Pages" or "Apply". Download your new PDF. Done.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-5 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <span className="font-bold">Total time:</span> About 30-60 seconds.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Method 2: Mac Preview */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Method 2: Using Preview on Mac (Built-in, Free)
                  </h2>
                  
                  <div className="border border-green-200 rounded-xl p-6">
                    <p className="text-gray-700 mb-4">
                      If you have a Mac, Preview can remove pages without any online tools. Works completely offline.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold text-green-600">1</div>
                        <div>
                          <span className="text-gray-700">Open your PDF in Preview.</span>
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
                          <span className="text-gray-700">File → Save to keep your changes.</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-yellow-50 p-3 rounded-lg">
                      <p className="text-xs text-yellow-700">
                        <span className="font-bold">Note:</span> Preview saves changes to the original file. Use "Save As" if you want to keep the original.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Page Range Cheat Sheet */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    📄 Page Range Cheat Sheet
                  </h2>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">What you want</h3>
                        <ul className="space-y-2">
                          <li className="text-sm">Remove first page only</li>
                          <li className="text-sm">Remove last page only</li>
                          <li className="text-sm">Remove first 3 pages</li>
                          <li className="text-sm">Remove last 2 pages</li>
                          <li className="text-sm">Keep only pages 5-10</li>
                          <li className="text-sm">Remove pages 3 and 7</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">What to type (for 10-page PDF)</h3>
                        <ul className="space-y-2">
                          <li className="text-sm font-mono bg-gray-100 p-1 rounded">2-10</li>
                          <li className="text-sm font-mono bg-gray-100 p-1 rounded">1-9</li>
                          <li className="text-sm font-mono bg-gray-100 p-1 rounded">4-10</li>
                          <li className="text-sm font-mono bg-gray-100 p-1 rounded">1-8</li>
                          <li className="text-sm font-mono bg-gray-100 p-1 rounded">5-10</li>
                          <li className="text-sm font-mono bg-gray-100 p-1 rounded">1-2,4-6,8-10</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm">
                        <span className="font-bold">Pro tip:</span> Most tools let you type ranges with commas and hyphens. "1-5" means pages 1 through 5. "1,3,5" means pages 1, 3, and 5 only.
                      </p>
                    </div>
                  </div>
                </section>

                {/* The Privacy Issue */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    The Privacy Issue Nobody Talks About
                  </h2>
                  
                  <div className="border border-red-200 rounded-xl p-6 bg-red-50">
                    <div className="flex items-start">
                      <Shield className="w-6 h-6 text-red-600 mr-3 mt-0.5" />
                      <div>
                        <p className="text-gray-800 mb-3">
                          Here's the thing. When you use most online PDF tools, your file gets uploaded to their server.
                        </p>
                        <p className="text-gray-700 mb-3">
                          They say "deleted after 1 hour." Probably true. But still. Your contract, your personal stuff sat on someone else's computer.
                        </p>
                        <div className="bg-white p-4 rounded-lg border border-red-200">
                          <p className="font-medium text-gray-900 mb-2">Two kinds of tools:</p>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <X className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                              <span className="text-sm"><span className="font-bold">Server-based:</span> Upload file → Their server processes → Download. Your file left your computer.</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                              <span className="text-sm"><span className="font-bold">Browser-based:</span> File stays in your browser → Processed locally → Never uploaded.</span>
                            </li>
                          </ul>
                        </div>
                        <p className="text-sm text-gray-600 mt-3">
                          <span className="font-bold">For sensitive docs:</span> Use browser-based tools like PDFSwift. Your files never leave your device.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Tools That Work */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Tools That Actually Work (Free, No Adobe)
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-blue-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-blue-600 mb-1">PDFSwift</h3>
                      <p className="text-xs text-gray-500 mb-2">Browser-based • No upload • Free</p>
                      <p className="text-sm text-gray-700">Remove pages locally. Files stay in browser. Works on phone.</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-gray-600 mb-1">iLovePDF</h3>
                      <p className="text-xs text-gray-500 mb-2">Online • Free • No limits</p>
                      <p className="text-sm text-gray-700">Easy to use. Uploads to servers but deletes after.</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-gray-600 mb-1">Smallpdf</h3>
                      <p className="text-xs text-gray-500 mb-2">Online • 2/day free</p>
                      <p className="text-sm text-gray-700">Popular. Works well. Limits free users to 2 tasks per day.</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-gray-600 mb-1">Adobe Acrobat online</h3>
                      <p className="text-xs text-gray-500 mb-2">Online • Free with limits</p>
                      <p className="text-sm text-gray-700">Adobe's free online tool. Works but needs account sometimes.</p>
                    </div>
                    
                    <div className="border border-green-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-green-600 mb-1">Preview (Mac)</h3>
                      <p className="text-xs text-gray-500 mb-2">Built-in • Free • Offline</p>
                      <p className="text-sm text-gray-700">Already on your Mac. Works completely offline.</p>
                    </div>
                    
                    <div className="border border-purple-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-purple-600 mb-1">PDF24</h3>
                      <p className="text-xs text-gray-500 mb-2">Online • Free • No limits</p>
                      <p className="text-sm text-gray-700">German tool. Reliable. No daily limits.</p>
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
                      <h3 className="font-bold text-gray-900 mb-1">PDF is password protected</h3>
                      <p className="text-sm text-gray-600">You need the password to remove pages. Some tools can't edit protected PDFs. Remove password first (if you know it) using PDF password remover tools.</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Can't select multiple pages</h3>
                      <p className="text-sm text-gray-600">Hold Ctrl (Cmd on Mac) while clicking pages. Or use page range input if the tool has it.</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Pages are images, not text</h3>
                      <p className="text-sm text-gray-600">Doesn't matter. Page removal works on any PDF, whether it's scanned images or text. The tool doesn't care what's on the page.</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">File too large to upload</h3>
                      <p className="text-sm text-gray-600">Use a browser-based tool that processes locally – no upload means no file size limit. PDFSwift works this way.</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Removed wrong page by accident</h3>
                      <p className="text-sm text-gray-600">Most tools don't undo. Keep the original file saved separately. If you messed up, start over with the original.</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">PDF has interactive forms</h3>
                      <p className="text-sm text-gray-600">Removing pages from form PDFs might break form fields. Test on a copy first. Some tools preserve forms, some don't.</p>
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
                        Can I remove the first page of a PDF for free?
                      </h3>
                      <p className="text-gray-700">
                        Yes, completely free. Tools like PDFSwift, iLovePDF, and Smallpdf let you delete pages without paying. No signup required. Just upload, select pages to keep, and download. Takes 30 seconds. Some tools limit how many you can do per day (Smallpdf gives 2 free), but others like PDFSwift and iLovePDF have no limits.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        How do I delete the last page of a PDF?
                      </h3>
                      <p className="text-gray-700">
                        Upload your PDF to any page remover tool. You'll see thumbnails of all pages. Either click the last page and hit delete, or specify the page range to keep. For example, if your PDF has 10 pages and you want to remove the last page, keep pages 1-9. Some tools let you type "1-9" in a "keep pages" field. Download the result.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Will the page numbers stay correct after removing pages?
                      </h3>
                      <p className="text-gray-700">
                        Yes, the PDF renumbers automatically. If you remove page 1, the old page 2 becomes the new page 1. The page numbers you see in the PDF viewer will update correctly. However, if the document has printed page numbers (like "Page 1 of 10" in the header), those won't change – they're part of the content, not the actual page numbering. But the document structure renumbers properly.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        What if I need to remove multiple pages from the middle?
                      </h3>
                      <p className="text-gray-700">
                        Same process. Most tools let you specify ranges like '1-5,8,10-15' to keep only certain pages. Or you can select multiple thumbnails while holding Ctrl (Cmd on Mac) and delete them all at once. Some tools also let you type in the specific page numbers to remove. For example, "remove pages 3,5,7-9" works in many tools.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Is it safe to upload sensitive PDFs to remove pages?
                      </h3>
                      <p className="text-gray-700">
                        For sensitive documents (tax returns, contracts, IDs), use browser-based tools that process locally – files never leave your device. PDFSwift does this. Other tools upload to servers and delete after processing (usually 1-2 hours). That's fine for non-sensitive stuff, but for confidential documents, stick with local processing tools. Preview on Mac is also completely offline and safe.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Can I remove pages on my phone?
                      </h3>
                      <p className="text-gray-700">
                        Yes, works on iPhone and Android. Open any online PDF tool in your mobile browser. Upload from your phone storage or cloud. Select pages to remove. Download back to your phone. Takes about a minute. Some tools have apps, but the mobile website usually works fine. PDFSwift works on mobile browsers without any app download.
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
                        <span><span className="font-bold">Remove first page:</span> Keep pages "2 to end"</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Remove last page:</span> Keep pages "1 to second-last"</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Remove multiple:</span> Use ranges like "1-5,8,10-15"</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Privacy matters:</span> Use browser-based tools for sensitive docs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Takes 30 seconds.</span> Don't overthink it.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Keep original:</span> Save a copy before removing pages</span>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>

              {/* CTA */}
              <div className="mt-12 pt-10 border-t border-gray-200">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Remove PDF Pages Right Now
                  </h3>
                  <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                    Upload your PDF. Remove first page, last page, or any pages in between. No Adobe, no signup, no uploads to servers. Works on phone and computer.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/remove-pages"
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