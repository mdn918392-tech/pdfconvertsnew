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
        name: "PDF to JPG",
        item: "https://www.pdfswift.online/pdf-to-jpg",
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
