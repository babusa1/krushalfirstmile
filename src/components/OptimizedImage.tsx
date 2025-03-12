
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { generateAltText, getResponsiveImageUrl, OptimizedImageProps } from '@/lib/image-utils';

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  objectFit = 'cover',
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Generate alt text if not provided
  const imageAlt = alt || generateAltText(src);
  
  // Get optimized image URL
  const optimizedSrc = getResponsiveImageUrl(src, { width: width || 800, height: height || 600 });
  
  // Fallback image for errors
  const fallbackSrc = '/placeholder.svg';
  
  const handleError = () => {
    console.warn(`Failed to load image: ${src}`);
    setHasError(true);
  };
  
  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  return (
    <div 
      className={cn(
        "overflow-hidden relative",
        className
      )}
      style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : 'auto' }}
    >
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse rounded" />
      )}
      
      <img
        src={hasError ? fallbackSrc : optimizedSrc}
        alt={imageAlt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        onError={handleError}
        onLoad={handleLoad}
        className={cn(
          "transition-opacity duration-300",
          !isLoaded && "opacity-0",
          isLoaded && "opacity-100",
          `object-${objectFit}`,
          "w-full h-full"
        )}
        {...(priority && { fetchpriority: "high" })}
      />
    </div>
  );
};

export default OptimizedImage;
