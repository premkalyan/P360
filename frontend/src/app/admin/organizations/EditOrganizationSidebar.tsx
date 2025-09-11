'use client';

import React, { useState, useEffect } from 'react';
import { Organization, UpdateOrganizationRequest, organizationService } from '@/services/organization.service';

interface EditOrganizationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (organization: Organization) => void;
  organization: Organization;
  onActivityClick: () => void;
  isActivityOpen?: boolean;
}

export default function EditOrganizationSidebar({ 
  isOpen, 
  onClose, 
  onSuccess, 
  organization,
  onActivityClick,
  isActivityOpen = false
}: EditOrganizationSidebarProps) {
  const [formData, setFormData] = useState<UpdateOrganizationRequest>({
    name: organization.name,
    type: organization.type,
    status: organization.status,
    size: organization.size,
    accountId: organization.accountId,
    salesforceId: organization.salesforceId,
    website: organization.website || '',
    description: organization.description || '',
    contactEmail: organization.contactEmail || '',
    contactPhone: organization.contactPhone || '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form data when organization prop changes
  useEffect(() => {
    setFormData({
      name: organization.name,
      type: organization.type,
      status: organization.status,
      size: organization.size,
      accountId: organization.accountId,
      salesforceId: organization.salesforceId,
      website: organization.website || '',
      description: organization.description || '',
      contactEmail: organization.contactEmail || '',
      contactPhone: organization.contactPhone || '',
    });
  }, [organization]);

  const handleInputChange = (field: keyof UpdateOrganizationRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.name?.trim()) {
      newErrors.name = 'Organization name is required';
    }

    if (!formData.salesforceId?.trim()) {
      newErrors.salesforceId = 'Salesforce ID is required';
    }

    // Account ID validation (only if provided)
    if (formData.accountId && formData.accountId.trim() && !/^[A-Z]{3}-\d{3}$/.test(formData.accountId)) {
      newErrors.accountId = 'Account ID must follow format: ABC-123';
    }

    // Email validation
    if (formData.contactEmail && formData.contactEmail.trim() && !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.contactPhone && formData.contactPhone.trim() && !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.contactPhone)) {
      newErrors.contactPhone = 'Please enter a valid phone number';
    }

    // Website validation
    if (formData.website && formData.website.trim() && !/^https?:\/\/.+\..+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const updatedOrg = await organizationService.updateOrganization(organization.id, formData);
      
      // Brief success indication
      await new Promise(resolve => setTimeout(resolve, 500));

      // Call parent success handler
      onSuccess(updatedOrg);

      // Close sidebar
      onClose();
    } catch (error) {
      console.error('Failed to update organization:', error);
      setErrors({ submit: error instanceof Error ? error.message : 'Failed to update organization' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Dim overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-[5px] z-40"
        onClick={onClose}
      />

      {/* Right sidebar - positioned to account for activity panel when open */}
      <div className="fixed right-0 top-0 h-full w-[720px] bg-white z-50 border-l border-gray-200 overflow-y-auto" style={{
        transform: isActivityOpen ? 'translateX(-400px)' : 'translateX(0px)',
        transition: 'transform 0.3s ease-in-out'
      }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="font-['Lexend_Deca'] font-semibold text-[24px] leading-[30px] tracking-[-0.4px] text-[#101828]">
            Edit Organization
          </h2>
          <div className="flex items-center gap-3">
            {/* Activity Button */}
            <button
              onClick={onActivityClick}
              className="flex items-center gap-2 px-3 py-2 bg-[#f4ebff] text-[#841aff] rounded-[4px] text-sm font-medium hover:bg-[#e9d5ff]"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2.66669V8.00002L10.6667 10.6667M14.6667 8.00002C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8.00002C1.33337 4.31812 4.31814 1.33335 8 1.33335C11.6819 1.33335 14.6667 4.31812 14.6667 8.00002Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Activity
            </button>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="flex items-center justify-center w-[34px] h-[34px] border border-gray-200 rounded bg-white hover:bg-gray-50"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Subtitle */}
        <div className="px-6 pt-4">
          <p className="font-['Lexend_Deca'] font-normal text-[16px] leading-[22px] text-[#4a5565]">
            Update organization details and settings
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="text-sm text-red-700">{errors.submit}</div>
            </div>
          )}

          {/* Organization Name */}
          <div className="space-y-2">
            <label className="flex items-start font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#4a5565]">
              Organization Name
              <span className="text-[#f00250] ml-1">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full h-[34px] px-4 border rounded bg-white font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#841aff] ${
                errors.name ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="Enter organization name"
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Organization Type */}
          <div className="space-y-2">
            <label className="flex items-start font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#4a5565]">
              Organization Type
              <span className="text-[#f00250] ml-1">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value as Organization['type'])}
                className="w-full h-[34px] px-4 pr-10 border border-gray-200 rounded bg-white font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#841aff] appearance-none"
              >
                <option value="advertiser">Buyer</option>
                <option value="publisher">Publisher</option>
                <option value="agency">Agency</option>
                <option value="brand">Brand</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="flex items-start font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#4a5565]">
              Status
              <span className="text-[#f00250] ml-1">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value as Organization['status'])}
                className="w-full h-[34px] px-4 pr-10 border border-gray-200 rounded bg-white font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#841aff] appearance-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Account ID */}
          <div className="space-y-2">
            <label className="flex items-start font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#4a5565]">
              Account ID
            </label>
            <input
              type="text"
              value={formData.accountId || ''}
              onChange={(e) => handleInputChange('accountId', e.target.value)}
              className={`w-full h-[34px] px-4 border rounded bg-white font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#841aff] ${
                errors.accountId ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="ABC-123"
            />
            {errors.accountId && <p className="text-sm text-red-600">{errors.accountId}</p>}
          </div>

          {/* Salesforce ID */}
          <div className="space-y-2">
            <label className="flex items-start font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#4a5565]">
              Salesforce ID
              <span className="text-[#f00250] ml-1">*</span>
            </label>
            <input
              type="text"
              value={formData.salesforceId || ''}
              onChange={(e) => handleInputChange('salesforceId', e.target.value)}
              className={`w-full h-[34px] px-4 border rounded bg-white font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#841aff] ${
                errors.salesforceId ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="SF-001-ABC123"
            />
            {errors.salesforceId && <p className="text-sm text-red-600">{errors.salesforceId}</p>}
          </div>

          {/* Environment Integration ID */}
          <div className="space-y-2">
            <label className="font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#4a5565]">
              Environment Integration ID
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value="ENV-9834-XYZ567"
                readOnly
                className="flex-1 h-[34px] px-4 border border-gray-200 rounded bg-gray-50 font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#101828] cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText("ENV-9834-XYZ567")}
                className="h-[26px] px-2 bg-[#841aff] text-white rounded font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] hover:bg-[#7600ff] flex items-center gap-1"
                title="Copy to clipboard"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M8 1H3C2.44772 1 2 1.44772 2 2V7M4 5H9C9.55228 5 10 5.44772 10 6V10C10 10.5523 9.55228 11 9 11H5C4.44772 11 4 10.5523 4 10V6C4 5.44772 4.44772 5 5 5Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Copy
              </button>
            </div>
          </div>

          {/* Trade Desk ID */}
          <div className="space-y-2">
            <label className="font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#4a5565]">
              Trade Desk ID
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value="TTD-9834-XYZ567"
                readOnly
                className="flex-1 h-[34px] px-4 border border-gray-200 rounded bg-gray-50 font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#101828] cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText("TTD-9834-XYZ567")}
                className="h-[26px] px-2 bg-[#841aff] text-white rounded font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] hover:bg-[#7600ff] flex items-center gap-1"
                title="Copy to clipboard"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M8 1H3C2.44772 1 2 1.44772 2 2V7M4 5H9C9.55228 5 10 5.44772 10 6V10C10 10.5523 9.55228 11 9 11H5C4.44772 11 4 10.5523 4 10V6C4 5.44772 4.44772 5 5 5Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Copy
              </button>
            </div>
          </div>


          {/* Footer */}
          <div className="border-t border-gray-200 bg-gray-50 p-4 -mx-6 mt-8">
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-[34px] px-4 border border-gray-200 rounded bg-white font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#4a5565] hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`h-[34px] px-4 rounded font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-white ${
                  loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#841aff] hover:bg-[#7600ff]'
                }`}
              >
                {loading ? 'Updating...' : 'Update Organization'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
