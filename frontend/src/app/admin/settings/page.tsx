/**
 * P360-127: Settings Page - Placeholder
 * Will be implemented in future releases
 */

'use client';

import React from 'react';
import '@/styles/typography.css';

export default function SettingsPage() {
  return (
    <div className="w-full min-h-full font-p360" data-name="settings-page">
      <div className="max-w-[1200px] mx-auto px-[120px] py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <div className="text-center">
            <h1 className="font-semibold text-[#4a5565] text-[24px] leading-[30px] tracking-[-0.4px] mb-2">
              Settings
            </h1>
            <p className="font-normal text-[#6a7282] text-[16px] leading-6">
              System settings and configuration options will be available in future releases.
            </p>
            <p className="font-normal text-[#99a1af] text-[14px] leading-5 mt-1">
              Coming in future updates
            </p>
          </div>
          <div className="bg-[#f4ebff] rounded-[4px] px-4 py-2 mt-4">
            <span className="font-normal text-[#841aff] text-[14px] leading-5">
              🚧 Under Development
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
