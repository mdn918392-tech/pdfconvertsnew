export default function PassportPhotoBreadcrumbSchema() {
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
        name: "Passport Size Photo",
        item: "https://pdfswift.online/passport-photo",
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
