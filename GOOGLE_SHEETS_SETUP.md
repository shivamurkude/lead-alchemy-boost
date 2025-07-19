# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for the LeadNexio contact form.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "LeadNexio Contact Form Submissions"
4. Copy the spreadsheet ID from the URL (it's the long string between `/d/` and `/edit`)

## Step 2: Set Up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the content from `google-apps-script.js`
4. Replace `YOUR_SPREADSHEET_ID_HERE` with your actual spreadsheet ID
5. Save the project with a name like "LeadNexio Contact Form Handler"

## Step 3: Deploy the Web App

1. Click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set the following:
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. Click "Deploy"
5. Copy the Web App URL (you'll need this for the React app)

## Step 4: Set Up Spreadsheet Headers

1. In your Google Apps Script editor, run the `setupSpreadsheet()` function once
2. This will create the proper headers in your spreadsheet

## Step 5: Update the React App

1. Open `src/components/ContactForm.tsx`
2. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your actual Web App URL
3. The URL should look like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`

## Step 6: Test the Integration

1. Deploy your React app
2. Fill out the contact form
3. Check your Google Sheet to see if the data is being saved

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your Google Apps Script is deployed as a web app with "Anyone" access
2. **Spreadsheet Not Found**: Double-check your spreadsheet ID
3. **Permission Denied**: Ensure the script has permission to access your spreadsheet

### Testing the Web App URL:

You can test your web app URL by visiting it in a browser. You should see:
"LeadNexio Contact Form API is running"

### Manual Testing:

You can test the form submission manually using curl:
```bash
curl -X POST "YOUR_WEB_APP_URL" \
  -d "name=Test User" \
  -d "email=test@example.com" \
  -d "phone=1234567890" \
  -d "purpose=Testing the form"
```

## Security Considerations

1. **Rate Limiting**: Consider adding rate limiting to prevent spam
2. **Validation**: The form includes client-side validation, but you may want to add server-side validation
3. **Data Privacy**: Ensure compliance with data protection regulations

## Spreadsheet Structure

Your spreadsheet will have the following columns:
- Timestamp (ISO)
- Name
- Email
- Phone
- Purpose
- Submission Date (IST)

## Next Steps

Once everything is set up:
1. Test the complete flow
2. Monitor your spreadsheet for new submissions
3. Set up email notifications if needed
4. Consider adding analytics tracking 