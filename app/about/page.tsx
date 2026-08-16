"use client";

import React from "react";
import { Zap, Shield, Globe } from "lucide-react";
import Link from "next/link";
import Head from "next/head";

export default function AboutPage() {
  const pageTitle = "About PDFSwift | Fast, Secure & Free PDF Tools";

  const pageDescription =
    "Learn about PDFSwift, also known as PDF Swift, a fast, secure and free online PDF tools platform that works on desktop, laptop, mobile and tablet devices.";

  const pageUrl = "https://pdfswift.online/about";
  const siteName = "PDFSwift";
  const twitterHandle = "@PDFSwift";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About PDFSwift",
    alternateName: "About PDF Swift",
    description: pageDescription,
    url: pageUrl,

    publisher: {
      "@type": "Organization",
      name: "PDFSwift",
      alternateName: "PDF Swift",
      description:
        "Fast, free and secure online PDF tools for everyday document tasks.",
      url: "https://pdfswift.online",
      logo: {
        "@type": "ImageObject",
        url: "https://pdfswift.online/favicon.ico",
      },
    },

    mainEntity: {
      "@type": "Organization",
      name: "PDFSwift",
      alternateName: "PDF Swift",
      description:
        "PDFSwift is an online platform providing fast, free and secure PDF tools for everyday document tasks.",
      url: "https://pdfswift.online",
      sameAs: ["https://pdfswift.online"],
    },
  };

  return (
    <>
      <Head>
        {/* ================================
            PRIMARY SEO META TAGS
        ================================= */}

        <title>{pageTitle}</title>

        <meta name="title" content={pageTitle} />

        <meta
          name="description"
          content={pageDescription}
        />

        <meta
          name="keywords"
          content="PDFSwift, PDF Swift, PDF tools, free PDF tools, online PDF tools, PDF converter, PDF editor, secure PDF tools, PDF processing, mobile PDF tools, desktop PDF tools"
        />

        <meta name="author" content="PDFSwift" />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        {/* ================================
            OPEN GRAPH
        ================================= */}

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:url"
          content={pageUrl}
        />

        <meta
          property="og:title"
          content={pageTitle}
        />

        <meta
          property="og:description"
          content={pageDescription}
        />

        <meta
          property="og:image"
          content="https://pdfswift.online/images/og-image-about.jpg"
        />

        <meta
          property="og:site_name"
          content={siteName}
        />

        <meta
          property="og:locale"
          content="en_US"
        />

        {/* ================================
            TWITTER
        ================================= */}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:url"
          content={pageUrl}
        />

        <meta
          name="twitter:title"
          content={pageTitle}
        />

        <meta
          name="twitter:description"
          content={pageDescription}
        />

        <meta
          name="twitter:image"
          content="https://pdfswift.online/images/og-image-about.jpg"
        />

        <meta
          name="twitter:creator"
          content={twitterHandle}
        />

        {/* ================================
            CANONICAL
        ================================= */}

        <link
          rel="canonical"
          href={pageUrl}
        />

        {/* ================================
            STRUCTURED DATA
        ================================= */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>

      {/* ================================
          PAGE
      ================================= */}

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">

        <div className="max-w-7xl mx-auto">

          {/* ================================
              PAGE HEADER
          ================================= */}

          <header className="text-center mb-16">

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About{" "}
              <span className="text-blue-600">
                PDFSwift
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              PDF Swift provides fast, smart, and secure PDF tools
              designed to simplify your everyday document workflow.
            </p>

          </header>

          {/* ================================
              MISSION
          ================================= */}

          <section
            className="bg-white rounded-2xl shadow-xl p-8 mb-12"
            aria-labelledby="mission-heading"
          >

            <div className="flex items-center mb-6">

              <Zap
                className="w-8 h-8 text-yellow-500 mr-3"
                aria-hidden="true"
              />

              <h2
                id="mission-heading"
                className="text-3xl font-bold text-gray-900"
              >
                Our Mission
              </h2>

            </div>

            <p className="text-lg text-gray-700 mb-6">
              At PDFSwift, also known as PDF Swift, we believe
              document management should be effortless, accessible,
              and secure. Our mission is to make everyday PDF tasks
              simple by providing fast and easy-to-use online tools
              that help individuals and businesses save time and
              improve productivity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

              {/* FREE */}

              <div className="bg-blue-50 p-6 rounded-xl">

                <div className="text-blue-600 text-2xl font-bold mb-2">
                  Free
                </div>

                <p className="text-gray-700">
                  Access useful PDF tools without subscriptions,
                  unnecessary fees, or watermarks.
                </p>

              </div>

              {/* SECURE */}

              <div className="bg-green-50 p-6 rounded-xl">

                <div className="text-green-600 text-2xl font-bold mb-2">
                  Secure
                </div>

                <p className="text-gray-700">
                  We focus on privacy and secure document processing
                  so you can work with your files confidently.
                </p>

              </div>

              {/* EASY */}

              <div className="bg-purple-50 p-6 rounded-xl">

                <div className="text-purple-600 text-2xl font-bold mb-2">
                  Easy to Use
                </div>

                <p className="text-gray-700">
                  Simple interfaces make common PDF tasks quick and
                  easy on desktop and mobile devices.
                </p>

              </div>

            </div>

          </section>

          {/* ================================
              WHY CHOOSE PDFSWIFT
          ================================= */}

          <section
            className="mb-16"
            aria-labelledby="features-heading"
          >

            <h2
              id="features-heading"
              className="text-3xl font-bold text-center text-gray-900 mb-10"
            >
              Why Choose PDFSwift?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* SPEED */}

              <article className="bg-white p-6 rounded-xl shadow-lg">

                <div
                  className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Lightning Fast
                </h3>

                <p className="text-gray-600">
                  Process common PDF tasks quickly with optimized
                  online tools designed for a smooth workflow.
                </p>

              </article>

              {/* PRIVACY */}

              <article className="bg-white p-6 rounded-xl shadow-lg">

                <div
                  className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <Shield className="w-6 h-6 text-green-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Privacy First
                </h3>

                <p className="text-gray-600">
                  PDFSwift is designed with privacy in mind. When a
                  tool processes files locally in your browser, your
                  documents can remain on your device.
                </p>

              </article>

              {/* ACCESSIBILITY */}

              <article className="bg-white p-6 rounded-xl shadow-lg">

                <div
                  className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Accessible Anywhere
                </h3>

                <p className="text-gray-600">
                  Use PDF Swift from modern desktop and mobile
                  browsers without installing complicated software.
                </p>

              </article>

            </div>

          </section>

          {/* ================================
              DEVICE COMPATIBILITY
          ================================= */}

          <section
            className="bg-white rounded-2xl shadow-lg p-8 mb-12"
            aria-labelledby="device-heading"
          >

            <h2
              id="device-heading"
              className="text-3xl font-bold text-gray-900 mb-5"
            >
              PDFSwift Works on Every Device
            </h2>

            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">

              <p>
                PDFSwift, also known as PDF Swift, is designed to
                work across modern devices. You can use our online
                PDF tools on your{" "}
                <strong>
                  desktop, laptop, mobile phone, tablet, iPhone,
                  or iPad
                </strong>{" "}
                with a modern web browser.
              </p>

              <p>
                Whether you are using Windows, macOS, Android,
                iPhone, iPad, or another supported platform,
                PDFSwift makes it easy to complete common PDF tasks
                directly from your browser without installing
                additional software.
              </p>

              <p>
                Our responsive interface automatically adapts to
                different screen sizes, making PDF Swift convenient
                for both desktop and mobile users.
              </p>

            </div>

            {/* DEVICE CARDS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

              {/* DESKTOP */}

              <div className="bg-blue-50 rounded-xl p-5">

                <h3 className="font-bold text-gray-900 mb-2">
                  Desktop
                </h3>

                <p className="text-gray-600 text-sm">
                  Use PDFSwift on Windows, macOS, and other desktop
                  systems.
                </p>

              </div>

              {/* MOBILE */}

              <div className="bg-green-50 rounded-xl p-5">

                <h3 className="font-bold text-gray-900 mb-2">
                  Mobile
                </h3>

                <p className="text-gray-600 text-sm">
                  Access PDF tools from Android phones and other
                  mobile devices.
                </p>

              </div>

              {/* IPHONE */}

              <div className="bg-purple-50 rounded-xl p-5">

                <h3 className="font-bold text-gray-900 mb-2">
                  iPhone & iPad
                </h3>

                <p className="text-gray-600 text-sm">
                  Use PDF Swift from modern iOS and iPadOS browsers.
                </p>

              </div>

              {/* TABLET */}

              <div className="bg-yellow-50 rounded-xl p-5">

                <h3 className="font-bold text-gray-900 mb-2">
                  Tablet
                </h3>

                <p className="text-gray-600 text-sm">
                  Enjoy a responsive PDF workflow on tablets and
                  larger screens.
                </p>

              </div>

            </div>

          </section>

          {/* ================================
              WHAT IS PDF SWIFT
          ================================= */}

          <section
            className="bg-white rounded-2xl shadow-lg p-8 mb-12"
            aria-labelledby="pdfswift-heading"
          >

            <h2
              id="pdfswift-heading"
              className="text-3xl font-bold text-gray-900 mb-5"
            >
              What is PDF Swift?
            </h2>

            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">

              <p>
                <strong>PDF Swift</strong> is an online PDF tools
                platform created to make everyday document tasks
                easier. PDFSwift provides simple browser-based tools
                for working with PDF documents without requiring
                complicated desktop software.
              </p>

              <p>
                With PDFSwift, users can perform common PDF tasks
                such as merging PDF files, splitting PDFs, removing
                pages, adding pages, converting images, compressing
                documents, and managing PDF files online.
              </p>

              <p>
                PDF Swift is designed for students, professionals,
                businesses, and everyday users who need quick and
                convenient PDF solutions. The platform works on
                desktop computers, laptops, mobile phones, tablets,
                iPhones, and iPads through a modern web browser.
              </p>

              <p>
                Whether you are working from a computer at home, a
                laptop at work, or a phone while traveling, PDFSwift
                gives you access to useful PDF tools from virtually
                any modern device.
              </p>

            </div>

          </section>

          {/* ================================
              OUR VALUES
          ================================= */}

          <section
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-12"
            aria-labelledby="values-heading"
          >

            <h2
              id="values-heading"
              className="text-3xl font-bold mb-6"
            >
              Our Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* SIMPLICITY */}

              <div>

                <h3 className="text-xl font-bold mb-4">
                  Simplicity & Efficiency
                </h3>

                <p className="text-blue-100">
                  We remove unnecessary complexity and focus on
                  straightforward PDF tools that are easy to
                  understand and use.
                </p>

              </div>

              {/* INNOVATION */}

              <div>

                <h3 className="text-xl font-bold mb-4">
                  Innovation & Reliability
                </h3>

                <p className="text-blue-100">
                  We continuously improve PDFSwift tools to make
                  document processing faster, easier, and more
                  reliable for everyday users.
                </p>

              </div>

            </div>

          </section>

          {/* ================================
              CTA
          ================================= */}

          <section
            className="text-center"
            aria-labelledby="cta-heading"
          >

            <h2
              id="cta-heading"
              className="text-3xl font-bold text-gray-900 mb-6"
            >
              Ready to Simplify Your PDF Workflow?
            </h2>

            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Try PDFSwift and use simple online PDF tools for your
              everyday document needs on desktop, mobile, or tablet.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                aria-label="Explore all PDFSwift tools"
              >
                Explore All Tools
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-blue-600 bg-white border border-blue-600 hover:bg-blue-50 transition-colors"
                aria-label="Start using PDFSwift PDF tools"
              >
                Start Converting
              </Link>

            </div>

          </section>

          {/* ================================
              BREADCRUMB
          ================================= */}

          <nav
            aria-label="Breadcrumb"
            className="mt-12 text-sm text-gray-600"
          >

            <ol className="flex items-center space-x-2">

              <li>
                <Link
                  href="/"
                  className="hover:text-blue-600 transition-colors"
                >
                  Home
                </Link>
              </li>

              <li
                className="flex items-center"
                aria-hidden="true"
              >
                <span className="mx-2">
                  /
                </span>
              </li>

              <li>
                <span
                  className="text-gray-900 font-medium"
                  aria-current="page"
                >
                  About PDFSwift
                </span>
              </li>

            </ol>

          </nav>

        </div>

      </main>
    </>
  );
}