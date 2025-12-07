import { Metadata } from "next";
import CompressImageStructuredData from "./CompressImageStructuredData";

export const metadata: Metadata = {
  title: "Compress Images Online - Fast & Free",
  description: "Compress image files quickly and easily online without losing quality.",
  keywords: "compress image, reduce image size, optimize image, online image compression, free image compressor",
};

export default function CompressImageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CompressImageStructuredData />
      <main>{children}</main>
    </>
  );
}
