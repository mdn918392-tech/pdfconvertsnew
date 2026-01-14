import type { Metadata, Viewport } from "next";
import HowToSchema from "./HowToSchema";
import FAQSchema from "./FAQSchema";
import BreadcrumbSchema from "./BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Extract Pages from PDF - Free Online Tool",
  description:
    "Extract specific pages from PDF files online quickly and securely with PDFSwift. Select the pages you need and download the extracted PDF instantly using our free, browser-based tool — no signup, no uploads, and complete privacy guaranteed.",
keywords: [
  "extract pages from PDF online",
  "PDF page extractor",
  "extract PDF pages",
  "split PDF pages online",
  "free PDF extractor",
  "online PDF page extractor",
  "extract specific pages from PDF",
  "secure PDF extraction tool",
  "browser based PDF tool"
]

};

// ✅ viewport must be exported separately
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function ExtractPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HowToSchema />
      <FAQSchema />
      <BreadcrumbSchema />
      
      <main>{children}</main>
    </>
  );
}
