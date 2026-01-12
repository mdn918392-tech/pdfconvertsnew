export default function BreadcrumbSchema() {
  const data = {
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
        position: 3,
        name: "Extract Pages from PDF",
        item: "https://pdfswift.online/extract-pages",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
