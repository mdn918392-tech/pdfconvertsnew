import type { Metadata, Viewport } from "next";
import PNGtoJPGHowToSchema from "./HowToSchema";
import PNGtoJPGFAQSchema from "./FAQSchema";
import PNGtoJPGBreadcrumbSchema from "./BreadcrumbSchema";

export const metadata: Metadata = {
  title: "PNG to JPG Converter – Fast & Free",
  description:
    "Convert PNG images to JPG format instantly with high quality and secure processing.",
  keywords:
    "PNG to JPG, image converter, PNG converter, JPG converter, free image tool, convert PNG to JPG",
};

// ✅ viewport must be exported separately
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function PNGtoJPGLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Tool-specific schemas */}
      <PNGtoJPGHowToSchema />
      <PNGtoJPGFAQSchema />
      <PNGtoJPGBreadcrumbSchema />

      <main>{children}</main>
    </>
  );
}
