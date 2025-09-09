/**
 * P360-67: Campaign Configuration UI - CampaignCard Component
 * Campaign performance overview with real-time feedback
 * P360-106: Updated with Figma design system compliance
 */

import React from 'react';
import { Icon, IconName } from '@/components/ui/icons';

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft' | 'completed';
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
  audienceSize?: number;
}

export interface CampaignCardProps {
  campaign: Campaign;
  onEdit?: (id: string) => void;
  onPause?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onView?: (id: string) => void;
  compact?: boolean;
  showQuickActions?: boolean;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  onEdit,
  onPause,
  onDuplicate,
  onView,
  compact = false,
  showQuickActions = true,
}) => {
  const {
    id,
    name,
    status,
    type,
    budget,
    spent,
    impressions,
    clicks,
    conversions,
    ctr,
    cpa,
    roas,
    endDate,
    lastModified,
    programName,
    audienceSize,
  } = campaign;

  // Helper functions
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

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getBudgetUtilization = (): number => {
    return (spent / budget) * 100;
  };

  const getBudgetStatus = () => {
    const utilization = getBudgetUtilization();
    if (spent > budget) return 'over';
    if (utilization >= 90) return 'high';
    return 'normal';
  };

  const getProgressBarColor = () => {
    const budgetStatus = getBudgetStatus();
    if (budgetStatus === 'over') return 'bg-red-500';
    if (budgetStatus === 'high') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getRoasColor = () => {
    if (roas >= 4) return 'text-green-600';
    if (roas >= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusDisplay = () => {
    switch (status) {
      case 'active':
        return { text: 'Active', icon: 'active' as IconName, className: 'text-status-active' };
      case 'paused':
        return { text: 'Paused', icon: 'paused' as IconName, className: 'text-status-paused' };
      case 'draft':
        return { text: 'Draft', icon: 'draft' as IconName, className: 'text-status-neutral' };
      case 'completed':
        return { text: 'Completed', icon: 'completed' as IconName, className: 'text-p360-secondary-blue' };
      default:
        return { text: status, icon: 'active' as IconName, className: 'text-gray-600' };
    }
  };

  const getTypeIcon = (): IconName => {
    switch (type) {
      case 'conversion':
        return 'conversion';
      case 'awareness':
        return 'awareness';
      case 'retargeting':
        return 'retargeting';
      default:
        return 'chart';
    }
  };

  const getPerformanceIndicator = () => {
    if (spent > budget) {
      return { text: 'Over Budget', icon: 'warning' as IconName, className: 'bg-red-50 text-red-700' };
    }
    if (conversions === 0) {
      return { text: 'Needs Optimization', icon: 'warning' as IconName, className: 'bg-yellow-50 text-yellow-700' };
    }
    if (roas >= 4) {
      return { text: 'High Performer', icon: 'success' as IconName, className: 'bg-green-50 text-green-700' };
    }
    return null;
  };

  const getDaysRemaining = () => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const statusDisplay = getStatusDisplay();
  const performanceIndicator = getPerformanceIndicator();
  const budgetUtilization = getBudgetUtilization();
  const progressBarColor = getProgressBarColor();
  const roasColor = getRoasColor();
  const daysRemaining = getDaysRemaining();

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow ${
      compact ? 'p-4' : 'p-6'
    }`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 font-p360">{name}</h3>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Icon name="programs" size="xs" />
              <span>{programName}</span>
            </div>
            <div className={`flex items-center gap-1 ${statusDisplay.className}`}>
              <Icon name={statusDisplay.icon} size="xs" />
              <span>{statusDisplay.text}</span>
            </div>
            <Icon name={getTypeIcon()} size="xs" className="text-p360-purple" />
          </div>
        </div>
        
        {performanceIndicator && (
          <span className={`px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 ${performanceIndicator.className}`}>
            <Icon name={performanceIndicator.icon} size="xs" />
            {performanceIndicator.text}
          </span>
        )}
      </div>

      {/* Metrics Grid - Hidden in compact mode */}
      {!compact && (
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-sm text-gray-500">Impressions</div>
            <div className="text-lg font-semibold">{formatNumber(impressions)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Clicks</div>
            <div className="text-lg font-semibold">{formatNumber(clicks)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">CTR</div>
            <div className="text-lg font-semibold">{ctr.toFixed(2)}%</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">CPA</div>
            <div className="text-lg font-semibold">{formatCurrency(cpa)}</div>
          </div>
        </div>
      )}

      {/* Performance Metrics */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-sm text-gray-500">Conversions</div>
          <div className="text-xl font-bold">{conversions}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">ROAS</div>
          <div className={`text-xl font-bold ${roasColor}`}>{roas}x</div>
        </div>
      </div>

      {/* Budget Progress */}
      <div className={`p-3 rounded-lg mb-4 ${
        spent > budget ? 'bg-red-50' : 'bg-gray-50'
      }`}>
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">Budget</span>
          <span>{budgetUtilization.toFixed(1)}% utilized</span>
        </div>
        <div className="text-sm text-gray-600 mb-2">
          {formatCurrency(spent)} / {formatCurrency(budget)}
          {spent > budget && (
            <span className="text-red-600 ml-2">
              Over budget by {formatCurrency(spent - budget)}
            </span>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${progressBarColor}`}
            style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
          />
        </div>
      </div>

      {/* Audience Size */}
      {audienceSize && (
        <div className="text-sm text-gray-600 mb-4 flex items-center gap-1">
          <Icon name="users" size="sm" />
          <span>Audience: {formatNumber(audienceSize)} identifiers</span>
        </div>
      )}

      {/* Dates and Status */}
      <div className="flex justify-between text-xs text-gray-500 mb-4">
        <span>Updated: {formatDate(lastModified)}</span>
        <span>
          Ends: {formatDate(endDate)}
          {daysRemaining > 0 && ` (${daysRemaining} days left)`}
        </span>
      </div>

      {/* Action Buttons */}
      {showQuickActions && (
        <div className="flex space-x-2">
          <button
            onClick={() => onView?.(id)}
            className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
          >
            <Icon name="view" size="xs" />
            View
          </button>
          <button
            onClick={() => onEdit?.(id)}
            className="flex-1 px-3 py-2 text-sm bg-p360-purple/10 text-p360-purple rounded-md hover:bg-p360-purple/20 transition-colors flex items-center justify-center gap-1"
          >
            <Icon name="edit" size="xs" />
            Edit
          </button>
          <button
            onClick={() => onPause?.(id)}
            className="flex-1 px-3 py-2 text-sm bg-status-paused/10 text-status-paused rounded-md hover:bg-status-paused/20 transition-colors flex items-center justify-center gap-1"
          >
            <Icon name={status === 'paused' ? 'play' : 'pause'} size="xs" />
            {status === 'paused' ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={() => onDuplicate?.(id)}
            className="flex-1 px-3 py-2 text-sm bg-p360-secondary-blue/10 text-p360-secondary-blue rounded-md hover:bg-p360-secondary-blue/20 transition-colors flex items-center justify-center gap-1"
          >
            <Icon name="duplicate" size="xs" />
            Clone
          </button>
        </div>
      )}
    </div>
  );
};

export default CampaignCard;
