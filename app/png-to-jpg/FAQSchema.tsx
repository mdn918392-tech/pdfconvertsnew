export default function PNGtoJPGFAQSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is PNG to JPG converter free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our PNG to JPG converter is completely free to use without any registration.",
        },
      },
      {
        "@type": "Question",
        name: "Will image quality reduce after converting PNG to JPG?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We optimize images to maintain the best possible quality while reducing file size.",
        },
      },
      {
        "@type": "Question",
        name: "Are my PNG files safe and secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all uploaded files are processed securely and automatically deleted after conversion.",
        },
      },
      {
        "@type": "Question",
        name: "Can I convert PNG to JPG on mobile?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our PNG to JPG tool works smoothly on mobile, tablet, and desktop devices.",
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
