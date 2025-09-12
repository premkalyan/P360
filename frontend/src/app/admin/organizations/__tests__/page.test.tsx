/**
 * P360-135: Organizations Page - Advanced Filtering and Sorting Component Tests
 * React component tests for enhanced organization grid functionality
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrganizationsPage from '../page';

// Mock the organization service
jest.mock('@/services/organization.service', () => ({
  organizationService: {
    listOrganizations: jest.fn(),
    createOrganization: jest.fn(),
    updateOrganization: jest.fn(),
    deleteOrganization: jest.fn(),
  },
}));

// Mock the sidebar components
jest.mock('../CreateOrganizationSidebar', () => {
  return function MockCreateOrganizationSidebar({ isOpen, onClose, onSuccess }: any) {
    return isOpen ? (
      <div data-testid="create-sidebar">
        <button onClick={onClose}>Close</button>
        <button onClick={() => onSuccess({ id: 'new-1', name: 'New Org', type: 'advertiser', status: 'draft' })}>
          Create
        </button>
      </div>
    ) : null;
  };
});

jest.mock('../EditOrganizationSidebar', () => {
  return function MockEditOrganizationSidebar({ isOpen, onClose, onSuccess }: any) {
    return isOpen ? (
      <div data-testid="edit-sidebar">
        <button onClick={onClose}>Close</button>
        <button onClick={() => onSuccess({ id: '1', name: 'Updated Org', type: 'advertiser', status: 'active' })}>
          Update
        </button>
      </div>
    ) : null;
  };
});

jest.mock('../ActivityDetails', () => {
  return function MockActivityDetails({ isOpen, onClose }: any) {
    return isOpen ? (
      <div data-testid="activity-details">
        <button onClick={onClose}>Close Activity</button>
      </div>
    ) : null;
  };
});

// Mock organization data
const mockOrganizations = [
  {
    id: '1',
    name: 'TechCorp Enterprise',
    type: 'advertiser' as const,
    status: 'active' as const,
    size: 'large' as const,
    accountId: 'ORG-001',
    salesforceId: 'SF-001-ABC123',
    userCount: 25,
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-20T10:30:00Z',
  },
  {
    id: '2',
    name: 'Marketing Solutions Inc',
    type: 'agency' as const,
    status: 'active' as const,
    size: 'medium' as const,
    accountId: 'ORG-002',
    userCount: 12,
    createdAt: '2024-01-18T09:15:00Z',
    updatedAt: '2024-01-22T14:45:00Z',
  },
  {
    id: '3',
    name: 'Brand Publishers Network',
    type: 'publisher' as const,
    status: 'draft' as const,
    size: 'startup' as const,
    accountId: 'ORG-003',
    userCount: 5,
    createdAt: '2024-01-25T11:00:00Z',
    updatedAt: '2024-01-25T11:00:00Z',
  },
];

const mockPagination = {
  page: 1,
  limit: 20,
  total: 3,
  totalPages: 1,
  hasNext: false,
  hasPrev: false,
};

// Import the mocked service
const { organizationService } = require('@/services/organization.service');

describe('OrganizationsPage - P360-135 Advanced Filtering and Sorting', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    organizationService.listOrganizations.mockResolvedValue({
      data: mockOrganizations,
      pagination: mockPagination,
    });
  });

  it('should render organization grid with all organizations', async () => {
    render(<OrganizationsPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Organization Management')).toBeInTheDocument();
      expect(screen.getByText('TechCorp Enterprise')).toBeInTheDocument();
      expect(screen.getByText('Marketing Solutions Inc')).toBeInTheDocument();
      expect(screen.getByText('Brand Publishers Network')).toBeInTheDocument();
    });
  });

  describe('Sort Dropdown Functionality', () => {
    it('should render sort dropdown button', async () => {
      render(<OrganizationsPage />);
      
      await waitFor(() => {
        const sortButton = screen.getByText(/Sort:/);
        expect(sortButton).toBeInTheDocument();
      });
    });

    it('should open sort dropdown when clicked', async () => {
      const user = userEvent.setup();
      render(<OrganizationsPage />);
      
      await waitFor(() => {
        const sortButton = screen.getByText(/Sort:/);
        expect(sortButton).toBeInTheDocument();
      });

      const sortButton = screen.getByText(/Sort:/);
      await user.click(sortButton);

      await waitFor(() => {
        expect(screen.getByText('Name (A-Z)')).toBeInTheDocument();
        expect(screen.getByText('Name (Z-A)')).toBeInTheDocument();
        expect(screen.getByText('Newest First')).toBeInTheDocument();
        expect(screen.getByText('Oldest First')).toBeInTheDocument();
        expect(screen.getByText('Recently Updated')).toBeInTheDocument();
      });
    });

    it('should apply sort when option is selected', async () => {
      const user = userEvent.setup();
      render(<OrganizationsPage />);
      
      await waitFor(() => {
        const sortButton = screen.getByText(/Sort:/);
        expect(sortButton).toBeInTheDocument();
      });

      // Open sort dropdown
      const sortButton = screen.getByText(/Sort:/);
      await user.click(sortButton);

      // Select Name A-Z
      const nameAscOption = screen.getByText('Name (A-Z)');
      await user.click(nameAscOption);

      await waitFor(() => {
        expect(organizationService.listOrganizations).toHaveBeenCalledWith(
          expect.objectContaining({
            sortBy: 'name',
            sortOrder: 'asc',
            page: 1,
          })
        );
      });
    });

    it('should show current sort selection with indicator', async () => {
      const user = userEvent.setup();
      render(<OrganizationsPage />);
      
      await waitFor(() => {
        const sortButton = screen.getByText(/Sort:/);
        expect(sortButton).toBeInTheDocument();
      });

      // Check default sort display
      expect(screen.getByText(/Sort: Date Created ↓/)).toBeInTheDocument();
    });
  });

  describe('Filters Dropdown Functionality', () => {
    it('should render filters dropdown button', async () => {
      render(<OrganizationsPage />);
      
      await waitFor(() => {
        const filtersButton = screen.getByText('Filters');
        expect(filtersButton).toBeInTheDocument();
      });
    });

    it('should open filters dropdown when clicked', async () => {
      const user = userEvent.setup();
      render(<OrganizationsPage />);
      
      await waitFor(() => {
        const filtersButton = screen.getByText('Filters');
        expect(filtersButton).toBeInTheDocument();
      });

      const filtersButton = screen.getByText('Filters');
      await user.click(filtersButton);

      await waitFor(() => {
        expect(screen.getByText('Status')).toBeInTheDocument();
        expect(screen.getByLabelText('Type')).toBeInTheDocument();
        expect(screen.getByText('Size')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
      });
    });

    it('should apply filters when Apply button is clicked', async () => {
      const user = userEvent.setup();
      render(<OrganizationsPage />);
      
      await waitFor(() => {
        const filtersButton = screen.getByText('Filters');
        expect(filtersButton).toBeInTheDocument();
      });

      // Open filters dropdown
      const filtersButton = screen.getByText('Filters');
      await user.click(filtersButton);

      await waitFor(() => {
        expect(screen.getByLabelText('Status')).toBeInTheDocument();
      });

      // Select status filter
      const statusSelect = screen.getByLabelText('Status');
      await user.selectOptions(statusSelect, 'active');

      // Click Apply
      const applyButton = screen.getByRole('button', { name: 'Apply' });
      await user.click(applyButton);

      await waitFor(() => {
        expect(organizationService.listOrganizations).toHaveBeenCalledWith(
          expect.objectContaining({
            status: 'active',
            page: 1,
          })
        );
      });
    });

    it('should clear filters when Clear button is clicked', async () => {
      const user = userEvent.setup();
      render(<OrganizationsPage />);
      
      await waitFor(() => {
        const filtersButton = screen.getByText('Filters');
        expect(filtersButton).toBeInTheDocument();
      });

      // Open filters dropdown and apply a filter first
      const filtersButton = screen.getByText('Filters');
      await user.click(filtersButton);

      const statusSelect = screen.getByLabelText('Status');
      await user.selectOptions(statusSelect, 'active');

      const applyButton = screen.getByRole('button', { name: 'Apply' });
      await user.click(applyButton);

      // Wait for the filter to be applied
      await waitFor(() => {
        expect(organizationService.listOrganizations).toHaveBeenCalledWith(
          expect.objectContaining({ status: 'active' })
        );
      });

      // Open filters dropdown again and clear
      await user.click(filtersButton);
      
      const clearButton = screen.getByRole('button', { name: 'Clear all' });
      await user.click(clearButton);

      await waitFor(() => {
        expect(organizationService.listOrganizations).toHaveBeenCalledWith(
          expect.objectContaining({
            status: undefined,
            type: undefined,
            size: undefined,
            page: 1,
          })
        );
      });
    });

    it('should show filter count when filters are active', async () => {
      const user = userEvent.setup();
      
      // Mock service to return filtered results
      organizationService.listOrganizations.mockResolvedValue({
        data: [mockOrganizations[0]], // Only one organization
        pagination: { ...mockPagination, total: 1 },
      });

      render(<OrganizationsPage />);
      
      await waitFor(() => {
        const filtersButton = screen.getByText('Filters');
        expect(filtersButton).toBeInTheDocument();
      });

      // Apply a filter
      const filtersButton = screen.getByText('Filters');
      await user.click(filtersButton);

      const statusSelect = screen.getByLabelText('Status');
      await user.selectOptions(statusSelect, 'active');

      const applyButton = screen.getByRole('button', { name: 'Apply' });
      await user.click(applyButton);

      // Check if filter count is shown
      await waitFor(() => {
        expect(screen.getByText('Filters (1)')).toBeInTheDocument();
      });
    });
  });

  describe('Filter Badges', () => {
    it('should display filter badges when filters are active', async () => {
      const user = userEvent.setup();
      render(<OrganizationsPage />);
      
      await waitFor(() => {
        const filtersButton = screen.getByText('Filters');
        expect(filtersButton).toBeInTheDocument();
      });

      // Apply filters
      const filtersButton = screen.getByText('Filters');
      await user.click(filtersButton);

      const statusSelect = screen.getByLabelText('Status');
      await user.selectOptions(statusSelect, 'active');

      const typeSelect = screen.getByLabelText('Type');
      await user.selectOptions(typeSelect, 'advertiser');

      const applyButton = screen.getByRole('button', { name: 'Apply' });
      await user.click(applyButton);

      // Check for filter badges
      await waitFor(() => {
        expect(screen.getByText('Status: active')).toBeInTheDocument();
        expect(screen.getByText('Type: advertiser')).toBeInTheDocument();
      });
    });

    it('should remove individual filter when badge X is clicked', async () => {
      const user = userEvent.setup();
      render(<OrganizationsPage />);
      
      await waitFor(() => {
        const filtersButton = screen.getByText('Filters');
        expect(filtersButton).toBeInTheDocument();
      });

      // Apply a filter first
      const filtersButton = screen.getByText('Filters');
      await user.click(filtersButton);

      const statusSelect = screen.getByLabelText('Status');
      await user.selectOptions(statusSelect, 'active');

      const applyButton = screen.getByRole('button', { name: 'Apply' });
      await user.click(applyButton);

      // Wait for badge to appear
      await waitFor(() => {
        expect(screen.getByText('Status: active')).toBeInTheDocument();
      });

      // Find and click the X button on the status badge
      const statusBadge = screen.getByText('Status: active').closest('div');
      const removeButton = statusBadge?.querySelector('button');
      expect(removeButton).toBeInTheDocument();
      
      if (removeButton) {
        await user.click(removeButton);
      }

      await waitFor(() => {
        expect(organizationService.listOrganizations).toHaveBeenCalledWith(
          expect.objectContaining({
            status: undefined,
            page: 1,
          })
        );
      });
    });

    it('should clear all filters when "Clear all" is clicked', async () => {
      const user = userEvent.setup();
      render(<OrganizationsPage />);
      
      await waitFor(() => {
        const filtersButton = screen.getByText('Filters');
        expect(filtersButton).toBeInTheDocument();
      });

      // Apply multiple filters
      const filtersButton = screen.getByText('Filters');
      await user.click(filtersButton);

      const statusSelect = screen.getByLabelText('Status');
      await user.selectOptions(statusSelect, 'active');

      const typeSelect = screen.getByLabelText('Type');
      await user.selectOptions(typeSelect, 'advertiser');

      const applyButton = screen.getByRole('button', { name: 'Apply' });
      await user.click(applyButton);

      // Wait for badges to appear
      await waitFor(() => {
        expect(screen.getByText('Status: active')).toBeInTheDocument();
        expect(screen.getByText('Type: advertiser')).toBeInTheDocument();
      });

      // Click "Clear all"
      const clearAllButton = screen.getByText('Clear all');
      await user.click(clearAllButton);

      await waitFor(() => {
        expect(organizationService.listOrganizations).toHaveBeenCalledWith(
          expect.objectContaining({
            status: undefined,
            type: undefined,
            size: undefined,
            page: 1,
          })
        );
      });
    });
  });

  describe('Search Integration', () => {
    it('should apply search filter when typing in search box', async () => {
      // Use fake timers to control debouncing exactly
      jest.useFakeTimers();
      
      render(<OrganizationsPage />);
      
      await waitFor(() => {
    const searchInput = screen.getByPlaceholderText('Search organization...');
    expect(searchInput).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search organization...');
      
      // Directly set the value and trigger input event to bypass user.type() timing issues
      await act(async () => {
        fireEvent.change(searchInput, { target: { value: 'tech' } });
        
        // Advance timers to trigger debounce (500ms)
        jest.advanceTimersByTime(500);
      });

      // Restore real timers for waitFor
      jest.useRealTimers();

      // Wait for the API call
      await waitFor(() => {
        expect(organizationService.listOrganizations).toHaveBeenCalledWith(
          expect.objectContaining({
            search: 'tech',
            page: 1,
          })
        );
      }, { timeout: 2000 });
    });

    it('should combine search with filters', async () => {
      // Use fake timers for search debouncing control
      jest.useFakeTimers();
      
      const user = userEvent.setup();
      render(<OrganizationsPage />);
      
      await waitFor(() => {
        const searchInput = screen.getByPlaceholderText('Search organization...');
        const filtersButton = screen.getByText('Filters');
        expect(searchInput).toBeInTheDocument();
        expect(filtersButton).toBeInTheDocument();
      });

      // Add search term with exact timing control
      const searchInput = screen.getByPlaceholderText('Search organization...');
      
      await act(async () => {
        // Directly set the search value and trigger debounce
        fireEvent.change(searchInput, { target: { value: 'tech' } });
        
        // Advance timers to complete debounce (500ms)
        jest.advanceTimersByTime(500);
      });

      // Restore real timers for user interactions
      jest.useRealTimers();

      // Apply filter
      const filtersButton = screen.getByText('Filters');
      await user.click(filtersButton);

      const statusSelect = screen.getByLabelText('Status');
      await user.selectOptions(statusSelect, 'active');

      const applyButton = screen.getByRole('button', { name: 'Apply' });
      await user.click(applyButton);

      // Wait for combined search and filter
      await waitFor(() => {
        expect(organizationService.listOrganizations).toHaveBeenCalledWith(
          expect.objectContaining({
            search: 'tech',
            status: 'active',
            page: 1,
          })
        );
      }, { timeout: 2000 });
    });
  });

  describe('Dropdown Outside Click Behavior', () => {
    it('should close sort dropdown when clicking outside', async () => {
      const user = userEvent.setup();
      render(<OrganizationsPage />);
      
      await waitFor(() => {
        const sortButton = screen.getByText(/Sort:/);
        expect(sortButton).toBeInTheDocument();
      });

      // Open sort dropdown
      const sortButton = screen.getByText(/Sort:/);
      await user.click(sortButton);

      await waitFor(() => {
        expect(screen.getByText('Name (A-Z)')).toBeInTheDocument();
      });

      // Click outside
      const pageTitle = screen.getByText('Organization Management');
      await user.click(pageTitle);

      await waitFor(() => {
        expect(screen.queryByText('Name (A-Z)')).not.toBeInTheDocument();
      });
    });

    it('should close filters dropdown when clicking outside', async () => {
      const user = userEvent.setup();
      render(<OrganizationsPage />);
      
      await waitFor(() => {
        const filtersButton = screen.getByText('Filters');
        expect(filtersButton).toBeInTheDocument();
      });

      // Open filters dropdown
      const filtersButton = screen.getByText('Filters');
      await user.click(filtersButton);

      await waitFor(() => {
        expect(screen.getByLabelText('Status')).toBeInTheDocument();
      });

      // Click outside
      const pageTitle = screen.getByText('Organization Management');
      await user.click(pageTitle);

      await waitFor(() => {
        expect(screen.queryByLabelText('Status')).not.toBeInTheDocument();
      });
    });
  });
});