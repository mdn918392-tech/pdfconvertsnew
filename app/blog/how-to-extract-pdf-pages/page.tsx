import Link from "next/link";
import Image from "next/image";
import { 
  CalendarDays, 
  File, 
  CheckCircle, 
  Clock,
  Users,
  Download,
  Smartphone,
  Laptop,
  Globe,
  Shield,
  ShieldCheck,
  Lock,
  Cloud,
  HelpCircle,
  ChevronRight,
  BookOpen,
  Zap,
  Sparkles,
  Scissors,
  Layers,
  FileText,
  Eye,
  Printer,
  Server,
  Cpu,
  HardDrive,
  ArrowRight,
  FolderTree,
  AlertTriangle,
  Book,
  Smartphone as Phone,
  Monitor,
  Tablet,
  ArrowDownUp,
  FileOutput
} from "lucide-react";

export const metadata = {
  title: "How to Extract Pages from PDF Files: 2026 Complete Guide",
  description: "Step-by-step guide to extract specific pages from PDF documents. Learn online tools, desktop software, mobile apps, and best practices for secure PDF extraction.",
  keywords: "extract pdf pages, split pdf, extract pages from pdf, pdf splitter, extract pdf pages online, free pdf page extractor, extract specific pages from pdf, pdf tools, document management",
  openGraph: {
    type: "article",
    url: "https://pdfswift.online/blog/how-to-extract-pdf-pages",
    title: "How to Extract Pages from PDF Files: 2026 Complete Guide",
    description: "Complete guide to extract specific pages from PDF documents on Windows, Mac, iOS, Android, and online tools.",
    images: [{
      url: "https://i.ibb.co/qYL4yjSz/how-to-extractpage.jpg",
      width: 1200,
      height: 630,
      alt: "Extract PDF Pages Guide",
    }],
    siteName: "PDFSwift",
    locale: "en_US",
    publishedTime: "2026-01-15T08:00:00+00:00",
    modifiedTime: "2026-01-15T08:00:00+00:00",
  },
};

