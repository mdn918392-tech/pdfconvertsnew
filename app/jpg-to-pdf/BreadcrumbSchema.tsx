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
          item: "https://yourdomain.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "PDF Tools",
          item: "https://yourdomain.com/tools",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "JPG to PDF",
          item: "https://yourdomain.com/pdf-tools/jpg-to-pdf",
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
