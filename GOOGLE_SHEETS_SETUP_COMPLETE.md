# Complete Google Sheets Setup for LeadNexio

## Step 1: Create Your Google Sheet

1. **Go to [Google Sheets](https://sheets.google.com)**
2. **Create a new spreadsheet**
3. **Name it**: "LeadNexio Contact Form Submissions"
4. **Copy the Spreadsheet ID** from the URL:
   - URL looks like: `https://docs.google.com/spreadsheets/d/1D4gKuiT2-Dhijcho26Ho9CI2t78-KvAuGmm5_2Tb3mo/edit`
   - Copy the ID: `1D4gKuiT2-Dhijcho26Ho9CI2t78-KvAuGmm5_2Tb3mo`

## Step 2: Set Up Google Apps Script

1. **Go to [Google Apps Script](https://script.google.com)**
2. **Click "New Project"**
3. **Replace the default code** with the content from `google-apps-script.js`
4. **Update the Spreadsheet ID** in the script:
   ```javascript
   const spreadsheetId = 'YOUR_ACTUAL_SPREADSHEET_ID_HERE';
   ```
5. **Save the project** with name: "LeadNexio Contact Form Handler"

## Step 3: Set Up Spreadsheet Headers

1. **In Google Apps Script editor**, click the "Run" button next to `setupSpreadsheet`
2. **Authorize the script** when prompted
3. **Check your Google Sheet** - you should see headers appear

## Step 4: Deploy as Web App

1. **Click "Deploy" → "New deployment"**
2. **Choose "Web app"**
3. **Set these options**:
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. **Click "Deploy"**
5. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/AKfycbxHYND8X206ClMLFnWtwD-n3m3Oh2F62K-jxzuvmvyadRD4K291c0h6pE0XgXiBs_4E/exec`)

## Step 5: Test the Web App

1. **Visit your Web App URL** in a browser
2. **You should see**: "LeadNexio Contact Form API is running"

## Step 6: Test Form Submission

1. **Go to your live site**: `http://www.leadnexio.com`
2. **Click "Get Started" or "Contact Us"**
3. **Fill out the form**
4. **Submit the form**
5. **Check your Google Sheet** for new data

## Troubleshooting

### If no data appears in Google Sheet:

1. **Check Google Apps Script logs**:
   - Go to Google Apps Script
   - Click "Executions" in the left sidebar
   - Look for any error messages

2. **Test the Web App manually**:
   ```bash
   curl -X POST "YOUR_WEB_APP_URL" \
     -d "name=Test User" \
     -d "email=test@example.com" \
     -d "phone=1234567890" \
     -d "purpose=Testing"
   ```

3. **Check browser console** for errors

4. **Verify spreadsheet permissions**:
   - Make sure the Google Apps Script has access to your spreadsheet
   - Try running `setupSpreadsheet()` function again

### Common Issues:

1. **"Spreadsheet not found"**: Double-check your spreadsheet ID
2. **"Permission denied"**: Make sure you're executing as "Me"
3. **"CORS errors"**: Make sure "Who has access" is set to "Anyone"

## Expected Result

After successful setup, your Google Sheet should have:
- **Headers**: Timestamp (ISO), Name, Email, Phone, Purpose, Submission Date (IST)
- **Data rows**: Each form submission creates a new row
- **Formatted headers**: Bold text with background color

## Next Steps

Once working:
1. **Set up email notifications** for new submissions
2. **Add data validation** rules
3. **Create automated responses**
4. **Set up analytics tracking** 