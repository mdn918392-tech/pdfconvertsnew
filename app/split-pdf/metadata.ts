import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Split PDF Online - Fast & Free",
  description:
    "Split PDF pages online quickly and efficiently. Upload your PDF and extract pages in one click.",

  keywords: [
    "split PDF",
    "PDF editor",
    "PDF page extraction",
    "online PDF tools",
    "free PDF splitter",
    "extract PDF pages",
    "PDF manipulation",
  ],

  authors: [
    { name: "pdfswift", url: "https://pdfswift.online" }
  ],
  creator: "pdfswift",
  publisher: "pdfswift",

  robots: "index, follow",

  /** ✅ Canonical URL */
  alternates: {
    canonical: "https://pdfswift.online/split-pdf",
  },

  openGraph: {
    title: "Split PDF Online - Fast & Free",
    description:
      "Split PDF pages online quickly and efficiently. Fast, simple, and free!",
    url: "https://pdfswift.online/split-pdf",
    siteName: "pdfswift",
    images: [
      {
        url: "/og-split-pdf.png",
        width: 1200,
        height: 630,
        alt: "Split PDF Online",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Split PDF Online - Fast & Free",
    description: "Split PDF pages online quickly and efficiently.",
    images: ["/og-split-pdf.png"],
    creator: "@pdfswift", // optional
  },

  icons: {
    icon: "/icons/icon-192.png",
    shortcut: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },

  manifest: "/manifest.json",
};
