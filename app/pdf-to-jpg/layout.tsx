import type { Metadata, Viewport } from "next";
import HowToSchema from "./HowToSchema";
import FAQSchema from "./FAQSchema";

import BreadcrumbSchema from "./BreadcrumbSchema";

export const metadata: Metadata = {
  title: "PDF to JPG Converter - Fast & Free",
  description:
    "Convert PDF pages to JPG images instantly with high quality.",
  keywords:
    "PDF to JPG, PDF converter, extract images, pdf to image, free PDF tool, convert PDF",
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
