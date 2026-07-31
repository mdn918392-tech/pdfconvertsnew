export default function FilterPdfSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",

    name: "Filter PDF Online",

    description:
      "Filter PDF files online for free using PDFSwift. Apply Grayscale, Sepia, Invert, Black & White, Vintage, Warm, Cool, Oil Paint, and Neon effects with live preview. Download your filtered PDF as a single file or individual PDFs in ZIP.",

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
      "@id": "https://www.pdfswift.online/pdf-filter",
    },

    featureList: [
      "Apply PDF filters online",
      "Grayscale PDF filter",
      "Sepia PDF filter",
      "Invert PDF colors",
      "Live PDF filter preview",
      "Download filtered PDF",
      "Download individual PDF pages",
      "ZIP export option",
      "No watermark",
    ],

    datePublished: "2026-07-31T00:00:00+05:30",
    dateModified: "2026-07-31T00:00:00+05:30",

    inLanguage: "en",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}