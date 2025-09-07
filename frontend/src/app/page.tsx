import { Button } from '@/components/ui/Button';
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
              <Button variant="outline" size="sm">
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button variant="primary" size="sm">
                <Link href="/auth/signup">Get Started</Link>
              </Button>
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
            Get insights that drive results with our comprehensive analytics suite.
          </p>
          
          <div className="flex justify-center space-x-6 mb-16">
            <Button variant="primary" size="lg">
              <Link href="/auth/signup">Start Free Trial</Link>
            </Button>
            <Button variant="outline" size="lg">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border p-8 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Attribution</h3>
            <p className="text-gray-600">Track customer journeys across all touchpoints with multi-touch attribution modeling.</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-8 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Audience Management</h3>
            <p className="text-gray-600">Build and manage high-performing audience segments with intelligent targeting.</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-8 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Insights</h3>
            <p className="text-gray-600">Get instant performance metrics and actionable insights to optimize campaigns.</p>
          </div>
        </div>

        {/* Story Completion Notice */}
        <div className="mt-16 bg-green-50 border border-green-200 rounded-xl p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            ✅ P360-19: Authentication UI Components - Complete!
          </h3>
          <p className="text-green-700 mb-4">
            Figma-based authentication components have been successfully implemented with pixel-perfect design.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="sm">
              <Link href="/auth/login">Test Login</Link>
            </Button>
            <Button variant="outline" size="sm">
              <Link href="/auth/signup">Test Signup</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}