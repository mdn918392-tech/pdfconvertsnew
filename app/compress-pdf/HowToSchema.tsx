import Script from "next/script";

export default function HowToCompressPdfSchema() {
  return (
    <Script
      id="howto-compress-pdf"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Compress PDF Files Online",
          "description":
            "Step-by-step guide to compress PDF files online without losing quality using PDFSwift.",
          "totalTime": "PT2M",
          "tool": {
            "@type": "HowToTool",
            "name": "PDFSwift Compress PDF Tool"
          },
          "step": [
            {
              "@type": "HowToStep",
              "name": "Upload PDF",
              "text":
                "Upload your PDF file using drag and drop or the upload button."
            },
            {
              "@type": "HowToStep",
              "name": "Select Compression Level",
              "text":
                "Choose Low, Medium, High, or Extreme compression based on your needs."
            },
            {
              "@type": "HowToStep",
              "name": "Compress PDF",
              "text":
                "Click the compress button to reduce PDF size while preserving quality."
            },
            {
              "@type": "HowToStep",
              "name": "Download Compressed PDF",
              "text":
                "Download the compressed PDF file instantly."
            }
          ]
        })
      }}
    />
  );
}
