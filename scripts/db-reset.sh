#!/bin/bash
# P360 Database Reset Script
# =========================
# Enables safe schema iterations without breaking existing components
# Follows P360 Enterprise SDLC rules

set -e

echo "🗄️ P360 Database Reset Script"
echo "=============================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Environment detection
ENV=${NODE_ENV:-development}
echo -e "${BLUE}Environment: $ENV${NC}"

# Environment-specific database names per P360 rules
case $ENV in
  "development")
    DB_NAME="p360_dev"
    BACKEND_PORT="6601"
    FRONTEND_PORT="6600"
    ;;
  "production")
    DB_NAME="p360_prod"
    BACKEND_PORT="6501"
    FRONTEND_PORT="6500"
    ;;
  "test")
    DB_NAME="p360_test"
    BACKEND_PORT="6701"
    FRONTEND_PORT="6700"
    ;;
  *)
    echo -e "${RED}❌ Unknown environment: $ENV${NC}"
    exit 1
    ;;
esac

echo -e "${YELLOW}Target Database: $DB_NAME${NC}"

# Confirmation prompt
read -p "⚠️  This will DELETE all data in $DB_NAME. Continue? (y/N): " confirm
if [[ $confirm != [yY] ]]; then
    echo -e "${YELLOW}❌ Reset cancelled by user${NC}"
    exit 0
fi

# Navigate to backend directory
cd "$(dirname "$0")/../backend"

echo -e "${BLUE}📍 Working directory: $(pwd)${NC}"

# Step 1: Drop and recreate database
echo -e "${YELLOW}🗑️  Dropping existing database...${NC}"
npm run db:reset

echo -e "${GREEN}✅ Database reset complete${NC}"

# Step 2: Run fresh migrations
echo -e "${YELLOW}🔄 Running migrations...${NC}"
npm run db:migrate

echo -e "${GREEN}✅ Migrations applied${NC}"

# Step 3: Generate Prisma client
echo -e "${YELLOW}🔧 Generating Prisma client...${NC}"
npm run db:generate

echo -e "${GREEN}✅ Prisma client generated${NC}"

# Step 4: Seed with demo data
echo -e "${YELLOW}🌱 Seeding demo data...${NC}"
npm run db:seed

echo -e "${GREEN}✅ Demo data seeded${NC}"

# Success summary
echo ""
echo -e "${GREEN}🎉 P360 Database Reset Complete!${NC}"
echo -e "${GREEN}===================================${NC}"
echo -e "${BLUE}Environment: $ENV${NC}"
echo -e "${BLUE}Database: $DB_NAME${NC}"
echo -e "${BLUE}Backend API: http://localhost:$BACKEND_PORT${NC}"
echo -e "${BLUE}Frontend: http://localhost:$FRONTEND_PORT${NC}"
echo -e "${BLUE}Demo Login: demo@p360.com / demo123${NC}"
echo ""
echo -e "${YELLOW}💡 Quick commands:${NC}"
echo -e "   ${BLUE}npm run db:studio${NC}    # Open database browser"
echo -e "   ${BLUE}npm run dev${NC}          # Start backend API"
echo -e "   ${BLUE}docker-compose up${NC}    # Start full stack"
echo ""
