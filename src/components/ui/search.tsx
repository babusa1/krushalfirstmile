
import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Agent } from '../AgentCard';

interface SearchProps {
  agents: Agent[];
  onAgentSelect: (agent: Agent) => void;
  className?: string;
}

const Search: React.FC<SearchProps> = ({ agents, onAgentSelect, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Agent[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Handle clicks outside the search component
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Filter agents based on search term
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = agents.filter(agent => 
      agent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setResults(filtered);
  }, [searchTerm, agents]);

  const handleOpen = () => {
    setIsOpen(true);
    // Focus the input after opening
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleClear = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  const handleSelect = (agent: Agent) => {
    onAgentSelect(agent);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className={cn("relative", className)} ref={searchRef}>
      {isOpen ? (
        <div className="flex items-center w-full">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-krushal-purple dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            {searchTerm && (
              <button 
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={handleClear}
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          <button 
            className="ml-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          onClick={handleOpen}
          aria-label="Search"
        >
          <SearchIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
      )}

      {/* Search results dropdown */}
      {isOpen && searchTerm && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto z-10">
          <ul className="py-2">
            {results.map(agent => (
              <li key={agent.id}>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => handleSelect(agent)}
                >
                  <p className="font-medium text-krushal-darkPurple dark:text-white">{agent.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{agent.category}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isOpen && searchTerm && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
          <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
            No results found for "{searchTerm}"
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
