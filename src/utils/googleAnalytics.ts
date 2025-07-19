// Google Analytics 4 Configuration and Event Tracking
// Replace YOUR_GA4_MEASUREMENT_ID with your actual GA4 Measurement ID

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GA4_MEASUREMENT_ID = 'G-PDP3N99SE4'; // Your actual GA4 Measurement ID

// Initialize Google Analytics
export const initGoogleAnalytics = () => {
  if (typeof window !== 'undefined') {
    // Google Analytics 4 Code
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA4_MEASUREMENT_ID}', {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true
      });
    `;
    document.head.appendChild(script2);
  }
};

// Track Page View
export const trackPageView = (pageName: string, pagePath?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA4_MEASUREMENT_ID, {
      page_title: pageName,
      page_location: pagePath || window.location.href,
      page_path: pagePath || window.location.pathname,
    });
  }
};

// Track Custom Events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      event_time: new Date().toISOString(),
    });
  }
};

// Track Lead Form Events
export const trackLeadFormView = () => {
  trackEvent('lead_form_view', {
    event_category: 'Lead Generation',
    event_label: 'Contact Form',
    value: 1,
  });
};

export const trackLeadFormStart = () => {
  trackEvent('lead_form_start', {
    event_category: 'Lead Generation',
    event_label: 'Contact Form Started',
    value: 1,
  });
};

export const trackLeadFormSubmission = (formData: {
  name: string;
  email: string;
  phone: string;
  purpose: string;
}) => {
  trackEvent('lead_form_submission', {
    event_category: 'Lead Generation',
    event_label: 'Contact Form Submitted',
    value: 10, // Set your lead value
    custom_parameters: {
      lead_name: formData.name,
      lead_email: formData.email,
      lead_phone: formData.phone,
      lead_purpose: formData.purpose,
    },
  });
};

export const trackWhatsAppRedirect = () => {
  trackEvent('whatsapp_redirect', {
    event_category: 'Lead Generation',
    event_label: 'WhatsApp Redirect',
    value: 5,
  });
};

// Track CTA Clicks
export const trackCTAClick = (ctaName: string, ctaLocation?: string) => {
  trackEvent('cta_click', {
    event_category: 'CTA',
    event_label: ctaName,
    cta_location: ctaLocation || 'Unknown',
    value: 1,
  });
};

// Track Scroll Depth
export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', {
    event_category: 'Engagement',
    event_label: `Scroll ${depth}%`,
    scroll_depth: depth,
    value: depth,
  });
};

// Track Time on Page
export const trackTimeOnPage = (seconds: number) => {
  trackEvent('time_on_page', {
    event_category: 'Engagement',
    event_label: 'Time on Page',
    time_on_page: seconds,
    value: Math.floor(seconds / 30), // Value increases with time
  });
};

// Track User Engagement
export const trackUserEngagement = (engagementType: string) => {
  trackEvent('user_engagement', {
    event_category: 'Engagement',
    event_label: engagementType,
    value: 1,
  });
};

// Track Session Duration
export const trackSessionDuration = (duration: number) => {
  trackEvent('session_duration', {
    event_category: 'Engagement',
    event_label: 'Session Duration',
    session_duration: duration,
    value: Math.floor(duration / 60), // Value in minutes
  });
};

// Track Bounce Rate Prevention
export const trackBouncePrevention = () => {
  trackEvent('bounce_prevention', {
    event_category: 'Engagement',
    event_label: 'User Stayed',
    value: 1,
  });
};

// Track Conversion Funnel
export const trackFunnelStep = (step: string, stepNumber: number) => {
  trackEvent('funnel_step', {
    event_category: 'Conversion Funnel',
    event_label: step,
    funnel_step: stepNumber,
    value: stepNumber,
  });
};

// Track Error Events
export const trackError = (errorType: string, errorMessage: string) => {
  trackEvent('error', {
    event_category: 'Error',
    event_label: errorType,
    error_message: errorMessage,
    value: 0,
  });
};

// Track Performance Metrics
export const trackPerformance = (metric: string, value: number) => {
  trackEvent('performance', {
    event_category: 'Performance',
    event_label: metric,
    [metric]: value,
    value: value,
  });
}; 