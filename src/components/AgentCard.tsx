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

  // Map of agent titles to the specific images - Updated with new images
  const getAgentSpecificImage = () => {
    const agentImages: Record<string, string> = {
      // Financial Services
      "Mortgage Document Extractor": "/lovable-uploads/b16423de-2102-4aa4-8a34-9a7893b13806.png",
      "Technical Evaluation for Fund Management": "/lovable-uploads/85ed5798-b670-4cf6-9791-bae7e5eb46fc.png",
      "Market Price Predictor": "/lovable-uploads/fec4a608-113b-4a3a-9167-976651b61cef.png",
      
      // Livestock & Dairy
      "Smart Ration Agent for HF and Jersey Cows": "/lovable-uploads/95e46186-5b24-4155-9ad3-9a496ca7905b.png",
      "Milk Volume Predictor for Dairy Cows": "/lovable-uploads/96faf64d-4be2-40b2-ac13-50727b7a4077.png",
      "Livestock Management Advisory": "/lovable-uploads/8ae74bd9-9500-44af-bf68-9a9098007bfe.png",
      "Dairy Production Optimizer": "/lovable-uploads/fb35766b-f70c-49f4-953c-05d198e9e4d5.png",
      "Animal Disease Identifier": "/lovable-uploads/41a33d28-bbc5-4d26-9c4c-d4683a37f1ff.png",
      "Veterinary Care Assistant": "/lovable-uploads/ae565069-86f6-4d81-bce0-e6e9ff756e53.png",
      
      // Agriculture & Farming - Updated with new images
      "Farming Techniques Advisor": "/lovable-uploads/348533c2-cf7d-4b3c-8967-a3e37b29089f.png",
      "Crop Disease Identifier": "/lovable-uploads/e568fd53-774d-4af0-9e7b-28d880bbb771.png",
      "Fertilizers & Pesticides Advisor": "/lovable-uploads/bb45d9fa-e284-4e60-9bc4-2665120beff9.png",
      "Market Prices for Commodity": "/lovable-uploads/761d635e-e105-4484-b87f-7702c4472a42.png",
      
      // Healthcare
      "Conversational AI for Elders": "/lovable-uploads/ec8255f1-f6eb-420f-afdd-29bc8707fe54.png",
      "Free Medical Care Finder": "/lovable-uploads/8d5a7733-0e74-49ea-b364-9b62f8f3bbc7.png",
      "Maternal & Child Health Assistant": "/lovable-uploads/66bd66c5-3459-4f2d-be99-f099c259c166.png",
      
      // Weather & Disaster
      "Weather Forecast Agent": "/lovable-uploads/be51a951-0119-48b1-9c3d-469b70770608.png",
      "Disaster Relief Advisor": "/lovable-uploads/b67ef5b1-f5f1-4545-91e0-4b3d520f694f.png",
      "Rainfall Predictor": "/lovable-uploads/e86db0e9-16ad-443e-b884-6429b7f44c17.png",
      "Flood & Drought Preparedness Advisor": "/lovable-uploads/b67ef5b1-f5f1-4545-91e0-4b3d520f694f.png",
      
      // Government Schemes
      "Government Subsidies Advisor": "/lovable-uploads/9b1090b9-c106-41b3-8ba2-4735b5ae3927.png",
      "Scheme Eligibility Checker": "/lovable-uploads/9b1090b9-c106-41b3-8ba2-4735b5ae3927.png",
      
      // Education & Employment
      "Government Scholarships Advisor": "/lovable-uploads/a8ec3a7f-0b13-4f9f-9a19-4ad9393b0b3d.png",
    };
    
    return agentImages[agent.title];
  };

  // Generate fallback image based on category
  const getCategoryImage = () => {
    const categoryImages: Record<string, string> = {
      "Digital & Financial Services": "/lovable-uploads/85ed5798-b670-4cf6-9791-bae7e5eb46fc.png",
      "Livestock & Dairy": "/lovable-uploads/95e46186-5b24-4155-9ad3-9a496ca7905b.png",
      "Agriculture & Farming": "/lovable-uploads/bb45d9fa-e284-4e60-9bc4-2665120beff9.png",
      "Healthcare & Medicine": "/lovable-uploads/41a33d28-bbc5-4d26-9c4c-d4683a37f1ff.png",
      "Weather & Disaster Management": "/lovable-uploads/be51a951-0119-48b1-9c3d-469b70770608.png",
      "Government Schemes & Subsidies": "/lovable-uploads/9b1090b9-c106-41b3-8ba2-4735b5ae3927.png",
      "Education & Skill Development": "/lovable-uploads/a8ec3a7f-0b13-4f9f-9a19-4ad9393b0b3d.png",
      "Employment & Livelihood": "/lovable-uploads/37fcbdf5-c10c-47b1-8bd6-ee4d826cfbc9.png",
      "Women & Self-Help Groups (SHGs)": "/lovable-uploads/ec8255f1-f6eb-420f-afdd-29bc8707fe54.png",
      "Technology & Mobile Usage": "/lovable-uploads/2fc287af-5e57-459d-af13-c3eb627b9390.png",
      "Local Governance & Legal Issues": "/lovable-uploads/fec4a608-113b-4a3a-9167-976651b61cef.png"
    };
    
    return categoryImages[agent.category] || "/lovable-uploads/45ee1443-ab39-4200-a1ad-13d4b6fb77ae.png"; // Default image
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
