import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | PDFSwift – Your Data Stays on Your Device",
  description:
    "Read PDFSwift’s Privacy Policy. All PDF processing happens directly in your browser. We never upload, store, or access your files.",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://pdfswift.online/privacy",
  },

  openGraph: {
    title: "Privacy Policy | PDFSwift",
    description:
      "PDFSwift processes files locally in your browser. No uploads, no storage, complete privacy.",
    url: "https://pdfswift.online/privacy",
    siteName: "PDFSwift",
    type: "website",
    images: [
      {
        url: "https://pdfswift.online/og-privacy.png",
        width: 1200,
        height: 630,
        alt: "PDFSwift Privacy Policy",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | PDFSwift",
    description:
      "Your PDFs never leave your device. Learn how PDFSwift protects your privacy.",
    images: ["https://pdfswift.online/og-privacy.png"],
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
