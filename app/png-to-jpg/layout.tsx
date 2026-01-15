import type { Metadata, Viewport } from "next";
import PNGtoJPGHowToSchema from "./HowToSchema";
import PNGtoJPGFAQSchema from "./FAQSchema";
import ArticleSchema from "./ArticleSchema";

export const metadata: Metadata = {
  title: "PNG to JPG Converter Online – Fast, Free & Secure",
  description:
    "Convert PNG images to JPG format instantly with high quality and secure processing using PDFSwift. Easily reduce image file size, maintain visual clarity, and download optimized JPG images in seconds. Our browser-based PNG to JPG converter works on all devices, requires no signup, and keeps your files completely private.",
 keywords: [
  "PNG to JPG converter online",
  "convert PNG to JPG",
  "PNG to JPG image converter",
  "online PNG to JPG tool",
  "free PNG to JPG converter",
  "image converter PNG to JPG",
  "high quality PNG to JPG",
  "secure image converter",
  "browser based image converter"
]

};

// ✅ viewport must be exported separately
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function PNGtoJPGLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Tool-specific schemas */}
      <PNGtoJPGHowToSchema />
      <PNGtoJPGFAQSchema />
      <ArticleSchema />

      <main>{children}</main>
    </>
  );
}
