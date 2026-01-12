export default function ArticleSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",

    // 🔹 Core SEO
    headline: "Merge PDF Online – Combine PDF Files for Free",
    description:
      "Merge multiple PDF files into one document online quickly and securely using PDFSwift. Free, fast, and privacy-focused PDF merger tool.",

    // 🔹 Featured Image (important for rich results)
    image: [
      "https://pdfswift.online/images/merge-pdf-tool.png",
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

    // 🔹 Dates
    datePublished: "2024-01-12",
    dateModified: "2024-01-12",

    // 🔹 Canonical Page
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://pdfswift.online/merge-pdf",
    },

    // 🔹 Extra SEO Signals
    articleSection: "PDF Tools",
    keywords:
      "merge pdf, combine pdf files, pdf merger online, free pdf merge tool, pdfswift",

    wordCount: 1200,
    timeRequired: "PT5M",
    inLanguage: "en",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
