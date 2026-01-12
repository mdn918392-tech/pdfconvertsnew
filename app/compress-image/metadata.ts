import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress Images Online - Fast & Free",
  description:
    "Compress image files online quickly and efficiently. Reduce image size without losing quality in one click.",

  keywords: [
    "compress image",
    "reduce image size",
    "optimize image",
    "image optimizer",
    "online image compression",
    "free image compressor",
  ],

  authors: [
    { name: "pdfswift", url: "https://pdfswift.online" }
  ],
  creator: "pdfswift",
  publisher: "pdfswift",

  robots: "index, follow",

  /** ✅ Canonical URL */
  alternates: {
    canonical: "https://pdfswift.online/compress-image",
  },

  openGraph: {
    title: "Compress Images Online - Fast & Free",
    description:
      "Compress image files online quickly and efficiently. Fast, simple, and free!",
    url: "https://pdfswift.online/compress-image",
    siteName: "pdfswift",
    images: [
      {
        url: "/og-compress-image.png",
        width: 1200,
        height: 630,
        alt: "Compress Images Online",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Compress Images Online - Fast & Free",
    description: "Compress image files online quickly and efficiently.",
    images: ["/og-compress-image.png"],
    creator: "@pdfswift", // optional
  },

  icons: {
    icon: "/icons/icon-192.png",
    shortcut: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },

  manifest: "/manifest.json",
};
