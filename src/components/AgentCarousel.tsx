
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AgentCard, { Agent } from './AgentCard';

interface AgentCarouselProps {
  agents: Agent[];
  onAgentClick: (agent: Agent) => void;
  compact?: boolean;
}

const AgentCarousel: React.FC<AgentCarouselProps> = ({ agents, onAgentClick, compact = false }) => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
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
                "Government Schemes & Subsidies": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&h=800",
                "Education & Skill Development": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&h=800",
                "Employment & Livelihood": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&h=800",
                "Women & Self-Help Groups (SHGs)": "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&h=800",
                "Technology & Mobile Usage": "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1200&h=800",
                "Local Governance & Legal Issues": "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=1200&h=800"
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

  // Touch handlers for swipe on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 30; // Reduced threshold for better touch response
    const isRightSwipe = distance < -30;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div 
      className="relative w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute top-1/2 left-1 sm:left-2 z-10 transform -translate-y-1/2">
        <button
          onClick={prevSlide}
          className="p-1 sm:p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-primary shadow-md hover:bg-white transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
        </button>
      </div>
      
      <div className="absolute top-1/2 right-1 sm:right-2 z-10 transform -translate-y-1/2">
        <button
          onClick={nextSlide}
          className="p-1 sm:p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-primary shadow-md hover:bg-white transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
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

      <div className="flex justify-center mt-1 sm:mt-2 space-x-1 sm:space-x-1.5">
        {enhancedAgents.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
              index === current 
                ? 'bg-secondary w-3 sm:w-4' 
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary dark:hover:bg-primary'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentCarousel;
