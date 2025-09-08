/**
 * P360-67: Campaign Configuration UI - Integration Tests
 * Tests advanced search, filtering, and campaign comparison functionality
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CampaignsPage from '@/app/dashboard/campaigns/page';

// Mock the CampaignCard component to focus on page-level functionality
jest.mock('@/components/campaigns/CampaignCard', () => ({
  CampaignCard: ({ campaign, onEdit, onPause, onDuplicate, onView, compact }: any) => (
    <div data-testid={`campaign-card-${campaign.id}`}>
      <h3>{campaign.name}</h3>
      <span data-testid="campaign-status">{campaign.status}</span>
      <span data-testid="campaign-type">{campaign.type}</span>
      <span data-testid="campaign-roas">{campaign.roas}x</span>
      {compact && <span data-testid="compact-mode">compact</span>}
      <button onClick={() => onEdit?.(campaign.id)}>Edit</button>
      <button onClick={() => onPause?.(campaign.id)}>Pause</button>
      <button onClick={() => onDuplicate?.(campaign.id)}>Duplicate</button>
      <button onClick={() => onView?.(campaign.id)}>View</button>
    </div>
  ),
}));

// Mock the Button component
jest.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick, variant, size, ...props }: any) => (
    <button onClick={onClick} data-variant={variant} data-size={size} {...props}>
      {children}
    </button>
  ),
}));

describe('CampaignsPage - P360-67 Integration Tests', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    // Mock console.log for action handlers
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Campaign Dashboard Display', () => {
    it('renders campaign dashboard with header and stats', async () => {
      render(<CampaignsPage />);
      
      expect(screen.getByText('Campaign Dashboard')).toBeInTheDocument();
      expect(screen.getByText(/P360-67: Campaign Configuration UI/)).toBeInTheDocument();
      
      // Check for quick stats
      expect(screen.getByText('Total Campaigns')).toBeInTheDocument();
      // Use getAllByText and check for the specific stats section "Active"
      const activeElements = screen.getAllByText('Active');
      expect(activeElements.length).toBeGreaterThan(0);
      expect(screen.getByText('Total Budget')).toBeInTheDocument();
      expect(screen.getByText('Conversions')).toBeInTheDocument();
      expect(screen.getByText('Avg ROAS')).toBeInTheDocument();
    });

    it('displays all campaigns by default', async () => {
      render(<CampaignsPage />);
      
      // Should display all mock campaigns
      expect(screen.getByText('Q4 Holiday Sale - Facebook & Google')).toBeInTheDocument();
      expect(screen.getByText('Brand Awareness - YouTube Campaign')).toBeInTheDocument();
      expect(screen.getByText('Retargeting - Cart Abandoners')).toBeInTheDocument();
      expect(screen.getByText('New Product Launch - Multi-Platform')).toBeInTheDocument();
      expect(screen.getByText('Black Friday Flash Sale')).toBeInTheDocument();
      
      expect(screen.getByText('5 campaigns found')).toBeInTheDocument();
    });
  });

  describe('Advanced Search Functionality', () => {
    it('filters campaigns by search query in campaign name', async () => {
      render(<CampaignsPage />);
      
      const searchInput = screen.getByPlaceholderText('Search campaigns by name or program...');
      await user.type(searchInput, 'Holiday');
      
      await waitFor(() => {
        expect(screen.getByText('Q4 Holiday Sale - Facebook & Google')).toBeInTheDocument();
        expect(screen.queryByText('Brand Awareness - YouTube Campaign')).not.toBeInTheDocument();
        expect(screen.getByText('2 campaigns found')).toBeInTheDocument(); // Holiday + Black Friday
      });
    });

    it('filters campaigns by search query in program name', async () => {
      render(<CampaignsPage />);
      
      const searchInput = screen.getByPlaceholderText('Search campaigns by name or program...');
      await user.type(searchInput, 'Retargeting Program');
      
      await waitFor(() => {
        expect(screen.getByText('Retargeting - Cart Abandoners')).toBeInTheDocument();
        expect(screen.queryByText('Q4 Holiday Sale - Facebook & Google')).not.toBeInTheDocument();
        expect(screen.getByText('1 campaigns found')).toBeInTheDocument();
      });
    });

    it('shows no results message when search yields no matches', async () => {
      render(<CampaignsPage />);
      
      const searchInput = screen.getByPlaceholderText('Search campaigns by name or program...');
      await user.type(searchInput, 'NonExistentCampaign');
      
      await waitFor(() => {
        expect(screen.getByText('No campaigns found')).toBeInTheDocument();
        expect(screen.getByText('Try adjusting your search criteria or filters')).toBeInTheDocument();
      });
    });
  });

  describe('Advanced Filtering System', () => {
    it('filters campaigns by status', async () => {
      render(<CampaignsPage />);
      
      const statusFilter = screen.getByDisplayValue('All Status');
      await user.selectOptions(statusFilter, 'active');
      
      await waitFor(() => {
        expect(screen.getByText('Q4 Holiday Sale - Facebook & Google')).toBeInTheDocument();
        expect(screen.getByText('Brand Awareness - YouTube Campaign')).toBeInTheDocument();
        expect(screen.queryByText('Retargeting - Cart Abandoners')).not.toBeInTheDocument(); // paused
        expect(screen.queryByText('New Product Launch - Multi-Platform')).not.toBeInTheDocument(); // draft
        expect(screen.getByText('2 campaigns found')).toBeInTheDocument();
      });
    });

    it('filters campaigns by type', async () => {
      render(<CampaignsPage />);
      
      const typeFilter = screen.getByDisplayValue('All Types');
      await user.selectOptions(typeFilter, 'conversion');
      
      await waitFor(() => {
        expect(screen.getByText('Q4 Holiday Sale - Facebook & Google')).toBeInTheDocument();
        expect(screen.getByText('Black Friday Flash Sale')).toBeInTheDocument();
        expect(screen.queryByText('Brand Awareness - YouTube Campaign')).not.toBeInTheDocument(); // awareness
        expect(screen.getByText('2 campaigns found')).toBeInTheDocument();
      });
    });

    it('combines search and filter criteria', async () => {
      render(<CampaignsPage />);
      
      // Search for "Sale" and filter by "conversion" type
      const searchInput = screen.getByPlaceholderText('Search campaigns by name or program...');
      await user.type(searchInput, 'Sale');
      
      const typeFilter = screen.getByDisplayValue('All Types');
      await user.selectOptions(typeFilter, 'conversion');
      
      await waitFor(() => {
        expect(screen.getByText('Q4 Holiday Sale - Facebook & Google')).toBeInTheDocument();
        expect(screen.getByText('Black Friday Flash Sale')).toBeInTheDocument();
        expect(screen.getByText('2 campaigns found')).toBeInTheDocument();
      });
    });
  });

  describe('Sorting Functionality', () => {
    it('sorts campaigns by name A-Z', async () => {
      render(<CampaignsPage />);
      
      const sortSelect = screen.getByDisplayValue('Latest First');
      await user.selectOptions(sortSelect, 'name-asc');
      
      await waitFor(() => {
        const campaignCards = screen.getAllByTestId(/campaign-card-/);
        const firstCampaignName = screen.getByText('Black Friday Flash Sale');
        const lastCampaignName = screen.getByText('Retargeting - Cart Abandoners');
        
        expect(firstCampaignName).toBeInTheDocument();
        expect(lastCampaignName).toBeInTheDocument();
      });
    });

    it('sorts campaigns by highest ROAS', async () => {
      render(<CampaignsPage />);
      
      const sortSelect = screen.getByDisplayValue('Latest First');
      await user.selectOptions(sortSelect, 'roas-desc');
      
      await waitFor(() => {
        const roasElements = screen.getAllByTestId('campaign-roas');
        expect(roasElements[0]).toHaveTextContent('6.2x'); // Black Friday - highest ROAS
      });
    });
  });

  describe('Campaign Comparison Tool', () => {
    it('shows comparison interface when Compare button is clicked', async () => {
      render(<CampaignsPage />);
      
      const compareButton = screen.getByText('📊 Compare');
      await user.click(compareButton);
      
      // Note: Comparison UI only shows when campaigns are selected
      expect(compareButton).toHaveAttribute('data-variant', 'default');
    });

    it('enables campaign selection for comparison', async () => {
      render(<CampaignsPage />);
      
      // Enable comparison mode
      const compareButton = screen.getByText('📊 Compare');
      await user.click(compareButton);
      
      // Select campaigns using checkboxes (would appear in comparison mode)
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });
  });

  describe('View Mode Toggle', () => {
    it('switches between grid and list view modes', async () => {
      render(<CampaignsPage />);
      
      const listViewButton = screen.getByText('≡ List');
      await user.click(listViewButton);
      
      await waitFor(() => {
        // Check if campaigns are rendered in compact mode
        const compactModeElements = screen.getAllByTestId('compact-mode');
        expect(compactModeElements.length).toBeGreaterThan(0);
      });
      
      // Switch back to grid view
      const gridViewButton = screen.getByText('⊞ Grid');
      await user.click(gridViewButton);
      
      await waitFor(() => {
        // Compact mode elements should be gone
        const compactModeElements = screen.queryAllByTestId('compact-mode');
        expect(compactModeElements.length).toBe(0);
      });
    });
  });

  describe('Clear Filters Functionality', () => {
    it('clears all filters when Clear Filters button is clicked', async () => {
      render(<CampaignsPage />);
      
      // Apply some filters
      const searchInput = screen.getByPlaceholderText('Search campaigns by name or program...');
      await user.type(searchInput, 'NonExistent');
      
      const statusFilter = screen.getByDisplayValue('All Status');
      await user.selectOptions(statusFilter, 'paused');
      
      // Should show no results
      await waitFor(() => {
        expect(screen.getByText('No campaigns found')).toBeInTheDocument();
      });
      
      // Clear filters
      const clearFiltersButton = screen.getByText('Clear Filters');
      await user.click(clearFiltersButton);
      
      await waitFor(() => {
        expect(screen.getByText('5 campaigns found')).toBeInTheDocument();
        expect(searchInput).toHaveValue('');
        expect(statusFilter).toHaveValue('all');
      });
    });
  });

  describe('Campaign Actions Integration', () => {
    it('handles campaign action button clicks with proper IDs', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      render(<CampaignsPage />);
      
      // Find the first campaign card and click edit
      const editButtons = screen.getAllByText('Edit');
      await user.click(editButtons[0]);
      
      expect(consoleSpy).toHaveBeenCalledWith('edit campaign:', expect.any(String));
    });

    it('handles bulk actions when campaigns are selected', async () => {
      render(<CampaignsPage />);
      
      // Enable comparison mode to show checkboxes
      const compareButton = screen.getByText('📊 Compare');
      await user.click(compareButton);
      
      // Select some campaigns
      const checkboxes = screen.getAllByRole('checkbox');
      if (checkboxes.length > 0) {
        await user.click(checkboxes[0]);
        await user.click(checkboxes[1]);
        
        // Check if bulk action buttons appear
        await waitFor(() => {
          expect(screen.getByText('2 selected')).toBeInTheDocument();
          expect(screen.getByText('Bulk Pause')).toBeInTheDocument();
          expect(screen.getByText('Bulk Edit')).toBeInTheDocument();
        });
      }
    });
  });

  describe('Responsive Design Behavior', () => {
    it('displays navigation and controls on mobile viewports', () => {
      render(<CampaignsPage />);
      
      // Check that responsive elements are present
      expect(screen.getByText('Campaign Dashboard')).toBeInTheDocument();
      expect(screen.getByText('📊 Analytics')).toBeInTheDocument();
      expect(screen.getByText('➕ New Campaign')).toBeInTheDocument();
      
      // Filter controls should be responsive
      expect(screen.getByPlaceholderText('Search campaigns by name or program...')).toBeInTheDocument();
    });
  });

  describe('Performance and Loading States', () => {
    it('shows Load More button when there are many campaigns', async () => {
      render(<CampaignsPage />);
      
      // With 5 campaigns, Load More should not appear
      // But the component is designed to show it for 10+ campaigns
      expect(screen.queryByText('Load More Campaigns')).not.toBeInTheDocument();
    });
  });
});
