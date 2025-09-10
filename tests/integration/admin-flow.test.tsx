/**
 * P360-127: Admin Flow Integration Tests
 * Tests the complete admin user flow from login to organization management
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';
import LoginPage from '@/app/auth/login/page';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    href: '',
  },
  writable: true,
});

// Mock global alert
global.alert = jest.fn();

// Mock CSS imports
jest.mock('@/styles/typography.css', () => ({}));

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
};

describe('Admin Flow Integration', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue(mockRouter);
    jest.clearAllMocks();
    global.alert = jest.fn();
    window.location.href = '';
  });

  it('allows admin user to login and redirects to organizations', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    // Find form elements
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByTestId('login-button');

    // Enter admin credentials
    await user.type(emailInput, 'admin@p360.com');
    await user.type(passwordInput, 'admin123');

    // Submit form
    await user.click(loginButton);

    // Wait for alert and redirect
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('Welcome Admin! 🎉')
      );
    });

    // Check redirect was attempted
    await waitFor(() => {
      expect(window.location.href).toBe('/admin/organizations');
    }, { timeout: 2000 });
  });

  it('does not redirect non-admin users to admin area', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    // Find form elements
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByTestId('login-button');

    // Enter regular user credentials
    await user.type(emailInput, 'user@p360.com');
    await user.type(passwordInput, 'user123');

    // Submit form
    await user.click(loginButton);

    // Wait for alert
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('Login successful! 🎉')
      );
    });

    // Should not redirect to admin area
    expect(window.location.href).not.toBe('/admin/organizations');
  });

  it('validates form inputs before allowing submission', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByTestId('login-button');

    // Try with invalid email
    await user.type(emailInput, 'invalid-email');
    await user.type(passwordInput, 'password123');

    // Button should be disabled for invalid email
    expect(loginButton).toBeDisabled();

    // Clear and try with valid email but no password
    await user.clear(emailInput);
    await user.clear(passwordInput);
    await user.type(emailInput, 'admin@p360.com');

    // Button should be disabled without password
    expect(loginButton).toBeDisabled();

    // Add valid password
    await user.type(passwordInput, 'admin123');

    // Button should now be enabled
    expect(loginButton).not.toBeDisabled();
  });

  it('shows proper error states for invalid credentials', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByTestId('login-button');

    // Enter invalid credentials
    await user.type(emailInput, 'invalid@p360.com');
    await user.type(passwordInput, 'wrongpassword');

    // Submit form
    await user.click(loginButton);

    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
    });
  });

  it('handles loading state during login', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByTestId('login-button');

    // Enter valid admin credentials
    await user.type(emailInput, 'admin@p360.com');
    await user.type(passwordInput, 'admin123');

    // Submit form
    await user.click(loginButton);

    // Button should show loading state
    expect(loginButton).toBeDisabled();
    expect(loginButton).toHaveTextContent(/logging in/i);
  });

  it('supports OAuth login options', () => {
    render(<LoginPage />);

    // Check for OAuth buttons
    expect(screen.getByText(/continue with google/i)).toBeInTheDocument();
    expect(screen.getByText(/continue with microsoft/i)).toBeInTheDocument();
  });

  it('displays proper P360 branding and styling', () => {
    render(<LoginPage />);

    // Check for P360 logo
    expect(screen.getByAltText(/pipeline360/i)).toBeInTheDocument();

    // Check for proper styling classes
    const loginContainer = screen.getByTestId('login');
    expect(loginContainer).toHaveClass('font-p360');
  });

  it('maintains accessibility standards', () => {
    render(<LoginPage />);

    // Check form labels are properly associated
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toHaveAttribute('aria-required', 'true');
    expect(passwordInput).toHaveAttribute('aria-required', 'true');

    // Check for proper ARIA attributes
    expect(emailInput).toHaveAttribute('aria-invalid');
    expect(passwordInput).toHaveAttribute('aria-invalid');
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByTestId('login-button');

    // Tab through form elements
    await user.tab();
    expect(emailInput).toHaveFocus();

    await user.tab();
    expect(passwordInput).toHaveFocus();

    await user.tab();
    expect(loginButton).toHaveFocus();
  });
});
