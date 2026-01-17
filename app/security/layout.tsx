import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Security & Privacy | PDFSwift – 100% Client-Side Processing",
  description:
    "All PDF processing happens directly in your browser. Files are never uploaded, stored, or accessed by our servers.",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://pdfswift.online/security",
  },

  openGraph: {
    title: "Security & Privacy | PDFSwift",
    description:
      "100% client-side PDF processing. Your files never leave your device.",
    url: "https://pdfswift.online/security",
    siteName: "PDFSwift",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Security & Privacy | PDFSwift",
    description:
      "Your files stay on your device. No uploads. No storage.",
  },
};

/* ✅ Viewport should be exported separately */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
