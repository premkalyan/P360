/**
 * P360 AuthLayout Component Tests
 * Tests for the authentication layout wrapper
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthLayout } from '@/components/auth/AuthLayout';

// Mock the typography CSS import
jest.mock('@/styles/typography.css', () => ({}));

describe('AuthLayout Component', () => {
  const mockChildren = <div data-testid="test-content">Test Content</div>;

  describe('Basic Rendering', () => {
    it('renders children correctly', () => {
      render(<AuthLayout>{mockChildren}</AuthLayout>);
      
      expect(screen.getByTestId('test-content')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders with default props', () => {
      render(<AuthLayout>{mockChildren}</AuthLayout>);
      
      // Logo should be shown by default
      expect(screen.getByAltText('Pipeline360 Logo')).toBeInTheDocument();
      
      // Should have gradient background by default
      const container = screen.getByTestId('test-content').closest('.min-h-screen');
      expect(container).toHaveClass('bg-gradient-to-br');
    });
  });

  describe('Logo Display', () => {
    it('shows logo when showLogo is true', () => {
      render(<AuthLayout showLogo={true}>{mockChildren}</AuthLayout>);
      
      expect(screen.getByAltText('Pipeline360 Logo')).toBeInTheDocument();
    });

    it('hides logo when showLogo is false', () => {
      render(<AuthLayout showLogo={false}>{mockChildren}</AuthLayout>);
      
      expect(screen.queryByAltText('Pipeline360 Logo')).not.toBeInTheDocument();
    });

    it('logo has correct src and styling', () => {
      render(<AuthLayout>{mockChildren}</AuthLayout>);
      
      const logo = screen.getByAltText('Pipeline360 Logo');
      expect(logo).toHaveAttribute('src', '/pipeline360-logo.svg');
      expect(logo).toHaveClass('h-8', 'w-auto');
    });
  });

  describe('Title and Subtitle', () => {
    it('renders title when provided', () => {
      render(
        <AuthLayout title="Welcome Back">
          {mockChildren}
        </AuthLayout>
      );
      
      expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome Back');
    });

    it('renders subtitle when provided', () => {
      render(
        <AuthLayout subtitle="Please sign in to your account">
          {mockChildren}
        </AuthLayout>
      );
      
      expect(screen.getByText('Please sign in to your account')).toBeInTheDocument();
    });

    it('renders both title and subtitle', () => {
      render(
        <AuthLayout 
          title="Welcome Back" 
          subtitle="Please sign in to your account"
        >
          {mockChildren}
        </AuthLayout>
      );
      
      expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      expect(screen.getByText('Please sign in to your account')).toBeInTheDocument();
    });

    it('does not render title section when neither title nor subtitle provided', () => {
      render(<AuthLayout>{mockChildren}</AuthLayout>);
      
      // No heading should be present
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });
  });

  describe('Background Variants', () => {
    it('applies gradient background by default', () => {
      render(<AuthLayout>{mockChildren}</AuthLayout>);
      
      const container = screen.getByTestId('test-content').closest('.min-h-screen');
      expect(container).toHaveClass('bg-gradient-to-br');
    });

    it('applies gradient background variant', () => {
      render(<AuthLayout backgroundVariant="gradient">{mockChildren}</AuthLayout>);
      
      const container = screen.getByTestId('test-content').closest('.min-h-screen');
      expect(container).toHaveClass('bg-gradient-to-br', 'from-purple-50', 'via-blue-50', 'to-indigo-50');
    });

    it('applies solid background variant', () => {
      render(<AuthLayout backgroundVariant="solid">{mockChildren}</AuthLayout>);
      
      const container = screen.getByTestId('test-content').closest('.min-h-screen');
      expect(container).toHaveClass('bg-white');
    });

    it('applies pattern background variant', () => {
      render(<AuthLayout backgroundVariant="pattern">{mockChildren}</AuthLayout>);
      
      const container = screen.getByTestId('test-content').closest('.min-h-screen');
      expect(container).toHaveClass('bg-gray-50');
    });
  });

  describe('Layout Structure', () => {
    it('has correct layout structure', () => {
      render(<AuthLayout>{mockChildren}</AuthLayout>);
      
      // Check for main sections
      expect(screen.getByRole('banner')).toBeInTheDocument(); // header
      expect(screen.getByRole('main')).toBeInTheDocument(); // main
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
    });

    it('content is wrapped in a card container', () => {
      render(<AuthLayout>{mockChildren}</AuthLayout>);
      
      const content = screen.getByTestId('test-content');
      const cardContainer = content.closest('.bg-white.rounded-lg.shadow-lg');
      expect(cardContainer).toBeInTheDocument();
      expect(cardContainer).toHaveClass('border', 'border-gray-200', 'p-8');
    });

    it('main content area is centered', () => {
      render(<AuthLayout>{mockChildren}</AuthLayout>);
      
      const main = screen.getByRole('main');
      expect(main).toHaveClass('flex', 'items-center', 'justify-center');
    });
  });

  describe('Typography Integration', () => {
    it('applies P360 font family to container', () => {
      render(<AuthLayout>{mockChildren}</AuthLayout>);
      
      const container = screen.getByTestId('test-content').closest('.min-h-screen');
      expect(container).toHaveClass('font-p360');
    });

    it('applies correct typography classes to title', () => {
      render(<AuthLayout title="Test Title">{mockChildren}</AuthLayout>);
      
      const title = screen.getByRole('heading');
      expect(title).toHaveClass('text-p360-h1', 'font-semibold', 'text-p360-primary-text');
    });

    it('applies correct typography classes to subtitle', () => {
      render(<AuthLayout subtitle="Test Subtitle">{mockChildren}</AuthLayout>);
      
      const subtitle = screen.getByText('Test Subtitle');
      expect(subtitle).toHaveClass('text-p360-body-2', 'text-p360-secondary-text');
    });
  });

  describe('Footer', () => {
    it('renders footer with copyright text', () => {
      render(<AuthLayout>{mockChildren}</AuthLayout>);
      
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
      expect(screen.getByText(/© 2024 Pipeline360. All rights reserved./)).toBeInTheDocument();
    });

    it('footer has correct typography styling', () => {
      render(<AuthLayout>{mockChildren}</AuthLayout>);
      
      const copyrightText = screen.getByText(/© 2024 Pipeline360. All rights reserved./);
      expect(copyrightText).toHaveClass('text-p360-body-3', 'text-p360-muted-text');
    });
  });

  describe('Responsive Design', () => {
    it('has responsive classes for different screen sizes', () => {
      render(<AuthLayout>{mockChildren}</AuthLayout>);
      
      // Check for responsive padding and sizing
      const main = screen.getByRole('main');
      expect(main).toHaveClass('px-4', 'py-12');
      
      const contentWrapper = screen.getByTestId('test-content').closest('.w-full.max-w-md');
      expect(contentWrapper).toBeInTheDocument();
    });
  });
});
