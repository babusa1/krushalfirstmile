
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const RequestForm: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleFormClick = () => {
    navigate('/submit-agent');
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-12 rounded-xl bg-white dark:bg-krushal-darkPurple/90 shadow-md border border-gray-200 dark:border-gray-800">
      <div className="text-center mb-8">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-krushal-darkPurple dark:text-white mb-3"
        >
          {t('form.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-600 dark:text-gray-300"
        >
          {t('form.description')}
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center"
      >
        <button
          onClick={handleFormClick}
          className="w-full sm:w-auto px-8 py-4 bg-krushal-purple text-white rounded-lg font-medium hover:bg-krushal-brightPurple transition-colors shadow-sm hover:shadow-md"
        >
          {t('form.submit')}
        </button>
      </motion.div>
    </div>
  );
};

export default RequestForm;
