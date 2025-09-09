# P360 MCP Tool Management Strategy
# ====================================

## 🎯 **Cursor 80-Tool Limit Management**

**Current Status**: 29 JIRA + Confluence tools (need to optimize to 10 core tools)
**Goal**: Maintain 10 essential tools, disable 19 others for other MCP integrations

---

## 📊 **Core 10 Tools (ACTIVE)**

### **JIRA Management (5 tools)**
```typescript
✅ mcp_jira-orengrinker_search_issues       // Find stories by JQL
✅ mcp_jira-orengrinker_get_issue_details   // Get requirements
✅ mcp_jira-orengrinker_transition_issue    // Update status  
✅ mcp_jira-orengrinker_add_comment        // Progress updates
✅ mcp_jira-orengrinker_create_issue       // Create new stories
```

### **Confluence Documentation (3 tools)**
```typescript  
✅ mcp_confluence-mcp_confluence_search     // Find existing docs
✅ mcp_confluence-mcp_confluence_create_page // Create documentation
✅ mcp_confluence-mcp_confluence_update_page // Update documentation
```

### **PR Agent (2 tools)**
```typescript
✅ mcp_pr-agent-mcp_pr_complete_workflow   // Complete SDLC review (NEW)
✅ mcp_pr-agent-mcp_pr_ask                 // Interactive clarification
```

---

## 🚫 **Disabled Tools (19 tools)**

### **JIRA - Disable Advanced Features**
```typescript
❌ mcp_jira-orengrinker_get_boards          // Use search_issues instead
❌ mcp_jira-orengrinker_get_board_details   // Use search_issues instead
❌ mcp_jira-orengrinker_get_board_issues    // Use search_issues instead
❌ mcp_jira-orengrinker_update_issue        // Use transition_issue + comment
❌ mcp_jira-orengrinker_get_current_user    // Not needed for SDLC
❌ mcp_jira-orengrinker_search_users        // Not needed for SDLC
❌ mcp_jira-orengrinker_get_user_details    // Not needed for SDLC
❌ mcp_jira-orengrinker_get_projects        // Use search_issues instead
❌ mcp_jira-orengrinker_get_project_details // Use search_issues instead
❌ mcp_jira-orengrinker_add_worklog         // Use add_comment instead
❌ mcp_jira-orengrinker_get_worklogs        // Use get_issue_details instead
❌ mcp_jira-orengrinker_get_server_info     // Not needed for SDLC
```

### **JIRA - Disable Sprint/Agile Tools**  
```typescript
❌ mcp_jira-orengrinker_create_sprint       // Use external sprint planning
❌ mcp_jira-orengrinker_get_sprint_details  // Use search_issues instead
❌ mcp_jira-orengrinker_get_board_sprints   // Use search_issues instead  
❌ mcp_jira-orengrinker_move_issues_between_sprints // Manual process
❌ mcp_jira-orengrinker_get_active_sprint   // Use search_issues instead
```

### **JIRA - Disable Linking/Subtask Tools**
```typescript
❌ mcp_jira-orengrinker_link_issues         // Manual linking preferred
❌ mcp_jira-orengrinker_get_issue_links     // Use get_issue_details instead
❌ mcp_jira-orengrinker_get_dependency_tree // Manual dependency tracking
❌ mcp_jira-orengrinker_get_link_types      // Not needed for SDLC
❌ mcp_jira-orengrinker_create_subtask      // Use create_issue instead
❌ mcp_jira-orengrinker_get_subtasks        // Use search_issues instead
❌ mcp_jira-orengrinker_bulk_create_issues  // Use create_issue individually
```

