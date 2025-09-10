# P360 Typography System Documentation

## 📖 Overview

This document outlines the P360 Typography System extracted from the Figma design system and implemented as global CSS and Tailwind utilities.

**Figma Source**: [Pipeline360-Org Typography](https://www.figma.com/design/Up2CJnciTWVAk85iTJh6ri/Pipeline360-Org?node-id=7-5610)

## 🎯 Design Principles

- **Primary Font**: Lexend Deca (optimized for reading comprehension)
- **Secondary Font**: Plus Jakarta Sans (for metadata and secondary content)
- **Consistency**: All typography follows exact Figma design tokens
- **Accessibility**: WCAG-compliant contrast ratios and readable font sizes
- **Responsive**: Mobile-first responsive scaling

## 📏 Typography Scale

### Titles (Display Typography)
Large, bold text for hero sections and major headings.

| Class | Font Size | Line Height | Letter Spacing | Font Weight | Usage |
|-------|-----------|-------------|----------------|-------------|-------|
| `p360-title-1` | 56px | 64px | -0.8px | 700 (Bold) | Hero titles, main page headers |
| `p360-title-2` | 48px | 56px | -0.8px | 700 (Bold) | Section titles, large callouts |
| `p360-title-3` | 40px | 48px | -0.8px | 700 (Bold) | Subsection titles |

### Headings (H1-H4)
Semantic headings for content hierarchy.

| Class | Font Size | Line Height | Letter Spacing | Font Weight | Usage |
|-------|-----------|-------------|----------------|-------------|-------|
| `p360-h1` | 28px | 32px | -0.4px | 600 (SemiBold) | Main content headings |
| `p360-h2` | 24px | 30px | -0.4px | 600 (SemiBold) | Section headings |
| `p360-h3` | 20px | 28px | -0.4px | 600 (SemiBold) | Subsection headings |
| `p360-h4` | 18px | 24px | -0.2px | 600 (SemiBold) | Minor headings |

### Body Text
Standard text for content and UI elements.

| Class | Font Size | Line Height | Letter Spacing | Font Weight | Usage |
|-------|-----------|-------------|----------------|-------------|-------|
| `p360-body-1` | 16px | 22px | 0px | 400 (Regular) | Primary body text |
| `p360-body-1-medium` | 16px | 22px | 0px | 500 (Medium) | Emphasized body text |
| `p360-body-2` | 14px | 20px | 0px | 400 (Regular) | Secondary body text |
| `p360-body-2-medium` | 14px | 20px | 0px | 500 (Medium) | Labels, form text |
| `p360-body-3` | 12px | 16px | 0px | 400 (Regular) | Captions, metadata |
| `p360-body-3-medium` | 12px | 16px | 0px | 500 (Medium) | Small labels |

## 🎨 Color System

Typography colors follow the P360 design system:

| Class | Color | Hex | Usage |
|-------|-------|-----|-------|
| `p360-text-primary` | Gray/900 | #090c1d | Main content text |
| `p360-text-secondary` | Gray/600 | #3d4466 | Secondary content |
| `p360-text-muted` | Fonts/Secondary | #5d5d85 | Muted text |
| `p360-text-subtle` | Gray/400 | #8085a0 | Subtle text |
| `p360-text-light` | Grays/500 | #8180a0 | Light text |
| `p360-text-black` | Neutral/Black | #222222 | Pure black |
| `p360-text-white` | Base/White | #ffffff | White text |

## 🔧 Implementation

### 1. CSS Classes (Recommended)

```css
/* Use P360 typography classes */
.hero-title { @apply p360-title-1 p360-text-primary; }
.section-heading { @apply p360-h2 p360-text-secondary; }
.body-text { @apply p360-body-1 p360-text-primary; }
```

### 2. Tailwind Utilities

```html
<!-- Title typography -->
<h1 class="text-p360-title-1 font-bold text-p360-primary tracking-p360-tight">
  Main Title
</h1>

<!-- Heading typography -->
<h2 class="text-p360-h2 font-semibold text-p360-secondary tracking-p360-snug">
  Section Heading
</h2>

<!-- Body typography -->
<p class="text-p360-body-1 font-normal text-p360-primary">
  Body text content
</p>
```

### 3. CSS Custom Properties

```css
/* Use CSS variables directly */
.custom-text {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-1);
  line-height: var(--line-height-body-1);
  color: var(--color-text-primary);
}
```

## 📱 Responsive Typography

Mobile-first responsive scaling is built into the system:

```css
/* Automatic mobile scaling for titles */
@media (max-width: 768px) {
  .p360-title-1 { font-size: 42px; }  /* 75% of desktop */
  .p360-title-2 { font-size: 38px; }  /* 80% of desktop */
  .p360-title-3 { font-size: 34px; }  /* 85% of desktop */
}
```

## 🧩 Component Examples

### Button Typography
```html
<button class="p360-button-text bg-p360-purple text-white">
  Button Text
</button>
```

### Form Elements
```html
<label class="p360-label p360-text-secondary">
  Form Label
</label>
<input class="p360-input p360-text-primary" />
```

### Cards and Content
```html
<div class="p360-card">
  <h3 class="p360-h3 p360-text-primary">Card Title</h3>
  <p class="p360-body-2 p360-text-muted">Card description</p>
</div>
```

## 🔄 Migration Guide

### From Inter to Lexend Deca

1. **Replace font imports:**
   ```css
   /* OLD */
   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700');
   
   /* NEW */
   @import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300;400;500;600;700;800');
   ```

2. **Update font-family classes:**
   ```html
   <!-- OLD -->
   <div class="font-inter">
   
   <!-- NEW -->
   <div class="font-p360">
   ```

3. **Migrate to semantic classes:**
   ```html
   <!-- OLD -->
   <h1 class="text-4xl font-bold text-gray-900">
   
   <!-- NEW -->
   <h1 class="p360-title-2 p360-text-primary">
   ```

## 🎭 Advanced Usage

### Custom Typography Mixins

```scss
// Sass mixins for custom components
@mixin p360-title($level: 1) {
  font-family: var(--font-family-primary);
  @if $level == 1 {
    font-size: var(--font-size-title-1);
    line-height: var(--line-height-title-1);
  }
  // ... other levels
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-title);
}
```

### Theme Switching

```css
/* Dark mode typography adjustments */
[data-theme="dark"] {
  --color-text-primary: #ffffff;
  --color-text-secondary: #e5e5e5;
  --color-text-muted: #a0a0a0;
}
```

## ✅ Best Practices

1. **Consistency**: Always use P360 typography classes instead of arbitrary values
2. **Semantic HTML**: Use proper heading hierarchy (h1 → h2 → h3)
3. **Accessibility**: Maintain proper contrast ratios
4. **Performance**: Use system fonts as fallbacks
5. **Testing**: Test typography across different devices and screen sizes

## 📊 Performance Impact

- **Font Loading**: Optimized with `display=swap` for better LCP
- **File Size**: Lexend Deca subset loaded (300-800 weights only)
- **Fallbacks**: System fonts ensure typography works without network

## 🐛 Troubleshooting

### Common Issues

1. **Font not loading**: Check Google Fonts URL and internet connection
2. **Inconsistent spacing**: Ensure line-height values are properly applied
3. **Mobile scaling**: Test responsive behavior on actual devices

### Debug Mode

```css
/* Add temporary borders to debug typography */
.debug-typography * {
  outline: 1px solid red;
}
```

---

## 📋 Checklist for Implementation

- [ ] Import typography.css in main CSS file
- [ ] Update Tailwind config with P360 fonts
- [ ] Replace existing font classes with P360 classes
- [ ] Test responsive behavior
- [ ] Verify accessibility compliance
- [ ] Update component library documentation
- [ ] Train team on new typography system

---

**Last Updated**: September 2025  
**Version**: 1.0.0  
**Source**: Figma Design System → P360 Typography Implementation
