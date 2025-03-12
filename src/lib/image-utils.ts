
/**
 * Image optimization utilities for SEO and performance
 */

interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * Generates a responsive image URL with width/height parameters
 * This is useful for services that support on-the-fly image resizing like Cloudinary, Imgix, etc.
 * 
 * @param url Original image URL
 * @param dimensions Target dimensions
 * @returns Optimized image URL with dimensions
 */
export const getResponsiveImageUrl = (url: string, dimensions?: ImageDimensions): string => {
  // Skip processing for SVGs as they're already responsive
  if (url.endsWith('.svg')) {
    return url;
  }
  
  // For project uploaded images, add width/height parameters
  if (url.includes('/lovable-uploads/')) {
    return url;
  }
  
  // Example implementation for external image services (Unsplash, etc.)
  if (url.includes('unsplash.com') && dimensions) {
    // Add width and height parameters for Unsplash
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}w=${dimensions.width}&h=${dimensions.height}&auto=format,compress`;
  }
  
  return url;
};

/**
 * Generates a meaningful alt text based on image filename if none is provided
 * 
 * @param src Image source URL
 * @param fallbackAlt Optional fallback alt text
 * @returns Generated alt text
 */
export const generateAltText = (src: string, fallbackAlt?: string): string => {
  if (fallbackAlt) {
    return fallbackAlt;
  }
  
  try {
    // Extract filename from URL
    const filename = src.split('/').pop() || '';
    
    // Remove file extension and special characters
    const nameWithoutExtension = filename.split('.')[0].replace(/[_-]/g, ' ');
    
    // Convert to title case
    const altText = nameWithoutExtension
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    return altText || 'Image';
  } catch (error) {
    console.error('Error generating alt text:', error);
    return 'Image';
  }
};

/**
 * Preloads important images to improve perceived performance
 * 
 * @param imagePaths Array of image paths to preload
 */
export const preloadCriticalImages = (imagePaths: string[]): void => {
  imagePaths.forEach(path => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = path;
    document.head.appendChild(link);
  });
};

/**
 * Optimized image component properties
 */
export interface OptimizedImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
}

