
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-krushal-darkPurple border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <img
                src="/lovable-uploads/f39e4e62-303a-4211-8623-78d6a814b86c.png"
                alt="Krushal.ai"
                className="h-10 w-auto"
              />
              <span className="font-bold text-xl text-krushal-darkPurple dark:text-white">
                Krushal.ai
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              We handpick first mile value chains and fix productivity, quality and access gaps to modernize local economies.
            </p>
            
            <div className="flex space-x-4 pt-2">
              <SocialLink href="#" icon={<Twitter className="h-5 w-5" />} label="Twitter" />
              <SocialLink href="#" icon={<Linkedin className="h-5 w-5" />} label="LinkedIn" />
              <SocialLink href="#" icon={<Facebook className="h-5 w-5" />} label="Facebook" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-krushal-darkPurple dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/agents" label="Agents" />
              <FooterLink href="/about" label="About Us" />
              <FooterLink href="/contact" label="Contact" />
              <FooterLink href="/blog" label="Blog" />
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-krushal-darkPurple dark:text-white mb-4">
              Agent Categories
            </h3>
            <ul className="space-y-3">
              <FooterLink href="/category/agriculture" label="Agriculture & Farming" />
              <FooterLink href="/category/livestock" label="Livestock & Dairy" />
              <FooterLink href="/category/healthcare" label="Healthcare & Medicine" />
              <FooterLink href="/category/education" label="Education & Skill Development" />
              <FooterLink href="/category/technology" label="Technology & Mobile Usage" />
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-krushal-darkPurple dark:text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-krushal-purple dark:text-krushal-lightPurple mt-0.5" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  123 Innovation Street, Tech Park, Bangalore, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-krushal-purple dark:text-krushal-lightPurple" />
                <a href="mailto:info@krushal.ai" className="text-gray-600 dark:text-gray-300 text-sm hover:text-krushal-purple dark:hover:text-krushal-lightPurple transition-colors">
                  info@krushal.ai
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-krushal-purple dark:text-krushal-lightPurple" />
                <a href="tel:+919876543210" className="text-gray-600 dark:text-gray-300 text-sm hover:text-krushal-purple dark:hover:text-krushal-lightPurple transition-colors">
                  +91 9876 543 210
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Krushal.ai. All rights reserved. First Mile as a Service™
          </p>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => (
  <a 
    href={href}
    aria-label={label}
    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-krushal-darkPurple dark:text-gray-300 transition-colors"
  >
    {icon}
  </a>
);

interface FooterLinkProps {
  href: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, label }) => (
  <li>
    <Link 
      to={href}
      className="text-gray-600 dark:text-gray-300 text-sm hover:text-krushal-purple dark:hover:text-krushal-lightPurple transition-colors"
    >
      {label}
    </Link>
  </li>
);

export default Footer;
