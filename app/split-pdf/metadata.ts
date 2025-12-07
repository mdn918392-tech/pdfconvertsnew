import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Split PDF Online - Fast & Free",
  description: "Split PDF pages online quickly and efficiently. Upload your PDF and extract pages in one click.",
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
    { name: "Your Name or Company", url: "https://yourwebsite.com" }
  ],
  creator: "Your Name or Company",
  publisher: "Your Company",
  robots: "index, follow",
  openGraph: {
    title: "Split PDF Online - Fast & Free",
    description: "Split PDF pages online quickly and efficiently. Fast, simple, and free!",
    url: "https://yourwebsite.com/split-pdf",
    siteName: "PDF Tools Pro",
    images: [
      {
        url: "/og-split-pdf.png", // OG image specific for Split PDF
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
    creator: "@YourTwitterHandle",
  },
  icons: {
    icon: "/icons/icon-192.png",
    shortcut: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
  manifest: "/manifest.json",
};
