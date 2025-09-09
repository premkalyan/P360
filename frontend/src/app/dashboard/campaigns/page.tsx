'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Campaign } from '@/components/campaigns/CampaignCard';
import { CampaignTable } from '@/components/campaigns/CampaignTable';
import { CampaignFilters } from '@/components/campaigns/CampaignFilters';
import { CampaignPagination } from '@/components/campaigns/CampaignPagination';
import { 
  EmptyCampaigns,
} from '@/lib/design-system';
import '@/styles/typography.css';

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showEmptyState, setShowEmptyState] = useState(false); // Toggle for testing empty vs populated
  
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

  return (
    <div className="min-h-screen bg-gray-50">
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
            />
          </div>

          {/* Pagination - Bottom positioning */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <div className="p360-text-body text-gray-600">
              Page {currentPage}/{totalPages}
            </div>
            
            {totalPages > 1 && (
              <CampaignPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}