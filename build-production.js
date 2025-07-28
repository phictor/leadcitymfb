#!/usr/bin/env node

/**
 * Production build script that removes all development traces
 * and creates a clean, secure deployment package
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🔒 Starting secure production build...');

// Step 1: Set production environment
process.env.NODE_ENV = 'production';

// Step 2: Clean previous builds
console.log('🧹 Cleaning previous builds...');
try {
  fs.rmSync('./dist', { recursive: true, force: true });
} catch (e) {
  // Directory might not exist
}

// Step 3: Build frontend with Vite
console.log('⚛️ Building React frontend...');
execSync('npm run build', { stdio: 'inherit' });

// Step 4: Build backend with esbuild
console.log('🖥️ Building Express backend...');
execSync('npm run build:server', { stdio: 'inherit' });

// Step 5: Remove development files from dist
console.log('🔧 Removing development traces...');
const filesToRemove = [
  './dist/public/.vite',
  './dist/public/src',
  './dist/public/node_modules',
];

filesToRemove.forEach(file => {
  try {
    fs.rmSync(file, { recursive: true, force: true });
  } catch (e) {
    // File might not exist
  }
});

// Step 6: Clean HTML file of development comments
console.log('🧽 Cleaning HTML file...');
const htmlPath = './dist/public/index.html';
if (fs.existsSync(htmlPath)) {
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  // Remove comments
  html = html.replace(/<!--[\s\S]*?-->/g, '');
  
  // Remove empty lines
  html = html.replace(/^\s*[\r\n]/gm, '');
  
  // Minify inline scripts (basic)
  html = html.replace(/\s+/g, ' ').trim();
  
  fs.writeFileSync(htmlPath, html);
}

// Step 7: Create deployment info
console.log('📋 Creating deployment info...');
const deploymentInfo = {
  name: 'Lead City Microfinance Bank',
  version: '1.0.0',
  built: new Date().toISOString(),
  platform: 'LCMFB Web Platform',
  environment: 'production'
};

fs.writeFileSync('./dist/deployment.json', JSON.stringify(deploymentInfo, null, 2));

// Step 8: Copy necessary static files
console.log('📁 Copying static assets...');
if (fs.existsSync('./attached_assets')) {
  fs.cpSync('./attached_assets', './dist/attached_assets', { recursive: true });
}

// Step 9: Create production package.json
console.log('📦 Creating production package.json...');
const prodPackageJson = {
  name: 'leadcity-mfb-production',
  version: '1.0.0',
  description: 'Lead City Microfinance Bank - Production Build',
  main: 'index.js',
  scripts: {
    start: 'node index.js'
  },
  dependencies: {
    // Only include production dependencies
    express: '^4.18.2'
  },
  engines: {
    node: '>=18.0.0'
  }
};

fs.writeFileSync('./dist/package.json', JSON.stringify(prodPackageJson, null, 2));

console.log('✅ Production build complete!');
console.log('📁 Build output: ./dist/');
console.log('🚀 Ready for deployment with:');
console.log('   cd dist && npm install --production && npm start');