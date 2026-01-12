import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merge PDF Files Online - Fast & Free PDF Combiner",
  description:
    "Merge multiple PDF files into one high-quality document online for free. Fast, secure, and easy-to-use PDF merger tool.",

  keywords: [
    "merge PDF",
    "combine PDF",
    "PDF combiner",
    "PDF merger online",
    "join PDF files",
    "merge documents",
    "free PDF tools",
    "online PDF merger"
  ],

  authors: [
    { name: "pdfswift", url: "https://pdfswift.online" }
  ],
  creator: "pdfswift",
  publisher: "pdfswift",

  robots: "index, follow",

  /** ✅ Canonical URL */
  alternates: {
    canonical: "https://pdfswift.online/merge-pdf",
  },

  openGraph: {
    title: "Merge PDF Files Online - Fast & Free PDF Combiner",
    description:
      "Easily merge multiple PDF files into one. 100% free, fast, and secure PDF merging tool.",
    url: "https://pdfswift.online/merge-pdf",
    siteName: "pdfswift",
    images: [
      {
        url: "/og-merge-pdf.png",
        width: 1200,
        height: 630,
        alt: "Merge PDF Online",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Merge PDF Files Online - Fast & Free PDF Combiner",
    description:
      "Merge your PDF files quickly and securely using this free online tool.",
    images: ["/og-merge-pdf.png"],
    creator: "@pdfswift", // optional
  },

  icons: {
    icon: "/icons/icon-192.png",
    shortcut: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },

  manifest: "/manifest.json",
};
