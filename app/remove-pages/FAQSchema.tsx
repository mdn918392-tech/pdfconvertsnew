export default function FAQSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is Remove Pages from PDF tool free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our Remove Pages from PDF tool is completely free to use online.",
        },
      },
      {
        "@type": "Question",
        name: "Are my PDF files safe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, your PDF files are processed securely and are not stored on our servers.",
        },
      },
      {
        "@type": "Question",
        name: "Can I delete specific pages from a PDF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can easily select and remove specific pages from your PDF document.",
        },
      },
      {
        "@type": "Question",
        name: "Does this tool work on mobile devices?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the Remove Pages from PDF tool works smoothly on mobile, tablet, and desktop.",
        },
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
