import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Atomzr</title>
        <meta name="description" content="Read the Terms of Service for using the Atomzr application." />
      </Helmet>
      <div className="bg-gray-50 text-gray-800">
        <Header />
        <main className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md"
          >
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <div className="prose max-w-none">
              <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

              <h2 className="text-xl font-semibold mt-6">1. Agreement to Terms</h2>
              <p>By using our Service, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the Service.</p>

              <h2 className="text-xl font-semibold mt-6">2. User Responsibilities</h2>
              <p>You are responsible for your use of the Service and for any content you provide, including compliance with applicable laws, rules, and regulations. You should only provide content that you are comfortable sharing with others.</p>

              <h2 className="text-xl font-semibold mt-6">3. Prohibited Actions</h2>
              <p>You may not use the Service to shorten URLs that link to content that is illegal, malicious, or violates the rights of others. This includes, but is not limited to:</p>
              <ul>
                <li>Spam or unsolicited advertising.</li>
                <li>Malware, phishing sites, or other harmful content.</li>
                <li>Content that is defamatory, obscene, or hateful.</li>
              </ul>
              <p>We reserve the right to disable any link that violates these terms without notice.</p>

              <h2 className="text-xl font-semibold mt-6">4. Disclaimers and Limitation of Liability</h2>
              <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Atomzr is an experimental project, and we do not guarantee that the service will be uninterrupted or error-free. Links created with the service may expire after one year. We are not liable for any damages or losses arising from your use of the Service.</p>

              <h2 className="text-xl font-semibold mt-6">5. Changes to Terms</h2>
              <p>We may modify these Terms at any time. We will notify you of any changes by posting the new Terms of Service on this page. Your continued use of the Service after the changes have been made will constitute your acceptance of the changes.</p>

              <h2 className="text-xl font-semibold mt-6">6. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at <a href="mailto:legal@atomzr.com" className="text-purple-600 hover:underline">legal@atomzr.com</a>.</p>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TermsOfService;