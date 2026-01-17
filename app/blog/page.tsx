import BlogCard from "./BlogCard";
import blogData from "./data.json";
import BlogSchema from "./BlogSchema";
import BreadcrumbSchema from "./BreadcrumbSchema";

export default function BlogPage() {
  return (
    <>
      {/* Structured Data */}
      <BlogSchema />
      <BreadcrumbSchema />

      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Our Blog</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {blogData.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      </div>
    </>
  );
}