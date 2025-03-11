import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AgentCarousel from '@/components/AgentCarousel';
import AgentDetailsModal from '@/components/AgentDetailsModal';
import CategorySection from '@/components/CategorySection';
import CategorizedAgentList from '@/components/CategorizedAgentList';
import RequestForm from '@/components/RequestForm';
import { Agent } from '@/components/AgentCard';
import { ChevronDown } from 'lucide-react';

// Mock data for featured agents
const featuredAgents: Agent[] = [
  {
    id: "agent1",
    title: "Mortgage Document Extractor",
    description: "AI agent trained to extract and process key information from mortgage documents, including warranty deeds, trust certifications, quit claim deeds, and more. Streamlines document processing for financial institutions and real estate professionals.",
    category: "Digital & Financial Services",
    features: [
      "Extracts data from Special Warranty Deeds",
      "Processes Mortgage and Warranty Deed information",
      "Handles Quit Claim Deeds and Trustee's Deeds",
      "Manages Notice of Commencement and Termination",
      "Extracts data from UCC Financing Statement Amendments"
    ]
  },
  {
    id: "agent2",
    title: "Smart Ration Agent for HF and Jersey Cows",
    description: "Krushal's smart-poshan provides personalized feed recommendations for dairy cows based on breed, age, calving history, and milk production. Optimizes nutrition while keeping fodder availability as a priority, resulting in cost-effective ration plans.",
    category: "Livestock & Dairy",
    features: [
      "Analyzes cow breed, age, and calving history",
      "Considers current milk production",
      "Evaluates available fodder resources",
      "Delivers cost-effective ration recommendations",
      "Ensures optimal nutritional requirements"
    ]
  },
  {
    id: "agent3",
    title: "Milk Volume Predictor for Dairy Cows",
    description: "Krushal's smart-litres projects future milk volume for individual cows over the next 12 months. By analyzing breed, age, body condition, and production history, it helps dairies estimate logistics and plan resource allocation effectively.",
    category: "Livestock & Dairy",
    features: [
      "Predicts milk volume for 12 months in advance",
      "Analyzes cow's breed, age, and body condition",
      "Considers pregnancy status and calving history",
      "Helps dairies optimize logistics planning",
      "Supports large-scale production forecasting"
    ]
  },
  {
    id: "agent4",
    title: "Conversational AI for Elders",
    description: "An AI companion that assists elderly individuals with daily tasks, appointment reminders, and medication tracking. Provides emotional support through natural conversations and keeps users informed with news updates and information relevant to their interests.",
    category: "Healthcare & Medicine",
    features: [
      "Daily task notifications and reminders",
      "Medical history tracking and appointment management",
      "Natural conversation for emotional support",
      "News reading and information services",
      "Easy-to-use interface designed for seniors"
    ]
  },
  {
    id: "agent5",
    title: "Technical Evaluation for Fund Management",
    description: "Comprehensive technical due diligence solution covering financial management, security analysis, data infrastructure, and technology stack review. Ensures regulatory compliance and innovation readiness for investment firms and financial institutions.",
    category: "Digital & Financial Services",
    features: [
      "Financial management assessment",
      "Security and risk analysis",
      "Technology infrastructure evaluation",
      "User experience and interface assessment",
      "Regulatory compliance verification"
    ]
  }
];

