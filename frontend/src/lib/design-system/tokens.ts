/**
 * P360 Design System - Design Tokens
 * Centralized design tokens for consistent styling across the application
 * Based on Figma design system and P360 brand guidelines
 */

export const designTokens = {
  // Color System - Based on P360 brand colors from Figma
  colors: {
    // Primary brand colors
    primary: {
      50: '#F4EBFF',
      100: '#E9D5FF', 
      200: '#D9B8FF',
      300: '#C695FF',
      400: '#B272FF',
      500: '#841AFF', // Main P360 purple
      600: '#7600FF',
      700: '#6B00E6',
      800: '#5A00CC',
      900: '#4A00B3',
    },

    // Neutral grays - matching sidebar/topbar
    neutral: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DC',
      400: '#99A1AF',
      500: '#6A7282',
      600: '#4A5565',
      700: '#374151',
      800: '#1F2937',
      900: '#101828',
    },

    // Semantic colors
    semantic: {
      success: {
        50: '#F0FDF4',
        500: '#10B981',
        600: '#059669',
      },
      warning: {
        50: '#FFFBEB',
        500: '#F59E0B',
        600: '#D97706',
      },
      error: {
        50: '#FEF2F2',
        500: '#EF4444',
        600: '#DC2626',
      },
      info: {
        50: '#EFF6FF',
        500: '#3B82F6',
        600: '#2563EB',
      },
    },

    // Background colors
    background: {
      primary: '#FFFFFF',
      secondary: '#F9FAFB',
      tertiary: '#F3F4F6',
    },
  },

  // Typography System
  typography: {
    fontFamily: {
      sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      mono: ['Monaco', 'Menlo', 'Ubuntu Mono', 'monospace'],
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
    },
  },

  // Spacing System (8px grid)
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
  },

  // Border radius
  borderRadius: {
    sm: '4px',
    base: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },

  // Component-specific tokens
  components: {
    button: {
      height: {
        sm: '32px',
        base: '40px',
        lg: '48px',
      },
      padding: {
        sm: '8px 12px',
        base: '12px 16px', 
        lg: '16px 24px',
      },
    },
    input: {
      height: {
        sm: '32px',
        base: '40px',
        lg: '48px',
      },
    },
    topbar: {
      height: '54px',
    },
    sidebar: {
      width: '272px',
    },
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

// Type helpers
export type ColorScale = keyof typeof designTokens.colors.primary;
export type SemanticColor = keyof typeof designTokens.colors.semantic;
export type NeutralColor = keyof typeof designTokens.colors.neutral;
export type FontSize = keyof typeof designTokens.typography.fontSize;
export type Spacing = keyof typeof designTokens.spacing;
