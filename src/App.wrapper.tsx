
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import App from './App';

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <LanguageProvider>
          <App />
          <Toaster />
        </LanguageProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
};

export default AppWrapper;
