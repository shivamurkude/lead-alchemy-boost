// Facebook Pixel Debugging Utility
// This helps identify why the pixel might not be working

export const debugFacebookPixel = () => {
  console.log('🔍 Facebook Pixel Debug Report');
  console.log('================================');
  
  // Check if we're in browser environment
  if (typeof window === 'undefined') {
    console.log('❌ Not in browser environment');
    return;
  }
  
  // Check if fbq function exists
  if (typeof window.fbq === 'undefined') {
    console.log('❌ fbq function is undefined');
    console.log('🔧 This means the Facebook Pixel script failed to load');
    console.log('💡 Possible causes:');
    console.log('   - Ad blocker is blocking Facebook scripts');
    console.log('   - Network connectivity issues');
    console.log('   - Script loading error');
    return;
  }
  
  console.log('✅ fbq function exists');
  
  // Check if pixel is initialized
  if (window.fbq && window.fbq.loaded) {
    console.log('✅ Facebook Pixel is loaded');
  } else {
    console.log('⚠️ Facebook Pixel might not be fully loaded');
  }
  
  // Check for common issues
  const issues = [];
  
  // Check for ad blockers
  if (window.fbq && !window.fbq.loaded) {
    issues.push('Ad blocker might be blocking Facebook Pixel');
  }
  
  // Check network connectivity
  fetch('https://connect.facebook.net/en_US/fbevents.js', { method: 'HEAD' })
    .then(() => console.log('✅ Facebook CDN is accessible'))
    .catch(() => {
      console.log('❌ Cannot access Facebook CDN');
      issues.push('Network connectivity issue with Facebook CDN');
    });
  
  // Test pixel firing
  try {
    window.fbq('track', 'PageView', { debug: true });
    console.log('✅ Test PageView event fired successfully');
  } catch (error) {
    console.log('❌ Failed to fire test PageView event:', error);
    issues.push('Pixel event firing failed');
  }
  
  // Display issues if any
  if (issues.length > 0) {
    console.log('\n🚨 Issues Found:');
    issues.forEach((issue, index) => {
      console.log(`   ${index + 1}. ${issue}`);
    });
  } else {
    console.log('\n🎉 No issues found! Pixel should be working correctly.');
  }
  
  console.log('\n📋 Next Steps:');
  console.log('1. Check Network tab for facebook.com/tr requests');
  console.log('2. Install Facebook Pixel Helper extension');
  console.log('3. Check Facebook Events Manager for test events');
  console.log('4. Disable ad blockers temporarily for testing');
};

// Function to test all pixel events
export const testAllPixelEvents = () => {
  console.log('🧪 Testing All Facebook Pixel Events');
  console.log('====================================');
  
  if (typeof window === 'undefined' || !window.fbq) {
    console.log('❌ fbq not available');
    return;
  }
  
  const events = [
    { name: 'PageView', params: {} },
    { name: 'Lead', params: { content_name: 'Test Lead', value: 10.00, currency: 'USD' } },
    { name: 'StartTrial', params: { content_name: 'Test Form Start' } },
    { name: 'Contact', params: { content_name: 'Test Contact' } },
    { name: 'CustomizeProduct', params: { content_name: 'Test CTA', content_category: 'Test' } },
    { name: 'ViewContent', params: { content_name: 'Test Content', value: 50 } }
  ];
  
  events.forEach((event, index) => {
    setTimeout(() => {
      try {
        window.fbq('track', event.name, event.params);
        console.log(`✅ ${event.name} event fired`);
      } catch (error) {
        console.log(`❌ ${event.name} event failed:`, error);
      }
    }, index * 500); // Fire events 500ms apart
  });
};

// Function to check network requests
export const checkNetworkRequests = () => {
  console.log('🌐 Checking Network Requests');
  console.log('============================');
  
  if (typeof window === 'undefined') {
    console.log('❌ Not in browser environment');
    return;
  }
  
  // Create a test request to see if we can reach Facebook
  const testUrl = 'https://www.facebook.com/tr';
  const testData = {
    id: '595201590045404',
    ev: 'PageView',
    dl: window.location.href,
    dt: document.title
  };
  
  // Try to send a test request
  fetch(testUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(testData)
  })
  .then(response => {
    console.log('✅ Network request to Facebook successful');
    console.log('Status:', response.status);
  })
  .catch(error => {
    console.log('❌ Network request to Facebook failed:', error);
    console.log('💡 This might indicate:');
    console.log('   - Ad blocker is active');
    console.log('   - Network connectivity issues');
    console.log('   - CORS restrictions');
  });
};

// Auto-run debug on import (for development)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Wait for page to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(debugFacebookPixel, 2000); // Wait 2 seconds for pixel to load
    });
  } else {
    setTimeout(debugFacebookPixel, 2000);
  }
} 