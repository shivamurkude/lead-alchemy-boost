// Facebook Pixel Configuration and Event Tracking
// Replace YOUR_PIXEL_ID with your actual Facebook Pixel ID

declare global {
  interface Window {
    fbq: any;
  }
}

export const FB_PIXEL_ID = '595201590045404'; // Your Meta Pixel ID

// Initialize Facebook Pixel (only if not already initialized by HTML)
export const initFacebookPixel = () => {
  if (typeof window !== 'undefined' && !window.fbq) {
    // Only initialize if fbq doesn't exist (HTML handles initialization)
    console.warn('Facebook Pixel should be initialized in HTML');
  }
};

// Track Page View
export const trackPageView = (pageName: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView', {
      page_name: pageName,
      page_title: document.title,
    });
  }
};

// Track Lead Form View
export const trackLeadFormView = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: 'Lead Form',
      content_category: 'Lead Generation',
      value: 1.00,
      currency: 'USD',
    });
  }
};

// Track Form Start (when user starts filling)
export const trackFormStart = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'StartTrial', {
      content_name: 'Lead Form Started',
      content_category: 'Lead Generation',
    });
  }
};

// Track Form Submission
export const trackFormSubmission = (formData: {
  name: string;
  email: string;
  phone: string;
  purpose: string;
}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: 'Lead Form Submitted',
      content_category: 'Lead Generation',
      value: 10.00, // Set your lead value
      currency: 'USD',
      content: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        purpose: formData.purpose,
      }),
    });
  }
};

// Track WhatsApp Redirect
export const trackWhatsAppRedirect = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', {
      content_name: 'WhatsApp Redirect',
      content_category: 'Lead Generation',
    });
  }
};

// Track CTA Clicks
export const trackCTAClick = (ctaName: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'CustomizeProduct', {
      content_name: ctaName,
      content_category: 'CTA Click',
    });
  }
};

// Track Scroll Depth (for engagement)
export const trackScrollDepth = (depth: number) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: 'Page Scroll',
      content_category: 'Engagement',
      value: depth,
    });
  }
};

// Track Time on Page
export const trackTimeOnPage = (seconds: number) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: 'Time on Page',
      content_category: 'Engagement',
      value: seconds,
    });
  }
}; 