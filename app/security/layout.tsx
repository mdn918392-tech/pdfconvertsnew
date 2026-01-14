import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security & Privacy | 100% Client-Side PDF Processing",
  description:
    "Learn how we protect your privacy. All PDF processing happens locally in your browser. Your files are never uploaded, stored, or accessed by our servers.",
  keywords: [
    "PDF security",
    "privacy",
    "client-side PDF processing",
    "browser based PDF tools",
    "no file upload",
    "secure PDF tools",
    "offline PDF processing"
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Security & Privacy | Client-Side PDF Tools",
    description:
      "Your files stay on your device. All PDF processing happens locally in your browser with zero uploads.",
    url: "https://pdfswitf.online/security",
    siteName: "PDF swift",
    type: "website",
    images: [
      {
        url: "https://i.ibb.co/wrgZZrSc/Screenshot-2026-01-14-125828.png",
        width: 1200,
        height: 630,
        alt: "PDF Security and Privacy"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Security & Privacy | PDF Tools",
    description:
      "100% client-side PDF processing. No uploads. No storage. Full privacy.",
    images: ["https://i.ibb.co/6b6FJtD/mergepdf.png"]
  },
  alternates: {
    canonical: "https://pdfswift.online/security"
  }
};

export default function SecurityLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Security & Privacy",
            description:
              "All PDF processing happens locally in your browser. Files are never uploaded or stored.",
            url: "https://pdfswift.online/security",
            publisher: {
              "@type": "Organization",
              name: "PDF Tools",
              description: "Privacy-focused, browser-based PDF tools"
            }
          })
        }}
      />

      {children}
    </>
  );
}
