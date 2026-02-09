export default function HowToSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to add blank pages and insert images into a PDF online",
    description:
      "Step-by-step guide to insert blank pages or add images anywhere inside your PDF file using PDFSwift. Fast, secure, and browser-based tool.",
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your PDF file",
        text: "Click on Upload PDF and select the PDF file you want to edit. Your PDF pages will be automatically loaded for preview.",
      },
      {
        "@type": "HowToStep",
        name: "Choose what to insert",
        text: "Select whether you want to insert blank pages or add images into your PDF. Choose the page size such as A4, A3, Letter, Legal, or Custom.",
      },
      {
        "@type": "HowToStep",
        name: "Select insert position",
        text: "Choose whether to insert before or after a specific page number. Adjust the page number and select how many pages you want to insert.",
      },
      {
        "@type": "HowToStep",
        name: "Download the modified PDF",
        text: "Click Download PDF to save the updated PDF file with inserted pages or images instantly. The final file is watermark-free and secure.",
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
