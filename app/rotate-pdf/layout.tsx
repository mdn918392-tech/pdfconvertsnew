import type { Metadata, Viewport } from "next";
import HowToSchema from "./HowToSchema";

import ArticleSchema from "./ArticleSchema";

export const metadata: Metadata = {
  title: "Rotate PDF Pages Online for Free – Fix Orientation Instantly",
  description:
    "Rotate PDF pages online quickly and securely with PDFSwift. Fix upside-down or incorrectly oriented pages by rotating PDFs by 90°, 180°, or 270° in just a few clicks. Choose specific pages or rotate the entire document and download the updated PDF instantly using a free, browser-based tool — no signup or file uploads required.",
  keywords: [
  "rotate PDF pages online",
  "rotate PDF file",
  "PDF rotator",
  "rotate PDF 90 degrees",
  "rotate PDF 180 degrees",
  "rotate PDF 270 degrees",
  "free PDF rotation tool",
  "edit PDF pages online",
  "secure PDF editor",
  "browser based PDF tool"
]

};

// ✅ viewport must be exported separately
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RotatePDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HowToSchema />
     
      <ArticleSchema />
      
      <main>{children}</main>
    </>
  );
}
