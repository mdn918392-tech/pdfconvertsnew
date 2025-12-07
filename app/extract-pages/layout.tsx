import { Metadata } from "next";
import StructuredData from "./StructuredData";

export const metadata: Metadata = {
  title: "Extract PDF Pages Online - Fast & Free",
  description: "Extract pages from PDF files quickly and easily online. Select specific pages and download instantly.",
  keywords: "extract PDF pages, split PDF, PDF page extraction, online PDF tools, free PDF extractor",
};

export default function ExtractPDFLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData />
      <main>{children}</main>
    </>
  );
}
