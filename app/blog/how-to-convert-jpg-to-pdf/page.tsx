import data from "../data.json";
import Head from "next/head";
import BlogToolsSection from "@/app/components/BlogToolsSection";
import { 
  CalendarDays, 
  FileImage, 
  Shield, 
  CheckCircle, 
  Lightbulb,
  ArrowRight,
  Sparkles,
  Clock,
  FileText,
  File,
  Upload,
  Settings,
  HelpCircle,
  Zap,
  Users,
  BarChart3,
  ChevronRight,
  Search,
  Share2,
  BookOpen,
  Download,
  Smartphone,
  Globe
} from "lucide-react";

export const dynamic = "force-static";



export default function JPGtoPDFBlog() {
  const tips = [
    "Use high-resolution images for better clarity",
    "Compress images to reduce PDF file size if needed",
    "Match page orientation with image orientation",
    "Remove unnecessary borders or blank spaces",
    "Always preview before sharing or printing"
  ];

  const benefits = [
    "PDFs combine multiple images into a single file",
    "They are easier to email and upload",
    "PDFs maintain consistent layout across devices",
    "They are better suited for printing and archiving",
    "PDFs can be password-protected for security"
  ];

  const blogData = data[0];
  const { howto, faq } = blogData;

  const formatTime = (isoTime: string) => {
    if (!isoTime) return "5 minutes";
    return isoTime.replace('PT', '').replace('M', ' minutes');
  };


  const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Convert JPG to PDF Online",
  description: "Step-by-step guide to convert JPG images to PDF format.",
  totalTime: howto?.estimatedTime || "PT5M",
  supply: howto?.supply?.map((item) => ({
    "@type": "HowToSupply",
    name: item,
  })),
  tool: howto?.tool?.map((item) => ({
    "@type": "HowToTool",
    name: item,
  })),
  step: howto?.steps?.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    text: step,
  })),
};


  // Structured Data JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Convert JPG to PDF Online - Complete 2024 Guide",
    "description": "Step-by-step guide to convert JPG images to PDF format. Learn online methods, offline software options, best practices for image quality, and security tips for document conversion.",
    "image": "https://pdfswift.online/blog/how-to-convert-jpg-to-pdf",
    "author": {
      "@type": "Organization",
      "name": "Your Domain",
      "url": "https://pdfswift.online"
    },
    "publisher": {
      "@type": "Organization",
      "name": "pdfswift",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pdfswift.online/favicon.png"
      }
    },
    "datePublished": "2024-01-12",
    "dateModified": "2024-01-12",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://pdfswift.online/blog/how-to-convert-jpg-to-pdf"
    },
    "articleSection": "Technology, How-To",
    "keywords": "convert jpg to pdf, jpg to pdf online, image to pdf, free pdf converter, jpg to pdf converter online",
    "wordCount": "1500",
    "timeRequired": "PT5M",
    "difficulty": "Easy"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq?.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://pdfswift.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://pdfswift.online/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "How to Convert JPG to PDF",
        "item": "https://pdfswift.online/blog/how-to-convert-jpg-to-pdf"
      }
    ]
  };

  return (
    <>
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
          <ol className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <li>
              <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a>
            </li>
            <li className="mx-2">
              <ChevronRight className="w-4 h-4" />
            </li>
            <li>
              <a href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</a>
            </li>
            <li className="mx-2">
              <ChevronRight className="w-4 h-4" />
            </li>
            <li aria-current="page" className="text-gray-900 dark:text-white font-medium">
              JPG to PDF Guide
            </li>
          </ol>
        </nav>

        {/* Header Section */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-8">
          <div className="text-center mb-8">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                <FileImage className="w-4 h-4 mr-2" aria-hidden="true" />
                Digital Document Guide
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium">
                <BarChart3 className="w-4 h-4 mr-2" aria-hidden="true" />
                Updated 2024
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              How to Convert <span className="text-blue-600 dark:text-blue-400">JPG to PDF</span> Online
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Complete step-by-step guide with best practices, security tips, and tools comparison for 2024
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
              <div className="flex items-center">
                <CalendarDays className="w-5 h-5 mr-2" aria-hidden="true" />
                <time dateTime="2024-01-12" className="font-medium">January 12, 2024</time>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" aria-hidden="true" />
                <span className="font-medium">5 min read</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" aria-hidden="true" />
                <span className="font-medium">Beginner to Advanced</span>
              </div>
            </div>

           
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 p-8 mb-12" role="img" aria-label="JPG to PDF conversion process illustration">
            <div className="relative z-10 text-white">
              <div className="flex items-center justify-between">
                <div className="max-w-lg">
                  <h2 className="text-2xl font-bold mb-4">Transform Your Images</h2>
                  <p className="text-blue-100 mb-6">
                    Turn scattered JPGs into organized, professional PDF documents with our comprehensive guide
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg flex items-center">
                      <FileImage className="w-5 h-5 mr-2" aria-hidden="true" />
                      <span className="font-medium">JPG Format</span>
                    </div>
                    <ArrowRight className="w-6 h-6" aria-hidden="true" />
                    <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg flex items-center">
                      <FileText className="w-5 h-5 mr-2" aria-hidden="true" />
                      <span className="font-medium">PDF Document</span>
                    </div>
                  </div>
                </div>
                <Sparkles className="w-24 h-24 opacity-50 hidden md:block" aria-hidden="true" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </header>

        {/* Main Content */}
        <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <article className="lg:w-2/3">
              {/* Table of Contents for better navigation */}
              <nav aria-label="Article sections" className="mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-blue-500" aria-hidden="true" />
                    Table of Contents
                  </h3>
                  <ol className="space-y-2">
                    {[
                      "Introduction",
                      "How to Convert JPG to PDF",
                      "Why Convert JPG to PDF?",
                      "Frequently Asked Questions",
                      "Pro Tips for Best Results",
                      "Security & Privacy",
                      "Conclusion"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-blue-600 dark:text-blue-400 font-medium mr-2">{index + 1}.</span>
                        <a 
                          href={`#section-${index + 1}`}
                          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </nav>

              <div className="prose prose-lg dark:prose-dark max-w-none">
                {/* Introduction */}
                <section id="section-1" className="scroll-mt-20">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      Converting JPG images to PDF is one of the most common digital tasks today. Whether you are a student submitting assignments, a professional sharing scanned documents, or someone archiving personal photos, combining multiple JPG images into a single PDF file makes sharing, printing, and storing files much easier.
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                      In this comprehensive guide, we'll cover everything from basic online converters to advanced offline software, ensuring you can convert your images to PDF efficiently regardless of your technical expertise.
                    </p>
                  </div>
                </section>

                {/* How-To Section */}
                <section id="section-2" className="scroll-mt-20 mb-12">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                      <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How to Convert JPG to PDF</h2>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" aria-hidden="true" />
                          <span className="font-semibold text-gray-900 dark:text-white">Estimated Time</span>
                        </div>
                        <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
                          {formatTime(howto?.estimatedTime || "")}
                        </p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <File className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" aria-hidden="true" />
                          <span className="font-semibold text-gray-900 dark:text-white">Tools Required</span>
                        </div>
                        <p className="text-lg font-bold text-green-700 dark:text-green-300">
                          {howto?.tool?.length || 3} Tools
                        </p>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" aria-hidden="true" />
                          <span className="font-semibold text-gray-900 dark:text-white">Difficulty Level</span>
                        </div>
                        <p className="text-lg font-bold text-purple-700 dark:text-purple-300">Easy</p>
                      </div>
                    </div>

                    {/* Steps */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Step-by-Step Instructions</h3>
                    <div className="space-y-6">
                      {howto?.steps?.map((step, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg mr-4">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Step {index + 1}</h4>
                            <p className="text-gray-700 dark:text-gray-300">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Supplies and Tools */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg">
                        <h5 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                          <Upload className="w-5 h-5 mr-2 text-blue-500" aria-hidden="true" />
                          Supplies Needed
                        </h5>
                        <ul className="space-y-2">
                          {howto?.supply?.map((item, index) => (
                            <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg">
                        <h5 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                          <Settings className="w-5 h-5 mr-2 text-green-500" aria-hidden="true" />
                          Tools Required
                        </h5>
                        <ul className="space-y-2">
                          {howto?.tool?.map((item, index) => (
                            <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Why Convert Section */}
                <section id="section-3" className="scroll-mt-20 mb-12">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                      <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Convert JPG to PDF?</h2>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    JPG is a popular image format, but managing multiple JPG files can be inconvenient. PDFs, on the other hand, are designed for documents and multi-page layouts. Here are some key reasons why people prefer PDF over JPG for document sharing:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {benefits.map((benefit, index) => (
                      <div 
                        key={index}
                        className="flex items-start p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" aria-hidden="true" />
                        <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* FAQ Section */}
                <section id="section-4" className="scroll-mt-20 mb-12">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                      <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                  </div>

                  <div className="space-y-4">
                    {faq?.map((item, index) => (
                      <div 
                        key={index} 
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                        itemScope
                        itemProp="mainEntity"
                        itemType="https://schema.org/Question"
                      >
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center" itemProp="name">
                          <HelpCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" aria-hidden="true" />
                          {item.question}
                        </h4>
                        <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                          <p className="text-gray-700 dark:text-gray-300 pl-8" itemProp="text">{item.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Tips Section */}
                <section id="section-5" className="scroll-mt-20 mt-12">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-800/30">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                      <Lightbulb className="w-6 h-6 text-amber-500 mr-3" aria-hidden="true" />
                      Pro Tips for Best Results
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {tips.map((tip, index) => (
                        <div 
                          key={index}
                          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-amber-100 dark:border-amber-800/30"
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-amber-600 dark:text-amber-400 text-xs font-bold">
                                {index + 1}
                              </span>
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Security Section */}
                <section id="section-6" className="scroll-mt-20 mt-12">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800/30">
                    <div className="flex items-center mb-6">
                      <Shield className="w-8 h-8 text-green-600 dark:text-green-400 mr-4" aria-hidden="true" />
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Security & Privacy</h3>
                    </div>
                    <div className="space-y-4">
                      <p className="text-gray-700 dark:text-gray-300">
                        When using online JPG to PDF tools, make sure the website uses secure connections (HTTPS) and clearly states its data privacy policy. Avoid uploading highly confidential documents to untrusted platforms.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        If privacy is a concern, consider using offline tools or converters that automatically delete uploaded files after processing. Look for tools with end-to-end encryption for maximum security.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Conclusion */}
                <section id="section-7" className="scroll-mt-20 mt-12 text-center">
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 text-white rounded-2xl p-8">
                    <h3 className="text-2xl font-bold mb-4">Ready to Convert?</h3>
                    <p className="text-gray-300 mb-6">
                      Converting JPG images to PDF is a simple yet powerful way to organize, share, and archive visual information. With the right tools and settings, you can create high-quality PDFs in just a few minutes.
                    </p>
                    <p className="text-gray-300">
                      Whether you choose an online converter for convenience or an offline tool for control and privacy, following these steps will help you achieve professional results every time.
                    </p>
                  </div>
                </section>
              </div>

              {/* Related Content */}
              <section className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Guides</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-3">
                      <Smartphone className="w-5 h-5 text-blue-500 mr-2" />
                      <h4 className="font-bold text-gray-900 dark:text-white">Mobile PDF Tools</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Best mobile apps for converting images to PDF on iOS and Android devices.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-3">
                      <Globe className="w-5 h-5 text-green-500 mr-2" />
                      <h4 className="font-bold text-gray-900 dark:text-white">Online vs Offline Tools</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Comparison of online converters vs desktop software for PDF creation.
                    </p>
                  </div>
                </div>
              </section>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-1/3">
              <div className="sticky top-8 space-y-6">
                {/* Quick Stats */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-blue-500" aria-hidden="true" />
                    Quick Facts
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Time Required</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatTime(howto?.estimatedTime || "")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Difficulty Level</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">Easy</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Best For</span>
                      <span className="font-semibold text-gray-900 dark:text-white">All Users</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 dark:text-gray-400">Cost</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">Free</span>
                    </div>
                  </div>
                </div>

                {/* Tools Comparison */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">Method Comparison</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="font-semibold text-gray-900 dark:text-white">Online Tools</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Best for quick, one-time conversions
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                        <span className="font-semibold text-gray-900 dark:text-white">Offline Software</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Best for frequent use & sensitive documents
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">Quick Links</h4>
                  <nav aria-label="Quick links">
                    <ul className="space-y-3">
                      {howto?.steps?.slice(0, 3).map((step, index) => (
                        <li key={index}>
                          <a 
                            href={`#section-2`}
                            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            <ArrowRight className="w-4 h-4 text-blue-500 mr-3" aria-hidden="true" />
                            <span className="text-sm">{step.substring(0, 40)}...</span>
                          </a>
                        </li>
                      ))}
                      {faq?.slice(0, 2).map((item, index) => (
                        <li key={index + 3}>
                          <a 
                            href={`#section-4`}
                            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            <HelpCircle className="w-4 h-4 text-green-500 mr-3" aria-hidden="true" />
                            <span className="text-sm">{item.question.substring(0, 40)}...</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                  <h4 className="font-bold mb-4">Ready to Start?</h4>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" aria-hidden="true" />
                      <span>Try an online converter</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" aria-hidden="true" />
                      <span>Test with sample images</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" aria-hidden="true" />
                      <span>Share feedback</span>
                    </li>
                  </ul>
                  <button 
                    className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
                    aria-label="Start converting JPG to PDF now"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Start Converting Now
                  </button>
                </div>

                {/* Search */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">Search More Guides</h4>
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Search topics..."
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Search blog articles"
                    />
                    <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </aside>
          </div>
          
        </main>
        
      </div>
      <BlogToolsSection />
    </>
  );
}