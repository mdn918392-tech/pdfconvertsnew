import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Rotate PDF Pages Online for Free – Fix Orientation Instantly",
  description:
    "Rotate PDF pages online free without watermark or signup. Fix upside-down or sideways pages by rotating PDFs 90°, 180°, or 270° instantly using a secure, browser-based PDF rotator tool.",
  keywords: [
    "rotate pdf pages online free",
    "rotate pdf online",
    "pdf rotator",
    "rotate pdf 90 degrees",
    "rotate pdf 180 degrees",
    "rotate pdf 270 degrees",
    "free pdf rotation tool",
    "rotate pdf pages",
    "rotate pdf without watermark",
  ],
};

// ✅ viewport must be exported separately
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
  return (
    <>
      <main>{children}</main>
    </>
  );
}
