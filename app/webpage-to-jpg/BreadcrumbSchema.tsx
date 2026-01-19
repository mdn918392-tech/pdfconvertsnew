export default function WebpageToJPGBreadcrumbSchema() {
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
        name: "Webpage to JPG",
        item: "https://pdfswift.online/webpage-to-jpg",
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
