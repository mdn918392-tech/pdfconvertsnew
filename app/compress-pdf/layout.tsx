import type { Metadata, Viewport } from "next";


export const metadata: Metadata = {
  title: "Compress PDF Files Online Free – Reduce PDF Size Instantly (2026)",
  description:
    "Compress PDF files online free without watermark or signup. Reduce PDF file size instantly while preserving quality using a secure, browser-based PDF compressor.",
  keywords: [
    "compress pdf online free",
    "compress pdf online",
    "reduce pdf size",
    "pdf compressor",
    "free pdf compressor",
    "shrink pdf file",
    "compress pdf without quality loss"
  ],
};


// ✅ viewport must be exported separately
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function CompressPDFLayout({
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
