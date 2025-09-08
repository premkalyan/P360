#!/usr/bin/env node

/**
 * P360 - Complete Figma Assets Fetcher
 * Downloads all screens, components, and images from Figma
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load environment variables
require('dotenv').config();

const FIGMA_API_KEY = process.env.FIGMA_API_KEY;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;
const ASSETS_DIR = path.join(__dirname, '..', 'figma_assets');

if (!FIGMA_API_KEY || !FIGMA_FILE_KEY) {
  console.error('❌ Missing FIGMA_API_KEY or FIGMA_FILE_KEY in .env file');
  process.exit(1);
}

// Ensure assets directory exists
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

/**
 * Make API call to Figma
 */
function figmaRequest(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.figma.com',
      port: 443,
      path: endpoint,
      method: 'GET',
      headers: {
        'X-Figma-Token': FIGMA_API_KEY,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          if (res.statusCode === 200) {
            resolve(jsonData);
          } else {
            reject(new Error(`API Error ${res.statusCode}: ${jsonData.err || jsonData.message}`));
          }
        } catch (error) {
          reject(new Error(`Parse Error: ${error.message}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * Download image from URL
 */
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Clean up
      reject(err);
    });
  });
}

/**
 * Recursively traverse Figma nodes
 */
function traverseNodes(node, depth = 0, parentPath = '') {
  const indent = '  '.repeat(depth);
  const results = [];
  
  // Create path for this node
  const currentPath = parentPath ? `${parentPath}/${node.name}` : node.name;
  
  console.log(`${indent}📄 ${node.type}: ${node.name} (ID: ${node.id})`);
  
  // Store node information
  const nodeInfo = {
    id: node.id,
    name: node.name,
    type: node.type,
    path: currentPath,
    depth: depth,
    children: []
  };

  // Add type-specific information
  if (node.type === 'FRAME' || node.type === 'COMPONENT') {
    nodeInfo.width = node.absoluteBoundingBox?.width;
    nodeInfo.height = node.absoluteBoundingBox?.height;
  }

  if (node.type === 'TEXT') {
    nodeInfo.characters = node.characters;
    nodeInfo.style = node.style;
  }

  if (node.fills && node.fills.length > 0) {
    nodeInfo.fills = node.fills;
    // Check for images in fills
    node.fills.forEach((fill, index) => {
      if (fill.type === 'IMAGE' && fill.imageRef) {
        nodeInfo.hasImage = true;
        nodeInfo.imageRef = fill.imageRef;
      }
    });
  }

  results.push(nodeInfo);

  // Traverse children
  if (node.children) {
    node.children.forEach(child => {
      const childResults = traverseNodes(child, depth + 1, currentPath);
      nodeInfo.children.push(...childResults);
      results.push(...childResults);
    });
  }

  return results;
}

/**
 * Main function
 */
async function main() {
  console.log('🎨 P360 Figma Assets Fetcher');
  console.log('📁 File Key:', FIGMA_FILE_KEY);
  console.log('💾 Assets Directory:', ASSETS_DIR);
  console.log();

  try {
    // 1. Get file information
    console.log('1️⃣ Fetching file information...');
    const fileData = await figmaRequest(`/v1/files/${FIGMA_FILE_KEY}`);
    
    console.log(`📄 Document: ${fileData.document.name}`);
    console.log(`👤 Last Modified: ${fileData.lastModified}`);
    console.log(`🎨 Version: ${fileData.version}`);
    console.log();

    // 2. Traverse and catalog all nodes
    console.log('2️⃣ Cataloging all nodes...');
    const allNodes = traverseNodes(fileData.document);
    
    // Save complete node structure
    const nodeStructure = {
      timestamp: Date.now(),
      fileKey: FIGMA_FILE_KEY,
      fileName: fileData.document.name,
      version: fileData.version,
      lastModified: fileData.lastModified,
      nodes: allNodes
    };
    
    fs.writeFileSync(
      path.join(ASSETS_DIR, 'figma-structure.json'),
      JSON.stringify(nodeStructure, null, 2)
    );
    
    console.log(`\n📊 Found ${allNodes.length} total nodes`);

    // 3. Extract screens and components
    const screens = allNodes.filter(node => 
      node.type === 'FRAME' && 
      node.depth <= 2 && 
      (node.name.toLowerCase().includes('screen') ||
       node.name.toLowerCase().includes('page') ||
       node.name.toLowerCase().includes('dashboard'))
    );
    
    const components = allNodes.filter(node => 
      node.type === 'COMPONENT' || 
      (node.type === 'FRAME' && 
       (node.name.toLowerCase().includes('card') ||
        node.name.toLowerCase().includes('button') ||
        node.name.toLowerCase().includes('form')))
    );
    
    const imagesNodes = allNodes.filter(node => node.hasImage);
    
    console.log(`🖼️  Found ${screens.length} screens`);
    console.log(`🧩 Found ${components.length} components`);
    console.log(`🖼️  Found ${imagesNodes.length} image nodes`);
    console.log();

    // 4. Get exportable images
    if (screens.length > 0 || components.length > 0 || imagesNodes.length > 0) {
      console.log('3️⃣ Getting exportable images...');
      
      const exportableNodes = [
        ...screens.map(n => ({ ...n, category: 'screens' })),
        ...components.map(n => ({ ...n, category: 'components' })),
        ...imagesNodes.map(n => ({ ...n, category: 'images' }))
      ];
      
      const nodeIds = exportableNodes.map(n => n.id).join(',');
      
      try {
        const images = await figmaRequest(`/v1/images/${FIGMA_FILE_KEY}?ids=${nodeIds}&format=png&scale=2`);
        
        if (images.images) {
          console.log(`📥 Found ${Object.keys(images.images).length} exportable images`);
          
          // 5. Download all images
          console.log('4️⃣ Downloading images...');
          
          for (const [nodeId, imageUrl] of Object.entries(images.images)) {
            if (imageUrl) {
              const nodeInfo = exportableNodes.find(n => n.id === nodeId);
              const category = nodeInfo?.category || 'misc';
              
              // Create category directory
              const categoryDir = path.join(ASSETS_DIR, category);
              if (!fs.existsSync(categoryDir)) {
                fs.mkdirSync(categoryDir, { recursive: true });
              }
              
              // Safe filename
              const safeName = nodeInfo.name
                .replace(/[^a-zA-Z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .toLowerCase();
              
              const filename = `${safeName}-${nodeId}.png`;
              const filepath = path.join(categoryDir, filename);
              
              try {
                await downloadImage(imageUrl, filepath);
                console.log(`  ✅ Downloaded: ${category}/${filename}`);
              } catch (error) {
                console.log(`  ❌ Failed: ${category}/${filename} - ${error.message}`);
              }
            }
          }
        }
      } catch (error) {
        console.log(`⚠️  Image export failed: ${error.message}`);
      }
    }

    // 6. Create inventory
    console.log('\n5️⃣ Creating inventory...');
    const inventory = {
      timestamp: Date.now(),
      fileKey: FIGMA_FILE_KEY,
      fileName: fileData.document.name,
      summary: {
        totalNodes: allNodes.length,
        screens: screens.length,
        components: components.length,
        images: imagesNodes.length
      },
      screens: screens.map(s => ({
        id: s.id,
        name: s.name,
        path: s.path,
        width: s.width,
        height: s.height
      })),
      components: components.map(c => ({
        id: c.id,
        name: c.name,
        path: c.path,
        width: c.width,
        height: c.height
      })),
      images: imagesNodes.map(i => ({
        id: i.id,
        name: i.name,
        path: i.path,
        imageRef: i.imageRef
      }))
    };
    
    fs.writeFileSync(
      path.join(ASSETS_DIR, 'inventory.json'),
      JSON.stringify(inventory, null, 2)
    );
    
    console.log('✅ Inventory saved to inventory.json');
    
    // 7. Create README
    const readme = `# P360 Figma Assets

Generated: ${new Date().toISOString()}
File: ${fileData.document.name}
Version: ${fileData.version}

## Summary
- **Total Nodes**: ${allNodes.length}
- **Screens**: ${screens.length}
- **Components**: ${components.length}
- **Images**: ${imagesNodes.length}

## Structure
\`\`\`
figma_assets/
├── screens/          # Page layouts and full screens
├── components/       # Reusable UI components  
├── images/          # Image assets and icons
├── figma-structure.json  # Complete node structure
├── inventory.json   # Asset inventory
└── README.md       # This file
\`\`\`

## Screens
${screens.map(s => `- **${s.name}** (${s.width}x${s.height}) - \`${s.id}\``).join('\n')}

## Components  
${components.map(c => `- **${c.name}** (${c.width}x${c.height}) - \`${c.id}\``).join('\n')}

## Usage
Use these assets with the P360 Figma MCP tools:
- \`mcp_figma-mcp_get_figma_data\` - Get design specifications
- \`mcp_figma-mcp_figma_component_to_p360_mapping\` - Generate React components
- \`mcp_figma-mcp_figma_tokens_to_p360_theme\` - Extract design tokens

For development, reference the node IDs in your .env file:
\`\`\`
FIGMA_FILE_KEY=${FIGMA_FILE_KEY}
FIGMA_NODE_ID=<specific-node-id>
\`\`\`
`;
    
    fs.writeFileSync(path.join(ASSETS_DIR, 'README.md'), readme);
    
    console.log('\n🎉 SUCCESS! All Figma assets fetched and organized.');
    console.log(`📁 Check the '${path.relative(process.cwd(), ASSETS_DIR)}' folder for all assets.`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main().catch(console.error);

