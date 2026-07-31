export default function HowToSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to filter a PDF online",
    description:
      "Learn how to apply professional filters to PDF files online. Upload your PDF, choose a filter effect, process all pages, and download your filtered PDF as a single file or individual PDFs.",

    step: [
      {
        "@type": "HowToStep",
        name: "Upload PDF",
        text: "Upload a single PDF file that you want to apply filters to using the upload button.",
      },
      {
        "@type": "HowToStep",
        name: "Choose Filter",
        text: "Select your preferred PDF filter effect such as Grayscale, Sepia, Invert, Vintage, Warm, Cool, Oil Paint, or Neon from the available options.",
      },
      {
        "@type": "HowToStep",
        name: "Process PDF",
        text: "Click the process button to apply the selected filter effect to all pages of your PDF document.",
      },
      {
        "@type": "HowToStep",
        name: "Download Filtered PDF",
        text: "Download your filtered PDF as a single PDF file, download individual PDF pages separately, or download all individual PDFs together in a ZIP file.",
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