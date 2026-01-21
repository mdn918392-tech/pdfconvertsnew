export default function PdfToJpgSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",

    name: "Convert PDF to JPG Online",
    description:
      "Convert PDF files to high-quality JPG images online using PDFSwift. Extract pages as images quickly, securely, and for free without installing any software.",

    operatingSystem: "Web",
    applicationCategory: "PDFConverter",
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
      "@id": "https://www.pdfswift.online/pdf-to-jpg",
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
