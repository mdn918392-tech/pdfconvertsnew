"use client";

import { useEffect } from "react";

export default function StructuredData() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to split a PDF quickly",
      "description": "A step-by-step guide to split PDF pages online instantly and efficiently.",
      "keywords": ["split PDF", "PDF editor", "PDF page extraction", "online PDF tools", "free PDF splitter"],
      "url": window.location.href
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
