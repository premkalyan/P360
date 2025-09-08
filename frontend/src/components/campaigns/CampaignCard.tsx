'use client';

/**
 * P360-67: Campaign Configuration UI - Campaign Card Component
 * Implements campaign performance overview with real-time metrics
 * Part of Campaign Configuration UI story acceptance criteria
 */

import React from 'react';
import { Button } from '@/components/ui/Button';

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft' | 'completed';
  type: 'awareness' | 'conversion' | 'retargeting';
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
  programName?: string;
  audienceSize?: number;
}

interface CampaignCardProps {
  campaign: Campaign;
  onEdit?: (campaignId: string) => void;
  onPause?: (campaignId: string) => void;
  onDuplicate?: (campaignId: string) => void;
  onView?: (campaignId: string) => void;
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
  const getStatusConfig = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return { 
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: '●',
          label: 'Active'
        };
      case 'paused':
        return { 
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: '⏸',
          label: 'Paused'
        };
      case 'draft':
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: '◐',
          label: 'Draft'
        };
      case 'completed':
        return { 
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: '✓',
          label: 'Completed'
        };
    }
  };

  const getTypeIcon = (type: Campaign['type']) => {
    switch (type) {
      case 'awareness':
        return '👁️';
      case 'conversion':
        return '🎯';
      case 'retargeting':
        return '🔄';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return new Intl.NumberFormat('en-US').format(num);
  };

  const budgetUtilization = campaign.budget > 0 ? (campaign.spent / campaign.budget) * 100 : 0;
  const daysRemaining = Math.max(0, Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
  const statusConfig = getStatusConfig(campaign.status);
  const isOverBudget = budgetUtilization > 100;
  const isNearBudget = budgetUtilization > 90;

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-blue-200 ${
      compact ? 'p-4' : 'p-6'
    } ${isOverBudget ? 'border-red-200 bg-red-50' : ''}`}>
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{getTypeIcon(campaign.type)}</span>
            <h3 className={`font-semibold text-gray-900 truncate ${
              compact ? 'text-sm' : 'text-lg'
            }`}>
              {campaign.name}
            </h3>
          </div>
          
          {campaign.programName && (
            <p className="text-xs text-blue-600 mb-1">
              📊 {campaign.programName}
            </p>
          )}
          
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>Updated: {new Date(campaign.lastModified).toLocaleDateString()}</span>
            <span>•</span>
            <span>Ends: {new Date(campaign.endDate).toLocaleDateString()}</span>
            {daysRemaining > 0 && (
              <>
                <span>•</span>
                <span className={daysRemaining <= 7 ? 'text-orange-600 font-medium' : ''}>
                  {daysRemaining} days left
                </span>
              </>
            )}
          </div>
        </div>
        
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig.color}`}>
          <span className="mr-1">{statusConfig.icon}</span>
          {statusConfig.label}
        </div>
      </div>

      {/* Budget Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600 font-medium">Budget Performance</span>
          <span className={`font-medium ${isOverBudget ? 'text-red-600' : 'text-gray-900'}`}>
            {formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${
              isOverBudget ? 'bg-red-500' :
              isNearBudget ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs mt-1">
          <span className={`${isOverBudget ? 'text-red-600' : 'text-gray-500'}`}>
            {budgetUtilization.toFixed(1)}% utilized
          </span>
          {isOverBudget && (
            <span className="text-red-600 font-medium">
              Over budget by {formatCurrency(campaign.spent - campaign.budget)}
            </span>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      {!compact && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">
              {formatNumber(campaign.impressions)}
            </div>
            <div className="text-xs text-blue-600 font-medium">Impressions</div>
          </div>
          
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">
              {formatNumber(campaign.clicks)}
            </div>
            <div className="text-xs text-green-600 font-medium">Clicks</div>
          </div>
          
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-lg font-bold text-purple-600">
              {campaign.ctr.toFixed(2)}%
            </div>
            <div className="text-xs text-purple-600 font-medium">CTR</div>
          </div>
          
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-lg font-bold text-orange-600">
              {formatCurrency(campaign.cpa)}
            </div>
            <div className="text-xs text-orange-600 font-medium">CPA</div>
          </div>
        </div>
      )}

      {/* Performance Summary */}
      <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
        <div>
          <div className="text-xs text-gray-500 mb-1">Conversions</div>
          <div className="text-xl font-bold text-gray-900">{formatNumber(campaign.conversions)}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">ROAS</div>
          <div className={`text-xl font-bold ${
            campaign.roas >= 3 ? 'text-green-600' :
            campaign.roas >= 2 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {campaign.roas.toFixed(1)}x
          </div>
        </div>
      </div>

      {/* Audience Info */}
      {campaign.audienceSize && (
        <div className="mb-4 p-2 bg-blue-50 rounded-md">
          <div className="text-xs text-blue-700">
            👥 Audience: {formatNumber(campaign.audienceSize)} identifiers
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {showQuickActions && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView?.(campaign.id)}
            className="flex-1"
          >
            👁️ View
          </Button>
          <Button
            variant="outline" 
            size="sm"
            onClick={() => onEdit?.(campaign.id)}
            className="flex-1"
          >
            ✏️ Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPause?.(campaign.id)}
            className="flex-1"
          >
            {campaign.status === 'active' ? '⏸ Pause' : '▶️ Resume'}
          </Button>
          <Button
            variant="outline"
            size="sm" 
            onClick={() => onDuplicate?.(campaign.id)}
            className="flex-1"
          >
            📄 Clone
          </Button>
        </div>
      )}

      {/* Performance Indicators */}
      <div className="flex justify-center gap-4 mt-3 text-xs">
        {isOverBudget && (
          <span className="inline-flex items-center text-red-600">
            ⚠️ Over Budget
          </span>
        )}
        {campaign.conversions === 0 && campaign.status === 'active' && (
          <span className="inline-flex items-center text-yellow-600">
            ⚡ Needs Optimization
          </span>
        )}
        {campaign.roas >= 4 && (
          <span className="inline-flex items-center text-green-600">
            🚀 High Performer
          </span>
        )}
      </div>
    </div>
  );
};

export default CampaignCard;
