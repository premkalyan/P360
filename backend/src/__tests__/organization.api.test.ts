import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import app from '../index';
import { generateJWT } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

// Mock user for testing
const mockUser = {
  id: 'test-user-id',
  tenantId: 'test-tenant-id',
  email: 'test@p360.com',
  role: 'admin',
  isActive: true,
};

const mockManagerUser = {
  id: 'test-manager-id',
  tenantId: 'test-tenant-id',
  email: 'manager@p360.com',
  role: 'manager',
  isActive: true,
};

const mockViewerUser = {
  id: 'test-viewer-id',
  tenantId: 'test-tenant-id',
  email: 'viewer@p360.com',
  role: 'viewer',
  isActive: true,
};

// Test JWT tokens
const adminToken = generateJWT(mockUser);
const managerToken = generateJWT(mockManagerUser);
const viewerToken = generateJWT(mockViewerUser);

describe('Organization API', () => {
  let createdOrgId: string;

  beforeAll(async () => {
    // Clear test data
    await prisma.organization.deleteMany({
      where: { tenantId: 'test-tenant-id' },
    });
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.organization.deleteMany({
      where: { tenantId: 'test-tenant-id' },
    });
    await prisma.$disconnect();
  });

  describe('Authentication', () => {
    test('should reject requests without token', async () => {
      const response = await request(app)
        .get('/api/v1/organizations')
        .expect(401);

      expect(response.body).toEqual({
        error: 'Unauthorized',
        message: 'Authentication token required',
      });
    });

    test('should reject requests with invalid token', async () => {
      const response = await request(app)
        .get('/api/v1/organizations')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body).toEqual({
        error: 'Unauthorized',
        message: 'Invalid authentication token',
      });
    });

    test('should accept requests with valid token', async () => {
      const response = await request(app)
        .get('/api/v1/organizations')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
    });
  });

  describe('GET /api/v1/organizations', () => {
    test('should return empty list initially', async () => {
      const response = await request(app)
        .get('/api/v1/organizations')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.data).toEqual([]);
      expect(response.body.pagination).toEqual({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
      });
    });

    test('should support pagination parameters', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?page=2&limit=5')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.pagination.page).toBe(2);
      expect(response.body.pagination.limit).toBe(5);
    });

    test('should validate pagination parameters', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?page=0&limit=200')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400);

      expect(response.body.error).toBe('Validation Error');
    });
  });

  describe('POST /api/v1/organizations', () => {
    test('should create organization with valid data', async () => {
      const orgData = {
        name: 'Test Organization',
        type: 'advertiser',
        description: 'Test organization description',
        website: 'https://test.com',
        industry: 'Technology',
        size: 'large',
      };

      const response = await request(app)
        .post('/api/v1/organizations')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(orgData)
        .expect(201);

      expect(response.body.data).toMatchObject({
        name: orgData.name,
        type: orgData.type,
        description: orgData.description,
        website: orgData.website,
        industry: orgData.industry,
        size: orgData.size,
        status: 'active',
        tenantId: 'test-tenant-id',
      });

      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('createdAt');
      expect(response.body.data).toHaveProperty('updatedAt');
      expect(response.body.message).toBe('Organization created successfully');

      createdOrgId = response.body.data.id;
    });

    test('should reject duplicate organization names', async () => {
      const orgData = {
        name: 'Test Organization', // Same name as above
        type: 'publisher',
      };

      const response = await request(app)
        .post('/api/v1/organizations')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(orgData)
        .expect(409);

      expect(response.body.error).toBe('Conflict');
      expect(response.body.message).toBe('Organization with this name already exists');
    });

    test('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/v1/organizations')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({})
        .expect(400);

      expect(response.body.error).toBe('Validation Error');
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'name',
            message: expect.stringContaining('required'),
          }),
          expect.objectContaining({
            field: 'type',
            message: expect.stringContaining('required'),
          }),
        ])
      );
    });

    test('should validate data types and formats', async () => {
      const response = await request(app)
        .post('/api/v1/organizations')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Valid Name',
          type: 'invalid-type',
          website: 'not-a-url',
          industry: 'A'.repeat(101), // Too long
        })
        .expect(400);

      expect(response.body.error).toBe('Validation Error');
    });

    test('should reject requests from viewer role', async () => {
      const orgData = {
        name: 'Viewer Test Org',
        type: 'advertiser',
      };

      const response = await request(app)
        .post('/api/v1/organizations')
        .set('Authorization', `Bearer ${viewerToken}`)
        .send(orgData)
        .expect(403);

      expect(response.body.error).toBe('Forbidden');
    });

    test('should allow manager role to create organizations', async () => {
      const orgData = {
        name: 'Manager Test Org',
        type: 'publisher',
      };

      const response = await request(app)
        .post('/api/v1/organizations')
        .set('Authorization', `Bearer ${managerToken}`)
        .send(orgData)
        .expect(201);

      expect(response.body.data.name).toBe(orgData.name);
    });
  });

  describe('GET /api/v1/organizations/:id', () => {
    test('should return organization by ID', async () => {
      const response = await request(app)
        .get(`/api/v1/organizations/${createdOrgId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.data).toMatchObject({
        id: createdOrgId,
        name: 'Test Organization',
        type: 'advertiser',
      });
    });

    test('should return 404 for non-existent organization', async () => {
      const fakeId = '123e4567-e89b-12d3-a456-426614174000';
      const response = await request(app)
        .get(`/api/v1/organizations/${fakeId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);

      expect(response.body.error).toBe('Not Found');
    });

    test('should validate UUID format', async () => {
      const response = await request(app)
        .get('/api/v1/organizations/invalid-uuid')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400);

      expect(response.body.error).toBe('Validation Error');
    });
  });

  describe('PUT /api/v1/organizations/:id', () => {
    test('should update organization', async () => {
      const updateData = {
        name: 'Updated Test Organization',
        description: 'Updated description',
        status: 'inactive',
      };

      const response = await request(app)
        .put(`/api/v1/organizations/${createdOrgId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.data).toMatchObject(updateData);
      expect(response.body.message).toBe('Organization updated successfully');
    });

    test('should prevent name conflicts on update', async () => {
      const updateData = {
        name: 'Manager Test Org', // Name that already exists
      };

      const response = await request(app)
        .put(`/api/v1/organizations/${createdOrgId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData)
        .expect(409);

      expect(response.body.error).toBe('Conflict');
    });

    test('should reject updates from viewer role', async () => {
      const response = await request(app)
        .put(`/api/v1/organizations/${createdOrgId}`)
        .set('Authorization', `Bearer ${viewerToken}`)
        .send({ name: 'Viewer Update' })
        .expect(403);

      expect(response.body.error).toBe('Forbidden');
    });
  });

  describe('DELETE /api/v1/organizations/:id', () => {
    test('should reject delete from non-admin role', async () => {
      const response = await request(app)
        .delete(`/api/v1/organizations/${createdOrgId}`)
        .set('Authorization', `Bearer ${managerToken}`)
        .expect(403);

      expect(response.body.error).toBe('Forbidden');
    });

    test('should delete organization (admin only)', async () => {
      const response = await request(app)
        .delete(`/api/v1/organizations/${createdOrgId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.message).toBe('Organization deleted successfully');

      // Verify deletion
      const getResponse = await request(app)
        .get(`/api/v1/organizations/${createdOrgId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });
  });

  describe('Organization Filtering and Search', () => {
    beforeAll(async () => {
      // Create test organizations
      const testOrgs = [
        { name: 'Acme Corp', type: 'advertiser', industry: 'Technology' },
        { name: 'Beta Industries', type: 'publisher', industry: 'Media' },
        { name: 'Gamma Solutions', type: 'buyer', industry: 'Technology' },
      ];

      for (const org of testOrgs) {
        await request(app)
          .post('/api/v1/organizations')
          .set('Authorization', `Bearer ${adminToken}`)
          .send(org);
      }
    });

    test('should filter by type', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?type=advertiser')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].type).toBe('advertiser');
    });

    test('should search by name', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?search=Acme')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].name).toContain('Acme');
    });

    test('should sort by name', async () => {
      const response = await request(app)
        .get('/api/v1/organizations?sortBy=name&sortOrder=asc')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      const names = response.body.data.map((org: any) => org.name);
      expect(names).toEqual([...names].sort());
    });
  });

  describe('Rate Limiting', () => {
    test('should apply rate limiting', async () => {
      // Make multiple requests quickly
      const requests = Array(105).fill(null).map(() =>
        request(app)
          .get('/api/v1/organizations')
          .set('Authorization', `Bearer ${adminToken}`)
      );

      const responses = await Promise.all(requests);
      const rateLimitedResponses = responses.filter(res => res.status === 429);
      
      // Should have some rate limited responses
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });
  });
});
