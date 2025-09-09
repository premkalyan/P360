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
    <div 
      className={`flex items-center ${className}`}
      style={{
        gap: '12px',
        width: '1024px',
        height: '40px',
        flex: 'none',
        order: 1,
        alignSelf: 'stretch',
        flexGrow: 0
      }}
    >
      {/* Page Dropdown - Exact Figma Styling */}
      <div 
        className="relative"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '4px 16px 4px 12px',
          gap: '10px',
          width: '116px',
          height: '40px',
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.05)',
          borderRadius: '4px',
          flex: 'none',
          order: 0,
          flexGrow: 0
        }}
      >
        <select
          value={currentPage}
          onChange={(e) => onPageChange(Number(e.target.value))}
          className="appearance-none bg-transparent border-none outline-none w-full"
          style={{
            width: '62px',
            height: '20px',
            fontFamily: 'Lexend Deca',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            color: '#4A5565',
            flex: 'none',
            order: 0,
            flexGrow: 0
          }}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <option key={page} value={page}>
              Page {page}/{totalPages}
            </option>
          ))}
        </select>
        <div 
          style={{
            width: '16px',
            height: '16px',
            flex: 'none',
            order: 1,
            flexGrow: 0
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 6L8 11L13 6"
              stroke="#4A5565"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Navigation Buttons Container - Exact Figma Styling */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '0px',
          gap: '8px',
          width: '896px',
          height: '40px',
          flex: 'none',
          order: 1,
          flexGrow: 1
        }}
      >
        {/* Previous Button - Exact Figma 40x40 */}
        <button
          onClick={handlePrevious}
          disabled={currentPage <= 1}
          style={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '4px 16px',
            gap: '10px',
            width: '40px',
            height: '40px',
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.05)',
            borderRadius: '4px',
            flex: 'none',
            order: 0,
            flexGrow: 0,
            cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
            opacity: currentPage <= 1 ? 0.5 : 1
          }}
        >
          <div style={{ width: '16px', height: '16px' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 4L6 8L10 12"
                stroke="#6A7282"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>

        {/* Next Button - Exact Figma 40x40 */}
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          style={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '4px 16px',
            gap: '10px',
            width: '40px',
            height: '40px',
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.05)',
            borderRadius: '4px',
            flex: 'none',
            order: 1,
            flexGrow: 0,
            cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
            opacity: currentPage >= totalPages ? 0.5 : 1
          }}
        >
          <div style={{ width: '16px', height: '16px' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 4L10 8L6 12"
                stroke="#6A7282"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CampaignPagination;
