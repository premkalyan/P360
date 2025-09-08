/**
 * P360-106: Design System Unit Tests
 * Enterprise-grade Jest tests for design system components
 * Related JIRA: P360-67, P360-106
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { 
  Typography, 
  Button, 
  EmptyState, 
  EmptyCampaigns,
  EmptyResults,
  designTokens 
} from '../../frontend/src/lib/design-system';

describe('Design System - Typography Component', () => {
  test('renders with default props', () => {
    render(<Typography>Default text</Typography>);
    const element = screen.getByText('Default text');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('P');
  });

  test('renders with h1 variant', () => {
    render(<Typography variant="h1">Heading text</Typography>);
    const element = screen.getByText('Heading text');
    expect(element.tagName).toBe('H1');
  });

  test('applies correct color styling', () => {
    render(<Typography color="primary">Primary text</Typography>);
    const element = screen.getByText('Primary text');
    expect(element).toHaveStyle({ color: designTokens.colors.neutral[900] });
  });

  test('applies custom weight', () => {
    render(<Typography weight="bold">Bold text</Typography>);
    const element = screen.getByText('Bold text');
    expect(element).toHaveStyle({ fontWeight: designTokens.typography.fontWeight.bold });
  });

  test('applies text alignment', () => {
    render(<Typography align="center">Centered text</Typography>);
    const element = screen.getByText('Centered text');
    expect(element).toHaveStyle({ textAlign: 'center' });
  });

  test('uses custom element type', () => {
    render(<Typography as="span">Span text</Typography>);
    const element = screen.getByText('Span text');
    expect(element.tagName).toBe('SPAN');
  });

  test('applies custom className', () => {
    render(<Typography className="custom-class">Custom text</Typography>);
    const element = screen.getByText('Custom text');
    expect(element).toHaveClass('custom-class');
  });
});

describe('Design System - Button Component', () => {
  test('renders with default props', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole('button', { name: 'Default Button' });
    expect(button).toBeInTheDocument();
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders different variants', () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger'] as const;
    
    variants.forEach(variant => {
      const { rerender } = render(<Button variant={variant}>{variant} Button</Button>);
      const button = screen.getByRole('button', { name: `${variant} Button` });
      expect(button).toBeInTheDocument();
      
      rerender(<div></div>); // Clear for next test
    });
  });

  test('renders different sizes', () => {
    const sizes = ['sm', 'base', 'lg'] as const;
    
    sizes.forEach(size => {
      const { rerender } = render(<Button size={size}>{size} Button</Button>);
      const button = screen.getByRole('button', { name: `${size} Button` });
      expect(button).toBeInTheDocument();
      
      rerender(<div></div>); // Clear for next test
    });
  });

  test('handles disabled state', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: 'Disabled Button' });
    expect(button).toBeDisabled();
  });

  test('handles loading state', () => {
    render(<Button loading>Loading Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders with icons', () => {
    const LeftIcon = () => <span data-testid="left-icon">L</span>;
    const RightIcon = () => <span data-testid="right-icon">R</span>;
    
    render(
      <Button leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
        Icon Button
      </Button>
    );
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  test('applies full width', () => {
    render(<Button fullWidth>Full Width Button</Button>);
    const button = screen.getByRole('button', { name: 'Full Width Button' });
    expect(button).toHaveStyle({ width: '100%' });
  });
});

describe('Design System - EmptyState Component', () => {
  test('renders with required props', () => {
    render(<EmptyState title="Empty Title" />);
    expect(screen.getByText('Empty Title')).toBeInTheDocument();
  });

  test('renders with description', () => {
    render(
      <EmptyState 
        title="Empty Title" 
        description="Empty description text" 
      />
    );
    expect(screen.getByText('Empty Title')).toBeInTheDocument();
    expect(screen.getByText('Empty description text')).toBeInTheDocument();
  });

  test('renders with illustration image', () => {
    render(
      <EmptyState 
        title="Empty Title" 
        illustration="/test-image.png" 
      />
    );
    const image = screen.getByAltText('Empty state illustration');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.png');
  });

  test('renders with custom illustration component', () => {
    const CustomIcon = () => <div data-testid="custom-icon">Custom</div>;
    render(
      <EmptyState 
        title="Empty Title" 
        illustration={<CustomIcon />} 
      />
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  test('handles primary action', () => {
    const handlePrimaryAction = jest.fn();
    render(
      <EmptyState 
        title="Empty Title" 
        primaryAction={{
          label: 'Primary Action',
          onClick: handlePrimaryAction
        }}
      />
    );
    
    const button = screen.getByRole('button', { name: 'Primary Action' });
    fireEvent.click(button);
    expect(handlePrimaryAction).toHaveBeenCalledTimes(1);
  });

  test('handles secondary action', () => {
    const handleSecondaryAction = jest.fn();
    render(
      <EmptyState 
        title="Empty Title" 
        secondaryAction={{
          label: 'Secondary Action',
          onClick: handleSecondaryAction
        }}
      />
    );
    
    const button = screen.getByRole('button', { name: 'Secondary Action' });
    fireEvent.click(button);
    expect(handleSecondaryAction).toHaveBeenCalledTimes(1);
  });

  test('renders different sizes', () => {
    const sizes = ['sm', 'base', 'lg'] as const;
    
    sizes.forEach(size => {
      const { rerender } = render(
        <EmptyState title={`${size} Title`} size={size} />
      );
      expect(screen.getByText(`${size} Title`)).toBeInTheDocument();
      rerender(<div></div>); // Clear for next test
    });
  });
});

describe('Design System - EmptyState Presets', () => {
  test('EmptyCampaigns renders with correct content', () => {
    render(<EmptyCampaigns />);
    expect(screen.getByText("You don't have any campaigns yet")).toBeInTheDocument();
    expect(screen.getByText("Something cool here")).toBeInTheDocument();
    
    const image = screen.getByAltText('Empty state illustration');
    expect(image).toHaveAttribute('src', '/empty-campaign-illustration.png');
  });

  test('EmptyCampaigns handles custom primary action', () => {
    const handleCreate = jest.fn();
    render(
      <EmptyCampaigns 
        primaryAction={{
          label: 'Create Campaign',
          onClick: handleCreate
        }}
      />
    );
    
    const button = screen.getByRole('button', { name: 'Create Campaign' });
    fireEvent.click(button);
    expect(handleCreate).toHaveBeenCalledTimes(1);
  });

  test('EmptyResults renders with correct content', () => {
    render(<EmptyResults />);
    expect(screen.getByText("No results found")).toBeInTheDocument();
    expect(screen.getByText("Try adjusting your search criteria or filters")).toBeInTheDocument();
  });

  test('EmptyResults accepts custom props', () => {
    render(<EmptyResults title="Custom Empty Results" />);
    expect(screen.getByText("Custom Empty Results")).toBeInTheDocument();
  });
});

describe('Design System - Design Tokens', () => {
  test('exports correct color tokens', () => {
    expect(designTokens.colors.primary[500]).toBe('#841AFF');
    expect(designTokens.colors.neutral[900]).toBe('#101828');
    expect(designTokens.colors.semantic.success[500]).toBe('#10B981');
  });

  test('exports correct typography tokens', () => {
    expect(designTokens.typography.fontSize.base).toBe('16px');
    expect(designTokens.typography.fontWeight.bold).toBe(700);
    expect(designTokens.typography.fontFamily.sans[0]).toBe('Inter');
  });

  test('exports correct spacing tokens', () => {
    expect(designTokens.spacing[4]).toBe('16px');
    expect(designTokens.spacing[8]).toBe('32px');
  });

  test('exports correct component tokens', () => {
    expect(designTokens.components.button.height.base).toBe('40px');
    expect(designTokens.components.topbar.height).toBe('54px');
    expect(designTokens.components.sidebar.width).toBe('272px');
  });
});
