export default function PNGtoJPGBreadcrumbSchema() {
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
        position: 2,
        name: "Image Tools",
        item: "https://pdfswift.online/png-to-jpg",
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
