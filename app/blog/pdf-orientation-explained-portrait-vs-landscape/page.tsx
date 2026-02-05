// app/blog/pdf-orientation-explained-portrait-vs-landscape/page.tsx

import {
  CalendarDays,
  Clock,
  CheckCircle,
  FileText,
  Download,
  ChevronRight,
  HelpCircle,
  Shield,
  BookOpen,
  Eye,
  RefreshCw,
  Grid,
  FileStack,
  Merge,
  RotateCw,
  Search,
  Filter,
  LayoutGrid,
  Move,
  GripVertical,
  Smartphone,
  Printer,
  Tablet,
  Monitor,
  Camera,
  Image,
  Film,
  Presentation,
  ChartBar,
  Table,
  FileSpreadsheet,
  FileImage,
  Scan,
  Mail,
  Smartphone as Mobile,
  Laptop,
  Expand,
 
  ArrowLeftRight,
  ArrowUpDown,
  Maximize2,
  Minus,
  Plus,
  Zap,
  AlertCircle,
  Info,
  Lightbulb,
  Wand2,
  Settings,
  User,
  Users,
  Briefcase,
  Home,
  School,
  Building,
  FileQuestion,
  FileCheck,
  FileX,
  FileWarning,
} from "lucide-react";
import Link from "next/link";
import BlogToolsSection from "@/app/components/BlogToolsSection";

