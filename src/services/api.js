import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const portfolioAPI = {
  getPortfolioData: async () => {
    try {
      const response = await api.get('/portfolio/data');
      return response.data;
    } catch (error) {
      console.error('API failed, using fallback data:', error);
      return {
        hero: {
          name: "Peter D. Allen",
          title: "Visionary Comic Book Artist & AI Pioneer",
          tagline: "Pioneering the next generation of entertainment franchises through AI and creative storytelling",
          location: "Saint Paul, Minnesota, United States",
          email: "ares2170@gmail.com",
          phone: "+1 651-231-8821"
        }
      };
    }
  }
};
