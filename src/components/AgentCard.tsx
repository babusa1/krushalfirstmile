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

  // Generate a default image URL based on the agent category
  const getDefaultImage = () => {
    const categoryImages = {
      "Digital & Financial Services": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&h=800",
      "Livestock & Dairy": "https://images.unsplash.com/photo-1535567679266-c133fe5d9e3d?auto=format&fit=crop&w=1200&h=800",
      "Agriculture & Farming": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&h=800",
      "Healthcare & Medicine": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&h=800",
      "Weather & Disaster Management": "https://images.unsplash.com/photo-1600377927594-ceae8f8c9058?auto=format&fit=crop&w=1200&h=800",
      "Government Schemes & Subsidies": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&h=800",
      "Education & Skill Development": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&h=800",
      "Employment & Livelihood": "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&h=800",
      "Women & Self-Help Groups": "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1200&h=800",
      "Technology & Mobile Usage": "https://images.unsplash.com/photo-1495204475232-40fe3f258358?auto=format&fit=crop&w=1200&h=800",
      "Local Governance & Legal Issues": "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?auto=format&fit=crop&w=1200&h=800"
    };
    
    return categoryImages[agent.category as keyof typeof categoryImages] || 
           "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&h=800";
  };

  // Agent-specific images mapping
  const getAgentSpecificImage = () => {
    const agentImages = {
      "Mortgage Document Extractor": "https://images.unsplash.com/photo-1554224155-8d04cb21cd56?auto=format&fit=crop&w=1200&h=800",
      "Smart Ration Agent for HF and Jersey Cows": "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=1200&h=800",
      "Milk Volume Predictor for Dairy Cows": "https://images.unsplash.com/photo-1630699144339-420f59b4747a?auto=format&fit=crop&w=1200&h=800",
      "Conversational AI for Elders": "https://images.unsplash.com/photo-1573497620292-4c990d24560f?auto=format&fit=crop&w=1200&h=800",
      "Technical Evaluation for Fund Management": "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1200&h=800",
      "Market Price Predictor": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&h=800",
      "Farming Techniques Advisor": "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&h=800",
      "Crop Disease Identifier": "https://images.unsplash.com/photo-1574943320219-361228354af9?auto=format&fit=crop&w=1200&h=800",
      "Weather Forecast Agent": "https://images.unsplash.com/photo-1525490829609-d166ddb58678?auto=format&fit=crop&w=1200&h=800",
      "Fertilizers & Pesticides Advisor": "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1200&h=800",
      "Livestock Management Advisory": "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=1200&h=800",
      "Animal Disease Identifier": "https://images.unsplash.com/photo-1485809069980-bafae4e654ad?auto=format&fit=crop&w=1200&h=800",
      "Government Subsidies Advisor": "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=1200&h=800",
      "Veterinary Care Assistant": "https://images.unsplash.com/photo-1589736379748-01fe6140dd1a?auto=format&fit=crop&w=1200&h=800",
      "Dairy Production Optimizer": "https://images.unsplash.com/photo-1569267089567-35878a2c5b38?auto=format&fit=crop&w=1200&h=800",
      "Disaster Relief Advisor": "https://images.unsplash.com/photo-1473662170213-c9b39eb03f3b?auto=format&fit=crop&w=1200&h=800",
      "Rainfall Predictor": "https://images.unsplash.com/photo-1515694346937-94d85e41e695?auto=format&fit=crop&w=1200&h=800",
      "Flood & Drought Preparedness Advisor": "https://images.unsplash.com/photo-1578175525760-2569fe9be9fc?auto=format&fit=crop&w=1200&h=800",
      "Scheme Eligibility Checker": "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=1200&h=800",
      "Application Assistant": "https://images.unsplash.com/photo-1581768738844-7b28d2c537dc?auto=format&fit=crop&w=1200&h=800"
    };
    
    return agentImages[agent.title as keyof typeof agentImages];
  };

  // First try agent-specific image, then use agent.image if provided, or fall back to category image
  const imageUrl = getAgentSpecificImage() || agent.image || getDefaultImage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      className={cn(
        "relative overflow-hidden rounded-xl card-hover",
        featured ? "bg-gradient-to-br from-white to-[#D1C4E9]/30 dark:from-[#311B92] dark:to-[#7E57C2]/30" : "bg-white dark:bg-[#311B92]/90",
        "border border-gray-200 dark:border-gray-800",
        "shadow-sm hover:shadow-lg",
        "transition-all duration-300 ease-in-out",
        className
      )}
      onClick={onClick}
    >
      <div className="p-6">
        {featured && (
          <span className="absolute top-4 right-4 px-2 py-1 text-xs font-semibold rounded-full bg-[#7B1FA2] text-white">
            Featured
          </span>
        )}
        
        <div className="mb-4 overflow-hidden rounded-lg h-40 bg-gray-100 dark:bg-gray-800 relative">
          <img 
            src={imageUrl}
            alt={agent.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              // Fallback to a placeholder if the image fails to load
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&h=800";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-2 left-2">
            <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-[#7B1FA2]/80 text-white backdrop-blur-sm">
              {agent.category}
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-[#311B92] dark:text-white">{agent.title}</h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{agent.description}</p>
          
          <div className="pt-2 flex items-center justify-between">
            <button 
              className="text-sm font-medium text-[#7B1FA2] hover:text-[#9C27B0] dark:text-[#BA68C8] flex items-center gap-1 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onClick && onClick();
              }}
            >
              <InfoIcon className="h-4 w-4" />
              <span>{t('learn.more')}</span>
            </button>
            
            {featured && (
              <button className="text-sm font-medium text-[#7B1FA2] hover:text-[#9C27B0] dark:text-[#BA68C8] flex items-center gap-1 transition-colors">
                <ExternalLink className="h-4 w-4" />
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
