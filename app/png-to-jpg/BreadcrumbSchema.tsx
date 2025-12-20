"use client";
import { useEffect } from "react";

export default function PNGtoJPGBreadcrumbSchema() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";

    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://yourdomain.com"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Image Tools",
          item: "https://yourdomain.com/image-tools"
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "PNG to JPG",
          item: "https://yourdomain.com/png-to-jpg"
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
