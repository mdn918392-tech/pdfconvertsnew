"use client";
import { useEffect } from "react";

export default function FAQSchema() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";

    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is Rotate PDF tool free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, our Rotate PDF tool is completely free and easy to use.",
          },
        },
        {
          "@type": "Question",
          name: "Are my PDF files secure?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, your PDFs are processed safely and never stored on any server.",
          },
        },
        {
          "@type": "Question",
          name: "Can I rotate PDFs on mobile?",
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
            text: "You can rotate PDF files only. Other file formats are not supported.",
          },
        },
      ],
    });

    document.head.appendChild(script);

    // Cleanup
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
