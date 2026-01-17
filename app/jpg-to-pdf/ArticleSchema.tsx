export default function JpgToPdfSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",

    // 🔹 Core SEO
    headline: "Convert JPG to PDF Online – Quick & Free",
    description:
      "Easily convert JPG images to PDF online using PDFSwift. Fast, secure, and free tool to convert multiple images into a single PDF document without losing quality.",

    // 🔹 Featured Image
    image: [
      "https://pdfswift.online/images/jpg-to-pdf.png",
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

    // ✅ FIXED DATES (ISO 8601 + timezone)
    datePublished: "2026-01-13T00:00:00+05:30",
    dateModified: "2026-01-17T00:00:00+05:30",

    // 🔹 Canonical Page
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://pdfswift.online/jpg-to-pdf",
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
