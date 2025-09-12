/**
 * P360-133: Organizations Management Page with Live API Integration
 * Displays organization grid with search, sort, filter, and pagination
 * Connected to backend API for real-time CRUD operations
 */

'use client';

import React, { useState, useEffect } from 'react';
import '@/styles/typography.css';
import { 
  organizationService, 
  Organization, 
  OrganizationListResponse,
  OrganizationQuery 
} from '@/services/organization.service';
import CreateOrganizationSidebar from './CreateOrganizationSidebar';
import EditOrganizationSidebar from './EditOrganizationSidebar';
import ActivityDetails from './ActivityDetails';

export default function OrganizationsPage() {
  // UI State
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showActivityView, setShowActivityView] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [selectedOrgIds, setSelectedOrgIds] = useState<Set<string>>(new Set());
  const [selectedActivityOrg, setSelectedActivityOrg] = useState<Organization | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // P360-135: Advanced Filtering and Sorting State
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFiltersDropdown, setShowFiltersDropdown] = useState(false);
  const [tempFilters, setTempFilters] = useState<{
    type: Organization['type'] | '';
    status: Organization['status'] | '';
    size: Organization['size'] | '';
  }>({
    type: '',
    status: '',
    size: '',
  });
  
  // API State
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });
  
  // Query state
  const [query, setQuery] = useState<OrganizationQuery>({
    page: 1,
    limit: 20,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  // Load organizations from API
  const loadOrganizations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response: OrganizationListResponse = await organizationService.listOrganizations({
        ...query,
        search: searchTerm || undefined,
      });
      
      setOrganizations(response.data);
      setPagination(response.pagination);
    } catch (err) {
      console.error('Failed to load organizations:', err);
      setError(err instanceof Error ? err.message : 'Failed to load organizations');
      setOrganizations([]);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount and when query changes (excluding search)
  useEffect(() => {
    loadOrganizations();
  }, [query.page, query.limit, query.sortBy, query.sortOrder, query.type, query.status, query.search]);

  // Close dropdown when clicking outside  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      try {
        const target = event.target as Element;
        
        // Close action dropdown
        if (openDropdownId && !target?.closest('.relative')) {
          setOpenDropdownId(null);
        }
        
        // P360-135: Close sort and filter dropdowns
        if (showSortDropdown && !target?.closest('[data-dropdown="sort"]')) {
          setShowSortDropdown(false);
        }
        
        if (showFiltersDropdown && !target?.closest('[data-dropdown="filters"]')) {
          setShowFiltersDropdown(false);
        }
      } catch (err) {
        // Ensure dropdowns close on any error
        setOpenDropdownId(null);
        setShowSortDropdown(false);
        setShowFiltersDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdownId, showSortDropdown, showFiltersDropdown]);

  // Handle search with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== query.search) {
        setQuery(prev => ({ ...prev, search: searchTerm, page: 1 }));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, query.search]);

  // CRUD Operations
  const handleCreateOrganization = () => {
    setSelectedOrg(null);
    setShowCreateModal(true);
  };

  const handleEditOrganization = (org: Organization) => {
    setSelectedOrg(org);
    setShowEditModal(true);
  };

  const handleDeleteOrganization = async (id: string) => {
    if (!confirm('Are you sure you want to delete this organization?')) return;
    
    try {
      await organizationService.deleteOrganization(id);
      await loadOrganizations(); // Refresh list
    } catch (err) {
      console.error('Failed to delete organization:', err);
      alert('Failed to delete organization');
    }
  };

  const handleOrganizationCreated = (newOrg: Organization) => {
    console.log('🎉 handleOrganizationCreated called with:', newOrg);
    
    // Add the new organization to the list (at the top)
    setOrganizations(prev => {
      console.log('📋 Adding to organizations list. Current count:', prev.length);
      return [newOrg, ...prev];
    });
    
    // Update pagination count
    setPagination(prev => ({
      ...prev,
      total: prev.total + 1,
      totalPages: Math.ceil((prev.total + 1) / prev.limit),
    }));
    
    // Show success message
    setSuccessMessage(`${newOrg.name} has been successfully created and added to your organization list.`);
    console.log('🎊 Success message set:', `${newOrg.name} created successfully!`);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  // Checkbox handlers
  const handleSelectAll = () => {
    if (selectedOrgIds.size === organizations.length) {
      // Deselect all
      setSelectedOrgIds(new Set());
    } else {
      // Select all visible organizations
      setSelectedOrgIds(new Set(organizations.map(org => org.id)));
    }
  };

  const handleSelectOrg = (orgId: string) => {
    const newSelection = new Set(selectedOrgIds);
    if (newSelection.has(orgId)) {
      newSelection.delete(orgId);
    } else {
      newSelection.add(orgId);
    }
    setSelectedOrgIds(newSelection);
  };

  // Dropdown handlers
  const handleDropdownToggle = (orgId: string) => {
    setOpenDropdownId(openDropdownId === orgId ? null : orgId);
  };

  const handleEditClick = (org: Organization) => {
    setSelectedOrg(org);
    setShowEditModal(true);
    setOpenDropdownId(null); // Close dropdown
  };

  const handleActivityClick = () => {
    setShowActivityView(!showActivityView);
  };

  const handleRowClick = (org: Organization) => {
    if (selectedActivityOrg?.id === org.id) {
      // Clicking the same row - deselect and hide activity
      setSelectedActivityOrg(null);
      setShowActivityView(false);
    } else {
      // Clicking a different row - select and show activity
      setSelectedActivityOrg(org);
      setShowActivityView(true);
    }
  };

  const handleOrganizationUpdated = (updatedOrg: Organization) => {
    // Update the organization in the list
    setOrganizations(prev => 
      prev.map(org => org.id === updatedOrg.id ? updatedOrg : org)
    );

    // Show success message
    setSuccessMessage(`${updatedOrg.name} has been successfully updated.`);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  // P360-135: Advanced Filtering and Sorting Handlers
  const handleSortChange = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    setQuery(prev => ({ ...prev, sortBy: sortBy as any, sortOrder, page: 1 }));
    setShowSortDropdown(false);
  };

  const handleFiltersApply = () => {
    setQuery(prev => ({
      ...prev,
      type: tempFilters.type || undefined,
      status: tempFilters.status || undefined,
      size: tempFilters.size || undefined,
      page: 1,
    }));
    setShowFiltersDropdown(false);
  };

  const handleFiltersClear = () => {
    setTempFilters({ type: '', status: '', size: '' });
    setQuery(prev => ({
      ...prev,
      type: undefined,
      status: undefined,
      size: undefined,
      page: 1,
    }));
    setShowFiltersDropdown(false);
  };

  // Initialize temp filters from current query
  useEffect(() => {
    setTempFilters({
      type: query.type || '',
      status: query.status || '',
      size: query.size || '',
    });
  }, [query.type, query.status, query.size]);

  // Calculate active filters count
  const activeFiltersCount = [query.type, query.status, query.size].filter(Boolean).length;

  // Determine if we should show empty state
  const shouldShowEmptyState = !loading && organizations.length === 0 && !searchTerm && !error;
  
  // Checkbox states
  const allSelected = organizations.length > 0 && selectedOrgIds.size === organizations.length;
  const someSelected = selectedOrgIds.size > 0 && selectedOrgIds.size < organizations.length;

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center min-h-[500px] w-full py-8">
      <div className="flex flex-col items-center gap-5 w-[400px]">
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="w-[200px] h-[200px] bg-cover bg-center bg-no-repeat">
            <img 
              src="/figma-org-empty-illustration.png" 
              alt="No organizations illustration"
              className="w-full h-full object-contain"
                    />
                  </div>
          <div className="flex flex-col items-start gap-2 text-center w-full">
            <h2 className="font-p360 font-semibold text-[#101828] text-[20px] leading-7 tracking-[-0.4px] w-full">
              There&apos;s no Organization yet
            </h2>
            <p className="font-p360 font-normal text-[#71717b] text-[14px] leading-5 w-full">
              Something cool here
            </p>
                  </div>
                </div>
        <button 
          onClick={handleCreateOrganization}
          className="bg-[#841aff] border border-[#7600ff] rounded-[4px] flex items-center gap-1.5 h-10 px-3.5 py-1"
        >
          <span className="font-p360 font-normal text-white text-[14px] leading-5 whitespace-nowrap">
            New Organization
          </span>
        </button>
                  </div>
                </div>
  );

  const OrganizationGrid = () => (
    <div className="flex flex-col gap-8 py-8">
      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading organizations</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={loadOrganizations}
                  className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                >
                  Try Again
                </button>
                </div>
                </div>
                  </div>
                </div>
      )}

      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <h1 className="font-p360 font-semibold text-[#4a5565] text-[24px] leading-[30px] tracking-[-0.4px] overflow-hidden text-ellipsis whitespace-nowrap">
            Organization Management
          </h1>
          <button 
            onClick={handleCreateOrganization}
            className="bg-[#841aff] border border-[#7600ff] rounded-[4px] flex items-center gap-1.5 h-[34px] px-3 py-1"
          >
            <span className="font-p360 font-normal text-white text-[14px] leading-5 whitespace-nowrap">
              New Organization
            </span>
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2.5">
            {/* P360-135: Sort Dropdown */}
            <div className="relative" data-dropdown="sort">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="bg-white border border-[#e8e8e8] rounded-[4px] flex items-center gap-1 h-10 px-2.5 py-1.5 hover:bg-gray-50"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 3L9 3M5 6L9 6M7 9L9 9" stroke="#4a5565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-p360 font-normal text-[#4a5565] text-[14px] leading-5 overflow-hidden text-ellipsis whitespace-nowrap px-1">
                  Sort: {query.sortBy === 'name' ? 'Name' : query.sortBy === 'createdAt' ? 'Date Created' : query.sortBy === 'updatedAt' ? 'Date Updated' : 'Date Created'} {query.sortOrder === 'desc' ? '↓' : '↑'}
                </span>
                <div className="w-4 h-4 flex items-center justify-center">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 1.5L4 4.5L7 1.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
              
              {/* Sort Dropdown Menu */}
              {showSortDropdown && (
                <div className="absolute top-12 left-0 bg-white border border-gray-200 rounded-[4px] shadow-lg z-20 min-w-[200px]">
                  <div className="py-1">
                    <button
                      onClick={() => handleSortChange('name', 'asc')}
                      className="w-full px-3 py-2 text-left text-sm font-normal text-[#4a5565] hover:bg-gray-50 flex items-center justify-between"
                    >
                      Name (A-Z)
                      {query.sortBy === 'name' && query.sortOrder === 'asc' && <span className="text-[#841aff]">✓</span>}
                    </button>
                    <button
                      onClick={() => handleSortChange('name', 'desc')}
                      className="w-full px-3 py-2 text-left text-sm font-normal text-[#4a5565] hover:bg-gray-50 flex items-center justify-between"
                    >
                      Name (Z-A)
                      {query.sortBy === 'name' && query.sortOrder === 'desc' && <span className="text-[#841aff]">✓</span>}
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={() => handleSortChange('createdAt', 'desc')}
                      className="w-full px-3 py-2 text-left text-sm font-normal text-[#4a5565] hover:bg-gray-50 flex items-center justify-between"
                    >
                      Newest First
                      {query.sortBy === 'createdAt' && query.sortOrder === 'desc' && <span className="text-[#841aff]">✓</span>}
                    </button>
                    <button
                      onClick={() => handleSortChange('createdAt', 'asc')}
                      className="w-full px-3 py-2 text-left text-sm font-normal text-[#4a5565] hover:bg-gray-50 flex items-center justify-between"
                    >
                      Oldest First
                      {query.sortBy === 'createdAt' && query.sortOrder === 'asc' && <span className="text-[#841aff]">✓</span>}
                    </button>
                    <button
                      onClick={() => handleSortChange('updatedAt', 'desc')}
                      className="w-full px-3 py-2 text-left text-sm font-normal text-[#4a5565] hover:bg-gray-50 flex items-center justify-between"
                    >
                      Recently Updated
                      {query.sortBy === 'updatedAt' && query.sortOrder === 'desc' && <span className="text-[#841aff]">✓</span>}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-4 w-0 flex items-center justify-center">
              <div className="w-4 h-0 border-t border-[#e8e8e8] rotate-90" />
            </div>

            {/* P360-135: Filters Dropdown */}
            <div className="relative" data-dropdown="filters">
              <button
                onClick={() => setShowFiltersDropdown(!showFiltersDropdown)}
                className="bg-white border border-[#e8e8e8] rounded-[4px] flex items-center gap-1 h-10 px-2.5 py-1.5 hover:bg-gray-50"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
                    <path d="M1.5 3H11.5M3.5 6H9.5M5.5 9H7.5" stroke="#4a5565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-p360 font-normal text-[#4a5565] text-[14px] leading-5 overflow-hidden text-ellipsis whitespace-nowrap px-1">
                  Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </span>
                <div className="w-4 h-4 flex items-center justify-center">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 1.5L4 4.5L7 1.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
              
              {/* Filters Dropdown Menu */}
              {showFiltersDropdown && (
                <div className="absolute top-12 left-0 bg-white border border-gray-200 rounded-[4px] shadow-lg z-20 min-w-[280px] p-4">
                  <div className="space-y-4">
                    {/* Status Filter */}
                    <div>
                      <label className="block text-sm font-medium text-[#4a5565] mb-2">Status</label>
                      <select
                        value={tempFilters.status}
                        onChange={(e) => setTempFilters(prev => ({ ...prev, status: e.target.value as any }))}
                        className="w-full border border-gray-200 rounded-[4px] px-3 py-2 text-sm focus:ring-[#841aff] focus:border-[#841aff]"
                      >
                        <option value="">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                    
                    {/* Type Filter */}
                    <div>
                      <label className="block text-sm font-medium text-[#4a5565] mb-2">Type</label>
                      <select
                        value={tempFilters.type}
                        onChange={(e) => setTempFilters(prev => ({ ...prev, type: e.target.value as any }))}
                        className="w-full border border-gray-200 rounded-[4px] px-3 py-2 text-sm focus:ring-[#841aff] focus:border-[#841aff]"
                      >
                        <option value="">All Types</option>
                        <option value="advertiser">Advertiser</option>
                        <option value="publisher">Publisher</option>
                        <option value="agency">Agency</option>
                        <option value="brand">Brand</option>
                      </select>
                    </div>
                    
                    {/* Size Filter */}
                    <div>
                      <label className="block text-sm font-medium text-[#4a5565] mb-2">Organization Size</label>
                      <select
                        value={tempFilters.size}
                        onChange={(e) => setTempFilters(prev => ({ ...prev, size: e.target.value as any }))}
                        className="w-full border border-gray-200 rounded-[4px] px-3 py-2 text-sm focus:ring-[#841aff] focus:border-[#841aff]"
                      >
                        <option value="">All Sizes</option>
                        <option value="startup">Startup</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="enterprise">Enterprise</option>
                      </select>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                      <button
                        onClick={handleFiltersClear}
                        className="flex-1 px-3 py-2 text-sm font-medium text-[#4a5565] bg-white border border-gray-200 rounded-[4px] hover:bg-gray-50"
                      >
                        Clear
                      </button>
                      <button
                        onClick={handleFiltersApply}
                        className="flex-1 px-3 py-2 text-sm font-medium text-white bg-[#841aff] border border-[#7600ff] rounded-[4px] hover:bg-[#7600ff]"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white border border-[#e8e8e8] rounded-[4px] flex items-center gap-2 h-10 px-3 py-1.5 w-80">
            <div className="w-4 h-4 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M11 11L8.5 8.5M9.75 5.375C9.75 7.79122 7.79122 9.75 5.375 9.75C2.95878 9.75 1 7.79122 1 5.375C1 2.95878 2.95878 1 5.375 1C7.79122 1 9.75 2.95878 9.75 5.375Z" stroke="#707070" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search organization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 font-p360 font-normal text-[#707070] text-[14px] leading-4 tracking-[-0.2px] border-none outline-none bg-transparent"
            />
          </div>
        </div>
        
        {/* P360-135: Active Filter Badges */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-[#4a5565]">Active filters:</span>
            {query.status && (
              <div className="bg-[#f4ebff] border border-[#e9d5ff] rounded-[4px] flex items-center gap-1.5 h-7 px-2 py-1">
                <span className="font-p360 font-normal text-[#841aff] text-[12px] leading-4 whitespace-nowrap capitalize">
                  Status: {query.status}
                </span>
                <button 
                  onClick={() => setQuery(prev => ({ ...prev, status: undefined, page: 1 }))}
                  className="w-3 h-3 flex items-center justify-center text-[#841aff] hover:text-[#7600ff]"
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 1L7 7M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            )}
            {query.type && (
              <div className="bg-[#fff1eb] border border-[#fde4d1] rounded-[4px] flex items-center gap-1.5 h-7 px-2 py-1">
                <span className="font-p360 font-normal text-[#ff6221] text-[12px] leading-4 whitespace-nowrap capitalize">
                  Type: {query.type}
                </span>
                <button 
                  onClick={() => setQuery(prev => ({ ...prev, type: undefined, page: 1 }))}
                  className="w-3 h-3 flex items-center justify-center text-[#ff6221] hover:text-[#e55a1f]"
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 1L7 7M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            )}
            {query.size && (
              <div className="bg-[#ecfdf3] border border-[#d1fae5] rounded-[4px] flex items-center gap-1.5 h-7 px-2 py-1">
                <span className="font-p360 font-normal text-[#10b981] text-[12px] leading-4 whitespace-nowrap capitalize">
                  Size: {query.size}
                </span>
                <button 
                  onClick={() => setQuery(prev => ({ ...prev, size: undefined, page: 1 }))}
                  className="w-3 h-3 flex items-center justify-center text-[#10b981] hover:text-[#0d9668]"
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 1L7 7M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            )}
            <button
              onClick={handleFiltersClear}
              className="text-sm font-medium text-[#841aff] hover:text-[#7600ff] underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="h-[600px] rounded-[4px]">
        <div className="bg-white border border-gray-200 rounded-[4px] h-[600px] flex flex-col overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200 flex items-center h-[50px] w-full">
            <div className="flex-1 flex items-center gap-4 h-[50px] px-4">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-[#841aff] border border-gray-200 rounded-[2px] focus:ring-[#841aff] focus:ring-2"
                />
              </div>
              <span className="font-p360 font-medium text-[#4a5565] text-[14px] leading-5 whitespace-nowrap">
                Organization Name
              </span>
            </div>
            <div className="flex items-center gap-2.5 h-[50px] w-[170px]">
              <span className="font-p360 font-medium text-[#4a5565] text-[14px] leading-5 whitespace-nowrap">
                Account ID
              </span>
            </div>
            <div className="flex items-center gap-2.5 h-[50px] w-[170px]">
              <span className="font-p360 font-medium text-[#4a5565] text-[14px] leading-5 whitespace-nowrap">
                Type
              </span>
            </div>
            <div className="flex items-center gap-2.5 h-[50px] w-[170px]">
              <span className="font-p360 font-medium text-[#4a5565] text-[14px] leading-5 whitespace-nowrap">
                Salesforce ID
              </span>
            </div>
            <div className="flex items-center gap-2.5 h-[50px] w-[120px]">
              <span className="font-p360 font-medium text-[#4a5565] text-[14px] leading-5 whitespace-nowrap">
                # of Users
              </span>
            </div>
            <div className="h-[50px] w-[140px]" />
                      </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#841aff]"></div>
              <span className="ml-3 text-[#4a5565]">Loading organizations...</span>
                    </div>
          )}

          {/* Table Rows */}
          {!loading && organizations.map((org) => (
            <div 
              key={org.id} 
              className={`border-b border-gray-200 flex items-center h-[50px] w-full cursor-pointer hover:bg-gray-50 ${
                selectedActivityOrg?.id === org.id ? 'bg-[#f4ebff]' : 'bg-white'
              }`}
              onClick={() => handleRowClick(org)}
            >
              <div className="flex-1 flex items-center gap-4 h-[50px] px-4">
                <input
                  type="checkbox"
                  checked={selectedOrgIds.has(org.id)}
                  onChange={() => handleSelectOrg(org.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-4 h-4 text-[#841aff] border border-gray-200 rounded-[2px] focus:ring-[#841aff] focus:ring-2"
                />
                <span className="font-p360 font-medium text-[#841aff] text-[14px] leading-5 whitespace-nowrap">
                  {org.name}
                </span>
                {org.status === 'draft' && (
                  <div className="bg-[#e5f4ff] rounded-[4px] flex items-center gap-1.5 h-7 px-2 py-1">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
                        <path d="M2.5 1V12M2.5 1H7.5L9.5 3V12H2.5M2.5 1H1.5C1.22386 1 1 1.22386 1 1.5V12.5C1 12.7761 1.22386 13 1.5 13H9.5C9.77614 13 10 12.7761 10 12.5V3M7.5 1V3H9.5" stroke="#008dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-p360 font-normal text-[#008dff] text-[14px] leading-5 whitespace-nowrap">
                      Draft
                    </span>
                  </div>
                )}
                {org.status === 'active' && (
                  <div className="bg-[#ecfdf3] rounded-[4px] flex items-center gap-1.5 h-7 px-2 py-1">
                    <div className="w-2 h-2 bg-[#10b981] rounded-full"></div>
                    <span className="font-p360 font-normal text-[#10b981] text-[14px] leading-5 whitespace-nowrap">
                      Active
                    </span>
                  </div>
                )}
                {org.status === 'inactive' && (
                  <div className="bg-[#fef2f2] rounded-[4px] flex items-center gap-1.5 h-7 px-2 py-1">
                    <div className="w-2 h-2 bg-[#ef4444] rounded-full"></div>
                    <span className="font-p360 font-normal text-[#ef4444] text-[14px] leading-5 whitespace-nowrap">
                      Inactive
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2.5 h-[50px] w-[170px]">
                <span className="font-p360 font-medium text-[#4a5565] text-[14px] leading-5 whitespace-nowrap">
                  {org.accountId}
                </span>
              </div>
              <div className="flex items-center gap-2.5 h-[50px] w-[170px]">
                <div className="bg-[#fff1eb] rounded-[4px] flex items-center gap-1.5 h-7 px-2 py-1">
                  <span className="font-p360 font-normal text-[#ff6221] text-[14px] leading-5 whitespace-nowrap capitalize">
                    {org.type}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 h-[50px] w-[170px]">
                <span className="font-p360 font-medium text-[#4a5565] text-[14px] leading-5 whitespace-nowrap">
                  {org.salesforceId || '-'}
                </span>
                      </div>
              <div className="flex items-center gap-2.5 h-[50px] w-[120px]">
                <span className="font-p360 font-medium text-[#4a5565] text-[14px] leading-5 whitespace-nowrap">
                  {org.userCount || 0}
                </span>
                    </div>
              <div className="flex items-center justify-end gap-2.5 h-[50px] w-[140px] px-4">
                {/* Users icon - manage users */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Manage users for ${org.name} (TODO: P360-134)`);
                  }}
                  className="flex items-center justify-center p-1 rounded-[4px] hover:bg-gray-100"
                  title="Manage Users"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15.9999 18C15.9999 16.5855 15.438 15.229 14.4378 14.2288C13.4376 13.2286 12.0811 12.6667 10.6666 12.6667M10.6666 12.6667C9.2521 12.6667 7.89554 13.2286 6.89535 14.2288C5.89516 15.229 5.33325 16.5855 5.33325 18M10.6666 12.6667C12.5075 12.6667 13.9999 11.1743 13.9999 9.33333C13.9999 7.49238 12.5075 6 10.6666 6C8.82564 6 7.33325 7.49238 7.33325 9.33333C7.33325 11.1743 8.82564 12.6667 10.6666 12.6667ZM18.6666 17.3333C18.6666 15.0866 17.3333 13 16 12C16.4382 11.6711 16.7887 11.2394 17.0203 10.7428C17.252 10.2463 17.3576 9.70028 17.328 9.15317C17.2983 8.60606 17.1342 8.07469 16.8503 7.6061C16.5663 7.13751 16.1712 6.74614 15.7 6.46663" stroke="#6A7282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {/* Edit icon */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditOrganization(org);
                  }}
                  className="flex items-center justify-center p-1 hover:bg-gray-100 rounded-[4px]"
                  title="Edit Organization"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M10.0001 18.6666V15.9999H14.0001V18.6666M9.33341 7.99992H9.34008M14.6667 7.99992H14.6734M12.0001 7.99992H12.0067M12.0001 10.6666H12.0067M12.0001 13.3333H12.0067M14.6667 10.6666H14.6734M14.6667 13.3333H14.6734M9.33341 10.6666H9.34008M9.33341 13.3333H9.34008M8.00008 5.33325H16.0001C16.7365 5.33325 17.3334 5.93021 17.3334 6.66659V17.3333C17.3334 18.0696 16.7365 18.6666 16.0001 18.6666H8.00008C7.2637 18.6666 6.66675 18.0696 6.66675 17.3333V6.66659C6.66675 5.93021 7.2637 5.33325 8.00008 5.33325Z" stroke="#6A7282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {/* Three dots menu - more actions */}
                <div className="relative">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDropdownToggle(org.id);
                    }}
                    className="bg-[#f4ebff] rounded-[4px] flex items-center justify-center p-1 w-6 h-6 hover:bg-[#e9d5ff]"
                    title="More Actions"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <svg width="11" height="3" viewBox="0 0 11 3" fill="none">
                        <path d="M1.5 1.5H1.51M5.5 1.5H5.51M9.5 1.5H9.51M2 1.5C2 1.77614 1.77614 2 1.5 2C1.22386 2 1 1.77614 1 1.5C1 1.22386 1.22386 1 1.5 1C1.77614 1 2 1.22386 2 1.5ZM6 1.5C6 1.77614 5.77614 2 5.5 2C5.22386 2 5 1.77614 5 1.5C5 1.22386 5.22386 1 5.5 1C5.77614 1 6 1.22386 6 1.5ZM10 1.5C10 1.77614 9.77614 2 9.5 2C9.22386 2 9 1.77614 9 1.5C9 1.22386 9.22386 1 9.5 1C9.77614 1 10 1.22386 10 1.5Z" stroke="#841aff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {openDropdownId === org.id && (
                    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-[4px] shadow-lg z-10 w-36">
                      <div className="py-1">
                        <button
                          onClick={() => handleEditClick(org)}
                          className="w-full px-3 py-2 text-left text-sm font-normal text-[#4a5565] hover:bg-gray-50 flex items-center gap-2"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M9.33341 2.66659L13.3334 6.66659M2.66675 13.3333H6.66675L13.3334 6.66659L9.33341 2.66659L2.66675 13.3333Z" stroke="#4a5565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            handleDeleteOrganization(org.id);
                            setOpenDropdownId(null);
                          }}
                          className="w-full px-3 py-2 text-left text-sm font-normal text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6.00008 2.66659V1.99992C6.00008 1.63173 6.29855 1.33325 6.66675 1.33325H9.33341C9.7016 1.33325 10.0001 1.63173 10.0001 1.99992V2.66659M4.66675 4.66659V13.3333C4.66675 13.7015 4.96522 13.9999 5.33341 13.9999H10.6667C11.0349 13.9999 11.3334 13.7015 11.3334 13.3333V4.66659M1.33341 4.66659H14.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Delete
                        </button>
                    </div>
                  </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-3 w-full">
        <div className="bg-white border border-gray-200 rounded-[4px] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.05)] flex items-center gap-2.5 h-10 px-3 py-1">
          <span className="font-p360 font-normal text-[#4a5565] text-[14px] leading-5 whitespace-nowrap">
            Page {pagination.page}/{pagination.totalPages || 1}
          </span>
          <div className="w-4 h-4 flex items-center justify-center">
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
              <path d="M1 1.5L4 4.5L7 1.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
            </div>
        <div className="flex-1 flex items-center justify-end gap-2">
          <button 
            onClick={() => setQuery(prev => ({ ...prev, page: Math.max(1, prev.page! - 1) }))}
            disabled={!pagination.hasPrev}
            className="bg-white border border-gray-200 rounded-[4px] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.05)] flex items-center justify-center px-4 py-1 w-10 h-10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <svg width="6" height="8" viewBox="0 0 6 8" fill="none">
                <path d="M4.5 1L1.5 4L4.5 7" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
          <button 
            onClick={() => setQuery(prev => ({ ...prev, page: (prev.page! + 1) }))}
            disabled={!pagination.hasNext}
            className="bg-white border border-gray-200 rounded-[4px] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.05)] flex items-center justify-center px-4 py-1 w-10 h-10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <div className="w-4 h-4 flex items-center justify-center rotate-180">
              <svg width="6" height="8" viewBox="0 0 6 8" fill="none">
                <path d="M4.5 1L1.5 4L4.5 7" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-full" data-name="organizations-page">
      <div className={`flex ${showActivityView ? 'gap-0' : ''}`}>
        {/* Main Content */}
        <div className={`${showActivityView ? 'flex-1' : 'w-full'} px-6`}>
          {shouldShowEmptyState ? <EmptyState /> : <OrganizationGrid />}
        </div>
        
        {/* Activity Panel - Beside Grid */}
        {showActivityView && selectedActivityOrg && (
          <div className="w-[400px] flex-shrink-0">
            <ActivityDetails
              isOpen={showActivityView}
              onClose={() => {
                setShowActivityView(false);
                setSelectedActivityOrg(null);
              }}
              organizationName={selectedActivityOrg.name}
              organizationId={selectedActivityOrg.id}
            />
          </div>
        )}
      </div>
      
          {/* Success Toast - Figma Design */}
          {successMessage && (
            <div className="fixed bottom-6 right-6 bg-[#841aff] rounded-[4px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] w-[390px] z-50 px-3.5 pt-3.5 pb-4">
              <div className="flex flex-col gap-2 text-white w-full">
                <div className="font-['Lexend_Deca'] font-semibold text-[16px] leading-[24px] tracking-[-0.2px]">
                  Successfully create organization
                </div>
                <div className="font-['Lexend_Deca'] font-normal text-[14px] leading-[20px]">
                  {successMessage}
                </div>
              </div>
            </div>
          )}

      {/* Create Organization Sidebar */}
      <CreateOrganizationSidebar
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleOrganizationCreated}
      />
      
      {/* Edit Organization Sidebar */}
      {showEditModal && selectedOrg && (
        <EditOrganizationSidebar
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedOrg(null);
          }}
          onSuccess={handleOrganizationUpdated}
          organization={selectedOrg}
          onActivityClick={handleActivityClick}
          isActivityOpen={showActivityView}
        />
      )}

    </div>
  );
}
