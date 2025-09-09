/**
 * P360-107: Campaign Table Component
 * Comprehensive table layout matching Figma design exactly
 */

import React from 'react';
import { Campaign } from './CampaignCard';
import { ProgressIndicator } from './ProgressIndicator';
import { StatusBadge, CampaignStatus } from './StatusBadge';
import { TypeBadge, CampaignType } from './TypeBadge';

export interface CampaignTableProps {
  campaigns: Campaign[];
  onCampaignClick?: (id: string) => void;
  className?: string;
}

export const CampaignTable: React.FC<CampaignTableProps> = ({
  campaigns,
  onCampaignClick,
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
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }) + ' ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calculate pacing percentage based on budget utilization
  const calculatePacing = (campaign: Campaign): number => {
    const totalDays = Math.ceil((new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) / (1000 * 60 * 60 * 24));
    const elapsedDays = Math.ceil((Date.now() - new Date(campaign.startDate).getTime()) / (1000 * 60 * 60 * 24));
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

  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead style={{ backgroundColor: '#F9FAFB' }}>
            <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
              <th className="text-left py-3 px-4 font-medium text-sm text-gray-700" style={{ width: '320px', fontFamily: 'Lexend Deca' }}>
                Campaign name
              </th>
              <th className="text-left py-3 px-4 font-medium text-sm text-gray-700" style={{ width: '240px', fontFamily: 'Lexend Deca' }}>
                Program
              </th>
              <th className="text-left py-3 px-4 font-medium text-sm text-gray-700" style={{ width: '100px', fontFamily: 'Lexend Deca' }}>
                Pacing
              </th>
              <th className="text-left py-3 px-4 font-medium text-sm text-gray-700" style={{ width: '140px', fontFamily: 'Lexend Deca' }}>
                Type
              </th>
              <th className="text-left py-3 px-4 font-medium text-sm text-gray-700" style={{ width: '140px', fontFamily: 'Lexend Deca' }}>
                Status
              </th>
              <th className="text-left py-3 px-4 font-medium text-sm text-gray-700" style={{ width: '160px', fontFamily: 'Lexend Deca' }}>
                Last modified
              </th>
              <th className="text-left py-3 px-4 font-medium text-sm text-gray-700" style={{ width: '160px', fontFamily: 'Lexend Deca' }}>
                Start Date
              </th>
              <th className="text-left py-3 px-4 font-medium text-sm text-gray-700" style={{ width: '160px', fontFamily: 'Lexend Deca' }}>
                End Date
              </th>
              <th className="text-left py-3 px-4 font-medium text-sm text-gray-700" style={{ width: '160px', fontFamily: 'Lexend Deca' }}>
                Impressions Served
              </th>
              <th className="text-left py-3 px-4 font-medium text-sm text-gray-700" style={{ width: '160px', fontFamily: 'Lexend Deca' }}>
                Clicks
              </th>
              <th className="text-left py-3 px-4 font-medium text-sm text-gray-700" style={{ width: '160px', fontFamily: 'Lexend Deca' }}>
                CPM
              </th>
              <th className="text-left py-3 px-4 font-medium text-sm text-gray-700" style={{ width: '160px', fontFamily: 'Lexend Deca' }}>
                Current Spend
              </th>
              <th className="text-left py-3 px-4 font-medium text-sm text-gray-700" style={{ width: '160px', fontFamily: 'Lexend Deca' }}>
                Conversions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {campaigns.map((campaign, index) => {
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
                  <td className="py-4 px-4" style={{ width: '320px' }}>
                    <div className="flex items-center">
                      <div className="w-4 h-4 border border-gray-300 rounded-sm mr-4"></div>
                      <div>
                        <div 
                          className="font-medium text-purple-600 text-sm" 
                          style={{ fontFamily: 'Lexend Deca', color: '#841AFF' }}
                        >
                          {campaign.name}
                        </div>
                        <div 
                          className="text-xs text-gray-500 mt-1" 
                          style={{ fontFamily: 'Lexend Deca' }}
                        >
                          ID: {campaign.id.replace('campaign-', '').padStart(7, '0')}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Program */}
                  <td className="py-4 px-4" style={{ width: '240px' }}>
                    <span 
                      className="text-sm text-gray-700" 
                      style={{ fontFamily: 'Lexend Deca' }}
                    >
                      {campaign.programName}
                    </span>
                  </td>

                  {/* Pacing */}
                  <td className="py-4 px-4" style={{ width: '100px' }}>
                    <div className="flex justify-center">
                      <ProgressIndicator percentage={pacing} />
                    </div>
                  </td>

                  {/* Type */}
                  <td className="py-4 px-4" style={{ width: '140px' }}>
                    <TypeBadge type={mapCampaignType(campaign.type)} />
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4" style={{ width: '140px' }}>
                    <StatusBadge status={mapCampaignStatus(campaign.status)} />
                  </td>

                  {/* Last Modified */}
                  <td className="py-4 px-4" style={{ width: '160px' }}>
                    <span 
                      className="text-sm text-gray-700" 
                      style={{ fontFamily: 'Lexend Deca' }}
                    >
                      {formatDateTime(campaign.lastModified)}
                    </span>
                  </td>

                  {/* Start Date */}
                  <td className="py-4 px-4" style={{ width: '160px' }}>
                    <span 
                      className="text-sm text-gray-700" 
                      style={{ fontFamily: 'Lexend Deca' }}
                    >
                      {formatDate(campaign.startDate)}
                    </span>
                  </td>

                  {/* End Date */}
                  <td className="py-4 px-4" style={{ width: '160px' }}>
                    <span 
                      className="text-sm text-gray-700" 
                      style={{ fontFamily: 'Lexend Deca' }}
                    >
                      {formatDate(campaign.endDate)}
                    </span>
                  </td>

                  {/* Impressions Served */}
                  <td className="py-4 px-4" style={{ width: '160px' }}>
                    <span 
                      className="text-sm text-gray-700" 
                      style={{ fontFamily: 'Lexend Deca' }}
                    >
                      {formatNumber(campaign.impressions)}
                    </span>
                  </td>

                  {/* Clicks */}
                  <td className="py-4 px-4" style={{ width: '160px' }}>
                    <span 
                      className="text-sm text-gray-700" 
                      style={{ fontFamily: 'Lexend Deca' }}
                    >
                      {formatNumber(campaign.clicks)}
                    </span>
                  </td>

                  {/* CPM */}
                  <td className="py-4 px-4" style={{ width: '160px' }}>
                    <span 
                      className="text-sm text-gray-700" 
                      style={{ fontFamily: 'Lexend Deca' }}
                    >
                      {formatNumber(Math.round(cpm))}
                    </span>
                  </td>

                  {/* Current Spend */}
                  <td className="py-4 px-4" style={{ width: '160px' }}>
                    <span 
                      className="text-sm text-gray-700" 
                      style={{ fontFamily: 'Lexend Deca' }}
                    >
                      {formatCurrency(campaign.spent)}
                    </span>
                  </td>

                  {/* Conversions */}
                  <td className="py-4 px-4" style={{ width: '160px' }}>
                    <span 
                      className="text-sm text-gray-700" 
                      style={{ fontFamily: 'Lexend Deca' }}
                    >
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
