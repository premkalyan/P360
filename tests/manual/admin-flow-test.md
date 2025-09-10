# P360-127: Admin Flow Manual Testing Guide

## Test Case 1: Admin Login & Redirect
**Objective**: Verify admin users are redirected to organizations page after login

### Steps:
1. Navigate to `http://localhost:6600/auth/login`
2. Enter credentials: `admin@p360.com` / `admin123`
3. Click "Login" button
4. Verify alert shows "Welcome Admin! 🎉 Redirecting to Organization Management..."
5. Verify redirect to `/admin/organizations`

**Expected Result**: Admin lands on organizations page with 4-tab navigation

---

## Test Case 2: Admin Layout Navigation
**Objective**: Verify 4-tab navigation works correctly

### Steps:
1. On `/admin/organizations` page, verify active "Organization" tab
2. Click "User" tab → should navigate to `/admin/users`
3. Click "Activity Log" tab → should navigate to `/admin/activity-log`
4. Click "Settings" tab → should navigate to `/admin/settings`
5. Click "Organization" tab → should return to `/admin/organizations`

**Expected Result**: Each tab shows correct content with active state highlighting

---

## Test Case 3: Organization Empty State
**Objective**: Verify empty state displays correctly

### Steps:
1. On `/admin/organizations` page
2. Verify empty state shows:
   - Organization illustration image
   - "There's no Organization yet" title
   - "Something cool here" subtitle
   - "New Organization" button

**Expected Result**: Pixel-perfect match to Figma empty state design

---

## Test Case 4: Organization Grid Toggle
**Objective**: Verify grid view displays correctly

### Steps:
1. On organizations page in empty state
2. Click "New Organization" button
3. Verify toggle to grid view with:
   - "Organization Management" title
   - "New Organization" button (top right)
   - Sort/Filters controls
   - Search bar
   - Table with headers and sample data
   - Pagination "Page 1/5"

**Expected Result**: Pixel-perfect match to Figma grid design

---

## Test Case 5: Regular User Login (Control Test)
**Objective**: Verify non-admin users don't access admin area

### Steps:
1. Navigate to `http://localhost:6600/auth/login`
2. Enter credentials: `user@p360.com` / `user123`
3. Click "Login" button
4. Verify alert shows "Login successful! 🎉 Redirecting to dashboard..."
5. Verify no redirect happens (stays on login page for now)

**Expected Result**: Non-admin users don't access admin interface

---

## Test Case 6: Responsive Design
**Objective**: Verify admin layout is responsive

### Steps:
1. On admin pages, test various screen sizes:
   - Desktop (1440px+)
   - Tablet (768px-1439px)
   - Mobile (320px-767px)
2. Verify layout adapts appropriately
3. Check navigation remains usable

**Expected Result**: Layout maintains usability across all screen sizes

---

## Visual Verification Checklist:
- [ ] P360 logo displays correctly in top bar
- [ ] "Super Admin" badge shows in pink
- [ ] Search bar centered with "F" shortcut key
- [ ] User avatar placeholder on right
- [ ] Purple theme (#841aff) matches Figma
- [ ] Lexend Deca font renders correctly
- [ ] Tab icons and states match Figma exactly
- [ ] Empty state illustration loads
- [ ] Grid table styling matches Figma
- [ ] Status badges (Draft, Buyer) styled correctly
- [ ] Three-dot action menu styled correctly
- [ ] Pagination controls styled correctly

---

## Browser Compatibility:
Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## Performance Verification:
- [ ] Page loads under 2 seconds
- [ ] Navigation between tabs is instant
- [ ] No console errors
- [ ] No layout shifts
- [ ] Images load properly

---

## Test Credentials:
**Admin User**: admin@p360.com / admin123
**Regular Users**: 
- user@p360.com / user123
- demo@p360.com / demo123
- rico.oktanondat@gmail.com / password123

---

## Known Limitations (P360-127 Scope):
- Organization CRUD operations (P360-133)
- User management functionality (P360-133)
- Activity log features (P360-134)
- Settings configuration (Future)
- Real authentication backend
- Data persistence
