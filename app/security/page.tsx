"use client";

import {
  Shield,
  Lock,
  Clock,
  Key,
  Globe,
  AlertTriangle,
  FileText,
  Zap
} from "lucide-react";
import { useEffect } from "react";

export default function SecurityPage() {
  // Set SEO metadata dynamically
  useEffect(() => {
    // Update meta tags
    document.title = "Security & Privacy | PDF Tools - 100% Client-Side Processing";
    
    const metaTags = [
      { name: "description", content: "All PDF processing happens directly in your browser. Your files are never uploaded, stored, or accessed by our servers. 100% client-side privacy." },
      { name: "keywords", content: "PDF security, privacy, client-side processing, browser-based PDF tools, no file upload, data protection, offline PDF tools" },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "PDF Tools" },
      { property: "og:title", content: "Security & Privacy | PDF Tools - 100% Client-Side Processing" },
      { property: "og:description", content: "Your files stay on your device. All PDF processing happens locally in your browser with no server uploads." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: typeof window !== "undefined" ? window.location.href : "" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Security & Privacy | PDF Tools" },
      { name: "twitter:description", content: "100% client-side PDF processing. Your files never leave your device." },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#000000" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ];

    metaTags.forEach(tag => {
      if (tag.name) {
        let meta = document.querySelector(`meta[name="${tag.name}"]`);
        if (!meta) {
          meta = document.createElement("meta");
          meta.setAttribute("name", tag.name);
          document.head.appendChild(meta);
        }
        meta.setAttribute("content", tag.content);
      } else if (tag.property) {
        let meta = document.querySelector(`meta[property="${tag.property}"]`);
        if (!meta) {
          meta = document.createElement("meta");
          meta.setAttribute("property", tag.property);
          document.head.appendChild(meta);
        }
        meta.setAttribute("content", tag.content);
      }
    });

    // Add structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Security & Privacy - PDF Tools",
      "description": "All PDF processing happens directly in your browser. Your files are never uploaded, stored, or accessed by our servers.",
      "url": typeof window !== "undefined" ? window.location.href : "",
      "mainEntity": {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do you upload my files to your server?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Files are processed entirely in your browser and never uploaded to any server."
            }
          },
          {
            "@type": "Question",
            "name": "Do you store any data?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. We do not store files, logs, or document content. Everything is processed locally."
            }
          },
          {
            "@type": "Question",
            "name": "Can you see my PDFs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Since files never leave your device, we have zero access to your documents."
            }
          }
        ]
      },
      "publisher": {
        "@type": "Organization",
        "name": "PDF swift ",
        "description": "Privacy-focused PDF processing tools"
      }
    });
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      if (script.parentNode === document.head) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <main className="min-h-screen bg-black text-gray-300">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-6 border-b border-gray-800">
          <div className="container mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-3 bg-blue-900/30 text-blue-300 px-4 py-2 rounded-full mb-6">
              <Shield className="w-5 h-5" />
              <span className="font-medium">Security & Privacy</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your Files Stay on Your Device
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              All PDF processing happens directly in your browser.
              Your files are never uploaded, stored, or accessed by our servers.
            </p>
          </div>
        </section>

        {/* Security Features */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              How Your Data Is Protected
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-8 h-8 text-green-400" />,
                  title: "Browser-Based Processing",
                  desc: "All file processing happens locally in your browser"
                },
                {
                  icon: <Lock className="w-8 h-8 text-blue-400" />,
                  title: "No Uploads",
                  desc: "Your files never leave your device"
                },
                {
                  icon: <Clock className="w-8 h-8 text-purple-400" />,
                  title: "No Storage",
                  desc: "We do not store files on any server"
                },
                {
                  icon: <Key className="w-8 h-8 text-yellow-400" />,
                  title: "Private by Design",
                  desc: "No accounts, no tracking of your documents"
                },
                {
                  icon: <Globe className="w-8 h-8 text-red-400" />,
                  title: "Works Offline",
                  desc: "Tools work even without an internet connection"
                },
                {
                  icon: <FileText className="w-8 h-8 text-indigo-400" />,
                  title: "Zero Access",
                  desc: "We cannot see, read, or access your files"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-900 rounded-xl p-8 border border-gray-800"
                  itemScope
                  itemType="https://schema.org/Intangible"
                  itemProp="feature"
                >
                  <div className="mb-4" itemProp="image">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3" itemProp="name">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400" itemProp="description">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-6 bg-gray-900/50">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              How It Works
            </h2>

            <div className="space-y-8" itemScope itemType="https://schema.org/HowTo">
              {[
                {
                  title: "Local File Access",
                  desc: "You select a file that stays on your device"
                },
                {
                  title: "Instant Processing",
                  desc: "Your browser processes the file using secure client-side technology"
                },
                {
                  title: "Download Result",
                  desc: "The processed file is downloaded directly to your device"
                }
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-6" itemProp="step" itemScope itemType="https://schema.org/HowToStep">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-blue-400">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2" itemProp="name">
                      {step.title}
                    </h3>
                    <p className="text-gray-400" itemProp="text">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Security Questions
            </h2>

            <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
              {[
                {
                  q: "Do you upload my files to your server?",
                  a: "No. Files are processed entirely in your browser and never uploaded."
                },
                {
                  q: "Do you store any data?",
                  a: "No. We do not store files, logs, or document content."
                },
                {
                  q: "Can you see my PDFs?",
                  a: "No. Since files never leave your device, we have zero access."
                }
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-900 rounded-xl p-6 border border-gray-800"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3" itemProp="name">
                        {faq.q}
                      </h3>
                      <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                        <p className="text-gray-400" itemProp="text">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}