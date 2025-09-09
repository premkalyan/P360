/**
 * P360-107: Campaign Filters Component
 * Enhanced filtering controls matching Figma design exactly
 */

import React from 'react';

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
        <h1 
          className="text-2xl font-semibold text-gray-700"
          style={{ 
            fontFamily: 'Lexend Deca',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '1.25',
            letterSpacing: '-1.67%',
          }}
        >
          Campaigns
        </h1>
        
        <button
          onClick={onNewCampaign}
          className="px-3 py-1 text-white rounded border"
          style={{
            backgroundColor: '#841AFF',
            borderColor: '#7600FF',
            fontFamily: 'Lexend Deca',
            fontSize: '14px',
            lineHeight: '1.4285714285714286',
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
              {/* Status Icon - simplified */}
              <div className="w-3 h-3 grid grid-cols-2 gap-0.5">
                <div className="w-1 h-1 bg-gray-400"></div>
                <div className="w-1 h-3 bg-gray-400"></div>
                <div className="w-1 h-1 bg-gray-400"></div>
                <div className="w-1 h-1 bg-gray-400"></div>
              </div>
            </div>
            <span 
              className="text-sm text-gray-700"
              style={{ fontFamily: 'Lexend Deca', fontSize: '14px' }}
            >
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
            <span 
              className="text-sm text-gray-700"
              style={{ fontFamily: 'Lexend Deca', fontSize: '14px' }}
            >
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
            <span 
              className="text-sm text-gray-700"
              style={{ fontFamily: 'Lexend Deca', fontSize: '14px' }}
            >
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
            className="flex-1 outline-none text-sm"
            style={{
              fontFamily: 'Lexend Deca',
              fontSize: '14px',
              lineHeight: '1.1428571428571428',
              letterSpacing: '-1.43%',
              color: searchTerm ? '#4A5565' : '#707070',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CampaignFilters;
