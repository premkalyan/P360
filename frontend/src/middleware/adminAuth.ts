/**
 * Admin Authentication Middleware for P360
 * Protects admin routes and enforces role-based access control
 */

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'manager' | 'analyst' | 'viewer';
  tenantId?: string | null;
}

/**
 * Get current user from localStorage
 * In production, this should validate JWT tokens
 */
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const userStr = localStorage.getItem('p360_user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

/**
 * Get current user role
 */
export const getCurrentUserRole = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return localStorage.getItem('p360_user_role');
  } catch (error) {
    console.error('Error accessing localStorage for user role:', error);
    return null;
  }
};

/**
 * Check if current user is admin
 */
export const isAdmin = (): boolean => {
  const role = getCurrentUserRole();
  return role === 'admin';
};

/**
 * Check if current user has required role
 */
export const hasRole = (requiredRole: string): boolean => {
  const currentRole = getCurrentUserRole();
  
  if (!currentRole) return false;
  
  // Admin has access to everything
  if (currentRole === 'admin') return true;
  
  return currentRole === requiredRole;
};

/**
 * Check if user has access to admin features
 */
export const canAccessAdmin = (): boolean => {
  return isAdmin();
};

/**
 * Redirect to appropriate page based on role
 */
export const getDefaultRoute = (role: string): string => {
  switch (role) {
    case 'admin':
      return '/admin/organizations';
    case 'manager':
    case 'analyst':
    case 'viewer':
    case 'user':
    default:
      return '/dashboard';
  }
};

/**
 * Clear user session
 */
export const clearUserSession = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('p360_user');
    localStorage.removeItem('p360_user_role');
  } catch (error) {
    console.error('Error clearing user session:', error);
  }
};

/**
 * Admin route protection hook
 * Returns: { isAuthorized, isLoading, user, redirectTo }
 */
export const useAdminAuth = () => {
  const user = getCurrentUser();
  const role = getCurrentUserRole();
  
  const isAuthorized = role === 'admin';
  const isLoading = false; // In production, this would handle async token validation
  const redirectTo = isAuthorized ? null : '/auth/login';

  return {
    isAuthorized,
    isLoading,
    user,
    role,
    redirectTo
  };
};
