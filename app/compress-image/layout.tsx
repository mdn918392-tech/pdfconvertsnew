import type { Metadata, Viewport } from "next";




export const metadata: Metadata = {
  title: "Compress Image to PDF Online - 100% Free & Fast | PDFSwift",
  description:
    "Easily compress your images and convert them into high-quality PDF files online for free. Fast, secure, and no installation required. Try PDFSwift now",
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
      
      
     
      
      <main>{children}</main>
    </>
  );
}
