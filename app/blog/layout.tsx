import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Blog | Free Online PDF Tools",
    template: "%s | Free Online PDF Tools"
  },

  description:
    "Read helpful guides and tutorials about PDF tools like JPG to PDF, Merge PDF, Split PDF and more.",

  robots: {
    index: true,
    follow: true
  },

  openGraph: {
    type: "website",
    siteName: "Free Online PDF Tools",
    title: "Blog | Free Online PDF Tools",
    description:
      "Step-by-step tutorials on how to use free online PDF tools easily.",
    url: "https://yourdomain.com/blog"
  },

  twitter: {
    card: "summary_large_image",
    title: "Blog | Free Online PDF Tools",
    description:
      "Learn how to use free online PDF tools with simple step-by-step guides."
  }
};

export default function BlogLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      {children}
    </main>
  );
}
