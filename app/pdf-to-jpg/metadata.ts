import type { Metadata } from "next";

export const pdfToJpgMetadata: Metadata = {
  title: "PDF to JPG Converter - Free & Fast Online Tool",
  description:
    "Easily convert PDF pages into JPG images online. Fast, secure, no watermark, and 100% free PDF to JPG conversion tool.",
  keywords: [
    "pdf to jpg",
    "convert pdf to jpg",
    "pdf to image",
    "online pdf converter",
    "extract images from pdf",
  ],
  alternates: {
    canonical: "https://yourdomain.com/pdf-to-jpg",
  },
  openGraph: {
    title: "PDF to JPG Converter - Fast & Free",
    description:
      "Convert your PDF pages to JPG images instantly. No sign-up required.",
    url: "https://yourdomain.com/pdf-to-jpg",
    siteName: "PDF Tools",
    images: [
      {
        url: "https://yourdomain.com/opengraph-pdf-to-jpg.png",
        width: 1200,
        height: 630,
        alt: "PDF to JPG Converter",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to JPG Converter",
    description: "Instant PDF to JPG conversion online. Free forever.",
    images: ["https://yourdomain.com/opengraph-pdf-to-jpg.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
