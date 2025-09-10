/**
 * P360-127: Admin Layout - Foundation for Organization Management
 * Contains the 4-tab navigation and admin-specific UI structure
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '@/styles/typography.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tabs = [
    {
      id: 'organizations',
      label: 'Organization',
      icon: '🏢',
      path: '/admin/organizations',
      active: pathname.startsWith('/admin/organizations'),
    },
    {
      id: 'users',
      label: 'User',
      icon: '👥',
      path: '/admin/users',
      active: pathname.startsWith('/admin/users'),
    },
    {
      id: 'activity-log',
      label: 'Activity Log',
      icon: '📊',
      path: '/admin/activity-log',
      active: pathname.startsWith('/admin/activity-log'),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      path: '/admin/settings',
      active: pathname.startsWith('/admin/settings'),
    },
  ];

    return (
    <div className="bg-gray-50 relative min-h-screen w-full font-p360" data-name="admin-layout">
      <div className="relative min-h-screen w-full">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full">
          <div className="flex items-center justify-between px-4 py-2.5">
            {/* Left side - Logo and Badge */}
            <div className="flex items-center gap-2.5">
              <div className="flex flex-col gap-2.5 pr-2 py-[5px]">
                <div className="h-[22px] w-[135px] overflow-hidden">
                  <img 
                    src="/pipeline360-logo.svg" 
                    alt="Pipeline360" 
                    className="h-full w-auto" 
                  />
                </div>
              </div>
              <div className="bg-[#ffe6fc] rounded-[2px] px-1 py-[3px]">
                <span className="font-medium text-[#ed01cf] text-[11px] leading-4 tracking-[-0.15px]">
                  Super Admin
                </span>
              </div>
            </div>

            {/* Center - Search Bar */}
            <div className="absolute left-1/2 top-2.5 transform -translate-x-1/2">
              <div className="bg-white border border-gray-200 rounded-[4px] flex items-center gap-2 h-[34px] px-3 py-1 w-80">
                <div className="w-[18px] h-[18px] flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M11 11L8.5 8.5M9.75 5.375C9.75 7.79122 7.79122 9.75 5.375 9.75C2.95878 9.75 1 7.79122 1 5.375C1 2.95878 2.95878 1 5.375 1C7.79122 1 9.75 2.95878 9.75 5.375Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="flex-1 font-p360 text-[14px] text-[#99a1af] border-none outline-none bg-transparent"
                />
                <div className="bg-gray-100 border border-gray-200 rounded-[4px] px-3 py-1 h-5 flex items-center justify-center">
                  <span className="font-p360 text-[#6a7282] text-[12px] leading-4">F</span>
                </div>
              </div>
            </div>

            {/* Right side - Tools */}
            <div className="flex items-center gap-2">
              <button className="bg-white border border-gray-200 rounded-[4px] h-[34px] w-[34px] flex items-center justify-center">
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                  <rect x="0.5" y="0.5" width="33" height="33" rx="3.5" fill="white"/>
                  <rect x="0.5" y="0.5" width="33" height="33" rx="3.5" stroke="#E5E7EB"/>
                  <path d="M23.75 20.75C22.645 20.75 21.75 19.855 21.75 18.75V14.5C21.75 11.877 19.623 9.75 17 9.75C14.377 9.75 12.25 11.877 12.25 14.5V18.75C12.25 19.855 11.355 20.75 10.25 20.75H23.75Z" stroke="#4A5565" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.5 23.3843C18.2005 23.9018 17.6409 24.25 17 24.25C16.3591 24.25 15.7995 23.9018 15.5 23.3843" stroke="#4A5565" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="w-[34px] h-[34px] px-[3px] flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-[#841aff] flex items-center justify-center">
                  <span className="text-white font-p360 font-medium text-[12px] leading-4">
                    SA
                  </span>
                </div>
              </div>
        </div>
      </div>

          {/* Tab Navigation */}
          <div className="bg-white px-6 py-0">
            <div className="flex items-center">
              {tabs.map((tab) => (
          <Link 
                  key={tab.id}
                  href={tab.path}
                  className={`flex flex-col h-12 items-start justify-between pb-0 pt-2 px-0 relative`}
                >
                  <div className={`flex items-center gap-1 px-3 py-1.5 rounded-[2.348px] ${tab.active ? 'pl-0.5 pr-3' : 'px-3'}`}>
                    <div className="flex items-center justify-center p-[2px]">
                      <div className="w-4 h-4 flex items-center justify-center">
                        {tab.id === 'organizations' && (
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M8.00008 16.6666V13.9999H12.0001V16.6666M7.33341 5.99992H7.34008M12.6667 5.99992H12.6734M10.0001 5.99992H10.0067M10.0001 8.66659H10.0067M10.0001 11.3333H10.0067M12.6667 8.66659H12.6734M12.6667 11.3333H12.6734M7.33341 8.66659H7.34008M7.33341 11.3333H7.34008M6.00008 3.33325H14.0001C14.7365 3.33325 15.3334 3.93021 15.3334 4.66659V15.3333C15.3334 16.0696 14.7365 16.6666 14.0001 16.6666H6.00008C5.2637 16.6666 4.66675 16.0696 4.66675 15.3333V4.66659C4.66675 3.93021 5.2637 3.33325 6.00008 3.33325Z" stroke={tab.active ? "#841AFF" : "#6A7282"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                        {tab.id === 'users' && (
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M14 16C14 14.5855 13.4381 13.229 12.4379 12.2288C11.4378 11.2286 10.0812 10.6667 8.66671 10.6667M8.66671 10.6667C7.25222 10.6667 5.89567 11.2286 4.89547 12.2288C3.89528 13.229 3.33337 14.5855 3.33337 16M8.66671 10.6667C10.5077 10.6667 12 9.17428 12 7.33333C12 5.49238 10.5077 4 8.66671 4C6.82576 4 5.33337 5.49238 5.33337 7.33333C5.33337 9.17428 6.82576 10.6667 8.66671 10.6667ZM16.6667 15.3333C16.6667 13.0866 15.3334 11 14.0001 9.99997C14.4384 9.67115 14.7888 9.23936 15.0205 8.74281C15.2521 8.24627 15.3577 7.70028 15.3281 7.15317C15.2984 6.60606 15.1344 6.07469 14.8504 5.6061C14.5664 5.13751 14.1713 4.74614 13.7001 4.46663" stroke="#6A7282" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                        {tab.id === 'activity-log' && (
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <g clipPath="url(#clip0_809_20356)">
                              <path d="M16.6667 9.99992H15.0134C14.722 9.9993 14.4385 10.0941 14.2061 10.2699C13.9738 10.4457 13.8054 10.6927 13.7267 10.9733L12.16 16.5466C12.1499 16.5812 12.1289 16.6116 12.1 16.6333C12.0712 16.6549 12.0361 16.6666 12 16.6666C11.964 16.6666 11.9289 16.6549 11.9 16.6333C11.8712 16.6116 11.8501 16.5812 11.84 16.5466L8.16004 3.45325C8.14994 3.41863 8.12889 3.38822 8.10004 3.36659C8.07119 3.34495 8.0361 3.33325 8.00004 3.33325C7.96398 3.33325 7.92889 3.34495 7.90004 3.36659C7.87119 3.38822 7.85014 3.41863 7.84004 3.45325L6.27337 9.02659C6.19502 9.30602 6.02763 9.55226 5.79662 9.72793C5.56561 9.90359 5.28359 9.99909 4.99337 9.99992H3.33337" stroke="#6A7282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_809_20356">
                                <rect width="16" height="16" fill="white" transform="translate(2 2)"/>
                              </clipPath>
                            </defs>
                          </svg>
                        )}
                        {tab.id === 'settings' && (
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10.1467 3.33325H9.85333C9.49971 3.33325 9.16057 3.47373 8.91053 3.72378C8.66048 3.97382 8.52 4.31296 8.52 4.66659V4.78659C8.51976 5.0204 8.45804 5.25005 8.34103 5.45248C8.22401 5.65491 8.05583 5.82301 7.85333 5.93992L7.56667 6.10659C7.36398 6.22361 7.13405 6.28522 6.9 6.28522C6.66595 6.28522 6.43603 6.22361 6.23333 6.10659L6.13333 6.05325C5.82738 5.87676 5.46389 5.82888 5.12267 5.92012C4.78145 6.01137 4.49037 6.23428 4.31333 6.53992L4.16667 6.79325C3.99018 7.09921 3.9423 7.46269 4.03354 7.80392C4.12478 8.14514 4.34769 8.43622 4.65333 8.61325L4.75333 8.67992C4.95485 8.79626 5.12241 8.96331 5.23937 9.16447C5.35632 9.36563 5.4186 9.5939 5.42 9.82659V10.1666C5.42093 10.4015 5.35977 10.6326 5.2427 10.8363C5.12563 11.04 4.95681 11.2091 4.75333 11.3266L4.65333 11.3866C4.34769 11.5636 4.12478 11.8547 4.03354 12.1959C3.9423 12.5371 3.99018 12.9006 4.16667 13.2066L4.31333 13.4599C4.49037 13.7656 4.78145 13.9885 5.12267 14.0797C5.46389 14.171 5.82738 14.1231 6.13333 13.9466L6.23333 13.8933C6.43603 13.7762 6.66595 13.7146 6.9 13.7146C7.13405 13.7146 7.36398 13.7762 7.56667 13.8933L7.85333 14.0599C8.05583 14.1768 8.22401 14.3449 8.34103 14.5474C8.45804 14.7498 8.51976 14.9794 8.52 15.2133V15.3333C8.52 15.6869 8.66048 16.026 8.91053 16.2761C9.16057 16.5261 9.49971 16.6666 9.85333 16.6666H10.1467C10.5003 16.6666 10.8394 16.5261 11.0895 16.2761C11.3395 16.026 11.48 15.6869 11.48 15.3333V15.2133C11.4802 14.9794 11.542 14.7498 11.659 14.5474C11.776 14.3449 11.9442 14.1768 12.1467 14.0599L12.4333 13.8933C12.636 13.7762 12.866 13.7146 13.1 13.7146C13.3341 13.7146 13.564 13.7762 13.7667 13.8933L13.8667 13.9466C14.1726 14.1231 14.5361 14.171 14.8773 14.0797C15.2186 13.9885 15.5096 13.7656 15.6867 13.4599L15.8333 13.1999C16.0098 12.894 16.0577 12.5305 15.9665 12.1893C15.8752 11.848 15.6523 11.557 15.3467 11.3799L15.2467 11.3266C15.0432 11.2091 14.8744 11.04 14.7573 10.8363C14.6402 10.6326 14.5791 10.4015 14.58 10.1666V9.83325C14.5791 9.59831 14.6402 9.36728 14.7573 9.16358C14.8744 8.95988 15.0432 8.79072 15.2467 8.67325L15.3467 8.61325C15.6523 8.43622 15.8752 8.14514 15.9665 7.80392C16.0577 7.46269 16.0098 7.09921 15.8333 6.79325L15.6867 6.53992C15.5096 6.23428 15.2186 6.01137 14.8773 5.92012C14.5361 5.82888 14.1726 5.87676 13.8667 6.05325L13.7667 6.10659C13.564 6.22361 13.3341 6.28522 13.1 6.28522C12.866 6.28522 12.636 6.22361 12.4333 6.10659L12.1467 5.93992C11.9442 5.82301 11.776 5.65491 11.659 5.45248C11.542 5.25005 11.4802 5.0204 11.48 4.78659V4.66659C11.48 4.31296 11.3395 3.97382 11.0895 3.72378C10.8394 3.47373 10.5003 3.33325 10.1467 3.33325Z" stroke="#6A7282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 11.9999C11.1046 11.9999 12 11.1045 12 9.99992C12 8.89535 11.1046 7.99992 10 7.99992C8.89543 7.99992 8 8.89535 8 9.99992C8 11.1045 8.89543 11.9999 10 11.9999Z" stroke="#6A7282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className={`font-p360 text-[14px] leading-5 text-center whitespace-nowrap ${tab.active ? 'font-medium text-[#841aff]' : 'font-normal text-[#6a7282]'}`}>
                      {tab.label}
                    </span>
                  </div>
                  {tab.active && (
                    <div className="flex h-0.5 items-start justify-start overflow-hidden w-full">
                      <div className="bg-[#841aff] h-0.5 flex-1" />
                    </div>
                  )}
          </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="min-h-[calc(100vh-102px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
