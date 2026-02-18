// app/blog/merge-pdf-correct-order-avoid-page-mix-up/page.tsx

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
  Shield ,
  FileText,
  Smartphone
} from "lucide-react";
export const metadata = {
  title: "Merge PDF in Correct Order (Avoid Page Mix-Up) – Simple Guide | PDFSwift",
  description: "Tired of merged PDFs with pages in the wrong order? Here's how to arrange files correctly before merging. No more page mix-ups.",
  keywords: "merge pdf correct order, pdf page order, arrange pdf before merging, avoid pdf mix up, pdf merger tips",
  openGraph: {
    type: "article",
    url: "https://www.pdfswift.online/blog/merge-pdf-correct-order-avoid-page-mix-up",
    title: "Merge PDF in Correct Order (Avoid Page Mix-Up) – Simple Guide",
    description: "Tired of merged PDFs with pages in the wrong order? Here's how to arrange files correctly before merging.",
    images: [
      {
        url: "https://www.pdfswift.online/images/merge-pdf-order-guide.png",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "PDFSwift",
    locale: "en_US",
    publishedTime: "2026-02-19T08:00:00+00:00",
    authors: ["PDFSwift Team"],
    tags: ["merge pdf", "pdf order", "page arrangement", "pdf merging tips", "2026 guide"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge PDF in Correct Order (Avoid Page Mix-Up) – Simple Guide",
    description: "Tired of merged PDFs with pages in the wrong order? Here's how to arrange files correctly before merging.",
    images: ["https://www.pdfswift.online/images/merge-pdf-order-guide.png"],
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
    canonical: "/blog/merge-pdf-correct-order-avoid-page-mix-up",
  },
  category: "How-to Guide",
  other: {
    "article:published_time": "2026-02-19T08:00:00+00:00",
    "article:modified_time": "2026-02-19T08:00:00+00:00",
    "article:section": "How-to Guide",
    "article:tag": ["merge pdf", "pdf order", "page arrangement", "pdf merging", "how-to guide"],
  },
};

export default function MergePDFCorrectOrder() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://www.pdfswift.online/blog/merge-pdf-correct-order-avoid-page-mix-up#article",
        headline: "Merge PDF in Correct Order (Avoid Page Mix-Up) – Simple Guide",
        description: "Tired of merged PDFs with pages in the wrong order? Here's how to arrange files correctly before merging. No more page mix-ups.",
        datePublished: "2026-02-19T08:00:00+00:00",
        dateModified: "2026-02-19T08:00:00+00:00",
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
          "@id": "https://www.pdfswift.online/blog/merge-pdf-correct-order-avoid-page-mix-up",
        },
        wordCount: 1200,
        timeRequired: "PT8M",
        articleSection: "How-to Guide",
        articleBody: `Complete guide to merging PDFs in the correct order. Covers common mistakes, file naming tricks, drag-and-drop reordering, and how to avoid page mix-ups.`,
        keywords: "merge pdf correct order, pdf page order, arrange pdf before merging, avoid pdf mix up, pdf merger tips",
        thumbnailUrl: "https://www.pdfswift.online/images/merge-pdf-order-guide.png",
        image: {
          "@type": "ImageObject",
          url: "https://www.pdfswift.online/images/merge-pdf-order-guide.png",
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.pdfswift.online/blog/merge-pdf-correct-order-avoid-page-mix-up#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Why do my merged PDF pages always end up in the wrong order?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Because most tools merge in the order you select, not the order you think. If you click File B first then File A, File B becomes page 1. Always check the list before merging and use drag-and-drop to rearrange.",
            },
          },
          {
            "@type": "Question",
            name: "What if I have 20 files to merge? How do I keep track?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Name your files with numbers first: 01_intro.pdf, 02_chapter1.pdf. When you upload, they'll appear in alphabetical order. This trick saves so much time.",
            },
          },
          {
            "@type": "Question",
            name: "Do all PDF mergers let me rearrange files?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Free versions of some tools just merge in selection order. Look for tools that show a list and let you drag files to reorder. PDFSwift, Smallpdf, iLovePDF do this.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.pdfswift.online/blog/merge-pdf-correct-order-avoid-page-mix-up#breadcrumb",
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
            name: "Merge PDF Correct Order",
            item: "https://www.pdfswift.online/blog/merge-pdf-correct-order-avoid-page-mix-up",
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
                  Merge PDF Correct Order
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
                    PDF Merging
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                    February 19, 2026
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                    Page Order
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                  Merge PDF in Correct Order
                  <br />
                  <span className="text-2xl md:text-3xl lg:text-4xl text-blue-600">
                    (Avoid Page Mix-Up) – Simple Guide
                  </span>
                </h1>

                {/* Date and Reading Time */}
                <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-4">
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 mr-2 text-gray-500" />
                    <time dateTime="2026-02-19">February 19, 2026</time>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gray-500" />
                    <span>8 minute read</span>
                  </div>
                </div>

                {/* Introduction */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-100 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                  <div className="flex items-start">
                    <FileText className="w-7 h-7 text-blue-600 mr-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-800 font-bold text-lg mb-3">
                        I merged 12 PDFs and they came out completely backwards
                      </p>
                      <p className="text-gray-700">
                        Had to combine 12 chapters into one book. Selected all files. Clicked merge. Opened the result. Chapter 12 was first. Chapter 11 second. All backwards. Tried again, this time selecting in reverse order. Worked. But then I realized – why should I have to think backwards? There's a better way. Drag and drop. Preview thumbnails. Number your files. Here's how to never mess up page order again .
                      </p>
                    </div>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div className="space-y-10">
                {/* The Problem */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Why Merged PDFs Get the Order Wrong
                  </h2>
                  
                  <div className="border border-red-200 rounded-xl p-6 bg-red-50">
                    <div className="flex items-start">
                      <AlertTriangle className="w-6 h-6 text-red-600 mr-3 mt-0.5" />
                      <div>
                        <p className="text-gray-800 mb-3">
                          Here's the problem nobody explains.
                        </p>
                        <p className="text-gray-700 mb-3">
                          Most PDF mergers work in the order you <span className="font-bold">select</span> files, not the order you <span className="font-bold">think</span>. If you click File B first, then File A, File B becomes page 1. Your brain thinks "A then B" but the computer sees "B then A" .
                        </p>
                        <div className="bg-white p-4 rounded-lg border border-red-200">
                          <p className="font-medium text-gray-900 mb-2">Common mistake:</p>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                              <X className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                              <span>Select files in folder: Chapter1, Chapter2, Chapter3</span>
                            </li>
                            <li className="flex items-start">
                              <X className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                              <span>Click Chapter3 first by accident → now it's first</span>
                            </li>
                            <li className="flex items-start">
                              <X className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                              <span>Result: Chapter3, Chapter1, Chapter2 (total mess)</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Visual Guide */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    How It Should Look (Visual Guide)
                  </h2>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-center space-x-4 mb-6">
                      <div className="text-center">
                        <div className="w-16 h-20 bg-blue-100 rounded-lg flex items-center justify-center border-2 border-blue-300 mx-auto mb-2">
                          <span className="font-bold text-blue-700">A</span>
                        </div>
                        <p className="text-xs text-gray-600">File 1</p>
                      </div>
                      <ChevronRight className="w-6 h-6 text-gray-400" />
                      <div className="text-center">
                        <div className="w-16 h-20 bg-blue-100 rounded-lg flex items-center justify-center border-2 border-blue-300 mx-auto mb-2">
                          <span className="font-bold text-blue-700">B</span>
                        </div>
                        <p className="text-xs text-gray-600">File 2</p>
                      </div>
                      <ChevronRight className="w-6 h-6 text-gray-400" />
                      <div className="text-center">
                        <div className="w-16 h-20 bg-blue-100 rounded-lg flex items-center justify-center border-2 border-blue-300 mx-auto mb-2">
                          <span className="font-bold text-blue-700">C</span>
                        </div>
                        <p className="text-xs text-gray-600">File 3</p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="inline-flex items-center bg-green-100 px-4 py-2 rounded-full">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-medium text-green-700">Correct Order: A, B, C</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <div className="flex items-center justify-center space-x-4 mb-6">
                      <div className="text-center">
                        <div className="w-16 h-20 bg-red-100 rounded-lg flex items-center justify-center border-2 border-red-300 mx-auto mb-2">
                          <span className="font-bold text-red-700">B</span>
                        </div>
                        <p className="text-xs text-gray-600">File 2</p>
                      </div>
                      <ChevronRight className="w-6 h-6 text-gray-400" />
                      <div className="text-center">
                        <div className="w-16 h-20 bg-red-100 rounded-lg flex items-center justify-center border-2 border-red-300 mx-auto mb-2">
                          <span className="font-bold text-red-700">C</span>
                        </div>
                        <p className="text-xs text-gray-600">File 3</p>
                      </div>
                      <ChevronRight className="w-6 h-6 text-gray-400" />
                      <div className="text-center">
                        <div className="w-16 h-20 bg-red-100 rounded-lg flex items-center justify-center border-2 border-red-300 mx-auto mb-2">
                          <span className="font-bold text-red-700">A</span>
                        </div>
                        <p className="text-xs text-gray-600">File 1</p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="inline-flex items-center bg-red-100 px-4 py-2 rounded-full">
                        <X className="w-5 h-5 text-red-600 mr-2" />
                        <span className="font-medium text-red-700">Wrong Order: B, C, A</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Method 1: Drag and Drop */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Method 1: Drag and Drop to Rearrange
                  </h2>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <p className="text-gray-700 mb-4">
                      This is the easiest way. Upload all files, then drag them into the right order.
                    </p>
                    
                    <div className="space-y-5">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">1</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Upload all your PDFs</h3>
                          <p className="text-gray-700">Most tools show a list of uploaded files .</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">2</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Look at the list order</h3>
                          <p className="text-gray-700">The top file will be page 1. Bottom file will be last .</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">3</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Drag to rearrange</h3>
                          <p className="text-gray-700">Click and hold a file, drag it up or down to change position .</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">4</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Check preview</h3>
                          <p className="text-gray-700">Some tools show thumbnails. Verify the order looks right .</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">5</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Merge</h3>
                          <p className="text-gray-700">Click merge and download your correctly ordered PDF .</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-5 p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
                        <span className="font-bold">Tip:</span> PDFSwift, Smallpdf, and iLovePDF all support drag-drop reordering. If your tool doesn't, find one that does .
                      </p>
                    </div>
                  </div>
                </section>

                {/* Method 2: Name Files with Numbers */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Method 2: Name Files with Numbers (Foolproof)
                  </h2>
                  
                  <div className="border border-green-200 rounded-xl p-6 bg-green-50">
                    <div className="flex items-start">
                      <Lightbulb className="w-6 h-6 text-green-600 mr-3 mt-0.5" />
                      <div>
                        <p className="text-gray-800 mb-3">
                          This trick works every time, even with tools that don't let you reorder.
                        </p>
                        <p className="text-gray-700 mb-3">
                          Before uploading, rename your files with numbers at the beginning. Most file pickers sort alphabetically, so they'll appear in number order .
                        </p>
                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <p className="font-medium text-gray-900 mb-2">Bad naming:</p>
                          <ul className="space-y-1 text-sm mb-3">
                            <li>• Chapter1.pdf</li>
                            <li>• Chapter2.pdf</li>
                            <li>• Chapter10.pdf ← This will come after Chapter1, not Chapter2</li>
                          </ul>
                          <p className="font-medium text-gray-900 mb-2">Good naming (with leading zeros):</p>
                          <ul className="space-y-1 text-sm">
                            <li>• 01_Chapter1.pdf</li>
                            <li>• 02_Chapter2.pdf</li>
                            <li>• 10_Chapter10.pdf ✓ Correct order</li>
                          </ul>
                        </div>
                        <p className="text-sm text-gray-600 mt-3">
                          <span className="font-bold">Why this works:</span> Computers sort "01" before "02" before "10". Always use two digits (01, 02... 99) for up to 99 files.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

              

                {/* Common Mistakes */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Common Mistakes (And How to Avoid Them)
                  </h2>
                  
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Mistake #1: Selecting in wrong order</h3>
                      <p className="text-sm text-gray-600">You click files randomly, they merge in that random order. Always check the list before merging .</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Mistake #2: Assuming alphabetical order</h3>
                      <p className="text-sm text-gray-600">"Chapter10" comes after "Chapter1" in computer sorting. Use leading zeros (01, 02... 10) .</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Mistake #3: Not previewing</h3>
                      <p className="text-sm text-gray-600">Merging 20 files without checking. Always preview first if your tool supports it .</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Mistake #4: Using tools without reorder</h3>
                      <p className="text-sm text-gray-600">Some free tools merge immediately and don't let you rearrange. Avoid these .</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Mistake #5: Forgetting about append vs insert</h3>
                      <p className="text-sm text-gray-600">Most tools append (add to end). If you need a file in the middle, you have to reorder .</p>
                    </div>
                  </div>
                </section>

                {/* Tools That Let You Reorder */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Tools That Let You Rearrange Files
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-blue-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-blue-600 mb-1">PDFSwift</h3>
                      <p className="text-sm text-gray-600 mb-2">Free, no signup</p>
                      <ul className="space-y-1 text-xs">
                        <li className="flex items-start">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-1 mt-0.5" />
                          <span>Drag-drop reordering</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-1 mt-0.5" />
                          <span>Preview thumbnails</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-1 mt-0.5" />
                          <span>Browser-based, no upload</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-gray-600 mb-1">Smallpdf</h3>
                      <p className="text-sm text-gray-600 mb-2">2 free merges/day</p>
                      <ul className="space-y-1 text-xs">
                        <li className="flex items-start">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-1 mt-0.5" />
                          <span>Drag-drop reordering</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-1 mt-0.5" />
                          <span>Clean interface</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-gray-600 mb-1">iLovePDF</h3>
                      <p className="text-sm text-gray-600 mb-2">Free, unlimited</p>
                      <ul className="space-y-1 text-xs">
                        <li className="flex items-start">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-1 mt-0.5" />
                          <span>Drag-drop reordering</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-1 mt-0.5" />
                          <span>Page thumbnails available</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-gray-600 mb-1">Adobe Acrobat</h3>
                      <p className="text-sm text-gray-600 mb-2">Paid</p>
                      <ul className="space-y-1 text-xs">
                        <li className="flex items-start">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-1 mt-0.5" />
                          <span>Full control, but costs money</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Real Example */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Real Example: The Company Report That Was Backwards
                  </h2>
                  
                  <div className="border border-gray-200 rounded-xl p-6">
                    <p className="text-gray-700 mb-3">
                      A client merged 8 quarterly reports into one annual document. Selected files from oldest to newest. But the merger tool put them in reverse order. The CEO got a report starting with Q4 and ending with Q1. Confusing presentation.
                    </p>
                    <p className="text-gray-700 mb-3">
                      Fixed by uploading all files, dragging them into correct order (Q1 at top, Q4 at bottom), previewing, then merging. Took 30 seconds .
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-bold">Lesson:</span> Even with 8 files, drag-drop reordering is faster than renaming and re-uploading.
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
                        Why do my merged PDF pages always end up in the wrong order?
                      </h3>
                      <p className="text-gray-700">
                        Because most tools merge files in the order you select them, not the order you think. If you click File B first then File A, File B becomes page 1. It's easy to mix up. Always check the list before merging. Good tools let you drag files to rearrange. Bad tools just merge in selection order and don't let you change it. Look for drag-and-drop ordering .
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Can I rearrange pages after merging?
                      </h3>
                      <p className="text-gray-700">
                        Yes, but it's extra work. You'd need a separate 'reorder pages' tool. Better to get the order right before merging. Some PDF mergers show page thumbnails so you can see exactly what you're getting. That's the safest way – preview then merge .
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        What if I have 20 files to merge? How do I keep track?
                      </h3>
                      <p className="text-gray-700">
                        Name your files with numbers first: 01_intro.pdf, 02_chapter1.pdf, 03_chapter2.pdf. Then when you upload, they'll appear in alphabetical order. Most file pickers sort by name. This trick saves so much time. If your tool supports drag-drop, you can also rearrange visually .
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Do all PDF mergers let me rearrange files?
                      </h3>
                      <p className="text-gray-700">
                        No. Free versions of some tools just merge in the order you select and don't let you change it. That's where mistakes happen. Look for tools that show a list of uploaded files and let you drag them up/down. PDFSwift does this. Smallpdf does this. iLovePDF does this. Avoid tools that merge immediately without letting you reorder .
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        What's the most common page order mistake?
                      </h3>
                      <p className="text-gray-700">
                        Append vs Insert confusion. Most tools 'append' – they add new files at the end. If you want File B to go before File A, you need to upload them in reverse order. Or use a tool that lets you insert between existing files. The mistake: uploading in logical order (A then B) but wanting B first. Always check the list before clicking merge .
                      </p>
                    </div>
                  </div>
                </section>

                {/* Quick Checklist */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Before You Click Merge – Quick Checklist
                  </h2>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span>✅ Files are in correct order (top = page 1)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span>✅ If using numbered files, leading zeros are correct (01, 02... 10)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span>✅ Previewed thumbnails if available</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span>✅ Tool supports reordering (if not, rename files first)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span>✅ Double-checked – especially for important documents</span>
                      </li>
                    </ul>
                    
                    <p className="text-sm text-gray-600 mt-4">
                      Takes 10 seconds. Saves you from redoing the whole merge .
                    </p>
                  </div>
                </section>
              </div>

              {/* CTA */}
              <div className="mt-12 pt-10 border-t border-gray-200">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Merge PDFs in Correct Order
                  </h3>
                  <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                    Upload files, drag to rearrange, preview thumbnails, then merge. No more page mix-ups. Works on phone and computer.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/merge-pdf"
                      className="inline-flex items-center justify-center px-7 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300"
                    >
                      Merge PDFs Now
                    </Link>
                    <Link
                      href="/blog"
                      className="inline-flex items-center justify-center px-7 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10"
                    >
                      More PDF Guides
                    </Link>
                  </div>
                  <p className="mt-6 text-blue-200 text-sm">
                    Drag-drop reordering • Thumbnail preview • No uploads • Free forever
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