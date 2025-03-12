
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, LineChart, Users, Zap, Leaf, Lightbulb, Heart } from 'lucide-react';
import Seo from '@/components/Seo';

const About: React.FC = () => {
  const { t } = useLanguage();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.6 }
    })
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Seo 
        title="About Us"
        description="Learn about Krushal's mission to transform agriculture and dairy farming through innovative AI solutions. Discover how we're empowering farmers with smart technology."
        canonicalUrl="https://krushal.ai/about"
        keywords="Krushal mission, dairy farming innovation, agricultural technology, smart farming solutions, AI in agriculture"
      />
      
      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-krushal-purple/10 to-transparent z-0"></div>
        <div className="container mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={0}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-krushal-darkPurple dark:text-white mb-6 leading-tight">
              {t('about.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10">
              {t('about.hero.subtitle')}
            </p>
            <div className="w-20 h-1 bg-krushal-purple mx-auto mb-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900/70">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-krushal-darkPurple dark:text-white mb-6">
              {t('about.mission.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('about.mission.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-krushal-darkPurple dark:text-white mb-8 text-center">
              {t('about.story.title')}
            </h2>
            
            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <motion.p 
                variants={fadeIn}
                custom={1}
                className="text-lg"
              >
                {t('about.story.p1')}
              </motion.p>
              
              <motion.p 
                variants={fadeIn}
                custom={2}
                className="text-lg"
              >
                {t('about.story.p2')}
              </motion.p>
              
              <motion.p 
                variants={fadeIn}
                custom={3}
                className="text-lg"
              >
                {t('about.story.p3')}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900/70">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-krushal-darkPurple dark:text-white mb-4 text-center">
              {t('about.approach.title')}
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center max-w-4xl mx-auto">
              {t('about.approach.description')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div 
                variants={fadeIn}
                custom={1}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-krushal-purple/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-krushal-purple" />
                </div>
                <h3 className="text-xl font-semibold text-krushal-darkPurple dark:text-white mb-3">
                  {t('about.approach.item1.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('about.approach.item1.description')}
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeIn}
                custom={2}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-krushal-purple/10 rounded-full flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-krushal-purple" />
                </div>
                <h3 className="text-xl font-semibold text-krushal-darkPurple dark:text-white mb-3">
                  {t('about.approach.item2.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('about.approach.item2.description')}
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeIn}
                custom={3}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-krushal-purple/10 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-krushal-purple" />
                </div>
                <h3 className="text-xl font-semibold text-krushal-darkPurple dark:text-white mb-3">
                  {t('about.approach.item3.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('about.approach.item3.description')}
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeIn}
                custom={4}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-krushal-purple/10 rounded-full flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-krushal-purple" />
                </div>
                <h3 className="text-xl font-semibold text-krushal-darkPurple dark:text-white mb-3">
                  {t('about.approach.item4.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('about.approach.item4.description')}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-krushal-darkPurple dark:text-white mb-4 text-center">
              {t('about.impact.title')}
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center max-w-4xl mx-auto">
              {t('about.impact.description')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                variants={fadeIn}
                custom={1}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="w-16 h-16 bg-krushal-purple/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Heart className="h-8 w-8 text-krushal-purple" />
                </div>
                <h3 className="text-xl font-semibold text-krushal-darkPurple dark:text-white mb-4 text-center">
                  {t('about.impact.dairy.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  {t('about.impact.dairy.description')}
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeIn}
                custom={2}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="w-16 h-16 bg-krushal-purple/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <LineChart className="h-8 w-8 text-krushal-purple" />
                </div>
                <h3 className="text-xl font-semibold text-krushal-darkPurple dark:text-white mb-4 text-center">
                  {t('about.impact.efficiency.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  {t('about.impact.efficiency.description')}
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeIn}
                custom={3}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="w-16 h-16 bg-krushal-purple/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Zap className="h-8 w-8 text-krushal-purple" />
                </div>
                <h3 className="text-xl font-semibold text-krushal-darkPurple dark:text-white mb-4 text-center">
                  {t('about.impact.transformation.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  {t('about.impact.transformation.description')}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-krushal-purple to-krushal-darkPurple text-white">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              {t('about.vision.title')}
            </h2>
            
            <p className="text-lg mb-10 text-white/90 text-center">
              {t('about.vision.description')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                variants={fadeIn}
                custom={1}
                className="bg-white/10 backdrop-blur-sm p-5 rounded-lg flex items-start"
              >
                <Check className="h-6 w-6 mr-3 flex-shrink-0 mt-0.5" />
                <p>{t('about.vision.item1')}</p>
              </motion.div>
              
              <motion.div 
                variants={fadeIn}
                custom={2}
                className="bg-white/10 backdrop-blur-sm p-5 rounded-lg flex items-start"
              >
                <Check className="h-6 w-6 mr-3 flex-shrink-0 mt-0.5" />
                <p>{t('about.vision.item2')}</p>
              </motion.div>
              
              <motion.div 
                variants={fadeIn}
                custom={3}
                className="bg-white/10 backdrop-blur-sm p-5 rounded-lg flex items-start"
              >
                <Check className="h-6 w-6 mr-3 flex-shrink-0 mt-0.5" />
                <p>{t('about.vision.item3')}</p>
              </motion.div>
              
              <motion.div 
                variants={fadeIn}
                custom={4}
                className="bg-white/10 backdrop-blur-sm p-5 rounded-lg flex items-start"
              >
                <Check className="h-6 w-6 mr-3 flex-shrink-0 mt-0.5" />
                <p>{t('about.vision.item4')}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="max-w-3xl mx-auto text-center bg-gray-50 dark:bg-gray-800 p-10 rounded-xl shadow-lg"
          >
            <h2 className="text-3xl font-bold text-krushal-darkPurple dark:text-white mb-4">
              {t('about.cta.title')}
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {t('about.cta.description')}
            </p>
            
            <Link 
              to="/contact" 
              className="inline-flex items-center px-6 py-3 bg-krushal-purple text-white rounded-md font-medium hover:bg-krushal-brightPurple transition-colors shadow-md hover:shadow-lg"
            >
              {t('about.cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
