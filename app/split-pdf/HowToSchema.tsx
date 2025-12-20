"use client";

export default function HowToSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to split PDF files",
    description:
      "Step-by-step guide to split PDF files quickly and securely using our online Split PDF tool.",
    step: [
      {
        "@type": "HowToStep",
        name: "Upload PDF file",
        text: "Select and upload the PDF file that you want to split using the upload button.",
      },
      {
        "@type": "HowToStep",
        name: "Select pages to split",
        text: "Choose the pages you want to extract or split from the PDF.",
      },
      {
        "@type": "HowToStep",
        name: "Download split PDFs",
        text: "Download the split PDF files instantly after processing.",
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
