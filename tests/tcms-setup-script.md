# P360 Kiwi-TCMS Setup Script

## 🚀 **Complete TCMS Setup Guide**

This guide will help you set up the complete Kiwi-TCMS structure for P360 project with all test cases organized by feature.

## 📋 **Step 1: Create Product in TCMS**

### **Manual Setup (TCMS Web UI):**
1. Login to Kiwi-TCMS instance (port 40000)
2. Navigate to **Management > Products**
3. Click **"Add Product"**
4. Fill in product details:

```
Product Name: P360 - Display Advertising Platform MVP
Description: Enterprise display advertising platform with campaign management, 
           audience targeting, and real-time analytics  
Version: 1.0.0
Classification: Web Application
```

## 📋 **Step 2: Create Test Plans**

### **Plan 1: Authentication Features**
```
Plan Name: P360 Authentication Features (P360-19)
Product: P360 - Display Advertising Platform MVP
Version: 1.0.0
Type: Feature Testing
Parent: P360-19 - Authentication UI Components
Description: Comprehensive testing of authentication components including 
           login, signup, validation, and UI components

Tags: auth, authentication, login, signup, ui-components, P360-19
```

### **Plan 2: Campaign Management Features**  
```
Plan Name: P360 Campaign Management Features (P360-67)
Product: P360 - Display Advertising Platform MVP
Version: 1.0.0
Type: Feature Testing
Parent: P360-67 - Campaign Configuration UI
Description: Testing of campaign management functionality including dashboard,
           campaign cards, filtering, search, and analytics

Tags: campaigns, dashboard, filtering, search, analytics, P360-67
```

## 📋 **Step 3: Import Test Cases**

### **Authentication Test Cases (78 Total)**

#### **Category: Unit Tests - AuthLayout Component (5 cases)**
- TC-001: Verify responsive layout rendering
- TC-002: Validate branding panel display  
- TC-003: Test mobile/tablet/desktop breakpoints
- TC-004: Verify accessibility compliance (WCAG)
- TC-005: Test layout with different content heights

#### **Category: Unit Tests - LoginForm Component (9 cases)**
- TC-006: Email field validation (valid/invalid formats)
- TC-007: Password field validation (minimum length, required)
- TC-008: Remember me checkbox functionality
- TC-009: Forgot password link navigation
- TC-010: Form submission with valid data
- TC-011: Form submission with invalid data
- TC-012: Loading state display during submission
- TC-013: Error message display and clearing
- TC-014: Real-time validation feedback

#### **Category: Unit Tests - SignupForm Component (8 cases)**
- TC-015: First/Last name validation (required fields)
- TC-016: Email validation (format, uniqueness)
- TC-017: Password strength validation
- TC-018: Password confirmation matching
- TC-019: Terms and conditions checkbox requirement
- TC-020: Multi-field validation interaction
- TC-021: Form submission flow
- TC-022: Loading states and error handling

#### **Category: Unit Tests - Button Component (8 cases)**
- TC-023: Primary variant rendering and styling
- TC-024: Secondary variant rendering and styling  
- TC-025: Outline variant rendering and styling
- TC-026: Ghost variant rendering and styling
- TC-027: Loading state with spinner animation
- TC-028: Disabled state behavior
- TC-029: Click event handling
- TC-030: Keyboard navigation (Tab, Enter, Space)

#### **Category: Unit Tests - Input Component (9 cases)**
- TC-031: Text input rendering with label
- TC-032: Email input type functionality
- TC-033: Password input type with toggle
- TC-034: Left icon display and positioning
- TC-035: Right icon display and positioning
- TC-036: Error state styling and message
- TC-037: Helper text display
- TC-038: Focus and blur states
- TC-039: Accessibility attributes (aria-labels, roles)

#### **Category: Integration Tests (11 cases)**
- TC-040: Homepage to login page navigation
- TC-041: Homepage to signup page navigation
- TC-042: Login to dashboard redirect (success)
- TC-043: Signup to login redirect (success)
- TC-044: Forgot password flow navigation
- TC-045: Back navigation functionality
- TC-046: Login form submission with backend mock
- TC-047: Signup form submission with backend mock
- TC-048: Authentication state management
- TC-049: Session handling and persistence
- TC-050: Error handling from backend responses

