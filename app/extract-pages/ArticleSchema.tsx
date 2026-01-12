export default function ExtractPagesSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",

    // 🔹 Core SEO
    headline: "Extract Pages from PDF Online – Split PDF Quickly",
    description:
      "Extract pages from PDF online easily with PDFSwift. Split PDF files into individual pages or custom ranges quickly and securely.",

    // 🔹 Featured Image
    image: [
      "https://pdfswift.online/images/Extractor-Tool.png",
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
      "@id": "https://pdfswift.online/extract-pages",
    },

    // 🔹 Extra SEO Signals
    articleSection: "PDF Tools",
    keywords:
      "extract pages from pdf, split pdf online, pdf page extractor, pdfswift",

    wordCount: 1200, // approximate word count for your article
    timeRequired: "PT4M",
    inLanguage: "en",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
