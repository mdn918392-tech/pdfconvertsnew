import StructuredData from "./StructuredData";

export const metadata = {
  title: "PNG to JPG Converter - Fast & Free",
  description: "Convert PNG images to JPG instantly with high quality.",
  keywords: "PNG to JPG, image converter, PNG to JPEG, free image tool, convert PNG",
};

export default function PNGToJPGLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData />
      <main>{children}</main>
    </>
  );
}
