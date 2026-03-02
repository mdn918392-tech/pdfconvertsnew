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
  Mail,
  Zap,
  Download,
  Smartphone,
  Globe,
  FileText
} from "lucide-react";

export const metadata = {
  title: "Split PDF for Email Attachments (Under Gmail Limit) – Easy Method 2026 | PDFSwift",
  description: "Learn how to split large PDF files to send via email under Gmail's 25MB limit using PDFSwift. Free online tool – no upload, 100% private. Works on iPhone, Android, and desktop.",
  keywords: "split pdf for email, pdf under gmail limit, send large pdf via email, pdf splitter for email, gmail attachment limit 25mb, split pdf by size",
  openGraph: {
    type: "article",
    url: "https://www.pdfswift.online/blog/split-pdf-for-email-attachments-under-gmail-limit",
    title: "Split PDF for Email Attachments (Under Gmail Limit) – Easy Method 2026 | PDFSwift",
    description: "Learn how to split large PDF files to send via email under Gmail's 25MB limit using PDFSwift. Free online tool – no upload, 100% private.",
    siteName: "PDFSwift",
    locale: "en_US",
    publishedTime: "2026-03-02T08:00:00+00:00",
    authors: ["PDFSwift Team"],
    tags: ["split pdf", "email attachments", "gmail limit", "2026 guide"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Split PDF for Email Attachments (Under Gmail Limit) – Easy Method 2026 | PDFSwift",
    description: "Learn how to split large PDF files to send via email under Gmail's 25MB limit using PDFSwift. Free online tool – no upload, 100% private.",
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
    canonical: "/blog/split-pdf-for-email-attachments-under-gmail-limit",
  },
  category: "PDF Guide",
  other: {
    "article:published_time": "2026-03-02T08:00:00+00:00",
    "article:modified_time": "2026-03-02T08:00:00+00:00",
    "article:section": "PDF Guide",
    "article:tag": ["split pdf", "email attachments", "gmail limit"],
  },
};

export default function SplitPDFforEmail() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://www.pdfswift.online/blog/split-pdf-for-email-attachments-under-gmail-limit#article",
        headline: "Split PDF for Email Attachments (Under Gmail Limit) – Easy Method 2026",
        description: "Learn how to split large PDF files to send via email under Gmail's 25MB limit using PDFSwift. Free online tool – no upload, 100% private.",
        datePublished: "2026-03-02T08:00:00+00:00",
        dateModified: "2026-03-02T08:00:00+00:00",
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
          "@id": "https://www.pdfswift.online/blog/split-pdf-for-email-attachments-under-gmail-limit",
        },
        wordCount: 1100,
        timeRequired: "PT6M",
        articleSection: "PDF Guide",
        articleBody: `Complete guide to splitting PDF files for email attachments under Gmail's 25MB limit using PDFSwift. Covers step-by-step instructions, email limits, and privacy benefits.`,
        keywords: "split pdf for email, pdf under gmail limit, send large pdf via email",
        thumbnailUrl: "https://www.pdfswift.online/images/split-pdf-email-guide.png",
        image: {
          "@type": "ImageObject",
          url: "https://www.pdfswift.online/images/split-pdf-email-guide.png",
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.pdfswift.online/blog/split-pdf-for-email-attachments-under-gmail-limit#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Gmail's attachment size limit in 2026?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Gmail still has a 25MB limit for attachments in 2026. If your PDF is larger than 25MB, Gmail will reject it and bounce back. Using PDFSwift, you can split your PDF into smaller parts under 20MB to stay safely under the limit.",
            },
          },
          {
            "@type": "Question",
            name: "How do I split a PDF for email using PDFSwift?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Go to PDFSwift Split PDF tool, upload your file (it stays in your browser – private and secure), choose 'Split by file size', set target to 20MB, click Split, and download your ZIP file. The whole process takes less than a minute.",
            },
          },
          {
            "@type": "Question",
            name: "Is PDFSwift really free? Any hidden charges?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "PDFSwift is completely free forever. No signup, no subscription, no hidden charges. You can split as many PDFs as you want, any size, any time.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.pdfswift.online/blog/split-pdf-for-email-attachments-under-gmail-limit#breadcrumb",
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
            name: "Split PDF for Email",
            item: "https://www.pdfswift.online/blog/split-pdf-for-email-attachments-under-gmail-limit",
          },
        ],
      },
    ],
  };

  const emailLimits = [
    {
      provider: "Gmail",
      limit: "25MB",
      safeSize: "20-22MB",
      notes: "Attachments over 25MB will bounce back"
    },
    {
      provider: "Outlook / Hotmail",
      limit: "20MB",
      safeSize: "15-18MB",
      notes: "Stricter limit than Gmail"
    },
    {
      provider: "Yahoo Mail",
      limit: "25MB",
      safeSize: "20-22MB",
      notes: "Similar to Gmail limits"
    },
    {
      provider: "iCloud Mail",
      limit: "20MB",
      safeSize: "15-18MB",
      notes: "Apple's email service limit"
    },
    {
      provider: "ProtonMail",
      limit: "25MB",
      safeSize: "20-22MB",
      notes: "Encrypted email service"
    }
  ];

  const splitMethods = [
    {
      method: "Split by file size",
      description: "PDFSwift automatically divides your PDF into parts under a specific size",
      bestFor: "Hitting exact email limits (20MB for Gmail)",
      example: "50MB PDF → 3 files of ~17MB each"
    },
    {
      method: "Split every N pages",
      description: "Divide PDF into equal page chunks",
      bestFor: "When you know roughly how many pages fit in 25MB",
      example: "100-page PDF → split every 20 pages → 5 files"
    },
    {
      method: "Split into equal parts",
      description: "Split into specific number of files (2,3,4 parts)",
      bestFor: "When you want exactly 2-3 email attachments",
      example: "Split into 3 parts regardless of size"
    },
    {
      method: "Extract specific pages",
      description: "Send only the important pages",
      bestFor: "When only certain pages need to be shared",
      example: "Extract pages 5-10 from a 50-page PDF"
    }
  ];

  const alternatives = [
    {
      option: "Compress first, then split",
      explanation: "Use PDFSwift Compress PDF tool to reduce file size before splitting",
      benefit: "Fewer split files needed"
    },
    {
      option: "Google Drive / Cloud storage",
      explanation: "Upload to Google Drive, share link via email",
      benefit: "No size limits, send once"
    },
    {
      option: "WeTransfer",
      explanation: "Free up to 2GB, sends download link via email",
      benefit: "Good for very large files"
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
                  Split PDF for Email
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
                    Email Guide
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                    March 2, 2026
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                    PDFSwift Tool
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                  Split PDF for Email Attachments
                  <br />
                  <span className="text-2xl md:text-3xl lg:text-4xl text-blue-600">
                    (Under Gmail Limit) – Easy Method 2026
                  </span>
                </h1>

                {/* Date and Reading Time */}
                <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-4">
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 mr-2 text-gray-500" />
                    <time dateTime="2026-03-02">March 2, 2026</time>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gray-500" />
                    <span>6 minute read</span>
                  </div>
                </div>

                {/* Introduction */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-100 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                  <div className="flex items-start">
                    <Mail className="w-7 h-7 text-blue-600 mr-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-800 font-bold text-lg mb-3">
                        Your 40MB PDF won't send via Gmail? Gmail's limit is 25MB and your email keeps bouncing back.
                      </p>
                      <p className="text-gray-700">
                        With <span className="font-bold text-blue-600">PDFSwift</span>, you can split any large PDF into smaller parts under 20MB in seconds. Free, private, and works on any device. Here's exactly how to send large PDFs via email without hassle.
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
                    ⚡ Quick Steps: Split PDF for Email with PDFSwift
                  </h2>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">1</div>
                        <div>
                          <span className="text-gray-700">Open <span className="font-bold text-blue-600">PDFSwift Split PDF</span> tool (no signup needed)</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">2</div>
                        <div>
                          <span className="text-gray-700">Upload your large PDF file – drag & drop or click to select (<span className="font-semibold">file stays in your browser</span>)</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">3</div>
                        <div>
                          <span className="text-gray-700">Choose split method: <span className="font-bold">'Split by file size'</span> for Gmail limit</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">4</div>
                        <div>
                          <span className="text-gray-700">Set target size to <span className="font-bold">20MB</span> (safe under Gmail's 25MB limit)</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">5</div>
                        <div>
                          <span className="text-gray-700">Click <span className="font-bold">'Split'</span> – processes instantly in your browser</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">6</div>
                        <div>
                          <span className="text-gray-700">Download all split parts as a <span className="font-bold">ZIP file</span></span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">7</div>
                        <div>
                          <span className="text-gray-700">Attach each part to separate emails or use cloud storage</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-5 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <span className="font-bold">Total time:</span> Less than 2 minutes. Completely free.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Email Provider Limits */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    📧 Email Provider Attachment Limits (2026)
                  </h2>
                  
                  <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Provider</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Limit</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Safe Size</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {emailLimits.map((item, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.provider}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.limit}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.safeSize}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{item.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Split Methods */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🔪 PDFSwift Split Methods for Email
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {splitMethods.map((item, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl p-5 hover:border-blue-200 transition">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{item.method}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <p className="text-sm text-gray-600"><span className="font-semibold">Best for:</span> {item.bestFor}</p>
                        <p className="text-sm text-gray-500 bg-gray-50 p-2 rounded mt-2"><span className="font-semibold">Example:</span> {item.example}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Why Choose PDFSwift */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    ✨ Why Use PDFSwift for Email Splitting?
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                      <Shield className="w-10 h-10 text-blue-600 mb-3" />
                      <h3 className="font-bold text-gray-900 mb-2">100% Private</h3>
                      <p className="text-sm text-gray-600">Files never leave your device. No upload, no servers, no tracking. Perfect for sensitive documents.</p>
                    </div>
                    
                    <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                      <Zap className="w-10 h-10 text-green-600 mb-3" />
                      <h3 className="font-bold text-gray-900 mb-2">Super Fast</h3>
                      <p className="text-sm text-gray-600">Processes instantly in your browser. No waiting for uploads/downloads. Split in seconds.</p>
                    </div>
                    
                    <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                      <Download className="w-10 h-10 text-purple-600 mb-3" />
                      <h3 className="font-bold text-gray-900 mb-2">Completely Free</h3>
                      <p className="text-sm text-gray-600">No signup, no hidden charges, no daily limits. Split unlimited PDFs forever.</p>
                    </div>
                  </div>
                </section>

                {/* Alternative Options */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    💡 Other Ways to Send Large PDFs
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {alternatives.map((item, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl p-5">
                        <h3 className="font-bold text-gray-900 mb-2">{item.option}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.explanation}</p>
                        <p className="text-xs text-green-600 font-medium">{item.benefit}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Example Scenario */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    📋 Real Example: Sending a 45MB PDF via Gmail
                  </h2>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <FileText className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">Original: 45MB Project Report.pdf</p>
                          <p className="text-sm text-red-600">❌ Too large for Gmail (limit 25MB)</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-center">
                        <ChevronRight className="w-6 h-6 text-gray-400" />
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">After PDFSwift Split by Size (20MB)</p>
                          <p className="text-sm text-gray-600">Part 1: 18MB • Part 2: 15MB • Part 3: 12MB</p>
                          <p className="text-sm text-green-600 mt-1">✓ All under Gmail limit – send in 3 separate emails</p>
                        </div>
                      </div>
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
                            <span className="text-sm"><span className="font-bold">Perfect for:</span> Contracts, invoices, personal documents</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Mobile Support */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    📱 Works on All Devices - iPhone, Android, iPad
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-blue-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-blue-700 mb-2">iPhone / iPad</h3>
                      <p className="text-sm text-gray-700">Open Safari, go to PDFSwift, upload from Files or Photos, split PDF, and attach directly to Mail app. No app needed.</p>
                    </div>
                    
                    <div className="border border-green-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-green-700 mb-2">Android</h3>
                      <p className="text-sm text-gray-700">Open Chrome, visit PDFSwift, select PDF from storage, split instantly, and share via Gmail or any email app.</p>
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
                        What is Gmail's attachment size limit in 2026?
                      </h3>
                      <p className="text-gray-700">
                        Gmail still has a <span className="font-bold">25MB limit</span> for attachments in 2026. If your PDF is larger than 25MB, Gmail will reject it and bounce back. Using <span className="font-bold text-blue-600">PDFSwift</span>, you can split your PDF into smaller parts under 20MB to stay safely under the limit.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        How do I split a PDF for email using PDFSwift?
                      </h3>
                      <p className="text-gray-700">
                        It's simple: Go to <span className="font-bold text-blue-600">PDFSwift Split PDF</span> tool, upload your file (it stays in your browser – private and secure), choose 'Split by file size', set target to 20MB, click Split, and download your ZIP file. The whole process takes less than a minute.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Is PDFSwift really free? Any hidden charges?
                      </h3>
                      <p className="text-gray-700">
                        <span className="font-bold">PDFSwift is completely free forever.</span> No signup, no subscription, no hidden charges. You can split as many PDFs as you want, any size, any time. We believe PDF tools should be free and accessible to everyone.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Is it safe to upload my PDF to PDFSwift?
                      </h3>
                      <p className="text-gray-700">
                        <span className="font-bold">100% safe.</span> PDFSwift processes files locally in your browser – they <span className="font-bold">never leave your device</span>. No upload, no servers, no third-party access. Your documents stay 100% private. This is especially important for sensitive emails containing contracts, invoices, or personal information.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Can I split PDF on my phone for email?
                      </h3>
                      <p className="text-gray-700">
                        Yes! PDFSwift works perfectly on iPhone and Android. Open Safari (iPhone) or Chrome (Android), go to PDFSwift, upload from your phone storage, split the PDF, and attach directly to email. <span className="font-bold">No app installation needed.</span>
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        What if my PDF is 50MB? How many parts will I get?
                      </h3>
                      <p className="text-gray-700">
                        With PDFSwift's 'Split by file size' set to 20MB, a 50MB PDF will split into <span className="font-bold">3 parts</span> – approximately 17MB each. All parts are downloaded as a ZIP file. You can then send 3 separate emails or use cloud storage to share all parts at once.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Can I split a password-protected PDF?
                      </h3>
                      <p className="text-gray-700">
                        PDFSwift supports password-protected PDFs. You'll be prompted to enter the password when you upload. Once unlocked, you can split normally. If you don't have the password, the file cannot be processed.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        What's better – splitting or compressing for email?
                      </h3>
                      <p className="text-gray-700">
                        <span className="font-bold">Both!</span> Use <span className="font-bold text-blue-600">PDFSwift Compress PDF</span> tool first to reduce file size. If it's still over 25MB, then split. This combination often results in fewer split files. For example, compress a 50MB PDF to 30MB, then split into 2 parts instead of 3.
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
                        <span><span className="font-bold">Gmail limit:</span> 25MB – split to 20MB for safety</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">PDFSwift method:</span> Split by file size, target 20MB</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Privacy:</span> Files stay in your browser – no upload</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Free forever:</span> No signup, no limits</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Works on phone:</span> iPhone, Android – no app needed</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Alternative:</span> Compress first, then split for fewer parts</span>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>

              {/* CTA */}
              <div className="mt-12 pt-10 border-t border-gray-200">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Split Your Large PDF for Email Now
                  </h3>
                  <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                    Free, private, and works in seconds. No signup, no upload – your files stay in your browser. Perfect for Gmail, Outlook, and all email providers.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/split-pdf"
                      className="inline-flex items-center justify-center px-7 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300"
                    >
                      Split PDF Now – Free
                    </Link>
                    <Link
                      href="/compress-pdf"
                      className="inline-flex items-center justify-center px-7 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300"
                    >
                      Compress PDF First
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