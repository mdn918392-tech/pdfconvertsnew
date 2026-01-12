

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PNG to JPG Converter - Fast & Free",
  description:
    "Convert PNG images into high-quality JPGs online for free. Upload your PNG files and download optimized JPG images instantly.",
  keywords: [
    "PNG to JPG",
    "image converter",
    "convert PNG",
    "PNG to JPEG",
    "free image converter",
    "online PNG to JPG tool",
    "compress PNG to JPG",
    "photo converter"
  ],
  authors: [
    { name: "pdfswift", url: "https://pdfswift.online" }
  ],
  creator: "pdfswift",
  publisher: "pdfswift",
  robots: "index, follow",

  /** ✅ Canonical URL */
  alternates: {
    canonical: "https://pdfswift.online/png-to-jpg",
  },

  openGraph: {
    title: "PNG to JPG Converter - Fast & Free",
    description:
      "Convert PNG images to JPG format instantly. Fast, simple, and 100% free image converter.",
    url: "https://pdfswift.online/png-to-jpg",
    siteName: "pdfswift",
    images: [
      {
        url: "/og-png-to-jpg.png",
        width: 1200,
        height: 630,
        alt: "PNG to JPG Converter",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "PNG to JPG Converter - Fast & Free",
    description: "Convert PNG images into JPG format online for free.",
    images: ["/og-png-to-jpg.png"],
    creator: "@YourTwitterHandle",
  },

  icons: {
    icon: "/icons/icon-192.png",
    shortcut: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },

  manifest: "/manifest.json",
};
