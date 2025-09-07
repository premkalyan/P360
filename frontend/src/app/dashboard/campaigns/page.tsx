'use client';

/**
 * P360-67: Campaign Configuration UI - Main Dashboard Page
 * Implements campaign dashboard with performance overview, search, filtering, and comparison
 * Part of Campaign Configuration UI story acceptance criteria
 */

import React, { useState, useMemo } from 'react';
import { CampaignCard, Campaign } from '@/components/campaigns/CampaignCard';
import { Button } from '@/components/ui/Button';

// Mock data for P360-67 implementation
const mockCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    name: 'Q4 Holiday Sale - Facebook & Google',
    status: 'active',
    type: 'conversion',
    budget: 15000,
    spent: 12400,
    impressions: 485000,
    clicks: 18500,
    conversions: 742,
    ctr: 3.81,
    cpa: 16.71,
    roas: 4.2,
    startDate: '2024-12-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    lastModified: '2024-01-15T10:30:00Z',
    programName: 'Holiday Marketing Program',
    audienceSize: 125000
  },
  {
    id: 'camp-2', 
    name: 'Brand Awareness - YouTube Campaign',
    status: 'active',
    type: 'awareness',
    budget: 8000,
    spent: 6200,
    impressions: 290000,
    clicks: 8700,
    conversions: 185,
    ctr: 3.0,
    cpa: 33.51,
    roas: 2.8,
    startDate: '2024-11-15T00:00:00Z',
    endDate: '2024-12-15T23:59:59Z',
    lastModified: '2024-01-14T15:45:00Z',
    programName: 'Brand Awareness Program',
    audienceSize: 250000
  },
  {
    id: 'camp-3',
    name: 'Retargeting - Cart Abandoners',
    status: 'paused',
    type: 'retargeting',
    budget: 5000,
    spent: 4800,
    impressions: 125000,
    clicks: 6200,
    conversions: 310,
    ctr: 4.96,
    cpa: 15.48,
    roas: 5.1,
    startDate: '2024-10-01T00:00:00Z',
    endDate: '2024-11-30T23:59:59Z',
    lastModified: '2024-01-13T09:20:00Z',
    programName: 'Retargeting Program',
    audienceSize: 45000
  },
  {
    id: 'camp-4',
    name: 'New Product Launch - Multi-Platform',
    status: 'draft',
    type: 'awareness',
    budget: 20000,
    spent: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    ctr: 0,
    cpa: 0,
    roas: 0,
    startDate: '2025-01-01T00:00:00Z',
    endDate: '2025-01-31T23:59:59Z',
    lastModified: '2024-01-15T14:10:00Z',
    programName: 'Product Launch Program',
    audienceSize: 180000
  },
  {
    id: 'camp-5',
    name: 'Black Friday Flash Sale',
    status: 'completed',
    type: 'conversion',
    budget: 12000,
    spent: 11800,
    impressions: 380000,
    clicks: 15200,
    conversions: 894,
    ctr: 4.0,
    cpa: 13.20,
    roas: 6.2,
    startDate: '2024-11-20T00:00:00Z',
    endDate: '2024-11-30T23:59:59Z',
    lastModified: '2024-12-01T09:00:00Z',
    programName: 'Black Friday Program',
    audienceSize: 95000
  }
];

