
import { useEffect, useCallback } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

// Initialize with your measurement ID
const MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual Google Analytics ID

// Initialize Google Analytics
export const initializeAnalytics = () => {
  try {
    ReactGA.initialize(MEASUREMENT_ID);
    console.log('Analytics initialized');
  } catch (error) {
    console.error('Analytics initialization failed:', error);
  }
};

/**
 * Hook to track page views and custom events
 */
export const useAnalytics = () => {
  const location = useLocation();
  
  // Track page views when route changes
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
    console.log(`Page view tracked: ${location.pathname}`);
  }, [location]);
  
  // Function to track custom events
  const trackEvent = useCallback((category: string, action: string, label?: string, value?: number) => {
    ReactGA.event({
      category,
      action,
      label,
      value
    });
    console.log(`Event tracked: ${category} - ${action} ${label ? `- ${label}` : ''}`);
  }, []);
  
  return { trackEvent };
};
