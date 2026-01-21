export default function HowToSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert JPG to PDF Online",
    description:
      "Step-by-step guide to convert JPG images into a high-quality PDF using PDFSwift online tool.",
    totalTime: "PT2M",
    tool: {
      "@type": "HowToTool",
      name: "PDFSwift JPG to PDF Converter",
    },
    step: [
      {
        "@type": "HowToStep",
        name: "Upload JPG images",
        text:
          "Upload your JPG images by clicking the upload button or using drag and drop.",
      },
      {
        "@type": "HowToStep",
        name: "Customize PDF settings",
        text:
          "Reorder images, choose page size, orientation, margins, and output quality.",
      },
      {
        "@type": "HowToStep",
        name: "Convert JPG to PDF",
        text:
          "Click the convert button to generate a professional PDF document.",
      },
      {
        "@type": "HowToStep",
        name: "Download PDF",
        text:
          "Download your converted PDF instantly to your device.",
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
