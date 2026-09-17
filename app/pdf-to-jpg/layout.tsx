import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Convert PDF to JPG/PNG - Free, Fast & No Watermark | PDFSwift",

  description:
    "Convert PDF to images online for free. Extract PDF pages into high-quality JPG or PNG images instantly. Safe, secure, and no watermark or registration required.",

  keywords: [
    "convert pdf to images online free",
    "pdf to image converter",
    "convert pdf to jpg png",
    "extract pdf pages as images",
    "pdf to jpg png converter",
    "free pdf to image tool",
    "online pdf to image converter",
    "convert pdf to jpg online free",
    "pdf to png converter",
  ],

  alternates: {
    canonical: "https://www.pdfswift.online/pdf-to-jpg",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "https://www.pdfswift.online/pdf-to-jpg",
    title: "Convert PDF to JPG/PNG - Free, Fast & No Watermark | PDFSwift",
    description:
      "Convert PDF pages to high-quality JPG or PNG images online for free with PDFSwift. No watermark or registration required.",
    siteName: "PDFSwift",
  },

  twitter: {
    card: "summary_large_image",
    title: "Convert PDF to JPG/PNG - Free | PDFSwift",
    description:
      "Convert PDF pages to JPG or PNG images online for free with PDFSwift. Fast, secure, and no watermark.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function PDFToJPGLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}