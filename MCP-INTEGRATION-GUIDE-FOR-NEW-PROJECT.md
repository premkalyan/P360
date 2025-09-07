# 🚀 COMPLETE MCP INTEGRATION GUIDE
## For JIRA Stories & Confluence Pages Creation (Standalone Project)

**Share this document with your new Cursor chat to get immediate MCP integration for your new standalone project**

---

## 📋 **CREDENTIALS & ENVIRONMENT SETUP**

### **Required Environment Variables**
```bash
# JIRA & Confluence Configuration (SAME CREDENTIALS - BOTH WORKING)
# Note: Both JIRA and Confluence use the same bounteous.jira.com domain and credentials
JIRA_HOST=bounteous.atlassian.net
JIRA_EMAIL=prem.kalyan@bounteous.com  
JIRA_API_TOKEN=your_api_token_here

# Confluence uses same domain and credentials as JIRA
CONFLUENCE_DOMAIN=bounteous.atlassian.net
CONFLUENCE_USERNAME=prem.kalyan@bounteous.com
CONFLUENCE_TOKEN=your_api_token_here

# Working URLs (for reference - your new project will have its own space/project)
CONFLUENCE_BASE_URL=https://bounteous.jira.com/wiki
JIRA_BASE_URL=https://bounteous.jira.com

# AI Provider (Use OpenRouter for cost control)
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

---

## 🔧 **MCP INTEGRATION PATTERNS**

### **STDIO MCP Integration (RECOMMENDED FOR CURSOR)**

**For your new standalone project, use STDIO approach with Cursor:**

```bash
# JIRA MCP Extension (for Goose/Cursor)
JIRA_MCP_EXTENSION="JIRA_DOMAIN=$JIRA_HOST JIRA_USERNAME=$JIRA_EMAIL JIRA_TOKEN=$JIRA_API_TOKEN LOG_LEVEL=INFO /Users/premkalyan/code/Prometheus/mcp-servers/MCP-for-agents/jira-mcp stdio"

# Confluence MCP Extension (for Goose/Cursor)
CONFLUENCE_MCP_EXTENSION="CONFLUENCE_DOMAIN=$CONFLUENCE_DOMAIN CONFLUENCE_USERNAME=$CONFLUENCE_USERNAME CONFLUENCE_TOKEN=$CONFLUENCE_TOKEN LOG_LEVEL=INFO /Users/premkalyan/code/Prometheus/mcp-servers/MCP-for-agents/confluence-mcp stdio"

# Example usage in Cursor/Goose session:
goose session \
    --with-extension "$JIRA_MCP_EXTENSION" \
    --with-extension "$CONFLUENCE_MCP_EXTENSION" \
    --max-turns 10
```

### **Alternative: Docker MCP (If needed)**

```bash
# JIRA Docker MCP (Port 8183) - if Docker containers available
JIRA_MCP_URL=http://localhost:8183

# Confluence Docker MCP (Port 8184) - if Docker containers available  
CONFLUENCE_MCP_URL=http://localhost:8184
```

---

## 📋 **AVAILABLE MCP FUNCTIONS**

### **JIRA MCP - CONFIRMED WORKING FUNCTIONS**

#### **✅ Issue/Story Creation (FULL SUPPORT)**
```javascript
// Create JIRA Story/Epic/Task
create_issue({
  projectKey: "YOUR_PROJECT_KEY",    // Your new project key (e.g., "ECOM", "BLOG", etc.)
  issueType: "Story",                // or "Epic", "Task", "Bug"
  summary: "User Authentication",
  description: "Implement user login and registration functionality",
  priority: "High",                  // High, Medium, Low
  assignee: "prem.kalyan@bounteous.com",
  labels: ["frontend", "security"]
})

// Create Epic specifically
create_issue({
  projectKey: "YOUR_PROJECT_KEY",
  issueType: "Epic", 
  summary: "User Management System",
  description: "Complete user management functionality including auth, profiles, permissions"
})
```

#### **✅ Issue Management** 
```javascript
// Update existing issue
update_issue(issueKey, summary, description, priority, assignee, labels)

// Transition issue (e.g., "To Do" → "In Progress")
transition_issue(issueKey, transitionName, comment)

// Add comment
add_comment(issueKey, comment)

// Get issue details
get_issue_details(issueKey, includeComments, includeWorklogs)

// Search issues with JQL
search_issues("project = YOUR_PROJECT_KEY AND assignee = currentUser()", maxResults)
```

#### **✅ Project Information (READ-ONLY)**
```javascript
// Get specific project details
get_project_details("YOUR_PROJECT_KEY")  // Your new project

