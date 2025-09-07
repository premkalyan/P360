# P360 JIRA Sprint Management - Manual Setup Steps

## 🚨 **Current Issue**
- **Board Type**: "V1 board" is configured as "simple" type
- **Problem**: Simple boards don't support formal sprint management
- **Error**: `create_sprint` API calls return "400 Bad Request"
- **Solution**: Change to Scrum board or create new Scrum board

---

## 🛠️ **OPTION A: Convert Current Board to Scrum (Recommended)**

### **Step 1: Access Board Configuration**
1. Go to JIRA: https://bounteous.atlassian.net
2. Navigate to **Projects** → **Vishkar-1 (V1)**
3. Click on **Boards** in the left sidebar
4. Find "V1 board" and click on it
5. Click **Board settings** (⚙️ gear icon in top-right)

### **Step 2: Change Board Type**
1. In Board settings, look for **General** tab
2. Find **Board type** or **Board configuration**
3. **Current**: Simple/Kanban board
4. **Change to**: Scrum board
5. Click **Save** or **Update**

### **Step 3: Enable Sprint Features**
1. Still in Board settings, go to **Columns** tab
2. Ensure you have proper workflow columns:
   - **To Do** (or Backlog)
   - **In Progress** 
   - **Done**
3. Go to **Estimation** tab
4. Enable **Story Points** estimation
5. Set estimation field to "Story Points" (if available)

### **Step 4: Configure Sprint Settings**
1. Go to **General** tab in Board settings
2. Look for **Sprint settings** section
3. Set **Sprint duration**: 2 weeks (as per our plan)
4. Enable **Backlog** if not already enabled
5. Save all changes

---

## 🛠️ **OPTION B: Create New Scrum Board (Alternative)**

### **Step 1: Create New Board**
1. Go to JIRA: https://bounteous.atlassian.net
2. Click **Boards** in top navigation
3. Click **Create board**
4. Select **Create a Scrum board**
5. Choose **Board from an existing project**

### **Step 2: Configure New Board**
1. **Project**: Select "Vishkar-1 (V1)"
2. **Board name**: "P360 Scrum Board"
3. **Board type**: Scrum
4. Click **Create board**

### **Step 3: Configure Board Settings**
1. Go to new board settings (⚙️ gear icon)
2. **General** tab:
   - Set **Sprint duration**: 2 weeks
   - Enable **Backlog**
3. **Columns** tab:
   - Ensure columns: To Do → In Progress → Done
4. **Estimation** tab:
   - Enable **Story Points**
5. **Card layout** tab:
   - Add fields: Assignee, Labels, Story Points

---

## 🛠️ **OPTION C: Quick Test - Enable Agile Features**

### **Step 1: Project Settings**
1. Go to **Project settings** (⚙️ in project sidebar)
2. Click **Features** 
3. Ensure **Agile** features are enabled
4. Look for **Sprints** feature and enable it

### **Step 2: Board Permissions**
1. In Board settings → **General** tab
2. Check **Administrators** section
3. Ensure your user has **Board Admin** permissions
4. Add yourself if needed

---

## ✅ **How to Verify Sprint Management Works**

### **Test 1: Manual Sprint Creation**
1. Go to your board (after changes)
2. Look for **Backlog** view
3. Click **Create Sprint** button
4. If button exists and works → ✅ Success!

### **Test 2: API Test via MCP**
After manual changes, test again:
```javascript
// Try creating a sprint via MCP
mcp_jira-orengrinker_create_sprint({
  boardId: "6252",
  sprintName: "Test Sprint - After Config",
  goal: "Validate sprint creation after board configuration"
})
```

### **Test 3: Sprint Backlog**
1. Check if **Backlog** tab appears on board
2. Verify you can see **Future sprints** section
3. Confirm **Active sprint** section exists

---

## 🔍 **Troubleshooting Guide**

### **Issue 1: No "Create Sprint" Button**
**Cause**: Board still not configured for Scrum
**Solution**: 
- Verify board type is "Scrum" 
- Check project has Agile features enabled
- Ensure user permissions for sprint management

### **Issue 2: API Still Returns 400 Error**
**Cause**: Board configuration not fully propagated
**Solutions**:
- Wait 5-10 minutes for JIRA to sync changes
- Try logging out and back in to JIRA
- Clear browser cache
- Test with a different board ID

### **Issue 3: "Estimation" Tab Missing**
**Cause**: Story Points field not available in project
**Solution**:
- Go to **Project settings** → **Issue types** 
- Edit **Story** issue type
- Add **Story Points** field (number field)
- Save and refresh board settings

### **Issue 4: No Backlog View**
**Cause**: Backlog not enabled for board
**Solution**:
- Board settings → **General** tab
- Find **Backlog** settings
- Enable **Backlog** view
- Save changes

---

## 📋 **Post-Configuration Checklist**

After making changes, verify:

- [ ] **Board Type**: Scrum (not Simple/Kanban)
- [ ] **Backlog View**: Available and accessible
- [ ] **Sprint Creation**: Manual button works
- [ ] **Story Points**: Estimation field enabled
- [ ] **Sprint Duration**: Set to 2 weeks
- [ ] **Permissions**: User can manage sprints
- [ ] **API Test**: MCP `create_sprint` works without 400 error

---

## 🚀 **Expected Result**

After successful configuration:

### **✅ Working Sprint Management**:
```javascript
// These MCP calls should work:
create_sprint(boardId, sprintName, goal) ✅
get_board_sprints(boardId) ✅  
add_issues_to_sprint(sprintId, issues) ✅
start_sprint(sprintId) ✅
complete_sprint(sprintId) ✅
get_sprint_capacity(sprintId) ✅
```

### **✅ Professional Sprint Workflow**:
1. **Sprint Planning**: Create sprints with goals and dates
2. **Sprint Execution**: Start sprints and track progress  
3. **Sprint Review**: Complete sprints and move incomplete items
4. **Velocity Tracking**: Monitor team capacity and burndown

---

## 🎯 **Recommendation**

**Start with OPTION A** (Convert Current Board):
- ✅ **Fastest**: Uses existing board and issues
- ✅ **Cleanest**: No duplicate boards
- ✅ **Maintains history**: All existing issues stay connected

**If OPTION A doesn't work, try OPTION B** (New Board):
- ✅ **Fresh start**: Clean Scrum configuration
- ✅ **Full control**: Complete board customization
- ⚠️ **Migration needed**: Move existing issues to new board

**Let me know once you've made the changes, and I'll test the sprint creation again!** 🚀

---

## 📞 **Need Help?**

If you encounter issues:
1. **Share screenshots** of board settings
2. **Try both options** (convert vs. create new)
3. **Check JIRA admin permissions** for your user
4. **Test manual sprint creation** before API testing

**Ready to enable professional sprint management for P360!** ⚡
