import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Rotate Image Online Free – Flip & Rotate JPG, PNG & WebP | PDFSwift",
  description:
    "Rotate and flip JPG, PNG, and WebP images online for free with PDFSwift. Rotate images clockwise, counter-clockwise, or flip horizontally and vertically securely without losing quality.",
  keywords: [
    "rotate image online",
    "image rotator",
    "flip image online",
    "rotate jpg png webp",
    "online image rotator",
    "free image rotate tool",
    "rotate images without losing quality",
    "secure image rotator",
    "browser based image rotator",
  ],
};

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