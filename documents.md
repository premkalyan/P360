# P360 Project Documentation

## Project Overview
Pipeline360 (P360) is an enterprise demand-side platform (DSP) for programmatic advertising with comprehensive SDLC integration including JIRA, Confluence, Kiwi-TCMS, Git, Figma, and Docker deployment.

## Technical Stack
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **Testing**: Jest, Playwright, Kiwi-TCMS
- **Documentation**: Confluence
- **Project Management**: JIRA
- **Design**: Figma
- **Deployment**: Docker, Docker Compose
- **Infrastructure**: AWS (production)

## Project Structure
```
P360/
├── frontend/               # Next.js application
│   ├── src/
│   │   ├── app/           # Next.js App Router pages
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/          # Utility libraries
│   │   ├── types/        # TypeScript type definitions
│   │   └── utils/        # Utility functions
├── backend/               # Node.js/Express API
│   └── src/
│       ├── controllers/   # API controllers
│       ├── models/       # Data models
│       ├── routes/       # API routes
│       └── utils/        # Backend utilities
├── tests/                 # Test suites
│   ├── e2e/              # End-to-end tests
│   ├── integration/      # Integration tests
│   └── unit/             # Unit tests
├── docs/                  # Documentation
├── scripts/               # Utility scripts
├── database/             # Database scripts and migrations
└── docker-compose.yml    # Docker orchestration
```

## Figma Design System

### Current Design System Analysis (Latest)
**File**: `BBzlqwkcKFUcjLGXmJwNGU` (Pipeline360-Copy)
**Extraction Date**: January 2025

#### Components Found:
1. **Logo** (`7:2032`) - Pipeline=Dark + Color variant
   - Path: Design System/Logo/Content/logo/Pipeline=Dark + Color
2. **Sidebar** (`157:15957`) - Main navigation component
   - Path: Component/sidebar
3. **Progress Indicators** - Campaign performance visualization
   - 0-35% (`157:16846`) 
   - 36%-60% (`157:16847`)
   - 60%-100% (`157:16845`)

#### Design Tokens Extracted:
- **📊 Components**: 5 total
- **🎨 Colors**: 1,724 unique colors
- **📝 Typography**: 693 text styles
- **🏗️ Layout**: Multiple frames and design system elements

#### Key Brand Colors:
- **Primary Blue**: rgb(0, 7, 129)
- **Secondary Blue**: rgb(0, 140, 254) 
- **Purple/Violet**: rgb(133, 26, 254), rgb(141, 24, 251)
- **Accent Pink**: rgb(229, 2, 208)
- **Light Gray**: rgb(230, 230, 230)
- **White**: rgb(255, 255, 255)
- **Black**: rgb(0, 0, 0)

### Current UI Implementation vs Figma Discrepancies

#### ✅ What's Aligned:
- Basic component structure (CampaignCard, sidebar navigation)
- Color scheme (purple/violet theme: `text-violet-700`, `bg-violet-100`)
- Grid-based layouts
- Status indicators with colors

#### ❌ Major Discrepancies Identified:
1. **Icons**: Using emoji (🎯, 👁️, 🔄) instead of proper design system icons
2. **Typography**: Not using Figma's typography scale (693 styles available)
3. **Spacing**: Using arbitrary Tailwind spacing vs design system spacing tokens
4. **Brand Identity**: Logo implementation differs from Figma Pipeline logo
5. **Component Variants**: Missing design system component variants
6. **Color Precision**: Using generic Tailwind colors vs exact brand colors
7. **Layout Grid**: Not following Figma's layout grid system

## Development Commands

### Environment Setup
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials
```

### Development
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up

# Frontend only (port 3000)
cd frontend && npm run dev

# Backend only (port 3001)
cd backend && npm run dev

# Database setup
docker-compose up postgres
```

### Testing
```bash
# Run all tests
npm test

# Frontend tests
cd frontend && npm test

# Backend tests  
cd backend && npm test

# E2E tests
npm run test:e2e

# E2E tests in development mode
npm run test:e2e:dev
```

### Production Deployment
```bash
# Build and deploy
docker-compose up --build

# Simple deployment (optimized)
docker-compose -f docker-compose.simple.yml up

# Test deployment
docker-compose -f docker-compose.test.yml up
```

