import Link from "next/link";
import Image from "next/image";

interface BlogProps {
  blog: {
    title: string;
    id?: string;
    slug?: string;
    description: string;
    date: string;
    image?: string;
  };
}

export default function BlogCard({ blog }: BlogProps) {
  const isValidPublicImage =
    typeof blog.image === "string" && blog.image.startsWith("/images/");
  
  const linkHref = blog.slug ? `/blog/${blog.slug}` : `/blog/${blog.id}`;

  return (
    <Link href={linkHref} className="block group">
      <div className="rounded-md overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col border border-gray-200 dark:border-gray-700">
        
        {/* Image */}
        <div className="relative h-24 w-full overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700">
          {isValidPublicImage ? (
            <Image
              src={blog.image as string}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center px-2">
              <h6 className="text-white text-[9px] font-bold text-center line-clamp-2">
                {blog.title}
              </h6>
            </div>
          )}
        </div>

        {/* Content - Ultra compact */}
        <div className="p-2 flex flex-col flex-grow">
          <p className="text-[8px] text-gray-500 dark:text-gray-400 mb-0.5 font-medium">
            {blog.date}
          </p>

          <h6 className="text-[11px] font-semibold mb-0.5 line-clamp-2 leading-tight text-gray-900 dark:text-white">
            {blog.title}
          </h6>

          <p className="text-gray-600 dark:text-gray-300 text-[9px] line-clamp-2 mb-1 flex-grow leading-relaxed">
            {blog.description}
          </p>

          <span className="text-orange-500 dark:text-orange-400 font-medium text-[9px] group-hover:underline mt-auto">
            Read More →
          </span>
        </div>
      </div>
    </Link>
  );
}