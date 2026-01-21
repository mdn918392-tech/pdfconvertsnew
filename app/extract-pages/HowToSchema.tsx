import Script from "next/script";

export default function HowToExtractPagesSchema() {
  return (
    <Script
      id="howto-extract-pages"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to Extract Pages from PDF Online",
          description:
            "Step-by-step guide to extract selected pages from a PDF file online for free using PDFSwift.",
          totalTime: "PT2M",
          tool: {
            "@type": "HowToTool",
            name: "PDFSwift Extract Pages Tool",
          },
          step: [
            {
              "@type": "HowToStep",
              name: "Upload PDF",
              text: "Upload the PDF file from which you want to extract pages.",
            },
            {
              "@type": "HowToStep",
              name: "Select Pages",
              text: "Click on pages to select or deselect them for extraction.",
            },
            {
              "@type": "HowToStep",
              name: "Quick Selection (Optional)",
              text: "Use Select All or Deselect All options to quickly choose pages.",
            },
            {
              "@type": "HowToStep",
              name: "Extract Pages",
              text: "Click the Extract button to create a new PDF with selected pages.",
            },
            {
              "@type": "HowToStep",
              name: "Download Extracted PDF",
              text: "Download the newly created PDF instantly to your device.",
            },
          ],
        }),
      }}
    />
  );
}
