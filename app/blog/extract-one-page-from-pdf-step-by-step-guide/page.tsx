import Link from "next/link";
import BlogToolsSection from "@/app/components/BlogToolsSection";
import {
  CalendarDays,
  Clock,
  CheckCircle,
  ChevronRight,
  HelpCircle,
  Shield,
  FileText,
  Smartphone,
  Download,
  Scissors,
  Image as ImageIcon,
  Eye,
  Zap,
  Lock
} from "lucide-react";

export const metadata = {
  title: "How to Extract One Page from PDF (Step-by-Step Guide) 2026 | PDFSwift",
  description: "Learn how to extract a single page from any PDF file – free, no signup, 100% private. Step-by-step guide using PDFSwift. Works on iPhone, Android, and desktop.",
  keywords: "extract one page from pdf, extract a page from pdf, how to extract a page from pdf, pdf page extractor, remove page from pdf, save one page of pdf",
  openGraph: {
    type: "article",
    url: "https://www.pdfswift.online/blog/extract-one-page-from-pdf-step-by-step-guide",
    title: "How to Extract One Page from PDF (Step-by-Step Guide) 2026",
    description: "Learn how to extract a single page from any PDF file – free, no signup, 100% private. Step-by-step guide using PDFSwift.",
    siteName: "PDFSwift",
    locale: "en_US",
    publishedTime: "2026-03-10T08:00:00+00:00",
    authors: ["PDFSwift Team"],
    tags: ["extract pdf page", "pdf page extractor", "2026 guide"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Extract One Page from PDF (Step-by-Step Guide) 2026",
    description: "Learn how to extract a single page from any PDF file – free, no signup, 100% private.",
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
    canonical: "/blog/extract-one-page-from-pdf-step-by-step-guide",
  },
  category: "PDF Guide",
  other: {
    "article:published_time": "2026-03-10T08:00:00+00:00",
    "article:modified_time": "2026-03-10T08:00:00+00:00",
    "article:section": "PDF Guide",
    "article:tag": ["extract pdf page", "pdf page extractor"],
  },
};

export default function ExtractOnePagePDF() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://www.pdfswift.online/blog/extract-one-page-from-pdf-step-by-step-guide#article",
        headline: "How to Extract One Page from PDF (Step-by-Step Guide) 2026",
        description: "Learn how to extract a single page from any PDF file – free, no signup, 100% private. Step-by-step guide using PDFSwift.",
        datePublished: "2026-03-10T08:00:00+00:00",
        dateModified: "2026-03-10T08:00:00+00:00",
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
          "@id": "https://www.pdfswift.online/blog/extract-one-page-from-pdf-step-by-step-guide",
        },
        wordCount: 1200,
        timeRequired: "PT5M",
        articleSection: "PDF Guide",
        articleBody: `Complete guide to extracting a single page from any PDF file using PDFSwift. Free, private, works on all devices.`,
        keywords: "extract one page from pdf, extract a page from pdf, how to extract a page from pdf",
        thumbnailUrl: "https://www.pdfswift.online/images/extract-one-page-pdf-guide.png",
       
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.pdfswift.online/blog/extract-one-page-from-pdf-step-by-step-guide#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "How do I extract one page from a PDF for free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use PDFSwift Extract Pages tool – it's completely free. Upload your PDF, enter the page number, click extract, and download your single page as a new PDF.",
            },
          },
          {
            "@type": "Question",
            name: "Is it safe to extract pages from PDF online?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "With PDFSwift, yes – 100% safe. PDFSwift processes files locally in your browser – they never leave your device. No servers, no uploads, complete privacy.",
            },
          },
          {
            "@type": "Question",
            name: "Can I extract pages from a password-protected PDF?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. When you upload a password-protected PDF, PDFSwift will prompt you to enter the password. Once unlocked, you can extract pages normally.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.pdfswift.online/blog/extract-one-page-from-pdf-step-by-step-guide#breadcrumb",
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
            name: "Extract One Page",
            item: "https://www.pdfswift.online/blog/extract-one-page-from-pdf-step-by-step-guide",
          },
        ],
      },
    ],
  };

  const methods = [
    {
      method: "Extract by Page Number",
      description: "Enter specific page number (e.g., 1, 5, 10) to extract that page",
      bestFor: "When you know exactly which page you need",
      example: "Extract page 5 from a 20-page contract"
    },
    {
      method: "Extract by Thumbnail Selection",
      description: "View all pages as thumbnails, click to select the page you want",
      bestFor: "When you need to visually identify the page",
      example: "Find the signature page in a scanned document"
    },
    {
      method: "Extract Multiple Pages as Separate Files",
      description: "Select multiple pages (hold Ctrl/Cmd) to extract each as separate PDFs",
      bestFor: "When you need several individual pages",
      example: "Extract pages 1, 5, and 10 as three separate files"
    },
    {
      method: "Extract Page Range",
      description: "Specify range like '5-5' to extract just page 5, or '1-3' for multiple pages in one file",
      bestFor: "When you want multiple pages combined in one file",
      example: "Extract pages 1-3 as a single PDF"
    }
  ];

  const useCases = [
    {
      scenario: "Extract signature page from contract",
      explanation: "You signed page 10 of a 20-page contract – extract just that page to email"
    },
    {
      scenario: "Get one page from scanned book",
      explanation: "You scanned a book and need only one specific chapter or page"
    },
    {
      scenario: "Extract receipt from statement",
      explanation: "Your bank statement has 10 pages, but you only need the transaction page"
    },
    {
      scenario: "Save one slide from presentation",
      explanation: "PDF presentation has 50 slides, you need only slide 25 for a meeting"
    },
    {
      scenario: "Extract certificate from marksheet",
      explanation: "You have combined marksheet PDF, need only the final certificate page"
    }
  ];

  const commonQuestions = [
    {
      question: "Can I extract just one page from a PDF for free?",
      answer: "Yes, completely free with PDFSwift. No signup, no hidden charges. Extract as many pages as you want from any PDF."
    },
    {
      question: "Will extracting a page affect the original PDF?",
      answer: "No. PDFSwift creates a new PDF file with the extracted page. Your original file remains untouched."
    },
    {
      question: "Is PDFSwift safe for my documents?",
      answer: "100% safe. PDFSwift processes files locally in your browser – they never leave your device. No upload, no servers, no third-party access."
    },
    {
      question: "Can I extract pages on my phone?",
      answer: "Yes! PDFSwift works perfectly on iPhone and Android. Open Safari (iPhone) or Chrome (Android), go to PDFSwift, and extract pages instantly."
    },
    {
      question: "What if my PDF is password protected?",
      answer: "PDFSwift supports password-protected PDFs. Enter the password when prompted, then extract pages normally."
    }
  ];

  const pdfswiftTools = [
    {
      tool: "PDFSwift Extract Pages",
      whatItDoes: "Extract one or more pages from any PDF file",
      privacy: "100% private – files stay in browser",
      bestFor: "Getting specific pages as new PDF files"
    },
    {
      tool: "PDFSwift Split PDF",
      whatItDoes: "Split PDF into multiple files by page ranges",
      privacy: "100% private – no upload",
      bestFor: "Splitting large PDFs into chapters"
    },
    {
      tool: "PDFSwift Delete Pages",
      whatItDoes: "Remove unwanted pages from PDF",
      privacy: "100% private – no upload",
      bestFor: "Cleaning up documents by removing extra pages"
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
                  Extract One Page from PDF
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
                    PDF Guide
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                    March 10, 2026
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                    Extract Pages
                  </span>
                </div>

                {/* Target Queries */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">extract one page from pdf</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">extract a page from pdf</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">how to extract a page from pdf</span>
                </div>

                {/* Main Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                  How to Extract One Page from PDF
                  <br />
                  <span className="text-2xl md:text-3xl lg:text-4xl text-blue-600">
                    (Step-by-Step Guide) 2026
                  </span>
                </h1>

                {/* Date and Reading Time */}
                <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-4">
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 mr-2 text-gray-500" />
                    <time dateTime="2026-03-10">March 10, 2026</time>
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
                        Need only one page from a 50-page PDF? Don't send the whole file.
                      </p>
                      <p className="text-gray-700">
                        Whether it's a signature page from a contract, one slide from a presentation, or a single receipt from a bank statement – extracting just the page you need is quick and easy. With <span className="font-bold text-blue-600">PDFSwift</span>, you can extract any page in seconds, for free, and completely private.
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
                    ⚡ Quick Steps: Extract One Page with PDFSwift
                  </h2>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">1</div>
                        <div>
                          <span className="text-gray-700">Open <span className="font-bold text-blue-600">PDFSwift Extract Pages</span> tool (no signup needed)</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">2</div>
                        <div>
                          <span className="text-gray-700">Upload your PDF file – drag & drop or click to select (<span className="font-semibold">file stays in your browser</span>)</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">3</div>
                        <div>
                          <span className="text-gray-700">Enter the page number you want to extract (e.g., 5 for page 5)</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">4</div>
                        <div>
                          <span className="text-gray-700">Or select the page from thumbnail view</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">5</div>
                        <div>
                          <span className="text-gray-700">Click <span className="font-bold">'Extract'</span> – processes instantly in your browser</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">6</div>
                        <div>
                          <span className="text-gray-700">Download your extracted page as a new PDF file</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">7</div>
                        <div>
                          <span className="text-gray-700">Save to your device or share directly</span>
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

                {/* Methods */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🔧 Different Ways to Extract a Page
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {methods.map((item, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl p-5 hover:border-blue-200 transition">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{item.method}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <p className="text-sm text-gray-600"><span className="font-semibold">Best for:</span> {item.bestFor}</p>
                        <p className="text-sm text-gray-500 bg-gray-50 p-2 rounded mt-2"><span className="font-semibold">Example:</span> {item.example}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Common Use Cases */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    📋 When You Need to Extract One Page
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {useCases.map((item, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl p-5 hover:border-green-200 transition">
                        <h3 className="font-bold text-gray-900 mb-2">{item.scenario}</h3>
                        <p className="text-sm text-gray-600">{item.explanation}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* PDFSwift Tools */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🛠️ PDFSwift Tools for Page Extraction
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {pdfswiftTools.map((item, idx) => (
                      <div key={idx} className="border border-blue-200 rounded-xl p-5 bg-blue-50">
                        <h3 className="font-bold text-lg text-blue-700 mb-2">{item.tool}</h3>
                        <p className="text-sm text-gray-700 mb-2">{item.whatItDoes}</p>
                        <p className="text-xs text-green-600 font-medium mb-2">{item.privacy}</p>
                        <p className="text-xs text-gray-500"><span className="font-semibold">Best for:</span> {item.bestFor}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Password Protected PDFs */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🔒 Extracting Pages from Password-Protected PDFs
                  </h2>
                  
                  <div className="border border-amber-200 rounded-xl p-6 bg-amber-50">
                    <div className="flex items-start">
                      <Lock className="w-6 h-6 text-amber-600 mr-3 mt-0.5" />
                      <div>
                        <p className="text-gray-700 mb-3">
                          PDFSwift fully supports password-protected PDFs. Here's how it works:
                        </p>
                        
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm">Upload your password-protected PDF</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm">Enter the password when prompted</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm">PDFSwift unlocks the file locally in your browser</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm">Extract pages normally – password is never sent anywhere</span>
                          </li>
                        </ul>
                        
                        <p className="text-sm text-amber-700 mt-3">
                          Note: You need the password to extract pages. PDFSwift cannot bypass passwords.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Privacy First */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🔒 Privacy First: Your Documents Stay Private
                  </h2>
                  
                  <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
                    <div className="flex items-start">
                      <Shield className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <p className="text-gray-700 mb-3">
                          Unlike other online PDF tools that upload your files to their servers, PDFSwift works differently:
                        </p>
                        
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm"><span className="font-bold">100% local processing:</span> Files never leave your device</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm"><span className="font-bold">No upload:</span> Your PDF stays in your browser</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm"><span className="font-bold">No servers:</span> We never see your documents</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm"><span className="font-bold">Perfect for:</span> Contracts, IDs, personal documents</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Mobile Support */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    📱 Works on All Devices
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-blue-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-blue-700 mb-2">iPhone / iPad</h3>
                      <p className="text-sm text-gray-700">Open Safari, go to PDFSwift, upload PDF from Files or iCloud, extract pages instantly. No app needed.</p>
                    </div>
                    
                    <div className="border border-green-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-green-700 mb-2">Android</h3>
                      <p className="text-sm text-gray-700">Open Chrome, visit PDFSwift, select PDF from storage, extract pages. 100% private, no installation.</p>
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
                        How do I extract one page from a PDF for free?
                      </h3>
                      <p className="text-gray-700">
                        Use <span className="font-bold text-blue-600">PDFSwift Extract Pages</span> tool – it's completely free. Upload your PDF, enter the page number (like 5), click extract, and download your single page as a new PDF. No signup, no hidden charges. Works on any device.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Can I extract a specific page from a large PDF?
                      </h3>
                      <p className="text-gray-700">
                        Yes, absolutely. Whether your PDF has 10 pages or 1000 pages, PDFSwift lets you extract any single page by entering its number. Perfect for contracts, reports, or scanned documents. You can also browse thumbnails to visually find the page you need.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Is it safe to extract pages from PDF online?
                      </h3>
                      <p className="text-gray-700">
                        With PDFSwift, yes – <span className="font-bold">100% safe</span>. Unlike other online tools that upload your files to their servers, PDFSwift processes everything locally in your browser. Your files never leave your device. No servers, no uploads, complete privacy. Perfect for sensitive documents like contracts and IDs.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        What if I don't know the page number?
                      </h3>
                      <p className="text-gray-700">
                        PDFSwift shows <span className="font-bold">thumbnail previews</span> of all pages. You can scroll through and visually find the page you need, then click to select it. Perfect for scanned documents or when you need to identify pages by content rather than numbers.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Can I extract multiple pages as separate files?
                      </h3>
                      <p className="text-gray-700">
                        Yes. Hold <span className="font-bold">Ctrl (Windows) or Cmd (Mac)</span> while clicking multiple thumbnails, then extract. Each selected page becomes its own PDF file, downloaded as a ZIP archive. Great for extracting several individual pages from a large document.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Will the quality of the extracted page be reduced?
                      </h3>
                      <p className="text-gray-700">
                        No. PDFSwift extracts pages without any compression or quality loss. The extracted page is identical in quality to the original PDF. Text stays sharp, images remain clear, and formatting is preserved exactly.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Can I extract pages from a password-protected PDF?
                      </h3>
                      <p className="text-gray-700">
                        Yes. When you upload a password-protected PDF, PDFSwift will prompt you to enter the password. Once unlocked, you can extract pages normally. Your password is never sent anywhere – it stays in your browser. You need the password to proceed.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Do I need to install any software?
                      </h3>
                      <p className="text-gray-700">
                        No installation needed. PDFSwift works entirely in your web browser. Just open the website, upload your PDF, and extract pages. Works on Windows, Mac, Linux, iPhone, and Android – no apps, no downloads, no signup.
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
                        <span><span className="font-bold">Extract by number:</span> Enter page number (1, 5, 10) for exact page</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Visual selection:</span> Browse thumbnails to find your page</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Multiple pages:</span> Hold Ctrl/Cmd to select several</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Password protected:</span> Enter password to unlock</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">100% private:</span> Files stay in your browser – no upload</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Free forever:</span> No signup, no limits</span>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>

              {/* CTA */}
              <div className="mt-12 pt-10 border-t border-gray-200">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Extract One Page from Your PDF Now
                  </h3>
                  <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                    Free, private, and works in seconds. No signup, no upload – your files stay in your browser. Perfect for contracts, receipts, certificates, and more.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/extract-pages"
                      className="inline-flex items-center justify-center px-7 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300"
                    >
                      Extract Page – Free
                    </Link>
                    <Link
                      href="/split-pdf"
                      className="inline-flex items-center justify-center px-7 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300"
                    >
                      Split PDF Tool
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