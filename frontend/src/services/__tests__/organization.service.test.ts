/**
 * P360-135: Organization Service - Advanced Filtering and Sorting Tests
 * Unit tests for enhanced organization service functionality
 */

import { organizationService, Organization, OrganizationQuery } from '../organization.service';

// Mock fetch for testing
global.fetch = jest.fn();

// Mock data for testing
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

describe('OrganizationService - P360-135 Advanced Filtering and Sorting', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe('Search Functionality', () => {
    it('should filter organizations by name search', async () => {
      // Mock API failure to trigger fallback
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ search: 'tech' });
      
      expect(result.data).toHaveLength(1);
      expect(result.data[0].name).toBe('TechCorp Enterprise');
    });

    it('should filter organizations by account ID search', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ search: 'ORG-002' });
      
      expect(result.data).toHaveLength(1);
      expect(result.data[0].accountId).toBe('ORG-002');
    });

    it('should filter organizations by description search', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ search: 'marketing' });
      
      expect(result.data).toHaveLength(1);
      expect(result.data[0].description).toContain('marketing');
    });

    it('should be case-insensitive', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ search: 'TECH' });
      
      expect(result.data).toHaveLength(1);
      expect(result.data[0].name).toBe('TechCorp Enterprise');
    });
  });

  describe('Type Filtering', () => {
    it('should filter organizations by advertiser type', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ type: 'advertiser' });
      
      expect(result.data).toHaveLength(1);
      expect(result.data[0].type).toBe('advertiser');
      expect(result.data[0].name).toBe('TechCorp Enterprise');
    });

    it('should filter organizations by agency type', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ type: 'agency' });
      
      expect(result.data).toHaveLength(1);
      expect(result.data[0].type).toBe('agency');
      expect(result.data[0].name).toBe('Marketing Solutions Inc');
    });

    it('should filter organizations by publisher type', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ type: 'publisher' });
      
      expect(result.data).toHaveLength(1);
      expect(result.data[0].type).toBe('publisher');
      expect(result.data[0].name).toBe('Brand Publishers Network');
    });

    it('should return empty results for non-existent type', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ type: 'brand' });
      
      expect(result.data).toHaveLength(0);
    });
  });

  describe('Status Filtering', () => {
    it('should filter organizations by active status', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ status: 'active' });
      
      expect(result.data).toHaveLength(2);
      expect(result.data.every(org => org.status === 'active')).toBe(true);
    });

    it('should filter organizations by draft status', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ status: 'draft' });
      
      expect(result.data).toHaveLength(1);
      expect(result.data[0].status).toBe('draft');
      expect(result.data[0].name).toBe('Brand Publishers Network');
    });

    it('should return empty results for inactive status', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ status: 'inactive' });
      
      expect(result.data).toHaveLength(0);
    });
  });

  describe('Size Filtering (P360-135 Enhancement)', () => {
    it('should filter organizations by large size', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ size: 'large' });
      
      expect(result.data).toHaveLength(1);
      expect(result.data[0].size).toBe('large');
      expect(result.data[0].name).toBe('TechCorp Enterprise');
    });

    it('should filter organizations by medium size', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ size: 'medium' });
      
      expect(result.data).toHaveLength(1);
      expect(result.data[0].size).toBe('medium');
      expect(result.data[0].name).toBe('Marketing Solutions Inc');
    });

    it('should filter organizations by startup size', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ size: 'startup' });
      
      expect(result.data).toHaveLength(1);
      expect(result.data[0].size).toBe('startup');
      expect(result.data[0].name).toBe('Brand Publishers Network');
    });

    it('should return empty results for non-existent size', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ size: 'enterprise' });
      
      expect(result.data).toHaveLength(0);
    });
  });

  describe('Sorting Functionality (P360-135 Enhancement)', () => {
    it('should sort organizations by name ascending', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ 
        sortBy: 'name', 
        sortOrder: 'asc' 
      });
      
      expect(result.data).toHaveLength(3);
      expect(result.data[0].name).toBe('Brand Publishers Network');
      expect(result.data[1].name).toBe('Marketing Solutions Inc');
      expect(result.data[2].name).toBe('TechCorp Enterprise');
    });

    it('should sort organizations by name descending', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ 
        sortBy: 'name', 
        sortOrder: 'desc' 
      });
      
      expect(result.data).toHaveLength(3);
      expect(result.data[0].name).toBe('TechCorp Enterprise');
      expect(result.data[1].name).toBe('Marketing Solutions Inc');
      expect(result.data[2].name).toBe('Brand Publishers Network');
    });

    it('should sort organizations by creation date ascending (oldest first)', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ 
        sortBy: 'createdAt', 
        sortOrder: 'asc' 
      });
      
      expect(result.data).toHaveLength(3);
      expect(result.data[0].name).toBe('TechCorp Enterprise'); // 2024-01-15
      expect(result.data[1].name).toBe('Marketing Solutions Inc'); // 2024-01-18
      expect(result.data[2].name).toBe('Brand Publishers Network'); // 2024-01-25
    });

    it('should sort organizations by creation date descending (newest first)', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ 
        sortBy: 'createdAt', 
        sortOrder: 'desc' 
      });
      
      expect(result.data).toHaveLength(3);
      expect(result.data[0].name).toBe('Brand Publishers Network'); // 2024-01-25
      expect(result.data[1].name).toBe('Marketing Solutions Inc'); // 2024-01-18
      expect(result.data[2].name).toBe('TechCorp Enterprise'); // 2024-01-15
    });
  });

  describe('Combined Filtering and Sorting', () => {
    it('should apply multiple filters simultaneously', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ 
        type: 'advertiser',
        status: 'active',
        size: 'large'
      });
      
      expect(result.data).toHaveLength(1);
      expect(result.data[0].name).toBe('TechCorp Enterprise');
      expect(result.data[0].type).toBe('advertiser');
      expect(result.data[0].status).toBe('active');
      expect(result.data[0].size).toBe('large');
    });

    it('should apply search with filters', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ 
        search: 'tech',
        type: 'advertiser',
        status: 'active'
      });
      
      expect(result.data).toHaveLength(1);
      expect(result.data[0].name).toBe('TechCorp Enterprise');
    });

    it('should apply filters with sorting', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ 
        status: 'active',
        sortBy: 'name',
        sortOrder: 'desc'
      });
      
      expect(result.data).toHaveLength(2);
      expect(result.data[0].name).toBe('TechCorp Enterprise');
      expect(result.data[1].name).toBe('Marketing Solutions Inc');
    });

    it('should return empty results when filters have no matches', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ 
        type: 'advertiser',
        status: 'draft' // No advertiser organizations are in draft status
      });
      
      expect(result.data).toHaveLength(0);
    });
  });

  describe('Pagination with Filters', () => {
    it('should apply pagination to filtered results', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ 
        status: 'active',
        page: 1,
        limit: 1
      });
      
      expect(result.data).toHaveLength(1);
      expect(result.pagination.total).toBe(2);
      expect(result.pagination.totalPages).toBe(2);
      expect(result.pagination.hasNext).toBe(true);
      expect(result.pagination.hasPrev).toBe(false);
    });

    it('should calculate pagination correctly for filtered results', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('API unavailable'));

      const result = await organizationService.listOrganizations({ 
        status: 'active',
        page: 2,
        limit: 1
      });
      
      expect(result.data).toHaveLength(1);
      expect(result.pagination.page).toBe(2);
      expect(result.pagination.hasNext).toBe(false);
      expect(result.pagination.hasPrev).toBe(true);
    });
  });

  describe('API Integration', () => {
    it('should use API when available', async () => {
      const mockResponse = {
        data: [mockOrganizations[0]],
        pagination: {
          page: 1,
          limit: 20,
          total: 1,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        },
      };

      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await organizationService.listOrganizations({ type: 'advertiser' });
      
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/organizations?type=advertiser'),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': expect.stringContaining('Bearer'),
            'x-tenant-id': 'demo-tenant-id',
          }),
        })
      );
      
      expect(result).toEqual(mockResponse);
    });

    it('should fallback to mock data when API fails', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const result = await organizationService.listOrganizations();
      
      expect(result.data).toHaveLength(3);
      expect(result.data[0].name).toBe('TechCorp Enterprise');
    });
  });
});
