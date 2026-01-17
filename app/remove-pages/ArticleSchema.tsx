export default function RemovePagesSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",

    // 🔹 Core SEO
    headline: "Remove Pages from PDF Online – Free & Secure Tool",
    description:
      "Easily remove unwanted pages from PDF files online. Delete single or multiple pages instantly without losing quality. Fast, secure, and free PDF page remover.",

    // 🔹 Featured Image
    image: [
      "https://pdfswift.online/images/remove-pages-pdf-tool.png",
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

    // ✅ FIXED DATES (ISO 8601 + IST timezone)
    datePublished: "2026-01-13T00:00:00+05:30",
    dateModified: "2026-01-17T00:00:00+05:30",

    // 🔹 Canonical Page
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://pdfswift.online/remove-pages",
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
