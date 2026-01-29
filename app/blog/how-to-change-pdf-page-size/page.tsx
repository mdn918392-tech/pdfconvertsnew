// app/blog/how-to-change-pdf-page-size/page.tsx

import { CalendarDays, Clock, CheckCircle, Upload, Download, ChevronRight, Settings, HelpCircle, FileText, Printer, Layout, Shield, Maximize2, Smartphone, Monitor, Globe, Zap, Eye, Ruler, Copy, Scale, FileCheck, Building, Briefcase } from "lucide-react";
import Link from "next/link";
import BlogToolsSection from "@/app/components/BlogToolsSection";

export const metadata = {
  title: "How to Change PDF Page Size (A4, A3, Legal, Letter) - Professional Guide | PDFSwift",
  description: "Complete professional guide on changing PDF page sizes between A4, A3, Letter, Legal and custom dimensions. Perfect for government documents, office reports, and professional publishing requirements.",
  keywords: "PDF page size, change PDF size, A4 to A3, resize PDF, PDF dimensions, paper size, government documents, office PDF, professional printing, document formatting",
  openGraph: {
    type: "article",
    url: "https://www.pdfswift.online/blog/how-to-change-pdf-page-size",
    title: "How to Change PDF Page Size (A4, A3, Letter) - Professional Guide",
    description: "Expert guide on resizing PDF pages for government, office, and professional use. Learn to convert between A4, A3, Letter, Legal and custom sizes with perfect formatting.",
    images: [{ url: "https://www.pdfswift.online/images/change-pdf-page-size.png", width: 1200, height: 630 }],
    siteName: "PDFSwift",
    locale: "en_US",
    publishedTime: "2026-01-30T09:00:00+00:00",
    authors: ["PDFSwift Team"],
    tags: ["PDF Page Size", "Document Resizing", "Government Documents", "Office PDF", "Professional Formatting"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Change PDF Page Size (A4, A3, Letter) - Professional Guide",
    description: "Resize PDF pages professionally for government, office, and publishing requirements",
    images: ["https://www.pdfswift.online/images/change-pdf-page-size.png"],
  },
  robots: { 
    index: true, 
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  authors: [{ name: "PDFSwift Team", url: "https://www.pdfswift.online" }],
  publisher: "PDFSwift",
  metadataBase: new URL("https://www.pdfswift.online"),
  alternates: { 
    canonical: "/blog/how-to-change-pdf-page-size",
  },
  category: "Professional Guide",
  other: {
    'article:published_time': '2026-01-30T09:00:00+00:00',
    'article:modified_time': '2026-01-30T09:00:00+00:00',
    'article:section': 'Professional Guide',
    'article:tag': ['PDF Page Size', 'Document Formatting', 'Government Documents', 'Office Tools', 'Professional PDF'],
  }
};

export default function HowToChangePDFPageSize() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://www.pdfswift.online/blog/how-to-change-pdf-page-size#article",
        "headline": "How to Change PDF Page Size (A4, A3, Letter) - Complete Professional Guide",
        "description": "Comprehensive professional guide on changing PDF page sizes between international standards. Learn to resize documents for government submissions, office reports, legal documents, and professional publishing with perfect formatting.",
        "datePublished": "2026-01-30T09:00:00+00:00",
        "dateModified": "2026-01-30T09:00:00+00:00",
        "author": {
          "@type": "Organization",
          "@id": "https://www.pdfswift.online#organization",
          "name": "PDFSwift",
          "url": "https://www.pdfswift.online",
          "logo": {
            "@type": "ImageObject",
            "@id": "https://www.pdfswift.online#logo",
            "url": "https://www.pdfswift.online/logo.png",
            "width": 300,
            "height": 60
          }
        },
        "publisher": {
          "@id": "https://www.pdfswift.online#organization"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://www.pdfswift.online/blog/how-to-change-pdf-page-size"
        },
        "wordCount": 1300,
        "timeRequired": "PT6M",
        "articleSection": "Professional Guide",
        "articleBody": `Complete professional guide covering PDF page size changing for government, office, and business requirements. Includes ISO standards, legal dimensions, scaling options, margin adjustments, and quality preservation techniques.`,
        "keywords": "PDF page size change, A4 to A3 conversion, Letter size PDF, Legal document formatting, ISO paper sizes, government PDF requirements, office document resizing, professional printing, PDF dimensions, document standards",
        "thumbnailUrl": "https://www.pdfswift.online/images/change-pdf-page-size.png",
        "image": {
          "@type": "ImageObject",
          "url": "https://www.pdfswift.online/images/change-pdf-page-size.png",
          "width": 1200,
          "height": 630
        }
      },
      {
        "@type": "HowTo",
        "@id": "https://www.pdfswift.online/blog/how-to-change-pdf-page-size#howto",
        "name": "How to Change PDF Page Size Professionally",
        "description": "Step-by-step professional guide to resize PDF documents between different paper sizes while maintaining quality and formatting",
        "totalTime": "PT4M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "step": [
          {
            "@type": "HowToStep",
            "name": "Upload your PDF document securely",
            "text": "Upload your government, office, or professional PDF document to the secure resizing tool. All processing happens locally in your browser.",
            "url": "https://www.pdfswift.online/blog/how-to-change-pdf-page-size#step1"
          },
          {
            "@type": "HowToStep",
            "name": "Select target page size and standards",
            "text": "Choose from international standards: A4 (ISO), A3 (ISO), Letter (US), Legal (US), or enter custom dimensions for specific requirements.",
            "url": "https://www.pdfswift.online/blog/how-to-change-pdf-page-size#step2"
          },
          {
            "@type": "HowToStep",
            "name": "Configure professional scaling options",
            "text": "Select scaling method: Fit to page (maintains aspect ratio), Actual size (keeps original dimensions), or Custom scale for precise control.",
            "url": "https://www.pdfswift.online/blog/how-to-change-pdf-page-size#step3"
          },
          {
            "@type": "HowToStep",
            "name": "Adjust margins and orientation",
            "text": "Set professional margins for printing and binding. Choose between portrait and landscape orientation based on document requirements.",
            "url": "https://www.pdfswift.online/blog/how-to-change-pdf-page-size#step4"
          },
          {
            "@type": "HowToStep",
            "name": "Preview and download resized PDF",
            "text": "Review the preview to ensure perfect formatting, then download your professionally resized PDF document.",
            "url": "https://www.pdfswift.online/blog/how-to-change-pdf-page-size#step5"
          }
        ],
        "tool": [
          {
            "@type": "HowToTool",
            "name": "PDFSwift Page Size Changer"
          },
          {
            "@type": "HowToTool",
            "name": "Professional PDF editing tools"
          }
        ],
        "supply": [
          {
            "@type": "HowToSupply",
            "name": "PDF document"
          },
          {
            "@type": "HowToSupply",
            "name": "Target page size requirements"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.pdfswift.online/blog/how-to-change-pdf-page-size#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can I change PDF page size from A4 to A3 without losing quality?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, PDFSwift maintains vector quality when resizing PDF pages. Text remains crisp and graphics stay sharp when scaling between standard paper sizes like A4 to A3 or Letter to Legal."
            }
          },
          {
            "@type": "Question",
            "name": "What page sizes are supported for government documents?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "All standard government document sizes are supported: A4 (210×297mm, ISO standard), A3 (297×420mm, ISO), Letter (8.5×11\", US standard), Legal (8.5×14\", US), and custom dimensions for specific departmental requirements."
            }
          },
          {
            "@type": "Question",
            "name": "How do I resize PDF for printing on different paper sizes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Select your target printing paper size, choose 'Fit to page' scaling to maintain aspect ratio, adjust professional margins for binding/notes, enable print optimization, and preview before final download to ensure perfect printing results."
            }
          },
          {
            "@type": "Question",
            "name": "Can I resize only specific pages in a multi-page PDF?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, professional PDF resizing tools allow selective page resizing. You can choose individual pages or page ranges to resize while keeping other pages at their original dimensions - perfect for documents with mixed content like reports with appendices or legal filings with exhibits."
            }
          },
          {
            "@type": "Question",
            "name": "Is PDF page resizing secure for confidential documents?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely secure. All PDF resizing with PDFSwift happens locally in your browser using client-side processing. No files are uploaded to any server, ensuring complete confidentiality for government documents, legal files, financial reports, and other sensitive materials."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.pdfswift.online/blog/how-to-change-pdf-page-size#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.pdfswift.online"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://www.pdfswift.online/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "How to Change PDF Page Size",
            "item": "https://www.pdfswift.online/blog/how-to-change-pdf-page-size"
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Breadcrumb Navigation */}
        <nav className="bg-white shadow-sm border-b" aria-label="Breadcrumb">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <ol className="flex items-center text-sm text-gray-600">
              <li className="flex items-center">
                <Link href="/" className="hover:text-blue-600 transition-colors duration-200">Home</Link>
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" aria-hidden="true" />
              </li>
              <li className="flex items-center">
                <Link href="/blog" className="hover:text-blue-600 transition-colors duration-200">Blog</Link>
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" aria-hidden="true" />
              </li>
              <li aria-current="page">
                <span className="text-gray-900 font-semibold">How to Change PDF Page Size</span>
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
                    <FileText className="w-4 h-4 mr-2" aria-hidden="true" /> Professional Guide
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                    <CalendarDays className="w-4 h-4 mr-2" aria-hidden="true" /> January 30, 2026
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                    <Building className="w-4 h-4 mr-2" aria-hidden="true" /> Government & Office
                  </span>
                </div>
                
                {/* Main Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight tracking-tight">
                  How to Change PDF Page Size<br />
                  <span className="text-2xl md:text-3xl lg:text-4xl text-blue-600">A4, A3, Letter, Legal - Professional Guide</span>
                </h1>
                
                {/* Date and Reading Time */}
                <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-4">
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 mr-2 text-gray-500" aria-hidden="true" />
                    <time dateTime="2026-01-30" className="font-medium">January 30, 2026</time>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gray-500" aria-hidden="true" />
                    <span className="font-medium">6 minute read</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-gray-500" aria-hidden="true" />
                    <span className="font-medium">Professional & Government Focus</span>
                  </div>
                </div>
                
                {/* Professional Introduction */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-100 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                  <div className="flex items-start">
                    <FileCheck className="w-7 h-7 text-blue-600 mr-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-gray-800 font-bold text-lg mb-3">Professional Document Preparation</p>
                      <p className="text-gray-700">
                        Government submissions, office reports, legal documents, and professional publications 
                        require specific page sizes. This comprehensive guide provides expert techniques for 
                        resizing PDF documents while maintaining professional formatting, quality, and compliance 
                        with international standards.
                      </p>
                    </div>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div className="space-y-10">
                
                {/* Introduction Section */}
                <section className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Professional PDF Page Sizing: Why It Matters
                  </h2>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    In professional, government, and office environments, document formatting isn't just about 
                    aesthetics—it's about compliance, readability, and proper presentation. Different organizations 
                    and jurisdictions require specific page sizes for official submissions.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <Building className="w-8 h-8 text-blue-600 mr-3" />
                        <h3 className="text-xl font-bold text-blue-700">Government Requirements</h3>
                      </div>
                      <p className="text-gray-700">
                        • Tax filings: Specific paper sizes for different forms<br/>
                        • Legal submissions: Court-mandated dimensions<br/>
                        • Official reports: ISO standard compliance<br/>
                        • International documents: A4 vs Letter standards
                      </p>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <Briefcase className="w-8 h-8 text-green-600 mr-3" />
                        <h3 className="text-xl font-bold text-green-700">Office & Business Needs</h3>
                      </div>
                      <p className="text-gray-700">
                        • Professional reports: Consistent formatting<br/>
                        • Marketing materials: Different sizes for different purposes<br/>
                        • Legal documents: Specific jurisdictional requirements<br/>
                        • Technical documentation: Engineering standards
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    According to document management studies, <strong>over 40% of document rejections</strong> 
                    in government and legal contexts are due to incorrect page sizing or formatting. This guide 
                    provides the professional techniques to avoid these issues.
                  </p>
                </section>

                {/* International Standards Section */}
                <section className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    International Page Size Standards
                  </h2>

                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Standard
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Dimensions
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Usage
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Common Applications
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                <span className="font-bold text-blue-600">A4</span>
                              </div>
                              <div>
                                <div className="font-bold text-gray-900">A4 (ISO 216)</div>
                                <div className="text-sm text-gray-500">International Standard</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">210 × 297 mm</div>
                            <div className="text-sm text-gray-500">8.27 × 11.69 inches</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Global Standard
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-700">Business documents, academic papers, government forms (outside US)</div>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                <span className="font-bold text-green-600">A3</span>
                              </div>
                              <div>
                                <div className="font-bold text-gray-900">A3 (ISO 216)</div>
                                <div className="text-sm text-gray-500">Large Format</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">297 × 420 mm</div>
                            <div className="text-sm text-gray-500">11.69 × 16.54 inches</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Professional Use
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-700">Architectural plans, engineering drawings, posters, presentations</div>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                <span className="font-bold text-purple-600">LTR</span>
                              </div>
                              <div>
                                <div className="font-bold text-gray-900">Letter (ANSI A)</div>
                                <div className="text-sm text-gray-500">US Standard</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">8.5 × 11 inches</div>
                            <div className="text-sm text-gray-500">216 × 279 mm</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                              North America
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-700">US business correspondence, academic papers, government forms</div>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                                <span className="font-bold text-yellow-600">LGL</span>
                              </div>
                              <div>
                                <div className="font-bold text-gray-900">Legal</div>
                                <div className="text-sm text-gray-500">US Legal Standard</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">8.5 × 14 inches</div>
                            <div className="text-sm text-gray-500">216 × 356 mm</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Legal Documents
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-700">Legal contracts, official agreements, government certificates</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Step-by-Step Guide */}
                <section id="step-by-step" className="space-y-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Professional PDF Page Resizing: Step-by-Step Guide
                  </h2>

                  <div className="space-y-8">
                    {/* Step 1 */}
                    <div id="step1" className="border border-gray-200 rounded-xl p-8 bg-gradient-to-r from-white to-blue-50">
                      <div className="flex flex-col lg:flex-row items-start">
                        <div className="flex-shrink-0 w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mb-6 lg:mb-0 lg:mr-8">
                          1
                        </div>

                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Upload Your Professional PDF Document
                          </h3>

                          <p className="text-gray-700 mb-6 leading-relaxed">
                            Begin by securely uploading your government, office, or professional PDF document. 
                            PDFSwift ensures maximum security with client-side processing—no files leave your computer.
                          </p>

                          <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-white p-5 rounded-xl border border-blue-200">
                              <div className="flex items-center mb-3">
                                <Shield className="w-6 h-6 text-blue-600 mr-3" />
                                <h4 className="text-lg font-bold text-blue-700">Security Features</h4>
                              </div>
                              <ul className="space-y-3">
                                <li className="flex items-start">
                                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">Client-side browser processing</span>
                                </li>
                                <li className="flex items-start">
                                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">No server uploads for confidential documents</span>
                                </li>
                                <li className="flex items-start">
                                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">Government-grade security protocols</span>
                                </li>
                              </ul>
                            </div>

                            <div className="bg-white p-5 rounded-xl border border-green-200">
                              <div className="flex items-center mb-3">
                                <Upload className="w-6 h-6 text-green-600 mr-3" />
                                <h4 className="text-lg font-bold text-green-700">Document Support</h4>
                              </div>
                              <ul className="space-y-3">
                                <li className="flex items-start">
                                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">Multi-page PDF documents</span>
                                </li>
                                <li className="flex items-start">
                                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">High-resolution scanned documents</span>
                                </li>
                                <li className="flex items-start">
                                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">Password-protected PDFs</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div id="step2" className="border border-gray-200 rounded-xl p-8 bg-gradient-to-r from-white to-green-50">
                      <div className="flex flex-col lg:flex-row items-start">
                        <div className="flex-shrink-0 w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mb-6 lg:mb-0 lg:mr-8">
                          2
                        </div>

                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Select Target Page Size & Standards
                          </h3>

                          <p className="text-gray-700 mb-6 leading-relaxed">
                            Choose from international standards or enter custom dimensions for specific 
                            organizational requirements.
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div className="bg-white border-2 border-blue-300 rounded-lg p-4 text-center">
                              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <span className="text-xl font-bold text-blue-600">A4</span>
                              </div>
                              <h4 className="font-bold text-blue-700 mb-1">A4 Standard</h4>
                              <p className="text-sm text-gray-600">210 × 297 mm</p>
                              <p className="text-xs text-blue-500 mt-2">ISO International</p>
                            </div>

                            <div className="bg-white border-2 border-green-300 rounded-lg p-4 text-center">
                              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <span className="text-xl font-bold text-green-600">A3</span>
                              </div>
                              <h4 className="font-bold text-green-700 mb-1">A3 Standard</h4>
                              <p className="text-sm text-gray-600">297 × 420 mm</p>
                              <p className="text-xs text-green-500 mt-2">Large Format</p>
                            </div>

                            <div className="bg-white border-2 border-purple-300 rounded-lg p-4 text-center">
                              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <span className="text-xl font-bold text-purple-600">LTR</span>
                              </div>
                              <h4 className="font-bold text-purple-700 mb-1">Letter</h4>
                              <p className="text-sm text-gray-600">8.5 × 11"</p>
                              <p className="text-xs text-purple-500 mt-2">US Standard</p>
                            </div>

                            <div className="bg-white border-2 border-yellow-300 rounded-lg p-4 text-center">
                              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <span className="text-xl font-bold text-yellow-600">LGL</span>
                              </div>
                              <h4 className="font-bold text-yellow-700 mb-1">Legal</h4>
                              <p className="text-sm text-gray-600">8.5 × 14"</p>
                              <p className="text-xs text-yellow-500 mt-2">Legal Documents</p>
                            </div>
                          </div>

                          <div className="bg-white p-5 rounded-xl border border-green-200">
                            <div className="flex items-center mb-3">
                              <Ruler className="w-6 h-6 text-green-600 mr-3" />
                              <h4 className="text-lg font-bold text-green-700">Custom Dimensions</h4>
                            </div>
                            <p className="text-gray-700 mb-3">
                              For specialized requirements, enter exact dimensions in millimeters, 
                              inches, or points. Perfect for:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                <span className="text-sm text-gray-600">Government certificate sizes</span>
                              </div>
                              <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                <span className="text-sm text-gray-600">Engineering drawing standards</span>
                              </div>
                              <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                <span className="text-sm text-gray-600">Architectural plan requirements</span>
                              </div>
                              <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                <span className="text-sm text-gray-600">Custom report formats</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div id="step3" className="border border-gray-200 rounded-xl p-8 bg-gradient-to-r from-white to-purple-50">
                      <div className="flex flex-col lg:flex-row items-start">
                        <div className="flex-shrink-0 w-20 h-20 bg-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mb-6 lg:mb-0 lg:mr-8">
                          3
                        </div>

                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Configure Professional Scaling Options
                          </h3>

                          <p className="text-gray-700 mb-6 leading-relaxed">
                            Choose how content scales to the new page size while maintaining professional 
                            quality and readability.
                          </p>

                          <div className="space-y-6">
                            <div className="bg-white border-2 border-blue-200 rounded-xl p-5">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center">
                                  <Scale className="w-6 h-6 text-blue-600 mr-3" />
                                  <h4 className="text-xl font-bold text-blue-700">Fit to Page (Recommended)</h4>
                                </div>
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                                  Professional Choice
                                </span>
                              </div>
                              <p className="text-gray-700 mb-3">
                                Automatically scales content to fit the new page size while maintaining 
                                aspect ratio. Preserves formatting and prevents distortion.
                              </p>
                              <div className="flex items-center text-sm text-blue-600">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                <span>Maintains aspect ratio</span>
                              </div>
                            </div>

                            <div className="bg-white border-2 border-green-200 rounded-xl p-5">
                              <div className="flex items-center mb-3">
                                <Maximize2 className="w-6 h-6 text-green-600 mr-3" />
                                <h4 className="text-xl font-bold text-green-700">Actual Size</h4>
                              </div>
                              <p className="text-gray-700 mb-3">
                                Keeps original content dimensions. Useful when you need exact 
                                measurements preserved.
                              </p>
                              <div className="flex items-center text-sm text-green-600">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                <span>Preserves exact measurements</span>
                              </div>
                            </div>

                            <div className="bg-white border-2 border-purple-200 rounded-xl p-5">
                              <div className="flex items-center mb-3">
                                <Settings className="w-6 h-6 text-purple-600 mr-3" />
                                <h4 className="text-xl font-bold text-purple-700">Custom Scale</h4>
                              </div>
                              <p className="text-gray-700 mb-3">
                                Enter specific percentage scaling for precise control over 
                                content dimensions.
                              </p>
                              <div className="flex items-center text-sm text-purple-600">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                <span>Perfect for engineering drawings</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div id="step4" className="border border-gray-200 rounded-xl p-8 bg-gradient-to-r from-white to-yellow-50">
                      <div className="flex flex-col lg:flex-row items-start">
                        <div className="flex-shrink-0 w-20 h-20 bg-yellow-500 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mb-6 lg:mb-0 lg:mr-8">
                          4
                        </div>

                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Adjust Professional Margins & Orientation
                          </h3>

                          <p className="text-gray-700 mb-6 leading-relaxed">
                            Configure professional margins for printing, binding, and official submissions.
                          </p>

                          <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white p-5 rounded-xl border border-yellow-200">
                              <h4 className="text-lg font-bold text-yellow-700 mb-4">Professional Margin Settings</h4>
                              
                              <div className="space-y-4">
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-gray-700">No Margin</span>
                                    <span className="font-bold text-yellow-600">0"</span>
                                  </div>
                                  <p className="text-sm text-gray-600">Full-bleed printing, posters</p>
                                </div>

                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-gray-700">Small Margin</span>
                                    <span className="font-bold text-green-600">0.5"</span>
                                  </div>
                                  <p className="text-sm text-gray-600">Standard documents, office reports</p>
                                </div>

                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-gray-700">Big Margin</span>
                                    <span className="font-bold text-blue-600">1"</span>
                                  </div>
                                  <p className="text-sm text-gray-600">Legal documents, binding, annotations</p>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white p-5 rounded-xl border border-blue-200">
                              <h4 className="text-lg font-bold text-blue-700 mb-4">Orientation Options</h4>
                              
                              <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                  <div className="flex items-center">
                                    <FileText className="w-5 h-5 text-blue-600 mr-3" />
                                    <span className="font-medium">Portrait</span>
                                  </div>
                                  <span className="text-sm text-gray-600">Standard documents</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                  <div className="flex items-center">
                                    <Layout className="w-5 h-5 text-green-600 mr-3" />
                                    <span className="font-medium">Landscape</span>
                                  </div>
                                  <span className="text-sm text-gray-600">Wide tables, presentations</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                  <div className="flex items-center">
                                    <Copy className="w-5 h-5 text-purple-600 mr-3" />
                                    <span className="font-medium">Mixed Orientation</span>
                                  </div>
                                  <span className="text-sm text-gray-600">Complex documents</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
                            <h4 className="font-bold text-yellow-700 mb-3">Government & Legal Requirements:</h4>
                            <ul className="space-y-2 text-yellow-700">
                              <li className="flex items-start">
                                <CheckCircle className="w-4 h-4 mr-2 mt-0.5" />
                                <span>Court filings often require 1" margins on all sides</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="w-4 h-4 mr-2 mt-0.5" />
                                <span>Government forms may specify exact margin requirements</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="w-4 h-4 mr-2 mt-0.5" />
                                <span>Professional printing requires specific bleed margins</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 5 */}
                    <div id="step5" className="border border-gray-200 rounded-xl p-8 bg-gradient-to-r from-white to-green-50">
                      <div className="flex flex-col lg:flex-row items-start">
                        <div className="flex-shrink-0 w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mb-6 lg:mb-0 lg:mr-8">
                          5
                        </div>

                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Preview & Download Professional PDF
                          </h3>

                          <p className="text-gray-700 mb-6 leading-relaxed">
                            Review your resized document and download the professionally formatted PDF.
                          </p>

                          <div className="bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300 rounded-2xl p-8 mb-8">
                            <div className="flex flex-col lg:flex-row items-center justify-between">
                              <div className="mb-6 lg:mb-0 lg:mr-8">
                                <div className="flex items-center mb-4">
                                  <Eye className="w-8 h-8 text-green-600 mr-4" />
                                  <h4 className="text-2xl font-bold text-gray-900">Professional Preview</h4>
                                </div>
                                <p className="text-gray-700 mb-4">
                                  Examine the resized document with zoom and page navigation. 
                                  Check formatting, margins, and content alignment.
                                </p>
                                <div className="flex items-center text-green-600">
                                  <CheckCircle className="w-5 h-5 mr-2" />
                                  <span className="font-medium">Real-time preview updates</span>
                                </div>
                              </div>

                              <div className="bg-white p-6 rounded-xl border border-green-300">
                                <h5 className="font-bold text-gray-900 mb-3">Document Summary</h5>
                                <div className="space-y-3">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Original Size:</span>
                                    <span className="font-bold">A4</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">New Size:</span>
                                    <span className="font-bold text-green-600">A3</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Scaling:</span>
                                    <span className="font-bold">Fit to Page</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Margins:</span>
                                    <span className="font-bold">0.5" Professional</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Quality:</span>
                                    <span className="font-bold text-blue-600">Maximum</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white p-5 rounded-xl border border-green-200">
                              <div className="flex items-center mb-3">
                                <Download className="w-6 h-6 text-green-600 mr-3" />
                                <h4 className="text-lg font-bold text-green-700">Download Options</h4>
                              </div>
                              <ul className="space-y-3">
                                <li className="flex items-center">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                  <span>High-quality PDF output</span>
                                </li>
                                <li className="flex items-center">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                  <span>Print-optimized version</span>
                                </li>
                                <li className="flex items-center">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                  <span>Web-optimized (smaller file)</span>
                                </li>
                              </ul>
                            </div>

                            <div className="bg-white p-5 rounded-xl border border-blue-200">
                              <div className="flex items-center mb-3">
                                <Shield className="w-6 h-6 text-blue-600 mr-3" />
                                <h4 className="text-lg font-bold text-blue-700">Security Assurance</h4>
                              </div>
                              <ul className="space-y-3">
                                <li className="flex items-center">
                                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                                  <span>No server storage</span>
                                </li>
                                <li className="flex items-center">
                                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                                  <span>Browser-based processing</span>
                                </li>
                                <li className="flex items-center">
                                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                                  <span>Original file preserved</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Professional Applications */}
                <section className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Professional Applications & Use Cases
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <Building className="w-8 h-8 text-blue-600 mr-3" />
                        <h3 className="text-xl font-bold text-blue-700">Government Documents</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                          <span>Tax forms resizing for different jurisdictions</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                          <span>Court document formatting for submissions</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                          <span>Official certificate size adjustments</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                          <span>International document standardization</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <Briefcase className="w-8 h-8 text-green-600 mr-3" />
                        <h3 className="text-xl font-bold text-green-700">Office & Business</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                          <span>Professional report formatting</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                          <span>Marketing material resizing</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                          <span>Legal contract preparation</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                          <span>Technical documentation standardization</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="space-y-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
                    <HelpCircle className="w-7 h-7 mr-3 text-purple-500" aria-hidden="true" />
                    Professional Questions & Answers
                  </h2>

                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Can I change PDF page size from A4 to A3 without losing quality?
                      </h3>
                      <div className="text-gray-700">
                        Yes, PDFSwift maintains vector quality when resizing PDF pages. Text remains crisp and 
                        graphics stay sharp when scaling between standard paper sizes. The tool uses advanced 
                        vector scaling algorithms that preserve the mathematical definitions of text and shapes, 
                        ensuring professional quality results suitable for government submissions and office 
                        documents.
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        What page sizes are supported for government documents?
                      </h3>
                      <div className="text-gray-700">
                        All standard government document sizes are supported: 
                        <strong> A4 (210×297mm, ISO standard)</strong> for international submissions, 
                        <strong> A3 (297×420mm, ISO)</strong> for large format documents, 
                        <strong> Letter (8.5×11", US standard)</strong> for North American agencies, 
                        <strong> Legal (8.5×14", US)</strong> for legal filings, and 
                        <strong> custom dimensions</strong> for specific departmental requirements like 
                        certificates, permits, and official forms.
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        How do I resize PDF for printing on different paper sizes?
                      </h3>
                      <div className="text-gray-700">
                        Select your target printing paper size, choose 'Fit to page' scaling to maintain 
                        aspect ratio, adjust professional margins for binding/notes (typically 0.5" for 
                        standard documents, 1" for legal/binding), enable print optimization settings, 
                        and preview before final download. The tool automatically optimizes for professional 
                        printing with proper bleed areas and trim marks when needed.
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Can I resize only specific pages in a multi-page PDF?
                      </h3>
                      <div className="text-gray-700">
                        Yes, professional PDF resizing tools allow selective page resizing. You can choose 
                        individual pages or page ranges to resize while keeping other pages at their original 
                        dimensions. This is essential for complex documents like reports with mixed content, 
                        legal filings with exhibits, technical manuals with different section requirements, 
                        or government submissions with standardized forms and variable supporting documents.
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Is PDF page resizing secure for confidential documents?
                      </h3>
                      <div className="text-gray-700">
                        Absolutely secure. All PDF resizing with PDFSwift happens locally in your browser 
                        using client-side processing technology. No files are uploaded to any server, ensuring 
                        complete confidentiality for government documents, legal files, financial reports, 
                        medical records, intellectual property, and other sensitive materials. Your documents 
                        never leave your computer during the entire resizing process.
                      </div>
                    </div>
                  </div>
                </section>

                {/* Conclusion Section */}
                <section className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Professional Conclusion
                  </h2>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-8">
                    <p className="text-gray-800 text-lg mb-6 leading-relaxed">
                      Changing PDF page sizes professionally requires understanding international standards, 
                      maintaining document quality, and ensuring compliance with specific requirements. 
                      Whether you're preparing government submissions, office reports, legal documents, or 
                      professional publications, proper page sizing is essential for acceptance and readability.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 my-6">
                      <div className="bg-white p-5 rounded-lg border border-blue-200">
                        <h4 className="font-bold text-blue-700 mb-3">Key Professional Benefits:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Compliance with international standards</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Professional quality preservation</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Secure processing for confidential documents</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-white p-5 rounded-lg border border-green-200">
                        <h4 className="font-bold text-green-700 mb-3">Essential Features:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Multiple international size standards</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Professional scaling and margin options</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Selective page resizing capabilities</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <p className="text-gray-800 leading-relaxed">
                      With PDFSwift's professional page resizing tools, you can confidently prepare documents 
                      for any requirement while ensuring security, quality, and compliance with organizational 
                      standards.
                    </p>
                  </div>
                </section>
              </div>

              {/* Professional Call to Action */}
              <div className="mt-12 pt-10 border-t border-gray-200">
                <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-8 text-center text-white">
                  <div className="flex flex-col lg:flex-row items-center justify-between">
                    <div className="mb-6 lg:mb-0 lg:mr-8 text-left">
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">Professional PDF Resizing Solution</h3>
                      <p className="text-lg text-blue-100">
                        Trusted by government agencies, legal firms, and corporations for secure, 
                        high-quality document preparation.
                      </p>
                    </div>
                    
                   <div className="flex flex-col sm:flex-row gap-4 items-center">
  {/* Resize Image */}
  <Link 
    href="/resize-image" 
    className="inline-flex items-center justify-center px-7 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
    aria-label="Resize Image Online"
  >
    <Ruler className="w-6 h-6 mr-3" aria-hidden="true" />
    Resize Image
  </Link>

  {/* JPG to PDF */}
  <Link 
    href="/jpg-to-pdf" 
    className="inline-flex items-center justify-center px-7 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
    aria-label="Convert JPG to PDF Online"
  >
    <FileText className="w-6 h-6 mr-3" aria-hidden="true" />
    JPG to PDF
  </Link>

  <p className="w-full mt-2 sm:mt-4 text-blue-200 text-sm text-center">
    <Shield className="w-4 h-4 inline mr-2" />
    Secure processing • High quality output • No watermark
  </p>
</div>

                  </div>
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