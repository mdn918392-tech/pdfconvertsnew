import Script from "next/script";

export default function HowToRotatePdfSchema() {
  return (
    <Script
      id="howto-rotate-pdf"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Rotate PDF Pages Online",
          "description":
            "Step-by-step guide to rotate PDF pages online using PDFSwift. Rotate pages by 90, 180, or 270 degrees and download instantly.",
          "totalTime": "PT2M",
          "tool": {
            "@type": "HowToTool",
            "name": "PDFSwift Rotate PDF Tool"
          },
          "step": [
            {
              "@type": "HowToStep",
              "name": "Upload PDF",
              "text": "Upload the PDF file you want to rotate."
            },
            {
              "@type": "HowToStep",
              "name": "Rotate Pages",
              "text": "Rotate pages individually or apply batch rotation like 90°, 180°, or 270°."
            },
            {
              "@type": "HowToStep",
              "name": "Preview Rotation",
              "text": "Preview rotated pages to ensure correct orientation."
            },
            {
              "@type": "HowToStep",
              "name": "Download Rotated PDF",
              "text": "Download the rotated PDF as a single document or individual pages."
            }
          ]
        })
      }}
    />
  );
}
