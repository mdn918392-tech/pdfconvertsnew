export default function FAQSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is the Compress Image tool free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our Compress Image & Download tool is completely free and easy to use.",
        },
      },
      {
        "@type": "Question",
        name: "Are my images secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, your images are processed safely and never stored on any server.",
        },
      },
      {
        "@type": "Question",
        name: "Can I compress images on mobile devices?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, this tool works perfectly on mobile, tablet, and desktop devices.",
        },
      },
      {
        "@type": "Question",
        name: "Which formats are supported for download?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can download the compressed files in PDF or popular image formats like JPG and PNG.",
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
