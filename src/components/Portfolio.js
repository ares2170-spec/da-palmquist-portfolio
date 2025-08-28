import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { portfolioAPI } from '../services/api';
import { useToast } from '../hooks/use-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight,
  Code,
  Palette,
  Briefcase,
  Calendar,
  Lightbulb,
  Star,
  Loader2 
} from 'lucide-react';

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadPortfolioData = async () => {
      setLoading(true);
      try {
        const data = await portfolioAPI.getPortfolioData();
        setPortfolioData(data);
      } catch (error) {
        console.error('Failed to load portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolioData();
  }, [toast]);

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

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-2">Portfolio Loading</h2>
          <p className="text-slate-300 mb-6">Please wait while we load your portfolio content.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white">
              {portfolioData.hero.name}
            </h1>
            <div className="text-2xl md:text-3xl text-amber-400 font-medium">
              {portfolioData.hero.title}
            </div>
            <p className="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              {portfolioData.hero.tagline}
            </p>
          </div>
        </div>
        <div className="absolute top-20 left-10 w-32 h-32 border border-amber-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-amber-400/30 rounded-full animate-bounce"></div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">About Me</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="text-lg text-slate-300 leading-relaxed">
              {portfolioData.about.summary}
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              {portfolioData.about.mission}
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Core Competencies</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-700/50 border-slate-600">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Code className="h-6 w-6 text-amber-400" />
                  <CardTitle className="text-white">Technical</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {portfolioData.skills.technical.map((skill, index) => (
                    <Badge key={index} className="bg-slate-600 text-slate-200 mr-2 mb-2">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-700/50 border-slate-600">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Palette className="h-6 w-6 text-amber-400" />
                  <CardTitle className="text-white">Creative</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {portfolioData.skills.creative.map((skill, index) => (
                    <Badge key={index} className="bg-slate-600 text-slate-200 mr-2 mb-2">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-700/50 border-slate-600">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Briefcase className="h-6 w-6 text-amber-400" />
                  <CardTitle className="text-white">Business</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {portfolioData.skills.business.map((skill, index) => (
                    <Badge key={index} className="bg-slate-600 text-slate-200 mr-2 mb-2">
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
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Experience</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          </div>
          <div className="space-y-8">
            {portfolioData.experience.map((exp, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-600">
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
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Featured Projects</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {portfolioData.projects.map((project, index) => (
              <Card key={index} className="bg-slate-700/50 border-slate-600">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{project.title}</CardTitle>
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
                        <Badge key={techIndex} variant="outline" className="border-slate-500 text-slate-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Get In Touch</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-slate-700/50 border-slate-600">
              <CardContent className="pt-8 pb-8 text-center">
                <Mail className="h-8 w-8 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-3">Email</h3>
                <p className="text-slate-300">{portfolioData.hero.email}</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-700/50 border-slate-600">
              <CardContent className="pt-8 pb-8 text-center">
                <Phone className="h-8 w-8 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-3">Phone</h3>
                <p className="text-slate-300">{portfolioData.hero.phone}</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-700/50 border-slate-600">
              <CardContent className="pt-8 pb-8 text-center">
                <MapPin className="h-8 w-8 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-3">Location</h3>
                <p className="text-slate-300">{portfolioData.hero.location}</p>
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
