
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselControlsProps {
  onPrevClick: () => void;
  onNextClick: () => void;
}

const CarouselControls: React.FC<CarouselControlsProps> = ({ onPrevClick, onNextClick }) => {
  return (
    <>
      <div className="absolute top-1/2 left-1 sm:left-2 z-10 transform -translate-y-1/2">
        <button
          onClick={onPrevClick}
          className="p-1 sm:p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-primary shadow-md hover:bg-white transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
        </button>
      </div>
      
      <div className="absolute top-1/2 right-1 sm:right-2 z-10 transform -translate-y-1/2">
        <button
          onClick={onNextClick}
          className="p-1 sm:p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-primary shadow-md hover:bg-white transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
        </button>
      </div>
    </>
  );
};

export default CarouselControls;
