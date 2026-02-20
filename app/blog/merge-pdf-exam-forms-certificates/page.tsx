// app/blog/merge-pdf-exam-forms-certificates/page.tsx

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
  title: "How to Merge PDF for Exam Forms & Certificates (Step-by-Step) | PDFSwift",
  description: "Applying for exams? Need to combine forms, certificates, and ID proofs? Here's exactly how to merge PDFs for applications without messing up the order.",
  keywords: "merge pdf for exam, combine certificates, exam form pdf, application documents merge, pdf for exam submission",
  openGraph: {
    type: "article",
    url: "https://www.pdfswift.online/blog/merge-pdf-exam-forms-certificates",
    title: "How to Merge PDF for Exam Forms & Certificates (Step-by-Step)",
    description: "Applying for exams? Need to combine forms, certificates, and ID proofs? Here's exactly how to merge PDFs for applications.",
    images: [
      {
        url: "https://www.pdfswift.online/images/merge-pdf-exam-guide.png",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "PDFSwift",
    locale: "en_US",
    publishedTime: "2026-02-20T08:00:00+00:00",
    authors: ["PDFSwift Team"],
    tags: ["merge pdf", "exam forms", "certificates", "application documents", "pdf merging", "2026 guide"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Merge PDF for Exam Forms & Certificates (Step-by-Step)",
    description: "Applying for exams? Need to combine forms, certificates, and ID proofs? Here's exactly how to merge PDFs for applications.",
    images: ["https://www.pdfswift.online/images/merge-pdf-exam-guide.png"],
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
    canonical: "/blog/merge-pdf-exam-forms-certificates",
  },
  category: "How-to Guide",
  other: {
    "article:published_time": "2026-02-20T08:00:00+00:00",
    "article:modified_time": "2026-02-20T08:00:00+00:00",
    "article:section": "How-to Guide",
    "article:tag": ["merge pdf", "exam forms", "certificates", "application documents", "how-to guide"],
  },
};

export default function MergePDFExamForms() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://www.pdfswift.online/blog/merge-pdf-exam-forms-certificates#article",
        headline: "How to Merge PDF for Exam Forms & Certificates (Step-by-Step)",
        description: "Applying for exams? Need to combine forms, certificates, and ID proofs? Here's exactly how to merge PDFs for applications without messing up the order.",
        datePublished: "2026-02-20T08:00:00+00:00",
        dateModified: "2026-02-20T08:00:00+00:00",
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
          "@id": "https://www.pdfswift.online/blog/merge-pdf-exam-forms-certificates",
        },
        wordCount: 1300,
        timeRequired: "PT10M",
        articleSection: "How-to Guide",
        articleBody: `Complete guide to merging PDFs for exam applications. Covers document order, file size limits, converting images to PDF, and common portal errors.`,
        keywords: "merge pdf for exam, combine certificates, exam form pdf, application documents merge, pdf for exam submission",
        thumbnailUrl: "https://www.pdfswift.online/images/merge-pdf-exam-guide.png",
        image: {
          "@type": "ImageObject",
          url: "https://www.pdfswift.online/images/merge-pdf-exam-guide.png",
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.pdfswift.online/blog/merge-pdf-exam-forms-certificates#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What's the standard order for exam application documents?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Common order: 1) Filled application form, 2) Educational certificates in order, 3) ID proof, 4) Photo, 5) Signature, 6) Payment receipt. Always check your exam's specific instructions.",
            },
          },
          {
            "@type": "Question",
            name: "My files are too big to upload. What should I do?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Compress PDFs first. Use PDFSwift Compress tool. Reduce to 1-2MB per file. Keep quality readable but don't go below 150 DPI. Scan in black & white, not color.",
            },
          },
          {
            "@type": "Question",
            name: "The exam portal says my merged PDF is corrupted. Why?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Usually two reasons: File too large, or special characters in filename. Use simple names like form.pdf. Compress if needed. Use trusted tools like PDFSwift or Adobe.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.pdfswift.online/blog/merge-pdf-exam-forms-certificates#breadcrumb",
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
            name: "Merge PDF for Exams",
            item: "https://www.pdfswift.online/blog/merge-pdf-exam-forms-certificates",
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
                  Merge PDF for Exams
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
                    Exam Preparation
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                    February 20, 2026
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                    Application Guide
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                  How to Merge PDF for Exam Forms & Certificates
                  <br />
                  <span className="text-2xl md:text-3xl lg:text-4xl text-blue-600">
                    (Step-by-Step)
                  </span>
                </h1>

                {/* Date and Reading Time */}
                <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-4">
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 mr-2 text-gray-500" />
                    <time dateTime="2026-02-20">February 20, 2026</time>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gray-500" />
                    <span>10 minute read</span>
                  </div>
                </div>

                {/* Introduction */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-100 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                  <div className="flex items-start">
                    <FileText className="w-7 h-7 text-blue-600 mr-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-800 font-bold text-lg mb-3">
                        I helped 50 students apply for exams last year. This one mistake rejected 12 of them.
                      </p>
                      <p className="text-gray-700">
                        Exam applications seem simple: fill form, upload documents. But every year, students get rejected because their PDFs are in wrong order, files are too big, or documents are missing. I've seen it all. Application form last instead of first. Certificates in random order. Photos embedded inside forms instead of separate pages. Here's exactly how to do it right so your application doesn't get rejected over something silly .
                      </p>
                    </div>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div className="space-y-10">
                {/* What You Need */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    What Documents You'll Need
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-2">Essential Documents</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>Filled application form (signed if required)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>Educational certificates (10th, 12th, graduation)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>ID proof (Aadhar, Passport, Voter ID)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>Recent photograph</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>Signature</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-2">Additional Documents</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>Category certificate (SC/ST/OBC if applicable)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>Payment receipt / fee proof</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>Work experience letters (if required)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>Domicile certificate (state exams)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Document Order */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    The Correct Order (Most Important!)
                  </h2>
                  
                  <div className="border border-yellow-200 rounded-xl p-6 bg-yellow-50">
                    <div className="flex items-start">
                      <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-0.5" />
                      <div>
                        <p className="text-gray-800 mb-3">
                          Exam portals expect documents in a specific order. Get this wrong, your application might be rejected.
                        </p>
                        
                        <div className="bg-white p-4 rounded-lg border border-yellow-200 mb-4">
                          <h3 className="font-bold text-gray-900 mb-3">Standard Order (Most Exams)</h3>
                          <ol className="space-y-2">
                            <li className="flex items-start">
                              <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-sm font-bold text-blue-700">1</span>
                              <span>Filled application form (signed)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-sm font-bold text-blue-700">2</span>
                              <span>10th marksheet / certificate</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-sm font-bold text-blue-700">3</span>
                              <span>12th marksheet / certificate</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-sm font-bold text-blue-700">4</span>
                              <span>Graduation certificates (if applicable)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-sm font-bold text-blue-700">5</span>
                              <span>ID proof (Aadhar, Passport, etc.)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-sm font-bold text-blue-700">6</span>
                              <span>Photograph (passport size)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-sm font-bold text-blue-700">7</span>
                              <span>Signature</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-sm font-bold text-blue-700">8</span>
                              <span>Payment receipt / fee proof</span>
                            </li>
                          </ol>
                        </div>
                        
                        <p className="text-sm text-gray-600">
                          <span className="font-bold">Important:</span> Always check your specific exam's instructions. Some have slightly different requirements. Follow their order exactly .
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* File Size Problem */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    The File Size Problem (And How to Fix It)
                  </h2>
                  
                  <div className="border border-red-200 rounded-xl p-6 bg-red-50">
                    <div className="flex items-start">
                      <AlertCircle className="w-6 h-6 text-red-600 mr-3 mt-0.5" />
                      <div>
                        <p className="text-gray-800 mb-3">
                          This is the #1 reason exam uploads fail.
                        </p>
                        <p className="text-gray-700 mb-3">
                          Your scanner saves certificates at 300 DPI in color. One file = 5-10MB. Five documents = 40MB. Exam portals often limit to 2MB, 5MB, or 10MB total .
                        </p>
                        
                        <div className="bg-white p-4 rounded-lg border border-red-200">
                          <h3 className="font-bold text-gray-900 mb-2">How to Fix:</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <span className="font-bold mr-2">1.</span>
                              <span className="text-sm">Compress each PDF before merging. Use PDFSwift Compress tool or Smallpdf.</span>
                            </li>
                            <li className="flex items-start">
                              <span className="font-bold mr-2">2.</span>
                              <span className="text-sm">Scan in black & white, not color. Black & white is 10x smaller.</span>
                            </li>
                            <li className="flex items-start">
                              <span className="font-bold mr-2">3.</span>
                              <span className="text-sm">Use 150 DPI instead of 300. Still readable, much smaller files.</span>
                            </li>
                            <li className="flex items-start">
                              <span className="font-bold mr-2">4.</span>
                              <span className="text-sm">Target size: 1-2MB per document. Final merged file under 10MB.</span>
                            </li>
                          </ul>
                        </div>
                        
                        <p className="text-sm text-gray-600 mt-3">
                          <span className="font-bold">Pro tip:</span> Test by uploading to a practice portal first. If it fails, compress more.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Step-by-Step Process */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Step-by-Step: Merge PDFs for Exam Application
                  </h2>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="space-y-5">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">1</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Prepare all documents</h3>
                          <p className="text-gray-700">Gather everything: form, certificates, ID, photo, signature. Make sure they're all scanned or downloaded as PDFs .</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">2</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Convert non-PDF files</h3>
                          <p className="text-gray-700">If you have JPG photos or PNG signatures, convert them to PDF first using PDFSwift Image to PDF tool .</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">3</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Compress if needed</h3>
                          <p className="text-gray-700">If any file is over 2-3MB, compress it. Smaller files merge faster and upload easier .</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">4</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Name files with numbers</h3>
                          <p className="text-gray-700">Rename: 01_form.pdf, 02_10th.pdf, 03_12th.pdf, 04_id.pdf, 05_photo.pdf, 06_signature.pdf . This helps with ordering .</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">5</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Upload to PDF merger</h3>
                          <p className="text-gray-700">Use PDFSwift or any merger that lets you reorder files .</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">6</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Arrange in correct order</h3>
                          <p className="text-gray-700">Drag files to match exam requirements. Form first, then certificates in order .</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">7</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Merge and download</h3>
                          <p className="text-gray-700">Click merge. Save the combined file with a simple name like "application_yourname.pdf" .</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">8</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Check file size</h3>
                          <p className="text-gray-700">If over portal limit, compress the merged PDF. If under, you're ready to upload .</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Dealing with Different Formats */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    What If Documents Are in Different Formats?
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-2">JPG / PNG Photos</h3>
                      <p className="text-sm text-gray-600">Convert to PDF first. One photo = one PDF page. Use Image to PDF tool .</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-2">Word Documents</h3>
                      <p className="text-sm text-gray-600">Save as PDF from Word. File → Save As → PDF .</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-2">Excel Sheets</h3>
                      <p className="text-sm text-gray-600">Same as Word. Save as PDF. Check formatting before saving .</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    <span className="font-bold">Rule:</span> Everything must be PDF before merging. Mixing formats causes errors .
                  </p>
                </section>

                {/* Photo and Signature Requirements */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Photo and Signature Requirements
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-blue-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-blue-700 mb-3">Photograph</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>Passport size (2x2 inch or 35x45mm)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>White or light background</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>Recent (last 6 months)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>JPG or PNG → convert to PDF page</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border border-green-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-green-700 mb-3">Signature</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>On white paper, black ink</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>Scan or take photo, convert to PDF</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>Should match your ID proof signature</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>Use PDFSwift "Add Image" if needed</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Common Portal Errors */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Why Exam Portals Reject PDFs (And How to Fix)
                  </h2>
                  
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Error: "File too large"</h3>
                      <p className="text-sm text-gray-600">Compress the PDF. Use PDFSwift Compress. Target under 2MB if portal limit is low .</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Error: "Invalid file format"</h3>
                      <p className="text-sm text-gray-600">You might have uploaded JPG or PNG. Convert to PDF first. All documents must be PDF .</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Error: "Corrupted file"</h3>
                      <p className="text-sm text-gray-600">File might be damaged or incomplete. Try merging again with different tool. Use PDFSwift or Adobe .</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Error: "Pages missing"</h3>
                      <p className="text-sm text-gray-600">Check merged PDF. Some documents might not have converted fully. Reconvert and merge again .</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Error: "Special characters in filename"</h3>
                      <p className="text-sm text-gray-600">Rename file to simple: application.pdf. Remove #, &, %, spaces, special symbols .</p>
                    </div>
                  </div>
                </section>

                {/* Real Example */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Real Example: The Student Who Almost Missed the Deadline
                  </h2>
                  
                  <div className="border border-gray-200 rounded-xl p-6">
                    <p className="text-gray-700 mb-3">
                      Ravi was applying for a government exam. Had all documents ready. Merged them. Uploaded. Portal said "File too large." He tried compressing – still too large. Tried another tool – same error. Almost gave up.
                    </p>
                    <p className="text-gray-700 mb-3">
                      Problem: He scanned certificates in color at 600 DPI. Each file was 12MB. Five files = 60MB merged. Even after compression, 15MB. Portal limit was 5MB.
                    </p>
                    <p className="text-gray-700 mb-3">
                      Fix: Rescanned in black & white at 150 DPI. Files became 1MB each. Merged = 5MB exactly. Upload worked. Application submitted.
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-bold">Lesson:</span> Scan settings matter. Black & white + 150 DPI = readable files, small size .
                      </p>
                    </div>
                  </div>
                </section>

                {/* Tools Checklist */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Tools You Might Need
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-blue-200 rounded-xl p-4">
                      <h3 className="font-bold text-blue-700 mb-2">PDF Merger</h3>
                      <p className="text-sm">Combine all documents into one file. PDFSwift, Smallpdf, iLovePDF .</p>
                    </div>
                    
                    <div className="border border-green-200 rounded-xl p-4">
                      <h3 className="font-bold text-green-700 mb-2">Image to PDF</h3>
                      <p className="text-sm">Convert photos and signatures to PDF. PDFSwift Image to PDF .</p>
                    </div>
                    
                    <div className="border border-yellow-200 rounded-xl p-4">
                      <h3 className="font-bold text-yellow-700 mb-2">PDF Compressor</h3>
                      <p className="text-sm">Reduce file size for portal limits. PDFSwift Compress, Smallpdf Compress .</p>
                    </div>
                    
                    <div className="border border-purple-200 rounded-xl p-4">
                      <h3 className="font-bold text-purple-700 mb-2">Add Signature</h3>
                      <p className="text-sm">If you need to sign digitally. PDFSwift Add Image .</p>
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
                        What's the standard order for exam application documents?
                      </h3>
                      <p className="text-gray-700">
                        Every exam is different, but common order: 1) Filled application form, 2) Educational certificates (10th, 12th, graduation in order), 3) ID proof (Aadhar, passport, etc.), 4) Photo, 5) Signature, 6) Payment receipt. Always check your exam's instructions – some have very specific requirements. Following their order exactly prevents rejection .
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        My files are too big to upload. What should I do?
                      </h3>
                      <p className="text-gray-700">
                        This is the biggest problem with exam forms. Certificates scanned at high resolution can be 5-10MB each. Three certificates plus form plus ID = 50MB file. Many exam portals limit to 2MB or 5MB. Fix: Compress PDFs first. Use PDFSwift Compress tool or Smallpdf. Reduce to 1-2MB per file. Keep quality readable but don't go below 150 DPI. Also scan in black & white, not color – smaller files .
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Do I need to sign documents digitally before merging?
                      </h3>
                      <p className="text-gray-700">
                        Yes, most exams want your signature on the form. Options: Sign on paper, scan it, then merge. Or use a digital signature tool to add signature directly to PDF. Some exams accept typed names, but physical signature is safer. If you have a signature image (photo of your signature), you can add it to the PDF before merging using PDFSwift's 'Add Image' feature .
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        What if my certificates are in different formats (JPG, PNG)?
                      </h3>
                      <p className="text-gray-700">
                        Convert them to PDF first. Most scanners save as JPG. Use PDFSwift Image to PDF tool. Convert all images to PDF, then merge. This is better than trying to merge mixed formats. Also, photos and signatures should be in separate PDF pages, not embedded in forms. Each document gets its own page .
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        The exam portal says my merged PDF is corrupted. Why?
                      </h3>
                      <p className="text-gray-700">
                        Usually two reasons: File too large (compress it), or special characters in filename (use simple names like form.pdf, not form#2026@final.pdf). Also, some online mergers produce PDFs that aren't fully compatible. Use trusted tools. If problem persists, try merging in smaller batches or use Adobe's free online tool .
                      </p>
                    </div>
                  </div>
                </section>

                {/* Final Checklist */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Final Checklist Before Upload
                  </h2>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span>✅ All documents merged into ONE PDF file</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span>✅ Order matches exam instructions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span>✅ File size under portal limit (check limit first!)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span>✅ Filename is simple: application_name.pdf (no special characters)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span>✅ Photo and signature are clear and correct size</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span>✅ Test uploaded a sample to check if portal accepts</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span>✅ Keep backup copy on phone/computer</span>
                      </li>
                    </ul>
                    
                    <p className="text-sm text-gray-600 mt-4">
                      Take 2 minutes to check everything. Saves you from rejection and last-minute panic .
                    </p>
                  </div>
                </section>
              </div>

              {/* CTA */}
              <div className="mt-12 pt-10 border-t border-gray-200">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Merge Your Exam Documents Now
                  </h3>
                  <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                    Upload forms, certificates, photos – merge in correct order, compress if needed. All in one place. No signup, no uploads to servers.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/merge-pdf"
                      className="inline-flex items-center justify-center px-7 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300"
                    >
                      Merge PDFs Now
                    </Link>
                    <Link
                      href="/compress-pdf"
                      className="inline-flex items-center justify-center px-7 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10"
                    >
                      Compress PDF (If Too Large)
                    </Link>
                  </div>
                  <p className="mt-6 text-blue-200 text-sm">
                    Free • No signup • Files stay private • Works on phone
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