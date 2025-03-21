import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import AgentCard, { Agent } from './AgentCard';

interface AgentListProps {
  agents: Agent[];
  onAgentClick: (agent: Agent) => void;
  categoryTitle?: string;
  searchPlaceholder?: string;
  allCategoriesLabel?: string;
  noAgentsMessage?: string;
  initialSelectedCategory?: string | null;
}

const CategorizedAgentList: React.FC<AgentListProps> = ({ 
  agents, 
  onAgentClick,
  categoryTitle = "Available Agents",
  searchPlaceholder = "Search agents...",
  allCategoriesLabel = "All Categories",
  noAgentsMessage = "No agents found matching your criteria.",
  initialSelectedCategory = null
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialSelectedCategory);

  // Update selected category when initialSelectedCategory changes
  useEffect(() => {
    if (initialSelectedCategory !== undefined) {
      setSelectedCategory(initialSelectedCategory);
    }
  }, [initialSelectedCategory]);

  // Extract unique categories
  const categories = Array.from(new Set(agents.map(agent => agent.category)));

  // Filter agents based on search and category
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = 
      agent.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    // If a category is selected, only include agents in that category that match the search
    // If no category is selected, include all agents that match the search
    const matchesCategory = selectedCategory ? agent.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col mb-6 sm:mb-10"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-krushal-darkPurple dark:text-white">
              {categoryTitle}
            </h2>
            
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white text-base"
              />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6 overflow-x-auto">
            <div className="flex flex-wrap gap-2 pb-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2.5 rounded-full text-base font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === null
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {allCategoriesLabel}
              </button>
              
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2.5 rounded-full text-base font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {filteredAgents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredAgents.map((agent, index) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onClick={() => onAgentClick(agent)}
                delay={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-lg text-gray-600 dark:text-gray-300">{noAgentsMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorizedAgentList;
