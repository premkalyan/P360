/**
 * P360-107: Status Badge Component
 * Status badges with proper colors - matches Figma design
 */

import React from 'react';
import '@/styles/typography.css';

export type CampaignStatus = 'active' | 'paused' | 'draft' | 'completed' | 'in_review';

export interface StatusBadgeProps {
  status: CampaignStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = '',
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return {
          text: 'Active',
          bgColor: '#EDFCEE', // Light green background
          textColor: '#21C828', // Green text
        };
      case 'in_review':
        return {
          text: 'In Review',
          bgColor: '#FFF1EB', // Light orange background
          textColor: '#FF6221', // Orange text
        };
      case 'paused':
        return {
          text: 'Paused',
          bgColor: '#F3F4F6', // Light gray background
          textColor: '#6B7280', // Gray text
        };
      case 'draft':
        return {
          text: 'Draft',
          bgColor: '#F3F4F6', // Light gray background
          textColor: '#6B7280', // Gray text
        };
      case 'completed':
        return {
          text: 'Completed',
          bgColor: '#EBF8FF', // Light blue background
          textColor: '#3B82F6', // Blue text
        };
      default:
        return {
          text: status,
          bgColor: '#F3F4F6',
          textColor: '#6B7280',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded p360-text-badge ${className}`}
      style={{
        backgroundColor: config.bgColor,
        color: config.textColor,
        height: '30px',
        minHeight: '30px',
      }}
    >
      {config.text}
    </span>
  );
};

export default StatusBadge;
