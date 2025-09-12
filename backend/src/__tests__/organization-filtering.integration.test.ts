/**
 * P360-135: Organization API - Advanced Filtering and Sorting Integration Tests
 * Backend API tests for enhanced organization filtering functionality
 */

import request from 'supertest';
import { PrismaClient, UserRole, OrganizationType, OrganizationStatus, OrganizationSize } from '@prisma/client';
import app from '../index';
import { generateJWT } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

// Test JWT token
const testUser = {
  id: 'test-user-id',
  tenantId: 'test-tenant-id',
  email: 'test@p360.com',
  role: UserRole.admin
};

const authToken = generateJWT(testUser);

// Test organization data
const testOrganizations = [
  {
    id: 'org-1',
    tenantId: 'test-tenant-id',
    name: 'TechCorp Enterprise',
    type: OrganizationType.advertiser,
    status: OrganizationStatus.active,
    size: OrganizationSize.large,
    accountId: 'ORG-001',
    salesforceId: 'SF-001-ABC123',
    description: 'Leading technology company',
    contactEmail: 'contact@techcorp.com',
    website: 'https://techcorp.com',
  },
  {
    id: 'org-2',
    tenantId: 'test-tenant-id',
    name: 'Marketing Solutions Inc',
    type: OrganizationType.advertiser, // Note: changed from 'agency' to match Prisma enum
    status: OrganizationStatus.active,
    size: OrganizationSize.medium,
    accountId: 'ORG-002',
    salesforceId: 'SF-002-DEF456',
    description: 'Full-service marketing agency',
    contactEmail: 'hello@marketingsolutions.com',
    website: 'https://marketingsolutions.com',
  },
  {
    id: 'org-3',
    tenantId: 'test-tenant-id',
    name: 'Brand Publishers Network',
    type: OrganizationType.publisher,
    status: OrganizationStatus.suspended, // Note: changed from 'draft' to match Prisma enum
    size: OrganizationSize.startup,
    accountId: 'ORG-003',
    description: 'Digital publishing network',
    contactEmail: 'team@brandpublishers.com',
  },
];

