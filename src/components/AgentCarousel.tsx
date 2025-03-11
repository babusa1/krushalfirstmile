
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

  // Map of agent titles to the specific images you shared
  const agentImages = {
    // Financial Services
    "Mortgage Document Extractor": "/lovable-uploads/4dff860c-4af6-41b2-a63b-c51f402a5462.png",
    "Technical Evaluation for Fund Management": "/lovable-uploads/85ed5798-b670-4cf6-9791-bae7e5eb46fc.png",
    "Market Price Predictor": "/lovable-uploads/4b27cae2-5f77-4c71-a509-a84b877e1fee.png",
    "Market Prices for Commodity": "/lovable-uploads/4b27cae2-5f77-4c71-a509-a84b877e1fee.png",
    
    // Livestock & Dairy
    "Smart Ration Agent for HF and Jersey Cows": "/lovable-uploads/6b4a6161-e57e-4214-ba6e-ca2ed4748e70.png",
    "Milk Volume Predictor for Dairy Cows": "/lovable-uploads/9b285c09-5b4b-4736-adb7-1e7435911fcd.png",
    "Livestock Management Advisory": "/lovable-uploads/6adcf8ce-dbe5-41c8-880b-52e25959f9c2.png",
    "Dairy Production Optimizer": "/lovable-uploads/079ebe7a-c566-4c7e-81ba-ea224b5dc37e.png",
    
    // Agriculture & Farming
    "Farming Techniques Advisor": "/lovable-uploads/831d6630-2414-4d70-a085-368ab8eb7154.png",
    "Crop Disease Identifier": "/lovable-uploads/0232c051-75a9-4397-a516-0512dc84422d.png",
    "Fertilizers & Pesticides Advisor": "/lovable-uploads/9730fba6-a832-48d2-a0c3-1b373edabcec.png",
    
    // Healthcare
    "Conversational AI for Elders": "/lovable-uploads/ec8255f1-f6eb-420f-afdd-29bc8707fe54.png",
    "Free Medical Care Finder": "/lovable-uploads/8d5a7733-0e74-49ea-b364-9b62f8f3bbc7.png",
    "Maternal & Child Health Assistant": "/lovable-uploads/66bd66c5-3459-4f2d-be99-f099c259c166.png",
    
    // Weather & Disaster
    "Weather Forecast Agent": "/lovable-uploads/3c1417c4-6fc3-427f-83fe-46fcb4ef16d6.png",
    "Disaster Relief Advisor": "/lovable-uploads/d1eaf6be-a19a-46b3-a0d4-892696cc1098.png",
    "Rainfall Predictor": "/lovable-uploads/a65712d2-abc4-4552-8893-5af76ff196b4.png",
    "Flood & Drought Preparedness Advisor": "/lovable-uploads/0bd0873d-ea16-4449-a389-076c72eba38b.png",
    
    // Government Schemes
    "Government Subsidies Advisor": "/lovable-uploads/9b1090b9-c106-41b3-8ba2-4735b5ae3927.png",
    "Scheme Eligibility Checker": "/lovable-uploads/9b1090b9-c106-41b3-8ba2-4735b5ae3927.png",
    
    // Education & Employment
    "Government Scholarships Advisor": "/lovable-uploads/a8ec3a7f-0b13-4f9f-9a19-4ad9393b0b3d.png",
  };

  // Apply appropriate image to each agent
  const enhancedAgents = agents.map(agent => ({
    ...agent,
    image: agent.image || agentImages[agent.title as keyof typeof agentImages] || 
           // Fallback images by category
           (() => {
              const categoryFallbacks = {
                "Digital & Financial Services": "/lovable-uploads/85ed5798-b670-4cf6-9791-bae7e5eb46fc.png",
                "Livestock & Dairy": "/lovable-uploads/6b4a6161-e57e-4214-ba6e-ca2ed4748e70.png",
                "Agriculture & Farming": "/lovable-uploads/9730fba6-a832-48d2-a0c3-1b373edabcec.png",
                "Healthcare & Medicine": "/lovable-uploads/66bd66c5-3459-4f2d-be99-f099c259c166.png",
                "Weather & Disaster Management": "/lovable-uploads/3c1417c4-6fc3-427f-83fe-46fcb4ef16d6.png",
                "Government Schemes & Subsidies": "/lovable-uploads/9b1090b9-c106-41b3-8ba2-4735b5ae3927.png",
                "Education & Skill Development": "/lovable-uploads/a8ec3a7f-0b13-4f9f-9a19-4ad9393b0b3d.png",
                "Employment & Livelihood": "/lovable-uploads/a8ec3a7f-0b13-4f9f-9a19-4ad9393b0b3d.png",
                "Women & Self-Help Groups (SHGs)": "/lovable-uploads/ec8255f1-f6eb-420f-afdd-29bc8707fe54.png",
                "Technology & Mobile Usage": "/lovable-uploads/2fc287af-5e57-459d-af13-c3eb627b9390.png",
                "Local Governance & Legal Issues": "/lovable-uploads/85ed5798-b670-4cf6-9791-bae7e5eb46fc.png"
              };
              return categoryFallbacks[agent.category as keyof typeof categoryFallbacks] || 
                     "/lovable-uploads/45ee1443-ab39-4200-a1ad-13d4b6fb77ae.png"; // Default image
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
