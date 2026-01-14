import type { Metadata, Viewport } from "next";
import HowToSchema from "./HowToSchema";
import FAQSchema from "./FAQSchema";

import BreadcrumbSchema from "./BreadcrumbSchema";

export const metadata: Metadata = {
  title: "PDF to JPG Converter Online – High Quality, No Signup",
  description:
    "Convert PDF pages to JPG images instantly with high quality using PDFSwift. Extract individual pages or entire PDFs as JPG images with fast, browser-based processing. Free to use, secure, and no signup required.",
 keywords: [
  "PDF to JPG converter online",
  "convert PDF to JPG",
  "PDF to image converter",
  "extract PDF pages as JPG",
  "free PDF to JPG tool",
  "convert PDF pages to images",
  "online PDF to JPG converter",
  "high quality PDF to JPG",
  "secure PDF to image tool",
  "browser based PDF converter"
]

};

// ✅ viewport must be exported separately
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function PDFToJPGLayout({
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
