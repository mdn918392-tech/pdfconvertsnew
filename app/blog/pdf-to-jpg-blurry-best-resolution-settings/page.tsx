// app/blog/pdf-to-jpg-blurry-best-resolution-settings/page.tsx

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
  Info,
  Smartphone
} from "lucide-react";
export const metadata = {
  title: "PDF to JPG Looks Blurry? Here Are the Best Resolution Settings | PDFSwift",
  description: "Tired of blurry JPGs from your PDFs? Here's exactly which resolution settings to use and why. No guesswork. Just clear images every time.",
  keywords: "pdf to jpg blurry, pdf to jpg resolution, pdf to jpg dpi settings, pdf to image quality, fix blurry pdf conversion",
  openGraph: {
    type: "article",
    url: "https://www.pdfswift.online/blog/pdf-to-jpg-blurry-best-resolution-settings",
    title: "PDF to JPG Looks Blurry? Here Are the Best Resolution Settings",
    description: "Tired of blurry JPGs from your PDFs? Here's exactly which resolution settings to use and why.",
    images: [
      {
        url: "https://www.pdfswift.online/images/pdf-to-jpg-resolution-guide.png",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "PDFSwift",
    locale: "en_US",
    publishedTime: "2026-02-18T08:00:00+00:00",
    authors: ["PDFSwift Team"],
    tags: ["pdf to jpg", "blurry pdf", "resolution settings", "dpi", "image quality", "2026 guide"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to JPG Looks Blurry? Here Are the Best Resolution Settings",
    description: "Tired of blurry JPGs from your PDFs? Here's exactly which resolution settings to use and why.",
    images: ["https://www.pdfswift.online/images/pdf-to-jpg-resolution-guide.png"],
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
    canonical: "/blog/pdf-to-jpg-blurry-best-resolution-settings",
  },
  category: "How-to Guide",
  other: {
    "article:published_time": "2026-02-18T08:00:00+00:00",
    "article:modified_time": "2026-02-18T08:00:00+00:00",
    "article:section": "How-to Guide",
    "article:tag": ["pdf to jpg", "blurry pdf", "resolution settings", "dpi", "how-to guide"],
  },
};

export default function PDFtoJPGBlurry() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://www.pdfswift.online/blog/pdf-to-jpg-blurry-best-resolution-settings#article",
        headline: "PDF to JPG Looks Blurry? Here Are the Best Resolution Settings",
        description: "Tired of blurry JPGs from your PDFs? Here's exactly which resolution settings to use and why. No guesswork. Just clear images every time.",
        datePublished: "2026-02-18T08:00:00+00:00",
        dateModified: "2026-02-18T08:00:00+00:00",
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
          "@id": "https://www.pdfswift.online/blog/pdf-to-jpg-blurry-best-resolution-settings",
        },
        wordCount: 1300,
        timeRequired: "PT9M",
        articleSection: "How-to Guide",
        articleBody: `Complete guide to fixing blurry PDF to JPG conversions. Covers DPI settings, compression artifacts, PNG vs JPG choices, and step-by-step instructions for crisp results.`,
        keywords: "pdf to jpg blurry, pdf to jpg resolution, pdf to jpg dpi settings, pdf to image quality, fix blurry pdf conversion",
        thumbnailUrl: "https://www.pdfswift.online/images/pdf-to-jpg-resolution-guide.png",
        image: {
          "@type": "ImageObject",
          url: "https://www.pdfswift.online/images/pdf-to-jpg-resolution-guide.png",
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.pdfswift.online/blog/pdf-to-jpg-blurry-best-resolution-settings#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What DPI should I use for PDF to JPG conversion?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "300 DPI is the sweet spot for almost everything. It gives sharp text, clear images, and manageable files. 150 DPI is fine for web use. 72 DPI (the default on many tools) is why your images look blurry.",
            },
          },
          {
            "@type": "Question",
            name: "Why does my PDF to JPG conversion look pixelated?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Almost always because of low DPI. Most free converters default to 72 DPI to keep files small. The fix: use 300 DPI. Also check if you're compressing too much - JPG quality below 70% shows artifacts.",
            },
          },
          {
            "@type": "Question",
            name: "Is PNG better than JPG for PDF conversion?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For text and sharp graphics, yes. PNG is lossless - no compression artifacts. For photos, JPG is fine. For documents with small text or logos, PNG is better. Files are larger but quality is perfect.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.pdfswift.online/blog/pdf-to-jpg-blurry-best-resolution-settings#breadcrumb",
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
            name: "PDF to JPG Blurry Fix",
            item: "https://www.pdfswift.online/blog/pdf-to-jpg-blurry-best-resolution-settings",
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
                  PDF to JPG Blurry Fix
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
                    PDF to Image
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                    February 18, 2026
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                    Resolution Guide
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                  PDF to JPG Looks Blurry?
                  <br />
                  <span className="text-2xl md:text-3xl lg:text-4xl text-blue-600">
                    Here Are the Best Resolution Settings
                  </span>
                </h1>

                {/* Date and Reading Time */}
                <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-4">
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 mr-2 text-gray-500" />
                    <time dateTime="2026-02-18">February 18, 2026</time>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gray-500" />
                    <span>9 minute read</span>
                  </div>
                </div>

                {/* Introduction */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-100 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                  <div className="flex items-start">
                    <Image className="w-7 h-7 text-blue-600 mr-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-800 font-bold text-lg mb-3">
                        I converted a PDF to JPG and the text looked like it was melting
                      </p>
                      <p className="text-gray-700">
                        Client sent a contract. Needed to turn it into an image for a presentation. Used a free converter. The text was fuzzy, edges were pixelated, looked unprofessional. I tried another tool. Same thing. Another. Slightly better but still blurry. Turns out it wasn't the tools - it was the settings. Every converter was defaulting to 72 DPI. That's the problem. Here's exactly what DPI means, which setting to use, and why 300 DPI is the magic number [citation:1][citation:4].
                      </p>
                    </div>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div className="space-y-10">
                {/* The DPI Problem */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Why 72 DPI Is Ruining Your Images
                  </h2>
                  
                  <div className="border border-red-200 rounded-xl p-6 bg-red-50">
                    <div className="flex items-start">
                      <AlertCircle className="w-6 h-6 text-red-600 mr-3 mt-0.5" />
                      <div>
                        <p className="text-gray-800 mb-3">
                          Here's the problem nobody explains.
                        </p>
                        <p className="text-gray-700 mb-3">
                          DPI means "dots per inch." When a PDF is converted to JPG, the converter decides how many pixels to put in each inch of the image. 72 DPI means 72 pixels per inch. That's fine for old computer monitors. But for sharp text and clear graphics? Not enough [citation:3][citation:9].
                        </p>
                        <div className="bg-white p-4 rounded-lg border border-red-200">
                          <p className="text-sm font-medium text-gray-900 mb-2">What different DPI looks like:</p>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-start">
                              <X className="w-4 h-4 text-red-500 mr-2 mt-0.5" /> <span><span className="font-bold">72 DPI:</span> Blurry text, pixelated edges. Fine for web thumbnails only.</span>
                            </li>
                            <li className="flex items-start">
                              <X className="w-4 h-4 text-yellow-500 mr-2 mt-0.5" /> <span><span className="font-bold">150 DPI:</span> Acceptable for screen use. Text readable but not crisp.</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /> <span><span className="font-bold">300 DPI:</span> Sharp text, clear graphics. Good for print and screen.</span>
                            </li>
                            <li className="flex items-start">
                              <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5" /> <span><span className="font-bold">600 DPI:</span> Overkill for most uses. Massive files, tiny visible improvement [citation:2][citation:5].</span>
                            </li>
                          </ul>
                        </div>
                        <p className="text-sm text-gray-600 mt-3">
                          Most free converters default to 72 DPI to save processing power and keep files tiny. That's why your images look bad [citation:10].
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* The Right Settings */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    The Exact Settings You Should Use
                  </h2>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="border border-green-200 rounded-lg p-4 bg-green-50 text-center">
                        <h3 className="font-bold text-lg text-green-700 mb-1">Web Use</h3>
                        <p className="text-3xl font-bold text-gray-800">150 DPI</p>
                        <p className="text-xs text-gray-500 mt-2">Good for email, social media, quick sharing [citation:9]</p>
                      </div>
                      <div className="border border-blue-200 rounded-lg p-4 bg-blue-50 text-center">
                        <h3 className="font-bold text-lg text-blue-700 mb-1">Most Uses</h3>
                        <p className="text-3xl font-bold text-gray-800">300 DPI</p>
                        <p className="text-xs text-gray-500 mt-2">Print, presentations, archiving. The sweet spot [citation:1]</p>
                      </div>
                      <div className="border border-purple-200 rounded-lg p-4 bg-purple-50 text-center">
                        <h3 className="font-bold text-lg text-purple-700 mb-1">Professional Print</h3>
                        <p className="text-3xl font-bold text-gray-800">600 DPI</p>
                        <p className="text-xs text-gray-500 mt-2">Fine art, high-end publishing. Files are huge [citation:2]</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">JPG Quality:</span> Set to 85-90%. 100% gives massive files with almost no visible improvement. Below 70% you start seeing artifacts [citation:1][citation:10].</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Color Space:</span> RGB for screen. CMYK only if you're sending to a professional printer [citation:1].</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Background:</span> White is standard. Transparent if you need PNG [citation:3].</span>
                      </div>
                    </div>
                    
                    <div className="mt-5 p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm">
                        <span className="font-bold">Quick rule:</span> 300 DPI + 85% quality. Works for 90% of what people need.
                      </p>
                    </div>
                  </div>
                </section>

                {/* JPG vs PNG */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    JPG vs PNG: Which One Should You Choose?
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-yellow-200 rounded-xl p-5">
                      <h3 className="font-bold text-xl text-yellow-600 mb-3">JPG</h3>
                      <p className="text-sm text-gray-600 mb-3">Smaller files, loses some detail</p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span className="text-sm">Good for photos and gradients [citation:9]</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span className="text-sm">Small file sizes, easy to share</span>
                        </li>
                        <li className="flex items-start">
                          <X className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                          <span className="text-sm">Text can look blurry around edges</span>
                        </li>
                        <li className="flex items-start">
                          <X className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                          <span className="text-sm">No transparency support</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border border-blue-200 rounded-xl p-5 bg-blue-50">
                      <h3 className="font-bold text-xl text-blue-600 mb-3">PNG</h3>
                      <p className="text-sm text-gray-600 mb-3">Larger files, perfect quality</p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span className="text-sm">Text stays razor sharp [citation:7]</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span className="text-sm">Supports transparent backgrounds</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span className="text-sm">Lossless - no compression artifacts</span>
                        </li>
                        <li className="flex items-start">
                          <X className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                          <span className="text-sm">Files can be 3-5x larger than JPG</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-bold">My rule:</span> If it has text or logos, use PNG. If it's photos, use JPG. If you're unsure, PNG is safer [citation:9].
                  </p>
                </section>

                {/* Step-by-Step Fix */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    How to Fix Blurry Conversions (Step by Step)
                  </h2>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="space-y-5">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">1</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Find a converter with DPI settings</h3>
                          <p className="text-gray-700">Not all tools let you change resolution. Use PDFSwift, Adobe Acrobat, PDF24, or XnConvert [citation:1][citation:10].</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">2</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Set DPI to 300</h3>
                          <p className="text-gray-700">Look for "Resolution," "DPI," or "Quality" settings. Change from default (usually 72) to 300 [citation:3].</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">3</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Choose JPG quality at 85-90%</h3>
                          <p className="text-gray-700">Don't max out at 100%. The file size doubles for no visible gain. 85-90% is perfect [citation:1].</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">4</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Convert one page first</h3>
                          <p className="text-gray-700">Test with a single page before doing 50. Check if text is sharp [citation:1].</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">5</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Zoom to 100% and check</h3>
                          <p className="text-gray-700">If text looks sharp at 100% zoom, you're good. If still blurry, increase DPI to 400 or try PNG [citation:4].</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Real Example */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Real Example: The Contract That Looked Unprofessional
                  </h2>
                  
                  <div className="border border-gray-200 rounded-xl p-6">
                    <p className="text-gray-700 mb-3">
                      Sarah needed to send a signed contract as an image. Used a free converter. The signature looked pixelated. The text was fuzzy. The client asked if she'd sent a "draft version."
                    </p>
                    <p className="text-gray-700 mb-3">
                      She checked the settings. The converter defaulted to 72 DPI. She switched to 300 DPI, set quality to 90%, converted again. The new image was sharp, professional, and the client approved [citation:1].
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-bold">Lesson:</span> Same file. Same tool. Different settings. The only difference was DPI.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Tools Comparison */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Tools That Let You Control DPI
                  </h2>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-200 p-3 text-left font-semibold">Tool</th>
                          <th className="border border-gray-200 p-3 text-left font-semibold">Max DPI</th>
                          <th className="border border-gray-200 p-3 text-left font-semibold">Free?</th>
                          <th className="border border-gray-200 p-3 text-left font-semibold">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-blue-50">
                          <td className="border border-gray-200 p-3 font-medium">PDFSwift</td>
                          <td className="border border-gray-200 p-3">600 DPI</td>
                          <td className="border border-gray-200 p-3">Yes</td>
                          <td className="border border-gray-200 p-3 text-sm">Browser-based, no upload</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-200 p-3 font-medium">Adobe Acrobat</td>
                          <td className="border border-gray-200 p-3">9600 DPI</td>
                          <td className="border border-gray-200 p-3">Paid</td>
                          <td className="border border-gray-200 p-3 text-sm">Professional, overkill for most [citation:1]</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-200 p-3 font-medium">PDF24</td>
                          <td className="border border-gray-200 p-3">300+ DPI</td>
                          <td className="border border-gray-200 p-3">Yes</td>
                          <td className="border border-gray-200 p-3 text-sm">Open source, browser-based [citation:10]</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-200 p-3 font-medium">XnConvert</td>
                          <td className="border border-gray-200 p-3">1200 DPI</td>
                          <td className="border border-gray-200 p-3">Yes</td>
                          <td className="border border-gray-200 p-3 text-sm">Desktop app, batch processing [citation:1]</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-200 p-3 font-medium">ImageMagick</td>
                          <td className="border border-gray-200 p-3">Unlimited</td>
                          <td className="border border-gray-200 p-3">Yes</td>
                          <td className="border border-gray-200 p-3 text-sm">Command line, for power users [citation:10]</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Advanced: Compression Artifacts */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    What About Compression Artifacts?
                  </h2>
                  
                  <div className="border border-yellow-200 rounded-xl p-6">
                    <div className="flex items-start">
                      <Info className="w-6 h-6 text-yellow-600 mr-3 mt-0.5" />
                      <div>
                        <p className="text-gray-800 mb-2">
                          Even with high DPI, JPG can still look bad if compression is too aggressive.
                        </p>
                        <p className="text-gray-700 mb-3">
                          JPG compression throws away detail to save space. At 60% quality, you'll see blocky artifacts around text. At 30%, it's a mess [citation:4].
                        </p>
                        <div className="bg-white p-3 rounded-lg border border-yellow-200">
                          <p className="text-sm">
                            <span className="font-bold">The fix:</span> Keep quality between 80-95%. Below 70% starts to show. Above 95% is usually wasted file size [citation:1].
                          </p>
                        </div>
                      </div>
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
                        What DPI should I use for PDF to JPG conversion?
                      </h3>
                      <p className="text-gray-700">
                        300 DPI is the sweet spot for almost everything. It gives you sharp text, clear images, and files that aren't huge. 150 DPI is fine for web use where file size matters more. 72 DPI (the default on many tools) is why your images look blurry - it's too low. 600 DPI exists but files get massive and you probably don't need it unless you're printing professionally [citation:1][citation:3][citation:9].
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Why does my PDF to JPG conversion look pixelated?
                      </h3>
                      <p className="text-gray-700">
                        Almost always because of low DPI. Most free converters default to 72 DPI to keep files small and processing fast. But 72 DPI means every inch of your image only has 72 pixels. When you have text or fine lines, there aren't enough pixels to make them sharp. The fix: use 300 DPI. Also check if you're compressing too much - JPG quality below 70% starts to show artifacts [citation:4][citation:10].
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Is PNG better than JPG for PDF conversion?
                      </h3>
                      <p className="text-gray-700">
                        For text and sharp graphics, yes. PNG is lossless - no compression artifacts. Text stays razor sharp. JPG is lossy - it throws away detail to save space. For photos, JPG is fine because the loss is hard to see. For documents with small text, diagrams, or logos, PNG is better. The tradeoff: PNG files are 3-5x larger [citation:7][citation:9].
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Will 300 DPI always give perfect results?
                      </h3>
                      <p className="text-gray-700">
                        No. 300 DPI is the right setting, but if your original PDF has low-quality images, no setting can fix that. Garbage in, garbage out. Also, if you set JPG quality to 100%, files get huge with almost no visible improvement over 90%. The best results come from a good source PDF + 300 DPI + 85-90% quality [citation:1][citation:10].
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Do online PDF to JPG tools respect my privacy?
                      </h3>
                      <p className="text-gray-700">
                        Some do, some don't. Tools that process in your browser (client-side) never upload your file anywhere - that's safest. Tools that upload to servers usually delete after an hour, but your file sat on their computer. For sensitive documents, use browser-based tools like PDFSwift or PDF24, or offline software like ImageMagick [citation:10].
                      </p>
                    </div>
                  </div>
                </section>

                {/* Quick Reference */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Quick Reference Card
                  </h2>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">DPI by Use Case</h3>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span>Email, social media: 150 DPI</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span>Presentations, archiving: 300 DPI</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span>Professional print: 600 DPI</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">JPG Quality</h3>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span>85-90%: Sweet spot</span>
                          </li>
                          <li className="flex items-start">
                            <X className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                            <span>Below 70%: Artifacts appear</span>
                          </li>
                          <li className="flex items-start">
                            <X className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                            <span>100%: Overkill, huge files</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-center text-sm text-gray-600">
                        <span className="font-bold">Remember:</span> Default settings are usually wrong. Always check DPI.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              {/* CTA */}
              <div className="mt-12 pt-10 border-t border-gray-200">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Convert PDF to JPG with the Right Settings
                  </h3>
                  <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                    PDFSwift lets you choose DPI and quality. No blurry defaults. No watermarks. Files stay in your browser.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/pdf-to-jpg"
                      className="inline-flex items-center justify-center px-7 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300"
                    >
                      Convert PDF to JPG Now
                    </Link>
                    <Link
                      href="/blog"
                      className="inline-flex items-center justify-center px-7 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10"
                    >
                      More PDF Guides
                    </Link>
                  </div>
                  <p className="mt-6 text-blue-200 text-sm">
                    300 DPI • 85% quality • No uploads • Free forever
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