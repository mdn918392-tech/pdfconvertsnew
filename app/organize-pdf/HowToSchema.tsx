import Script from "next/script";

export default function HowToOrganizePdfSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Organize PDF Pages Online",
    description:
      "Step-by-step guide to organize PDF pages online by reordering, rotating, deleting, and reversing pages with PDFSwift.",
    totalTime: "PT2M",

    tool: {
      "@type": "HowToTool",
      name: "PDFSwift Organize PDF Tool",
    },

    step: [
      {
        "@type": "HowToStep",
        name: "Upload PDF",
        text: "Upload your PDF file using drag and drop or the file picker.",
      },
      {
        "@type": "HowToStep",
        name: "Organize PDF Pages",
        text: "Drag and drop PDF pages to arrange them in your preferred order.",
      },
      {
        "@type": "HowToStep",
        name: "Rotate or Delete Pages",
        text: "Select pages to rotate them left or right, or delete unwanted pages from the PDF.",
      },
      {
        "@type": "HowToStep",
        name: "Reverse Page Order",
        text: "Use the Reverse feature to change the page order so the last page becomes the first and the first page becomes the last.",
      },
      {
        "@type": "HowToStep",
        name: "Download Organized PDF",
        text: "Click the download button to save your newly organized PDF.",
      },
    ],
  };

  return (
    <Script
      id="howto-organize-pdf"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}