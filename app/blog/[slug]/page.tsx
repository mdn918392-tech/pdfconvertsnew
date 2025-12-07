import { notFound } from 'next/navigation';
import blogData from '../data.json';
import { Metadata } from 'next';

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: BlogPageProps): Metadata {
  const blog = blogData.find((b) => b.slug === params.slug);
  if (!blog) return { title: 'Blog Not Found' };
  return { title: blog.title, description: blog.description };
}

export default function BlogPost({ params }: BlogPageProps) {
  const blog = blogData.find((b) => b.slug === params.slug);
  if (!blog) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-400 mb-6">{blog.date}</p>
      <div className="prose dark:prose-dark">
        {/* Yahan aap blog content likh sakte ho */}
        <p>{blog.description}</p>
      </div>
    </div>
  );
}
