"use client";

export default function HowToSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to merge PDF files",
    description:
      "Step-by-step guide to merge multiple PDF files quickly and securely using our online Merge PDF tool.",
    step: [
      {
        "@type": "HowToStep",
        name: "Upload PDF files",
        text: "Select and upload the PDF files you want to merge using the upload button.",
      },
      {
        "@type": "HowToStep",
        name: "Arrange PDFs",
        text: "Arrange the order of your PDF files as needed before merging.",
      },
      {
        "@type": "HowToStep",
        name: "Merge and download",
        text: "Click the merge button and download your combined PDF instantly.",
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
