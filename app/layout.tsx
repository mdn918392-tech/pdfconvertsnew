// app/layout.tsx
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

export const metadata = {
  title: "PDFSwift – Free Online PDF Editor & Converter",
  description: "All-in-One PDF editing, converting, merging, splitting and optimization toolkit.",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
  manifest: "/manifest.json",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const sitelinkJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://pdfswift.com", // replace with your domain
    potentialAction: {
      "@type": "SearchAction",
      target: "https://pdfswift.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <head>
        {/* PWA + SEO META TAGS */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />

        {/* 🌐 GLOBAL Sitelink Search Schema JSON-LD */}
        <Script
          id="sitelink-search-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sitelinkJsonLd) }}
          strategy="afterInteractive"
        />
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
