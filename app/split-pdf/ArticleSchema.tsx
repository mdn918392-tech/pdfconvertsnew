export default function SplitPdfSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Split PDF Online Free",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",

    description:
      "Split PDF files online for free. Separate PDF pages, extract page ranges, and download split PDF files instantly using PDFSwift.",

    url: "https://www.pdfswift.online/split-pdf",

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
    },

    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "125",
    },

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