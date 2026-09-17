import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Rotate PDF Pages Online Free – Fix PDF Orientation | PDFSwift",

  description:
    "Rotate PDF pages online for free with PDFSwift. Easily fix upside-down or sideways pages by rotating PDFs 90, 180, or 270 degrees. Securely adjust your PDF pages instantly without watermarks.",

  keywords: [
    "rotate pdf pages online free",
    "rotate pdf online",
    "pdf rotator",
    "rotate pdf 90 degrees",
    "rotate pdf 180 degrees",
    "rotate pdf 270 degrees",
    "change pdf page orientation",
    "rotate pdf pages permanently",
    "free pdf rotation tool",
    "rotate pdf online free",
  ],

  alternates: {
    canonical: "/rotate-pdf",
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
    type: "website",
    url: "https://www.pdfswift.online/rotate-pdf",
    title: "Rotate PDF Pages Online Free | PDFSwift",
    description:
      "Rotate PDF pages online for free. Fix upside-down or sideways PDF pages by rotating them 90, 180, or 270 degrees with PDFSwift.",
    siteName: "PDFSwift",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rotate PDF Pages Online Free | PDFSwift",
    description:
      "Rotate PDF pages online for free with PDFSwift. Fix PDF orientation quickly with no watermark.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RotatePDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}