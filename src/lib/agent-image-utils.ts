
import { Agent } from '@/components/AgentCard';
import { getResponsiveImageUrl } from './image-utils';

/**
 * Utility function to get the appropriate image for an agent
 * This handles mapping agent data to the correct image path 
 * and optimizes the image for performance
 */
export const getAgentImage = (agent: Agent): string => {
  // If the agent already has an image property, just return it
  if (agent.image) {
    return getResponsiveImageUrl(agent.image);
  }
  
  // Default image path if no specific image is available
  const defaultImagePath = agent.imagePath || '/placeholder.svg';
  return getResponsiveImageUrl(defaultImagePath);
};

/**
 * Generates alt text for agent images
 * @param agent The agent object
 * @returns Appropriate alt text for the agent image
 */
export const getAgentImageAlt = (agent: Agent): string => {
  return `${agent.title} - ${agent.category} agent`;
};
