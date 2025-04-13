// Determine the API URL based on environment
const getApiUrl = () => {
  // If we're in production (on Netlify or Vercel)
  if (process.env.NODE_ENV === 'production') {
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
