export default function ArticleSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",

    headline:
      "Compress Image Online – Reduce Image Size Without Losing Quality",
    description:
      "Compress images online quickly and securely using PDFSwift. Reduce image size without noticeable quality loss. Supports JPG, PNG, and WebP formats.",

    image: [
      "https://pdfswift.online/images/compress-image-tool.png",
    ],

    author: {
      "@type": "Organization",
      name: "PDFSwift",
      url: "https://pdfswift.online",
    },

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

    // ✅ FIXED DATES
    datePublished: "2026-01-13T00:00:00+05:30",
    dateModified: "2026-01-17T00:00:00+05:30",

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://pdfswift.online/compress-image",
    },

    inLanguage: "en",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
