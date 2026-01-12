import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JPG to PDF Converter - Fast & Free",
  description:
    "Convert JPG images into high-quality PDFs online for free. Upload your images and download them as a PDF in one click.",

  keywords: [
    "JPG to PDF",
    "PDF converter",
    "image to PDF",
    "free PDF converter",
    "online PDF tools",
    "convert JPG to PDF",
    "high quality PDF",
  ],

  authors: [
    { name: "pdfswift", url: "https://pdfswift.online" }
  ],
  creator: "pdfswift",
  publisher: "pdfswift",

  robots: "index, follow",

  /** ✅ Canonical URL */
  alternates: {
    canonical: "https://pdfswift.online/jpg-to-pdf",
  },

  openGraph: {
    title: "JPG to PDF Converter - Fast & Free",
    description:
      "Convert JPG images into high-quality PDFs online for free. Fast, simple, and efficient!",
    url: "https://pdfswift.online/jpg-to-pdf",
    siteName: "pdfswift",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JPG to PDF Converter",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "JPG to PDF Converter - Fast & Free",
    description: "Convert JPG images into high-quality PDFs online for free.",
    images: ["/og-image.png"],
    creator: "@pdfswift", // optional
  },

  icons: {
    icon: "/icons/icon-192.png",
    shortcut: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },

  manifest: "/manifest.json",
};
