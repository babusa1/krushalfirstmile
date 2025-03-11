
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToRequestForm = () => {
    const requestFormSection = document.getElementById('request-form-section');
    if (requestFormSection) {
      requestFormSection.scrollIntoView({ behavior: 'smooth' });
      // Ensure form is shown
      const event = new CustomEvent('showRequestForm');
      document.dispatchEvent(event);
    }
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-6',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm dark:bg-krushal-darkPurple/90'
          : 'bg-transparent'
      )}
    >
      {/* Main navbar container - simplified for mobile */}
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/lovable-uploads/f39e4e62-303a-4211-8623-78d6a814b86c.png"
            alt="Krushal"
            className="h-8 sm:h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation - hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <NavLink href="/" label={t('nav.home')} isScrolled={isScrolled} />
          <NavLink href="/agents" label={t('nav.agents')} isScrolled={isScrolled} />
          <NavLink href="/about" label={t('nav.about')} isScrolled={isScrolled} />
          <NavLink href="/contact" label={t('nav.contact')} isScrolled={isScrolled} />
          
          <button 
            className={cn(
              "px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-medium transition-all duration-300",
              isScrolled 
                ? "bg-krushal-purple text-white hover:bg-krushal-brightPurple" 
                : "bg-krushal-brightPurple text-white hover:bg-krushal-purple"
            )}
            onClick={scrollToRequestForm}
          >
            {t('nav.list_agent') || "List your agent"}
          </button>
        </nav>

        {/* Mobile Menu Button - Only visible on mobile */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center justify-center h-10 w-10 text-krushal-darkPurple dark:text-white"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed top-[60px] sm:top-[72px] left-0 right-0 bg-white dark:bg-krushal-darkPurple shadow-lg md:hidden z-40"
        >
          <nav className="container mx-auto py-4 flex flex-col space-y-4">
            <MobileNavLink href="/" label={t('nav.home')} onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavLink href="/agents" label={t('nav.agents')} onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavLink href="/about" label={t('nav.about')} onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavLink href="/contact" label={t('nav.contact')} onClick={() => setIsMobileMenuOpen(false)} />
            <button
              className="w-full text-left text-base font-medium py-3 border-b border-gray-100 dark:border-gray-700 text-krushal-purple dark:text-krushal-lightPurple"
              onClick={scrollToRequestForm}
            >
              {t('nav.list_agent') || "List your agent"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  href: string;
  label: string;
  isScrolled: boolean;
}

const NavLink = ({ href, label, isScrolled }: NavLinkProps) => (
  <Link
    to={href}
    className={cn(
      "text-sm lg:text-base font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-300 hover:after:w-full",
      isScrolled 
        ? "text-krushal-darkPurple after:bg-krushal-purple dark:text-white dark:after:bg-white" 
        : "text-krushal-purple after:bg-krushal-purple dark:text-white dark:after:bg-white"
    )}
  >
    {label}
  </Link>
);

interface MobileNavLinkProps {
  href: string;
  label: string;
  onClick: () => void;
}

const MobileNavLink = ({ href, label, onClick }: MobileNavLinkProps) => {
  return (
    <Link
      to={href}
      className="text-base font-medium py-3 border-b border-gray-100 dark:border-gray-700 text-krushal-darkPurple dark:text-white"
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Navbar;
