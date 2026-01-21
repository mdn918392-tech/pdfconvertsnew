export default function CompressImageSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",

    name: "Compress Image Online",
    description:
      "Compress images online using PDFSwift. Reduce image file size without noticeable quality loss. Supports JPG, PNG, and WebP formats.",

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
      "@id": "https://www.pdfswift.online/compress-image",
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
