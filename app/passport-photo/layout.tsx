import type { Metadata, Viewport } from "next";

/* =========================
   SEO METADATA
   ========================= */
export const metadata: Metadata = {
  title: "Passport Size Photo Maker Online Free - HD & Print Ready | PDFSwift",

  description:
    "Convert any photo into passport size online for free. Supports official visa and passport specs for all countries. Secure, fast, and no signup.",

  keywords: [
    "passport size photo maker online",
    "passport photo maker",
    "passport photo generator",
    "passport photo size India",
    "USA passport photo 2x2",
    "visa photo maker online",
    "print passport photo online"
  ],

  alternates: {
    canonical: "https://www.pdfswift.online/passport-photo",
  },

  openGraph: {
    title: "Passport Size Photo Maker Online – Free & Print Ready",
    description:
      "Create passport size photos online instantly. Official sizes, HD quality, and print-ready photos. 100% free and secure.",
    url: "https://www.pdfswift.online/passport-photo",
    siteName: "PDFSwift",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* =========================
   VIEWPORT (SEPARATE EXPORT)
   ========================= */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

/* =========================
   LAYOUT COMPONENT
   ========================= */
export default function PassportPhotoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
