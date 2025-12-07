import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress Images Online - Fast & Free",
  description: "Compress image files online quickly and efficiently. Reduce image size without losing quality in one click.",
  keywords: [
    "compress image",
    "reduce image size",
    "optimize image",
    "image optimizer",
    "online image compression",
    "free image compressor",
  ],
  authors: [
    { name: "Your Name or Company", url: "https://yourwebsite.com" }
  ],
  creator: "Your Name or Company",
  publisher: "Your Company",
  robots: "index, follow",
  openGraph: {
    title: "Compress Images Online - Fast & Free",
    description: "Compress image files online quickly and efficiently. Fast, simple, and free!",
    url: "https://yourwebsite.com/compress-image",
    siteName: "Image Tools Pro",
    images: [
      {
        url: "/og-compress-image.png", // OG image specific for Compress Image
        width: 1200,
        height: 630,
        alt: "Compress Images Online",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress Images Online - Fast & Free",
    description: "Compress image files online quickly and efficiently.",
    images: ["/og-compress-image.png"],
    creator: "@YourTwitterHandle",
  },
  icons: {
    icon: "/icons/icon-192.png",
    shortcut: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
  manifest: "/manifest.json",
};
