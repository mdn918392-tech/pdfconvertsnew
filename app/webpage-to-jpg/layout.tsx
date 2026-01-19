import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Webpage to JPG Converter – Create High-Quality JPG Images Online",
  description:
    "Convert webpage content into high-quality JPG images instantly using PDFSwift. Fast, secure, and browser-based with no installation or signup required. Works smoothly on all devices while preserving clarity and layout.",
  keywords: [
    "webpage to jpg converter",
    "convert webpage content to jpg",
    "webpage to image converter",
    "webpage content to jpg",
    "online webpage to jpg tool",
    "free webpage to jpg converter",
    "browser based webpage converter",
    "secure webpage to image tool"
  ],
};

// ✅ viewport must be exported separately
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function WebpageToJPGLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
