'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '../../middleware/adminAuth';
import Link from 'next/link';
import { TopBar } from '@/components/navigation/TopBar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

// Admin-specific TopBar that shows "Super Admin" instead of client info
const AdminTopBar: React.FC = () => {
  return (
    <header className="flex flex-row justify-between items-center px-4 py-2.5 bg-white border-b border-gray-200 h-[54px] w-full">
      {/* Left Section - Logo + Super Admin Badge */}
      <div className="flex flex-row items-center gap-2">
        {/* Logo */}
        <div className="flex flex-col items-start py-1.25 pr-2 w-[143px] h-8">
          <div className="w-[135px] h-[22px]">
            <img 
              src="/p360-logo.png" 
              alt="Pipeline360 Logo" 
              className="h-full w-auto object-contain"
            />
          </div>
        </div>
        
        {/* Divider */}
        <div className="w-8 h-8 flex items-center justify-center">
          <svg className="w-2.5 h-4" viewBox="0 0 10 16" fill="none">
            <path d="M1 1L9 8L1 15" stroke="#E5E7EB" strokeWidth="1"/>
          </svg>
        </div>
        
        {/* Super Admin Badge */}
        <div className="flex items-center gap-2 px-2">
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '3px 4px',
            gap: '4px',
            background: '#FFE6FC',
            borderRadius: '2px'
          }}>
            <span style={{
              width: '66px',
              height: '16px',
              fontFamily: 'Geist',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '11px',
              lineHeight: '16px',
              textAlign: 'center',
              letterSpacing: '-0.15px',
              color: '#ED01CF',
              flex: 'none',
              order: 0,
              flexGrow: 0
            }}>
              Super Admin
            </span>
          </div>
        </div>
      </div>

      {/* Center - Search Bar */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-p360-purple/20 focus:border-p360-purple text-sm"
          />
          <svg 
            className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
      </div>

      {/* Right Section - Actions & User */}
      <div className="flex flex-row items-center gap-4">
        {/* Feedback Button */}
        <button className="px-3 py-1.5 text-sm text-gray-700 hover:text-gray-900 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
          Feedback
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center pl-4 border-l border-gray-200">
          {/* User Avatar */}
          <div className="w-8 h-8 bg-p360-purple rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">SA</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { isAuthorized, isLoading, user, redirectTo } = useAdminAuth();
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle unauthorized access
  useEffect(() => {
    if (mounted && !isLoading && !isAuthorized && redirectTo) {
      router.push(redirectTo);
    }
  }, [mounted, isLoading, isAuthorized, redirectTo, router]);

  // Show loading state during hydration or auth check
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // Show unauthorized state
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You need admin privileges to access this area.
          </p>
          <Link 
            href="/auth/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  // Render admin layout with proper TopBar
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Admin Top Bar - Same as campaigns but with Super Admin */}
      <AdminTopBar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
