import Script from "next/script";

export default function HowToRemovePagesSchema() {
  return (
    <Script
      id="howto-remove-pages"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to Remove Pages from PDF Online",
          description:
            "Step-by-step guide to remove unwanted pages from a PDF file and download a clean modified PDF using PDFSwift.",
          totalTime: "PT2M",
          tool: {
            "@type": "HowToTool",
            name: "PDFSwift Remove Pages Tool",
          },
          step: [
            {
              "@type": "HowToStep",
              name: "Upload PDF",
              text:
                "Upload your PDF file using drag and drop or the file upload button.",
            },
            {
              "@type": "HowToStep",
              name: "Select pages to keep or remove",
              text:
                "Click on pages to keep them or remove unwanted pages. You can also use quick selection like odd, even, or select all.",
            },
            {
              "@type": "HowToStep",
              name: "Preview changes",
              text:
                "Review selected pages and check the estimated file size before downloading.",
            },
            {
              "@type": "HowToStep",
              name: "Download modified PDF",
              text:
                "Download the new PDF containing only the selected pages.",
            },
          ],
        }),
      }}
    />
  );
}
