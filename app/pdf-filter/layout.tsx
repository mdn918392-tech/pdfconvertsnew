import type { Metadata, Viewport } from "next";
import HowToSchema from "./HowToSchema";
import ArticleSchema from "./ArticleSchema";

export const metadata: Metadata = {
  title: "PDF Filter Online Free - Grayscale & More | PDFSwift",

  description:"Filter PDF online for free. Apply Grayscale, Sepia, Invert, Black & White, Vintage, Warm, Cool, Oil Paint and Neon effects. Preview your filtered PDF before downloading, then download as a single PDF file or individual PDFs in ZIP.",

  keywords: [
    "filter pdf online",
    "pdf filter online",
    "apply filter to pdf",
    "apply filter to pdf free",
    "pdf color filter",
    "pdf photo filter",
    "convert pdf to grayscale",
    "black and white pdf",
    "invert pdf colors online",
    "pdf sepia filter",
    "pdf vintage filter",
    "pdf oil paint filter",
    "pdf neon filter",
    "pdf visual effects online",
    "live preview pdf filter",
    "download filtered pdf",
    "export filtered pdf pages",
    "pdf filter converter"
  ],

  alternates: {
    canonical: "https://www.pdfswift.online/pdf-filter",
  },

  openGraph: {
    title: "Filter PDF Online Free - Apply Effects | PDFSwift",
    description:
      "Apply Grayscale, Sepia, Invert, Vintage, Warm, Cool, Oil Paint and Neon filters to PDF with live preview. Download a single filtered PDF or individual PDF pages in ZIP.",
    url: "https://www.pdfswift.online/pdf-filter",
    siteName: "PDFSwift",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function FilterPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data */}
      <HowToSchema />
      <ArticleSchema />

      <main>{children}</main>
    </>
  );
}