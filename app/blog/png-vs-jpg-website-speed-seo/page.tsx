// app/blog/png-vs-jpg-website-speed-seo/page.tsx

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
  Zap,
  BarChart,
  Camera,
  Layers
} from "lucide-react";

export const metadata = {
  title: "PNG vs JPG: Which One is Better for Website Speed & SEO? (2026 Guide) | PDFSwift",
  description: "Compare PNG vs JPG for website performance and SEO. Learn which image format is best for photos, graphics, and Core Web Vitals in 2026.",
  keywords: "png vs jpg for website, best image format for seo, webp vs png, image compression 2026, png vs jpeg seo, image optimization guide",
  openGraph: {
    type: "article",
    url: "https://www.pdfswift.online/blog/png-vs-jpg-website-speed-seo",
    title: "PNG vs JPG: Which One is Better for Website Speed & SEO? (2026 Guide)",
    description: "Compare PNG vs JPG for website performance and SEO. Learn which image format is best for photos, graphics, and Core Web Vitals in 2026.",
    images: [
      {
        url: "https://www.pdfswift.online/images/png-vs-jpg-seo-guide.png",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "PDFSwift",
    locale: "en_US",
    publishedTime: "2026-02-21T08:00:00+00:00",
    authors: ["PDFSwift Team"],
    tags: ["png vs jpg", "image optimization", "seo guide", "web performance", "2026 guide"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PNG vs JPG: Which One is Better for Website Speed & SEO? (2026 Guide)",
    description: "Compare PNG vs JPG for website performance and SEO. Learn which image format is best for photos, graphics, and Core Web Vitals in 2026.",
    images: ["https://www.pdfswift.online/images/png-vs-jpg-seo-guide.png"],
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
    canonical: "/blog/png-vs-jpg-website-speed-seo",
  },
  category: "SEO Guide",
  other: {
    "article:published_time": "2026-02-21T08:00:00+00:00",
    "article:modified_time": "2026-02-21T08:00:00+00:00",
    "article:section": "SEO Guide",
    "article:tag": ["png vs jpg", "image optimization", "seo guide", "web performance"],
  },
};

export default function PNGvsJPGSEO() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://www.pdfswift.online/blog/png-vs-jpg-website-speed-seo#article",
        headline: "PNG vs JPG: Which One is Better for Website Speed & SEO? (2026 Guide)",
        description: "Compare PNG vs JPG for website performance and SEO. Learn which image format is best for photos, graphics, and Core Web Vitals in 2026.",
        datePublished: "2026-02-21T08:00:00+00:00",
        dateModified: "2026-02-21T08:00:00+00:00",
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
          "@id": "https://www.pdfswift.online/blog/png-vs-jpg-website-speed-seo",
        },
        wordCount: 1200,
        timeRequired: "PT8M",
        articleSection: "SEO Guide",
        articleBody: `Complete guide comparing PNG vs JPG for website speed and SEO. Covers file sizes, image quality, transparency, browser support, and modern alternatives like WebP.`,
        keywords: "png vs jpg for website, best image format for seo, webp vs png, image compression 2026",
        thumbnailUrl: "https://www.pdfswift.online/images/png-vs-jpg-seo-guide.png",
        image: {
          "@type": "ImageObject",
          url: "https://www.pdfswift.online/images/png-vs-jpg-seo-guide.png",
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.pdfswift.online/blog/png-vs-jpg-website-speed-seo#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is PNG or JPG better for SEO?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "JPG is generally better for SEO than PNG because it produces smaller file sizes for photographs, leading to faster page load times. However, for logos and graphics, PNG may be necessary. The best SEO practice is to use WebP with appropriate fallbacks.",
            },
          },
          {
            "@type": "Question",
            name: "Does Google prefer WebP over JPG?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Google doesn't explicitly prefer one format over another, but it does prioritize page speed. Since WebP offers the best compression-to-quality ratio, using it indirectly helps your SEO by improving Core Web Vitals.",
            },
          },
          {
            "@type": "Question",
            name: "Can I convert all my JPG/PNG images to WebP?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, you can and should convert most of your images to WebP. Use the <picture> element to serve WebP to modern browsers while providing JPG/PNG fallbacks for older browsers. Tools like Squoosh, CloudConvert, or image optimization plugins can batch convert your images.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.pdfswift.online/blog/png-vs-jpg-website-speed-seo#breadcrumb",
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
            name: "PNG vs JPG SEO Guide",
            item: "https://www.pdfswift.online/blog/png-vs-jpg-website-speed-seo",
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
                  PNG vs JPG for SEO
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
                    SEO Guide
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                    February 21, 2026
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                    Web Performance
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                  PNG vs JPG: Which One is Better for Website Speed & SEO?
                  <br />
                  <span className="text-2xl md:text-3xl lg:text-4xl text-blue-600">
                    (2026 Guide)
                  </span>
                </h1>

                {/* Date and Reading Time */}
                <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-4">
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 mr-2 text-gray-500" />
                    <time dateTime="2026-02-21">February 21, 2026</time>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gray-500" />
                    <span>8 minute read</span>
                  </div>
                </div>

                {/* Introduction */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-100 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                  <div className="flex items-start">
                    <Zap className="w-7 h-7 text-blue-600 mr-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-800 font-bold text-lg mb-3">
                        The short answer: While PNG offers superior quality for graphics, JPG is generally better for website speed and SEO when dealing with photos.
                      </p>
                      <p className="text-gray-700">
                        However, for maximum performance in 2026, the modern WebP format is superior to both, and AVIF is emerging as the new leader in compression. The choice between image formats is a critical decision that directly impacts your site's load times, user experience, and search engine rankings. This guide breaks down the strengths of each format to help you make the best choice for your website in 2026.
                      </p>
                    </div>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div className="space-y-10">
                {/* Quick Comparison Table */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Quick Comparison: JPG vs. PNG for Web Performance
                  </h2>
                  
                  <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">JPG (or JPEG)</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">PNG</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">WebP (Modern Standard)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">Compression Type</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Lossy</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Lossless</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Lossy & Lossless</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">File Size</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Small</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Large</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Very Small (25-35% smaller than JPG)</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">Image Quality</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Good for photos; can show artifacts at high compression</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Excellent, pixel-perfect</td>
                          <td className="px-6 py-4 text-sm text-gray-700">High (comparable to source at equivalent settings)</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">Transparency</td>
                          <td className="px-6 py-4 text-sm text-gray-700">❌ No</td>
                          <td className="px-6 py-4 text-sm text-gray-700">✅ Yes (alpha channel)</td>
                          <td className="px-6 py-4 text-sm text-gray-700">✅ Yes</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">Best For</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Photographs, complex gradients, blog post images</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Logos, icons, screenshots, images requiring transparency</td>
                          <td className="px-6 py-4 text-sm text-gray-700">The all-around best choice for modern websites: photos, graphics, and UI</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">Browser Support</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Universal (100%)</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Universal (100%)</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Excellent (~97% of global users)</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">Impact on Speed</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Good</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Moderate to Heavy</td>
                          <td className="px-6 py-4 text-sm text-gray-700">Excellent</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Detailed Analysis */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Detailed Analysis: Which Format Wins for Your Needs?
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Speed */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                        <Zap className="w-6 h-6 text-yellow-500 mr-2" />
                        🏆 For Website Speed & Core Web Vitals: JPG (over PNG)
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        When it comes to loading speed, file size is the primary enemy. Since <span className="font-bold">JPG uses lossy compression</span>, it can dramatically reduce the file size of a photo compared to the <span className="font-bold">lossless compression of PNG</span>. Smaller files mean faster downloads, quicker Largest Contentful Paint (LCP), and better Core Web Vitals scores—all of which are direct ranking factors for Google.
                      </p>
                    </div>

                    {/* Quality */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                        <Camera className="w-6 h-6 text-purple-500 mr-2" />
                        🎨 For Image Quality & Transparency: PNG (over JPG)
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        PNG is the king of clarity. Its lossless compression means every pixel is preserved, making it the only choice for images that need to be razor-sharp, such as company logos, UI elements, and screenshots with text. Most importantly, <span className="font-bold">PNG supports transparency</span>, which JPG does not.
                      </p>
                    </div>

                    {/* Modern */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                        <Globe className="w-6 h-6 text-green-500 mr-2" />
                        🚀 The 2026 Reality: WebP Beats Both
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        While the PNG vs JPG debate is important, the real winner for website speed in 2026 is WebP. Created by Google, WebP provides superior compression (both lossy and lossless) and supports transparency. You can typically reduce a JPG or PNG file size by 25-35% by converting to WebP without losing visible quality.
                      </p>
                    </div>

                    {/* Future */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                        <BarChart className="w-6 h-6 text-blue-500 mr-2" />
                        🔮 The Future: AVIF
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        AVIF (AV1 Image Format) is emerging as the next-generation format, offering even better compression than WebP. However, browser support, while growing, is not yet universal. For now, WebP remains the safest and most performant choice for production websites.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Step-by-Step Optimization Guide */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Step-by-Step: Optimize Your Website Images
                  </h2>
                  
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <div className="space-y-5">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold">1</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Identify your image types</h3>
                          <p className="text-gray-700">Photos → use JPG/WebP. Logos/graphics → use PNG/WebP. Check your site's images using Screaming Frog or GTmetrix.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold">2</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Check current formats</h3>
                          <p className="text-gray-700">Use browser dev tools or online crawlers to see what formats your site is currently serving.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold">3</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Convert photos from PNG to JPG</h3>
                          <p className="text-gray-700">This single step reduces file size 5-10x. Use tools like Squoosh or CloudConvert.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold">4</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Convert to WebP for best performance</h3>
                          <p className="text-gray-700">Use Squoosh, image optimization plugins, or build tools to generate WebP versions.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold">5</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Implement picture element with fallbacks</h3>
                          <p className="text-gray-700">Use HTML picture element to serve WebP to modern browsers while providing JPG/PNG fallbacks for older browsers.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold">6</div>
                        <div>
                          <h3 className="font-bold text-gray-900">Verify Core Web Vitals improvement</h3>
                          <p className="text-gray-700">Check Google Search Console and PageSpeed Insights to confirm improvements.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-5 p-4 bg-white rounded-lg">
                      <p className="text-sm text-blue-800">
                        <span className="font-bold">Tools needed:</span> Squoosh, CloudConvert, image optimization plugin, browser dev tools
                      </p>
                      <p className="text-sm text-blue-800 mt-1">
                        <span className="font-bold">Estimated time:</span> 15-30 minutes depending on site size
                      </p>
                    </div>
                  </div>
                </section>

                {/* Recommendations by Use Case */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🎯 Quick Recommendations by Use Case
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-blue-200 rounded-xl p-5 bg-blue-50">
                      <h3 className="font-bold text-lg text-blue-700 mb-2">Product Photos / Blog Images</h3>
                      <p className="text-sm font-medium text-blue-600 mb-2">WebP (with JPG fallback)</p>
                      <p className="text-xs text-gray-600">Smallest file size, maintains good quality for photographs.</p>
                    </div>
                    
                    <div className="border border-green-200 rounded-xl p-5 bg-green-50">
                      <h3 className="font-bold text-lg text-green-700 mb-2">Logo / Icons with Transparency</h3>
                      <p className="text-sm font-medium text-green-600 mb-2">WebP (with PNG fallback)</p>
                      <p className="text-xs text-gray-600">Supports transparency with much smaller file sizes than PNG.</p>
                    </div>
                    
                    <div className="border border-purple-200 rounded-xl p-5 bg-purple-50">
                      <h3 className="font-bold text-lg text-purple-700 mb-2">Screenshots with Text</h3>
                      <p className="text-sm font-medium text-purple-600 mb-2">WebP or PNG</p>
                      <p className="text-xs text-gray-600">PNG ensures no compression artifacts near text; WebP is acceptable at high-quality settings.</p>
                    </div>
                    
                    <div className="border border-yellow-200 rounded-xl p-5 bg-yellow-50">
                      <h3 className="font-bold text-lg text-yellow-700 mb-2">Background Images</h3>
                      <p className="text-sm font-medium text-yellow-600 mb-2">WebP (with JPG fallback)</p>
                      <p className="text-xs text-gray-600">Aggressive compression possible without noticeable quality loss.</p>
                    </div>
                  </div>
                </section>

                {/* Implementation Code */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    💻 How to Implement in Next.js
                  </h2>
                  
                  <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
                    <pre className="text-gray-100 text-sm">
                      <code>{`// In your Next.js component, use the Image component with fallbacks:
import Image from 'next/image'

<Image
  src="/image.webp"
  alt="Description"
  width={800}
  height={600}
/>`}</code>
                    </pre>
                  </div>
                  
                  <div className="bg-gray-800 rounded-xl p-6 overflow-x-auto">
                    <pre className="text-gray-100 text-sm">
                      <code>{`<picture>
  <source srcSet="/image.webp" type="image/webp" />
  <source srcSet="/image.jpg" type="image/jpeg" />
  <img src="/image.jpg" alt="Description" loading="lazy" />
</picture>`}</code>
                    </pre>
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-2">
                    * Use the picture element for maximum browser compatibility
                  </p>
                </section>

                {/* Image Format Tips */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Which Format Should You Use?
                  </h2>
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="font-bold text-yellow-600">JPG</span>
                        </div>
                        <p className="text-sm font-medium">Photos, Blog Images</p>
                        <p className="text-xs text-gray-500">Best for photographs, gradients</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="font-bold text-blue-600">PNG</span>
                        </div>
                        <p className="text-sm font-medium">Logos, Screenshots</p>
                        <p className="text-xs text-gray-500">Sharp text, transparency needed</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="font-bold text-green-600">WebP</span>
                        </div>
                        <p className="text-sm font-medium">Everything (modern sites)</p>
                        <p className="text-xs text-gray-500">Best of both worlds, smaller files</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm">
                        <span className="font-bold">File size targets:</span> Aim for under 100KB for most web images, under 200KB for hero images. JPGs at 60-80% quality usually hit this. WebP can achieve similar quality at 30-50% smaller file sizes.
                      </p>
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
                      <h3 className="font-bold text-gray-900 mb-1">My PNG files are huge</h3>
                      <p className="text-sm text-gray-600">If it's a photo, convert to JPG (reduces size 5-10x). If it's a logo, optimize with TinyPNG or convert to SVG if vector. For web use, PNG should be under 50-100KB.</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">WebP not showing in some browsers</h3>
                      <p className="text-sm text-gray-600">That's why you need fallbacks. Use the picture element with source tags. Old Safari (pre-14) and some older browsers need JPG/PNG fallbacks. Implementation code above shows how.</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Images look blurry after conversion</h3>
                      <p className="text-sm text-gray-600">You compressed too much. JPG at 60-80% quality is the sweet spot. For WebP, quality setting 75-85 usually matches JPG at 80-90. Test different settings. Also check if you resized incorrectly.</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">My site still slow after optimizing images</h3>
                      <p className="text-sm text-gray-600">Images aren't your only problem. Check lazy loading, CDN usage, server response time, and JavaScript. Use Lighthouse or PageSpeed Insights to find other issues.</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-1">Should I use PNG for retina/high-DPI displays?</h3>
                      <p className="text-sm text-gray-600">No. Use SVG for logos/icons (vector = perfect scaling) or WebP at 2x resolution. PNG files become massive at high resolutions. Better to serve responsive images with srcset than rely on PNG for sharpness.</p>
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
                        Is PNG or JPG better for SEO?
                      </h3>
                      <p className="text-gray-700">
                        JPG is generally better for SEO than PNG because it produces smaller file sizes for photographs, leading to faster page load times. However, for logos and graphics, PNG may be necessary. The best SEO practice is to use WebP with appropriate fallbacks. Google's algorithm prioritizes page speed, so smaller files = better rankings.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Does Google prefer WebP over JPG?
                      </h3>
                      <p className="text-gray-700">
                        Google doesn't explicitly prefer one format over another, but it does prioritize page speed. Since WebP offers the best compression-to-quality ratio, using it indirectly helps your SEO by improving Core Web Vitals. Google even created WebP, so they clearly support it, but they won't penalize you for using JPG or PNG properly optimized.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Can I convert all my JPG/PNG images to WebP?
                      </h3>
                      <p className="text-gray-700">
                        Yes, you can and should convert most of your images to WebP. Use the &lt;picture&gt; element to serve WebP to modern browsers while providing JPG/PNG fallbacks for older browsers. Tools like Squoosh, CloudConvert, or image optimization plugins can batch convert your images. Just keep originals as fallbacks.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        What about file size limits for website images?
                      </h3>
                      <p className="text-gray-700">
                        Aim for under 100KB for most web images, under 200KB for hero images. JPGs at 60-80% quality usually hit this. PNGs often exceed these limits, which is why they're not ideal for web photos. WebP can achieve similar quality at 30-50% smaller file sizes. Always check your Largest Contentful Paint (LCP) images - they should be under 100-200KB.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Does image format affect Core Web Vitals?
                      </h3>
                      <p className="text-gray-700">
                        Absolutely. Largest Contentful Paint (LCP) is directly affected by image file sizes. A 500KB PNG vs a 50KB JPG of the same photo means 10x slower loading. That's the difference between a passing and failing LCP score. WebP makes this even better. Format choice is one of the easiest ways to improve Core Web Vitals.
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
                        <span><span className="font-bold">Photos → JPG or WebP.</span> PNG is overkill and slow.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Logos, screenshots → PNG or WebP.</span> Need sharpness and transparency.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">WebP is the 2026 standard.</span> 25-35% smaller than JPG with same quality.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Always use fallbacks.</span> Picture element for older browsers.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">File size target:</span> Under 100KB for most images, under 200KB for hero images.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Better Core Web Vitals = Better SEO.</span> Google ranks faster sites higher.</span>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>

              {/* CTA */}
              <div className="mt-12 pt-10 border-t border-gray-200">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Convert Your Images to WebP Now
                  </h3>
                  <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                    Upload your JPG or PNG. Convert to WebP instantly. Reduce file size by 30%+ without losing quality. Free, no signup, files stay in your browser.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/png-to-jpg"
                      className="inline-flex items-center justify-center px-7 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300"
                    >
                      Convert to WebP
                    </Link>
                    <Link
                      href="/blog"
                      className="inline-flex items-center justify-center px-7 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10"
                    >
                      More SEO Guides
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