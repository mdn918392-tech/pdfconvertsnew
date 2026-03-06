import Link from "next/link";
import BlogToolsSection from "@/app/components/BlogToolsSection";
import {
  CalendarDays,
  Clock,
  CheckCircle,
  ChevronRight,
  HelpCircle,
  Shield,
  Image,
  Globe,
  FileText,
  Smartphone,
  Eye,
  Users,
  Baby,
  AlertCircle
} from "lucide-react";

export const metadata = {
  title: "Passport Photo Size for All Countries (India, USA, UK) – 2026 Guide | PDFSwift",
  description: "Complete guide to passport photo sizes for India, USA, UK in 2026. Exact dimensions, rules, and how PDFSwift helps you resize photos instantly – free and private.",
  keywords: "passport photo size india, passport photo size usa, passport photo size uk, passport photo dimensions, passport photo requirements 2026, resize passport photo",
  openGraph: {
    type: "article",
    url: "https://www.pdfswift.online/blog/passport-photo-size-all-countries-india-usa-uk-2026-guide",
    title: "Passport Photo Size for All Countries (India, USA, UK) – 2026 Guide",
    description: "Complete guide to passport photo sizes for India, USA, UK in 2026. Exact dimensions, rules, and how PDFSwift helps you resize photos instantly.",
    siteName: "PDFSwift",
    locale: "en_US",
    publishedTime: "2026-03-07T08:00:00+00:00",
    authors: ["PDFSwift Team"],
    tags: ["passport photo", "india passport", "usa passport", "uk passport", "2026 guide"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Passport Photo Size for All Countries (India, USA, UK) – 2026 Guide",
    description: "Complete guide to passport photo sizes for India, USA, UK in 2026. Free resize tool included.",
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
    canonical: "/blog/passport-photo-size-all-countries-india-usa-uk-2026-guide",
  },
  category: "Travel Guide",
  other: {
    "article:published_time": "2026-03-07T08:00:00+00:00",
    "article:modified_time": "2026-03-07T08:00:00+00:00",
    "article:section": "Travel Guide",
    "article:tag": ["passport", "photo size", "india", "usa", "uk"],
  },
};

export default function PassportPhotoAllCountries() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://www.pdfswift.online/blog/passport-photo-size-all-countries-india-usa-uk-2026-guide#article",
        headline: "Passport Photo Size for All Countries (India, USA, UK) – 2026 Guide",
        description: "Complete guide to passport photo sizes for India, USA, UK in 2026. Exact dimensions, rules, and how PDFSwift helps you resize photos instantly.",
        datePublished: "2026-03-07T08:00:00+00:00",
        dateModified: "2026-03-07T08:00:00+00:00",
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
          "@id": "https://www.pdfswift.online/blog/passport-photo-size-all-countries-india-usa-uk-2026-guide",
        },
        wordCount: 1400,
        timeRequired: "PT8M",
        articleSection: "Travel Guide",
        articleBody: `Complete guide to passport photo sizes for India, USA, UK in 2026. Covers exact dimensions, rules, and how PDFSwift helps you resize photos instantly.`,
        keywords: "passport photo size india, passport photo size usa, passport photo size uk",
        thumbnailUrl: "https://www.pdfswift.online/images/passport-photo-countries-guide.png",
        image: {
          "@type": "ImageObject",
          url: "https://www.pdfswift.online/images/passport-photo-countries-guide.png",
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.pdfswift.online/blog/passport-photo-size-all-countries-india-usa-uk-2026-guide#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the passport photo size for India in 2026?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "India requires 35mm x 45mm (630 x 810 pixels at 300 DPI) with a white or light blue background. Face should cover 70-80% of photo.",
            },
          },
          {
            "@type": "Question",
            name: "What is the US passport photo size?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "USA requires 2 x 2 inches (51mm x 51mm) square format. Face size must be 1 inch to 1-3/8 inches from chin to top of head. Background must be plain white.",
            },
          },
          {
            "@type": "Question",
            name: "What is the UK passport photo size?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "UK requires 35mm x 45mm (minimum 600 x 750 pixels) with a cream or light grey background. Face must be 29-34mm from chin to crown.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.pdfswift.online/blog/passport-photo-size-all-countries-india-usa-uk-2026-guide#breadcrumb",
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
            name: "Passport Photo Guide",
            item: "https://www.pdfswift.online/blog/passport-photo-size-all-countries-india-usa-uk-2026-guide",
          },
        ],
      },
    ],
  };

  const countrySpecs = [
    {
      country: "India",
      authority: "Passport Seva / Ministry of External Affairs",
      physicalSize: "35mm x 45mm",
      pixelSize: "630 x 810 pixels (at 300 DPI)",
      aspectRatio: "7:9",
      faceSize: "70-80% of photo (1.4-1.6 inch height) [citation:7]",
      background: "Plain white or light blue [citation:4]",
      glasses: "Allowed if clear, thin frames, no glare [citation:1]",
      headCovering: "Only for religious reasons, face fully visible [citation:10]",
      specialRules: "Ears visible, eyes open, natural expression, no red-eye, no shadows [citation:1]",
      officialSource: "Embassy of India [citation:1][citation:4]"
    },
    {
      country: "USA",
      authority: "U.S. Department of State",
      physicalSize: "2 x 2 inches (51mm x 51mm) [citation:2]",
      pixelSize: "600 x 600 pixels minimum",
      aspectRatio: "1:1 (square)",
      faceSize: "1 inch to 1-3/8 inches (25-35mm) from chin to top of head [citation:2]",
      background: "Plain white or off-white [citation:2]",
      glasses: "Not allowed – must be removed [citation:5][citation:8]",
      headCovering: "Only for religious/medical reasons, face fully visible",
      specialRules: "No uniforms, no camouflage clothing, infants OK with eyes closed [citation:2]",
      officialSource: "U.S. Department of State [citation:2]"
    },
    {
      country: "UK",
      authority: "HM Passport Office",
      physicalSize: "35mm x 45mm [citation:6][citation:9]",
      pixelSize: "Minimum 600 x 750 pixels [citation:3]",
      fileSize: "50KB to 10MB [citation:3]",
      aspectRatio: "4:5",
      faceSize: "29mm to 34mm from chin to crown [citation:6]",
      background: "Plain cream or light grey (NOT white) [citation:3][citation:6]",
      glasses: "Strongly discouraged – leading cause of rejection [citation:6]",
      headCovering: "Allowed for religious/medical reasons",
      specialRules: "Neutral expression, mouth closed, no shadows, no red-eye [citation:3]",
      officialSource: "GOV.UK [citation:3]"
    }
  ];

  const comparisonRows = [
    {
      country: "India",
      physical: "35mm x 45mm",
      pixel: "630 x 810",
      background: "White/Light Blue",
      glasses: "Allowed (no glare)",
      faceSize: "70-80% of photo"
    },
    {
      country: "USA",
      physical: "2 x 2 inches (51mm)",
      pixel: "600 x 600",
      background: "White",
      glasses: "❌ Not allowed",
      faceSize: "1-1⅜ inches"
    },
    {
      country: "UK",
      physical: "35mm x 45mm",
      pixel: "600 x 750",
      background: "Cream/Light Grey",
      glasses: "Strongly discouraged",
      faceSize: "29-34mm"
    }
  ];

  const commonRules = [
    "Photo must be taken within last 6 months (3 months for India) [citation:1][citation:2]",
    "Eyes open and clearly visible, no hair covering face [citation:1][citation:3]",
    "Neutral expression – no smiling, mouth closed [citation:3][citation:6]",
    "Face centered, looking straight at camera [citation:7]",
    "No shadows on face or background [citation:1][citation:9]",
    "No red-eye, no flash reflection [citation:1]",
    "No uniforms or camouflage clothing (USA) [citation:2][citation:5]",
    "No other people or objects in frame [citation:1][citation:3]"
  ];

  const babyRules = [
    {
      rule: "Infants under 1 year: Eyes may be partially or fully closed [citation:2][citation:9]",
      country: "All countries"
    },
    {
      rule: "Children under 6: Don't need to look directly at camera [citation:9]",
      country: "UK"
    },
    {
      rule: "Infants: Head may be discreetly supported (hand must be hidden) [citation:2][citation:9]",
      country: "USA, UK"
    },
    {
      rule: "No toys, pacifiers, or other objects in photo [citation:1][citation:9]",
      country: "All countries"
    }
  ];

  const pdfswiftTools = [
    {
      tool: "PDFSwift Image Resizer",
      whatItDoes: "Resize photos to exact passport dimensions (mm or pixels)",
      privacy: "100% private – files stay in browser",
      bestFor: "Getting perfect size for any country"
    },
    {
      tool: "PDFSwift Image to PDF",
      whatItDoes: "Convert multiple passport photos to PDF for printing",
      privacy: "100% private – no upload",
      bestFor: "Creating print-ready passport photo sheets"
    },
    {
      tool: "PDFSwift Compress Image",
      whatItDoes: "Reduce file size while maintaining quality",
      privacy: "100% private – no upload",
      bestFor: "Meeting UK's 50KB-10MB requirement"
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
                  Passport Photo Guide
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
                    Travel Guide
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                    March 7, 2026
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                    India • USA • UK
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                  Passport Photo Size for All Countries
                  <br />
                  <span className="text-2xl md:text-3xl lg:text-4xl text-blue-600">
                    (India, USA, UK) – 2026 Guide
                  </span>
                </h1>

                {/* Date and Reading Time */}
                <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-4">
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 mr-2 text-gray-500" />
                    <time dateTime="2026-03-07">March 7, 2026</time>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gray-500" />
                    <span>8 minute read</span>
                  </div>
                </div>

                {/* Introduction */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-100 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                  <div className="flex items-start">
                    <Globe className="w-7 h-7 text-blue-600 mr-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-800 font-bold text-lg mb-3">
                        Applying for a passport? Each country has different photo requirements – get it wrong and your application gets rejected.
                      </p>
                      <p className="text-gray-700">
                        India, USA, and UK all have unique specifications for size, background, and rules. This guide gives you the exact dimensions for each country in 2026. Plus, use <span className="font-bold text-blue-600">PDFSwift Image Resizer</span> to resize your photos instantly – free, private, and no upload required.
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
                    ⚡ Quick Steps: Resize Passport Photos with PDFSwift
                  </h2>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">1</div>
                        <div>
                          <span className="text-gray-700">Open <span className="font-bold text-blue-600">PDFSwift Image Resizer</span> (no signup, files stay in browser)</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">2</div>
                        <div>
                          <span className="text-gray-700">Upload your passport photo – drag & drop or click to select</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">3</div>
                        <div>
                          <span className="text-gray-700">Select your country: India (35mm x 45mm), USA (2x2 inches), or UK (35mm x 45mm)</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">4</div>
                        <div>
                          <span className="text-gray-700">Enter exact dimensions from the guide below</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">5</div>
                        <div>
                          <span className="text-gray-700">Download resized photo – processed locally, 100% private</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">6</div>
                        <div>
                          <span className="text-gray-700">Print or upload to your passport application</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-5 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <span className="font-bold">Total time:</span> 2-3 minutes. Completely free.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Country Comparison Table */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    📋 Passport Photo Size Comparison (2026)
                  </h2>
                  
                  <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Physical Size</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pixel Size</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Background</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Glasses Rule</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Face Size</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {comparisonRows.map((item, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.country}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{item.physical}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{item.pixel}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{item.background}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{item.glasses}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{item.faceSize}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Detailed Country Sections */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🌏 Detailed Country Requirements
                  </h2>
                  
                  <div className="space-y-6">
                    {/* India */}
                    <div className="border border-orange-200 rounded-xl p-6 bg-orange-50">
                      <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center">
                        <span className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center mr-3 text-orange-700">🇮🇳</span>
                        India Passport Photo
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm mb-2"><span className="font-semibold">Size:</span> 35mm x 45mm [citation:1]</p>
                          <p className="text-sm mb-2"><span className="font-semibold">Pixel:</span> 630 x 810 (300 DPI) [citation:4]</p>
                          <p className="text-sm mb-2"><span className="font-semibold">Background:</span> White or light blue [citation:4]</p>
                          <p className="text-sm mb-2"><span className="font-semibold">Face size:</span> 70-80% of photo [citation:7]</p>
                          <p className="text-sm mb-2"><span className="font-semibold">Ears:</span> Must be visible [citation:1]</p>
                        </div>
                        <div>
                          <p className="text-sm mb-2"><span className="font-semibold">Glasses:</span> Allowed (clear, no glare) [citation:1]</p>
                          <p className="text-sm mb-2"><span className="font-semibold">Head covering:</span> Religious only [citation:10]</p>
                          <p className="text-sm mb-2"><span className="font-semibold">Expression:</span> Neutral, natural [citation:1]</p>
                          <p className="text-sm mb-2"><span className="font-semibold">Recency:</span> Within 3 months [citation:1]</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* USA */}
                    <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
                      <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
                        <span className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mr-3 text-blue-700">🇺🇸</span>
                        USA Passport Photo
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm mb-2"><span className="font-semibold">Size:</span> 2 x 2 inches (51mm) [citation:2]</p>
                          <p className="text-sm mb-2"><span className="font-semibold">Pixel:</span> 600 x 600 minimum [citation:8]</p>
                          <p className="text-sm mb-2"><span className="font-semibold">Background:</span> Plain white [citation:2]</p>
                          <p className="text-sm mb-2"><span className="font-semibold">Face size:</span> 1-1⅜ inches (25-35mm) [citation:2]</p>
                        </div>
                        <div>
                          <p className="text-sm mb-2"><span className="font-semibold">Glasses:</span> ❌ NOT allowed [citation:5][citation:8]</p>
                          <p className="text-sm mb-2"><span className="font-semibold">No uniforms:</span> No camouflage [citation:2]</p>
                          <p className="text-sm mb-2"><span className="font-semibold">Recency:</span> Within 6 months [citation:2]</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* UK */}
                    <div className="border border-red-200 rounded-xl p-6 bg-red-50">
                      <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center">
                        <span className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center mr-3 text-red-700">🇬🇧</span>
                        UK Passport Photo
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm mb-2"><span className="font-semibold">Size:</span> 35mm x 45mm [citation:6][citation:9]</p>
                          <p className="text-sm mb-2"><span className="font-semibold">Pixel:</span> 600 x 750 minimum [citation:3]</p>
                          <p className="text-sm mb-2"><span className="font-semibold">File size:</span> 50KB - 10MB [citation:3]</p>
                          <p className="text-sm mb-2"><span className="font-semibold">Background:</span> Cream or light grey (NOT white) [citation:3][citation:6]</p>
                        </div>
                        <div>
                          <p className="text-sm mb-2"><span className="font-semibold">Face size:</span> 29-34mm (chin to crown) [citation:6]</p>
                          <p className="text-sm mb-2"><span className="font-semibold">Glasses:</span> Strongly discouraged [citation:6]</p>
                          <p className="text-sm mb-2"><span className="font-semibold">Expression:</span> Neutral, mouth closed [citation:3]</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Common Rules */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    ✅ Universal Passport Photo Rules
                  </h2>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {commonRules.map((rule, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Baby Rules */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
                    <Baby className="w-7 h-7 mr-2 text-pink-500" />
                    Special Rules for Babies & Children
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {babyRules.map((rule, idx) => (
                      <div key={idx} className="border border-pink-200 rounded-xl p-5 bg-pink-50">
                        <p className="text-sm text-gray-800 mb-2">{rule.rule}</p>
                        <p className="text-xs text-pink-600 font-medium">{rule.country}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Glasses Rule Highlight */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    👓 Glasses Rule by Country
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-orange-200 rounded-xl p-5 text-center">
                      <h3 className="font-bold text-orange-700 mb-2">India</h3>
                      <p className="text-sm text-gray-700">✅ Allowed</p>
                      <p className="text-xs text-gray-500">Clear frames, no glare [citation:1]</p>
                    </div>
                    
                    <div className="border border-blue-200 rounded-xl p-5 text-center">
                      <h3 className="font-bold text-blue-700 mb-2">USA</h3>
                      <p className="text-sm text-gray-700">❌ NOT allowed</p>
                      <p className="text-xs text-gray-500">Must remove completely [citation:5][citation:8]</p>
                    </div>
                    
                    <div className="border border-red-200 rounded-xl p-5 text-center">
                      <h3 className="font-bold text-red-700 mb-2">UK</h3>
                      <p className="text-sm text-gray-700">⚠️ Strongly discouraged</p>
                      <p className="text-xs text-gray-500">Leading cause of rejection [citation:6]</p>
                    </div>
                  </div>
                </section>

                {/* PDFSwift Tools */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🛠️ PDFSwift Tools for Passport Photos
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

                {/* Privacy First */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🔒 Privacy First: Your Passport Photos Stay Private
                  </h2>
                  
                  <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
                    <div className="flex items-start">
                      <Shield className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <p className="text-gray-700 mb-3">
                          Passport photos contain sensitive personal information. Unlike other online tools that upload your photos to their servers, PDFSwift works differently:
                        </p>
                        
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm"><span className="font-bold">100% local processing:</span> Files never leave your device</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm"><span className="font-bold">No upload:</span> Your photos stay in your browser</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm"><span className="font-bold">No servers:</span> We never see your data</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm"><span className="font-bold">Perfect for:</span> Sensitive ID photos, passports, visas</span>
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
                      <p className="text-sm text-gray-700">Open Safari, go to PDFSwift, upload photos from Camera Roll, resize to any country's specs. No app needed.</p>
                    </div>
                    
                    <div className="border border-green-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-green-700 mb-2">Android</h3>
                      <p className="text-sm text-gray-700">Open Chrome, visit PDFSwift, select photos from gallery, resize instantly. 100% private, no installation.</p>
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
                        What is the passport photo size for India in 2026?
                      </h3>
                      <p className="text-gray-700">
                        India requires <span className="font-bold">35mm x 45mm</span> (630 x 810 pixels at 300 DPI) with a <span className="font-bold">white or light blue background</span>. Face should cover 70-80% of photo [citation:7]. Ears must be visible, eyes open, and no shadows [citation:1]. Use <span className="font-bold text-blue-600">PDFSwift Image Resizer</span> to get exact dimensions instantly.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        What is the US passport photo size?
                      </h3>
                      <p className="text-gray-700">
                        USA requires <span className="font-bold">2 x 2 inches (51mm x 51mm)</span> square format [citation:2]. Face size must be <span className="font-bold">1 inch to 1-3/8 inches</span> from chin to top of head [citation:2]. Background must be plain white. <span className="font-bold">Glasses are NOT allowed</span> [citation:5][citation:8]. PDFSwift helps you resize to exact US specifications.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        What is the UK passport photo size?
                      </h3>
                      <p className="text-gray-700">
                        UK requires <span className="font-bold">35mm x 45mm</span> (minimum 600 x 750 pixels) with a <span className="font-bold">cream or light grey background</span> (NOT white) [citation:3][citation:6]. Face must be <span className="font-bold">29-34mm</span> from chin to crown [citation:6]. File size must be between <span className="font-bold">50KB and 10MB</span> [citation:3]. <span className="font-bold text-blue-600">PDFSwift Compress Image</span> helps you hit the right file size.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Can I wear glasses in my passport photo?
                      </h3>
                      <p className="text-gray-700">
                        It depends on the country: <span className="font-bold">India</span> allows glasses if clear, thin-framed, and no glare [citation:1]. <span className="font-bold">USA</span> requires glasses to be removed completely [citation:5][citation:8]. <span className="font-bold">UK</span> strongly discourages glasses – they're the leading cause of rejection [citation:6]. When in doubt, remove them.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Is PDFSwift safe for my passport photo?
                      </h3>
                      <p className="text-gray-700">
                        <span className="font-bold">100% safe.</span> PDFSwift processes all images locally in your browser – they <span className="font-bold">never leave your device</span>. No upload, no servers, no third-party access. Your personal ID photos stay completely private. Perfect for sensitive documents like passports.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        What background color do I need for passport photos?
                      </h3>
                      <p className="text-gray-700">
                        <span className="font-bold">India:</span> White or light blue [citation:4]. <span className="font-bold">USA:</span> Plain white [citation:2]. <span className="font-bold">UK:</span> Cream or light grey (not white) [citation:3][citation:6]. Using the wrong background is a common reason for rejection. PDFSwift Image Resizer helps you maintain the correct background while resizing.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Can I take passport photo at home?
                      </h3>
                      <p className="text-gray-700">
                        Yes, you can take passport photos at home using a smartphone or camera. Use natural light, plain background, and have someone else take the photo (no selfies). Then use <span className="font-bold text-blue-600">PDFSwift Image Resizer</span> to get exact dimensions for your country. The tool processes locally – your photos stay private.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        What's the rule for babies in passport photos?
                      </h3>
                      <p className="text-gray-700">
                        For <span className="font-bold">infants under 1 year</span>, eyes may be partially or fully closed [citation:2][citation:9]. <span className="font-bold">Children under 6</span> in UK don't need to look directly at camera [citation:9]. No toys, pacifiers, or supporting hands visible [citation:1][citation:9]. Use <span className="font-bold text-blue-600">PDFSwift</span> to resize baby photos to correct specifications.
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
                        <span><span className="font-bold">India:</span> 35x45mm, white/light blue background, ears visible</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">USA:</span> 2x2 inches, white background, NO glasses</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">UK:</span> 35x45mm, cream background, 50KB-10MB file size</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Universal:</span> Neutral expression, eyes open, no shadows</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">PDFSwift:</span> Free, private photo resizing – no upload</span>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>

              {/* CTA */}
              <div className="mt-12 pt-10 border-t border-gray-200">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Resize Your Passport Photo Now
                  </h3>
                  <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                    Free, private, and works in seconds. No signup, no upload – your photos stay in your browser. Perfect for India, USA, UK passport applications.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/resize-image"
                      className="inline-flex items-center justify-center px-7 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300"
                    >
                      Resize Photo – Free
                    </Link>
                    <Link
                      href="/compress-image"
                      className="inline-flex items-center justify-center px-7 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300"
                    >
                      Compress for UK
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