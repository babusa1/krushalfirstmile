import React, { useState } from 'react';
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
}

const CategorizedAgentList: React.FC<AgentListProps> = ({ 
  agents, 
  onAgentClick,
  categoryTitle = "Available Agents",
  searchPlaceholder = "Search agents...",
  allCategoriesLabel = "All Categories",
  noAgentsMessage = "No agents found matching your criteria."
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-krushal-darkPurple dark:text-white">
              {categoryTitle}
            </h2>
            
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white text-sm sm:text-base"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
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
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {filteredAgents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{noAgentsMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorizedAgentList;
