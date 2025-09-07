#!/usr/bin/env node

/**
 * Figma Data Manager - Handles automatic fallback for stale node IDs
 * Prevents manual refresh requirement by implementing smart fallback strategies
 */

const fs = require('fs');
const path = require('path');

class FigmaDataManager {
    constructor() {
        this.envPath = path.join(process.cwd(), '.env');
        this.cacheDir = path.join(process.cwd(), '.figma-cache');
        this.ensureCacheDir();
    }

    ensureCacheDir() {
        if (!fs.existsSync(this.cacheDir)) {
            fs.mkdirSync(this.cacheDir, { recursive: true });
        }
    }

    readEnvFile() {
        if (!fs.existsSync(this.envPath)) {
            throw new Error('.env file not found');
        }
        
        const envContent = fs.readFileSync(this.envPath, 'utf8');
        const envVars = {};
        
        envContent.split('\n').forEach(line => {
            if (line.includes('=') && !line.startsWith('#')) {
                const [key, value] = line.split('=');
                envVars[key.trim()] = value.trim().replace(/['"]/g, '');
            }
        });
        
        return envVars;
    }

    updateEnvFile(key, value) {
        const envContent = fs.readFileSync(this.envPath, 'utf8');
        const lines = envContent.split('\n');
        
        let updated = false;
        const newLines = lines.map(line => {
            if (line.startsWith(`${key}=`)) {
                updated = true;
                return `${key}=${value}`;
            }
            return line;
        });
        
        if (!updated) {
            newLines.push(`${key}=${value}`);
        }
        
        fs.writeFileSync(this.envPath, newLines.join('\n'));
        console.log(`✅ Updated ${key} in .env file`);
    }

    async getFigmaData(fileKey, nodeId = null, retryCount = 0) {
        try {
            console.log(`🎨 Fetching Figma data for file: ${fileKey}`);
            
            if (nodeId) {
                console.log(`📍 Using node ID: ${nodeId}`);
            } else {
                console.log(`📄 Fetching entire file (no specific node)`);
            }

            // Try with specific node ID first
            if (nodeId) {
                try {
                    const result = await this.callFigmaMCP(fileKey, nodeId);
                    this.cacheResult(fileKey, nodeId, result);
                    return result;
                } catch (nodeError) {
                    console.warn(`⚠️ Node ID ${nodeId} failed: ${nodeError.message}`);
                    
                    // If node ID fails, try file-level access
                    if (retryCount === 0) {
                        console.log(`🔄 Retrying with file-level access...`);
                        return await this.getFigmaData(fileKey, null, 1);
                    }
                }
            }

            // File-level access (fallback)
            const result = await this.callFigmaMCP(fileKey, null);
            
            // Auto-discover and cache useful node IDs from the result
            this.autoDiscoverNodes(result);
            this.cacheResult(fileKey, null, result);
            
            return result;

        } catch (error) {
            console.error(`❌ Figma MCP failed: ${error.message}`);
            
            // Try cached version as last resort
            const cached = this.getCachedResult(fileKey, nodeId);
            if (cached) {
                console.log(`💾 Using cached result (may be outdated)`);
                return cached;
            }
            
            throw error;
        }
    }

    async callFigmaMCP(fileKey, nodeId) {
        // This would be replaced with actual MCP call in real implementation
        // For now, return a mock structure
        console.log(`🔌 MCP Call: fileKey=${fileKey}, nodeId=${nodeId || 'entire-file'}`);
        
        // In real implementation, this would be:
        // return await mcpFigmaGetData({ fileKey, nodeId });
        
        throw new Error("Implement actual MCP call here");
    }

    autoDiscoverNodes(figmaData) {
        if (!figmaData || !figmaData.document) return;

        const discoveredNodes = [];
        
        // Recursively find all nodes with useful IDs
        const traverse = (node, path = []) => {
            if (node.id && node.name) {
                discoveredNodes.push({
                    id: node.id,
                    name: node.name,
                    type: node.type,
                    path: [...path, node.name].join(' > ')
                });
            }
            
            if (node.children) {
                node.children.forEach(child => 
                    traverse(child, [...path, node.name || 'Root'])
                );
            }
        };

        traverse(figmaData.document);

        // Cache discovered nodes
        this.cacheDiscoveredNodes(discoveredNodes);
        
        console.log(`🔍 Auto-discovered ${discoveredNodes.length} nodes`);
        return discoveredNodes;
    }

    cacheResult(fileKey, nodeId, data) {
        const cacheKey = `${fileKey}_${nodeId || 'full'}.json`;
        const cachePath = path.join(this.cacheDir, cacheKey);
        
        const cacheData = {
            timestamp: Date.now(),
            fileKey,
            nodeId,
            data
        };
        
        fs.writeFileSync(cachePath, JSON.stringify(cacheData, null, 2));
        console.log(`💾 Cached result: ${cacheKey}`);
    }

    getCachedResult(fileKey, nodeId) {
        const cacheKey = `${fileKey}_${nodeId || 'full'}.json`;
        const cachePath = path.join(this.cacheDir, cacheKey);
        
        if (fs.existsSync(cachePath)) {
            try {
                const cached = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
                const age = Date.now() - cached.timestamp;
                const ageMinutes = Math.floor(age / (1000 * 60));
                
                console.log(`📋 Found cached data (${ageMinutes} minutes old)`);
                return cached.data;
            } catch (error) {
                console.warn(`⚠️ Corrupted cache file: ${cacheKey}`);
            }
        }
        
        return null;
    }

    cacheDiscoveredNodes(nodes) {
        const cachePath = path.join(this.cacheDir, 'discovered_nodes.json');
        const cacheData = {
            timestamp: Date.now(),
            nodes
        };
        
        fs.writeFileSync(cachePath, JSON.stringify(cacheData, null, 2));
    }

    getDiscoveredNodes() {
        const cachePath = path.join(this.cacheDir, 'discovered_nodes.json');
        
        if (fs.existsSync(cachePath)) {
            try {
                const cached = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
                return cached.nodes || [];
            } catch (error) {
                console.warn(`⚠️ Could not read discovered nodes cache`);
            }
        }
        
        return [];
    }

    listAvailableNodes() {
        const nodes = this.getDiscoveredNodes();
        
        if (nodes.length === 0) {
            console.log(`📭 No discovered nodes. Run getFigmaData() first.`);
            return;
        }
        
        console.log(`\n📋 Available Nodes (${nodes.length}):`);
        console.log(`${'='=50}`);
        
        nodes.forEach((node, index) => {
            console.log(`${index + 1}. ${node.name} (${node.type})`);
            console.log(`   ID: ${node.id}`);
            console.log(`   Path: ${node.path}`);
            console.log('');
        });
    }

    // CLI interface
    async runCLI() {
        const args = process.argv.slice(2);
        const command = args[0];
        
        switch (command) {
            case 'fetch':
                const env = this.readEnvFile();
                const fileKey = env.FIGMA_FILE_KEY;
                const nodeId = env.FIGMA_NODE_ID;
                
                if (!fileKey) {
                    console.error('❌ FIGMA_FILE_KEY not found in .env');
                    process.exit(1);
                }
                
                await this.getFigmaData(fileKey, nodeId);
                break;
                
            case 'list':
                this.listAvailableNodes();
                break;
                
            case 'cache':
                console.log(`📁 Cache directory: ${this.cacheDir}`);
                const files = fs.readdirSync(this.cacheDir);
                console.log(`📦 Cached files: ${files.length}`);
                files.forEach(file => console.log(`   - ${file}`));
                break;
                
            default:
                console.log(`
🎨 Figma Data Manager

Usage:
  node scripts/figma-data-manager.js <command>

Commands:
  fetch   - Fetch Figma data with smart fallback
  list    - List discovered nodes from cache  
  cache   - Show cache information

Examples:
  node scripts/figma-data-manager.js fetch
  node scripts/figma-data-manager.js list
                `);
        }
    }
}

// CLI execution
if (require.main === module) {
    const manager = new FigmaDataManager();
    manager.runCLI().catch(error => {
        console.error(`💥 Error: ${error.message}`);
        process.exit(1);
    });
}

module.exports = FigmaDataManager;
