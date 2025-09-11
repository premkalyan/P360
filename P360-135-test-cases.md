# P360-135 Advanced Organization Grid Filtering and Sorting - Test Cases

**Product:** P360 - Display Advertising Platform MVP  
**Component:** Organization Management  
**Feature:** Advanced Grid Filtering and Sorting  
**Story:** P360-135  

## Test Case 1: Sort Dropdown Functionality
**Priority:** P2  
**Tags:** P360-135, sorting, ui, dropdown  

### Test Steps:
1. **Action:** Navigate to http://localhost:6600/admin/organizations  
   **Expected:** Organization management page loads with grid view displaying organizations
   
2. **Action:** Click on Sort dropdown button  
   **Expected:** Sort dropdown menu opens showing available sort options (Name A-Z, Name Z-A, Newest First, Oldest First, Recently Updated)
   
3. **Action:** Select 'Name (A-Z)' from sort dropdown  
   **Expected:** Organizations are sorted alphabetically by name (ascending), sort button shows current selection with ↑ indicator
   
4. **Action:** Select 'Name (Z-A)' from sort dropdown  
   **Expected:** Organizations are sorted reverse alphabetically by name (descending), sort button shows current selection with ↓ indicator
   
5. **Action:** Select 'Newest First' from sort dropdown  
   **Expected:** Organizations are sorted by creation date (newest to oldest)
   
6. **Action:** Select 'Oldest First' from sort dropdown  
   **Expected:** Organizations are sorted by creation date (oldest to newest)
   
7. **Action:** Select 'Recently Updated' from sort dropdown  
   **Expected:** Organizations are sorted by update date (most recently updated first)

---

## Test Case 2: Filters Dropdown Functionality
**Priority:** P2  
**Tags:** P360-135, filtering, ui, dropdown  

### Test Steps:
1. **Action:** Navigate to organization management page  
   **Expected:** Page loads with default organization listing
   
2. **Action:** Click on Filters dropdown button  
   **Expected:** Filters dropdown menu opens showing filter categories (Status, Type, Organization Size)
   
3. **Action:** Select 'Active' from Status filter and click Apply  
   **Expected:** Grid shows only active organizations, Filters button shows (1) count
   
4. **Action:** Select 'Advertiser' from Type filter and click Apply  
   **Expected:** Grid shows only active advertiser organizations, Filters button shows (2) count
   
5. **Action:** Select 'Large' from Organization Size filter and click Apply  
   **Expected:** Grid shows only large, active, advertiser organizations, Filters button shows (3) count
   
6. **Action:** Click Clear button in filters dropdown  
   **Expected:** All filters are cleared, grid shows all organizations, Filters button shows no count

---

## Test Case 3: Filter Badges and Management
**Priority:** P2  
**Tags:** P360-135, filter-badges, ui  

### Test Steps:
1. **Action:** Apply Status: Active filter  
   **Expected:** Purple filter badge appears below controls showing "Status: active" with X button
   
2. **Action:** Apply Type: Agency filter  
   **Expected:** Orange filter badge appears showing "Type: agency" with X button
   
3. **Action:** Apply Size: Medium filter  
   **Expected:** Green filter badge appears showing "Size: medium" with X button
   
4. **Action:** Click X button on Status filter badge  
   **Expected:** Status filter badge is removed, only Type and Size filters remain active
   
5. **Action:** Click "Clear all" link  
   **Expected:** All filter badges are removed, all filters are cleared

---

## Test Case 4: Search Functionality Integration
**Priority:** P2  
**Tags:** P360-135, search, filtering  

### Test Steps:
1. **Action:** Enter "tech" in search box  
   **Expected:** Grid filters to show organizations containing "tech" in name, account ID, or description
   
2. **Action:** Apply Type: Advertiser filter while search is active  
   **Expected:** Results show only advertiser organizations that match "tech" search
   
