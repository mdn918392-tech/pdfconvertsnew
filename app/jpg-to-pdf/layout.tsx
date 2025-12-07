import StructuredData from "./StructuredData";

export const metadata = {
  title: "JPG to PDF Converter - Fast & Free",
  description: "Convert JPG images to PDF instantly with high quality.",
  keywords: "JPG to PDF, PDF converter, image to PDF, free PDF tool, compress PDF",
};

export default function JPGToPDFLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData />
      <main>{children}</main>
    </>
  );
}
