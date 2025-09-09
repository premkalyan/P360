/**
 * Audiences Page - P360 Dashboard
 */

import React from 'react';

export default function AudiencesPage() {
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Audiences</h1>
            <p className="text-gray-600 mt-1">Manage and analyze your target audiences</p>
          </div>
          <button className="px-4 py-2 bg-p360-purple text-white rounded-lg hover:bg-p360-purple/90 transition-colors">
            + Create Audience
          </button>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-3 mb-6">
          <button className="px-4 py-2 bg-p360-purple text-white rounded-lg">All Audiences</button>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Active</button>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Custom</button>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Lookalike</button>
        </div>

        {/* Audiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'High-Value Customers', size: '2.3M', type: 'Custom', performance: '+18%', active: true },
            { name: 'Young Professionals', size: '1.8M', type: 'Demographic', performance: '+12%', active: true },
            { name: 'Cart Abandoners', size: '450K', type: 'Behavioral', performance: '+25%', active: true },
            { name: 'Lookalike - Premium Buyers', size: '3.2M', type: 'Lookalike', performance: '+8%', active: false },
            { name: 'Seasonal Shoppers', size: '890K', type: 'Custom', performance: '+15%', active: true },
            { name: 'Mobile App Users', size: '1.2M', type: 'Behavioral', performance: '+22%', active: true },
          ].map((audience, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-p360-purple/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{audience.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{audience.type}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${audience.active ? 'bg-green-400' : 'bg-gray-300'}`}></div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Size</span>
                  <span className="text-sm font-medium text-gray-900">{audience.size}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Performance</span>
                  <span className="text-sm font-medium text-green-600">{audience.performance}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                <button className="flex-1 px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                  Edit
                </button>
                <button className="flex-1 px-3 py-1 text-xs bg-p360-purple/10 text-p360-purple rounded hover:bg-p360-purple/20 transition-colors">
                  Analyze
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
