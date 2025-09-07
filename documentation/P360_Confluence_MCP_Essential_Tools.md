# P360 Confluence MCP Essential Tools - Mandatory Only

## 🎯 **Executive Summary**

This document outlines the **absolute essential** Confluence MCP tools needed for P360 documentation management. Minimal set focused on documentation standardization and organization.

**Focus**: Page Templates → Content Management → Basic Space Administration

---

## 📄 **CURRENT CONFLUENCE MCP CAPABILITIES (WORKING)**

```javascript
// ✅ Available and Working - Keep These
get_spaces(limit, start, type, status)
get_space(spaceKey)
get_page(pageId, expand[])
get_page_by_title(spaceKey, title)
search(cql, limit)
create_page(spaceKey, title, content, parentId)
update_page(pageId, content, title, version)

// Folder & Organization (Recently Added)
create_folder(folderName, spaceKey, description, parentId)
get_folder_contents(folderId)
move_page_to_folder(pageId, folderId)

// Attachment Management
upload_document(pageId, filePath, fileName, comment)
update_document(pageId, attachmentId, filePath, fileName, comment)
get_page_attachments(pageId)
list_documents(pageId, includeDetails)
```

---

## 🚨 **ESSENTIAL MISSING CONFLUENCE TOOLS (MANDATORY)**

### **Priority 1: Page Templates (6 functions)**
```javascript
// Page Template Management
create_page_template(spaceKey, templateName, templateContent, templateType)
// templateType: "page", "blogpost", "global"
// Creates reusable page templates for standardization

get_page_templates(spaceKey)
// Returns: available templates for space

apply_page_template(spaceKey, templateId, title, customizations)
// Creates page from template with customizations

update_page_template(templateId, templateContent, templateName)
// Updates existing template

get_template_details(templateId)
// Returns: template content and metadata

get_global_templates()
// Returns: system-wide available templates
```

**Business Value**: Standardized documentation, consistent formatting, efficient page creation

### **Priority 2: Content Management (8 functions)**
```javascript
// Page Versioning & History
get_page_history(pageId, limit)
// Returns: page version history for tracking changes

compare_page_versions(pageId, version1, version2)
// Returns: diff between page versions

restore_page_version(pageId, versionNumber)
// Restores page to specific version

// Content Macros (Essential)
insert_macro(pageId, macroName, macroParams, position)
// Inserts Confluence macro: "toc", "code", "info", "jira"

update_macro(pageId, macroId, macroParams)
// Updates existing macro parameters

get_page_macros(pageId)
// Returns: all macros used in page

// Page Labels & Organization
add_page_labels(pageId, labels[])
// Adds labels to page for organization

get_pages_by_label(spaceKey, label)
// Finds pages with specific label
```

**Business Value**: Version control, content organization, macro management

### **Priority 3: Space Administration (6 functions)**
```javascript
// Basic Space Management
create_space(spaceKey, spaceName, description, spaceType)
// spaceType: "global", "personal"

update_space(spaceKey, spaceName, description, homepage)
// Updates space details

get_space_permissions(spaceKey)
// Returns: space-level permissions

set_space_permissions(spaceKey, permissions[])
// permissions: [{user/group, permission}]
// permission: "read", "write", "admin"

get_space_content_tree(spaceKey, maxDepth)
// Returns: hierarchical view of all space content

archive_space(spaceKey)
// Archives space (reversible)
```

**Business Value**: Space organization, permission management, content structure

### **Priority 4: JIRA Integration (4 functions)**
```javascript
// Essential JIRA Integration
link_page_to_jira_issue(pageId, issueKey)
// Creates bi-directional link between page and JIRA issue

get_jira_links(pageId)
// Returns: linked JIRA issues for page

insert_jira_macro(pageId, jqlQuery, displayOptions)
// Inserts JIRA issue table/chart into page

update_jira_macro(pageId, macroId, jqlQuery, displayOptions)
// Updates existing JIRA macro with new query
```

**Business Value**: JIRA-Confluence integration, live issue tracking in documentation

