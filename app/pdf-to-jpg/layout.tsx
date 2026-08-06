import type { Metadata, Viewport } from "next";


export const metadata: Metadata = {
  title: "Convert PDF to JPG/PNG - Free, Fast & No Watermark | PDFSwift",
  description:
    "Convert PDF to images online for free. Extract PDF pages into high-quality JPG or PNG images instantly. Safe, secure, and no watermark or registration required.",
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
