'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { activityService, Activity, TimeRange, ActivityCategory } from '@/services/activity.service';

interface ActivityDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  organizationName: string;
  organizationId?: string;
}

export default function ActivityDetails({ isOpen, onClose: _onClose, organizationName, organizationId }: ActivityDetailsProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'actions'>('all');
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');
  const [timeRangeLabel, setTimeRangeLabel] = useState('Last 24 hours');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [showTimeRangeDropdown, setShowTimeRangeDropdown] = useState(false);
  
  // Time range options
  const timeRangeOptions = [
    { value: '1h' as TimeRange, label: 'Last hour' },
    { value: '24h' as TimeRange, label: 'Last 24 hours' },
    { value: '7d' as TimeRange, label: 'Last 7 days' },
    { value: '30d' as TimeRange, label: 'Last 30 days' },
    { value: '90d' as TimeRange, label: 'Last 90 days' },
    { value: 'all' as TimeRange, label: 'All time' },
  ];

  const loadActivities = useCallback(async () => {
    setLoading(true);
    try {
      const category: ActivityCategory | undefined = activeTab === 'actions' ? 'organization' : undefined;
      const response = await activityService.getActivities({
        organizationId,
        category,
        timeRange,
        limit: 50,
      });
      setActivities(response.data);
    } catch (error) {
      console.error('Failed to load activities:', error);
    } finally {
      setLoading(false);
    }
  }, [organizationId, activeTab, timeRange]);

  const handleTimeRangeChange = (newTimeRange: TimeRange, label: string) => {
    setTimeRange(newTimeRange);
    setTimeRangeLabel(label);
    setShowTimeRangeDropdown(false);
  };

  // Load activities when component opens or filters change
  useEffect(() => {
    if (isOpen) {
      loadActivities();
    }
  }, [isOpen, loadActivities]);
  
  if (!isOpen) return null;

  const formatTimestamp = (isoString: string) => {
    const timestamp = new Date(isoString);
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'organization_updated':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M9.33341 2.66659L13.3334 6.66659M2.66675 13.3333H6.66675L13.3334 6.66659L9.33341 2.66659L2.66675 13.3333Z" stroke="#841aff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'user_added':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8ZM8 8C5.79086 8 4 9.79086 4 12V14H12V12C12 9.79086 10.2091 8 8 8Z" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'status_changed':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00002C14.6667 4.31812 11.6819 1.33335 8 1.33335C4.31814 1.33335 1.33337 4.31812 1.33337 8.00002C1.33337 11.6819 4.31814 14.6667 8 14.6667Z" stroke="#f59e0b" strokeWidth="1.5"/>
            <path d="M6 8L7.33333 9.33333L10 6.66667" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'organization_created':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00002C14.6667 4.31812 11.6819 1.33335 8 1.33335C4.31814 1.33335 1.33337 4.31812 1.33337 8.00002C1.33337 11.6819 4.31814 14.6667 8 14.6667ZM8 5.33335V8.00002M8 10.6667H8.00667" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="#6b7280" strokeWidth="1.5"/>
          </svg>
        );
    }
  };

  return (
    <>
      {/* Activity Panel - Positioned to the right of edit sidebar */}
      <div className="fixed right-0 top-0 h-full w-[400px] bg-white z-[60] border-l border-gray-200 overflow-y-auto" style={{
        transform: isOpen ? 'translateX(0px)' : 'translateX(400px)',
        transition: 'transform 0.3s ease-in-out'
      }}>
        {/* Header with tabs - Exact Figma Design */}
        <div className="bg-white w-full border-b border-gray-200">
          <div className="px-5 pt-4 pb-2">
            {/* Title, Time Range, and Close Button */}
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex flex-col">
                <h3 className="font-['Lexend_Deca'] font-semibold text-[18px] leading-[24px] tracking-[-0.2px] text-[#101828]">
                  Activity Log
                </h3>
                <p className="font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#6a7282]">
                  {organizationName}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                <button
                  onClick={() => setShowTimeRangeDropdown(!showTimeRangeDropdown)}
                  className="bg-white border border-[#d1d5dc] rounded-[4px] px-2.5 py-1.5 h-8 flex items-center gap-2 hover:bg-gray-50"
                >
                  <span className="font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#212121]">
                    {timeRangeLabel}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                {/* Time Range Dropdown */}
                {showTimeRangeDropdown && (
                  <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-[4px] shadow-lg z-10 w-40">
                    <div className="py-1">
                      {timeRangeOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleTimeRangeChange(option.value, option.label)}
                          className={`w-full px-3 py-2 text-left text-sm font-normal hover:bg-gray-50 ${
                            timeRange === option.value 
                              ? 'text-[#841aff] bg-[#f4ebff]' 
                              : 'text-[#4a5565]'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                </div>
                
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-0 py-1.5 relative ${
                  activeTab === 'all' 
                    ? 'text-[#841aff]' 
                    : 'text-[#99a1af]'
                }`}
              >
                <span className="font-['Lexend_Deca'] font-normal text-[14px] leading-[20px]">
                  All activity
                </span>
                {activeTab === 'all' && (
                  <div className="absolute bottom-[-8px] left-0 right-0 h-0">
                    <div className="h-[2px] bg-[#841aff] rounded-full"></div>
                  </div>
                )}
              </button>
              
              <button
                onClick={() => setActiveTab('actions')}
                className={`px-0 py-1.5 relative ${
                  activeTab === 'actions' 
                    ? 'text-[#841aff]' 
                    : 'text-[#99a1af]'
                }`}
              >
                <span className="font-['Lexend_Deca'] font-normal text-[14px] leading-[20px]">
                  Actions
                </span>
                {activeTab === 'actions' && (
                  <div className="absolute bottom-[-8px] left-0 right-0 h-0">
                    <div className="h-[2px] bg-[#841aff] rounded-full"></div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Activity List - Exact Figma Design */}
        <div className="bg-white w-full">
          {/* Activity Items */}
          {loading ? (
            <div className="p-5 text-center">
              <span className="font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#6a7282]">
                Loading activities...
              </span>
            </div>
          ) : activities.length === 0 ? (
            <div className="p-5 text-center">
              <span className="font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#6a7282]">
                No activities found for the selected time range.
              </span>
            </div>
          ) : (
            activities.map((activity) => (
            <div key={activity.id} className="bg-white w-full border-b border-gray-200">
              <div className="p-5">
                <div className="flex flex-col gap-3.5">
                  {/* Header with user and timestamp */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#f4ebff] flex items-center justify-center">
                        {getActivityIcon(activity.type)}
                      </div>
                      <span className="font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#6a7282]">
                        {activity.actorUser 
                          ? `${activity.actorUser.firstName || ''} ${activity.actorUser.lastName || ''}`.trim() || activity.actorUser.email
                          : 'System'
                        }
                      </span>
                    </div>
                    <span className="font-['Lexend_Deca'] font-normal text-[12px] leading-[16px] text-[#6a7282]">
                      {formatTimestamp(activity.createdAt)}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <p className="font-['Lexend_Deca'] font-medium text-[16px] leading-[22px] text-[#101828]">
                        {activity.title}
                      </p>
                      {activity.description && (
                        <p className="font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#4a5565]">
                          {activity.description}
                        </p>
                      )}
                    </div>
                    
                    {/* Badge */}
                    <div className="inline-flex">
                      <div className="bg-[#f4ebff] px-1.5 py-0.5 rounded-[2px]">
                        <span className="font-['Lexend_Deca'] font-normal text-[12px] leading-[16px] text-[#841aff]">
                          Action
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
          )}
        </div>
      </div>
    </>
  );
}
