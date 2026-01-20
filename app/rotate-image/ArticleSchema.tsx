export default function RotateImageSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",

    // 🔹 Core SEO
    headline: "Rotate Image Online – Rotate JPG, PNG & WebP Free",
    description:
      "Rotate images online for free using PDFSwift. Easily rotate JPG, PNG, and WebP images clockwise or counter-clockwise without losing quality. No signup required.",

    // 🔹 Featured Image
    image: [
      "https://pdfswift.online/images/rotate-image-tool.png",
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

    // ✅ Dates (ISO 8601 + IST)
    datePublished: "2026-01-20T00:00:00+05:30",
    dateModified: "2026-01-20T00:00:00+05:30",

    // 🔹 Canonical Page
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://pdfswift.online/rotate-image",
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
