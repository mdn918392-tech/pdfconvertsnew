import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Resize Image Online Free – Scale & Convert JPG, PNG & WebP | PDFSwift",

  description:
    "Easily resize and scale JPG, PNG, and WebP images online for free with PDFSwift. Change image dimensions or file size quickly without losing quality. Fast, safe, and easy to use.",

  keywords: [
    "resize image online",
    "image resizer",
    "resize jpg png webp",
    "online image resizer",
    "free image resize tool",
    "resize images without losing quality",
    "scale image online",
    "secure image resizer",
    "browser based image resizer",
  ],

  alternates: {
    canonical: "https://www.pdfswift.online/resize-image",
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
    url: "https://www.pdfswift.online/resize-image",
    title: "Resize Image Online Free – JPG, PNG & WebP | PDFSwift",
    description:
      "Resize JPG, PNG, and WebP images online for free with PDFSwift. Quickly change image dimensions without losing quality.",
    siteName: "PDFSwift",
  },

  twitter: {
    card: "summary_large_image",
    title: "Resize Image Online Free – JPG, PNG & WebP | PDFSwift",
    description:
      "Resize JPG, PNG, and WebP images online for free with PDFSwift. Fast, secure, and easy to use.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function ResizeImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}