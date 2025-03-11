import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AgentCard, { Agent } from './AgentCard';

interface AgentCarouselProps {
  agents: Agent[];
  onAgentClick: (agent: Agent) => void;
}

const AgentCarousel: React.FC<AgentCarouselProps> = ({ agents, onAgentClick }) => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Map of agent titles to highly relevant image URLs
  const agentImages = {
    "Mortgage Document Extractor": "https://images.unsplash.com/photo-1554224155-8d04cb21cd56?auto=format&fit=crop&w=1200&h=800",
    "Smart Ration Agent for HF and Jersey Cows": "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=1200&h=800",
    "Milk Volume Predictor for Dairy Cows": "https://images.unsplash.com/photo-1630699144339-420f59b4747a?auto=format&fit=crop&w=1200&h=800",
    "Conversational AI for Elders": "https://images.unsplash.com/photo-1573497620292-4c990d24560f?auto=format&fit=crop&w=1200&h=800",
    "Technical Evaluation for Fund Management": "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1200&h=800"
  };

  // Apply appropriate image to each agent
  const enhancedAgents = agents.map(agent => ({
    ...agent,
    image: agent.image || agentImages[agent.title as keyof typeof agentImages] || 
           // Fallback images by category if specific agent image not found
           (() => {
              const categoryFallbacks = {
                "Digital & Financial Services": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&h=800",
                "Livestock & Dairy": "https://images.unsplash.com/photo-1535567679266-c133fe5d9e3d?auto=format&fit=crop&w=1200&h=800",
                "Agriculture & Farming": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&h=800",
                "Healthcare & Medicine": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&h=800",
                "Weather & Disaster Management": "https://images.unsplash.com/photo-1600377927594-ceae8f8c9058?auto=format&fit=crop&w=1200&h=800",
                "Government Schemes & Subsidies": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&h=800"
              };
              return categoryFallbacks[agent.category as keyof typeof categoryFallbacks] || 
                     "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&h=800";
           })()
  }));

  const nextSlide = () => {
    setCurrent(current === agents.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? agents.length - 1 : current - 1);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  // Start or reset autoplay
  const startAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrent(prev => (prev === agents.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
  };

  // Handle autoplay
  useEffect(() => {
    startAutoPlay();
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [current, isAutoPlaying, agents.length]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div 
      className="relative w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2">
        <button
          onClick={prevSlide}
          className="p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-[#311B92] shadow-md hover:bg-white transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
      
      <div className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2">
        <button
          onClick={nextSlide}
          className="p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-[#311B92] shadow-md hover:bg-white transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="p-2 md:p-4"
          >
            <AgentCard 
              agent={enhancedAgents[current]} 
              featured={true}
              onClick={() => onAgentClick(enhancedAgents[current])}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-2 space-x-1.5">
        {enhancedAgents.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current 
                ? 'bg-[#7B1FA2] w-4' 
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-[#CE93D8] dark:hover:bg-[#CE93D8]'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentCarousel;
