# P360 Figma → Cursor Implementation Recipe

## 🎯 **Cursor Codegen Recipe for P360 Tech Stack**

This recipe is designed to work with the [GLips/Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP) and generate production-ready P360 code.

---

## 📋 **Pre-Implementation Checklist**

Before asking Cursor to implement a Figma design:

```bash
✅ Figma MCP server running with P360 API key
✅ Figma file/frame URL ready
✅ P360 codebase context loaded
✅ Target component/page location identified
```

---

## 🎨 **P360 Implementation Prompt Template**

### **Core Implementation Prompt**
```markdown
Please implement this Figma design for P360 using our established tech stack:

**Figma Design**: [PASTE_FIGMA_URL_HERE]

**P360 Tech Stack Requirements**:
- Next.js 14 with App Router
- React 18 + TypeScript (strict mode)
- Tailwind CSS + Material-UI components
- React Hook Form + Yup validation (for forms)

**P360 Design System**:
- Primary Colors: Use `primary-500`, `primary-600` etc.
- Campaign Status: `campaign-active`, `campaign-paused`, `campaign-ended`
- Spacing: Tailwind utilities preferred (p-4, gap-6, etc.)
- Components: Material-UI for complex interactions, Tailwind for layout
- Typography: MUI Typography component with Tailwind classes

**P360 Component Patterns**:
- Campaign Cards: Card + status chips + metric display
- Data Tables: MUI DataGrid with Tailwind styling
- Forms: Hook Form + MUI inputs + Yup validation
- Navigation: MUI Drawer + Tailwind layout
- Dashboards: Grid layouts with metric cards and charts

**Code Requirements**:
- Generate complete TypeScript interfaces
- Include proper error handling
- Add loading states for async operations
- Responsive design (mobile-first)
- Semantic HTML with ARIA labels
- Export as default React component

**File Structure**:
- Components: `src/components/[feature]/ComponentName.tsx`
- Pages: `app/[route]/page.tsx` (App Router)
- Types: `src/types/[feature].ts`
- Hooks: `src/hooks/use[FeatureName].ts`

Please analyze the Figma design and implement it following these P360 patterns.
```

### **Campaign Management Specific**
```markdown
For Campaign Management components, ensure:

**Data Structures**:
- Campaign status: 'active' | 'paused' | 'ended' | 'draft'
- Budget tracking with currency formatting
- Metrics: impressions, clicks, conversions, CTR, CPC

**MUI Components to Use**:
- DataGrid for campaign tables
- Card for campaign summaries
- Chip for status indicators
- LinearProgress for budget utilization
- DateRangePicker for campaign dates

**Tailwind Patterns**:
- Grid layouts: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Card spacing: `p-6 gap-4`
- Status colors: `bg-green-100 text-green-800` (active), `bg-yellow-100 text-yellow-800` (paused)
```

### **Audience Builder Specific**
```markdown
For Audience Builder components, ensure:

**Interactive Elements**:
- Drag & drop criteria building
- Real-time audience size preview
- AND/OR logical operators
- Criteria validation

**MUI Components to Use**:
- TreeView for criteria structure
- Autocomplete for targeting options
- ToggleButtonGroup for AND/OR operators
- Paper for criteria containers
- Tooltip for criteria explanations

**Data Flow**:
- Use React Hook Form for form state
- Yup validation for criteria rules
- Debounced preview updates
- Local state for drag & drop
```

---

## 🔧 **Step-by-Step Implementation Flow**

### **Step 1: Design Analysis**
```markdown
Analyze the Figma design and identify:
1. Main layout structure (header, sidebar, content, footer)
2. Interactive components (buttons, forms, tables)
3. Data display patterns (cards, lists, grids)
4. Navigation elements (tabs, breadcrumbs, menus)
5. Content hierarchy (headings, sections, spacing)
```

### **Step 2: Component Mapping**
```markdown
Map Figma components to P360 patterns:

Figma Button → MUI Button + Tailwind classes
Figma Table → MUI DataGrid + custom columns
Figma Card → MUI Card + Tailwind layout
Figma Form → React Hook Form + MUI inputs
Figma Navigation → MUI Drawer + routing

Generate TypeScript interfaces for all data structures.
```

### **Step 3: Layout Implementation**
```markdown
Implement responsive layout:

1. Mobile-first approach with Tailwind breakpoints
2. Flexible grid systems: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
3. Proper spacing: `gap-4 p-6 mb-8`
4. Container constraints: `max-w-7xl mx-auto`
5. Safe areas for mobile: `px-4 py-6`
```

### **Step 4: Interaction Logic**
```markdown
Add P360 business logic:

1. Form validation with Yup schemas
2. API integration patterns
3. Loading and error states
4. Optimistic updates for better UX
5. Proper TypeScript typing for all handlers
```

### **Step 5: Polish & Testing**
```markdown
Final implementation checks:

1. Accessibility: ARIA labels, semantic HTML, keyboard navigation
2. Performance: React.memo for complex components, useMemo for calculations
3. Error boundaries: Proper error handling for network/data issues
4. Responsive testing: Mobile, tablet, desktop layouts
5. Type safety: No TypeScript errors or warnings
```

---

## 📝 **Example Implementation Prompts**

