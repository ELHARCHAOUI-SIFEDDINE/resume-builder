import templates, { getTemplateById as getTemplate, getAllTemplates as getAll } from '../templates';
import coverLetterTemplates, { getCoverLetterTemplateById, getAllCoverLetterTemplates } from '../templates/coverLetterTemplates';
import getApiUrl from '../utils/apiConfig';

const API_URL = getApiUrl();

export const templateService = {
  // Get all templates
  getAllTemplates: async () => {
    try {
      // Return templates from our local templates directory
      return getAll();
    } catch (error) {
      console.error('Error fetching templates:', error);
      throw error;
    }
  },

  // Get a single template by ID
  getTemplateById: async (id) => {
    try {
      // Return template from our local templates directory
      return getTemplate(id);
    } catch (error) {
      console.error(`Error fetching template with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Get templates by category (use tag property instead of category)
  getTemplatesByCategory: async (category) => {
    try {
      // Filter templates by tag
      return getAll().filter(template => 
        template.tags && template.tags.includes(category.toLowerCase())
      );
    } catch (error) {
      console.error(`Error fetching templates in category ${category}:`, error);
      throw error;
    }
  },
  
  // Get templates by premium status (we don't have this distinction yet)
  getTemplatesByPremium: async (isPremium) => {
    try {
      // For now, return all templates 
      // This would be updated if we implemented premium templates
      return getAll();
    } catch (error) {
      console.error(`Error fetching ${isPremium ? 'premium' : 'free'} templates:`, error);
      throw error;
    }
  },

  getDefaultTemplate() {
    // Return the first template as default
    return getAll()[0];
  },

  // Cover Letter Template Functions
  
  // Get all cover letter templates
  getCoverLetterTemplates: async () => {
    try {
      // Return cover letter templates from our local templates directory
      return getAllCoverLetterTemplates();
    } catch (error) {
      console.error('Error fetching cover letter templates:', error);
      throw error;
    }
  },

  // Get a single cover letter template by ID
  getCoverLetterTemplateById: async (id) => {
    try {
      // Return cover letter template from our local templates directory
      return getCoverLetterTemplateById(id);
    } catch (error) {
      console.error(`Error fetching cover letter template with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Get default cover letter template
  getDefaultCoverLetterTemplate: async () => {
    // Return the first cover letter template as default
    return coverLetterTemplates[0];
  }
};

export default templateService;