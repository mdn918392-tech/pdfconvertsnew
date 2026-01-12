export default function ArticleSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",

    // 🔹 Core SEO
    headline: "Compress Image Online – Reduce Image Size Without Losing Quality",
    description:
      "Compress images online quickly and securely using PDFSwift. Reduce image size without noticeable quality loss. Supports JPG, PNG, and WebP formats.",

    // 🔹 Featured Image
    image: [
      "https://pdfswift.online/images/compress-image-tool.png",
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

    // 🔹 Dates (Project launch date)
    datePublished: "2026-01-13",
    dateModified: "2026-01-13",

    // 🔹 Canonical Page
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://pdfswift.online/compress-image",
    },

    // 🔹 Extra SEO Signals
    articleSection: "Image Tools",
    keywords:
      "compress image, image compressor online, reduce image size, compress jpg png webp, pdfswift",

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
