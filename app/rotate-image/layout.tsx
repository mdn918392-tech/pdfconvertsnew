import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Rotate Image Online – Rotate JPG, PNG & WebP Free | PDFSwift",
  description:
    "Rotate images online for free using PDFSwift. Easily rotate JPG, PNG, and WebP images clockwise or counter-clockwise without losing quality. No signup required, fast and secure.",
  keywords: [
    "rotate image online",
    "rotate image free",
    "rotate jpg image",
    "rotate png image",
    "rotate webp image",
    "image rotation tool",
    "rotate image without losing quality",
    "online image rotator",
    "browser based image rotation"
  ],
};

// ✅ viewport must be exported separately
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RotateImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
