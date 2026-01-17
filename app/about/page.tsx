import React from 'react';
import { FileText, Zap, Shield, Globe, Heart } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

export default function AboutPage() {
  const pageTitle = "About PDFSwift | Fast, Secure & Free PDF Tools";
  const pageDescription = "Learn about PDFSwift's mission to provide fast, secure, and completely free PDF tools. No subscriptions, no watermarks, no file size limits.";
  const pageUrl = "https://pdfswift.online/about";
  const siteName = "PDFSwift";
  const twitterHandle = "@PDFSwift";

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="PDF tools, PDF converter, PDF editor, free PDF tools, secure PDF processing, document management" />
        <meta name="author" content="PDFSwift" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://pdfswift.online/images/og-image-about.jpg" />
        <meta property="og:site_name" content={siteName} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={pageUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content="https://pdfswift.online/images/og-image-about.jpg" />
        <meta property="twitter:creator" content={twitterHandle} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />
        
        {/* Structured Data / JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "name": "About PDFSwift",
              "description": pageDescription,
              "url": pageUrl,
              "publisher": {
                "@type": "Organization",
                "name": "PDFSwift",
                "description": "Free PDF tools for everyone",
                "url": "https://pdfswift.online",
                "logo": "https://pdfswift.online/favicon.ico"
              },
              "mainEntity": {
                "@type": "Organization",
                "name": "PDFSwift",
                "description": pageDescription,
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "Global"
                },
                "founder": {
                  "@type": "Person",
                  "name": "PDFSwift Team"
                },
                "foundingDate": "2023",
                "keywords": "PDF tools, document conversion, free software"
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About <span className="text-blue-600">PDFSwift</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fast, smart, and secure PDF tools designed to simplify your document workflow
            </p>
          </header>

          {/* Mission Section */}
          <section className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <div className="flex items-center mb-6">
              <Zap className="w-8 h-8 text-yellow-500 mr-3" aria-hidden="true" />
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              At PDFSwift, we believe document management should be effortless, accessible, and secure. 
              We're on a mission to transform how individuals and businesses handle PDFs by providing 
              intuitive tools that save time and boost productivity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="text-blue-600 text-2xl font-bold mb-2">100% Free</div>
                <p className="text-gray-700">No subscriptions, no hidden fees, no watermarks</p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <div className="text-green-600 text-2xl font-bold mb-2">Secure</div>
                <p className="text-gray-700">Your files are processed locally and never stored</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <div className="text-purple-600 text-2xl font-bold mb-2">No Limits</div>
                <p className="text-gray-700">Unlimited conversions with no file size restrictions</p>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="mb-16" aria-labelledby="features-heading">
            <h2 id="features-heading" className="text-3xl font-bold text-center text-gray-900 mb-10">
              Why Choose PDFSwift?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <article className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4" aria-hidden="true">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
                <p className="text-gray-600">
                  Process PDFs in seconds with our optimized tools. No waiting, no delays.
                </p>
              </article>

              <article className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4" aria-hidden="true">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy First</h3>
                <p className="text-gray-600">
                  Your documents never leave your browser. We process everything locally.
                </p>
              </article>

              <article className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4" aria-hidden="true">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Accessible Anywhere</h3>
                <p className="text-gray-600">
                  Use PDFSwift on any device with a modern browser. No downloads required.
                </p>
              </article>
            </div>
          </section>

          {/* Team/Values Section */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Simplicity & Efficiency</h3>
                <p className="text-blue-100">
                  We strip away complexity to deliver tools that just work. No learning curve, 
                  no confusing options—just straightforward solutions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Innovation & Reliability</h3>
                <p className="text-blue-100">
                  We continuously improve our tools while maintaining 99.9% uptime, so you can 
                  rely on us whenever you need to handle PDFs.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center" aria-labelledby="cta-heading">
            <h2 id="cta-heading" className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Simplify Your PDF Workflow?
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust PDFSwift for their document needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                aria-label="Explore all PDF tools"
              >
                Explore All Tools
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-blue-600 bg-white border border-blue-600 hover:bg-blue-50 transition-colors"
                aria-label="Start converting PDF files"
              >
                Start Converting
              </Link>
            </div>
          </section>

          {/* Breadcrumb Navigation (SEO-friendly) */}
          <nav aria-label="Breadcrumb" className="mt-12 text-sm text-gray-600">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium" aria-current="page">
                  About
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </>
  );
}