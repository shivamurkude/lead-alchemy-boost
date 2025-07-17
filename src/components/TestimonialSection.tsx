
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const TestimonialSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "VP of Sales at TechFlow",
      content: "LeadAlchemy transformed our sales process completely. We went from 15% to 65% conversion rates in just 3 months. The data quality is exceptional!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Marcus Chen",
      role: "Founder at GrowthLabs",
      content: "The bulk enrichment feature saved us 40 hours per week. Our team can now focus on closing deals instead of hunting for contact information.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Sales Director at ScaleUp Inc",
      content: "ROI of 400% in the first quarter! The precision targeting helped us reach decision-makers we never could have found before.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">clients say</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of sales professionals who've transformed their results with our lead enrichment platform.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden">
            <CardContent className="p-12">
              <div className="text-center">
                <Quote className="w-12 h-12 text-purple-400 mx-auto mb-6" />
                
                <div className="mb-8">
                  <p className="text-xl md:text-2xl text-gray-100 leading-relaxed mb-6">
                    "{testimonials[currentTestimonial].content}"
                  </p>
                  
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full border-2 border-purple-400"
                  />
                  <div className="text-left">
                    <div className="font-bold text-white text-lg">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-gray-400">
                      {testimonials[currentTestimonial].role}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-purple-400 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
