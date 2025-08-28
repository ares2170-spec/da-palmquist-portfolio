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
  ExternalLink, 
  ChevronRight,
  Star,
  Code,
  Palette,
  Briefcase,
  Lightbulb,
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
            
            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Button 
                className="bg-amber-500 hover:bg-amber-600 text-black font-medium px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
              >
                View My Work
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black px-8 py-4 text-lg transition-all duration-300"
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

      {/* Contact Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">Get In Touch</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Ready to discuss your next entertainment franchise or AI-driven creative project?
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-slate-700/50 border-slate-600 hover:border-amber-400/50 transition-all duration-300 group">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-amber-400/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-400/20 transition-all duration-300">
                  <Mail className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">Email</h3>
                <p className="text-slate-300 text-lg">{portfolioData.hero.email}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-700/50 border-slate-600 hover:border-amber-400/50 transition-all duration-300 group">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-amber-400/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-400/20 transition-all duration-300">
                  <Phone className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">Phone</h3>
                <p className="text-slate-300 text-lg">{portfolioData.hero.phone}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-700/50 border-slate-600 hover:border-amber-400/50 transition-all duration-300 group">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-amber-400/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-400/20 transition-all duration-300">
                  <MapPin className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">Location</h3>
                <p className="text-slate-300 text-lg">{portfolioData.hero.location}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 border-t border-slate-700">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-lg">
            © 2025 Peter D. Allen. Pioneering the future of AI-driven entertainment.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
