import type { Metadata, Viewport } from "next";


export const metadata: Metadata = {
  title: "Convert PDF to Images Online Free – JPG & PNG (2026)",
  description:
    "Convert PDF to images online free without watermark or signup. Extract PDF pages as high-quality JPG or PNG images, rotate pages as needed, and download instantly using a secure, browser-based tool.",
  keywords: [
    "convert pdf to images online free",
    "pdf to image converter",
    "convert pdf to jpg png",
    "extract pdf pages as images",
    "pdf to jpg png converter",
    "free pdf to image tool",
    "online pdf to image converter"
  ],
};


// ✅ viewport must be exported separately
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function PDFToJPGLayout({
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
