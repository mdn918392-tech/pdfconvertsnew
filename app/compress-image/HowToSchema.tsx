"use client";

export default function HowToSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to compress images and download as PDF or image",
    description:
      "Step-by-step guide to compress your images and download them as PDF or image formats quickly and securely using our online tool.",
    step: [
      {
        "@type": "HowToStep",
        name: "Upload image file",
        text: "Select and upload the image file you want to compress using the upload button.",
      },
      {
        "@type": "HowToStep",
        name: "Compress image",
        text: "Click the compress button to reduce the file size of your image without losing quality.",
      },
      {
        "@type": "HowToStep",
        name: "Download compressed file",
        text: "Download your compressed file in PDF or popular image formats like JPG or PNG.",
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
