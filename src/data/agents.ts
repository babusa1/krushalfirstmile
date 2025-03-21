
import { Agent } from '@/components/AgentCard';

// Featured agents (Krushal Agents) - Reordered to show Livestock & Dairy first
export const featuredAgents: Agent[] = [
  {
    id: "agent2",
    title: "Smart Ration Agent for HF and Jersey Cows",
    description: "Krushal's smart-poshan provides personalized balanced ration recommendations for individual cows based on breed, age, calving history, and milk production. It identifies the best ration based on lowest cost and currently available fodder, ensuring optimal feeding for maximum ROI.",
    category: "Livestock & Dairy",
    image: "/lovable-uploads/2469e757-63a6-495b-b0ed-22e6ea7a7928.png",
    features: [
      "Considers cow breed, age, and number of calvings",
      "Evaluates months since last calving and pregnancy status",
      "Analyzes current milk production levels",
      "Recommends rations based on available fodder",
      "Prevents under-feeding and over-feeding for optimal ROI"
    ]
  },
  {
    id: "agent3",
    title: "Milk Volume Predictor for Dairy Cows",
    description: "Krushal's smart-litres projects the likely milk volume for each cow over the next 12 months. By analyzing breed, age, body condition, calvings, and production history, it helps farmers assess income and enables dairies to plan logistics effectively.",
    category: "Livestock & Dairy",
    image: "/lovable-uploads/e705b3f9-ded6-4482-938d-33939973d249.png",
    features: [
      "Projects milk volume for 12 months in advance",
      "Analyzes cow breed, age, and body condition score",
      "Considers calvings, pregnancy status, and current production",
      "Aggregates projections at farm, route, and dairy levels",
      "Helps farmers assess income and dairies plan logistics"
    ]
  },
  {
    id: "agent1",
    title: "Mortgage Document Extractor",
    description: "AI agent trained to extract and process key information from mortgage documents, including warranty deeds, trust certifications, quit claim deeds, and more. Streamlines document processing for financial institutions and real estate professionals.",
    category: "Digital & Financial Services",
    image: "/lovable-uploads/07b4b28a-3781-4336-b1ff-73547e44b342.png",
    features: [
      "Extracts data from Special Warranty Deeds",
      "Processes Mortgage and Warranty Deed information",
      "Handles Quit Claim Deeds and Trustee's Deeds",
      "Manages Notice of Commencement and Termination",
      "Extracts data from UCC Financing Statement Amendments"
    ]
  },
  {
    id: "agent4",
    title: "Conversational AI for Elders",
    description: "An AI companion that assists elderly individuals with daily tasks, appointment reminders, and medication tracking. Provides emotional support through natural conversations and keeps users informed with news updates and information relevant to their interests.",
    category: "Healthcare & Medicine",
    image: "/lovable-uploads/c369e240-ee98-4b58-a5c5-c6ee90fe4249.png",
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
    image: "/lovable-uploads/8306145d-3f75-4988-a6ff-16533c4388a2.png",
    features: [
      "Financial management assessment",
      "Security and risk analysis",
      "Technology infrastructure evaluation",
      "User experience and interface assessment",
      "Regulatory compliance verification"
    ]
  }
];

