import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Webpage to JPG Online Free | PDFSwift",
  description:
    "Convert webpages to JPG online for free with PDFSwift. Capture webpage content as a high-quality JPG image quickly and easily in your browser.",

  alternates: {
    canonical: "https://www.pdfswift.online/webpage-to-jpg",
  },

  openGraph: {
    title: "Webpage to JPG Online Free | PDFSwift",
    description:
      "Convert webpages to JPG online for free with PDFSwift. Capture webpage content as a high-quality JPG image quickly and easily.",
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