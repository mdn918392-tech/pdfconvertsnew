import Script from "next/script";

export default function HowToResizeImageSchema() {
  return (
    <Script
      id="howto-resize-image"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to Resize Images Online",
          description:
            "Step-by-step guide to resize JPG, PNG, and WebP images online using PDFSwift without losing quality.",
          totalTime: "PT2M",
          tool: {
            "@type": "HowToTool",
            name: "PDFSwift Image Resizer",
          },
          step: [
            {
              "@type": "HowToStep",
              name: "Upload Image",
              text:
                "Upload your image using drag & drop or the upload button.",
            },
            {
              "@type": "HowToStep",
              name: "Choose Size & Settings",
              text:
                "Select preset sizes like Full HD, Instagram, or enter custom width and height. Choose format and quality.",
            },
            {
              "@type": "HowToStep",
              name: "Resize Image",
              text:
                "Click the resize button to instantly generate the resized image with live preview.",
            },
            {
              "@type": "HowToStep",
              name: "Download Image",
              text:
                "Download the resized image in JPG, PNG, or WebP format.",
            },
          ],
        }),
      }}
    />
  );
}
