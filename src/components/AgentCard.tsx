
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { InfoIcon, ExternalLink } from 'lucide-react';

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
  // Generate a default image URL based on the agent category if no image is provided
  const getDefaultImage = () => {
    const categoryImages = {
      "Digital & Financial Services": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      "Livestock & Dairy": "https://images.unsplash.com/photo-1516381548400-349d680edb56",
      "Agriculture & Farming": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449",
      "Healthcare & Medicine": "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      "Weather & Disaster Management": "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17",
      "Government Schemes & Subsidies": "https://images.unsplash.com/photo-1605664041952-4a2855d9531b",
    };
    
    return categoryImages[agent.category as keyof typeof categoryImages] || 
           "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b";
  };

  const imageUrl = agent.image || getDefaultImage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      className={cn(
        "relative overflow-hidden rounded-xl card-hover",
        featured ? "bg-gradient-to-br from-white to-krushal-lavender/30 dark:from-krushal-darkPurple dark:to-krushal-purple/30" : "bg-white dark:bg-krushal-darkPurple/90",
        "border border-gray-200 dark:border-gray-800",
        "shadow-sm hover:shadow-lg",
        "transition-all duration-300 ease-in-out",
        className
      )}
      onClick={onClick}
    >
      <div className="p-6">
        {featured && (
          <span className="absolute top-4 right-4 px-2 py-1 text-xs font-semibold rounded-full bg-krushal-purple text-white">
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
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-2 left-2">
            <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-krushal-purple/80 text-white backdrop-blur-sm">
              {agent.category}
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-krushal-darkPurple dark:text-white">{agent.title}</h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{agent.description}</p>
          
          <div className="pt-2 flex items-center justify-between">
            <button 
              className="text-sm font-medium text-krushal-purple hover:text-krushal-brightPurple dark:text-krushal-lightPurple flex items-center gap-1 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onClick && onClick();
              }}
            >
              <InfoIcon className="h-4 w-4" />
              <span>Learn more</span>
            </button>
            
            {featured && (
              <button className="text-sm font-medium text-krushal-purple hover:text-krushal-brightPurple dark:text-krushal-lightPurple flex items-center gap-1 transition-colors">
                <ExternalLink className="h-4 w-4" />
                <span>Try now</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AgentCard;
