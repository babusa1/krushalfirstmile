
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
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="/lovable-uploads/f39e4e62-303a-4211-8623-78d6a814b86c.png"
            alt="Krushal"
            className="h-8 sm:h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
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
            List your agent
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-krushal-darkPurple dark:text-white p-1"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed top-[60px] sm:top-[76px] left-0 right-0 bg-white dark:bg-krushal-darkPurple shadow-lg md:hidden transition-transform duration-300 ease-in-out z-40",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="container mx-auto py-3 px-4 sm:px-6 flex flex-col space-y-3">
          <MobileNavLink href="/" label={t('nav.home')} onClick={() => setIsMobileMenuOpen(false)} />
          <MobileNavLink href="/agents" label={t('nav.agents')} onClick={() => setIsMobileMenuOpen(false)} />
          <MobileNavLink href="/about" label={t('nav.about')} onClick={() => setIsMobileMenuOpen(false)} />
          <MobileNavLink href="/contact" label={t('nav.contact')} onClick={() => setIsMobileMenuOpen(false)} />
          
          {/* List Your Agent as menu item instead of button */}
          <MobileNavLink 
            href="#" 
            label="List your agent" 
            onClick={() => {
              setIsMobileMenuOpen(false);
              scrollToRequestForm();
            }} 
            highlight={true}
          />
        </div>
      </div>
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
  highlight?: boolean;
}

const MobileNavLink = ({ href, label, onClick, highlight }: MobileNavLinkProps) => {
  if (href === "#" && highlight) {
    return (
      <button
        className="w-full text-left text-krushal-purple dark:text-krushal-lightPurple font-medium py-2 border-b border-gray-100 dark:border-gray-700 text-sm sm:text-base"
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
  
  return (
    <Link
      to={href}
      className="text-krushal-darkPurple dark:text-white font-medium py-2 border-b border-gray-100 dark:border-gray-700 text-sm sm:text-base"
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Navbar;
