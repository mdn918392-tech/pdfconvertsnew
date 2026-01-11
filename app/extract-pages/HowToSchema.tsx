export default function HowToSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to extract pages from PDF",
    description:
      "Step-by-step guide to extract specific pages from a PDF file quickly and securely using our online tool.",
    step: [
      {
        "@type": "HowToStep",
        name: "Upload PDF file",
        text: "Select and upload the PDF file from which you want to extract pages using the upload button.",
      },
      {
        "@type": "HowToStep",
        name: "Select pages to extract",
        text: "Choose the pages you want to extract from your PDF file.",
      },
      {
        "@type": "HowToStep",
        name: "Download extracted pages",
        text: "Download the extracted pages as a new PDF file instantly.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
