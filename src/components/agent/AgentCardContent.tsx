
import React from 'react';
import { InfoIcon, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AgentCardContentProps {
  title: string;
  description: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  featured?: boolean;
}

const AgentCardContent: React.FC<AgentCardContentProps> = ({
  title,
  description,
  onClick,
  featured = false
}) => {
  const { t } = useLanguage();

  return (
    <div className="agent-card-mobile-content">
      <h3 className="agent-card-mobile-title line-clamp-2">
        {title}
      </h3>
      
      <p className="agent-card-mobile-description">
        {description}
      </p>
      
      <div className="pt-2 flex items-center justify-between">
        <button 
          className="agent-card-mobile-action hover:text-primary/80 dark:hover:text-krushal-lightPurple/80 transition-colors"
          onClick={onClick}
        >
          <InfoIcon className="h-4 w-4" />
          <span>{t('learn.more')}</span>
        </button>
        
        {featured && (
          <button className="text-sm font-medium text-secondary hover:text-secondary/80 dark:text-secondary/90 flex items-center gap-1 transition-colors">
            <ExternalLink className="h-4 w-4" />
            <span>{t('try.now')}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default AgentCardContent;
