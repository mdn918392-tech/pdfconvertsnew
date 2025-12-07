import type { Metadata, Viewport } from "next";
import StructuredData from "./StructuredData";

export const metadata: Metadata = {
  title: "JPG to PDF Converter - Fast & Free",
  description: "Convert JPG images to PDF instantly with high quality.",
  keywords:
    "JPG to PDF, PDF converter, image to PDF, free PDF tool, compress PDF",
};

// ✅ Viewport must be exported separately
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function JPGToPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData />
      <main>{children}</main>
    </>
  );
}
