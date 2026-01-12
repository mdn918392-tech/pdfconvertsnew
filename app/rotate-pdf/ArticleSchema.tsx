export default function RotatePdfSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",

    // 🔹 Core SEO
    headline: "Rotate PDF Online – Free & Fast",
    description:
      "Rotate PDF pages online easily with PDFSwift. Quickly rotate your PDF clockwise or counterclockwise without installing any software.",

    // 🔹 Featured Image
    image: [
      "https://pdfswift.online/images/rotate-pdf-tool.png",
    ],

    // 🔹 Author
    author: {
      "@type": "Organization",
      name: "PDFSwift",
    },

 // 🔹 Canonical Page
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://pdfswift.online/rotate-pdf",
    },
    // 🔹 Publisher
    publisher: {
      "@type": "Organization",
      name: "PDFSwift",
      logo: {
        "@type": "ImageObject",
        url: "https://pdfswift.online/favicon.png",
        width: 600,
        height: 60,
      },
    },

    // 🔹 Dates
    datePublished: "2026-01-13",
    dateModified: "2026-01-13",

    // 🔹 Extra SEO Signals
    articleSection: "PDF Tools",
    keywords:
      "rotate pdf, rotate pdf pages online, pdf page rotation, free pdf tool, pdfswift",

    wordCount: 1100,
    timeRequired: "PT3M",
    inLanguage: "en",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
