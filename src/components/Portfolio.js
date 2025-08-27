import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { portfolioAPI } from '../services/api';
import { useToast } from '../hooks/use-toast';
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react';

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
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
            {portfolioData.hero.name}
          </h1>
          <div className="text-xl md:text-2xl text-amber-400 font-medium mb-4">
            {portfolioData.hero.title}
          </div>
          <p className="text-lg text-slate-300 max-w-4xl mx-auto">
            {portfolioData.hero.tagline}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card className="bg-slate-700/50 border-slate-600">
            <CardContent className="pt-6 text-center">
              <Mail className="h-8 w-8 text-amber-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Email</h3>
              <p className="text-slate-300">{portfolioData.hero.email}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-700/50 border-slate-600">
            <CardContent className="pt-6 text-center">
              <Phone className="h-8 w-8 text-amber-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Phone</h3>
              <p className="text-slate-300">{portfolioData.hero.phone}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-700/50 border-slate-600">
            <CardContent className="pt-6 text-center">
              <MapPin className="h-8 w-8 text-amber-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Location</h3>
              <p className="text-slate-300">{portfolioData.hero.location}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
