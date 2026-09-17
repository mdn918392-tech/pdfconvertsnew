import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Compress PDF - Reduce File Size Online for Free | PDFSwift",

  description:
    "Compress PDF files online free without watermark or signup. Reduce PDF file size instantly while preserving quality using a secure, browser-based PDF compressor.",

  keywords: [
    "compress pdf online free",
    "compress pdf online",
    "reduce pdf size",
    "pdf compressor",
    "free pdf compressor",
    "shrink pdf file",
    "compress pdf without quality loss",
  ],

  alternates: {
    canonical: "https://www.pdfswift.online/compress-pdf",
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
    url: "https://www.pdfswift.online/compress-pdf",
    title: "Compress PDF - Reduce File Size Online for Free | PDFSwift",
    description:
      "Compress PDF files online for free with PDFSwift. Reduce PDF file size quickly while preserving quality, with no watermark or signup.",
    siteName: "PDFSwift",
  },

  twitter: {
    card: "summary_large_image",
    title: "Compress PDF - Reduce File Size Online for Free | PDFSwift",
    description:
      "Compress PDF files online for free with PDFSwift. Reduce file size quickly without watermark or signup.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function CompressPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}