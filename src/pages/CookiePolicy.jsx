import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const CookiePolicy = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - Atomzr</title>
        <meta name="description" content="Understand how Atomzr uses cookies and other tracking technologies." />
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
            <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
            <div className="prose max-w-none">
              <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

              <h2 className="text-xl font-semibold mt-6">1. What Are Cookies?</h2>
              <p>Cookies are small text files stored on your device (computer, tablet, mobile phone) when you visit certain websites. They are used to 'remember' you and your preferences, either for a single visit (through a 'session cookie') or for multiple repeat visits (using a 'persistent cookie').</p>

              <h2 className="text-xl font-semibold mt-6">2. How We Use Cookies</h2>
              <p>We use cookies for several purposes:</p>
              <ul>
                <li><strong>Essential Cookies:</strong> These are necessary for the website to function and cannot be switched off. We use cookies from Supabase for authentication to keep you logged in.</li>
                <li><strong>Analytics Cookies:</strong> We use these to understand how you use our website, which helps us improve performance. We use Microsoft Clarity to collect anonymous data about user interactions.</li>
                <li><strong>Advertising Cookies:</strong> We use Google AdSense to display advertisements. These cookies may be used to build a profile of your interests and show you relevant ads on other sites.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6">3. Your Choices</h2>
              <p>Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">www.allaboutcookies.org</a>.</p>
              <p>Please note that if you choose to block cookies, it may impair or prevent due functioning of the Service.</p>

              <h2 className="text-xl font-semibold mt-6">4. Contact Us</h2>
              <p>If you have any questions about our use of cookies, please contact us at <a href="mailto:cookies@atomzr.com" className="text-purple-600 hover:underline">cookies@atomzr.com</a>.</p>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CookiePolicy;