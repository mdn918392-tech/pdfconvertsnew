import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Organize PDF Pages Online - Rearrange & Merge Free | PDFSwift",

  description:
    "Organize PDF pages online for free with PDFSwift. Rearrange, delete, rotate, and combine PDF pages quickly and securely with no quality loss, watermarks, or sign-up required.",

  keywords: [
    "organize pdf pages online free",
    "rearrange pdf pages",
    "organize pdf online",
    "delete pdf pages free",
    "rotate pdf pages online",
    "combine pdf pages",
    "free pdf page organizer",
    "pdf page organizer",
    "organize pdf files online",
  ],

  alternates: {
    canonical: "/organize-pdf",
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
    url: "https://www.pdfswift.online/organize-pdf",
    title: "Organize PDF Pages Online - Rearrange & Merge Free | PDFSwift",
    description:
      "Organize PDF pages online for free. Rearrange, delete, rotate, and combine PDF pages quickly and securely with PDFSwift.",
    siteName: "PDFSwift",
  },

  twitter: {
    card: "summary_large_image",
    title: "Organize PDF Pages Online - Free | PDFSwift",
    description:
      "Rearrange, delete, rotate, and combine PDF pages online for free with PDFSwift. No watermark or sign-up required.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function OrganizePDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}