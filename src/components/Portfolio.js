"import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { portfolioAPI } from '../services/api';
import { useToast } from '../hooks/use-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Calendar,
  Zap,
  Palette,
  Briefcase,
  ChevronRight,
  Star,
  Code,
  Lightbulb,
  Play,
  Pause,
  Volume2,
  SkipBack,
  SkipForward,
  Loader2
} from 'lucide-react';

// Contact Form Component
const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project_type: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const success = await onSubmit(formData);
    
    if (success) {
      setFormData({
        name: '',
        email: '',
        project_type: '',
        message: ''
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className=\"space-y-6\">
      <div className=\"grid md:grid-cols-2 gap-4\">
        <div>
          <label htmlFor=\"name\" className=\"block text-sm font-medium text-slate-300 mb-2\">
            Name *
          </label>
          <input
            type=\"text\"
            id=\"name\"
            name=\"name\"
            required
            value={formData.name}
            onChange={handleChange}
            className=\"w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300\"
            placeholder=\"Your name\"
          />
        </div>
        <div>
          <label htmlFor=\"email\" className=\"block text-sm font-medium text-slate-300 mb-2\">
            Email *
          </label>
          <input
            type=\"email\"
            id=\"email\"
            name=\"email\"
            required
            value={formData.email}
            onChange={handleChange}
            className=\"w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300\"
            placeholder=\"your@email.com\"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor=\"project_type\" className=\"block text-sm font-medium text-slate-300 mb-2\">
          Project Type
        </label>
        <select
          id=\"project_type\"
          name=\"project_type\"
          value={formData.project_type}
          onChange={handleChange}
          className=\"w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300\"
        >
          <option value=\"\">Select project type</option>
          <option value=\"multimedia_franchise\">Multi-media Franchise</option>
          <option value=\"ai_audiobook\">AI Audiobook Production</option>
          <option value=\"comic_illustration\">Comic/Graphic Novel</option>
          <option value=\"character_design\">Character Design</option>
          <option value=\"consulting\">AI Creative Consulting</option>
          <option value=\"collaboration\">General Collaboration</option>
          <option value=\"other\">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor=\"message\" className=\"block text-sm font-medium text-slate-300 mb-2\">
          Message *
        </label>
        <textarea
          id=\"message\"
          name=\"message\"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className=\"w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 resize-vertical\"
          placeholder=\"Tell me about your project or idea...\"
        />
      </div>

      <Button 
        type=\"submit\" 
        disabled={isSubmitting}
        className=\"w-full bg-amber-500 hover:bg-amber-600 text-black font-medium py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed\"
      >
        {isSubmitting ? (
          <>
            <Loader2 className=\"h-4 w-4 animate-spin mr-2\" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Mail className=\"ml-2 h-4 w-4\" />
          </>
        )}
      </Button>
    </form>
  );
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [audioRef, setAudioRef] = useState(null);
  const { toast } = useToast();

  // Audio file URL
  const audioUrl = \"https://customer-assets.emergentagent.com/job_dev-spotlight-36/artifacts/sps0q140_ElevenLabs_2025-08-26T07_55_56_Arnold_pre_sp100_s50_sb75_v3.mp3\";

  // Load portfolio data
  useEffect(() => {
    const loadPortfolioData = async () => {
      setLoading(true);
      try {
        const data = await portfolioAPI.getPortfolioData();
        setPortfolioData(data);
        setError(null);
      } catch (error) {
        console.error('Failed to load portfolio data:', error);
        // Don't set error state - API service handles fallback to mock data
      } finally {
        setLoading(false);
      }
    };

    loadPortfolioData();
  }, [toast]);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.preload = 'metadata';
    
    // Audio event listeners
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    
    const handleError = (e) => {
      console.error('Audio loading error:', e);
      toast({
        title: \"Audio Error\",
        description: \"Failed to load audio file. Please try again.\",
        variant: \"destructive\",
      });
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    
    setAudioRef(audio);
    
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, [toast, audioUrl]);

  // Audio player controls
  const togglePlayPause = async () => {
    if (!audioRef) return;
    
    try {
      if (isPlaying) {
        audioRef.pause();
        setIsPlaying(false);
      } else {
        await audioRef.play();
        setIsPlaying(true);
      }
      
      // Log interaction
      try {
        await portfolioAPI.logAudioInteraction({
          action: isPlaying ? 'pause' : 'play',
          excerpt: 'excerpt1',
          timestamp: currentTime
        });
      } catch (error) {
        console.warn('Failed to log audio interaction:', error);
      }
    } catch (error) {
      console.error('Audio playback error:', error);
      toast({
        title: \"Playback Error\",
        description: \"Unable to play audio. Please try again.\",
        variant: \"destructive\",
      });
    }
  };

  const skipTime = async (seconds) => {
    if (!audioRef) return;
    
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    audioRef.currentTime = newTime;
    setCurrentTime(newTime);
    
    // Log interaction
    try {
      await portfolioAPI.logAudioInteraction({
        action: seconds > 0 ? 'skip_forward' : 'skip_back',
        excerpt: 'excerpt1',
        timestamp: newTime
      });
    } catch (error) {
      console.warn('Failed to log audio interaction:', error);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Contact form submission
  const handleContactSubmit = async (formData) => {
    try {
      const response = await portfolioAPI.submitContactForm(formData);
      toast({
        title: \"Message Sent!\",
        description: response.message,
      });
      return true;
    } catch (error) {
      toast({
        title: \"Error\",
        description: \"Failed to send message. Please try again.\",
        variant: \"destructive\",
      });
      return false;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className=\"min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center\">
        <div className=\"text-center\">
          <Loader2 className=\"h-12 w-12 animate-spin text-amber-400 mx-auto mb-4\" />
          <p className=\"text-slate-300 text-lg\">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !portfolioData) {
    return (
      <div className=\"min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center\">
        <div className=\"text-center max-w-md mx-auto px-6\">
          <div className=\"w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4\">
            <span className=\"text-red-400 text-2xl\">⚠</span>
          </div>
          <h2 className=\"text-2xl font-bold text-white mb-2\">Unable to Load Portfolio</h2>
          <p className=\"text-slate-300 mb-6\">
            There was an error loading the portfolio data. Please check your connection and try again.
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            className=\"bg-amber-500 hover:bg-amber-600 text-black\"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className=\"min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white\">
      {/* Fixed Navigation */}
      <nav className=\"fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700\">
        <div className=\"max-w-6xl mx-auto px-6 py-4\">
          <div className=\"flex items-center justify-between\">
            <div className=\"text-xl font-bold text-amber-400\">P.D.Allen</div>
            <div className=\"hidden md:flex space-x-8\">
              {['hero', 'about', 'skills', 'experience', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 hover:text-amber-400 ${
                    activeSection === section ? 'text-amber-400' : 'text-slate-300'
                  }`}
                >
                  {section === 'hero' ? 'Home' : section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id=\"hero\" className=\"min-h-screen flex items-center justify-center relative overflow-hidden\">
        <div className=\"absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent z-10\"></div>
        <div className=\"max-w-6xl mx-auto px-6 py-20 text-center z-20\">
          <div className=\"space-y-6 animate-fade-in\">
            <h1 className=\"text-5xl md:text-7xl font-light tracking-tight\">
              {portfolioData.hero.name}
            </h1>
            <div className=\"text-xl md:text-2xl text-amber-400 font-medium\">
              {portfolioData.hero.title}
            </div>
            <p className=\"text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed\">
              {portfolioData.hero.tagline}
            </p>
            <div className=\"flex flex-col sm:flex-row gap-4 justify-center mt-8\">
              <Button 
                onClick={() => scrollToSection('projects')}
                className=\"bg-amber-500 hover:bg-amber-600 text-black font-medium px-8 py-3 transition-all duration-300 hover:scale-105\"
              >
                View My Work
                <ChevronRight className=\"ml-2 h-4 w-4\" />
              </Button>
              <Button 
                variant=\"outline\" 
                onClick={() => scrollToSection('contact')}
                className=\"border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black px-8 py-3 transition-all duration-300\"
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
        {/* Animated background elements */}
        <div className=\"absolute top-20 left-10 w-32 h-32 border border-amber-400/20 rounded-full animate-pulse\"></div>
        <div className=\"absolute bottom-20 right-10 w-24 h-24 border border-amber-400/30 rounded-full animate-bounce\"></div>
      </section>

      {/* About Section */}
      <section id=\"about\" className=\"py-20\">
        <div className=\"max-w-6xl mx-auto px-6\">
          <div className=\"text-center mb-16\">
            <h2 className=\"text-4xl md:text-5xl font-light mb-6\">About Me</h2>
            <div className=\"w-24 h-1 bg-amber-400 mx-auto\"></div>
          </div>
          <div className=\"grid md:grid-cols-2 gap-12 items-center\">
            <div className=\"space-y-6\">
              <p className=\"text-lg text-slate-300 leading-relaxed\">
                {portfolioData.about.summary}
              </p>
              <p className=\"text-lg text-slate-300 leading-relaxed\">
                {portfolioData.about.mission}
              </p>
              <div className=\"flex items-center space-x-4 text-slate-400\">
                <MapPin className=\"h-5 w-5 text-amber-400\" />
                <span>{portfolioData.hero.location}</span>
              </div>
            </div>
            <div className=\"relative\">
              <div className=\"bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-2xl border border-slate-600\">
                <div className=\"space-y-4\">
                  <div className=\"flex items-center space-x-3\">
                    <Lightbulb className=\"h-6 w-6 text-amber-400\" />
                    <span className=\"text-xl font-medium\">Innovation Focus</span>
                  </div>
                  <p className=\"text-slate-300\">
                    Combining traditional storytelling with cutting-edge AI to redefine content creation workflows and deliver immersive entertainment experiences.
                  </p>
                  <div className=\"pt-4\">
                    <div className=\"flex items-center space-x-2 mb-2\">
                      <Star className=\"h-4 w-4 text-amber-400\" />
                      <span className=\"text-sm text-slate-400\">Specialized in AI-driven franchise development</span>
                    </div>
                    <div className=\"flex items-center space-x-2\">
                      <Star className=\"h-4 w-4 text-amber-400\" />
                      <span className=\"text-sm text-slate-400\">Published comic book artist with proven track record</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id=\"skills\" className=\"py-20 bg-slate-800/50\">
        <div className=\"max-w-6xl mx-auto px-6\">
          <div className=\"text-center mb-16\">
            <h2 className=\"text-4xl md:text-5xl font-light mb-6\">Core Competencies</h2>
            <div className=\"w-24 h-1 bg-amber-400 mx-auto\"></div>
          </div>
          <div className=\"grid md:grid-cols-3 gap-8\">
            {/* Technical Skills */}
            <Card className=\"bg-slate-700/50 border-slate-600 hover:border-amber-400/50 transition-all duration-300\">
              <CardHeader>
                <div className=\"flex items-center space-x-3\">
                  <Code className=\"h-6 w-6 text-amber-400\" />
                  <CardTitle className=\"text-white\">Technical</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className=\"space-y-3\">
                  {portfolioData.skills.technical.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant=\"secondary\" 
                      className=\"bg-slate-600 text-slate-200 hover:bg-amber-400 hover:text-black transition-all duration-300 cursor-default\"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Creative Skills */}
            <Card className=\"bg-slate-700/50 border-slate-600 hover:border-amber-400/50 transition-all duration-300\">
              <CardHeader>
                <div className=\"flex items-center space-x-3\">
                  <Palette className=\"h-6 w-6 text-amber-400\" />
                  <CardTitle className=\"text-white\">Creative</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className=\"space-y-3\">
                  {portfolioData.skills.creative.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant=\"secondary\" 
                      className=\"bg-slate-600 text-slate-200 hover:bg-amber-400 hover:text-black transition-all duration-300 cursor-default\"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Business Skills */}
            <Card className=\"bg-slate-700/50 border-slate-600 hover:border-amber-400/50 transition-all duration-300\">
              <CardHeader>
                <div className=\"flex items-center space-x-3\">
                  <Briefcase className=\"h-6 w-6 text-amber-400\" />
                  <CardTitle className=\"text-white\">Business</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className=\"space-y-3\">
                  {portfolioData.skills.business.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant=\"secondary\" 
                      className=\"bg-slate-600 text-slate-200 hover:bg-amber-400 hover:text-black transition-all duration-300 cursor-default\"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id=\"experience\" className=\"py-20\">
        <div className=\"max-w-6xl mx-auto px-6\">
          <div className=\"text-center mb-16\">
            <h2 className=\"text-4xl md:text-5xl font-light mb-6\">Experience</h2>
            <div className=\"w-24 h-1 bg-amber-400 mx-auto\"></div>
          </div>
          <div className=\"space-y-8\">
            {portfolioData.experience.map((exp, index) => (
              <Card key={index} className=\"bg-slate-800/50 border-slate-600 hover:border-amber-400/50 transition-all duration-300\">
                <CardHeader>
                  <div className=\"flex flex-col md:flex-row md:items-center justify-between\">
                    <div>
                      <CardTitle className=\"text-xl text-white mb-2\">{exp.title}</CardTitle>
                      <CardDescription className=\"text-amber-400 font-medium\">{exp.company}</CardDescription>
                    </div>
                    <div className=\"flex items-center space-x-2 text-slate-400 mt-2 md:mt-0\">
                      <Calendar className=\"h-4 w-4\" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className=\"text-slate-300 mb-4\">{exp.description}</p>
                  <div className=\"space-y-2\">
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className=\"flex items-start space-x-2\">
                        <ChevronRight className=\"h-4 w-4 text-amber-400 mt-1 flex-shrink-0\" />
                        <span className=\"text-slate-300 text-sm\">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id=\"projects\" className=\"py-20 bg-slate-800/50\">
        <div className=\"max-w-6xl mx-auto px-6\">
          <div className=\"text-center mb-16\">
            <h2 className=\"text-4xl md:text-5xl font-light mb-6\">Featured Projects</h2>
            <div className=\"w-24 h-1 bg-amber-400 mx-auto\"></div>
          </div>
          <div className=\"grid md:grid-cols-2 gap-8\">
            {portfolioData.projects.map((project, index) => (
              <Card key={index} className=\"bg-slate-700/50 border-slate-600 hover:border-amber-400/50 transition-all duration-300 group overflow-hidden\">
                <div className=\"aspect-video bg-slate-600 relative overflow-hidden\">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className=\"w-full h-full object-cover transition-transform duration-300 group-hover:scale-105\"
                  />
                  <div className=\"absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300\"></div>
                </div>
                <CardHeader>
                  <div className=\"flex items-center justify-between\">
                    <CardTitle className=\"text-white group-hover:text-amber-400 transition-colors duration-300\">
                      {project.title}
                    </CardTitle>
                    <Badge className=\"bg-amber-500 text-black\">{project.status}</Badge>
                  </div>
                  <CardDescription className=\"text-slate-300\">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className=\"space-y-4\">
                    <div className=\"flex flex-wrap gap-2\">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge 
                          key={techIndex} 
                          variant=\"outline\" 
                          className=\"border-slate-500 text-slate-300 hover:border-amber-400 hover:text-amber-400\"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    {project.link && (
                      <Button 
                        variant=\"outline\" 
                        className=\"w-full border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black\"
                        onClick={() => window.open(project.link, '_blank')}
                      >
                        View Project
                        <ExternalLink className=\"ml-2 h-4 w-4\" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id=\"contact\" className=\"py-20\">
        <div className=\"max-w-6xl mx-auto px-6\">
          <div className=\"text-center mb-16\">
            <h2 className=\"text-4xl md:text-5xl font-light mb-6\">Get In Touch</h2>
            <div className=\"w-24 h-1 bg-amber-400 mx-auto mb-6\"></div>
            <p className=\"text-xl text-slate-300 max-w-2xl mx-auto\">
              Ready to discuss your next entertainment franchise or AI-driven creative project? Let's connect.
            </p>
          </div>
          <div className=\"grid md:grid-cols-3 gap-8\">
            <Card className=\"bg-slate-700/50 border-slate-600 hover:border-amber-400/50 transition-all duration-300 text-center\">
              <CardContent className=\"pt-6\">
                <Mail className=\"h-8 w-8 text-amber-400 mx-auto mb-4\" />
                <h3 className=\"text-lg font-medium text-white mb-2\">Email</h3>
                <p className=\"text-slate-300\">{portfolioData.contact ? portfolioData.contact.email : portfolioData.hero.email}</p>
              </CardContent>
            </Card>
            <Card className=\"bg-slate-700/50 border-slate-600 hover:border-amber-400/50 transition-all duration-300 text-center\">
              <CardContent className=\"pt-6\">
                <Phone className=\"h-8 w-8 text-amber-400 mx-auto mb-4\" />
                <h3 className=\"text-lg font-medium text-white mb-2\">Phone</h3>
                <p className=\"text-slate-300\">{portfolioData.contact ? portfolioData.contact.phone : portfolioData.hero.phone}</p>
              </CardContent>
            </Card>
            <Card className=\"bg-slate-700/50 border-slate-600 hover:border-amber-400/50 transition-all duration-300 text-center\">
              <CardContent className=\"pt-6\">
                <MapPin className=\"h-8 w-8 text-amber-400 mx-auto mb-4\" />
                <h3 className=\"text-lg font-medium text-white mb-2\">Location</h3>
                <p className=\"text-slate-300\">Saint Paul, Minnesota</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form */}
          <div className=\"mt-16 max-w-2xl mx-auto\">
            <Card className=\"bg-slate-800/50 border-slate-600\">
              <CardHeader>
                <CardTitle className=\"text-white text-center\">Send a Message</CardTitle>
                <CardDescription className=\"text-slate-400 text-center\">
                  Let's discuss your project or collaboration opportunity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm onSubmit={handleContactSubmit} />
              </CardContent>
            </Card>
          </div>
          
          <div className=\"text-center mt-12\">
            <Card className=\"bg-slate-800/50 border-slate-600 max-w-2xl mx-auto\">
              <CardContent className=\"pt-6\">
                <Zap className=\"h-8 w-8 text-amber-400 mx-auto mb-4\" />
                <h3 className=\"text-lg font-medium text-white mb-2\">Collaboration Opportunity</h3>
                <p className=\"text-slate-300\">
                  {portfolioData.contact ? portfolioData.contact.availability : \"Open to collaboration opportunities and new projects.\"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className=\"py-8 bg-slate-900 border-t border-slate-700\">
        <div className=\"max-w-6xl mx-auto px-6 text-center\">
          <p className=\"text-slate-400\">
            © 2025 Peter D. Allen. Pioneering the future of AI-driven entertainment.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;"
