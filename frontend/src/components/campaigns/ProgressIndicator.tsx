/**
 * P360-107: Progress Indicator Component
 * Circular progress indicator with percentage display - matches Figma design
 */

import React from 'react';

export interface ProgressIndicatorProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  percentage,
  size = 'md',
  className = '',
}) => {
  // Clamp percentage between 0 and 100
  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  
  // Get color based on percentage ranges (matches Figma design)
  const getProgressColor = () => {
    if (clampedPercentage >= 60) {
      return {
        background: 'rgba(33, 200, 40, 0.05)', // Green background
        fill: '#21C828', // Green fill
        text: '#21C828'
      };
    } else if (clampedPercentage >= 36) {
      return {
        background: 'rgba(255, 98, 33, 0.05)', // Orange background  
        fill: '#FF6221', // Orange fill
        text: '#FF6221'
      };
    } else {
      return {
        background: 'rgba(240, 2, 80, 0.05)', // Red background
        fill: '#F00250', // Red fill
        text: '#F00250'
      };
    }
  };

  // Get size dimensions
  const getSizeDimensions = () => {
    switch (size) {
      case 'sm':
        return { width: 24, height: 24, fontSize: '6px' };
      case 'lg':
        return { width: 40, height: 40, fontSize: '10px' };
      default:
        return { width: 32, height: 32, fontSize: '8px' };
    }
  };

  const colors = getProgressColor();
  const dimensions = getSizeDimensions();
  
  // Calculate circumference for progress circle
  const radius = (dimensions.width - 4) / 2; // Account for stroke width
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (clampedPercentage / 100) * circumference;

  return (
    <div 
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{
        width: dimensions.width,
        height: dimensions.height,
      }}
    >
      {/* Background circle */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: colors.background }}
      />
      
      {/* SVG Progress Circle */}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        className="absolute transform -rotate-90"
        style={{ top: 0, left: 0 }}
      >
        {/* Background circle stroke */}
        <circle
          cx={dimensions.width / 2}
          cy={dimensions.height / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth="2"
          fill="none"
        />
        
        {/* Progress circle stroke */}
        <circle
          cx={dimensions.width / 2}
          cy={dimensions.height / 2}
          r={radius}
          stroke={colors.fill}
          strokeWidth="2"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.3s ease-in-out',
          }}
        />
      </svg>
      
      {/* Percentage text */}
      <span
        className="relative font-medium leading-none"
        style={{
          color: colors.text,
          fontSize: dimensions.fontSize,
          fontFamily: 'Lexend Deca, sans-serif',
        }}
      >
        {Math.round(clampedPercentage)}%
      </span>
    </div>
  );
};

export default ProgressIndicator;
