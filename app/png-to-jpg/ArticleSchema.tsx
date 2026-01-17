export default function PngToJpgSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",

    // 🔹 Core SEO
    headline: "Convert PNG to JPG Online – Free & Fast",
    description:
      "Easily convert PNG images to JPG format online using PDFSwift. Maintain image quality while reducing file size. No installation required, fast and secure.",

    // 🔹 Featured Image
    image: [
      "https://pdfswift.online/images/png-to-jpg-tool.png",
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
      "@id": "https://pdfswift.online/png-to-jpg",
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
