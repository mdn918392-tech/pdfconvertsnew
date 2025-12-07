import { Metadata } from "next";
import StructuredData from "./StructuredData";

export const metadata: Metadata = {
  title: "Rotate PDF Online - Fast & Free",
  description: "Rotate PDF pages online instantly and efficiently. Change the orientation of your PDF pages in one click.",
  keywords: "rotate PDF, PDF page rotation, PDF editor, change PDF orientation, online PDF tools, free PDF tool",
};

export default function RotatePDFLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData />
      <main>{children}</main>
    </>
  );
}
