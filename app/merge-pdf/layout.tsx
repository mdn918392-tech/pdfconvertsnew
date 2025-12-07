import type { Metadata, Viewport } from "next";
import StructuredData from "./StructuredData";

export const metadata: Metadata = {
  title: "Merge PDF Files - Fast & Free PDF Combiner",
  description:
    "Merge multiple PDF files into a single high-quality PDF instantly. 100% free online PDF merger tool.",
  keywords:
    "merge PDF, combine PDF, PDF merger, PDF joiner, online PDF tools, free PDF merger",
};

// ✅ Viewport must be exported separately
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
      <StructuredData />
      <main>{children}</main>
    </>
  );
}
