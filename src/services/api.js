// Since we're on static hosting (Netlify), just return the portfolio data directly
export const portfolioAPI = {
  getPortfolioData: async () => {
    // Simulate async operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
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
              image: "https://customer-assets.emergentagent.com/job_dev-spotlight-36/artifacts/3lktix58_Jon%20Orvar%20concept.jpg",
              link: null
            },
            {
              title: "Frontier: 2170 Volume 01 - Easy Street",
              description: "Original comic book series showcasing futuristic storytelling and character development",
              status: "Published",
              technologies: ["Digital Art", "Character Design", "World Building"],
              image: "https://customer-assets.emergentagent.com/job_amber-portfolio-1/artifacts/kvmhk4eb_image.png",
              link: "https://amazon.com/dp/your-book-link"
            }
          ],
          // Add concept art for the gallery
          conceptArt: [
            {
              title: "Jon Orvar - Military Officer",
              description: "Mars military uniform design with detailed insignia and futuristic cityscape setting",
              image: "https://customer-assets.emergentagent.com/job_dev-spotlight-36/artifacts/3lktix58_Jon%20Orvar%20concept.jpg"
            },
            {
              title: "Shakti - Character Design",
              description: "Young resistance member, showcasing practical work attire and determined expression",
              image: "https://customer-assets.emergentagent.com/job_dev-spotlight-36/artifacts/001tcn82_image.png"
            },
            {
              title: "Shakti - Alternative View", 
              description: "Character consistency study showing different angles and expressions",
              image: "https://customer-assets.emergentagent.com/job_dev-spotlight-36/artifacts/us8dvj63_image%281%29.png"
            }
          ],
          // Audio file for the AI audiobook demo
          audiobook: {
            title: "Principia: Combat Training Excerpt",
            url: "https://customer-assets.emergentagent.com/job_dev-spotlight-36/artifacts/sps0q140_ElevenLabs_2025-08-26T07_55_56_Arnold_pre_sp100_s50_sb75_v3.mp3",
            description: "AI-generated narration using ElevenLabs voice synthesis technology"
          }
        });
      }, 500);
    });
  }
};
