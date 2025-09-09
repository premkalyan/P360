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
          className="appearance-none bg-white border border-gray-300 rounded px-3 py-1 p360-text-table-cell text-gray-700 focus:outline-none focus:ring-2 focus:ring-p360-purple focus:border-p360-purple pr-8"
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
        {/* Previous Button - Figma Design */}
        <button
          onClick={handlePrevious}
          disabled={currentPage <= 1}
          className={`flex items-center justify-center ${
            currentPage <= 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:opacity-80'
          }`}
        >
          <svg width="50" height="43" viewBox="0 0 50 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_757_30240)">
              <rect x="5" y="3" width="40" height="40" rx="4" fill="white" shapeRendering="crispEdges"/>
              <rect x="5.5" y="3.5" width="39" height="39" rx="3.5" stroke="#E5E7EB" shapeRendering="crispEdges"/>
              <path d="M31.3333 23.0003H19H19.3333" stroke="#6A7282" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="square"/>
              <path d="M23.6667 27.667L19 23.0003L23.6667 18.3336" stroke="#6A7282" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="square"/>
            </g>
            <defs>
              <filter id="filter0_d_757_30240" x="0" y="0" width="50" height="50" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="2"/>
                <feGaussianBlur stdDeviation="2.5"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_757_30240"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_757_30240" result="shape"/>
              </filter>
            </defs>
          </svg>
        </button>

        {/* Next Button - Figma Design (Right Arrow) */}
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          className={`flex items-center justify-center ${
            currentPage >= totalPages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:opacity-80'
          }`}
        >
          <svg width="50" height="43" viewBox="0 0 50 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_757_30241)">
              <rect x="5" y="3" width="40" height="40" rx="4" fill="white" shapeRendering="crispEdges"/>
              <rect x="5.5" y="3.5" width="39" height="39" rx="3.5" stroke="#E5E7EB" shapeRendering="crispEdges"/>
              <path d="M18.6667 23.0003H31H30.6667" stroke="#6A7282" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="square"/>
              <path d="M26.3333 18.3336L31 23.0003L26.3333 27.667" stroke="#6A7282" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="square"/>
            </g>
            <defs>
              <filter id="filter0_d_757_30241" x="0" y="0" width="50" height="50" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="2"/>
                <feGaussianBlur stdDeviation="2.5"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_757_30241"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_757_30241" result="shape"/>
              </filter>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CampaignPagination;
