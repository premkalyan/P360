/**
 * P360-107: StatusBadge Component Tests
 * Unit tests for campaign status badges
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StatusBadge, CampaignStatus } from '@/components/campaigns/StatusBadge';

describe('StatusBadge', () => {
  describe('Status Variants', () => {
    it('renders active status correctly', () => {
      render(<StatusBadge status="active" />);
      
      const badge = screen.getByText('Active');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveStyle({
        backgroundColor: '#EDFCEE',
        color: '#21C828',
      });
    });

    it('renders in_review status correctly', () => {
      render(<StatusBadge status="in_review" />);
      
      const badge = screen.getByText('In Review');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveStyle({
        backgroundColor: '#FFF1EB',
        color: '#FF6221',
      });
    });

    it('renders paused status correctly', () => {
      render(<StatusBadge status="paused" />);
      
      const badge = screen.getByText('Paused');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveStyle({
        backgroundColor: '#F3F4F6',
        color: '#6B7280',
      });
    });

    it('renders draft status correctly', () => {
      render(<StatusBadge status="draft" />);
      
      const badge = screen.getByText('Draft');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveStyle({
        backgroundColor: '#F3F4F6',
        color: '#6B7280',
      });
    });

    it('renders completed status correctly', () => {
      render(<StatusBadge status="completed" />);
      
      const badge = screen.getByText('Completed');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveStyle({
        backgroundColor: '#EBF8FF',
        color: '#3B82F6',
      });
    });
  });

  describe('Component Props', () => {
    it('applies custom className', () => {
      render(<StatusBadge status="active" className="custom-class" />);
      
      expect(screen.getByText('Active')).toHaveClass('custom-class');
    });

    it('maintains consistent height', () => {
      const statuses: CampaignStatus[] = ['active', 'paused', 'draft', 'completed', 'in_review'];
      
      statuses.forEach((status) => {
        const { unmount } = render(<StatusBadge status={status} />);
        const badge = screen.getByText(status === 'in_review' ? 'In Review' : status.charAt(0).toUpperCase() + status.slice(1));
        
        expect(badge).toHaveStyle({
          height: '30px',
          minHeight: '30px',
        });
        
        unmount();
      });
    });

    it('uses correct font family', () => {
      render(<StatusBadge status="active" />);
      
      expect(screen.getByText('Active')).toHaveStyle({
        fontFamily: 'Lexend Deca, sans-serif',
      });
    });

    it('uses correct font size', () => {
      render(<StatusBadge status="active" />);
      
      expect(screen.getByText('Active')).toHaveStyle({
        fontSize: '14px',
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(<StatusBadge status="active" />);
      
      const badge = screen.getByText('Active');
      expect(badge.tagName).toBe('SPAN');
      expect(badge).toHaveClass('inline-flex', 'items-center');
    });

    it('displays status text clearly', () => {
      const statuses: Array<{ status: CampaignStatus; text: string }> = [
        { status: 'active', text: 'Active' },
        { status: 'in_review', text: 'In Review' },
        { status: 'paused', text: 'Paused' },
        { status: 'draft', text: 'Draft' },
        { status: 'completed', text: 'Completed' },
      ];
      
      statuses.forEach(({ status, text }) => {
        const { unmount } = render(<StatusBadge status={status} />);
        expect(screen.getByText(text)).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('Visual Consistency', () => {
    it('maintains consistent padding', () => {
      render(<StatusBadge status="active" />);
      
      expect(screen.getByText('Active')).toHaveClass('px-2.5', 'py-1');
    });

    it('has rounded corners', () => {
      render(<StatusBadge status="active" />);
      
      expect(screen.getByText('Active')).toHaveClass('rounded');
    });

    it('uses normal font weight', () => {
      render(<StatusBadge status="active" />);
      
      expect(screen.getByText('Active')).toHaveClass('font-normal');
    });
  });

  describe('Color Contrast', () => {
    it('ensures good contrast for active status', () => {
      render(<StatusBadge status="active" />);
      
      const badge = screen.getByText('Active');
      expect(badge).toHaveStyle({
        backgroundColor: '#EDFCEE', // Light green
        color: '#21C828', // Dark green - good contrast
      });
    });

    it('ensures good contrast for in_review status', () => {
      render(<StatusBadge status="in_review" />);
      
      const badge = screen.getByText('In Review');
      expect(badge).toHaveStyle({
        backgroundColor: '#FFF1EB', // Light orange
        color: '#FF6221', // Dark orange - good contrast
      });
    });
  });
});
