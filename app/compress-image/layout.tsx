import type { Metadata, Viewport } from "next";
import CompressImageStructuredData from "./CompressImageStructuredData"; // <-- यह जोड़ना जरूरी है

export const metadata: Metadata = {
  title: "Compress Images Online - Fast & Free",
  description: "Compress image files quickly and easily online without losing quality.",
  keywords:
    "compress image, reduce image size, optimize image, online image compression, free image compressor",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function CompressImageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CompressImageStructuredData />
      <main>{children}</main>
    </>
  );
}
