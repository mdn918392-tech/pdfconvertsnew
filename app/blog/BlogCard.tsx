import Link from 'next/link';

interface BlogProps {
  blog: {
    title: string;
    slug: string;
    description: string;
    date: string;
  };
}

export default function BlogCard({ blog }: BlogProps) {
  return (
    <Link href={`/blog/${blog.slug}`}>
      <div className="border p-4 rounded hover:shadow-lg transition cursor-pointer">
        <h2 className="text-xl font-semibold">{blog.title}</h2>
        <p className="text-gray-600 mt-2">{blog.description}</p>
        <p className="text-sm text-gray-400 mt-1">{blog.date}</p>
      </div>
    </Link>
  );
}
