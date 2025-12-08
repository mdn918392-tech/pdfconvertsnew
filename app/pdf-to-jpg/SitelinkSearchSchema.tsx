"use client";
import { useEffect } from "react";

export default function SitelinkSearchSchema() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";

    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: "https://yourdomain.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://yourdomain.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    });

    document.head.appendChild(script);

    // ✅ FIXED CLEANUP
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
