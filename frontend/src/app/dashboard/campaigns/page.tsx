'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { CampaignCard, Campaign } from '@/components/campaigns/CampaignCard';
import { 
  EmptyCampaigns,
  EmptyResults, 
  Button as DesignButton, 
  Typography,
  designTokens 
} from '@/lib/design-system';
import { Button } from '@/components/ui/Button';

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('lastModified');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(true); // Toggle for testing empty vs populated
  
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

  // Filter and sort campaigns
  const filteredAndSortedCampaigns = useMemo(() => {
    const filtered = campaigns.filter((campaign) => {
      const matchesSearch = 
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.programName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
      const matchesType = typeFilter === 'all' || campaign.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });

    // Sort campaigns
    filtered.sort((a, b) => {
      let aValue: unknown = a[sortBy as keyof Campaign];
      let bValue: unknown = b[sortBy as keyof Campaign];
      
      if (sortBy === 'lastModified') {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortOrder === 'asc' ? comparison : -comparison;
      }
      
      if (aValue === bValue) {
        return 0;
      }
      
      return sortOrder === 'asc'
        ? ((aValue as number) > (bValue as number) ? 1 : -1)
        : ((aValue as number) < (bValue as number) ? 1 : -1);
    });

    return filtered;
  }, [campaigns, searchTerm, statusFilter, typeFilter, sortBy, sortOrder]);

  // Campaign action handlers
  const handleEdit = useCallback((_id: string) => {
    // TODO: Implement edit functionality
    // console.log('edit campaign:', id);
  }, []);

  const handlePause = useCallback((_id: string) => {
    // TODO: Implement pause/resume functionality
    // console.log('pause/resume campaign:', id);
  }, []);

  const handleDuplicate = useCallback((_id: string) => {
    // TODO: Implement duplicate functionality
    // console.log('duplicate campaign:', id);
  }, []);

  const handleView = useCallback((_id: string) => {
    // TODO: Implement view functionality
    // console.log('view campaign:', id);
  }, []);

  const handleClearFilters = useCallback(() => {
    // Batch all state updates together to prevent issues
    setSearchTerm('');
    setStatusFilter('all');
    setTypeFilter('all');
    setSortBy('lastModified');
    setSortOrder('desc');
  }, []);

  const handleCampaignSelection = useCallback((id: string) => {
    setSelectedCampaigns(prev => 
      prev.includes(id) 
        ? prev.filter(cId => cId !== id)
        : [...prev, id]
    );
  }, []);

  const toggleCompareMode = useCallback(() => {
    setIsCompareMode(prev => {
      const newCompareMode = !prev;
      if (!newCompareMode) {
        setSelectedCampaigns([]);
      }
      return newCompareMode;
    });
  }, []);

  // Quick stats calculation
  const stats = useMemo(() => {
    const activeCampaigns = campaigns.filter(c => c.status === 'active');
    const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
    const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
    const avgRoas = campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length;

    return {
      total: campaigns.length,
      active: activeCampaigns.length,
      totalBudget,
      conversions: totalConversions,
      avgRoas: avgRoas.toFixed(1),
    };
  }, [campaigns]);

  return (
    <div className="p-6">
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
        // Hide header for empty state - will show full Figma design
        <></>
      ) : (
        <>
          {/* Page Header */}
          <div style={{ marginBottom: designTokens.spacing[8] }}>
            <Typography variant="h2" color="primary">
              Campaign Dashboard
            </Typography>
            <Typography 
              variant="body" 
              color="muted" 
              style={{ marginTop: designTokens.spacing[1] }}
            >
              P360-67: Campaign Configuration UI - Performance Overview
            </Typography>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-5 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-gray-500">Total Campaigns</div>
              <div className="text-2xl font-bold">{stats.total}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-gray-500">Active</div>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-gray-500">Total Budget</div>
              <div className="text-2xl font-bold">${stats.totalBudget.toLocaleString()}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-gray-500">Conversions</div>
              <div className="text-2xl font-bold">{stats.conversions}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-gray-500">Avg ROAS</div>
              <div className="text-2xl font-bold">{stats.avgRoas}x</div>
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="bg-white p-4 rounded-lg border mb-6">
            <div className="flex flex-wrap items-center gap-4">
              {/* Search */}
              <div className="flex-1 min-w-64">
                <input
                  type="text"
                  placeholder="Search campaigns by name or program..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-500"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="draft">Draft</option>
              </select>

              {/* Type Filter */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-500"
              >
                <option value="all">All Types</option>
                <option value="conversion">Conversion</option>
                <option value="awareness">Awareness</option>
                <option value="retargeting">Retargeting</option>
              </select>

              {/* Sort */}
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const parts = e.target.value.split('-');
                  const field = parts[0] || 'lastModified';
                  const order = parts[1] || 'desc';
                  setSortBy(field);
                  setSortOrder(order as 'asc' | 'desc');
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-500"
              >
                <option value="lastModified-desc">Latest First</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="roas-desc">Highest ROAS</option>
                <option value="budget-desc">Highest Budget</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-violet-100 text-violet-700' : 'bg-white text-gray-700'}`}
                >
                  ⊞ Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 text-sm border-l border-gray-300 ${viewMode === 'list' ? 'bg-violet-100 text-violet-700' : 'bg-white text-gray-700'}`}
                >
                  ≡ List
                </button>
              </div>

              {/* Compare Mode */}
              <Button
                variant="default"
                onClick={toggleCompareMode}
              >
                📊 Compare
              </Button>

              {/* Clear Filters */}
              <Button variant="outline" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <span className="text-sm text-gray-600">
              {filteredAndSortedCampaigns.length} campaigns found
            </span>
          </div>

          {/* Bulk Actions */}
          {selectedCampaigns.length > 0 && (
            <div className="bg-violet-50 border border-violet-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                <span className="text-sm text-violet-700">{selectedCampaigns.length} selected</span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">Bulk Edit</Button>
                  <Button size="sm" variant="outline">Bulk Pause</Button>
                      </div>
                    </div>
                  </div>
          )}
        </>
      )}

          {/* Campaign Grid/List */}
          {campaigns.length === 0 ? (
            // Clean EmptyCampaigns component using design system
            <div 
              className="flex-1 bg-white flex items-center justify-center"
              style={{ minHeight: '906px' }}
            >
              <EmptyCampaigns
                primaryAction={{
                  label: 'Create Campaign',
                  onClick: () => {
                    // TODO: Navigate to campaign creation
                    console.log('Create campaign clicked');
                  },
                }}
              />
            </div>
          ) : filteredAndSortedCampaigns.length === 0 ? (
            <div className="flex justify-center py-12">
              <EmptyResults />
            </div>
          ) : (
            <>
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredAndSortedCampaigns.map((campaign) => (
                  <div key={campaign.id} className="relative">
                    {isCompareMode && (
                      <div className="absolute top-2 left-2 z-10">
                        <input
                          type="checkbox"
                          checked={selectedCampaigns.includes(campaign.id)}
                          onChange={() => handleCampaignSelection(campaign.id)}
                          className="w-4 h-4 text-violet-600 rounded focus:ring-violet-500"
                        />
          </div>
                    )}
                    <CampaignCard
                      campaign={campaign}
                      onEdit={handleEdit}
                      onPause={handlePause}
                      onDuplicate={handleDuplicate}
                      onView={handleView}
                      compact={viewMode === 'list'}
                    />
              </div>
            ))}
          </div>

              {/* Load More (placeholder for pagination) */}
              {filteredAndSortedCampaigns.length >= 10 && (
                <div className="text-center mt-8">
                  <Button variant="outline">Load More Campaigns</Button>
                </div>
              )}
            </>
          )}
    </div>
  );
}