import type { Metadata, Viewport } from "next";
export const metadata: Metadata = {
  title: "Rotate PDF Pages Online Free – Fix PDF Orientation | PDFSwift",
  description:
    "Rotate PDF pages online for free with PDFSwift. Easily fix upside-down or sideways pages by rotating PDFs 90, 180, or 270 degrees. Securely organize and adjust your PDF pages instantly without watermarks.",
  keywords: [
    "rotate pdf pages online free",
    "rotate pdf online",
    "pdf rotator",
    "rotate pdf 90 degrees",
    "change pdf page orientation",
    "organize pdf pages free",
    "pdfswift rotate tool",
    "rotate pdf pages permanently",
    "free pdf rotation tool",
  ],
};

// ✅ viewport must be exported separately
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RotatePDFLayout({
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
