import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import LoginPage from '../../app/auth/login/page';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { priority, ...imgProps } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...imgProps} alt={props.alt} />;
  }
}));

const mockPush = jest.fn();

describe('LoginPage', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush
    });
    mockPush.mockClear();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('🎨 Visual Design & Layout', () => {
    it('renders Pipeline360 logo correctly', () => {
      render(<LoginPage />);
      
      const logo = screen.getByAltText('Pipeline360');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/logo-02.png');
      expect(logo).toHaveAttribute('width', '172');
      expect(logo).toHaveAttribute('height', '28');
    });

    it('displays welcome message with correct typography', () => {
      render(<LoginPage />);
      
      const heading = screen.getByRole('heading', { name: /welcome back/i });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveStyle({
        fontSize: '24px',
        fontWeight: '600'
      });

      const subtitle = screen.getByText('Login to your Pipeline360 account');
      expect(subtitle).toBeInTheDocument();
    });

    it('renders with white background and split layout', () => {
      render(<LoginPage />);
      
      const main = screen.getByRole('main');
      expect(main).toHaveClass('min-h-screen', 'bg-white', 'relative');
      
      // Check for split layout structure
      const contentArea = screen.getByText('Future Content Area');
      expect(contentArea).toBeInTheDocument();
    });

    it('displays login card with proper styling', () => {
      render(<LoginPage />);
      
      // Find the card container by looking for the form's ancestor with proper styling
      const form = screen.getByRole('form');
      const cardContainer = form.closest('.w-\\[768px\\]');
      expect(cardContainer).toBeInTheDocument();
      expect(cardContainer).toHaveClass('bg-white', 'border', 'rounded', 'shadow-[0px_1px_2px_0px_rgba(0,0,0,0.06),0px_1px_3px_0px_rgba(0,0,0,0.1)]');
    });
  });

  describe('📝 Form Fields & Validation', () => {
    it('renders email field with proper labeling', () => {
      render(<LoginPage />);
      
      const emailLabel = screen.getByLabelText(/email/i);
      expect(emailLabel).toBeInTheDocument();
      expect(emailLabel).toHaveAttribute('type', 'email');
      expect(emailLabel).toHaveAttribute('placeholder', 'Enter your email here...');
      
      const requiredAsterisks = screen.getAllByText('*');
      expect(requiredAsterisks).toHaveLength(2); // One for email, one for password
    });

    it('renders password field with visibility toggle', () => {
      render(<LoginPage />);
      
      const passwordField = screen.getByLabelText('Password');
      expect(passwordField).toBeInTheDocument();
      expect(passwordField).toHaveAttribute('type', 'password');
      expect(passwordField).toHaveAttribute('placeholder', 'Enter your password here...');
      
      const toggleButton = screen.getByRole('button', { name: 'Show password' });
      expect(toggleButton).toBeInTheDocument();
    });

    it('toggles password visibility when eye icon is clicked', () => {
      render(<LoginPage />);
      
      const passwordField = screen.getByLabelText('Password');
      const toggleButton = screen.getByRole('button', { name: 'Show password' });
      
      expect(passwordField).toHaveAttribute('type', 'password');
      
      fireEvent.click(toggleButton);
      expect(passwordField).toHaveAttribute('type', 'text');
      
      fireEvent.click(toggleButton);
      expect(passwordField).toHaveAttribute('type', 'password');
    });

    it('validates email format and shows error', async () => {
      render(<LoginPage />);
      
      const emailField = screen.getByLabelText(/email/i);
      const form = screen.getByRole('form');
      
      fireEvent.change(emailField, { target: { value: 'invalid-email' } });
      fireEvent.submit(form);
      
      await waitFor(() => {        
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('validates password and shows error', async () => {
      render(<LoginPage />);
      
      const passwordField = screen.getByLabelText('Password');
      const form = screen.getByRole('form');
      
      fireEvent.change(passwordField, { target: { value: '123' } });
      fireEvent.submit(form);
      
      await waitFor(() => {
        expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
      });
    });

    it('clears errors when user starts typing', () => {
      render(<LoginPage />);
      
      const emailField = screen.getByLabelText(/email/i);
      const submitButton = screen.getByRole('button', { name: 'Login' });
      
      // Trigger validation error
      fireEvent.click(submitButton);
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      
      // Start typing
      fireEvent.change(emailField, { target: { value: 'user@example.com' } });
      
      // Error should be cleared
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    });
  });

  describe('🔐 Authentication Flow', () => {
    it('shows loading state during login', async () => {
      render(<LoginPage />);
      
      const emailField = screen.getByLabelText(/email/i);
      const passwordField = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Login' });
      
      fireEvent.change(emailField, { target: { value: 'user@example.com' } });
      fireEvent.change(passwordField, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      // Check loading state
      expect(screen.getByText('Logging in...')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    it('redirects to dashboard on successful login', async () => {
      render(<LoginPage />);
      
      const emailField = screen.getByLabelText(/email/i);
      const passwordField = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Login' });
      
      fireEvent.change(emailField, { target: { value: 'user@example.com' } });
      fireEvent.change(passwordField, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      }, { timeout: 2000 });
    });

    it('validates required fields before submission', async () => {
      render(<LoginPage />);
      
      const form = screen.getByRole('form');
      fireEvent.submit(form);
      
      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });

      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe('🌐 Social Login', () => {
    it('renders Google login button with correct styling', () => {
      render(<LoginPage />);
      
      const googleButton = screen.getByRole('button', { name: /login with google/i });
      expect(googleButton).toBeInTheDocument();
      expect(googleButton).toHaveClass('bg-white', 'border', 'rounded');
    });

    it('renders Microsoft login button with correct styling', () => {
      render(<LoginPage />);
      
      const microsoftButton = screen.getByRole('button', { name: /login with microsoft/i });
      expect(microsoftButton).toBeInTheDocument();
      expect(microsoftButton).toHaveClass('bg-white', 'border', 'rounded');
    });

    it('handles Google login click', () => {
      render(<LoginPage />);
      
      const googleButton = screen.getByRole('button', { name: /login with google/i });
      fireEvent.click(googleButton);
      
      expect(console.log).toHaveBeenCalledWith('Login with google');
    });

    it('handles Microsoft login click', () => {
      render(<LoginPage />);
      
      const microsoftButton = screen.getByRole('button', { name: /login with microsoft/i });
      fireEvent.click(microsoftButton);
      
      expect(console.log).toHaveBeenCalledWith('Login with microsoft');
    });

    it('displays "Or continue with" separator', () => {
      render(<LoginPage />);
      
      const separator = screen.getByText('Or continue with');
      expect(separator).toBeInTheDocument();
      expect(separator).toHaveStyle({
        fontSize: '12px'
      });
    });
  });

  describe('♿ Accessibility', () => {
    it('has proper form structure with labels', () => {
      render(<LoginPage />);
      
      expect(screen.getByRole('form')).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('has proper button roles and names', () => {
      render(<LoginPage />);
      
      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login with google/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login with microsoft/i })).toBeInTheDocument();
      
      // Check password toggle accessibility
      const toggleButton = screen.getByRole('button', { name: 'Show password' });
      expect(toggleButton).toHaveAttribute('aria-label', 'Show password');
      expect(toggleButton).toHaveAttribute('aria-pressed', 'false');
    });

    it('supports keyboard navigation', () => {
      render(<LoginPage />);
      
      const emailField = screen.getByLabelText(/email/i);
      const passwordField = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Login' });
      
      emailField.focus();
      expect(document.activeElement).toBe(emailField);
    });
  });

  describe('📱 Responsive Design', () => {
    it('maintains responsive split layout structure', () => {
      render(<LoginPage />);
      
      const main = screen.getByRole('main');
      expect(main).toHaveClass('min-h-screen', 'bg-white', 'relative');
      
      // Check for left and right sections
      const futureContentArea = screen.getByText('Future Content Area');
      expect(futureContentArea).toBeInTheDocument();
    });

    it('uses proper spacing and sizing', () => {
      render(<LoginPage />);
      
      const form = screen.getByRole('form');
      expect(form).toHaveClass('space-y-6');
    });
  });

  describe('🎨 Color Scheme & Branding', () => {
    it('uses Figma light purple brand colors for login button', () => {
      render(<LoginPage />);
      
      const submitButton = screen.getByRole('button', { name: 'Login' });
      expect(submitButton).toHaveClass('bg-[#F4EBFF]');
      
      const buttonText = submitButton.querySelector('span');
      expect(buttonText).toHaveClass('text-[#CEA3FF]');
    });

    it('uses correct error color', () => {
      render(<LoginPage />);
      
      const submitButton = screen.getByRole('button', { name: 'Login' });
      fireEvent.click(submitButton);
      
      const errorText = screen.getByText('Email is required');
      expect(errorText).toHaveClass('text-[#F00250]');
    });

    it('applies consistent typography with inline styles', () => {
      render(<LoginPage />);
      
      const heading = screen.getByRole('heading', { name: /welcome back/i });
      const subtitle = screen.getByText('Login to your Pipeline360 account');
      
      // Check that elements have inline font styles matching Figma specs
      expect(heading).toHaveStyle({ fontSize: '24px', fontWeight: '600' });
      expect(subtitle).toHaveStyle({ fontSize: '14px' });
    });
  });

  describe('🎯 Content Areas', () => {
    it('displays placeholder content area for future use', () => {
      render(<LoginPage />);
      
      const futureContent = screen.getByText('Future Content Area');
      expect(futureContent).toBeInTheDocument();
      
      const description = screen.getByText(/This space reserved for marketing content/);
      expect(description).toBeInTheDocument();
    });

    it('shows correct background gradient effect at bottom', () => {
      render(<LoginPage />);
      
      // The gradient is implemented as a background div, check for its presence
      const main = screen.getByRole('main');
      const gradientDiv = main.querySelector('.bg-gradient-to-r');
      expect(gradientDiv).toBeInTheDocument();
    });
  });
});