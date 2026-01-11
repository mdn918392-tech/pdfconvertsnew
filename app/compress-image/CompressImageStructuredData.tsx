export default function CompressImageStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to compress an image quickly",
    description:
      "A step-by-step guide to compress image files online instantly and efficiently without losing quality.",
    keywords: [
      "compress image",
      "reduce image size",
      "optimize image",
      "image optimizer",
      "online image compression",
      "free image compressor",
    ],
    url: "https://yourdomain.com/tools/compress-image",
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
