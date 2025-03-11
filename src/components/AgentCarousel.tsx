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

  // Map of agent titles to the specific images - Correctly mapped based on shared images
  const agentImages: Record<string, string> = {
    // Financial Services
    "Mortgage Document Extractor": "/lovable-uploads/b16423de-2102-4aa4-8a34-9a7893b13806.png",
    "Technical Evaluation for Fund Management": "/lovable-uploads/85ed5798-b670-4cf6-9791-bae7e5eb46fc.png",
    "Market Price Predictor": "/lovable-uploads/fec4a608-113b-4a3a-9167-976651b61cef.png",
    
    // Livestock & Dairy
    "Smart Ration Agent for HF and Jersey Cows": "/lovable-uploads/95e46186-5b24-4155-9ad3-9a496ca7905b.png",
    "Milk Volume Predictor for Dairy Cows": "/lovable-uploads/96faf64d-4be2-40b2-ac13-50727b7a4077.png",
    "Livestock Management Advisory": "/lovable-uploads/8ae74bd9-9500-44af-bf68-9a9098007bfe.png",
    "Dairy Production Optimizer": "/lovable-uploads/fb35766b-f70c-49f4-953c-05d198e9e4d5.png",
    "Animal Disease Identifier": "/lovable-uploads/41a33d28-bbc5-4d26-9c4c-d4683a37f1ff.png",
    "Veterinary Care Assistant": "/lovable-uploads/ae565069-86f6-4d81-bce0-e6e9ff756e53.png",
    
    // Agriculture & Farming
    "Farming Techniques Advisor": "/lovable-uploads/37fcbdf5-c10c-47b1-8bd6-ee4d826cfbc9.png",
    "Crop Disease Identifier": "/lovable-uploads/15cff069-89af-492d-bee3-827de6c8942c.png",
    "Fertilizers & Pesticides Advisor": "/lovable-uploads/bb45d9fa-e284-4e60-9bc4-2665120beff9.png",
    "Market Prices for Commodity": "/lovable-uploads/a532ae3d-a09d-419a-8ef4-93b47115c74c.png",
    
    // Healthcare
    "Conversational AI for Elders": "/lovable-uploads/ec8255f1-f6eb-420f-afdd-29bc8707fe54.png",
    "Free Medical Care Finder": "/lovable-uploads/8d5a7733-0e74-49ea-b364-9b62f8f3bbc7.png",
    "Maternal & Child Health Assistant": "/lovable-uploads/66bd66c5-3459-4f2d-be99-f099c259c166.png",
    
    // Weather & Disaster
    "Weather Forecast Agent": "/lovable-uploads/be51a951-0119-48b1-9c3d-469b70770608.png",
    "Disaster Relief Advisor": "/lovable-uploads/b67ef5b1-f5f1-4545-91e0-4b3d520f694f.png",
    "Rainfall Predictor": "/lovable-uploads/e86db0e9-16ad-443e-b884-6429b7f44c17.png",
    "Flood & Drought Preparedness Advisor": "/lovable-uploads/b67ef5b1-f5f1-4545-91e0-4b3d520f694f.png",
    
    // Government Schemes
    "Government Subsidies Advisor": "/lovable-uploads/9b1090b9-c106-41b3-8ba2-4735b5ae3927.png",
    "Scheme Eligibility Checker": "/lovable-uploads/9b1090b9-c106-41b3-8ba2-4735b5ae3927.png",
    
    // Education & Employment
    "Government Scholarships Advisor": "/lovable-uploads/a8ec3a7f-0b13-4f9f-9a19-4ad9393b0b3d.png",
  };

  // Apply appropriate image to each agent
  const enhancedAgents = agents.map(agent => ({
    ...agent,
    image: agent.image || agentImages[agent.title] || 
           // Fallback images by category
           (() => {
              const categoryFallbacks: Record<string, string> = {
                "Digital & Financial Services": "/lovable-uploads/85ed5798-b670-4cf6-9791-bae7e5eb46fc.png",
                "Livestock & Dairy": "/lovable-uploads/95e46186-5b24-4155-9ad3-9a496ca7905b.png",
                "Agriculture & Farming": "/lovable-uploads/bb45d9fa-e284-4e60-9bc4-2665120beff9.png",
                "Healthcare & Medicine": "/lovable-uploads/41a33d28-bbc5-4d26-9c4c-d4683a37f1ff.png",
                "Weather & Disaster Management": "/lovable-uploads/be51a951-0119-48b1-9c3d-469b70770608.png",
                "Government Schemes & Subsidies": "/lovable-uploads/9b1090b9-c106-41b3-8ba2-4735b5ae3927.png",
                "Education & Skill Development": "/lovable-uploads/a8ec3a7f-0b13-4f9f-9a19-4ad9393b0b3d.png",
                "Employment & Livelihood": "/lovable-uploads/37fcbdf5-c10c-47b1-8bd6-ee4d826cfbc9.png",
                "Women & Self-Help Groups (SHGs)": "/lovable-uploads/ec8255f1-f6eb-420f-afdd-29bc8707fe54.png",
                "Technology & Mobile Usage": "/lovable-uploads/2fc287af-5e57-459d-af13-c3eb627b9390.png",
                "Local Governance & Legal Issues": "/lovable-uploads/fec4a608-113b-4a3a-9167-976651b61cef.png"
              };
              return categoryFallbacks[agent.category] || 
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
