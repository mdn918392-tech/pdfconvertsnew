import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact PDFSwift | Get in Touch with Us",
  description:
    "Contact PDFSwift for questions, feedback, suggestions, or support. We are here to help you with our fast, secure, and free online PDF tools.",

  keywords: [
    "Contact PDFSwift",
    "PDFSwift contact",
    "PDF tools support",
    "PDF converter support",
    "PDF tools feedback",
    "online PDF tools",
    "PDF support",
    "PDFSwift support",
  ],

  authors: [{ name: "PDFSwift" }],

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://pdfswift.online/contact",
  },

  openGraph: {
    type: "website",
    url: "https://pdfswift.online/contact",
    title: "Contact PDFSwift | Get in Touch with Us",
    description:
      "Have a question, suggestion, or feedback? Contact PDFSwift and get support for our fast, secure, and free PDF tools.",
    siteName: "PDFSwift",

    images: [
      {
        url: "https://pdfswift.online/images/og-image-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact PDFSwift",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact PDFSwift | Get in Touch with Us",
    description:
      "Contact PDFSwift for questions, feedback, suggestions, or support related to our free online PDF tools.",
    images: [
      "https://pdfswift.online/images/og-image-contact.jpg",
    ],
    creator: "@PDFSwift",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data: ContactPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact PDFSwift",
            url: "https://pdfswift.online/contact",
            description:
              "Contact PDFSwift for questions, feedback, suggestions, or support related to our free online PDF tools.",

            mainEntity: {
              "@type": "Organization",
              name: "PDFSwift",
              url: "https://pdfswift.online",
              logo: {
                "@type": "ImageObject",
                url: "https://pdfswift.online/favicon.ico",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "pdfswift94@gmail.com",
                contactType: "customer support",
                availableLanguage: [
                  "English",
                  "Hindi",
                ],
              },
            },
          }),
        }}
      />

      {children}
    </>
  );
}