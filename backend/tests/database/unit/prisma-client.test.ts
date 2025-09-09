/**
 * P360-8: Database Migration System - Unit Tests
 * =============================================
 * 
 * Test Suite: Database Unit Tests
 * Category: Automated
 * TCMS Product: P360 - Pipeline360 DSP
 * TCMS Component: Database Migration System
 * TCMS Test Plan: P360-8 Database Migration Validation
 * Priority: P1 (Critical)
 * 
 * @description Unit tests for Prisma client operations and database functions
 * @automated true
 * @tcms-category "Database/Unit Tests"
 * @story P360-8
 */

import { PrismaClient } from '../../../src/generated/prisma';
import { execSync } from 'child_process';

describe('P360-8: Prisma Client Unit Tests', () => {
  let prisma: PrismaClient;

  beforeAll(async () => {
    // Ensure test database is clean
    process.env.NODE_ENV = 'test';
    process.env.DATABASE_URL = 'postgresql://test_user:test_password@localhost:5432/p360_test';
    
    prisma = new PrismaClient();
    
    // Reset test database before running tests
    try {
      execSync('npm run db:reset', { 
        cwd: '/Users/premkalyan/code/P360/backend',
        stdio: 'inherit',
        env: { ...process.env, NODE_ENV: 'test' }
      });
    } catch (error) {
      console.warn('Database reset failed, continuing with tests');
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Database Connection Tests', () => {
    /**
     * TCMS Test Case: DB-001
     * Type: Automated Unit Test
     * Priority: P1
     * Component: Database Connection
     */
    test('should connect to test database successfully', async () => {
      expect(prisma).toBeDefined();
      
      // Test connection by running a simple query
      const result = await prisma.$queryRaw`SELECT 1 as test`;
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    /**
     * TCMS Test Case: DB-002  
     * Type: Automated Unit Test
     * Priority: P1
     * Component: Database Connection
     */
    test('should have correct database environment configuration', async () => {
      // Verify we're using test database
      const dbInfo = await prisma.$queryRaw`SELECT current_database() as dbname` as any[];
      expect(dbInfo[0].dbname).toBe('p360_test');
    });
  });

  describe('Tenant Operations Tests', () => {
    /**
     * TCMS Test Case: DB-003
     * Type: Automated Unit Test  
     * Priority: P1
     * Component: Multi-tenant System
     */
    test('should create tenant successfully', async () => {
      const tenant = await prisma.tenant.create({
        data: {
          name: 'Test Organization',
          slug: 'test-org-unit',
          status: 'trial'
        }
      });

      expect(tenant).toBeDefined();
      expect(tenant.name).toBe('Test Organization');
      expect(tenant.slug).toBe('test-org-unit');
      expect(tenant.status).toBe('trial');
      expect(tenant.id).toBeDefined();
    });

    /**
     * TCMS Test Case: DB-004
     * Type: Automated Unit Test
     * Priority: P1  
     * Component: Multi-tenant System
     */
    test('should enforce unique slug constraint', async () => {
      // First tenant
      await prisma.tenant.create({
        data: {
          name: 'First Tenant',
          slug: 'unique-slug-test',
          status: 'active'
        }
      });

      // Attempt to create second tenant with same slug
      await expect(prisma.tenant.create({
        data: {
          name: 'Second Tenant', 
          slug: 'unique-slug-test',
          status: 'active'
        }
      })).rejects.toThrow();
    });
  });

  describe('User Management Tests', () => {
    let testTenant: any;

    beforeEach(async () => {
      testTenant = await prisma.tenant.create({
        data: {
          name: 'User Test Tenant',
          slug: `user-test-${Date.now()}`,
          status: 'active'
        }
      });
    });

    /**
     * TCMS Test Case: DB-005
     * Type: Automated Unit Test
     * Priority: P1
     * Component: User Management
     */
    test('should create user with proper tenant association', async () => {
      const user = await prisma.user.create({
        data: {
          tenantId: testTenant.id,
          email: 'test@example.com',
          passwordHash: 'hashed_password',
          firstName: 'Test',
          lastName: 'User',
          role: 'manager'
        }
      });

      expect(user).toBeDefined();
      expect(user.tenantId).toBe(testTenant.id);
      expect(user.email).toBe('test@example.com');
      expect(user.role).toBe('manager');
    });

    /**
     * TCMS Test Case: DB-006
     * Type: Automated Unit Test
     * Priority: P1
     * Component: User Management
     */
    test('should enforce unique email constraint', async () => {
      const email = 'duplicate@example.com';
      
      // First user
      await prisma.user.create({
        data: {
          tenantId: testTenant.id,
          email,
          passwordHash: 'hash1',
          role: 'viewer'
        }
      });

      // Attempt duplicate email
      await expect(prisma.user.create({
        data: {
          tenantId: testTenant.id,
          email,
          passwordHash: 'hash2', 
          role: 'analyst'
        }
      })).rejects.toThrow();
    });
  });

  describe('Campaign Schema Tests', () => {
    let testTenant: any;
    let testUser: any;

    beforeEach(async () => {
      testTenant = await prisma.tenant.create({
        data: {
          name: 'Campaign Test Tenant',
          slug: `campaign-test-${Date.now()}`,
          status: 'active'
        }
      });

      testUser = await prisma.user.create({
        data: {
          tenantId: testTenant.id,
          email: `campaigntest${Date.now()}@example.com`,
          passwordHash: 'hashed_password',
          role: 'manager'
        }
      });
    });

    /**
     * TCMS Test Case: DB-007
     * Type: Automated Unit Test
     * Priority: P1
     * Component: Campaign Management
     */
    test('should create campaign with all required fields', async () => {
      const campaign = await prisma.campaign.create({
        data: {
          tenantId: testTenant.id,
          userId: testUser.id,
          name: 'Test Campaign',
          description: 'Test campaign description',
          status: 'draft',
          budget: 1000.00,
          dailyBudget: 50.00
        }
      });

      expect(campaign).toBeDefined();
      expect(campaign.name).toBe('Test Campaign');
      expect(campaign.status).toBe('draft');
      expect(campaign.budget).toBe(1000.00);
    });

    /**
     * TCMS Test Case: DB-008
     * Type: Automated Unit Test
     * Priority: P1
     * Component: Enhanced Campaign Features (P360-107,108,109)
     */
    test('should create campaign with enhanced relations', async () => {
      // Create campaign
      const campaign = await prisma.campaign.create({
        data: {
          tenantId: testTenant.id,
          userId: testUser.id,
          name: 'Enhanced Campaign Test',
          status: 'draft'
        }
      });

      // Create campaign analytics
      const analytics = await prisma.campaignAnalytics.create({
        data: {
          campaignId: campaign.id,
          totalImpressions: 1000,
          totalClicks: 50,
          totalSpend: 100.00,
          ctr: 5.0,
          lastCalculatedAt: new Date()
        }
      });

      // Create campaign targeting
      const targeting = await prisma.campaignTargeting.create({
        data: {
          campaignId: campaign.id,
          demographics: { age: '25-45', gender: 'all' },
          geographics: { country: 'US', states: ['CA', 'NY'] },
          estimatedReach: 50000
        }
      });

      expect(analytics.campaignId).toBe(campaign.id);
      expect(targeting.campaignId).toBe(campaign.id);
      expect(analytics.totalImpressions).toBe(1000);
      expect(targeting.estimatedReach).toBe(50000);
    });
  });

  describe('Migration System Validation', () => {
    /**
     * TCMS Test Case: DB-009
     * Type: Automated Unit Test
     * Priority: P1
     * Component: Migration System
     */
    test('should validate all required tables exist', async () => {
      const tables = await prisma.$queryRaw`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
        ORDER BY table_name
      ` as any[];

      const tableNames = tables.map((t: any) => t.table_name);
      
      // Core tables
      expect(tableNames).toContain('tenants');
      expect(tableNames).toContain('users');
      expect(tableNames).toContain('user_sessions');
      expect(tableNames).toContain('campaigns');
      expect(tableNames).toContain('campaign_performance');
      
      // Enhanced campaign tables (P360-107,108,109)
      expect(tableNames).toContain('campaign_templates');
      expect(tableNames).toContain('campaign_assets');
      expect(tableNames).toContain('campaign_targeting');
      expect(tableNames).toContain('campaign_analytics');
      expect(tableNames).toContain('campaign_workflows');
    });

    /**
     * TCMS Test Case: DB-010
     * Type: Automated Unit Test
     * Priority: P1
     * Component: Migration System
     */
    test('should validate migration history', async () => {
      const migrations = await prisma.$queryRaw`
        SELECT migration_name 
        FROM _prisma_migrations 
        ORDER BY started_at
      ` as any[];

      expect(migrations.length).toBeGreaterThan(0);
      
      const migrationNames = migrations.map((m: any) => m.migration_name);
      expect(migrationNames).toContain('20250909071557_init_p360_schema');
      expect(migrationNames).toContain('20250909071822_enhanced_campaign_schema_for_p360_107_108_109');
    });
  });
});
