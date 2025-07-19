import { useEffect, useRef } from 'react';
import {
  initFacebookPixel,
  trackPageView,
  trackScrollDepth,
  trackTimeOnPage,
  trackCTAClick,
  trackLeadFormView,
  trackFormStart,
  trackFormSubmission,
  trackWhatsAppRedirect,
} from '@/utils/facebookPixel';

export const useFacebookPixel = (pageName: string) => {
  const startTime = useRef<number>(Date.now());
  const scrollTracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Initialize Facebook Pixel
    initFacebookPixel();
    
    // Track page view
    trackPageView(pageName);

    // Track time on page
    const timeInterval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      if (timeSpent % 30 === 0 && timeSpent > 0) { // Track every 30 seconds
        trackTimeOnPage(timeSpent);
      }
    }, 1000);

    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      // Track at 25%, 50%, 75%, and 100% scroll
      [25, 50, 75, 100].forEach(threshold => {
        if (scrollPercent >= threshold && !scrollTracked.current.has(threshold)) {
          scrollTracked.current.add(threshold);
          trackScrollDepth(threshold);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pageName]);

  return {
    trackCTAClick,
    trackLeadFormView,
    trackFormStart,
    trackFormSubmission,
    trackWhatsAppRedirect,
  };
}; 