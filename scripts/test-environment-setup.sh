#!/bin/bash

# P360 Test Environment Setup and Verification Script
# Sets up and verifies the 6700 test environment for CI/CD

set -e

echo "🚀 P360 Test Environment Setup - Port 6700 Range"
echo "=================================================="

# Environment Configuration
export NODE_ENV=test
export JWT_SECRET=test-secret-key-for-ci

echo "📋 Current Environment Status:"
echo "- Local Dev: http://localhost:6600 (should be running separately)"
echo "- Stable: http://localhost:6500 (production Docker)"
echo "- Test: http://localhost:6700 (CI test environment)"

echo ""
echo "🧹 Cleaning up any existing test containers..."
docker compose -f docker-compose.yml -f docker-compose.test.yml down --remove-orphans 2>/dev/null || true

echo ""
echo "🔧 Starting Test Environment Services..."
echo "JWT_SECRET=test-secret-key" > .env.test
docker compose -f docker-compose.yml -f docker-compose.test.yml up -d --build

echo ""
echo "⏳ Waiting for services to be ready..."
echo "   Frontend: http://localhost:6700"
echo "   Backend:  http://localhost:6701"

# Wait for frontend (macOS-compatible)
echo -n "   Waiting for frontend (6700)..."
for i in {1..60}; do
  if curl -s http://localhost:6700 > /dev/null 2>&1; then
    echo " ✅"
    break
  fi
  if [ $i -eq 60 ]; then
    echo " ❌ TIMEOUT!"
    echo "Frontend logs:"
    docker logs p360-frontend-test
    exit 1
  fi
  echo -n "."
  sleep 2
done

# Wait for backend (macOS-compatible)
echo -n "   Waiting for backend (6701)..."
for i in {1..60}; do
  if curl -s http://localhost:6701/health > /dev/null 2>&1; then
    echo " ✅"
    break
  fi
  if [ $i -eq 60 ]; then
    echo " ❌ TIMEOUT!"
    echo "Backend logs:"
    docker logs p360-backend-test
    exit 1
  fi
  echo -n "."
  sleep 2
done

echo ""
echo "🧪 Running Test Environment Verification..."

# Test frontend accessibility
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:6700)
if [ "$FRONTEND_STATUS" = "200" ]; then
  echo "   Frontend (6700): ✅ Responding"
else
  echo "   Frontend (6700): ❌ Status $FRONTEND_STATUS"
fi

# Test backend health
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:6701/health)
if [ "$BACKEND_STATUS" = "200" ]; then
  echo "   Backend (6701): ✅ Health check passed"
else
  echo "   Backend (6701): ❌ Status $BACKEND_STATUS"
fi

# Test database connectivity
echo -n "   Database: "
if docker exec p360-backend-test npx prisma db push > /dev/null 2>&1; then
  echo "✅ Connected"
else
  echo "❌ Connection failed"
fi

echo ""
echo "🎯 Test Environment Ready for:"
echo "   - Integration Tests: npm run test:integration"
echo "   - E2E Tests: npm run test:e2e"
echo ""
echo "💻 Access URLs:"
echo "   - Frontend: http://localhost:6700"
echo "   - Backend API: http://localhost:6701"
echo "   - Health Check: http://localhost:6701/health"
echo ""
echo "🛑 To stop: docker compose -f docker-compose.yml -f docker-compose.test.yml down"
