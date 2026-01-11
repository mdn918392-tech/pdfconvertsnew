export default function HowToSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to remove pages from PDF",
    description:
      "Step-by-step guide to remove unwanted pages from a PDF file quickly and securely.",
    step: [
      {
        "@type": "HowToStep",
        name: "Upload PDF file",
        text: "Select and upload the PDF file from which you want to remove pages.",
      },
      {
        "@type": "HowToStep",
        name: "Select pages to remove",
        text: "Choose the page numbers or pages you want to delete from the PDF.",
      },
      {
        "@type": "HowToStep",
        name: "Remove pages",
        text: "Click the remove button to delete the selected pages from the PDF.",
      },
      {
        "@type": "HowToStep",
        name: "Download updated PDF",
        text: "Download the new PDF file after unwanted pages are removed.",
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