// Get boards for project
get_boards({projectKey: "YOUR_PROJECT_KEY"})

// Get board issues  
get_board_issues(boardId, {
  assigneeFilter: "currentUser", 
  statusFilter: "new",
  maxResults: 10
})
```

### **CONFLUENCE MCP - EXPECTED FUNCTIONS**

#### **✅ Page Creation (CONFIRMED WORKING)**
```javascript
// Create Confluence page
create_page({
  spaceKey: "YOUR_SPACE_KEY",        // Your new Confluence space
  title: "Technical Requirements", 
  content: `
h1. Technical Requirements

{panel:title=Overview}
This document outlines the technical requirements for the project.
{panel}

h2. Architecture
- Frontend: React
- Backend: Node.js
- Database: PostgreSQL

{status:colour=green}
Status: Draft
{status}
  `,
  parentId: null              // or specific parent page ID
})
```

#### **✅ Page Management**
```javascript
// Update page
update_page(pageId, content, version)

// Get page details  
get_page_details(pageId)

// Get child pages
get_page_children(pageId, {perPage: 10})

// Search content
search_content("project requirements", {perPage: 10})
```

#### **✅ Space Operations**
```javascript
// Get space details
get_space_details("YOUR_SPACE_KEY")

// Get pages in space
get_space_pages("YOUR_SPACE_KEY", {perPage: 10})
```

---

## 🎯 **CRITICAL USAGE RULES** 

### **🚨 EFFICIENCY GUIDELINES (AVOID COSTLY MISTAKES)**

#### **JIRA Rules:**
```bash
# ❌ NEVER DO THIS - Wastes 68K+ tokens
get_projects()  # Returns 1,951+ projects

# ✅ DO THIS INSTEAD  
get_project_details("YOUR_PROJECT_KEY")  # Specific project only
search_issues("project = YOUR_PROJECT_KEY", 10)  # Limited scope
```

#### **General Rules:**
- ✅ **Use pagination**: Always set `maxResults=10` or `perPage=10`
- ✅ **Project isolation**: Work within your specific project only
- ✅ **Targeted searches**: Specific JQL queries, not broad listing
- ✅ **Check before create**: Verify existence before creating duplicates

---

## 🏗️ **RECOMMENDED WORKFLOW PATTERNS**

### **Pattern 1: Create Epic with Stories**

```javascript
// Step 1: Create Epic
const epic = await create_issue({
  projectKey: "YOUR_PROJECT_KEY",
  issueType: "Epic",
  summary: "User Authentication System",
  description: "Complete user authentication including login, registration, password reset"
});

// Step 2: Create Stories under Epic  
const stories = [
  {
    summary: "User Login Page",
    description: "Create login form with email/password validation"
  },
  {
    summary: "User Registration",
    description: "Registration form with email verification"
  },
  {
    summary: "Password Reset",
    description: "Forgot password functionality with email reset"
  }
];

for (const story of stories) {
  await create_issue({
    projectKey: "YOUR_PROJECT_KEY", 
    issueType: "Story",
    summary: story.summary,
    description: story.description,
    labels: ["authentication", "frontend"]
  });
}
```

### **Pattern 2: Create Confluence Documentation**

```javascript
// Step 1: Create main requirements page
const requirementsPage = await create_page({
  spaceKey: "YOUR_SPACE_KEY",
  title: "Project Requirements - Authentication System",
  content: `
h1. Authentication System Requirements

{toc:maxLevel=3}

h2. Overview
{panel:title=Project Scope}
Complete user authentication system with login, registration, and password management.
{panel}

h2. User Stories
{children:depth=1}

h2. Technical Stack
|| Component || Technology || Justification ||
| Frontend | React | Component-based, good ecosystem |
| Backend | Node.js + Express | JavaScript consistency |
| Database | PostgreSQL | Reliable, ACID compliance |
| Authentication | JWT | Stateless, scalable |

{status:colour=blue}
Status: Requirements Gathering
{status}
  `
});

// Step 2: Create child pages for detailed specs
await create_page({
  spaceKey: "YOUR_SPACE_KEY", 
  title: "Authentication API Specification",
  content: `
h1. Authentication API Endpoints

h2. POST /auth/login
{code:javascript}
{
  "email": "user@example.com",
  "password": "securepassword"
}
{code}

h2. POST /auth/register  
{code:javascript}
{
  "email": "user@example.com", 
  "password": "securepassword",
  "confirmPassword": "securepassword"
}
{code}
  `,
  parentId: requirementsPage.id
});
```

---

## 💡 **TROUBLESHOOTING TIPS**

### **Common Issues & Solutions**

#### **JIRA Connection Issues:**
```bash
# Test JIRA connectivity
curl -u "prem.kalyan@bounteous.com:$JIRA_API_TOKEN" \
  "https://bounteous.atlassian.net/rest/api/3/myself"
