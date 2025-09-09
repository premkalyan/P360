/**
 * P360-107: ProgressIndicator Component Tests
 * Unit tests for circular progress indicator with percentage display
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProgressIndicator } from '@/components/campaigns/ProgressIndicator';

describe('ProgressIndicator', () => {
  describe('Basic Rendering', () => {
    it('renders progress indicator with percentage', () => {
      render(<ProgressIndicator percentage={75} />);
      
      expect(screen.getByText('75%')).toBeInTheDocument();
    });

    it('renders with correct size prop', () => {
      const { rerender } = render(<ProgressIndicator percentage={50} size="sm" />);
      expect(screen.getByText('50%')).toBeInTheDocument();
      
      rerender(<ProgressIndicator percentage={50} size="lg" />);
      expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<ProgressIndicator percentage={50} className="custom-class" />);
      
      expect(screen.getByText('50%').parentElement).toHaveClass('custom-class');
    });
  });

  describe('Percentage Clamping', () => {
    it('clamps percentage to 0 minimum', () => {
      render(<ProgressIndicator percentage={-10} />);
      
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('clamps percentage to 100 maximum', () => {
      render(<ProgressIndicator percentage={150} />);
      
      expect(screen.getByText('100%')).toBeInTheDocument();
    });

    it('rounds percentage to nearest integer', () => {
      render(<ProgressIndicator percentage={75.7} />);
      
      expect(screen.getByText('76%')).toBeInTheDocument();
    });
  });

  describe('Color Logic', () => {
    it('uses green for high percentage (>=60)', () => {
      const { container } = render(<ProgressIndicator percentage={80} />);
      const svg = container.querySelector('svg circle:last-child');
      
      expect(svg).toHaveAttribute('stroke', '#21C828');
    });

    it('uses orange for medium percentage (36-59)', () => {
      const { container } = render(<ProgressIndicator percentage={50} />);
      const svg = container.querySelector('svg circle:last-child');
      
      expect(svg).toHaveAttribute('stroke', '#FF6221');
    });

    it('uses red for low percentage (<36)', () => {
      const { container } = render(<ProgressIndicator percentage={25} />);
      const svg = container.querySelector('svg circle:last-child');
      
      expect(svg).toHaveAttribute('stroke', '#F00250');
    });
  });

  describe('Size Variants', () => {
    it('renders small size with correct dimensions', () => {
      const { container } = render(<ProgressIndicator percentage={50} size="sm" />);
      const svg = container.querySelector('svg');
      
      expect(svg).toHaveAttribute('width', '24');
      expect(svg).toHaveAttribute('height', '24');
    });

    it('renders medium size with correct dimensions', () => {
      const { container } = render(<ProgressIndicator percentage={50} size="md" />);
      const svg = container.querySelector('svg');
      
      expect(svg).toHaveAttribute('width', '32');
      expect(svg).toHaveAttribute('height', '32');
    });

    it('renders large size with correct dimensions', () => {
      const { container } = render(<ProgressIndicator percentage={50} size="lg" />);
      const svg = container.querySelector('svg');
      
      expect(svg).toHaveAttribute('width', '40');
      expect(svg).toHaveAttribute('height', '40');
    });
  });

  describe('Accessibility', () => {
    it('has proper font family applied', () => {
      const { container } = render(<ProgressIndicator percentage={50} />);
      const text = container.querySelector('span');
      
      expect(text).toHaveClass('p360-text-progress');
    });

    it('displays correct percentage for screen readers', () => {
      render(<ProgressIndicator percentage={75} />);
      
      expect(screen.getByText('75%')).toBeInTheDocument();
    });
  });

  describe('SVG Progress Calculation', () => {
    it('calculates stroke-dashoffset correctly for 0%', () => {
      const { container } = render(<ProgressIndicator percentage={0} />);
      const progressCircle = container.querySelector('svg circle:last-child');
      
      // For 0%, stroke-dashoffset should equal circumference (no progress)
      const strokeDasharray = progressCircle?.getAttribute('stroke-dasharray');
      const strokeDashoffset = progressCircle?.getAttribute('stroke-dashoffset');
      
      expect(strokeDasharray).toBe(strokeDashoffset);
    });

    it('calculates stroke-dashoffset correctly for 100%', () => {
      const { container } = render(<ProgressIndicator percentage={100} />);
      const progressCircle = container.querySelector('svg circle:last-child');
      
      // For 100%, stroke-dashoffset should be 0 (full progress)
      expect(progressCircle).toHaveAttribute('stroke-dashoffset', '0');
    });
  });
});