### **Confluence - Disable Advanced Features**
```typescript
❌ mcp_confluence-mcp_confluence_get_spaces         // Use search instead
❌ mcp_confluence-mcp_confluence_get_space          // Use search instead
❌ mcp_confluence-mcp_confluence_get_page           // Use search instead
❌ mcp_confluence-mcp_confluence_get_page_by_title  // Use search instead
❌ mcp_confluence-mcp_confluence_upload_document    // Manual file upload
❌ mcp_confluence-mcp_confluence_update_document    // Manual file management
❌ mcp_confluence-mcp_confluence_get_page_attachments // Manual file management
❌ mcp_confluence-mcp_confluence_delete_document    // Manual file management
❌ mcp_confluence-mcp_confluence_list_documents     // Manual file management
❌ mcp_confluence-mcp_confluence_create_folder      // Manual folder creation
❌ mcp_confluence-mcp_confluence_get_folder_contents // Manual navigation
❌ mcp_confluence-mcp_confluence_create_page_template // Manual template creation
❌ mcp_confluence-mcp_confluence_get_page_templates  // Manual template management
❌ mcp_confluence-mcp_confluence_apply_page_template // Manual template usage
❌ mcp_confluence-mcp_confluence_update_page_template // Manual template updates
❌ mcp_confluence-mcp_confluence_add_page_labels     // Use update_page instead
❌ mcp_confluence-mcp_confluence_get_pages_by_label  // Use search instead
❌ mcp_confluence-mcp_confluence_update_macro        // Manual macro management
❌ mcp_confluence-mcp_confluence_get_page_macros     // Manual macro management
❌ mcp_confluence-mcp_confluence_link_page_to_jira_issue // Manual linking
❌ mcp_confluence-mcp_confluence_insert_jira_macro   // Manual macro insertion
❌ mcp_confluence-mcp_confluence_move_page_to_parent // Manual page organization
❌ mcp_confluence-mcp_confluence_get_page_children   // Use search instead
❌ mcp_confluence-mcp_confluence_upload_and_embed_image // Manual image handling
❌ mcp_confluence-mcp_confluence_embed_existing_attachment // Manual image handling
❌ mcp_confluence-mcp_confluence_upload_and_embed_document // Manual document handling
```

### **PR Agent - Individual Tools (Replaced by complete_workflow)**
```typescript
❌ mcp_pr-agent-mcp_pr_review               // Use pr_complete_workflow
❌ mcp_pr-agent-mcp_pr_describe             // Use pr_complete_workflow  
❌ mcp_pr-agent-mcp_pr_improve              // Use pr_complete_workflow
❌ mcp_pr-agent-mcp_pr_analyze              // Use pr_complete_workflow
```

---

## 🔄 **Tool Performance Comparison Strategy**

### **Next PR Review: A/B Testing**
```typescript
// Test 1: Complete Workflow (Single Tool)
const workflowResult = await mcp_pr-agent-mcp_pr_complete_workflow({
  pr_url: "...",
  quality_threshold: 7,
  extended_analysis: true,
  extra_instructions: "P360 Enterprise SDLC...",
  workflow_steps: ["describe", "review", "analyze", "improve"]
});

// Test 2: Individual Tools (Manual Process)  
const describeResult = await mcp_pr-agent-mcp_pr_describe({...});
const reviewResult = await mcp_pr-agent-mcp_pr_review({...});
const analyzeResult = await mcp_pr-agent-mcp_pr_analyze({...});
const improveResult = await mcp_pr-agent-mcp_pr_improve({...});

// Compare: Speed, Quality, Completeness, Token Usage
```

---

## 📋 **Implementation Plan**

1. **✅ Update P360 rules** with `pr_complete_workflow`
2. **🔄 Disable 19 non-essential tools** in MCP configuration  
3. **🧪 A/B test** complete workflow vs individual tools on next PR
4. **📊 Monitor** tool usage and effectiveness
5. **🔄 Optimize** based on performance results

---

## 🎯 **Expected Benefits**

- **+70 tool slots** available for other MCP integrations
- **Faster PR reviews** with complete workflow tool
- **Simplified tool management** with core 10 tools
- **Better performance** with reduced tool overhead
- **Room for growth** with Figma, Kiwi-TCMS, and other integrations

---

**Total Active Tools**: 10/80 (87% capacity available) 🚀
