import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Extract PDF Pages Online - Free, Fast & No Watermark | PDFSwif",
  description:
    "Extract or separate specific pages from your PDF files online for free. Fast, secure, and download instantly without any watermark. Try PDFSwift now",
  keywords: [
    "extract pages from pdf free",
    "extract one page from pdf",
    "pdf page extractor online",
    "remove pages from pdf free",
    "extract pdf pages without watermark",
    "extract pages from pdf online free",
    "extract single page from pdf",
    "pdf page extractor without watermark",

    "online pdf page extractor free"
  ],
};

// ✅ viewport must be exported separately
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function ExtractPDFLayout({
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
