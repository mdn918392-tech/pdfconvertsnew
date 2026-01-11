import { metadata } from "./metadata";
import { 
  CalendarDays, 
  FileImage, 
  Shield, 
  CheckCircle, 
  Lightbulb,
  ArrowRight,
  Sparkles,
  Clock,
  Smartphone,
  Laptop,
  FileText, // Using FileText as an alternative to FilePdf
  File,
  Upload,
  Download,
  Lock,
  Settings
} from "lucide-react";

export const dynamic = "force-static";

export default function JPGtoPDFBlog() {
  const tips = [
    "Use high-resolution images for better clarity",
    "Compress images to reduce PDF file size if needed",
    "Match page orientation with image orientation",
    "Remove unnecessary borders or blank spaces",
    "Always preview before sharing or printing"
  ];

  const benefits = [
    "PDFs combine multiple images into a single file",
    "They are easier to email and upload",
    "PDFs maintain consistent layout across devices",
    "They are better suited for printing and archiving",
    "PDFs can be password-protected for security"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="text-center mb-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
            <FileImage className="w-4 h-4 mr-2" />
            Digital Document Guide
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {metadata.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-gray-600 dark:text-gray-400 mb-8">
            <div className="flex items-center">
              <CalendarDays className="w-5 h-5 mr-2" />
              <span className="font-medium">{metadata.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span className="font-medium">5 min read</span>
            </div>
          </div>
        </div>

        {/* Hero Image/Illustration */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 p-8 mb-12">
          <div className="relative z-10 text-white">
            <div className="flex items-center justify-between">
              <div className="max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Transform Your Images</h2>
                <p className="text-blue-100 mb-6">
                  Turn scattered JPGs into organized, professional PDF documents with our comprehensive guide
                </p>
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg flex items-center">
                    <FileImage className="w-5 h-5 mr-2" />
                    <span className="font-medium">JPG</span>
                  </div>
                  <ArrowRight className="w-6 h-6" />
                  <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    <span className="font-medium">PDF</span>
                  </div>
                </div>
              </div>
              <Sparkles className="w-24 h-24 opacity-50 hidden md:block" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="prose prose-lg dark:prose-dark max-w-none">
              {/* Introduction */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Converting JPG images to PDF is one of the most common digital tasks today. Whether you are a student submitting assignments, a professional sharing scanned documents, or someone archiving personal photos, combining multiple JPG images into a single PDF file makes sharing, printing, and storing files much easier.
                </p>
              </div>

              {/* Why Convert Section */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                    <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Convert JPG to PDF?</h2>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  JPG is a popular image format, but managing multiple JPG files can be inconvenient. PDFs, on the other hand, are designed for documents and multi-page layouts. Here are some key reasons why people prefer PDF over JPG for document sharing:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="flex items-start p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps Section */}
              <div className="space-y-12">
                {[
                  {
                    step: "1",
                    title: "Gather Your JPG Images",
                    icon: Smartphone,
                    content: "Start by collecting all the JPG images you want to convert. Make sure the images are complete, readable, and stored in one folder on your device. If the images are scanned documents, check that they are not blurry and that all important details are clearly visible.",
                    additional: "Organizing your images beforehand also helps you maintain the correct order when creating the PDF, especially if you are converting multiple images into a single document."
                  },
                  {
                    step: "2",
                    title: "Choose a Conversion Method",
                    icon: Laptop,
                    content: "There are two main ways to convert JPG images to PDF: online tools and offline software. Each method has its own advantages depending on your needs.",
                    methods: [
                      {
                        type: "Online Tools",
                        icon: "🌐",
                        points: [
                          "Accessible from any device with a browser",
                          "No software installation needed",
                          "Usually free for basic usage"
                        ]
                      },
                      {
                        type: "Offline Tools",
                        icon: "💻",
                        points: [
                          "Works without internet access",
                          "More control over advanced settings",
                          "Better for sensitive or confidential documents"
                        ]
                      }
                    ]
                  },
                  {
                    step: "3",
                    title: "Upload or Select Your JPG Images",
                    content: "If you are using an online JPG to PDF converter, navigate to the tool's page and click on the upload button. Select all the JPG images you want to include in the PDF. Most tools support drag-and-drop functionality, which makes the process even faster.",
                    additional: "Once uploaded, you can rearrange the images to control the order in which they appear in the final PDF. This is especially important for multi-page documents like reports or scanned notes."
                  },
                  {
                    step: "4",
                    title: "Customize PDF Settings",
                    content: "Many JPG to PDF tools allow you to customize the output before conversion. These settings help you optimize the PDF for readability and file size.",
                    settings: [
                      "Page size (A4, Letter, or original image size)",
                      "Orientation (portrait or landscape)",
                      "Margins and alignment",
                      "Image compression level"
                    ]
                  },
                  {
                    step: "5",
                    title: "Convert and Download the PDF",
                    content: "After adjusting the settings, click the 'Convert' or 'Create PDF' button. The tool will process your images and generate a PDF file. Depending on the number and size of images, this may take a few seconds to a minute.",
                    additional: "Once the conversion is complete, download the PDF to your device. Make sure to save it in a secure location where you can easily find it later."
                  },
                  {
                    step: "6",
                    title: "Verify the Output",
                    content: "Always open the downloaded PDF and review it carefully. Check that all images are present, correctly ordered, and displayed clearly. Verify text readability, orientation, and margins.",
                    additional: "If something doesn't look right, you can repeat the process and adjust the settings to improve the result."
                  }
                ].map((section) => (
                  <div key={section.step} className="relative">
                    <div className="flex items-start mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-xl mr-4 flex-shrink-0">
                        {section.step}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white pt-2">
                        {section.title}
                      </h3>
                    </div>
                    
                    <div className="ml-16">
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{section.content}</p>
                      
                      {section.additional && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-4 rounded-r">
                          <p className="text-gray-700 dark:text-gray-300">{section.additional}</p>
                        </div>
                      )}
                      
                      {section.methods && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                          {section.methods.map((method, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                              <div className="flex items-center mb-3">
                                <span className="text-2xl mr-3">{method.icon}</span>
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{method.type}</h4>
                              </div>
                              <ul className="space-y-2">
                                {method.points.map((point, pointIdx) => (
                                  <li key={pointIdx} className="flex items-start text-gray-700 dark:text-gray-300">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {section.settings && (
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl mb-4">
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {section.settings.map((setting, idx) => (
                              <li key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                {setting}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    {parseInt(section.step) < 6 && (
                      <div className="ml-16 mt-6 flex justify-center">
                        <ArrowRight className="w-6 h-6 text-gray-400 dark:text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Tips Section */}
              <div className="mt-12">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-800/30">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Lightbulb className="w-6 h-6 text-amber-500 mr-3" />
                    Pro Tips for Best Results
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tips.map((tip, index) => (
                      <div 
                        key={index}
                        className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-amber-100 dark:border-amber-800/30"
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-amber-600 dark:text-amber-400 text-xs font-bold">
                              {index + 1}
                            </span>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800/30">
                <div className="flex items-center mb-6">
                  <Shield className="w-8 h-8 text-green-600 dark:text-green-400 mr-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Security & Privacy</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    When using online JPG to PDF tools, make sure the website uses secure connections (HTTPS) and clearly states its data privacy policy. Avoid uploading highly confidential documents to untrusted platforms.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    If privacy is a concern, consider using offline tools or converters that automatically delete uploaded files after processing. Look for tools with end-to-end encryption for maximum security.
                  </p>
                </div>
              </div>

              {/* Conclusion */}
              <div className="mt-12 text-center">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 text-white rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-4">Ready to Convert?</h3>
                  <p className="text-gray-300 mb-6">
                    Converting JPG images to PDF is a simple yet powerful way to organize, share, and archive visual information. With the right tools and settings, you can create high-quality PDFs in just a few minutes.
                  </p>
                  <p className="text-gray-300">
                    Whether you choose an online converter for convenience or an offline tool for control and privacy, following these steps will help you achieve professional results every time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-8 space-y-6">
              {/* Quick Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-blue-500" />
                  Quick Facts
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Time Required</span>
                    <span className="font-semibold text-gray-900 dark:text-white">1-5 minutes</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Difficulty Level</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">Easy</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Best For</span>
                    <span className="font-semibold text-gray-900 dark:text-white">All Users</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 dark:text-gray-400">Cost</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">Free</span>
                  </div>
                </div>
              </div>

              {/* Tools Comparison */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Method Comparison</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="font-semibold text-gray-900 dark:text-white">Online Tools</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Best for quick, one-time conversions
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <span className="font-semibold text-gray-900 dark:text-white">Offline Software</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Best for frequent use & sensitive documents
                    </p>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                <h4 className="font-bold mb-4">Next Steps</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3" />
                    <span>Try an online converter</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3" />
                    <span>Test with sample images</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3" />
                    <span>Share feedback</span>
                  </li>
                </ul>
                <button className="mt-6 w-full bg-white text-blue-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  Start Converting Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}