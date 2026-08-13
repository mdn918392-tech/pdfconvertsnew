export default function FAQSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is the Compress PDF tool free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our Compress PDF tool is completely free and easy to use.",
        },
      },
      {
        "@type": "Question",
        name: "Are my PDF files secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, your PDF files are processed safely and never stored on any server.",
        },
      },
      {
        "@type": "Question",
        name: "Can I compress PDFs on mobile devices?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, this tool works perfectly on mobile, tablet, and desktop devices.",
        },
      },
      {
        "@type": "Question",
        name: "Which file formats are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Only PDF files are supported for compression. Other formats are not supported.",
        },
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
