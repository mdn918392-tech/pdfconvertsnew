interface ArticleSchemaProps {
  title: string;
  description: string;
  image: string;
  slug: string;
}

export default function ArticleSchema({
  title,
  description,
  image,
  slug,
}: ArticleSchemaProps) {
  const canonicalUrl = `https://pdfswift.online/${slug}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "Article",

    // 🔹 Core
    headline: title,
    description: description,
    image: [image],

    // 🔹 Canonical URL (IMPORTANT)
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },

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

    articleSection: "PDF Tools",
    inLanguage: "en",

    datePublished: "2026-01-13",
    dateModified: "2026-01-13",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
