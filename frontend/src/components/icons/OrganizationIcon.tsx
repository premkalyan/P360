/**
 * Organization Icon Component - From Figma Design System
 * Reusable SVG icon for organization functionality
 */

import React from 'react';

interface OrganizationIconProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

export const OrganizationIcon: React.FC<OrganizationIconProps> = ({ 
  width = 20, 
  height = 20, 
  className = '',
  color = '#841AFF'
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <path 
        d="M8.00011 16.6666V13.9999H12.0001V16.6666M7.33345 5.99992H7.34011M12.6668 5.99992H12.6734M10.0001 5.99992H10.0068M10.0001 8.66659H10.0068M10.0001 11.3333H10.0068M12.6668 8.66659H12.6734M12.6668 11.3333H12.6734M7.33345 8.66659H7.34011M7.33345 11.3333H7.34011M6.00011 3.33325H14.0001C14.7365 3.33325 15.3334 3.93021 15.3334 4.66659V15.3333C15.3334 16.0696 14.7365 16.6666 14.0001 16.6666H6.00011C5.26373 16.6666 4.66678 16.0696 4.66678 15.3333V4.66659C4.66678 3.93021 5.26373 3.33325 6.00011 3.33325Z" 
        stroke={color} 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default OrganizationIcon;
