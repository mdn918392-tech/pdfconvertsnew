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
  Mail,
  Upload,
  Split
} from "lucide-react";

export const metadata = {
  title: "Split PDF for Upload Limits (One Page One PDF) – 2026 Guide | PDFSwift",
  description: "Need to split a PDF into single pages to meet upload limits? Here's how to split one PDF into multiple files for government forms, email attachments, and job portals.",
  keywords: "split pdf, separate pdf pages, pdf splitter, split pdf into multiple files, extract pages from pdf, one page one pdf, pdf for upload limits",
  openGraph: {
    type: "article",
    url: "https://www.pdfswift.online/blog/split-pdf-for-upload-limits-one-page-one-pdf",
    title: "Split PDF for Upload Limits (One Page One PDF) – 2026 Guide",
    description: "Need to split a PDF into single pages to meet upload limits? Here's how to split one PDF into multiple files for government forms, email attachments, and job portals.",
   
    siteName: "PDFSwift",
    locale: "en_US",
    publishedTime: "2026-02-24T08:00:00+00:00",
    authors: ["PDFSwift Team"],
    tags: ["split pdf", "pdf pages", "upload limits", "pdf splitter", "2026 guide"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Split PDF for Upload Limits (One Page One PDF) – 2026 Guide",
    description: "Need to split a PDF into single pages to meet upload limits? Here's how to split one PDF into multiple files.",
    images: ["https://www.pdfswift.online/images/split-pdf-upload-limits-guide.png"],
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
    canonical: "/blog/split-pdf-for-upload-limits-one-page-one-pdf",
  },
  category: "How-to Guide",
  other: {
    "article:published_time": "2026-02-24T08:00:00+00:00",
    "article:modified_time": "2026-02-24T08:00:00+00:00",
    "article:section": "How-to Guide",
    "article:tag": ["split pdf", "pdf pages", "upload limits"],
  },
};

export default function SplitPDFUploadLimits() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://www.pdfswift.online/blog/split-pdf-for-upload-limits-one-page-one-pdf#article",
        headline: "Split PDF for Upload Limits (One Page One PDF) – 2026 Guide",
        description: "Need to split a PDF into single pages to meet upload limits? Here's how to split one PDF into multiple files for government forms, email attachments, and job portals.",
        datePublished: "2026-02-24T08:00:00+00:00",
        dateModified: "2026-02-24T08:00:00+00:00",
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
          "@id": "https://www.pdfswift.online/blog/split-pdf-for-upload-limits-one-page-one-pdf",
        },
        wordCount: 950,
        timeRequired: "PT5M",
        articleSection: "How-to Guide",
        articleBody: `Complete guide to splitting PDFs into individual pages for upload limits. Covers government forms, email attachments, job portals, and step-by-step instructions.`,
        keywords: "split pdf, separate pdf pages, pdf splitter, split pdf into multiple files",
        thumbnailUrl: "https://www.pdfswift.online/images/split-pdf-upload-limits-guide.png",
        image: {
          "@type": "ImageObject",
          url: "https://www.pdfswift.online/images/split-pdf-upload-limits-guide.png",
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.pdfswift.online/blog/split-pdf-for-upload-limits-one-page-one-pdf#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "How do I split a PDF into separate pages for free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use free online tools like PDFSwift, iLovePDF, or PDF24. Upload your PDF, select 'Split every page' or 'Extract pages', and download individual PDFs. No signup required, works on phone and computer. Takes about 30 seconds.",
            },
          },
          {
            "@type": "Question",
            name: "What's the best way to split a PDF for email attachments?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If your PDF is too large for email (Gmail limit 25MB), use 'Split by file size' option. Set maximum file size to 20MB or 10MB. The tool automatically splits your PDF into chunks under that size.",
            },
          },
          {
            "@type": "Question",
            name: "How do I split a PDF for government exam applications?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most government portals (UPSC, SSC, RRB) require each document separately – photo, signature, marksheets, etc. Extract each document as separate PDF and name files as required.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.pdfswift.online/blog/split-pdf-for-upload-limits-one-page-one-pdf#breadcrumb",
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
            name: "Split PDF Guide",
            item: "https://www.pdfswift.online/blog/split-pdf-for-upload-limits-one-page-one-pdf",
          },
        ],
      },
    ],
  };

  const uploadLimits = [
    {
      platform: "Email (Gmail, Outlook)",
      limit: "25MB total",
      whySplit: "Large PDFs bounce back. Split into smaller chunks."
    },
    {
      platform: "Government Portals (UPSC, SSC)",
      limit: "50KB-2MB per file",
      whySplit: "Each document (photo, signature, form) needs separate upload."
    },
    {
      platform: "Job Portals (Naukri, LinkedIn)",
      limit: "2-5MB per file",
      whySplit: "Resumes with portfolios often exceed limits."
    },
    {
      platform: "College Applications",
      limit: "1-5MB per file",
      whySplit: "Multiple documents need separate uploads."
    },
    {
      platform: "WhatsApp / Telegram",
      limit: "100-200MB",
      whySplit: "Large PDFs fail to send. Split into smaller parts."
    },
    {
      platform: "Bank / Loan Applications",
      limit: "1-10MB per file",
      whySplit: "Income docs, statements need individual uploads."
    }
  ];

  const splitMethods = [
    {
      method: "Split every page into separate PDFs",
      bestFor: "Creating individual files for each page (e.g., 10 pages = 10 PDFs)",
      example: "Document with 5 pages → Page1.pdf, Page2.pdf, Page3.pdf, Page4.pdf, Page5.pdf"
    },
    {
      method: "Extract specific page ranges",
      bestFor: "Getting only certain pages as separate files",
      example: "Pages 1-3 and 5-7 from a 10-page document"
    },
    {
      method: "Split by file size",
      bestFor: "Meeting email size limits (split every 5MB)",
      example: "20MB PDF → 4 files of ~5MB each"
    },
    {
      method: "Split by bookmark/chapter",
      bestFor: "Long reports, ebooks with bookmarks",
      example: "Each chapter becomes its own PDF"
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
                  Split PDF for Upload Limits
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
                    February 24, 2026
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                    Upload Limits
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                  Split PDF for Upload Limits
                  <br />
                  <span className="text-2xl md:text-3xl lg:text-4xl text-blue-600">
                    (One Page One PDF) – 2026 Guide
                  </span>
                </h1>

                {/* Date and Reading Time */}
                <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-4">
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 mr-2 text-gray-500" />
                    <time dateTime="2026-02-24">February 24, 2026</time>
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
                        Your PDF is 10MB but the upload limit is 2MB per file. Or you need each page as a separate PDF for a government form.
                      </p>
                      <p className="text-gray-700">
                        You don't need Adobe Acrobat. Split your PDF into individual pages or smaller chunks in seconds. Free, works on any device, no signup. Here's exactly how to do it for email, government portals, job applications, and more.
                      </p>
                    </div>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div className="space-y-10">
                {/* Why Split PDFs? */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Why Split a PDF into Separate Pages?
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                      <h3 className="font-bold text-gray-900 mb-1 flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-blue-600" />
                        Email attachments
                      </h3>
                      <p className="text-sm text-gray-600">Gmail/Outlook limit 25MB. Split large PDFs into smaller chunks to send via email.</p>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                      <h3 className="font-bold text-gray-900 mb-1 flex items-center">
                        <Upload className="w-4 h-4 mr-2 text-green-600" />
                        Government portals
                      </h3>
                      <p className="text-sm text-gray-600">UPSC, SSC, RRB need each document separately – photo, signature, certificates.</p>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                      <h3 className="font-bold text-gray-900 mb-1 flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-purple-600" />
                        Job applications
                      </h3>
                      <p className="text-sm text-gray-600">Portals like Naukri limit file sizes. Split portfolio into resume + work samples.</p>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                      <h3 className="font-bold text-gray-900 mb-1 flex items-center">
                        <Smartphone className="w-4 h-4 mr-2 text-orange-600" />
                        WhatsApp sharing
                      </h3>
                      <p className="text-sm text-gray-600">Large PDFs fail to send. Split into smaller parts that transfer easily.</p>
                    </div>
                  </div>
                </section>

                {/* Step-by-Step Guide */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Step-by-Step: Split PDF into Individual Pages
                  </h2>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="space-y-5">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">1</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Find a PDF splitter tool</h3>
                          <p className="text-gray-700">Open PDFSwift, iLovePDF, Smallpdf, or any PDF splitter. No signup needed.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">2</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Upload your PDF</h3>
                          <p className="text-gray-700">Drag and drop or click to select your multi-page PDF file.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">3</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Choose split method</h3>
                          <p className="text-gray-700">Select 'Split every page' for one PDF per page, or 'Extract pages' for specific ranges.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">4</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Configure options</h3>
                          <p className="text-gray-700">Set naming convention (Page_1.pdf, Document_1.pdf) and output format.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">5</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Click Split</h3>
                          <p className="text-gray-700">Process the file. Takes 10-30 seconds depending on size.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">6</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Download</h3>
                          <p className="text-gray-700">Download individual PDFs as ZIP file or one by one. Done.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-5 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <span className="font-bold">Total time:</span> About 30-60 seconds for a 20-page PDF.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Upload Limits Table */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    📊 Common Upload Limits & Why Split
                  </h2>
                  
                  <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Platform</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Upload Limit</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Why Split?</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {uploadLimits.map((item, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.platform}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{item.limit}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{item.whySplit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Split Methods */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🔪 Different Ways to Split a PDF
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {splitMethods.map((method, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl p-5 hover:border-blue-200 transition">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{method.method}</h3>
                        <p className="text-sm text-gray-600 mb-2"><span className="font-semibold">Best for:</span> {method.bestFor}</p>
                        <p className="text-sm text-gray-500 bg-gray-50 p-2 rounded"><span className="font-semibold">Example:</span> {method.example}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* For Government Exam Applications */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    📋 Splitting PDFs for Government Exams (UPSC, SSC, RRB)
                  </h2>
                  
                  <div className="border border-amber-200 rounded-xl p-6 bg-amber-50">
                    <h3 className="font-bold text-amber-800 mb-3">Typical document list:</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="font-medium">📄 Application form</p>
                        <p className="text-xs text-gray-500">Usually 1-2 pages</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="font-medium">📸 Photo</p>
                        <p className="text-xs text-gray-500">Single image as PDF</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="font-medium">✍️ Signature</p>
                        <p className="text-xs text-gray-500">Single image as PDF</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="font-medium">🎓 10th Marksheet</p>
                        <p className="text-xs text-gray-500">1-2 pages</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="font-medium">📚 12th Marksheet</p>
                        <p className="text-xs text-gray-500">1-2 pages</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="font-medium">🎓 Graduation Certificate</p>
                        <p className="text-xs text-gray-500">1-2 pages</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="font-medium">🆔 ID Proof</p>
                        <p className="text-xs text-gray-500">1-2 pages</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="font-medium">💰 Payment Receipt</p>
                        <p className="text-xs text-gray-500">1 page</p>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm">
                        <span className="font-bold">How to prepare:</span> Scan all documents separately. If you scanned them together into one PDF, use 'Extract pages' to separate each document. Save with proper names: <span className="font-mono text-xs bg-gray-100 p-1">photo.pdf</span>, <span className="font-mono text-xs bg-gray-100 p-1">signature.pdf</span>, <span className="font-mono text-xs bg-gray-100 p-1">10th_marksheet.pdf</span>, etc.
                      </p>
                    </div>
                  </div>
                </section>

                {/* For Email Attachments */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    📧 Splitting PDFs for Email
                  </h2>
                  
                  <div className="border border-blue-200 rounded-xl p-6">
                    <p className="text-gray-700 mb-4">
                      Gmail allows 25MB total per email. If your PDF is larger:
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <div>
                          <span className="font-bold">Method 1: Split by file size</span>
                          <p className="text-sm text-gray-600">Use 'Split by file size' with max 20MB per file. Your 50MB PDF becomes 3 files (~17MB each).</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <div>
                          <span className="font-bold">Method 2: Split every 10 pages</span>
                          <p className="text-sm text-gray-600">If you don't know file size per page, split every 10-15 pages and check resulting sizes.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <div>
                          <span className="font-bold">Method 3: Compress first</span>
                          <p className="text-sm text-gray-600">Compress PDF first, then split if still too large.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-yellow-50 p-3 rounded-lg">
                      <p className="text-xs text-yellow-700">
                        <span className="font-bold">Tip:</span> Send multiple emails if needed, or use cloud storage (Google Drive, Dropbox) and share links.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Tool Recommendations */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🛠️ Best Free PDF Splitter Tools
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-blue-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-blue-700 mb-1">PDFSwift</h3>
                      <p className="text-xs text-gray-500 mb-2">Browser-based • No upload • Free</p>
                      <p className="text-sm text-gray-700">Split PDFs locally. Files stay in browser. Split every page or extract ranges. Works on phone.</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-gray-700 mb-1">iLovePDF</h3>
                      <p className="text-xs text-gray-500 mb-2">Online • Free • No limits</p>
                      <p className="text-sm text-gray-700">Split by pages, ranges, or extract. Uploads to servers but deletes after.</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-gray-700 mb-1">Smallpdf</h3>
                      <p className="text-xs text-gray-500 mb-2">Online • 2/day free</p>
                      <p className="text-sm text-gray-700">Popular. Split every page or custom ranges. Limits free users to 2 tasks/day.</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-gray-700 mb-1">Adobe Acrobat online</h3>
                      <p className="text-xs text-gray-500 mb-2">Online • Free with account</p>
                      <p className="text-sm text-gray-700">Adobe's official tool. Needs free account. Reliable splitting.</p>
                    </div>
                    
                    <div className="border border-green-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-green-700 mb-1">PDF24</h3>
                      <p className="text-xs text-gray-500 mb-2">Online • Free • No limits</p>
                      <p className="text-sm text-gray-700">German tool. No daily limits. Works great.</p>
                    </div>
                    
                    <div className="border border-purple-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-purple-700 mb-1">Preview (Mac)</h3>
                      <p className="text-xs text-gray-500 mb-2">Built-in • Free • Offline</p>
                      <p className="text-sm text-gray-700">Use Thumbnails view, select pages, drag to desktop to create new PDFs.</p>
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
                      <h3 className="font-bold text-gray-900 mb-1">Split files are still too large</h3>
                      <p className="text-sm text-gray-600">Compress each split file individually. Use PDF compression tool to reduce size further while keeping quality.</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Can't split password-protected PDF</h3>
                      <p className="text-sm text-gray-600">Remove password first using PDF unlocker (requires password). Then split the unprotected file.</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Page order got mixed up</h3>
                      <p className="text-sm text-gray-600">Most tools maintain original order. If not, rename files with page numbers before splitting or use 'Extract pages' with exact ranges.</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Need to split 100+ pages</h3>
                      <p className="text-sm text-gray-600">Use desktop software like Adobe Acrobat or PDFsam (PDF Split and Merge) for batch processing large files.</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Split files won't upload to portal</h3>
                      <p className="text-sm text-gray-600">Check file format – must be PDF. Check file size – might still exceed limit. Compress more or split into even smaller chunks.</p>
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
                        How do I split a PDF into separate pages for free?
                      </h3>
                      <p className="text-gray-700">
                        Use free online tools like PDFSwift, iLovePDF, or PDF24. Upload your PDF, select 'Split every page' or 'Extract pages', and download individual PDFs. No signup required, works on phone and computer. Takes about 30 seconds for a 20-page document. For offline splitting on Mac, use Preview (built-in). For Windows, use PDFsam (free desktop app).
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        What's the best way to split a PDF for email attachments?
                      </h3>
                      <p className="text-gray-700">
                        If your PDF is too large for email (Gmail limit 25MB), use 'Split by file size' option. Set maximum file size to 20MB or 10MB. The tool automatically splits your PDF into chunks under that size. Alternatively, split every 10-20 pages depending on file size. For a 50MB PDF, splitting into 3 files of ~17MB each usually works. Send multiple emails if needed.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        How do I split a PDF for government exam applications?
                      </h3>
                      <p className="text-gray-700">
                        Most government portals (UPSC, SSC, RRB) require each document separately – photo, signature, 10th marksheet, 12th marksheet, graduation certificate, ID proof, etc. First merge related pages into one PDF per document, then extract each as separate PDF. Name files exactly as required: 'photo.pdf', 'signature.pdf', '10th_marksheet.pdf'. Keep each file under their specified limit (usually 50KB-2MB).
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Will splitting a PDF reduce quality?
                      </h3>
                      <p className="text-gray-700">
                        No, splitting doesn't compress or reduce quality. Each page becomes its own PDF with the same resolution and content as the original. The file size per page stays the same – if your original 10-page PDF is 5MB, each page will be roughly 0.5MB. No quality loss because splitting is just copying pages to new files, not re-encoding.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Can I split a PDF on my phone?
                      </h3>
                      <p className="text-gray-700">
                        Yes, works on iPhone and Android. Open any online PDF splitter in your mobile browser. Upload from phone storage, Google Drive, or Dropbox. Select split options (every page or custom ranges). Download individual PDFs or ZIP file. Some tools like PDFSwift work entirely in browser – no app download needed. Takes about a minute.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        What if I need to split a password-protected PDF?
                      </h3>
                      <p className="text-gray-700">
                        You need the password first. Use a PDF unlocker tool (requires password) to remove protection, then split the unprotected PDF. Most splitter tools can't open locked PDFs without password entry first. Some tools like Adobe Acrobat allow opening with password and then splitting. Never try to bypass passwords illegally – only split PDFs you own or have permission to edit.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        How do I split specific pages only?
                      </h3>
                      <p className="text-gray-700">
                        Use 'Extract pages' option. Enter page ranges like '1-3,5,7-9'. The tool creates separate PDFs for each range. For example, from a 10-page PDF, '1-3,5,7-9' creates: Pages1-3.pdf, Page5.pdf, Pages7-9.pdf. This is useful for extracting only relevant sections from a long document.
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
                        <span><span className="font-bold">Split every page</span> for one PDF per page (10 pages = 10 files)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Split by file size</span> for email (Gmail 25MB limit)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Extract specific ranges</span> for government forms (photo, signature separate)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">No quality loss</span> – splitting just copies pages</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Takes 30-60 seconds</span> for most documents</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Works on phone and computer</span> – no software needed</span>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>

              {/* CTA */}
              <div className="mt-12 pt-10 border-t border-gray-200">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Split Your PDF Right Now
                  </h3>
                  <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                    Upload your PDF. Split every page, extract specific ranges, or split by file size. Free, no signup, works on phone and computer. Files stay private.
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