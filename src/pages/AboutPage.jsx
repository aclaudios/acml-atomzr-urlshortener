import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Zap, Code, Database } from 'lucide-react';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Atomzr - Our Mission and Technology</title>
        <meta name="description" content="Learn about Atomzr, an experimental microsaas for URL shortening built with modern technology." />
      </Helmet>
      <div className="bg-gray-50 text-gray-800">
        <Header />
        <main className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">About Atomzr</h1>
              <p className="text-lg text-gray-600">A small project with a big mission: to make links simple.</p>
            </div>

            <div className="mt-12 bg-white p-8 rounded-lg shadow-md prose max-w-none">
              <h2 className="text-xl font-semibold">Our Purpose</h2>
              <p>Atomzr was born as an experimental microsaas project to explore the capabilities of modern web technologies. Our goal is to provide a free, fast, and reliable URL shortener that is both powerful for developers and easy for everyone to use. We believe in the power of simplicity and elegant design.</p>
              
              <p>As an experimental service, we are constantly learning and evolving. Please note that links created with Atomzr may expire after one year.</p>

              <h2 className="text-xl font-semibold mt-8">Technology Stack</h2>
              <p>We are proud to build Atomzr on a foundation of cutting-edge, open-source technologies:</p>
              
              <div className="grid md:grid-cols-3 gap-8 mt-6 not-prose">
                <div className="text-center p-4 border rounded-lg">
                  <Code className="w-10 h-10 mx-auto text-purple-600" />
                  <h3 className="font-semibold mt-2">Frontend</h3>
                  <p className="text-sm text-gray-600">React, Vite, TailwindCSS, Framer Motion</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Database className="w-10 h-10 mx-auto text-purple-600" />
                  <h3 className="font-semibold mt-2">Backend</h3>
                  <p className="text-sm text-gray-600">Supabase (PostgreSQL, Auth, Edge Functions)</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Zap className="w-10 h-10 mx-auto text-purple-600" />
                  <h3 className="font-semibold mt-2">Hosting</h3>
                  <p className="text-sm text-gray-600">Vercel / Netlify</p>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;