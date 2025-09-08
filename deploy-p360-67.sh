#!/bin/bash

# P360-67 Docker Deployment Script
# ================================
# Deploy the fixed campaigns UI in Docker for testing
# Includes complete P360 stack with database and cache

set -e  # Exit on any error

echo "🚀 P360-67 DOCKER DEPLOYMENT"
echo "============================="
echo ""
echo "Deploying P360 with FIXED campaigns UI (P360-67)"
echo "Target: localhost:7600/dashboard/campaigns"
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
print_status "Checking prerequisites..."

# Check if Docker is installed and running
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed or not in PATH"
    echo "Please install Docker from: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! docker info &> /dev/null; then
    print_error "Docker is not running"
    echo "Please start Docker Desktop or Docker daemon"
    exit 1
fi

print_success "Docker is installed and running"

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    print_error "Docker Compose is not available"
    echo "Please install Docker Compose"
    exit 1
fi

# Use docker compose or docker-compose based on availability
if docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
else
    COMPOSE_CMD="docker-compose"
fi

print_success "Docker Compose is available: $COMPOSE_CMD"

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ]; then
    print_error "docker-compose.yml not found"
    echo "Please run this script from the P360 project root directory"
    exit 1
fi

if [ ! -d "frontend" ]; then
    print_error "frontend directory not found"
    echo "Please ensure the frontend directory exists with the fixed P360-67 implementation"
    exit 1
fi

print_success "Found P360 project structure"

# Clean up any existing containers
print_status "Cleaning up existing containers..."
$COMPOSE_CMD down --remove-orphans --volumes 2>/dev/null || true
print_success "Cleanup completed"

# Remove any existing images (optional - uncomment to force rebuild)
# print_status "Removing existing images..."
# docker rmi p360_frontend 2>/dev/null || true

# Build and start services
print_status "Building and starting P360 services..."
echo "This may take a few minutes on first run..."

# Build the services
$COMPOSE_CMD build --no-cache frontend

if [ $? -ne 0 ]; then
    print_error "Failed to build P360 services"
    exit 1
fi

print_success "P360 services built successfully"

# Start the services
print_status "Starting P360 services..."
$COMPOSE_CMD up -d

if [ $? -ne 0 ]; then
    print_error "Failed to start P360 services"
    exit 1
fi

print_success "P360 services started successfully"

# Wait for services to be ready
print_status "Waiting for services to be ready..."

# Function to wait for a service to be healthy
wait_for_service() {
    local service_name=$1
    local max_attempts=30
    local attempt=1
    
    print_status "Waiting for $service_name to be ready..."
    
    while [ $attempt -le $max_attempts ]; do
        if $COMPOSE_CMD ps $service_name | grep -q "healthy\|Up"; then
            print_success "$service_name is ready"
            return 0
        fi
        
        echo -n "."
        sleep 2
        ((attempt++))
    done
    
    print_warning "$service_name may not be fully ready yet"
    return 1
}

# Wait for database
wait_for_service postgres

# Wait for cache
wait_for_service redis

# Wait for frontend (most important for P360-67 testing)
print_status "Waiting for frontend to be ready..."
sleep 10  # Give frontend time to build and start

# Check if frontend is accessible
for i in {1..30}; do
    if curl -f http://localhost:7600 &> /dev/null; then
        print_success "Frontend is accessible at http://localhost:7600"
        break
    fi
    
    if [ $i -eq 30 ]; then
        print_warning "Frontend may not be ready yet, but continuing..."
        break
    fi
    
    echo -n "."
    sleep 2
done

echo ""

# Display service status
print_status "Service Status:"
$COMPOSE_CMD ps

echo ""

# Display important information
print_success "🎉 P360-67 DEPLOYMENT COMPLETE!"
echo ""
echo "📊 ACCESS INFORMATION:"
echo "======================================================"
echo "🎯 Fixed Campaigns UI: http://localhost:7600/dashboard/campaigns"
echo "🏠 Frontend Homepage:  http://localhost:7600"
echo "🗄️  Database:          localhost:5432 (p360_prod/p360_user/p360_pass)"
echo "⚡ Redis Cache:        localhost:6379 (password: p360_redis_pass)"
echo "🔧 Backend API:        localhost:3001 (placeholder)"
echo ""
echo "📋 TESTING P360-67:"
echo "======================================================"
echo "✅ Campaign dashboard with Figma design compliance"
echo "✅ Dark sidebar with Pipeline360 branding"  
echo "✅ Campaign statistics and performance metrics"
echo "✅ Campaign table with status indicators"
echo "✅ Action buttons and responsive design"
echo ""
echo "📈 SAMPLE DATA:"
echo "======================================================"
echo "Demo campaigns are pre-loaded for testing:"
echo "• Summer Sale 2024 (Active - $15,000 budget)"
echo "• Brand Awareness Q3 (Active - $25,000 budget)"  
echo "• Product Launch (Paused - $8,000 budget)"
echo ""
echo "🔍 VERIFICATION STEPS:"
echo "======================================================"
echo "1. Open: http://localhost:7600/dashboard/campaigns"
echo "2. Compare with Figma 'general - workspace' frame"
echo "3. Verify sidebar navigation and campaign interface"
echo "4. Check responsive design on different screen sizes"
echo "5. Test campaign actions and status indicators"
echo ""

# Show logs for any failing services
print_status "Checking for any service issues..."
if $COMPOSE_CMD ps --services --filter status=exited | grep -q .; then
    print_warning "Some services may have issues. Showing recent logs:"
    $COMPOSE_CMD logs --tail=20
else
    print_success "All services are running normally"
fi

echo ""
echo "🛠️  MANAGEMENT COMMANDS:"
echo "======================================================"
echo "View logs:           $COMPOSE_CMD logs -f"
echo "View frontend logs:  $COMPOSE_CMD logs -f frontend"
echo "Restart services:    $COMPOSE_CMD restart"
echo "Stop services:       $COMPOSE_CMD down"
echo "Rebuild & restart:   $COMPOSE_CMD up -d --build"
echo ""

# Final check
if curl -f http://localhost:7600/dashboard/campaigns &> /dev/null; then
    print_success "✅ P360-67 campaigns UI is accessible and ready for testing!"
else
    print_warning "⚠️  Frontend may still be starting up. Please wait a moment and try again."
    echo "   If issues persist, check logs with: $COMPOSE_CMD logs frontend"
fi

echo ""
print_success "🚀 Ready to test P360-67 fixed campaigns UI!"
echo "   Visit: http://localhost:7600/dashboard/campaigns"
