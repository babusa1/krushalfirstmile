
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define available languages (just English for now)
export type Language = 'en';

// Language names for display
export const languageNames = {
  en: 'English'
};

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Create translations (only English)
const translations: Record<Language, Record<string, string>> = {
  // English translations
  en: {
    'nav.home': 'Home',
    'nav.agents': 'Agents',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.submit': 'Submit Agent',
    'hero.title': 'First Mile Modernization',
    'hero.description': 'We methodically unlock hidden value in anchor value chains, catalyzing higher earnings for both producers and offtakers. Our approach extends to adjacent value chains, modernizing local ecosystems.',
    'hero.submit': 'Submit Your Agent',
    'hero.explore': 'Explore Agents',
    'hero.discover': 'Discover Our AI Agents',
    'featured.title': 'Featured Krushal Agents',
    'featured.description': 'Our AI agents are designed to modernize first mile operations, improving productivity and access in rural economies.',
    'categories.title': 'Agent Categories',
    'categories.description': 'Discover AI agents across various categories designed to support rural productivity, improve quality, and enhance access.',
    'categories.explore': 'Explore agents',
    'available.title': 'Available Agents',
    'available.search': 'Search agents...',
    'available.all': 'All Categories',
    'available.none': 'No agents found matching your criteria.',
    'available.agents': 'Agents',
    'available.description': 'Discover our comprehensive collection of AI agents designed to support rural productivity, improve quality, and enhance access across various domains.',
    'available.categoryDescription': 'Specialized AI agents in this category designed to address specific challenges and opportunities in rural economies.',
    'form.title': 'Submit Your Agent',
    'form.description': 'Have an AI agent that could help with first mile modernization? Share it with us for evaluation.',
    'form.name': 'Your Name',
    'form.email': 'Email Address',
    'form.agentName': 'Agent Name',
    'form.agentCategory': 'Agent Category',
    'form.agentDescription': 'Agent Description',
    'form.contactNumber': 'Contact Number (optional)',
    'form.submit': 'Submit Agent for Evaluation',
    'form.processing': 'Processing...',
    'form.success': 'Submitted Successfully',
    'form.note': 'We\'ll review your submission and get back to you within 24 hours.',
    'form.placeholder.name': 'John Doe',
    'form.placeholder.email': 'your@email.com',
    'form.placeholder.agentName': 'Smart Farm Assistant',
    'form.placeholder.category': 'Select a category',
    'form.placeholder.description': 'Describe what your agent does and how it can help people in rural areas...',
    'form.placeholder.contact': '+91 9876543210',
    'modal.features': 'Key Features',
    'modal.try': 'Try This Agent',
    'modal.info': 'Request More Info',
    'footer.description': 'We handpick first mile value chains and fix productivity, quality and access gaps to modernize local economies.',
    'footer.quicklinks': 'Quick Links',
    'footer.categories': 'Agent Categories',
    'footer.contactus': 'Contact Us',
    'footer.copyright': 'All rights reserved. First Mile as a Service',
    'footer.sendMessage': 'Send us a Message',
    'notfound.title': '404',
    'notfound.message': 'Oops! Page not found',
    'notfound.return': 'Return to Home',
    'category.agriculture': 'Agriculture & Farming',
    'category.livestock': 'Livestock & Dairy',
    'category.schemes': 'Government Schemes & Subsidies',
    'category.healthcare': 'Healthcare & Medicine',
    'category.education': 'Education & Skill Development',
    'category.employment': 'Employment & Livelihood',
    'category.financial': 'Digital & Financial Services',
    'category.women': 'Women & Self-Help Groups (SHGs)',
    'category.weather': 'Weather & Disaster Management',
    'category.technology': 'Technology & Mobile Usage',
    'category.governance': 'Local Governance & Legal Issues',
    'learn.more': 'Learn more',
    'try.now': 'Try now',
    'agent.mortgage.title': 'Mortgage Document Extractor',
    'agent.mortgage.description': 'AI agent trained to extract and process key information from mortgage documents, including warranty deeds, trust certifications, quit claim deeds, and more. Streamlines document processing for financial institutions and real estate professionals.',
    'agent.mortgage.feature1': 'Extracts data from Special Warranty Deeds',
    'agent.mortgage.feature2': 'Processes Mortgage and Warranty Deed information',
    'agent.mortgage.feature3': 'Handles Quit Claim Deeds and Trustee\'s Deeds',
    'agent.mortgage.feature4': 'Manages Notice of Commencement and Termination',
    'agent.mortgage.feature5': 'Extracts data from UCC Financing Statement Amendments',
    'agent.ration.title': 'Smart Ration Agent for HF and Jersey Cows',
    'agent.ration.description': 'Krushal\'s smart-poshan provides personalized feed recommendations for dairy cows based on breed, age, calving history, and milk production. Optimizes nutrition while keeping fodder availability as a priority, resulting in cost-effective ration plans.',
    'agent.ration.feature1': 'Analyzes cow breed, age, and calving history',
    'agent.ration.feature2': 'Considers current milk production',
    'agent.ration.feature3': 'Evaluates available fodder resources',
    'agent.ration.feature4': 'Delivers cost-effective ration recommendations',
    'agent.ration.feature5': 'Ensures optimal nutritional requirements',
    'agent.milk.title': 'Milk Volume Predictor for Dairy Cows',
    'agent.milk.description': 'Krushal\'s smart-litres projects future milk volume for individual cows over the next 12 months. By analyzing breed, age, body condition, and production history, it helps dairies estimate logistics and plan resource allocation effectively.',
    'agent.milk.feature1': 'Predicts milk volume for 12 months in advance',
    'agent.milk.feature2': 'Analyzes cow\'s breed, age, and body condition',
    'agent.milk.feature3': 'Considers pregnancy status and calving history',
    'agent.milk.feature4': 'Helps dairies optimize logistics planning',
    'agent.milk.feature5': 'Supports large-scale production forecasting',
    'agent.elder.title': 'Conversational AI for Elders',
    'agent.elder.description': 'An AI companion that assists elderly individuals with daily tasks, appointment reminders, and medication tracking. Provides emotional support through natural conversations and keeps users informed with news updates and information relevant to their interests.',
    'agent.elder.feature1': 'Daily task notifications and reminders',
    'agent.elder.feature2': 'Medical history tracking and appointment management',
    'agent.elder.feature3': 'Natural conversation for emotional support',
    'agent.elder.feature4': 'News reading and information services',
    'agent.elder.feature5': 'Easy-to-use interface designed for seniors',
    'agent.fund.title': 'Technical Evaluation for Fund Management',
    'agent.fund.description': 'Comprehensive technical due diligence solution covering financial management, security analysis, data infrastructure, and technology stack review. Ensures regulatory compliance and innovation readiness for investment firms and financial institutions.',
    'agent.fund.feature1': 'Financial management assessment',
    'agent.fund.feature2': 'Security and risk analysis',
    'agent.fund.feature3': 'Technology infrastructure evaluation',
    'agent.fund.feature4': 'User experience and interface assessment',
    'agent.fund.feature5': 'Regulatory compliance verification',
    
    // About Us page translations
    'about.hero.title': 'Empowering First Mile Modernization',
    'about.hero.subtitle': 'Transforming Rural Economies Through Intelligent Technology',
    'about.mission.title': 'Our Mission',
    'about.mission.description': 'To revolutionize industries by methodically unlocking hidden value in the first mile of value chains, using cutting-edge technology solutions that drive efficiency, sustainability, and growth.',
    'about.story.title': 'Our Story',
    'about.story.p1': 'Krushal was born from a vision to address the most fundamental challenges in underserved markets. We noticed that while much attention was focused on last-mile delivery, the critical first mile—where production begins—remained largely untouched by technological innovation.',
    'about.story.p2': 'Our journey began in the fields and villages of rural communities, where we witnessed firsthand the tremendous potential locked within traditional production systems. We saw dairy farmers struggling with preventable livestock diseases, agricultural workers lacking access to modern techniques, and local producers disconnected from broader markets.',
    'about.story.p3': 'These observations sparked our mission to create "First Mile as a Service"—a revolutionary approach that brings the power of AI, data analytics, and cloud technologies directly to the starting point of value creation.',
    'about.approach.title': 'Our Approach',
    'about.approach.description': 'Krushal integrates the power of artificial intelligence with deep industry expertise to create smart, scalable solutions. We don\'t just provide technology; we deliver actionable insights and continuous support that ensure long-term success.',
    'about.approach.item1.title': 'Identify Critical Needs',
    'about.approach.item1.description': 'We work closely with communities and businesses to understand their unique challenges and opportunities.',
    'about.approach.item2.title': 'Develop Tailored Solutions',
    'about.approach.item2.description': 'Our team of experts creates custom AI agents and digital tools designed specifically for local contexts.',
    'about.approach.item3.title': 'Implement & Adapt',
    'about.approach.item3.description': 'We deploy solutions with hands-on training and continuously refine them based on real-world feedback.',
    'about.approach.item4.title': 'Measure & Scale',
    'about.approach.item4.description': 'We track tangible outcomes and help scale successful solutions across communities and regions.',
    'about.impact.title': 'Our Impact',
    'about.impact.description': 'Krushal\'s innovative solutions have already made a tangible difference across multiple sectors:',
    'about.impact.dairy.title': 'Revolutionizing Dairy Farming',
    'about.impact.dairy.description': 'Our AI-powered agents have transformed dairy farming by detecting early signs of mastitis, ensuring healthier herds and higher-quality milk production.',
    'about.impact.efficiency.title': 'Driving Cost Reduction & Efficiency',
    'about.impact.efficiency.description': 'Businesses have achieved significant cost reductions and productivity improvements across their first-mile operations through our technologies.',
    'about.impact.transformation.title': 'Enabling End-to-End Transformation',
    'about.impact.transformation.description': 'From field operations to cloud infrastructure, our solutions deliver a seamless experience that modernizes businesses and helps them thrive in an increasingly digital world.',
    'about.vision.title': 'Our Vision',
    'about.vision.description': 'We envision a world where advanced technology is accessible to all communities, empowering them to overcome challenges and create sustainable prosperity. Through First Mile Modernization, we aim to:',
    'about.vision.item1': 'Bridge the digital divide between urban and rural economies',
    'about.vision.item2': 'Enable smallholder producers to participate in global value chains',
    'about.vision.item3': 'Create resilient local economies that can adapt to changing conditions',
    'about.vision.item4': 'Foster inclusive growth that benefits all stakeholders in the value chain',
    'about.team.title': 'Our Leadership',
    'about.team.description': 'Krushal is led by a diverse team of experts passionate about technology, rural development, and sustainable business innovation.',
    'about.cta.title': 'Join the First Mile Revolution',
    'about.cta.description': 'Whether you\'re a business looking to optimize your first-mile operations, an innovator with an AI solution, or a community seeking technological transformation, we invite you to connect with Krushal.',
    'about.cta.button': 'Get in Touch'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Translation function
  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