// Full list of all agents
export const allAgents: Agent[] = [
  ...featuredAgents,
  // Agriculture & Farming
  {
    id: "agent6",
    title: "Market Prices for Commodity",
    description: "Provides real-time commodity market prices to help farmers make informed decisions.",
    category: "Agriculture & Farming",
    image: "/lovable-uploads/761d635e-e105-4484-b87f-7702c4472a42.png"
  },
  {
    id: "agent7",
    title: "Farming Techniques Advisor",
    description: "Provides best farming practices, crop rotation strategies, and sustainable agriculture tips to improve yield and soil health.",
    category: "Agriculture & Farming",
    image: "/lovable-uploads/348533c2-cf7d-4b3c-8967-a3e37b29089f.png"
  },
  {
    id: "agent8",
    title: "Crop Disease Identifier",
    description: "Analyzes images or descriptions of crop symptoms to diagnose diseases and recommend appropriate treatments.",
    category: "Agriculture & Farming",
    image: "/lovable-uploads/e568fd53-774d-4af0-9e7b-28d880bbb771.png"
  },
  {
    id: "agent9",
    title: "Weather Forecast Agent",
    description: "Delivers accurate, localized weather forecasts to help farmers plan their activities and protect crops from adverse conditions.",
    category: "Weather & Disaster Management",
    image: "/lovable-uploads/ec334291-5296-49b2-9841-877a1edaf326.png"
  },
  {
    id: "agent10",
    title: "Market Price Predictor",
    description: "Analyzes market trends and predicts future crop prices, helping farmers make informed decisions about when to sell their produce.",
    category: "Agriculture & Farming",
    image: "/lovable-uploads/2df351f7-015b-48ef-aaf1-6d155110e68a.png"
  },
  {
    id: "agent11",
    title: "Fertilizers & Pesticides Advisor",
    description: "Recommends appropriate fertilizers and pesticides based on crop type, soil condition, and specific farming needs.",
    category: "Agriculture & Farming",
    image: "/lovable-uploads/9afa3dda-7cd3-4e7e-a674-12737ff61641.png"
  },
  // Livestock & Dairy - Updated with new images
  {
    id: "agent12",
    title: "Livestock Management Advisory",
    description: "Provides best practices for feeding, breeding, and health monitoring of livestock to improve productivity and welfare.",
    category: "Livestock & Dairy",
    image: "/lovable-uploads/0719067b-f4de-48a7-ab89-0d65d2817830.png"
  },
  {
    id: "agent13",
    title: "Animal Disease Identifier",
    description: "Identifies animal diseases based on symptoms and provides recommendations for veterinary care and treatment options.",
    category: "Livestock & Dairy",
    image: "/lovable-uploads/8433dbd9-ace0-4933-afa2-07c43d0e662e.png"
  },
  {
    id: "agent14",
    title: "Government Subsidies Advisor",
    description: "Informs farmers about available government subsidies for livestock and dairy farming and guides them through the application process.",
    category: "Government Schemes & Subsidies",
    image: "/lovable-uploads/99e6d757-987e-4164-9519-a87f8d9c6bfa.png" // Updated with correct image
  },
  {
    id: "agent15",
    title: "Veterinary Care Assistant",
    description: "Provides veterinary advice, connects farmers with nearby vets, and offers preventive care tips for livestock health.",
    category: "Livestock & Dairy",
    image: "/lovable-uploads/8552d548-83d8-406e-9e79-3b40992c62e5.png" // Updated with correct image
  },
  {
    id: "agent16",
    title: "Dairy Production Optimizer",
    description: "Monitors dairy production, tracks milk yield, and suggests ways to improve dairy farming efficiency and product quality.",
    category: "Livestock & Dairy",
    image: "/lovable-uploads/d4612a36-0fef-4e4f-be3e-e8d0f6ceb989.png"
  },
  // Weather & Disaster Management - Updated with new images
  {
    id: "agent17",
    title: "Disaster Relief Advisor",
    description: "Provides information on available disaster relief funds and assists farmers in applying for support after natural calamities.",
    category: "Weather & Disaster Management",
    image: "/lovable-uploads/305b3735-e1a4-4a43-b050-ec7a7f002e19.png" // Updated with new image
  },
  {
    id: "agent18",
    title: "Rainfall Predictor",
    description: "Provides accurate rainfall predictions for different regions, helping farmers plan irrigation and crop management.",
    category: "Weather & Disaster Management",
    image: "/lovable-uploads/c538b404-7d08-4a56-981c-6039b3fd5035.png" // Updated with new image
  },
  {
    id: "agent19",
    title: "Flood & Drought Preparedness Advisor",
    description: "Offers advice on how to prepare for and mitigate the effects of floods and droughts on agricultural operations.",
    category: "Weather & Disaster Management",
    image: "/lovable-uploads/3fb5e93b-3a19-408a-817e-a3a95636b6ab.png" // Updated with new image
  },
  // Government Schemes & Subsidies
  {
    id: "agent20",
    title: "Scheme Eligibility Checker",
    description: "Determines which government schemes a farmer is eligible for based on their profile and farming activities.",
    category: "Government Schemes & Subsidies",
    image: "/lovable-uploads/299a42d2-bab0-416b-a6c4-a93178515679.png" // Updated image
  },
  {
    id: "agent21",
    title: "Application Assistant",
    description: "Guides farmers through the application process for various government schemes and subsidies to maximize success rates.",
    category: "Government Schemes & Subsidies",
    image: "/lovable-uploads/20e5487a-3456-4b00-9f4b-7647de934974.png" // Updated category image
  },
  // Healthcare & Medicine
  {
    id: "agent22",
    title: "Free Medical Care Finder",
    description: "Helps individuals find free or affordable medical care facilities nearby.",
    category: "Healthcare & Medicine",
    image: "/lovable-uploads/020b7723-7f3b-4818-992f-0498b5b3e2c0.png"
  },
  {
    id: "agent23",
    title: "Common Disease Remedies Advisor",
    description: "Provides advice on common disease remedies and treatment options.",
    category: "Healthcare & Medicine",
    image: "/lovable-uploads/f5045f36-6e61-4c40-8fea-d78f3007223b.png"
  },
  {
    id: "agent24",
    title: "Nearest PHC/CHC Locator",
    description: "Locates the nearest Primary Health Centers (PHCs) and Community Health Centers (CHCs).",
    category: "Healthcare & Medicine",
    image: "/lovable-uploads/e8949723-18f7-400d-a706-7430318d2b77.png" // Added new image
  },
  {
    id: "agent25",
    title: "Maternal & Child Health Assistant",
    description: "Offers guidance on maternal and child health, including vaccination schedules and nutritional tips.",
    category: "Healthcare & Medicine",
    image: "/lovable-uploads/66bd66c5-3459-4f2d-be99-f099c259c166.png"
  },
  {
    id: "agent26",
    title: "Vaccination Schedule Advisor",
    description: "Tracks vaccination schedules and alerts individuals about upcoming vaccinations.",
    category: "Healthcare & Medicine",
    image: "/lovable-uploads/182cdf45-08d0-4bf7-923b-0d31c4334afb.png" // Added new image
  },
  // Education & Skill Development - Updated with new images
  {
    id: "agent27",
    title: "Government Scholarships Advisor",
    description: "Helps individuals find and apply for government scholarships.",
    category: "Education & Skill Development",
    image: "/lovable-uploads/f567c812-08c5-49e0-9ac2-43fbd47c93ad.png"
  },
  {
    id: "agent28",
    title: "Free Online Courses Finder",
    description: "Assists in discovering free online courses for skill development.",
    category: "Education & Skill Development",
    image: "/lovable-uploads/c92d85bb-82ca-472e-872e-cc33c3fefcfc.png"
  },
  {
    id: "agent29",
    title: "Vocational Training Guide",
    description: "Provides information about vocational training opportunities in various fields.",
    category: "Education & Skill Development",
    image: "/lovable-uploads/a7886bf9-6c8c-4682-8474-f07d20448f9c.png"
  },
  {
    id: "agent30",
    title: "English Learning Assistant",
    description: "Offers resources and tips for learning and improving English language skills.",
    category: "Education & Skill Development",
    image: "/lovable-uploads/6af6eed4-c8a7-4c4d-844d-b5e5447822eb.png"
  },
  {
    id: "agent31",
    title: "Skill Development & Certification Advisor",
    description: "Helps individuals find skill development programs and certifications to enhance career prospects.",
    category: "Education & Skill Development",
    image: "/lovable-uploads/d985e960-ac61-4c84-b86f-bbb1dcb320cf.png"
  },
  // Employment & Livelihood - Updated with new images
  {
    id: "agent32",
    title: "Government Job Vacancies Finder",
    description: "Provides updates on government job vacancies (railways, police, etc.) in various sectors.",
    category: "Employment & Livelihood",
    image: "/lovable-uploads/4b42453c-3f0d-48db-ae47-52b8a7a41013.png"
  },
  {
    id: "agent33",
    title: "Private Job Opportunities Agent",
    description: "Finds private job openings in different industries, including remote work opportunities.",
    category: "Employment & Livelihood",
    image: "/lovable-uploads/21c55412-08ba-4a68-afd0-6d48c377e552.png"
  },
  {
    id: "agent34",
    title: "Work-from-Home Job Guide",
    description: "Suggests various work-from-home job opportunities and guides on how to apply.",
    category: "Employment & Livelihood",
    image: "/lovable-uploads/2d39fce9-577f-4190-9abb-91c37f6cfceb.png"
  },
  {
    id: "agent35",
    title: "Urban Job Migration Assistant",
    description: "Provides support for individuals migrating to urban areas for job opportunities.",
    category: "Employment & Livelihood",
    image: "/lovable-uploads/e8776c9c-13de-406a-9030-0270d9c5173d.png"
  },
  {
    id: "agent36",
    title: "Freelance Opportunities Advisor",
    description: "Offers advice and resources for finding freelance work in various fields.",
    category: "Employment & Livelihood",
    image: "/lovable-uploads/de49edb5-ee4d-4713-880e-6323e37ace98.png"
  },
  // Digital & Financial Services
  {
    id: "agent37",
    title: "Online Banking Assistance",
    description: "Guides individuals on using online banking services like UPI and Aadhaar-linked payments.",
    category: "Digital & Financial Services",
    image: "/lovable-uploads/61c3f479-4b38-44a8-8b4c-f04c9ba3bfa3.png" // Updated with new online banking image
  },
  {
    id: "agent38",
    title: "KYC Documentation Advisor",
    description: "Helps individuals complete Know Your Customer (KYC) processes for various services.",
    category: "Digital & Financial Services",
    image: "/lovable-uploads/fc7fbd41-a077-4b46-a240-34c5cb0bc5b0.png" // Updated with new KYC image
  },
  {
    id: "agent39",
    title: "Government Portals Access Assistant",
    description: "Assists in navigating government portals such as DigiLocker and UMANG for services and records.",
    category: "Digital & Financial Services",
    image: "/lovable-uploads/5f36b521-7570-424e-9ded-dc94cb3c4a17.png" // Updated with new government portals image
  },
  {
    id: "agent40",
    title: "Cybersecurity Awareness Agent",
    description: "Educates users about cybersecurity best practices to protect personal and financial information.",
    category: "Digital & Financial Services",
    image: "/lovable-uploads/3e824660-1a25-4880-809d-29bc3711401a.png" // Updated with new cybersecurity image
  },
  {
    id: "agent41",
    title: "Digital Payment Solutions Guide",
    description: "Provides information on digital payment options and how to use them effectively.",
    category: "Digital & Financial Services",
    image: "/lovable-uploads/06b197e0-ef65-4978-9c56-3001421522e5.png" // Updated with new digital payment image
  },
  // Women & Self-Help Groups (SHGs)
  {
    id: "agent42",
    title: "Business Opportunities for Women",
    description: "Offers guidance on business opportunities for women in various sectors.",
    category: "Women & Self-Help Groups (SHGs)",
    image: "/lovable-uploads/ef295d48-839d-4d5e-84e5-a98196df7182.png"
  },
  {
    id: "agent43",
    title: "Government Loan Advisor for Women Entrepreneurs",
    description: "Provides information on government loans and financial support available to women entrepreneurs.",
    category: "Women & Self-Help Groups (SHGs)",
    image: "/lovable-uploads/26ba45c8-91c6-4bc0-a2c1-ca2bea6cb647.png"
  },
  {
    id: "agent44",
    title: "Self-Help Group Support Agent",
    description: "Assists women in forming and managing Self-Help Groups (SHGs) for business and social purposes.",
    category: "Women & Self-Help Groups (SHGs)",
    image: "/lovable-uploads/0583a573-dd79-41c3-a8bd-e9847fad649e.png"
  },
  {
    id: "agent45",
    title: "Home-Based Business Ideas Advisor",
    description: "Suggests ideas for home-based businesses, including stitching, handicrafts, and food processing.",
    category: "Women & Self-Help Groups (SHGs)",
    image: "/lovable-uploads/ff69718b-ab86-4f51-afe5-ba70afb7ea78.png"
  },
  {
    id: "agent46",
    title: "Handicrafts & Food Processing Opportunities Advisor",
    description: "Offers guidance on starting a business in handicrafts and food processing sectors.",
    category: "Women & Self-Help Groups (SHGs)",
    image: "/lovable-uploads/267b6dc5-4d55-4fc1-8ab9-13e897abfede.png"
  },
  // Technology & Mobile Usage - Updated with new images
  {
    id: "agent47",
    title: "Smartphone Usage for Business & Learning Advisor",
    description: "Offers tips on using smartphones for business and learning purposes.",
    category: "Technology & Mobile Usage",
    image: "/lovable-uploads/eb6f3c72-78a4-4383-bc96-d88bee93cce1.png"
  },
  {
    id: "agent48",
    title: "Social Media Management Agent",
    description: "Provides tips and tools for managing social media accounts for personal or business use.",
    category: "Technology & Mobile Usage",
    image: "/lovable-uploads/b506156b-6dea-4b73-aecd-71dbbbcc7296.png"
  },
  {
    id: "agent49",
    title: "Internet Connectivity Advisor",
    description: "Helps individuals find the best options for internet connectivity in their areas.",
    category: "Technology & Mobile Usage",
    image: "/lovable-uploads/7bb98b25-c033-4cf7-9d33-f99a73169c93.png"
  },
  {
    id: "agent50",
    title: "Mobile App Recommendations",
    description: "Recommends mobile apps that are helpful for farming, business management, and education.",
    category: "Technology & Mobile Usage",
    image: "/lovable-uploads/269c9c40-4eb7-4bba-a93b-6c2f2e46dd3e.png" // New image
  },
  {
    id: "agent51",
    title: "Technology Literacy Advisor",
    description: "Helps individuals learn basic and advanced technology skills to improve personal and professional life.",
    category: "Technology & Mobile Usage",
    image: "/lovable-uploads/3403b959-32d1-4695-9430-c4102875cb5f.png" // New image
  },
  // Local Governance & Legal Issues - Updated with new images
  {
    id: "agent52",
    title: "Land Records & Property Disputes Advisor",
    description: "Helps with checking land records and resolving property disputes.",
    category: "Local Governance & Legal Issues",
    image: "/lovable-uploads/d710bda7-8106-4e49-82c1-0ca873d23f8b.png"
  },
  {
    id: "agent53",
    title: "RTI & Grievance Redressal Agent",
    description: "Assists individuals in filing RTIs (Right to Information) and resolving grievances.",
    category: "Local Governance & Legal Issues",
    image: "/lovable-uploads/7d6b08d2-c6e2-4475-ad49-9f747a2e0caa.png"
  },
  {
    id: "agent54",
    title: "Village Development Project Assistant",
    description: "Provides support and information on local village development projects and initiatives.",
    category: "Local Governance & Legal Issues",
    image: "/lovable-uploads/5f2d27db-914f-41a8-acd2-3629b8430b34.png"
  },
  {
    id: "agent55",
    title: "Legal Aid & Property Law Advisor",
    description: "Offers legal advice on property matters and disputes, including guidance on local laws.",
    category: "Local Governance & Legal Issues",
    image: "/lovable-uploads/520da880-f93b-48a0-97ff-1f12c27a759e.png"
  },
  {
    id: "agent56",
    title: "Panchayat and Local Governance Advisor",
    description: "Offers information and advice on local governance, including the panchayat system.",
    category: "Local Governance & Legal Issues",
    image: "/lovable-uploads/90d4f459-e479-4a3c-a935-a1fa00bfeebe.png"
  }
];
