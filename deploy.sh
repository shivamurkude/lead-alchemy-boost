#!/bin/bash

# Build the project
npm run build

# Create gh-pages branch if it doesn't exist
git checkout -b gh-pages 2>/dev/null || git checkout gh-pages

# Remove all files except .git
git rm -rf . || true

# Copy built files to root
cp -r dist/* .

# Add all files
git add .

# Commit
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
git push origin gh-pages --force

# Go back to main branch
git checkout main

echo "Deployment completed! Check your GitHub Pages settings." 