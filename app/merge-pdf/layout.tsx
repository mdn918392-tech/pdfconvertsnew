import type { Metadata, Viewport } from "next";
import HowToSchema from "./HowToSchema";

import ArticleSchema from "./ArticleSchema";

export const metadata: Metadata = {
  title: "Merge PDF Files Online - Free, Fast & No Watermark | PDFSwift",
  description:
    "Merge and combine multiple PDF files into one single document online for free. Fast, secure, and instant download without any watermark or registration",
  keywords: [
    "merge pdf files online free",
    "merge pdf online",
    "combine pdf files",
    "pdf merger online",
    "free pdf merge tool",
    "merge multiple pdf files",
    "online pdf merger",
    "combine pdfs into one"
  ],
};


// ✅ viewport must be exported separately
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
  return (
    <>
      
      
      <main>{children}</main>
    </>
  );
}
