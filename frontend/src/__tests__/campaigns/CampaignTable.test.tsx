/**
 * P360-107: CampaignTable Component Tests
 * Integration tests for campaign table with all 13 columns
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CampaignTable } from '@/components/campaigns/CampaignTable';
import { Campaign } from '@/components/campaigns/CampaignCard';

// Mock campaign data for testing
const mockCampaigns: Campaign[] = [
  {
    id: 'campaign-1',
    name: 'Q4 Holiday Sale Campaign',
    status: 'active',
    type: 'conversion',
    budget: 15000,
    spent: 11250,
    impressions: 250000,
    clicks: 7500,
    conversions: 375,
    ctr: 3.0,
    cpa: 30.0,
    roas: 4.5,
    startDate: '2024-11-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    lastModified: '2024-01-15T10:30:00Z',
    programName: 'Holiday Program',
    audienceSize: 125000,
  },
  {
    id: 'campaign-2',
    name: 'Brand Awareness Campaign',
    status: 'paused',
    type: 'awareness',
    budget: 8000,
    spent: 5600,
    impressions: 180000,
    clicks: 3600,
    conversions: 72,
    ctr: 2.0,
    cpa: 77.78,
    roas: 2.1,
    startDate: '2024-10-01T00:00:00Z',
    endDate: '2024-12-15T23:59:59Z',
    lastModified: '2024-01-14T15:20:00Z',
    programName: 'Brand Program',
    audienceSize: 200000,
  },
];

describe('CampaignTable', () => {
  describe('Basic Rendering', () => {
    it('renders table with correct structure', () => {
      render(<CampaignTable campaigns={mockCampaigns} />);
      
      // Check table headers
      expect(screen.getByText('Campaign name')).toBeInTheDocument();
      expect(screen.getByText('Program')).toBeInTheDocument();
      expect(screen.getByText('Pacing')).toBeInTheDocument();
      expect(screen.getByText('Type')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Last modified')).toBeInTheDocument();
      expect(screen.getByText('Start Date')).toBeInTheDocument();
      expect(screen.getByText('End Date')).toBeInTheDocument();
      expect(screen.getByText('Impressions Served')).toBeInTheDocument();
      expect(screen.getByText('Clicks')).toBeInTheDocument();
      expect(screen.getByText('CPM')).toBeInTheDocument();
      expect(screen.getByText('Current Spend')).toBeInTheDocument();
      expect(screen.getByText('Conversions')).toBeInTheDocument();
    });

    it('renders campaign data in table rows', () => {
      render(<CampaignTable campaigns={mockCampaigns} />);
      
      // Check campaign names are displayed
      expect(screen.getByText('Q4 Holiday Sale Campaign')).toBeInTheDocument();
      expect(screen.getByText('Brand Awareness Campaign')).toBeInTheDocument();
      
      // Check program names
      expect(screen.getByText('Holiday Program')).toBeInTheDocument();
      expect(screen.getByText('Brand Program')).toBeInTheDocument();
    });

    it('renders empty table when no campaigns provided', () => {
      render(<CampaignTable campaigns={[]} />);
      
      // Headers should still be present
      expect(screen.getByText('Campaign name')).toBeInTheDocument();
      
      // But no campaign data
      expect(screen.queryByText('Q4 Holiday Sale Campaign')).not.toBeInTheDocument();
    });
  });

  describe('Campaign Data Display', () => {
    it('displays campaign IDs correctly formatted', () => {
      render(<CampaignTable campaigns={mockCampaigns} />);
      
      // IDs should be formatted with padding
      expect(screen.getByText('ID: 0000001')).toBeInTheDocument();
      expect(screen.getByText('ID: 0000002')).toBeInTheDocument();
    });

    it('displays formatted dates correctly', () => {
      render(<CampaignTable campaigns={mockCampaigns} />);
      
      // Should display formatted dates
      expect(screen.getByText('Nov 1, 2024')).toBeInTheDocument();
      
      // End date: 2024-12-31T23:59:59Z - can display as either Dec 31, 2024 (UTC) or Jan 1, 2025 (timezone dependent)
      const hasDecember = screen.queryByText('Dec 31, 2024');
      const hasJanuary = screen.queryByText('Jan 1, 2025');
      expect(hasDecember || hasJanuary).toBeTruthy();
    });

    it('displays formatted numbers correctly', () => {
      render(<CampaignTable campaigns={mockCampaigns} />);
      
      // Should display formatted numbers with commas
      expect(screen.getByText('250,000')).toBeInTheDocument(); // Impressions
      expect(screen.getByText('7,500')).toBeInTheDocument(); // Clicks
    });

    it('displays currency correctly', () => {
      render(<CampaignTable campaigns={mockCampaigns} />);
      
      // Should display currency format
      expect(screen.getByText('$11,250')).toBeInTheDocument(); // Current spend
      expect(screen.getByText('$5,600')).toBeInTheDocument();
    });

    it('calculates and displays CPM correctly', () => {
      render(<CampaignTable campaigns={mockCampaigns} />);
      
      // CPM should be calculated as (spent / impressions) * 1000
      // Campaign 1: (11250 / 250000) * 1000 = 45
      expect(screen.getByText('$45')).toBeInTheDocument();
    });
  });

  describe('Interactive Components', () => {
    it('renders progress indicators for pacing', () => {
      render(<CampaignTable campaigns={mockCampaigns} />);
      
      // Progress indicators should be present (check for percentage signs)
      const percentages = screen.getAllByText(/%$/);
      expect(percentages.length).toBeGreaterThan(0);
    });

    it('renders status badges with correct status', () => {
      render(<CampaignTable campaigns={mockCampaigns} />);
      
      // Status badges should show correct statuses
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('In Review')).toBeInTheDocument(); // Paused maps to In Review
    });

    it('renders type badges with correct mapping', () => {
      render(<CampaignTable campaigns={mockCampaigns} />);
      
      // Type badges should show mapped types
      expect(screen.getByText('Demand')).toBeInTheDocument(); // conversion -> demand
      expect(screen.getByText('Brand')).toBeInTheDocument(); // awareness -> brand
    });
  });

  describe('Row Interactions', () => {
    it('calls onCampaignClick when row is clicked', () => {
      const mockOnClick = jest.fn();
      render(<CampaignTable campaigns={mockCampaigns} onCampaignClick={mockOnClick} />);
      
      // Click on the first campaign row
      const firstRow = screen.getByText('Q4 Holiday Sale Campaign').closest('tr');
      fireEvent.click(firstRow!);
      
      expect(mockOnClick).toHaveBeenCalledWith('campaign-1');
    });

    it('adds hover effect to rows', () => {
      render(<CampaignTable campaigns={mockCampaigns} />);
      
      const firstRow = screen.getByText('Q4 Holiday Sale Campaign').closest('tr');
      expect(firstRow).toHaveClass('hover:bg-gray-50');
    });

    it('makes rows clickable with cursor pointer', () => {
      render(<CampaignTable campaigns={mockCampaigns} />);
      
      const firstRow = screen.getByText('Q4 Holiday Sale Campaign').closest('tr');
      expect(firstRow).toHaveClass('cursor-pointer');
    });
  });

  describe('Table Styling', () => {
    it('applies correct header styling', () => {
      const { container } = render(<CampaignTable campaigns={mockCampaigns} />);
      
      const header = container.querySelector('thead');
      expect(header).toHaveStyle('background-color: #F9FAFB');
    });

    it('applies correct border styling', () => {
      const { container } = render(<CampaignTable campaigns={mockCampaigns} />);
      
      // Check that table exists with proper structure (styling was removed in P360-123)
      const table = container.querySelector('table');
      expect(table).toBeInTheDocument();
      expect(table).toHaveClass('w-full');
    });

    it('uses correct font family for text', () => {
      render(<CampaignTable campaigns={mockCampaigns} />);
      
      const campaignName = screen.getByText('Q4 Holiday Sale Campaign');
      expect(campaignName).toHaveClass('p360-text-link');
    });
  });

  describe('Responsive Design', () => {
    it('has horizontal scroll container', () => {
      const { container } = render(<CampaignTable campaigns={mockCampaigns} />);
      
      const scrollContainer = container.querySelector('.overflow-x-auto');
      expect(scrollContainer).toBeInTheDocument();
    });

    it('sets fixed column widths', () => {
      render(<CampaignTable campaigns={mockCampaigns} />);
      
      // Check that headers have min-width styling for responsiveness
      const campaignNameHeader = screen.getByText('Campaign name');
      expect(campaignNameHeader.closest('th')).toHaveStyle('min-width: 320px');
    });
  });

  describe('Accessibility', () => {
    it('has proper table structure', () => {
      const { container } = render(<CampaignTable campaigns={mockCampaigns} />);
      
      expect(container.querySelector('table')).toBeInTheDocument();
      expect(container.querySelector('thead')).toBeInTheDocument();
      expect(container.querySelector('tbody')).toBeInTheDocument();
    });

    it('uses semantic th elements for headers', () => {
      render(<CampaignTable campaigns={mockCampaigns} />);
      
      const headers = screen.getAllByRole('columnheader');
      expect(headers).toHaveLength(13); // 13 columns as per Figma
    });

    it('uses semantic td elements for data cells', () => {
      const { container } = render(<CampaignTable campaigns={mockCampaigns} />);
      
      const dataCells = container.querySelectorAll('td');
      expect(dataCells.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero impressions for CPM calculation', () => {
      const campaignWithZeroImpressions: Campaign = {
        ...mockCampaigns[0]!,
        impressions: 0,
      };
      
      render(<CampaignTable campaigns={[campaignWithZeroImpressions]} />);
      
      // Should display $0 for CPM when no impressions
      // The CPM column is the 11th column (0-based index 10)
      const rows = screen.getAllByRole('row');
      const dataRow = rows[1]; // First data row (header is index 0)
      const cells = dataRow?.querySelectorAll('td');
      const cpmCell = cells?.[10]; // CPM is 11th column (0-based index 10)
      expect(cpmCell).toHaveTextContent('$0');
    });

    it('handles missing optional props gracefully', () => {
      render(<CampaignTable campaigns={mockCampaigns} />);
      
      // Should render without errors even without onCampaignClick
      expect(screen.getByText('Q4 Holiday Sale Campaign')).toBeInTheDocument();
    });

    it('applies custom className when provided', () => {
      const { container } = render(
        <CampaignTable campaigns={mockCampaigns} className="custom-table-class" />
      );
      
      expect(container.firstChild).toHaveClass('custom-table-class');
    });
  });

  describe('Data Formatting Edge Cases', () => {
    it('handles very large numbers correctly', () => {
      const campaignWithLargeNumbers: Campaign = {
        ...mockCampaigns[0]!,
        impressions: 1000000,
        clicks: 50000,
        spent: 100000,
      };
      
      render(<CampaignTable campaigns={[campaignWithLargeNumbers]} />);
      
      // Should format large numbers with commas
      expect(screen.getByText('1,000,000')).toBeInTheDocument();
      expect(screen.getByText('50,000')).toBeInTheDocument();
      expect(screen.getByText('$100,000')).toBeInTheDocument();
    });

    it('rounds conversion percentages correctly', () => {
      render(<CampaignTable campaigns={mockCampaigns} />);
      
      // Conversions should be displayed as rounded percentages
      // Campaign 1: 375 * 100 = 37500%
      expect(screen.getByText('37500%')).toBeInTheDocument();
    });
  });
});
