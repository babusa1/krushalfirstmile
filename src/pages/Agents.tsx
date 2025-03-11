
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AgentDetailsModal from '@/components/AgentDetailsModal';
import CategorizedAgentList from '@/components/CategorizedAgentList';
import { Agent } from '@/components/AgentCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { allAgents } from '@/data/agents';

const Agents = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />

      {/* Page Header */}
      <section className="pt-28 md:pt-32 lg:pt-36 pb-8 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/50">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-krushal-darkPurple dark:text-white leading-tight mb-4">
              {t('available.title')}
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Browse our complete collection of AI agents designed to assist with various tasks across multiple domains.
            </p>
          </motion.div>
        </div>
      </section>

      {/* All Agents List */}
      <section id="agent-list" className="py-12 px-6 bg-gray-50 dark:bg-gray-900/70">
        <div className="container mx-auto">
          <CategorizedAgentList 
            agents={allAgents} 
            onAgentClick={handleAgentClick} 
            categoryTitle={t('available.title')}
            searchPlaceholder={t('available.search')}
            allCategoriesLabel={t('available.all')}
            noAgentsMessage={t('available.none')}
          />
        </div>
      </section>

      {/* Agent Details Modal */}
      <AgentDetailsModal 
        agent={selectedAgent} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <Footer />
    </div>
  );
};

export default Agents;
