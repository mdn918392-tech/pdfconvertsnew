export default function BlogSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://pdfswift.online/blog#blog",
    name: "PDFSwift Blog",
    url: "https://pdfswift.online/blog",
    description:
      "PDFSwift Blog provides step-by-step guides, tips, and tutorials for PDF tools, image conversion, and online document utilities.",
    publisher: {
      "@type": "Organization",
      name: "PDFSwift",
      url: "https://pdfswift.online",
      logo: {
        "@type": "ImageObject",
        url: "https://pdfswift.online/logo.png",
      },
    },
    blogPost: [
      {
        "@type": "BlogPosting",
        headline: "How to Convert JPG to PDF Online",
        url: "https://pdfswift.online/blog/how-to-convert-jpg-to-pdf-online",
        datePublished: "2026-01-12",
        dateModified: "2026-01-12",
        author: {
          "@type": "Organization",
          name: "PDFSwift",
        },
      },
      {
        "@type": "BlogPosting",
        headline: "How to Convert PDF to JPG on Mobile and PC",
        url: "https://pdfswift.online/blog/how-to-convert-pdf-to-jpg",
        datePublished: "2026-01-14",
        dateModified: "2026-01-14",
        author: {
          "@type": "Organization",
          name: "PDFSwift",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
