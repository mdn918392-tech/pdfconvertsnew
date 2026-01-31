// app/blog/how-to-extract-pages-2-5-from-pdf/page.tsx

import {
  CalendarDays,
  Clock,
  CheckCircle,
  FileText,
  Download,
  ChevronRight,
  HelpCircle,
  Shield,
  Zap,
  Scissors,
  Filter,
  Share2,
  Mail,
  MessageCircle,
  FileOutput,
  BookOpen,
  FileSearch,
  Layers,
  Copy,
  ArrowRight,
  Eye,
  Printer,
  Smartphone,
  Laptop,
  Users,
  FolderOpen,
  Bookmark,
  Target,
  MapPin,
  PieChart,
  FileBox,
  Send,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import BlogToolsSection from "@/app/components/BlogToolsSection";

export const metadata = {
  title: "How to Extract Pages 2–5 from PDF (Exact Page Range Explained) | PDFSwift",
  description: "Clear, practical guide showing how to extract specific pages 2-5 from PDFs. Perfect for reports, chapters, forms - get just what you need without the whole document.",
  keywords: "extract pages 2-5 from PDF, PDF page extraction, extract specific PDF pages, pages 2-5 PDF, PDF range extraction, extract PDF section, PDFSwift extract pages",
  openGraph: {
    type: "article",
    url: "https://www.pdfswift.online/blog/how-to-extract-pages-2-5-from-pdf",
    title: "How to Extract Pages 2–5 from PDF (Exact Page Range Explained)",
    description: "Practical guide to extracting exactly pages 2-5 from PDF documents. Learn why this specific range matters and how to do it easily.",
    images: [
      {
        url: "https://www.pdfswift.online/images/extract-pdf-pages-guide.png",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "PDFSwift",
    locale: "en_US",
    publishedTime: "2026-02-01T08:00:00+00:00",
    authors: ["PDFSwift Team"],
    tags: ["PDF extraction", "Pages 2-5", "PDF editing", "Document management", "PDFSwift"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Extract Pages 2–5 from PDF (Exact Page Range Explained)",
    description: "Clear guide showing how to extract specific pages 2-5 from PDFs. Get just what you need without the whole document.",
    images: ["https://www.pdfswift.online/images/extract-pdf-pages-guide.png"],
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
    canonical: "/blog/how-to-extract-pages-2-5-from-pdf",
  },
  category: "How-to Guide",
  other: {
    "article:published_time": "2026-02-01T08:00:00+00:00",
    "article:modified_time": "2026-02-01T08:00:00+00:00",
    "article:section": "How-to Guide",
    "article:tag": ["PDF extraction", "Pages 2-5", "PDF editing", "Document management", "How-to guide"],
  },
};

export default function HowToExtractPages2To5FromPDF() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://www.pdfswift.online/blog/how-to-extract-pages-2-5-from-pdf#article",
        headline: "How to Extract Pages 2–5 from PDF (Exact Page Range Explained) - Complete Practical Guide",
        description: "Practical, experience-based guide showing exactly how to extract pages 2-5 from PDF documents. Learn why this specific page range matters for real-world use cases like reports, chapters, forms, and sharing documents efficiently.",
        datePublished: "2026-02-01T08:00:00+00:00",
        dateModified: "2026-02-01T08:00:00+00:00",
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
          "@id": "https://www.pdfswift.online/blog/how-to-extract-pages-2-5-from-pdf",
        },
        wordCount: 2800,
        timeRequired: "PT8M",
        articleSection: "How-to Guide",
        articleBody: `Practical guide to extracting pages 2-5 from PDF documents. Covers real-world scenarios where you need specific pages, step-by-step extraction process, common mistakes to avoid, and tips for efficient document sharing.`,
        keywords: "extract pages 2-5 from PDF, PDF page extraction guide, extract specific PDF pages, pages 2-5 extraction, PDF range extraction tutorial, practical PDF editing",
        thumbnailUrl: "https://www.pdfswift.online/images/extract-pdf-pages-guide.png",
        image: {
          "@type": "ImageObject",
          url: "https://www.pdfswift.online/images/extract-pdf-pages-guide.png",
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "HowTo",
        "@id": "https://www.pdfswift.online/blog/how-to-extract-pages-2-5-from-pdf#howto",
        name: "How to Extract Pages 2-5 from a PDF Document",
        description: "Step-by-step guide to extract exactly pages 2 through 5 from any PDF document for focused sharing and editing",
        totalTime: "PT3M",
        estimatedCost: {
          "@type": "MonetaryAmount",
          currency: "USD",
          value: "0",
        },
        step: [
          {
            "@type": "HowToStep",
            name: "Upload your PDF document",
            text: "Select the PDF file that contains the pages you want to extract. Most tools work directly in your browser without uploading to servers.",
            url: "https://www.pdfswift.online/blog/how-to-extract-pages-2-5-from-pdf#step1",
          },
          {
            "@type": "HowToStep",
            name: "Identify which pages you need (pages 2-5)",
            text: "Look through the document preview to confirm pages 2 through 5 contain the content you want. These often contain main content while skipping covers or tables.",
            url: "https://www.pdfswift.online/blog/how-to-extract-pages-2-5-from-pdf#step2",
          },
          {
            "@type": "HowToStep",
            name: "Select those specific pages",
            text: "Click on or check pages 2, 3, 4, and 5. Some tools let you drag to select or type '2-5' to select the range quickly.",
            url: "https://www.pdfswift.online/blog/how-to-extract-pages-2-5-from-pdf#step3",
          },
          {
            "@type": "HowToStep",
            name: "Extract them into a new PDF",
            text: "Click the extract button to create a new document containing only your selected pages. The original file remains untouched.",
            url: "https://www.pdfswift.online/blog/how-to-extract-pages-2-5-from-pdf#step4",
          },
          {
            "@type": "HowToStep",
            name: "Download your smaller, focused document",
            text: "Save the new PDF file with just pages 2-5. It will be smaller and more focused than the original document.",
            url: "https://www.pdfswift.online/blog/how-to-extract-pages-2-5-from-pdf#step5",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "PDFSwift PDF Page Extractor",
          },
          {
            "@type": "HowToTool",
            name: "Web browser with PDF support",
          },
        ],
        supply: [
          {
            "@type": "HowToSupply",
            name: "PDF document containing pages to extract",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.pdfswift.online/blog/how-to-extract-pages-2-5-from-pdf#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Why would I need just pages 2-5 from a PDF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "There are many practical reasons. Often the first page is just a cover or title page, and you want to get straight to the actual content. Pages 2-5 frequently contain the introduction, main points, or specific forms you need. It's common with reports where you only need the executive summary, or books where you want just one chapter.",
            },
          },
          {
            "@type": "Question",
            name: "What if I need different pages, like 3-7 or 10-15?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The same process works for any page range. You just select whatever pages you actually need. The reason pages 2-5 come up so often is that many documents follow a similar pattern: cover page first, then the main content starts. But you can extract any pages you want using the same method.",
            },
          },
          {
            "@type": "Question",
            name: "Does extracting pages 2-5 change the original PDF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No, not at all. Your original document stays completely unchanged. The extraction creates a brand new PDF file with just the pages you selected. Think of it like making a photocopy of specific pages from a book - the original book remains exactly as it was.",
            },
          },
          {
            "@type": "Question",
            name: "Can I extract non-consecutive pages, like pages 2, 5, and 7?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, absolutely. Most extraction tools let you pick individual pages however you like. You're not limited to consecutive ranges. Sometimes you need just the introduction (page 2) and the conclusion (page 5), skipping the middle. Good tools handle both ranges and individual page selection.",
            },
          },
          {
            "@type": "Question",
            name: "Is this useful for sharing files on WhatsApp or email?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Extremely useful. Instead of sending someone a huge 50-page PDF when they only need to see 4 pages, you extract just pages 2-5 and send that smaller file. It loads faster on their phone, uses less data, and they get exactly what they need without having to scroll through pages they don't care about.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.pdfswift.online/blog/how-to-extract-pages-2-5-from-pdf#breadcrumb",
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
            name: "How to Extract Pages 2–5 from PDF",
            item: "https://www.pdfswift.online/blog/how-to-extract-pages-2-5-from-pdf",
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
                <Link
                  href="/"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  Home
                </Link>
                <ChevronRight
                  className="w-4 h-4 mx-2 text-gray-400"
                  aria-hidden="true"
                />
              </li>
              <li className="flex items-center">
                <Link
                  href="/blog"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  Blog
                </Link>
                <ChevronRight
                  className="w-4 h-4 mx-2 text-gray-400"
                  aria-hidden="true"
                />
              </li>
              <li aria-current="page">
                <span className="text-gray-900 font-semibold">
                  How to Extract Pages 2–5 from PDF
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
                    <Scissors className="w-4 h-4 mr-2" aria-hidden="true" />{" "}
                    How-to Guide
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                    <CalendarDays className="w-4 h-4 mr-2" aria-hidden="true" />{" "}
                    February 1, 2026
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                    <Target className="w-4 h-4 mr-2" aria-hidden="true" />{" "}
                    Practical Guide
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight tracking-tight">
                  How to Extract Pages 2–5 from PDF:
                  <br />
                  <span className="text-2xl md:text-3xl lg:text-4xl text-blue-600">
                    Exact Page Range Explained
                  </span>
                </h1>

                {/* Date and Reading Time */}
                <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-4">
                  <div className="flex items-center">
                    <CalendarDays
                      className="w-5 h-5 mr-2 text-gray-500"
                      aria-hidden="true"
                    />
                    <time dateTime="2026-02-01" className="font-medium">
                      February 1, 2026
                    </time>
                  </div>
                  <div className="flex items-center">
                    <Clock
                      className="w-5 h-5 mr-2 text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="font-medium">8 minute read</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen
                      className="w-5 h-5 mr-2 text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="font-medium">Practical hands-on guide</span>
                  </div>
                </div>

                {/* Practical Introduction */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-100 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                  <div className="flex items-start">
                    <FileSearch
                      className="w-7 h-7 text-blue-600 mr-4 mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-gray-800 font-bold text-lg mb-3">
                        The Real Reason People Need Pages 2–5
                      </p>
                      <p className="text-gray-700">
                        Let me tell you something I've noticed from helping people with PDFs. 
                        When someone asks about "pages 2-5," it's almost never random. 
                        It's because they've opened a document, seen the first page is just a title or cover, 
                        and realized the actual content they need starts on page 2 and goes for a few pages. 
                        They don't want the whole thing—just the important part.
                      </p>
                    </div>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div className="space-y-10">
                {/* Quick Overview */}
                <section className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    What This Actually Means in Practice
                  </h2>

                  <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <FileBox className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-blue-700 text-lg mb-2 text-center">
                          The Common Pattern
                        </h3>
                        <p className="text-sm text-gray-700">
                          Page 1: Cover/title page<br />
                          Pages 2-5: Actual content begins<br />
                          Rest of document: Additional details, appendices, or other chapters
                        </p>
                      </div>

                      <div className="p-4">
                        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Filter className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="font-bold text-green-700 text-lg mb-2 text-center">
                          Why Extract Just These?
                        </h3>
                        <p className="text-sm text-gray-700">
                          • Smaller file to share<br />
                          • Faster to load on phones<br />
                          • Less confusing for recipients<br />
                          • Focuses on what actually matters
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-lg">
                    <div className="flex items-start">
                      <Eye className="w-6 h-6 text-yellow-600 mr-3 mt-0.5" />
                      <div>
                        <p className="font-bold text-yellow-800 mb-2">
                          Something I've noticed:
                        </p>
                        <p className="text-yellow-700">
                          People often struggle with large PDFs because they feel they have to send or use the whole document. 
                          But in real use, most of the time we only need specific parts. 
                          Extracting pages 2-5 is like giving someone just the chapter they asked for, 
                          not the entire book they have to search through.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Real-World Examples */}
                <section className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Real Situations Where You'd Need Pages 2–5
                  </h2>

                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start mb-4">
                        <MessageCircle className="w-8 h-8 text-green-600 mr-4 flex-shrink-0" />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Sharing on WhatsApp or Messaging Apps
                          </h3>
                          <p className="text-gray-700">
                            You've got a 20-page report, but your colleague only needs to see the executive summary 
                            (which happens to be on pages 2-5). Instead of making them download a huge file on their phone, 
                            you extract just those pages. The file is smaller, loads instantly, and they don't have to scroll 
                            through 15 pages they don't need.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start mb-4">
                        <Mail className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0" />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Email Attachments That Actually Get Opened
                          </h3>
                          <p className="text-gray-700">
                            When you email a PDF, smaller files are more likely to be opened. 
                            If someone sees "5MB attachment" they might put it off. But "500KB attachment" 
                            feels manageable. Pages 2-5 of most documents are often the perfect size—enough 
                            to contain what's needed, small enough to not scare people off.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start mb-4">
                        <Printer className="w-8 h-8 text-purple-600 mr-4 flex-shrink-0" />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Printing Only What You Actually Need
                          </h3>
                          <p className="text-gray-700">
                            Need to print a section from a manual or guide? Printing pages 2-5 instead of the 
                            whole document saves paper, ink, and time. It's especially useful at work or school 
                            where you might only need specific pages for a meeting or class.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Step-by-Step Guide */}
                <section className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    How to Actually Do It (Step by Step)
                  </h2>

                  <div className="space-y-6">
                    <div className="border-2 border-blue-200 rounded-xl p-6">
                      <div className="flex items-start mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="font-bold text-blue-700">1</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Find Your PDF and Upload It
                          </h3>
                          <p className="text-gray-700">
                            Open whatever tool you're using—most online tools work right in your browser. 
                            Drag your PDF file into the upload area or click to browse for it. 
                            The document will load and show you thumbnails of all the pages.
                          </p>
                          <div className="mt-3 text-sm text-gray-600 flex items-center">
                            <Shield className="w-4 h-4 mr-2" />
                            Good to know: Many tools process files in your browser, so your document 
                            doesn't get uploaded to any server.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-blue-200 rounded-xl p-6">
                      <div className="flex items-start mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="font-bold text-blue-700">2</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Identify Pages 2 Through 5
                          </h3>
                          <p className="text-gray-700">
                            Look at the page thumbnails. Page 1 is usually on the left. 
                            Find pages 2, 3, 4, and 5. Hover over them or click to see a larger preview 
                            if you need to confirm these are the right pages.
                          </p>
                          <div className="mt-3 bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-blue-800">
                              <span className="font-bold">Common pattern:</span> Page 1 = cover/title, 
                              Page 2 = introduction or table of contents, Pages 3-5 = actual content begins.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-blue-200 rounded-xl p-6">
                      <div className="flex items-start mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="font-bold text-blue-700">3</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Select Those Specific Pages
                          </h3>
                          <p className="text-gray-700">
                            Click on page 2, then page 3, then page 4, then page 5. 
                            Some tools let you drag from page 2 to page 5 to select them all at once. 
                            Others might have a box where you can type "2-5". 
                            You'll see checkmarks or highlights on the selected pages.
                          </p>
                          <div className="mt-3 text-sm text-gray-600">
                            <span className="font-bold">Tip:</span> If you accidentally select the wrong page, 
                            just click it again to deselect. It's easy to fix mistakes.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-blue-200 rounded-xl p-6">
                      <div className="flex items-start mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="font-bold text-blue-700">4</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Extract and Create the New PDF
                          </h3>
                          <p className="text-gray-700">
                            Click the "Extract" or "Create PDF" button. The tool will process your selection 
                            and create a brand new document containing only pages 2 through 5. 
                            This usually takes just a few seconds.
                          </p>
                          <div className="mt-3 text-sm text-gray-600">
                            Remember: Your original PDF stays completely untouched. 
                            This is like making a copy of specific pages, not cutting them out.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-blue-200 rounded-xl p-6">
                      <div className="flex items-start mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="font-bold text-blue-700">5</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Download and Use Your New File
                          </h3>
                          <p className="text-gray-700">
                            Click "Download" to save the new PDF to your computer or phone. 
                            Give it a clear name like "DocumentName_Pages2-5.pdf" so you remember what it contains. 
                            Now you can share it, print it, or use it however you need.
                          </p>
                          <div className="mt-3 text-sm text-gray-600">
                            The new file will be much smaller than the original, 
                            especially if you started with a long document.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Common Mistakes Section */}
                <section className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Common Mistakes (And How to Avoid Them)
                  </h2>

                  <div className="space-y-4">
                    <div className="border border-red-200 bg-red-50 rounded-xl p-5">
                      <div className="flex items-start">
                        <span className="text-red-600 font-bold mr-3">⚠</span>
                        <div>
                          <h4 className="font-bold text-red-700 mb-2">
                            Selecting page 1 by accident
                          </h4>
                          <p className="text-red-800">
                            Many people automatically start selecting from page 1, forgetting that 
                            page 1 is often just a cover. Double-check that you're really selecting 
                            pages 2-5, not 1-4 or 1-5.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-yellow-200 bg-yellow-50 rounded-xl p-5">
                      <div className="flex items-start">
                        <span className="text-yellow-600 font-bold mr-3">⚠</span>
                        <div>
                          <h4 className="font-bold text-yellow-700 mb-2">
                            Not previewing pages before selecting
                          </h4>
                          <p className="text-yellow-800">
                            Sometimes what looks like page 2 in the thumbnail isn't actually page 2 
                            in the document (especially with Roman numerals or blank pages). 
                            Always click to preview and confirm you have the right pages.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-blue-200 bg-blue-50 rounded-xl p-5">
                      <div className="flex items-start">
                        <span className="text-blue-600 font-bold mr-3">💡</span>
                        <div>
                          <h4 className="font-bold text-blue-700 mb-2">
                            A helpful trick I use:
                          </h4>
                          <p className="text-blue-800">
                            Before extracting, I rename the file to include what pages I'm extracting. 
                            Like changing "Annual_Report.pdf" to "Annual_Report_Pages2-5.pdf". 
                            That way, when I come back to it later, I know exactly what's in the file 
                            without having to open it.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Device-Specific Tips */}
                <section className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Doing This on Different Devices
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <Smartphone className="w-8 h-8 text-blue-600 mr-3" />
                        <h3 className="text-xl font-bold text-gray-900">
                          On Your Phone
                        </h3>
                      </div>
                      <p className="text-gray-700 mb-4">
                        Works surprisingly well. Upload the PDF from your files or cloud storage, 
                        tap the pages you need (2, 3, 4, 5), and download the result. 
                        Perfect for when someone sends you a PDF and you need to forward just part of it.
                      </p>
                      <div className="text-sm text-gray-600">
                        <span className="font-bold">Note:</span> Some phone browsers work better than others. 
                        Chrome and Safari usually handle it well.
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <Laptop className="w-8 h-8 text-green-600 mr-3" />
                        <h3 className="text-xl font-bold text-gray-900">
                          On Your Computer
                        </h3>
                      </div>
                      <p className="text-gray-700 mb-4">
                        Easier to see all the page thumbnails at once. You can quickly scroll through, 
                        select pages 2-5, and get your new PDF. 
                        If you're working with lots of documents, the computer is definitely easier.
                      </p>
                      <div className="text-sm text-gray-600">
                        <span className="font-bold">Tip:</span> Use keyboard shortcuts if available—Ctrl+click 
                        (or Cmd+click on Mac) to select multiple individual pages.
                      </div>
                    </div>
                  </div>
                </section>

                {/* Why Pages 2-5 Specifically? */}
                <section className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Why Pages 2–5 Keep Coming Up
                  </h2>

                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">
                            It's where the actual content usually starts
                          </h4>
                          <p className="text-gray-700">
                            Most documents follow a pattern: cover page first, then the real content. 
                            By the time you get to page 2, you're into the introduction or executive summary. 
                            Pages 3-5 often contain the key points or first chapter.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <PieChart className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">
                            The "Goldilocks" range—not too little, not too much
                          </h4>
                          <p className="text-gray-700">
                            One page often isn't enough to convey anything meaningful. 
                            Ten pages might be more than someone wants to read. 
                            But pages 2-5? That's usually enough to get the main ideas across 
                            without overwhelming someone.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Users className="w-6 h-6 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">
                            Perfect for sharing with others
                          </h4>
                          <p className="text-gray-700">
                            When you share pages 2-5, you're giving someone the essence of the document 
                            without making them wade through everything. It shows respect for their time 
                            while still providing what they need.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="space-y-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
                    <HelpCircle
                      className="w-7 h-7 mr-3 text-purple-500"
                      aria-hidden="true"
                    />
                    Questions People Actually Ask
                  </h2>

                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Why would I need just pages 2-5 from a PDF?
                      </h3>
                      <div className="text-gray-700">
                        Think about the last time you opened a long document. The first page was probably 
                        just a cover or title page, right? The actual content you needed started on page 2. 
                        Pages 2-5 often contain the introduction, executive summary, or the first important 
                        section. You don't always need the whole document—just the part that matters right now.
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        What if I need different pages, like 3-7 or 10-15?
                      </h3>
                      <div className="text-gray-700">
                        Same process, different numbers. The reason "pages 2-5" is so common is that 
                        many documents are structured similarly. But you can extract any pages you want. 
                        Maybe you need pages 10-15 for a specific chapter, or pages 3-7 for a particular 
                        section. The tool doesn't care—it just gives you whatever pages you select.
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Does extracting pages 2-5 change the original PDF?
                      </h3>
                      <div className="text-gray-700">
                        No, not at all. Your original PDF stays exactly as it was. The extraction creates 
                        a completely new file with just the pages you selected. It's like making photocopies 
                        of specific pages from a book—the original book remains on the shelf, untouched.
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Can I extract non-consecutive pages, like pages 2, 5, and 7?
                      </h3>
                      <div className="text-gray-700">
                        Yes, most tools let you pick whatever pages you want. Click page 2, then page 5, 
                        then page 7. They don't have to be in order or consecutive. Sometimes you just need 
                        the introduction (page 2) and the conclusion (page 5), skipping the middle details.
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Is this useful for sharing files on WhatsApp or email?
                      </h3>
                      <div className="text-gray-700">
                        Incredibly useful. Instead of making someone download a huge PDF on their phone, 
                        you send them just the 4 pages they actually need. The file is smaller, loads faster, 
                        and they don't have to scroll through pages they don't care about. It's just more 
                        considerate and efficient.
                      </div>
                    </div>
                  </div>
                </section>

                {/* Conclusion */}
                <section className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Final Thoughts from Experience
                  </h2>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8">
                    <div className="space-y-4">
                      <p className="text-gray-800">
                        Here's what I've learned from extracting PDF pages for myself and helping others do it:
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Most people don't need entire documents</strong>—they just need specific parts. 
                            Recognizing this saves everyone time and frustration.
                          </span>
                        </div>
                        
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Pages 2-5 is a pattern that makes sense</strong> once you notice how documents 
                            are structured. It's not random—it's where the actual content usually begins.
                          </span>
                        </div>
                        
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>The process is simpler than people think</strong>. If you can select files 
                            and click buttons, you can extract PDF pages. It looks more technical than it actually is.
                          </span>
                        </div>
                        
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>It becomes a habit once you start</strong>. After you extract pages a few times, 
                            you'll find yourself doing it automatically when you only need part of a document.
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-blue-200">
                        <p className="text-gray-700">
                          The next time you have a PDF and only need part of it, try extracting just the pages 
                          you actually need. Start with pages 2-5 if that's where the content begins. 
                          You'll end up with a smaller, more focused file that's easier to share, print, and use.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Try It Yourself CTA */}
              <div className="mt-12 pt-10 border-t border-gray-200">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-center text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Try Extracting Pages Yourself
                  </h3>
                  <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                    The best way to understand this is to try it with one of your own PDFs. 
                    See how much easier it is to work with just the pages you need.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/extract-pages"
                      className="inline-flex items-center justify-center px-7 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                      aria-label="Try PDF Page Extraction"
                    >
                      <Scissors
                        className="w-6 h-6 mr-3"
                        aria-hidden="true"
                      />
                      Extract PDF Pages Now
                    </Link>
                    <Link
                      href="/blog"
                      className="inline-flex items-center justify-center px-7 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300"
                      aria-label="Read More PDF Guides"
                    >
                      <BookOpen
                        className="w-6 h-6 mr-3"
                        aria-hidden="true"
                      />
                      More PDF Guides
                    </Link>
                  </div>
                  <p className="mt-6 text-blue-200 text-sm">
                    <Shield className="w-4 h-4 inline mr-2" />
                    Your files stay in your browser • No uploads to servers • Completely free
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