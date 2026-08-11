import { Metadata, Viewport } from 'next';
import Link from 'next/link';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact PDFSwift | Get in Touch & Send Feedback',
  description: 'Have questions or feedback? Reach out to PDFSwift. We\'d love to hear from you.',
  keywords: ['contact', 'feedback', 'support', 'PDF tools help'],
  openGraph: {
    title: 'Contact PDFSwift | Get in Touch & Send Feedback',
    description: 'Have questions or feedback? Reach out to PDFSwift.',
    url: 'https://pdfswift.online/contact',
    siteName: 'PDFSwift',
    images: [
      {
        url: 'https://pdfswift.online/images/og-image-contact.jpg',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact PDFSwift | Get in Touch & Send Feedback',
    description: 'Have questions or feedback? Reach out to PDFSwift.',
    images: ['https://pdfswift.online/images/og-image-contact.jpg'],
    creator: '@PDFSwift',
  },
};

// ✅ FIX: themeColor moved to viewport export
export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact <span className="text-blue-600">PDFSwift</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a question, suggestion, or feedback? We're all ears!
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <ContactForm />
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>You can also reach us directly at:</p>
          <a href="mailto:support@pdfswift.online" className="text-blue-600 hover:underline font-medium">
            pdfswift94@gmail.com
          </a>
        </div>

        <nav aria-label="Breadcrumb" className="mt-12 text-sm text-gray-600">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium" aria-current="page">
                Contact
              </span>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
}