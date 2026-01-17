"use client";

import { Shield, Lock, Eye, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function PrivacyPolicy() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setIsMounted(true);
    setCurrentDate(
      new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    );
  }, []);

  // Static date (SEO + SSR safe)
  const staticDate = "January 14, 2026";
  const staticISODate = "2026-01-14T00:00:00Z";

  // ✅ FAQ Structured Data (NOW ACTUALLY USED)
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does PDFSwift store my PDF files?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No, PDFSwift does not store or upload your PDF files. All processing happens directly in your browser, and files never leave your device.",
        },
      },
      {
        "@type": "Question",
        name: "What information does PDFSwift collect?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We only collect anonymous usage statistics and browser information to improve performance. We do not collect your PDF files or document content.",
        },
      },
      {
        "@type": "Question",
        name: "Is PDFSwift GDPR compliant?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes, PDFSwift is designed with GDPR principles in mind. Our browser-based processing model minimizes data collection and processing.",
        },
      },
    ],
  };

  return (
    <>
      {/* ✅ FAQ Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />

      <div className="min-h-screen bg-black text-gray-300">
        {/* Hero */}
        <header className="pt-12 pb-16 px-6 border-b border-gray-800">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-3 bg-blue-900/30 text-blue-300 px-4 py-2 rounded-full mb-6">
              <Shield className="w-5 h-5" aria-hidden="true" />
              <span className="font-medium">Privacy Policy</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your Privacy <span className="text-blue-400">Comes First</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              PDFSwift is designed with privacy in mind. All file processing
              happens directly in your browser — your files never leave your
              device.
            </p>
          </div>
        </header>

        {/* Content */}
        <main className="py-16 px-6">
          <div className="container mx-auto max-w-4xl space-y-14">
            {/* Dates */}
            <section className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <p className="text-gray-400">
                <strong className="text-white">Effective Date:</strong>{" "}
                <time dateTime={staticISODate}>
                  {isMounted ? currentDate : staticDate}
                </time>
              </p>
              <p className="text-gray-400 mt-2">
                <strong className="text-white">Last Updated:</strong>{" "}
                <time dateTime={staticISODate}>
                  {isMounted ? currentDate : staticDate}
                </time>
              </p>
            </section>

            {/* Data Collection */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">
                  Data We Collect
                </h2>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6">
                <p className="text-gray-400">
                  PDFSwift does <strong className="text-white">not</strong>{" "}
                  collect or store your files or document content.
                </p>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold text-white">
                  Data Security
                </h2>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6">
                <p className="text-gray-400">
                  All processing occurs locally in your browser. Files are never
                  uploaded to our servers.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="bg-gray-900/30 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Does PDFSwift store my PDF files?
                  </h3>
                  <p className="text-gray-400">
                    No. All processing happens locally in your browser.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Is PDFSwift GDPR compliant?
                  </h3>
                  <p className="text-gray-400">
                    Yes. PDFSwift follows privacy-first principles.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
