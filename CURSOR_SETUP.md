# P360 Cursor Development Setup Guide
## Enterprise SDLC with MCP Integration

This guide helps developers set up their Cursor IDE with all P360 integrations and follow our SDLC process.

## 🚀 Quick Start

### 1. Prerequisites
```bash
# Ensure you have these tools installed:
- Cursor IDE (latest version)
- Docker & Docker Compose
- Node.js 18+ 
- Git
- GitHub CLI (gh)
```

### 2. Environment Setup
```bash
# Clone the repository
git clone https://github.com/premkalyan/P360.git
cd P360

# Copy environment variables
cp .env.example .env

# Update .env with your configurations:
# - FIGMA_FILE_KEY
# - FIGMA_NODE_ID  
# - JIRA credentials
# - Confluence credentials
```

### 3. MCP Integration Setup
The `.cursorrules` file automatically configures MCP integrations for:
- **JIRA**: Story management and tracking
- **Confluence**: Documentation management
- **Figma**: Design system integration
- **Kiwi-TCMS**: Test management

## 📋 SDLC Workflow with Cursor

### Step 1: Find Your Story
```typescript
// Use Cursor's MCP integration to search JIRA
// Type in chat: "Search for JIRA stories related to campaign dashboard"
// Cursor will automatically use: mcp_jira-orengrinker_search_issues
```

### Step 2: Start Development
```bash
# Create feature branch (Cursor will validate naming)
git checkout -b feature/P360-67-campaign-configuration-ui

# Cursor automatically:
# ✅ Validates branch naming convention
# ✅ Checks for existing JIRA story
# ✅ Transitions story to "In Progress"
```

### Step 3: Implement with AI Assistance
```typescript
// Cursor AI is configured to:
// ✅ Follow P360 component patterns
// ✅ Generate tests automatically
// ✅ Respect Figma design specifications
// ✅ Include proper documentation

// Example prompt:
"Create a CampaignCard component based on P360-67 requirements"
// Cursor will:
// 1. Check JIRA story details via MCP
// 2. Get Figma design specs via MCP
// 3. Generate component with tests
// 4. Follow P360 coding standards
```

### Step 4: Testing Integration
```typescript
// Cursor automatically ensures:
// ✅ Unit tests for every component
// ✅ Integration tests for workflows
// ✅ Test cases mapped to Kiwi-TCMS
// ✅ 90%+ code coverage

// Test files are auto-generated following patterns:
// ComponentName.test.tsx
// PageName.integration.test.tsx
```

### Step 5: Documentation
```typescript
// Cursor AI generates:
// ✅ JSDoc comments for all functions
// ✅ Component usage examples
// ✅ README updates
// ✅ Confluence page updates via MCP
```

### Step 6: PR Creation
```bash
# Cursor validates before PR creation:
# ✅ All tests passing
# ✅ No linting errors  
# ✅ JIRA story updated
# ✅ Documentation complete

# Create PR with generated template
gh pr create --title "P360-67: Campaign Configuration UI"
# Cursor auto-generates comprehensive PR description
```

## 🎯 Cursor AI Prompts for P360

### JIRA Integration
```
"Show me details for P360-67"
→ Uses mcp_jira-orengrinker_get_issue_details

"Update P360-67 with implementation progress"
→ Uses mcp_jira-orengrinker_add_comment

"Find all active campaign-related stories"
→ Uses mcp_jira-orengrinker_search_issues
```

### Figma Integration
```
"Get the latest campaign dashboard design from Figma"
→ Uses mcp_figma-mcp_get_figma_data

"Generate P360 theme tokens from Figma"
→ Uses mcp_figma-mcp_figma_tokens_to_p360_theme

"Create React component from Figma design"
→ Uses mcp_figma-mcp_figma_component_to_p360_mapping
```

### Testing & Quality
```
"Generate comprehensive tests for CampaignCard component"
→ Creates unit + integration tests following P360 patterns

"Check code coverage and suggest improvements"
→ Analyzes test coverage and suggests additional test cases

"Review this code for accessibility compliance"
→ Checks WCAG 2.1 AA compliance
```

