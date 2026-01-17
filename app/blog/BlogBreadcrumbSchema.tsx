function BlogBreadcrumbSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://pdfswift.online",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: "https://pdfswift.online/blog",
            },
          ],
        }),
      }}
    />
  );
}
