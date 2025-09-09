/**
 * P360-67: Campaign Configuration UI - Integration Tests
 * Tests the campaigns empty state implementation from Figma
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CampaignsPage from '@/app/dashboard/campaigns/page';

describe('CampaignsPage - P360-67 Empty State Integration Tests', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    // Mock console.log for action handlers
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Empty State Display', () => {
    it('renders the empty campaigns state from Figma design', async () => {
      render(<CampaignsPage />);
      
      // Check for main empty state heading
      expect(screen.getByText("You don't have any campaigns yet")).toBeInTheDocument();
      
      // Check for subtext
      expect(screen.getByText('Something cool here')).toBeInTheDocument();
      
      // Check for Create Campaign button
      const createButton = screen.getByText('Create Campaign');
      expect(createButton).toBeInTheDocument();
      expect(createButton).toHaveAttribute('style', expect.stringContaining('background-color: rgb(132, 26, 255)'));
    });

    it('displays the empty state illustration', async () => {
      render(<CampaignsPage />);
      
      // Check for the empty state image
      const illustration = screen.getByAltText('Empty state illustration');
      expect(illustration).toBeInTheDocument();
      expect(illustration).toHaveAttribute('src', '/empty-campaign-illustration.png');
    });

    it('renders the empty state toggle button', async () => {
      render(<CampaignsPage />);
      
      // Check for the debug toggle button
      const emptyStateButton = screen.getByText('📭 Empty State');
      expect(emptyStateButton).toBeInTheDocument();
      expect(emptyStateButton).toHaveClass('bg-red-100', 'text-red-700', 'border-red-200');
    });
  });

  describe('User Interactions', () => {
    it('handles Create Campaign button click', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      render(<CampaignsPage />);
      
      const createButton = screen.getByText('Create Campaign');
      await user.click(createButton);
      
      // Note: Currently logs to console, in future would navigate to campaign creation
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('handles empty state toggle button click', async () => {
      render(<CampaignsPage />);
      
      const toggleButton = screen.getByText('📭 Empty State');
      
      // Button should be clickable (for future functionality)
      expect(toggleButton).toBeEnabled();
    });
  });

  describe('Accessibility', () => {
    it('provides proper alt text for illustration', () => {
      render(<CampaignsPage />);
      
      const illustration = screen.getByAltText('Empty state illustration');
      expect(illustration).toBeInTheDocument();
    });

    it('uses semantic HTML structure', () => {
      render(<CampaignsPage />);
      
      // Check for proper heading hierarchy
      const heading = screen.getByText("You don't have any campaigns yet");
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H4');
      
      // Check for paragraph text
      const subtext = screen.getByText('Something cool here');
      expect(subtext.tagName).toBe('P');
    });

    it('has focusable interactive elements', () => {
      render(<CampaignsPage />);
      
      const createButton = screen.getByText('Create Campaign');
      const toggleButton = screen.getByText('📭 Empty State');
      
      expect(createButton).toBeEnabled();
      expect(toggleButton).toBeEnabled();
    });
  });

  describe('Styling and Layout', () => {
    it('applies correct Figma-based styling', () => {
      render(<CampaignsPage />);
      
      // Check main container has correct styling (max-width: 400px and gap: 24px are on the outer container)
      const outerContainer = screen.getByText("You don't have any campaigns yet").closest('div[style*="max-width: 400px"]');
      expect(outerContainer).toHaveStyle({
        'max-width': '400px',
        'gap': '24px'
      });
      
      // Check text container has correct gap
      const textContainer = screen.getByText("You don't have any campaigns yet").closest('div');
      expect(textContainer).toHaveStyle({
        'gap': '12px'
      });
      
      // Check button styling matches P360 design system
      const createButton = screen.getByText('Create Campaign');
      expect(createButton).toHaveStyle({
        'background-color': 'rgb(132, 26, 255)',
        'color': 'rgb(255, 255, 255)',
        'font-family': 'Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
      });
    });

    it('maintains responsive design principles', () => {
      render(<CampaignsPage />);
      
      // Check that the outer centered container has flex classes
      const centerContainer = screen.getByText("You don't have any campaigns yet")
        .closest('div[style*="max-width: 400px"]')?.parentElement;
      expect(centerContainer).toHaveClass('flex-1', 'bg-white', 'flex', 'items-center', 'justify-center');
    });
  });
});
