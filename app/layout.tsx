// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Script from "next/script";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* =========================
   🌍 GLOBAL SEO METADATA
========================= */
export const metadata: Metadata = {
  metadataBase: new URL("https://pdfswift.online"),


 // ✅ GOOGLE SEARCH CONSOLE VERIFICATION
  verification: {
    google: "GWJBBJ9dBrK1D1Q9Uiwv42KrnsCFfw4Sy3qtmMGBlrY",
  },






  title: {
    default: "PDFSwift – Free Online PDF Tools to Edit, Convert & Compress",
    template: "%s | PDFSwift",
  },
  description:
    "PDFSwift is a powerful, free online PDF tool designed to help you convert, compress, merge, split, rotate, and edit PDF files quickly and securely — without any signup or installation required.",
  keywords: [

  "PDF converter",
  "merge PDF online",
  "split PDF online",
  "compress PDF online",
  "JPG to PDF converter",
  "PDF to JPG converter",
  "online PDF tools",
  "free PDF tools",
    "PDF editor online",
  "secure PDF editor",
  "browser based PDF tools",
  "edit PDF without signup"
],

  authors: [{ name: "PDFSwift Team" }],
  creator: "PDFSwift",
  publisher: "PDFSwift",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://pdfswift.online",
  },

  openGraph: {
    type: "website",
    url: "https://pdfswift.online",
    title: "PDFSwift – Free Online PDF Editor & Converter",
    description:
      "Convert, compress, merge, split, and edit PDFs online for free with PDFSwift — fast, secure, and no signup required.",
    siteName: "PDFSwift",
    images: [
      {
        url: "https://pdfswift.online/og-image.png",
        width: 1200,
        height: 630,
        alt: "PDFSwift Online PDF Tools",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "PDFSwift – Free Online PDF Editor & Converter",
    description:
      "All-in-one free online PDF editor and converter. No signup required.",
    images: ["https://pdfswift.online/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-192.png",
  },

  manifest: "/manifest.json",
  themeColor: "#ffffff",
};

/* =========================
   🌐 ROOT LAYOUT
========================= */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* 🔍 Sitelink Search Schema */
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PDFSwift",
    url: "https://pdfswift.online",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://pdfswift.online/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  /* 🏢 Organization Schema */
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PDFSwift",
    url: "https://pdfswift.online",
    logo: "https://pdfswift.online/icons/favicon.ico",
    sameAs: [
      "https://twitter.com/pdfswift", // optional
      "https://github.com/pdfswift",  // optional
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* PWA + MOBILE SEO */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />

        {/* 🌐 JSON-LD STRUCTURED DATA */}
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />




            {/* ✅ Google Analytics (GA4) */}

         
         <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PRWCRV02GZ"
          strategy="afterInteractive"
          />
           <Script id="google-analytics" strategy="afterInteractive">
           {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PRWCRV02GZ');

          `}
        </Script>

  







        
      </head>




        

        








       <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900`}
       >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
