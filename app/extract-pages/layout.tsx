import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Extract PDF Pages Online Free | PDF Page Extractor | PDFSwift",

  description:
    "Extract pages from PDF online for free with PDFSwift. Select individual pages or page ranges and create a new PDF containing only the pages you need.",

  alternates: {
    canonical: "https://www.pdfswift.online/extract-pdf-pages",
  },

  openGraph: {
    title: "Extract PDF Pages Online Free | PDF Page Extractor | PDFSwift",
    description:
      "Extract pages from PDF online for free. Select individual pages or page ranges and create a new PDF with PDFSwift.",
    url: "https://www.pdfswift.online/extract-pdf-pages",
    siteName: "PDFSwift",
    type: "website",
  },
};

// Viewport must be exported separately
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
  return <main>{children}</main>;
}