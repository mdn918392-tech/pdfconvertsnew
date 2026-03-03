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
  Zap,
  Globe,
  BarChart,
  FileText,
  Smartphone,
  Eye,
  Settings,
  Award
} from "lucide-react";

export const metadata = {
  title: "Best Image Size for Website (Speed + SEO Optimization Guide) 2026 | PDFSwift",
  description: "Learn the perfect image sizes for websites in 2026 – dimensions, file size, and format for faster loading and better SEO. Includes free PDFSwift optimization tools.",
  keywords: "best image size for website, image optimization for seo, webp format, image compression, core web vitals, website speed optimization",
  openGraph: {
    type: "article",
    url: "https://www.pdfswift.online/blog/best-image-size-for-website-speed-seo-optimization",
    title: "Best Image Size for Website (Speed + SEO Optimization Guide) 2026",
    description: "Learn the perfect image sizes for websites in 2026 – dimensions, file size, and format for faster loading and better SEO.",
    siteName: "PDFSwift",
    locale: "en_US",
    publishedTime: "2026-03-04T08:00:00+00:00",
    authors: ["PDFSwift Team"],
    tags: ["image size", "seo optimization", "website speed", "2026 guide"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Image Size for Website (Speed + SEO Optimization Guide) 2026",
    description: "Learn the perfect image sizes for websites in 2026 – dimensions, file size, and format for faster loading and better SEO.",
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
    canonical: "/blog/best-image-size-for-website-speed-seo-optimization",
  },
  category: "SEO Guide",
  other: {
    "article:published_time": "2026-03-04T08:00:00+00:00",
    "article:modified_time": "2026-03-04T08:00:00+00:00",
    "article:section": "SEO Guide",
    "article:tag": ["image size", "seo", "website speed"],
  },
};

export default function BestImageSizeWebsite() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://www.pdfswift.online/blog/best-image-size-for-website-speed-seo-optimization#article",
        headline: "Best Image Size for Website (Speed + SEO Optimization Guide) 2026",
        description: "Learn the perfect image sizes for websites in 2026 – dimensions, file size, and format for faster loading and better SEO.",
        datePublished: "2026-03-04T08:00:00+00:00",
        dateModified: "2026-03-04T08:00:00+00:00",
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
          "@id": "https://www.pdfswift.online/blog/best-image-size-for-website-speed-seo-optimization",
        },
        wordCount: 1300,
        timeRequired: "PT8M",
        articleSection: "SEO Guide",
        articleBody: `Complete guide to choosing the best image sizes for websites in 2026 – dimensions, formats, file sizes, and SEO optimization tips.`,
        keywords: "best image size for website, image optimization for seo, webp format",
        thumbnailUrl: "https://www.pdfswift.online/images/best-image-size-website-guide.png",
       
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.pdfswift.online/blog/best-image-size-for-website-speed-seo-optimization#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the best image size for website in 2026?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For hero images: 1920×1080px at 100-200KB. For blog posts: 1200×630px at 50-100KB. For thumbnails: 150×150px at 10-30KB. Keep file size under 100KB for fast loading.",
            },
          },
          {
            "@type": "Question",
            name: "Which image format is best for SEO and speed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "WebP is the best format in 2026 – it's 25-35% smaller than JPG with the same quality, supports transparency, and has 97%+ browser support.",
            },
          },
          {
            "@type": "Question",
            name: "Is PDFSwift safe for my website images?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "100% safe. PDFSwift processes all images locally in your browser – they never leave your device. No upload, no servers, no third-party access.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.pdfswift.online/blog/best-image-size-for-website-speed-seo-optimization#breadcrumb",
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
            name: "Image Size Guide",
            item: "https://www.pdfswift.online/blog/best-image-size-for-website-speed-seo-optimization",
          },
        ],
      },
    ],
  };

  const imageDimensions = [
    {
      type: "Hero / Banner Images",
      width: "1920-2560px",
      height: "1080-1440px",
      fileSize: "100-200KB",
      notes: "Full-width images, optimize aggressively"
    },
    {
      type: "Blog Post Images",
      width: "1200px",
      height: "630px",
      fileSize: "50-100KB",
      notes: "Social sharing optimal size"
    },
    {
      type: "Product Images",
      width: "800-1200px",
      height: "800-1200px",
      fileSize: "50-150KB",
      notes: "Square format, multiple angles"
    },
    {
      type: "Thumbnails",
      width: "150-300px",
      height: "150-300px",
      fileSize: "10-30KB",
      notes: "Small, fast-loading previews"
    },
    {
      type: "Background Images",
      width: "1920px",
      height: "1080px",
      fileSize: "50-100KB",
      notes: "Compress heavily, quality less critical"
    },
    {
      type: "Icons / Logos",
      width: "50-200px",
      height: "50-200px",
      fileSize: "5-20KB",
      notes: "Use SVG when possible, PNG for complex"
    }
  ];

  const formatComparison = [
    {
      format: "WebP",
      bestFor: "Everything (modern websites)",
      compression: "25-35% smaller than JPG",
      quality: "Excellent",
      transparency: "✅ Yes",
      browserSupport: "97%+",
      recommendation: "Best choice in 2026"
    },
    {
      format: "JPG/JPEG",
      bestFor: "Photographs, complex gradients",
      compression: "Good",
      quality: "Good (lossy)",
      transparency: "❌ No",
      browserSupport: "100%",
      recommendation: "Good fallback for WebP"
    },
    {
      format: "PNG",
      bestFor: "Logos, screenshots, graphics with text",
      compression: "Poor (large files)",
      quality: "Excellent (lossless)",
      transparency: "✅ Yes",
      browserSupport: "100%",
      recommendation: "Use only when needed"
    },
    {
      format: "AVIF",
      bestFor: "Next-gen format",
      compression: "50% smaller than JPG",
      quality: "Excellent",
      transparency: "✅ Yes",
      browserSupport: "85%+",
      recommendation: "Future, but WebP safer now"
    },
    {
      format: "SVG",
      bestFor: "Icons, logos, illustrations",
      compression: "Vector (tiny files)",
      quality: "Infinite scaling",
      transparency: "✅ Yes",
      browserSupport: "98%+",
      recommendation: "Best for vector graphics"
    }
  ];

  const seoTips = [
    {
      tip: "Use descriptive filenames",
      example: "red-apple-fruit.jpg instead of IMG_1234.jpg",
      impact: "Helps search engines understand image content"
    },
    {
      tip: "Add alt text",
      example: "alt='Fresh red apple on wooden table'",
      impact: "Accessibility + SEO ranking factor"
    },
    {
      tip: "Implement lazy loading",
      example: "loading='lazy' attribute",
      impact: "Faster initial page load"
    },
    {
      tip: "Use responsive images",
      example: "srcset with multiple sizes",
      impact: "Serve right size for each device"
    },
    {
      tip: "Optimize file size first",
      example: "Keep under 100KB for most images",
      impact: "Directly improves Core Web Vitals"
    },
    {
      tip: "Choose modern formats",
      example: "WebP with JPG fallback",
      impact: "Smaller files, faster loading"
    }
  ];

  const coreWebVitals = [
    {
      metric: "LCP (Largest Contentful Paint)",
      target: "Under 2.5 seconds",
      imageImpact: "Hero images directly affect LCP",
      recommendation: "Keep hero images under 100-200KB"
    },
    {
      metric: "CLS (Cumulative Layout Shift)",
      target: "Under 0.1",
      imageImpact: "Missing width/height causes shifts",
      recommendation: "Always specify image dimensions"
    },
    {
      metric: "FID (First Input Delay)",
      target: "Under 100ms",
      imageImpact: "Indirect – heavy images block JS",
      recommendation: "Optimize all images"
    }
  ];

  const pdfswiftTools = [
    {
      tool: "PDFSwift Image Resizer",
      whatItDoes: "Resize images to exact dimensions without quality loss",
      privacy: "100% private – files stay in browser",
      bestFor: "Getting perfect dimensions for web"
    },
    {
      tool: "PDFSwift Image to PDF",
      whatItDoes: "Convert images to PDF with quality control",
      privacy: "100% private – no upload",
      bestFor: "Creating image collections for web"
    },
    {
      tool: "PDFSwift PDF to Image",
      whatItDoes: "Extract images from PDF at custom DPI",
      privacy: "100% private – no upload",
      bestFor: "Repurposing PDF content for web"
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
                  Best Image Size Guide
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
                    March 4, 2026
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                    Website Speed
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                  Best Image Size for Website
                  <br />
                  <span className="text-2xl md:text-3xl lg:text-4xl text-blue-600">
                    (Speed + SEO Optimization Guide) 2026
                  </span>
                </h1>

                {/* Date and Reading Time */}
                <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-4">
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 mr-2 text-gray-500" />
                    <time dateTime="2026-03-04">March 4, 2026</time>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gray-500" />
                    <span>8 minute read</span>
                  </div>
                </div>

                {/* Introduction */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-100 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                  <div className="flex items-start">
                    <Image className="w-7 h-7 text-blue-600 mr-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-800 font-bold text-lg mb-3">
                        Images make up 50-70% of a typical webpage's weight. Get them wrong, and your site slows down. Get them right, and you rank higher.
                      </p>
                      <p className="text-gray-700">
                        In this guide, we'll show you the <span className="font-bold">exact image dimensions, file sizes, and formats</span> you need for a fast, SEO-friendly website in 2026. Plus, how <span className="font-bold text-blue-600">PDFSwift's private tools</span> help you optimize images without compromising privacy.
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
                    ⚡ Quick Steps: Optimize Images with PDFSwift
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
                          <span className="text-gray-700">Upload your image – drag & drop or click to select</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">3</div>
                        <div>
                          <span className="text-gray-700">Enter target dimensions from the table below</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">4</div>
                        <div>
                          <span className="text-gray-700">Download resized image – processed locally, 100% private</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-bold text-blue-600">5</div>
                        <div>
                          <span className="text-gray-700">Upload to your website with proper alt text and lazy loading</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-5 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <span className="font-bold">Total time:</span> 2-3 minutes per image. Free forever.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Image Dimensions Table */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    📏 Recommended Image Dimensions by Type
                  </h2>
                  
                  <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image Type</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Width</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Height</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Size</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {imageDimensions.map((item, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.type}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{item.width}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{item.height}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{item.fileSize}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{item.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Format Comparison */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🎨 Image Format Comparison (2026)
                  </h2>
                  
                  <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best For</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compression</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transparency</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Support</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommendation</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {formatComparison.map((item, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.format}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{item.bestFor}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{item.compression}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{item.quality}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{item.transparency}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{item.browserSupport}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{item.recommendation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Core Web Vitals Impact */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    📊 How Images Affect Core Web Vitals
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {coreWebVitals.map((item, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl p-5 hover:border-blue-200 transition">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{item.metric}</h3>
                        <p className="text-sm text-gray-600 mb-2"><span className="font-semibold">Target:</span> {item.target}</p>
                        <p className="text-sm text-gray-600 mb-2"><span className="font-semibold">Impact:</span> {item.imageImpact}</p>
                        <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded">{item.recommendation}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* SEO Tips */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🔍 Image SEO Best Practices
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {seoTips.map((item, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl p-5 hover:border-green-200 transition">
                        <h3 className="font-bold text-gray-900 mb-2">{item.tip}</h3>
                        <p className="text-sm text-gray-600 mb-2"><span className="font-semibold">Example:</span> <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">{item.example}</span></p>
                        <p className="text-xs text-green-600">{item.impact}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* PDFSwift Tools */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🛠️ PDFSwift Tools for Image Optimization
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

                {/* Responsive Images Example */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    📱 Responsive Images with srcset
                  </h2>
                  
                  <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
                    <pre className="text-gray-100 text-sm">
                      <code>{`<!-- Serve different sizes for different devices -->
&lt;img 
  src="image-800w.jpg" 
  srcset="image-400w.jpg 400w,
          image-800w.jpg 800w,
          image-1200w.jpg 1200w"
  sizes="(max-width: 600px) 400px,
         (max-width: 1200px) 800px,
         1200px"
  alt="Description"
  loading="lazy"
&gt;`}</code>
                    </pre>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <span className="font-bold">Pro tip:</span> Use PDFSwift Image Resizer to create multiple sizes (400px, 800px, 1200px) for responsive images – all processed locally, 100% private.
                    </p>
                  </div>
                </section>

                {/* Privacy First */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    🔒 Privacy First: Why PDFSwift is Different
                  </h2>
                  
                  <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
                    <div className="flex items-start">
                      <Shield className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <p className="text-gray-700 mb-3">
                          Most online image tools upload your photos to their servers. Think about that – your website images, product photos, client work sitting on someone else's computer.
                        </p>
                        
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm"><span className="font-bold">PDFSwift:</span> 100% local processing – files never leave your device</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm"><span className="font-bold">No upload:</span> Your images stay in your browser</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm"><span className="font-bold">No servers:</span> We never see your data</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm"><span className="font-bold">Perfect for:</span> Client work, product photos, sensitive content</span>
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
                      <p className="text-sm text-gray-700">Open Safari, go to PDFSwift, upload images from Photos, resize or convert – all in your browser. No app needed.</p>
                    </div>
                    
                    <div className="border border-green-200 rounded-xl p-5">
                      <h3 className="font-bold text-lg text-green-700 mb-2">Android</h3>
                      <p className="text-sm text-gray-700">Open Chrome, visit PDFSwift, select images from gallery, resize instantly. 100% private, no installation.</p>
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
                        What is the best image size for website in 2026?
                      </h3>
                      <p className="text-gray-700">
                        There's no single 'best size' – it depends on usage. For <span className="font-bold">hero images</span>: 1920×1080px at 100-200KB. For <span className="font-bold">blog posts</span>: 1200×630px at 50-100KB. For <span className="font-bold">thumbnails</span>: 150×150px at 10-30KB. Most importantly, keep file size under 100KB for fast loading. Use <span className="font-bold text-blue-600">PDFSwift Image Resizer</span> to get exact dimensions without quality loss.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Which image format is best for SEO and speed?
                      </h3>
                      <p className="text-gray-700">
                        <span className="font-bold">WebP</span> is the best format in 2026 – it's 25-35% smaller than JPG with the same quality, supports transparency, and has 97%+ browser support. Use JPG as fallback for older browsers. For logos and icons, <span className="font-bold">SVG</span> is best (vector, infinitely scalable). <span className="font-bold text-blue-600">PDFSwift</span> helps you convert images to optimal formats privately in your browser.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        How does image size affect SEO?
                      </h3>
                      <p className="text-gray-700">
                        Image size directly impacts <span className="font-bold">Core Web Vitals</span> – especially LCP (Largest Contentful Paint). Google uses page speed as a ranking factor. Large, unoptimized images slow down your site, increase bounce rates, and hurt rankings. Optimized images (under 100KB) load faster, improve user experience, and boost SEO. <span className="font-bold text-blue-600">PDFSwift</span> helps you hit these targets.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        What is the ideal file size for website images?
                      </h3>
                      <p className="text-gray-700">
                        Aim for <span className="font-bold">under 100KB for most images</span>. Hero images can be 100-200KB if absolutely necessary. Thumbnails should be under 30KB. Use <span className="font-bold text-blue-600">PDFSwift Image Resizer</span> to compress without visible quality loss. Remember: smaller files = faster loading = better SEO.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Is PDFSwift safe for my website images?
                      </h3>
                      <p className="text-gray-700">
                        <span className="font-bold">100% safe.</span> PDFSwift processes all images locally in your browser – they <span className="font-bold">never leave your device</span>. No upload, no servers, no third-party access. Your images stay private. Perfect for preparing website images without exposing them to online servers.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        What's the difference between lossy and lossless compression?
                      </h3>
                      <p className="text-gray-700">
                        <span className="font-bold">Lossy compression</span> (JPG, WebP) reduces file size by discarding some image data – quality decreases but files get much smaller. <span className="font-bold">Lossless compression</span> (PNG) preserves all original data – files are larger but quality is perfect. For web photos, lossy is best. For logos with text, lossless PNG is better. <span className="font-bold text-blue-600">PDFSwift</span> tools help you choose the right balance.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        How do I resize images for website without losing quality?
                      </h3>
                      <p className="text-gray-700">
                        Use <span className="font-bold text-blue-600">PDFSwift Image Resizer</span> – it's free, private, and works in your browser. Upload your image, enter desired dimensions, and download the resized version. The tool maintains quality while reducing file size. <span className="font-bold">Always resize down, never up</span> (upscaling creates pixelation).
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        What are Core Web Vitals and how do images affect them?
                      </h3>
                      <p className="text-gray-700">
                        Core Web Vitals are Google's metrics for user experience: <span className="font-bold">LCP (loading speed)</span>, <span className="font-bold">CLS (visual stability)</span>, and <span className="font-bold">FID (interactivity)</span>. Images affect LCP directly – large hero images slow loading. Unspecified dimensions cause CLS (page jumps). Optimized images with proper dimensions improve all three metrics. <span className="font-bold text-blue-600">PDFSwift</span> helps you prepare images that meet these standards.
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
                        <span><span className="font-bold">Hero images:</span> 1920×1080px, 100-200KB</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Blog images:</span> 1200×630px, 50-100KB</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Best format:</span> WebP (with JPG fallback)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">SEO must-haves:</span> Alt text, descriptive filenames, lazy loading</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">Core Web Vitals:</span> Keep LCP under 2.5s with optimized images</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                        <span><span className="font-bold">PDFSwift:</span> Free, private image resizing – no upload</span>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>

              {/* CTA */}
              <div className="mt-12 pt-10 border-t border-gray-200">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Optimize Your Website Images Now
                  </h3>
                  <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                    Use PDFSwift Image Resizer to get perfect dimensions for your website – free, private, no upload. Works on iPhone, Android, and desktop.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/resize-image"
                      className="inline-flex items-center justify-center px-7 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300"
                    >
                      Resize Images – Free
                    </Link>
                    <Link
                      href="/blog"
                      className="inline-flex items-center justify-center px-7 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300"
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