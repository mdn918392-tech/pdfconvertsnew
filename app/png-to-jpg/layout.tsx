import type { Metadata, Viewport } from "next";
import StructuredData from "./StructuredData";

export const metadata: Metadata = {
  title: "PNG to JPG Converter - Fast & Free",
  description: "Convert PNG images to JPG instantly with high quality.",
  keywords:
    "PNG to JPG, image converter, PNG to JPEG, free image tool, convert PNG",
};

// ✅ viewport must be exported separately
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function PNGToJPGLayout({
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
