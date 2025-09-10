'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminOrganizationsPage() {
  const [organizations] = useState([
    {
      id: '1',
      name: 'Acme Corp',
      slug: 'acme-corp',
      status: 'active',
      userCount: 24,
      campaignCount: 12,
      createdAt: '2024-01-15'
    },
    {
      id: '2', 
      name: 'TechStart Inc',
      slug: 'techstart-inc',
      status: 'trial',
      userCount: 8,
      campaignCount: 3,
      createdAt: '2024-02-20'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Organization Management
          </h1>
          <p className="text-gray-600">
            Manage organizations, users, and system settings as an admin user.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <Link href="/admin/organizations/create" className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">🏢</div>
                    <h3 className="font-semibold text-gray-900">Create Organization</h3>
                    <p className="text-sm text-gray-600 mt-1">Multi-step wizard for new organization setup</p>
                  </Link>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-2xl mb-2">👥</div>
            <h3 className="font-semibold text-gray-900">{organizations.reduce((sum, org) => sum + org.userCount, 0)} Users</h3>
            <p className="text-sm text-gray-600 mt-1">Total across all organizations</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">{organizations.reduce((sum, org) => sum + org.campaignCount, 0)} Campaigns</h3>
            <p className="text-sm text-gray-600 mt-1">Active campaigns running</p>
          </div>

          <Link href="/admin/settings" className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">⚙️</div>
            <h3 className="font-semibold text-gray-900">System Settings</h3>
            <p className="text-sm text-gray-600 mt-1">Global configuration</p>
          </Link>
        </div>

        {/* Organizations Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Organizations</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Organization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Users
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaigns
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {organizations.map((org) => (
                  <tr key={org.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{org.name}</div>
                        <div className="text-sm text-gray-500">{org.slug}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        org.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {org.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {org.userCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {org.campaignCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(org.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Link 
                        href={`/admin/organizations/${org.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </Link>
                      <Link 
                        href={`/admin/organizations/${org.id}/edit`}
                        className="text-green-600 hover:text-green-900"
                      >
                        Edit
                      </Link>
                      <Link 
                        href={`/admin/organizations/${org.id}/users`}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        Users
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Admin Navigation */}
        <div className="mt-8 text-center">
          <Link 
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            ← Back to Regular Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
