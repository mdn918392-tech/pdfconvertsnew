import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Split PDF Online Free – Separate & Remove PDF Pages | PDFSwift",
  description:
    "Split PDF online for free with PDFSwift. Easily separate PDF pages, extract specific page ranges, or remove unwanted pages instantly using a secure browser-based PDF splitter without watermarks.",
  keywords: [
    "split pdf online free",
    "pdf page remover",
    "how to split pdf pages",
    "remove pages from pdf",
    "separate pdf pages",
    "pdf splitter online",
    "split pdf by pages",
    "extract pages from pdf",
    "pdfswift split pdf",
  ],
  alternates: {
    canonical: "https://www.pdfswift.online/split-pdf",
  },
  openGraph: {
    title: "Split PDF Online Free – Separate & Remove PDF Pages | PDFSwift",
    description:
      "Separate PDF pages, extract page ranges, or remove pages online for free using PDFSwift's secure browser-based PDF splitter.",
    url: "https://www.pdfswift.online/split-pdf",
    siteName: "PDFSwift",
    type: "website",
  },
};

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
  return <main>{children}</main>;
}