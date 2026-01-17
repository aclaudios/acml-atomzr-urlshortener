import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Feature Not Implemented",
      description: "This contact form is for demonstration only. Please email us directly.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Atomzr</title>
        <meta name="description" content="Get in touch with the Atomzr team. We'd love to hear from you." />
      </Helmet>
      <div className="bg-gray-50 text-gray-800">
        <Header />
        <main className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
              <p className="text-lg text-gray-600">Have a question or feedback? We'd love to hear from you.</p>
            </div>
            
            <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="Your Name" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" required />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message..." required rows={5} />
                </div>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Send Message</Button>
              </form>
              <div className="mt-8 text-center">
                <p className="text-gray-600">You can also email us directly at:</p>
                <a href="mailto:contact@atomzr.com" className="text-purple-600 font-semibold hover:underline">contact@atomzr.com</a>
              </div>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;