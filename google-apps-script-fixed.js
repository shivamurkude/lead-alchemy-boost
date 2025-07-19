// Google Apps Script for LeadNexio Contact Form - FIXED VERSION
// Deploy this as a web app to handle form submissions

function doPost(e) {
  // Set CORS headers for all origins
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
    'Access-Control-Max-Age': '86400'
  };
  
  try {
    // Get the form data
    const formData = e.parameter;
    const name = formData.name || 'N/A';
    const email = formData.email || 'N/A';
    const phone = formData.phone || 'N/A';
    const purpose = formData.purpose || 'N/A';
    const timestamp = formData.timestamp || new Date().toISOString();
    
    // Get the active spreadsheet - REPLACE WITH YOUR SPREADSHEET ID
    const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Add the data to the spreadsheet
    const rowData = [
      timestamp,
      name,
      email,
      phone,
      purpose,
      new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    ];
    
    sheet.appendRow(rowData);
    
    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Data saved successfully',
        data: { name, email, phone, purpose, timestamp }
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
      
  } catch (error) {
    // Return error response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        message: 'Error saving data: ' + error.toString(),
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }
}

function doGet(e) {
  // Handle GET requests with CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
    'Access-Control-Max-Age': '86400'
  };
  
  return ContentService
    .createTextOutput('LeadNexio Contact Form API is running')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(headers);
}

function doOptions(e) {
  // Handle preflight OPTIONS requests
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
    'Access-Control-Max-Age': '86400'
  };
  
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(headers);
}

// Function to set up the spreadsheet headers (run this once)
function setupSpreadsheet() {
  // REPLACE WITH YOUR SPREADSHEET ID
  const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE';
  const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
  
  // Set headers
  const headers = [
    'Timestamp (ISO)',
    'Name',
    'Email',
    'Phone',
    'Purpose',
    'Submission Date (IST)'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#f3f4f6')
    .setBorder(true, true, true, true, true, true);
    
  console.log('Spreadsheet headers set up successfully!');
} 