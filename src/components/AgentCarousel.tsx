
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Agent } from './AgentCard';
import { getAgentImage } from '@/lib/agent-image-utils';
import CarouselControls from './carousel/CarouselControls';
import CarouselDots from './carousel/CarouselDots';
import AgentSlide from './carousel/AgentSlide';

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

  // Apply appropriate image to each agent
  const enhancedAgents = agents.map(agent => ({
    ...agent,
    image: getAgentImage(agent)
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
  
  const currentAgent = enhancedAgents[current];
  
  return (
    <div 
      className="relative w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <CarouselControls onPrevClick={prevSlide} onNextClick={nextSlide} />

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
            <AgentSlide 
              agent={currentAgent} 
              featured={true} 
              onClick={() => onAgentClick(currentAgent)} 
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <CarouselDots 
        count={enhancedAgents.length} 
        current={current} 
        onClick={goToSlide} 
      />
    </div>
  );
};

export default AgentCarousel;
