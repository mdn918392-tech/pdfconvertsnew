"use client";

import { useEffect } from "react";

export default function StructuredData() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to rotate a PDF quickly",
      "description": "A step-by-step guide to rotate PDF pages instantly and efficiently.",
      "keywords": ["rotate pdf", "PDF editor", "PDF page rotation", "optimize PDF"],
      "url": window.location.href
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
