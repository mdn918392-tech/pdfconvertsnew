import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rotate PDF Online - Fast & Free",
  description:
    "Rotate PDF pages online quickly and efficiently. Upload your PDF and rotate pages with one click.",

  keywords: [
    "rotate PDF",
    "PDF editor",
    "PDF page rotation",
    "online PDF tools",
    "rotate PDF pages",
    "PDF manipulation",
    "free PDF tools",
  ],

  authors: [
    { name: "pdfswift", url: "https://pdfswift.online" }
  ],
  creator: "pdfswift",
  publisher: "pdfswift",

  robots: "index, follow",

  /** ✅ Canonical URL */
  alternates: {
    canonical: "https://pdfswift.online/rotate-pdf",
  },

  openGraph: {
    title: "Rotate PDF Online - Fast & Free",
    description:
      "Rotate PDF pages online quickly and efficiently. Fast, simple, and free!",
    url: "https://pdfswift.online/rotate-pdf",
    siteName: "pdfswift",
    images: [
      {
        url: "/og-rotate-pdf.png",
        width: 1200,
        height: 630,
        alt: "Rotate PDF Online",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rotate PDF Online - Fast & Free",
    description: "Rotate PDF pages online quickly and efficiently.",
    images: ["/og-rotate-pdf.png"],
    creator: "@pdfswift", // optional
  },

  icons: {
    icon: "/icons/icon-192.png",
    shortcut: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },

  manifest: "/manifest.json",
};
