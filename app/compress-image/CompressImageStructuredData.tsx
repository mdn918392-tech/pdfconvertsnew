"use client";

import { useEffect } from "react";

export default function CompressImageStructuredData() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to compress an image quickly",
      "description":
        "A step-by-step guide to compress image files online instantly and efficiently without losing quality.",
      "keywords": [
        "compress image",
        "reduce image size",
        "optimize image",
        "image optimizer",
        "online image compression",
        "free image compressor"
      ],
      "url": window.location.href
    });

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
