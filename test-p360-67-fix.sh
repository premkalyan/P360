#!/bin/bash

# P360-67 Campaign UI Fix - Testing Script
# ========================================
# Quickly test the fixed campaigns dashboard implementation

echo "🎯 P360-67 CAMPAIGN UI FIX - TESTING SCRIPT"
echo "==========================================="
echo ""

# Check if we're in the right directory
if [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the P360 project root directory"
    echo "   Expected structure: P360/frontend/, P360/assets/, etc."
    exit 1
fi

echo "✅ Found P360 project structure"
echo ""

# Navigate to frontend directory
echo "📁 Navigating to frontend directory..."
cd frontend || {
    echo "❌ Error: Could not access frontend directory"
    exit 1
}

echo "✅ In frontend directory"
echo ""

# Check if Node.js is installed
echo "🔍 Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "   Please install Node.js 18+ from: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✅ Node.js found: $NODE_VERSION"
echo ""

# Check if npm is installed
echo "🔍 Checking npm installation..."
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed"
    exit 1
fi

NPM_VERSION=$(npm --version)
echo "✅ npm found: $NPM_VERSION"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo "   This may take a few minutes..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install dependencies"
    echo "   Please check the error messages above"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

# Start development server
echo "🚀 Starting development server..."
echo "   Server will run on: http://localhost:7600"
echo "   Campaign dashboard: http://localhost:7600/dashboard/campaigns"
echo ""
echo "🎯 EXPECTED RESULT:"
echo "   ✅ Figma 'general - workspace' layout"
echo "   ✅ Dark sidebar with Pipeline360 branding" 
echo "   ✅ Campaign management interface"
echo "   ✅ Statistics cards and campaign table"
echo "   ✅ Responsive design matching Figma"
echo ""
echo "📋 TO VERIFY FIX:"
echo "   1. Compare with Figma 'general - workspace' frame"
echo "   2. Check sidebar matches Figma sidebar component"
echo "   3. Verify campaign stats and table layout"
echo "   4. Test responsive behavior"
echo ""
echo "Press Ctrl+C to stop the server when done testing"
echo ""

# Start the development server
npm run dev
