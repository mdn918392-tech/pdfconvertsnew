import type { Metadata, Viewport } from "next";
import HowToSchema from "./HowToSchema";

import ArticleSchema from "./ArticleSchema";

export const metadata: Metadata = {
  title: "Merge PDF Tool - Free Online PDF Merger",
  description:
    "Merge multiple PDF files online easily and securely with PDFSwift. Combine PDFs into a single, well-organized file in seconds using our free, browser-based PDF merge tool. Arrange pages in any order, get instant results, and enjoy complete privacy — no signup or file uploads required.",
  keywords: [
  "merge PDF online",
  "combine PDF files",
  "PDF merger online",
  "free PDF merge tool",
  "merge multiple PDF files",
  "online PDF merger",
  "secure PDF merge",
  "browser based PDF tool"
]

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
