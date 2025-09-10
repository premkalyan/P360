/**
 * P360-127: Organizations Page Component Unit Tests
 * Tests the organizations page with empty state and grid view
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import OrganizationsPage from '../page';

// Mock CSS imports
jest.mock('@/styles/typography.css', () => ({}));

describe('OrganizationsPage', () => {
  it('renders empty state by default', () => {
    render(<OrganizationsPage />);

    // Check empty state elements
    expect(screen.getByText("There's no Organization yet")).toBeInTheDocument();
    expect(screen.getByText('Something cool here')).toBeInTheDocument();
    expect(screen.getByText('New Organization')).toBeInTheDocument();
    expect(screen.getByAltText('No organizations illustration')).toBeInTheDocument();
  });

  it('displays the toggle button for testing', () => {
    render(<OrganizationsPage />);

    const toggleButton = screen.getByText('Show Grid');
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveClass('bg-[#841aff]');
    expect(toggleButton).toHaveClass('text-white');
  });

  it('switches to grid view when toggle button is clicked', async () => {
    const user = userEvent.setup();
    render(<OrganizationsPage />);

    // Initially should show empty state
    expect(screen.getByText("There's no Organization yet")).toBeInTheDocument();
    expect(screen.getByText('Show Grid')).toBeInTheDocument();

    // Click toggle button
    await user.click(screen.getByText('Show Grid'));

    // Should now show grid view
    expect(screen.getByText('Organization Management')).toBeInTheDocument();
    expect(screen.getByText('Show Empty')).toBeInTheDocument();
  });

  it('displays grid view with proper elements', async () => {
    const user = userEvent.setup();
    render(<OrganizationsPage />);

    // Switch to grid view
    await user.click(screen.getByText('Show Grid'));

    // Check grid view elements
    expect(screen.getByText('Organization Management')).toBeInTheDocument();
    expect(screen.getByText('New Organization')).toBeInTheDocument();
    expect(screen.getByText('Sort')).toBeInTheDocument();
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search organization...')).toBeInTheDocument();
    
    // Check table headers
    expect(screen.getByText('Organization Name')).toBeInTheDocument();
    expect(screen.getByText('Account ID')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Salesforce ID')).toBeInTheDocument();
    expect(screen.getByText('# of Users')).toBeInTheDocument();
    
    // Check pagination
    expect(screen.getByText('Page 1/5')).toBeInTheDocument();
  });

  it('displays organization data in grid view', async () => {
    const user = userEvent.setup();
    render(<OrganizationsPage />);

    // Switch to grid view
    await user.click(screen.getByText('Show Grid'));

    // Check organization data
    expect(screen.getByText('TechCorp Enterprise')).toBeInTheDocument();
    expect(screen.getByText('ORG-801')).toBeInTheDocument();
    expect(screen.getByText('Buyer')).toBeInTheDocument();
    expect(screen.getByText('SF-001-ABC123')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Draft')).toBeInTheDocument();
  });

  it('shows proper styling for status badges', async () => {
    const user = userEvent.setup();
    render(<OrganizationsPage />);

    // Switch to grid view
    await user.click(screen.getByText('Show Grid'));

    // Check Draft badge
    const draftBadge = screen.getByText('Draft');
    expect(draftBadge).toHaveClass('text-[#008dff]');
    expect(draftBadge.parentElement).toHaveClass('bg-[#e5f4ff]');

    // Check Buyer badge
    const buyerBadge = screen.getByText('Buyer');
    expect(buyerBadge).toHaveClass('text-[#ff6221]');
    expect(buyerBadge.parentElement).toHaveClass('bg-[#fff1eb]');
  });

  it('renders search input correctly', async () => {
    const user = userEvent.setup();
    render(<OrganizationsPage />);

    // Switch to grid view
    await user.click(screen.getByText('Show Grid'));

    const searchInput = screen.getByPlaceholderText('Search organization...');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('type', 'text');
    expect(searchInput).toHaveClass('font-p360');
  });

  it('can toggle back to empty state from grid view', async () => {
    const user = userEvent.setup();
    render(<OrganizationsPage />);

    // Start with empty state
    expect(screen.getByText("There's no Organization yet")).toBeInTheDocument();

    // Switch to grid view
    await user.click(screen.getByText('Show Grid'));
    expect(screen.getByText('Organization Management')).toBeInTheDocument();

    // Switch back to empty state
    await user.click(screen.getByText('Show Empty'));
    expect(screen.getByText("There's no Organization yet")).toBeInTheDocument();
  });

  it('displays proper P360 typography throughout', () => {
    render(<OrganizationsPage />);

    // Check empty state typography
    const title = screen.getByText("There's no Organization yet");
    expect(title).toHaveClass('font-p360');
    expect(title).toHaveClass('font-semibold');
    expect(title).toHaveClass('text-[#101828]');

    const subtitle = screen.getByText('Something cool here');
    expect(subtitle).toHaveClass('font-p360');
    expect(subtitle).toHaveClass('font-normal');
    expect(subtitle).toHaveClass('text-[#71717b]');
  });

  it('renders Figma illustration in empty state', () => {
    render(<OrganizationsPage />);

    const illustration = screen.getByAltText('No organizations illustration');
    expect(illustration).toBeInTheDocument();
    expect(illustration).toHaveAttribute('src', '/figma-org-empty-illustration.png');
  });
});
