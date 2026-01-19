export default function HowToSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to resize images online",
    description:
      "Step-by-step guide to resize images online quickly and securely while maintaining quality using PDFSwift.",
    step: [
      {
        "@type": "HowToStep",
        name: "Upload image file",
        text: "Select and upload the image file you want to resize using the upload button.",
      },
      {
        "@type": "HowToStep",
        name: "Resize image",
        text: "Set custom dimensions or maintain the aspect ratio to resize your image without losing quality.",
      },
      {
        "@type": "HowToStep",
        name: "Download resized image",
        text: "Download your resized image in supported formats such as JPG, PNG, or WebP.",
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
