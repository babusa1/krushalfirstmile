
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { InfoIcon, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export interface Agent {
  id: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  features?: string[];
}

interface AgentCardProps {
  agent: Agent;
  onClick?: () => void;
  className?: string;
  featured?: boolean;
  delay?: number;
}

const AgentCard: React.FC<AgentCardProps> = ({ 
  agent, 
  onClick, 
  className,
  featured = false,
  delay = 0 
}) => {
  const { t } = useLanguage();

  // Generate a default image URL based on the agent category with improved relevance
  const getCategoryImage = () => {
    const categoryImages = {
      "Digital & Financial Services": "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1200&h=800",
      "Livestock & Dairy": "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1200&h=800",
      "Agriculture & Farming": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&h=800",
      "Healthcare & Medicine": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&h=800",
      "Weather & Disaster Management": "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=1200&h=800",
      "Government Schemes & Subsidies": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&h=800",
      "Education & Skill Development": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&h=800",
      "Employment & Livelihood": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&h=800",
      "Women & Self-Help Groups": "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1200&h=800",
      "Technology & Mobile Usage": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&h=800",
      "Local Governance & Legal Issues": "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=1200&h=800"
    };
    
    return categoryImages[agent.category as keyof typeof categoryImages] || 
           "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?auto=format&fit=crop&w=1200&h=800"; // More tech-focused default
  };

  // Agent-specific images mapping with improved relevance
  const getAgentSpecificImage = () => {
    // Map for specific agent titles to highly relevant images
    const agentImages: Record<string, string> = {
      // Digital & Financial Services
      "Mortgage Document Extractor": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&h=800",
      "Technical Evaluation for Fund Management": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=800",
      "Online Banking Assistance": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&h=800",
      "KYC Documentation Advisor": "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1200&h=800",
      "Digital Payment Solutions Guide": "https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=1200&h=800",
      "Cybersecurity Awareness Agent": "https://images.unsplash.com/photo-1510511233900-1982d92bd835?auto=format&fit=crop&w=1200&h=800",
      
      // Livestock & Dairy
      "Smart Ration Agent for HF and Jersey Cows": "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=1200&h=800",
      "Milk Volume Predictor for Dairy Cows": "https://images.unsplash.com/photo-1534937665259-74edf3b6ced2?auto=format&fit=crop&w=1200&h=800",
      "Livestock Management Advisory": "https://images.unsplash.com/photo-1500595046743-cd271d694e30?auto=format&fit=crop&w=1200&h=800",
      "Animal Disease Identifier": "https://images.unsplash.com/photo-1604077137850-c6d2e2a66483?auto=format&fit=crop&w=1200&h=800",
      "Veterinary Care Assistant": "https://images.unsplash.com/photo-1599443015574-be5fe8a05783?auto=format&fit=crop&w=1200&h=800",
      "Dairy Production Optimizer": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1200&h=800",
      
      // Agriculture & Farming
      "Market Price Predictor": "https://images.unsplash.com/photo-1480944657103-7fed22359e1d?auto=format&fit=crop&w=1200&h=800",
      "Farming Techniques Advisor": "https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=1200&h=800",
      "Crop Disease Identifier": "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&h=800",
      "Fertilizers & Pesticides Advisor": "https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?auto=format&fit=crop&w=1200&h=800",
      "Market Prices for Commodity": "https://images.unsplash.com/photo-1459257831348-f0cdd359235f?auto=format&fit=crop&w=1200&h=800",
      
      // Weather & Disaster Management
      "Weather Forecast Agent": "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?auto=format&fit=crop&w=1200&h=800",
      "Disaster Relief Advisor": "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=1200&h=800",
      "Rainfall Predictor": "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=1200&h=800",
      "Flood & Drought Preparedness Advisor": "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=1200&h=800",
      
      // Healthcare & Medicine
      "Conversational AI for Elders": "https://images.unsplash.com/photo-1516715094483-75da7dee9758?auto=format&fit=crop&w=1200&h=800",
      "Free Medical Care Finder": "https://images.unsplash.com/photo-1516549655669-df918a1973aa?auto=format&fit=crop&w=1200&h=800",
      "Common Disease Remedies Advisor": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&h=800",
      "Nearest PHC/CHC Locator": "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&h=800",
      "Maternal & Child Health Assistant": "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&w=1200&h=800",
      "Vaccination Schedule Advisor": "https://images.unsplash.com/photo-1626319350908-7b7f79d6de3c?auto=format&fit=crop&w=1200&h=800",
      
      // Government & Education
      "Government Subsidies Advisor": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&h=800",
      "Scheme Eligibility Checker": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&h=800",
      "Application Assistant": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&h=800",
      "Government Scholarships Advisor": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&h=800",
      "Free Online Courses Finder": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&h=800",
      
      // Women & Self-Help Groups
      "Business Opportunities for Women": "https://images.unsplash.com/photo-1573496773605-f5b9c6ca5b62?auto=format&fit=crop&w=1200&h=800",
      "Government Loan Advisor for Women Entrepreneurs": "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&h=800",
      "Self-Help Group Support Agent": "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&h=800",
      "Home-Based Business Ideas Advisor": "https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&w=1200&h=800",
      
      // Employment & Technology
      "Government Job Vacancies Finder": "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&h=800",
      "Private Job Opportunities Agent": "https://images.unsplash.com/photo-1568598035424-7070b67317d2?auto=format&fit=crop&w=1200&h=800",
      "Work-from-Home Job Guide": "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=1200&h=800",
      "Smartphone Usage for Business & Learning Advisor": "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=1200&h=800",
      "Social Media Management Agent": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&h=800",
      
      // Legal & Governance
      "Land Records & Property Disputes Advisor": "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?auto=format&fit=crop&w=1200&h=800",
      "RTI & Grievance Redressal Agent": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&h=800",
      "Legal Aid & Property Law Advisor": "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=1200&h=800"
    };
    
    return agentImages[agent.title];
  };

  // First try agent-specific image, then use agent.image if provided, or fall back to category image
  const imageUrl = getAgentSpecificImage() || agent.image || getCategoryImage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      className={cn(
        "relative overflow-hidden rounded-xl card-hover",
        featured ? "bg-gradient-to-br from-white to-[#EDE7F6]/30 dark:from-primary dark:to-[#7E57C2]/30" : "bg-white dark:bg-primary/90",
        "border border-gray-200 dark:border-gray-800",
        "shadow-sm hover:shadow-lg",
        "transition-all duration-300 ease-in-out",
        className
      )}
      onClick={onClick}
    >
      <div className="p-4 sm:p-6">
        {featured && (
          <span className="absolute top-2 right-2 sm:top-4 sm:right-4 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-semibold rounded-full bg-secondary text-white">
            Featured
          </span>
        )}
        
        <div className="mb-3 sm:mb-4 overflow-hidden rounded-lg h-32 sm:h-40 bg-gray-100 dark:bg-gray-800 relative">
          <img 
            src={imageUrl}
            alt={agent.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              // Fallback to a placeholder if the image fails to load
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?auto=format&fit=crop&w=1200&h=800";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2">
            <span className="inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium rounded-full bg-primary/80 text-white backdrop-blur-sm">
              {agent.category}
            </span>
          </div>
        </div>
        
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-primary dark:text-white line-clamp-2">{agent.title}</h3>
          
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{agent.description}</p>
          
          <div className="pt-1 sm:pt-2 flex items-center justify-between">
            <button 
              className="text-xs sm:text-sm font-medium text-primary hover:text-primary/80 dark:text-krushal-lightPurple flex items-center gap-1 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onClick && onClick();
              }}
            >
              <InfoIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{t('learn.more')}</span>
            </button>
            
            {featured && (
              <button className="text-xs sm:text-sm font-medium text-secondary hover:text-secondary/80 dark:text-secondary/90 flex items-center gap-1 transition-colors">
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{t('try.now')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AgentCard;