// Mock data for all agents
const allAgents: Agent[] = [
  ...featuredAgents,
  {
    id: "agent6",
    title: "Market Price Predictor",
    description: "AI agent that analyzes market trends and predicts future crop prices, helping farmers make informed decisions about when to sell their produce.",
    category: "Agriculture & Farming"
  },
  {
    id: "agent7",
    title: "Farming Techniques Advisor",
    description: "Provides best farming practices, crop rotation strategies, and sustainable agriculture tips to improve yield and soil health.",
    category: "Agriculture & Farming"
  },
  {
    id: "agent8",
    title: "Crop Disease Identifier",
    description: "Analyzes images or descriptions of crop symptoms to diagnose diseases and recommend appropriate treatments.",
    category: "Agriculture & Farming"
  },
  {
    id: "agent9",
    title: "Weather Forecast Agent",
    description: "Delivers accurate, localized weather forecasts to help farmers plan their activities and protect crops from adverse conditions.",
    category: "Weather & Disaster Management"
  },
  {
    id: "agent10",
    title: "Fertilizers & Pesticides Advisor",
    description: "Recommends appropriate fertilizers and pesticides based on crop type, soil condition, and specific farming needs.",
    category: "Agriculture & Farming"
  },
  {
    id: "agent11",
    title: "Livestock Management Advisory",
    description: "Provides best practices for feeding, breeding, and health monitoring of livestock to improve productivity and welfare.",
    category: "Livestock & Dairy"
  },
  {
    id: "agent12",
    title: "Animal Disease Identifier",
    description: "Identifies animal diseases based on symptoms and provides recommendations for veterinary care and treatment options.",
    category: "Livestock & Dairy"
  },
  {
    id: "agent13",
    title: "Government Subsidies Advisor",
    description: "Informs farmers about available government subsidies for livestock and dairy farming and guides them through the application process.",
    category: "Government Schemes & Subsidies"
  },
  {
    id: "agent14",
    title: "Veterinary Care Assistant",
    description: "Provides veterinary advice, connects farmers with nearby vets, and offers preventive care tips for livestock health.",
    category: "Livestock & Dairy"
  },
  {
    id: "agent15",
    title: "Dairy Production Optimizer",
    description: "Monitors dairy production, tracks milk yield, and suggests ways to improve dairy farming efficiency and product quality.",
    category: "Livestock & Dairy"
  },
  {
    id: "agent16",
    title: "Disaster Relief Advisor",
    description: "Provides information on available disaster relief funds and assists farmers in applying for support after natural calamities.",
    category: "Weather & Disaster Management"
  },
  {
    id: "agent17",
    title: "Rainfall Predictor",
    description: "Provides accurate rainfall predictions for different regions, helping farmers plan irrigation and crop management.",
    category: "Weather & Disaster Management"
  },
  {
    id: "agent18",
    title: "Flood & Drought Preparedness Advisor",
    description: "Offers advice on how to prepare for and mitigate the effects of floods and droughts on agricultural operations.",
    category: "Weather & Disaster Management"
  },
  {
    id: "agent19",
    title: "Scheme Eligibility Checker",
    description: "Determines which government schemes a farmer is eligible for based on their profile and farming activities.",
    category: "Government Schemes & Subsidies"
  },
  {
    id: "agent20",
    title: "Application Assistant",
    description: "Guides farmers through the application process for various government schemes and subsidies to maximize success rates.",
    category: "Government Schemes & Subsidies"
  }
];

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showRequestForm, setShowRequestForm] = useState(false);

  useEffect(() => {
    // Listen for custom event to show the request form
    const handleShowRequestForm = () => {
      setShowRequestForm(true);
    };
    
    document.addEventListener('showRequestForm', handleShowRequestForm);
    
    return () => {
      document.removeEventListener('showRequestForm', handleShowRequestForm);
    };
  }, []);

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    
    // Scroll to the agent list section
    const agentListSection = document.getElementById('agent-list');
    if (agentListSection) {
      agentListSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleRequestForm = () => {
    setShowRequestForm(!showRequestForm);

    // If we're showing the form, scroll to it
    if (!showRequestForm) {
      setTimeout(() => {
        const formSection = document.getElementById('request-form-section');
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
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
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 md:pt-32 lg:pt-36 pb-16 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-krushal-darkPurple dark:text-white leading-tight">
                First Mile Modernization
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We methodically unlock hidden value in anchor value chains, catalyzing higher earnings for both producers and offtakers. Our approach extends to adjacent value chains, modernizing local ecosystems.
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button 
                  className="px-6 py-3 bg-krushal-purple text-white rounded-md font-medium hover:bg-krushal-brightPurple transition-colors shadow-md hover:shadow-lg"
                  onClick={scrollToRequestForm}
                >
                  Submit Your Agent
                </button>
                
                <a 
                  href="#featured-agents"
                  className="px-6 py-3 border border-krushal-purple text-krushal-purple rounded-md font-medium hover:bg-krushal-purple/10 transition-colors flex items-center justify-center"
                >
                  Explore Agents
                </a>
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
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&h=800" 
                    alt="First Mile Modernization" 
                    className="w-full h-auto"
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
            <a 
              href="#featured-agents"
              className="inline-flex flex-col items-center text-krushal-purple dark:text-krushal-lightPurple hover:text-krushal-brightPurple dark:hover:text-white transition-colors"
            >
              <span className="text-sm font-medium mb-2">Discover Our AI Agents</span>
              <ChevronDown className="h-6 w-6 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Featured Agents Carousel */}
      <section id="featured-agents" className="py-16 px-6 bg-gray-50 dark:bg-gray-900/70">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-krushal-darkPurple dark:text-white mb-4">
              Featured Krushal Agents
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our AI agents are designed to modernize first mile operations, improving productivity and access in rural economies.
            </p>
          </motion.div>

          <AgentCarousel 
            agents={featuredAgents} 
            onAgentClick={handleAgentClick} 
          />
        </div>
      </section>

      {/* Category Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <CategorySection onCategoryClick={handleCategoryClick} />
      </section>

      {/* Agent Request Form - Always included in the DOM but conditionally visible */}
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
            <h2 className="text-3xl md:text-4xl font-bold text-krushal-darkPurple dark:text-white mb-4">
              Submit Your Agent
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Have an AI agent that could help with first mile modernization? Share it with us for evaluation.
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
