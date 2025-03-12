
import React from 'react';
import { cn } from '@/lib/utils';
import OptimizedImage from '../OptimizedImage';

interface AgentImageProps {
  imageUrl: string;
  imageAlt: string;
  category: string;
  featured?: boolean;
  priority?: boolean;
}

const AgentImage: React.FC<AgentImageProps> = ({ 
  imageUrl, 
  imageAlt, 
  category, 
  featured = false,
  priority = false 
}) => {
  return (
    <div className="h-40 sm:h-44 overflow-hidden relative">
      <OptimizedImage 
        src={imageUrl}
        alt={imageAlt}
        className="w-full h-full transition-transform duration-500 hover:scale-105"
        objectFit="cover"
        priority={priority}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      <div className="absolute bottom-3 left-3">
        <span className="inline-block px-2.5 py-1 text-sm font-medium rounded-full bg-primary/80 text-white backdrop-blur-sm">
          {category}
        </span>
      </div>
    </div>
  );
};

export default AgentImage;
