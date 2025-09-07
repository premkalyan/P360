# P360 Figma MCP Testing - Focused Approach

## 🎯 **Clarified Scope: Test Generation ONLY**

### **✅ What MCP Should Do (FOCUSED)**
```typescript
// ONLY test case generation:
figma_generate_component_tests()     // → Ready-to-execute .test.tsx files
figma_generate_visual_tests()        // → Ready-to-execute .visual.spec.ts files  
figma_generate_storybook_stories()   // → Ready-to-execute .stories.tsx files
figma_generate_user_journey_tests()  // → Ready-to-execute .e2e.spec.ts files
```

### **❌ What MCP Should NOT Do (OUT OF SCOPE)**
```bash
❌ Package.json modifications
❌ Jest/testing framework setup
❌ Dependency installation  
❌ CI/CD pipeline configuration
❌ Build system configuration
❌ Environment setup
```

---

## 🚀 **Clean MCP Architecture**

### **📋 Prerequisites (User's Responsibility)**
```bash
# Project already has:
✅ Jest + React Testing Library installed
✅ @testing-library/user-event installed  
✅ jest-axe for accessibility testing
✅ Storybook configured (if needed)
✅ Playwright for E2E (if needed)

# MCP assumes these exist and generates compatible tests
```

### **⚡ MCP Workflow (Clean & Simple)**
```bash
# User says:
"Generate tests for this Figma component: [URL]"

# MCP does:
1. Analyzes Figma component
2. Generates ready-to-execute test files
3. Outputs files to specified directory

# User does:
npm test  # ← Tests run immediately, no setup needed
```

---

## 📝 **Generated Test Files (Examples)**

### **🧪 Component Unit Tests**
```typescript
// Generated: CampaignCard.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CampaignCard } from '../CampaignCard';

expect.extend(toHaveNoViolations);

describe('CampaignCard', () => {
  const figmaTestData = {
    name: 'Summer Flash Sale - 40% Off',  // From Figma design
    status: 'active',
    budget: 'US $23,324',               // From Figma examples
    impressions: '23,324 impressions'
  };

  // ✅ Generated from Figma variants
  describe('Variant Testing', () => {
    const variants = [
      { status: 'active', expectedClass: 'status-active' },
      { status: 'paused', expectedClass: 'status-paused' },
      { status: 'draft', expectedClass: 'status-draft' }
    ];

    variants.forEach(({ status, expectedClass }) => {
      test(`renders ${status} status correctly`, () => {
        render(<CampaignCard campaign={{ ...figmaTestData, status }} />);
        
        const statusElement = screen.getByText(status);
        expect(statusElement).toHaveClass(expectedClass);
      });
    });
  });

  // ✅ Generated from Figma interactions  
  test('handles edit button click', async () => {
    const user = userEvent.setup();
    const onEdit = jest.fn();
    
    render(<CampaignCard campaign={figmaTestData} onEdit={onEdit} />);
    
    await user.click(screen.getByRole('button', { name: /edit campaign/i }));
    expect(onEdit).toHaveBeenCalledWith(figmaTestData);
  });

  // ✅ Generated from Figma accessibility annotations
  test('meets accessibility requirements', async () => {
    const { container } = render(<CampaignCard campaign={figmaTestData} />);
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Keyboard navigation
    const editButton = screen.getByRole('button', { name: /edit/i });
    expect(editButton).toHaveAttribute('aria-label', `Edit campaign ${figmaTestData.name}`);
  });
});
```

### **🎨 Visual Regression Tests**
```typescript
// Generated: CampaignCard.visual.spec.ts
import { test, expect } from '@playwright/test';

test.describe('CampaignCard Visual Tests', () => {
  // ✅ Generated from Figma breakpoints
  const breakpoints = [
    { name: 'mobile', width: 375 },
    { name: 'tablet', width: 768 },
    { name: 'desktop', width: 1440 }
  ];

  breakpoints.forEach(({ name, width }) => {
    test(`matches Figma design - ${name}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/storybook/?path=/story/campaigncard--default');
      
      // Compare against Figma-exported reference
      await expect(page).toHaveScreenshot(`campaign-card-${name}.png`);
    });
  });

  // ✅ Generated from Figma states
  test('hover state matches design', async ({ page }) => {
    await page.goto('/storybook/?path=/story/campaigncard--default');
    
    const card = page.locator('[data-testid="campaign-card"]');
    await card.hover();
    
    await expect(card).toHaveScreenshot('campaign-card-hover.png');
  });
});
```

### **📚 Storybook Stories**
```typescript
// Generated: CampaignCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { CampaignCard } from './CampaignCard';

const meta: Meta<typeof CampaignCard> = {
  title: 'P360/Components/CampaignCard',
  component: CampaignCard,
  parameters: {
    docs: {
      description: {
        component: 'Campaign card component from Figma design system'
      }
    }
  },
  argTypes: {
    // ✅ Generated from Figma component properties
    status: {
      control: 'select',
      options: ['active', 'paused', 'draft', 'archived']
    }
  }
};

export default meta;
type Story = StoryObj<typeof CampaignCard>;

// ✅ Generated from Figma examples
export const Default: Story = {
  args: {
    campaign: {
      name: 'Summer Flash Sale - 40% Off',  // From Figma
      status: 'active',
      budget: 'US $23,324',
      impressions: '23,324 impressions'
    }
  }
};

