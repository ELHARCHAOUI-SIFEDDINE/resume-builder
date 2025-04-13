import ModernSimple from './ModernSimple';
import Professional from './Professional';
import Creative from './Creative';

// Export templates as an array with metadata
const coverLetterTemplates = [
  {
    id: 1,
    name: 'Modern Simple',
    component: ModernSimple,
    thumbnail: '/coverLetterTemplates/modern-simple.jpg',
    description: 'A clean, simple template with a modern feel',
  },
  {
    id: 2,
    name: 'Professional',
    component: Professional,
    thumbnail: '/coverLetterTemplates/professional.jpg',
    description: 'A traditional professional cover letter layout',
  },
  {
    id: 3,
    name: 'Creative',
    component: Creative,
    thumbnail: '/coverLetterTemplates/creative.jpg',
    description: 'A creative template with a bit more flair',
  }
];

export default coverLetterTemplates;

// Helper function to get template by ID
export const getTemplateById = (id) => {
  const templateId = parseInt(id);
  return coverLetterTemplates.find(template => template.id === templateId) || coverLetterTemplates[0];
};
