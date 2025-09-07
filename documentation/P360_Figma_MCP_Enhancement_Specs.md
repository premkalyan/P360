# P360 Figma MCP Enhancement Specifications

## 🎯 **Integration Strategy: GLips/Figma-Context-MCP + P360 Enhancements**

Based on analysis of the [Figma Context MCP](https://github.com/GLips/Figma-Context-MCP) repository, here are the specifications for bridging the gaps to create a seamless Figma → P360 codebase workflow.

---

## ✅ **What GLips/Figma-Context-MCP Provides (Perfect for P360)**

### **🔌 Core MCP Server Capabilities**
- **Design Context Extraction**: Simplified, AI-friendly JSON from Figma files/frames/nodes
- **Easy Integration**: `npx figma-developer-mcp --figma-api-key=KEY --stdio`
- **Active Development**: Frequent releases, PRs for improvements
- **Official Recognition**: Figma Dev Mode guidance compliant

### **💪 P360 Compatibility Strengths**
```typescript
// Example context this MCP already provides
interface FigmaContext {
  frames: Frame[];
  components: Component[];
  styles: Style[];
  layout: Layout[];
}
```

---

## 🚀 **P360-Specific Enhancement Specifications**

### **1. 🎨 Design Tokens → P360 Theme Integration**

#### **Gap**: No built-in Figma Variables → Tailwind/MUI theme conversion

#### **Enhancement Spec**: `P360FigmaTokensAdapter`
```typescript
// New MCP Tool: figma_tokens_to_p360_theme
interface P360TokensAdapter {
  extractFigmaVariables(fileId: string): Promise<FigmaVariables>;
  generateTailwindConfig(): TailwindConfig;
  generateMUITheme(): MUIThemeConfig;
  generateP360DesignSystem(): P360DesignTokens;
}

// Output Files Generated
const outputs = {
  "tailwind.config.ts": TailwindConfig,
  "src/theme/mui-theme.ts": MUIThemeConfig,
  "src/theme/design-tokens.ts": P360DesignTokens,
  "src/theme/figma-variables.json": RawFigmaVariables
};
```

#### **P360 Tailwind Config Generation**
```typescript
// Auto-generated from Figma Variables
export const p360TailwindConfig = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',   // From Figma Primary/50
          500: '#3b82f6',  // From Figma Primary/500
          900: '#1e3a8a'   // From Figma Primary/900
        },
        campaign: {
          active: '#10b981',   // From Figma Campaign/Active
          paused: '#f59e0b',   // From Figma Campaign/Paused
          ended: '#6b7280'     // From Figma Campaign/Ended
        }
      },
      spacing: {
        'dashboard': '24px',   // From Figma Dashboard/Spacing
        'card': '16px'         // From Figma Card/Padding
      },
      borderRadius: {
        'card': '12px',        // From Figma Card/Radius
        'button': '8px'        // From Figma Button/Radius
      }
    }
  }
};
```

#### **P360 MUI Theme Generation**
```typescript
// Auto-generated from Figma Variables
export const p360MUITheme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6',      // From Figma Primary
      light: '#93c5fd',     // From Figma Primary/Light
      dark: '#1d4ed8'       // From Figma Primary/Dark
    },
    campaign: {
      active: '#10b981',    // Custom P360 palette
      paused: '#f59e0b',
      ended: '#6b7280'
    }
  },
  typography: {
    h1: {
      fontSize: '2.5rem',   // From Figma Heading/Large
      fontWeight: 700,
      lineHeight: 1.2
    }
  },
  shape: {
    borderRadius: 12       // From Figma Global/Radius
  }
});
```

---

### **2. 🧬 P360 Component Recognition & Mapping**

#### **Gap**: No Figma Component → MUI Component mapping

#### **Enhancement Spec**: `P360ComponentMapper`
```typescript
// New MCP Tool: figma_component_to_p360_mapping
interface P360ComponentMapper {
  analyzeFigmaComponent(component: FigmaComponent): P360ComponentSpec;
  generateMUIImplementation(spec: P360ComponentSpec): ReactComponent;
  mapToP360Pattern(pattern: string): P360ComponentType;
}

// P360-Specific Component Patterns
const P360_COMPONENT_MAPPINGS = {
  // Campaign Management Components
  "CampaignCard": {
    figmaPattern: /campaign.*card|card.*campaign/i,
    muiComponent: "Card",
    tailwindClasses: "bg-white rounded-xl shadow-sm p-6",
    customProps: ["status", "budget", "metrics"]
  },
  
  // Data Table Components  
  "CampaignDataGrid": {
    figmaPattern: /table.*campaign|campaign.*table|data.*grid/i,
    muiComponent: "DataGrid",
    tailwindClasses: "w-full bg-white rounded-lg",
    customProps: ["columns", "rows", "pagination", "sorting"]
  },
  
  // Form Components
  "AudienceBuilder": {
    figmaPattern: /audience.*builder|builder.*audience/i,
    muiComponent: "TreeView",
    tailwindClasses: "bg-gray-50 rounded-lg p-4",
    customProps: ["criteria", "operators", "preview"]
  },
  
  // Navigation Components
  "P360Sidebar": {
    figmaPattern: /sidebar|navigation|nav/i,
    muiComponent: "Drawer",
    tailwindClasses: "w-64 bg-white shadow-sm",
    customProps: ["menuItems", "activeRoute", "collapsed"]
  }
};
```

#### **Generated P360 Components**
```tsx
// Auto-generated from Figma CampaignCard component
export const CampaignCard: React.FC<CampaignCardProps> = ({ 
  campaign, 
  onEdit, 
  onPause 
}) => {
  return (
    <Card className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <Box className="flex justify-between items-start mb-4">
        <Typography variant="h6" className="font-semibold">
          {campaign.name}
        </Typography>
        <Chip 
          label={campaign.status}
          color={getStatusColor(campaign.status)}
          size="small"
        />
      </Box>
      
      <Box className="grid grid-cols-2 gap-4 mb-4">
        <MetricCard label="Budget" value={campaign.budget} />
        <MetricCard label="Impressions" value={campaign.impressions} />
      </Box>
      
      <Box className="flex gap-2">
        <Button 
          variant="outlined" 
          size="small"
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button 
          variant="outlined" 
          size="small"
          color={campaign.status === 'active' ? 'warning' : 'primary'}
          onClick={onPause}
        >
          {campaign.status === 'active' ? 'Pause' : 'Resume'}
        </Button>
      </Box>
    </Card>
  );
};
```

---

### **3. 📐 P360 Layout & Responsive Mapping**

#### **Gap**: No deterministic Figma layout → Next.js App Router mapping

#### **Enhancement Spec**: `P360LayoutMapper`
```typescript
// New MCP Tool: figma_layout_to_p360_pages
interface P360LayoutMapper {
  analyzePageStructure(frame: FigmaFrame): P360PageStructure;
  generateAppRouterPage(structure: P360PageStructure): NextJSPage;
  mapResponsiveBreakpoints(layout: FigmaLayout): TailwindBreakpoints;
}

// P360 Page Structure Recognition
const P360_PAGE_PATTERNS = {
  // Dashboard Pages
  "dashboard": {
    figmaPattern: /dashboard|overview/i,
    routePath: "/dashboard",
    layout: "DashboardLayout",
    components: ["Sidebar", "Header", "MetricsGrid", "ChartContainer"]
  },
  
  // Campaign Management
  "campaigns": {
    figmaPattern: /campaign.*management|campaigns/i,
    routePath: "/campaigns",
    layout: "CampaignLayout", 
    components: ["CampaignDataGrid", "FilterBar", "ActionButtons"]
  },
  
  // Audience Builder
  "audience-builder": {
    figmaPattern: /audience.*builder|targeting/i,
    routePath: "/audiences/builder",
    layout: "BuilderLayout",
    components: ["AudienceTree", "PreviewPanel", "SaveActions"]
  }
};
```

#### **Generated Next.js App Router Pages**
```tsx
// Auto-generated: app/campaigns/page.tsx
export default function CampaignsPage() {
  return (
    <CampaignLayout>
      <div className="flex flex-col gap-6 p-6">
        {/* Header Section - From Figma PageHeader component */}
        <div className="flex justify-between items-center">
          <Typography variant="h4" className="font-bold">
            Campaign Management
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            className="bg-primary-500 hover:bg-primary-600"
          >
            Create Campaign
          </Button>
        </div>
        
        {/* Filters Section - From Figma FilterBar component */}
        <Paper className="p-4 bg-white rounded-lg">
          <CampaignFilters />
        </Paper>
        
        {/* Data Grid - From Figma CampaignTable component */}
        <Paper className="flex-1 bg-white rounded-lg overflow-hidden">
          <CampaignDataGrid />
        </Paper>
      </div>
    </CampaignLayout>
  );
}
```

---

### **4. 🖼️ P360 Asset Pipeline Integration**

#### **Gap**: No automated asset export → Next.js public/ folder

#### **Enhancement Spec**: `P360AssetPipeline`
```typescript
// New MCP Tool: figma_assets_to_p360_pipeline
interface P360AssetPipeline {
  extractImages(fileId: string): Promise<FigmaImage[]>;
  exportIcons(format: 'svg' | 'react'): Promise<IconExport[]>;
  optimizeAssets(): Promise<OptimizedAssets>;
  generateAssetIndex(): AssetIndex;
}

// P360 Asset Organization
const P360_ASSET_STRUCTURE = {
  "public/images/": {
    "campaigns/": ["campaign-bg.jpg", "success-illustration.svg"],
    "audiences/": ["audience-builder-bg.svg", "targeting-icons.svg"],
    "dashboard/": ["dashboard-hero.jpg", "metrics-icons.svg"]
  },
  "src/components/icons/": {
    "generated/": "Auto-generated React icon components from Figma"
  },
  "src/assets/": {
    "asset-index.ts": "TypeScript index of all assets with metadata"
  }
};
```

#### **Generated Asset Index**
```typescript
// Auto-generated: src/assets/asset-index.ts
export const P360_ASSETS = {
  images: {
    campaigns: {
      background: '/images/campaigns/campaign-bg.jpg',
      success: '/images/campaigns/success-illustration.svg'
    },
    dashboard: {
      hero: '/images/dashboard/dashboard-hero.jpg',
      metricsIcons: '/images/dashboard/metrics-icons.svg'
    }
  },
  icons: {
    Campaign: lazy(() => import('./icons/generated/Campaign')),
    Audience: lazy(() => import('./icons/generated/Audience')),
    Analytics: lazy(() => import('./icons/generated/Analytics'))
  }
} as const;

// Usage in components
import { P360_ASSETS } from '@/assets/asset-index';

<Image 
  src={P360_ASSETS.images.dashboard.hero}
  alt="Dashboard Hero"
  className="w-full h-48 object-cover rounded-lg"
/>
```

---

### **5. 🔄 P360 Development Workflow Integration**

#### **Gap**: No round-trip design updates → code regeneration

#### **Enhancement Spec**: `P360DesignSync`
```typescript
// New MCP Tool: figma_sync_to_p360_codebase
interface P360DesignSync {
  detectDesignChanges(fileId: string): Promise<DesignDelta[]>;
  generateCodeUpdates(deltas: DesignDelta[]): Promise<CodeUpdate[]>;
  updateP360Components(updates: CodeUpdate[]): Promise<SyncResult>;
  createPullRequest(changes: SyncResult): Promise<PRResult>;
}

// P360 Sync Workflow
const P360_SYNC_WORKFLOW = {
  trigger: "Figma webhook or manual sync",
  steps: [
    "1. Detect Figma design changes",
    "2. Analyze impact on P360 components", 
    "3. Generate updated TypeScript/React code",
    "4. Create GitHub PR with changes",
    "5. Run automated tests on design updates"
  ]
};
```

---

## 🎯 **P360 Cursor Codegen Recipe**

### **Enhanced Cursor Recipe for P360 + Figma MCP**
```markdown
## P360 Figma Implementation Recipe

When implementing Figma designs for P360:

1. **Context**: Use Figma MCP to fetch frame/component context
2. **Tokens**: Apply P360 design system (Tailwind + MUI theme)
3. **Components**: Map to P360-specific MUI components
4. **Layout**: Use Next.js App Router structure
5. **Assets**: Reference P360 asset index
6. **Types**: Generate TypeScript interfaces for all props
7. **Validation**: Add React Hook Form + Yup validation for forms
8. **Responsive**: Apply P360 responsive breakpoints
9. **Accessibility**: Include ARIA labels and semantic HTML
10. **Testing**: Generate React Testing Library test cases

### P360 Component Patterns:
- Campaign Management: DataGrid + Card layouts
- Audience Builder: TreeView + Preview Panel
- Dashboard: Metrics Grid + Chart containers
- Forms: Hook Form + Material UI inputs
- Navigation: Persistent Drawer + Breadcrumbs

### P360 Styling Rules:
- Primary: Tailwind utilities for spacing/layout
- Secondary: MUI components for complex interactions
- Colors: Use P360 theme variables
- Typography: MUI Typography component
- Icons: Use P360 generated icon components
```

---

## 📋 **Implementation Roadmap**

### **Phase 1: Foundation (Week 1)**
- ✅ Setup GLips/Figma-Context-MCP with P360 API key
- 🔧 Create P360TokensAdapter for theme generation
- 📐 Build P360ComponentMapper for MUI mapping

### **Phase 2: Automation (Week 2)**  
- 🖼️ Implement P360AssetPipeline for image/icon export
- 📄 Create P360LayoutMapper for App Router pages
- 🎯 Design enhanced Cursor codegen recipe

### **Phase 3: Workflow (Week 3)**
- 🔄 Build P360DesignSync for change detection
- 🧪 Add automated testing for generated components
- 📊 Create design-code consistency reporting

---

## 🎯 **Expected P360 Workflow Result**

```bash
# Designer updates Figma file
# Developer runs enhanced MCP workflow:

1. "Hey Cursor, implement the updated Campaign Dashboard from Figma"
2. Cursor fetches Figma context via MCP
3. Enhanced MCP generates P360-specific theme tokens
4. Cursor maps components to MUI + Tailwind patterns
5. Generated Next.js page with proper TypeScript types
6. Automated asset export and optimization
7. Ready-to-test P360 dashboard page

# Result: 90%+ design fidelity, production-ready P360 code
```

**This enhanced MCP setup will make P360's Figma → Code workflow incredibly efficient and accurate!** 🚀

---

## 📚 **References**
- [GLips/Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP) - Base MCP server
- [Figma Developer API](https://www.figma.com/developers/api) - API documentation
- [P360 Technical Architecture](./P360_Technical_Architecture_Explained.md) - Our tech stack details
