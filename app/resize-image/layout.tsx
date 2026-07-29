import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Resize Image Online Free – Scale & Convert JPG, PNG & WebP | PDFSwift",
  description:
    "Easily resize and scale JPG, PNG, and WebP images online for free with PDFSwift. Change image dimensions or file size in seconds without losing quality. Fast, safe, and easy to use.",
  keywords: [
   "resize image online",
  "image resizer",
  "resize jpg png webp",
  "online image resizer",
  "free image resize tool",
  "resize images without losing quality",
  "scale image online",
  "secure image resizer",
  "browser based image resizer",
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