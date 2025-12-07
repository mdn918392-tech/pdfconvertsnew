"use client";

import { useEffect } from "react";

export default function StructuredData() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to compress a PDF quickly",
      "description": "A step-by-step guide to compress PDF files online instantly and efficiently.",
      "keywords": ["compress PDF", "reduce PDF size", "optimize PDF", "PDF optimizer", "online PDF tools"],
      "url": window.location.href
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
