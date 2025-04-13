// Determine the API URL based on environment
const getApiUrl = () => {
  // If we're in production
  if (process.env.NODE_ENV === 'production') {
    // Check for GitHub Pages deployment
    if (window.location.hostname.includes('github.io')) {
      // GitHub Pages doesn't support backend APIs directly,
      // return the path to our static db.json file for GitHub Pages
      return 'https://raw.githubusercontent.com/ELHARCHAOUI-SIFEDDINE/resume-builder/main/db.json';
    }
    
    // Check for Netlify environment
    if (window.location.hostname.includes('netlify')) {
      return process.env.REACT_APP_API_URL || 
             `${window.location.origin}/.netlify/functions/api`;
    }
    
    // Vercel fallback
    return process.env.REACT_APP_API_URL || 
           `${window.location.origin}/api/db`;
  }
  
  // For local development
  return process.env.REACT_APP_API_URL || 'http://localhost:3001';
};

export default getApiUrl;
