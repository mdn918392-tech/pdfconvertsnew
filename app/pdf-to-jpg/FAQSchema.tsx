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
          name: "Is PDF to JPG converter free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, our PDF to JPG tool is completely free and easy to use.",
          },
        },
        {
          "@type": "Question",
          name: "Are my files secure?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, your files are processed safely and never stored on any server.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use this tool on mobile?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, this tool works perfectly on mobile, tablet, and desktop devices.",
          },
        },
      ],
    });

    document.head.appendChild(script);

    // ✅ FIXED CLEANUP
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
