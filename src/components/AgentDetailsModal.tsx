
import React from 'react';
import { X } from 'lucide-react';
import { Agent } from './AgentCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface AgentDetailsModalProps {
  agent: Agent | null;
  isOpen: boolean;
  onClose: () => void;
}

const AgentDetailsModal: React.FC<AgentDetailsModalProps> = ({ agent, isOpen, onClose }) => {
  const { t } = useLanguage();
  
  if (!agent) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4 md:px-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          ></motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="relative bg-white dark:bg-krushal-darkPurple max-w-4xl w-full rounded-xl shadow-xl overflow-hidden z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-2 h-48 md:h-full min-h-[12rem] bg-gray-100 dark:bg-gray-800">
                {agent.image ? (
                  <img
                    src={agent.image}
                    alt={agent.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-krushal-purple/20 to-krushal-lightPurple/20">
                    <span className="text-krushal-purple dark:text-krushal-lavender text-6xl font-bold opacity-50">
                      {agent.title.substring(0, 2)}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="md:col-span-3 p-6 pt-4 md:pt-6 md:pr-12 overflow-y-auto max-h-[80vh]">
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-krushal-lavender/30 text-krushal-darkPurple dark:text-krushal-lavender">
                    {agent.category}
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-krushal-darkPurple dark:text-white mb-4">
                  {agent.title}
                </h2>
                
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>{agent.description}</p>
                  
                  {agent.features && agent.features.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3 text-krushal-darkPurple dark:text-white">{t('modal.features')}</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {agent.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button className="px-6 py-3 bg-krushal-purple text-white rounded-md font-medium hover:bg-krushal-brightPurple transition-colors shadow-sm hover:shadow-md">
                    {t('modal.try')}
                  </button>
                  
                  <button className="px-6 py-3 border border-krushal-purple text-krushal-purple rounded-md font-medium hover:bg-krushal-purple/10 transition-colors">
                    {t('modal.info')}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AgentDetailsModal;
