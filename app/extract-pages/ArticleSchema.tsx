export default function ExtractPagesSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",

    name: "Extract Pages from PDF Online",
    description:
      "Extract pages from PDF files online using PDFSwift. Split PDFs into individual pages or custom ranges securely and quickly.",

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
      "@id": "https://www.pdfswift.online/extract-pages",
    },

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
