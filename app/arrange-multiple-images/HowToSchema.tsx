export default function HowToImageToA4SheetSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Create Custom Image Sheets for A4/A3 Paper",
    description:
      "Upload multiple images, arrange them freely on A4 or A3 sheets, rotate, resize, and export as high-quality PDF, JPG, or PNG. Perfect for photo collages, mood boards, and print layouts.",
    step: [
      {
        "@type": "HowToStep",
        name: "Upload Images",
        text: "Upload multiple images (JPG, PNG, WebP) using the upload button. Images are added to the current page.",
      },
      {
        "@type": "HowToStep",
        name: "Arrange Images Freely",
        text: "Drag images to reposition them on the canvas. Use corner handles to resize images. Enable 'Lock Ratio' to maintain aspect ratio while resizing.",
      },
      {
        "@type": "HowToStep",
        name: "Rotate & Adjust Images",
        text: "Select any image to access rotation controls. Rotate freely from 0° to 360°, snap to angles (0°, 45°, 90°), or use +/-15° buttons for precise adjustments.",
      },
      {
        "@type": "HowToStep",
        name: "Customize Page Settings",
        text: "Choose paper size (A4, A3, or Custom), adjust margins, and set background color. Add new pages using the '+' button in the toolbar.",
      },
      {
        "@type": "HowToStep",
        name: "Export & Download",
        text: "Select export format (PDF, JPG, or PNG) and download your customized sheet. PDF exports all pages as a single document, JPG/PNG export each page separately.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}