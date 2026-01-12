import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Extract PDF Pages Online - Fast & Free",
  description:
    "Extract pages from PDF files online quickly and efficiently. Select and download specific pages in one click.",

  keywords: [
    "extract PDF pages",
    "PDF page extraction",
    "split PDF",
    "online PDF tools",
    "PDF editor",
    "free PDF extractor",
  ],

  authors: [
    { name: "pdfswift", url: "https://pdfswift.online" }
  ],
  creator: "pdfswift",
  publisher: "pdfswift",

  robots: "index, follow",

  /** ✅ Canonical URL */
  alternates: {
    canonical: "https://pdfswift.online/extract-pages",
  },

  openGraph: {
    title: "Extract PDF Pages Online - Fast & Free",
    description:
      "Extract pages from PDF files online quickly and efficiently. Fast, simple, and free!",
    url: "https://pdfswift.online/extract-pages",
    siteName: "pdfswift",
    images: [
      {
        url: "/og-extract-pdf.png",
        width: 1200,
        height: 630,
        alt: "Extract PDF Pages Online",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Extract PDF Pages Online - Fast & Free",
    description: "Extract pages from PDF files online quickly and efficiently.",
    images: ["/og-extract-pdf.png"],
    creator: "@pdfswift", // optional
  },

  icons: {
    icon: "/icons/icon-192.png",
    shortcut: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },

  manifest: "/manifest.json",
};
