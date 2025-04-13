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

export const resumeService = {
  // Get all resumes for current user
  getUserResumes: async () => {
    try {
      const userId = getUserId();
      
      if (!userId) {
        throw new Error('User not authenticated');
      }
      
      console.log('Fetching resumes for user ID:', userId);
      // Explicitly convert user ID to string to ensure correct comparison
      const { data } = await axios.get(`${API_URL}/resumes?userId=${userId}&_sort=updatedAt&_order=desc`);
      console.log('Fetched resumes:', data);
      
      // Double-check filter on client side just to be extra safe
      const filteredResumes = data.filter(resume => resume.userId == userId);
      console.log('Client-side filtered resumes:', filteredResumes);
      
      return filteredResumes;
    } catch (error) {
      console.error('Error fetching resumes:', error);
      throw error;
    }
  },

  // Get single resume by ID
  getResumeById: async (id) => {
    try {
      // First check if this resume exists in localStorage (for AI-generated resumes)
      const localResumes = localStorage.getItem('resumes');
      if (localResumes) {
        try {
          const parsedResumes = JSON.parse(localResumes);
          const localResume = parsedResumes.find(resume => resume.id === id || resume.id === String(id));
          
          if (localResume) {
            console.log('Found resume in localStorage:', localResume);
            return localResume;
          }
        } catch (e) {
          console.error('Error parsing local resumes:', e);
        }
      }
      
      // Also check for individual resume storage (newer format)
      const individualResume = localStorage.getItem(`resume_${id}`);
      if (individualResume) {
        try {
          const parsedResume = JSON.parse(individualResume);
          console.log('Found individual resume in localStorage:', parsedResume);
          return parsedResume;
        } catch (e) {
          console.error('Error parsing individual resume:', e);
        }
      }

      // If not found in localStorage, try the API
      console.log('Resume not found in localStorage, trying API for ID:', id);
      const { data } = await axios.get(`${API_URL}/resumes/${id}`);
      
      // Verify that the resume belongs to the current user
      const userId = getUserId();
      if (userId && data.userId !== userId) {
        throw new Error('You do not have permission to access this resume');
      }
      
      return data;
    } catch (error) {
      console.error(`Error fetching resume with ID ${id}:`, error);
      
      // Final fallback - check sessionStorage for a current editing resume
      try {
        const currentEditingResume = sessionStorage.getItem('currentEditingResume');
        if (currentEditingResume) {
          const parsedResume = JSON.parse(currentEditingResume);
          if (parsedResume.id === id || parsedResume.id === String(id)) {
            console.log('Found resume in sessionStorage:', parsedResume);
            return parsedResume;
          }
        }
      } catch (e) {
        console.error('Error checking sessionStorage:', e);
      }
      
      throw error;
    }
  },

  // Create new resume
  createResume: async (resumeData) => {
    try {
      // Ensure userId is set to the current user
      const userId = getUserId();
      
      if (!userId) {
        throw new Error('User not authenticated');
      }
      
      console.log('Creating resume for user ID:', userId);
      
      // Explicitly convert user ID to number
      const newResume = {
        ...resumeData,
        userId: Number(userId), // Ensure userId is a number
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        versions: [
          {
            data: resumeData.data,
            timestamp: new Date().toISOString(),
            version: 1
          }
        ]
      };

      console.log('Creating new resume with data:', newResume);
      const { data } = await axios.post(`${API_URL}/resumes`, newResume);
      console.log('Created resume:', data);
      return data;
    } catch (error) {
      console.error('Error creating resume:', error);
      throw error;
    }
  },

  // Update resume
  updateResume: async (id, resumeData) => {
    try {
      // First fetch the current resume to update version history
      const { data: currentResume } = await axios.get(`${API_URL}/resumes/${id}`);
      
      // Create a new version
      const newVersion = {
        data: resumeData,
        timestamp: new Date().toISOString(),
        version: (currentResume.versions || []).length + 1
      };
      
      // Updated resume data with new version
      const updatedResume = {
        ...resumeData,
        updatedAt: new Date().toISOString(),
        versions: [...(currentResume.versions || []), newVersion]
      };

      const { data } = await axios.put(`${API_URL}/resumes/${id}`, updatedResume);
      return data;
    } catch (error) {
      console.error(`Error updating resume with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete resume
  deleteResume: async (id) => {
    try {
      await axios.delete(`${API_URL}/resumes/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting resume with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Get a specific version of a resume
  getResumeVersion: async (id, versionNumber) => {
    try {
      const { data } = await axios.get(`${API_URL}/resumes/${id}`);
      
      if (!data.versions || !data.versions.length) {
        throw new Error('No versions found for this resume');
      }
      
      const version = data.versions.find(v => v.version === versionNumber);
      if (!version) {
        throw new Error(`Version ${versionNumber} not found`);
      }
      
      return version.data;
    } catch (error) {
      console.error(`Error fetching version ${versionNumber} of resume ${id}:`, error);
      throw error;
    }
  },
  
  // Generate a shareable link
  generateShareableLink: async (id) => {
    try {
      // Generate a random token
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      // Store in the API
      await axios.post(`${API_URL}/sharedResumes`, {
        resumeId: id,
        shareToken: token,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days expiry
      });
      
      // Return the shareable URL
      return `${window.location.origin}/view/${token}`;
    } catch (error) {
      console.error(`Error generating shareable link for resume ${id}:`, error);
      throw error;
    }
  },
  
  // Get resume by share token
  getResumeByShareToken: async (token) => {
    try {
      // First get the shared record
      const { data: sharedData } = await axios.get(`${API_URL}/sharedResumes?shareToken=${token}`);
      
      if (!sharedData || !sharedData.length) {
        throw new Error('Shared resume not found');
      }
      
      const shared = sharedData[0];
      
      // Check if expired
      if (new Date(shared.expiresAt) < new Date()) {
        throw new Error('Shared resume link has expired');
      }
      
      // Get the actual resume
      const { data: resume } = await axios.get(`${API_URL}/resumes/${shared.resumeId}`);
      return resume;
    } catch (error) {
      console.error(`Error fetching resume by share token ${token}:`, error);
      throw error;
    }
  },

  // COVER LETTER METHODS
  
  // Get all cover letters for current user
  getUserCoverLetters: async () => {
    try {
      const userId = getUserId();
      
      if (!userId) {
        throw new Error('User not authenticated');
      }
      
      console.log('Fetching cover letters for user ID:', userId);
      // Explicitly convert user ID to string to ensure correct comparison
      const { data } = await axios.get(`${API_URL}/coverLetters?userId=${userId}&_sort=updatedAt&_order=desc`);
      console.log('Fetched cover letters:', data);
      
      // Double-check filter on client side just to be extra safe
      const filteredCoverLetters = data.filter(letter => letter.userId == userId);
      console.log('Client-side filtered cover letters:', filteredCoverLetters);
      
      return filteredCoverLetters;
    } catch (error) {
      console.error('Error fetching cover letters:', error);
      // If the endpoint doesn't exist yet, return an empty array
      if (error.response && error.response.status === 404) {
        return [];
      }
      throw error;
    }
  },

  // Get single cover letter by ID
  getCoverLetterById: async (id) => {
    try {
      // Check for individual cover letter storage
      const individualCoverLetter = localStorage.getItem(`coverLetter_${id}`);
      if (individualCoverLetter) {
        try {
          const parsedCoverLetter = JSON.parse(individualCoverLetter);
          console.log('Found individual cover letter in localStorage:', parsedCoverLetter);
          return parsedCoverLetter;
        } catch (e) {
          console.error('Error parsing individual cover letter:', e);
        }
      }

      // If not found in localStorage, try the API
      console.log('Cover letter not found in localStorage, trying API for ID:', id);
      const { data } = await axios.get(`${API_URL}/coverLetters/${id}`);
      
      // Verify that the cover letter belongs to the current user
      const userId = getUserId();
      if (userId && data.userId !== userId) {
        throw new Error('You do not have permission to access this cover letter');
      }
      
      return data;
    } catch (error) {
      console.error(`Error fetching cover letter with ID ${id}:`, error);
      
      // Final fallback - check sessionStorage for a current editing cover letter
      try {
        const currentEditingCoverLetter = sessionStorage.getItem('currentEditingCoverLetter');
        if (currentEditingCoverLetter) {
          const parsedCoverLetter = JSON.parse(currentEditingCoverLetter);
          if (parsedCoverLetter.id === id || parsedCoverLetter.id === String(id)) {
            console.log('Found cover letter in sessionStorage:', parsedCoverLetter);
            return parsedCoverLetter;
          }
        }
      } catch (e) {
        console.error('Error checking sessionStorage:', e);
      }
      
      throw error;
    }
  },

  // Create new cover letter
  createCoverLetter: async (coverLetterData) => {
    try {
      // Ensure userId is set to the current user
      const userId = getUserId();
      
      if (!userId) {
        throw new Error('User not authenticated');
      }
      
      console.log('Creating cover letter for user ID:', userId);
      
      // Explicitly convert user ID to number
      const newCoverLetter = {
        ...coverLetterData,
        userId: Number(userId), // Ensure userId is a number
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('Creating new cover letter with data:', newCoverLetter);
      const { data } = await axios.post(`${API_URL}/coverLetters`, newCoverLetter);
      console.log('Created cover letter:', data);
      return data;
    } catch (error) {
      console.error('Error creating cover letter:', error);
      throw error;
    }
  },

  // Update cover letter
  updateCoverLetter: async (id, coverLetterData) => {
    try {
      // Updated cover letter data
      const updatedCoverLetter = {
        ...coverLetterData,
        updatedAt: new Date().toISOString(),
      };

      const { data } = await axios.put(`${API_URL}/coverLetters/${id}`, updatedCoverLetter);
      return data;
    } catch (error) {
      console.error(`Error updating cover letter with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete cover letter
  deleteCoverLetter: async (id) => {
    try {
      await axios.delete(`${API_URL}/coverLetters/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting cover letter with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Generate a shareable link for cover letter
  generateCoverLetterShareableLink: async (id) => {
    try {
      // Generate a random token
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      // Store in the API
      await axios.post(`${API_URL}/sharedCoverLetters`, {
        coverLetterId: id,
        shareToken: token,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days expiry
      });
      
      // Return the shareable URL
      return `${window.location.origin}/view-cover-letter/${token}`;
    } catch (error) {
      console.error(`Error generating shareable link for cover letter ${id}:`, error);
      throw error;
    }
  },
  
  // Get cover letter by share token
  getCoverLetterByShareToken: async (token) => {
    try {
      // First get the shared record
      const { data: sharedData } = await axios.get(`${API_URL}/sharedCoverLetters?shareToken=${token}`);
      
      if (!sharedData || !sharedData.length) {
        throw new Error('Shared cover letter not found');
      }
      
      const shared = sharedData[0];
      
      // Check if expired
      if (new Date(shared.expiresAt) < new Date()) {
        throw new Error('Shared cover letter link has expired');
      }
      
      // Get the actual cover letter
      const { data: coverLetter } = await axios.get(`${API_URL}/coverLetters/${shared.coverLetterId}`);
      return coverLetter;
    } catch (error) {
      console.error(`Error fetching cover letter by share token ${token}:`, error);
      throw error;
    }
  }
};

export default resumeService;