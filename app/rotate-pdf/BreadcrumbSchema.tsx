"use client";
import { useEffect } from "react";

export default function BreadcrumbSchema() {
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
          item: "https://yourdomain.com", // Home page
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "PDF Tools",
          item: "https://yourdomain.com/pdf-tools", // PDF Tools main page
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Rotate PDF",
          item: "https://yourdomain.com/pdf-tools/rotate-pdf", // Rotate PDF tool page
        },
      ],
    });

    document.head.appendChild(script);

    // Cleanup function
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
