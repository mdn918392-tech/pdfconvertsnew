// app/blog/how-to-convert-jpg-to-pdf/layout.tsx
import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";

interface LayoutProps {
  children: ReactNode;
}

/* =========================
   ✅ SEO METADATA
========================= */
export const metadata: Metadata = {
  title: "How to Convert JPG to PDF Online",

  description:
    "Step-by-step guide to convert JPG images to PDF format. Learn online methods, best practices for image quality, security tips, and FAQs.",

  keywords: [
    "convert jpg to pdf",
    "jpg to pdf online",
    "image to pdf",
    "free pdf converter",
    "jpg to pdf converter online",
  ],

  authors: [{ name: "PDFSwift" }],

  alternates: {
    canonical: "https://pdfswift.online/blog/how-to-convert-jpg-to-pdf",
  },

  openGraph: {
    title: "How to Convert JPG to PDF Online – Complete Guide",
    description:
      "Step-by-step JPG to PDF conversion guide with best practices and security tips.",
    url: "https://pdfswift.online/blog/how-to-convert-jpg-to-pdf",
    siteName: "PDFSwift",
    images: [
      {
        url: "https://pdfswift.online/images/jpg-to-pdf-conversion-guide.png",
        width: 1200,
        height: 630,
        alt: "JPG to PDF Conversion Guide",
      },
    ],
    type: "article",
    publishedTime: "2024-01-12",
    modifiedTime: "2024-01-12",
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

  themeColor: "#3b82f6",
};

/* =========================
   📱 VIEWPORT (SEPARATE)
========================= */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* =========================
   🌐 LAYOUT
========================= */
export default function HowToConvertJpgToPdfLayout({
  children,
}: LayoutProps) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      {children}
    </main>
  );
}
