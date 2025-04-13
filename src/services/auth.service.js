import axios from 'axios';
import getApiUrl from '../utils/apiConfig';

const API_URL = getApiUrl();

// Helper to manage the JWT token
const TokenService = {
  getToken: () => localStorage.getItem('jwt_token'),
  setToken: (token) => localStorage.setItem('jwt_token', token),
  removeToken: () => localStorage.removeItem('jwt_token'),
  setUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  removeUser: () => localStorage.removeItem('user')
};

// Create a demo user for fallback when server is down
const DEMO_USER = {
  id: 'demo-123',
  email: 'demo@example.com',
  name: 'Demo User',
  role: 'user',
  createdAt: new Date().toISOString(),
  isPremium: true
};

export const authService = {
  // Register new user
  register: async (userData) => {
    try {
      // Check if email already exists
      const emailCheckResponse = await axios.get(`${API_URL}/users?email=${userData.email}`);
      
      if (emailCheckResponse.data.length > 0) {
        throw { message: 'Email already in use. Please use a different email.' };
      }
      
      // Create new user - in a real app, we'd hash the password here
      // For demo purposes, we're storing passwords in plain text
      const newUser = {
        ...userData,
        role: 'user',
        createdAt: new Date().toISOString(),
        isPremium: false
      };
      
      const { data } = await axios.post(`${API_URL}/users`, newUser);
      
      // JSON Server doesn't provide authentication, so we'll create our own token
      const token = btoa(JSON.stringify({ id: data.id, email: data.email }));
      
      // Store token and user info
      TokenService.setToken(token);
      TokenService.setUser(data);
      
      return data;
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        throw { message: 'Network error: Cannot connect to server. Please check your connection or try again later.' };
      }
      throw error.response?.data || { message: error.message || 'Registration failed' };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      // Special handling for demo user
      if (credentials.email === 'demo@example.com' && credentials.password === 'password123') {
        // Create a simple token for demo user
        const token = btoa(JSON.stringify({ id: DEMO_USER.id, email: DEMO_USER.email }));
        
        // Store token and demo user info
        TokenService.setToken(token);
        TokenService.setUser(DEMO_USER);
        
        return DEMO_USER;
      }
      
      // Find user with matching email
      const { data: users } = await axios.get(`${API_URL}/users?email=${credentials.email}`);
      
      if (users.length === 0) {
        throw { message: 'Invalid email or password' };
      }
      
      const user = users[0];
      
      // In a real app, we'd verify the hashed password here
      // For demo purposes, we're checking the plain text password
      if (user.password !== credentials.password) {
        throw { message: 'Invalid email or password' };
      }
      
      // Create a simple token
      const token = btoa(JSON.stringify({ id: user.id, email: user.email }));
      
      // Remove password from user object before returning
      const { password, ...userWithoutPassword } = user;
      
      // Store token and user info
      TokenService.setToken(token);
      TokenService.setUser(userWithoutPassword);
      
      return userWithoutPassword;
    } catch (error) {
      // If network error occurs, redirect to demo mode
      if (error.code === 'ERR_NETWORK') {
        console.warn('Network error detected, falling back to demo mode');
        // Create demo token
        const token = btoa(JSON.stringify({ id: DEMO_USER.id, email: DEMO_USER.email }));
        
        // Store token and demo user info
        TokenService.setToken(token);
        TokenService.setUser(DEMO_USER);
        
        return DEMO_USER;
      }
      throw error.response?.data || { message: error.message || 'Login failed' };
    }
  },

  // Logout user
  logout: () => {
    TokenService.removeToken();
    TokenService.removeUser();
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!TokenService.getToken() && !!TokenService.getUser();
  },

  // Get current user
  getCurrentUser: async () => {
    const user = TokenService.getUser();
    return user;
  }
};

// Axios interceptor to automatically add auth token to requests
axios.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default authService;