export default function HowToPassportPhotoSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Create Passport Size Photo Online",
    description:
      "Create passport size photos online for India, USA, UK and other countries. Choose official sizes, DPI, background color and download print-ready sheets instantly.",
    step: [
      {
        "@type": "HowToStep",
        name: "Upload Photo",
        text: "Upload a clear portrait photo using drag and drop or the upload button.",
      },
      {
        "@type": "HowToStep",
        name: "Select Passport Size",
        text: "Choose your country passport size such as India, USA, or UK with official dimensions.",
      },
      {
        "@type": "HowToStep",
        name: "Adjust Quality & Layout",
        text: "Select DPI, background color, photo quantity, paper size, spacing and margins.",
      },
      {
        "@type": "HowToStep",
        name: "Generate Passport Photos",
        text: "Click the create button to generate HD, print-ready passport photos.",
      },
      {
        "@type": "HowToStep",
        name: "Download & Print",
        text: "Download the generated passport photo sheet and print it instantly.",
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
