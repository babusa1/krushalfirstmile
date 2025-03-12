
import React from 'react';

interface CarouselDotsProps {
  count: number;
  current: number;
  onClick: (index: number) => void;
}

const CarouselDots: React.FC<CarouselDotsProps> = ({ count, current, onClick }) => {
  return (
    <div className="flex justify-center mt-1 sm:mt-2 space-x-1 sm:space-x-1.5">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onClick(index)}
          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
            index === current 
              ? 'bg-secondary w-3 sm:w-4' 
              : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary dark:hover:bg-primary'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default CarouselDots;
