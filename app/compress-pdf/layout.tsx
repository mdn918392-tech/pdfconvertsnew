import { Metadata } from "next";
import StructuredData from "./StructuredData";

export const metadata: Metadata = {
   title: "Compress PDF Online - Fast & Free",
  description: "Compress PDF files quickly and easily online without losing quality.",
  keywords: "compress PDF, reduce PDF size, optimize PDF, PDF compression online",
};

export default function SplitPDFLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData />
      <main>{children}</main>
    </>
  );
}
