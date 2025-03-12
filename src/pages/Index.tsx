import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AgentCarousel from '@/components/AgentCarousel';
import AgentDetailsModal from '@/components/AgentDetailsModal';
import CategorySection from '@/components/CategorySection';
import CategorizedAgentList from '@/components/CategorizedAgentList';
import RequestForm from '@/components/RequestForm';
import Seo from '@/components/Seo';
import { Agent } from '@/components/AgentCard';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { allAgents, featuredAgents } from '@/data/agents';

const Index = () => {
  const navigate = useNavigate();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleShowRequestForm = () => {
      setShowRequestForm(true);
    };
    
    document.addEventListener('showRequestForm', handleShowRequestForm);
    return () => document.removeEventListener('showRequestForm', handleShowRequestForm);
  }, []);

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    const agentListSection = document.getElementById('agent-list');
    if (agentListSection) {
      agentListSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreCategory = (category: string) => {
    navigate(`/agents?category=${encodeURIComponent(category)}`);
  };

  const toggleRequestForm = () => {
    setShowRequestForm(!showRequestForm);
    if (!showRequestForm) {
      setTimeout(() => {
        const formSection = document.getElementById('request-form-section');
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const scrollToAgentList = () => {
    const agentListSection = document.getElementById('agent-list');
    if (agentListSection) {
      agentListSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToRequestForm = () => {
    setShowRequestForm(true);
    setTimeout(() => {
      const formSection = document.getElementById('request-form-section');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Seo 
        title="Smart Agriculture & Dairy Solutions"
        description="Krushal's AI-powered solutions for dairy farming, agriculture, and livestock management. Get personalized ration recommendations and milk volume predictions for your cattle."
        canonicalUrl="https://krushal.ai/"
        keywords="Krushal, dairy farming, agriculture, smart ration, milk prediction, livestock management, farm technology, AI agriculture, Jersey cows, HF cows"
      />
      
      <Navbar />

      {/* Hero Section with Integrated Carousel */}
      <section className="pt-24 md:pt-32 lg:pt-36 pb-16 px-6" id="featured-agents">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 space-y-6"
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-krushal-darkPurple dark:text-white leading-tight">
                {t('hero.title')}
              </h1>
              
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
                {t('hero.description')}
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button 
                  className="px-6 py-3 bg-krushal-purple text-white rounded-md font-medium hover:bg-krushal-brightPurple transition-colors shadow-md hover:shadow-lg text-base"
                  onClick={scrollToRequestForm}
                >
                  {t('hero.submit')}
                </button>
                
                <button 
                  onClick={scrollToAgentList}
                  className="px-6 py-3 border border-krushal-purple text-krushal-purple rounded-md font-medium hover:bg-krushal-purple/10 transition-colors flex items-center justify-center text-base"
                >
                  {t('hero.explore')}
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-krushal-purple/20 to-krushal-lightPurple/20 blur-xl"></div>
                <div className="relative bg-white dark:bg-krushal-darkPurple/90 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                  <h2 className="text-xl md:text-3xl font-bold text-krushal-darkPurple dark:text-white px-6 pt-4 pb-2">
                    {t('featured.title')}
                  </h2>
                  <AgentCarousel 
                    agents={featuredAgents} 
                    onAgentClick={handleAgentClick} 
                  />
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 md:mt-24 text-center"
          >
            <button 
              onClick={scrollToAgentList}
              className="inline-flex flex-col items-center text-krushal-purple dark:text-krushal-lightPurple hover:text-krushal-brightPurple dark:hover:text-white transition-colors"
            >
              <span className="text-base font-medium mb-2">{t('hero.discover')}</span>
              <ChevronDown className="h-6 w-6 animate-bounce" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <CategorySection 
          onCategoryClick={handleCategoryClick} 
          onExploreCategory={handleExploreCategory}
        />
      </section>

      {/* Agent Request Form */}
      <section 
        id="request-form-section" 
        className={`py-16 px-6 bg-gray-50 dark:bg-gray-900/70 ${showRequestForm ? 'block' : 'hidden'}`}
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-krushal-darkPurple dark:text-white mb-4">
              {t('form.title')}
            </h2>
            <p className="text-base dark:text-gray-300 max-w-3xl mx-auto">
              {t('form.description')}
            </p>
          </motion.div>

          <RequestForm />
        </div>
      </section>

      {/* All Agents List */}
      <section id="agent-list" className="py-16 px-6 bg-gray-50 dark:bg-gray-900/70">
        <div className="container mx-auto">
          <CategorizedAgentList 
            agents={allAgents} 
            onAgentClick={handleAgentClick} 
            categoryTitle={t('list.of.agents')}
            searchPlaceholder={t('available.search')}
            allCategoriesLabel={t('available.all')}
            noAgentsMessage={t('available.none')}
            initialSelectedCategory={activeCategory}
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

export default Index;
