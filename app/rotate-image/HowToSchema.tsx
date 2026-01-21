export default function RotateImageHowToSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Rotate Images Online",
    description:
      "Learn how to rotate images online using PDFSwift. Rotate JPG, PNG, and WebP images in bulk or individually with live preview and instant download.",
    totalTime: "PT1M",
    supply: [],
    tool: [
      {
        "@type": "HowToTool",
        name: "PDFSwift Rotate Image Tool",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload Images",
        text: "Upload one or multiple JPG, PNG, or WebP images using drag and drop or file picker.",
      },
      {
        "@type": "HowToStep",
        name: "Select Rotation Angle",
        text: "Choose a rotation angle such as 90°, 180°, or 270° clockwise or counter-clockwise.",
      },
      {
        "@type": "HowToStep",
        name: "Rotate All Images",
        text: "Apply the selected rotation angle to all uploaded images at once.",
      },
      {
        "@type": "HowToStep",
        name: "Rotate Individual Images",
        text: "Fine-tune rotation for each image separately using individual rotation controls.",
      },
      {
        "@type": "HowToStep",
        name: "Preview Rotated Images",
        text: "Instantly preview all rotated images to ensure correct orientation before downloading.",
      },
      {
        "@type": "HowToStep",
        name: "Download Images",
        text: "Download rotated images individually or download all images together as a ZIP file.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
