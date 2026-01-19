import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Resize Image Online – Free Image Resizer Tool | PDFSwift",
  description:
    "Resize JPG, PNG, and WebP images online using PDFSwift. Set custom dimensions, maintain aspect ratio, and resize images securely without signup.",
  keywords: [
    "resize image online",
    "image resizer",
    "resize jpg png webp",
    "online image resizer",
    "free image resize tool",
    "resize images without losing quality",
    "secure image resizer",
    "browser based image resizer",
  ],
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function ResizeImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
