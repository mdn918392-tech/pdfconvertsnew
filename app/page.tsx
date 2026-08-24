"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Grid,
  Zap,
  Shield,
  CloudOff,
  FileText,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import type { Tool } from "./types";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const extendedTools: Tool[] = [
    // PDF Tools
    {
      id: "merge-pdf",
      name: "Merge PDF Online",
      description: "Combine multiple PDF files into one single document online for free without losing quality.",
      category: "pdf",
      icon: "🔗",
      color: "from-purple-500 to-pink-500",
      href: "/merge-pdf",
      path: "/tools/merge-pdf",
    },
    {
      id: "pdf-to-jpg",
      name: "PDF to JPG Converter",
      description: "Convert PDF pages to high-resolution JPG images online free with fast batch processing.",
      category: "pdf",
      icon: "🖼️",
      color: "from-green-500 to-emerald-500",
      href: "/pdf-to-jpg",
      path: "/tools/pdf-to-jpg",
    },
    {
      id: "split-pdf",
      name: "Split PDF Pages",
      description: "Split PDF files into separate pages or extract individual PDF documents online for free.",
      category: "pdf",
      icon: "✂️",
      color: "from-orange-500 to-red-500",
      href: "/split-pdf",
      path: "/tools/split-pdf",
    },
    {
      id: "extract-pages",
      name: "Extract PDF Pages",
      description: "Extract specific pages from PDF online free and save them as a separate PDF file instantly.",
      category: "pdf",
      icon: "📑",
      color: "from-indigo-500 to-blue-500",
      href: "/extract-pages",
      path: "/tools/extract-pages",
    },
    {
      id: "organize-pdf",
      name: "Organize PDF Pages",
      description: "Reorder, rotate, delete, and rearrange pages in your PDF document easily online.",
      category: "pdf",
      icon: "🗂️",
      color: "from-blue-500 to-cyan-500",
      href: "/organize-pdf",
      path: "/organize-pdf",
    },
    {
      id: "jpg-to-pdf",
      name: "JPG to PDF Converter",
      description: "Convert JPG, PNG, and WebP images to PDF documents online free with custom layout settings.",
      category: "pdf",
      icon: "📄",
      color: "from-blue-500 to-cyan-500",
      href: "/jpg-to-pdf",
      path: "/tools/jpg-to-pdf",
    },
    {
      id: "compress-pdf",
      name: "Compress PDF Online",
      description: "Compress PDF files online and reduce file size fast while maintaining maximum document quality.",
      category: "pdf",
      icon: "📦",
      color: "from-blue-500 to-cyan-500",
      href: "/compress-pdf",
      path: "/tools/compress-pdf",
    },
    {
      id: "remove-pages",
      name: "PDF Page Remover",
      description: "Delete PDF pages and remove unwanted pages from PDF documents online free in seconds.",
      category: "pdf",
      icon: "🗑️",
      color: "from-rose-500 to-pink-500",
      href: "/remove-pages",
      path: "/tools/remove-pages",
    },
    {
      id: "rotate-pdf",
      name: "Rotate PDF Pages",
      description: "Rotate PDF pages clockwise or counterclockwise online and save the new orientation permanently.",
      category: "pdf",
      icon: "🔄",
      color: "from-teal-500 to-cyan-500",
      href: "/rotate-pdf",
      path: "/tools/rotate-pdf",
    },
    {
      id: "add-pages-and-images-to-pdf",
      name: "Add Pages to PDF",
      description: "Add pages to PDF online free and insert new images or blank pages anywhere in your PDF file.",
      category: "pdf",
      icon: "📄➕",
      color: "from-indigo-500 to-purple-500",
      href: "add-pages-and-images-to-pdf",
      path: "/tools/add-pages-and-images-to-pdf",
    },
    {
      id: "pdf-filter",
      name: "PDF Filter & Effects",
      description: "Apply custom visual filters, contrast adjustments, and color effects to PDF documents online.",
      category: "pdf",
      icon: "📄✨",
      color: "from-purple-500 to-pink-600",
      href: "/pdf-filter",
      path: "/tools/pdf-filter",
    },
    // Image Tools
    {
      id: "png-to-jpg",
      name: "PNG to JPG Converter",
      description: "Convert PNG images to JPG format online free with fast processing and clear image quality.",
      category: "image",
      icon: "🔄",
      color: "from-emerald-500 to-green-500",
      href: "/png-to-jpg",
      path: "/tools/png-to-jpg",
    },
    {
      id: "resize-image",
      name: "Resize JPG & Image",
      description: "Resize JPG, PNG, and WebP images online free by changing pixels or dimensions instantly.",
      category: "image",
      icon: "📏",
      color: "from-green-500 to-emerald-500",
      href: "/resize-image",
      path: "/tools/resize-image",
    },
    {
      id: "passport-photo",
      name: "Passport Photo Maker",
      description: "Create passport size photos online free, format printable A4 sheets, and export directly to PDF.",
      category: "image",
      icon: "📸",
      color: "from-blue-500 to-indigo-600",
      href: "/passport-photo",
      path: "/tools/passport-photo",
    },
    {
      id: "rotate-image",
      name: "Rotate JPG & Image",
      description: "Rotate JPG, PNG, and WebP images online quickly to fix photo orientation for free.",
      category: "image",
      icon: "↻",
      color: "from-blue-500 to-cyan-500",
      href: "/rotate-image",
      path: "/tools/rotate-image",
    },
    {
      id: "compress-image",
      name: "Compress Image Online",
      description: "Reduce JPG, PNG, and WebP image file sizes online free without sacrificing visual quality.",
      category: "image",
      icon: "📉",
      color: "from-blue-500 to-cyan-500",
      href: "/compress-image",
      path: "/tools/compress-image",
    },
   {
   id: "webpage-to-jpg",
    name: "Webpage to JPG Converter",
   description: "Convert webpage to JPG online free instantly.",
   category: "image",
    icon: "🔄",
   color: "from-purple-500 to-pink-500",
   href: "/webpage-to-jpg",
   path: "/tools/webpage-to-jpg",
   },
];

  const cleanTools = extendedTools.filter((t) => t != null);

  // सिर्फ pdf और image कैटेगरी रखें
  const categories = {
    pdf: cleanTools.filter((t) => t.category === "pdf"),
    image: cleanTools.filter((t) => t.category === "image"),
  };

  // सभी टूल्स को combine करें
  const allTools = [...categories.pdf, ...categories.image];

  const filteredTools =
    activeCategory === "all"
      ? allTools
      : categories[activeCategory as keyof typeof categories] || [];

  // सिर्फ all, pdf, और image टैब रखें
  const categoryTabs = [
    { id: "all", label: "All Tools", icon: "grid", count: allTools.length },
    {
      id: "pdf",
      label: "PDF Tools",
      icon: "pdf",
      count: categories.pdf.length,
    },
    {
      id: "image",
      label: "Image Tools",
      icon: "image",
      count: categories.image.length,
    },
  ];

  const stats = [
  {
    value: "100%",
    label: "Free Forever",
    icon: "free",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    value: "0.5s",
    label: "Processing Time",
    icon: "zap",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    value: "99.9%",
    label: "Uptime",
    icon: "clock",
    gradient: "from-amber-500 to-orange-500",
  },
 
];

  const features = [
    {
  icon: <Shield className="w-6 h-6" />,
  title: "Privacy First",
  description:
    "Your privacy comes first. We keep your files private and secure while you use PDFSwift.",
  gradient: "from-blue-500 to-cyan-500",
},
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast Processing",
      description:
        "Powered by WebAssembly for near-native speed. Process large files instantly.",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      icon: <CloudOff className="w-6 h-6" />,
      title: "100% Client-Side",
      description:
        "No servers, no uploads, no data storage. Complete privacy guaranteed.",
      gradient: "from-emerald-500 to-green-500",
    },
  ];

 // FAQ Data with Schema Structure
  const faqs = [
    {
      question: "What is PDFSwift (or pdf swift) and how does it work?",
      answer: "PDFSwift (also searched as pdf swift) is a free online platform offering easy-to-use tools for PDF and image editing. You can split PDFs, remove pages, convert URLs to JPGs, and compress files instantly directly in your browser.",
      schemaAnswer: "PDFSwift (also searched as pdf swift) is a free online platform offering easy-to-use tools for PDF and image editing. You can split PDFs, remove pages, convert URLs to JPGs, and compress files instantly directly in your browser."
    },
    {
      question: "Is PDFSwift really free to use?",
      answer: "Yes, PDFSwift is 100% completely free with no hidden costs, no subscription fees, and no usage limits. You can split PDF files, remove PDF pages, and convert documents without paying anything.",
      schemaAnswer: "Yes, PDFSwift is 100% completely free with no hidden costs, no subscription fees, and no usage limits. You can split PDF files, remove PDF pages, and convert documents without paying anything."
    },
    {
      question: "How do I split PDF pages or delete specific pages from a PDF?",
      answer: "You can easily use our Split PDF or PDF Page Remover tool. Simply upload your document, select the specific pages you want to split or delete, and download your updated PDF instantly.",
      schemaAnswer: "You can easily use our Split PDF or PDF Page Remover tool. Simply upload your document, select the specific pages you want to split or delete, and download your updated PDF instantly."
    },
    {
      question: "How can I convert a URL to JPG or webpage to JPG?",
      answer: "Use our URL to JPG converter tool on PDFSwift. Just paste any website link or URL, click convert, and download full high-quality webpage screenshots as JPG images for free.",
      schemaAnswer: "Use our URL to JPG converter tool on PDFSwift. Just paste any website link or URL, click convert, and download full high-quality webpage screenshots as JPG images for free."
    },
    {
      question: "Are my uploaded files secure and private?",
      answer: "Absolutely. All file processing on PDFSwift happens 100% locally in your web browser. We never upload, store, or view your files on any external server, ensuring maximum privacy and data security.",
      schemaAnswer: "All file processing on PDFSwift happens 100% locally in your web browser. We never upload, store, or view your files on any external server, ensuring maximum privacy and data security."
    },
    {
      question: "Can I add new pages or images to an existing PDF?",
      answer: "Yes, our 'Add Pages to PDF' tool allows you to insert new blank pages, add images, or attach extra pages into any existing PDF document online.",
      schemaAnswer: "Yes, our 'Add Pages to PDF' tool allows you to insert new blank pages, add images, or attach extra pages into any existing PDF document online."
    },
    {
      question: "Can I create passport size photos online and export to PDF?",
      answer: "Yes, our Passport Photo Maker tool lets you create printable passport-size photo sheets online for free and export them directly as a print-ready PDF document.",
      schemaAnswer: "Yes, our Passport Photo Maker tool lets you create printable passport-size photo sheets online for free and export them directly as a print-ready PDF document."
    },
    {
      question: "Is there any file size limit or daily restriction?",
      answer: "No, PDFSwift has no file size limits or daily task caps. However, processing speed for extremely large files depends on your device's RAM and CPU performance.",
      schemaAnswer: "No, PDFSwift ne has no file size limits or daily task caps. However, processing speed for extremely large files depends on your device's RAM and CPU performance."
    },
    {
      question: "Do I need to sign up or create an account on PDFSwift?",
      answer: "No registration or sign-up is required. You can use all PDF tools, image converters, and editors instantly without providing any personal email or creating an account.",
      schemaAnswer: "No registration or sign-up is required. You can use all PDF tools, image converters, and editors instantly without providing any personal email or creating an account."
    }
  ];

  // Schema.org FAQ Structured Data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.schemaAnswer
      }
    }))
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-violet-300/20 to-purple-300/20 dark:from-violet-900/10 dark:to-purple-900/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section with PDFSwift Brand */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative text-center mb-16 sm:mb-24 max-w-5xl mx-auto px-6"
        >
          {/* Modern Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Privacy-First Processing
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl sm:text-8xl font-[900] tracking-tight mb-6">
            <span className="bg-gradient-to-br from-gray-900 via-blue-700 to-violet-800 dark:from-white dark:via-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
              PDFSwift
            </span>
          </h1>

          {/* Refined Description */}
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              PDFSwift is a free online PDF tool to convert, compress, merge, split, rotate, and edit PDF files safely.  
              We keep your files private — 100% secure by default.
              <br />
              Your privacy is our default setting.
            </h2>
          </div>
        </motion.div>

        {/* Stats Section */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
  className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full"
>
  {stats.slice(0, 3).map((stat, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-5
                 border-2 border-gray-100 dark:border-gray-800
                 hover:border-gray-200 dark:hover:border-gray-700
                 transition-all duration-300 hover:scale-105 hover:shadow-xl
                 cursor-default w-full"
    >
      {/* Icon */}
      <div
        className={`bg-gradient-to-br ${stat.gradient} p-3 rounded-xl w-fit mb-4
                    group-hover:scale-110 transition-transform shadow-lg`}
      >
        <div className="text-white">
          {stat.icon === "free" && (
            <div className="w-6 h-6 border-2 border-white rounded-full" />
          )}

          {stat.icon === "zap" && (
            <Zap className="w-6 h-6" />
          )}

          {stat.icon === "clock" && (
            <div className="w-6 h-6 border-2 border-white rounded-full relative">
              <div
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full
                           -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          )}
        </div>
      </div>

      {/* Value */}
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
        {stat.value}
      </div>

      {/* Label */}
      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {stat.label}
      </div>
    </motion.div>
  ))}
</motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`group flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 cursor-pointer ${
                  activeCategory === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-gray-100 dark:border-gray-800"
                }`}
              >
                <span className="text-lg">
                  {tab.id === "all" && <Grid className="w-5 h-5" />}
                  {tab.id === "pdf" && <FileText className="w-5 h-5" />}
                  {tab.id === "image" && <ImageIcon className="w-5 h-5" />}
                </span>
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    activeCategory === tab.id
                      ? "bg-white/20"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool, index) => (
              <motion.a
                key={tool.id}
                href={tool.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-6 hover:border-blue-300 dark:hover:border-cyan-700 transition-all shadow-lg hover:shadow-2xl cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 bg-gradient-to-br ${tool.color} rounded-xl shadow-lg`}
                  >
                    <span className="text-2xl">{tool.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {tool.description}
                    </p>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-cyan-400 font-medium">
                      <span className="text-sm">Use Tool</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose PDFSwift?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Built for professionals who value privacy, speed, and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-8 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 hover:scale-105 cursor-default"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                />
                <div
                  className={`inline-flex p-3 bg-gradient-to-br ${feature.gradient} rounded-xl mb-6 text-white`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
          id="faq"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get answers to common questions about PDFSwift
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-100 dark:border-gray-700 p-6 cursor-default"
              >
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h3>

                <p className="text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}