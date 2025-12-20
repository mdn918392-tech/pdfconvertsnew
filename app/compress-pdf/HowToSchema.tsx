"use client";

export default function HowToSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to compress PDF files",
    description:
      "Step-by-step guide to compress PDF files quickly and securely using our online tool.",
    step: [
      {
        "@type": "HowToStep",
        name: "Upload PDF file",
        text: "Select and upload the PDF file you want to compress using the upload button.",
      },
      {
        "@type": "HowToStep",
        name: "Compress PDF",
        text: "Click the compress button to reduce the file size of your PDF.",
      },
      {
        "@type": "HowToStep",
        name: "Download compressed PDF",
        text: "Download your compressed PDF file instantly.",
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
