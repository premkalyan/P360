'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Campaign } from '@/components/campaigns/CampaignCard';
import { CampaignTable } from '@/components/campaigns/CampaignTable';
import { CampaignFilters } from '@/components/campaigns/CampaignFilters';
import { 
  EmptyCampaigns,
} from '@/lib/design-system';
import '@/styles/typography.css';

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showEmptyState, setShowEmptyState] = useState(false); // Toggle for testing empty vs populated
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  
  // Pagination settings
  const itemsPerPage = 10;
  
  // Campaign data - controlled by showEmptyState toggle
  const campaigns: Campaign[] = useMemo(() => {
    if (showEmptyState) return [];
    
    return [
      {
        id: 'campaign-1',
        name: 'Q4 Holiday Sale - Facebook & Google',
        status: 'active',
        type: 'conversion',
        budget: 15000,
        spent: 11250,
        impressions: 250000,
        clicks: 7500,
        conversions: 375,
        ctr: 3.0,
        cpa: 30.0,
        roas: 4.5,
        startDate: '2024-11-01T00:00:00Z',
        endDate: '2024-12-31T23:59:59Z',
        lastModified: '2024-01-15T10:30:00Z',
        programName: 'Holiday Program',
        audienceSize: 125000,
      },
      {
        id: 'campaign-2',
        name: 'Brand Awareness - YouTube Campaign',
        status: 'active',
        type: 'awareness',
        budget: 8000,
        spent: 5600,
        impressions: 180000,
        clicks: 3600,
        conversions: 72,
        ctr: 2.0,
        cpa: 77.78,
        roas: 2.1,
        startDate: '2024-10-01T00:00:00Z',
        endDate: '2024-12-15T23:59:59Z',
        lastModified: '2024-01-14T15:20:00Z',
        programName: 'Brand Program',
        audienceSize: 200000,
      },
      {
        id: 'campaign-3',
        name: 'Retargeting - Cart Abandoners',
        status: 'paused',
        type: 'retargeting',
        budget: 5000,
        spent: 4200,
        impressions: 95000,
        clicks: 2850,
        conversions: 142,
        ctr: 3.0,
        cpa: 29.58,
        roas: 3.8,
        startDate: '2024-09-15T00:00:00Z',
        endDate: '2024-11-30T23:59:59Z',
        lastModified: '2024-01-13T09:45:00Z',
        programName: 'Retargeting Program',
        audienceSize: 45000,
      },
    ];
  }, [showEmptyState]);

  // Filter campaigns and apply pagination
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesSearch = 
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.programName.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  }, [campaigns, searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCampaigns = filteredCampaigns.slice(startIndex, startIndex + itemsPerPage);

  // Event handlers
  const handleCampaignClick = useCallback((id: string) => {
    // TODO: Navigate to campaign details
    console.log('Campaign clicked:', id);
  }, []);

  const handleNewCampaign = useCallback(() => {
    // TODO: Navigate to campaign creation
    console.log('New campaign clicked');
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Selection handlers
  const handleSelectAll = useCallback((selected: boolean) => {
    if (selected) {
      setSelectedCampaigns(paginatedCampaigns.map(campaign => campaign.id));
    } else {
      setSelectedCampaigns([]);
    }
  }, [paginatedCampaigns]);

  const handleSelectCampaign = useCallback((campaignId: string, selected: boolean) => {
    if (selected) {
      setSelectedCampaigns(prev => [...prev, campaignId]);
    } else {
      setSelectedCampaigns(prev => prev.filter(id => id !== campaignId));
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Debug Toggle - Top Right Corner */}
      <div className="fixed top-20 right-4 z-50">
        <button
          onClick={() => setShowEmptyState(!showEmptyState)}
          className={`px-3 py-2 text-xs rounded-lg border font-medium transition-colors ${
            showEmptyState 
              ? 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200' 
              : 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200'
          }`}
        >
          {showEmptyState ? '📭 Empty State' : '📊 With Data'}
        </button>
      </div>

      {campaigns.length === 0 ? (
        // Empty state - Full screen with centered empty campaigns component
        <div 
          className="flex items-center justify-center"
          style={{ minHeight: 'calc(100vh - 80px)' }}
        >
          <EmptyCampaigns
            primaryAction={{
              label: 'Create Campaign',
              onClick: handleNewCampaign,
            }}
          />
        </div>
      ) : (
        // Main campaigns view with table layout
        <div className="p-6">
          {/* Filters Component */}
          <CampaignFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onNewCampaign={handleNewCampaign}
            className="mb-6"
          />

          {/* Results count */}
          <div className="mb-6">
            <span className="p360-text-body text-gray-600">
              {filteredCampaigns.length} campaigns found
            </span>
          </div>

          {/* Campaign Table */}
          <div className="mb-8">
            <CampaignTable
              campaigns={paginatedCampaigns}
              onCampaignClick={handleCampaignClick}
              onSelectAll={handleSelectAll}
              selectedCampaigns={selectedCampaigns}
              onSelectCampaign={handleSelectCampaign}
            />
          </div>

          {/* Pagination - Bottom positioning */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            {/* Page Dropdown - Left Side */}
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
                onChange={(e) => handlePageChange(Number(e.target.value))}
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

            {/* Navigation Buttons - Right Side (aligned with table) */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
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

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
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
        </div>
      )}
    </div>
  );
}