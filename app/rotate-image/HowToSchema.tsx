export default function RotateImageHowToSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to rotate images online",
    description:
      "Step-by-step guide to rotate images online using PDFSwift. Easily rotate JPG, PNG, and WebP images without losing quality.",
    step: [
      {
        "@type": "HowToStep",
        name: "Upload image",
        text: "Select and upload the image you want to rotate using the upload button.",
      },
      {
        "@type": "HowToStep",
        name: "Rotate image",
        text: "Choose the rotation direction to rotate the image clockwise or counter-clockwise.",
      },
      {
        "@type": "HowToStep",
        name: "Download rotated image",
        text: "Download the rotated image instantly to your device in the selected format.",
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
