import blogData from "./data.json";

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
        url: "https://pdfswift.online/favicon.png",
      },
    },
    blogPost: blogData.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.description,
      image: blog.image,
      url: `https://pdfswift.online/blog/${blog.slug}`,
      datePublished: new Date(blog.date).toISOString(),
      dateModified: new Date(blog.date).toISOString(),
      author: {
        "@type": "Organization",
        name: "PDFSwift",
        url: "https://pdfswift.online",
      },

      publisher: {
        "@type": "Organization",
        name: "PDFSwift",
        logo: {
          "@type": "ImageObject",
          url: "https://pdfswift.online/favicon.png",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://pdfswift.online/blog/${blog.slug}`,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
