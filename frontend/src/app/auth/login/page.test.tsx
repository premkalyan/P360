import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LoginPage from './page';

// Mock window.alert for tests
global.alert = jest.fn();

// Mock the typography CSS import
jest.mock('@/styles/typography.css', () => ({}));

describe('LoginPage', () => {
  beforeEach(() => {
    // Reset any mocks or state before each test
    jest.clearAllMocks();
  });

  describe('Initial Render', () => {
    it('renders login form with all required elements', () => {
      render(<LoginPage />);
      
      // Check for form elements
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByTestId('login-button')).toBeInTheDocument();
      
      // Check for OAuth buttons
      expect(screen.getByRole('button', { name: /login with google/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login with microsoft/i })).toBeInTheDocument();
      
      // Check for Pipeline360 logo
      expect(screen.getByRole('img', { name: /pipeline360/i })).toBeInTheDocument();
    });

    it('has login button disabled initially (empty state)', () => {
      render(<LoginPage />);
      
      const loginButton = screen.getByTestId('login-button');
      expect(loginButton).toBeDisabled();
      expect(loginButton).toHaveClass('bg-[#f4ebff]');
    });

    it('applies P360 typography classes correctly', () => {
      render(<LoginPage />);
      
      const container = document.querySelector('[data-name="login"]');
      expect(container).toHaveClass('font-p360');
    });
  });

  describe('Form Validation', () => {
    it('validates email format in real-time', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const loginButton = screen.getByTestId('login-button');
      
      // Type invalid email
      await user.type(emailInput, 'invalid-email');
      expect(loginButton).toBeDisabled();
      
      // Type valid email
      await user.clear(emailInput);
      await user.type(emailInput, 'test@example.com');
      // Button should still be disabled without password
      expect(loginButton).toBeDisabled();
    });

    it('validates password length in real-time', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByTestId('login-button');
      
      // Type valid email
      await user.type(emailInput, 'test@example.com');
      
      // Type short password
      await user.type(passwordInput, '123');
      expect(loginButton).toBeDisabled();
      
      // Type valid password
      await user.clear(passwordInput);
      await user.type(passwordInput, '123456');
      expect(loginButton).toBeEnabled();
    });

    it('enables login button when both email and password are valid', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByTestId('login-button');
      
      await user.type(emailInput, 'admin@p360.com');
      await user.type(passwordInput, 'admin123');
      
      expect(loginButton).toBeEnabled();
      expect(loginButton).toHaveClass('bg-[#841aff]');
    });

    it('disables login button when valid email is deleted', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByTestId('login-button');
      
      // Fill valid credentials
      await user.type(emailInput, 'admin@p360.com');
      await user.type(passwordInput, 'admin123');
      expect(loginButton).toBeEnabled();
      
      // Delete email
      await user.clear(emailInput);
      expect(loginButton).toBeDisabled();
    });
  });

  describe('Login Functionality', () => {
    it('shows loading state during login attempt', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByTestId('login-button');
      
      await user.type(emailInput, 'admin@p360.com');
      await user.type(passwordInput, 'admin123');
      
      await user.click(loginButton);
      
      expect(screen.getByText(/logging in.../i)).toBeInTheDocument();
      expect(loginButton).toBeDisabled();
    });

    it('shows success message for valid credentials', async () => {
      const user = userEvent.setup();
      
      // Mock window.alert
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      
      render(<LoginPage />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByTestId('login-button');
      
      await user.type(emailInput, 'admin@p360.com');
      await user.type(passwordInput, 'admin123');
      await user.click(loginButton);
      
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith(
          expect.stringContaining('Login successful!')
        );
      });
      
      alertSpy.mockRestore();
    });

    it('shows error messages for invalid credentials', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByTestId('login-button');
      
      await user.type(emailInput, 'invalid@example.com');
      await user.type(passwordInput, 'wrongpassword');
      await user.click(loginButton);
      
      await waitFor(() => {
        expect(screen.getByText('Email not found')).toBeInTheDocument();
        expect(screen.getByText('Password is wrong')).toBeInTheDocument();
      });
      
      // Check error state styling
      expect(emailInput).toHaveClass('border-red-500');
      expect(passwordInput).toHaveClass('border-red-500');
    });

    it('clears errors when user starts typing', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByTestId('login-button');
      
      // Trigger error state
      await user.type(emailInput, 'invalid@example.com');
      await user.type(passwordInput, 'wrongpassword');
      await user.click(loginButton);
      
      await waitFor(() => {
        expect(screen.getByText(/email not found/i)).toBeInTheDocument();
      });
      
      // Start typing in email field
      await user.type(emailInput, 'a');
      
      expect(screen.queryByText(/email not found/i)).not.toBeInTheDocument();
    });
  });

  describe('OAuth Functionality', () => {
    it('handles Google OAuth login', async () => {
      const user = userEvent.setup();
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      
      render(<LoginPage />);
      
      const googleButton = screen.getByRole('button', { name: /login with google/i });
      await user.click(googleButton);
      
      expect(consoleSpy).toHaveBeenCalledWith('OAuth login with Google');
      
      consoleSpy.mockRestore();
    });

    it('handles Microsoft OAuth login', async () => {
      const user = userEvent.setup();
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      
      render(<LoginPage />);
      
      const microsoftButton = screen.getByRole('button', { name: /login with microsoft/i });
      await user.click(microsoftButton);
      
      expect(consoleSpy).toHaveBeenCalledWith('OAuth login with Microsoft');
      
      consoleSpy.mockRestore();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels and roles', () => {
      render(<LoginPage />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByTestId('login-button');
      
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(loginButton).toHaveAttribute('type', 'button');
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      
      // Tab through form elements
      await user.tab();
      expect(emailInput).toHaveFocus();
      
      await user.tab();
      expect(passwordInput).toHaveFocus();
      
      // Skip login button since it's disabled when form is empty
      // OAuth buttons will receive focus next
      await user.tab();
      expect(screen.getByRole('button', { name: /login with google/i })).toHaveFocus();
    });
  });

  describe('Typography Integration', () => {
    it('applies P360 typography classes to form elements', () => {
      render(<LoginPage />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByTestId('login-button');
      
      expect(emailInput).toHaveClass('p360-input');
      expect(passwordInput).toHaveClass('p360-input');
      expect(loginButton).toHaveClass('p360-button-text');
    });

    it('uses correct text colors from P360 design system', () => {
      render(<LoginPage />);
      
      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toHaveClass('p360-text-primary');
    });
  });

  describe('Responsive Design', () => {
    it('maintains layout on different screen sizes', () => {
      // Test mobile viewport
      global.innerWidth = 375;
      global.innerHeight = 667;
      global.dispatchEvent(new Event('resize'));
      
      render(<LoginPage />);
      
      const container = document.querySelector('[data-name="login"]');
      expect(container).toHaveClass('min-h-screen');
      expect(container).toHaveClass('w-full');
    });
  });
});

// Integration test for complete login flow
describe('LoginPage Integration', () => {
  it('completes full successful login flow', async () => {
    const user = userEvent.setup();
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<LoginPage />);
    
    // Initial state - button disabled
    const loginButton = screen.getByTestId('login-button');
    expect(loginButton).toBeDisabled();
    
    // Fill valid credentials
    await user.type(screen.getByLabelText(/email/i), 'admin@p360.com');
    await user.type(screen.getByLabelText(/password/i), 'admin123');
    
    // Button should now be enabled
    expect(loginButton).toBeEnabled();
    
    // Click login
    await user.click(loginButton);
    
    // Should show loading state
    expect(screen.getByText(/logging in.../i)).toBeInTheDocument();
    
    // Should show success message
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        expect.stringContaining('Login successful!')
      );
    });
    
    // Should clear form
    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toHaveValue('');
      expect(screen.getByLabelText(/password/i)).toHaveValue('');
    });
    
    alertSpy.mockRestore();
  });
});
