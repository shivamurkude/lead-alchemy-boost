import { useEffect, useRef } from 'react';
import {
  initGoogleAnalytics,
  trackPageView,
  trackScrollDepth,
  trackTimeOnPage,
  trackUserEngagement,
  trackSessionDuration,
  trackBouncePrevention,
  trackCTAClick,
  trackLeadFormView,
  trackLeadFormStart,
  trackLeadFormSubmission,
  trackWhatsAppRedirect,
  trackFunnelStep,
} from '@/utils/googleAnalytics';

export const useGoogleAnalytics = (pageName: string) => {
  const startTime = useRef<number>(Date.now());
  const scrollTracked = useRef<Set<number>>(new Set());
  const sessionStartTime = useRef<number>(Date.now());
  const hasInteracted = useRef<boolean>(false);

  useEffect(() => {
    // Initialize Google Analytics
    initGoogleAnalytics();
    
    // Track page view
    trackPageView(pageName);

    // Track funnel step (assuming homepage is step 1)
    trackFunnelStep('Homepage Visit', 1);

    // Track time on page
    const timeInterval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      if (timeSpent % 30 === 0 && timeSpent > 0) { // Track every 30 seconds
        trackTimeOnPage(timeSpent);
        
        // Track bounce prevention after 30 seconds
        if (timeSpent === 30 && !hasInteracted.current) {
          trackBouncePrevention();
        }
      }
    }, 1000);

    // Track scroll depth
    const handleScroll = () => {
      hasInteracted.current = true;
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

    // Track user engagement
    const handleUserInteraction = () => {
      hasInteracted.current = true;
      trackUserEngagement('User Interaction');
    };

    // Track session duration
    const sessionInterval = setInterval(() => {
      const sessionDuration = Math.floor((Date.now() - sessionStartTime.current) / 1000);
      if (sessionDuration % 60 === 0 && sessionDuration > 0) { // Track every minute
        trackSessionDuration(sessionDuration);
      }
    }, 1000);

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);

    // Track beforeunload for session duration
    const handleBeforeUnload = () => {
      const finalSessionDuration = Math.floor((Date.now() - sessionStartTime.current) / 1000);
      if (finalSessionDuration > 10) { // Only track if session was longer than 10 seconds
        trackSessionDuration(finalSessionDuration);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(timeInterval);
      clearInterval(sessionInterval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pageName]);

  return {
    trackCTAClick,
    trackLeadFormView,
    trackLeadFormStart,
    trackLeadFormSubmission,
    trackWhatsAppRedirect,
    trackFunnelStep,
  };
}; 