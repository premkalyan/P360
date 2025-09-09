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
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Page Dropdown */}
      <div className="relative">
        <select
          value={currentPage}
          onChange={(e) => onPageChange(Number(e.target.value))}
          className="appearance-none bg-white border border-gray-300 rounded px-3 py-1 p360-text-body text-gray-700 focus:outline-none focus:ring-2 focus:ring-p360-purple focus:border-p360-purple pr-8"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <option key={page} value={page}>
              Page {page}/{totalPages}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="#6B7280"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-1">
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
    </div>
  );
};

export default CampaignPagination;
