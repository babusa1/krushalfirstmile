
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Seo from '@/components/Seo';
import OptimizedImage from "@/components/OptimizedImage";
import { useAnalytics } from "@/hooks/use-analytics";

const NotFound = () => {
  const location = useLocation();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // Log to console for debugging
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Track 404 error as an event in analytics
    trackEvent('Error', '404', `Path: ${location.pathname}`);
  }, [location.pathname, trackEvent]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Seo 
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Return to Krushal's home page to explore our AI-powered agriculture and dairy farming solutions."
        canonicalUrl="https://krushal.ai/404"
        ogType="website"
      />
      
      <div className="text-center p-8 max-w-lg">
        <div className="mb-8 mx-auto w-64 h-64">
          <OptimizedImage
            src="/placeholder.svg"
            alt="404 Page Not Found Illustration"
            width={256}
            height={256}
            objectFit="contain"
            priority={true}
          />
        </div>
        
        <h1 className="text-6xl font-bold mb-4 text-krushal-darkPurple dark:text-white">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className="px-6 py-3 bg-krushal-purple text-white rounded-md font-medium hover:bg-krushal-brightPurple transition-colors shadow-md hover:shadow-lg">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
