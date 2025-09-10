# P360-131: Admin Post-Login Routing & Role-Based Navigation
## Test Cases Documentation

**Story:** P360-131 - Admin Post-Login Routing & Role-Based Navigation  
**Priority:** High  
**Component:** Authentication & Authorization  
**Created:** 2025-01-10  
**Status:** Ready for Execution

---

## Test Case Overview

This document contains comprehensive test cases for the Admin Post-Login Routing feature, covering unit tests, integration tests, and end-to-end tests for role-based authentication and routing functionality.

---

## 🔐 Unit Tests - Role-Based Authentication Logic

### TC-131-001: Admin User Email Pattern Recognition
- **Type:** Unit Test
- **Priority:** High
- **Status:** Automated
- **Description:** Verify admin users are correctly identified by email patterns
- **Preconditions:** LoginPage component is rendered
- **Test Steps:**
  1. Enter admin email: admin@p360admin.com
  2. Enter password: password123
  3. Submit form
  4. Fast-forward authentication delay (Jest fake timers)
- **Expected Results:**
  - Router navigates to /admin/organizations
  - User role stored as 'admin' in localStorage
  - Admin user data stored correctly

### TC-131-002: Regular User Routing
- **Type:** Unit Test
- **Priority:** High
- **Status:** Automated
- **Description:** Verify regular users route to dashboard
- **Preconditions:** LoginPage component is rendered
- **Test Steps:**
  1. Enter regular user email: user@example.com
  2. Enter password: password123
  3. Submit form
  4. Fast-forward authentication delay
- **Expected Results:**
  - Router navigates to /dashboard
  - User role stored as 'user' in localStorage
  - User tenant ID set to 'tenant-1'

### TC-131-003: Multiple Admin Email Pattern Testing
- **Type:** Unit Test
- **Priority:** Medium
- **Status:** Automated
- **Description:** Test various admin email patterns for correct routing
- **Test Data:**
  - admin@company.com → /admin/organizations (admin)
  - superadmin@test.com → /admin/organizations (admin)
  - user@p360admin.com → /admin/organizations (admin)
  - manager@company.com → /dashboard (user)
- **Expected Results:** Each email routes to correct destination based on admin detection logic

---

## 🛡️ Unit Tests - Admin Auth Middleware Functions

### TC-131-004: getCurrentUser Function
- **Type:** Unit Test
- **Priority:** Medium
- **Status:** Automated
- **Description:** Test getCurrentUser utility function
- **Test Steps:**
  1. Test with no stored user (returns null)
  2. Test with valid stored user data
- **Expected Results:** Correct user object returned or null when no user

### TC-131-005: Role Detection Functions
- **Type:** Unit Test
- **Priority:** High
- **Status:** Automated
- **Description:** Test isAdmin, hasRole, canAccessAdmin functions
- **Test Steps:**
  1. Set admin user in localStorage
  2. Test isAdmin() returns true
  3. Test hasRole('admin') returns true
  4. Test canAccessAdmin() returns true
- **Expected Results:** All role detection functions work correctly

### TC-131-006: Default Route Detection
- **Type:** Unit Test
- **Priority:** Medium
- **Status:** Automated
- **Description:** Test getDefaultRoute function for different roles
- **Test Data:**
  - 'admin' → '/admin/organizations'
  - 'user' → '/dashboard'
  - 'manager' → '/dashboard'
- **Expected Results:** Correct default routes returned for each role

### TC-131-007: Session Management
- **Type:** Unit Test
- **Priority:** Medium
- **Status:** Automated
- **Description:** Test clearUserSession functionality
- **Test Steps:**
  1. Store user data in localStorage
  2. Call clearUserSession()
  3. Verify data removal
- **Expected Results:** All user session data cleared from localStorage

---

## 🔒 Integration Tests - Admin Layout Protection

### TC-131-008: Loading State Display
- **Type:** Integration Test
- **Priority:** Low
- **Status:** Automated
- **Description:** Verify admin layout shows loading state initially
- **Test Steps:**
  1. Render AdminLayout component
  2. Check for loading indicators
- **Expected Results:** Loading spinner and message displayed

### TC-131-009: Access Denied for Non-Admin Users
- **Type:** Integration Test
- **Priority:** High
- **Status:** Automated
- **Description:** Verify non-admin users see access denied message
- **Test Steps:**
  1. Set user role to 'user' in localStorage
  2. Render AdminLayout
  3. Check for access denied message
- **Expected Results:** Access denied UI displayed with return to login link

### TC-131-010: Admin Layout Rendering
- **Type:** Integration Test
- **Priority:** High
- **Status:** Automated
- **Description:** Verify admin layout renders correctly for admin users
- **Test Steps:**
  1. Set admin user data in localStorage
  2. Render AdminLayout with admin content
  3. Check for admin header, navigation, and content
- **Expected Results:** Full admin layout displayed with navigation and user info

### TC-131-011: Admin Navigation Links
- **Type:** Integration Test
- **Priority:** Medium
- **Status:** Automated
- **Description:** Test admin navigation links are present and functional
- **Test Steps:**
  1. Render admin layout for admin user
  2. Check for navigation links: Organizations, Users, Settings
  3. Verify logout functionality
- **Expected Results:** All admin navigation links present and functional

---

## 🏢 Integration Tests - Admin Organizations Page

