import type { Metadata, Viewport } from "next";
import HowToSchema from "./HowToSchema";

import ArticleSchema from "./ArticleSchema";

export const metadata: Metadata = {
  title: "Compress Images & Download as PDF/Image - Free Online Tool",
  description:
    "Compress images online quickly without losing quality. Download optimized images as PDF, JPG, or PNG using secure, browser-based tools — free and no signup required.",
 keywords: [
  "compress image online",
  "reduce image size",
  "online image compressor",
  "free image compressor",
  "compress JPG online",
  "compress PNG online",
  "download image as PDF",
  "download image as JPG",
  "image compression tool",
  "secure image compression"
]

};

// ✅ viewport must be exported separately
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function CompressImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HowToSchema />
      
      <ArticleSchema/>
      
      <main>{children}</main>
    </>
  );
}
