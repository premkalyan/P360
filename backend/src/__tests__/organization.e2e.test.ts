import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import app from '../index';
import { generateJWT } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

describe('Organization E2E Tests', () => {
  const testTenantId = 'e2e-test-tenant';
  const adminUser = {
    id: 'e2e-admin-id',
    tenantId: testTenantId,
    email: 'admin@e2e-test.com',
    role: 'admin',
    isActive: true,
  };

  const managerUser = {
    id: 'e2e-manager-id',
    tenantId: testTenantId,
    email: 'manager@e2e-test.com',
    role: 'manager',
    isActive: true,
  };

  const viewerUser = {
    id: 'e2e-viewer-id',
    tenantId: testTenantId,
    email: 'viewer@e2e-test.com',
    role: 'viewer',
    isActive: true,
  };

  const adminToken = generateJWT(adminUser);
  const managerToken = generateJWT(managerUser);
  const viewerToken = generateJWT(viewerUser);

  beforeAll(async () => {
    // Set up test environment
    await prisma.organization.deleteMany({
      where: { tenantId: testTenantId },
    });

    // Create test tenant
    await prisma.tenant.upsert({
      where: { id: testTenantId },
      update: {},
      create: {
        id: testTenantId,
        name: 'E2E Test Tenant',
        slug: 'e2e-test',
        status: 'active',
      },
    });

    // Create test users
    await prisma.user.upsert({
      where: { id: adminUser.id },
      update: {},
      create: {
        id: adminUser.id,
        tenantId: testTenantId,
        email: adminUser.email,
        passwordHash: 'hashed-password',
        role: adminUser.role as any,
      },
    });

    await prisma.user.upsert({
      where: { id: managerUser.id },
      update: {},
      create: {
        id: managerUser.id,
        tenantId: testTenantId,
        email: managerUser.email,
        passwordHash: 'hashed-password',
        role: managerUser.role as any,
      },
    });

    await prisma.user.upsert({
      where: { id: viewerUser.id },
      update: {},
      create: {
        id: viewerUser.id,
        tenantId: testTenantId,
        email: viewerUser.email,
        passwordHash: 'hashed-password',
        role: viewerUser.role as any,
      },
    });
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.organizationUser.deleteMany({
      where: { user: { tenantId: testTenantId } },
    });
    await prisma.organization.deleteMany({
      where: { tenantId: testTenantId },
    });
    await prisma.user.deleteMany({
      where: { tenantId: testTenantId },
    });
    await prisma.tenant.deleteMany({
      where: { id: testTenantId },
    });
    await prisma.$disconnect();
  });

  describe('Complete Organization Lifecycle', () => {
    let organizationId: string;

    test('Admin creates organization', async () => {
      const orgData = {
        name: 'E2E Test Corporation',
        type: 'advertiser',
        description: 'Full end-to-end test organization',
        website: 'https://e2e-test-corp.com',
        industry: 'Technology',
        size: 'large',
        settings: {
          features: ['analytics', 'reporting'],
          limits: { campaigns: 100 },
        },
        metadata: {
          source: 'e2e-test',
          priority: 'high',
        },
      };

      const response = await request(app)
        .post('/api/v1/organizations')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(orgData)
        .expect(201);

      expect(response.body.data).toMatchObject(orgData);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.tenantId).toBe(testTenantId);
      expect(response.body.data.status).toBe('active');
      expect(response.body.message).toBe('Organization created successfully');

      organizationId = response.body.data.id;
    });

    test('Manager can view organization', async () => {
      const response = await request(app)
        .get(`/api/v1/organizations/${organizationId}`)
        .set('Authorization', `Bearer ${managerToken}`)
        .expect(200);

      expect(response.body.data.id).toBe(organizationId);
      expect(response.body.data.name).toBe('E2E Test Corporation');
    });

    test('Viewer can view organization but cannot modify', async () => {
      // Can view
      await request(app)
        .get(`/api/v1/organizations/${organizationId}`)
        .set('Authorization', `Bearer ${viewerToken}`)
        .expect(200);

      // Cannot update
      await request(app)
        .put(`/api/v1/organizations/${organizationId}`)
        .set('Authorization', `Bearer ${viewerToken}`)
        .send({ name: 'Updated Name' })
        .expect(403);

      // Cannot delete
      await request(app)
        .delete(`/api/v1/organizations/${organizationId}`)
        .set('Authorization', `Bearer ${viewerToken}`)
        .expect(403);
    });

    test('Manager updates organization', async () => {
      const updateData = {
        name: 'Updated E2E Test Corporation',
        description: 'Updated description',
        status: 'inactive',
        settings: {
          features: ['analytics', 'reporting', 'integrations'],
          limits: { campaigns: 150 },
        },
      };

      const response = await request(app)
        .put(`/api/v1/organizations/${organizationId}`)
        .set('Authorization', `Bearer ${managerToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.data.name).toBe(updateData.name);
      expect(response.body.data.description).toBe(updateData.description);
      expect(response.body.data.status).toBe(updateData.status);
      expect(response.body.data.settings).toEqual(updateData.settings);
      expect(response.body.message).toBe('Organization updated successfully');
    });

    test('Admin adds users to organization', async () => {
      // Add manager to organization
      const addManagerResponse = await request(app)
        .post(`/api/v1/organizations/${organizationId}/users`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          userId: managerUser.id,
          role: 'manager',
        })
        .expect(201);

      expect(addManagerResponse.body.data.userId).toBe(managerUser.id);
      expect(addManagerResponse.body.data.role).toBe('manager');

      // Add viewer to organization
      await request(app)
        .post(`/api/v1/organizations/${organizationId}/users`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          userId: viewerUser.id,
          role: 'viewer',
        })
        .expect(201);
    });

    test('Admin retrieves organization users', async () => {
      const response = await request(app)
        .get(`/api/v1/organizations/${organizationId}/users`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.data).toHaveLength(2);
      
      const userEmails = response.body.data.map((ou: any) => ou.user.email);
      expect(userEmails).toContain(managerUser.email);
      expect(userEmails).toContain(viewerUser.email);
    });

    test('Manager cannot delete organization', async () => {
      await request(app)
        .delete(`/api/v1/organizations/${organizationId}`)
        .set('Authorization', `Bearer ${managerToken}`)
        .expect(403);
    });

    test('Admin deletes organization', async () => {
      const response = await request(app)
        .delete(`/api/v1/organizations/${organizationId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.message).toBe('Organization deleted successfully');

      // Verify deletion
      await request(app)
        .get(`/api/v1/organizations/${organizationId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });
  });

  describe('Multiple Organizations Management', () => {
    beforeAll(async () => {
      // Create multiple organizations for testing
      const organizations = [
        {
          name: 'Alpha E2E Corp',
          type: 'advertiser',
          industry: 'Technology',
          status: 'active',
        },
        {
          name: 'Beta E2E Industries',
          type: 'publisher',
          industry: 'Media',
          status: 'active',
        },
        {
          name: 'Gamma E2E Solutions',
          type: 'buyer',
          industry: 'Finance',
          status: 'inactive',
        },
      ];

      for (const org of organizations) {
        await request(app)
          .post('/api/v1/organizations')
          .set('Authorization', `Bearer ${adminToken}`)
          .send(org);
      }
    });

    test('Filter and search organizations', async () => {
      // Filter by type
      const advertiserResponse = await request(app)
        .get('/api/v1/organizations?type=advertiser')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(advertiserResponse.body.data).toHaveLength(1);
      expect(advertiserResponse.body.data[0].type).toBe('advertiser');

      // Filter by status
      const activeResponse = await request(app)
        .get('/api/v1/organizations?status=active')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(activeResponse.body.data).toHaveLength(2);

      // Search by name
      const searchResponse = await request(app)
        .get('/api/v1/organizations?search=Alpha')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(searchResponse.body.data).toHaveLength(1);
      expect(searchResponse.body.data[0].name).toContain('Alpha');
    });

    test('Pagination works correctly', async () => {
      // Get first page
      const page1Response = await request(app)
        .get('/api/v1/organizations?page=1&limit=2')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(page1Response.body.data).toHaveLength(2);
      expect(page1Response.body.pagination.page).toBe(1);
      expect(page1Response.body.pagination.limit).toBe(2);
      expect(page1Response.body.pagination.total).toBe(3);
      expect(page1Response.body.pagination.totalPages).toBe(2);
      expect(page1Response.body.pagination.hasNext).toBe(true);
      expect(page1Response.body.pagination.hasPrev).toBe(false);

      // Get second page
      const page2Response = await request(app)
        .get('/api/v1/organizations?page=2&limit=2')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(page2Response.body.data).toHaveLength(1);
      expect(page2Response.body.pagination.hasNext).toBe(false);
      expect(page2Response.body.pagination.hasPrev).toBe(true);
    });

    test('Sorting works correctly', async () => {
      // Sort by name ascending
      const ascResponse = await request(app)
        .get('/api/v1/organizations?sortBy=name&sortOrder=asc')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      const ascNames = ascResponse.body.data.map((org: any) => org.name);
      expect(ascNames).toEqual(['Alpha E2E Corp', 'Beta E2E Industries', 'Gamma E2E Solutions']);

      // Sort by name descending
      const descResponse = await request(app)
        .get('/api/v1/organizations?sortBy=name&sortOrder=desc')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      const descNames = descResponse.body.data.map((org: any) => org.name);
      expect(descNames).toEqual(['Gamma E2E Solutions', 'Beta E2E Industries', 'Alpha E2E Corp']);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    test('Invalid organization data returns validation errors', async () => {
      const invalidData = {
        name: '', // Empty name
        type: 'invalid-type',
        website: 'not-a-url',
        industry: 'A'.repeat(101), // Too long
      };

      const response = await request(app)
        .post('/api/v1/organizations')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(invalidData)
        .expect(400);

      expect(response.body.error).toBe('Validation Error');
      expect(response.body.details).toBeInstanceOf(Array);
      expect(response.body.details.length).toBeGreaterThan(0);
    });

    test('Duplicate organization names are rejected', async () => {
      const orgData = { name: 'Duplicate Test Org', type: 'advertiser' };

      // Create first organization
      await request(app)
        .post('/api/v1/organizations')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(orgData)
        .expect(201);

      // Try to create duplicate
      const duplicateResponse = await request(app)
        .post('/api/v1/organizations')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(orgData)
        .expect(409);

      expect(duplicateResponse.body.error).toBe('Conflict');
      expect(duplicateResponse.body.message).toBe('Organization with this name already exists');
    });

    test('Non-existent organization returns 404', async () => {
      const fakeId = '123e4567-e89b-12d3-a456-426614174000';

      await request(app)
        .get(`/api/v1/organizations/${fakeId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);

      await request(app)
        .put(`/api/v1/organizations/${fakeId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Updated Name' })
        .expect(404);

      await request(app)
        .delete(`/api/v1/organizations/${fakeId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });

    test('Invalid UUID format returns validation error', async () => {
      await request(app)
        .get('/api/v1/organizations/invalid-uuid')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400);
    });
  });

  describe('Cross-tenant Isolation', () => {
    const anotherTenantId = 'another-e2e-tenant';
    const anotherTenantUser = {
      id: 'another-tenant-admin',
      tenantId: anotherTenantId,
      email: 'admin@another-tenant.com',
      role: 'admin',
      isActive: true,
    };

    beforeAll(async () => {
      // Create another tenant
      await prisma.tenant.upsert({
        where: { id: anotherTenantId },
        update: {},
        create: {
          id: anotherTenantId,
          name: 'Another E2E Tenant',
          slug: 'another-e2e',
          status: 'active',
        },
      });

      // Create user in another tenant
      await prisma.user.upsert({
        where: { id: anotherTenantUser.id },
        update: {},
        create: {
          id: anotherTenantUser.id,
          tenantId: anotherTenantId,
          email: anotherTenantUser.email,
          passwordHash: 'hashed-password',
          role: anotherTenantUser.role as any,
        },
      });
    });

    test('Users cannot access organizations from other tenants', async () => {
      const anotherTenantToken = generateJWT(anotherTenantUser);

      // Create organization in original tenant
      const orgResponse = await request(app)
        .post('/api/v1/organizations')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Tenant Isolation Test Org',
          type: 'advertiser',
        })
        .expect(201);

      const orgId = orgResponse.body.data.id;

      // Try to access from another tenant
      await request(app)
        .get(`/api/v1/organizations/${orgId}`)
        .set('Authorization', `Bearer ${anotherTenantToken}`)
        .expect(404);

      // List organizations should be empty for other tenant
      const listResponse = await request(app)
        .get('/api/v1/organizations')
        .set('Authorization', `Bearer ${anotherTenantToken}`)
        .expect(200);

      expect(listResponse.body.data).toHaveLength(0);
    });
  });
});