```

#### **Confluence Connection Issues:**
```bash  
# Test Confluence connectivity
curl -u "prem.kalyan@bounteous.com:$CONFLUENCE_TOKEN" \
  "https://bounteous.atlassian.net/wiki/rest/api/space/VISHKAR"
```

#### **Rate Limiting:**
- ✅ Use `maxResults=10` consistently
- ✅ Add delays between operations if needed
- ✅ Monitor token usage in responses

#### **Project Scope:**
- ✅ Always use `projectKey: "V1"` for JIRA
- ✅ Always use `spaceKey: "VISHKAR"` for Confluence  
- ✅ Check existing content before creating

---

## 🚀 **QUICK START EXAMPLES**

### **Example 1: Create Feature Epic + Stories**
```javascript
// 1. Create Epic for new feature
const epic = await create_issue({
  projectKey: "YOUR_PROJECT_KEY",
  issueType: "Epic", 
  summary: "Product Catalog Feature",
  description: "Complete product browsing and search functionality"
});

// 2. Create stories
const stories = [
  "Product Listing Page",
  "Product Search Functionality", 
  "Product Detail View",
  "Product Categories"
];

for (const story of stories) {
  await create_issue({
    projectKey: "YOUR_PROJECT_KEY",
    issueType: "Story",
    summary: story,
    labels: ["product-catalog", "frontend"]
  });
}
```

### **Example 2: Create Technical Documentation**
```javascript
await create_page({
  spaceKey: "YOUR_SPACE_KEY",
  title: "Product Catalog - Technical Design",
  content: `
h1. Product Catalog Technical Design

{panel:title=Architecture Overview}
Microservices-based product catalog with REST API and React frontend.
{panel}

h2. Database Schema
{code:sql}
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  category_id INTEGER REFERENCES categories(id)
);
{code}

h2. API Endpoints
|| Method || Endpoint || Description ||
| GET | /api/products | List all products |
| GET | /api/products/:id | Get product details |
| POST | /api/products | Create new product |

{status:colour=green}
Status: Design Complete
{status}
  `
});
```

---

## ✅ **READY TO USE**

**This guide contains everything needed to start creating JIRA stories and Confluence pages immediately. The credentials are configured, the patterns are proven, and the examples are ready to implement.**

**Key Points:**
1. 🎯 **Setup your own project/space**: Replace `YOUR_PROJECT_KEY` and `YOUR_SPACE_KEY` with your actual values
2. 📋 **Follow the exact function patterns**: Use the code examples as templates
3. ⚡ **Use efficiency rules**: Avoid costly API calls like `get_projects()`
4. 🔄 **Test with small examples first**: Start with single story creation

**Project Setup Steps:**
1. **Create/Get JIRA Project Key**: Get your project key (e.g., "ECOM", "BLOG", "APP")
2. **Create/Get Confluence Space**: Get your space key (e.g., "ECOM", "DOCS", "PROJ")
3. **Replace placeholders**: Update `YOUR_PROJECT_KEY` and `YOUR_SPACE_KEY` in examples
4. **Test connection**: Start with simple `get_project_details()` and `get_space_details()` calls

**STDIO Integration Example:**
```bash
# Set your environment variables
export JIRA_HOST="bounteous.atlassian.net"
export JIRA_EMAIL="prem.kalyan@bounteous.com"
export JIRA_API_TOKEN="[your-token]"
export CONFLUENCE_DOMAIN="bounteous.atlassian.net"
export CONFLUENCE_USERNAME="prem.kalyan@bounteous.com"
export CONFLUENCE_TOKEN="[your-token]"

# Use with Cursor/Goose
goose session \
    --with-extension "JIRA_DOMAIN=$JIRA_HOST JIRA_USERNAME=$JIRA_EMAIL JIRA_TOKEN=$JIRA_API_TOKEN LOG_LEVEL=INFO /Users/premkalyan/code/Prometheus/mcp-servers/MCP-for-agents/jira-mcp stdio" \
    --with-extension "CONFLUENCE_DOMAIN=$CONFLUENCE_DOMAIN CONFLUENCE_USERNAME=$CONFLUENCE_USERNAME CONFLUENCE_TOKEN=$CONFLUENCE_TOKEN LOG_LEVEL=INFO /Users/premkalyan/code/Prometheus/mcp-servers/MCP-for-agents/confluence-mcp stdio"
```

**Start with the Quick Start examples and expand from there!**