### **Priority 5: Bulk Operations (4 functions)**
```javascript
// Essential Bulk Operations
bulk_page_operations(operation, pageIds[], operationData)
// operation: "move", "label", "restrict"

bulk_create_pages(spaceKey, pagesData[])
// Creates multiple pages from template or data

export_space_content(spaceKey, format, includeAttachments)
// format: "pdf", "html" - Exports space content

import_content_from_file(spaceKey, filePath, importConfig)
// Imports content from various file formats
```

**Business Value**: Efficient content management, bulk operations, data migration

---

## 📋 **TECHNICAL SPECIFICATIONS**

### **Function Naming Convention**
```javascript
// Pattern: mcp_confluence_{category}_{action}
mcp_confluence_template_create()
mcp_confluence_template_apply()
mcp_confluence_page_history()
mcp_confluence_macro_insert()
mcp_confluence_space_create()
```

### **Error Handling Standard**
```javascript
{
  "success": boolean,
  "data": object | null,
  "error": {
    "code": string,
    "message": string,
    "details": object
  }
}
```

### **Authentication**
```javascript
// Environment variables required:
// CONFLUENCE_DOMAIN=bounteous.atlassian.net
// CONFLUENCE_USERNAME=prem.kalyan@bounteous.com
// CONFLUENCE_TOKEN=[token]
```

---

## 🚀 **IMPLEMENTATION PRIORITY**

### **Phase 1: Page Templates (Week 1)**
- Template CRUD operations
- Template application
- Global template access

### **Phase 2: Content Management (Week 2)**
- Page versioning and history
- Macro management
- Page labeling

### **Phase 3: Space Administration (Week 2)**
- Space management
- Permission control
- Content organization

### **Phase 4: JIRA Integration (Week 3)**
- Page-issue linking
- JIRA macro insertion
- Live issue tracking

### **Phase 5: Bulk Operations (Week 3)**
- Bulk page operations
- Content import/export
- Data migration tools

---

## ✅ **SUCCESS CRITERIA**

### **Template Management**
- [ ] Can create standardized page templates
- [ ] Can apply templates for consistent documentation
- [ ] Can update templates across space

### **Content Management**
- [ ] Can track page version history
- [ ] Can insert and manage macros (TOC, code, JIRA)
- [ ] Can organize content with labels

### **Space Administration**
- [ ] Can create and manage spaces
- [ ] Can set appropriate permissions
- [ ] Can view content hierarchy

### **JIRA Integration**
- [ ] Can link documentation to JIRA issues
- [ ] Can embed live JIRA issue tables
- [ ] Can track related stories in documentation

### **Bulk Operations**
- [ ] Can perform bulk content operations
- [ ] Can export documentation for stakeholders
- [ ] Can import content from external sources

---

## 📊 **TOTAL FUNCTION COUNT: 28 ESSENTIAL CONFLUENCE TOOLS**

**Breakdown**:
- Current Working Tools: 13 ✅
- Page Templates: 6 🚨
- Content Management: 8 🚨
- Space Administration: 6 🚨
- JIRA Integration: 4 🔹
- Bulk Operations: 4 🔹

**Total New Tools Needed**: 28 functions

---

## 📈 **COMBINED TOOL COUNT SUMMARY**

**JIRA Essential Tools**: 36 functions
**Confluence Essential Tools**: 28 functions
**Total Combined**: 64 new MCP tools

**Well under 80 tool limit** ✅
**Focused on absolute essentials only** ✅

---

## 🎯 **P360 Documentation Strategy**

### **Template-Driven Documentation**
1. **Technical Requirements Template** - For feature specifications
2. **API Documentation Template** - For endpoint documentation  
3. **User Guide Template** - For user-facing documentation
4. **Runbook Template** - For operational procedures

### **Content Organization**
1. **Project Spaces** - Separate spaces for different project areas
2. **Folder Structure** - Organized content hierarchy
3. **Label System** - Cross-cutting content discovery
4. **JIRA Integration** - Live links to related stories

### **Quality Control**
1. **Version Control** - Track documentation changes
2. **Review Process** - Template-based consistency
3. **Permission Management** - Appropriate access control
4. **Regular Maintenance** - Automated content updates

**This minimal set provides essential Confluence functionality for P360 documentation while staying within tool constraints!** 🚀
