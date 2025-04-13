// Import cover letter templates
import Professional from './Professional';
import Creative from './Creative';
import Modern from './Modern';
import SimpleElegant from './SimpleElegant';

// Cover letter template collection
const coverLetterTemplates = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'A clean, professional cover letter suitable for corporate applications',
    category: 'Professional',
    thumbnail: '/templates/cover-professional.png',
    component: Professional
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'A bold, creative cover letter perfect for design and creative roles',
    category: 'Creative',
    thumbnail: '/templates/cover-creative.png',
    component: Creative
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary and sleek style for tech and startup positions',
    category: 'Modern',
    thumbnail: '/templates/cover-modern.png',
    component: Modern
  },
  {
    id: 'simple-elegant',
    name: 'Simple Elegant',
    description: 'Minimalist and elegant design with a focus on content',
    category: 'Minimal',
    thumbnail: '/templates/cover-simple.png',
    component: SimpleElegant
  }
];

export default coverLetterTemplates;
