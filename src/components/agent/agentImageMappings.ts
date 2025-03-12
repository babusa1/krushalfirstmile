// Map of agent titles to the specific images
export const getAgentSpecificImage = (title: string): string | undefined => {
  const agentImages: Record<string, string> = {
    // Financial Services - Updated with new images
    "Mortgage Document Extractor": "/lovable-uploads/07b4b28a-3781-4336-b1ff-73547e44b342.png",
    "Technical Evaluation for Fund Management": "/lovable-uploads/8306145d-3f75-4988-a6ff-16533c4388a2.png",
    "Market Price Predictor": "/lovable-uploads/2df351f7-015b-48ef-aaf1-6d155110e68a.png",
    "Online Banking Assistance": "/lovable-uploads/61c3f479-4b38-44a8-8b4c-f04c9ba3bfa3.png", 
    "KYC Documentation Advisor": "/lovable-uploads/fc7fbd41-a077-4b46-a240-34c5cb0bc5b0.png", 
    "Government Portals Access Assistant": "/lovable-uploads/5f36b521-7570-424e-9ded-dc94cb3c4a17.png", 
    "Cybersecurity Awareness Agent": "/lovable-uploads/3e824660-1a25-4880-809d-29bc3711401a.png", 
    "Digital Payment Solutions Guide": "/lovable-uploads/06b197e0-ef65-4978-9c56-3001421522e5.png", 
    
    // Livestock & Dairy - Updated with new images
    "Smart Ration Agent for HF and Jersey Cows": "/lovable-uploads/bbae3f72-9b09-4dea-9eb0-052d7d8154b9.png", 
    "Milk Volume Predictor for Dairy Cows": "/lovable-uploads/e705b3f9-ded6-4482-938d-33939973d249.png", 
    "Livestock Management Advisory": "/lovable-uploads/0719067b-f4de-48a7-ab89-0d65d2817830.png",
    "Dairy Production Optimizer": "/lovable-uploads/d4612a36-0fef-4e4f-be3e-e8d0f6ceb989.png",
    "Animal Disease Identifier": "/lovable-uploads/8433dbd9-ace0-4933-afa2-07c43d0e662e.png",
    "Veterinary Care Assistant": "/lovable-uploads/8552d548-83d8-406e-9e79-3b40992c62e5.png", 
    
    // Agriculture & Farming
    "Farming Techniques Advisor": "/lovable-uploads/348533c2-cf7d-4b3c-8967-a3e37b29089f.png",
    "Crop Disease Identifier": "/lovable-uploads/e568fd53-774d-4af0-9e7b-28d880bbb771.png",
    "Fertilizers & Pesticides Advisor": "/lovable-uploads/9afa3dda-7cd3-4e7e-a674-12737ff61641.png",
    "Market Prices for Commodity": "/lovable-uploads/761d635e-e105-4484-b87f-7702c4472a42.png",
    
    // Healthcare - Updated with new images
    "Free Medical Care Finder": "/lovable-uploads/020b7723-7f3b-4818-992f-0498b5b3e2c0.png",
    "Common Disease Remedies Advisor": "/lovable-uploads/f5045f36-6e61-4c40-8fea-d78f3007223b.png",
    "Maternal & Child Health Assistant": "/lovable-uploads/66bd66c5-3459-4f2d-be99-f099c259c166.png",
    "Nearest PHC/CHC Locator": "/lovable-uploads/e8949723-18f7-400d-a706-7430318d2b77.png", 
    "Vaccination Schedule Advisor": "/lovable-uploads/182cdf45-08d0-4bf7-923b-0d31c4334afb.png", 
    
    // Weather & Disaster - Updated with new images
    "Weather Forecast Agent": "/lovable-uploads/ec334291-5296-49b2-9841-877a1edaf326.png",
    "Disaster Relief Advisor": "/lovable-uploads/305b3735-e1a4-4a43-b050-ec7a7f002e19.png",
    "Rainfall Predictor": "/lovable-uploads/c538b404-7d08-4a56-981c-6039b3fd5035.png",
    "Flood & Drought Preparedness Advisor": "/lovable-uploads/3fb5e93b-3a19-408a-817e-a3a95636b6ab.png",
    
    // Government Schemes - Fixed the interchanged images
    "Government Subsidies Advisor": "/lovable-uploads/99e6d757-987e-4164-9519-a87f8d9c6bfa.png",
    "Scheme Eligibility Checker": "/lovable-uploads/299a42d2-bab0-416b-a6c4-a93178515679.png",
    "Application Assistant": "/lovable-uploads/20e5487a-3456-4b00-9f4b-7647de934974.png",
    
    // Education & Skill Development - Updated with new images
    "Government Scholarships Advisor": "/lovable-uploads/f567c812-08c5-49e0-9ac2-43fbd47c93ad.png",
    "Free Online Courses Finder": "/lovable-uploads/c92d85bb-82ca-472e-872e-cc33c3fefcfc.png",
    "Vocational Training Guide": "/lovable-uploads/a7886bf9-6c8c-4682-8474-f07d20448f9c.png",
    "English Learning Assistant": "/lovable-uploads/6af6eed4-c8a7-4c4d-844d-b5e5447822eb.png",
    "Skill Development & Certification Advisor": "/lovable-uploads/d985e960-ac61-4c84-b86f-bbb1dcb320cf.png",
    
    // Employment & Livelihood - Added new images
    "Government Job Vacancies Finder": "/lovable-uploads/4b42453c-3f0d-48db-ae47-52b8a7a41013.png",
    "Private Job Opportunities Agent": "/lovable-uploads/21c55412-08ba-4a68-afd0-6d48c377e552.png",
    "Work-from-Home Job Guide": "/lovable-uploads/2d39fce9-577f-4190-9abb-91c37f6cfceb.png",
    "Urban Job Migration Assistant": "/lovable-uploads/e8776c9c-13de-406a-9030-0270d9c5173d.png",
    "Freelance Opportunities Advisor": "/lovable-uploads/de49edb5-ee4d-4713-880e-6323e37ace98.png",
    
    // Local Governance & Legal Issues - New images added
    "Land Records & Property Disputes Advisor": "/lovable-uploads/d710bda7-8106-4e49-82c1-0ca873d23f8b.png",
    "RTI & Grievance Redressal Agent": "/lovable-uploads/7d6b08d2-c6e2-4475-ad49-9f747a2e0caa.png",
    "Village Development Project Assistant": "/lovable-uploads/5f2d27db-914f-41a8-acd2-3629b8430b34.png",
    "Legal Aid & Property Law Advisor": "/lovable-uploads/520da880-f93b-48a0-97ff-1f12c27a759e.png",
    "Panchayat and Local Governance Advisor": "/lovable-uploads/90d4f459-e479-4a3c-a935-a1fa00bfeebe.png",
    
    // Technology & Mobile Usage - New images
    "Smartphone Usage for Business & Learning Advisor": "/lovable-uploads/eb6f3c72-78a4-4383-bc96-d88bee93cce1.png",
    "Social Media Management Agent": "/lovable-uploads/b506156b-6dea-4b73-aecd-71dbbbcc7296.png",
    "Internet Connectivity Advisor": "/lovable-uploads/7bb98b25-c033-4cf7-9d33-f99a73169c93.png",
    "Mobile App Recommendations": "/lovable-uploads/269c9c40-4eb7-4bba-a93b-6c2f2e46dd3e.png", 
    "Technology Literacy Advisor": "/lovable-uploads/3403b959-32d1-4695-9430-c4102875cb5f.png",
  };
  
  return agentImages[title];
};

