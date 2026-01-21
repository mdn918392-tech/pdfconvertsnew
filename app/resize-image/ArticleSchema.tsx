export default function ResizeImageSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Resize Image Online",
    description:
      "Resize JPG, PNG, and WebP images online using PDFSwift. Change image dimensions without losing quality. Fast, secure, and no signup required.",
    operatingSystem: "Web",
    applicationCategory: "ImageEditor",
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
      "@id": "https://www.pdfswift.online/resize-image",
    },
   datePublished: "2026-01-20T00:00:00+05:30",
  dateModified: "2026-01-21T00:00:00+05:30",

  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
