import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookies' },
    { name: 'Legal Notice', path: '/legal' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-gray-400"
    >
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/favicon.svg" alt="Atomzr Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-white">Atomzr</span>
            </Link>
            <p className="text-sm">
              A free, fast, and reliable URL shortener. An experimental project where links may expire after one year.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="mailto:contact@atomzr.com" className="hover:text-white transition-colors"><Mail size={20} /></a>
            </div>
          </div>
          
          <div>
            <p className="font-semibold text-white tracking-wide">Legal</p>
            <ul className="mt-4 space-y-2">
              {footerLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm hover:text-white transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white tracking-wide">Contact</p>
            <p className="mt-4 text-sm">
              For any questions, please reach out to us.
            </p>
            <a href="mailto:contact@atomzr.com" className="mt-2 inline-block text-sm text-purple-400 hover:text-purple-300 transition-colors">
              contact@atomzr.com
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Atomzr. All rights reserved. Built with ❤️.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;