import type { Metadata, Viewport } from "next";
import HowToSchema from "./HowToSchema";
import FAQSchema from "./FAQSchema";
import ArticleSchema from "./ArticleSchema";

export const metadata: Metadata = {
  title: "Compress PDF Files Online for Free – Reduce PDF Size Instantly",
  description:
    "Compress PDF files online quickly and securely with PDFSwift. Reduce PDF file size without losing quality using fast, browser-based compression. Your files stay private, no signup or installation required, and everything works instantly on desktop and mobile.",
keywords: [
  "compress PDF online",
  "reduce PDF size",
  "online PDF compressor",
  "free PDF compressor",
  "shrink PDF file",
  "compress PDF without quality loss",
  "secure PDF compression",
  "browser based PDF tool"
]

};

// ✅ viewport must be exported separately
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
  return (
    <>
      <HowToSchema />
      <FAQSchema />
      <ArticleSchema/>
      
      <main>{children}</main>
    </>
  );
}
