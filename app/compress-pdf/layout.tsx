import type { Metadata, Viewport } from "next";
import StructuredData from "./StructuredData";

export const metadata: Metadata = {
  title: "Compress PDF Online - Fast & Free",
  description: "Compress PDF files quickly and easily online without losing quality.",
  keywords: "compress PDF, reduce PDF size, optimize PDF, PDF compression online",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function CompressPDFLayout({
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
