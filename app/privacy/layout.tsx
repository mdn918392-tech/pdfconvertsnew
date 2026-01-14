import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | PDFSwift – Your Data Stays on Your Device",
  description:
    "Read PDFSwift’s Privacy Policy. All PDF processing happens directly in your browser. We never upload, store, or access your files.",
  keywords: [
    "PDF privacy policy",
    "browser based PDF processing",
    "client side PDF tools",
    "no file upload",
    "PDF data security",
    "GDPR compliant PDF tool",
    "PDFSwift privacy"
  ],
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "https://pdfswift.app/privacy"
  },
  openGraph: {
    title: "Privacy Policy | PDFSwift",
    description:
      "PDFSwift processes files locally in your browser. No uploads, no storage, complete privacy.",
    url: "https://pdfswift.app/privacy",
    siteName: "PDFSwift",
    type: "website",
    images: [
      {
        url: "https://pdfswift.app/og-privacy.jpg",
        width: 1200,
        height: 630,
        alt: "PDFSwift Privacy Policy"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | PDFSwift",
    description:
      "Your PDFs never leave your device. Learn how PDFSwift protects your privacy.",
    images: ["https://pdfswift.app/og-privacy.jpg"]
  }
};

export default function PrivacyLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* WebPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Policy – PDFSwift",
            url: "https://pdfswift.online/privacy",
            description:
              "PDFSwift Privacy Policy. Files are processed locally in the browser and never uploaded or stored.",
            publisher: {
              "@type": "Organization",
              name: "PDFSwift",
              url: "https://pdfswift.online"
            }
          })
        }}
      />

      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://pdfswift.online"
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Privacy Policy",
                item: "https://pdfswift.online/privacy"
              }
            ]
          })
        }}
      />

      {children}
    </>
  );
}
