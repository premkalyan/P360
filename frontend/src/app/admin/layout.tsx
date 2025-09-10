'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '../../middleware/adminAuth';
import Link from 'next/link';

interface AdminLayoutProps {
  children: React.ReactNode;
}

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

  // Render admin layout
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Title */}
            <div className="flex items-center">
              <Link href="/admin/organizations" className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">P360 Admin</h1>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link 
                href="/admin/organizations"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Organizations
              </Link>
              <Link 
                href="/admin/users"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Users
              </Link>
              <Link 
                href="/admin/settings"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Settings
              </Link>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.name || 'Admin'}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Admin
              </span>
              <Link
                href="/auth/login"
                onClick={() => {
                  // Clear session on logout
                  if (typeof window !== 'undefined') {
                    localStorage.removeItem('p360_user');
                    localStorage.removeItem('p360_user_role');
                  }
                }}
                className="text-gray-700 hover:text-gray-900 text-sm font-medium"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div>
              P360 Administration Panel - Enterprise SDLC Compliant
            </div>
            <div className="flex space-x-4">
              <Link href="/dashboard" className="hover:text-gray-700">
                Switch to User View
              </Link>
              <Link href="/admin/audit" className="hover:text-gray-700">
                Audit Logs
              </Link>
              <Link href="/admin/support" className="hover:text-gray-700">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
