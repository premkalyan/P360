/**
 * Programs Page - P360 Dashboard
 */

import React from 'react';

export default function ProgramsPage() {
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Programs</h1>
            <p className="text-gray-600 mt-1">Manage your marketing programs and initiatives</p>
          </div>
          <button className="px-4 py-2 bg-p360-purple text-white rounded-lg hover:bg-p360-purple/90 transition-colors">
            + New Program
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Active Programs</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">48</div>
            <div className="text-sm text-gray-600">Total Campaigns</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">$2.4M</div>
            <div className="text-sm text-gray-600">Total Budget</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">89%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>

        {/* Programs List */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Your Programs</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {/* Sample Programs */}
            {[
              { name: 'Q4 Holiday Campaign', campaigns: 8, budget: '$450K', status: 'Active', performance: '+12%' },
              { name: 'Brand Awareness Initiative', campaigns: 5, budget: '$320K', status: 'Active', performance: '+8%' },
              { name: 'Product Launch Program', campaigns: 12, budget: '$680K', status: 'In Planning', performance: '--' },
              { name: 'Customer Retention Drive', campaigns: 6, budget: '$200K', status: 'Active', performance: '+15%' },
            ].map((program, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">{program.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span>{program.campaigns} campaigns</span>
                      <span>•</span>
                      <span>{program.budget} budget</span>
                      <span>•</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        program.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {program.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">{program.performance}</div>
                    <div className="text-sm text-gray-600">Performance</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
