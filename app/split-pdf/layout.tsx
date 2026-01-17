import type { Metadata, Viewport } from "next";


export const metadata: Metadata = {
  title: "Split PDF Files Online for Free – Separate Pages Instantly",
  description:
    "Split PDF files online for free quickly and securely. Separate specific pages or page ranges and download a new PDF instantly using a browser-based tool — no signup required.",
  keywords: [
  "split PDF files online",
  "split PDF online",
  "separate PDF pages",
  "extract pages from PDF",
  "split PDF by pages",
  "free PDF splitter",
  "online PDF splitter",
  "split PDF page range",
  "secure PDF splitting tool",
  "browser based PDF tool"
]

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
