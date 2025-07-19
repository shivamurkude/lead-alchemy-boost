// Test script for Google Apps Script
// Run this in your browser console to test the web app

async function testGoogleScript() {
  const scriptURL = 'YOUR_NEW_WEB_APP_URL_HERE'; // Replace with your actual URL
  
  // Test data
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    purpose: 'Testing the form',
    timestamp: new Date().toISOString()
  };
  
  // Create FormData
  const formData = new FormData();
  formData.append('name', testData.name);
  formData.append('email', testData.email);
  formData.append('phone', testData.phone);
  formData.append('purpose', testData.purpose);
  formData.append('timestamp', testData.timestamp);
  
  try {
    console.log('Testing Google Apps Script...');
    console.log('URL:', scriptURL);
    console.log('Data:', testData);
    
    const response = await fetch(scriptURL, {
      method: 'POST',
      body: formData,
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    const result = await response.text();
    console.log('Response body:', result);
    
    if (response.ok) {
      console.log('✅ Test successful!');
    } else {
      console.log('❌ Test failed!');
    }
    
  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

// Run the test
testGoogleScript(); 