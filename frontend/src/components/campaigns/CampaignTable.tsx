/**
 * P360-107: Campaign Table Component
 * Comprehensive table layout matching Figma design exactly
 */

import React from 'react';
import { Campaign } from './CampaignCard';
import { ProgressIndicator } from './ProgressIndicator';
import { StatusBadge, CampaignStatus } from './StatusBadge';
import { TypeBadge, CampaignType } from './TypeBadge';
import '@/styles/typography.css';

export interface CampaignTableProps {
  campaigns: Campaign[];
  onCampaignClick?: (id: string) => void;
  onSelectAll?: (selected: boolean) => void;
  selectedCampaigns?: string[];
  onSelectCampaign?: (id: string, selected: boolean) => void;
  className?: string;
}

export const CampaignTable: React.FC<CampaignTableProps> = ({
  campaigns,
  onCampaignClick,
  onSelectAll,
  selectedCampaigns = [],
  onSelectCampaign,
  className = '',
}) => {
  // Helper functions
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';
      
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }) + ' ' + date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Invalid date';
    }
  };

  // Calculate pacing percentage based on budget utilization
  const calculatePacing = (campaign: Campaign): number => {
    const totalDays = Math.ceil((new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) / (1000 * 60 * 60 * 24));
    const elapsedDays = Math.ceil((Date.now() - new Date(campaign.startDate).getTime()) / (1000 * 60 * 60 * 24));
    
    // Handle edge cases
    if (totalDays <= 0) return 0; // Same start/end date
    if (elapsedDays <= 0) return 0; // Campaign hasn't started yet
    
    const expectedSpendPercentage = (elapsedDays / totalDays) * 100;
    const actualSpendPercentage = (campaign.spent / campaign.budget) * 100;
    
    // Return pacing as percentage (how well we're tracking to budget over time)
    return Math.min(100, (actualSpendPercentage / expectedSpendPercentage) * 100);
  };

  // Map existing campaign types to badge types
  const mapCampaignType = (type: Campaign['type']): CampaignType => {
    switch (type) {
      case 'conversion':
        return 'demand';
      case 'awareness':
        return 'brand';
      case 'retargeting':
        return 'demand';
      default:
        return 'demand';
    }
  };

  // Map existing campaign status to badge status
  const mapCampaignStatus = (status: Campaign['status']): CampaignStatus => {
    switch (status) {
      case 'active':
        return 'active';
      case 'paused':
        return 'in_review'; // Using in_review for demo purposes
      case 'draft':
        return 'draft';
      case 'completed':
        return 'completed';
      default:
        return 'active';
    }
  };

  // Selection logic
  const allSelected = campaigns.length > 0 && campaigns.every(campaign => selectedCampaigns.includes(campaign.id));
  const someSelected = selectedCampaigns.length > 0 && !allSelected;

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (onSelectAll) {
      onSelectAll(!allSelected);
    }
  };

  const handleSelectCampaign = (campaignId: string) => {
    if (onSelectCampaign) {
      const isSelected = selectedCampaigns.includes(campaignId);
      onSelectCampaign(campaignId, !isSelected);
    }
  };

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead style={{ backgroundColor: '#F9FAFB' }}>
            <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
              <th className="text-left py-3 px-4 p360-text-table-header text-gray-700" style={{ width: '320px', minWidth: '320px' }}>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelected;
                    }}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-p360-purple bg-white border-gray-300 rounded focus:ring-p360-purple focus:ring-2"
                  />
                  Campaign name
                </div>
              </th>
              <th className="text-left py-3 px-4 p360-text-table-header text-gray-700" style={{ width: '200px', minWidth: '200px' }}>
                Program
              </th>
              <th className="text-left py-3 px-4 p360-text-table-header text-gray-700" style={{ width: '80px', minWidth: '80px' }}>
                Pacing
              </th>
              <th className="text-left py-3 px-4 p360-text-table-header text-gray-700" style={{ width: '120px', minWidth: '120px' }}>
                Type
              </th>
              <th className="text-left py-3 px-4 p360-text-table-header text-gray-700" style={{ width: '120px', minWidth: '120px' }}>
                Status
              </th>
              <th className="text-left py-3 px-4 p360-text-table-header text-gray-700" style={{ width: '140px', minWidth: '140px' }}>
                Last modified
              </th>
              <th className="text-left py-3 px-4 p360-text-table-header text-gray-700" style={{ width: '120px', minWidth: '120px' }}>
                Start Date
              </th>
              <th className="text-left py-3 px-4 p360-text-table-header text-gray-700" style={{ width: '120px', minWidth: '120px' }}>
                End Date
              </th>
              <th className="text-left py-3 px-4 p360-text-table-header text-gray-700" style={{ width: '140px', minWidth: '140px' }}>
                Impressions Served
              </th>
              <th className="text-left py-3 px-4 p360-text-table-header text-gray-700" style={{ width: '100px', minWidth: '100px' }}>
                Clicks
              </th>
              <th className="text-left py-3 px-4 p360-text-table-header text-gray-700" style={{ width: '80px', minWidth: '80px' }}>
                CPM
              </th>
              <th className="text-left py-3 px-4 p360-text-table-header text-gray-700" style={{ width: '120px', minWidth: '120px' }}>
                Current Spend
              </th>
              <th className="text-left py-3 px-4 p360-text-table-header text-gray-700" style={{ width: '100px', minWidth: '100px' }}>
                Conversions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {campaigns.map((campaign) => {
              const pacing = calculatePacing(campaign);
              const cpm = campaign.impressions > 0 ? (campaign.spent / campaign.impressions) * 1000 : 0;
              
              return (
                <tr 
                  key={campaign.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  style={{ borderBottom: '1px solid #E5E7EB' }}
                  onClick={() => onCampaignClick?.(campaign.id)}
                >
                  {/* Campaign Name */}
                  <td className="py-4 px-4" style={{ width: '320px', minWidth: '320px' }}>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCampaigns.includes(campaign.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleSelectCampaign(campaign.id);
                        }}
                        className="w-4 h-4 text-p360-purple bg-white border-gray-300 rounded mr-4 flex-shrink-0 focus:ring-p360-purple focus:ring-2"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="p360-text-link p360-text-nowrap">
                          {campaign.name}
                        </div>
                        <div className="p360-text-small text-gray-500 mt-1 p360-text-nowrap">
                          ID: {campaign.id.replace('campaign-', '').padStart(7, '0')}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Program */}
                  <td className="py-4 px-4" style={{ width: '200px', minWidth: '200px' }}>
                    <span className="p360-text-table-cell text-gray-700 p360-text-nowrap">
                      {campaign.programName}
                    </span>
                  </td>

                  {/* Pacing */}
                  <td className="py-4 px-4" style={{ width: '80px', minWidth: '80px' }}>
                    <div className="flex justify-center">
                      <ProgressIndicator percentage={pacing} />
                    </div>
                  </td>

                  {/* Type */}
                  <td className="py-4 px-4" style={{ width: '120px', minWidth: '120px' }}>
                    <TypeBadge type={mapCampaignType(campaign.type)} />
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4" style={{ width: '120px', minWidth: '120px' }}>
                    <StatusBadge status={mapCampaignStatus(campaign.status)} />
                  </td>

                  {/* Last Modified */}
                  <td className="py-4 px-4" style={{ width: '140px', minWidth: '140px' }}>
                    <span className="p360-text-table-cell text-gray-700 p360-text-nowrap">
                      {formatDateTime(campaign.lastModified)}
                    </span>
                  </td>

                  {/* Start Date */}
                  <td className="py-4 px-4" style={{ width: '120px', minWidth: '120px' }}>
                    <span className="p360-text-table-cell text-gray-700 p360-text-nowrap">
                      {formatDate(campaign.startDate)}
                    </span>
                  </td>

                  {/* End Date */}
                  <td className="py-4 px-4" style={{ width: '120px', minWidth: '120px' }}>
                    <span className="p360-text-table-cell text-gray-700 p360-text-nowrap">
                      {formatDate(campaign.endDate)}
                    </span>
                  </td>

                  {/* Impressions Served */}
                  <td className="py-4 px-4" style={{ width: '140px', minWidth: '140px' }}>
                    <span className="p360-text-table-cell text-gray-700 p360-text-nowrap">
                      {formatNumber(campaign.impressions)}
                    </span>
                  </td>

                  {/* Clicks */}
                  <td className="py-4 px-4" style={{ width: '100px', minWidth: '100px' }}>
                    <span className="p360-text-table-cell text-gray-700 p360-text-nowrap">
                      {formatNumber(campaign.clicks)}
                    </span>
                  </td>

                  {/* CPM */}
                  <td className="py-4 px-4" style={{ width: '80px', minWidth: '80px' }}>
                    <span className="p360-text-table-cell text-gray-700 p360-text-nowrap">
                      {formatCurrency(Math.round(cpm))}
                    </span>
                  </td>

                  {/* Current Spend */}
                  <td className="py-4 px-4" style={{ width: '120px', minWidth: '120px' }}>
                    <span className="p360-text-table-cell text-gray-700 p360-text-nowrap">
                      {formatCurrency(campaign.spent)}
                    </span>
                  </td>

                  {/* Conversions */}
                  <td className="py-4 px-4" style={{ width: '100px', minWidth: '100px' }}>
                    <span className="p360-text-table-cell text-gray-700 p360-text-nowrap">
                      {Math.round(campaign.conversions * 100)}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignTable;
