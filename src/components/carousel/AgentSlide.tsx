
import React from 'react';
import { Beef, Milk, ExternalLink, InfoIcon } from 'lucide-react';
import AgentCard, { Agent } from '../AgentCard';
import OptimizedImage from '../OptimizedImage';
import { useLanguage } from '@/contexts/LanguageContext';

interface AgentSlideProps {
  agent: Agent;
  featured: boolean;
  onClick: () => void;
}

const AgentSlide: React.FC<AgentSlideProps> = ({ agent, featured, onClick }) => {
  const { t } = useLanguage();

  // Get agent-specific icon
  const getAgentIcon = (title: string) => {
    if (title.includes("Ration")) return <Beef className="mr-2 h-5 w-5 text-secondary" />;
    if (title.includes("Milk")) return <Milk className="mr-2 h-5 w-5 text-secondary" />;
    return null;
  };

  const agentIcon = getAgentIcon(agent.title);
  
  // Check if it's a special Krushal agent
  const isSpecialAgent = agent.title.includes("Ration") || agent.title.includes("Milk Volume");

  if (isSpecialAgent) {
    return (
      <div className="bg-white dark:bg-primary/90 rounded-lg shadow-lg overflow-hidden">
        <div className="h-40 sm:h-44 overflow-hidden relative">
          <OptimizedImage 
            src={agent.image}
            alt={`${agent.title} - ${agent.category} agent`}
            className="w-full h-full transition-transform duration-500 hover:scale-105"
            objectFit="cover"
            width={800}
            height={400}
            priority={featured}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-3 left-3">
            <span className="inline-block px-2.5 py-1 text-sm font-medium rounded-full bg-primary/80 text-white backdrop-blur-sm">
              {agent.category}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center mb-2">
            {agentIcon}
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
              {agent.title}
            </h3>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            {agent.description}
          </p>
          
          {agent.features && (
            <div className="mt-3">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Key Features:</p>
              <ul className="text-xs space-y-1">
                {agent.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 mr-2"></span>
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <button 
            onClick={onClick}
            className="mt-4 w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-md transition-colors text-sm flex items-center justify-center"
          >
            Learn More
          </button>
        </div>
      </div>
    );
  }
  
  // For regular agents, use the AgentCard component
  return (
    <AgentCard 
      agent={agent} 
      featured={true}
      onClick={onClick}
    />
  );
};

export default AgentSlide;