### TC-131-012: Organization Management Interface
- **Type:** Integration Test
- **Priority:** High
- **Status:** Automated
- **Description:** Test admin organizations page renders correctly
- **Test Steps:**
  1. Render AdminOrganizationsPage
  2. Check for header, quick actions, and organizations table
- **Expected Results:** Complete admin organizations interface displayed

### TC-131-013: Organizations Table Data Display
- **Type:** Integration Test
- **Priority:** Medium
- **Status:** Automated
- **Description:** Verify organizations table displays mock data correctly
- **Test Steps:**
  1. Render AdminOrganizationsPage
  2. Check table contains mock organizations: Acme Corp, TechStart Inc
  3. Verify organization details (status, users, campaigns)
- **Expected Results:** Organizations table populated with correct mock data

### TC-131-014: Statistics Display
- **Type:** Integration Test
- **Priority:** Medium
- **Status:** Automated
- **Description:** Test statistics cards show correct totals
- **Test Steps:**
  1. Render AdminOrganizationsPage
  2. Check total users count (32 total)
  3. Check total campaigns count (15 total)
- **Expected Results:** Statistics calculated correctly from mock data

### TC-131-015: Organization Action Links
- **Type:** Integration Test
- **Priority:** Medium
- **Status:** Automated
- **Description:** Test action links for each organization
- **Test Steps:**
  1. Render AdminOrganizationsPage
  2. Check for View, Edit, Users links for each organization
  3. Verify link targets are correct
- **Expected Results:** Action links present with correct hrefs for each organization

---

## 🔄 End-to-End Integration Tests

### TC-131-016: Complete Admin Login Flow
- **Type:** E2E Test
- **Priority:** Critical
- **Status:** Automated
- **Description:** Test complete admin login to organizations page flow
- **Test Steps:**
  1. Render LoginPage
  2. Enter admin credentials: admin@p360admin.com / password123
  3. Submit form and fast-forward timers
  4. Verify routing to /admin/organizations
  5. Verify user session storage
- **Expected Results:**
  - Successful routing to admin area
  - User data stored correctly
  - Admin role detected and stored
  - Ready for admin functionality

### TC-131-017: Regular User Login Flow
- **Type:** E2E Test
- **Priority:** Critical
- **Status:** Automated
- **Description:** Test complete regular user login flow
- **Test Steps:**
  1. Render LoginPage
  2. Enter user credentials: user@company.com / password123
  3. Submit form and fast-forward timers
  4. Verify routing to /dashboard
  5. Verify user session and role
- **Expected Results:**
  - Successful routing to user dashboard
  - User role set correctly
  - No admin access available

---

## 🧹 Security & Edge Case Tests

### TC-131-018: Malformed localStorage Data Handling
- **Type:** Security Test
- **Priority:** Medium
- **Status:** Automated
- **Description:** Test graceful handling of corrupted localStorage data
- **Test Steps:**
  1. Store invalid JSON in localStorage ('invalid-json')
  2. Call getCurrentUser()
  3. Verify error handling
- **Expected Results:** Function returns null gracefully, error logged

### TC-131-019: Missing localStorage Graceful Handling
- **Type:** Security Test
- **Priority:** Medium
- **Status:** Automated
- **Description:** Test handling when localStorage is unavailable
- **Test Steps:**
  1. Mock localStorage.getItem to throw error
  2. Call adminAuth functions
  3. Verify error handling
- **Expected Results:** Functions return safe defaults, errors handled gracefully

### TC-131-020: Unauthorized Access Prevention
- **Type:** Security Test
- **Priority:** High
- **Status:** Automated
- **Description:** Verify admin components reject unauthorized access
- **Test Steps:**
  1. Clear all localStorage data
  2. Attempt to render admin components
  3. Check access prevention
- **Expected Results:** Admin components prevent access without authentication

---

## 🎯 Acceptance Criteria Verification

### AC-131-001: Role-Based Routing Implementation
- **Status:** ✅ PASSED
- **Verification:** Admin users (email patterns: admin@*, *@p360admin.com) route to /admin/organizations
- **Verification:** Regular users route to /dashboard
- **Test Coverage:** TC-131-001, TC-131-002, TC-131-003

### AC-131-002: Admin Route Protection
- **Status:** ✅ PASSED
- **Verification:** Admin middleware protects admin routes
- **Verification:** Access denied for non-admin users
- **Test Coverage:** TC-131-009, TC-131-020

### AC-131-003: Admin Organization Management Interface
- **Status:** ✅ PASSED
- **Verification:** Admin users see organization management interface
- **Verification:** Organizations table with mock data displayed
- **Test Coverage:** TC-131-012, TC-131-013, TC-131-015

### AC-131-004: Session Management
- **Status:** ✅ PASSED
- **Verification:** User roles and data stored in localStorage
- **Verification:** Session clearing functionality works
- **Test Coverage:** TC-131-007, TC-131-016, TC-131-017

---

## Test Execution Summary

- **Total Test Cases:** 20
- **Unit Tests:** 7
- **Integration Tests:** 8
- **E2E Tests:** 2
- **Security Tests:** 3
- **Automated:** 20 (100%)
- **Manual:** 0 (0%)

## Environment Information

- **Framework:** Jest + React Testing Library
- **Timer Handling:** Jest Fake Timers for authentication delays
- **Mocking:** Next.js router, localStorage
- **Component Testing:** React component rendering and interaction testing

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-10  
**Next Review:** After P360-131 merge and deployment
