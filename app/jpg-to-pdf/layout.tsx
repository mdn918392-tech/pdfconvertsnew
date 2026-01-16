import type { Metadata, Viewport } from "next";
import HowToSchema from "./HowToSchema";

import ArticleSchema from "./ArticleSchema";

export const metadata: Metadata = {
  title: "JPG to PDF Converter - Free Online Tool",
  description:
    "Convert JPG images into PDF files online quickly and securely with PDFSwift. Merge multiple JPG images into a single PDF instantly while preserving image quality. Our browser-based JPG to PDF converter works on all devices — free to use, no signup required, and complete privacy guarantee",
keywords: [
  "JPG to PDF converter online",
  "convert JPG to PDF",
  "image to PDF converter",
  "merge images to PDF",
  "free JPG to PDF tool",
  "combine images into PDF",
  "online JPG to PDF converter",
  "secure image to PDF tool",
  "browser based PDF converter"
]

};

// ✅ viewport must be exported separately
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function JPGtoPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HowToSchema />
      
      <ArticleSchema/>
      
      <main>{children}</main>
    </>
  );
}
