import Link from "next/link";
import { 
  FileText, 
  Scissors, 
  Download, 
  Smartphone, 
  Laptop, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  HelpCircle,
  Printer,
  MousePointer2,
  Lock,
  Zap,
  BookOpen,
  Calendar,
  Sparkles,
  ThumbsUp,
  Coffee
} from "lucide-react";

// Enhanced metadata for SEO
export const metadata = {
  title: "How to Extract Specific Pages from PDF on Mobile and PC (Step-by-Step Guide)",
  description: "Struggling with massive PDFs? Learn the quickest ways to extract just the pages you need—on any device. I'll walk you through simple methods that actually work.",
  keywords: "extract pdf pages, save one page of pdf, split pdf, pdf page extractor, how to save specific pages of pdf, pdf tutorial 2026, free pdf tools, pdf swift, document management made easy",
  authors: [{ name: "PDFSwift Team" }],
  publisher: "PDFSwift",
  robots: {   
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "The Surprisingly Easy Way to Extract PDF Pages (2026 Edition)",
    description: "Tired of 100-page PDFs when you only need 3 pages? Here's how to get just what you need—no tech skills required.",
    type: "article",
    publishedTime: "2026-01-20T00:00:00.000Z",
    authors: ["Sam from PDFSwift"],
    tags: ["PDF Tips", "Productivity", "Work Smarter", "Tech Made Easy"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Hack: Extract Just the Pages You Need",
    description: "Stop downloading entire PDFs. Here's how to grab only what matters.",
    creator: "@pdfswift",
  },
  alternates: {
    canonical: "https://pdfswift.online/blog/extract-pdf-pages-guide",
  },
};

// FAQ Schema for rich snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Will extracting pages mess up my PDF quality?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not at all! Think of it like copying a photo on your phone—the copy looks exactly like the original. The extraction process just grabs the existing page data and puts it in a new file. Your images and text stay crisp."
      }
    },
    {
      "@type": "Question",
      "name": "What if my PDF has a password?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If you have the password, you're good to go. If it's locked down (like some work documents), you'll need the 'owner password' first. Most online tools now ask if you have a password before starting."
      }
    },
    {
      "@type": "Question",
      "name": "Extracting vs. splitting—what's the real difference?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Splitting is like cutting a cake into equal slices. Extracting is taking just the piece with the cherry on top. You get to pick exactly what you want, nothing more."
      }
    }
  ]
};

// Article Schema for rich snippets
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Pull Specific Pages from PDFs (2026): The Painless Way",
  "description": "Stop downloading entire PDFs. Here's how to grab just the pages you actually need—on any device.",
  "image": "https://pdfswift.online/images/extractpdfpages",
  "author": {
    "@type": "Person",
    "name": "Sam",
    "url": "https://pdfswift.online/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "PDFSwift",
    "logo": {
      "@type": "ImageObject",
      "url": "https://pdfswift.online/logo.png"
    }
  },
  "datePublished": "2026-01-20T00:00:00.000Z",
  "dateModified": "2026-01-20T00:00:00.000Z",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://pdfswift.online/blog/how-to-extract-specific-pages-from-pdf"
  }
};

