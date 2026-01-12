import { FC } from "react";

interface FAQSchemaProps {
  faq: { question: string; answer: string }[];
}

const FAQSchema: FC<FAQSchemaProps> = ({ faq }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

export default FAQSchema;
