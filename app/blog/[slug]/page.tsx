import BreadcrumbSchema from "./BreadcrumbSchema";
import HowToSchema from "./HowToSchema";
import FAQSchema from "./FAQSchema";
import ArticleSchema from "./ArticleSchema";
import blogData from "../data.json";

interface Props {
  params: { slug: string };
}

export default function Page({ params }: Props) {
  const blog = blogData.find((b) => b.slug === params.slug);

  if (!blog) return <p>Blog post not found</p>;

  return (
    <>
      {/* 🔥 SEO Schemas (UI se pehle) */}
      <ArticleSchema
        title={blog.title}
        description={blog.description}
        image={blog.image}
        slug={blog.slug}
      />

      <BreadcrumbSchema breadcrumbs={blog.breadcrumbs} />

      <HowToSchema
        title={blog.title}
        description={blog.description}
        image={blog.image}
        howto={blog.howto}
      />

      <FAQSchema faq={blog.faq} />

      {/* Page Content */}
      <main className="max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

        <img
          src={blog.image}
          alt={blog.title}
          className="mb-4 rounded-lg"
        />

        <p className="mb-6">{blog.description}</p>

        {/* Blog Steps */}
        <article className="space-y-4">
          {blog.howto.steps.map((step, idx) => (
            <p key={idx}>
              {idx + 1}. {step}
            </p>
          ))}
        </article>
      </main>
    </>
  );
}
