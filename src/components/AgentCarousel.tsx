
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

  // Map of agent titles to the new uploaded images
  const agentImages = {
    // Weather & Disaster Management
    "Weather Forecast Agent": "/lovable-uploads/15cb07a5-ac4d-4a30-bc4e-620a0df82e25.png", // Weather icon with globe
    "Rainfall Predictor": "/lovable-uploads/f52c19be-6583-43c7-b3c7-8357ace6a935.png", // Drought image
    "Disaster Relief Advisor": "/lovable-uploads/9ee63691-4755-42bb-ab49-80b49d91f88f.png", // NDRF rescue boat
    "Flood & Drought Preparedness Advisor": "/lovable-uploads/f52c19be-6583-43c7-b3c7-8357ace6a935.png", // Drought cracked earth
    
    // Agriculture & Farming
    "Market Price Predictor": "/lovable-uploads/398e260e-3bca-4d63-8e8f-ffe0ac045da7.png", // Commodity prices
    "Farming Techniques Advisor": "/lovable-uploads/78b4e12a-94eb-42ba-8dda-84ff2b0dcbb1.png", // Farmer with expert
    "Crop Disease Identifier": "/lovable-uploads/45ee1443-ab39-4200-a1ad-13d4b6fb77ae.png", // Smart farming tech on crops
    "Fertilizers & Pesticides Advisor": "/lovable-uploads/263f6c76-cc18-47dc-8f1a-667ac26e51a8.png", // Farmer spreading fertilizer
    "Market Prices for Commodity": "/lovable-uploads/398e260e-3bca-4d63-8e8f-ffe0ac045da7.png", // Commodity prices
    
    // Livestock & Dairy
    "Smart Ration Agent for HF and Jersey Cows": "/lovable-uploads/9d31e375-bef2-462c-aea7-255797f66a9f.png", // Cows in fenced area
    "Milk Volume Predictor for Dairy Cows": "/lovable-uploads/b5165487-9428-47ea-8b14-bdad5a979143.png", // Milk jug with cow
    "Livestock Management Advisory": "/lovable-uploads/dd35e560-c202-4708-9662-a9f207b122a8.png", // Multiple cows in field
    "Animal Disease Identifier": "/lovable-uploads/aec2dcc7-d9c8-4405-a569-64d470f2ea12.png", // Vets examining cat
    "Veterinary Care Assistant": "/lovable-uploads/aec2dcc7-d9c8-4405-a569-64d470f2ea12.png", // Vets examining cat
    "Dairy Production Optimizer": "/lovable-uploads/2fc287af-5e57-459d-af13-c3eb627b9390.png", // Dairy cow with smartphone
    
    // Digital & Financial Services
    "Mortgage Document Extractor": "/lovable-uploads/2ab73554-1297-414c-8e4b-66b49cc64bd5.png", // Mortgage documents
    "Technical Evaluation for Fund Management": "/lovable-uploads/2ab73554-1297-414c-8e4b-66b49cc64bd5.png", // Financial documents
  };

  // Apply appropriate image to each agent
  const enhancedAgents = agents.map(agent => ({
    ...agent,
    image: agent.image || agentImages[agent.title as keyof typeof agentImages] || 
           // Improved fallback images by category - ensure no robotic images
           (() => {
              const categoryFallbacks = {
                "Digital & Financial Services": "/lovable-uploads/2ab73554-1297-414c-8e4b-66b49cc64bd5.png", // Mortgage/financial documents
                "Livestock & Dairy": "/lovable-uploads/b5165487-9428-47ea-8b14-bdad5a979143.png", // Milk jug with cow
                "Agriculture & Farming": "/lovable-uploads/78b4e12a-94eb-42ba-8dda-84ff2b0dcbb1.png", // Farmer with expert
                "Healthcare & Medicine": "/lovable-uploads/aec2dcc7-d9c8-4405-a569-64d470f2ea12.png", // Medical professionals
                "Weather & Disaster Management": "/lovable-uploads/f52c19be-6583-43c7-b3c7-8357ace6a935.png", // Drought cracked earth
                "Government Schemes & Subsidies": "/lovable-uploads/78b4e12a-94eb-42ba-8dda-84ff2b0dcbb1.png", // Govt official with farmer
                "Education & Skill Development": "/lovable-uploads/78b4e12a-94eb-42ba-8dda-84ff2b0dcbb1.png", // Education scene
                "Employment & Livelihood": "/lovable-uploads/78b4e12a-94eb-42ba-8dda-84ff2b0dcbb1.png", // Professional discussion
                "Women & Self-Help Groups": "/lovable-uploads/78b4e12a-94eb-42ba-8dda-84ff2b0dcbb1.png", // Community group
                "Technology & Mobile Usage": "/lovable-uploads/2fc287af-5e57-459d-af13-c3eb627b9390.png", // Smartphone with cows
                "Local Governance & Legal Issues": "/lovable-uploads/78b4e12a-94eb-42ba-8dda-84ff2b0dcbb1.png" // Governance interaction
              };
              return categoryFallbacks[agent.category as keyof typeof categoryFallbacks] || 
                     "/lovable-uploads/45ee1443-ab39-4200-a1ad-13d4b6fb77ae.png"; // Default tech farming image
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
