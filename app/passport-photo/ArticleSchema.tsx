export default function PassportPhotoSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebApplication",

    // 🔹 App Info
    name: "Passport Size Photo Maker Online",
    description:
      "Create passport size photos online for USA, India, UK, Canada & more. Choose official dimensions, background color, DPI and multiple photo layouts. Free, fast & print-ready.",

    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",

    // 🔹 Brand
    publisher: {
      "@type": "Organization",
      name: "PDFSwift",
      url: "https://pdfswift.online",
      logo: {
        "@type": "ImageObject",
        url: "https://pdfswift.online/logo.png"
      }
    },

    // 🔹 Page URL
    url: "https://pdfswift.online/passport-photo",

    // 🔹 Images
    image: [
      "https://pdfswift.online/images/passport-photo-tool.png"
    ],

    // 🔹 Dates (IST)
    datePublished: "2026-01-13T00:00:00+05:30",
    dateModified: "2026-01-20T00:00:00+05:30",

    // 🔹 Language
    inLanguage: "en",

    // 🔹 Offers (Free Tool)
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
