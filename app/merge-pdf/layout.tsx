import type { Metadata, Viewport } from "next";
import HowToSchema from "./HowToSchema";

import ArticleSchema from "./ArticleSchema";

export const metadata: Metadata = {
  title: "Merge PDF Files Online Free – Combine PDFs Instantly (2026)",
  description:
    "Merge PDF files online free without watermark or signup. Combine multiple PDF documents into one file instantly using a secure, browser-based PDF merger tool with full privacy.",
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
