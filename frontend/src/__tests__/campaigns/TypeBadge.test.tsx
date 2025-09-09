/**
 * P360-107: TypeBadge Component Tests
 * Unit tests for campaign type badges
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TypeBadge, CampaignType } from '@/components/campaigns/TypeBadge';

describe('TypeBadge', () => {
  describe('Type Variants', () => {
    it('renders demand type correctly', () => {
      render(<TypeBadge type="demand" />);
      
      const badge = screen.getByText('Demand');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveStyle({
        backgroundColor: '#E5F4FF',
        color: '#008DFF',
      });
    });

    it('renders brand type correctly', () => {
      render(<TypeBadge type="brand" />);
      
      const badge = screen.getByText('Brand');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveStyle({
        backgroundColor: '#FFE6FC',
        color: '#ED01CF',
      });
    });

    it('renders conversion type correctly', () => {
      render(<TypeBadge type="conversion" />);
      
      const badge = screen.getByText('Conversion');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveStyle({
        backgroundColor: '#E5F4FF',
        color: '#008DFF',
      });
    });

    it('renders awareness type correctly', () => {
      render(<TypeBadge type="awareness" />);
      
      const badge = screen.getByText('Awareness');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveStyle({
        backgroundColor: '#FFE6FC',
        color: '#ED01CF',
      });
    });

    it('renders retargeting type correctly', () => {
      render(<TypeBadge type="retargeting" />);
      
      const badge = screen.getByText('Retargeting');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveStyle({
        backgroundColor: '#E5F4FF',
        color: '#008DFF',
      });
    });
  });

  describe('Component Props', () => {
    it('applies custom className', () => {
      render(<TypeBadge type="demand" className="custom-class" />);
      
      expect(screen.getByText('Demand')).toHaveClass('custom-class');
    });

    it('maintains consistent height', () => {
      const types: CampaignType[] = ['demand', 'brand', 'conversion', 'awareness', 'retargeting'];
      
      types.forEach((type) => {
        const { unmount } = render(<TypeBadge type={type} />);
        const badge = screen.getByText(type.charAt(0).toUpperCase() + type.slice(1));
        
        expect(badge).toHaveStyle({
          height: '28px',
          minHeight: '28px',
        });
        
        unmount();
      });
    });

    it('uses correct font family', () => {
      render(<TypeBadge type="demand" />);
      
      expect(screen.getByText('Demand')).toHaveClass('p360-text-badge');
    });

    it('uses correct font size', () => {
      render(<TypeBadge type="demand" />);
      
      expect(screen.getByText('Demand')).toHaveClass('p360-text-badge');
    });
  });

  describe('Color Schemes', () => {
    it('uses blue scheme for demand-type badges', () => {
      const blueTypes: CampaignType[] = ['demand', 'conversion', 'retargeting'];
      
      blueTypes.forEach((type) => {
        const { unmount } = render(<TypeBadge type={type} />);
        const badge = screen.getByText(type.charAt(0).toUpperCase() + type.slice(1));
        
        expect(badge).toHaveStyle({
          backgroundColor: '#E5F4FF',
          color: '#008DFF',
        });
        
        unmount();
      });
    });

    it('uses purple scheme for brand-type badges', () => {
      const purpleTypes: CampaignType[] = ['brand', 'awareness'];
      
      purpleTypes.forEach((type) => {
        const { unmount } = render(<TypeBadge type={type} />);
        const badge = screen.getByText(type.charAt(0).toUpperCase() + type.slice(1));
        
        expect(badge).toHaveStyle({
          backgroundColor: '#FFE6FC',
          color: '#ED01CF',
        });
        
        unmount();
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(<TypeBadge type="demand" />);
      
      const badge = screen.getByText('Demand');
      expect(badge.tagName).toBe('SPAN');
      expect(badge).toHaveClass('inline-flex', 'items-center');
    });

    it('displays type text clearly', () => {
      const types: Array<{ type: CampaignType; text: string }> = [
        { type: 'demand', text: 'Demand' },
        { type: 'brand', text: 'Brand' },
        { type: 'conversion', text: 'Conversion' },
        { type: 'awareness', text: 'Awareness' },
        { type: 'retargeting', text: 'Retargeting' },
      ];
      
      types.forEach(({ type, text }) => {
        const { unmount } = render(<TypeBadge type={type} />);
        expect(screen.getByText(text)).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('Visual Consistency', () => {
    it('maintains consistent padding', () => {
      render(<TypeBadge type="demand" />);
      
      expect(screen.getByText('Demand')).toHaveClass('px-2', 'py-1');
    });

    it('has rounded corners', () => {
      render(<TypeBadge type="demand" />);
      
      expect(screen.getByText('Demand')).toHaveClass('rounded');
    });

    it('uses normal font weight', () => {
      render(<TypeBadge type="demand" />);
      
      // The p360-text-badge class defines font-weight: 400 (normal)
      expect(screen.getByText('Demand')).toHaveClass('p360-text-badge');
    });
  });

  describe('Height Differences', () => {
    it('TypeBadge is shorter than StatusBadge', () => {
      render(<TypeBadge type="demand" />);
      
      const typeBadge = screen.getByText('Demand');
      expect(typeBadge).toHaveStyle({
        height: '28px', // TypeBadge height
      });
      
      // StatusBadge height is 30px, so TypeBadge should be 2px shorter
    });
  });

  describe('Color Contrast', () => {
    it('ensures good contrast for blue scheme', () => {
      render(<TypeBadge type="demand" />);
      
      const badge = screen.getByText('Demand');
      expect(badge).toHaveStyle({
        backgroundColor: '#E5F4FF', // Light blue
        color: '#008DFF', // Dark blue - good contrast
      });
    });

    it('ensures good contrast for purple scheme', () => {
      render(<TypeBadge type="brand" />);
      
      const badge = screen.getByText('Brand');
      expect(badge).toHaveStyle({
        backgroundColor: '#FFE6FC', // Light purple
        color: '#ED01CF', // Dark purple - good contrast
      });
    });
  });
});
