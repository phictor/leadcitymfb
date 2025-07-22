#!/bin/bash

# Build script for Vercel deployment
echo "Building Lead City MFB website..."

# Install dependencies
npm install

# Build client
echo "Building client..."
vite build --outDir dist/public

# Copy attached assets to build directory
echo "Copying assets..."
mkdir -p dist/public/attached_assets
cp -r attached_assets/* dist/public/attached_assets/

echo "Build complete!"