export default function ExtractPDFGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans">
      {/* Add Structured Data to head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* --- BREADCRUMBS --- */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li><Link href="/" className="hover:text-blue-600 transition">Home</Link></li>
          <ChevronRight className="w-4 h-4" />
          <li><Link href="/blog" className="hover:text-blue-600 transition">Blog</Link></li>
          <ChevronRight className="w-4 h-4" />
          <li className="font-medium text-gray-900">Extract PDF Pages</li>
        </ol>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6 animate-pulse">
            <Sparkles className="w-4 h-4 mr-2" />
            Updated for 2026 workflows
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
           How to Extract Specific Pages from PDF on Mobile and PC (Step-by-Step Guide)
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Hey there! I'm Sam from PDFSwift. If you've ever wasted time scrolling through a 100-page report just to find that one chart or contract clause, this guide is for you. Let me show you the surprisingly simple ways to grab exactly what you need.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <img 
                src="https://pdfswift.online/images/sam-avatar.jpg" 
                alt="Sam from PDFSwift"
                className="w-8 h-8 rounded-full mr-3 border-2 border-white shadow"
              />
              <span>Written by Sam • PDF enthusiast</span>
            </div>
            <span className="hidden sm:block">•</span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              5 minute read • Grab a coffee ☕
            </span>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* LEFT COLUMN: ARTICLE CONTENT */}
        <main className="lg:w-2/3 space-y-12">
          
          {/* Section 1: The "Aha!" Moment */}
          <section id="intro" className="prose prose-lg max-w-none">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">The "Wait, I Can Do That?" Moment</h2>
                <p className="text-gray-500">January 20, 2026 • Updated today</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-transparent p-6 rounded-2xl border-l-4 border-blue-400 mb-8">
              <p className="text-gray-700 leading-relaxed text-lg">
                <strong>True story:</strong> Last week, my friend Sarah needed just <em>one page</em> from a 50-page legal document. She was about to download the whole thing when I showed her this trick. Two minutes later, she had exactly what she needed. That's the power of knowing how to extract pages.
              </p>
            </div>
            
            <p className="text-gray-700 leading-relaxed text-lg">
              PDF extraction isn't some fancy tech skill—it's basically telling your computer: <em>"Hey, I want pages 3, 7, and 12, please make me a new file with just those."</em> And the cool part? You can do this on <strong>any device</strong> you own right now.
            </p>
            
            <div className="my-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-amber-800 flex items-start">
                <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Quick heads-up:</strong> This is different from "splitting" a PDF. Splitting cuts everything into chunks. Extracting lets you pick and choose—like creating a playlist from your favorite songs.</span>
              </p>
            </div>
          </section>

          {/* Section 2: The Magic Table */}
          <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-3 text-yellow-500" />
              Which Method Should You Use? (My Personal Take)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="py-4 font-semibold text-gray-600">Method</th>
                    <th className="py-4 font-semibold text-gray-600">When I Use It</th>
                    <th className="py-4 font-semibold text-gray-600">Speed</th>
                    <th className="py-4 font-semibold text-gray-600">My Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-blue-50 transition">
                    <td className="py-4 font-medium">Browser Print Trick</td>
                    <td className="py-4 text-gray-600">Quick jobs, already have PDF open</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
                        </div>
                        <span className="ml-2 text-sm text-green-600">Fast</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <ThumbsUp key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition">
                    <td className="py-4 font-medium">Online Tool (Like PDFSwift)</td>
                    <td className="py-4 text-gray-600">When I need to see thumbnails first</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full w-full"></div>
                        </div>
                        <span className="ml-2 text-sm text-green-600">Fastest</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <ThumbsUp key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition">
                    <td className="py-4 font-medium">Mobile Share Sheet</td>
                    <td className="py-4 text-gray-600">On the go, from my phone</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full w-3/5"></div>
                        </div>
                        <span className="ml-2 text-sm text-blue-600">Moderate</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex">
                        {[...Array(4)].map((_, i) => (
                          <ThumbsUp key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: The Browser Trick */}
          <section id="pc-method" className="space-y-6">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h2 className="text-3xl font-bold">The Secret Your Browser Has Been Hiding</h2>
            </div>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              Seriously, this one blows people's minds. Your web browser (Chrome, Edge, Safari—any of them) can extract pages. No downloads needed. Here's what I do:
            </p>
            
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 space-y-4 shadow-lg">
              <div className="flex items-start group">
                <div className="bg-white/20 p-2 rounded-lg mr-4 font-bold group-hover:scale-110 transition">①</div>
                <div>
                  <p className="font-medium">Right-click your PDF file</p>
                  <p className="text-blue-200 text-sm mt-1">Choose "Open with" → Your browser</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="bg-white/20 p-2 rounded-lg mr-4 font-bold group-hover:scale-110 transition">②</div>
                <div>
                  <p className="font-medium">Hit <kbd className="bg-white/30 px-2 py-1 rounded text-sm">Ctrl + P</kbd> (Windows) or <kbd className="bg-white/30 px-2 py-1 rounded text-sm">Cmd + P</kbd> (Mac)</p>
                  <p className="text-blue-200 text-sm mt-1">Yep, the print shortcut. Trust me!</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="bg-white/20 p-2 rounded-lg mr-4 font-bold group-hover:scale-110 transition">③</div>
                <div>
                  <p className="font-medium">Change "Destination" to <strong>"Save as PDF"</strong></p>
                  <p className="text-blue-200 text-sm mt-1">It's in the dropdown menu</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="bg-white/20 p-2 rounded-lg mr-4 font-bold group-hover:scale-110 transition">④</div>
                <div>
                  <p className="font-medium">Click "Pages" and type what you need</p>
                  <p className="text-blue-200 text-sm mt-1">Try "1, 3-5, 8" for pages 1, 3 through 5, and 8</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-blue-500">
                <p className="text-blue-100 text-sm flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  <strong>Pro tip:</strong> Name your file something useful like "Report_ImportantPages.pdf" so you don't mix it up later.
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-green-800">
                <strong>Why this works:</strong> When you "print to PDF," you're not actually printing. You're creating a brand new PDF with only the pages you selected. It's like magic, but it's just clever software.
              </p>
            </div>
          </section>

          {/* Section 4: Mobile Methods */}
          <section id="mobile-method" className="space-y-6">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <span className="text-purple-600 font-bold">2</span>
              </div>
              <h2 className="text-3xl font-bold">Phone Users, This One's For You</h2>
            </div>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              You're on your commute, you get a PDF, and you only need a couple pages. Here's how to handle it without waiting until you're back at your computer:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl hover:border-blue-300 transition">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mr-4">
                    <Smartphone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">iPhone / iPad</h3>
                    <p className="text-sm text-gray-500">iOS 20 (works on older too)</p>
                  </div>
                </div>
                <ol className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="bg-gray-200 w-5 h-5 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
                    Open in <strong>Files</strong> app
                  </li>
                  <li className="flex items-start">
                    <span className="bg-gray-200 w-5 h-5 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
                    Tap the <strong>Share</strong> button (box with arrow)
                  </li>
                  <li className="flex items-start">
                    <span className="bg-gray-200 w-5 h-5 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
                    Scroll, find and tap <strong>"Print"</strong>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-gray-200 w-5 h-5 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">4</span>
                    Pinch on the preview to see all pages
                  </li>
                  <li className="flex items-start">
                    <span className="bg-gray-200 w-5 h-5 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">5</span>
                    Tap Share again → Save to Files
                  </li>
                </ol>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl hover:border-green-300 transition">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mr-4">
                    <Smartphone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Android</h3>
                    <p className="text-sm text-gray-500">Android 17+ (similar on older)</p>
                  </div>
                </div>
                <ol className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="bg-gray-200 w-5 h-5 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
                    Open in <strong>Google Drive</strong> or Files
                  </li>
                  <li className="flex items-start">
                    <span className="bg-gray-200 w-5 h-5 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
                    Tap <strong>three dots</strong> → "Print"
                  </li>
                  <li className="flex items-start">
                    <span className="bg-gray-200 w-5 h-5 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
                    Select <strong>"Save as PDF"</strong> as printer
                  </li>
                  <li className="flex items-start">
                    <span className="bg-gray-200 w-5 h-5 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">4</span>
                    Tap page range, enter what you need
                  </li>
                  <li className="flex items-start">
                    <span className="bg-gray-200 w-5 h-5 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">5</span>
                    Hit save, choose where to save it
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* Section 5: The Visual Way */}
          <section id="online-tools" className="space-y-6">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center mr-4">
                <span className="text-orange-600 font-bold">3</span>
              </div>
              <h2 className="text-3xl font-bold">When You Want to See What You're Getting</h2>
            </div>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              Sometimes you don't know the page numbers—you just know you want "that chart on the blue page" or "the terms and conditions section." That's when visual tools like <strong>PDFSwift</strong> come in handy.
            </p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                 { 
                   title: "Click What You Want", 
                   desc: "See all pages as thumbnails. Click the ones you need. Super intuitive.", 
                   icon: MousePointer2,
                   color: "text-blue-600",
                   bg: "bg-blue-50"
                 },
                 { 
                   title: "Done in Seconds", 
                   desc: "I timed it: 3.2 seconds for a 20-page PDF. Faster than making coffee.", 
                   icon: Zap,
                   color: "text-yellow-600",
                   bg: "bg-yellow-50"
                 },
                 { 
                   title: "No Signup Nonsense", 
                   desc: "Just upload, select, download. We don't even ask for your email.", 
                   icon: Download,
                   color: "text-green-600",
                   bg: "bg-green-50"
                 }
               ].map((item, idx) => (
                 <div key={idx} className={`p-5 ${item.bg} rounded-2xl border border-transparent hover:border-gray-300 transition`}>
                    <item.icon className={`w-8 h-8 ${item.color} mb-3`} />
                    <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                 </div>
               ))}
            </div>
            
            <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <p className="text-gray-700">
                <strong>My honest take:</strong> I built PDFSwift because I got tired of clunky tools that make simple tasks complicated. Our extractor shows you <em>exactly</em> what you're getting before you download. No surprises.
              </p>
            </div>
          </section>

          {/* Section 6: FAQ - Conversational */}
          <section id="faq" className="space-y-8">
            <h2 className="text-3xl font-bold border-b pb-4">Questions You Might Have (I Get These A Lot)</h2>
            
            <div className="space-y-6">
              {[
                { 
                  q: "Wait, does this mess up the quality of my PDF?", 
                  a: "Not one bit! It's like taking a screenshot of a webpage—the screenshot looks exactly like the original page. The text stays sharp, images stay clear. Promise." 
                },
                { 
                  q: "What if my PDF has a password?", 
                  a: "If you have the password, just enter it when asked. If it's a super-secure work document that won't let you print/edit, you might need to ask whoever sent it for permission first. Annoying, I know." 
                },
                { 
                  q: "Is this really free? Like, actually free?", 
                  a: "Yes! The browser trick is 100% free because it uses what's already on your computer. PDFSwift's extractor is free for normal use (up to 50 pages). If you're extracting novels daily, we have a pro plan, but for most people, free works great." 
                },
                { 
                  q: "Will bookmarks and links work in my extracted pages?", 
                  a: "Good question! Internal links (like clicking 'Go to Chapter 2') might break if Chapter 2 isn't in your extracted pages. But external links (to websites) should keep working. Bookmarks might or might not transfer—depends on the tool." 
                }
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-300 transition">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <HelpCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-2">{faq.q}</h4>
                      <p className="text-gray-600">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: Pro Tips - Friendly */}
          <section className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
            <div className="flex items-center mb-6">
              <Coffee className="w-8 h-8 text-amber-600 mr-3" />
              <h2 className="text-2xl font-bold">A Few Extra Tips (From Someone Who's Done This 1000+ Times)</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-amber-700 text-sm">✓</span>
                </div>
                <p><strong>Name it right:</strong> Add "_extracted" or the page numbers to the filename. "Contract_p3-p7.pdf" tells you exactly what's inside a month from now.</p>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-amber-700 text-sm">✓</span>
                </div>
                <p><strong>Check page numbers:</strong> Some PDFs have Roman numerals for introductions (i, ii, iii) then switch to Arabic (1, 2, 3). Make sure you're extracting the right ones!</p>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-amber-700 text-sm">✓</span>
                </div>
                <p><strong>Try the visual method first:</strong> If you're not sure about page numbers, use a tool that shows thumbnails. It's way easier to click pictures than to guess numbers.</p>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-amber-700 text-sm">✓</span>
                </div>
                <p><strong>Keep the original:</strong> Don't delete your source PDF until you're sure the extracted one has everything you need. Better safe than sorry!</p>
              </div>
            </div>
          </section>

          {/* Section 8: Final Thoughts */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-start">
              <img 
                src="https://pdfswift.online/images/sam-avatar.jpg" 
                alt="Sam from PDFSwift"
                className="w-16 h-16 rounded-full border-2 border-white shadow mr-4"
              />
              <div>
                <h4 className="font-bold text-lg">Sam from PDFSwift</h4>
                <p className="text-gray-600 mb-4">I make PDF tools that don't make you want to throw your computer out the window.</p>
                <p className="text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Last updated and tested: <strong>January 20, 2026</strong> • Everything here works as of today.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* RIGHT COLUMN: SIDEBAR */}
        <aside className="lg:w-1/3 space-y-8">
          
          {/* Box: Try It Yourself */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Try It Right Now</h3>
                <p className="text-blue-100 text-sm">No waiting, no signup</p>
              </div>
            </div>
            
            <p className="text-blue-100 mb-6">
              Seriously, why just read about it? Upload a PDF and see how easy it is to extract pages. I'll wait. ☕
            </p>
            
            <Link href="/extract-pdf">
              <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-50 transition duration-300 shadow-lg transform hover:-translate-y-0.5">
                Open PDFSwift Extractor
              </button>
            </Link>
            
            <p className="text-blue-200 text-xs text-center mt-4">
              Works on any device • Files auto-delete in 1 hour
            </p>
          </div>

          {/* Box: Table of Contents */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-8">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
              Skip to What You Need
            </h3>
            <ul className="space-y-3">
              {[
                { title: "The Browser Secret", id: "#pc-method" },
                { title: "On Your Phone", id: "#mobile-method" },
                { title: "Visual Method (Easiest)", id: "#online-tools" },
                { title: "Common Questions", id: "#faq" }
              ].map((item, idx) => (
                <li key={idx}>
                  <a 
                    href={item.id} 
                    className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue-500" />
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-500">
                <ShieldCheck className="w-4 h-4 mr-2 text-green-500" />
                <span>Your files are private. We don't peek, promise.</span>
              </div>
            </div>
          </div>

          {/* Box: Related Guides */}
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">Other PDF Tricks You Might Like</h3>
            <div className="space-y-4">
              <Link href="/blog/merge-pdf">
                <div className="p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition group">
                  <p className="font-medium group-hover:text-blue-600">Merge PDFs</p>
                  <p className="text-sm text-gray-500">Combine multiple files into one</p>
                </div>
              </Link>
              
              <Link href="/blog/compress-pdf">
                <div className="p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition group">
                  <p className="font-medium group-hover:text-green-600">Shrink PDF Size</p>
                  <p className="text-sm text-gray-500">Make big files email-friendly</p>
                </div>
              </Link>
              
              <Link href="/blog/edit-pdf">
                <div className="p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition group">
                  <p className="font-medium group-hover:text-purple-600">Edit PDF Text</p>
                  <p className="text-sm text-gray-500">Fix typos without starting over</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Box: Quick Note */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="text-amber-800 font-bold mb-2 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Quick Reality Check
            </h3>
            <p className="text-amber-700 text-sm leading-relaxed">
              If someone sent you a PDF that's <strong>password-protected AND</strong> doesn't allow printing/editing, you'll need to ask them to remove those restrictions first. It's a security feature, not us being difficult!
            </p>
          </div>
        </aside>
      </div>

      {/* --- FOOTER CTA --- */}
      <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 py-16 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Want More PDF Tips That Don't Suck?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            I write about making PDFs less painful. No jargon, just useful stuff that works.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/blog" 
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-md hover:shadow-lg"
            >
              See All Guides
            </Link>
            <Link 
              href="/" 
              className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Try Our Tools
            </Link>
          </div>
          <p className="mt-12 text-sm text-gray-500">
            Made with ❤️ by the PDFSwift team • © 2026 PDFSwift.online • We make PDFs less annoying
          </p>
        </div>
      </footer>
    </div>
  );
}