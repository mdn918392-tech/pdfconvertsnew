import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Organize PDF Pages Online - Rearrange & Merge Free | PDFSwift",
  description:
    "Organize PDF pages online for free. Rearrange, delete, rotate, and combine PDF pages quickly and securely with no quality loss, watermarks, or sign-up required.",
  keywords: [
    "organize pdf pages online free",
    "rearrange pdf pages",
    "organize pdf online",
    "delete pdf pages free",
    "rotate pdf pages online",
    "free pdf page organizer",
    "pdf swift organize"
  ],
};

// ✅ viewport must be exported separately
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
  return (
    <>
      <main>{children}</main>
    </>
  );
}