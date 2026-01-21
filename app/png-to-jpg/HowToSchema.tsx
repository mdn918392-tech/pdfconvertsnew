export default function PngToJpgHowToSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert PNG to JPG online",
    description:
      "Step-by-step guide to convert PNG images to JPG format online using PDFSwift. Convert images quickly while preserving quality and reducing file size.",
    step: [
      {
        "@type": "HowToStep",
        name: "Upload PNG images",
        text: "Upload one or multiple PNG images using drag and drop or file upload option.",
      },
      {
        "@type": "HowToStep",
        name: "Review uploaded files",
        text: "Check the uploaded PNG images and remove any unwanted files before conversion.",
      },
      {
        "@type": "HowToStep",
        name: "Convert PNG to JPG",
        text: "Click the convert button to transform PNG images into JPG format.",
      },
      {
        "@type": "HowToStep",
        name: "Preview converted images",
        text: "Preview the converted JPG images to ensure quality and file size reduction.",
      },
      {
        "@type": "HowToStep",
        name: "Download JPG files",
        text: "Download converted JPG images individually or as a ZIP archive.",
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