export const metadata = {
  title: "PDF Orientation Explained: Portrait vs Landscape – When to Use Each | PDFSwift",
  description: "Practical guide explaining when to use portrait vs landscape orientation in PDFs. Learn from real-world examples and common mistakes to make your documents look right every time.",
  keywords: "PDF orientation, portrait vs landscape, PDF layout, document orientation, PDF formatting, landscape PDF, portrait PDF",
  openGraph: {
    type: "article",
    url: "https://www.pdfswift.online/blog/pdf-orientation-explained-portrait-vs-landscape",
    title: "PDF Orientation Explained: Portrait vs Landscape – When to Use Each",
    description: "Practical guide explaining portrait vs landscape orientation in PDFs with real-world examples and common mistakes.",
    images: [
      {
        url: "https://www.pdfswift.online/images/pdf-orientation-guide.png",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "PDFSwift",
    locale: "en_US",
    publishedTime: "2026-02-05T08:00:00+00:00",
    authors: ["PDFSwift Team"],
    tags: ["PDF orientation", "portrait vs landscape", "document formatting", "PDF layout"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Orientation Explained: Portrait vs Landscape – When to Use Each",
    description: "Practical guide explaining when to use portrait vs landscape orientation in PDFs.",
    images: ["https://www.pdfswift.online/images/pdf-orientation-guide.png"],
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
    canonical: "/blog/pdf-orientation-explained-portrait-vs-landscape",
  },
  category: "How-to Guide",
  other: {
    "article:published_time": "2026-02-05T08:00:00+00:00",
    "article:modified_time": "2026-02-05T08:00:00+00:00",
    "article:section": "How-to Guide",
    "article:tag": ["PDF orientation", "portrait", "landscape", "document formatting", "how-to guide"],
  },
};

export default function PDFOrientationExplained() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://www.pdfswift.online/blog/pdf-orientation-explained-portrait-vs-landscape#article",
        headline: "PDF Orientation Explained: Portrait vs Landscape – When to Use Each",
        description: "Practical guide explaining portrait vs landscape orientation in PDFs with real-world examples, common mistakes, and simple guidelines for everyday use.",
        datePublished: "2026-02-05T08:00:00+00:00",
        dateModified: "2026-02-05T08:00:00+00:00",
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
          "@id": "https://www.pdfswift.online/blog/pdf-orientation-explained-portrait-vs-landscape",
        },
        wordCount: 1200,
        timeRequired: "PT8M",
        articleSection: "How-to Guide",
        articleBody: `Practical guide explaining portrait vs landscape orientation in PDFs with real-world examples, common mistakes, and simple guidelines for when to use each orientation.`,
        keywords: "PDF orientation, portrait vs landscape, PDF layout, document orientation, PDF formatting",
        thumbnailUrl: "https://www.pdfswift.online/images/pdf-orientation-guide.png",
        image: {
          "@type": "ImageObject",
          url: "https://www.pdfswift.online/images/pdf-orientation-guide.png",
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.pdfswift.online/blog/pdf-orientation-explained-portrait-vs-landscape#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What's the main difference between portrait and landscape?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Portrait is taller than wide (like a standing phone), landscape is wider than tall (like a turned phone). Portrait works better for reading text, landscape works better for wide content like spreadsheets or photos.",
            },
          },
          {
            "@type": "Question",
            name: "Will changing orientation affect my PDF quality?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Not at all. Changing orientation just rotates how the content is displayed. All your text, images, and formatting stay exactly the same quality—they're just arranged differently on the page.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if I choose the wrong orientation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The content gets cut off when printing, or looks awkward on screen. Text might wrap strangely, images get squeezed, and people have to zoom and scroll more than they should. It's annoying but easy to fix.",
            },
          },
          {
            "@type": "Question",
            name: "Can I have both orientations in one PDF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, and this is something more people should use. You can have some pages in portrait and others in landscape within the same PDF. Great for reports that mix text pages with wide charts.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.pdfswift.online/blog/pdf-orientation-explained-portrait-vs-landscape#breadcrumb",
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
            name: "PDF Orientation Explained",
            item: "https://www.pdfswift.online/blog/pdf-orientation-explained-portrait-vs-landscape",
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
                  PDF Orientation Explained
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
                    <LayoutGrid className="w-4 h-4 mr-2" aria-hidden="true" />{" "}
                    Practical Guide
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                    <CalendarDays className="w-4 h-4 mr-2" aria-hidden="true" />{" "}
                    February 4, 2026
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                    <Settings className="w-4 h-4 mr-2" aria-hidden="true" />{" "}
                    Document Setup
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight tracking-tight">
                  PDF Orientation Explained:
                  <br />
                  <span className="text-2xl md:text-3xl lg:text-4xl text-blue-600">
                    Portrait vs Landscape (When to Use Each)
                  </span>
                </h1>

                {/* Date and Reading Time */}
                <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-4">
                  <div className="flex items-center">
                    <CalendarDays
                      className="w-5 h-5 mr-2 text-gray-500"
                      aria-hidden="true"
                    />
                    <time dateTime="2026-02-04" className="font-medium">
                      February 5, 2026
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
                    <span className="font-medium">Simple visual guide</span>
                  </div>
                </div>

                {/* Introduction */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-100 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                  <div className="flex items-start">
                    <Smartphone
                      className="w-7 h-7 text-blue-600 mr-4 mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-gray-800 font-bold text-lg mb-3">
                        Let me tell you about a problem you've probably had
                      </p>
                      <p className="text-gray-700">
                        You open a PDF and suddenly you're tilting your head like a confused puppy. 
                        Or you try to print something and half the spreadsheet gets cut off. 
                        Or you're sharing a document on WhatsApp and everyone has to zoom and scroll 
                        sideways to read it. I've been there too. The problem is almost always one 
                        simple thing: wrong orientation.
                      </p>
                    </div>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div className="space-y-10">
                {/* The Simple Explanation */}
                <section className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    What Portrait and Landscape Actually Mean in Real Life
                  </h2>

                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="w-16 h-24 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 border-2 border-blue-300">
                          <User className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-blue-700 text-xl mb-3 text-center">
                          Portrait
                        </h3>
                        <p className="text-gray-700 mb-3">
                          <strong>Taller than wide</strong> – like a person standing up straight.
                        </p>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <ArrowUpDown className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Think: phone held normally</span>
                          </li>
                          <li className="flex items-start">
                            <FileText className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>How most books and letters are shaped</span>
                          </li>
                          <li className="flex items-start">
                            <Eye className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Natural for reading text line by line</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="w-24 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 border-2 border-green-300">
                          <Image className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="font-bold text-green-700 text-xl mb-3 text-center">
                          Landscape
                        </h3>
                        <p className="text-gray-700 mb-3">
                          <strong>Wider than tall</strong> – like a scenic view or movie screen.
                        </p>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <ArrowLeftRight className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Think: phone turned sideways for video</span>
                          </li>
                          <li className="flex items-start">
                            <Table className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>How most spreadsheets and tables work</span>
                          </li>
                          <li className="flex items-start">
                            <Expand className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Fits wide content without squeezing</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-start">
                        <Lightbulb className="w-6 h-6 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-800">
                            <strong>Here's an easy way to remember:</strong> Hold up a sheet of paper normally. 
                            That's portrait. Now rotate it 90 degrees. That's landscape. It's the same paper, 
                            just oriented differently. And that's exactly what happens with PDFs.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* When to Use Each */}
                <section className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    When to Use Portrait – The Everyday Choice
                  </h2>

                  <div className="space-y-4">
                    <div className="border border-blue-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Letters, Reports, and Documents Meant to Be Read
                          </h3>
                          <p className="text-gray-700">
                            This is where portrait shines. Think about how your eyes move when reading. 
                            They go left to right, then drop down to the next line. Portrait orientation 
                            matches this natural reading flow. Most novels, business letters, academic 
                            papers, and contracts work perfectly in portrait because they're designed 
                            for sequential reading.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-blue-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <Printer className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Anything You Plan to Print and File
                          </h3>
                          <p className="text-gray-700">
                            Most filing cabinets, binders, and folders are designed for portrait-oriented 
                            pages. If you're printing something that needs to go in a standard folder or 
                            be hole-punched for a binder, portrait is usually the right choice. It just 
                            fits better with how we physically organize paper.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-blue-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <Mobile className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Mobile Reading
                          </h3>
                          <p className="text-gray-700">
                            When people read on phones, they usually hold them vertically. Portrait PDFs 
                            work naturally with this. No zooming sideways, no awkward scrolling. The text 
                            flows in a single column that fits the screen. If you're sharing something 
                            you know people will read on their phones, portrait often works better.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* When to Use Landscape */}
                <section className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    When to Use Landscape – The Wide-Content Choice
                  </h2>

                  <div className="space-y-4">
                    <div className="border border-green-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <Table className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Spreadsheets, Tables, and Charts
                          </h3>
                          <p className="text-gray-700">
                            This is the classic landscape situation. Spreadsheets have many columns. 
                            Financial reports have wide tables. Timeline charts stretch horizontally. 
                            Trying to squeeze these into portrait often means tiny text, awkward breaks, 
                            or multiple pages. Landscape lets the content breathe and makes everything 
                            readable at a glance.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-green-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <Presentation className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Presentations and Slides
                          </h3>
                          <p className="text-gray-700">
                            Most presentation software defaults to landscape, and for good reason. 
                            Screens, projectors, and monitors are wider than they are tall. Slides 
                            often have side-by-side content: text next to an image, two charts 
                            compared, bullet points with accompanying visuals. Landscape accommodates 
                            this natural layout.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-green-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <Image className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Photos, Scans, and Visual Materials
                          </h3>
                          <p className="text-gray-700">
                            Many photos are taken in landscape orientation, especially group photos, 
                            landscapes (obviously), and event shots. Old documents or blueprints 
                            scanned might be wider than they are tall. Architectural drawings, 
                            engineering schematics, musical scores—these often work better in 
                            landscape to preserve their original proportions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Common Mistakes Section */}
                <section className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Common Mistakes I See All the Time
                  </h2>

                  <div className="space-y-6">
                    <div className="border border-red-200 bg-red-50 rounded-xl p-6">
                      <div className="flex items-start">
                        <AlertCircle className="w-7 h-7 text-red-600 mr-4 flex-shrink-0" />
                        <div>
                          <h3 className="text-xl font-bold text-red-700 mb-3">
                            The Spreadsheet Squeeze
                          </h3>
                          <p className="text-red-800 mb-3">
                            Someone exports a wide spreadsheet to PDF in portrait orientation. 
                            The result? Tiny text, columns that run into each other, or the 
                            spreadsheet gets split across multiple pages in confusing ways. 
                            The person receiving it has to zoom to 200% just to read anything.
                          </p>
                          <div className="bg-white p-4 rounded-lg border border-red-200">
                            <p className="text-sm text-gray-700">
                              <strong>What to do instead:</strong> Before creating the PDF, 
                              check if your content is wider than it is tall. If you have more 
                              columns than will comfortably fit, switch to landscape. Your 
                              readers will thank you.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border border-yellow-200 bg-yellow-50 rounded-xl p-6">
                      <div className="flex items-start">
                        <FileWarning className="w-7 h-7 text-yellow-600 mr-4 flex-shrink-0" />
                        <div>
                          <h3 className="text-xl font-bold text-yellow-700 mb-3">
                            The Scanned Document Flip
                          </h3>
                          <p className="text-yellow-800 mb-3">
                            Someone scans a document that's naturally wide (like a blueprint 
                            or a table), but the scanner software defaults to portrait. The 
                            scanned image gets rotated, so everyone has to turn their heads 
                            or rotate their screens to view it properly. It's awkward and 
                            looks unprofessional.
                          </p>
                          <div className="bg-white p-4 rounded-lg border border-yellow-200">
                            <p className="text-sm text-gray-700">
                              <strong>What to do instead:</strong> Look at the original document 
                              before scanning. If it's wider than it is tall, set your scanner 
                              to landscape. Most scanning software has this option right there 
                              in the settings.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border border-blue-200 bg-blue-50 rounded-xl p-6">
                      <div className="flex items-start">
                        <Info className="w-7 h-7 text-blue-600 mr-4 flex-shrink-0" />
                        <div>
                          <h3 className="text-xl font-bold text-blue-700 mb-3">
                            The Mixed Document Problem
                          </h3>
                          <p className="text-blue-800 mb-3">
                            A report has mostly text pages (which should be portrait) but also 
                            contains wide charts (which should be landscape). People often 
                            choose one orientation for the whole document, making either the 
                            text pages awkwardly wide or the charts cramped and tiny.
                          </p>
                          <div className="bg-white p-4 rounded-lg border border-blue-200">
                            <p className="text-sm text-gray-700">
                              <strong>What to do instead:</strong> You can have mixed orientations 
                              in one PDF! Create the text pages in portrait, the chart pages in 
                              landscape. Good PDF tools let you set orientation per page. The 
                              final document will flow much better.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* How to Choose */}
                <section className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Simple Rule of Thumb: How to Choose
                  </h2>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                            <ArrowUpDown className="w-6 h-6 text-blue-600" />
                          </div>
                          <h3 className="text-xl font-bold text-blue-700">
                            Choose Portrait When...
                          </h3>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                            <span>You have mostly text to read line by line</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                            <span>You're printing for standard folders or binders</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                            <span>People will likely view it on phones</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                            <span>It's a formal letter, contract, or report</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                            <ArrowLeftRight className="w-6 h-6 text-green-600" />
                          </div>
                          <h3 className="text-xl font-bold text-green-700">
                            Choose Landscape When...
                          </h3>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                            <span>You have wide tables, spreadsheets, or charts</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                            <span>You're creating presentation slides</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                            <span>You have photos or scans that are naturally wide</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                            <span>Content needs to be viewed side-by-side</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-green-200">
                      <div className="flex items-start">
                        <Wand2 className="w-6 h-6 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-800">
                            <strong>My quick check:</strong> Before I save or export anything as a PDF, 
                            I look at it on screen. If I find myself scrolling sideways to see everything, 
                            I switch to landscape. If the content looks lost in too much horizontal space, 
                            I switch to portrait. It's that simple.
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
                    Questions People Actually Ask About PDF Orientation
                  </h2>

                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        What's the main difference between portrait and landscape?
                      </h3>
                      <div className="text-gray-700">
                        Portrait is taller than it is wide – like holding your phone normally to read 
                        a message. Landscape is wider than it is tall – like turning your phone sideways 
                        to watch a video. In practice, portrait works better for reading text line by 
                        line, while landscape works better for wide content like spreadsheets or photos.
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Will changing orientation affect my PDF quality?
                      </h3>
                      <div className="text-gray-700">
                        Not at all. Changing orientation just rotates how the content is displayed. 
                        All your text, images, and formatting stay exactly the same quality – they're 
                        just arranged differently on the page. It's like turning a painting on the wall: 
                        the painting doesn't change, just which way it faces.
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        What happens if I choose the wrong orientation?
                      </h3>
                      <div className="text-gray-700">
                        The content gets cut off when printing, or looks awkward on screen. Text might 
                        wrap strangely, images get squeezed, and people have to zoom and scroll more 
                        than they should. It's annoying but easy to fix. Most PDF tools let you rotate 
                        pages or change orientation after the fact.
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Can I have both orientations in one PDF?
                      </h3>
                      <div className="text-gray-700">
                        Yes, and this is something more people should use. You can have some pages in 
                        portrait and others in landscape within the same PDF. This is perfect for reports 
                        that mix text pages (portrait) with wide charts (landscape). The document flows 
                        naturally and each page shows its content in the best possible way.
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Does orientation matter for digital viewing?
                      </h3>
                      <div className="text-gray-700">
                        It matters more than people think. On phones, portrait orientation usually works 
                        better because that's how people hold their devices. On computers and tablets, 
                        it depends on the content. Wide tables need landscape even on screens. The key 
                        is to think about how people will actually view the document, not just how it 
                        prints.
                      </div>
                    </div>
                  </div>
                </section>

                {/* What I've Learned */}
                <section className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    What I've Learned From Fixing Orientation Issues
                  </h2>

                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-8">
                    <div className="space-y-4">
                      <p className="text-gray-800">
                        After helping countless people with orientation problems, here's what stands out:
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Most people default to portrait without thinking.</strong> 
                            Software often starts with portrait, so we just go with it. But taking 
                            two seconds to consider the content can make a huge difference.
                          </span>
                        </div>
                        
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Spreadsheets and tables are the biggest culprits.</strong> 
                            If I had a dollar for every squeezed spreadsheet I've seen... Well, 
                            let's just say landscape exists for a reason.
                          </span>
                        </div>
                        
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Mixed documents are more common than people realize.</strong> 
                            That report with both text and charts? It deserves both orientations. 
                            Don't force everything into one shape.
                          </span>
                        </div>
                        
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Orientation affects digital viewing as much as printing.</strong> 
                            Think about how people will actually look at the document – on phones, 
                            tablets, computers – not just how it comes out of a printer.
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-gray-700">
                          Next time you're creating or saving a PDF, pause for just a moment. Look at your 
                          content. Is it taller than wide? Go portrait. Wider than tall? Go landscape. 
                          Mix of both? Use both. It's one of those small adjustments that makes your 
                          documents immediately more professional and usable.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Try It Yourself CTA */}
              <div className="mt-12 pt-10 border-t border-gray-200">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Try Adjusting PDF Orientation Yourself
                  </h3>
                  <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                    The best way to understand orientation is to try it with one of your own documents. 
                    Rotate pages, mix orientations, and see how it affects readability.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/rotate-pdf"
                      className="inline-flex items-center justify-center px-7 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                      aria-label="Rotate PDF Pages"
                    >
                      <RotateCw
                        className="w-6 h-6 mr-3"
                        aria-hidden="true"
                      />
                      Rotate PDF Pages Now
                    </Link>
                    <Link
                      href="/blog"
                      className="inline-flex items-center justify-center px-7 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300"
                      aria-label="Read More Guides"
                    >
                      <BookOpen
                        className="w-6 h-6 mr-3"
                        aria-hidden="true"
                      />
                      More Practical Guides
                    </Link>
                  </div>
                  <p className="mt-6 text-blue-200 text-sm">
                    <Shield className="w-4 h-4 inline mr-2" />
                    Your files stay in your browser • No uploads to servers • Free to use
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