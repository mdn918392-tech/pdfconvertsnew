import type { Metadata, Viewport } from "next";


export const metadata: Metadata = {
  title: "Convert PNG to JPG Online - Free, Fast & No Watermark | PDFSwift",
  description:
    "Convert PNG images to JPG format online for free. Maintain high visual clarity and download optimized JPGs instantly. 100% secure, browser-based, and no signup required.",
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
    

      <main>{children}</main>
    </>
  );
}
