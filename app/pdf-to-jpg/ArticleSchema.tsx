export default function PdfToJpgSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",

    // 🔹 Core SEO
    headline: "Convert PDF to JPG Online – Fast & Free",
    description:
      "Easily convert PDF files to JPG images online using PDFSwift. Quickly extract high-quality images from your PDFs without any software installation.",

    // 🔹 Featured Image
    image: [
      "https://pdfswift.online/images/pdf-to-jpg-tool.png",
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
      "@id": "https://pdfswift.online/pdf-to-jpg",
    },

    // 🔹 Extra SEO Signals
    articleSection: "PDF Tools",
    keywords:
      "pdf to jpg, convert pdf to jpg online, extract images from pdf, pdfswift, free pdf to jpg converter",

    wordCount: 1100, // approximate content length
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
