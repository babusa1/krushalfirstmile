
import { useEffect, useCallback } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

// Initialize with your measurement ID
const MEASUREMENT_ID = 'G-6DLGGJ5NXX'; // Using the provided Google Analytics ID

// Initialize Google Analytics
export const initializeAnalytics = () => {
  // Only initialize if we have a valid measurement ID
  if (MEASUREMENT_ID) {
    try {
      ReactGA.initialize(MEASUREMENT_ID);
      console.log('Analytics initialized');
    } catch (error) {
      console.error('Analytics initialization failed:', error);
    }
  } else {
    console.warn('Analytics not initialized: Missing Measurement ID');
  }
};

/**
 * Hook to track page views and custom events
 */
export const useAnalytics = () => {
  const location = useLocation();
  
  // Track page views when route changes
  useEffect(() => {
    if (MEASUREMENT_ID) {
      ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
      console.log(`Page view tracked: ${location.pathname}`);
    }
  }, [location]);
  
  // Function to track custom events
  const trackEvent = useCallback((category: string, action: string, label?: string, value?: number) => {
    if (MEASUREMENT_ID) {
      ReactGA.event({
        category,
        action,
        label,
        value
      });
      console.log(`Event tracked: ${category} - ${action} ${label ? `- ${label}` : ''}`);
    }
  }, []);
  
  return { trackEvent };
};
