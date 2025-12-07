import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rotate PDF Online - Fast & Free",
  description: "Rotate PDF pages online quickly and efficiently. Upload your PDF and rotate pages with one click.",
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
    { name: "Your Name or Company", url: "https://yourwebsite.com" }
  ],
  creator: "Your Name or Company",
  publisher: "Your Company",
  robots: "index, follow",
  openGraph: {
    title: "Rotate PDF Online - Fast & Free",
    description: "Rotate PDF pages online quickly and efficiently. Fast, simple, and free!",
    url: "https://yourwebsite.com/rotate-pdf",
    siteName: "PDF Tools Pro",
    images: [
      {
        url: "/og-rotate-pdf.png", // OG image specific for Rotate PDF
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
    creator: "@YourTwitterHandle",
  },
  icons: {
    icon: "/icons/icon-192.png",
    shortcut: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
  manifest: "/manifest.json",
};
