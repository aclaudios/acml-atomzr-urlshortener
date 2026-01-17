import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const LegalNotice = () => {
  return (
    <>
      <Helmet>
        <title>Legal Notice - Atomzr</title>
        <meta name="description" content="Legal notice and imprint for the Atomzr application." />
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
            <h1 className="text-3xl font-bold mb-6">Legal Notice (Imprint)</h1>
            <div className="prose max-w-none">
              <p className="text-gray-500">Information according to § 5 TMG (German Telemedia Act)</p>

              <h2 className="text-xl font-semibold mt-6">Responsible Entity</h2>
              <p>
                <strong>[Your Company Name / Your Name]</strong><br />
                [Your Street Address]<br />
                [Your City, Postal Code]<br />
                [Your Country]
              </p>
              <p><em>(This is placeholder information. Please replace it with your actual details.)</em></p>

              <h2 className="text-xl font-semibold mt-6">Contact</h2>
              <p>
                <strong>Email:</strong> <a href="mailto:legal@atomzr.com" className="text-purple-600 hover:underline">legal@atomzr.com</a><br />
                <strong>Phone:</strong> [Your Phone Number] (optional)
              </p>

              <h2 className="text-xl font-semibold mt-6">VAT ID</h2>
              <p>
                VAT identification number according to §27a Value Added Tax Act:<br />
                [Your VAT ID]
              </p>

              <h2 className="text-xl font-semibold mt-6">Disclaimer</h2>
              <p>The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents' accuracy, completeness, or topicality. According to statutory provisions, we are furthermore responsible for our own content on these web pages. In this matter, please note that we are not obliged to monitor the transmitted or saved information of third parties, or investigate circumstances pointing to illegal activity.</p>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default LegalNotice;