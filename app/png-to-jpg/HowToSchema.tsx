export default function PNGtoJPGHowToSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert PNG to JPG",
    description:
      "Step-by-step guide to convert PNG images into JPG format online quickly and securely.",
    step: [
      {
        "@type": "HowToStep",
        name: "Upload PNG image",
        text: "Select and upload your PNG image using the upload button.",
      },
      {
        "@type": "HowToStep",
        name: "Convert to JPG",
        text: "Click the convert button to start converting your PNG image into JPG.",
      },
      {
        "@type": "HowToStep",
        name: "Download JPG image",
        text: "Download your converted JPG image instantly to your device.",
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
