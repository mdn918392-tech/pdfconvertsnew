export default function FAQSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is the JPG to PDF tool free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our JPG to PDF tool is completely free and easy to use.",
        },
      },
      {
        "@type": "Question",
        name: "Are my JPG files secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, your files are processed safely and never stored on any server.",
        },
      },
      {
        "@type": "Question",
        name: "Can I convert JPG to PDF on mobile devices?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, this tool works perfectly on mobile, tablet, and desktop devices.",
        },
      },
      {
        "@type": "Question",
        name: "What file formats are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Only JPG images are supported for conversion to PDF.",
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
