export default function CompressImageStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to compress an image quickly",
    description:
      "A step-by-step guide to compress image files online instantly and efficiently without losing quality.",
    keywords: [
      "compress image",
      "reduce image size",
      "optimize image",
      "image optimizer",
      "online image compression",
      "free image compressor",
    ],
    url: "https://pdfswift.online/compress-image",
    step: [
      {
        "@type": "HowToStep",
        name: "Upload image",
        text: "Upload the image you want to compress."
      },
      {
        "@type": "HowToStep",
        name: "Compress image",
        text: "The image is compressed automatically without losing quality."
      },
      {
        "@type": "HowToStep",
        name: "Download image",
        text: "Download the compressed image instantly."
      }
    ]
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
