export default function BreadcrumbSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://yourdomain.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "PDF Tools",
        item: "https://yourdomain.com/pdf-tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Rotate PDF",
        item: "https://yourdomain.com/pdf-tools/rotate-pdf",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
