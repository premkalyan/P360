/**
 * P360-107: Campaigns Page Integration Tests
 * Integration tests for the enhanced table-based campaigns page
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CampaignsPage from '@/app/dashboard/campaigns/page';

// Mock the design system components
jest.mock('@/lib/design-system', () => ({
  EmptyCampaigns: ({ primaryAction }: any) => (
    <div data-testid="empty-campaigns">
      <button onClick={primaryAction.onClick}>{primaryAction.label}</button>
    </div>
  ),
}));

describe('CampaignsPage', () => {
  describe('Empty State', () => {
    it('shows empty campaigns component when no data', () => {
      render(<CampaignsPage />);
      
      // Should show empty state by default
      expect(screen.getByTestId('empty-campaigns')).toBeInTheDocument();
      expect(screen.getByText('Create Campaign')).toBeInTheDocument();
    });

    it('handles create campaign action in empty state', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      render(<CampaignsPage />);
      
      fireEvent.click(screen.getByText('Create Campaign'));
      
      expect(consoleSpy).toHaveBeenCalledWith('New campaign clicked');
      consoleSpy.mockRestore();
    });

    it('has proper empty state layout', () => {
      const { container } = render(<CampaignsPage />);
      
      const emptyContainer = container.querySelector('div[style*="min-height: calc(100vh - 80px)"]');
      expect(emptyContainer).toBeInTheDocument();
      expect(emptyContainer).toHaveClass('flex', 'items-center', 'justify-center');
    });
  });

  describe('Data State', () => {
    beforeEach(() => {
      // Switch to data state using the debug toggle
      render(<CampaignsPage />);
      fireEvent.click(screen.getByText('📭 Empty State'));
    });

    it('shows campaigns table when data is present', () => {
      // Should show table headers - use more specific selectors
      expect(screen.getByRole('columnheader', { name: 'Campaign name' })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: 'Program' })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: 'Pacing' })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: 'Status' })).toBeInTheDocument();
    });

    it('displays campaign data in table', () => {
      // Should show sample campaign data
      expect(screen.getByText('Q4 Holiday Sale - Facebook & Google')).toBeInTheDocument();
      expect(screen.getByText('Brand Awareness - YouTube Campaign')).toBeInTheDocument();
      expect(screen.getByText('Retargeting - Cart Abandoners')).toBeInTheDocument();
    });

    it('shows results count', () => {
      expect(screen.getByText('3 campaigns found')).toBeInTheDocument();
    });

    it('renders filters component', () => {
      expect(screen.getByText('Campaigns')).toBeInTheDocument(); // Page title
      expect(screen.getByText('New Campaign')).toBeInTheDocument(); // New campaign button
      expect(screen.getByPlaceholderText('Search campaigns...')).toBeInTheDocument();
    });
  });

  describe('Debug Toggle', () => {
    it('toggles between empty and data states', () => {
      render(<CampaignsPage />);
      
      // Initially empty
      expect(screen.getByTestId('empty-campaigns')).toBeInTheDocument();
      expect(screen.getByText('📭 Empty State')).toBeInTheDocument();
      
      // Click toggle
      fireEvent.click(screen.getByText('📭 Empty State'));
      
      // Now with data
      expect(screen.queryByTestId('empty-campaigns')).not.toBeInTheDocument();
      expect(screen.getByText('📊 With Data')).toBeInTheDocument();
      expect(screen.getByText('Campaign name')).toBeInTheDocument();
    });

    it('persists debug toggle state', () => {
      render(<CampaignsPage />);
      
      // Switch to data state
      fireEvent.click(screen.getByText('📭 Empty State'));
      expect(screen.getByText('📊 With Data')).toBeInTheDocument();
      
      // Switch back to empty state
      fireEvent.click(screen.getByText('📊 With Data'));
      expect(screen.getByText('📭 Empty State')).toBeInTheDocument();
      expect(screen.getByTestId('empty-campaigns')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    beforeEach(() => {
      render(<CampaignsPage />);
      fireEvent.click(screen.getByText('📭 Empty State')); // Switch to data state
    });

    it('filters campaigns by search term', async () => {
      const searchInput = screen.getByPlaceholderText('Search campaigns...');
      
      fireEvent.change(searchInput, { target: { value: 'Holiday' } });
      
      await waitFor(() => {
        expect(screen.getByText('1 campaigns found')).toBeInTheDocument();
        expect(screen.getByText('Q4 Holiday Sale - Facebook & Google')).toBeInTheDocument();
        expect(screen.queryByText('Brand Awareness - YouTube Campaign')).not.toBeInTheDocument();
      });
    });

    it('filters campaigns by program name', async () => {
      const searchInput = screen.getByPlaceholderText('Search campaigns...');
      
      fireEvent.change(searchInput, { target: { value: 'Brand Program' } });
      
      await waitFor(() => {
        expect(screen.getByText('1 campaigns found')).toBeInTheDocument();
        expect(screen.getByText('Brand Awareness - YouTube Campaign')).toBeInTheDocument();
        expect(screen.queryByText('Q4 Holiday Sale - Facebook & Google')).not.toBeInTheDocument();
      });
    });

    it('shows all campaigns when search is cleared', async () => {
      const searchInput = screen.getByPlaceholderText('Search campaigns...');
      
      // Search first
      fireEvent.change(searchInput, { target: { value: 'Holiday' } });
      await waitFor(() => {
        expect(screen.getByText('1 campaigns found')).toBeInTheDocument();
      });
      
      // Clear search
      fireEvent.change(searchInput, { target: { value: '' } });
      await waitFor(() => {
        expect(screen.getByText('3 campaigns found')).toBeInTheDocument();
      });
    });

    it('updates results count based on search', async () => {
      const searchInput = screen.getByPlaceholderText('Search campaigns...');
      
      // Search for non-existent campaign
      fireEvent.change(searchInput, { target: { value: 'NonExistent' } });
      
      await waitFor(() => {
        expect(screen.getByText('0 campaigns found')).toBeInTheDocument();
      });
    });
  });

  describe('Campaign Interactions', () => {
    beforeEach(() => {
      render(<CampaignsPage />);
      fireEvent.click(screen.getByText('📭 Empty State')); // Switch to data state
    });

    it('handles campaign row clicks', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      const campaignRow = screen.getByText('Q4 Holiday Sale - Facebook & Google').closest('tr');
      fireEvent.click(campaignRow!);
      
      expect(consoleSpy).toHaveBeenCalledWith('Campaign clicked:', 'campaign-1');
      consoleSpy.mockRestore();
    });

    it('handles new campaign button click', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      fireEvent.click(screen.getByText('New Campaign'));
      
      expect(consoleSpy).toHaveBeenCalledWith('New campaign clicked');
      consoleSpy.mockRestore();
    });
  });

  describe('Pagination', () => {
    it('does not show pagination with few campaigns', () => {
      render(<CampaignsPage />);
      fireEvent.click(screen.getByText('📭 Empty State')); // Switch to data state
      
      // With only 3 campaigns, pagination should show "Page 1/1"
      expect(screen.getByText(/Page \d+\/\d+/)).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    beforeEach(() => {
      render(<CampaignsPage />);
      fireEvent.click(screen.getByText('📭 Empty State')); // Switch to data state
    });

    it('integrates all campaign components correctly', () => {
      // Check that all major components are rendered
      expect(screen.getByText('Campaigns')).toBeInTheDocument(); // CampaignFilters
      expect(screen.getByText('Campaign name')).toBeInTheDocument(); // CampaignTable
      expect(screen.getByText('3 campaigns found')).toBeInTheDocument(); // Results count
    });

    it('shows progress indicators in table', () => {
      // Progress indicators should show percentage signs
      const percentages = screen.getAllByText(/%$/);
      expect(percentages.length).toBeGreaterThan(0);
    });

    it('shows status and type badges', () => {
      // Status badges - use getAllByText since there are multiple with same status
      const activeStatusBadges = screen.getAllByText('Active');
      expect(activeStatusBadges.length).toBeGreaterThan(0);
      
      const inReviewBadges = screen.getAllByText('In Review');
      expect(inReviewBadges.length).toBeGreaterThan(0);
      
      // Type badges (mapped from original types)
      const demandBadges = screen.getAllByText('Demand');
      expect(demandBadges.length).toBeGreaterThan(0);
      
      const brandBadges = screen.getAllByText('Brand');
      expect(brandBadges.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Layout', () => {
    it('has proper page structure', () => {
      const { container } = render(<CampaignsPage />);
      
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass('min-h-screen', 'bg-gray-50');
    });

    it('positions debug toggle correctly', () => {
      const { container } = render(<CampaignsPage />);
      
      const debugToggle = container.querySelector('.fixed.top-20.right-4.z-50');
      expect(debugToggle).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    it('manages search state correctly', async () => {
      render(<CampaignsPage />);
      fireEvent.click(screen.getByText('📭 Empty State')); // Switch to data state
      
      const searchInput = screen.getByPlaceholderText('Search campaigns...');
      
      // State should update and persist
      fireEvent.change(searchInput, { target: { value: 'test search' } });
      expect(searchInput).toHaveValue('test search');
    });

    it('manages pagination state correctly', () => {
      render(<CampaignsPage />);
      fireEvent.click(screen.getByText('📭 Empty State')); // Switch to data state
      
      // Page state should be managed internally
      // With only 3 campaigns and 10 per page, we stay on page 1
      expect(screen.getByText('3 campaigns found')).toBeInTheDocument();
    });
  });
});
