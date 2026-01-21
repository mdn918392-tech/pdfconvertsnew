export default function RotatePdfSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",

    name: "Rotate PDF Online",
    description:
      "Rotate PDF pages online using PDFSwift. Easily rotate PDFs clockwise or counter-clockwise without installing any software. Free, fast, and secure.",

    operatingSystem: "Web",
    applicationCategory: "PDFEditor",
    isAccessibleForFree: true,

    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },

    publisher: {
      "@type": "Organization",
      name: "PDFSwift",
      url: "https://www.pdfswift.online",
      logo: {
        "@type": "ImageObject",
        url: "https://www.pdfswift.online/logo.png",
        width: 512,
        height: 512,
      },
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.pdfswift.online/rotate-pdf",
    },

    // aaj 21-01-2026 ke hisaab se
    datePublished: "2026-01-13T00:00:00+05:30",
    dateModified: "2026-01-21T00:00:00+05:30",

    inLanguage: "en",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
