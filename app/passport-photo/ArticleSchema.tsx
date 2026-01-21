export default function PassportPhotoSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",

    name: "Passport Size Photo Maker Online",
    description:
      "Create passport size photos online for USA, India, UK, Canada & more. Choose official dimensions, background color, DPI, and multiple photo layouts. Free, fast, and print-ready.",

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
      "@id": "https://www.pdfswift.online/passport-photo",
    },

    image: [
      "https://www.pdfswift.online/images/passport-photo-tool.png",
    ],

    datePublished: "2026-01-13T00:00:00+05:30",
    dateModified: "2026-01-21T00:00:00+05:30",

    inLanguage: "en",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
