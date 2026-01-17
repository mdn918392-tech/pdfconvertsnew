import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "PDFSwift Blog – PDF Tips, Guides & Tutorials",
    template: "%s | PDFSwift Blog",
  },
  description:
    "Explore the PDFSwift Blog for expert PDF tips, step-by-step guides, and practical tutorials on JPG to PDF, PDF to JPG, compression, merging, and more. Stay updated with the latest online PDF tools, smart document solutions, and productivity tips for mobile and desktop users.",
  keywords: [
     "PDFSwift blog",
  "PDF blog",
  "PDF tips and tricks",
  "PDF tutorials",
  "PDF how to guides",
  "online PDF tools",
  "PDF conversion tips",
  "JPG to PDF guide",
  "PDF to JPG guide",
  "document conversion tips",
  ],
  alternates: {
    canonical: "https://pdfswift.online/blog",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "PDFSwift Blog – PDF Tips, Guides & Tutorials",
    description:
      "Read helpful PDF tutorials and conversion guides on the PDFSwift Blog. Learn how to work with PDFs efficiently on mobile and PC.",
    url: "https://pdfswift.online/blog",
    siteName: "PDFSwift",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDFSwift Blog – PDF Tips & Guides",
    description:
      "Step-by-step PDF guides, image conversion tutorials, and document tips from the PDFSwift Blog.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      role="main"
      className="min-h-screen bg-white text-gray-900"
    >
      {children}
    </main>
  );
}
