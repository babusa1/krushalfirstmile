
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'ta' | 'hi' | 'mr';

// Language names for display
export const languageNames = {
  en: 'English',
  ta: 'தமிழ்',
  hi: 'हिंदी',
  mr: 'मराठी'
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

// Create translations
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
    'modal.info': 'Request More Info'
  },
  // Tamil translations
  ta: {
    'nav.home': 'முகப்பு',
    'nav.agents': 'முகவர்கள்',
    'nav.about': 'எங்களை பற்றி',
    'nav.contact': 'தொடர்பு',
    'nav.submit': 'முகவரை சமர்ப்பி',
    'hero.title': 'முதல் மைல் நவீனமயமாக்கல்',
    'hero.description': 'நாங்கள் முறையாக நங்கூர மதிப்பு சங்கிலிகளில் மறைந்துள்ள மதிப்பை திறக்கிறோம், உற்பத்தியாளர்கள் மற்றும் வாங்குபவர்கள் இருவருக்கும் அதிக வருமானத்தை உருவாக்குகிறோம். எங்கள் அணுகுமுறை அருகிலுள்ள மதிப்பு சங்கிலிகளுக்கு விரிவடைந்து, உள்ளூர் சூழலியல் அமைப்புகளை நவீனப்படுத்துகிறது.',
    'hero.submit': 'உங்கள் முகவரை சமர்ப்பிக்கவும்',
    'hero.explore': 'முகவர்களை ஆராயுங்கள்',
    'hero.discover': 'எங்கள் AI முகவர்களைக் கண்டறியுங்கள்',
    'featured.title': 'சிறப்பு க்ருஷால் முகவர்கள்',
    'featured.description': 'எங்கள் AI முகவர்கள் முதல் மைல் செயல்பாடுகளை நவீனப்படுத்த வடிவமைக்கப்பட்டுள்ளன, உற்பத்தித்திறனை மேம்படுத்துதல் மற்றும் கிராமப்புற பொருளாதாரங்களில் அணுகலை மேம்படுத்துதல்.',
    'categories.title': 'முகவர் வகைகள்',
    'categories.description': 'கிராமப்புற உற்பத்தித்திறன், தரம் மேம்பாடு மற்றும் அணுகலை மேம்படுத்துவதற்காக வடிவமைக்கப்பட்ட பல்வேறு வகைகளில் AI முகவர்களைக் கண்டறியுங்கள்.',
    'categories.explore': 'முகவர்களை ஆராயுங்கள்',
    'available.title': 'கிடைக்கக்கூடிய முகவர்கள்',
    'available.search': 'முகவர்களைத் தேடு...',
    'available.all': 'அனைத்து வகைகளும்',
    'available.none': 'உங்கள் தேடலுக்கு பொருந்தும் முகவர்கள் எதுவும் இல்லை.',
    'form.title': 'உங்கள் முகவரை சமர்ப்பிக்கவும்',
    'form.description': 'முதல் மைல் நவீனமயமாக்கலுக்கு உதவக்கூடிய AI முகவர் உங்களிடம் உள்ளதா? மதிப்பீட்டிற்காக எங்களுடன் பகிரவும்.',
    'form.name': 'உங்கள் பெயர்',
    'form.email': 'மின்னஞ்சல் முகவரி',
    'form.agentName': 'முகவர் பெயர்',
    'form.agentCategory': 'முகவர் வகை',
    'form.agentDescription': 'முகவர் விளக்கம்',
    'form.contactNumber': 'தொடர்பு எண் (விருப்பப்படி)',
    'form.submit': 'மதிப்பீட்டிற்காக முகவரை சமர்ப்பிக்கவும்',
    'form.processing': 'செயலாக்குகிறது...',
    'form.success': 'வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது',
    'form.note': 'உங்கள் சமர்ப்பிப்பை நாங்கள் மதிப்பாய்வு செய்து 24 மணி நேரத்திற்குள் உங்களைத் தொடர்பு கொள்வோம்.',
    'form.placeholder.name': 'ஜான் டோ',
    'form.placeholder.email': 'your@email.com',
    'form.placeholder.agentName': 'ஸ்மார்ட் பண்ணை உதவியாளர்',
    'form.placeholder.category': 'ஒரு வகையைத் தேர்ந்தெடுக்கவும்',
    'form.placeholder.description': 'உங்கள் முகவர் என்ன செய்கிறார் மற்றும் கிராமப்புற மக்களுக்கு எவ்வாறு உதவ முடியும் என்பதை விவரிக்கவும்...',
    'form.placeholder.contact': '+91 9876543210',
    'modal.features': 'முக்கிய அம்சங்கள்',
    'modal.try': 'இந்த முகவரை முயற்சிக்கவும்',
    'modal.info': 'மேலும் தகவலுக்கு கோரிக்கை'
  },
  // Hindi translations
  hi: {
    'nav.home': 'होम',
    'nav.agents': 'एजेंट',
    'nav.about': 'हमारे बारे में',
    'nav.contact': 'संपर्क',
    'nav.submit': 'एजेंट सबमिट करें',
    'hero.title': 'फर्स्ट माइल आधुनिकीकरण',
    'hero.description': 'हम व्यवस्थित रूप से एंकर वैल्यू चेन में छिपे हुए मूल्य को अनलॉक करते हैं, उत्पादकों और ऑफटेकर्स दोनों के लिए उच्च आय को उत्प्रेरित करते हैं। हमारा दृष्टिकोण आसपास के मूल्य श्रृंखलाओं तक विस्तारित है, स्थानीय पारिस्थितिकी तंत्र को आधुनिक बनाना।',
    'hero.submit': 'अपना एजेंट सबमिट करें',
    'hero.explore': 'एजेंट्स एक्सप्लोर करें',
    'hero.discover': 'हमारे AI एजेंट्स को खोजें',
    'featured.title': 'फीचर्ड क्रुशल एजेंट्स',
    'featured.description': 'हमारे AI एजेंट्स फर्स्ट माइल ऑपरेशन को आधुनिक बनाने, उत्पादकता में सुधार और ग्रामीण अर्थव्यवस्थाओं में पहुंच के लिए डिज़ाइन किए गए हैं।',
    'categories.title': 'एजेंट श्रेणियाँ',
    'categories.description': 'ग्रामीण उत्पादकता का समर्थन करने, गुणवत्ता में सुधार और पहुंच बढ़ाने के लिए डिज़ाइन किए गए विभिन्न श्रेणियों में AI एजेंट्स की खोज करें।',
    'categories.explore': 'एजेंट्स एक्सप्लोर करें',
    'available.title': 'उपलब्ध एजेंट्स',
    'available.search': 'एजेंट्स खोजें...',
    'available.all': 'सभी श्रेणियाँ',
    'available.none': 'आपके मानदंडों से मेल खाने वाले कोई एजेंट नहीं मिले।',
    'form.title': 'अपना एजेंट सबमिट करें',
    'form.description': 'क्या आपके पास कोई AI एजेंट है जो फर्स्ट माइल आधुनिकीकरण में मदद कर सकता है? मूल्यांकन के लिए हमारे साथ साझा करें।',
    'form.name': 'आपका नाम',
    'form.email': 'ईमेल पता',
    'form.agentName': 'एजेंट का नाम',
    'form.agentCategory': 'एजेंट श्रेणी',
    'form.agentDescription': 'एजेंट विवरण',
    'form.contactNumber': 'संपर्क नंबर (वैकल्पिक)',
    'form.submit': 'मूल्यांकन के लिए एजेंट सबमिट करें',
    'form.processing': 'प्रोसेसिंग...',
    'form.success': 'सफलतापूर्वक सबमिट किया गया',
    'form.note': 'हम आपके सबमिशन की समीक्षा करेंगे और 24 घंटे के भीतर आपसे संपर्क करेंगे।',
    'form.placeholder.name': 'जॉन डो',
    'form.placeholder.email': 'your@email.com',
    'form.placeholder.agentName': 'स्मार्ट फार्म असिस्टेंट',
    'form.placeholder.category': 'एक श्रेणी चुनें',
    'form.placeholder.description': 'वर्णन करें कि आपका एजेंट क्या करता है और ग्रामीण क्षेत्रों के लोगों की मदद कैसे कर सकता है...',
    'form.placeholder.contact': '+91 9876543210',
    'modal.features': 'प्रमुख विशेषताएं',
    'modal.try': 'इस एजेंट को आज़माएं',
    'modal.info': 'अधिक जानकारी का अनुरोध करें'
  },
  // Marathi translations
  mr: {
    'nav.home': 'मुख्यपृष्ठ',
    'nav.agents': 'एजंट',
    'nav.about': 'आमच्याबद्दल',
    'nav.contact': 'संपर्क',
    'nav.submit': 'एजंट सबमिट करा',
    'hero.title': 'फर्स्ट माईल आधुनिकीकरण',
    'hero.description': 'आम्ही अॅंकर व्हॅल्यू चेन्समध्ये लपलेले मूल्य पद्धतशीरपणे अनलॉक करतो, उत्पादक आणि ऑफटेकर्स दोघांसाठीही उच्च कमाई उत्प्रेरित करतो. आमचा दृष्टिकोन स्थानिक इकोसिस्टम आधुनिकीकरण करत शेजारच्या व्हॅल्यू चेन्सपर्यंत विस्तारित आहे.',
    'hero.submit': 'तुमचा एजंट सबमिट करा',
    'hero.explore': 'एजंट एक्स्प्लोर करा',
    'hero.discover': 'आमचे AI एजंट शोधा',
    'featured.title': 'फीचर्ड क्रुशल एजंट',
    'featured.description': 'आमचे AI एजंट फर्स्ट माईल ऑपरेशन आधुनिक करण्यासाठी, उत्पादकता सुधारण्यासाठी आणि ग्रामीण अर्थव्यवस्थांमध्ये प्रवेश वाढवण्यासाठी डिझाइन केलेले आहेत.',
    'categories.title': 'एजंट श्रेणी',
    'categories.description': 'ग्रामीण उत्पादकतेला समर्थन देण्यासाठी, गुणवत्ता सुधारण्यासाठी आणि प्रवेश वाढवण्यासाठी विविध श्रेणींमध्ये AI एजंट शोधा.',
    'categories.explore': 'एजंट एक्स्प्लोर करा',
    'available.title': 'उपलब्ध एजंट',
    'available.search': 'एजंट शोधा...',
    'available.all': 'सर्व श्रेणी',
    'available.none': 'तुमच्या निकषांशी जुळणारे कोणतेही एजंट आढळले नाहीत.',
    'form.title': 'तुमचा एजंट सबमिट करा',
    'form.description': 'फर्स्ट माईल आधुनिकीकरणात मदत करू शकेल असा AI एजंट आहे? मूल्यांकनासाठी आमच्यासह शेअर करा.',
    'form.name': 'तुमचे नाव',
    'form.email': 'ईमेल पत्ता',
    'form.agentName': 'एजंट नाव',
    'form.agentCategory': 'एजंट श्रेणी',
    'form.agentDescription': 'एजंट वर्णन',
    'form.contactNumber': 'संपर्क क्रमांक (वैकल्पिक)',
    'form.submit': 'मूल्यांकनासाठी एजंट सबमिट करा',
    'form.processing': 'प्रक्रिया करत आहे...',
    'form.success': 'यशस्वीरित्या सबमिट केले',
    'form.note': 'आम्ही तुमचे सबमिशन पाहू आणि 24 तासांच्या आत तुमच्याशी संपर्क साधू.',
    'form.placeholder.name': 'जॉन डो',
    'form.placeholder.email': 'your@email.com',
    'form.placeholder.agentName': 'स्मार्ट फार्म असिस्टंट',
    'form.placeholder.category': 'एक श्रेणी निवडा',
    'form.placeholder.description': 'तुमचा एजंट काय करतो आणि ग्रामीण भागातील लोकांना कसे मदत करू शकतो याचे वर्णन करा...',
    'form.placeholder.contact': '+91 9876543210',
    'modal.features': 'प्रमुख वैशिष्ट्ये',
    'modal.try': 'या एजंटचा वापर करून पहा',
    'modal.info': 'अधिक माहिती विनंती करा'
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
