import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
            placeholder="your@email.com"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="project_type" className="block text-sm font-medium text-slate-300 mb-2">
          Project Type
        </label>
        <select
          id="project_type"
          name="project_type"
          value={formData.project_type}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
        >
          <option value="">Select project type</option>
          <option value="multimedia_franchise">Multi-media Franchise</option>
          <option value="ai_audiobook">AI Audiobook Production</option>
          <option value="comic_illustration">Comic/Graphic Novel</option>
          <option value="character_design">Character Design</option>
          <option value="consulting">AI Creative Consulting</option>
          <option value="collaboration">General Collaboration</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 resize-vertical"
          placeholder="Tell me about your project or idea..."
        />
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Mail className="ml-2 h-4 w-4" />
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
  const audioUrl = "https://customer-assets.emergentagent.com/job_dev-spotlight-36/artifacts/sps0q140_ElevenLabs_2025-08-26T07_55_56_Arnold_pre_sp100_s50_sb75_v3.mp3";

  // Load portfolio data
  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        setLoading(true);
        const data = await portfolioAPI.getPortfolioData();
        setPortfolioData(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load portfolio data:', err);
        setError('Failed to load portfolio data');
        toast({
          title: "Loading Error",
          description: "Unable to load portfolio data. Please refresh the page.",
          variant: "destructive",
        });
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
        title: "Audio Error",
        description: "Failed to load audio file. Please try again.",
        variant: "destructive",
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
        title: "Playback Error",
        description: "Unable to play audio. Please try again.",
        variant: "destructive",
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
        title: "Message Sent!",
        description: response.message,
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-amber-400 mx-auto mb-4" />
          <p className="text-slate-300 text-lg">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !portfolioData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-400 text-2xl">⚠</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Unable to Load Portfolio</h2>
          <p className="text-slate-300 mb-6">
            There was an error loading the portfolio data. Please check your connection and try again.
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-amber-500 hover:bg-amber-600 text-black"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-amber-400">P.D.Allen</div>
            <div className="hidden md:flex space-x-8">
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
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent z-10"></div>
        <div className="max-w-6xl mx-auto px-6 py-20 text-center z-20">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight">
              {portfolioData.hero.name}
            </h1>
            <div className="text-xl md:text-2xl text-amber-400 font-medium">
              {portfolioData.hero.title}
            </div>
            <p className="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              {portfolioData.hero.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button 
                onClick={() => scrollToSection('projects')}
                className="bg-amber-500 hover:bg-amber-600 text-black font-medium px-8 py-3 transition-all duration-300 hover:scale-105"
              >
                View My Work
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => scrollToSection('contact')}
                className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black px-8 py-3 transition-all duration-300"
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-amber-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-amber-400/30 rounded-full animate-bounce"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">About Me</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                {portfolioData.about.summary}
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                {portfolioData.about.mission}
              </p>
              <div className="flex items-center space-x-4 text-slate-400">
                <MapPin className="h-5 w-5 text-amber-400" />
                <span>{portfolioData.hero.location}</span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-2xl border border-slate-600">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Lightbulb className="h-6 w-6 text-amber-400" />
                    <span className="text-xl font-medium">Innovation Focus</span>
                  </div>
                  <p className="text-slate-300">
                    Combining traditional storytelling with cutting-edge AI to redefine content creation workflows and deliver immersive entertainment experiences.
                  </p>
                  <div className="pt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="h-4 w-4 text-amber-400" />
                      <span className="text-sm text-slate-400">Specialized in AI-driven franchise development</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-amber-400" />
                      <span className="text-sm text-slate-400">Published comic book artist with proven track record</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Core Competencies</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Technical Skills */}
            <Card className="bg-slate-700/50 border-slate-600 hover:border-amber-400/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Code className="h-6 w-6 text-amber-400" />
                  <CardTitle className="text-white">Technical</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {portfolioData.skills.technical.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-slate-600 text-slate-200 hover:bg-amber-400 hover:text-black transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Creative Skills */}
            <Card className="bg-slate-700/50 border-slate-600 hover:border-amber-400/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Palette className="h-6 w-6 text-amber-400" />
                  <CardTitle className="text-white">Creative</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {portfolioData.skills.creative.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-slate-600 text-slate-200 hover:bg-amber-400 hover:text-black transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Business Skills */}
            <Card className="bg-slate-700/50 border-slate-600 hover:border-amber-400/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Briefcase className="h-6 w-6 text-amber-400" />
                  <CardTitle className="text-white">Business</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {portfolioData.skills.business.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-slate-600 text-slate-200 hover:bg-amber-400 hover:text-black transition-all duration-300 cursor-default"
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
      <section id="experience" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Experience</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          </div>
          <div className="space-y-8">
            {portfolioData.experience.map((exp, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-600 hover:border-amber-400/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <CardTitle className="text-xl text-white mb-2">{exp.title}</CardTitle>
                      <CardDescription className="text-amber-400 font-medium">{exp.company}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-400 mt-2 md:mt-0">
                      <Calendar className="h-4 w-4" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-4">{exp.description}</p>
                  <div className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start space-x-2">
                        <ChevronRight className="h-4 w-4 text-amber-400 mt-1 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{achievement}</span>
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
      <section id="projects" className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Featured Projects</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {portfolioData.projects.map((project, index) => (
              <Card key={index} className="bg-slate-700/50 border-slate-600 hover:border-amber-400/50 transition-all duration-300 group overflow-hidden">
                <div className="aspect-video bg-slate-600 relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white group-hover:text-amber-400 transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                    <Badge className="bg-amber-500 text-black">{project.status}</Badge>
                  </div>
                  <CardDescription className="text-slate-300">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge 
                          key={techIndex} 
                          variant="outline" 
                          className="border-slate-500 text-slate-300 hover:border-amber-400 hover:text-amber-400"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    {project.link && (
                      <Button 
                        variant="outline" 
                        className="w-full border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black"
                        onClick={() => window.open(project.link, '_blank')}
                      >
                        View Project
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Principia Deep Dive Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Jon Orvar Background with Gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-800/60 to-slate-900"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800/80 to-amber-400/10"></div>
          <img 
            src="https://customer-assets.emergentagent.com/job_dev-spotlight-36/artifacts/3lktix58_Jon%20Orvar%20concept.jpg" 
            alt="Jon Orvar Concept Art"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-light mb-6 text-white drop-shadow-lg">
              Principia: AI-Driven Storytelling
            </h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto mb-6 shadow-lg"></div>
            <p className="text-xl text-slate-200 max-w-3xl mx-auto drop-shadow-md mb-6">
              Experience the fusion of traditional narrative and cutting-edge AI technology. Explore character development, read narrative excerpts, and discover the future of AI-generated audiobook narration.
            </p>
            
            {/* Development Disclaimer */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-amber-400/10 border border-amber-400/30 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Zap className="h-4 w-4 text-amber-400" />
                  <span className="text-sm font-medium text-amber-400">Development Preview</span>
                </div>
                <p className="text-sm text-slate-300 text-center">
                  The features, text, and images presented below are for early demonstration purposes only. 
                  All content is currently in development and does not yet represent the final product. 
                  This showcase provides a preview of the planned Principia multimedia franchise experience.
                </p>
              </div>
            </div>
          </div>

          {/* First Excerpt and Audio Player */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
            {/* Novel Excerpt */}
            <Card className="bg-slate-800/80 border-slate-600 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <span>Excerpt 1: Combat Training</span>
                </CardTitle>
                <CardDescription className="text-slate-400">
                  From the upcoming Principia webnovel series by D.A. Palmquist
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 leading-relaxed mb-4">
                    Tallen didn't like the situation. He and Misty both heard the airlock finish cycling, but no report on their status apart from Jon's order to prepare for contact. No sign of weapons fire visible from their position, either.
                  </p>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    <em>"Trainee, I need a colloid grenade,"</em> he ordered, <em>"Get me on from the weapons locker."</em>
                  </p>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    <em>"Yes, chief,"</em> Misty responded, and made her way to the flight deck above. Tallen fell back as well, taking up position behind a chair in the common area.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    He heard the sound of heavy footsteps on the ladder leading up to the deck, but didn't see anything until he heard a slightly different footfall, which he attributed to someone stepping on one of the ladder rungs mounted on the hatch...
                  </p>
                  <div className="mt-4 p-3 bg-slate-700/50 rounded border-l-4 border-amber-400">
                    <p className="text-sm text-slate-400 italic">
                      This excerpt showcases the military sci-fi tone and tactical combat scenarios that define the Principia universe, a complete rebranding of Frontier: 2170.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Audiobook Player */}
            <Card className="bg-slate-800/80 border-slate-600 sticky top-24 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Volume2 className="h-5 w-5 text-amber-400" />
                  <span>AI Audiobook Narration</span>
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Multi-speaker AI voice synthesis bringing characters to life
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Waveform Visualization (Dynamic) */}
                <div className="relative h-20 bg-slate-700/50 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center space-x-1">
                    {Array.from({ length: 60 }, (_, i) => {
                      const progress = duration > 0 ? currentTime / duration : 0;
                      const barProgress = i / 60;
                      const isActive = barProgress <= progress;
                      const height = Math.random() * 60 + 20;
                      
                      return (
                        <div
                          key={i}
                          className={`w-1 rounded-full transition-all duration-300 ${
                            isActive 
                              ? 'bg-gradient-to-t from-amber-400 to-amber-600 opacity-100' 
                              : 'bg-gradient-to-t from-amber-400/30 to-amber-600/30 opacity-50'
                          } ${isPlaying ? 'animate-pulse' : ''}`}
                          style={{
                            height: `${height}%`,
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: isActive && isPlaying ? '1.5s' : '0s'
                          }}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Progress Indicator */}
                  {duration > 0 && (
                    <div 
                      className="absolute top-0 left-0 w-1 h-full bg-amber-400 transition-all duration-200 rounded-full shadow-lg"
                      style={{ 
                        left: `${(currentTime / duration) * 100}%`,
                        transform: 'translateX(-50%)'
                      }}
                    />
                  )}
                  
                  {isPlaying && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent animate-pulse"></div>
                  )}
                </div>

                {/* Player Controls */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-amber-400 disabled:opacity-50"
                      onClick={() => skipTime(-15)}
                      disabled={!audioRef}
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      className={`w-12 h-12 rounded-full ${isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-amber-500 hover:bg-amber-600'} text-black transition-all duration-300 disabled:opacity-50`}
                      onClick={togglePlayPause}
                      disabled={!audioRef}
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-amber-400 disabled:opacity-50"
                      onClick={() => skipTime(15)}
                      disabled={!audioRef}
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* AI Voice Cast */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-white">AI Voice Cast:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                      <span className="text-sm text-slate-300">Arnold (ElevenLabs AI)</span>
                      <Badge variant="outline" className="border-amber-400/50 text-amber-400 text-xs">
                        Narrator
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                      <span className="text-sm text-slate-300">Tallen</span>
                      <Badge variant="outline" className="border-amber-400/50 text-amber-400 text-xs">
                        Character Voice
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                      <span className="text-sm text-slate-300">Misty</span>
                      <Badge variant="outline" className="border-amber-400/50 text-amber-400 text-xs">
                        Character Voice
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Audio Info */}
                <div className="p-4 bg-green-400/10 border border-green-400/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Volume2 className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">Live Demo Available</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    This is actual AI-generated narration of the Principia excerpt (rebranded from Frontier: 2170), 
                    created using ElevenLabs voice synthesis technology by D.A. Palmquist. Experience the quality 
                    and naturalness of modern AI voice generation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Second Excerpt */}
          <div className="mb-20">
            <Card className="bg-slate-800/80 border-slate-600 backdrop-blur-sm max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <span>Excerpt 2: Young Resistance</span>
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Character development and world-building showcase - Principia by D.A. Palmquist
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 leading-relaxed mb-4">
                    There was a lot of commotion on the forward-most catwalk in Lady Julianna's cargo bay as the prods zip-tied the children to the deck through the floor grating in a way that immobilized them. Shakti anxiously waited in line for someone to take her for the same treatment, her young mind racing from worry at what horrible purpose they was doing this to them for.
                  </p>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    <em>"Pretty smart of the boss to have us tie up the kiddies like this,"</em> one of the prods, who to his credit was probably the sharpest hammer in the shed, proclaimed, <em>"Now, they can't shoot at us from below."</em>
                  </p>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    Shakti was too little to understand the double entendre, but she knew that nothing good could come of the prods getting their ham-fisted hands on her. She certainly didn't want to be tied up and helpless, so she let her coffee-brown eyes dart around and find her options.
                  </p>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    She could make a break for the railing, dive over the edge, and end it all with a headfirst plunge into the hard metal deck below, but that would only get her out of this situation – it would do nothing for the revolution.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    Suddenly, the entire ship lurched to port, throwing everyone who was still standing toward the starboard bulkhead. Some of the girls shrieked in fright as the lights went out and the gravity failed. Now was her chance! Shakti slipped through the now chaotic crowd with practiced ease...
                  </p>
                  <div className="mt-4 p-3 bg-slate-700/50 rounded border-l-4 border-amber-400">
                    <p className="text-sm text-slate-400 italic">
                      This excerpt demonstrates character development, world-building, and the emotional depth that drives the narrative forward in the Principia universe, a complete rebranding of Frontier: 2170.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Concept Art Gallery */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-light mb-4 text-white">Character Concept Art</h3>
              <div className="w-16 h-1 bg-amber-400 mx-auto mb-4"></div>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Original character designs for Principia (the rebranded Frontier: 2170), showcasing the artistic development behind the compelling cast
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Shakti Concept Art 1 */}
              <Card className="bg-slate-800/80 border-slate-600 backdrop-blur-sm overflow-hidden group">
                <div className="aspect-square bg-slate-700 relative overflow-hidden">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_dev-spotlight-36/artifacts/001tcn82_image.png" 
                    alt="Shakti Character Design"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>
                <CardContent className="p-4">
                  <h4 className="text-white font-medium mb-2">Shakti - Character Design</h4>
                  <p className="text-slate-400 text-sm">
                    Young resistance member, showcasing practical work attire and determined expression
                  </p>
                </CardContent>
              </Card>

              {/* Shakti Concept Art 2 */}
              <Card className="bg-slate-800/80 border-slate-600 backdrop-blur-sm overflow-hidden group">
                <div className="aspect-square bg-slate-700 relative overflow-hidden">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_dev-spotlight-36/artifacts/us8dvj63_image%281%29.png" 
                    alt="Shakti Alternative Design"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>
                <CardContent className="p-4">
                  <h4 className="text-white font-medium mb-2">Shakti - Alternative View</h4>
                  <p className="text-slate-400 text-sm">
                    Character consistency study showing different angles and expressions
                  </p>
                </CardContent>
              </Card>

              {/* Jon Orvar Concept Art */}
              <Card className="bg-slate-800/80 border-slate-600 backdrop-blur-sm overflow-hidden group md:col-span-2 lg:col-span-1">
                <div className="aspect-square bg-slate-700 relative overflow-hidden">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_dev-spotlight-36/artifacts/3lktix58_Jon%20Orvar%20concept.jpg" 
                    alt="Jon Orvar Military Design"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>
                <CardContent className="p-4">
                  <h4 className="text-white font-medium mb-2">Jon Orvar - Military Officer</h4>
                  <p className="text-slate-400 text-sm">
                    Mars military uniform design with detailed insignia and futuristic cityscape setting
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Get In Touch</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Ready to discuss your next entertainment franchise or AI-driven creative project? Let's connect.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-700/50 border-slate-600 hover:border-amber-400/50 transition-all duration-300 text-center">
              <CardContent className="pt-6">
                <Mail className="h-8 w-8 text-amber-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Email</h3>
                <p className="text-slate-300">{portfolioData.contact.email}</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-700/50 border-slate-600 hover:border-amber-400/50 transition-all duration-300 text-center">
              <CardContent className="pt-6">
                <Phone className="h-8 w-8 text-amber-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Phone</h3>
                <p className="text-slate-300">{portfolioData.contact.phone}</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-700/50 border-slate-600 hover:border-amber-400/50 transition-all duration-300 text-center">
              <CardContent className="pt-6">
                <MapPin className="h-8 w-8 text-amber-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Location</h3>
                <p className="text-slate-300">Saint Paul, Minnesota</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form */}
          <div className="mt-16 max-w-2xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white text-center">Send a Message</CardTitle>
                <CardDescription className="text-slate-400 text-center">
                  Let's discuss your project or collaboration opportunity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm onSubmit={handleContactSubmit} />
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Card className="bg-slate-800/50 border-slate-600 max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <Zap className="h-8 w-8 text-amber-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Collaboration Opportunity</h3>
                <p className="text-slate-300">
                  {portfolioData.contact.availability}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 border-t border-slate-700">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-400">
            © 2025 Peter D. Allen. Pioneering the future of AI-driven entertainment.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
