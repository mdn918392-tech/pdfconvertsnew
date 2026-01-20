export default function PassportPhotoHowToSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Create a Passport Size Photo Online",
    description:
      "Step-by-step guide to create a passport size photo online using PDFSwift. Choose official size, background, DPI and download print-ready photos instantly.",

    step: [
      {
        "@type": "HowToStep",
        name: "Upload your photo",
        text: "Upload a clear portrait photo from your device using the upload button.",
      },
      {
        "@type": "HowToStep",
        name: "Select passport size",
        text: "Choose the required passport or visa photo size such as USA, India, UK, Canada, or Australia.",
      },
      {
        "@type": "HowToStep",
        name: "Choose layout & quality",
        text: "Select photo layout, background color, DPI, and quality settings according to your needs.",
      },
      {
        "@type": "HowToStep",
        name: "Create passport photo",
        text: "Click the create button to generate your passport size photo instantly.",
      },
      {
        "@type": "HowToStep",
        name: "Download & print",
        text: "Download the passport photo and print it or use it for online applications.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
