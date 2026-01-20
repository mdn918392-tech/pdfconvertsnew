import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Passport Size Photo Maker Online – Free, HD & Print Ready | PDFSwift",

  description:
    "Create passport size photos online instantly with PDFSwift. Choose official sizes for USA, India, UK, Canada & more. Select background color, DPI, and layouts to print multiple photos per page. Free, secure, and no signup required.",

  keywords: [
    "passport size photo maker online",
    "passport photo generator",
    "passport photo size online",
    "USA passport photo 2x2",
    "India passport photo 35x35 mm",
    "visa photo maker online",
    "print passport photo online",
    "passport photo background white",
    "HD passport photo creator"
  ],
};

// ✅ viewport must be exported separately
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function PassportPhotoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
