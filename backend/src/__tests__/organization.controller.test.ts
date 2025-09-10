import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

// Mock Prisma before importing the controller
jest.mock('@prisma/client');
const mockPrisma = {
  organization: {
    findMany: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
} as any;

// Mock the PrismaClient constructor
(PrismaClient as jest.MockedClass<typeof PrismaClient>).mockImplementation(() => mockPrisma);

// Import controller after mocking Prisma
import {
  listOrganizations,
  createOrganization,
  getOrganization,
  updateOrganization,
  deleteOrganization,
} from '../controllers/organization.controller';

describe('Organization Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockReq = {
      user: {
        id: 'user-id',
        tenantId: 'tenant-id',
        email: 'test@p360.com',
        role: 'admin',
        isActive: true,
      },
      headers: {
        'x-tenant-id': 'tenant-id',
      },
      query: {},
      body: {},
      params: {},
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    mockNext = jest.fn();

    // Reset all mocks
    jest.clearAllMocks();
  });

  describe('listOrganizations', () => {
    test('should return organizations with pagination', async () => {
      const mockOrganizations = [
        {
          id: 'org-1',
          name: 'Test Org 1',
          type: 'advertiser',
          status: 'active',
          tenantId: 'tenant-id',
          _count: { campaigns: 0, organizationUsers: 0 },
        },
      ];

      mockPrisma.organization.findMany.mockResolvedValue(mockOrganizations);
      mockPrisma.organization.count.mockResolvedValue(1);

      mockReq.query = { page: '1', limit: '20' };

      await listOrganizations(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        data: mockOrganizations,
        pagination: {
          page: 1,
          limit: 20,
          total: 1,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        },
      });
    });

    test('should handle search parameters', async () => {
      mockReq.query = { 
        search: 'test', 
        type: 'advertiser', 
        page: '1', 
        limit: '20', 
        sortBy: 'createdAt', 
        sortOrder: 'desc' 
      };

      mockPrisma.organization.findMany.mockResolvedValue([]);
      mockPrisma.organization.count.mockResolvedValue(0);

      await listOrganizations(mockReq as Request, mockRes as Response);

      expect(mockPrisma.organization.findMany).toHaveBeenCalledWith({
        where: {
          tenantId: 'tenant-id',
          type: 'advertiser',
          OR: [
            { name: { contains: 'test', mode: 'insensitive' } },
            { description: { contains: 'test', mode: 'insensitive' } },
            { industry: { contains: 'test', mode: 'insensitive' } },
          ],
        },
        skip: 0,
        take: 20,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: {
              campaigns: true,
              organizationUsers: true,
            },
          },
        },
      });
    });

    test('should handle database errors', async () => {
      mockPrisma.organization.findMany.mockRejectedValue(new Error('Database error'));

      await listOrganizations(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Internal Server Error',
        message: 'Failed to retrieve organizations',
      });
    });

    test('should require tenant ID', async () => {
      mockReq.headers = {};

      await listOrganizations(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Tenant ID required',
      });
    });
  });

  describe('createOrganization', () => {
    test('should create organization successfully', async () => {
      const orgData = {
        name: 'New Organization',
        type: 'advertiser',
        description: 'Test description',
      };

      const createdOrg = {
        id: 'new-org-id',
        ...orgData,
        tenantId: 'tenant-id',
        status: 'active',
        settings: {},
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        _count: { campaigns: 0, organizationUsers: 0 },
      };

      mockReq.body = orgData;
      mockPrisma.organization.findFirst.mockResolvedValue(null); // No existing org
      mockPrisma.organization.create.mockResolvedValue(createdOrg);

      await createOrganization(mockReq as Request, mockRes as Response);

      expect(mockPrisma.organization.create).toHaveBeenCalledWith({
        data: {
          ...orgData,
          tenantId: 'tenant-id',
          settings: {},
          metadata: {},
        },
        include: {
          _count: {
            select: {
              campaigns: true,
              organizationUsers: true,
            },
          },
        },
      });

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        data: createdOrg,
        message: 'Organization created successfully',
      });
    });

    test('should prevent duplicate names', async () => {
      const orgData = { name: 'Existing Org', type: 'advertiser' };
      const existingOrg = { id: 'existing-id', name: 'Existing Org' };

      mockReq.body = orgData;
      mockPrisma.organization.findFirst.mockResolvedValue(existingOrg);

      await createOrganization(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(409);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Conflict',
        message: 'Organization with this name already exists',
      });
    });
  });

  describe('getOrganization', () => {
    test('should return organization by ID', async () => {
      const mockOrg = {
        id: 'org-id',
        name: 'Test Org',
        tenantId: 'tenant-id',
        _count: { campaigns: 2, organizationUsers: 5 },
        organizationUsers: [],
      };

      mockReq.params = { id: 'org-id' };
      mockPrisma.organization.findFirst.mockResolvedValue(mockOrg);

      await getOrganization(mockReq as Request, mockRes as Response);

      expect(mockPrisma.organization.findFirst).toHaveBeenCalledWith({
        where: { id: 'org-id', tenantId: 'tenant-id' },
        include: {
          _count: {
            select: {
              campaigns: true,
              organizationUsers: true,
            },
          },
          organizationUsers: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  firstName: true,
                  lastName: true,
                  role: true,
                },
              },
            },
          },
        },
      });

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ data: mockOrg });
    });

    test('should return 404 for non-existent organization', async () => {
      mockReq.params = { id: 'non-existent-id' };
      mockPrisma.organization.findFirst.mockResolvedValue(null);

      await getOrganization(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Not Found',
        message: 'Organization not found',
      });
    });
  });

  describe('updateOrganization', () => {
    test('should update organization successfully', async () => {
      const updateData = { name: 'Updated Name', description: 'Updated description' };
      const existingOrg = {
        id: 'org-id',
        name: 'Old Name',
        tenantId: 'tenant-id',
        settings: { key: 'value' },
        metadata: { meta: 'data' },
      };
      const updatedOrg = { ...existingOrg, ...updateData };

      mockReq.params = { id: 'org-id' };
      mockReq.body = updateData;
      mockPrisma.organization.findFirst.mockResolvedValueOnce(existingOrg);
      mockPrisma.organization.findFirst.mockResolvedValueOnce(null); // No name conflict
      mockPrisma.organization.update.mockResolvedValue(updatedOrg);

      await updateOrganization(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        data: updatedOrg,
        message: 'Organization updated successfully',
      });
    });

    test('should prevent name conflicts on update', async () => {
      const updateData = { name: 'Conflicting Name' };
      const existingOrg = { id: 'org-id', name: 'Old Name', tenantId: 'tenant-id' };
      const conflictingOrg = { id: 'other-id', name: 'Conflicting Name' };

      mockReq.params = { id: 'org-id' };
      mockReq.body = updateData;
      mockPrisma.organization.findFirst
        .mockResolvedValueOnce(existingOrg) // Find existing org
        .mockResolvedValueOnce(conflictingOrg); // Find name conflict

      await updateOrganization(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(409);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Conflict',
        message: 'Organization with this name already exists',
      });
    });
  });

  describe('deleteOrganization', () => {
    test('should delete organization successfully', async () => {
      const existingOrg = {
        id: 'org-id',
        tenantId: 'tenant-id',
        _count: { campaigns: 0 },
      };

      mockReq.params = { id: 'org-id' };
      mockPrisma.organization.findFirst.mockResolvedValue(existingOrg);
      mockPrisma.organization.delete.mockResolvedValue(existingOrg);

      await deleteOrganization(mockReq as Request, mockRes as Response);

      expect(mockPrisma.organization.delete).toHaveBeenCalledWith({
        where: { id: 'org-id' },
      });

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Organization deleted successfully',
      });
    });

    test('should prevent deletion with active campaigns', async () => {
      const existingOrg = {
        id: 'org-id',
        tenantId: 'tenant-id',
        _count: { campaigns: 3 },
      };

      mockReq.params = { id: 'org-id' };
      mockPrisma.organization.findFirst.mockResolvedValue(existingOrg);

      await deleteOrganization(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(409);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Conflict',
        message: 'Cannot delete organization with active campaigns',
      });
    });
  });
});
