
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6',
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
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="/" label="Home" isScrolled={isScrolled} />
          <NavLink href="/agents" label="Agents" isScrolled={isScrolled} />
          <NavLink href="/about" label="About Us" isScrolled={isScrolled} />
          <NavLink href="/contact" label="Contact" isScrolled={isScrolled} />
          
          <button 
            className={cn(
              "px-4 py-2 rounded-md font-medium transition-all duration-300",
              isScrolled 
                ? "bg-krushal-purple text-white hover:bg-krushal-brightPurple" 
                : "bg-krushal-brightPurple text-white hover:bg-krushal-purple"
            )}
            onClick={() => {
              const requestFormSection = document.getElementById('request-form-section');
              if (requestFormSection) {
                requestFormSection.scrollIntoView({ behavior: 'smooth' });
                // Ensure form is shown
                const event = new CustomEvent('showRequestForm');
                document.dispatchEvent(event);
              }
            }}
          >
            Submit Agent
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-krushal-darkPurple dark:text-white"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed top-[76px] left-0 right-0 bg-white dark:bg-krushal-darkPurple shadow-lg md:hidden transition-transform duration-300 ease-in-out z-40",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="container mx-auto py-4 px-6 flex flex-col space-y-4">
          <MobileNavLink href="/" label="Home" onClick={() => setIsMobileMenuOpen(false)} />
          <MobileNavLink href="/agents" label="Agents" onClick={() => setIsMobileMenuOpen(false)} />
          <MobileNavLink href="/about" label="About Us" onClick={() => setIsMobileMenuOpen(false)} />
          <MobileNavLink href="/contact" label="Contact" onClick={() => setIsMobileMenuOpen(false)} />
          
          <button 
            className="w-full mt-4 px-4 py-3 bg-krushal-brightPurple text-white rounded-md font-medium hover:bg-krushal-purple transition-colors"
            onClick={() => {
              setIsMobileMenuOpen(false);
              const requestFormSection = document.getElementById('request-form-section');
              if (requestFormSection) {
                requestFormSection.scrollIntoView({ behavior: 'smooth' });
                // Ensure form is shown
                const event = new CustomEvent('showRequestForm');
                document.dispatchEvent(event);
              }
            }}
          >
            Submit Agent
          </button>
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
      "font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-300 hover:after:w-full",
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

const MobileNavLink = ({ href, label, onClick }: MobileNavLinkProps) => (
  <Link
    to={href}
    className="text-krushal-darkPurple dark:text-white font-medium py-2 border-b border-gray-100 dark:border-gray-700"
    onClick={onClick}
  >
    {label}
  </Link>
);

export default Navbar;
