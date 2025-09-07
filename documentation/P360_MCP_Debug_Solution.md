# P360 MCP Debug Solution - STDIO Connection Issues

## 🚨 **PROBLEM IDENTIFIED**

**Root Cause**: Environment variable conflicts between Cursor MCP config and individual MCP server .env files

**Symptoms**:
- All MCP servers show "No tools or prompts" in Cursor
- STDIO MCP tools not available in conversation
- MCP processes running but not exposing tools properly

---

## ✅ **SOLUTION STEPS**

### **Step 1: Fix Confluence MCP Environment Variables**

**Current Mismatch**:
- Cursor config: `"CONFLUENCE_USERNAME": "prem.kalyan@bounteous.com"`  
- Server .env: `CONFLUENCE_USERNAME=premkalyan@bounteous.com`
- Different API tokens in each config

**Fix**:
```bash
# Update confluence MCP server .env file
cd /Users/premkalyan/code/Prometheus/mcp-servers/MCP-for-agents/confluence-mcp

# Edit .env file to match Cursor config exactly:
cat > .env << 'EOF'
# Confluence Configuration - Match Cursor MCP Config
CONFLUENCE_URL=https://bounteous.jira.com/wiki
CONFLUENCE_USERNAME=prem.kalyan@bounteous.com
CONFLUENCE_API_TOKEN=your_confluence_api_token_here
LOG_LEVEL=INFO

# Testing space
TESTING_SPACE_KEY=P360
CONFLUENCE_SPACES_FILTER=P360
USE_HTTP_TRANSPORT=false
EOF
```

### **Step 2: Verify JIRA MCP Configuration**

**Check current JIRA config**:
```bash
cd /Users/premkalyan/code/Prometheus/mcp-servers/MCP-for-agents/jira-mcp-oren

# JIRA uses compiled version, check if environment is passed correctly
# Environment should match Cursor mcp.json:
# JIRA_BASE_URL=https://bounteous.jira.com
# JIRA_EMAIL=prem.kalyan@bounteous.com  
# JIRA_API_TOKEN=ATATT3xFfGF0bDl9OH... (from Cursor config)
```

### **Step 3: Kill Existing MCP Processes**

**Clean up conflicting processes**:
```bash
# Kill all existing MCP processes (they have wrong environment)
pkill -f "confluence-mcp"
pkill -f "jira.*oren"
pkill -f "mcp-server-redis"  # Too many instances running

# Clean up redis processes (only need 1-2)
ps aux | grep "mcp-server-redis" | grep -v grep | awk '{print $2}' | head -20 | xargs kill
```

### **Step 4: Restart Cursor Completely**

**Important**: Cursor needs to be fully restarted to:
1. Reload MCP configuration from `~/.cursor/mcp.json`
2. Start fresh MCP server processes with correct environment
3. Re-establish STDIO connections

**Steps**:
1. Quit Cursor completely (Cmd+Q)
2. Wait 10 seconds for all processes to terminate
3. Relaunch Cursor
4. Check MCP Tools panel - should show tools now

---

## 🧪 **VERIFICATION STEPS**

### **After Cursor Restart - Test STDIO Access**

**Expected Working Tools**:
```javascript
// Confluence MCP Tools (should work)
confluence-mcp_confluence_get_spaces()
confluence-mcp_confluence_search()
confluence-mcp_create_page()
confluence-mcp_upload_document()

// JIRA MCP Tools (should work)  
jira-orengrinker_jira_get_projects()
jira-orengrinker_create_issue()
jira-orengrinker_bulk_create_issues()
jira-orengrinker_create_sprint()
```

### **Success Criteria**:
- ✅ MCP servers show actual tool names (not "No tools or prompts")
- ✅ STDIO MCP tools available in conversation
- ✅ Can test Confluence: `get_spaces`, `search`, `get_page`
- ✅ Can test JIRA: `get_projects`, `search_issues`

---

## 📊 **PROCESS MONITORING**

### **Check Running MCP Processes After Restart**:
```bash
# Should see these processes running:
ps aux | grep -E "(confluence-mcp|jira.*oren|github.*official)"

# Expected output:
# - 1-2 confluence-mcp processes 
# - 1-2 jira-orengrinker processes
# - 1-2 github-official processes
# - Reasonable number of redis processes (not 40+)
```

---

## 🎯 **NEXT STEPS AFTER FIX**

### **Once MCP Tools Are Working**:

1. **Test P360 Confluence Space Access**:
   - Verify can access P360 space (ID: 264468349222988)
   - Test page creation and content management
   - Confirm JIRA integration works

2. **Implement P1+P2+P3 Confluence Tools**:
   - Template management (P1)
   - Macro & JIRA integration (P2)  
   - Content organization (P3)

3. **Continue P360 Content Migration**:
   - Create documentation structure in Confluence
   - Link to JIRA stories (P360-1 through P360-26)
   - Set up templates and workflows

---

## 🚨 **IF STILL NOT WORKING AFTER RESTART**

### **Advanced Debugging**:

```bash
# Test individual MCP servers manually:
cd /Users/premkalyan/code/Prometheus/mcp-servers/MCP-for-agents/confluence-mcp
CONFLUENCE_URL="https://bounteous.jira.com/wiki" \
CONFLUENCE_USERNAME="prem.kalyan@bounteous.com" \
CONFLUENCE_API_TOKEN="your_confluence_api_token_here" \
LOG_LEVEL="INFO" \
node src/index.js

# Should see:
# "ConfluenceClient initialized with URL: https://bounteous.jira.com/wiki" (not undefined)
# "Starting Confluence MCP Server with stdio transport"
# "Confluence MCP Server started successfully"
```

### **Check Cursor Logs**:
- Look for MCP connection errors in Cursor developer console
- Check for permission issues or Node.js path problems

**This should resolve the MCP STDIO connection issues and restore tool availability!** 🚀


