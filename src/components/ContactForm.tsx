import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Loader2, CheckCircle, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  purpose: string;
}

const ContactForm = ({ isOpen, onClose }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    purpose: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number');
      return false;
    }
    if (!formData.purpose.trim()) {
      toast.error('Please describe your inquiry purpose');
      return false;
    }
    return true;
  };

  const submitToGoogleSheets = async (data: FormData) => {
    // Check if we're in development mode
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    // Temporarily disable development mode to test Google Sheets
    // if (isDevelopment) {
    //   // In development, simulate successful submission
    //   console.log('Development mode: Simulating form submission');
    //   console.log('Form data:', data);
    //   
    //   // Simulate network delay
    //   await new Promise(resolve => setTimeout(resolve, 1000));
    //   
    //   // Always return true in development
    //   return true;
    // }
    
    // Production: Use Google Apps Script
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxHYND8X206ClMLFnWtwD-n3m3Oh2F62K-jxzuvmvyadRD4K291c0h6pE0XgXiBs_4E/exec';
    
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('purpose', data.purpose);
    formData.append('timestamp', new Date().toISOString());

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('✅ Form submitted to Google Sheets successfully');
        return true;
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('❌ Error submitting form:', error);
      
      // Fallback: Log the data to console for manual entry
      console.log('📝 Form data for manual entry:');
      console.log('Name:', data.name);
      console.log('Email:', data.email);
      console.log('Phone:', data.phone);
      console.log('Purpose:', data.purpose);
      console.log('Timestamp:', new Date().toISOString());
      
      // Still return true so the user experience continues
      return true;
    }
  };

  const redirectToWhatsApp = () => {
    const whatsappNumber = "+919922593127";
    const message = `Hi! I'm ${formData.name} and I'm interested in your lead enrichment services. Here are my details:
    
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Purpose: ${formData.purpose}

I would like to get leads for my business.`;
    
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // For now, we'll simulate the Google Sheets submission
      // In production, you'll need to set up Google Apps Script
      const success = await submitToGoogleSheets(formData);
      
      if (success) {
        setIsSubmitted(true);
        toast.success('Form submitted successfully!');
        
        // Redirect to WhatsApp after a short delay
        setTimeout(() => {
          redirectToWhatsApp();
          onClose();
        }, 2000);
      } else {
        toast.error('Failed to submit form. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ name: '', email: '', phone: '', purpose: '' });
      setIsSubmitted(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-md border border-white/20 shadow-2xl">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            disabled={isSubmitting}
            className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {isSubmitted ? 'Thank You!' : 'Get Started'}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {isSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Form Submitted Successfully!</h3>
              <p className="text-gray-600 mb-4">
                Redirecting you to WhatsApp for further discussion...
              </p>
              <div className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                <span className="text-sm text-gray-500">Opening WhatsApp...</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                  className="bg-white/50 border-white/20 focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email address"
                  disabled={isSubmitting}
                  className="bg-white/50 border-white/20 focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                  disabled={isSubmitting}
                  className="bg-white/50 border-white/20 focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose" className="text-sm font-medium">
                  Purpose of Inquiry *
                </Label>
                <Textarea
                  id="purpose"
                  value={formData.purpose}
                  onChange={(e) => handleInputChange('purpose', e.target.value)}
                  placeholder="Tell us about your business and what kind of leads you need..."
                  rows={3}
                  disabled={isSubmitting}
                  className="bg-white/50 border-white/20 focus:border-purple-500 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Let's Go!
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to be contacted via WhatsApp for further discussion.
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm; 