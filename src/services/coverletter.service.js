import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Helper function to get the current user ID
const getUserId = () => {
  const userJson = localStorage.getItem('user');
  if (!userJson) return null;
  
  try {
    const user = JSON.parse(userJson);
    return user.id;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

export const coverLetterService = {
  // Get all cover letters for current user
  getUserCoverLetters: async () => {
    try {
      const userId = getUserId();
      
      if (!userId) {
        throw new Error('User not authenticated');
      }
      
      console.log('Fetching cover letters for user ID:', userId);
      const { data } = await axios.get(`${API_URL}/coverletters?userId=${userId}&_sort=updatedAt&_order=desc`);
      console.log('Fetched cover letters:', data);
      
      // Double-check filter on client side just to be extra safe
      const filteredLetters = data.filter(letter => letter.userId == userId);
      console.log('Client-side filtered cover letters:', filteredLetters);
      
      return filteredLetters;
    } catch (error) {
      console.error('Error fetching cover letters:', error);
      throw error;
    }
  },

  // Get single cover letter by ID
  getCoverLetterById: async (id) => {
    try {
      // First check if this letter exists in localStorage (for AI-generated letters)
      const localLetters = localStorage.getItem('coverletters');
      if (localLetters) {
        try {
          const parsedLetters = JSON.parse(localLetters);
          const localLetter = parsedLetters.find(letter => letter.id === id || letter.id === String(id));
          
          if (localLetter) {
            console.log('Found cover letter in localStorage:', localLetter);
            return localLetter;
          }
        } catch (e) {
          console.error('Error parsing local cover letters:', e);
        }
      }
      
      // Also check for individual cover letter storage (newer format)
      const individualLetter = localStorage.getItem(`coverletter_${id}`);
      if (individualLetter) {
        try {
          const parsedLetter = JSON.parse(individualLetter);
          console.log('Found individual cover letter in localStorage:', parsedLetter);
          return parsedLetter;
        } catch (e) {
          console.error('Error parsing individual cover letter:', e);
        }
      }

      // If not found in localStorage, try the API
      console.log('Cover letter not found in localStorage, trying API for ID:', id);
      const { data } = await axios.get(`${API_URL}/coverletters/${id}`);
      
      // Verify that the cover letter belongs to the current user
      const userId = getUserId();
      if (userId && data.userId !== userId) {
        throw new Error('You do not have permission to access this cover letter');
      }
      
      return data;
    } catch (error) {
      console.error(`Error fetching cover letter with ID ${id}:`, error);
      throw error;
    }
  },

  // Create new cover letter
  createCoverLetter: async (letterData) => {
    try {
      // Ensure userId is set to the current user
      const userId = getUserId();
      
      if (!userId) {
        throw new Error('User not authenticated');
      }
      
      console.log('Creating cover letter for user ID:', userId);
      
      // Prepare cover letter data
      const newLetter = {
        ...letterData,
        userId: Number(userId),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('Creating new cover letter with data:', newLetter);
      const { data } = await axios.post(`${API_URL}/coverletters`, newLetter);
      console.log('Created cover letter:', data);
      return data;
    } catch (error) {
      console.error('Error creating cover letter:', error);
      throw error;
    }
  },

  // Update cover letter
  updateCoverLetter: async (id, letterData) => {
    try {
      // Updated letter data
      const updatedLetter = {
        ...letterData,
        updatedAt: new Date().toISOString()
      };

      const { data } = await axios.put(`${API_URL}/coverletters/${id}`, updatedLetter);
      return data;
    } catch (error) {
      console.error(`Error updating cover letter with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete cover letter
  deleteCoverLetter: async (id) => {
    try {
      await axios.delete(`${API_URL}/coverletters/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting cover letter with ID ${id}:`, error);
      throw error;
    }
  }
};

export default coverLetterService;
