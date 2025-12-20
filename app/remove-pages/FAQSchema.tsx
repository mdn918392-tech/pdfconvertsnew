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
    });

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
