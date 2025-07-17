
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Database, Zap, Shield, Target, TrendingUp, Clock } from 'lucide-react';

const FeatureCards = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: Database,
      title: "500M+ Verified Contacts",
      description: "Access the largest database of verified business contacts with 95% accuracy guarantee.",
      gradient: "from-blue-400 to-purple-500"
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Find decision-makers and influencers with our advanced filtering and segmentation tools.",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: Zap,
      title: "Bulk Enrichment",
      description: "Process thousands of leads simultaneously with our lightning-fast enrichment engine.",
      gradient: "from-pink-400 to-red-500"
    },
    {
      icon: Shield,
      title: "GDPR Compliant",
      description: "All data collection and processing follows strict privacy regulations and compliance standards.",
      gradient: "from-green-400 to-blue-500"
    },
    {
      icon: TrendingUp,
      title: "300% ROI Increase",
      description: "Our clients see an average 300% return on investment within the first quarter.",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Get fresh, up-to-date contact information with our real-time data validation system.",
      gradient: "from-indigo-400 to-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <Card
          key={index}
          className={`bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-500 cursor-pointer transform hover:scale-105 ${
            hoveredCard === index ? 'rotate-1' : ''
          }`}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
          style={{
            transform: hoveredCard === index 
              ? `translateY(-10px) rotate(${Math.random() * 4 - 2}deg)` 
              : 'translateY(0px) rotate(0deg)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <CardContent className="p-8">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 transition-all duration-300 ${
              hoveredCard === index ? 'scale-110 rotate-12' : ''
            }`}>
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xl font-bold mb-4 text-white">
              {feature.title}
            </h3>
            
            <p className="text-gray-300 leading-relaxed">
              {feature.description}
            </p>
            
            {hoveredCard === index && (
              <div className="mt-4 text-sm font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">
                Learn more →
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeatureCards;