3. **Action:** Apply sort by Name A-Z  
   **Expected:** Filtered results are sorted alphabetically
   
4. **Action:** Clear search box  
   **Expected:** Type filter remains active, search is cleared, showing all advertiser organizations

---

## Test Case 5: Combined Filtering and Sorting
**Priority:** P1  
**Tags:** P360-135, integration, combined-filters  

### Test Steps:
1. **Action:** Apply Status: Active, Type: Advertiser, Size: Large filters  
   **Expected:** Grid shows large, active advertiser organizations with 3 filter badges
   
2. **Action:** Apply sort by Recently Updated  
   **Expected:** Filtered results are sorted by update date (newest first)
   
3. **Action:** Change sort to Name Z-A  
   **Expected:** Same filtered results are re-sorted alphabetically (descending)
   
4. **Action:** Add search term "corp"  
   **Expected:** Results further filtered to show large, active advertiser organizations containing "corp"
   
5. **Action:** Clear all filters using "Clear all" button  
   **Expected:** All filters and sort return to default, full organization list displayed

---

## Test Case 6: Pagination with Filters
**Priority:** P3  
**Tags:** P360-135, pagination, filtering  

### Test Steps:
1. **Action:** Apply filters that result in multiple pages of results  
   **Expected:** Pagination controls show correct page count for filtered results
   
2. **Action:** Navigate to page 2 of filtered results  
   **Expected:** URL updates, page 2 results are displayed with filters maintained
   
3. **Action:** Change sort order while on page 2  
   **Expected:** Returns to page 1 with new sort order applied to filtered results
   
4. **Action:** Change filter while on page 2  
   **Expected:** Returns to page 1 with new filters applied

---

## Test Case 7: Filter State Persistence
**Priority:** P3  
**Tags:** P360-135, state-management, persistence  

### Test Steps:
1. **Action:** Apply Status: Draft and Type: Publisher filters  
   **Expected:** Filters are applied, correct results displayed
   
2. **Action:** Navigate to create organization sidebar  
   **Expected:** Filters remain visible and active in background
   
3. **Action:** Close sidebar without creating organization  
   **Expected:** Previously applied filters are still active
   
4. **Action:** Refresh the page  
   **Expected:** Filters are reset to default state (no persistence across page refresh)

---

## Test Case 8: Error Handling and Edge Cases
**Priority:** P3  
**Tags:** P360-135, error-handling, edge-cases  

### Test Steps:
1. **Action:** Apply filters that result in zero results  
   **Expected:** Grid shows "No results found" message, filter badges remain visible
   
2. **Action:** Apply multiple filters rapidly  
   **Expected:** All filter changes are processed correctly without UI conflicts
   
3. **Action:** Click outside filter dropdown while it's open  
   **Expected:** Dropdown closes without applying unsaved filter changes
   
4. **Action:** Test with very long organization names  
   **Expected:** Sort and filter functions work correctly, UI handles long text gracefully

---

## Acceptance Criteria Verification
- [ ] ✅ Functional sort dropdown with 5 sort options
- [ ] ✅ Functional filters dropdown with Status, Type, Size filters
- [ ] ✅ Filter badges display active filters with individual removal
- [ ] ✅ Filter count badge on Filters button
- [ ] ✅ Clear all filters functionality
- [ ] ✅ Search integration with filters and sorting
- [ ] ✅ Combined filtering (multiple filters simultaneously)
- [ ] ✅ Pagination works with filters
- [ ] ✅ Filter state management (temporary state for dropdown)
- [ ] ✅ Responsive UI behavior and error handling

## Technical Implementation Notes
- Frontend: Enhanced OrganizationQuery interface with size filter
- Backend: Added size filter support in organization controller
- Fallback: Frontend service includes sorting logic for offline scenarios
- State Management: Temporary filter state vs. applied filter state separation
- UX: Filter badges use brand colors (purple, orange, green) for visual hierarchy
