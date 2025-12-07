"use client";

import { useEffect } from "react";

export default function ExtractStructuredData() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to extract pages from a PDF quickly",
      "description": "A step-by-step guide to extract pages from PDF files online instantly and efficiently.",
      "keywords": [
        "extract PDF pages",
        "PDF page extraction",
        "split PDF",
        "online PDF tools",
        "PDF editor"
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
