"use client";

import { useEffect } from "react";

export default function StructuredData() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to merge PDF files fast",
      "description": "A step-by-step guide to merge multiple PDF files into one instantly.",
      "keywords": ["merge pdf", "combine pdf", "pdf joiner", "merge documents", "pdf tools"],
      "url": window.location.href
    });

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
