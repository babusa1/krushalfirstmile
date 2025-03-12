
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Home, Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import emailjs from 'emailjs-com';

// Initialize EmailJS when the component mounts
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY");

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
    technology: '',
    file: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        file: e.target.files![0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare email content
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

      // EmailJS configuration
      const templateParams = {
        to_email: 'krushal@example.com', // Change this to your actual email
        from_name: formData.fullName,
        from_email: formData.email,
        subject: `New Agent Submission: ${formData.agentName}`,
        message: emailContent,
      };

      // Send email using EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        import.meta.env.VITE_EMAILJS_AGENT_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Agent Testing/Proof (Optional)
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input 
                              id="file-upload" 
                              name="file-upload" 
                              type="file" 
                              className="sr-only" 
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PDF, PNG, JPG up to 10MB
                        </p>
                        {formData.file && (
                          <p className="text-sm text-green-500">
                            File selected: {formData.file.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6">
                <Link
                  to="/"
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center",
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
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubmitAgent;
