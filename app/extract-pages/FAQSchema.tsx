export default function FAQSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is the Extract Pages from PDF tool free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our Extract Pages from PDF tool is completely free and easy to use.",
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
        name: "Can I extract pages on mobile devices?",
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
          text: "Only PDF files are supported for page extraction. Other formats are not supported.",
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
