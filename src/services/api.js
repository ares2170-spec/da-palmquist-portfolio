import axios from 'axios';
import { portfolioData as mockPortfolioData } from '../mock';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// Portfolio API functions
export const portfolioAPI = {
  // Get complete portfolio data
getPortfolioData: async () => {
  try {
    const response = await api.get('/portfolio/data');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch portfolio data, falling back to mock data:', error);
    return mockPortfolioData;
  }
},

  // Get projects
  getProjects: async () => {
    try {
      const response = await api.get('/projects');
      return response.data.projects || [];
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      throw error;
    }
  },

  // Get skills
  getSkills: async () => {
    try {
      const response = await api.get('/skills');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch skills:', error);
      throw error;
    }
  },

  // Submit contact form
  submitContactForm: async (contactData) => {
    try {
      const response = await api.post('/contact/submit', contactData);
      return response.data;
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      throw error;
    }
  },

  // Log audio interaction
  logAudioInteraction: async (interactionData) => {
    try {
      const response = await api.post('/audio/interaction', interactionData);
      return response.data;
    } catch (error) {
      console.error('Failed to log audio interaction:', error);
      // Don't throw error for analytics - fail silently
      return { success: false };
    }
  },
};

export default api;
