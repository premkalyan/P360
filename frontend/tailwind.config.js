/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // P360 Brand Colors (ACTUAL from Figma node-id=7:1681)
        p360: {
          'primary-blue': '#000781',      // Main brand blue from logo
          'primary-blue-alt': '#000782',  // Slight variant from logo
          'secondary-blue': '#008cfe',    // Interactive blue from logo
          'purple': '#841AFF',            // Primary purple from Figma UI
          'purple-light': '#8d18fb',      // Light purple gradient
          'purple-medium': '#851afe',     // Medium purple gradient
          'accent-pink': '#e502d0',       // Accent pink from logo
          'magenta': '#dd04d5',           // Magenta from logo gradient
          'light-blue': '#1b76ff',        // Light blue from logo
          'gradient-blue': '#266cff',     // Gradient blue
          'light-gray': '#e6e6e6',        // Light background from logo
          'dark': '#000000',              // Text dark
          'white': '#ffffff',             // Pure white
        },
        // Status colors aligned with P360 design
        status: {
          'active': 'rgb(34, 197, 94)',    // Green
          'paused': 'rgb(251, 191, 36)',   // Yellow
          'draft': 'rgb(156, 163, 175)',   // Gray
          'error': 'rgb(239, 68, 68)',     // Red
          'warning': 'rgb(245, 158, 11)',  // Orange
        },
        // Performance indicators
        performance: {
          'high': 'rgb(34, 197, 94)',      // Green
          'medium': 'rgb(251, 191, 36)',   // Yellow  
          'low': 'rgb(239, 68, 68)',       // Red
          'neutral': 'rgb(156, 163, 175)', // Gray
        }
      },
      fontFamily: {
        // Primary font - Lexend Deca (from Figma design system)
        'p360': [
          'Lexend Deca', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'sans-serif'
        ],
        // Secondary font - Plus Jakarta Sans (from Figma metadata)
        'p360-secondary': [
          'Plus Jakarta Sans',
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'Roboto', 
          'sans-serif'
        ],
        // Legacy compatibility
        'sans': [
          'Lexend Deca',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif'
        ],
      },
      fontSize: {
        // Standard Tailwind sizes
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        
        // P360 FIGMA DESIGN SYSTEM - EXACT TOKENS
        // Titles (Display Typography)
        'p360-title-1': ['3.5rem', { lineHeight: '4rem', letterSpacing: '-0.05em', fontWeight: '700' }], // 56px/64px
        'p360-title-2': ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.05em', fontWeight: '700' }],   // 48px/56px
        'p360-title-3': ['2.5rem', { lineHeight: '3rem', letterSpacing: '-0.05em', fontWeight: '700' }],   // 40px/48px
        
        // Headings (H1-H4)
        'p360-h1': ['1.75rem', { lineHeight: '2rem', letterSpacing: '-0.025em', fontWeight: '600' }],      // 28px/32px
        'p360-h2': ['1.5rem', { lineHeight: '1.875rem', letterSpacing: '-0.025em', fontWeight: '600' }],  // 24px/30px
        'p360-h3': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em', fontWeight: '600' }],  // 20px/28px
        'p360-h4': ['1.125rem', { lineHeight: '1.5rem', letterSpacing: '-0.0125em', fontWeight: '600' }], // 18px/24px
        
        // Body Text
        'p360-body-1': ['1rem', { lineHeight: '1.375rem', letterSpacing: '0', fontWeight: '400' }],       // 16px/22px
        'p360-body-1-medium': ['1rem', { lineHeight: '1.375rem', letterSpacing: '0', fontWeight: '500' }], // 16px/22px
        'p360-body-2': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0', fontWeight: '400' }],   // 14px/20px
        'p360-body-2-medium': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0', fontWeight: '500' }], // 14px/20px
        'p360-body-3': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0', fontWeight: '400' }],        // 12px/16px
        'p360-body-3-medium': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0', fontWeight: '500' }], // 12px/16px
        
        // Component-specific sizes
        'p360-button': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }],
        'p360-label': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }],
        'p360-caption': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
      },
      fontWeight: {
        // Figma Design System font weights
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
      },
      letterSpacing: {
        // P360 Design System letter spacing
        'p360-tight': '-0.05em',    // Titles (-0.8px equivalent)
        'p360-snug': '-0.025em',    // Headings (-0.4px equivalent)
        'p360-normal': '0',         // Body text
        'p360-wide': '0.025em',     // Optional wide spacing
      },
      spacing: {
        // P360 spacing system (8px base unit)
        'p360-xs': '0.25rem',   // 4px
        'p360-sm': '0.5rem',    // 8px  
        'p360-md': '1rem',      // 16px
        'p360-lg': '1.5rem',    // 24px
        'p360-xl': '2rem',      // 32px
        'p360-2xl': '3rem',     // 48px
        'p360-3xl': '4rem',     // 64px
      },
      borderRadius: {
        'p360-sm': '0.25rem',   // 4px
        'p360-md': '0.5rem',    // 8px
        'p360-lg': '0.75rem',   // 12px
        'p360-xl': '1rem',      // 16px
      },
      boxShadow: {
        'p360-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'p360-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'p360-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'p360-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'p360-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'p360-bounce': 'bounce 1s infinite',
        'p360-fade-in': 'fadeIn 0.5s ease-in-out',
        'p360-slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      gridTemplateColumns: {
        // P360 specific grid layouts
        'p360-sidebar': '256px 1fr',
        'p360-dashboard': 'repeat(auto-fit, minmax(320px, 1fr))',
        'p360-metrics': 'repeat(auto-fit, minmax(200px, 1fr))',
      },
    },
  },
  plugins: [
    // Add custom P360 utilities
    function({ addUtilities }) {
      const newUtilities = {
        '.p360-card': {
          backgroundColor: 'rgb(255, 255, 255)',
          borderRadius: '0.75rem',
          border: '1px solid rgb(230, 230, 230)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '1.5rem',
          transition: 'all 0.3s ease',
        },
        '.p360-card:hover': {
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        '.p360-button-primary': {
          backgroundColor: 'rgb(133, 26, 254)',
          color: 'rgb(255, 255, 255)',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          fontWeight: '500',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          transition: 'all 0.2s ease',
        },
        '.p360-button-primary:hover': {
          backgroundColor: 'rgb(141, 24, 251)',
          transform: 'translateY(-1px)',
        },
        '.p360-text-gradient': {
          background: 'linear-gradient(135deg, rgb(133, 26, 254) 0%, rgb(229, 2, 208) 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          backgroundClip: 'text',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}