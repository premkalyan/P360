/**
 * P360-107: Campaign Filters Component
 * Enhanced filtering controls matching Figma design exactly
 */

import React from 'react';
import '@/styles/typography.css';

export interface CampaignFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNewCampaign?: () => void;
  className?: string;
}

export const CampaignFilters: React.FC<CampaignFiltersProps> = ({
  searchTerm,
  onSearchChange,
  onNewCampaign,
  className = '',
}) => {
  return (
    <div className={`bg-white ${className}`}>
      {/* Header with Title and New Campaign Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="p360-text-h2 text-gray-700">
          Campaigns
        </h1>
        
        <button
          onClick={onNewCampaign}
          className="px-3 py-1 text-white rounded border p360-text-button"
          style={{
            backgroundColor: '#841AFF',
            borderColor: '#7600FF',
            height: '34px',
            minHeight: '34px',
          }}
        >
          New Campaign
        </button>
      </div>

      {/* Filter Controls Row */}
      <div className="flex justify-between items-center gap-4 mb-6">
        {/* Left side - Filter buttons */}
        <div className="flex items-center gap-2.5">
          {/* Status Filter */}
          <div 
            className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-200 rounded cursor-pointer hover:bg-gray-50"
            style={{ height: '40px', minHeight: '40px' }}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              {/* Status Icon - Figma SVG */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 10.9997V12.6664C5 13.5868 5.7462 14.333 6.66667 14.333H7" stroke="#6A7282" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="square"/>
                <path d="M14.333 8.66638V9.66638V10.6664" stroke="#6A7282" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="square"/>
                <path d="M11 4.99969H12.6667C13.5871 4.99969 14.3333 5.74589 14.3333 6.66636V6.99969" stroke="#6A7282" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="square"/>
                <path d="M3.33366 10.9997H9.33366C10.2541 10.9997 11.0003 10.2535 11.0003 9.33305V3.33305C11.0003 2.41257 10.2541 1.66638 9.33366 1.66638H3.33366C2.41319 1.66638 1.66699 2.41257 1.66699 3.33305V9.33305C1.66699 10.2535 2.41318 10.9997 3.33366 10.9997Z" stroke="#6A7282" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="square"/>
                <path d="M8.66699 14.333H9.66699H10.667" stroke="#6A7282" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="square"/>
                <path d="M12.333 14.333H12.6663C13.5868 14.333 14.333 13.5868 14.333 12.6663V12.333" stroke="#6A7282" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="square"/>
              </svg>
            </div>
            <span className="p360-text-button text-gray-700">
              Status
            </span>
          </div>

          {/* Filters Button */}
          <div 
            className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-200 rounded cursor-pointer hover:bg-gray-50"
            style={{ height: '40px', minHeight: '40px' }}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              {/* Filter Icon - Figma SVG */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5557 8.00043H14.4446" stroke="#6A7282" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1.55566 8.00043H8.00011" stroke="#6A7282" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.44455 3.33374H1.55566" stroke="#6A7282" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.4444 3.33374H10" stroke="#6A7282" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.44455 12.6671H1.55566" stroke="#6A7282" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.4444 12.6671H10" stroke="#6A7282" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.77821 9.556C10.6373 9.556 11.3338 8.85955 11.3338 8.00044C11.3338 7.14133 10.6373 6.44489 9.77821 6.44489C8.9191 6.44489 8.22266 7.14133 8.22266 8.00044C8.22266 8.85955 8.9191 9.556 9.77821 9.556Z" stroke="#6A7282" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.99989 4.88931C6.859 4.88931 7.55545 4.19286 7.55545 3.33375C7.55545 2.47464 6.859 1.7782 5.99989 1.7782C5.14078 1.7782 4.44434 2.47464 4.44434 3.33375C4.44434 4.19286 5.14078 4.88931 5.99989 4.88931Z" stroke="#6A7282" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.99989 14.2226C6.859 14.2226 7.55545 13.5262 7.55545 12.6671C7.55545 11.808 6.859 11.1115 5.99989 11.1115C5.14078 11.1115 4.44434 11.808 4.44434 12.6671C4.44434 13.5262 5.14078 14.2226 5.99989 14.2226Z" stroke="#6A7282" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="p360-text-button text-gray-700">
              Filters
            </span>
          </div>

          {/* Vertical separator */}
          <div className="w-px h-4 bg-gray-200"></div>

          {/* Columns Button */}
          <div 
            className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-200 rounded cursor-pointer hover:bg-gray-50"
            style={{ height: '40px', minHeight: '40px' }}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              {/* Columns Icon - Figma SVG */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2.4436V13.5547" stroke="#4A5565" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 2.4436V13.5547" stroke="#4A5565" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.1111 2.4436H2.88889C2.39797 2.4436 2 2.84158 2 3.33249V12.6658C2 13.1568 2.39797 13.5547 2.88889 13.5547H13.1111C13.602 13.5547 14 13.1568 14 12.6658V3.33249C14 2.84158 13.602 2.4436 13.1111 2.4436Z" stroke="#4A5565" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="p360-text-button text-gray-700">
              Columns
            </span>
          </div>
        </div>

        {/* Right side - Search */}
        <div 
          className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded bg-white"
          style={{ width: '320px', height: '40px', minHeight: '40px' }}
        >
          <div className="w-4 h-4 flex items-center justify-center">
            {/* Search Icon - simplified */}
            <div className="w-3 h-3 border border-gray-400 rounded-full relative">
              <div className="absolute -bottom-0.5 -right-0.5 w-1 h-0.5 bg-gray-400 rotate-45"></div>
            </div>
          </div>
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 outline-none p360-text-table-cell"
            style={{
              color: searchTerm ? '#4A5565' : '#707070',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CampaignFilters;
