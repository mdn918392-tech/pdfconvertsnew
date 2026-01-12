export default function SplitPdfSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",

    // 🔹 Core SEO
    headline: "Split PDF Online – Extract Pages Fast & Free",
    description:
      "Split PDF files online easily with PDFSwift. Extract specific pages or split PDFs into multiple files quickly and securely without installing any software.",

    // 🔹 Featured Image
    image: [
      "https://pdfswift.online/images/split-pdf-tool.png",
    ],

    // 🔹 Author
    author: {
      "@type": "Organization",
      name: "PDFSwift",
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
    // 🔹 Canonical Page
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://pdfswift.online/split-pdf",
    },

    // 🔹 Dates
    datePublished: "2026-01-13",
    dateModified: "2026-01-13",

    // 🔹 Extra SEO Signals
    articleSection: "PDF Tools",
    keywords:
      "split pdf, split pdf online, extract pdf pages, pdf page splitter, free pdf tool, pdfswift",

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
