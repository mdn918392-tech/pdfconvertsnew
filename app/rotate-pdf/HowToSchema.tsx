export default function HowToSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to rotate PDF files",
    description:
      "Step-by-step guide to rotate PDF files quickly and securely using our online tool.",
    step: [
      {
        "@type": "HowToStep",
        name: "Upload PDF file",
        text: "Select and upload your PDF file that you want to rotate using the upload button.",
      },
      {
        "@type": "HowToStep",
        name: "Rotate PDF",
        text: "Choose the rotation angle (90°, 180°, or 270°) and click the rotate button to process your file.",
      },
      {
        "@type": "HowToStep",
        name: "Download rotated PDF",
        text: "Download your rotated PDF file instantly after processing.",
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
