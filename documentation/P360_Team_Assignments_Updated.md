# P360 Team Structure & Story Assignment Acronyms

## 📋 **Team Member Acronyms for Story Titles**

### **Leadership & Architecture**
- **PM**: Program Manager  
- **PO**: Product Owner
- **SA**: Solution Architect  
- **DA**: Data Architect
- **UN**: Unni Narayanan (Cloud Architect)
- **GC**: Greg Cook (Consulting Architect)
- **TL**: Tech Lead
- **QL**: QA Lead

### **Delivery Pods**

#### **Engineering Pod**
- **BE1**, **BE2**: Backend & Full Stack Developers
- **QA1**, **QA2**: QA Engineers

#### **Data Pod**  
- **DE1**, **DE2**: Data Engineers
- **BI**: BI Analyst

#### **Cloud/Infrastructure Pod**
- **DO**: DevSecOps Engineer

#### **AI/ML Pod**
- **AI**: AI/ML Engineer

#### **Project Management**
- **SM**: Scrum Master (spans all pods)

---

## 🎯 **Updated Sprint Planning Parameters**

### **Capacity Planning**:
- **1 Story Point = 1 Day**
- **Sprint Duration = 2 Weeks (10 working days)**
- **Experimentation Buffer = 2x estimates**
- **Sprint Capacity per Person = 5-8 story points (realistic with meetings, planning, etc.)**

### **Team Availability (Estimated)**:
```
Engineering Pod: BE1(8pts) + BE2(8pts) + QA1(6pts) + QA2(6pts) = 28pts/sprint
Data Pod: DE1(8pts) + DE2(8pts) + BI(6pts) = 22pts/sprint  
Cloud/Infra: DO(8pts) = 8pts/sprint
AI/ML: AI(6pts) = 6pts/sprint
Architecture: TL(4pts) + SA(3pts) + DA(3pts) = 10pts/sprint
Management: PM(2pts) + SM(3pts) = 5pts/sprint

Total Team Capacity: ~79 story points per sprint
```

---

## 📋 **Story Title Format Examples**

### **Current Format**:
`[ROLE] Feature Name - Component`

### **New Format with Team Acronyms**:
```
[BE1] User Authentication API - Backend Development  
[QA1] User Authentication API - Security Testing
[DO] User Authentication API - Deployment Pipeline
[BE2] User Authentication UI - Frontend Components
[QA2] User Authentication UI - E2E Testing
[TL] User Authentication - Technical Review & Architecture
[DA] User Authentication - Data Schema Design
```

### **Multi-Role Stories**:
```
[BE1+BE2] Database Schema Implementation - Backend Development
[QA1+QA2] Full System Integration Testing - Quality Assurance  
[DO+UN] AWS Infrastructure Setup - Cloud Architecture
```

---

## 🎯 **Sprint Board Organization Strategy**

### **Question: Can we tag stories to Sprints for Sprint Boards?**

**Answer**: With current MCP capabilities:

#### **✅ Available Approach (Label-Based)**:
```javascript
// Create stories with sprint labels
create_issue({
  projectKey: "V1",
  summary: "[BE1] Auth API Development - Backend",
  labels: ["sprint-1", "backend", "authentication"],
  // ... other fields
})

// Filter by sprint for "sprint board"
search_issues("project = V1 AND labels = sprint-1", maxResults)
```

#### **✅ JIRA Board Views**:
- **Main Kanban Board**: All stories across sprints
- **Sprint Filter Views**: Use JQL filters for sprint-specific views
- **Team Filter Views**: Use JQL filters for team-specific views

**Example JQL Filters**:
```
Sprint 1 Board: project = V1 AND labels = sprint-1
Backend Team: project = V1 AND (summary ~ '[BE1]' OR summary ~ '[BE2]')  
QA Team: project = V1 AND (summary ~ '[QA1]' OR summary ~ '[QA2]')
Current Sprint: project = V1 AND labels = sprint-1 AND status != Done
```

#### **❌ Missing (Would be Nice to Have)**:
- Formal Sprint containers with start/end dates
- Sprint burndown charts
- Velocity tracking across sprints
- Automatic sprint board creation

---

## 📊 **Updated 3-Sprint Plan with Doubled Estimates**

### **Sprint 1: Foundation Infrastructure**
- **Original Estimate**: 38 points
- **Doubled Estimate**: 76 points
- **Team Capacity**: 79 points ✅ (Good fit)

### **Sprint 2: Database + Authentication**  
- **Original Estimate**: 39 points
- **Doubled Estimate**: 78 points
- **Team Capacity**: 79 points ✅ (Good fit)

### **Sprint 3: User Management System**
- **Original Estimate**: 40 points  
- **Doubled Estimate**: 80 points
- **Team Capacity**: 79 points ⚠️ (Slightly over, will adjust)

### **Total 3-Sprint Effort**:
- **234 story points** (doubled estimates)
- **Team capacity**: 237 points ✅
- **Buffer**: 3 points (1.3% buffer for unexpected work)

---

## 🎯 **Next Steps**

1. **✅ Update story assignments** with team member acronyms
2. **✅ Double all story point estimates** for experimentation buffer  
3. **✅ Create sprint-tagged stories** using label-based organization
4. **✅ Setup JQL filters** for sprint and team board views
5. **⏳ Implement advanced MCP tools** for better sprint management

**Ready to proceed with realistic team-based sprint planning!** 🚀
