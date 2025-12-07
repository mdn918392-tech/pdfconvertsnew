import type { Metadata, Viewport } from "next";
import StructuredData from "./StructuredData";

export const metadata: Metadata = {
  title: "Remove Pages from PDF Online - Fast & Free",
  description:
    "Remove specific pages from PDF files online instantly and efficiently.",
  keywords:
    "remove PDF pages, delete PDF pages, PDF editor, PDF page removal, online PDF tools, free PDF tool",
};

// ✅ viewport must be exported separately
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RemovePagesPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData />
      <main>{children}</main>
    </>
  );
}
