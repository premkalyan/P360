/**
 * P360-127: Admin Organizations Page - Pixel-Perfect Figma Implementation
 * Complete rebuild to match exact Figma design
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminOrganizationsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Organization');

  const handleNewOrganization = () => {
    router.push('/admin/organizations/create');
  };

  return (
    <div className="bg-gray-50 relative w-full">
      {/* Tabs */}
      <div className="bg-white box-border content-stretch flex items-center justify-start px-6 py-0 relative shrink-0 w-full border-b border-gray-200">
        <div className="basis-0 content-stretch flex grow items-center justify-start min-h-px min-w-px relative shrink-0">
          {/* Organization Tab - Active */}
          <div className="box-border content-stretch flex flex-col h-12 items-start justify-between pb-0 pt-2 px-0 relative shrink-0">
            <div className="box-border content-stretch flex gap-1 items-start justify-center pl-0.5 pr-3 py-1.5 relative rounded-[2.348px] shrink-0">
              <div className="box-border content-stretch flex items-center justify-start p-[2px] relative shrink-0">
                <div className="overflow-clip relative shrink-0 size-4">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.40009 13.3333V11.1999H9.60009V13.3333M5.86676 4.79993H5.87209M10.1334 4.79993H10.1387M8.00009 4.79993H8.00542M8.00009 6.93326H8.00542M8.00009 9.06659H8.00542M10.1334 6.93326H10.1387M10.1334 9.06659H10.1387M5.86676 6.93326H5.87209M5.86676 9.06659H5.87209M4.80009 2.66659H11.2001C11.589 2.66659 11.9668 2.82135 12.2418 3.09641C12.5169 3.37146 12.6717 3.74921 12.6717 4.13793V12.2666C12.6717 12.6553 12.5169 13.033 12.2418 13.3081C11.9668 13.5831 11.589 13.7379 11.2001 13.7379H4.80009C4.41137 13.7379 4.03362 13.5831 3.75856 13.3081C3.48351 13.033 3.32874 12.6553 3.32874 12.2666V4.13793C3.32874 3.74921 3.48351 3.37146 3.75856 3.09641C4.03362 2.82135 4.41137 2.66659 4.80009 2.66659Z" stroke="#841AFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="font-['Lexend_Deca:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#841aff] text-[14px] text-center text-nowrap">
                <p className="leading-[20px] whitespace-pre">Organization</p>
              </div>
            </div>
            <div className="content-stretch flex h-0.5 items-start justify-start overflow-clip relative shrink-0 w-full">
              <div className="basis-0 bg-[#841aff] grow h-0.5 min-h-px min-w-px shrink-0" />
            </div>
          </div>

          {/* User Tab */}
          <div className="box-border content-stretch flex flex-col h-12 items-start justify-start pb-0 pt-2 px-0 relative shrink-0">
            <div className="box-border content-stretch flex gap-1 items-start justify-center px-3 py-1.5 relative rounded-[2.348px] shrink-0">
              <div className="box-border content-stretch flex items-center justify-start p-[2px] relative shrink-0">
                <div className="overflow-clip relative shrink-0 size-4">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3333 14V12.6667C13.3333 11.9594 13.0524 11.2811 12.5523 10.781C12.0522 10.281 11.3739 10 10.6667 10H5.33333C4.62609 10 3.94781 10.281 3.44772 10.781C2.94762 11.2811 2.66667 11.9594 2.66667 12.6667V14M10.6667 4.66667C10.6667 6.13943 9.47276 7.33333 8 7.33333C6.52724 7.33333 5.33333 6.13943 5.33333 4.66667C5.33333 3.19391 6.52724 2 8 2C9.47276 2 10.6667 3.19391 10.6667 4.66667Z" stroke="#6A7282" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#6a7282] text-[14px] text-center text-nowrap">
                <p className="leading-[20px] whitespace-pre">User</p>
              </div>
            </div>
          </div>

          {/* Activity Log Tab */}
          <div className="box-border content-stretch flex flex-col h-12 items-start justify-start pb-0 pt-2 px-0 relative shrink-0">
            <div className="box-border content-stretch flex gap-1 items-start justify-center px-3 py-1.5 relative rounded-[2.348px] shrink-0">
              <div className="box-border content-stretch flex items-center justify-start p-[2px] relative shrink-0">
                <div className="overflow-clip relative shrink-0 size-4">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.6667 8H13.01C12.7218 7.99937 12.4384 8.07198 12.1836 8.20887C11.9289 8.34576 11.7109 8.54239 11.5489 8.78L10.1622 14.547C10.1521 14.5812 10.1311 14.6117 10.1022 14.6333C10.0733 14.6549 10.0381 14.6667 10.0022 14.6667C9.96628 14.6667 9.93107 14.6549 9.90217 14.6333C9.87328 14.6117 9.85231 14.5812 9.84222 14.547L6.15777 1.453C6.14768 1.41877 6.12671 1.38828 6.09782 1.36667C6.06892 1.34506 6.03371 1.33333 5.99777 1.33333C5.96184 1.33333 5.92663 1.34506 5.89773 1.36667C5.86884 1.38828 5.84787 1.41877 5.83777 1.453L4.45111 7.22C4.37278 7.5061 4.20315 7.76356 3.9676 7.9613C3.73205 8.15904 3.44131 8.26593 3.13777 8.26667H1.33333" stroke="#6A7282" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#6a7282] text-[14px] text-center text-nowrap">
                <p className="leading-[20px] whitespace-pre">Activity Log</p>
              </div>
            </div>
          </div>

          {/* Settings Tab */}
          <div className="box-border content-stretch flex flex-col h-12 items-start justify-start pb-0 pt-2 px-0 relative shrink-0">
            <div className="box-border content-stretch flex gap-1 items-start justify-center px-3 py-1.5 relative rounded-[2.348px] shrink-0">
              <div className="box-border content-stretch flex items-center justify-start p-[2px] relative shrink-0">
                <div className="overflow-clip relative shrink-0 size-4">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="#6A7282" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.93 6.34C12.8627 6.16673 12.7473 6.01735 12.5961 5.90684C12.4449 5.79633 12.2645 5.72952 12.0767 5.71467L11.34 5.64667C11.2204 5.6338 11.1066 5.59013 11.0105 5.51999C10.9143 5.44985 10.8394 5.35583 10.7933 5.24667L10.47 4.57334C10.4065 4.39464 10.2901 4.24037 10.1361 4.13077C9.98207 4.02117 9.79813 3.96192 9.60999 3.96L8.86999 3.95334C8.68185 3.95527 8.49791 4.01451 8.34394 4.12411C8.18996 4.23371 8.07348 4.38798 8.00999 4.56667L7.68666 5.24C7.64052 5.34916 7.56562 5.44318 7.46946 5.51332C7.3733 5.58346 7.25947 5.62713 7.13999 5.64L6.40333 5.708C6.21552 5.72285 6.03512 5.78966 5.88388 5.90017C5.73264 6.01068 5.61735 6.16006 5.54999 6.33334L5.48199 7.07334C5.46912 7.19281 5.42545 7.30665 5.35531 7.40281C5.28517 7.49897 5.19115 7.57387 5.08199 7.62L4.40866 7.94334C4.22996 8.00683 4.07569 8.12331 3.96609 8.27728C3.85649 8.43126 3.79725 8.6152 3.79532 8.80334L3.78866 9.54334C3.79058 9.73148 3.84983 9.91542 3.95943 10.0694C4.06903 10.2234 4.2233 10.3398 4.40199 10.4033L5.07532 10.7267C5.18448 10.7728 5.2785 10.8477 5.34864 10.9439C5.41878 11.04 5.46245 11.1539 5.47532 11.2733L5.54332 12.01C5.55817 12.1978 5.62498 12.3782 5.73549 12.5294C5.846 12.6807 5.99538 12.7959 6.16866 12.8633L6.90866 12.9313C7.08735 12.9948 7.28129 13.0113 7.46943 12.9787C7.65757 12.9461 7.83154 12.8658 7.97532 12.7467L8.64866 12.4233C8.75782 12.3772 8.87866 12.3605 8.99866 12.375C9.11866 12.3895 9.23248 12.4344 9.32866 12.5067L10.0653 12.5747C10.2531 12.5895 10.4335 12.5227 10.5848 12.4122C10.736 12.3017 10.8513 12.1523 10.9187 11.979L10.9867 11.239C10.9995 11.1195 11.0432 11.0057 11.1133 10.9095C11.1835 10.8134 11.2775 10.7385 11.3867 10.6923L12.06 10.369C12.2387 10.3055 12.3929 10.189 12.5025 10.035C12.6121 9.88106 12.6714 9.69713 12.6733 9.509L12.68 8.769C12.6781 8.58086 12.6189 8.39692 12.5093 8.24294C12.3997 8.08897 12.2454 7.97249 12.0667 7.909L11.3933 7.58567C11.2842 7.53953 11.1902 7.46463 11.12 7.36847C11.0499 7.27231 11.0062 7.15848 10.9933 7.039L10.9253 6.30234C10.9105 6.11452 10.8437 5.93413 10.7332 5.78289C10.6227 5.63165 10.4733 5.51636 10.3 5.449L9.55999 5.381C9.37186 5.37907 9.18792 5.31983 9.03394 5.21023C8.87997 5.10063 8.76348 4.94636 8.69999 4.76767L8.36666 4.09334L8.32666 4.00334" stroke="#6A7282" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#6a7282] text-[14px] text-center text-nowrap">
                <p className="leading-[20px] whitespace-pre">Settings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State Content - Properly Centered */}
      <div className="flex items-center justify-center min-h-[calc(100vh-102px)]">
        <div className="content-stretch flex flex-col gap-5 items-center justify-start w-[400px]">
          <div className="content-stretch flex flex-col gap-2 items-center justify-start relative shrink-0 w-full">
            <div className="bg-center bg-cover bg-no-repeat shrink-0 size-[200px]">
              <Image
                src="/organization-illustration.png"
                alt="Empty Organizations"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
            <div className="content-stretch flex flex-col gap-2 items-start justify-start leading-[0] relative shrink-0 text-center w-full">
              <div className="font-['Lexend_Deca:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#101828] text-[20px] tracking-[-0.4px] w-full">
                <p className="leading-[28px]">There's no Organization yet</p>
              </div>
              <div className="-webkit-box css-2tx85f font-['Lexend_Deca:Regular',_sans-serif] font-normal overflow-ellipsis overflow-hidden relative shrink-0 text-[#71717b] text-[14px] w-full">
                <p className="leading-[20px]">Something cool here</p>
              </div>
            </div>
          </div>
          <button 
            onClick={handleNewOrganization}
            className="bg-[#841aff] box-border content-stretch flex gap-1.5 h-10 items-center justify-start px-3.5 py-1 relative rounded-[4px] shrink-0 border border-[#7600ff] hover:bg-[#7600ff] transition-colors"
          >
            <div className="font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-nowrap text-white">
              <p className="leading-[20px] whitespace-pre">New Organization</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
