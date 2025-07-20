// Facebook Pixel Configuration and Event Tracking
// Replace YOUR_PIXEL_ID with your actual Facebook Pixel ID

declare global {
  interface Window {
    fbq: any;
  }
}

export const FB_PIXEL_ID = '595201590045404'; // Your Meta Pixel ID

// Initialize Facebook Pixel
export const initFacebookPixel = () => {
  if (typeof window !== 'undefined') {
    // Only initialize if not already done
    if (window.fbq && window.fbq.loaded) {
      console.log('Facebook Pixel already loaded');
      return;
    }

    // Facebook Pixel Code
    !(function (f: any, b: any, e: any, v: any, n: any, t: any, s: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js'
    );

    // Wait for pixel to load, then initialize
    const checkPixelLoaded = () => {
      if (window.fbq && window.fbq.loaded) {
        window.fbq('init', FB_PIXEL_ID);
        window.fbq('track', 'PageView');
        console.log('Facebook Pixel initialized successfully');
      } else {
        setTimeout(checkPixelLoaded, 100);
      }
    };
    
    // Start checking after a short delay
    setTimeout(checkPixelLoaded, 500);
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