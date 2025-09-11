/**
 * P360-133: Create Organization Sidebar Component  
 * Right sidebar for creating new organizations matching Figma design
 */

'use client';

import React, { useState } from 'react';
import { Organization, CreateOrganizationRequest, organizationService } from '@/services/organization.service';

interface CreateOrganizationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (organization: Organization) => void;
}

export default function CreateOrganizationSidebar({ isOpen, onClose, onSuccess }: CreateOrganizationSidebarProps) {
  const [formData, setFormData] = useState<CreateOrganizationRequest>({
    name: 'TechCorp Enterprise',
    type: 'advertiser', 
    status: 'active',
    size: 'medium',
    accountId: '',
    salesforceId: 'SF–001–ABC123',
    website: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
  });
  
  const [environmentId, setEnvironmentId] = useState('ENV-9834-XYZ567');
  const [tradeDeskId, setTradeDeskId] = useState('TTD-9834-XYZ567');
  const [environmentIdConfirmed, setEnvironmentIdConfirmed] = useState(false);
  const [tradeDeskIdConfirmed, setTradeDeskIdConfirmed] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([
    'Liam Starfire',
    'Ava Moonshadow', 
    'Zara Brightwind',
    'Kai Emberstone',
    'Nina Skydancer'
  ]);
  const [userInput, setUserInput] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.name?.trim()) {
      newErrors.name = 'Organization name is required';
    }
    
    if (!formData.salesforceId?.trim()) {
      newErrors.salesforceId = 'Salesforce ID is required';
    }
    
    // Account ID validation (only if provided - it's auto-generated if empty)
    if (formData.accountId && formData.accountId.trim() && !/^[A-Z]{3}-\d{3}$/.test(formData.accountId)) {
      newErrors.accountId = 'Account ID must follow format: ABC-123';
    }

    // Email validation
    if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    // Website validation
    if (formData.website && !/^https?:\/\/.+\..+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid website URL (include http:// or https://)';
    }

    // Phone validation (basic)
    if (formData.contactPhone && !/^[\+]?[\d\-\(\)\s]+$/.test(formData.contactPhone)) {
      newErrors.contactPhone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log('🔍 validateForm result:', { isValid, errors: newErrors, formData });
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Submit button clicked!', { isFormValid, loading, formData });
    
    if (!validateForm()) {
      console.log('❌ Form validation failed');
      return;
    }
    
    console.log('✅ Form validation passed, proceeding with submission');

    setLoading(true);
    try {
      console.log('📡 Creating organization with data:', formData);
      const newOrg = await organizationService.createOrganization(formData);
      console.log('✅ Organization created successfully:', newOrg);
      
      // Brief success indication
      console.log('⏳ Showing success indication...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Call parent success handler to add new org to grid
      console.log('📝 Calling parent success handler...');
      onSuccess(newOrg);
      
      // Close sidebar and return to main grid view
      console.log('🚪 Closing sidebar...');
      onClose();
      
      // Reset form for next use (keeping Figma demo values)
      setFormData({
        name: 'TechCorp Enterprise', // Pre-populated from Figma
        type: 'advertiser',
        status: 'active',
        size: 'medium',
        accountId: '',
        salesforceId: 'SF–001–ABC123', // Pre-populated from Figma
        website: '',
        description: '',
        contactEmail: '',
        contactPhone: '',
      });
      
      setEnvironmentId('ENV-9834-XYZ567'); // Pre-populated from Figma
      setTradeDeskId('TTD-9834-XYZ567'); // Pre-populated from Figma
      setEnvironmentIdConfirmed(false); // Reset confirmation states
      setTradeDeskIdConfirmed(false);
      setSelectedUsers([
        'Liam Starfire',
        'Ava Moonshadow',
        'Zara Brightwind',
        'Kai Emberstone',
        'Nina Skydancer'
      ]); // Pre-populated from Figma
      setUserInput('');
      setErrors({});
    } catch (error) {
      console.error('Failed to create organization:', error);
      setErrors({ submit: error instanceof Error ? error.message : 'Failed to create organization' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateOrganizationRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Helper functions for ID confirmation and copying
  const handleConfirmEnvironmentId = () => {
    if (environmentId.trim()) {
      setEnvironmentIdConfirmed(true);
    }
  };

  const handleConfirmTradeDeskId = () => {
    if (tradeDeskId.trim()) {
      setTradeDeskIdConfirmed(true);
    }
  };

  const handleCopyEnvironmentId = async () => {
    try {
      await navigator.clipboard.writeText(environmentId);
      // Optional: Show toast notification for successful copy
    } catch (err) {
      console.error('Failed to copy environment ID:', err);
    }
  };

  const handleCopyTradeDeskId = async () => {
    try {
      await navigator.clipboard.writeText(tradeDeskId);
      // Optional: Show toast notification for successful copy
    } catch (err) {
      console.error('Failed to copy trade desk ID:', err);
    }
  };

  // Helper functions for user management
  const addUser = (userName: string) => {
    if (userName.trim() && !selectedUsers.includes(userName.trim())) {
      setSelectedUsers([...selectedUsers, userName.trim()]);
      setUserInput('');
    }
  };

  const removeUser = (userName: string) => {
    setSelectedUsers(selectedUsers.filter(user => user !== userName));
  };

  const handleUserInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addUser(userInput);
    }
  };

  // Check if form is ready for submission (match validateForm requirements)
  const isFormValid = environmentIdConfirmed && 
                     tradeDeskIdConfirmed && 
                     !!formData.name?.trim() && 
                     !!formData.salesforceId?.trim();
  
  // Debug logging (only when validation state changes)
  React.useEffect(() => {
    console.log('Form validation state changed:', {
      environmentIdConfirmed,
      tradeDeskIdConfirmed,
      hasName: !!formData.name,
      hasSalesforceId: !!formData.salesforceId,
      isFormValid
    });
  }, [environmentIdConfirmed, tradeDeskIdConfirmed, formData.name, formData.salesforceId, isFormValid]);

  if (!isOpen) return null;

  return (
    <>
      {/* Dim overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-[5px] z-40"
        onClick={onClose}
      />
      
      {/* Right sidebar */}
      <div className="fixed right-0 top-0 h-full w-[720px] bg-white z-50 border-l border-gray-200 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="font-['Lexend_Deca'] font-semibold text-[24px] leading-[30px] tracking-[-0.4px] text-[#101828]">
            Create Organization
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-[34px] h-[34px] border border-gray-200 rounded bg-white hover:bg-gray-50"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Subtitle */}
        <div className="px-6 pt-4">
          <p className="font-['Lexend_Deca'] font-normal text-[16px] leading-[22px] text-[#4a5565]">
            Something to fill here
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
              placeholder="TechCorp Enterprise"
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

          {/* Salesforce ID */}
          <div className="space-y-2">
            <label className="flex items-start font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#4a5565]">
              Salesforce ID
              <span className="text-[#f00250] ml-1">*</span>
            </label>
            <input
              type="text"
              value={formData.salesforceId}
              onChange={(e) => handleInputChange('salesforceId', e.target.value)}
              className={`w-full h-[34px] px-4 border rounded bg-white font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#841aff] ${
                errors.salesforceId ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="SF–001–ABC123"
            />
            {errors.salesforceId && <p className="text-sm text-red-600">{errors.salesforceId}</p>}
          </div>

          {/* Environment Integration ID */}
          <div className="space-y-2">
            <label className="font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#4a5565]">
              Environment Integration ID
            </label>
            <div className="space-y-2">
              <div className="flex gap-1">
                <input
                  type="text"
                  value={environmentId}
                  onChange={(e) => setEnvironmentId(e.target.value)}
                  className={`flex-1 h-[34px] px-4 border border-gray-200 rounded bg-white font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#841aff] ${
                    environmentIdConfirmed ? 'cursor-not-allowed opacity-75' : ''
                  }`}
                  placeholder="ENV-9834-XYZ567"
                  disabled={environmentIdConfirmed}
                />
                    {!environmentIdConfirmed ? (
                      <button
                        type="button"
                        onClick={handleConfirmEnvironmentId}
                        className="h-[26px] px-2 bg-[#841aff] text-white rounded font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] hover:bg-[#7600ff]"
                      >
                        Confirm
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleCopyEnvironmentId}
                        className="h-[26px] px-2 bg-[#841aff] text-white rounded font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] hover:bg-[#7600ff] flex items-center gap-1"
                        title="Copy to clipboard"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M8 1H3C2.44772 1 2 1.44772 2 2V7M4 5H9C9.55228 5 10 5.44772 10 6V10C10 10.5523 9.55228 11 9 11H5C4.44772 11 4 10.5523 4 10V6C4 5.44772 4.44772 5 5 5Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Copy
                      </button>
                    )}
              </div>
              <p className="font-['Lexend_Deca'] font-normal text-[12px] leading-[16px] text-[#4a5565]">
                Once submitted, this values can&apos;t be changed
              </p>
            </div>
          </div>

          {/* Trade Desk ID */}
          <div className="space-y-2">
            <label className="font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#4a5565]">
              Trade Desk ID
            </label>
            <div className="space-y-2">
              <div className="flex gap-1">
                <input
                  type="text"
                  value={tradeDeskId}
                  onChange={(e) => setTradeDeskId(e.target.value)}
                  className={`flex-1 h-[34px] px-4 border border-gray-200 rounded bg-white font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#841aff] ${
                    tradeDeskIdConfirmed ? 'cursor-not-allowed opacity-75' : ''
                  }`}
                  placeholder="TTD-9834-XYZ567"
                  disabled={tradeDeskIdConfirmed}
                />
                    {!tradeDeskIdConfirmed ? (
                      <button
                        type="button"
                        onClick={handleConfirmTradeDeskId}
                        className="h-[26px] px-2 bg-[#841aff] text-white rounded font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] hover:bg-[#7600ff]"
                      >
                        Confirm
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleCopyTradeDeskId}
                        className="h-[26px] px-2 bg-[#841aff] text-white rounded font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] hover:bg-[#7600ff] flex items-center gap-1"
                        title="Copy to clipboard"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M8 1H3C2.44772 1 2 1.44772 2 2V7M4 5H9C9.55228 5 10 5.44772 10 6V10C10 10.5523 9.55228 11 9 11H5C4.44772 11 4 10.5523 4 10V6C4 5.44772 4.44772 5 5 5Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Copy
                      </button>
                    )}
              </div>
              <p className="font-['Lexend_Deca'] font-normal text-[12px] leading-[16px] text-[#4a5565]">
                Once submitted, this values can&apos;t be changed
              </p>
            </div>
          </div>

          {/* Add User */}
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#4a5565]">
                Add user
              </label>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleUserInputKeyPress}
                className="w-full h-[34px] px-4 border border-gray-200 rounded bg-white font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#99a1af] focus:outline-none focus:ring-2 focus:ring-[#841aff] focus:text-[#101828]"
                placeholder="Enter user name, ID or email"
              />
            </div>
            
            {/* Selected Users */}
            {selectedUsers.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {selectedUsers.map((user, index) => (
                  <div key={index} className="flex items-center gap-1.5 bg-[#e5f4ff] rounded px-2 py-1 h-7">
                    <span className="font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#008dff]">
                      {user}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeUser(user)}
                      className="flex items-center justify-center"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M12 4L4 12M4 4L12 12" stroke="#008dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Footer inside form */}
          <div className="border-t border-gray-200 bg-gray-50 p-4 -mx-6 mt-8">
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-10 px-3 border border-gray-200 rounded bg-white font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] text-[#101828] hover:bg-gray-50"
                disabled={loading}
              >
                Save as Draft
              </button>
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className={`h-10 px-3 rounded font-['Lexend_Deca'] font-normal text-[14px] leading-[20px] flex items-center gap-2 transition-all duration-200 ${
                  isFormValid && !loading
                    ? 'bg-[#841aff] text-white hover:bg-[#7600ff] cursor-pointer'
                    : 'bg-[#e4ccff] text-[#cea3ff] cursor-not-allowed'
                }`}
              >
                {loading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                )}
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
