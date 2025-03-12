import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import emailjs from 'emailjs-com';

interface ContactFormProps {
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
};

// Initialize EmailJS when the component mounts
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"); 

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare template parameters
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        reply_to: formData.email,
        phone_number: formData.phone,
        message: formData.message,
        to_email: 'info@krushal.com' // Change this to your actual email
      };

      // Send email using EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID", 
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || "YOUR_TEMPLATE_ID", 
        templateParams
      );

      toast.success("Your message has been sent successfully! We'll get back to you within 24 hours.");
      setFormData(initialFormData);
      onClose();
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
      console.error('Email sending failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-deep-purple-600 dark:text-deep-purple-300">
          Send us a Message
        </h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-deep-purple-500 dark:bg-gray-700 dark:text-white text-sm"
              placeholder="Enter your first name"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-deep-purple-500 dark:bg-gray-700 dark:text-white text-sm"
              placeholder="Enter your last name"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-deep-purple-500 dark:bg-gray-700 dark:text-white text-sm"
            placeholder="Enter your email address"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-deep-purple-500 dark:bg-gray-700 dark:text-white text-sm"
            placeholder="Enter your phone number"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-deep-purple-500 dark:bg-gray-700 dark:text-white text-sm"
            placeholder="How can we help you?"
          />
        </div>
        
        <div className="pt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Your message will be sent to <span className="font-semibold">info@krushal.com</span>. We'll respond within 24 hours.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-krushal-purple hover:bg-krushal-darkPurple text-white rounded-md font-bold transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg border-2 border-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-white font-bold text-lg">Sending...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span className="text-white font-bold text-lg">Send Message</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
