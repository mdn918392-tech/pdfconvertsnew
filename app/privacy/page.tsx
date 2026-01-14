"use client";

import { Shield, Lock, Eye, Users } from "lucide-react";
import Head from "next/head";
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

  // Static date for server-side rendering and structured data
  const staticDate = "January 14, 2026";
  const staticISODate = "2026-01-14T00:00:00.000Z";

  

  // FAQ structured data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does PDFSwift store my PDF files?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, PDFSwift does not store or upload your PDF files. All processing happens directly in your browser, and files never leave your device."
        }
      },
      {
        "@type": "Question",
        "name": "What information does PDFSwift collect?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We only collect anonymous usage statistics and browser information to improve performance. We do not collect your PDF files or document content."
        }
      },
      {
        "@type": "Question",
        "name": "Is PDFSwift GDPR compliant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, PDFSwift is designed with GDPR principles in mind. Our browser-based processing model minimizes data collection and processing."
        }
      }
    ]
  };

  

  return (
    <>
     

     

      <div className="min-h-screen bg-black text-gray-300">
        {/* Hero Section with Semantic HTML */}
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
              PDFSwift is designed with privacy in mind. All file processing happens
              directly in your browser — your files never leave your device.
            </p>
            
            {/* Additional SEO-rich content */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/30 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">No Server Uploads</h3>
                <p className="text-sm text-gray-400">Files processed locally in your browser</p>
              </div>
              <div className="bg-gray-900/30 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">GDPR Compliant</h3>
                <p className="text-sm text-gray-400">Designed with privacy regulations in mind</p>
              </div>
              <div className="bg-gray-900/30 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Zero Data Storage</h3>
                <p className="text-sm text-gray-400">We don&apos;t store your documents</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-16 px-6">
          <div className="container mx-auto max-w-4xl space-y-14">
            {/* Effective Date */}
            <section className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="sr-only">Policy Effective Date</h2>
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
            <section id="data-collection">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-blue-400" aria-hidden="true" />
                <h2 className="text-2xl font-bold text-white">
                  Data We Collect
                </h2>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 space-y-4">
                <p className="text-gray-400">
                  PDFSwift does <strong className="text-white">not</strong> collect
                  or store your PDF files or document content.
                </p>

                <ul className="space-y-2 text-gray-400">
                  <li>✓ No file uploads to our servers</li>
                  <li>✓ No document content access</li>
                  <li>✓ No file storage or backups</li>
                  <li>✓ No personal information collection</li>
                </ul>
              </div>
            </section>

            {/* Automatically Collected */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-purple-400" aria-hidden="true" />
                <h2 className="text-2xl font-bold text-white">
                  Automatically Collected Information
                </h2>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6">
                <p className="text-gray-400 mb-3">
                  To improve website performance and reliability, we may collect:
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Browser type and device information</li>
                  <li>• Anonymous usage statistics (pages visited)</li>
                  <li>• Error and performance metrics</li>
                  <li>• Network requests for troubleshooting</li>
                </ul>
              </div>
            </section>

            {/* How We Use Data */}
            <section id="data-usage">
              <h2 className="text-2xl font-bold text-white mb-4">
                How We Use Information
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Improve website performance",
                  "Fix bugs and errors",
                  "Understand feature usage",
                  "Maintain security and stability",
                  "Optimize user experience",
                  "Comply with legal obligations"
                ].map((item, i) => (
                  <div key={i} className="bg-gray-900/50 rounded-lg p-5">
                    <p className="text-gray-400">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Data Security */}
            <section id="data-protection">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-green-400" aria-hidden="true" />
                <h2 className="text-2xl font-bold text-white">Data Security</h2>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 space-y-3">
                <p className="text-gray-400">
                  PDFSwift uses a <strong className="text-white">browser-based
                  processing model</strong>. This means:
                </p>

                <ul className="space-y-2 text-gray-400">
                  <li>✓ Files stay on your device</li>
                  <li>✓ No server-side file handling</li>
                  <li>✓ No human or automated access to documents</li>
                  <li>✓ SSL/TLS encryption for all web traffic</li>
                </ul>
              </div>
            </section>

            {/* Cookies */}
            <section id="cookies">
              <h2 className="text-2xl font-bold text-white mb-4">Cookies</h2>
              <div className="bg-gray-900/50 rounded-lg p-6">
                <p className="text-gray-400 mb-3">
                  We use minimal cookies to ensure proper website functionality:
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Essential cookies (required for operation)</li>
                  <li>• Performance cookies (anonymous analytics)</li>
                  <li>• Preference cookies (user settings)</li>
                </ul>
                <p className="text-gray-400 mt-4">
                  You can manage cookies through your browser settings.
                </p>
              </div>
            </section>

            {/* Rights */}
            <section id="rights">
              <h2 className="text-2xl font-bold text-white mb-4">
                Your Privacy Rights
              </h2>
              <div className="bg-gray-900/50 rounded-lg p-6">
                <ul className="space-y-2 text-gray-400">
                  <li>• Right to information and transparency</li>
                  <li>• Right to object to analytics tracking</li>
                  <li>• Right to request clarification</li>
                  <li>• Right to data portability (where applicable)</li>
                  <li>• Right to lodge a complaint with authorities</li>
                </ul>
              </div>
            </section>

            {/* Contact Information */}
            <section id="contact" className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">
                Contact Information
              </h2>
              <p className="text-gray-400 mb-2">
                For privacy-related inquiries, please contact:
              </p>
              <p className="text-gray-400">
                Email: <a href="mailto:privacy@pdfswift.app" className="text-blue-400 hover:underline">privacy@pdfswift.app</a>
              </p>
            </section>

            {/* FAQ Section for SEO */}
            <section id="faq" className="bg-gray-900/30 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: "Does PDFSwift store my PDF files?",
                    a: "No, PDFSwift does not store or upload your PDF files. All processing happens directly in your browser, and files never leave your device."
                  },
                  {
                    q: "What information does PDFSwift collect?",
                    a: "We only collect anonymous usage statistics and browser information to improve performance. We do not collect your PDF files or document content."
                  },
                  {
                    q: "Is PDFSwift GDPR compliant?",
                    a: "Yes, PDFSwift is designed with GDPR principles in mind. Our browser-based processing model minimizes data collection and processing."
                  },
                  {
                    q: "How does PDFSwift ensure data security?",
                    a: "All file processing occurs in your browser. Files are never uploaded to our servers, ensuring maximum privacy and security."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-b border-gray-800 pb-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                    <p className="text-gray-400">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>

      
      </div>
    </>
  );
}