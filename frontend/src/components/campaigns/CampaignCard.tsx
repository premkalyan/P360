/**
 * P360-67: Campaign Configuration UI - CampaignCard Component
 * Campaign performance overview with real-time feedback and action controls
 */

import React from 'react';
import '@/styles/typography.css';

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  type: 'conversion' | 'awareness' | 'retargeting';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpa: number;
  roas: number;
  startDate: string;
  endDate: string;
  lastModified: string;
  programName: string;
  audienceSize: number;
}

export interface CampaignCardProps {
  campaign: Campaign;
  onEdit: (id: string) => void;
  onPause: (id: string) => void;
  onDuplicate: (id: string) => void;
  onView: (id: string) => void;
  showQuickActions?: boolean;
  compact?: boolean;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  onEdit,
  onPause,
  onDuplicate,
  onView,
  showQuickActions = true,
  compact = false
}) => {
  const budgetUtilization = (campaign.spent / campaign.budget) * 100;
  const isOverBudget = campaign.spent > campaign.budget;
  const overBudgetAmount = isOverBudget ? campaign.spent - campaign.budget : 0;
  
  // Performance indicators
  const isHighPerformer = campaign.roas >= 4;
  const needsOptimization = campaign.conversions === 0 && campaign.status === 'paused';
  
  // Date calculations
  const endDate = new Date(campaign.endDate);
  const lastModifiedDate = new Date(campaign.lastModified);
  const now = new Date();
  const daysRemaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  // Format numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Progress bar color based on budget utilization
  const getProgressBarColor = (): string => {
    if (isOverBudget) return 'bg-red-500';
    if (budgetUtilization >= 90) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // ROAS color coding
  const getRoasColor = (): string => {
    if (campaign.roas >= 4) return 'text-green-600';
    if (campaign.roas >= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Status badge styling
  const getStatusBadgeClass = (): string => {
    switch (campaign.status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const capitalizeFirst = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-p360 text-p360-h3 text-p360-primary-text font-semibold mb-1">
            {campaign.name}
          </h3>
          <p className="font-p360 text-p360-body-2 text-p360-secondary-text">
            {campaign.programName}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass()}`}>
            {capitalizeFirst(campaign.status)}
          </span>
          {isHighPerformer && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              High Performer
            </span>
          )}
          {needsOptimization && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
              Needs Optimization
            </span>
          )}
          {isOverBudget && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              Over Budget
            </span>
          )}
        </div>
      </div>

      {/* Budget Section */}
      <div className={`p-4 rounded-lg mb-4 ${isOverBudget ? 'bg-red-50' : 'bg-gray-50'}`}>
        <div className="flex justify-between items-center mb-2">
          <span className="font-p360 text-p360-body-2 text-p360-secondary-text">Budget</span>
          <span className="font-p360 text-p360-body-1 font-medium text-p360-primary-text">
            {formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div 
            className={`h-2 rounded-full ${getProgressBarColor()}`}
            style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="font-p360 text-p360-body-3 text-p360-muted-text">
            {budgetUtilization.toFixed(1)}% utilized
          </span>
          {isOverBudget && (
            <span className="font-p360 text-p360-body-3 text-red-600">
              Over budget by {formatCurrency(overBudgetAmount)}
            </span>
          )}
        </div>
      </div>

      {/* Metrics Grid - Hidden in compact mode */}
      {!compact && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="font-p360 text-p360-body-3 text-p360-muted-text mb-1">Impressions</div>
            <div className="font-p360 text-p360-body-1 font-semibold text-p360-primary-text">
              {formatNumber(campaign.impressions)}
            </div>
          </div>
          <div className="text-center">
            <div className="font-p360 text-p360-body-3 text-p360-muted-text mb-1">Clicks</div>
            <div className="font-p360 text-p360-body-1 font-semibold text-p360-primary-text">
              {formatNumber(campaign.clicks)}
            </div>
          </div>
          <div className="text-center">
            <div className="font-p360 text-p360-body-3 text-p360-muted-text mb-1">CTR</div>
            <div className="font-p360 text-p360-body-1 font-semibold text-p360-primary-text">
              {campaign.ctr.toFixed(2)}%
            </div>
          </div>
          <div className="text-center">
            <div className="font-p360 text-p360-body-3 text-p360-muted-text mb-1">CPA</div>
            <div className="font-p360 text-p360-body-1 font-semibold text-p360-primary-text">
              ${campaign.cpa.toFixed(0)}
            </div>
          </div>
        </div>
      )}

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="font-p360 text-p360-body-3 text-p360-muted-text mb-1">Conversions</div>
          <div className="font-p360 text-p360-body-1 font-semibold text-p360-primary-text">
            {campaign.conversions}
          </div>
        </div>
        <div className="text-center">
          <div className="font-p360 text-p360-body-3 text-p360-muted-text mb-1">ROAS</div>
          <div className={`font-p360 text-p360-body-1 font-semibold ${getRoasColor()}`}>
            {campaign.roas.toFixed(1)}x
          </div>
        </div>
      </div>

      {/* Audience Info */}
      <div className="mb-4">
        <span className="font-p360 text-p360-body-3 text-p360-muted-text">
          Audience: {formatNumber(campaign.audienceSize)} identifiers
        </span>
      </div>

      {/* Date Information */}
      <div className="mb-4 text-sm text-p360-muted-text">
        <div className="flex justify-between">
          <span>Updated: {lastModifiedDate.toLocaleDateString()}</span>
          <span>
            Ends: {endDate.toLocaleDateString()}
            {daysRemaining > 0 && campaign.status === 'active' && (
              <span className="ml-2 text-blue-600">({daysRemaining} days left)</span>
            )}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      {showQuickActions && (
        <div className="flex gap-2 pt-4 border-t border-gray-200">
          <button
            onClick={() => onView(campaign.id)}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
          >
            View
          </button>
          <button
            onClick={() => onEdit(campaign.id)}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onPause(campaign.id)}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors"
          >
            {campaign.status === 'paused' ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={() => onDuplicate(campaign.id)}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors"
          >
            Clone
          </button>
        </div>
      )}
    </div>
  );
};

export default CampaignCard;
