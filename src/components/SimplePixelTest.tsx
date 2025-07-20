import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SimplePixelTest = () => {
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testPixel = () => {
    setTestResults([]);
    
    // Test 1: Check if fbq exists
    if (typeof window !== 'undefined' && window.fbq) {
      addResult('✅ fbq function exists');
      
      // Test 2: Check if pixel is loaded
      if (window.fbq.loaded) {
        addResult('✅ Pixel is loaded');
        
        // Test 3: Try to fire a simple event
        try {
          window.fbq('track', 'PageView');
          addResult('✅ PageView event fired');
          
          // Test 4: Fire a Lead event
          window.fbq('track', 'Lead', {
            content_name: 'Test Lead',
            value: 10.00,
            currency: 'USD'
          });
          addResult('✅ Lead event fired');
          
          addResult('🎉 All tests passed! Check Network tab for facebook.com/tr requests');
          
        } catch (error) {
          addResult(`❌ Error firing events: ${error}`);
        }
      } else {
        addResult('❌ Pixel is not loaded');
      }
    } else {
      addResult('❌ fbq function not found');
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <Card className="fixed top-4 right-4 w-80 bg-white/95 backdrop-blur-md border border-white/20 z-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">🔍 Simple Pixel Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Button onClick={testPixel} size="sm" className="bg-green-600 hover:bg-green-700">
            Test Pixel
          </Button>
          <Button onClick={clearResults} size="sm" variant="outline">
            Clear
          </Button>
        </div>
        
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {testResults.length === 0 ? (
            <p className="text-xs text-gray-400">Click "Test Pixel" to start</p>
          ) : (
            testResults.map((result, index) => (
              <div key={index} className="text-xs font-mono">
                {result}
              </div>
            ))
          )}
        </div>
        
        <div className="text-xs text-gray-400">
          After testing, check Network tab for facebook.com/tr requests
        </div>
      </CardContent>
    </Card>
  );
};

export default SimplePixelTest; 