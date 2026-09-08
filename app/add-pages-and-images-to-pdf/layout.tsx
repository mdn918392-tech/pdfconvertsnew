import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Add Pages & Images to PDF Online Free | PDFSwift",
  description:
    "Add pages to your PDF online free — insert blank pages or images anywhere, before or after any page. Fast, secure, browser-based tool with instant download.",

 keywords: [
 "add pages to pdf",
    "add page to pdf",
    "add pages to pdf online",
    "add pages to pdf free",
    "insert pages in pdf",
    "add pages to pdf file",
],


  alternates: {
    canonical: "https://www.pdfswift.online/add-pages-to-pdf",
  },

  openGraph: {
    title: "Add Pages & Images to PDF Online Free | PDFSwift",
    description:
      "Insert pages and add images anywhere inside your PDF online. Free, fast, secure, and no signup required.",
    url: "https://www.pdfswift.online/add-pages-to-pdf",
    siteName: "PDFSwift",
    type: "website",
    images: [
      {
        url: "https://www.pdfswift.online/images/add-pages-to-pdf.png",
        width: 1200,
        height: 630,
        alt: "Add Pages & Images to PDF - PDFSwift",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Add Pages & Images to PDF Online Free | PDFSwift",
    description:
      "Add extra pages and insert images in PDF online instantly. 100% secure browser-based tool.",
    images: ["https://www.pdfswift.online/images/add-pages-to-pdf.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function AddPagesToPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
