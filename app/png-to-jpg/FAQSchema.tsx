"use client";
import { useEffect } from "react";

export default function PNGtoJPGFAQSchema() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";

    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          "name": "Is PNG to JPG converter free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our PNG to JPG converter is completely free to use without any registration."
          }
        },
        {
          "@type": "Question",
          "name": "Will image quality reduce after converting PNG to JPG?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We optimize images to maintain the best possible quality while reducing file size."
          }
        },
        {
          "@type": "Question",
          "name": "Are my PNG files safe and secure?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all uploaded files are processed securely and automatically deleted after conversion."
          }
        },
        {
          "@type": "Question",
          "name": "Can I convert PNG to JPG on mobile?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our PNG to JPG tool works smoothly on mobile, tablet, and desktop devices."
          }
        }
      ]
    });

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
