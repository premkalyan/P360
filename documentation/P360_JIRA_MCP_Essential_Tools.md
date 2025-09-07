# P360 JIRA MCP Essential Tools - Mandatory Only

## 🎯 **Executive Summary**

This document outlines the **absolute essential** JIRA MCP tools needed for P360 project management. Limited to critical functionality only to stay under Cursor's 80+ tool limit.

**Focus**: Sprint Management → Issue Linking → Time Tracking → Basic Reporting

---

## 🔧 **CURRENT JIRA MCP CAPABILITIES (WORKING)**

```javascript
// ✅ Available and Working - Keep These
create_issue(projectKey, issueType, summary, description, priority, assignee, labels)
update_issue(issueKey, summary, description, priority, assignee, labels)  
transition_issue(issueKey, transitionName, comment)
add_comment(issueKey, comment)
get_issue_details(issueKey, includeComments, includeWorklogs)
search_issues(jql, maxResults)
get_project_details(projectKey)
get_boards(filters)
get_board_details(boardId)
get_current_user()
search_users(query)
```

---

## 🚨 **ESSENTIAL MISSING JIRA TOOLS (MANDATORY)**

### **Priority 1: Sprint Management (12 functions)**
```javascript
// Sprint Container Management
create_sprint(boardId, sprintName, startDate, endDate, goal) 
// Creates formal sprint with dates and goals

update_sprint(sprintId, sprintName, startDate, endDate, goal, state)
// Updates sprint details, state: "future", "active", "closed"

get_sprint_details(sprintId)
// Returns: sprint info, dates, goal, state, issues

get_board_sprints(boardId, state)
// Lists all sprints for board, state: "future", "active", "closed", "all"

// Sprint-Issue Association  
add_issues_to_sprint(sprintId, issueKeys[])
// Assigns multiple issues to sprint

remove_issues_from_sprint(sprintId, issueKeys[])
// Removes issues from sprint

move_issues_between_sprints(fromSprintId, toSprintId, issueKeys[])
// Moves issues between sprints

// Sprint Lifecycle
start_sprint(sprintId, startDate, endDate)
// Activates sprint, sets actual start date

complete_sprint(sprintId, incompleteIssuesAction)
// Closes sprint, incompleteIssuesAction: "move_to_backlog", "move_to_next_sprint"

get_active_sprint(boardId)
// Returns currently active sprint for board

// Sprint Planning
get_sprint_capacity(sprintId)
// Returns: committed vs completed story points

set_sprint_goal(sprintId, goal)
// Updates sprint goal
```

**Business Value**: Formal sprint containers, sprint burndown, proper agile methodology

### **Priority 2: Issue Linking & Dependencies (8 functions)**
```javascript
// Issue Relationships
link_issues(fromIssueKey, toIssueKey, linkType)
// linkType: "blocks", "depends_on", "relates_to"

unlink_issues(fromIssueKey, toIssueKey, linkType)
// Removes specific link between issues

get_issue_links(issueKey)
// Returns: all links for an issue with directions

get_dependency_tree(issueKey, maxDepth)
// Returns: hierarchical view of all dependencies

create_subtask(parentIssueKey, subtaskData)
// Creates subtask under parent issue

get_subtasks(parentIssueKey)
// Returns: all subtasks for parent issue

get_blocked_issues(projectKey)
// Returns: all issues that are blocked by other issues

get_blocking_issues(projectKey)  
// Returns: all issues that are blocking other issues
```

**Business Value**: Visual dependency management, impact analysis, story decomposition

### **Priority 3: Time Tracking & Estimation (6 functions)**
```javascript
// Story Points & Estimation
set_story_points(issueKey, storyPoints)
// Sets story point estimate

get_story_points(issueKey)
// Returns: current story point value

bulk_update_story_points(issueUpdates[])
// Updates story points for multiple issues

// Basic Time Tracking
log_work(issueKey, timeSpent, workDescription, startTime, author)
// Logs work against issue, timeSpent: "2h", "30m", "1d 4h"

get_worklogs(issueKey)
// Returns: all work logs for issue

get_time_tracking_summary(issueKey)
// Returns: {originalEstimate, timeSpent, remainingEstimate}
```

