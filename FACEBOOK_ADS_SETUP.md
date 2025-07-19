# Facebook Ads Setup Guide for LeadNexio

This guide will help you set up Facebook Ads with pixel tracking and retargeting for your lead generation campaign.

## Step 1: Create Facebook Pixel

1. **Go to Facebook Business Manager**
2. **Navigate to Events Manager**
3. **Click "Connect Data Sources"**
4. **Choose "Web"**
5. **Select "Facebook Pixel"**
6. **Name your pixel**: "LeadNexio Pixel"
7. **Copy your Pixel ID**

## Step 2: Update Your Code

1. **Replace `YOUR_PIXEL_ID`** in these files:
   - `src/utils/facebookPixel.ts` (line 8)
   - `index.html` (lines 18 and 23)

2. **Your Pixel ID will look like**: `123456789012345`

## Step 3: Events Being Tracked

### **Page Views**
- ✅ Homepage visits
- ✅ Form page views

### **Engagement Events**
- ✅ Scroll depth (25%, 50%, 75%, 100%)
- ✅ Time on page (every 30 seconds)
- ✅ CTA button clicks

### **Lead Generation Events**
- ✅ Lead form views
- ✅ Form starts (when user starts typing)
- ✅ Form submissions
- ✅ WhatsApp redirects

## Step 4: Facebook Ads Campaign Setup

### **Campaign Structure**

```
Campaign: LeadNexio Lead Generation
├── Ad Set 1: Cold Audience (Broad)
├── Ad Set 2: Interest-Based Targeting
├── Ad Set 3: Retargeting - Website Visitors
├── Ad Set 4: Retargeting - Form Viewers
└── Ad Set 5: Retargeting - Form Abandoners
```

### **Ad Set 1: Cold Audience**
- **Objective**: Lead Generation
- **Targeting**: Broad (18-65, All locations)
- **Placements**: Facebook Feed, Instagram Feed
- **Budget**: $50/day

### **Ad Set 2: Interest-Based**
- **Objective**: Lead Generation
- **Targeting**: 
  - Business owners
  - Marketing professionals
  - Sales professionals
  - Entrepreneurs
- **Placements**: Facebook Feed, Instagram Feed
- **Budget**: $30/day

### **Ad Set 3: Retargeting - Website Visitors**
- **Objective**: Lead Generation
- **Custom Audience**: Website visitors (last 30 days)
- **Exclude**: Form submissions
- **Placements**: Facebook Feed, Instagram Feed
- **Budget**: $20/day

### **Ad Set 4: Retargeting - Form Viewers**
- **Objective**: Lead Generation
- **Custom Audience**: Lead form viewers (last 7 days)
- **Exclude**: Form submissions
- **Placements**: Facebook Feed, Instagram Feed
- **Budget**: $15/day

### **Ad Set 5: Retargeting - Form Abandoners**
- **Objective**: Lead Generation
- **Custom Audience**: Form starts but no submission (last 3 days)
- **Placements**: Facebook Feed, Instagram Feed
- **Budget**: $10/day

## Step 5: Custom Audiences Setup

### **Website Visitors**
1. **Go to Audiences**
2. **Create Custom Audience**
3. **Choose "Website Traffic"**
4. **Select "All website visitors"**
5. **Set retention**: 30 days

### **Form Viewers**
1. **Create Custom Audience**
2. **Choose "Website Traffic"**
3. **Select "People who visited specific pages"**
4. **Add URL**: Your form page
5. **Set retention**: 7 days

### **Form Abandoners**
1. **Create Custom Audience**
2. **Choose "Website Traffic"**
3. **Select "People who visited specific pages"**
4. **Add URL**: Your form page
5. **Exclude**: Form submission page
6. **Set retention**: 3 days

### **Lead Conversions**
1. **Create Custom Audience**
2. **Choose "Website Traffic"**
3. **Select "People who visited specific pages"**
4. **Add URL**: Form submission confirmation
5. **Set retention**: 180 days

## Step 6: Ad Creative Guidelines

### **Ad Copy Structure**
```
Headline: "Get 500M+ Verified Leads for Your Business"
Primary Text: "Transform your business with bulk lead enrichment. Get verified contact data for 500M+ profiles. Don't have leads? We can provide them. Contact us on WhatsApp to get started and watch your pipeline grow by 300%."

Call-to-Action: "Get Started"
```

### **Visual Guidelines**
- **Aspect Ratio**: 1.91:1 (Facebook) / 1:1 (Instagram)
- **Text Overlay**: Keep under 20% of image
- **Brand Colors**: Purple/pink gradient
- **Logo**: Include LeadNexio logo

## Step 7: Conversion Tracking

### **Events to Track**
1. **Lead**: Form submissions
2. **Contact**: WhatsApp redirects
3. **ViewContent**: Page engagement
4. **CustomizeProduct**: CTA clicks

### **Conversion Values**
- **Lead**: $10 (adjust based on your lead value)
- **Contact**: $5
- **ViewContent**: $1

## Step 8: Optimization Strategy

### **Week 1-2: Testing Phase**
- Test different audiences
- Test different ad creatives
- Monitor performance metrics

### **Week 3-4: Optimization Phase**
- Scale winning ad sets
- Pause underperforming ads
- Optimize for lead conversions

### **Week 5+: Scaling Phase**
- Increase budgets on winners
- Create lookalike audiences
- Expand to new placements

## Step 9: Performance Monitoring

### **Key Metrics to Track**
- **Cost per Lead (CPL)**: Target < $20
- **Click-Through Rate (CTR)**: Target > 1%
- **Conversion Rate**: Target > 2%
- **Return on Ad Spend (ROAS)**: Target > 3x

### **Daily Monitoring**
- Check Facebook Ads Manager
- Monitor Google Sheets for new leads
- Track WhatsApp engagement

## Step 10: A/B Testing

### **Test Variables**
1. **Audience**: Broad vs Interest-based
2. **Creative**: Different images/videos
3. **Copy**: Different headlines/descriptions
4. **Placements**: Facebook vs Instagram

### **Testing Schedule**
- Run tests for 7-14 days
- Use statistical significance
- Scale winners, pause losers

## Troubleshooting

### **Common Issues**
1. **Pixel not firing**: Check browser console
2. **Events not tracking**: Verify pixel ID
3. **Low conversion rate**: Optimize landing page
4. **High CPL**: Test different audiences

### **Support Resources**
- Facebook Business Help Center
- Facebook Ads Manager
- Google Analytics (for additional insights)

## Next Steps

1. **Set up your Facebook Pixel**
2. **Create your ad campaigns**
3. **Set up custom audiences**
4. **Launch and monitor**
5. **Optimize based on performance**

Your LeadNexio lead generation system is now ready for Facebook Ads with full pixel tracking and retargeting capabilities! 🚀 