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

  // Map of agent titles to the specific images you shared
  const getAgentSpecificImage = () => {
    // Only use specific images for agents that match exactly
    const agentImages: Record<string, string> = {
      // Only use the specific image for Mortgage Document Extractor
      "Mortgage Document Extractor": "/lovable-uploads/2ab73554-1297-414c-8e4b-66b49cc64bd5.png",
      
      // Keep other specific mappings as needed
      "Smart Ration Agent for HF and Jersey Cows": "/lovable-uploads/9d31e375-bef2-462c-aea7-255797f66a9f.png",
      "Milk Volume Predictor for Dairy Cows": "/lovable-uploads/b5165487-9428-47ea-8b14-bdad5a979143.png",
    };
    
    return agentImages[agent.title];
  };

  // Generate fallback image based on category
  const getCategoryImage = () => {
    const categoryImages = {
      "Digital & Financial Services": "/lovable-uploads/2ab73554-1297-414c-8e4b-66b49cc64bd5.png",
      "Livestock & Dairy": "/lovable-uploads/b5165487-9428-47ea-8b14-bdad5a979143.png",
      "Agriculture & Farming": "/lovable-uploads/78b4e12a-94eb-42ba-8dda-84ff2b0dcbb1.png",
      "Healthcare & Medicine": "/lovable-uploads/aec2dcc7-d9c8-4405-a569-64d470f2ea12.png",
      "Weather & Disaster Management": "/lovable-uploads/f52c19be-6583-43c7-b3c7-8357ace6a935.png",
      "Government Schemes & Subsidies": "/lovable-uploads/78b4e12a-94eb-42ba-8dda-84ff2b0dcbb1.png",
      "Education & Skill Development": "/lovable-uploads/78b4e12a-94eb-42ba-8dda-84ff2b0dcbb1.png",
      "Employment & Livelihood": "/lovable-uploads/78b4e12a-94eb-42ba-8dda-84ff2b0dcbb1.png",
      "Women & Self-Help Groups": "/lovable-uploads/78b4e12a-94eb-42ba-8dda-84ff2b0dcbb1.png",
      "Technology & Mobile Usage": "/lovable-uploads/2fc287af-5e57-459d-af13-c3eb627b9390.png",
      "Local Governance & Legal Issues": "/lovable-uploads/78b4e12a-94eb-42ba-8dda-84ff2b0dcbb1.png"
    };
    
    return categoryImages[agent.category as keyof typeof categoryImages] || 
           "/lovable-uploads/45ee1443-ab39-4200-a1ad-13d4b6fb77ae.png"; // Default image
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
              (e.target as HTMLImageElement).src = "/lovable-uploads/45ee1443-ab39-4200-a1ad-13d4b6fb77ae.png";
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
