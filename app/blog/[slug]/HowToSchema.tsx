import { FC } from "react";

interface HowToSchemaProps {
  title: string;
  description: string;
  image?: string;
  howto: {
    steps: string[];
    supply: string[];
    tool: string[];
    estimatedTime: string;
    totalTime: string;
  };
}

const HowToSchema: FC<HowToSchemaProps> = ({ title, description, image, howto }) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    description,
    totalTime: howto.totalTime,
    estimatedTime: howto.estimatedTime,
    supply: howto.supply.map((s) => ({ "@type": "HowToSupply", name: s })),
    tool: howto.tool.map((t) => ({ "@type": "HowToTool", name: t })),
    step: howto.steps.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: `Step ${idx + 1}`,
      text: step,
    })),
  };

  if (image) schema.image = image;

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
};

export default HowToSchema;