// Generate fallback image based on category
export const getCategoryImage = (category: string): string => {
  const categoryImages: Record<string, string> = {
    "Digital & Financial Services": "/lovable-uploads/61c3f479-4b38-44a8-8b4c-f04c9ba3bfa3.png", 
    "Livestock & Dairy": "/lovable-uploads/0719067b-f4de-48a7-ab89-0d65d2817830.png",
    "Agriculture & Farming": "/lovable-uploads/bb45d9fa-e284-4e60-9bc4-2665120beff9.png",
    "Healthcare & Medicine": "/lovable-uploads/41a33d28-bbc5-4d26-9c4c-d4683a37f1ff.png",
    "Weather & Disaster Management": "/lovable-uploads/ec334291-5296-49b2-9841-877a1edaf326.png",
    "Government Schemes & Subsidies": "/lovable-uploads/20e5487a-3456-4b00-9f4b-7647de934974.png",
    "Education & Skill Development": "/lovable-uploads/a8ec3a7f-0b13-4f9f-9a19-4ad9393b0b3d.png",
    "Employment & Livelihood": "/lovable-uploads/37fcbdf5-c10c-47b1-8bd6-ee4d826cfbc9.png",
    "Women & Self-Help Groups (SHGs)": "/lovable-uploads/c369e240-ee98-4b58-a5c5-c6ee90fe4249.png", 
    "Technology & Mobile Usage": "/lovable-uploads/269c9c40-4eb7-4bba-a93b-6c2f2e46dd3e.png", 
    "Local Governance & Legal Issues": "/lovable-uploads/90d4f459-e479-4a3c-a935-a1fa00bfeebe.png" 
  };
  
  return categoryImages[category] || "/lovable-uploads/45ee1443-ab39-4200-a1ad-13d4b6fb77ae.png"; // Default image
};
