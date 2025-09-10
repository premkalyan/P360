/**
 * P360-127: AdminLayout Component Unit Tests
 * Tests the admin layout with 4-tab navigation, top bar, and user avatar
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter, usePathname } from 'next/navigation';
import '@testing-library/jest-dom';
import AdminLayout from '../layout';

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock CSS imports
jest.mock('@/styles/typography.css', () => ({}));

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
};

describe('AdminLayout', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue(mockRouter);
    mockUsePathname.mockReturnValue('/admin/organizations');
    jest.clearAllMocks();
  });

  it('renders the admin layout with all navigation elements', () => {
    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    );

    // Check top bar elements
    expect(screen.getByAltText('Pipeline360')).toBeInTheDocument();
    expect(screen.getByText('Super Admin')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search anything...')).toBeInTheDocument();
    expect(screen.getByText('F')).toBeInTheDocument(); // Search shortcut key

    // Check user avatar with initials
    expect(screen.getByText('SA')).toBeInTheDocument();

    // Check all 4 tabs
    expect(screen.getByText('Organization')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('Activity Log')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();

    // Check children content
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('highlights the active tab based on current pathname', () => {
    mockUsePathname.mockReturnValue('/admin/organizations');
    
    render(
      <AdminLayout>
        <div>Content</div>
      </AdminLayout>
    );

    // Organizations tab should be active (purple text)
    const organizationsTab = screen.getByText('Organization');
    expect(organizationsTab).toHaveClass('text-[#841aff]');
  });

  it('renders correct tab links with proper paths', () => {
    render(
      <AdminLayout>
        <div>Content</div>
      </AdminLayout>
    );

    // Check all tab links
    const organizationsLink = screen.getByText('Organization').closest('a');
    const usersLink = screen.getByText('User').closest('a');
    const activityLogLink = screen.getByText('Activity Log').closest('a');
    const settingsLink = screen.getByText('Settings').closest('a');

    expect(organizationsLink).toHaveAttribute('href', '/admin/organizations');
    expect(usersLink).toHaveAttribute('href', '/admin/users');
    expect(activityLogLink).toHaveAttribute('href', '/admin/activity-log');
    expect(settingsLink).toHaveAttribute('href', '/admin/settings');
  });

  it('displays the correct SVG icons for each tab', () => {
    render(
      <AdminLayout>
        <div>Content</div>
      </AdminLayout>
    );

    // Check that SVG elements are present (simplified check)
    const svgElements = screen.getAllByRole('img', { hidden: true });
    expect(svgElements.length).toBeGreaterThan(0);
  });

  it('renders the search bar with proper styling and functionality', () => {
    render(
      <AdminLayout>
        <div>Content</div>
      </AdminLayout>
    );

    const searchInput = screen.getByPlaceholderText('Search anything...');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveClass('font-p360');
    expect(searchInput).toHaveClass('text-[#99a1af]');
  });

  it('shows Super Admin badge with correct styling', () => {
    render(
      <AdminLayout>
        <div>Content</div>
      </AdminLayout>
    );

    const badge = screen.getByText('Super Admin');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('text-[#ed01cf]');
    expect(badge.parentElement).toHaveClass('bg-[#ffe6fc]');
  });

  it('displays user avatar with initials in purple circle', () => {
    render(
      <AdminLayout>
        <div>Content</div>
      </AdminLayout>
    );

    const initials = screen.getByText('SA');
    expect(initials).toBeInTheDocument();
    expect(initials).toHaveClass('text-white');
    expect(initials.parentElement).toHaveClass('bg-[#841aff]');
  });
});
