// app/blog/[slug]/BreadcrumbSchema.tsx
import { FC } from "react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  breadcrumbs: BreadcrumbItem[];
}

const BreadcrumbSchema: FC<BreadcrumbSchemaProps> = ({ breadcrumbs }) => {
  const itemListElement = breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default BreadcrumbSchema;
