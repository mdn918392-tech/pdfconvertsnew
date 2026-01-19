export default function WebpageToJPGHowToSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert webpage content to JPG",
    description:
      "Step-by-step guide to convert webpage content into a high-quality JPG image quickly and securely.",
    step: [
      {
        "@type": "HowToStep",
        name: "Prepare webpage content",
        text: "Open or prepare the webpage content you want to convert into a JPG image.",
      },
      {
        "@type": "HowToStep",
        name: "Convert to JPG",
        text: "Use the convert option to turn the webpage content into a JPG image while preserving clarity.",
      },
      {
        "@type": "HowToStep",
        name: "Download JPG image",
        text: "Download the generated JPG image instantly to your device.",
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
