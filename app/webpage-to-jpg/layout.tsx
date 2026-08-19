import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: " Webpage to JPG & PDF Converter | Convert Any URL to JPG or PDF Online",
  description:
    "Easily convert any webpage to JPG or PDF online for free. Just enter the URL to convert and download high-quality JPG images or PDF documents in seconds with PDFSwift.",
  keywords: [
    "webpage to jpg",
    "webpage to jpg converter free",
    "convert webpage to jpg",
    "web page to jpg",
    "website to jpg converter",
    "online webpage to jpg",
    "convert web page to jpg",
    "webpage to image converter",
    "pdfswift webpage to jpg",
  ],
  alternates: {
    canonical: "https://www.pdfswift.online/webpage-to-jpg",
  },
  openGraph: {
    title: "Webpage to JPG Converter Free – Convert Web Pages Online | PDFSwift",
    description:
      "Convert any webpage to JPG online for free with PDFSwift. Capture full web pages as high-quality JPG images instantly.",
    url: "https://www.pdfswift.online/webpage-to-jpg",
    siteName: "PDFSwift",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function WebpageToJPGLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}