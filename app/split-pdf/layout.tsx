import type { Metadata, Viewport } from "next";


export const metadata: Metadata = {
  title: "Split PDF Files Online Free – Separate Pages Instantly (2026)",
  description:
    "Split PDF files online free without watermark or signup. Separate PDF pages or page ranges instantly using a secure, browser-based PDF splitter tool.",
  keywords: [
    "split pdf files online free",
    "split pdf online",
    "separate pdf pages",
    "split pdf by pages",
    "free pdf splitter",
    "online pdf splitter",
    "split pdf page range"
  ],
};


// ✅ viewport must be exported separately
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function SplitPDFLayout({
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
