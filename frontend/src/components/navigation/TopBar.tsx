/**
 * P360 Top Bar Navigation - Figma Design Implementation
 * Based on exact top bar export from Figma design system
 * 
 * Specifications from Figma:
 * - Width: 1440px, Height: 54px
 * - Padding: 10px 16px
 * - Background: #FFFFFF
 * - Border-bottom: 1px solid #E5E7EB
 * - Layout: flex, space-between, align-center
 */

'use client';

import React from 'react';

export interface TopBarProps {
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ className = '' }) => {
  return (
    <header className={`flex flex-row justify-between items-center px-4 py-2.5 bg-white border-b border-gray-200 h-[54px] w-full ${className}`}>
      {/* Left Section - Logo + Org Selector */}
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
        
        {/* Org Selector - Exact Figma Implementation */}
        <div className="flex items-center gap-2 px-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">
              Vercel
            </span>
            <div className="px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
              #1234
            </div>
          </div>
          
          {/* Dropdown Arrow */}
          <button className="p-1 rounded hover:bg-gray-100">
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
          </button>
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
            <span className="text-white text-sm font-medium">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
