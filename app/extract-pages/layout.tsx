import type { Metadata, Viewport } from "next";
import HowToSchema from "./HowToSchema";
import FAQSchema from "./FAQSchema";
import BreadcrumbSchema from "./BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Extract Pages from PDF - Free Online Tool",
  description:
    "Extract specific pages from PDF files online quickly and securely. Download extracted pages instantly using our free tool.",
  keywords:
    "Extract pages from PDF, PDF page extractor, online PDF tool, free PDF extractor, split PDF pages",
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