### **Campaign Dashboard**
```markdown
Implement the Campaign Dashboard from Figma for P360:

**Figma URL**: [URL]

This should be a dashboard page showing:
- Header with "Campaign Management" title and "Create Campaign" button
- Filter bar with search, status filter, date range picker
- Campaign data grid with columns: Name, Status, Budget, Impressions, CTR, Actions
- Each row should have Edit/Pause/Delete action buttons
- Status should be color-coded chips
- Metrics should be formatted (1.2K, 2.3M, $10K, 2.4%)

Use App Router structure: `app/campaigns/page.tsx`
Include proper TypeScript interfaces for Campaign data
Add loading states and error handling
Make it fully responsive
```

### **Audience Builder Interface**
```markdown
Implement the Audience Builder interface from Figma for P360:

**Figma URL**: [URL]

This should include:
- Left panel: Drag & drop criteria builder with TreeView structure
- Center panel: AND/OR operator toggles between criteria groups
- Right panel: Live audience preview with count and demographics
- Bottom actions: Save, Reset, Preview Campaign buttons

Key features:
- Real-time audience size calculation (debounced)
- Drag & drop criteria reordering
- Nested criteria groups with proper indentation
- Form validation for all criteria inputs
- Auto-save to localStorage

Use React Hook Form for state management
Include proper TypeScript interfaces
Add comprehensive error handling
```

### **Campaign Creation Form**
```markdown
Implement the Campaign Creation Form from Figma for P360:

**Figma URL**: [URL]

Multi-step form with:
1. Basic Info: Name, Description, Objective
2. Targeting: Audience selection, Geography, Demographics  
3. Budget & Schedule: Daily budget, Total budget, Start/end dates
4. Creative: Ad upload, Preview, A/B testing options
5. Review: Summary of all settings before creation

Requirements:
- Use React Hook Form with Yup validation
- Step-by-step progress indicator
- Save draft functionality
- Form data persistence between steps
- Proper error messaging for each field
- Integration with P360 campaign API

Generate proper TypeScript interfaces for all form data
Include comprehensive validation rules
Add loading states for async operations
```

---

## 🎯 **P360 Code Quality Standards**

### **TypeScript Requirements**
```typescript
// Always include comprehensive interfaces
interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  budget: {
    daily: number;
    total: number;
    spent: number;
    currency: string;
  };
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    cpc: number;
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy: User;
}

// Use proper error handling
interface ApiResponse<T> {
  data?: T;
  error?: string;
  loading: boolean;
}
```

### **Component Structure**
```tsx
// Standard P360 component pattern
interface ComponentProps {
  // Props interface
}

export default function Component({ ...props }: ComponentProps) {
  // Hooks
  // State management
  // Event handlers
  // Effects
  
  // Loading state
  if (loading) return <LoadingSpinner />;
  
  // Error state  
  if (error) return <ErrorMessage error={error} />;
  
  // Main render
  return (
    <div className="tailwind-classes">
      <MUIComponent />
    </div>
  );
}
```

### **Form Implementation**
```tsx
// Standard P360 form pattern
const schema = yup.object().shape({
  name: yup.string().required('Campaign name is required'),
  budget: yup.number().positive().required('Budget must be positive')
});

export default function CampaignForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    // API call with error handling
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Campaign Name"
            error={!!errors.name}
            helperText={errors.name?.message}
            className="w-full mb-4"
          />
        )}
      />
    </form>
  );
}
```

---

## 🚀 **Advanced P360 Patterns**

### **Data Grid with Actions**
```tsx
const campaignColumns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Campaign Name',
    flex: 1,
    renderCell: (params) => (
      <Link 
        href={`/campaigns/${params.row.id}`}
        className="text-primary-600 hover:underline"
      >
        {params.value}
      </Link>
    )
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={getStatusColor(params.value)}
        size="small"
      />
    )
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 180,
    sortable: false,
    renderCell: (params) => (
      <CampaignActions campaign={params.row} />
    )
  }
];
```

### **Responsive Dashboard Grid**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
  {metrics.map((metric) => (
    <MetricCard
      key={metric.id}
      title={metric.title}
      value={metric.value}
      change={metric.change}
      trend={metric.trend}
    />
  ))}
</div>
```

### **Loading & Error States**
```tsx
// Comprehensive state management
const [campaigns, setCampaigns] = useState<Campaign[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

// Always include proper error boundaries
if (loading) {
  return (
    <Box className="flex justify-center items-center h-64">
      <CircularProgress />
      <Typography className="ml-4">Loading campaigns...</Typography>
    </Box>
  );
}

if (error) {
  return (
    <Alert severity="error" className="mb-4">
      <AlertTitle>Error Loading Campaigns</AlertTitle>
      {error}
      <Button onClick={refetch} className="ml-4">
        Retry
      </Button>
    </Alert>
  );
}
```

---

## ✅ **Implementation Success Criteria**

A successful P360 Figma implementation should:

- ✅ **Match Design**: 95%+ visual fidelity to Figma
- ✅ **Type Safe**: Zero TypeScript errors
- ✅ **Responsive**: Works on mobile, tablet, desktop
- ✅ **Accessible**: ARIA labels, keyboard navigation
- ✅ **Performant**: Fast loading, smooth interactions
- ✅ **Maintainable**: Clean code, proper structure
- ✅ **Tested**: Edge cases handled, error states
- ✅ **Integrated**: Works with P360 backend APIs

**This recipe ensures every Figma design becomes production-ready P360 code!** 🚀
