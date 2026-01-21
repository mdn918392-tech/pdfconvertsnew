import Script from "next/script";

export default function HowToPdfToJpgSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert PDF to JPG Online",
    description:
      "Step-by-step guide to convert PDF pages into high-quality JPG images with rotation and batch download options.",
    totalTime: "PT2M",
    tool: {
      "@type": "HowToTool",
      name: "PDFSwift PDF to JPG Converter",
    },
    step: [
      {
        "@type": "HowToStep",
        name: "Upload PDF",
        text: "Upload your PDF file using drag and drop or the file picker.",
      },
      {
        "@type": "HowToStep",
        name: "Choose Output Settings",
        text: "Select JPG or PNG format, image quality, and DPI.",
      },
      {
        "@type": "HowToStep",
        name: "Rotate Pages",
        text: "Rotate individual pages or rotate all pages together if needed.",
      },
      {
        "@type": "HowToStep",
        name: "Convert PDF to Images",
        text: "Click the convert button to generate high-quality images.",
      },
      {
        "@type": "HowToStep",
        name: "Download Images",
        text: "Download images individually or as a ZIP file.",
      },
    ],
  };

  return (
    <Script
      id="howto-pdf-to-jpg"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
