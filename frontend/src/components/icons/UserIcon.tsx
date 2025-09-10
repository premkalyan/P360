/**
 * User Icon Component - From Figma Design System
 * Reusable SVG icon for user functionality
 */

import React from 'react';

interface UserIconProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

export const UserIcon: React.FC<UserIconProps> = ({ 
  width = 20, 
  height = 20, 
  className = '',
  color = '#6A7282'
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
      <g clipPath="url(#clip0_768_28411)">
        <path 
          d="M14 16C14 14.5855 13.4381 13.229 12.4379 12.2288C11.4377 11.2286 10.0811 10.6667 8.66665 10.6667M8.66665 10.6667C7.25216 10.6667 5.8956 11.2286 4.89541 12.2288C3.89522 13.229 3.33331 14.5855 3.33331 16M8.66665 10.6667C10.5076 10.6667 12 9.17428 12 7.33333C12 5.49238 10.5076 4 8.66665 4C6.8257 4 5.33331 5.49238 5.33331 7.33333C5.33331 9.17428 6.8257 10.6667 8.66665 10.6667ZM16.6667 15.3333C16.6667 13.0866 15.3333 11 14 9.99997C14.4383 9.67115 14.7888 9.23936 15.0204 8.74281C15.252 8.24627 15.3577 7.70028 15.328 7.15317C15.2984 6.60606 15.1343 6.07469 14.8503 5.6061C14.5664 5.13751 14.1713 4.74614 13.7 4.46663" 
          stroke={color} 
          strokeWidth="1.2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_768_28411">
          <rect width="16" height="16" fill="white" transform="translate(1.99997 2)"/>
        </clipPath>
      </defs>
    </svg>
  );
};

export default UserIcon;
