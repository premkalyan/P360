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
        // P360 Brand Colors (Exact from Figma)
        p360: {
          'primary-blue': 'rgb(0, 7, 129)',      // Main brand blue
          'primary-blue-alt': 'rgb(0, 7, 130)',  // Slight variant
          'secondary-blue': 'rgb(0, 140, 254)',   // Interactive blue
          'purple': 'rgb(133, 26, 254)',          // Primary purple
          'purple-light': 'rgb(141, 24, 251)',    // Light purple
          'purple-medium': 'rgb(173, 16, 236)',   // Medium purple
          'accent-pink': 'rgb(229, 2, 208)',      // Accent pink
          'light-gray': 'rgb(230, 230, 230)',     // Light background
          'dark': 'rgb(0, 0, 0)',                 // Text dark
          'white': 'rgb(255, 255, 255)',          // Pure white
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
        'p360': [
          'Inter', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'sans-serif'
        ],
      },
      fontSize: {
        // P360 Typography Scale (based on Figma analysis)
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        // P360 specific sizes
        'p360-caption': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
        'p360-body': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
        'p360-body-medium': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }],
        'p360-subtitle': ['1rem', { lineHeight: '1.5rem', fontWeight: '500' }],
        'p360-title': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        'p360-heading': ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],
        'p360-display': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }],
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