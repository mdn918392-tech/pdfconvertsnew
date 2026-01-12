import blogData from "../data.json";

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const blog = blogData.find((b) => b.slug === params.slug);

  if (!blog) return { title: "Blog Post Not Found" };

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: blog.image ? [blog.image] : undefined,
    },
  };
};
