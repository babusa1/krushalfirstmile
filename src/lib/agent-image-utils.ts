
import { Agent } from '@/components/AgentCard';

/**
 * Utility function to get the appropriate image for an agent
 * This handles mapping agent data to the correct image path 
 */
export const getAgentImage = (agent: Agent): string => {
  // If the agent already has an image property, just return it
  if (agent.image) {
    return agent.image;
  }
  
  // Default image path if no specific image is available
  return agent.imagePath || '/placeholder.svg';
};