### Documentation
```
"Create Confluence documentation for this feature"
→ Uses mcp_confluence-mcp_confluence_create_page

"Update the component library documentation"
→ Generates JSDoc and usage examples

"Create user guide for campaign management"
→ Creates comprehensive user documentation
```

## 🛠️ Cursor Configuration Benefits

### Automatic Code Quality
- **Linting**: ESLint + TypeScript strict mode
- **Formatting**: Prettier with P360 config
- **Testing**: Jest + React Testing Library + Playwright
- **Accessibility**: Automated WCAG compliance checking

### Smart AI Assistance
- **Context-Aware**: Knows current JIRA story context
- **Design-Driven**: Uses Figma specs for implementation  
- **Test-Driven**: Generates tests alongside code
- **Documentation-First**: Creates docs as you code

### SDLC Enforcement  
- **Story Tracking**: Can't code without JIRA story
- **Branch Validation**: Enforces naming conventions
- **Commit Standards**: Validates commit message format
- **PR Requirements**: Ensures all criteria met before merge

## 🔧 Troubleshooting

### MCP Connection Issues
```bash
# Check MCP server status
cursor --mcp-status

# Restart MCP servers  
cursor --mcp-restart

# Verify credentials in .env file
```

### Figma Integration Problems
```bash
# Update FIGMA_NODE_ID in .env
# Check browser for updated node ID
# Use smart-figma-fetch.js for automatic fallback
```

### JIRA Integration Issues
```bash
# Verify JIRA credentials
# Check network connectivity
# Ensure proper permissions for story updates
```

## 📊 Development Metrics

Cursor tracks and reports:
- **SDLC Compliance**: % of work following proper workflow
- **Test Coverage**: Real-time coverage metrics
- **Code Quality**: Automated quality scores
- **Performance**: Bundle size and load time tracking
- **Accessibility**: WCAG compliance percentage

## 🎨 Design System Integration

### Component Generation
```typescript
// Cursor AI prompt:
"Create a P360 button component with these Figma specs"

// Generated code follows:
// ✅ P360 design tokens
// ✅ TypeScript interfaces  
// ✅ Accessibility standards
// ✅ Responsive design
// ✅ Theme integration
```

### Theme Management
```typescript
// Automatic theme token extraction:
// Cursor uses Figma MCP to generate:
// - colors.ts
// - typography.ts  
// - spacing.ts
// - component-tokens.ts
```

## 🚀 Advanced Features

### Bulk Operations
```typescript
// Cursor can handle:
"Update all campaign components to use new design tokens"
"Generate tests for all components in the campaigns folder"  
"Create documentation for all API endpoints"
```

### Cross-Tool Integration
```typescript
// Single prompt handles multiple tools:
"Implement P360-67, create tests, update documentation, and prepare for PR"

// Cursor orchestrates:
// 1. JIRA story details (MCP)
// 2. Figma design specs (MCP)  
// 3. Code implementation
// 4. Test generation
// 5. Documentation updates (MCP)
// 6. JIRA progress updates (MCP)
```

## 📋 Onboarding Checklist

- [ ] Cursor IDE installed with latest version
- [ ] P360 repository cloned and `.env` configured
- [ ] MCP servers connected (JIRA, Confluence, Figma, Kiwi-TCMS)
- [ ] Docker environment running (`docker-compose.simple.yml`)
- [ ] GitHub CLI configured for PR creation
- [ ] First JIRA story identified and transitioned to "In Progress"
- [ ] First component implemented following .cursorrules
- [ ] Test suite running successfully
- [ ] PR created with auto-generated template

## 🎯 Success Criteria

You know the setup is working when:
- ✅ Cursor AI can access JIRA story details
- ✅ Figma designs are automatically retrieved  
- ✅ Components generate with tests and documentation
- ✅ SDLC workflow is enforced automatically
- ✅ Code quality gates pass before commits
- ✅ PRs are created with comprehensive descriptions

---

**Ready to build enterprise-grade features with P360's integrated development environment!** 🚀

For support, check the `documentation/` folder or create a ticket in JIRA.
