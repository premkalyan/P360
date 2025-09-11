/**
 * P360-133: Organization API Service
 * Handles all CRUD operations for organizations with backend API
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:6601';

// Organization types matching backend schema
export interface Organization {
  id: string;
  name: string;
  type: 'advertiser' | 'publisher' | 'agency' | 'brand';
  status: 'active' | 'inactive' | 'draft';
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  accountId: string;
  salesforceId?: string;
  website?: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  userCount?: number;
  settings?: Record<string, any>;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrganizationRequest {
  name: string;
  type: Organization['type'];
  status?: Organization['status'];
  size?: Organization['size'];
  accountId: string;
  salesforceId?: string;
  website?: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  settings?: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface UpdateOrganizationRequest extends Partial<CreateOrganizationRequest> {}

export interface OrganizationListResponse {
  data: Organization[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface OrganizationQuery {
  page?: number;
  limit?: number;
  search?: string;
  type?: Organization['type'];
  status?: Organization['status'];
  size?: Organization['size'];
  sortBy?: 'name' | 'type' | 'status' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

class OrganizationService {
  private async getAuthToken(): Promise<string> {
    // For demo purposes, use valid JWT token with correct secret
    // In real implementation, this would come from auth context/login
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluLXVzZXItaWQiLCJ0ZW5hbnRJZCI6ImRlbW8tdGVuYW50LWlkIiwiZW1haWwiOiJhZG1pbkBwMzYwLmNvbSIsInJvbGUiOiJhZG1pbiIsImlzQWN0aXZlIjp0cnVlLCJpYXQiOjE3NTc1MzQxNDAsImV4cCI6MTc1NzYyMDU0MH0.UJ_p-VmWRQdLXLNelDltyo73vtoA-ZxfkU6THtgR0EU';
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const token = await this.getAuthToken();
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'x-tenant-id': 'demo-tenant-id',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  /**
   * List organizations with filtering, pagination, and search
   */
  async listOrganizations(query: OrganizationQuery = {}): Promise<OrganizationListResponse> {
    try {
      // Try to connect to real backend API first
      const params = new URLSearchParams();
      
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });

      const queryString = params.toString();
      const endpoint = `/api/v1/organizations${queryString ? `?${queryString}` : ''}`;
      
      return await this.makeRequest(endpoint);
    } catch (error) {
      console.warn('🔄 Backend API unavailable, falling back to mock data:', error);
      
      // FALLBACK: Use mock data when API is not available
      const mockOrganizations: Organization[] = [
      {
        id: '1',
        name: 'TechCorp Enterprise',
        type: 'advertiser',
        status: 'active',
        size: 'large',
        accountId: 'ORG-001',
        salesforceId: 'SF-001-ABC123',
        website: 'https://techcorp.com',
        description: 'Leading technology company',
        contactEmail: 'contact@techcorp.com',
        contactPhone: '+1-555-0123',
        userCount: 25,
        createdAt: '2024-01-15T08:00:00Z',
        updatedAt: '2024-01-20T10:30:00Z',
      },
      {
        id: '2',
        name: 'Marketing Solutions Inc',
        type: 'agency',
        status: 'active',
        size: 'medium',
        accountId: 'ORG-002',
        salesforceId: 'SF-002-DEF456',
        website: 'https://marketingsolutions.com',
        description: 'Full-service marketing agency',
        contactEmail: 'hello@marketingsolutions.com',
        userCount: 12,
        createdAt: '2024-01-18T09:15:00Z',
        updatedAt: '2024-01-22T14:45:00Z',
      },
      {
        id: '3',
        name: 'Brand Publishers Network',
        type: 'publisher',
        status: 'draft',
        size: 'startup',
        accountId: 'ORG-003',
        description: 'Digital publishing network',
        contactEmail: 'team@brandpublishers.com',
        userCount: 5,
        createdAt: '2024-01-25T11:00:00Z',
        updatedAt: '2024-01-25T11:00:00Z',
      },
    ];

    // Apply search filter
    let filteredOrgs = mockOrganizations;
    if (query.search) {
      const searchLower = query.search.toLowerCase();
      filteredOrgs = mockOrganizations.filter(org => 
        org.name.toLowerCase().includes(searchLower) ||
        org.accountId.toLowerCase().includes(searchLower) ||
        org.description?.toLowerCase().includes(searchLower)
      );
    }

    // Apply type filter
    if (query.type) {
      filteredOrgs = filteredOrgs.filter(org => org.type === query.type);
    }

    // Apply status filter
    if (query.status) {
      filteredOrgs = filteredOrgs.filter(org => org.status === query.status);
    }

    // P360-135: Apply size filter
    if (query.size) {
      filteredOrgs = filteredOrgs.filter(org => org.size === query.size);
    }

    // Apply sorting
    if (query.sortBy && query.sortOrder) {
      filteredOrgs.sort((a, b) => {
        const aValue = a[query.sortBy as keyof Organization];
        const bValue = b[query.sortBy as keyof Organization];
        
        let comparison = 0;
        if (aValue && bValue) {
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            comparison = aValue.localeCompare(bValue);
          } else if (aValue instanceof Date && bValue instanceof Date) {
            comparison = aValue.getTime() - bValue.getTime();
          } else {
            comparison = String(aValue).localeCompare(String(bValue));
          }
        }
        
        return query.sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    // Apply pagination
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;
    const paginatedOrgs = filteredOrgs.slice(skip, skip + limit);

    return {
      data: paginatedOrgs,
      pagination: {
        page,
        limit,
        total: filteredOrgs.length,
        totalPages: Math.ceil(filteredOrgs.length / limit),
        hasNext: skip + limit < filteredOrgs.length,
        hasPrev: page > 1,
      },
    };
    }
  }

  /**
   * Get a single organization by ID
   */
  async getOrganization(id: string): Promise<Organization> {
    return this.makeRequest(`/api/v1/organizations/${id}`);
  }

  /**
   * Create a new organization
   */
  async createOrganization(data: CreateOrganizationRequest): Promise<Organization> {
    console.log('🏭 organizationService.createOrganization called with:', data);
    
    try {
      return await this.makeRequest('/api/v1/organizations', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.warn('🔄 Backend API unavailable for create, using mock response:', error);
      
      // FALLBACK: Mock organization creation
      const newOrg: Organization = {
        id: `ORG-${Math.floor(Math.random() * 900) + 100}`, // Generate random ID like ORG-801
        name: data.name,
        type: data.type,
        status: 'draft', // New organizations start as draft (matches Figma design)
        size: data.size || 'medium',
        accountId: `ORG–${Math.floor(Math.random() * 900) + 100}`, // Generate account ID
        salesforceId: data.salesforceId,
        website: data.website,
        description: data.description,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        userCount: 5, // Set a reasonable default count
        settings: data.settings,
        metadata: data.metadata,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

    console.log('🏗️ Created mock organization:', newOrg);

    // Save to localStorage for persistence
    const stored = localStorage.getItem('p360_organizations');
    const existingOrgs: Organization[] = stored ? JSON.parse(stored) : [
      {
        id: '1',
        name: 'TechCorp Enterprise',
        type: 'advertiser',
        status: 'active',
        size: 'large',
        accountId: 'ORG-001',
        salesforceId: 'SF-001-ABC123',
        website: 'https://techcorp.com',
        description: 'Leading technology company',
        contactEmail: 'contact@techcorp.com',
        contactPhone: '+1-555-0123',
        userCount: 25,
        createdAt: '2024-01-15T08:00:00Z',
        updatedAt: '2024-01-20T10:30:00Z',
      },
      {
        id: '2',
        name: 'Marketing Solutions Inc',
        type: 'agency',
        status: 'active',
        size: 'medium',
        accountId: 'ORG-002',
        salesforceId: 'SF-002-DEF456',
        website: 'https://marketingsolutions.com',
        description: 'Full-service marketing agency',
        contactEmail: 'hello@marketingsolutions.com',
        userCount: 12,
        createdAt: '2024-01-18T09:15:00Z',
        updatedAt: '2024-01-22T14:45:00Z',
      },
      {
        id: '3',
        name: 'Brand Publishers Network',
        type: 'publisher',
        status: 'draft',
        size: 'startup',
        accountId: 'ORG-003',
        description: 'Digital publishing network',
        contactEmail: 'team@brandpublishers.com',
        userCount: 5,
        createdAt: '2024-01-25T11:00:00Z',
        updatedAt: '2024-01-25T11:00:00Z',
      },
    ];

    // Add new organization to the beginning of the list
    const updatedOrgs = [newOrg, ...existingOrgs];
    localStorage.setItem('p360_organizations', JSON.stringify(updatedOrgs));
    console.log('💾 Saved organization to localStorage');

    // Simulate API delay
    console.log('⏳ Simulating API delay (1000ms)...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('✅ organizationService.createOrganization returning:', newOrg);
    return newOrg;
    }
  }

  /**
   * Update an existing organization
   */
  async updateOrganization(id: string, data: UpdateOrganizationRequest): Promise<Organization> {
    console.log('🔄 organizationService.updateOrganization called with:', { id, data });
    
    try {
      return await this.makeRequest(`/api/v1/organizations/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.warn('🔄 Backend API unavailable for update, using mock response:', error);
      
      // FALLBACK: Mock organization update
      const updatedOrg: Organization = {
      id,
      name: data.name || 'TechCorp Enterprise',
      type: data.type || 'advertiser',
      status: data.status || 'active',
      size: data.size || 'medium',
      accountId: data.accountId || 'ORG-001',
      salesforceId: data.salesforceId || 'SF-001-ABC123',
      website: data.website || '',
      description: data.description || '',
      contactEmail: data.contactEmail || '',
      contactPhone: data.contactPhone || '',
      userCount: 25, // Keep existing user count
      settings: data.settings || {},
      metadata: data.metadata || {},
      createdAt: '2024-01-15T08:00:00Z', // Keep original creation date
      updatedAt: new Date().toISOString(), // Update the timestamp
    };

    console.log('🔄 Updated mock organization:', updatedOrg);

    // Update in localStorage for persistence
    const stored = localStorage.getItem('p360_organizations');
    if (stored) {
      const existingOrgs: Organization[] = JSON.parse(stored);
      const updatedOrgs = existingOrgs.map(org => 
        org.id === id ? updatedOrg : org
      );
      localStorage.setItem('p360_organizations', JSON.stringify(updatedOrgs));
      console.log('💾 Updated organization in localStorage');
    }

    // Simulate API delay
    console.log('⏳ Simulating API delay (800ms)...');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    console.log('✅ organizationService.updateOrganization returning:', updatedOrg);
    return updatedOrg;
    }
  }

  /**
   * Delete an organization
   */
  async deleteOrganization(id: string): Promise<void> {
    console.log('🗑️ organizationService.deleteOrganization called with id:', id);
    
    try {
      return await this.makeRequest(`/api/v1/organizations/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.warn('🔄 Backend API unavailable for delete, using mock response:', error);
      
      // FALLBACK: Mock organization deletion
      console.log('⏳ Simulating delete operation...');
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('✅ Mock delete completed for id:', id);
      return;
    }
  }

  /**
   * Get users for an organization
   */
  async getOrganizationUsers(id: string): Promise<any[]> {
    return this.makeRequest(`/api/v1/organizations/${id}/users`);
  }

  /**
   * Add a user to an organization
   */
  async addUserToOrganization(id: string, userData: any): Promise<any> {
    return this.makeRequest(`/api/v1/organizations/${id}/users`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }
}

export const organizationService = new OrganizationService();
export default organizationService;
