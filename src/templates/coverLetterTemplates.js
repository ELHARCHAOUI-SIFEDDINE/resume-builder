import React from 'react';

// Import cover letter template components
import Professional from './coverLetters/Professional';
import Creative from './coverLetters/Creative';
import Modern from './coverLetters/Modern';
import SimpleElegant from './coverLetters/SimpleElegant';

// Define all cover letter templates with metadata
const coverLetterTemplates = [
  {
    id: 'professional',
    name: "Professional",
    description: "Clean and professional cover letter template suitable for traditional industries",
    component: Professional,
    previewImage: "/images/cover-letter-templates/professional.png",
    tags: ["professional", "traditional", "formal", "business"],
    colors: {
      primary: "#1a73e8",
      secondary: "#4285f4",
      accent: "#fbbc04"
    },
    category: "cover-letter"
  },
  {
    id: 'creative',
    name: "Creative",
    description: "A modern and creative template to showcase your personality and stand out",
    component: Creative,
    previewImage: "/images/cover-letter-templates/creative.png",
    tags: ["creative", "modern", "standout", "colorful"],
    colors: {
      primary: "#6b46c1",
      secondary: "#805ad5",
      accent: "#d53f8c"
    },
    category: "cover-letter"
  },
  {
    id: 'modern',
    name: "Modern",
    description: "A sleek modern design with a professional look and contemporary layout",
    component: Modern,
    previewImage: "/images/cover-letter-templates/modern.png",
    tags: ["modern", "clean", "professional", "minimalist"],
    colors: {
      primary: "#2d3748",
      secondary: "#4a5568",
      accent: "#48bb78"
    },
    category: "cover-letter"
  },
  {
    id: 'simple-elegant',
    name: "Simple Elegant",
    description: "A minimalist and elegant design that focuses on your content",
    component: SimpleElegant,
    previewImage: "/images/cover-letter-templates/simple-elegant.png",
    tags: ["elegant", "simple", "minimalist", "clean"],
    colors: {
      primary: "#000000",
      secondary: "#718096",
      accent: "#f56565"
    },
    category: "cover-letter"
  }
];

// Function to get all cover letter templates
export const getAllCoverLetterTemplates = () => {
  return coverLetterTemplates;
};

// Function to get cover letter template by ID
export const getCoverLetterTemplateById = (id) => {
  return coverLetterTemplates.find(template => template.id === id || template.id === parseInt(id));
};

export default coverLetterTemplates;
