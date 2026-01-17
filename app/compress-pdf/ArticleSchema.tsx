export default function ArticleSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",

    // 🔹 Core SEO
    headline:
      "Compress PDF Online – Reduce PDF File Size Without Losing Quality",
    description:
      "Compress PDF files online quickly and securely using PDFSwift. Reduce PDF file size without noticeable quality loss. Free, fast, and privacy-focused PDF compression tool.",

    // 🔹 Featured Image
    image: [
      "https://pdfswift.online/images/compress-pdf.png",
    ],

    // 🔹 Author
    author: {
      "@type": "Organization",
      name: "PDFSwift",
      url: "https://pdfswift.online",
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

    // 🔹 Dates (ISO 8601 with timezone – REQUIRED FORMAT)
    datePublished: "2026-01-13T00:00:00+05:30",
    dateModified: "2026-01-17T00:00:00+05:30",

    // 🔹 Canonical Page
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://pdfswift.online/compress-pdf",
    },

    // 🔹 Language
    inLanguage: "en",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
