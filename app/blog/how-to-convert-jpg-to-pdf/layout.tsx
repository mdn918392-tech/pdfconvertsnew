// app/blog/how-to-convert-jpg-to-pdf/layout.tsx
import { ReactNode } from "react";
import { Metadata } from "next";

interface LayoutProps {
  children: ReactNode;
}

// ✅ SEO Metadata
// Metadata for SEO
export const metadata = {
  title: "How to Convert JPG to PDF Online",
  description: "Step-by-step guide to convert JPG images to PDF format. Learn online methods, offline software options, best practices for image quality, and security tips for document conversion.",
  keywords: "convert jpg to pdf, jpg to pdf online, image to pdf, free pdf converter, jpg to pdf converter online",
  authors: [{ name: "Your Domain" }],
  openGraph: {
    title: "How to Convert JPG to PDF Online - Complete 2024 Guide",
    description: "Step-by-step guide to convert JPG images to PDF format with best practices and security tips.",
    url: "https://yourdomain.com/blog/how-to-convert-jpg-to-pdf",
    siteName: "Your Domain",
    images: [
      {
        url: "https://yourdomain.com/images/jpg-to-pdf-conversion-guide.jpg",
        width: 1200,
        height: 630,
        alt: "JPG to PDF Conversion Guide",
      },
    ],
    locale: "en_US",
    type: "article",
    publishedTime: "2024-01-12",
    modifiedTime: "2024-01-12",
    tags: ["PDF", "JPG", "Conversion", "How-To"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Convert JPG to PDF Online - Complete 2024 Guide",
    description: "Step-by-step guide to convert JPG images to PDF format with best practices and security tips.",
    images: ["https://yourdomain.com/images/jpg-to-pdf-conversion-guide.jpg"],
    creator: "@yourdomain",
    site: "@yourdomain",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://yourdomain.com/blog/how-to-convert-jpg-to-pdf",
  },
  themeColor: "#3b82f6",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function HowToConvertJpgToPdfLayout({ children }: LayoutProps) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      {children}
    </main>
  );
}
