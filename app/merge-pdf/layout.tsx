import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Merge PDF Files Online - Free, Fast & No Watermark | PDFSwift",

  description:
    "Merge and combine multiple PDF files into one single document online for free. Fast, secure, and instant download without any watermark or registration.",

  keywords: [
    "merge pdf files online free",
    "merge pdf online",
    "combine pdf files",
    "pdf merger online",
    "free pdf merge tool",
    "merge multiple pdf files",
    "online pdf merger",
    "combine pdfs into one",
  ],

  // ⭐ IMPORTANT: Page-specific canonical
  alternates: {
    canonical: "/merge-pdf",
  },

  // ⭐ Make indexing explicit
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
    url: "https://www.pdfswift.online/merge-pdf",
    title: "Merge PDF Files Online - Free, Fast & No Watermark | PDFSwift",
    description:
      "Merge and combine multiple PDF files into one PDF online for free. Fast, secure, and no watermark.",
    siteName: "PDFSwift",
  },

  twitter: {
    card: "summary_large_image",
    title: "Merge PDF Files Online - Free | PDFSwift",
    description:
      "Merge multiple PDF files into one document online for free with PDFSwift.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function MergePDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}