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
          tagline: "Pioneering the next generation of entertainment franchises through the fusion of creative storytelling and cutting-edge generative AI",
          location: "Saint Paul, Minnesota, United States",
          email: "ares2170@gmail.com",
          phone: "+1 651-231-8821"
        },
        about: {
          summary: "Visionary and self-published comic book artist with a proven track record in original intellectual property development, now pioneering a groundbreaking approach to multi-media franchise creation using advanced generative AI.",
          mission: "Seeking to leverage creative leadership and technical innovation to develop the next generation of entertainment franchises for a leading entertainment company."
        },
        skills: {
          technical: [
            "Generative AI Integration",
            "AI-driven Content Generation", 
            "Digital Publishing & Distribution",
            "Project Management & Execution"
          ],
          creative: [
            "Intellectual Property Development",
            "Original World-building",
            "Character Design",
            "Compelling Storytelling"
          ],
          business: [
            "Multi-Media Production Strategy",
            "Community Building & Monetization",
            "Cross-platform Content Expansion",
            "Strategic Planning"
          ]
        },
        experience: [
          {
            title: "Creator & Lead Developer",
            company: "Principia (Proprietary Multi-Media Franchise)",
            period: "2019 - Present",
            description: "A bold reimagining leveraging generative AI to create a comprehensive, multi-stage entertainment franchise.",
            achievements: [
              "Established new standard for IP development by integrating generative AI",
              "Developing 5-phase rollout from webnovel to animated streaming content",
              "Created innovative AI-driven audiobook narration system"
            ]
          }
        ],
        projects: [
          {
            title: "Principia: AI-Driven Multimedia Franchise",
            description: "Revolutionary entertainment franchise combining traditional storytelling with AI technology",
            status: "In Development",
            technologies: ["AI Voice Synthesis", "Character Design", "Story Development"],
            image: "/api/placeholder/600/400"
          },
          {
            title: "Frontier: 2170 Comic Series",
            description: "Original comic book series showcasing futuristic storytelling and character development",
            status: "Published",
            technologies: ["Digital Art", "Character Design", "World Building"],
            image: "/api/placeholder/600/400"
          }
        ]
      };
    }
  }
};
