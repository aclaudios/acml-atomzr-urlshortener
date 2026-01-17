import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Atomzr</title>
        <meta name="description" content="Learn how Atomzr collects, uses, and protects your data. Read our Privacy Policy." />
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
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <div className="prose max-w-none">
              <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
              
              <h2 className="text-xl font-semibold mt-6">1. Introduction</h2>
              <p>Welcome to Atomzr. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service. Please read this privacy policy carefully.</p>

              <h2 className="text-xl font-semibold mt-6">2. Information We Collect</h2>
              <p>We may collect information about you in a variety of ways. The information we may collect on the Service includes:</p>
              <ul>
                <li><strong>Personal Data:</strong> When you register using Google Authentication, we collect your email address and name as provided by Google. This is managed through our backend provider, Supabase.</li>
                <li><strong>Usage Data:</strong> We automatically collect information when you access and use the Service. This includes your IP address, browser type, operating system, and information about the links you create and click.</li>
                <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to track activity on our Service and hold certain information. For more details, please see our Cookie Policy.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, operate, and maintain our Service.</li>
                <li>Associate shortened links with your account.</li>
                <li>Analyze usage to improve the Service.</li>
                <li>Comply with legal obligations.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6">4. Third-Party Services</h2>
              <p>We use the following third-party services:</p>
              <ul>
                <li><strong>Supabase:</strong> For database storage, authentication, and backend infrastructure. Your data, including user information and links, is stored on Supabase.</li>
                <li><strong>Google Authentication:</strong> To allow you to sign up and log in to our service.</li>
                <li><strong>Microsoft Clarity:</strong> To analyze user behavior and improve our website's user experience.</li>
                <li><strong>Google AdSense:</strong> To display ads on our service.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6">5. Data Security</h2>
              <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security measures are perfect or impenetrable.</p>

              <h2 className="text-xl font-semibold mt-6">6. Contact Us</h2>
              <p>If you have questions or comments about this Privacy Policy, please contact us at <a href="mailto:privacy@atomzr.com" className="text-purple-600 hover:underline">privacy@atomzr.com</a>.</p>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;