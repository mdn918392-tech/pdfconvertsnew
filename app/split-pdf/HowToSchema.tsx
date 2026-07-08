import Script from "next/script";

export default function HowToSplitPdfSchema() {
  return (
    <Script
      id="howto-split-pdf"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to Split PDF Files Online",
          description:
            "Step-by-step guide to split PDF pages online using PDFSwift.",
          totalTime: "PT2M",
          tool: {
            "@type": "HowToTool",
            name: "PDFSwift Split PDF Tool",
          },
          step: [
            {
              "@type": "HowToStep",
              name: "Upload PDF",
              text: "Upload your PDF file using drag and drop or file picker.",
            },
            {
              "@type": "HowToStep",
              name: "Select Pages",
              text: "Choose the pages or page ranges you want to split.",
            },
            {
              "@type": "HowToStep",
              name: "Download Split PDF",
              text: "Download the selected pages as separate PDF files.",
            },
          ],
        }),
      }}
    />
  );
}