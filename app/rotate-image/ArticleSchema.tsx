export default function RotateImageSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",

    name: "Rotate Image Online",
    description:
      "Rotate JPG, PNG, and WebP images online using PDFSwift. Rotate images clockwise or counter-clockwise without losing quality. Free, fast, and secure.",

    operatingSystem: "Web",
    applicationCategory: "ImageEditor",
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
      "@id": "https://www.pdfswift.online/rotate-image",
    },

    // aaj 21-01-2026 ke hisaab se
    datePublished: "2026-01-20T00:00:00+05:30",
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
