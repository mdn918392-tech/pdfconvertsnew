"use client";

import { useEffect } from "react";

export default function StructuredData() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to convert PDF to JPG fast",
      "description": "A step-by-step guide to convert PDF pages into JPG images instantly.",
      "keywords": ["pdf to jpg", "convert pdf", "extract images", "pdf to image"],
      "url": window.location.href
    });

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
