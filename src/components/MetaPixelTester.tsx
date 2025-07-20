import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

interface TestResult {
  test: string;
  status: 'success' | 'error' | 'warning' | 'info';
  message: string;
  details?: any;
}

const MetaPixelTester = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [networkRequests, setNetworkRequests] = useState<string[]>([]);

  const addResult = (test: string, status: TestResult['status'], message: string, details?: any) => {
    setTestResults(prev => [...prev, { test, status, message, details }]);
  };

  const clearResults = () => {
    setTestResults([]);
    setNetworkRequests([]);
  };

  // Test 1: Check if fbq exists
  const testPixelExistence = (): boolean => {
    try {
      if (typeof window === 'undefined') {
        addResult('Pixel Environment', 'error', 'Not in browser environment');
        return false;
      }

      if (typeof window.fbq === 'undefined') {
        addResult('Pixel Function', 'error', 'fbq function is undefined - Pixel not loaded');
        return false;
      }

      addResult('Pixel Function', 'success', 'fbq function exists');
      return true;
    } catch (error) {
      addResult('Pixel Function', 'error', `Error checking fbq: ${error}`);
      return false;
    }
  };

  // Test 2: Check pixel loading status
  const testPixelLoading = (): boolean => {
    try {
      if (!window.fbq) {
        addResult('Pixel Loading', 'error', 'fbq not available');
        return false;
      }

      const loaded = window.fbq.loaded;
      const version = window.fbq.version;
      const queueLength = window.fbq.queue ? window.fbq.queue.length : 0;

      addResult('Pixel Loading', 'success', `Pixel loaded: ${loaded}, Version: ${version}, Queue: ${queueLength}`, {
        loaded,
        version,
        queueLength
      });

      return loaded;
    } catch (error) {
      addResult('Pixel Loading', 'error', `Error checking pixel loading: ${error}`);
      return false;
    }
  };

  // Test 3: Check pixel ID
  const testPixelId = (): boolean => {
    try {
      if (!window.fbq) {
        addResult('Pixel ID', 'error', 'fbq not available');
        return false;
      }

      const pixelId = window.fbq('get', 'pixelId');
      const expectedId = '595201590045404';

      if (pixelId === expectedId) {
        addResult('Pixel ID', 'success', `Correct Pixel ID: ${pixelId}`);
        return true;
      } else if (pixelId) {
        addResult('Pixel ID', 'warning', `Pixel ID mismatch. Expected: ${expectedId}, Got: ${pixelId}`);
        return false;
      } else {
        addResult('Pixel ID', 'error', 'Pixel ID is undefined - Pixel may not be fully initialized');
        return false;
      }
    } catch (error) {
      addResult('Pixel ID', 'error', `Error checking pixel ID: ${error}`);
      return false;
    }
  };

  // Test 4: Test network connectivity
  const testNetworkConnectivity = async (): Promise<boolean> => {
    try {
      const response = await fetch('https://connect.facebook.net/en_US/fbevents.js', { 
        method: 'HEAD',
        mode: 'no-cors'
      });
      addResult('Network Connectivity', 'success', 'Facebook CDN is accessible');
      return true;
    } catch (error) {
      addResult('Network Connectivity', 'error', 'Cannot access Facebook CDN - Check ad blocker or network', error);
      return false;
    }
  };

  // Test 5: Test event firing
  const testEventFiring = (): boolean => {
    try {
      if (!window.fbq) {
        addResult('Event Firing', 'error', 'fbq not available');
        return false;
      }

      // Test PageView
      window.fbq('track', 'PageView');
      addResult('Event Firing - PageView', 'success', 'PageView event fired successfully');

      // Test Lead event
      window.fbq('track', 'Lead', {
        content_name: 'Test Lead',
        value: 10.00,
        currency: 'USD',
        content_category: 'Lead Generation'
      });
      addResult('Event Firing - Lead', 'success', 'Lead event fired successfully');

      // Test CTA click
      window.fbq('track', 'CustomizeProduct', {
        content_name: 'Test CTA',
        content_category: 'CTA Click'
      });
      addResult('Event Firing - CTA', 'success', 'CTA event fired successfully');

      return true;
    } catch (error) {
      addResult('Event Firing', 'error', `Error firing events: ${error}`);
      return false;
    }
  };

  // Test 6: Monitor network requests
  const setupNetworkMonitoring = () => {
    if (typeof window === 'undefined') return;

    // Create a mock XMLHttpRequest to monitor requests
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalFetch = window.fetch;

    XMLHttpRequest.prototype.open = function(method, url, ...args) {
      if (url && url.includes('facebook.com')) {
        setNetworkRequests(prev => [...prev, `XHR: ${method} ${url}`]);
      }
      return originalXHROpen.apply(this, [method, url, ...args]);
    };

    window.fetch = function(input, init) {
      const url = typeof input === 'string' ? input : input.url;
      if (url && url.includes('facebook.com')) {
        setNetworkRequests(prev => [...prev, `Fetch: ${init?.method || 'GET'} ${url}`]);
      }
      return originalFetch.apply(this, arguments);
    };

    addResult('Network Monitoring', 'info', 'Network monitoring setup - watch for facebook.com requests');
  };

  // Test 7: Check for ad blockers
  const testAdBlocker = (): boolean => {
    try {
      // Test if common ad blocker patterns are present
      const adBlockerTests = [
        'ads',
        'analytics',
        'tracking',
        'facebook',
        'google-analytics'
      ];

      const blocked = adBlockerTests.some(test => {
        try {
          const testUrl = `https://${test}.example.com/test.js`;
          const xhr = new XMLHttpRequest();
          xhr.open('GET', testUrl, false);
          xhr.send();
          return xhr.status === 0;
        } catch {
          return false;
        }
      });

      if (blocked) {
        addResult('Ad Blocker', 'warning', 'Potential ad blocker detected - may interfere with pixel');
        return false;
      } else {
        addResult('Ad Blocker', 'success', 'No obvious ad blocker interference detected');
        return true;
      }
    } catch (error) {
      addResult('Ad Blocker', 'info', 'Could not test for ad blocker');
      return true;
    }
  };

  // Run all tests
  const runAllTests = async () => {
    setIsRunning(true);
    clearResults();

    addResult('Test Suite', 'info', 'Starting comprehensive Meta Pixel diagnostics...');

    // Setup network monitoring first
    setupNetworkMonitoring();

    // Run tests in sequence
    const pixelExists = testPixelExistence();
    if (!pixelExists) {
      addResult('Test Suite', 'error', 'Pixel not found - stopping tests');
      setIsRunning(false);
      return;
    }

    const pixelLoaded = testPixelLoading();
    const pixelIdCorrect = testPixelId();
    const networkOk = await testNetworkConnectivity();
    const adBlockerOk = testAdBlocker();
    
    // Wait a moment for network requests to be captured
    setTimeout(() => {
      const eventsOk = testEventFiring();
      
      // Final summary
      const allTestsPassed = pixelExists && pixelLoaded && pixelIdCorrect && networkOk && adBlockerOk && eventsOk;
      
      if (allTestsPassed) {
        addResult('Test Suite', 'success', 'All tests passed! Your Meta Pixel should be working correctly.');
      } else {
        addResult('Test Suite', 'warning', 'Some tests failed. Check the results above for issues.');
      }

      setIsRunning(false);
    }, 1000);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info': return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'success': return 'border-green-200 bg-green-50';
      case 'error': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'info': return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <Card className="fixed bottom-4 right-4 w-96 max-h-[80vh] overflow-hidden bg-white/95 backdrop-blur-md border border-white/20 z-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center justify-between">
          <span>🔍 Meta Pixel Tester</span>
          <Badge variant="secondary" className="text-xs">
            ID: 595201590045404
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2 mb-3">
          <Button 
            onClick={runAllTests} 
            size="sm" 
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={isRunning}
          >
            {isRunning ? 'Running Tests...' : 'Run All Tests'}
          </Button>
          <Button 
            onClick={clearResults} 
            size="sm" 
            variant="outline"
          >
            Clear
          </Button>
        </div>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {testResults.length === 0 ? (
            <p className="text-xs text-gray-400">Click "Run All Tests" to start diagnostics</p>
          ) : (
            testResults.map((result, index) => (
              <Alert key={index} className={`text-xs ${getStatusColor(result.status)}`}>
                <div className="flex items-start gap-2">
                  {getStatusIcon(result.status)}
                  <div className="flex-1">
                    <AlertDescription className="font-medium">{result.test}</AlertDescription>
                    <AlertDescription className="text-xs">{result.message}</AlertDescription>
                    {result.details && (
                      <AlertDescription className="text-xs font-mono bg-white/50 p-1 rounded mt-1">
                        {JSON.stringify(result.details, null, 2)}
                      </AlertDescription>
                    )}
                  </div>
                </div>
              </Alert>
            ))
          )}
        </div>

        {networkRequests.length > 0 && (
          <div className="mt-3">
            <h4 className="text-xs font-medium mb-2">Network Requests:</h4>
            <div className="space-y-1 max-h-20 overflow-y-auto">
              {networkRequests.map((request, index) => (
                <div key={index} className="text-xs font-mono bg-gray-100 p-1 rounded">
                  {request}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-xs text-gray-400 mt-2">
          Check Network tab for facebook.com/tr requests
        </div>
      </CardContent>
    </Card>
  );
};

export default MetaPixelTester; 