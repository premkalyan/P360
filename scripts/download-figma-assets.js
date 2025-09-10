#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Create assets directory if it doesn't exist
const assetsDir = path.join(__dirname, '..', 'frontend', 'public', 'figma-assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Extract all asset URLs from the login page
const loginPagePath = path.join(__dirname, '..', 'frontend', 'src', 'app', 'auth', 'login', 'page.tsx');
const loginPageContent = fs.readFileSync(loginPagePath, 'utf8');

// Find all localhost:3845 asset URLs
const assetUrlRegex = /"http:\/\/localhost:3845\/assets\/([^"]+)"/g;
const assets = [];
let match;

while ((match = assetUrlRegex.exec(loginPageContent)) !== null) {
  assets.push({
    url: match[0].replace(/"/g, ''),
    filename: match[1]
  });
}

console.log(`Found ${assets.length} assets to download:`);
assets.forEach(asset => console.log(`  - ${asset.filename}`));

// Function to download a file
function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(assetsDir, filename);
    const file = fs.createWriteStream(filePath);
    
    const protocol = url.startsWith('https:') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${filename}`);
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(filePath, () => {}); // Delete the file on error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Download all assets
async function downloadAllAssets() {
  console.log('\nStarting downloads...\n');
  
  for (const asset of assets) {
    try {
      await downloadFile(asset.url, asset.filename);
    } catch (error) {
      console.error(`✗ Failed to download ${asset.filename}:`, error.message);
    }
  }
  
  console.log('\n✅ Download complete!');
  console.log(`Assets saved to: ${assetsDir}`);
}

downloadAllAssets();
