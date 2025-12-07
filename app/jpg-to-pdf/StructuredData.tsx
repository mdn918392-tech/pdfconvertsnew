"use client";

import { useEffect } from "react";

export default function StructuredData() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to convert JPG to PDF fast",
      "description": "A step-by-step guide to convert JPG images to PDF instantly.",
      "keywords": ["pdf convert", "image to pdf", "optimize pdf"],
      "url": window.location.href
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
