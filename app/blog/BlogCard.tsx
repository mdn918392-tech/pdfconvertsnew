import Link from "next/link";
import Image from "next/image";

interface BlogProps {
  blog: {
    title: string;
    slug: string;
    description: string;
    date: string;
    image: string;
  };
}

export default function BlogCard({ blog }: BlogProps) {
  return (
    <Link href={`/blog/${blog.slug}`} className="block group">
      <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900 
                      shadow-soft hover:shadow-xl transition-all duration-300 
                      animate-fade-in">

        {/* Image / Gradient Section */}
        <div className="relative h-56 w-full overflow-hidden">
          {blog.image ? (
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              unoptimized={blog.image.startsWith("http")}
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-orange-400 to-red-500 
                            animate-gradient flex items-center justify-center px-6">
              <h2 className="text-white text-2xl font-bold text-center">
                {blog.title}
              </h2>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-sm text-gray-500 mb-2">{blog.date}</p>

          <h2 className="text-xl font-semibold mb-3 line-clamp-2">
            {blog.title}
          </h2>

          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {blog.description}
          </p>

          <span className="text-primary-600 font-medium group-hover:underline">
            Read More →
          </span>
        </div>
      </div>
    </Link>
  );
}
