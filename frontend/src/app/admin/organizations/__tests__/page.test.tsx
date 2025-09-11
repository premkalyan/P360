/**
 * P360-133: Organizations Page Component Unit Tests
 * Tests the organization management CRUD interface with mock data
 */

import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import OrganizationsPage from '../page';

// Mock CSS imports
jest.mock('@/styles/typography.css', () => ({}));

// Mock the organization service to return predictable data
jest.mock('@/services/organization.service', () => ({
  organizationService: {
    listOrganizations: jest.fn().mockResolvedValue({
      data: [
        {
          id: '1',
          name: 'TechCorp Enterprise',
          accountId: 'ORG-801',
          type: 'advertiser',
          salesforceId: 'SF-001-ABC123',
          users: 12,
          status: 'draft'
        }
      ],
      pagination: { page: 1, totalPages: 1, total: 1, limit: 10 }
    }),
    createOrganization: jest.fn(),
    updateOrganization: jest.fn(),
    deleteOrganization: jest.fn(),
    getOrganization: jest.fn(),
  }
}));

describe('OrganizationsPage', () => {
  it('renders organization management interface', async () => {
    await act(async () => {
      render(<OrganizationsPage />);
    });

    // Check main UI elements that should always be present
    expect(screen.getByText('Organization Management')).toBeInTheDocument();
    expect(screen.getByText('New Organization')).toBeInTheDocument();
    expect(screen.getByText('Sort')).toBeInTheDocument();
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('displays complete grid interface elements', async () => {
    await act(async () => {
      render(<OrganizationsPage />);
    });

    // Check all interface elements
    expect(screen.getByPlaceholderText('Search organization...')).toBeInTheDocument();
    
    // Check table headers
    expect(screen.getByText('Organization Name')).toBeInTheDocument();
    expect(screen.getByText('Account ID')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Salesforce ID')).toBeInTheDocument();
    expect(screen.getByText('# of Users')).toBeInTheDocument();
  });

  it('renders search input correctly', async () => {
    await act(async () => {
      render(<OrganizationsPage />);
    });

    const searchInput = screen.getByPlaceholderText('Search organization...');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('type', 'text');
    expect(searchInput).toHaveClass('font-p360');
  });

  it('displays proper P360 typography in title', async () => {
    await act(async () => {
      render(<OrganizationsPage />);
    });

    // Check main title typography
    const title = screen.getByText('Organization Management');
    expect(title).toHaveClass('font-p360');
    expect(title).toHaveClass('font-semibold');
    expect(title).toHaveClass('text-[#4a5565]');
  });
});
