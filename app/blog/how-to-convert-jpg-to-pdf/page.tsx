import { metadata } from './metadata';

export const dynamic = 'force-static'; // optional, to force static generation

export default function JPGtoPDFBlog() {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">{metadata.title}</h1>
      <p className="text-gray-400 mb-6">{metadata.date}</p>
      <div className="prose dark:prose-dark">
        <p>Converting JPG images to PDF is a common task for sharing or archiving images. Follow these simple steps to quickly convert your JPG files into a PDF document online or offline.</p>

        <h2>Step 1: Gather Your JPG Images</h2>
        <p>Ensure all the JPG images you want to convert are saved in a single folder on your device. This makes uploading easier and helps maintain the order of images in the PDF.</p>

        <h2>Step 2: Choose a Conversion Method</h2>
        <p>You have two main options:</p>
        <ul>
          <li><strong>Online Tools:</strong> Websites like SmallPDF, iLovePDF, or our tool allow you to upload images and convert them instantly without installing software.</li>
          <li><strong>Offline Tools:</strong> Software like Adobe Acrobat, Preview (Mac), or PDFCreator (Windows) can convert images offline.</li>
        </ul>

        <h2>Step 3: Upload Your JPG Images</h2>
        <p>If you are using an online tool:</p>
        <ol>
          <li>Go to the JPG to PDF conversion page.</li>
          <li>Click on the “Upload” button and select all your JPG files.</li>
          <li>Arrange them in the order you want them to appear in the PDF.</li>
        </ol>

        <h2>Step 4: Customize Your PDF Settings</h2>
        <p>Most tools allow you to adjust settings like:</p>
        <ul>
          <li>Page size (A4, Letter, etc.)</li>
          <li>Orientation (Portrait or Landscape)</li>
          <li>Margins and image alignment</li>
        </ul>

        <h2>Step 5: Convert and Download</h2>
        <p>Click the “Convert” or “Create PDF” button. Once the conversion is complete, download the PDF file to your device.</p>

        <h2>Step 6: Verify the PDF</h2>
        <p>Open the downloaded PDF and check that all images are in the correct order and the quality is satisfactory. If needed, you can repeat the steps and adjust settings.</p>

        <h2>Tips for Best Results</h2>
        <ul>
          <li>Use high-resolution JPGs to maintain quality.</li>
          <li>If you have many images, compress them before conversion to reduce PDF file size.</li>
          <li>Check the page orientation to match your images for better display.</li>
        </ul>

        <p>By following these steps, you can easily convert JPG images to a PDF, making it simple to share, print, or archive your images.</p>
      </div>
    </div>
  );
}