### Figma Integration

#### Access Methods:
1. **Smart Fetch Script**: `node scripts/smart-figma-fetch.js`
2. **Direct API**: Uses `FIGMA_API_KEY` from .env
3. **Cached Data**: Available in `figma_data/` directory
4. **Assets**: Downloaded to `assets/` directory

#### Figma File Information:
- **File Key**: `BBzlqwkcKFUcjLGXmJwNGU`
- **URL**: https://www.figma.com/design/BBzlqwkcKFUcjLGXmJwNGU/Pipeline360-Copy?node-id=861-20083
- **Current Node ID**: `861-20083`

#### Asset Management:
```bash
# Download all Figma assets
node scripts/fetch-all-figma-assets.js

# Smart fetch with fallback
node scripts/smart-figma-fetch.js

# Python asset downloader
python scripts/figma_asset_downloader.py
```

## JIRA Integration

### Project Information:
- **Project Key**: P360
- **JIRA URL**: https://bounteous.atlassian.net
- **Confluence**: https://bounteous.jira.com/wiki/spaces/P360

### Story Workflow:
1. Search existing stories
2. Get story details  
3. Transition to "In Progress"
4. Add implementation comments
5. Link PR when complete
6. Transition to "Done"

## Current Task Status

### Completed ✅
- [x] Extract design system from existing Figma JSON files
- [x] Set up comprehensive development environment
- [x] Implement basic Campaign Dashboard UI
- [x] Create CampaignCard component with performance metrics
- [x] Set up testing infrastructure (Jest, Playwright)
- [x] Docker deployment configuration

### In Progress 🔄
- [ ] Analyze Figma components and identify UI discrepancies
- [ ] Generate P360-compatible components from Figma data

### Database Migration System (P360-8) ✅
- [x] **Prisma Migration System Setup**: Converted raw SQL to Prisma migrations per P360 rules
- [x] **Environment-Specific Databases**: Configured p360_dev, p360_prod, p360_test 
- [x] **Database Reset Scripts**: Created iterative reset/rebuild capability
- [x] **Enhanced Campaign Schema**: Added tables for P360-107, 108, 109 stories
  - CampaignTemplate (multi-step wizard support)
  - CampaignAsset (asset management)
  - CampaignTargeting (enhanced audience targeting)
  - CampaignAnalytics (dashboard analytics)
  - CampaignWorkflow (creation flow tracking)
- [x] **Docker Port Compliance**: Verified P360 port architecture (6600/6601, 6500/6501, 6700/6701)

### Pending 📋
- [ ] Implement Figma design system tokens in Tailwind config
- [ ] Replace emoji icons with proper design system icons
- [ ] Align typography with Figma typography scale
- [ ] Update color palette to match exact Figma brand colors
- [ ] Implement proper logo component from Figma
- [ ] Create sidebar component matching Figma design
- [ ] Add campaign progress indicators matching Figma variants
- [ ] Implement responsive grid system from Figma
- [ ] Add proper spacing tokens from design system
- [ ] Create comprehensive component library

## Useful Paths
- **Config Files**: `.env`, `docker-compose.*.yml`, `tailwind.config.js`
- **Main App**: `frontend/src/app/page.tsx`
- **Components**: `frontend/src/components/`
- **API Routes**: `backend/src/routes/`
- **Tests**: `tests/`, `frontend/src/**/*.test.*`
- **Documentation**: `docs/`, `documentation/`
- **Scripts**: `scripts/`
- **Figma Data**: `figma_data/`, `assets/`

## Known Issues

### MCP Integration Issues:
- Figma MCP tool currently failing
- Using fallback methods: direct API, smart-fetch script, cached data

### UI/UX Gaps:
- Current implementation uses placeholder styling
- Missing proper design system integration
- Typography not following Figma scale
- Icons using emojis instead of design system
- Color values approximate rather than exact

## Next Steps Priority
1. 🎨 **Design System Integration**: Implement exact Figma design tokens
2. 🏗️ **Component Library**: Create pixel-perfect components from Figma
3. 📱 **Responsive Design**: Implement Figma's responsive grid system
4. 🎯 **Brand Alignment**: Replace all placeholder elements with brand elements
5. 🧪 **Visual Testing**: Add visual regression tests for design compliance