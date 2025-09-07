import React from 'react';
import Image from 'next/image';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex min-h-screen">
        {/* Left Panel - Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-600 to-purple-700">
          <div className="flex items-center justify-center w-full p-12">
            <div className="max-w-md text-center">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">P360</h1>
                <p className="text-blue-100 text-lg">Performance Marketing Platform</p>
              </div>
              <div className="space-y-6 text-blue-100">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  <p>Advanced Attribution Analysis</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                  <p>Audience Management</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  <p>Real-time Performance Insights</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-10"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400 rounded-full opacity-10"></div>
          <div className="absolute top-1/3 right-20 w-16 h-16 bg-blue-300 rounded-full opacity-10"></div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md w-full space-y-8">
            {/* Logo for mobile */}
            <div className="lg:hidden text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">P360</h1>
              <p className="text-gray-600">Performance Marketing Platform</p>
            </div>

            {/* Form Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
              {subtitle && (
                <p className="text-gray-600">{subtitle}</p>
              )}
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-xl shadow-sm border p-8">
              {children}
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500">
              <p>&copy; 2024 P360. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
