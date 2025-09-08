/**
 * Dashboard Layout - P360
 * Includes sidebar navigation and main content area
 */

import React from 'react';
import { Sidebar } from '@/components/navigation/Sidebar';
import { TopBar } from '@/components/navigation/TopBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Top Bar - Full Width Across Top */}
      <TopBar />
      
      {/* Content Area Below Top Bar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Left Side Only */}
        <Sidebar />
        
        {/* Main Content - Right Side */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
