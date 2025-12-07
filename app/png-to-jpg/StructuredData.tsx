"use client";

import { useEffect } from "react";

export default function StructuredData() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to convert PNG to JPG fast",
      "description": "A step-by-step guide to convert PNG images to JPG instantly.",
      "keywords": ["png to jpg", "image converter", "convert png", "jpg converter"],
      "url": window.location.href
    });

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
