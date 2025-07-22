#!/bin/bash

# Build script for Vercel deployment
echo "Building Lead City MFB website..."

# Install dependencies
npm install

# Build client for Vercel
echo "Building client..."
vite build --outDir dist/public

# Copy assets to public directory for Vercel static serving
echo "Setting up static assets..."
mkdir -p public
cp -r attached_assets/* public/

echo "Build complete!"