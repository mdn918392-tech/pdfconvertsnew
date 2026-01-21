export default function WebpageToJpgHowToSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert a webpage to JPG online",
    description:
      "Step-by-step guide to convert any webpage into high-quality JPG images online using PDFSwift. Fast, secure, and no signup required.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter webpage URL",
        text: "Paste the URL of the webpage you want to convert into JPG format.",
      },
      {
        "@type": "HowToStep",
        name: "Load webpage",
        text: "The tool securely loads and captures the webpage content.",
      },
      {
        "@type": "HowToStep",
        name: "Convert to JPG",
        text: "Start the conversion to generate high-quality JPG images.",
      },
      {
        "@type": "HowToStep",
        name: "Preview converted images",
        text: "Preview the JPG images before downloading them.",
      },
      {
        "@type": "HowToStep",
        name: "Download JPG images",
        text: "Download converted JPG images individually or as a ZIP file.",
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
