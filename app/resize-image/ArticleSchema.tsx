export default function ArticleSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",

    // 🔹 Core SEO
    headline:
      "Resize Image Online – Free Image Resizer Without Losing Quality",
    description:
      "Resize JPG, PNG, and WebP images online using PDFSwift. Change image dimensions easily while maintaining quality. Fast, secure, and no signup required.",

    // 🔹 Featured Image
    image: [
      "https://pdfswift.online/images/resize-image-tool.png",
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
        url: "https://pdfswift.online/favicon.ico",
        width: 600,
        height: 60,
      },
    },

    // 🔹 Dates (ISO 8601)
    datePublished: "2026-01-20T00:00:00+05:30",
    dateModified: "2026-01-20T00:00:00+05:30",

    // 🔹 Canonical Page
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.pdfswift.online/resize-image",
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
