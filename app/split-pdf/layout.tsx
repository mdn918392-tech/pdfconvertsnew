import { Metadata, Viewport } from "next";
import StructuredData from "./StructuredData";

export const metadata: Metadata = {
  title: "Split PDF Online - Fast & Free",
  description: "Split PDF pages instantly and efficiently online.",
  keywords: "split PDF, PDF editor, PDF page extraction, free PDF tool, online PDF tools",
};

// ✅ viewport हमेशा अलग export किया जाता है
export const viewport: Viewport = {
  themeColor: "#ffffff",
  // width: "device-width",
  // initialScale: 1,
};

export default function SplitPDFLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData />
      <main>{children}</main>
    </>
  );
}
