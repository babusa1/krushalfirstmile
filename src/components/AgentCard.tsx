
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
      "Digital & Financial Services": "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=1200&h=800",
      "Livestock & Dairy": "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?auto=format&fit=crop&w=1200&h=800",
      "Agriculture & Farming": "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&h=800",
      "Healthcare & Medicine": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&h=800",
      "Weather & Disaster Management": "https://images.unsplash.com/photo-1514632595-4944383f2737?auto=format&fit=crop&w=1200&h=800",
      "Government Schemes & Subsidies": "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=1200&h=800",
      "Education & Skill Development": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&h=800",
      "Employment & Livelihood": "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&h=800",
      "Women & Self-Help Groups": "https://images.unsplash.com/photo-1573497620292-4c990d24560f?auto=format&fit=crop&w=1200&h=800",
      "Technology & Mobile Usage": "https://images.unsplash.com/photo-1525373698358-041e3a460346?auto=format&fit=crop&w=1200&h=800",
      "Local Governance & Legal Issues": "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?auto=format&fit=crop&w=1200&h=800"
    };
    
    return categoryImages[agent.category as keyof typeof categoryImages] || 
           "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?auto=format&fit=crop&w=1200&h=800"; // Default tech image
  };

  // Agent-specific images mapping with improved relevance
  const getAgentSpecificImage = () => {
    // Map for specific agent titles to highly relevant images
    const agentImages: Record<string, string> = {
      // Digital & Financial Services
      "Mortgage Document Extractor": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&h=800",
      "Technical Evaluation for Fund Management": "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?auto=format&fit=crop&w=1200&h=800",
      "Online Banking Assistance": "https://images.unsplash.com/photo-1559067096-49ebca3406aa?auto=format&fit=crop&w=1200&h=800",
      "KYC Documentation Advisor": "https://images.unsplash.com/photo-1554224155-6d2f99c7dff1?auto=format&fit=crop&w=1200&h=800",
      "Digital Payment Solutions Guide": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&h=800",
      "Cybersecurity Awareness Agent": "https://images.unsplash.com/photo-1563237023-b1e970526dcb?auto=format&fit=crop&w=1200&h=800",
      
      // Livestock & Dairy - Improved images
      "Smart Ration Agent for HF and Jersey Cows": "https://images.unsplash.com/photo-1500595046743-cd271d694e30?auto=format&fit=crop&w=1200&h=800",
      "Milk Volume Predictor for Dairy Cows": "https://images.unsplash.com/photo-1635319119473-cb45380cc164?auto=format&fit=crop&w=1200&h=800",
      "Livestock Management Advisory": "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?auto=format&fit=crop&w=1200&h=800",
      "Animal Disease Identifier": "https://images.unsplash.com/photo-1581696326287-5910be2d67d4?auto=format&fit=crop&w=1200&h=800",
      "Veterinary Care Assistant": "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&h=800",
      "Dairy Production Optimizer": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1200&h=800",
      
      // Agriculture & Farming - Improved images
      "Market Price Predictor": "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=1200&h=800",
      "Farming Techniques Advisor": "https://images.unsplash.com/photo-1585513356945-97cba1577df0?auto=format&fit=crop&w=1200&h=800",
      "Crop Disease Identifier": "https://images.unsplash.com/photo-1620055525977-e4dca7df3d5a?auto=format&fit=crop&w=1200&h=800",
      "Fertilizers & Pesticides Advisor": "https://images.unsplash.com/photo-1615648957252-8faa7f16f2df?auto=format&fit=crop&w=1200&h=800",
      "Market Prices for Commodity": "https://images.unsplash.com/photo-1634467524884-947d40aab9c6?auto=format&fit=crop&w=1200&h=800",
      
      // Weather & Disaster Management - Improved images
      "Weather Forecast Agent": "https://images.unsplash.com/photo-1612208695882-02f2322b7fee?auto=format&fit=crop&w=1200&h=800",
      "Disaster Relief Advisor": "https://images.unsplash.com/photo-1589439092587-83367c014978?auto=format&fit=crop&w=1200&h=800",
      "Rainfall Predictor": "https://images.unsplash.com/photo-1437624155766-b64bf17eb2ce?auto=format&fit=crop&w=1200&h=800",
      "Flood & Drought Preparedness Advisor": "https://images.unsplash.com/photo-1620127682229-33388276e540?auto=format&fit=crop&w=1200&h=800",
      
      // Healthcare & Medicine - Improved images
      "Conversational AI for Elders": "https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?auto=format&fit=crop&w=1200&h=800",
      "Free Medical Care Finder": "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&h=800",
      "Common Disease Remedies Advisor": "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1200&h=800",
      "Nearest PHC/CHC Locator": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&h=800",
      "Maternal & Child Health Assistant": "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=1200&h=800",
      "Vaccination Schedule Advisor": "https://images.unsplash.com/photo-1612277643762-d329bedc8818?auto=format&fit=crop&w=1200&h=800",
      
      // Government & Education - Improved images
      "Government Subsidies Advisor": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&h=800",
      "Scheme Eligibility Checker": "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=1200&h=800",
      "Application Assistant": "https://images.unsplash.com/photo-1586282391129-76a6df230234?auto=format&fit=crop&w=1200&h=800",
      "Government Scholarships Advisor": "https://images.unsplash.com/photo-1585158531004-3224babed121?auto=format&fit=crop&w=1200&h=800",
      "Free Online Courses Finder": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&h=800",
      "English Learning Assistant": "https://images.unsplash.com/photo-1546521343-4eb2c9685a90?auto=format&fit=crop&w=1200&h=800",
      
      // Women & Self-Help Groups - Improved images
      "Business Opportunities for Women": "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&h=800",
      "Government Loan Advisor for Women Entrepreneurs": "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&h=800",
      "Self-Help Group Support Agent": "https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&w=1200&h=800",
      "Home-Based Business Ideas Advisor": "https://images.unsplash.com/photo-1599048975468-f60c34dd8f5b?auto=format&fit=crop&w=1200&h=800",
      
      // Employment & Technology - Improved images
      "Government Job Vacancies Finder": "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=1200&h=800",
      "Private Job Opportunities Agent": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&h=800",
      "Work-from-Home Job Guide": "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&h=800",
      "Smartphone Usage for Business & Learning Advisor": "https://images.unsplash.com/photo-1522125670776-3c7abb882bc2?auto=format&fit=crop&w=1200&h=800",
      "Social Media Management Agent": "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=1200&h=800",
      
      // Legal & Governance - Improved images
      "Land Records & Property Disputes Advisor": "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?auto=format&fit=crop&w=1200&h=800",
      "RTI & Grievance Redressal Agent": "https://images.unsplash.com/photo-1650476219395-3d94b6e635e5?auto=format&fit=crop&w=1200&h=800",
      "Legal Aid & Property Law Advisor": "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=1200&h=800"
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