**Business Value**: Velocity tracking, effort estimation, team productivity metrics

### **Priority 4: Essential Reporting (6 functions)**
```javascript
// Sprint Reports
get_sprint_report(sprintId)
// Returns: {completedIssues, incompleteIssues, puntedIssues, commitmentAccuracy}

get_burndown_chart_data(sprintId)
// Returns: daily burndown data points

get_velocity_chart(boardId, sprintCount)
// Returns: velocity data for last N sprints

// Team Performance
get_team_workload(projectKey, assignees[], dateRange)
// Returns: work distribution across team members

get_epic_progress(epicKey)
// Returns: {totalStoryPoints, completedStoryPoints, childIssues}

export_sprint_data(sprintId, format)
// format: "json", "csv" - Returns: exportable sprint data
```

**Business Value**: Data-driven retrospectives, team performance optimization

### **Priority 5: Essential Bulk Operations (4 functions)**
```javascript
// Critical Bulk Operations Only
bulk_create_issues(projectKey, issuesData[])
// Creates multiple issues in one operation

bulk_update_issues(issueUpdates[])
// Updates multiple issues

bulk_transition_issues(issueKeys[], transitionName, comment)
// Transitions multiple issues to same state

bulk_assign_issues(issueKeys[], assignee)
// Assigns multiple issues to same person
```

**Business Value**: Efficient project setup, bulk administrative operations

---

## 📋 **TECHNICAL SPECIFICATIONS**

### **Function Naming Convention**
```javascript
// Pattern: mcp_jira_{category}_{action}
mcp_jira_sprint_create()
mcp_jira_sprint_update()
mcp_jira_issue_link()
mcp_jira_story_points_set()
mcp_jira_worklog_add()
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
// JIRA_HOST=bounteous.atlassian.net
// JIRA_EMAIL=prem.kalyan@bounteous.com  
// JIRA_API_TOKEN=[token]
```

---

## 🚀 **IMPLEMENTATION PRIORITY**

### **Phase 1: Sprint Management (Week 1)**
- Sprint CRUD operations
- Sprint-issue association
- Sprint lifecycle management

### **Phase 2: Dependencies (Week 1)**  
- Issue linking
- Dependency trees
- Subtask management

### **Phase 3: Time Tracking (Week 2)**
- Story points
- Work logging  
- Time summaries

### **Phase 4: Reporting (Week 2)**
- Sprint reports
- Burndown charts
- Team metrics

### **Phase 5: Bulk Operations (Week 3)**
- Bulk create/update
- Bulk transitions
- Bulk assignments

---

## ✅ **SUCCESS CRITERIA**

### **Sprint Management**
- [ ] Can create formal sprints with start/end dates
- [ ] Can assign issues to sprints
- [ ] Can start/complete sprints with proper lifecycle

### **Dependency Management**  
- [ ] Can link issues with "blocks"/"depends on" relationships
- [ ] Can view dependency trees for impact analysis
- [ ] Can create subtasks under parent stories

### **Time Tracking**
- [ ] Can set story points for all issues
- [ ] Can log work time against issues
- [ ] Can track team velocity across sprints

### **Reporting**
- [ ] Can generate sprint burndown charts
- [ ] Can view velocity charts for retrospectives
- [ ] Can export sprint data for stakeholder reporting

### **Bulk Operations**
- [ ] Can create multiple stories efficiently
- [ ] Can bulk update issue properties
- [ ] Can transition multiple issues simultaneously

---

## 📊 **TOTAL FUNCTION COUNT: 36 ESSENTIAL JIRA TOOLS**

**Breakdown**:
- Current Working Tools: 11 ✅
- Sprint Management: 12 🚨
- Issue Linking: 8 🚨  
- Time Tracking: 6 🚨
- Essential Reporting: 6 🔹
- Bulk Operations: 4 🔹

**Total New Tools Needed**: 36 functions
**Well under 80 tool limit** ✅

**This focused set provides all essential functionality for professional P360 sprint management while staying within Cursor's constraints!** 🚀
