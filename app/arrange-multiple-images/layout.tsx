import type { Metadata, Viewport } from "next";

/* =========================
   SEO METADATA
   ========================= */
export const metadata: Metadata = {
  title: "Arrange Multiple Images on One Page Online | PDFSwift",

  description:
    "Arrange multiple images on one page online for free. Upload, move, resize, rotate, and organize photos on A4, A3, or custom-size sheets, then export as PDF, JPG, or PNG.",

  keywords: [
    "arrange multiple images on one page",
    "arrange multiple images online",
    "multiple images on one page",
    "put multiple images on one page",
    "multiple photos on one page",
    "create image sheet online",
    "custom image layout online",
    "arrange photos on A4 sheet",
    "multiple images on A4 page",
    "image layout maker",
  ],

  alternates: {
    canonical: "https://www.pdfswift.online/arrange-multiple-images",
  },

  openGraph: {
    title: "Arrange Multiple Images on One Page Online | PDFSwift",
    description:
      "Upload multiple images and create your own custom layout. Move, resize, rotate, and arrange photos on A4, A3, or custom-size pages, then export as PDF, JPG, or PNG.",
    url: "https://www.pdfswift.online/arrange-multiple-images",
    siteName: "PDFSwift",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* =========================
   VIEWPORT
   ========================= */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

/* =========================
   LAYOUT COMPONENT
   ========================= */
export default function ArrangeMultipleImagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}