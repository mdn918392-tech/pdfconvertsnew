import type { Metadata, Viewport } from "next";
import HowToSchema from "./HowToSchema";
import FAQSchema from "./FAQSchema";
import BreadcrumbSchema from "./BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Merge PDF Tool - Free Online PDF Merger",
  description:
    "Merge multiple PDF files online easily and securely. Combine PDFs instantly with our free tool.",
  keywords:
    "Merge PDF, PDF merger, online PDF tool, free PDF merge, combine PDF files",
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
      <HowToSchema />
      <FAQSchema />
      <BreadcrumbSchema />
      
      <main>{children}</main>
    </>
  );
}
