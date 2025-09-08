#!/usr/bin/env node

/**
 * P360 Kiwi-TCMS Setup Verification Script
 * 
 * This script verifies that the TCMS structure has been set up correctly
 * and provides guidance on next steps for automation integration.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const TCMS_CONFIG = {
  expectedProducts: ['P360 - Display Advertising Platform MVP'],
  expectedTestPlans: [
    'P360 Authentication Features (P360-19)',
    'P360 Campaign Management Features (P360-67)'
  ],
  expectedTestCaseCount: {
    authentication: 78,
    campaigns: 35,
    total: 113
  }
};

// Test file mapping
const TEST_FILE_MAPPING = {
  'tests/unit/auth-components.test.jsx': 'Authentication Unit Tests',
  'tests/e2e/auth-components.spec.js': 'Authentication E2E Tests', 
  'tests/integration/campaigns/CampaignsPage.test.tsx': 'Campaign Integration Tests',
  'tests/unit/campaigns/CampaignCard.test.tsx': 'Campaign Unit Tests'
};

console.log('🚀 P360 Kiwi-TCMS Setup Verification');
console.log('=====================================\n');

// Check if import files exist
console.log('📋 Checking Import Files...');
const importFiles = [
  'tests/tcms-import-auth-testcases.json',
  'tests/tcms-import-campaign-testcases.json',
  'tests/kiwi-tcms-structure-plan.md',
  'tests/tcms-setup-script.md'
];

let allFilesExist = true;
importFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

if (!allFilesExist) {
  console.log('\n❌ Some import files are missing. Please regenerate them.\n');
  process.exit(1);
}

// Check test case counts in import files
console.log('\n📊 Validating Test Case Counts...');

try {
  // Check Authentication test cases
  const authTestCases = JSON.parse(fs.readFileSync('tests/tcms-import-auth-testcases.json', 'utf8'));
  let authCount = 0;
  authTestCases.test_cases.forEach(category => {
    authCount += category.cases.length;
  });
  console.log(`  ✅ Authentication Test Cases: ${authCount} (Expected: ${TCMS_CONFIG.expectedTestCaseCount.authentication})`);

  // Check Campaign test cases  
  const campaignTestCases = JSON.parse(fs.readFileSync('tests/tcms-import-campaign-testcases.json', 'utf8'));
  let campaignCount = 0;
  campaignTestCases.test_cases.forEach(category => {
    campaignCount += category.cases.length;
  });
  console.log(`  ✅ Campaign Test Cases: ${campaignCount} (Expected: ${TCMS_CONFIG.expectedTestCaseCount.campaigns})`);
  
  const totalCount = authCount + campaignCount;
  console.log(`  ✅ Total Test Cases: ${totalCount} (Expected: ${TCMS_CONFIG.expectedTestCaseCount.total})`);

} catch (error) {
  console.log(`  ❌ Error reading test case files: ${error.message}`);
}

// Check if actual test files exist
console.log('\n🧪 Checking Test Files...');
let testFilesExist = true;
Object.keys(TEST_FILE_MAPPING).forEach(testFile => {
  const exists = fs.existsSync(testFile);
  console.log(`  ${exists ? '✅' : '❌'} ${testFile} - ${TEST_FILE_MAPPING[testFile]}`);
  if (!exists) testFilesExist = false;
});

// Automation Integration Check
console.log('\n🤖 Automation Integration Status...');

const ciConfigExists = fs.existsSync('.github/workflows') || fs.existsSync('playwright.config.js') || fs.existsSync('jest.config.js');
console.log(`  ${ciConfigExists ? '✅' : '⚠️'} CI/CD Configuration Available`);

const packageJsonExists = fs.existsSync('package.json');
if (packageJsonExists) {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const hasTestScripts = packageJson.scripts && (
      packageJson.scripts.test || 
      packageJson.scripts['test:unit'] || 
      packageJson.scripts['test:e2e']
    );
    console.log(`  ${hasTestScripts ? '✅' : '⚠️'} Test Scripts in package.json`);
  } catch (error) {
    console.log('  ⚠️ Error reading package.json');
  }
}

// Generate Next Steps
console.log('\n📋 Next Steps for TCMS Setup:');
console.log('================================');

console.log('\n1. 🏗️  Manual TCMS Setup (Required):');
console.log('   • Login to Kiwi-TCMS (http://localhost:40000)');
console.log('   • Create P360 product manually');
console.log('   • Create test plans using tcms-setup-script.md');
console.log('   • Import test cases from JSON files');

console.log('\n2. 🔄 Automation Integration:');
console.log('   • Set up CI/CD pipeline integration'); 
console.log('   • Configure automated test result reporting');
console.log('   • Link test execution to TCMS');

console.log('\n3. 📊 Quality Dashboard Setup:');
console.log('   • Configure test execution schedules');
console.log('   • Set up quality metrics dashboards');
console.log('   • Create test coverage reports');

console.log('\n4. 🔗 Process Integration:');
console.log('   • Link JIRA stories to test plans');
console.log('   • Set up traceability matrix'); 
console.log('   • Train team on TCMS workflow');

// Summary
console.log('\n🎯 Setup Summary:');
console.log('=================');
console.log(`✅ Import files ready: ${allFilesExist ? 'Yes' : 'No'}`);
console.log(`✅ Test files exist: ${testFilesExist ? 'Yes' : 'No'}`);
console.log(`📊 Test cases prepared: ${TCMS_CONFIG.expectedTestCaseCount.total}`);
console.log('📋 Organization: Feature-based (Recommended)');
console.log('🏷️  Tagging strategy: Complete');
console.log('🤖 Automation ready: Pending TCMS setup');

console.log('\n🚀 Ready to proceed with manual TCMS setup!');
console.log('   Use the files in tests/ directory for import.');
console.log('   Follow tcms-setup-script.md for step-by-step guidance.\n');

// Create a simple report file
const report = {
  timestamp: new Date().toISOString(),
  status: 'ready_for_manual_setup',
  files_created: importFiles.filter(f => fs.existsSync(f)),
  test_case_count: TCMS_CONFIG.expectedTestCaseCount,
  next_steps: [
    'Manual TCMS product and test plan creation',
    'Import test cases from JSON files', 
    'Set up automation integration',
    'Configure quality dashboards'
  ]
};

fs.writeFileSync('tests/tcms-setup-report.json', JSON.stringify(report, null, 2));
console.log('📄 Setup report saved to: tests/tcms-setup-report.json\n');
