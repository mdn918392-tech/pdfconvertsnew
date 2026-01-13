"use client";

import { Shield, Lock, Server, Clock, Key, Globe, AlertTriangle, CheckCircle, Zap, FileText } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 border-b border-gray-800">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-3 bg-blue-900/30 text-blue-300 px-4 py-2 rounded-full mb-6">
            <Shield className="w-5 h-5" />
            <span className="font-medium">Security</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Document Security
            </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Your files are protected with enterprise security. We never store or access your documents.
          </p>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Security Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Lock className="w-8 h-8 text-green-400" />,
                title: "Encryption",
                desc: "256-bit SSL/TLS encryption for all transfers"
              },
              {
                icon: <Clock className="w-8 h-8 text-blue-400" />,
                title: "Auto Delete",
                desc: "Files deleted within 1 hour"
              },
              {
                icon: <Server className="w-8 h-8 text-purple-400" />,
                title: "Secure Processing",
                desc: "Files processed in isolated environments"
              },
              {
                icon: <Key className="w-8 h-8 text-yellow-400" />,
                title: "No Storage",
                desc: "We never store your files"
              },
              {
                icon: <Globe className="w-8 h-8 text-red-400" />,
                title: "Compliance",
                desc: "GDPR and CCPA compliant"
              },
              {
                icon: <FileText className="w-8 h-8 text-indigo-400" />,
                title: "No Access",
                desc: "We never read your document content"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-8 border border-gray-800">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-gray-900/50">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">How We Protect You</h2>
          
          <div className="space-y-8">
            {[
              {
                title: "Secure Upload",
                desc: "Your file is encrypted during upload with 256-bit encryption"
              },
              {
                title: "Protected Processing",
                desc: "Processed in secure containers, isolated from other users"
              },
              {
                title: "Automatic Cleanup",
                desc: "Files automatically deleted after processing"
              }
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-400">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Security Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                q: "Do you store my files?",
                a: "No. Files are automatically deleted within 1 hour."
              },
              {
                q: "Can you read my documents?",
                a: "No. We never access or read your document content."
              },
              {
                q: "Is my data shared?",
                a: "No. We do not share your files with third parties."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{faq.q}</h3>
                    <p className="text-gray-400">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
    </div>
  );
}