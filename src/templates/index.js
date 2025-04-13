import React from 'react';

// Import template components
import ModernProfessional from './ModernProfessional';
import MinimalistApple from './MinimalistApple';
import TechFocused from './TechFocused';
import CreativeBold from './CreativeBold';
import ExecutiveProfile from './ExecutiveProfile';
import PhotoResume from './PhotoResume';
import ElegantSerif from './ElegantSerif';
import CorporateModern from './CorporateModern';
import MinimalistTwotone from './MinimalistTwotone';
import CreativeMinimal from './CreativeMinimal';
import ModernTimeline from './ModernTimeline';
import BusinessModern from './BusinessModern';
import SimpleElegant from './SimpleElegant';
import TechMinimal from './TechMinimal';
import MicrosoftInspired from './MicrosoftInspired';

// Define all templates with metadata
const templates = [
  {
    id: 1,
    name: "Modern Professional",
    description: "Clean and professional template with a modern design, inspired by Google's aesthetic",
    component: ModernProfessional,
    previewImage: "/images/templates/modern-professional.png",
    tags: ["professional", "modern", "clean", "minimalist"],
    colors: {
      primary: "#1a73e8",
      secondary: "#4285f4",
      accent: "#fbbc04"
    }
  },
  {
    id: 2,
    name: "Minimalist Apple",
    description: "Elegant minimalist design with clean typography and spacing inspired by Apple's design language",
    component: MinimalistApple,
    previewImage: "/images/templates/minimalist-apple.png",
    tags: ["minimalist", "elegant", "modern", "clean"],
    colors: {
      primary: "#000000",
      secondary: "#555555",
      accent: "#0066cc"
    }
  },
  {
    id: 3,
    name: "Photo Resume",
    description: "Professional template featuring a candidate photo, perfect for positions where personal branding matters",
    component: PhotoResume,
    previewImage: "/images/templates/photo-resume.png",
    tags: ["photo", "professional", "personal", "modern"],
    colors: {
      primary: "#2c3e50",
      secondary: "#3498db",
      accent: "#2ecc71"
    }
  },
  {
    id: 4,
    name: "Tech Focused",
    description: "Technical template with a modern edge, ideal for developers and IT professionals",
    component: TechFocused,
    previewImage: "/images/templates/tech-focused.png",
    tags: ["technical", "modern", "developer", "precise"],
    colors: {
      primary: "#6200ea",
      secondary: "#0091ea",
      accent: "#00c853"
    }
  },
  {
    id: 5,
    name: "Executive Profile",
    description: "Sophisticated design for executive and senior professional positions with elegant typography",
    component: ExecutiveProfile,
    previewImage: "/images/templates/executive-profile.png",
    tags: ["executive", "professional", "elegant", "corporate"],
    colors: {
      primary: "#283747",
      secondary: "#5d6d7e",
      accent: "#85929e"
    }
  },
  {
    id: 6,
    name: "Creative Bold",
    description: "Bold and creative template with standout elements while maintaining professionalism",
    component: CreativeBold,
    previewImage: "/images/templates/creative-bold.png",
    tags: ["creative", "bold", "professional", "standout"],
    colors: {
      primary: "#d81b60",
      secondary: "#8e24aa",
      accent: "#f50057"
    }
  },
  {
    id: 7,
    name: "Elegant Serif",
    description: "Sophisticated template with serif typography for a classic, timeless look",
    component: ElegantSerif,
    previewImage: "/images/templates/elegant-serif.png",
    tags: ["elegant", "serif", "classic", "traditional"],
    colors: {
      primary: "#333333",
      secondary: "#777777",
      accent: "#990000"
    }
  },
  {
    id: 8,
    name: "Corporate Modern",
    description: "Professional corporate template with clean lines and business-oriented layout",
    component: CorporateModern,
    previewImage: "/images/templates/corporate-modern.png",
    tags: ["corporate", "business", "professional", "clean"],
    colors: {
      primary: "#0d47a1",
      secondary: "#1976d2",
      accent: "#bbdefb"
    }
  },
  {
    id: 9,
    name: "Minimalist Two-Tone",
    description: "Modern two-column design with contrasting colors for a striking visual effect",
    component: MinimalistTwotone,
    previewImage: "/images/templates/minimalist-twotone.png",
    tags: ["minimalist", "two-tone", "modern", "contrast"],
    colors: {
      primary: "#212121",
      secondary: "#ffffff",
      accent: "#616161"
    }
  },
  {
    id: 10,
    name: "Creative Minimal",
    description: "Modern creative design with subtle highlight accents and clean layout",
    component: CreativeMinimal,
    previewImage: "/images/templates/creative-minimal.png",
    tags: ["creative", "minimal", "highlight", "modern"],
    colors: {
      primary: "#333333",
      secondary: "#f5f5f5",
      accent: "#ffeb3b"
    }
  },
  {
    id: 11,
    name: "Modern Timeline",
    description: "Unique timeline-based layout that visually showcases your career progression",
    component: ModernTimeline,
    previewImage: "/images/templates/modern-timeline.png",
    tags: ["timeline", "modern", "visual", "professional"],
    colors: {
      primary: "#2196f3",
      secondary: "#e3f2fd",
      accent: "#4caf50"
    }
  },
  {
    id: 12,
    name: "Business Modern",
    description: "Clean business template with top accent bar and two-column layout",
    component: BusinessModern,
    previewImage: "/images/templates/business-modern.png",
    tags: ["business", "professional", "accent", "clean"],
    colors: {
      primary: "#1a237e",
      secondary: "#283593",
      accent: "#f5f5f5"
    }
  },
  {
    id: 13,
    name: "Simple Elegant",
    description: "Minimalist centered design with clean typography and balanced spacing",
    component: SimpleElegant,
    previewImage: "/images/templates/simple-elegant.png",
    tags: ["simple", "elegant", "balanced", "clean"],
    colors: {
      primary: "#424242",
      secondary: "#fafafa",
      accent: "#9e9e9e"
    }
  },
  {
    id: 14,
    name: "Tech Minimal",
    description: "Developer-focused template with code-inspired styling and technical details",
    component: TechMinimal,
    previewImage: "/images/templates/tech-minimal.png",
    tags: ["tech", "developer", "code", "minimal"],
    colors: {
      primary: "#4a148c",
      secondary: "#7b1fa2",
      accent: "#e1bee7"
    }
  }
];

// Function to get all templates
export const getAllTemplates = () => {
  return templates;
};

// Function to get template by ID
export const getTemplateById = (id) => {
  const template = templates.find(template => template.id === Number(id));
  if (!template) {
    throw new Error(`Template with ID ${id} not found`);
  }
  return template;
};

export default templates;
