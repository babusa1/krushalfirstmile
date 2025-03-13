
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  shortName?: string; // Added shortName for mobile display
  description: string;
  icon: React.ReactNode;
}

interface CategorySectionProps {
  onCategoryClick: (category: string) => void;
  onExploreCategory: (category: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ onCategoryClick, onExploreCategory }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const categories: Category[] = [
    {
      id: "Agriculture & Farming",
      name: t('category.agriculture'),
      shortName: "Agriculture",
      description: "Best farming techniques, crop diseases, weather forecasts, government schemes, market prices, fertilizers & pesticides",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    },
    {
      id: "Livestock & Dairy",
      name: t('category.livestock'),
      shortName: "Livestock",
      description: "Cattle, poultry, goat, and fish farming, animal diseases, veterinary care, dairy production, government subsidies",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      )
    },
    {
      id: "Government Schemes & Subsidies",
      name: t('category.schemes'),
      shortName: "Govt. Schemes",
      description: "MGNREGA, PM-Kisan, Kisan Credit Card, PMAY-Gramin, Ayushman Bharat, Mudra loans, Fasal Bima Yojana",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: "Healthcare & Medicine",
      name: t('category.healthcare'),
      shortName: "Healthcare",
      description: "Free or affordable medical care, common disease remedies, nearest PHCs/CHCs, maternal & child health, vaccinations",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      id: "Education & Skill Development",
      name: t('category.education'),
      shortName: "Education",
      description: "Government scholarships, free online courses, vocational training (IT, carpentry, tailoring), English learning",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      )
    },
    {
      id: "Employment & Livelihood",
      name: t('category.employment'),
      shortName: "Employment",
      description: "Government job vacancies (railways, teaching, police), private jobs, work-from-home, urban job migration",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: "Digital & Financial Services",
      name: t('category.financial'),
      shortName: "Digital Finance",
      description: "Online banking (UPI, Aadhaar-linked payments), KYC documentation, accessing govt portals (DigiLocker, UMANG), cybersecurity awareness",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      id: "Weather & Disaster Management",
      name: t('category.weather'),
      shortName: "Weather",
      description: "Rainfall predictions, flood & drought preparedness, cyclone alerts, disaster relief funds",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      )
    },
    {
      id: "Technology & Mobile Usage",
      name: t('category.technology'),
      shortName: "Technology",
      description: "Smartphone usage for business & learning, social media (WhatsApp, Facebook, YouTube), internet connectivity",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const handleExploreClick = (e: React.MouseEvent, categoryId: string) => {
    e.stopPropagation();
    navigate(`/agents?category=${encodeURIComponent(categoryId)}`);
  };

  return (
    <section className="py-8 px-4 sm:px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-krushal-darkPurple dark:text-white mb-3 sm:mb-4">
            {t('categories.title')}
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('categories.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="category-card-mobile hover:bg-gray-50 dark:hover:bg-gray-800/80 group cursor-pointer"
              onClick={() => onCategoryClick(category.id)}
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-krushal-lavender shrink-0">
                  {category.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="category-card-mobile-title group-hover:text-primary dark:group-hover:text-krushal-lightPurple transition-colors">
                    {/* Use shortName for screens smaller than sm breakpoint */}
                    <span className="sm:hidden">{category.shortName || category.name}</span>
                    <span className="hidden sm:inline">{category.name}</span>
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2 line-clamp-2 sm:line-clamp-3">
                    {category.description}
                  </p>
                  <div 
                    className="flex items-center text-sm sm:text-base font-medium text-krushal-purple dark:text-krushal-lightPurple"
                    onClick={(e) => handleExploreClick(e, category.id)}
                  >
                    <span>{t('categories.explore')}</span>
                    <ChevronRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