export const Paused: Story = {
  args: {
    campaign: {
      ...Default.args.campaign,
      status: 'paused'
    }
  }
};

export const LongName: Story = {
  args: {
    campaign: {
      ...Default.args.campaign,
      name: 'Black Friday Mega Sale - Up to 70% Off Everything Plus Free Shipping'
    }
  }
};
```

---

## 🎯 **MCP Tool Specifications**

### **🔧 Core MCP Functions (4 Tools Only)**

```typescript
interface FigmaTestingMCP {
  // 1. Component Testing
  figma_generate_component_tests(
    fileKey: string, 
    nodeId: string, 
    options: {
      outputDir?: string;        // Default: '__tests__'
      testTypes?: ('unit' | 'accessibility' | 'interaction')[];
      framework?: 'jest' | 'vitest';  // Assumes already configured
    }
  ): GeneratedTestFiles;

  // 2. Visual Testing  
  figma_generate_visual_tests(
    fileKey: string,
    nodeId: string,
    options: {
      outputDir?: string;        // Default: 'e2e/visual'  
      breakpoints?: BreakpointConfig[];
      testRunner?: 'playwright' | 'cypress';  // Assumes already configured
    }
  ): VisualTestFiles;

  // 3. Storybook Stories
  figma_generate_storybook_stories(
    fileKey: string,
    nodeId: string, 
    options: {
      outputDir?: string;        // Default: 'src/stories'
      includeControls?: boolean; // Generate interactive controls
    }
  ): StorybookFiles;

  // 4. User Journey Tests
  figma_generate_user_journey_tests(
    fileKey: string,
    prototypeFlows: string[],
    options: {
      outputDir?: string;        // Default: 'e2e/journeys'
      testRunner?: 'playwright' | 'cypress';
    }
  ): E2ETestFiles;
}
```

---

## ⚡ **Simple Usage Examples**

### **🎯 Generate Component Tests**
```bash
# Cursor command:
"Generate Jest tests for this Figma CampaignCard component: 
https://figma.com/file/xyz/component/CampaignCard"

# MCP generates:
# → src/__tests__/CampaignCard.test.tsx
# → Ready to run with: npm test
```

### **🎨 Generate Visual Tests**  
```bash
# Cursor command:
"Generate visual regression tests for CampaignCard at mobile, tablet, desktop breakpoints"

# MCP generates:
# → e2e/visual/CampaignCard.visual.spec.ts  
# → Ready to run with: npx playwright test
```

### **📚 Generate Storybook Stories**
```bash  
# Cursor command:
"Create Storybook stories for the CampaignCard with all variants"

# MCP generates:
# → src/stories/CampaignCard.stories.tsx
# → Ready to run with: npm run storybook
```

---

## ✅ **Benefits of Focused Approach**

### **🎯 Clear Boundaries**
- **MCP**: Generate test content only
- **Project**: Handle infrastructure & execution
- **Clean separation** of concerns

### **⚡ Immediate Execution**  
```bash
# Generated tests work immediately:
npm test                    # Unit tests run
npx playwright test         # Visual tests run  
npm run storybook          # Stories load
npm run test:e2e           # Journey tests run
```

### **🔧 Framework Agnostic**
```typescript
// MCP can generate for different setups:
- Jest + RTL projects
- Vitest + RTL projects  
- Playwright visual testing
- Cypress E2E testing
- Storybook v6 or v7
```

### **🚀 No Dependencies**
```bash
# MCP doesn't modify:
✅ package.json stays untouched
✅ jest.config.js unchanged  
✅ CI/CD pipelines unaffected
✅ Build configuration intact
```

---

## 🎯 **Implementation Timeline**

### **Week 1: Core Component Testing**
```typescript
✅ figma_generate_component_tests()
   - Unit tests with Figma variants
   - Accessibility tests with a11y rules
   - User interaction tests from prototypes
```

### **Week 2: Visual & Documentation**  
```typescript
✅ figma_generate_visual_tests()  
   - Responsive breakpoint testing
   - State-based visual comparisons

✅ figma_generate_storybook_stories()
   - Interactive documentation
   - All component variants
```

### **Week 3: User Journeys**
```typescript
✅ figma_generate_user_journey_tests()
   - Multi-page flow testing
   - Form validation flows  
   - Error handling scenarios
```

---

## 💰 **Expected ROI (Focused Scope)**

**Time Savings Per Component:**
- **Manual test writing**: 2-3 hours
- **MCP generation**: 2-3 minutes  
- **Savings**: ~95% time reduction

**P360 Impact:**
- **50+ components** × 2.5 hours saved = **125 hours saved**
- **Value**: 125 hours × $150/hour = **$18,750 savings**

**Multi-project scaling** maintains same efficiency gains without infrastructure complexity.

---

## 🚀 **Ready to Build?**

This focused approach gives you:
- ✅ **Clean scope** - Test generation only
- ✅ **Immediate execution** - No setup required  
- ✅ **Framework compatibility** - Works with existing tooling
- ✅ **Maximum ROI** - Pure value-add without complexity

**Perfect balance of automation and simplicity!** 🎯

Should we start implementing the first tool: `figma_generate_component_tests()`?
