export default function BreadcrumbSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.pdfswift.online",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Filter PDF",
        item: "https://www.pdfswift.online/pdf-filter", 
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