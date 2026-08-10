export default function OrganizePdfSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",

    name: "Organize PDF Online",
    description:
      "Organize PDF pages online for free using PDFSwift. Reorder, rotate, delete, and reverse PDF pages easily without installing any software.",

    operatingSystem: "Web",
    applicationCategory: "UtilitiesApplication",
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
      "@id": "https://www.pdfswift.online/organize-pdf",
    },

    datePublished: "2026-01-13T00:00:00+05:30",
    dateModified: "2026-08-10T00:00:00+05:30",

    inLanguage: "en",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}