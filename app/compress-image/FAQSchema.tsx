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
    });

    document.head.appendChild(script);

    // Cleanup
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
