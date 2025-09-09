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
              {/* Filter Icon - simplified */}
              <div className="w-3 h-3">
                <div className="w-full h-0.5 bg-gray-400 mb-1"></div>
                <div className="w-2 h-0.5 bg-gray-400 mb-1"></div>
                <div className="w-full h-0.5 bg-gray-400"></div>
              </div>
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
              {/* Columns Icon - simplified */}
              <div className="w-3 h-3 grid grid-cols-3 gap-0.5">
                <div className="w-0.5 h-3 bg-gray-400"></div>
                <div className="w-0.5 h-3 bg-gray-400"></div>
                <div className="w-0.5 h-3 bg-gray-400"></div>
              </div>
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
