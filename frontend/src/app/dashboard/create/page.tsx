/**
 * Create Page - P360 Dashboard
 */

import React from 'react';

export default function CreatePage() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Create Campaign */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-p360-purple/50 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-p360-purple/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-p360-purple" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Campaign</h3>
            <p className="text-gray-600 text-sm">Create a new marketing campaign with targeting and budget settings.</p>
          </div>

          {/* Create Program */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-p360-purple/50 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-p360-purple/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-p360-purple" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 16.5c-1.5 1.5-1.5 4.5 0 6l6 6c1.5 1.5 4.5 1.5 6 0l6-6c1.5-1.5 1.5-4.5 0-6l-6-6c-1.5-1.5-4.5-1.5-6 0z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Program</h3>
            <p className="text-gray-600 text-sm">Set up a new program to organize multiple campaigns and initiatives.</p>
          </div>

          {/* Create Audience */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-p360-purple/50 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-p360-purple/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-p360-purple" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Audience</h3>
            <p className="text-gray-600 text-sm">Define a new target audience with specific criteria and demographics.</p>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-p360-purple text-white rounded-lg hover:bg-p360-purple/90 transition-colors">
              Import Campaign
            </button>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Use Template
            </button>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Duplicate Existing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
