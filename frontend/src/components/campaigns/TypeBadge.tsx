/**
 * P360-107: Type Badge Component  
 * Campaign type badges - matches Figma design
 */

import React from 'react';

export type CampaignType = 'demand' | 'brand' | 'conversion' | 'awareness' | 'retargeting';

export interface TypeBadgeProps {
  type: CampaignType;
  className?: string;
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({
  type,
  className = '',
}) => {
  const getTypeConfig = () => {
    switch (type) {
      case 'demand':
        return {
          text: 'Demand',
          bgColor: '#E5F4FF', // Light blue background
          textColor: '#008DFF', // Blue text
        };
      case 'brand':
        return {
          text: 'Brand',
          bgColor: '#FFE6FC', // Light purple background
          textColor: '#ED01CF', // Purple text
        };
      case 'conversion':
        return {
          text: 'Conversion',
          bgColor: '#E5F4FF', // Light blue background (same as demand)
          textColor: '#008DFF', // Blue text
        };
      case 'awareness':
        return {
          text: 'Awareness',
          bgColor: '#FFE6FC', // Light purple background (same as brand)
          textColor: '#ED01CF', // Purple text
        };
      case 'retargeting':
        return {
          text: 'Retargeting',
          bgColor: '#E5F4FF', // Light blue background
          textColor: '#008DFF', // Blue text
        };
      default:
        return {
          text: type,
          bgColor: '#F3F4F6',
          textColor: '#6B7280',
        };
    }
  };

  const config = getTypeConfig();

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded text-sm font-normal ${className}`}
      style={{
        backgroundColor: config.bgColor,
        color: config.textColor,
        fontFamily: 'Lexend Deca, sans-serif',
        fontSize: '14px',
        lineHeight: '1.4285714285714286',
        height: '28px',
        minHeight: '28px',
      }}
    >
      {config.text}
    </span>
  );
};

export default TypeBadge;
