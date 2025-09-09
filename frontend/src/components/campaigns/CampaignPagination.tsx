/**
 * P360-107: Campaign Pagination Component
 * Simple navigation arrows for bottom-right positioning
 */

import React from 'react';
import '@/styles/typography.css';

export interface CampaignPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const CampaignPagination: React.FC<CampaignPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage <= 1}
        className={`w-8 h-8 flex items-center justify-center border rounded ${
          currentPage <= 1
            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
            : 'border-gray-300 text-gray-600 hover:bg-gray-50 cursor-pointer'
        }`}
        style={{
          backgroundColor: currentPage <= 1 ? '#F9FAFB' : '#FFFFFF',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M7.5 9L4.5 6L7.5 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className={`w-8 h-8 flex items-center justify-center border rounded ${
          currentPage >= totalPages
            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
            : 'border-gray-300 text-gray-600 hover:bg-gray-50 cursor-pointer'
        }`}
        style={{
          backgroundColor: currentPage >= totalPages ? '#F9FAFB' : '#FFFFFF',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M4.5 3L7.5 6L4.5 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default CampaignPagination;
