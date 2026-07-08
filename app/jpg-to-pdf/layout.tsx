import type { Metadata, Viewport } from "next";


export const metadata: Metadata = {
  title: "Convert JPG to PDF Online - Free, Fast & No Watermark | PDFSwift",
  description:
    "Convert JPG images to PDF online for free. Combine multiple JPGs into a single high-quality PDF instantly. Secure, fast, and no registration or watermark required.",
  keywords: [
    "convert jpg to pdf online free",
    "jpg to pdf converter",
    "convert jpg images to pdf",
    "combine jpg to pdf",
    "free jpg to pdf tool",
    "online jpg to pdf converter",
    "images to pdf converter"
  ],
};


// ✅ viewport must be exported separately
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function JPGtoPDFLayout({
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
