#!/bin/bash

# Build script for Vercel deployment
echo "Building Lead City MFB website..."

# Install dependencies
npm install

# Build client
echo "Building client..."
vite build --outDir dist/public

# Copy built files to server/public for production serving
echo "Setting up production files..."
mkdir -p server/public
cp -r dist/public/* server/public/

# Copy attached assets
echo "Copying assets..."
mkdir -p server/public/attached_assets
cp -r attached_assets/* server/public/attached_assets/

echo "Build complete!"