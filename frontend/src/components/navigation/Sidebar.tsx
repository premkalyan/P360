/**
 * P360 Sidebar Navigation - Figma Design Implementation
 * Based on exact sidebar export from Figma design system
 */

'use client';

import React from 'react';
// @ts-ignore - Next.js Link type conflict due to React version mismatch in monorepo
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const pathname = usePathname();

  // Check if a path is active
  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  return (
    <div className={`flex flex-col items-start p-4 relative w-[272px] h-full bg-white border-r border-gray-200 ${className}`}>
      {/* Create Button */}
      <div className="flex flex-col items-start gap-3 w-full">
        <Link href="/dashboard/create" className="w-full">
          <button className="flex items-center justify-center px-4 py-2 w-full border border-p360-purple rounded bg-white hover:bg-p360-purple/5 transition-colors">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M6 9H12M9 6V12M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z" stroke="#841AFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-p360-purple font-medium text-sm">Create</span>
          </button>
        </Link>

        {/* Navigation Items */}
        <div className="flex flex-col items-start gap-3 w-full">
          
          {/* Home */}
          <Link href="/dashboard" className="w-full">
            <div className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg gap-2 w-full transition-colors ${
              isActive('/dashboard') && pathname === '/dashboard'
                ? 'bg-p360-purple/10 text-p360-purple' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                <path d="M5.75 16.5V9H10.25V16.5M1.25 6.75L8 1.5L14.75 6.75V15C14.75 15.3978 14.592 15.7794 14.3107 16.0607C14.0294 16.342 13.6478 16.5 13.25 16.5H2.75C2.35218 16.5 1.97064 16.342 1.68934 16.0607C1.40804 15.7794 1.25 15.3978 1.25 15V6.75Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Home
            </div>
          </Link>

          {/* My Programs Section */}
          <div className="w-full">
            <div className="text-xs font-medium text-gray-400 mb-2 px-3">My Programs</div>
            <Link href="/dashboard/programs" className="w-full">
              <div className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg gap-2 w-full transition-colors ${
                isActive('/dashboard/programs')
                  ? 'bg-p360-purple/10 text-p360-purple' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                  <path d="M3 7.5C2.175 7.5 1.5 6.825 1.5 6V3C1.5 2.175 2.175 1.5 3 1.5H6C6.825 1.5 7.5 2.175 7.5 3M7.5 12C6.675 12 6 11.325 6 10.5V7.5C6 6.675 6.675 6 7.5 6H10.5C11.325 6 12 6.675 12 7.5M12 10.5H15C15.8284 10.5 16.5 11.1716 16.5 12V15C16.5 15.8284 15.8284 16.5 15 16.5H12C11.1716 16.5 10.5 15.8284 10.5 15V12C10.5 11.1716 11.1716 10.5 12 10.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Programs
              </div>
            </Link>
          </div>

          {/* Campaigns */}
          <Link href="/dashboard/campaigns" className="w-full">
            <div className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg gap-2 w-full transition-colors ${
              isActive('/dashboard/campaigns')
                ? 'bg-p360-purple/10 text-p360-purple' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              <svg className="w-4 h-4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"/>
                <path d="M8 5v4"/>
                <path d="M12 5v4"/>
                <path d="M16 5v4"/>
              </svg>
              Campaigns
            </div>
          </Link>

          {/* Line Items */}
          <Link href="/dashboard/line-items" className="w-full">
            <div className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg gap-2 w-full transition-colors ${
              isActive('/dashboard/line-items')
                ? 'bg-p360-purple/10 text-p360-purple' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                <path d="M1.25 4.5L3.125 2.625L1.25 0.75M1.25 11.25L3.125 9.375L1.25 7.5M6.5 1.5H14.75M6.5 6H14.75M6.5 10.5H14.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Line Items
            </div>
          </Link>

          {/* Audiences Section */}
          <div className="w-full">
            <div className="text-xs font-medium text-gray-400 mb-2 px-3">Audiences</div>
            
            <Link href="/dashboard/audiences" className="w-full">
              <div className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg gap-2 w-full transition-colors ${
                isActive('/dashboard/audiences')
                  ? 'bg-p360-purple/10 text-p360-purple' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                  <path d="M13.5 15C13.5 13.8065 13.0259 12.6619 12.182 11.818C11.3381 10.9741 10.1935 10.5 9 10.5M9 10.5C7.80653 10.5 6.66193 10.9741 5.81802 11.818C4.97411 12.6619 4.5 13.8065 4.5 15M9 10.5C10.6569 10.5 12 9.15685 12 7.5C12 5.84315 10.6569 4.5 9 4.5C7.34315 4.5 6 5.84315 6 7.5C6 9.15685 7.34315 10.5 9 10.5ZM16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Audiences
              </div>
            </Link>

            <Link href="/dashboard/inventory" className="w-full">
              <div className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg gap-2 w-full transition-colors ${
                isActive('/dashboard/inventory')
                  ? 'bg-p360-purple/10 text-p360-purple' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                  <path d="M9 14.25L6.0225 16.035C5.7892 16.1752 5.52217 16.2492 5.25 16.2492C4.97783 16.2492 4.7108 16.1752 4.4775 16.035L2.2275 14.685C2.00607 14.552 1.82275 14.364 1.69529 14.1393C1.56783 13.9146 1.50057 13.6608 1.5 13.4025V10.9725C1.50057 10.7142 1.56783 10.4604 1.69529 10.2357C1.82275 10.011 2.00607 9.82304 2.2275 9.69L5.25 7.875M9 14.25V10.125M9 14.25L11.9775 16.035C12.2108 16.1752 12.4778 16.2492 12.75 16.2492C13.0222 16.2492 13.2892 16.1752 13.5225 16.035L15.7725 14.685C15.9939 14.552 16.1773 14.364 16.3047 14.1393C16.4322 13.9146 16.4994 13.6608 16.5 13.4025V10.9725C16.4994 10.7142 16.4322 10.4604 16.3047 10.2357C16.1773 10.011 15.9939 9.82304 15.7725 9.69L12.75 7.875M9 10.125L5.25 7.875M9 10.125L5.25001 12.3749M9 10.125L12.75 7.875M9 10.125L12.75 12.375M9 10.125L8.99982 5.99993M5.25 7.875V4.59757C5.25057 4.33925 5.31783 4.08545 5.44529 3.86076C5.57275 3.63607 5.75607 3.4481 5.9775 3.31507L8.2275 1.96507C8.4608 1.8249 8.72783 1.75085 9 1.75085C9.27217 1.75085 9.5392 1.8249 9.7725 1.96507L12.0225 3.31507C12.2439 3.4481 12.4273 3.63607 12.5547 3.86076C12.6822 4.08545 12.7494 4.33925 12.75 4.59757V7.875M5.25001 12.3749L1.69501 10.2374M5.25001 12.3749L5.25 16.2525M12.75 12.375L16.305 10.2374M12.75 12.375V16.2525M8.99982 5.99993L5.44482 3.86243M8.99982 5.99993L12.555 3.86243" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Inventory
              </div>
            </Link>
          </div>

          {/* Intelligence Section */}
          <div className="w-full">
            <div className="text-xs font-medium text-gray-400 mb-2 px-3">Intelligence</div>
            
            <Link href="/dashboard/my-dashboards" className="w-full">
              <div className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg gap-2 w-full transition-colors ${
                isActive('/dashboard/my-dashboards')
                  ? 'bg-p360-purple/10 text-p360-purple' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                  <path d="M16.5 9H14.64C14.3122 8.9993 13.9932 9.10598 13.7318 9.30373C13.4704 9.50147 13.281 9.7794 13.1925 10.095L11.43 16.365C11.4186 16.4039 11.395 16.4382 11.3625 16.4625C11.33 16.4868 11.2906 16.5 11.25 16.5C11.2094 16.5 11.17 16.4868 11.1375 16.4625C11.105 16.4382 11.0814 16.4039 11.07 16.365L6.93 1.635C6.91864 1.59605 6.89496 1.56184 6.8625 1.5375C6.83004 1.51316 6.79057 1.5 6.75 1.5C6.70943 1.5 6.66996 1.51316 6.6375 1.5375C6.60504 1.56184 6.58136 1.59605 6.57 1.635L4.8075 7.905C4.71935 8.21937 4.53104 8.49639 4.27115 8.69401C4.01126 8.89163 3.69399 8.99907 3.3675 9H1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                My Dashboards
              </div>
            </Link>

            <Link href="/dashboard/my-reports" className="w-full">
              <div className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg gap-2 w-full transition-colors ${
                isActive('/dashboard/my-reports')
                  ? 'bg-p360-purple/10 text-p360-purple' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                  <path d="M12 3H13.5C13.8978 3 14.2794 3.15804 14.5607 3.43934C14.842 3.72064 15 4.10218 15 4.5V15C15 15.3978 14.842 15.7794 14.5607 16.0607C14.2794 16.342 13.8978 16.5 13.5 16.5H4.5C4.10218 16.5 3.72064 16.342 3.43934 16.0607C3.15804 15.7794 3 15.3978 3 15V4.5C3 4.10218 3.15804 3.72064 3.43934 3.43934C3.72064 3.15804 4.10218 3 4.5 3H6M6.75 1.5H11.25C11.6642 1.5 12 1.83579 12 2.25V3.75C12 4.16421 11.6642 4.5 11.25 4.5H6.75C6.33579 4.5 6 4.16421 6 3.75V2.25C6 1.83579 6.33579 1.5 6.75 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                My Reports
              </div>
            </Link>
          </div>

          {/* General Section */}
          <div className="w-full">
            <div className="text-xs font-medium text-gray-400 mb-2 px-3">General</div>
            
            <Link href="/dashboard/media-planning" className="w-full">
              <div className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg gap-2 w-full transition-colors ${
                isActive('/dashboard/media-planning')
                  ? 'bg-p360-purple/10 text-p360-purple' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                  <path d="M2.25 8.25L16.5 1.5L9.75 15.75L8.25 9.75L2.25 8.25Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Media Planning
              </div>
            </Link>

            <Link href="/dashboard/assets" className="w-full">
              <div className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg gap-2 w-full transition-colors ${
                isActive('/dashboard/assets')
                  ? 'bg-p360-purple/10 text-p360-purple' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                  <path d="M4.56034 7.125L1.93534 8.325C1.80649 8.38557 1.69754 8.48156 1.62123 8.60175C1.54492 8.72195 1.50439 8.86138 1.50439 9.00375C1.50439 9.14612 1.54492 9.28555 1.62123 9.40575C1.69754 9.52594 1.80649 9.62193 1.93534 9.6825L8.38534 12.615C8.57974 12.703 8.79068 12.7486 9.00409 12.7486C9.21749 12.7486 9.42844 12.703 9.62284 12.615L16.0578 9.69C16.1909 9.63132 16.3041 9.5352 16.3835 9.41336C16.463 9.29151 16.5052 9.1492 16.5052 9.00375C16.5052 8.8583 16.463 8.71599 16.3835 8.59414C16.3041 8.4723 16.1909 8.37618 16.0578 8.3175L13.4328 7.125M4.56034 10.875L1.93534 12.075C1.80649 12.1356 1.69754 12.2316 1.62123 12.3518C1.54492 12.4719 1.50439 12.6114 1.50439 12.7537C1.50439 12.8961 1.54492 13.0356 1.62123 13.1557C1.69754 13.2759 1.80649 13.3719 1.93534 13.4325L8.38534 16.365C8.57974 16.453 8.79068 16.4986 9.00409 16.4986C9.21749 16.4986 9.42844 16.453 9.62284 16.365L16.0578 13.44C16.1909 13.3813 16.3041 13.2852 16.3835 13.1634C16.463 13.0415 16.5052 12.8992 16.5052 12.7537C16.5052 12.6083 16.463 12.466 16.3835 12.3441C16.3041 12.2223 16.1909 12.1262 16.0578 12.0675L13.4328 10.875M9.62284 1.63508C9.42742 1.54595 9.21513 1.49982 9.00034 1.49982C8.78555 1.49982 8.57326 1.54595 8.37784 1.63508L1.95034 4.56008C1.81725 4.61877 1.7041 4.71488 1.62466 4.83673C1.54522 4.95857 1.50293 5.10088 1.50293 5.24633C1.50293 5.39179 1.54522 5.5341 1.62466 5.65594C1.7041 5.77779 1.81725 5.8739 1.95034 5.93258L8.38534 8.86508C8.58076 8.95422 8.79305 9.00035 9.00784 9.00035C9.22263 9.00035 9.43492 8.95422 9.63034 8.86508L16.0653 5.94008C16.1984 5.8814 16.3116 5.78529 16.391 5.66344C16.4705 5.5416 16.5127 5.39929 16.5127 5.25383C16.5127 5.10838 16.4705 4.96607 16.391 4.84423C16.3116 4.72238 16.1984 4.62627 16.0653 4.56758L9.62284 1.63508Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Assets
              </div>
            </Link>

            <Link href="/dashboard/marketplace" className="w-full">
              <div className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg gap-2 w-full transition-colors ${
                isActive('/dashboard/marketplace')
                  ? 'bg-p360-purple/10 text-p360-purple' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                  <path d="M11.25 8.25L10.5 15M14.25 8.25L11.25 3M1.5 8.25H16.5M2.625 8.25L3.825 13.8C3.89513 14.1439 4.08364 14.4523 4.35771 14.6716C4.63179 14.8909 4.97408 15.0071 5.325 15H12.675C13.0259 15.0071 13.3682 14.8909 13.6423 14.6716C13.9164 14.4523 14.1049 14.1439 14.175 13.8L15.45 8.25M3.375 11.625H14.625M3.75 8.25L6.75 3M6.75 8.25L7.5 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Marketplace
              </div>
            </Link>

            <Link href="/dashboard/integrations" className="w-full">
              <div className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg gap-2 w-full transition-colors ${
                isActive('/dashboard/integrations')
                  ? 'bg-p360-purple/10 text-p360-purple' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                  <path d="M12.5 10.25C11.2574 10.25 10.25 11.2574 10.25 12.5C10.25 13.7426 11.2574 14.75 12.5 14.75C13.7426 14.75 14.75 13.7426 14.75 12.5C14.75 11.2574 13.7426 10.25 12.5 10.25ZM12.5 10.25V5C12.5 4.60218 12.342 4.22064 12.0607 3.93934C11.7794 3.65804 11.3978 3.5 11 3.5H8.75M3.5 5.75C4.74264 5.75 5.75 4.74264 5.75 3.5C5.75 2.25736 4.74264 1.25 3.5 1.25C2.25736 1.25 1.25 2.25736 1.25 3.5C1.25 4.74264 2.25736 5.75 3.5 5.75ZM3.5 5.75V11C3.5 11.3978 3.65804 11.7794 3.93934 12.0607C4.22064 12.342 4.60218 12.5 5 12.5H7.25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Integrations
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Sidebar;
