import Script from "next/script";

export default function HowToSplitPdfSchema() {
  return (
    <Script
      id="howto-split-pdf"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Split PDF Files Online",
          "description":
            "Step-by-step guide to split PDF pages online. Select pages, rotate them, and download individually or in batches using PDFSwift.",
          "totalTime": "PT2M",
          "tool": {
            "@type": "HowToTool",
            "name": "PDFSwift Split PDF Tool"
          },
          "step": [
            {
              "@type": "HowToStep",
              "name": "Upload PDF",
              "text":
                "Upload your PDF file using drag and drop or file picker."
            },
            {
              "@type": "HowToStep",
              "name": "Select Pages",
              "text":
                "Choose the pages you want to split or download."
            },
            {
              "@type": "HowToStep",
              "name": "Rotate Pages (Optional)",
              "text":
                "Rotate individual pages or apply batch rotation to all pages."
            },
            {
              "@type": "HowToStep",
              "name": "Download Pages",
              "text":
                "Download selected pages, current view, or all pages at once."
            }
          ]
        })
      }}
    />
  );
}