#### **Category: Visual Regression Tests (10 cases)**
- TC-051: AuthLayout visual snapshot (desktop)
- TC-052: AuthLayout visual snapshot (mobile)
- TC-053: LoginForm visual snapshot (all states)
- TC-054: SignupForm visual snapshot (all states)
- TC-055: Button variants visual comparison
- TC-056: Input states visual comparison
- TC-057: Chrome rendering consistency
- TC-058: Firefox rendering consistency  
- TC-059: Safari rendering consistency
- TC-060: Edge rendering consistency

#### **Category: End-to-End Tests (14 cases)**
- TC-061: New user registration complete flow
- TC-062: Existing user login complete flow
- TC-063: Password reset complete flow
- TC-064: Form validation error recovery flow
- TC-065: Multi-device authentication consistency
- TC-066: Page load time measurements
- TC-067: Form submission response times
- TC-068: Image loading optimization
- TC-069: Bundle size optimization validation
- TC-070: Keyboard navigation complete flow
- TC-071: Screen reader compatibility
- TC-072: Color contrast validation
- TC-073: Focus management and visibility
- TC-074: Form labeling and error announcements

#### **Category: Security Tests (4 cases)**
- TC-075: XSS prevention in form inputs
- TC-076: SQL injection prevention
- TC-077: CSRF protection validation
- TC-078: Sensitive data handling (passwords)

### **Campaign Management Test Cases (35 Total)**

#### **Category: Unit Tests - CampaignCard Component (7 cases)**
- CC-001: Campaign Performance Overview Display
- CC-002: Campaign Metrics Display Accuracy
- CC-003: Budget Information with Utilization
- CC-004: Real-time Performance Feedback
- CC-005: Campaign Status Display
- CC-006: Action Buttons Functionality
- CC-007: Responsive Compact Mode

#### **Category: Integration Tests - Campaign Dashboard (8 cases)**
- CD-001: Campaign Dashboard Display
- CD-002: Advanced Search Functionality
- CD-003: Advanced Filtering System
- CD-004: Sorting Functionality
- CD-005: Campaign Comparison Tool
- CD-006: View Mode Toggle (Grid/List)
- CD-007: Clear Filters Functionality
- CD-008: Campaign Actions Integration

#### **Category: Visual Regression Tests (3 cases)**
- VR-001: Campaign Dashboard Visual Consistency (Desktop)
- VR-002: Campaign Dashboard Visual Consistency (Mobile)
- VR-003: CampaignCard States Visual Comparison

#### **Category: Performance Tests (2 cases)**
- PERF-001: Campaign Dashboard Load Performance
- PERF-002: Search and Filter Performance

#### **Category: Responsive Design Tests (2 cases)**
- RD-001: Mobile Viewport Adaptation
- RD-002: Tablet Viewport Optimization

## 🏷️ **Step 4: Apply Tagging Strategy**

### **Test Case Tags to Apply:**

#### **Type Tags:**
- `unit` - Unit tests (Jest/RTL)
- `integration` - Integration tests (Playwright)
- `e2e` - End-to-end tests (Playwright)
- `visual` - Visual regression tests
- `performance` - Performance tests
- `accessibility` - Accessibility tests (WCAG)
- `security` - Security tests

#### **Priority Tags:**
- `P1-critical` - Critical functionality
- `P2-high` - High priority features
- `P3-medium` - Medium priority features  
- `P4-low` - Low priority/nice-to-have

#### **Feature Tags:**
- `auth` - Authentication features
- `campaigns` - Campaign management
- `dashboard` - Dashboard components
- `forms` - Form components
- `ui-components` - UI library components

#### **Technology Tags:**
- `react` - React components
- `typescript` - TypeScript code
- `tailwind` - Tailwind CSS styling
- `playwright` - Playwright tests
- `jest` - Jest unit tests

