export default function ArrangeMultipleImagesSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",

    name: "Arrange Multiple Images Online",
    description:
      "Arrange multiple images on one page online. Upload photos, freely move, resize, rotate, and organize each image on A4, A3, or custom-size sheets. Export your custom image layout as PDF, JPG, or PNG.",

    operatingSystem: "Web",
    applicationCategory: "MultimediaApplication",
    isAccessibleForFree: true,

    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },

    publisher: {
      "@type": "Organization",
      name: "PDFSwift",
      url: "https://www.pdfswift.online",
      logo: {
        "@type": "ImageObject",
        url: "https://www.pdfswift.online/logo.png",
        width: 512,
        height: 512,
      },
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.pdfswift.online/arrange-multiple-images",
    },

    image: [
      "https://www.pdfswift.online/images/arrange-multiple-images-tool.png",
    ],

    datePublished: "2026-08-26T00:00:00+05:30",
    dateModified: "2026-08-26T00:00:00+05:30",

    inLanguage: "en",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}