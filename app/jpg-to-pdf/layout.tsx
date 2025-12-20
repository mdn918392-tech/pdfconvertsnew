import type { Metadata, Viewport } from "next";
import HowToSchema from "./HowToSchema";
import FAQSchema from "./FAQSchema";
import BreadcrumbSchema from "./BreadcrumbSchema";

export const metadata: Metadata = {
  title: "JPG to PDF Converter - Free Online Tool",
  description:
    "Convert JPG images into PDF files online quickly and securely. Merge multiple images into a single PDF instantly.",
  keywords:
    "JPG to PDF, image to PDF, online PDF converter, free JPG to PDF, merge images to PDF",
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
      <FAQSchema />
      <BreadcrumbSchema />
      
      <main>{children}</main>
    </>
  );
}
