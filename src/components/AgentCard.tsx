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
      "Digital & Financial Services": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&h=800",
      "Livestock & Dairy": "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1200&h=800", // Real dairy farm image
      "Agriculture & Farming": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&h=800", // Real farm field
      "Healthcare & Medicine": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&h=800", // Healthcare professionals
      "Weather & Disaster Management": "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&h=800", // Weather monitoring
      "Government Schemes & Subsidies": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&h=800", // Government building
      "Education & Skill Development": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&h=800", // Education image
      "Employment & Livelihood": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&h=800", // Workplace
      "Women & Self-Help Groups": "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1200&h=800", // Women entrepreneurs
      "Technology & Mobile Usage": "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1200&h=800", // Technology use
      "Local Governance & Legal Issues": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&h=800" // Legal documents
    };
    
    return categoryImages[agent.category as keyof typeof categoryImages] || 
           "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?auto=format&fit=crop&w=1200&h=800"; // Default tech image
  };

  // Agent-specific images mapping with improved relevance
  const getAgentSpecificImage = () => {
    // Map for specific agent titles to highly relevant images
    const agentImages: Record<string, string> = {
      // Digital & Financial Services
      "Mortgage Document Extractor": "https://images.unsplash.com/photo-1554224155-6d2f99c7dff1?auto=format&fit=crop&w=1200&h=800", // Actual mortgage documents
      "Technical Evaluation for Fund Management": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&h=800", // Financial charts
      "Online Banking Assistance": "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=1200&h=800", // Online banking
      "KYC Documentation Advisor": "https://images.unsplash.com/photo-1586282391129-76a6df230234?auto=format&fit=crop&w=1200&h=800", // ID documents
      "Digital Payment Solutions Guide": "https://images.unsplash.com/photo-1559067096-49ebca3406aa?auto=format&fit=crop&w=1200&h=800", // Digital payment
      "Cybersecurity Awareness Agent": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&h=800", // Cybersecurity
      
      // Livestock & Dairy - Improved images for non-robotic actual animals
      "Smart Ration Agent for HF and Jersey Cows": "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1200&h=800", // Real cows on farm
      "Milk Volume Predictor for Dairy Cows": "https://images.unsplash.com/photo-1535185384516-07317cc9c7e1?auto=format&fit=crop&w=1200&h=800", // Dairy farming with real cows
      "Livestock Management Advisory": "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&h=800", // Real livestock on farm
      "Animal Disease Identifier": "https://images.unsplash.com/photo-1583779791512-eecbcf636337?auto=format&fit=crop&w=1200&h=800", // Veterinarian examining animal
      "Veterinary Care Assistant": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&h=800", // Veterinarian with animal
      "Dairy Production Optimizer": "https://images.unsplash.com/photo-1597694491579-5f08b6aee28e?auto=format&fit=crop&w=1200&h=800", // Milk product production
      
      // Agriculture & Farming - Improved images with actual plants/fields
      "Market Price Predictor": "https://images.unsplash.com/photo-1491349174775-aaafddd81942?auto=format&fit=crop&w=1200&h=800", // Agricultural market
      "Farming Techniques Advisor": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&h=800", // Actual farmer in field
      "Crop Disease Identifier": "https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=1200&h=800", // Close-up of crop leaves
      "Fertilizers & Pesticides Advisor": "https://images.unsplash.com/photo-1563514227147-6d2e624f82b8?auto=format&fit=crop&w=1200&h=800", // Farmer spraying crops
      "Market Prices for Commodity": "https://images.unsplash.com/photo-1533360216806-24a42fbf6f4d?auto=format&fit=crop&w=1200&h=800", // Agricultural produce market
      
      // Weather & Disaster Management - Improved images
      "Weather Forecast Agent": "https://images.unsplash.com/photo-1514632595-4944383f2737?auto=format&fit=crop&w=1200&h=800", // Weather clouds
      "Disaster Relief Advisor": "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=1200&h=800", // Disaster relief efforts
      "Rainfall Predictor": "https://images.unsplash.com/photo-1541919329513-35f7af297129?auto=format&fit=crop&w=1200&h=800", // Rain on window
      "Flood & Drought Preparedness Advisor": "https://images.unsplash.com/photo-1618662349168-88335d91491e?auto=format&fit=crop&w=1200&h=800", // Flood water
      
      // Healthcare & Medicine - Improved images
      "Conversational AI for Elders": "https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=1200&h=800", // Elderly person with caregiver
      "Free Medical Care Finder": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&h=800", // Medical clinic
      "Common Disease Remedies Advisor": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1200&h=800", // Medicine and stethoscope
      "Nearest PHC/CHC Locator": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&h=800", // Health center
      "Maternal & Child Health Assistant": "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&w=1200&h=800", // Mother and child
      "Vaccination Schedule Advisor": "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&h=800", // Vaccination
      
      // Government & Education - Improved images
      "Government Subsidies Advisor": "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=1200&h=800", // Government building
      "Scheme Eligibility Checker": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&h=800", // Person checking documents
      "Application Assistant": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&h=800", // Application forms
      "Government Scholarships Advisor": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&h=800", // Graduation cap and diploma
      "Free Online Courses Finder": "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=1200&h=800", // Person learning online
      "English Learning Assistant": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&h=800", // English learning materials
      
      // Women & Self-Help Groups - Improved images
      "Business Opportunities for Women": "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1200&h=800", // Women entrepreneurs
      "Government Loan Advisor for Women Entrepreneurs": "https://images.unsplash.com/photo-1573496773575-43862f677039?auto=format&fit=crop&w=1200&h=800", // Woman working on finances
      "Self-Help Group Support Agent": "https://images.unsplash.com/photo-1573497620392-1ff24721e8e5?auto=format&fit=crop&w=1200&h=800", // Women in supportive group
      "Home-Based Business Ideas Advisor": "https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&w=1200&h=800", // Woman working from home
      
      // Employment & Technology - Improved images
      "Government Job Vacancies Finder": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&h=800", // Government building
      "Private Job Opportunities Agent": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&h=800", // Office workspace
      "Work-from-Home Job Guide": "https://images.unsplash.com/photo-1599045118108-bf9954418b76?auto=format&fit=crop&w=1200&h=800", // Home office setup
      "Smartphone Usage for Business & Learning Advisor": "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1200&h=800", // Person using smartphone
      "Social Media Management Agent": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&h=800", // Social media icons
      
      // Legal & Governance - Improved images
      "Land Records & Property Disputes Advisor": "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?auto=format&fit=crop&w=1200&h=800", // Property documents
      "RTI & Grievance Redressal Agent": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&h=800", // Legal documents
      "Legal Aid & Property Law Advisor": "https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&w=1200&h=800" // Legal office
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
