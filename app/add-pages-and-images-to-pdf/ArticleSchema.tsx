export default function AddPagesImagesToPDFSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",

    name: "Add Pages and Images to PDF Online",
    description:
      "Add new pages or insert images anywhere inside your PDF using PDFSwift. Choose page position, custom page size, and add photos in any location. Free and secure tool for mobile and PC.",

    operatingSystem: "Web",
    applicationCategory: "DocumentEditor",
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
      "@id": "https://www.pdfswift.online/add-pages-and-images-to-pdf",
    },

    datePublished: "2026-02-08T00:00:00+05:30",
    dateModified: "2026-02-08T00:00:00+05:30",

    inLanguage: "en",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
