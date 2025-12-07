import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JPG to PDF Converter - Fast & Free",
  description: "Convert JPG images into high-quality PDFs online for free. Upload your images and download them as a PDF in one click.",
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
    { name: "Your Name or Company", url: "https://yourwebsite.com" }
  ],
  creator: "Your Name or Company",
  publisher: "Your Company",
  robots: "index, follow",
  openGraph: {
    title: "JPG to PDF Converter - Fast & Free",
    description: "Convert JPG images into high-quality PDFs online for free. Fast, simple, and efficient!",
    url: "https://yourwebsite.com/jpg-to-pdf",
    siteName: "PDF Tools Pro",
    images: [
      {
        url: "/og-image.png", // Create an OG image for social sharing
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
    creator: "@YourTwitterHandle",
  },
  icons: {
    icon: "/icons/icon-192.png",
    shortcut: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
  manifest: "/manifest.json", // Make sure manifest.json exists in public/
};
