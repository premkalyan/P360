/**
 * P360 Logo Component - REAL Figma Design Implementation
 * Based on actual SVG export from Figma Design System
 * 
 * This component uses the real Pipeline360 logo with authentic
 * brand colors and precise design elements.
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
    sm: 'h-6',
    md: 'h-8', 
    lg: 'h-12',
    xl: 'h-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl', 
    xl: 'text-3xl'
  };

  const getLogoContent = () => {
    const baseProps = {
      className: `${sizeClasses[size]} w-auto flex-shrink-0`,
      alt: 'Pipeline360 Logo'
    };

    // Use the real SVG logo
    return (
      <img 
        {...baseProps}
        src="/pipeline360-logo.svg"
        style={{
          filter: variant === 'white' ? 'brightness(0) invert(1)' : 
                 variant === 'dark' ? 'brightness(0)' : 'none'
        }}
      />
    );
  };

  const getTextColor = () => {
    switch (variant) {
      case 'white': return 'text-white';
      case 'dark': return 'text-black';
      default: return 'text-p360-primary-blue';
    }
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Real P360 Logo */}
      {getLogoContent()}

      {/* Brand Text - Pipeline360 */}
      {showText && (
        <span className={`font-bold ${getTextColor()} ${textSizes[size]} font-p360`}>
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
