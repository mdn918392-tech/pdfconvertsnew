export default function WebpageToJpgSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",

    // 🔹 Core SEO
    headline: "Webpage to JPG Converter – Create High-Quality JPG Images",
    description:
      "Convert webpage content into a high-quality JPG image instantly using PDFSwift. Fast, secure, and easy to use with no installation required.",

    // 🔹 Featured Image
    image: [
      "https://pdfswift.online/images/resize-image-hero.png",
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
        url: "https://pdfswift.online/logo.png",
        width: 600,
        height: 60,
      },
    },

    // ✅ FIXED DATES (ISO 8601 + IST timezone)
    datePublished: "2026-01-20T00:00:00+05:30",
    dateModified: "2026-01-20T00:00:00+05:30",

    // 🔹 Canonical Page
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://pdfswift.online/webpage-to-jpg",
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
