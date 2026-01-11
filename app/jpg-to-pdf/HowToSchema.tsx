export default function HowToSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert JPG to PDF",
    description:
      "Step-by-step guide to convert JPG images into PDF files quickly and securely using our online tool.",
    step: [
      {
        "@type": "HowToStep",
        name: "Upload JPG or PNG images",
        text: "Select and upload the JPG or PNG images you want to convert using the upload button.",
      },
      {
        "@type": "HowToStep",
        name: "Arrange images",
        text: "Arrange the order of the images as needed before conversion.",
      },
      {
        "@type": "HowToStep",
        name: "Convert and download",
        text: "Click the convert button and download your PDF file instantly.",
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
