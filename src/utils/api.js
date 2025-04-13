import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const loginUser = async (email, password) => {
  try {
    // In a real app, you'd hash the password before sending
    const { data: users } = await api.get(`/users?email=${email}`);
    const user = users[0];

    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    // In a real app, you'd use JWT or similar
    const token = btoa(JSON.stringify({ id: user.id, email: user.email }));
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return { user, token };
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
};

export const registerUser = async (userData) => {
  try {
    // Check if user already exists
    const { data: existingUsers } = await api.get(`/users?email=${userData.email}`);
    if (existingUsers.length > 0) {
      throw new Error('User already exists');
    }

    // In a real app, you'd hash the password before saving
    const { data: user } = await api.post('/users', {
      ...userData,
      createdAt: new Date().toISOString(),
    });

    // Auto-login after registration
    const token = btoa(JSON.stringify({ id: user.id, email: user.email }));
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return { user, token };
  } catch (error) {
    throw new Error(error.message || 'Registration failed');
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Resume API calls
export const getResumes = async (userId) => {
  try {
    const { data } = await api.get(`/resumes?userId=${userId}`);
    return data;
  } catch (error) {
    throw new Error('Failed to fetch resumes');
  }
};

export const getResumeById = async (id) => {
  const response = await api.get(`/resumes/${id}`);
  return response.data;
};

export const createResume = async (resumeData) => {
  try {
    const { data } = await api.post('/resumes', {
      ...resumeData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return data;
  } catch (error) {
    throw new Error('Failed to create resume');
  }
};

export const updateResume = async (id, resumeData) => {
  try {
    const { data } = await api.put(`/resumes/${id}`, {
      ...resumeData,
      updatedAt: new Date().toISOString(),
    });
    return data;
  } catch (error) {
    throw new Error('Failed to update resume');
  }
};

export const deleteResume = async (id) => {
  try {
    await api.delete(`/resumes/${id}`);
    return true;
  } catch (error) {
    throw new Error('Failed to delete resume');
  }
};

// Template API calls
export const getTemplates = async () => {
  const response = await api.get('/templates');
  return response.data;
};

export default api; 