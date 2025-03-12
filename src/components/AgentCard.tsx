
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { getAgentImageAlt } from '@/lib/agent-image-utils';
import AgentImage from './agent/AgentImage';
import AgentCardContent from './agent/AgentCardContent';
import { getAgentSpecificImage, getCategoryImage } from './agent/agentImageMappings';

export interface Agent {
  id: string;
  title: string;
  description: string;
  image?: string;
  imagePath?: string;
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
  // First try agent-specific image, then use agent.image if provided, or fall back to category image
  const imageUrl = getAgentSpecificImage(agent.title) || agent.image || getCategoryImage(agent.category);
  const imageAlt = getAgentImageAlt(agent);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      className={cn(
        "agent-card-mobile",
        featured ? "bg-gradient-to-br from-white to-[#EDE7F6]/30 dark:from-primary dark:to-[#7E57C2]/30" : "bg-white dark:bg-primary/90",
        "transition-all duration-300 ease-in-out",
        className
      )}
      onClick={onClick}
    >
      <div className="relative">
        {featured && (
          <span className="absolute top-3 right-3 px-2.5 py-1 text-sm font-semibold rounded-full bg-secondary text-white z-10">
            Featured
          </span>
        )}
        
        <AgentImage 
          imageUrl={imageUrl}
          imageAlt={imageAlt}
          category={agent.category}
          featured={featured}
          priority={featured}
        />
        
        <AgentCardContent 
          title={agent.title}
          description={agent.description}
          featured={featured}
          onClick={(e) => {
            e.stopPropagation();
            onClick && onClick();
          }}
        />
      </div>
    </motion.div>
  );
};

export default AgentCard;
