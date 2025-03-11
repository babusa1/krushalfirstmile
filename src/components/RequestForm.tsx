
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

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

interface FormData {
  name: string;
  email: string;
  agentName: string;
  agentDescription: string;
  category: string;
  contactNumber: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  agentName: '',
  agentDescription: '',
  category: '',
  contactNumber: ''
};

const RequestForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Your agent submission has been received. We'll contact you within 24 hours.");
      
      // Reset form after showing success state for a moment
      setTimeout(() => {
        setFormData(initialFormData);
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-12 rounded-xl bg-white dark:bg-krushal-darkPurple/90 shadow-md border border-gray-200 dark:border-gray-800">
      <div className="text-center mb-8">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-krushal-darkPurple dark:text-white mb-3"
        >
          Submit Your Agent
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Share your AI agent with us, and we'll evaluate it for potential inclusion in our first mile modernization initiative.
        </motion.p>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-krushal-purple dark:bg-gray-800 dark:text-white"
              placeholder="John Doe"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-krushal-purple dark:bg-gray-800 dark:text-white"
              placeholder="your@email.com"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="agentName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Agent Name
            </label>
            <input
              type="text"
              id="agentName"
              name="agentName"
              value={formData.agentName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-krushal-purple dark:bg-gray-800 dark:text-white"
              placeholder="Smart Farm Assistant"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Agent Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-krushal-purple dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="agentDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Agent Description
          </label>
          <textarea
            id="agentDescription"
            name="agentDescription"
            value={formData.agentDescription}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-krushal-purple dark:bg-gray-800 dark:text-white"
            placeholder="Describe what your agent does and how it can help people in rural areas..."
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Contact Number (optional)
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-krushal-purple dark:bg-gray-800 dark:text-white"
            placeholder="+91 9876543210"
          />
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className="w-full px-6 py-3 bg-krushal-purple text-white rounded-lg font-medium hover:bg-krushal-brightPurple transition-colors shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Processing...
              </span>
            ) : isSubmitted ? (
              <span className="flex items-center justify-center">
                <Check className="h-5 w-5 mr-2" />
                Submitted Successfully
              </span>
            ) : (
              "Submit Agent for Evaluation"
            )}
          </button>
          
          <p className="text-xs text-center mt-4 text-gray-500 dark:text-gray-400">
            We'll review your submission and get back to you within 24 hours.
          </p>
        </div>
      </motion.form>
    </div>
  );
};

export default RequestForm;
