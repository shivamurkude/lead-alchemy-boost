import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  trackPageView, 
  trackLeadFormView, 
  trackFormStart, 
  trackFormSubmission, 
  trackWhatsAppRedirect, 
  trackCTAClick,
  trackScrollDepth,
  trackTimeOnPage 
} from '@/utils/facebookPixel';
import { debugFacebookPixel, testAllPixelEvents, checkNetworkRequests } from '@/utils/pixelDebugger';

const PixelTestPanel = () => {
  const [testResults, setTestResults] = useState<string[]>([]);

  const addTestResult = (event: string, success: boolean) => {
    const result = `${success ? '✅' : '❌'} ${event} - ${success ? 'SUCCESS' : 'FAILED'}`;
    setTestResults(prev => [...prev, result]);
  };

  const testPixelLoading = () => {
    try {
      if (typeof window !== 'undefined' && window.fbq) {
        addTestResult('Pixel Loading', true);
        return true;
      } else {
        addTestResult('Pixel Loading', false);
        return false;
      }
    } catch (error) {
      addTestResult('Pixel Loading', false);
      return false;
    }
  };

  const testPageView = () => {
    try {
      trackPageView('Test Page');
      addTestResult('PageView Event', true);
    } catch (error) {
      addTestResult('PageView Event', false);
    }
  };

  const testLeadFormView = () => {
    try {
      trackLeadFormView();
      addTestResult('Lead Form View', true);
    } catch (error) {
      addTestResult('Lead Form View', false);
    }
  };

  const testFormStart = () => {
    try {
      trackFormStart();
      addTestResult('Form Start', true);
    } catch (error) {
      addTestResult('Form Start', false);
    }
  };

  const testFormSubmission = () => {
    try {
      trackFormSubmission({
        name: 'Test User',
        email: 'test@example.com',
        phone: '+1234567890',
        purpose: 'Testing Pixel Events'
      });
      addTestResult('Form Submission', true);
    } catch (error) {
      addTestResult('Form Submission', false);
    }
  };

  const testWhatsAppRedirect = () => {
    try {
      trackWhatsAppRedirect();
      addTestResult('WhatsApp Redirect', true);
    } catch (error) {
      addTestResult('WhatsApp Redirect', false);
    }
  };

  const testCTAClick = () => {
    try {
      trackCTAClick('Test CTA Button');
      addTestResult('CTA Click', true);
    } catch (error) {
      addTestResult('CTA Click', false);
    }
  };

  const testScrollDepth = () => {
    try {
      trackScrollDepth(50);
      addTestResult('Scroll Depth (50%)', true);
    } catch (error) {
      addTestResult('Scroll Depth (50%)', false);
    }
  };

  const testTimeOnPage = () => {
    try {
      trackTimeOnPage(60);
      addTestResult('Time on Page (60s)', true);
    } catch (error) {
      addTestResult('Time on Page (60s)', false);
    }
  };

  const runAllTests = () => {
    setTestResults([]);
    
    // Test pixel loading first
    if (testPixelLoading()) {
      // Run all event tests
      setTimeout(() => testPageView(), 100);
      setTimeout(() => testLeadFormView(), 200);
      setTimeout(() => testFormStart(), 300);
      setTimeout(() => testFormSubmission(), 400);
      setTimeout(() => testWhatsAppRedirect(), 500);
      setTimeout(() => testCTAClick(), 600);
      setTimeout(() => testScrollDepth(), 700);
      setTimeout(() => testTimeOnPage(), 800);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <Card className="fixed bottom-4 right-4 w-96 max-h-96 overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 z-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center justify-between">
          <span>🔍 Meta Pixel Test Panel</span>
          <Badge variant="secondary" className="text-xs">
            ID: 595201590045404
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex gap-2 mb-3 flex-wrap">
          <Button 
            onClick={runAllTests} 
            size="sm" 
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Run All Tests
          </Button>
          <Button 
            onClick={() => {
              debugFacebookPixel();
              addTestResult('Debug Report', true);
            }} 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Debug Pixel
          </Button>
          <Button 
            onClick={() => {
              testAllPixelEvents();
              addTestResult('Console Events', true);
            }} 
            size="sm" 
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Test Events
          </Button>
          <Button 
            onClick={() => {
              checkNetworkRequests();
              addTestResult('Network Check', true);
            }} 
            size="sm" 
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            Network Test
          </Button>
          <Button 
            onClick={clearResults} 
            size="sm" 
            variant="outline"
          >
            Clear
          </Button>
        </div>
        
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {testResults.length === 0 ? (
            <p className="text-xs text-gray-400">Click "Run All Tests" to start testing</p>
          ) : (
            testResults.map((result, index) => (
              <div key={index} className="text-xs font-mono">
                {result}
              </div>
            ))
          )}
        </div>
        
        <div className="text-xs text-gray-400 mt-2">
          Check Network tab for facebook.com/tr requests
        </div>
      </CardContent>
    </Card>
  );
};

export default PixelTestPanel; 