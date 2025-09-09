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
  describe('Data State (Default)', () => {
    it('shows campaigns table by default', () => {
      render(<CampaignsPage />);
      
      // Should show campaign table by default
      expect(screen.getByText('Campaigns')).toBeInTheDocument();
      expect(screen.getByText('New Campaign')).toBeInTheDocument();
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('shows debug toggle button', () => {
      render(<CampaignsPage />);
      
      // Should show data toggle by default
      expect(screen.getByText('📊 With Data')).toBeInTheDocument();
    });

    it('handles new campaign button click', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      render(<CampaignsPage />);
      
      fireEvent.click(screen.getByText('New Campaign'));
      
      expect(consoleSpy).toHaveBeenCalledWith('New campaign clicked');
      consoleSpy.mockRestore();
    });
  });

  describe('Table Content', () => {
    // Component shows data by default, no need to toggle

    it('shows campaigns table when data is present', () => {
      render(<CampaignsPage />);
      // Should show table with headers
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /campaign name/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /program/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /pacing/i })).toBeInTheDocument();
      // Use more specific selector for Status column header
      expect(screen.getByRole('columnheader', { name: /status/i })).toBeInTheDocument();
    });

    it('displays campaign data in table', () => {
      render(<CampaignsPage />);
      // Check if table has data rows (more flexible approach)
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBeGreaterThan(1); // Header + at least one data row
    });

    it('shows results count', () => {
      render(<CampaignsPage />);
      expect(screen.getByText('3 campaigns found')).toBeInTheDocument();
    });

    it('renders filters component', () => {
      render(<CampaignsPage />);
      expect(screen.getByText('Campaigns')).toBeInTheDocument(); // Page title
      expect(screen.getByText('New Campaign')).toBeInTheDocument(); // New campaign button
      expect(screen.getByPlaceholderText('Search campaigns...')).toBeInTheDocument();
    });
  });

  describe('Debug Toggle', () => {
    it('shows current state correctly', () => {
      render(<CampaignsPage />);
      
      // Initially shows data state
      expect(screen.getByText('📊 With Data')).toBeInTheDocument();
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('positions debug toggle correctly', () => {
      render(<CampaignsPage />);
      
      const toggle = screen.getByText('📊 With Data');
      const toggleContainer = toggle.closest('div');
      expect(toggleContainer).toHaveClass('fixed', 'top-20', 'right-4', 'z-50');
    });
  });

  describe('Search Functionality', () => {
    beforeEach(() => {
      render(<CampaignsPage />);
      // Component now shows data by default, no empty state toggle needed
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
      // Component now shows data by default, no empty state toggle needed
    });

    it('handles campaign row clicks', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      
      const campaignRow = screen.getByText('Q4 Holiday Sale - Facebook & Google').closest('tr');
      fireEvent.click(campaignRow!);
      
      expect(consoleSpy).toHaveBeenCalledWith('Campaign clicked:', 'campaign-1');
      consoleSpy.mockRestore();
    });

    it('handles new campaign button click', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      
      fireEvent.click(screen.getByText('New Campaign'));
      
      expect(consoleSpy).toHaveBeenCalledWith('New campaign clicked');
      consoleSpy.mockRestore();
    });
  });

  describe('Pagination', () => {
    beforeEach(() => {
      render(<CampaignsPage />);
      // Component now shows data by default, no empty state toggle needed
    });

    it('shows pagination dropdown with correct format', () => {
      // Check for dropdown with "Page X/Y" format
      const dropdown = screen.getByDisplayValue(/Page \d+\/\d+/);
      expect(dropdown).toBeInTheDocument();
      expect(dropdown.tagName).toBe('SELECT');
    });

    it('shows navigation buttons with correct styling', () => {
      // Check for previous and next buttons
      const buttons = screen.getAllByRole('button').filter(btn => 
        btn.innerHTML.includes('M10 4L6 8L10 12') || btn.innerHTML.includes('M6 4L10 8L6 12')
      );
      expect(buttons).toHaveLength(2);
      
      // Verify they have Figma styling
      buttons.forEach(button => {
        expect(button).toHaveStyle({
          width: '40px',
          height: '40px',
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '4px'
        });
      });
    });

    it('handles page selection via dropdown', () => {
      const dropdown = screen.getByDisplayValue(/Page \d+\/\d+/);
      
      // Initially should be page 1
      expect(dropdown).toHaveValue('1');
      
      // Since we only have 3 campaigns and 10 per page, should only have 1 page
      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(1);
      expect(options[0]).toHaveTextContent('Page 1/1');
    });

    it('disables previous button on first page', () => {
      const prevButton = screen.getAllByRole('button').find(btn => 
        btn.innerHTML.includes('M10 4L6 8L10 12')
      );
      
      expect(prevButton).toHaveStyle({ opacity: '0.5' });
      expect(prevButton).toHaveAttribute('disabled');
    });

    it('disables next button on last page', () => {
      const nextButton = screen.getAllByRole('button').find(btn => 
        btn.innerHTML.includes('M6 4L10 8L6 12')
      );
      
      expect(nextButton).toHaveStyle({ opacity: '0.5' });
      expect(nextButton).toHaveAttribute('disabled');
    });

    it('aligns navigation buttons to the right', () => {
      const paginationContainer = screen.getByDisplayValue(/Page \d+\/\d+/).closest('div');
      const parentContainer = paginationContainer?.parentElement;
      
      expect(parentContainer).toHaveClass('justify-between');
    });
  });

  describe('Campaign Selection', () => {
    beforeEach(() => {
      render(<CampaignsPage />);
      // Component now shows data by default, no empty state toggle needed
    });

    it('shows select all checkbox in campaign name header', () => {
      const headerCheckbox = screen.getAllByRole('checkbox')[0];
      expect(headerCheckbox).toBeInTheDocument();
      
      // Should be in the campaign name header
      const campaignNameHeader = screen.getByText('Campaign name').closest('th');
      expect(campaignNameHeader).toContainElement(headerCheckbox);
    });

    it('shows individual checkboxes for each campaign', () => {
      const checkboxes = screen.getAllByRole('checkbox');
      
      // Should have 1 header checkbox + 3 campaign checkboxes = 4 total
      expect(checkboxes).toHaveLength(4);
      
      // Verify they have P360 styling
      checkboxes.forEach(checkbox => {
        expect(checkbox).toHaveClass('text-p360-purple');
      });
    });

    it('handles select all functionality', () => {
      const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
      const campaignCheckboxes = screen.getAllByRole('checkbox').slice(1);
      
      // Initially none selected
      expect(selectAllCheckbox).not.toBeChecked();
      campaignCheckboxes.forEach(checkbox => {
        expect(checkbox).not.toBeChecked();
      });
      
      // Click select all
      if (selectAllCheckbox) {
        fireEvent.click(selectAllCheckbox);
      }
      
      // All should be selected
      expect(selectAllCheckbox).toBeChecked();
      campaignCheckboxes.forEach(checkbox => {
        expect(checkbox).toBeChecked();
      });
    });

    it('handles individual campaign selection', () => {
      const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
      const firstCampaignCheckbox = screen.getAllByRole('checkbox')[1];
      
      // Select first campaign
      if (firstCampaignCheckbox) {
        fireEvent.click(firstCampaignCheckbox);
      }
      
      expect(firstCampaignCheckbox).toBeChecked();
      expect(selectAllCheckbox).not.toBeChecked(); // Should not auto-select all
    });

    it('prevents row click when clicking checkbox', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      const firstCampaignCheckbox = screen.getAllByRole('checkbox')[1];
      
      // Click checkbox (should not trigger row click)
      if (firstCampaignCheckbox) {
        fireEvent.click(firstCampaignCheckbox);
      }
      
      expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining('Campaign clicked'));
      consoleSpy.mockRestore();
    });
  });

  describe('Component Integration', () => {
    beforeEach(() => {
      render(<CampaignsPage />);
      // Component now shows data by default, no empty state toggle needed
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
      expect(mainContainer).toHaveClass('min-h-screen');
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
      // Component now shows data by default, no empty state toggle needed
      
      const searchInput = screen.getByPlaceholderText('Search campaigns...');
      
      // State should update and persist
      fireEvent.change(searchInput, { target: { value: 'test search' } });
      expect(searchInput).toHaveValue('test search');
    });

    it('manages pagination state correctly', () => {
      render(<CampaignsPage />);
      // Component now shows data by default, no empty state toggle needed
      
      // Page state should be managed internally
      // With only 3 campaigns and 10 per page, we stay on page 1
      expect(screen.getByText('3 campaigns found')).toBeInTheDocument();
    });
  });
});
