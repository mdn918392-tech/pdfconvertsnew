import type { Metadata, Viewport } from "next";
import HowToSchema from "./HowToSchema";
import FAQSchema from "./FAQSchema";
import BreadcrumbSchema from "./BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Rotate PDF Tool - Free Online PDF Rotator",
  description:
    "Rotate PDF files online easily and securely. Choose 90°, 180°, or 270° rotation and download instantly.",
  keywords:
    "Rotate PDF, PDF rotator, online PDF tool, free PDF rotate, rotate PDF pages",
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
      <FAQSchema />
      <BreadcrumbSchema />
      
      <main>{children}</main>
    </>
  );
}