describe('Organization API - P360-135 Advanced Filtering and Sorting', () => {
  beforeAll(async () => {
    // Create test user
    await prisma.user.upsert({
      where: { id: testUser.id },
      update: {},
      create: {
        id: testUser.id,
        tenantId: testUser.tenantId,
        email: testUser.email,
        role: testUser.role,
        firstName: 'Test',
        lastName: 'User',
        passwordHash: 'test-hash', // Required field for test user
        isActive: true,
      },
    });

    // Clean up existing test organizations
    await prisma.organization.deleteMany({
      where: { tenantId: 'test-tenant-id' },
    });

    // Create test organizations
    await prisma.organization.createMany({
      data: testOrganizations,
    });
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.organization.deleteMany({
      where: { tenantId: 'test-tenant-id' },
    });
    
    await prisma.user.deleteMany({
      where: { id: testUser.id },
    });

    await prisma.$disconnect();
  });

  describe('GET /api/v1/organizations - Basic Functionality', () => {
    it('should return all organizations without filters', async () => {
      const response = await request(app)
        .get('/api/v1/organizations')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(3);
      expect(response.body.pagination.total).toBe(3);
    });

    it('should require authentication', async () => {
      await request(app)
        .get('/api/v1/organizations')
        .expect(401);
    });

    it('should require tenant ID', async () => {
      await request(app)
        .get('/api/v1/organizations')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(401);
    });
  });

  describe('Search Functionality', () => {
    it('should filter organizations by name search', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?search=tech')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].name).toBe('TechCorp Enterprise');
    });

    it('should filter organizations by description search', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?search=marketing')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].description).toContain('marketing');
    });

    it('should be case-insensitive', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?search=TECH')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].name).toBe('TechCorp Enterprise');
    });

    it('should return empty results for non-matching search', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?search=nonexistent')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(0);
    });
  });

  describe('Type Filtering', () => {
    it('should filter organizations by advertiser type', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?type=advertiser')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].type).toBe('advertiser');
    });

    it('should filter organizations by agency type', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?type=agency')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].type).toBe('agency');
    });

    it('should filter organizations by publisher type', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?type=publisher')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].type).toBe('publisher');
    });

    it('should return empty results for non-existent type', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?type=brand')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(0);
    });
  });

  describe('Status Filtering', () => {
    it('should filter organizations by active status', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?status=active')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(2);
      expect(response.body.data.every((org: any) => org.status === 'active')).toBe(true);
    });

    it('should filter organizations by draft status', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?status=draft')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].status).toBe('draft');
    });

    it('should return empty results for inactive status', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?status=inactive')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(0);
    });
  });

  describe('Size Filtering (P360-135 Enhancement)', () => {
    it('should filter organizations by large size', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?size=large')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].size).toBe('large');
    });

    it('should filter organizations by medium size', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?size=medium')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].size).toBe('medium');
    });

    it('should filter organizations by startup size', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?size=startup')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].size).toBe('startup');
    });

    it('should return empty results for non-existent size', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?size=enterprise')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(0);
    });
  });

  describe('Sorting Functionality (P360-135 Enhancement)', () => {
    it('should sort organizations by name ascending', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?sortBy=name&sortOrder=asc')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(3);
      expect(response.body.data[0].name).toBe('Brand Publishers Network');
      expect(response.body.data[1].name).toBe('Marketing Solutions Inc');
      expect(response.body.data[2].name).toBe('TechCorp Enterprise');
    });

    it('should sort organizations by name descending', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?sortBy=name&sortOrder=desc')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(3);
      expect(response.body.data[0].name).toBe('TechCorp Enterprise');
      expect(response.body.data[1].name).toBe('Marketing Solutions Inc');
      expect(response.body.data[2].name).toBe('Brand Publishers Network');
    });

    it('should sort organizations by creation date descending (default)', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?sortBy=createdAt&sortOrder=desc')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(3);
      // Most recently created should be first
    });
  });

  describe('Combined Filtering and Sorting', () => {
    it('should apply multiple filters simultaneously', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?type=advertiser&status=active&size=large')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].name).toBe('TechCorp Enterprise');
      expect(response.body.data[0].type).toBe('advertiser');
      expect(response.body.data[0].status).toBe('active');
      expect(response.body.data[0].size).toBe('large');
    });

    it('should apply search with filters', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?search=tech&type=advertiser&status=active')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].name).toBe('TechCorp Enterprise');
    });

    it('should apply filters with sorting', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?status=active&sortBy=name&sortOrder=desc')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(2);
      expect(response.body.data[0].name).toBe('TechCorp Enterprise');
      expect(response.body.data[1].name).toBe('Marketing Solutions Inc');
    });

    it('should return empty results when filters have no matches', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?type=advertiser&status=draft')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(0);
    });
  });

  describe('Pagination with Filters', () => {
    it('should apply pagination to filtered results', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?status=active&page=1&limit=1')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.pagination.total).toBe(2);
      expect(response.body.pagination.totalPages).toBe(2);
      expect(response.body.pagination.hasNext).toBe(true);
      expect(response.body.pagination.hasPrev).toBe(false);
    });

    it('should calculate pagination correctly for second page', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?status=active&page=2&limit=1')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.pagination.page).toBe(2);
      expect(response.body.pagination.hasNext).toBe(false);
      expect(response.body.pagination.hasPrev).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid sort field gracefully', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?sortBy=invalidField&sortOrder=asc')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      // Should still return results, defaulting to valid sort
      expect(response.body.data).toHaveLength(3);
    });

    it('should handle invalid filter values gracefully', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?type=invalidType&status=invalidStatus')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      // Should return empty results for invalid filter values
      expect(response.body.data).toHaveLength(0);
    });

    it('should handle large page numbers gracefully', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?page=999&limit=10')
        .set('Authorization', `Bearer ${authToken}`)
        .set('x-tenant-id', 'test-tenant-id')
        .expect(200);

      expect(response.body.data).toHaveLength(0);
      expect(response.body.pagination.page).toBe(999);
      expect(response.body.pagination.hasNext).toBe(false);
    });
  });
});
