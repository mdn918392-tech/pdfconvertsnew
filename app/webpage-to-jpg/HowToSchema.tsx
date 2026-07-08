export default function WebpageToJpgHowToSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert webpage content to JPG online",
    description:
      "Step-by-step guide to convert webpage content into high-quality JPG images online using PDFSwift. Fast, secure, and no signup required.",
    totalTime: "PT2M",
    step: [
      {
        "@type": "HowToStep",
        name: "Add webpage content",
        text: "Open the Webpage to JPG tool and add the webpage content you want to convert.",
      },
      {
        "@type": "HowToStep",
        name: "Generate preview",
        text: "PDFSwift processes the webpage content in your browser and generates a preview.",
      },
      {
        "@type": "HowToStep",
        name: "Convert to JPG",
        text: "Start the conversion to create high-quality JPG images from the webpage content.",
      },
      {
        "@type": "HowToStep",
        name: "Preview converted images",
        text: "Check the converted JPG images before downloading them.",
      },
      {
        "@type": "HowToStep",
        name: "Download JPG images",
        text: "Download the converted JPG images individually or as a ZIP file.",
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