#!/usr/bin/env python3
"""
P360 Figma Asset Downloader
============================
Direct Figma API integration to download assets and analyze design components.
Bypasses MCP issues and provides direct control over asset extraction.
"""

import os
import sys
import requests
import json
from pathlib import Path
from typing import Dict, List, Any, Optional
from urllib.parse import urlparse
import time
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class FigmaAssetDownloader:
    def __init__(self):
        self.api_token = os.getenv('FIGMA_API_KEY')
        self.file_key = os.getenv('FIGMA_FILE_KEY') 
        self.node_id = os.getenv('FIGMA_NODE_ID')
        
        if not self.api_token:
            raise ValueError("FIGMA_API_KEY not found in environment variables")
        if not self.file_key:
            raise ValueError("FIGMA_FILE_KEY not found in environment variables")
            
        self.base_url = "https://api.figma.com/v1"
        self.headers = {
            'X-Figma-Token': self.api_token,
            'Content-Type': 'application/json'
        }
        
        # Create output directories
        self.assets_dir = Path('assets')
        self.figma_data_dir = Path('figma_data')
        self.components_dir = Path('src/components/figma')
        
        for directory in [self.assets_dir, self.figma_data_dir, self.components_dir]:
            directory.mkdir(parents=True, exist_ok=True)
    
    def log(self, message: str):
        """Enhanced logging with timestamps"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        print(f"[{timestamp}] {message}")
    
    def make_request(self, endpoint: str) -> Optional[Dict]:
        """Make authenticated request to Figma API with error handling"""
        url = f"{self.base_url}/{endpoint}"
        
        try:
            self.log(f"Making request to: {endpoint}")
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            self.log(f"❌ Request failed: {e}")
            if hasattr(e.response, 'text'):
                self.log(f"Response: {e.response.text}")
            return None
    
    def get_file_data(self) -> Optional[Dict]:
        """Fetch complete file data from Figma"""
        self.log("🎯 FETCHING FIGMA FILE DATA...")
        
        endpoint = f"files/{self.file_key}"
        if self.node_id:
            endpoint += f"?ids={self.node_id}"
            
        data = self.make_request(endpoint)
        
        if data:
            # Save raw data for analysis
            output_file = self.figma_data_dir / f"file_data_{self.file_key}.json"
            with open(output_file, 'w') as f:
                json.dump(data, f, indent=2)
            self.log(f"✅ File data saved to: {output_file}")
            
            # Extract key information
            if 'document' in data:
                self.log(f"📄 File Name: {data.get('name', 'Unknown')}")
                self.log(f"📄 Last Modified: {data.get('lastModified', 'Unknown')}")
                self.log(f"📄 Version: {data.get('version', 'Unknown')}")
                
                # Count components and frames
                self._analyze_file_structure(data['document'])
        
        return data
    
    def _analyze_file_structure(self, document: Dict):
        """Analyze file structure and count elements"""
        components = []
        frames = []
        images = []
        
        def traverse_node(node: Dict, path: str = ""):
            current_path = f"{path}/{node.get('name', 'unnamed')}"
            node_type = node.get('type', 'unknown')
            
            if node_type == 'COMPONENT':
                components.append({
                    'id': node.get('id'),
                    'name': node.get('name'),
                    'path': current_path
                })
            elif node_type == 'FRAME':
                frames.append({
                    'id': node.get('id'),
                    'name': node.get('name'),
                    'path': current_path
                })
            elif 'fills' in node:
                # Check for image fills
                for fill in node.get('fills', []):
                    if fill.get('type') == 'IMAGE':
                        images.append({
                            'node_id': node.get('id'),
                            'name': node.get('name'),
                            'image_ref': fill.get('imageRef'),
                            'path': current_path
                        })
            
            # Recursively process children
            for child in node.get('children', []):
                traverse_node(child, current_path)
        
        traverse_node(document)
        
        # Log analysis results
        self.log(f"🔍 ANALYSIS RESULTS:")
        self.log(f"   📦 Components: {len(components)}")
        self.log(f"   🖼️  Frames: {len(frames)}")
        self.log(f"   🎨 Images: {len(images)}")
        
        # Save analysis
        analysis = {
            'components': components,
            'frames': frames,
            'images': images,
            'analyzed_at': datetime.now().isoformat()
        }
        
        analysis_file = self.figma_data_dir / f"analysis_{self.file_key}.json"
        with open(analysis_file, 'w') as f:
            json.dump(analysis, f, indent=2)
        
        self.log(f"📊 Analysis saved to: {analysis_file}")
        return analysis
    
    def get_image_assets(self, node_ids: List[str], format_type: str = "png", scale: float = 2.0) -> Optional[Dict]:
        """Download image assets for specific nodes"""
        self.log(f"🖼️  DOWNLOADING {format_type.upper()} ASSETS...")
        
        # Prepare node IDs string
        ids_param = ','.join(node_ids)
        endpoint = f"images/{self.file_key}?ids={ids_param}&format={format_type}&scale={scale}"
        
        response = self.make_request(endpoint)
        
        if response and 'images' in response:
            self.log(f"✅ Found {len(response['images'])} image URLs")
            
            # Download each image
            downloaded_count = 0
            for node_id, image_url in response['images'].items():
                if image_url:
                    success = self._download_image(image_url, node_id, format_type)
                    if success:
                        downloaded_count += 1
                        
            self.log(f"📥 Successfully downloaded {downloaded_count} images")
            
            # Save image manifest
            manifest_file = self.figma_data_dir / f"images_manifest_{format_type}.json"
            with open(manifest_file, 'w') as f:
                json.dump(response, f, indent=2)
                
        return response
    
    def _download_image(self, image_url: str, node_id: str, format_type: str) -> bool:
        """Download individual image file"""
        try:
            self.log(f"📥 Downloading {node_id}.{format_type}...")
            
            response = requests.get(image_url, stream=True)
            response.raise_for_status()
            
            # Create filename
            filename = f"{node_id}.{format_type}"
            filepath = self.assets_dir / filename
            
            # Write file
            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            
            self.log(f"✅ Saved: {filepath}")
            return True
            
        except Exception as e:
            self.log(f"❌ Failed to download {node_id}: {e}")
            return False
    
    def extract_all_image_nodes(self, file_data: Dict) -> List[str]:
        """Extract all node IDs that contain images"""
        image_nodes = []
        
        def find_image_nodes(node: Dict):
            # Check if node has image fills
            if 'fills' in node:
                for fill in node.get('fills', []):
                    if fill.get('type') == 'IMAGE':
                        image_nodes.append(node.get('id'))
                        break
            
            # Check children
            for child in node.get('children', []):
                find_image_nodes(child)
        
        if 'document' in file_data:
            find_image_nodes(file_data['document'])
        
        self.log(f"🔍 Found {len(image_nodes)} nodes with images")
        return image_nodes
    
    def download_single_asset(self, node_id: str = None) -> Dict:
        """Download a single asset for testing"""
        test_node = node_id or self.node_id or "861-20083"  # fallback
        
        self.log(f"🎯 TESTING SINGLE ASSET DOWNLOAD: {test_node}")
        
        # Download PNG version
        png_result = self.get_image_assets([test_node], "png", 2.0)
        
        # Download SVG version
        svg_result = self.get_image_assets([test_node], "svg", 1.0)
        
        return {
            'png': png_result,
            'svg': svg_result,
            'node_id': test_node
        }
    
    def download_all_assets(self) -> Dict:
        """Complete asset download workflow"""
        self.log("🚀 STARTING COMPLETE ASSET DOWNLOAD...")
        
        # Step 1: Get file data
        file_data = self.get_file_data()
        if not file_data:
            self.log("❌ Failed to get file data")
            return {"success": False, "error": "Failed to get file data"}
        
        # Step 2: Extract image nodes
        image_nodes = self.extract_all_image_nodes(file_data)
        if not image_nodes:
            self.log("⚠️  No image nodes found")
            return {"success": False, "error": "No image nodes found"}
        
        # Step 3: Download assets in batches (Figma API limits)
        batch_size = 50  # Figma API limit
        results = []
        
        for i in range(0, len(image_nodes), batch_size):
            batch = image_nodes[i:i+batch_size]
            self.log(f"📦 Processing batch {i//batch_size + 1}: {len(batch)} nodes")
            
            # Download PNG and SVG for each batch
            png_result = self.get_image_assets(batch, "png", 2.0)
            svg_result = self.get_image_assets(batch, "svg", 1.0)
            
            results.append({
                'batch': i//batch_size + 1,
                'nodes': batch,
                'png': png_result,
                'svg': svg_result
            })
            
            # Rate limiting
            time.sleep(1)
        
        self.log(f"🎉 DOWNLOAD COMPLETE! Processed {len(image_nodes)} total nodes")
        
        # Save complete results
        results_file = self.figma_data_dir / f"download_results_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(results_file, 'w') as f:
            json.dump({
                'success': True,
                'total_nodes': len(image_nodes),
                'batches': len(results),
                'results': results,
                'completed_at': datetime.now().isoformat()
            }, f, indent=2)
        
        return {
            'success': True,
            'total_nodes': len(image_nodes),
            'results': results,
            'results_file': str(results_file)
        }


def main():
    """Main execution function"""
    print("🎨 P360 FIGMA ASSET DOWNLOADER")
    print("=" * 50)
    
    try:
        downloader = FigmaAssetDownloader()
        
        if len(sys.argv) > 1:
            command = sys.argv[1].lower()
            
            if command == "single":
                # Test with single asset
                node_id = sys.argv[2] if len(sys.argv) > 2 else None
                result = downloader.download_single_asset(node_id)
                print(f"\n✅ Single asset download result: {result}")
                
            elif command == "all":
                # Download all assets
                result = downloader.download_all_assets()
                if result['success']:
                    print(f"\n🎉 Successfully processed {result['total_nodes']} nodes!")
                else:
                    print(f"\n❌ Download failed: {result.get('error', 'Unknown error')}")
                    
            elif command == "analyze":
                # Just analyze file structure
                file_data = downloader.get_file_data()
                if file_data:
                    print("\n📊 File analysis complete!")
                else:
                    print("\n❌ Analysis failed!")
            else:
                print(f"❌ Unknown command: {command}")
                print("Available commands: single, all, analyze")
        else:
            print("📋 USAGE:")
            print("  python figma_asset_downloader.py single [node_id]  # Test single asset")
            print("  python figma_asset_downloader.py all              # Download all assets")
            print("  python figma_asset_downloader.py analyze          # Analyze file only")
            print("\n🔧 Starting with single asset test...")
            
            # Default: single asset test
            result = downloader.download_single_asset()
            print(f"\n✅ Test result: {result}")
            
    except Exception as e:
        print(f"❌ Fatal error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
