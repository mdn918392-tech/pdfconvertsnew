import StructuredData from "./StructuredData";

export const metadata = {
  title: "PDF to JPG Converter - Fast & Free",
  description: "Convert PDF pages to JPG images instantly with high quality.",
  keywords:
    "PDF to JPG, PDF converter, extract images, pdf to image, free PDF tool, convert PDF",
};

export default function PDFToJPGLayout({
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
