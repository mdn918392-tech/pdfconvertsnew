import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress PDF Online - Fast & Free",
  description:
    "Compress PDF files online quickly and efficiently. Reduce PDF size without losing quality in one click.",

  keywords: [
    "compress PDF",
    "reduce PDF size",
    "optimize PDF",
    "PDF optimizer",
    "online PDF tools",
    "PDF compression",
    "free PDF compressor",
  ],

  authors: [
    { name: "pdfswift", url: "https://pdfswift.online" }
  ],
  creator: "pdfswift",
  publisher: "pdfswift",

  robots: "index, follow",

  /** ✅ Canonical URL */
  alternates: {
    canonical: "https://pdfswift.online/compress-pdf",
  },

  openGraph: {
    title: "Compress PDF Online - Fast & Free",
    description:
      "Compress PDF files online quickly and efficiently. Fast, simple, and free!",
    url: "https://pdfswift.online/compress-pdf",
    siteName: "pdfswift",
    images: [
      {
        url: "/og-compress-pdf.png",
        width: 1200,
        height: 630,
        alt: "Compress PDF Online",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Compress PDF Online - Fast & Free",
    description: "Compress PDF files online quickly and efficiently.",
    images: ["/og-compress-pdf.png"],
    creator: "@pdfswift", // optional
  },

  icons: {
    icon: "/icons/icon-192.png",
    shortcut: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },

  manifest: "/manifest.json",
};
