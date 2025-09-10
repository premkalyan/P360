import { PrismaClient } from '@prisma/client';
import { OrganizationType, OrganizationStatus, OrganizationSize } from '@prisma/client';

const prisma = new PrismaClient();

describe('Organization Database Integration', () => {
  const testTenantId = 'integration-test-tenant';
  let createdOrgId: string;

  beforeAll(async () => {
    // Clean up any existing test data
    await prisma.organization.deleteMany({
      where: { tenantId: testTenantId },
    });

    // Create test tenant if needed
    await prisma.tenant.upsert({
      where: { id: testTenantId },
      update: {},
      create: {
        id: testTenantId,
        name: 'Integration Test Tenant',
        slug: 'integration-test',
        status: 'active',
      },
    });
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.organization.deleteMany({
      where: { tenantId: testTenantId },
    });
    await prisma.tenant.delete({
      where: { id: testTenantId },
    }).catch(() => {}); // Ignore if not exists

    await prisma.$disconnect();
  });

  describe('Organization CRUD Operations', () => {
    test('should create organization with all fields', async () => {
      const orgData = {
        tenantId: testTenantId,
        name: 'Integration Test Organization',
        type: OrganizationType.advertiser,
        status: OrganizationStatus.active,
        description: 'A comprehensive test organization',
        website: 'https://integration-test.com',
        industry: 'Technology',
        size: OrganizationSize.large,
        settings: { feature1: true, feature2: false },
        metadata: { source: 'integration-test', version: '1.0' },
      };

      const organization = await prisma.organization.create({
        data: orgData,
      });

      expect(organization).toMatchObject(orgData);
      expect(organization.id).toBeDefined();
      expect(organization.createdAt).toBeInstanceOf(Date);
      expect(organization.updatedAt).toBeInstanceOf(Date);

      createdOrgId = organization.id;
    });

    test('should read organization with relations', async () => {
      const organization = await prisma.organization.findUnique({
        where: { id: createdOrgId },
        include: {
          tenant: true,
          _count: {
            select: {
              campaigns: true,
              organizationUsers: true,
            },
          },
        },
      });

      expect(organization).toBeTruthy();
      expect(organization?.tenant.name).toBe('Integration Test Tenant');
      expect(organization?._count.campaigns).toBe(0);
      expect(organization?._count.organizationUsers).toBe(0);
    });

    test('should update organization', async () => {
      const updateData = {
        name: 'Updated Integration Test Organization',
        status: OrganizationStatus.inactive,
        description: 'Updated description',
        settings: { feature1: false, feature3: true },
      };

      const updatedOrg = await prisma.organization.update({
        where: { id: createdOrgId },
        data: updateData,
      });

      expect(updatedOrg.name).toBe(updateData.name);
      expect(updatedOrg.status).toBe(updateData.status);
      expect(updatedOrg.description).toBe(updateData.description);
      expect(updatedOrg.settings).toEqual(updateData.settings);
      expect(updatedOrg.updatedAt.getTime()).toBeGreaterThan(updatedOrg.createdAt.getTime());
    });

    test('should delete organization', async () => {
      await prisma.organization.delete({
        where: { id: createdOrgId },
      });

      const deletedOrg = await prisma.organization.findUnique({
        where: { id: createdOrgId },
      });

      expect(deletedOrg).toBeNull();
    });
  });

  describe('Organization Queries and Filters', () => {
    beforeAll(async () => {
      // Create multiple organizations for testing
      const organizations = [
        {
          tenantId: testTenantId,
          name: 'Alpha Corporation',
          type: OrganizationType.advertiser,
          status: OrganizationStatus.active,
          industry: 'Technology',
          size: OrganizationSize.large,
        },
        {
          tenantId: testTenantId,
          name: 'Beta Industries',
          type: OrganizationType.publisher,
          status: OrganizationStatus.inactive,
          industry: 'Media',
          size: OrganizationSize.medium,
        },
        {
          tenantId: testTenantId,
          name: 'Gamma Solutions',
          type: OrganizationType.buyer,
          status: OrganizationStatus.active,
          industry: 'Technology',
          size: OrganizationSize.small,
        },
      ];

      await prisma.organization.createMany({
        data: organizations,
      });
    });

    test('should filter by type', async () => {
      const advertisers = await prisma.organization.findMany({
        where: {
          tenantId: testTenantId,
          type: OrganizationType.advertiser,
        },
      });

      expect(advertisers).toHaveLength(1);
      expect(advertisers[0].name).toBe('Alpha Corporation');
    });

    test('should filter by status', async () => {
      const activeOrgs = await prisma.organization.findMany({
        where: {
          tenantId: testTenantId,
          status: OrganizationStatus.active,
        },
      });

      expect(activeOrgs).toHaveLength(2);
    });

    test('should search by name', async () => {
      const results = await prisma.organization.findMany({
        where: {
          tenantId: testTenantId,
          name: {
            contains: 'Alpha',
            mode: 'insensitive',
          },
        },
      });

      expect(results).toHaveLength(1);
      expect(results[0].name).toContain('Alpha');
    });

    test('should search across multiple fields', async () => {
      const results = await prisma.organization.findMany({
        where: {
          tenantId: testTenantId,
          OR: [
            { name: { contains: 'Technology', mode: 'insensitive' } },
            { industry: { contains: 'Technology', mode: 'insensitive' } },
          ],
        },
      });

      expect(results).toHaveLength(2); // Alpha and Gamma have Technology industry
    });

    test('should sort organizations', async () => {
      const sortedByName = await prisma.organization.findMany({
        where: { tenantId: testTenantId },
        orderBy: { name: 'asc' },
      });

      const names = sortedByName.map(org => org.name);
      expect(names).toEqual(['Alpha Corporation', 'Beta Industries', 'Gamma Solutions']);
    });

    test('should paginate results', async () => {
      const page1 = await prisma.organization.findMany({
        where: { tenantId: testTenantId },
        take: 2,
        skip: 0,
        orderBy: { name: 'asc' },
      });

      const page2 = await prisma.organization.findMany({
        where: { tenantId: testTenantId },
        take: 2,
        skip: 2,
        orderBy: { name: 'asc' },
      });

      expect(page1).toHaveLength(2);
      expect(page2).toHaveLength(1);
      expect(page1[0].name).toBe('Alpha Corporation');
      expect(page2[0].name).toBe('Gamma Solutions');
    });
  });

  describe('Organization Constraints and Validation', () => {
    test('should enforce unique name per tenant', async () => {
      const orgData = {
        tenantId: testTenantId,
        name: 'Alpha Corporation', // Duplicate name
        type: OrganizationType.publisher,
      };

      await expect(
        prisma.organization.create({ data: orgData })
      ).rejects.toThrow();
    });

    test('should allow same name in different tenants', async () => {
      const anotherTenantId = 'another-test-tenant';
      
      // Create another tenant
      await prisma.tenant.upsert({
        where: { id: anotherTenantId },
        update: {},
        create: {
          id: anotherTenantId,
          name: 'Another Test Tenant',
          slug: 'another-test',
          status: 'active',
        },
      });

      const orgData = {
        tenantId: anotherTenantId,
        name: 'Alpha Corporation', // Same name, different tenant
        type: OrganizationType.advertiser,
      };

      const organization = await prisma.organization.create({
        data: orgData,
      });

      expect(organization.name).toBe('Alpha Corporation');
      expect(organization.tenantId).toBe(anotherTenantId);

      // Clean up
      await prisma.organization.delete({ where: { id: organization.id } });
      await prisma.tenant.delete({ where: { id: anotherTenantId } });
    });

    test('should handle JSON fields correctly', async () => {
      const complexSettings = {
        features: {
          analytics: true,
          reporting: false,
          integrations: ['zapier', 'salesforce'],
        },
        limits: {
          campaigns: 100,
          users: 50,
        },
      };

      const complexMetadata = {
        source: 'api-v2',
        importedAt: new Date().toISOString(),
        tags: ['premium', 'enterprise'],
        customFields: {
          accountManager: 'John Doe',
          renewalDate: '2025-12-31',
        },
      };

      const organization = await prisma.organization.create({
        data: {
          tenantId: testTenantId,
          name: 'JSON Test Organization',
          type: OrganizationType.advertiser,
          settings: complexSettings,
          metadata: complexMetadata,
        },
      });

      expect(organization.settings).toEqual(complexSettings);
      expect(organization.metadata).toEqual(complexMetadata);

      // Clean up
      await prisma.organization.delete({ where: { id: organization.id } });
    });
  });

  describe('Performance and Indexing', () => {
    test('should efficiently query by indexed fields', async () => {
      const startTime = Date.now();

      // Query by tenantId (indexed)
      await prisma.organization.findMany({
        where: { tenantId: testTenantId },
      });

      // Query by type (indexed)
      await prisma.organization.findMany({
        where: { type: OrganizationType.advertiser },
      });

      // Query by status (indexed)
      await prisma.organization.findMany({
        where: { status: OrganizationStatus.active },
      });

      // Query by name (indexed)
      await prisma.organization.findMany({
        where: { name: { startsWith: 'Alpha' } },
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Should complete quickly (adjust threshold as needed)
      expect(duration).toBeLessThan(1000); // 1 second
    });

    test('should count organizations efficiently', async () => {
      const startTime = Date.now();

      const count = await prisma.organization.count({
        where: { tenantId: testTenantId },
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(count).toBeGreaterThan(0);
      expect(duration).toBeLessThan(500); // 500ms
    });
  });
});
