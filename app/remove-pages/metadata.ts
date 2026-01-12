import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove PDF Pages - Fast & Free Online Tool",
  description:
    "Remove unwanted pages from your PDF instantly. Free, fast, and secure PDF page remover with no watermark.",

  keywords: [
    "remove pdf pages",
    "delete pdf pages",
    "pdf page remover",
    "edit pdf online",
    "pdf tools",
    "cut pdf pages",
    "online pdf editor",
  ],

  authors: [
    { name: "pdfswift", url: "https://pdfswift.online" }
  ],
  creator: "pdfswift",
  publisher: "pdfswift",

  robots: "index, follow",

  /** ✅ Canonical URL (important) */
  alternates: {
    canonical: "https://pdfswift.online/remove-pages",
  },

  openGraph: {
    title: "Remove PDF Pages - Fast & Free Online Tool",
    description:
      "Delete or remove unwanted pages from any PDF file instantly and for free.",
    url: "https://pdfswift.online/remove-pages",
    siteName: "pdfswift",
    images: [
      {
        url: "/og-remove-pages.png",
        width: 1200,
        height: 630,
        alt: "Remove PDF Pages Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Remove PDF Pages - Fast & Free",
    description:
      "Delete pages from your PDF instantly with this free online tool.",
    images: ["/og-remove-pages.png"],
    creator: "@pdfswift", // optional, agar handle nahi hai to hata sakte ho
  },

  icons: {
    icon: "/icons/icon-192.png",
    shortcut: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },

  manifest: "/manifest.json",
};
