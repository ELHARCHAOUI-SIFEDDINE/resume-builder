// Determine the API URL based on environment
const getApiUrl = () => {
  // If we're in production (on Vercel)
  if (process.env.NODE_ENV === 'production') {
    // Use the deployed API URL in Vercel
    return process.env.REACT_APP_API_URL || 
           `${window.location.origin}/api/db`;
  }
  
  // For local development
  return process.env.REACT_APP_API_URL || 'http://localhost:3001';
};

export default getApiUrl;
