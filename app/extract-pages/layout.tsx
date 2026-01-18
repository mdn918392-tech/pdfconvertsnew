import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Extract Pages from PDF Online Free – No Watermark (2026)",
  description:
    "Extract pages from PDF online free without watermark or signup. Secure browser-based PDF page extractor to extract one or multiple pages instantly with complete privacy.",
  keywords: [
    "extract pages from pdf free",
    "extract one page from pdf",
    "pdf page extractor online",
    "remove pages from pdf free",
    "extract pdf pages without watermark",
    "extract pages from pdf online free",
    "extract single page from pdf",
    "pdf page extractor without watermark",

    "online pdf page extractor free"
  ],
};

// ✅ viewport must be exported separately
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function ExtractPDFLayout({
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
