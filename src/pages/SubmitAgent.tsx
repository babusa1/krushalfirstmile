import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Home, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import emailjs from 'emailjs-com';
import Seo from '@/components/Seo';

// EmailJS credentials
const EMAILJS_PUBLIC_KEY = "_oSvg9u-Rl1m3PVeH";
const EMAILJS_SERVICE_ID = "service_70acfne";
const EMAILJS_AGENT_TEMPLATE_ID = "template_a6w9pqj";

// Initialize EmailJS with your public key
emailjs.init(EMAILJS_PUBLIC_KEY);

const categories = [
  "Agriculture & Farming",
  "Livestock & Dairy",
  "Government Schemes & Subsidies",
  "Healthcare & Medicine",
  "Education & Skill Development",
  "Employment & Livelihood",
  "Digital & Financial Services",
  "Women & Self-Help Groups (SHGs)",
  "Weather & Disaster Management",
  "Technology & Mobile Usage",
  "Local Governance & Legal Issues"
];

const SubmitAgent = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    category: '',
    agentName: '',
    agentDescription: '',
    remarks: '',
    userBenefits: '',
    technology: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const emailContent = `
        New Agent Submission:
        
        Personal Information:
        ---------------------
        Full Name: ${formData.fullName}
        Email: ${formData.email}
        Phone: ${formData.phone || 'Not provided'}
        
        Agent Information:
        -----------------
        Category: ${formData.category}
        Agent Name: ${formData.agentName}
        Description: ${formData.agentDescription}
        Additional Remarks: ${formData.remarks || 'None'}
        
        Submission Details:
        ------------------
        User Benefits: ${formData.userBenefits}
        Technology Used: ${formData.technology}
      `;

      const templateParams = {
        to_email: 'info@krushal.in',
        from_name: formData.fullName,
        from_email: formData.email,
        subject: `New Agent Submission: ${formData.agentName}`,
        message: emailContent
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_AGENT_TEMPLATE_ID,
        templateParams
      );

      toast.success("Your agent has been submitted successfully! We'll review it soon.");
      navigate('/');
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error("There was a problem submitting your agent. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Seo 
        title="Submit Your Agent"
        description="Submit your agricultural or dairy farming AI agent for evaluation. Join Krushal's ecosystem of smart farming solutions and help transform the agricultural sector."
        canonicalUrl="https://krushal.ai/submit-agent"
        keywords="submit agent, agricultural AI, farming technology, smart farming solutions, Krushal platform"
        ogType="website"
      />
      
      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 h-14">
            <Link 
              to="/"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Home className="h-5 w-5" />
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 dark:text-white font-medium">List your agent</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              List Your Agent for Evaluation
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Personal Information</h2>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Agent Information Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white pt-4">Agent Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category of Agent <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Agent Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="agentName"
                      value={formData.agentName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Agent Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="agentDescription"
                      value={formData.agentDescription}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Please provide a detailed description of the agent's functionality, features, and how it addresses the needs of the selected category."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Remarks/Additional Information (Optional)
                    </label>
                    <textarea
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Please add any other relevant information, such as the expected user benefit, potential improvements, or limitations."
                    />
                  </div>
                </div>
              </div>

              {/* Submission Details Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white pt-4">Submission Details</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      How does this agent benefit users? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="userBenefits"
                      value={formData.userBenefits}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Please explain how your agent would help users within the chosen category and how it improves the current solutions available."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Technology or Platforms Used <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="technology"
                      value={formData.technology}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      placeholder="Please specify any technologies, platforms, or integrations used to create the agent."
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-end space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 pt-6">
                <Link
                  to="/"
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-center"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full sm:w-auto px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center",
                    "bg-krushal-purple hover:bg-krushal-brightPurple"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Submitting...
                    </>
                  ) : (
                    'List Agent'
                  )}
                </button>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                Your message will be sent to info@krushal.in. We'll respond within 24 hours.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubmitAgent;
