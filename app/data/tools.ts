import { Tool } from "../types/index";

export const tools: Tool[] = [
  {
    id: "jpg-to-pdf",
    name: "JPG to PDF",
    description: "Convert JPG images to PDF documents",
    icon: "FileImage",
    path: "/jpg-to-pdf",
    category: "convert",
    color: "from-blue-500 to-cyan-500",
    href: "/jpg-to-pdf"
  },
  {
    id: "pdf-to-jpg",
    name: "PDF to JPG",
    description: "Convert PDF pages to JPG images",
    icon: "FileOutput",
    path: "/pdf-to-jpg",
    category: "convert",
    color: "from-green-500 to-emerald-500",
    href: "/pdf-to-jpg"
  },
  {
    id: "png-to-jpg",
    name: "PNG to JPG",
    description: "Convert PNG images to JPG format",
    icon: "Image",
    path: "/png-to-jpg",
    category: "convert",
    color: "from-purple-500 to-pink-500",
    href: "/png-to-jpg"
  },
  {
    id: "merge-pdf",
    name: "Merge PDF",
    description: "Combine multiple PDF files into one",
    icon: "Combine",
    path: "/merge-pdf",
    category: "pdf",
    color: "from-orange-500 to-red-500",
    href: "/merge-pdf"
  },
  {
    id: "split-pdf",
    name: "Split PDF",
    description: "Split PDF into separate pages",
    icon: "Scissors",
    path: "/split-pdf",
    category: "pdf",
    color: "from-yellow-500 to-amber-500",
    href: "/split-pdf"
  },
  {
    id: "compress-pdf",
    name: "Compress PDF",
    description: "Reduce PDF file size",
    icon: "Minimize2",
    path: "/compress-pdf",
    category: "pdf",
    color: "from-indigo-500 to-blue-500",
    href: "/compress-pdf"
  },
  {
    id: "compress-image",
    name: "Compress Image",
    description: "Reduce JPG/PNG file size",
    icon: "ImageDown",
    path: "/compress-image",
    category: "image",
    color: "from-emerald-500 to-green-500",
    href: "/compress-image"
  },
  {
    id: "extract-pages",
    name: "Extract Pages",
    description: "Extract specific pages from PDF",
    icon: "FileStack",
    path: "/extract-pages",
    category: "pdf",
    color: "from-rose-500 to-pink-500",
    href: "/extract-pages"
  },
  {
    id: "remove-pages",
    name: "Remove Pages",
    description: "Delete specific pages from PDF",
    icon: "Trash2",
    path: "/remove-pages",
    category: "pdf",
    color: "from-teal-500 to-cyan-500",
    href: "/remove-pages"
  },
  {
    id: "rotate-pdf",
    name: "Rotate PDF",
    description: "Rotate PDF pages",
    icon: "RotateCw",
    path: "/rotate-pdf",
    category: "pdf",
    color: "from-violet-500 to-purple-500",
    href: "/rotate-pdf"
  },
];