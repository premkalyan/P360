/**
 * P360-131: Admin Post-Login Routing Tests
 * Comprehensive test suite for role-based authentication and routing
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import LoginPage from '../../app/auth/login/page';
import AdminOrganizationsPage from '../../app/admin/organizations/page';
import AdminLayout from '../../app/admin/layout';
import { 
  getCurrentUser, 
  getCurrentUserRole, 
  isAdmin, 
  hasRole, 
  canAccessAdmin,
  getDefaultRoute,
  clearUserSession,
  useAdminAuth
} from '../../middleware/adminAuth';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('P360-131: Admin Post-Login Routing', () => {
  const mockPush = jest.fn();
  const mockRouter = {
    push: mockPush,
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    // Use fake timers to speed up authentication delay
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('🔐 Role-Based Authentication Logic', () => {
    it('identifies admin users correctly by email pattern', async () => {
      render(<LoginPage />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email here...');
      const passwordInput = screen.getByPlaceholderText('Enter your password here...');
      const loginButton = screen.getByRole('button', { name: 'Login' });

      fireEvent.change(emailInput, { target: { value: 'admin@p360admin.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      const form = emailInput.closest('form');
      fireEvent.submit(form!);

      // Fast-forward through the authentication delay
      jest.runAllTimers();

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/admin/organizations');
      });

      // Check that admin user data is stored correctly
      const storedUser = JSON.parse(mockLocalStorage.getItem('p360_user') || '{}');
      expect(storedUser.role).toBe('admin');
      expect(storedUser.email).toBe('admin@p360admin.com');
      expect(mockLocalStorage.getItem('p360_user_role')).toBe('admin');
    });

    it('identifies regular users and routes to dashboard', async () => {
      render(<LoginPage />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email here...');
      const passwordInput = screen.getByPlaceholderText('Enter your password here...');
      const loginButton = screen.getByRole('button', { name: 'Login' });

      fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      const form = emailInput.closest('form');
      fireEvent.submit(form!);

      // Fast-forward through the authentication delay
      jest.runAllTimers();

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      });

      // Check that regular user data is stored correctly
      const storedUser = JSON.parse(mockLocalStorage.getItem('p360_user') || '{}');
      expect(storedUser.role).toBe('user');
      expect(storedUser.tenantId).toBe('tenant-1');
      expect(mockLocalStorage.getItem('p360_user_role')).toBe('user');
    });

    it('handles admin email patterns correctly', async () => {
      const testCases = [
        { email: 'admin@company.com', expectedRoute: '/admin/organizations', expectedRole: 'admin' },
        { email: 'superadmin@test.com', expectedRoute: '/admin/organizations', expectedRole: 'admin' },
        { email: 'user@p360admin.com', expectedRoute: '/admin/organizations', expectedRole: 'admin' },
        { email: 'manager@company.com', expectedRoute: '/dashboard', expectedRole: 'user' },
      ];

      for (const testCase of testCases) {
        mockPush.mockClear();
        mockLocalStorage.clear();
        
        const { unmount } = render(<LoginPage />);
        
        const emailInput = screen.getByPlaceholderText('Enter your email here...');
        const passwordInput = screen.getByPlaceholderText('Enter your password here...');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(emailInput, { target: { value: testCase.email } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        
        const form = emailInput.closest('form');
        fireEvent.submit(form!);

        // Fast-forward through the authentication delay
        jest.runAllTimers();

        await waitFor(() => {
          expect(mockPush).toHaveBeenCalledWith(testCase.expectedRoute);
        });

        expect(mockLocalStorage.getItem('p360_user_role')).toBe(testCase.expectedRole);
        
        // Cleanup for next iteration
        unmount();
      }
    });
  });

  describe('🛡️ Admin Auth Middleware', () => {
    beforeEach(() => {
      mockLocalStorage.clear();
    });

    it('getCurrentUser returns null when no user is stored', () => {
      expect(getCurrentUser()).toBeNull();
    });

    it('getCurrentUser returns user data when stored', () => {
      const mockUser = {
        id: '1',
        email: 'admin@test.com',
        name: 'admin',
        role: 'admin' as const,
        tenantId: null
      };
      
      mockLocalStorage.setItem('p360_user', JSON.stringify(mockUser));
      
      const user = getCurrentUser();
      expect(user).toEqual(mockUser);
    });

    it('getCurrentUserRole returns correct role', () => {
      mockLocalStorage.setItem('p360_user_role', 'admin');
      expect(getCurrentUserRole()).toBe('admin');
      
      mockLocalStorage.setItem('p360_user_role', 'user');
      expect(getCurrentUserRole()).toBe('user');
    });

    it('isAdmin returns true for admin users', () => {
      mockLocalStorage.setItem('p360_user_role', 'admin');
      expect(isAdmin()).toBe(true);
      
      mockLocalStorage.setItem('p360_user_role', 'user');
      expect(isAdmin()).toBe(false);
    });

    it('hasRole works correctly for different roles', () => {
      mockLocalStorage.setItem('p360_user_role', 'admin');
      expect(hasRole('admin')).toBe(true);
      expect(hasRole('user')).toBe(true); // Admin has access to everything
      
      mockLocalStorage.setItem('p360_user_role', 'user');
      expect(hasRole('admin')).toBe(false);
      expect(hasRole('user')).toBe(true);
    });

    it('canAccessAdmin returns correct access', () => {
      mockLocalStorage.setItem('p360_user_role', 'admin');
      expect(canAccessAdmin()).toBe(true);
      
      mockLocalStorage.setItem('p360_user_role', 'user');
      expect(canAccessAdmin()).toBe(false);
    });

    it('getDefaultRoute returns correct routes for roles', () => {
      expect(getDefaultRoute('admin')).toBe('/admin/organizations');
      expect(getDefaultRoute('user')).toBe('/dashboard');
      expect(getDefaultRoute('manager')).toBe('/dashboard');
      expect(getDefaultRoute('analyst')).toBe('/dashboard');
    });

    it('clearUserSession removes all user data', () => {
      mockLocalStorage.setItem('p360_user', '{"id":"1"}');
      mockLocalStorage.setItem('p360_user_role', 'admin');
      
      clearUserSession();
      
      expect(mockLocalStorage.getItem('p360_user')).toBeNull();
      expect(mockLocalStorage.getItem('p360_user_role')).toBeNull();
    });
  });

  describe('🔒 Admin Layout Protection', () => {
    it('renders loading state initially', () => {
      // Clear localStorage to simulate initial unmounted state
      mockLocalStorage.clear();
      
      render(
        <AdminLayout>
          <div>Admin Content</div>
        </AdminLayout>
      );

      // Should show loading during initial hydration
      expect(screen.queryByText('Loading admin dashboard...') || screen.queryByText('Access Denied')).toBeInTheDocument();
    });

    it('renders access denied for non-admin users', async () => {
      mockLocalStorage.setItem('p360_user_role', 'user');
      
      render(
        <AdminLayout>
          <div>Admin Content</div>
        </AdminLayout>
      );

      await waitFor(() => {
        expect(screen.getByText('Access Denied')).toBeInTheDocument();
        expect(screen.getByText('You need admin privileges to access this area.')).toBeInTheDocument();
      });
    });

    it('renders admin layout for admin users', async () => {
      const mockAdminUser = {
        id: '1',
        email: 'admin@test.com',
        name: 'Test Admin',
        role: 'admin' as const,
        tenantId: null
      };
      
      mockLocalStorage.setItem('p360_user', JSON.stringify(mockAdminUser));
      mockLocalStorage.setItem('p360_user_role', 'admin');
      
      render(
        <AdminLayout>
          <div>Admin Content</div>
        </AdminLayout>
      );

      await waitFor(() => {
        expect(screen.getByText('P360 Admin')).toBeInTheDocument();
        expect(screen.getByText('Welcome, Test Admin')).toBeInTheDocument();
        expect(screen.getByText('Admin Content')).toBeInTheDocument();
      });
    });

    it('has proper navigation links for admin users', async () => {
      const mockAdminUser = {
        id: '1',
        email: 'admin@test.com',
        name: 'Test Admin',
        role: 'admin' as const,
        tenantId: null
      };
      
      mockLocalStorage.setItem('p360_user', JSON.stringify(mockAdminUser));
      mockLocalStorage.setItem('p360_user_role', 'admin');
      
      render(
        <AdminLayout>
          <div>Admin Content</div>
        </AdminLayout>
      );

      await waitFor(() => {
        expect(screen.getByText('Organizations')).toBeInTheDocument();
        expect(screen.getByText('Users')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('Switch to User View')).toBeInTheDocument();
      });
    });
  });

  describe('🏢 Admin Organizations Page', () => {
    it('renders organization management interface', () => {
      render(<AdminOrganizationsPage />);

      expect(screen.getByText('Organization Management')).toBeInTheDocument();
      expect(screen.getByText('Manage organizations, users, and system settings as an admin user.')).toBeInTheDocument();
      expect(screen.getByText('Create Organization')).toBeInTheDocument();
      expect(screen.getByText('System Settings')).toBeInTheDocument();
    });

    it('displays organizations table with mock data', () => {
      render(<AdminOrganizationsPage />);

      expect(screen.getByText('Acme Corp')).toBeInTheDocument();
      expect(screen.getByText('TechStart Inc')).toBeInTheDocument();
      expect(screen.getByText('acme-corp')).toBeInTheDocument();
      expect(screen.getByText('techstart-inc')).toBeInTheDocument();
    });

    it('shows correct statistics', () => {
      render(<AdminOrganizationsPage />);

      // Check user count (24 + 8 = 32)
      expect(screen.getByText('32 Users')).toBeInTheDocument();
      
      // Check campaign count (12 + 3 = 15)
      expect(screen.getByText('15 Campaigns')).toBeInTheDocument();
    });

    it('has proper action links for each organization', () => {
      render(<AdminOrganizationsPage />);

      const viewLinks = screen.getAllByText('View');
      const editLinks = screen.getAllByText('Edit');
      const userLinks = screen.getAllByRole('link', { name: 'Users' });

      expect(viewLinks).toHaveLength(2); // One for each org
      expect(editLinks).toHaveLength(2);
      expect(userLinks).toHaveLength(2);
    });
  });

  describe('🔄 Integration Tests', () => {
    it('complete admin login flow works end-to-end', async () => {
      // Start with login
      render(<LoginPage />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email here...');
      const passwordInput = screen.getByPlaceholderText('Enter your password here...');
      const loginButton = screen.getByRole('button', { name: 'Login' });

      fireEvent.change(emailInput, { target: { value: 'admin@p360admin.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      const form = emailInput.closest('form');
      fireEvent.submit(form!);

      // Fast-forward through the authentication delay
      jest.runAllTimers();

      // Verify routing happened
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/admin/organizations');
      });

      // Verify user session is properly set
      const storedUser = getCurrentUser();
      expect(storedUser?.role).toBe('admin');
      expect(getCurrentUserRole()).toBe('admin');
      expect(isAdmin()).toBe(true);
      expect(canAccessAdmin()).toBe(true);
    });

    it('regular user login flow works correctly', async () => {
      render(<LoginPage />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email here...');
      const passwordInput = screen.getByPlaceholderText('Enter your password here...');
      const loginButton = screen.getByRole('button', { name: 'Login' });

      fireEvent.change(emailInput, { target: { value: 'user@company.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      const form = emailInput.closest('form');
      fireEvent.submit(form!);

      // Fast-forward through the authentication delay
      jest.runAllTimers();

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      });

      const storedUser = getCurrentUser();
      expect(storedUser?.role).toBe('user');
      expect(getCurrentUserRole()).toBe('user');
      expect(isAdmin()).toBe(false);
      expect(canAccessAdmin()).toBe(false);
    });
  });

  describe('🧹 Security & Edge Cases', () => {
    it('handles malformed localStorage data gracefully', () => {
      mockLocalStorage.setItem('p360_user', 'invalid-json');
      
      expect(getCurrentUser()).toBeNull();
    });

    it('handles missing localStorage gracefully', () => {
      // Mock localStorage to throw an error instead of deleting it
      const originalGetItem = mockLocalStorage.getItem;
      mockLocalStorage.getItem = () => {
        throw new Error('localStorage not available');
      };
      
      expect(getCurrentUser()).toBeNull();
      expect(getCurrentUserRole()).toBeNull();
      
      // Restore localStorage
      mockLocalStorage.getItem = originalGetItem;
    });

    it('prevents access without proper authentication', () => {
      mockLocalStorage.clear();
      
      expect(isAdmin()).toBe(false);
      expect(canAccessAdmin()).toBe(false);
      expect(hasRole('admin')).toBe(false);
    });
  });
});
