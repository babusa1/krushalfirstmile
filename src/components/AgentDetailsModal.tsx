import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Agent } from './AgentCard';
import ContactForm from './ContactForm';

interface AgentDetailsModalProps {
  agent: Agent | null;
  isOpen: boolean;
  onClose: () => void;
}

const AgentDetailsModal: React.FC<AgentDetailsModalProps> = ({ agent, isOpen, onClose }) => {
  const { t } = useLanguage();
  const [showContactForm, setShowContactForm] = useState(false);

  if (!agent) return null;

  const handleRequestInfo = () => {
    setShowContactForm(true);
  };

  const handleCloseContactForm = () => {
    setShowContactForm(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>

            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-krushal-darkPurple dark:text-white mb-2">
                  {agent.title}
                </h2>
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-deep-purple-100 dark:bg-deep-purple-900 text-deep-purple-700 dark:text-deep-purple-300">
                  {agent.category}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {agent.description}
              </p>

              {agent.features && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-krushal-darkPurple dark:text-white mb-4">
                    {t('modal.features')}
                  </h3>
                  <ul className="space-y-3">
                    {agent.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <ArrowRight className="h-5 w-5 text-deep-purple-500 dark:text-deep-purple-300 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="flex-1 px-6 py-3 bg-deep-purple-500 hover:bg-deep-purple-600 text-white rounded-lg font-medium transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  onClick={() => window.open('#', '_blank')}
                >
                  {t('modal.try')}
                  <ArrowRight className="h-4 w-4" />
                </button>
                
                <button
                  className="flex-1 px-6 py-3 border border-deep-purple-500 text-deep-purple-500 hover:bg-deep-purple-50 dark:border-deep-purple-400 dark:text-deep-purple-400 dark:hover:bg-deep-purple-900 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  onClick={handleRequestInfo}
                >
                  {t('modal.info')}
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Modal */}
          <AnimatePresence>
            {showContactForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
                onClick={handleCloseContactForm}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
                >
                  <ContactForm onClose={handleCloseContactForm} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AgentDetailsModal;