#### **Device/Browser Tags:**
- `desktop` - Desktop tests
- `mobile` - Mobile tests
- `tablet` - Tablet tests
- `chrome` - Chrome browser
- `firefox` - Firefox browser
- `safari` - Safari browser

## 📊 **Step 5: Link Test Cases to Automation**

### **Automation Script Mapping:**

#### **Authentication Tests:**
```bash
# Unit Tests
tests/unit/auth-components.test.jsx

# Integration Tests  
tests/integration/auth-flow.test.tsx

# E2E Tests
tests/e2e/auth-components.spec.js

# Visual Tests
tests/visual/auth-visual.spec.js
```

#### **Campaign Tests:**
```bash
# Unit Tests
tests/unit/campaigns/CampaignCard.test.tsx

# Integration Tests
tests/integration/campaigns/CampaignsPage.test.tsx

# E2E Tests
tests/e2e/campaigns-flow.spec.js

# Visual Tests
tests/visual/campaigns-visual.spec.js

# Performance Tests
tests/performance/campaigns-perf.spec.js
```

## 🔄 **Step 6: Set Up Test Execution**

### **Execution Environments:**
1. **Development**: Local testing during development
2. **Staging**: Pre-production testing  
3. **Production**: Production smoke testing

### **Execution Schedule:**
```bash
# Continuous Integration (GitHub Actions)
On Commit:     Unit Tests (Jest)
On PR:         Unit + Integration + Visual Tests  
On Deploy:     Full Automated Test Suite
Daily:         Full Regression Testing
Weekly:        Manual + Security Testing
```

### **Test Result Reporting:**
- **Automated**: CI/CD pipeline reports to TCMS
- **Manual**: Manual test execution recorded in TCMS
- **Dashboard**: TCMS dashboard shows test coverage and results

## 📈 **Step 7: Quality Metrics Setup**

### **Coverage Targets:**
- Unit Tests: 90%+ code coverage
- Integration Tests: 80%+ user flow coverage
- E2E Tests: 100% critical path coverage
- Visual Tests: 100% UI component coverage
- Accessibility: 100% WCAG 2.1 AA compliance
- Security: 100% OWASP Top 10 coverage

### **Performance Thresholds:**
- Page Load: < 2 seconds
- Form Submission: < 1 second
- Search/Filter: < 500ms
- Visual Rendering: < 100ms

## 🚀 **Step 8: Implementation Checklist**

### **TCMS Setup:**
- [ ] Create P360 product
- [ ] Create Authentication Features test plan
- [ ] Create Campaign Management test plan  
- [ ] Import all authentication test cases (78 cases)
- [ ] Import all campaign test cases (35 cases)
- [ ] Apply proper tagging to all test cases
- [ ] Link test cases to automation scripts
- [ ] Set up test environments
- [ ] Configure test execution schedules

### **Automation Integration:**
- [ ] Connect GitHub Actions to TCMS
- [ ] Set up automated test result reporting
- [ ] Configure CI/CD test execution triggers
- [ ] Set up performance monitoring
- [ ] Configure security scanning integration

### **Process Integration:**
- [ ] Link JIRA stories to test plans
- [ ] Set up development-testing workflow
- [ ] Create test execution dashboards
- [ ] Train team on TCMS usage
- [ ] Document test management process

## 📋 **Available Import Files**

Use these files to import test cases:
- `tests/tcms-import-auth-testcases.json` - Authentication test cases
- `tests/tcms-import-campaign-testcases.json` - Campaign test cases  
- `tests/kiwi-tcms-structure-plan.md` - Complete structure documentation

---

## 🎯 **Expected Outcomes**

After completing this setup:
- ✅ **113 Total Test Cases** organized by feature
- ✅ **Complete Traceability** from JIRA stories to test cases
- ✅ **Automated Reporting** from CI/CD to TCMS
- ✅ **Quality Dashboards** showing test coverage and results
- ✅ **Scalable Structure** ready for additional features

*This structure provides enterprise-grade test management that scales with P360's growth while maintaining clear organization and comprehensive coverage.*
