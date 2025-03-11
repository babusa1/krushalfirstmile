
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-krushal-darkPurple dark:text-white">{t('notfound.title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">{t('notfound.message')}</p>
        <a href="/" className="text-krushal-purple hover:text-krushal-brightPurple underline">
          {t('notfound.return')}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
