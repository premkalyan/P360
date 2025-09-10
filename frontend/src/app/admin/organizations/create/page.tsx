/**
 * P360-127: Organization Creation Page
 * Admin interface for creating new organizations using the multi-step wizard
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { OrganizationWizard, OrganizationData } from '@/components/organizations/OrganizationWizard';

export default function CreateOrganizationPage() {
  const router = useRouter();

  // Handle organization creation
  const handleCreateOrganization = async (organizationData: OrganizationData): Promise<void> => {
    
    try {
      // TODO: Replace with actual API call to backend
      // For now, simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Creating organization with data:', organizationData);
      
      // Simulate organization creation
      const mockOrganization = {
        id: `org-${Date.now()}`,
        ...organizationData,
        createdAt: new Date().toISOString(),
        status: 'active' as const
      };
      
      // Store in localStorage for demo purposes
      // In production, this would be handled by the backend
      const existingOrgs = JSON.parse(localStorage.getItem('p360_organizations') || '[]');
      existingOrgs.push(mockOrganization);
      localStorage.setItem('p360_organizations', JSON.stringify(existingOrgs));
      
      console.log('Organization created successfully:', mockOrganization);
      
      // Success - wizard will handle the completion step
      
    } catch (error) {
      console.error('Failed to create organization:', error);
      throw new Error('Failed to create organization. Please try again.');
    }
  };

  // Handle cancellation
  const handleCancel = () => {
    router.push('/admin/organizations');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <nav className="text-sm breadcrumbs mb-4">
            <ol className="flex items-center space-x-2 text-gray-500">
              <li>
                <button 
                  onClick={() => router.push('/admin/organizations')}
                  className="hover:text-p360-purple transition-colors"
                >
                  Organizations
                </button>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-900 font-medium">
                Create New Organization
              </li>
            </ol>
          </nav>
        </div>

        {/* Organization Creation Wizard */}
        <OrganizationWizard
          onComplete={handleCreateOrganization}
          onCancel={handleCancel}
          className="bg-white rounded-lg shadow-sm"
        />
      </div>
    </div>
  );
}
