
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage, Language, languageNames } from '@/contexts/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };
  
  // Only include English as that's all we currently support
  const languages: Language[] = ['en'];

  return (
    <div className="relative">
      <button 
        onClick={toggleDropdown}
        className="flex items-center space-x-1 text-sm font-medium px-2 py-1 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{languageNames[language]}</span>
        <ChevronDown className="h-4 w-4" />
      </button>
      
      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-1 bg-white dark:bg-krushal-darkPurple shadow-md rounded-md py-1 z-50 min-w-[120px] border border-gray-200 dark:border-gray-700"
        >
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                language === lang 
                  ? 'bg-krushal-purple/10 text-krushal-purple dark:bg-krushal-purple/20 dark:text-krushal-lavender font-medium' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {languageNames[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