export default function ExtractPDFPagesGuide() {
  const extractionMethods = [
    {
      title: "Online PDF Extractors",
      icon: Globe,
      platforms: ["Browser", "Any Device"],
      pros: ["No installation", "Free options", "Access anywhere", "Easy to use"],
      cons: ["Internet required", "File size limits", "Privacy concerns"],
      bestFor: "Quick, occasional extractions"
    },
    {
      title: "Desktop Software",
      icon: Laptop,
      platforms: ["Windows", "Mac", "Linux"],
      pros: ["Offline access", "Advanced features", "Better security", "Large files"],
      cons: ["Installation needed", "Some paid options", "Updates required"],
      bestFor: "Professional & frequent use"
    },
    {
      title: "Mobile Apps",
      icon: Smartphone,
      platforms: ["iOS", "Android"],
      pros: ["Portable", "Camera scan", "Cloud sync", "Quick sharing"],
      cons: ["Small screen", "Limited features", "File size limits"],
      bestFor: "On-the-go extraction"
    }
  ];

  const useCases = [
    {
      title: "Academic Research",
      description: "Extract relevant pages from research papers and journals"
    },
    {
      title: "Business Documents",
      description: "Share specific contract sections without sending entire files"
    },
    {
      title: "Portfolio Creation",
      description: "Select best work samples from complete documents"
    },
    {
      title: "Legal Compliance",
      description: "Share only necessary documentation while maintaining privacy"
    }
  ];

  const extractionSteps = [
    {
      step: 1,
      title: "Choose Your Extraction Tool",
      description: "Select between online extractors for convenience, desktop software for power, or mobile apps for portability."
    },
    {
      step: 2,
      title: "Upload Your PDF File",
      description: "Load the PDF document you want to extract pages from. Most tools support drag-and-drop."
    },
    {
      step: 3,
      title: "Select Pages to Extract",
      description: "Choose specific page numbers, page ranges, or use page selection tools."
    },
    {
      step: 4,
      title: "Configure Settings",
      description: "Set output format, quality, and file naming options."
    },
    {
      step: 5,
      title: "Extract and Download",
      description: "Process the extraction and download your new PDF with only selected pages."
    }
  ];

  const faqItems = [
    {
      question: "Is extracting PDF pages online safe?",
      answer: "Yes, when using reputable services with HTTPS encryption, clear privacy policies, and automatic file deletion. Avoid uploading highly sensitive documents to unknown websites."
    },
    {
      question: "Can I extract pages from password-protected PDFs?",
      answer: "Most online tools cannot process password-protected PDFs. You'll need desktop software like Adobe Acrobat Pro that can unlock files with the correct password before extraction."
    },
    {
      question: "Does extracting pages reduce PDF quality?",
      answer: "No, extraction is non-destructive and preserves original quality. The extracted pages are exact copies of the original document pages."
    },
    {
      question: "What's the maximum file size for online extraction?",
      answer: "Most free online tools limit files to 50-100MB. Desktop software has no such limits and can handle much larger files."
    },
    {
      question: "Can I extract pages from scanned PDFs?",
      answer: "Yes, but scanned PDFs are image-based. Some tools offer OCR (Optical Character Recognition) to make scanned text selectable during extraction."
    },
    {
      question: "Are there free PDF extractors without watermarks?",
      answer: "Yes, many reputable tools like PDFSwift offer free extraction without watermarks. Most have limitations like file size restrictions or daily usage limits."
    }
  ];

  const tips = [
    "Preview pages before extraction to ensure you select the right ones",
    "Use clear naming conventions for extracted files (e.g., 'Document_Pages1-5_2026.pdf')",
    "Extract pages in batches for better organization",
    "Check file size before uploading to online tools",
    "Always verify extracted content matches your needs",
    "Use bookmark features for easy navigation in extracted documents"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "How to Extract Pages from PDF Files: 2026 Complete Guide",
            "description": "Step-by-step guide to extract specific pages from PDF documents on all devices and platforms.",
            "image": "https://pdfswift.online/blog/images/extract-pdf-pages.jpg",
            "datePublished": "2026-01-15T09:00:00+00:00",
            "dateModified": "2026-01-15T09:00:00+00:00",
            "author": {
              "@type": "Organization",
              "name": "PDFSwift",
              "url": "https://pdfswift.online"
            },
            "publisher": {
              "@type": "Organization",
              "name": "PDFSwift",
              "logo": {
                "@type": "ImageObject",
                "url": "https://pdfswift.online/logo.png",
                "width": 160,
                "height": 60
              }
            }
          })
        }}
      />

      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/blog" className="hover:text-blue-600">Blog</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">Extract PDF Pages</span>
        </div>
      </nav>

      {/* Header */}
      <header className="max-w-4xl mx-auto px-4 pb-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How to Extract Pages from <span className="text-blue-600">PDF Files</span> in 2026
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Complete guide to extract specific pages from PDF documents on Windows, Mac, iOS, Android, and online tools.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center px-4 py-2 bg-blue-50 rounded-lg">
              <CalendarDays className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-medium">January 15, 2026</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-green-50 rounded-lg">
              <Clock className="w-5 h-5 text-green-600 mr-2" />
              <span className="font-medium">4 min read</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-purple-50 rounded-lg">
              <Users className="w-5 h-5 text-purple-600 mr-2" />
              <span className="font-medium">All Skill Levels</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <Scissors className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Extract Specific Pages from PDF Documents</h2>
              <p>Save time by sharing only what matters</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <article className="lg:w-2/3">
            {/* Table of Contents */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                What You'll Learn
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Online PDF extraction methods</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Desktop software options</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Mobile app solutions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Step-by-step guide</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Security best practices</span>
                </li>
              </ul>
            </div>

            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction to PDF Page Extraction</h2>
              <p className="text-lg text-gray-700 mb-4">
                PDF page extraction is the process of selecting and saving specific pages from a larger PDF document. This essential skill helps you organize documents efficiently, share only relevant information, and manage digital files effectively.
              </p>
              <p className="text-lg text-gray-700">
                Whether you're preparing reports, compiling research, or organizing business documents, knowing how to extract pages from PDFs saves time and improves productivity. This guide covers all methods available in 2026.
              </p>
            </section>

            {/* Use Cases */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Use Cases</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {useCases.map((useCase, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{useCase.title}</h3>
                    </div>
                    <p className="text-gray-700">{useCase.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Extraction Methods */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Extraction Methods Comparison</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {extractionMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <div key={index} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-blue-100 rounded-lg mr-4">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{method.title}</h3>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-600 mb-2">Platforms</h4>
                        <div className="flex flex-wrap gap-2">
                          {method.platforms.map((platform, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-green-600 mb-2">Advantages</h4>
                        <ul className="space-y-1">
                          {method.pros.map((pro, idx) => (
                            <li key={idx} className="flex items-center text-gray-700">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              <span className="text-sm">{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-red-600 mb-2">Limitations</h4>
                        <ul className="space-y-1">
                          {method.cons.map((con, idx) => (
                            <li key={idx} className="flex items-center text-gray-700">
                              <div className="w-4 h-4 flex items-center justify-center mr-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              </div>
                              <span className="text-sm">{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Best for:</span> {method.bestFor}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Step-by-Step Guide */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Step-by-Step Extraction Guide</h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="space-y-8">
                  {extractionSteps.map((step) => (
                    <div key={step.step} className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-6">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                        <p className="text-gray-700">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Tips */}
            <section className="mb-12">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Pro Tips for Efficient Extraction</h3>
                <ul className="space-y-3">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <Zap className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <HelpCircle className="w-8 h-8 mr-3 text-blue-500" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <HelpCircle className="w-5 h-5 text-blue-500 mr-3" />
                      {item.question}
                    </h4>
                    <p className="text-gray-700 pl-8">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Extract PDF Pages?</h3>
              <p className="mb-6 text-blue-100">
                Start extracting specific pages from your PDF documents today with our easy-to-use tools.
              </p>
              <Link href="/extract-pages">
                <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center">
                  <Scissors className="w-5 h-5 mr-2" />
                  Extract PDF Pages Now
                </button>
              </Link>
            </section>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="sticky top-8 space-y-6">
              {/* Quick Stats */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-blue-500" />
                  Quick Facts
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Guide Length</span>
                    <span className="font-semibold text-gray-900">1500+ Words</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Reading Time</span>
                    <span className="font-semibold text-gray-900">4 Minutes</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="font-semibold text-gray-900">Jan 15, 2026</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Skill Level</span>
                    <span className="font-semibold text-gray-900">Beginner</span>
                  </div>
                </div>
              </div>

              {/* Related Tools */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4">Related Tools</h4>
                <div className="space-y-4">
                  <Link href="/extract-pages" className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                    <div className="flex items-center mb-2">
                      <Scissors className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="font-semibold text-gray-900">Extract PDF Pages</span>
                    </div>
                    <p className="text-sm text-gray-600">Extract specific pages from PDF documents</p>
                  </Link>
                  <Link href="/merge-pdf" className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition">
                    <div className="flex items-center mb-2">
                      <Layers className="w-5 h-5 text-green-600 mr-2" />
                      <span className="font-semibold text-gray-900">Merge PDF Files</span>
                    </div>
                    <p className="text-sm text-gray-600">Combine multiple PDFs into one document</p>
                  </Link>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                  <ShieldCheck className="w-5 h-5 mr-2 text-green-500" />
                  Security Features
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Lock className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">HTTPS Encryption</span>
                  </li>
                  <li className="flex items-center">
                    <Cloud className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">Automatic File Deletion</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">No Data Retention</span>
                  </li>
                </ul>
              </div>

              {/* Platform Support */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4">Platform Support</h4>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Monitor className="w-5 h-5 text-blue-500 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Desktop</p>
                      <p className="text-sm text-gray-600">Windows, Mac, Linux</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-green-500 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Mobile</p>
                      <p className="text-sm text-gray-600">iOS, Android</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Globe className="w-5 h-5 text-purple-500 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Web</p>
                      <p className="text-sm text-gray-600">Any Browser</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}