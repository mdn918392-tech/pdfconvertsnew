import type { Metadata, Viewport } from "next";


export const metadata: Metadata = {
  title: "Remove Pages from PDF Online – Free PDF Page Remover",
  description:
    "Remove unwanted pages from PDF files online quickly and securely. Delete specific PDF pages and download a new PDF instantly using a free, browser-based tool — no signup required.",
  keywords: [
  "remove pages from PDF online",
  "delete PDF pages",
  "PDF page remover",
  "remove unwanted pages from PDF",
  "free PDF page remover",
  "edit PDF pages online",
  "browser based PDF tool",
  "secure PDF editor"
]

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
