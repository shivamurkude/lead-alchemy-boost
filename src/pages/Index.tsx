
import { useState, useEffect } from 'react';
import { ArrowRight, Star, Users, TrendingUp, Database, Zap, Shield, CheckCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedBackground from '@/components/AnimatedBackground';
import FeatureCards from '@/components/FeatureCards';
import TestimonialSection from '@/components/TestimonialSection';

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const whatsappNumber = "+1234567890"; // Replace with your actual WhatsApp number
  const whatsappMessage = "Hi! I'm interested in your lead enrichment services and would like to get leads for my business.";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <AnimatedBackground />
      
      {/* Cursor Glow Effect */}
      <div 
        className="fixed pointer-events-none z-10 w-96 h-96 rounded-full opacity-20 bg-gradient-to-r from-purple-400 to-pink-400 blur-3xl transition-all duration-300"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Header */}
      <header className="relative z-20 border-b border-white/10 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg"></div>
              <span className="text-xl font-bold">LeadNexio</span>
            </div>
            <Button 
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-2 mb-8 border border-white/20">
              <Star className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-sm">Trusted by 10,000+ businesses worldwide</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Everything you need to
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                sell, scale, and succeed
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your business with bulk lead enrichment. Get verified contact data for 500M+ profiles. 
              Don't have leads? We can provide them. Contact us on WhatsApp to get started and watch your pipeline grow by 300%.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={handleWhatsAppClick}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              Get Leads via WhatsApp
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-gray-400">
              Contact us now • Professional lead service
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "500M+", label: "Verified Contacts" },
              { number: "300%", label: "Pipeline Growth" },
              { number: "95%", label: "Data Accuracy" },
              { number: "10K+", label: "Happy Clients" }
            ].map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why choose <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">LeadNexio?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We don't just provide data - we deliver results. Our enrichment process turns your cold leads into revenue-generating opportunities.
            </p>
          </div>
          
          <FeatureCards />
        </div>
      </section>

      {/* Process Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How it <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">works</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Share Your ICP",
                description: "Send us your leads or share your Ideal Customer Profile. No leads? We can provide them for you.",
                icon: Database
              },
              {
                step: "02", 
                title: "AI-Powered Enrichment",
                description: "Our advanced algorithms enrich your data with verified emails, phone numbers, and behavioral insights.",
                icon: Zap
              },
              {
                step: "03",
                title: "Scale Your Outreach",
                description: "Get enriched data back and watch your conversion rates soar with precise targeting.",
                icon: TrendingUp
              }
            ].map((item, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                    {item.step}
                  </div>
                  <item.icon className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/10 rounded-3xl p-12 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">10x your sales?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using our lead enrichment service. 
              Contact us on WhatsApp to get started - no credit card required, just connect with us!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleWhatsAppClick}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Get Leads via WhatsApp
              </Button>
            </div>
            
            <div className="flex items-center justify-center mt-6 space-x-6 text-sm text-gray-400">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                Premium lead service
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-400" />
                GDPR compliant
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-green-400" />
                24/7 support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg"></div>
              <span className="text-xl font-bold">LeadNexio</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 LeadNexio. All rights reserved. Transform leads into revenue.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
