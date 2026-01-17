"use client";

import {
  Shield,
  Lock,
  Clock,
  Key,
  Globe,
  FileText,
  Zap,
  AlertTriangle,
} from "lucide-react";

export default function SecurityPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you upload my files to your server?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. All files are processed entirely in your browser and never uploaded.",
        },
      },
      {
        "@type": "Question",
        name: "Do you store any data?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. We do not store files, logs, or document content.",
        },
      },
      {
        "@type": "Question",
        name: "Can you see my PDFs?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. Files never leave your device, so we have zero access.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://pdfswift.online",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Security & Privacy",
        item: "https://pdfswift.online/security",
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="min-h-screen bg-white text-gray-800">
        {/* Header */}
        <header className="pt-20 pb-16 px-6 border-b border-gray-200 text-center">
          <Shield className="mx-auto w-10 h-10 text-blue-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900">
            Security & Privacy
          </h1>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            All PDF processing happens directly in your browser.
            Your files never leave your device.
          </p>
        </header>

        {/* Features */}
        <section className="py-16 px-6 max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            ["Browser-Based", "Processed locally", Zap],
            ["No Uploads", "Files stay on device", Lock],
            ["No Storage", "Nothing saved", Clock],
            ["Private", "No tracking", Key],
            ["Offline Ready", "Works offline", Globe],
            ["Zero Access", "We can’t see files", FileText],
          ].map(([title, desc, Icon]: any, i) => (
            <div
              key={i}
              className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm"
            >
              <Icon className="w-6 h-6 text-blue-600 mb-3" />
              <h3 className="text-gray-900 font-semibold">{title}</h3>
              <p className="text-gray-600 text-sm mt-1">{desc}</p>
            </div>
          ))}
        </section>

        {/* FAQ */}
        <section className="py-16 px-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Security Questions
          </h2>

          {faqSchema.mainEntity.map((faq, i) => (
            <div
              key={i}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-4"
            >
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1" />
                <div>
                  <h3 className="text-gray-900 font-semibold">{faq.name}</h3>
                  <p className="text-gray-600 mt-2">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </section>
    </>
  );
}
