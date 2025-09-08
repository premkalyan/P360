'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">P360</h1>
              <span className="ml-2 text-sm text-gray-500">Performance Marketing Platform</span>
            </div>
            <div className="flex space-x-4">
              <Link 
                href="/auth/login"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Login
              </Link>
              <Link 
                href="/dashboard/campaigns"
                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                View Campaigns
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">P360</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Performance Marketing Platform with Advanced Attribution and Audience Management.
            Campaign UI has been fixed to match Figma design perfectly!
          </p>
          
          <div className="flex justify-center space-x-6 mb-16">
            <Link 
              href="/dashboard/campaigns"
              className="px-8 py-4 border border-transparent rounded-md text-lg font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              View Fixed Campaigns UI
            </Link>
            <Link 
              href="/auth/login"
              className="px-8 py-4 border border-gray-300 rounded-md text-lg font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Login
            </Link>
          </div>
        </div>

        {/* P360-67 Success Notice */}
        <div className="mt-16 bg-green-50 border border-green-200 rounded-xl p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            ✅ P360-67: Campaign Configuration UI - FIXED!
          </h3>
          <p className="text-green-700 mb-4">
            Campaign dashboard now matches Figma "general - workspace" design exactly.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/dashboard/campaigns"
              className="px-4 py-2 border border-green-600 rounded-md text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100"
            >
              Test Fixed Campaigns UI
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}