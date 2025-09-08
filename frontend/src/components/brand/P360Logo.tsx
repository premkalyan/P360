/**
 * P360 Logo Component - Figma Design System Implementation
 * Component ID: 7:2032 - Pipeline=Dark + Color
 * 
 * This component implements the exact logo from Figma with proper
 * brand colors and scalable SVG format.
 */

import React from 'react';

export interface P360LogoProps {
  /** Size variant for the logo */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Custom className for additional styling */
  className?: string;
  /** Whether to show the text alongside the logo */
  showText?: boolean;
  /** Logo variant */
  variant?: 'default' | 'white' | 'dark';
}

export const P360Logo: React.FC<P360LogoProps> = ({
  size = 'md',
  className = '',
  showText = true,
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl', 
    xl: 'text-3xl'
  };

  const getColors = () => {
    switch (variant) {
      case 'white':
        return {
          primary: '#FFFFFF',
          secondary: '#F5F5F5',
          accent: '#FFFFFF'
        };
      case 'dark':
        return {
          primary: '#000000',
          secondary: '#333333',
          accent: '#666666'
        };
      default:
        return {
          primary: 'rgb(0, 7, 129)',      // P360 primary blue
          secondary: 'rgb(133, 26, 254)',  // P360 purple
          accent: 'rgb(229, 2, 208)'       // P360 accent pink
        };
    }
  };

  const colors = getColors();

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo SVG - Based on Figma Component 7:2032 */}
      <div className={`${sizeClasses[size]} flex-shrink-0`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Background circle */}
          <circle
            cx="16"
            cy="16"
            r="16"
            fill={`url(#p360-gradient-${variant})`}
          />
          
          {/* Pipeline icon - P shape */}
          <path
            d="M10 8h8c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4v4h-4V8z"
            fill={colors.primary}
          />
          <path
            d="M14 12h4c1.1 0 2 .9 2 2s-.9 2-2 2h-4v-4z"
            fill="#FFFFFF"
          />
          
          {/* 360 circle elements */}
          <circle cx="22" cy="10" r="1.5" fill={colors.accent} />
          <circle cx="26" cy="16" r="1" fill={colors.secondary} />
          <circle cx="22" cy="22" r="1.5" fill={colors.accent} />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient
              id={`p360-gradient-${variant}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={colors.secondary} />
              <stop offset="100%" stopColor={colors.accent} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <span className={`font-bold text-gray-900 ${textSizes[size]} font-p360`}>
          Pipeline360
        </span>
      )}
    </div>
  );
};

/**
 * Simplified logo for use in tight spaces
 */
export const P360LogoSimple: React.FC<Omit<P360LogoProps, 'showText'>> = (props) => {
  return <P360Logo {...props} showText={false} />;
};

/**
 * Logo with gradient text effect
 */
export const P360LogoGradient: React.FC<P360LogoProps> = (props) => {
  return (
    <div className={`flex items-center space-x-3 ${props.className}`}>
      <P360LogoSimple {...props} />
      {props.showText !== false && (
        <span className={`font-bold p360-text-gradient ${props.size ? textSizes[props.size] : textSizes.md} font-p360`}>
          Pipeline360
        </span>
      )}
    </div>
  );
};

const textSizes = {
  sm: 'text-sm',
  md: 'text-xl', 
  lg: 'text-2xl',
  xl: 'text-3xl'
};

export default P360Logo;
