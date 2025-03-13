import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Facebook } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContactForm from './ContactForm';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [showContactForm, setShowContactForm] = React.useState(false);

  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  return (
    <footer className="bg-white dark:bg-krushal-darkPurple border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div>
              <img
                src="/lovable-uploads/f39e4e62-303a-4211-8623-78d6a814b86c.png"
                alt="Krushal"
                className="h-10 w-auto"
              />
            </div>
            
            <div className="flex space-x-4 pt-2">
              <SocialLink 
                href="https://www.facebook.com/KrushalOC" 
                icon={<Facebook className="h-5 w-5" />} 
                label="Facebook" 
              />
              <SocialLink 
                href="https://www.linkedin.com/company/krushal/" 
                icon={<Linkedin className="h-5 w-5" />} 
                label="LinkedIn" 
              />
            </div>
            
            <div>
              <button 
                onClick={toggleContactForm}
                className="px-4 py-2 bg-deep-purple-500 hover:bg-deep-purple-600 text-white rounded-md transition-colors flex items-center gap-2 text-sm"
              >
                <Mail className="h-4 w-4" />
                {t('footer.sendMessage')}
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-krushal-darkPurple dark:text-white mb-4">
              {t('footer.quicklinks')}
            </h3>
            <ul className="space-y-3">
              <FooterLink href="/" label={t('nav.home')} />
              <FooterLink href="/agents" label={t('nav.agents')} />
              <FooterLink href="/about" label={t('nav.about')} />
              <FooterLink href="/contact" label={t('nav.contact')} />
              {/* Removed Blog link */}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-krushal-darkPurple dark:text-white mb-4">
              {t('footer.categories')}
            </h3>
            <ul className="space-y-3">
              <FooterLink href="/category/agriculture" label={t('category.agriculture')} />
              <FooterLink href="/category/livestock" label={t('category.livestock')} />
              <FooterLink href="/category/healthcare" label={t('category.healthcare')} />
              <FooterLink href="/category/education" label={t('category.education')} />
              <FooterLink href="/category/technology" label={t('category.technology')} />
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-krushal-darkPurple dark:text-white mb-4">
              {t('footer.contactus')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-deep-orange-500 dark:text-deep-orange-300 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  L-148, 5TH Main Road<br />
                  Sector 6, HSR Layout<br />
                  Bengaluru, Karnataka 560102<br />
                  India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-deep-orange-500 dark:text-deep-orange-300" />
                <a href="mailto:info@krushal.in" className="text-gray-600 dark:text-gray-300 text-sm hover:text-deep-purple-500 dark:hover:text-deep-purple-300 transition-colors">
                  info@krushal.in
                </a>
              </li>
              <li className="flex flex-col space-y-1">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-deep-orange-500 dark:text-deep-orange-300" />
                  <a href="tel:+918956019197" className="text-gray-600 dark:text-gray-300 text-sm hover:text-deep-purple-500 dark:hover:text-deep-purple-300 transition-colors">
                    +91 89560 19197
                  </a>
                </div>
                <div className="flex items-center space-x-3 ml-8">
                  <span className="text-gray-500 dark:text-gray-400 text-xs">
                    Mon-Fri: 9:00 AM - 6:00 PM IST
                  </span>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
        
        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={toggleContactForm}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <ContactForm onClose={toggleContactForm} />
            </div>
          </div>
        )}
        
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Krushal. {t('footer.copyright')}
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
    target="_blank"
    rel="noopener noreferrer"
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
      className="text-gray-600 dark:text-gray-300 text-sm hover:text-deep-purple-500 dark:hover:text-deep-purple-300 transition-colors"
    >
      {label}
    </Link>
  </li>
);

export default Footer;