export default function CampaignsPage() {
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused' | 'draft' | 'completed'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'awareness' | 'conversion' | 'retargeting'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'spent' | 'roas' | 'conversions' | 'lastModified'>('lastModified');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showComparison, setShowComparison] = useState(false);

  // P360-67: Advanced filtering and search implementation
  const filteredAndSortedCampaigns = useMemo(() => {
    let filtered = campaigns.filter(campaign => {
      // Search filter
      const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           campaign.programName?.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
      
      // Type filter
      const matchesType = typeFilter === 'all' || campaign.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });

    // Sort campaigns
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];
      
      if (sortBy === 'lastModified') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [campaigns, searchQuery, statusFilter, typeFilter, sortBy, sortOrder]);

  const campaignStats = useMemo(() => {
    return {
      total: campaigns.length,
      active: campaigns.filter(c => c.status === 'active').length,
      totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
      totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
      totalConversions: campaigns.reduce((sum, c) => sum + c.conversions, 0),
      avgROAS: campaigns.filter(c => c.roas > 0).reduce((sum, c) => sum + c.roas, 0) / campaigns.filter(c => c.roas > 0).length || 0
    };
  }, [campaigns]);

  const handleCampaignAction = (action: string, campaignId: string) => {
    console.log(`${action} campaign:`, campaignId);
    // TODO: Implement actual campaign actions
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action} for campaigns:`, selectedCampaigns);
    // TODO: Implement bulk actions
  };

  const toggleCampaignSelection = (campaignId: string) => {
    setSelectedCampaigns(prev => 
      prev.includes(campaignId) 
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Campaign Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                P360-67: Campaign Configuration UI - Monitor and optimize your campaigns
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" size="sm">
                📊 Analytics
              </Button>
              <Button variant="outline" size="sm">
                📥 Import
              </Button>
              <Button>
                ➕ New Campaign
              </Button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{campaignStats.total}</div>
              <div className="text-xs text-blue-600">Total Campaigns</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{campaignStats.active}</div>
              <div className="text-xs text-green-600">Active</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{formatCurrency(campaignStats.totalBudget)}</div>
              <div className="text-xs text-purple-600">Total Budget</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{campaignStats.totalConversions.toLocaleString()}</div>
              <div className="text-xs text-orange-600">Conversions</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-700">{campaignStats.avgROAS.toFixed(1)}x</div>
              <div className="text-xs text-gray-600">Avg ROAS</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* P360-67: Advanced Search and Filtering */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search campaigns by name or program..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active ({campaignStats.active})</option>
                <option value="paused">Paused</option>
                <option value="draft">Draft</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="awareness">👁️ Awareness</option>
                <option value="conversion">🎯 Conversion</option>
                <option value="retargeting">🔄 Retargeting</option>
              </select>

              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field as any);
                  setSortOrder(order as any);
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="lastModified-desc">Latest First</option>
                <option value="name-asc">Name A-Z</option>
                <option value="spent-desc">Highest Spend</option>
                <option value="roas-desc">Highest ROAS</option>
                <option value="conversions-desc">Most Conversions</option>
              </select>
            </div>
          </div>

          {/* View Controls */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {filteredAndSortedCampaigns.length} campaigns found
              </span>
              
              {selectedCampaigns.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-blue-600">
                    {selectedCampaigns.length} selected
                  </span>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction('pause')}>
                    Bulk Pause
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction('edit')}>
                    Bulk Edit
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={showComparison ? 'default' : 'outline'}
                onClick={() => setShowComparison(!showComparison)}
              >
                📊 Compare
              </Button>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 text-sm ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                >
                  ⊞ Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 text-sm ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                >
                  ≡ List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* P360-67: Campaign Comparison Tool */}
        {showComparison && selectedCampaigns.length >= 2 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Campaign Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedCampaigns.slice(0, 3).map(campaignId => {
                const campaign = campaigns.find(c => c.id === campaignId);
                if (!campaign) return null;
                
                return (
                  <div key={campaignId} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">{campaign.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Spend:</span>
                        <span className="font-medium">{formatCurrency(campaign.spent)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ROAS:</span>
                        <span className={`font-medium ${
                          campaign.roas >= 3 ? 'text-green-600' : campaign.roas >= 2 ? 'text-yellow-600' : 'text-red-600'
                        }`}>{campaign.roas.toFixed(1)}x</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversions:</span>
                        <span className="font-medium">{campaign.conversions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CTR:</span>
                        <span className="font-medium">{campaign.ctr.toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Campaign Grid/List */}
        {filteredAndSortedCampaigns.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No campaigns found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search criteria or filters
            </p>
            <Button onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
              setTypeFilter('all');
            }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {filteredAndSortedCampaigns.map((campaign) => (
              <div key={campaign.id} className="relative">
                {showComparison && (
                  <input
                    type="checkbox"
                    checked={selectedCampaigns.includes(campaign.id)}
                    onChange={() => toggleCampaignSelection(campaign.id)}
                    className="absolute top-2 left-2 z-10"
                  />
                )}
                <CampaignCard
                  campaign={campaign}
                  onEdit={(id) => handleCampaignAction('edit', id)}
                  onPause={(id) => handleCampaignAction('pause', id)}
                  onDuplicate={(id) => handleCampaignAction('duplicate', id)}
                  onView={(id) => handleCampaignAction('view', id)}
                  compact={viewMode === 'list'}
                />
              </div>
            ))}
          </div>
        )}

        {/* Load More / Pagination */}
        {filteredAndSortedCampaigns.length >= 10 && (
          <div className="text-center mt-8">
            <Button variant="outline">
              Load More Campaigns
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}
