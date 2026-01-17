import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About PDFSwift | Fast, Secure & Free PDF Tools",
  description:
    "Learn about PDFSwift's mission to provide fast, secure, and completely free PDF tools. No subscriptions, no watermarks, no file size limits, and no sign-ups required.",
   keywords: [
    "PDF tools",
    "PDF converter",
    "PDF editor",
    "free PDF tools",
    "secure PDF processing",
    "document management",
    "online PDF tools",
    "PDF utilities",
    "PDFSwift",
  ],
  authors: [{ name: "PDFSwift" }],
  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://pdfswift.online/about",
  },

  openGraph: {
    type: "website",
    url: "https://pdfswift.online/about",
    title: "About PDFSwift | Fast, Secure & Free PDF Tools",
    description:
      "Discover PDFSwift – fast, secure, and free PDF tools built for everyone. No sign-ups, no limits.",
    siteName: "PDFSwift",
    images: [
      {
        url: "https://pdfswift.online/images/og-image-about.jpg",
        width: 1200,
        height: 630,
        alt: "About PDFSwift",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About PDFSwift | Fast, Secure & Free PDF Tools",
    description:
      "PDFSwift provides fast, secure, and free online PDF tools with no watermarks or limits.",
    images: ["https://pdfswift.online/images/og-image-about.jpg"],
    creator: "@PDFSwift",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data: AboutPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About PDFSwift",
            url: "https://pdfswift.online/about",
            description:
              "PDFSwift provides fast, secure, and free PDF tools for everyone.",
            publisher: {
              "@type": "Organization",
              name: "PDFSwift",
              url: "https://pdfswift.online",
              logo: {
                "@type": "ImageObject",
                url: "https://pdfswift.online/favicon.ico",
              },
            },
          }),
        }}
      />

      {children}
    </>
  );
}
