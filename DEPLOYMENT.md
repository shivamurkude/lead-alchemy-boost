# Deployment Guide for LeadNexio

This guide will help you deploy your React.js application to GitHub Pages and configure a custom domain.

## Prerequisites

- A GitHub account
- Your React.js project pushed to GitHub
- A custom domain (optional)

## Step 1: Enable GitHub Pages

1. Go to your GitHub repository: https://github.com/shivamurkude/lead-alchemy-boost
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. This will use the workflow we created in `.github/workflows/deploy.yml`

## Step 2: Deploy Your Application

1. Push your changes to the main branch:
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment configuration"
   git push origin main
   ```

2. The GitHub Actions workflow will automatically:
   - Build your React application
   - Deploy it to GitHub Pages
   - Make it available at: `https://shivamurkude.github.io/lead-alchemy-boost/`

3. You can monitor the deployment progress in the **Actions** tab of your repository.

## Step 3: Configure Custom Domain (Optional)

### Option A: Using a Subdomain (e.g., www.yourdomain.com)

1. **Update CNAME file**:
   - Edit `public/CNAME` and replace `your-custom-domain.com` with your actual domain
   - For example: `www.yourdomain.com`

2. **Configure DNS with your domain provider**:
   - Add a CNAME record:
     - **Name**: `www` (or your preferred subdomain)
     - **Value**: `shivamurkude.github.io`
     - **TTL**: 3600 (or default)

3. **Push changes**:
   ```bash
   git add public/CNAME
   git commit -m "Update CNAME for custom domain"
   git push origin main
   ```

### Option B: Using Apex Domain (e.g., yourdomain.com)

1. **Update CNAME file**:
   - Edit `public/CNAME` and replace with your apex domain
   - For example: `yourdomain.com`

2. **Configure DNS with your domain provider**:
   - Add A records:
     - **Name**: `@` (or leave empty for apex domain)
     - **Value**: `185.199.108.153`
     - **TTL**: 3600
   - Add another A record:
     - **Name**: `@` (or leave empty for apex domain)
     - **Value**: `185.199.109.153`
     - **TTL**: 3600
   - Add another A record:
     - **Name**: `@` (or leave empty for apex domain)
     - **Value**: `185.199.110.153`
     - **TTL**: 3600
   - Add another A record:
     - **Name**: `@` (or leave empty for apex domain)
     - **Value**: `185.199.111.153`
     - **TTL**: 3600

3. **Push changes**:
   ```bash
   git add public/CNAME
   git commit -m "Update CNAME for apex domain"
   git push origin main
   ```

## Step 4: Enable HTTPS (Automatic)

GitHub Pages automatically provides HTTPS for custom domains. Once your DNS is configured correctly, HTTPS will be enabled automatically.

## Step 5: Verify Deployment

1. Wait for DNS propagation (can take up to 24 hours)
2. Visit your custom domain to verify it's working
3. Check that HTTPS is working correctly

## Troubleshooting

### Common Issues:

1. **404 Errors on Direct Navigation**:
   - The SPA routing scripts in `index.html` and `404.html` should handle this
   - Make sure both files are in the correct locations

2. **DNS Not Resolving**:
   - Check your DNS configuration with your domain provider
   - Use tools like `nslookup` or `dig` to verify DNS propagation
   - Wait up to 24 hours for full propagation

3. **Build Failures**:
   - Check the GitHub Actions tab for build errors
   - Ensure all dependencies are properly installed
   - Verify the Node.js version in the workflow

4. **Custom Domain Not Working**:
   - Verify the CNAME file is in the `public/` directory
   - Check that GitHub Pages settings show your custom domain
   - Ensure DNS records are correctly configured

### Useful Commands:

```bash
# Check DNS propagation
nslookup yourdomain.com
dig yourdomain.com

# Test local build
npm run build
npm run preview

# Force rebuild and deploy
git commit --allow-empty -m "Trigger rebuild"
git push origin main
```

## Security Considerations

1. **HTTPS**: Always use HTTPS for production sites
2. **Environment Variables**: Don't commit sensitive data to your repository
3. **Dependencies**: Regularly update your dependencies for security patches

## Performance Optimization

1. **Build Optimization**: The Vite build process optimizes your assets automatically
2. **Caching**: GitHub Pages provides good caching by default
3. **CDN**: GitHub Pages uses a global CDN for fast loading

## Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Verify your DNS configuration
3. Consult GitHub Pages documentation
4. Check the troubleshooting section above

Your site should now be live at your custom domain with automatic HTTPS and continuous deployment from your main branch! 