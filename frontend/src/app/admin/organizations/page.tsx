/**
 * P360-127: Organizations Management Page
 * Displays organization grid with search, sort, filter, and pagination
 * Shows empty state when no organizations exist
 */

'use client';

import React, { useState } from 'react';
import '@/styles/typography.css';

// Mock organization data type
interface Organization {
  id: string;
  name: string;
  accountId: string;
  type: 'Buyer' | 'Seller' | 'Publisher';
  salesforceId: string;
  userCount: number;
  status: 'Active' | 'Draft' | 'Inactive';
}

// Mock data for demonstration
const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'TechCorp Enterprise',
    accountId: 'ORG-801',
    type: 'Buyer',
    salesforceId: 'SF-001-ABC123',
    userCount: 12,
    status: 'Draft',
  },
  // Add more organizations for testing
];

export default function OrganizationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEmptyState, setShowEmptyState] = useState(true); // Start with empty state

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center min-h-[500px] w-full py-8">
      <div className="flex flex-col items-center gap-5 w-[400px]">
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="w-[200px] h-[200px] bg-cover bg-center bg-no-repeat">
            <img 
              src="/figma-org-empty-illustration.png" 
              alt="No organizations illustration"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col items-start gap-2 text-center w-full">
            <h2 className="font-p360 font-semibold text-[#101828] text-[20px] leading-7 tracking-[-0.4px] w-full">
              There&apos;s no Organization yet
            </h2>
            <p className="font-p360 font-normal text-[#71717b] text-[14px] leading-5 w-full">
              Something cool here
            </p>
          </div>
        </div>
        <button 
          onClick={() => setShowEmptyState(false)}
          className="bg-[#841aff] border border-[#7600ff] rounded-[4px] flex items-center gap-1.5 h-10 px-3.5 py-1"
        >
          <span className="font-p360 font-normal text-white text-[14px] leading-5 whitespace-nowrap">
            New Organization
          </span>
        </button>
      </div>
    </div>
  );

  const OrganizationGrid = () => (
    <div className="flex flex-col gap-8 py-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <h1 className="font-p360 font-semibold text-[#4a5565] text-[24px] leading-[30px] tracking-[-0.4px] overflow-hidden text-ellipsis whitespace-nowrap">
            Organization Management
          </h1>
          <button className="bg-[#841aff] border border-[#7600ff] rounded-[4px] flex items-center gap-1.5 h-[34px] px-3 py-1">
            <span className="font-p360 font-normal text-white text-[14px] leading-5 whitespace-nowrap">
              New Organization
            </span>
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2.5">
            {/* Sort Button */}
            <div className="bg-white border border-[#e8e8e8] rounded-[4px] flex items-center gap-1 h-10 px-2.5 py-1.5">
              <div className="w-4 h-4 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 3L9 3M5 6L9 6M7 9L9 9" stroke="#4a5565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-p360 font-normal text-[#4a5565] text-[14px] leading-5 overflow-hidden text-ellipsis whitespace-nowrap px-1">
                Sort
              </span>
            </div>

            {/* Divider */}
            <div className="h-4 w-0 flex items-center justify-center">
              <div className="w-4 h-0 border-t border-[#e8e8e8] rotate-90" />
            </div>

            {/* Filters Button */}
            <div className="bg-white border border-[#e8e8e8] rounded-[4px] flex items-center gap-1 h-10 px-2.5 py-1.5">
              <div className="w-4 h-4 flex items-center justify-center">
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
                  <path d="M1.5 3H11.5M3.5 6H9.5M5.5 9H7.5" stroke="#4a5565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-p360 font-normal text-[#4a5565] text-[14px] leading-5 overflow-hidden text-ellipsis whitespace-nowrap px-1">
                Filters
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white border border-[#e8e8e8] rounded-[4px] flex items-center gap-2 h-10 px-3 py-1.5 w-80">
            <div className="w-4 h-4 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M11 11L8.5 8.5M9.75 5.375C9.75 7.79122 7.79122 9.75 5.375 9.75C2.95878 9.75 1 7.79122 1 5.375C1 2.95878 2.95878 1 5.375 1C7.79122 1 9.75 2.95878 9.75 5.375Z" stroke="#707070" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search organization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 font-p360 font-normal text-[#707070] text-[14px] leading-4 tracking-[-0.2px] border-none outline-none bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="h-[600px] rounded-[4px]">
        <div className="bg-white border border-gray-200 rounded-[4px] h-[600px] flex flex-col overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200 flex items-center h-[50px] w-full">
            <div className="flex-1 flex items-center gap-4 h-[50px] px-4">
              <div className="bg-white border border-gray-200 rounded-[2px] w-4 h-4" />
              <span className="font-p360 font-medium text-[#4a5565] text-[14px] leading-5 whitespace-nowrap">
                Organization Name
              </span>
            </div>
            <div className="flex items-center gap-2.5 h-[50px] w-[170px]">
              <span className="font-p360 font-medium text-[#4a5565] text-[14px] leading-5 whitespace-nowrap">
                Account ID
              </span>
            </div>
            <div className="flex items-center gap-2.5 h-[50px] w-[170px]">
              <span className="font-p360 font-medium text-[#4a5565] text-[14px] leading-5 whitespace-nowrap">
                Type
              </span>
            </div>
            <div className="flex items-center gap-2.5 h-[50px] w-[170px]">
              <span className="font-p360 font-medium text-[#4a5565] text-[14px] leading-5 whitespace-nowrap">
                Salesforce ID
              </span>
            </div>
            <div className="flex items-center gap-2.5 h-[50px] w-[120px]">
              <span className="font-p360 font-medium text-[#4a5565] text-[14px] leading-5 whitespace-nowrap">
                # of Users
              </span>
            </div>
            <div className="h-[50px] w-[140px]" />
          </div>

          {/* Table Rows */}
          {mockOrganizations.map((org) => (
            <div key={org.id} className="bg-white border-b border-gray-200 flex items-center h-[50px] w-full">
              <div className="flex-1 flex items-center gap-4 h-[50px] px-4">
                <div className="bg-white border border-gray-200 rounded-[2px] w-4 h-4" />
                <span className="font-p360 font-medium text-[#841aff] text-[14px] leading-5 whitespace-nowrap">
                  {org.name}
                </span>
                {org.status === 'Draft' && (
                  <div className="bg-[#e5f4ff] rounded-[4px] flex items-center gap-1.5 h-7 px-2 py-1">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
                        <path d="M2.5 1V12M2.5 1H7.5L9.5 3V12H2.5M2.5 1H1.5C1.22386 1 1 1.22386 1 1.5V12.5C1 12.7761 1.22386 13 1.5 13H9.5C9.77614 13 10 12.7761 10 12.5V3M7.5 1V3H9.5" stroke="#008dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-p360 font-normal text-[#008dff] text-[14px] leading-5 whitespace-nowrap">
                      Draft
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2.5 h-[50px] w-[170px]">
                <span className="font-p360 font-medium text-[#4a5565] text-[14px] leading-5 whitespace-nowrap">
                  {org.accountId}
                </span>
              </div>
              <div className="flex items-center gap-2.5 h-[50px] w-[170px]">
                <div className="bg-[#fff1eb] rounded-[4px] flex items-center gap-1.5 h-7 px-2 py-1">
                  <span className="font-p360 font-normal text-[#ff6221] text-[14px] leading-5 whitespace-nowrap">
                    {org.type}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 h-[50px] w-[170px]">
                <span className="font-p360 font-medium text-[#4a5565] text-[14px] leading-5 whitespace-nowrap">
                  {org.salesforceId}
                </span>
              </div>
              <div className="flex items-center gap-2.5 h-[50px] w-[120px]">
                <span className="font-p360 font-medium text-[#4a5565] text-[14px] leading-5 whitespace-nowrap">
                  {org.userCount}
                </span>
              </div>
              <div className="flex items-center justify-end gap-2.5 h-[50px] w-[140px] px-4">
                {/* Users icon */}
                <div className="flex items-center justify-center p-1 rounded-[4px]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15.9999 18C15.9999 16.5855 15.438 15.229 14.4378 14.2288C13.4376 13.2286 12.0811 12.6667 10.6666 12.6667M10.6666 12.6667C9.2521 12.6667 7.89554 13.2286 6.89535 14.2288C5.89516 15.229 5.33325 16.5855 5.33325 18M10.6666 12.6667C12.5075 12.6667 13.9999 11.1743 13.9999 9.33333C13.9999 7.49238 12.5075 6 10.6666 6C8.82564 6 7.33325 7.49238 7.33325 9.33333C7.33325 11.1743 8.82564 12.6667 10.6666 12.6667ZM18.6666 17.3333C18.6666 15.0866 17.3333 13 16 12C16.4382 11.6711 16.7887 11.2394 17.0203 10.7428C17.252 10.2463 17.3576 9.70028 17.328 9.15317C17.2983 8.60606 17.1342 8.07469 16.8503 7.6061C16.5663 7.13751 16.1712 6.74614 15.7 6.46663" stroke="#6A7282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {/* Building icon */}
                <div className="flex items-center justify-center p-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M10.0001 18.6666V15.9999H14.0001V18.6666M9.33341 7.99992H9.34008M14.6667 7.99992H14.6734M12.0001 7.99992H12.0067M12.0001 10.6666H12.0067M12.0001 13.3333H12.0067M14.6667 10.6666H14.6734M14.6667 13.3333H14.6734M9.33341 10.6666H9.34008M9.33341 13.3333H9.34008M8.00008 5.33325H16.0001C16.7365 5.33325 17.3334 5.93021 17.3334 6.66659V17.3333C17.3334 18.0696 16.7365 18.6666 16.0001 18.6666H8.00008C7.2637 18.6666 6.66675 18.0696 6.66675 17.3333V6.66659C6.66675 5.93021 7.2637 5.33325 8.00008 5.33325Z" stroke="#6A7282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {/* Three dots menu */}
                <div className="bg-[#f4ebff] rounded-[4px] flex items-center justify-center p-1 w-6 h-6">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <svg width="11" height="3" viewBox="0 0 11 3" fill="none">
                      <path d="M1.5 1.5H1.51M5.5 1.5H5.51M9.5 1.5H9.51M2 1.5C2 1.77614 1.77614 2 1.5 2C1.22386 2 1 1.77614 1 1.5C1 1.22386 1.22386 1 1.5 1C1.77614 1 2 1.22386 2 1.5ZM6 1.5C6 1.77614 5.77614 2 5.5 2C5.22386 2 5 1.77614 5 1.5C5 1.22386 5.22386 1 5.5 1C5.77614 1 6 1.22386 6 1.5ZM10 1.5C10 1.77614 9.77614 2 9.5 2C9.22386 2 9 1.77614 9 1.5C9 1.22386 9.22386 1 9.5 1C9.77614 1 10 1.22386 10 1.5Z" stroke="#841aff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-3 w-full">
        <div className="bg-white border border-gray-200 rounded-[4px] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.05)] flex items-center gap-2.5 h-10 px-3 py-1">
          <span className="font-p360 font-normal text-[#4a5565] text-[14px] leading-5 whitespace-nowrap">
            Page 1/5
          </span>
          <div className="w-4 h-4 flex items-center justify-center">
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
              <path d="M1 1.5L4 4.5L7 1.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end gap-2">
          <button className="bg-white border border-gray-200 rounded-[4px] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.05)] flex items-center justify-center px-4 py-1 w-10 h-10">
            <div className="w-4 h-4 flex items-center justify-center">
              <svg width="6" height="8" viewBox="0 0 6 8" fill="none">
                <path d="M4.5 1L1.5 4L4.5 7" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
          <button className="bg-white border border-gray-200 rounded-[4px] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.05)] flex items-center justify-center px-4 py-1 w-10 h-10">
            <div className="w-4 h-4 flex items-center justify-center rotate-180">
              <svg width="6" height="8" viewBox="0 0 6 8" fill="none">
                <path d="M4.5 1L1.5 4L4.5 7" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-full" data-name="organizations-page">
      {/* Toggle Button (temporary for testing) */}
      <div className="fixed top-20 right-4 z-50">
        <button
          onClick={() => setShowEmptyState(!showEmptyState)}
          className="bg-[#841aff] text-white px-4 py-2 rounded-md shadow-lg hover:bg-[#7600ff] transition-colors"
        >
          {showEmptyState ? 'Show Grid' : 'Show Empty'}
        </button>
      </div>
      
      <div className="w-full px-6">
        {showEmptyState ? <EmptyState /> : <OrganizationGrid />}
      </div>
    </div>
  );
}
