export default function HowToSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert PDF to JPG",
    description:
      "Step-by-step guide to convert PDF files into JPG images quickly and securely.",
    step: [
      {
        "@type": "HowToStep",
        name: "Upload PDF file",
        text: "Select and upload your PDF file using the upload button.",
      },
      {
        "@type": "HowToStep",
        name: "Convert to JPG",
        text: "Click the convert button to start converting your PDF file.",
      },
      {
        "@type": "HowToStep",
        name: "Download images",
        text: "Download your converted JPG images instantly.",
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
