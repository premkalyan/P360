/**
 * P360 Authentication Components - Unit Tests
 * Comprehensive unit testing for P360-19 Authentication UI Components
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';

// Import components to test
import { AuthLayout } from '../../frontend/src/components/auth/AuthLayout';
import { LoginForm } from '../../frontend/src/components/auth/LoginForm';
import { SignupForm } from '../../frontend/src/components/auth/SignupForm';
import { Button } from '../../frontend/src/components/ui/Button';
import { Input } from '../../frontend/src/components/ui/Input';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/auth/login'
  })
}));

describe('P360 Authentication Components Unit Tests', () => {
  
  describe('TC-001-005: AuthLayout Component Tests', () => {
    
    test('TC-001: Verify responsive layout rendering', () => {
      render(
        <AuthLayout title="Test Title" subtitle="Test Subtitle">
          <div data-testid="test-content">Test Content</div>
        </AuthLayout>
      );
      
      // Verify main structure elements are present
      expect(screen.getByText('P360')).toBeInTheDocument();
      expect(screen.getByText('Performance Marketing Platform')).toBeInTheDocument();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
      expect(screen.getByTestId('test-content')).toBeInTheDocument();
    });

    test('TC-002: Validate branding panel display', () => {
      render(
        <AuthLayout title="Test">
          <div>Content</div>
        </AuthLayout>
      );
      
      // Check branding elements
      expect(screen.getByText('Advanced Attribution Analysis')).toBeInTheDocument();
      expect(screen.getByText('Audience Management')).toBeInTheDocument();
      expect(screen.getByText('Real-time Performance Insights')).toBeInTheDocument();
    });

    test('TC-004: Verify accessibility compliance (WCAG)', () => {
      render(
        <AuthLayout title="Accessible Form">
          <form>
            <input aria-label="Test input" />
          </form>
        </AuthLayout>
      );
      
      // Check for accessibility features
      const heading = screen.getByText('Accessible Form');
      expect(heading).toHaveAttribute('role', 'heading');
      
      // Verify semantic structure
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });

  describe('TC-006-014: LoginForm Component Tests', () => {
    
    test('TC-006: Email field validation (valid/invalid formats)', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn();
      
      render(<LoginForm onSubmit={mockOnSubmit} />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      // Test invalid email formats
      const invalidEmails = ['invalid', 'test@', '@domain.com', 'test@domain', 'test.domain.com'];
      
      for (const invalidEmail of invalidEmails) {
        await user.clear(emailInput);
        await user.type(emailInput, invalidEmail);
        await user.click(submitButton);
        
        await waitFor(() => {
          expect(screen.getByText(/email is invalid/i)).toBeInTheDocument();
        });
      }
      
      // Test valid email
      await user.clear(emailInput);
      await user.type(emailInput, 'valid@example.com');
      await user.click(submitButton);
      
      // Error should clear
      await waitFor(() => {
        expect(screen.queryByText(/email is invalid/i)).not.toBeInTheDocument();
      });
    });

    test('TC-007: Password field validation (minimum length, required)', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn();
      
      render(<LoginForm onSubmit={mockOnSubmit} />);
      
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      // Test empty password
      await user.click(submitButton);
      await waitFor(() => {
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      });
      
      // Test short password
      await user.type(passwordInput, '12345');
      await user.click(submitButton);
      await waitFor(() => {
        expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
      });
      
      // Test valid password
      await user.clear(passwordInput);
      await user.type(passwordInput, 'validpassword');
      await user.click(submitButton);
      
      // Error should clear
      await waitFor(() => {
        expect(screen.queryByText(/password must be at least/i)).not.toBeInTheDocument();
      });
    });

    test('TC-008: Remember me checkbox functionality', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn();
      
      render(<LoginForm onSubmit={mockOnSubmit} />);
      
      const rememberMeCheckbox = screen.getByLabelText(/remember me/i);
      
      // Verify checkbox starts unchecked
      expect(rememberMeCheckbox).not.toBeChecked();
      
      // Check the checkbox
      await user.click(rememberMeCheckbox);
      expect(rememberMeCheckbox).toBeChecked();
      
      // Uncheck the checkbox
      await user.click(rememberMeCheckbox);
      expect(rememberMeCheckbox).not.toBeChecked();
    });

    test('TC-010: Form submission with valid data', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn();
      
      render(<LoginForm onSubmit={mockOnSubmit} />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const rememberMeCheckbox = screen.getByLabelText(/remember me/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      // Fill form with valid data
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(rememberMeCheckbox);
      
      // Submit form
      await user.click(submitButton);
      
      // Verify onSubmit called with correct data
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123',
          rememberMe: true
        });
      });
    });

    test('TC-012: Loading state display during submission', async () => {
      const user = userEvent.setup();
      
      render(<LoginForm loading={true} />);
      
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      // Verify loading state
      expect(submitButton).toBeDisabled();
      expect(screen.getByText(/sign in/i)).toBeInTheDocument();
      
      // Verify loading spinner is present (check for SVG or loading text)
      const loadingIndicator = submitButton.querySelector('svg');
      expect(loadingIndicator).toBeInTheDocument();
    });
  });

  describe('TC-015-022: SignupForm Component Tests', () => {
    
    test('TC-015: First/Last name validation (required fields)', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn();
      
      render(<SignupForm onSubmit={mockOnSubmit} />);
      
      const firstNameInput = screen.getByLabelText(/first name/i);
      const lastNameInput = screen.getByLabelText(/last name/i);
      const submitButton = screen.getByRole('button', { name: /create account/i });
      
      // Submit empty form
      await user.click(submitButton);
      
      // Check for required field errors
      await waitFor(() => {
        expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
      });
      
      // Fill first name, error should clear
      await user.type(firstNameInput, 'John');
      await waitFor(() => {
        expect(screen.queryByText(/first name is required/i)).not.toBeInTheDocument();
      });
      
      // Fill last name, error should clear
      await user.type(lastNameInput, 'Doe');
      await waitFor(() => {
        expect(screen.queryByText(/last name is required/i)).not.toBeInTheDocument();
      });
    });

    test('TC-017: Password strength validation', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn();
      
      render(<SignupForm onSubmit={mockOnSubmit} />);
      
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /create account/i });
      
      // Test weak passwords
      const weakPasswords = ['123', 'password', 'PASSWORD', '12345678'];
      
      for (const weakPassword of weakPasswords) {
        await user.clear(passwordInput);
        await user.type(passwordInput, weakPassword);
        await user.click(submitButton);
        
        await waitFor(() => {
          expect(screen.getByText(/password must contain at least one uppercase letter, one lowercase letter, and one number/i)).toBeInTheDocument();
        });
      }
      
      // Test strong password
      await user.clear(passwordInput);
      await user.type(passwordInput, 'StrongPassword123');
      
      await waitFor(() => {
        expect(screen.queryByText(/password must contain/i)).not.toBeInTheDocument();
      });
    });

    test('TC-018: Password confirmation matching', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn();
      
      render(<SignupForm onSubmit={mockOnSubmit} />);
      
      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const submitButton = screen.getByRole('button', { name: /create account/i });
      
      // Enter password
      await user.type(passwordInput, 'Password123');
      
      // Enter non-matching confirmation
      await user.type(confirmPasswordInput, 'DifferentPassword123');
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
      });
      
      // Fix confirmation password
      await user.clear(confirmPasswordInput);
      await user.type(confirmPasswordInput, 'Password123');
      
      await waitFor(() => {
        expect(screen.queryByText(/passwords do not match/i)).not.toBeInTheDocument();
      });
    });

    test('TC-019: Terms and conditions checkbox requirement', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn();
      
      render(<SignupForm onSubmit={mockOnSubmit} />);
      
      const termsCheckbox = screen.getByRole('checkbox');
      const submitButton = screen.getByRole('button', { name: /create account/i });
      
      // Submit without accepting terms
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/you must agree to the terms and conditions/i)).toBeInTheDocument();
      });
      
      // Accept terms
      await user.click(termsCheckbox);
      
      await waitFor(() => {
        expect(screen.queryByText(/you must agree to the terms/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('TC-023-030: Button Component Tests', () => {
    
    test('TC-023: Primary variant rendering and styling', () => {
      render(
        <Button variant="primary" data-testid="primary-button">
          Primary Button
        </Button>
      );
      
      const button = screen.getByTestId('primary-button');
      expect(button).toHaveClass('bg-blue-600');
      expect(button).toHaveClass('text-white');
      expect(button).not.toBeDisabled();
    });

    test('TC-024: Secondary variant rendering and styling', () => {
      render(
        <Button variant="secondary" data-testid="secondary-button">
          Secondary Button
        </Button>
      );
      
      const button = screen.getByTestId('secondary-button');
      expect(button).toHaveClass('bg-gray-600');
      expect(button).toHaveClass('text-white');
    });

    test('TC-025: Outline variant rendering and styling', () => {
      render(
        <Button variant="outline" data-testid="outline-button">
          Outline Button
        </Button>
      );
      
      const button = screen.getByTestId('outline-button');
      expect(button).toHaveClass('border');
      expect(button).toHaveClass('border-gray-300');
    });

    test('TC-027: Loading state with spinner animation', () => {
      render(
        <Button loading={true} data-testid="loading-button">
          Loading Button
        </Button>
      );
      
      const button = screen.getByTestId('loading-button');
      expect(button).toBeDisabled();
      
      // Check for loading spinner SVG
      const spinner = button.querySelector('svg');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('animate-spin');
    });

    test('TC-028: Disabled state behavior', async () => {
      const user = userEvent.setup();
      const mockOnClick = jest.fn();
      
      render(
        <Button disabled onClick={mockOnClick} data-testid="disabled-button">
          Disabled Button
        </Button>
      );
      
      const button = screen.getByTestId('disabled-button');
      expect(button).toBeDisabled();
      
      // Try to click - should not trigger onClick
      await user.click(button);
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    test('TC-029: Click event handling', async () => {
      const user = userEvent.setup();
      const mockOnClick = jest.fn();
      
      render(
        <Button onClick={mockOnClick} data-testid="clickable-button">
          Clickable Button
        </Button>
      );
      
      const button = screen.getByTestId('clickable-button');
      await user.click(button);
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('TC-031-039: Input Component Tests', () => {
    
    test('TC-031: Text input rendering with label', () => {
      render(
        <Input 
          label="Test Label" 
          placeholder="Test placeholder"
          data-testid="test-input"
        />
      );
      
      expect(screen.getByText('Test Label')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
    });

    test('TC-032: Email input type functionality', () => {
      render(
        <Input 
          type="email" 
          label="Email"
          data-testid="email-input"
        />
      );
      
      const input = screen.getByTestId('email-input');
      expect(input).toHaveAttribute('type', 'email');
    });

    test('TC-034: Left icon display and positioning', () => {
      const TestIcon = () => <span data-testid="left-icon">@</span>;
      
      render(
        <Input 
          label="Email with Icon"
          leftIcon={<TestIcon />}
          data-testid="icon-input"
        />
      );
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    test('TC-036: Error state styling and message', () => {
      render(
        <Input 
          label="Error Input"
          error="This field has an error"
          data-testid="error-input"
        />
      );
      
      const input = screen.getByTestId('error-input');
      const errorMessage = screen.getByText('This field has an error');
      
      expect(input).toHaveClass('border-red-300');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass('text-red-600');
    });

    test('TC-037: Helper text display', () => {
      render(
        <Input 
          label="Input with Helper"
          helperText="This is helpful information"
          data-testid="helper-input"
        />
      );
      
      const helperText = screen.getByText('This is helpful information');
      expect(helperText).toBeInTheDocument();
      expect(helperText).toHaveClass('text-gray-500');
    });

    test('TC-038: Focus and blur states', async () => {
      const user = userEvent.setup();
      
      render(
        <Input 
          label="Focus Test"
          data-testid="focus-input"
        />
      );
      
      const input = screen.getByTestId('focus-input');
      
      // Focus the input
      await user.click(input);
      expect(input).toHaveFocus();
      
      // Blur the input by clicking elsewhere
      await user.click(document.body);
      expect(input).not.toHaveFocus();
    });
  });
});
