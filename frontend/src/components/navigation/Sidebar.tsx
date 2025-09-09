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
                  <g clipPath="url(#clip0_3184_1485)">
                    <path d="M3 7.5C2.175 7.5 1.5 6.825 1.5 6V3C1.5 2.175 2.175 1.5 3 1.5H6C6.825 1.5 7.5 2.175 7.5 3M7.5 12C6.675 12 6 11.325 6 10.5V7.5C6 6.675 6.675 6 7.5 6H10.5C11.325 6 12 6.675 12 7.5M12 10.5H15C15.8284 10.5 16.5 11.1716 16.5 12V15C16.5 15.8284 15.8284 16.5 15 16.5H12C11.1716 16.5 10.5 15.8284 10.5 15V12C10.5 11.1716 11.1716 10.5 12 10.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_3184_1485">
                      <rect width="18" height="18" fill="white"/>
                    </clipPath>
                  </defs>
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
              <svg className="w-4 h-4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"/>
                <line x1="8" y1="12" x2="21" y2="12"/>
                <line x1="8" y1="18" x2="21" y2="18"/>
                <line x1="3" y1="6" x2="3.01" y2="6"/>
                <line x1="3" y1="12" x2="3.01" y2="12"/>
                <line x1="3" y1="18" x2="3.01" y2="18"/>
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
                <svg className="w-4 h-4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
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
                <svg className="w-4 h-4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7l8-3 8 3v10l-8 3-8-3V7z"/>
                  <path d="M12 4v13"/>
                  <path d="M8 8l8-3"/>
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
                <svg className="w-4 h-4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v5h5"/>
                  <path d="M20 20v-5h-5"/>
                  <path d="M8.5 8.5c.83-.83 2.17-.83 3 0s.83 2.17 0 3-2.17.83-3 0-.83-2.17 0-3z"/>
                  <path d="M15.5 15.5c.83-.83 2.17-.83 3 0s.83 2.17 0 3-2.17.83-3 0-.83-2.17 0-3z"/>
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
                <svg className="w-4 h-4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
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
                <svg className="w-4 h-4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
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
                <svg className="w-4 h-4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                  <polyline points="13,2 13,9 20,9"/>
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
                <svg className="w-4 h-4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
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
                <svg className="w-4 h-4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.5 12c0 4.4-3.6 8-8 8A8 8 0 119.5 4c0 4.4 3.6 8 8 8z"/>
                  <path d="M8 12h8"/>
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
