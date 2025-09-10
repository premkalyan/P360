import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {
  CreateOrganizationRequest,
  UpdateOrganizationRequest,
  OrganizationQuery,
  AddUserToOrganizationRequest,
} from '../schemas/organization.schemas';

const prisma = new PrismaClient();

/**
 * List organizations with pagination and filtering
 * GET /api/v1/organizations
 */
export const listOrganizations = async (req: Request, res: Response) => {
  try {
    const tenantId = req.user?.tenantId;
    if (!tenantId) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Tenant ID required'
      });
    }

    const query = req.query as unknown as OrganizationQuery;
    const { type, status, search, sortBy, sortOrder } = query;
    
    // Handle pagination parameters (may be strings in tests, numbers after validation middleware)
    const page = typeof query.page === 'string' ? parseInt(query.page) || 1 : query.page || 1;
    const limit = typeof query.limit === 'string' ? parseInt(query.limit) || 20 : query.limit || 20;

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Build where clause for filtering
    const where: any = {
      tenantId,
    };

    if (type) {
      where.type = type;
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { industry: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Build orderBy clause
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Execute queries
    const [organizations, total] = await Promise.all([
      prisma.organization.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          _count: {
            select: {
              campaigns: true,
              organizationUsers: true,
            },
          },
        },
      }),
      prisma.organization.count({ where }),
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return res.status(200).json({
      data: organizations,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext,
        hasPrev,
      },
    });
  } catch (error) {
    console.error('List organizations error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to retrieve organizations',
    });
  }
};

/**
 * Create a new organization
 * POST /api/v1/organizations
 */
export const createOrganization = async (req: Request, res: Response) => {
  try {
    const tenantId = req.user?.tenantId;
    if (!tenantId) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Tenant ID required'
      });
    }

    const data = req.body as CreateOrganizationRequest;

    // Check if organization name already exists in tenant
    const existingOrg = await prisma.organization.findFirst({
      where: {
        tenantId,
        name: data.name,
      },
    });

    if (existingOrg) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'Organization with this name already exists',
      });
    }

    // Create organization
    const organization = await prisma.organization.create({
      data: {
        ...data,
        tenantId,
        settings: (data.settings as any) || {},
        metadata: (data.metadata as any) || {},
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

    return res.status(201).json({
      data: organization,
      message: 'Organization created successfully',
    });
  } catch (error) {
    console.error('Create organization error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create organization',
    });
  }
};

/**
 * Get organization by ID
 * GET /api/v1/organizations/:id
 */
export const getOrganization = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tenantId = req.user?.tenantId;

    if (!tenantId) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Tenant ID required'
      });
    }

    const organization = await prisma.organization.findFirst({
      where: {
        id,
        tenantId,
      },
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

    if (!organization) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Organization not found',
      });
    }

    return res.status(200).json({
      data: organization,
    });
  } catch (error) {
    console.error('Get organization error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to retrieve organization',
    });
  }
};

/**
 * Update organization
 * PUT /api/v1/organizations/:id
 */
export const updateOrganization = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tenantId = req.user?.tenantId;
    const data = req.body as UpdateOrganizationRequest;

    if (!tenantId) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Tenant ID required'
      });
    }

    // Check if organization exists and belongs to tenant
    const existingOrg = await prisma.organization.findFirst({
      where: {
        id,
        tenantId,
      },
    });

    if (!existingOrg) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Organization not found',
      });
    }

    // Check for name conflicts if name is being updated
    if (data.name && data.name !== existingOrg.name) {
      const nameConflict = await prisma.organization.findFirst({
        where: {
          tenantId,
          name: data.name,
          id: { not: id },
        },
      });

      if (nameConflict) {
        return res.status(409).json({
          error: 'Conflict',
          message: 'Organization with this name already exists',
        });
      }
    }

    // Update organization
    const organization = await prisma.organization.update({
      where: { id },
      data: {
        ...data,
        settings: data.settings ? { ...((existingOrg.settings as any) || {}), ...(data.settings as any) } : existingOrg.settings,
        metadata: data.metadata ? { ...((existingOrg.metadata as any) || {}), ...(data.metadata as any) } : existingOrg.metadata,
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

    return res.status(200).json({
      data: organization,
      message: 'Organization updated successfully',
    });
  } catch (error) {
    console.error('Update organization error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update organization',
    });
  }
};

/**
 * Delete organization
 * DELETE /api/v1/organizations/:id
 */
export const deleteOrganization = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tenantId = req.user?.tenantId;

    if (!tenantId) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Tenant ID required'
      });
    }

    // Check if organization exists and belongs to tenant
    const existingOrg = await prisma.organization.findFirst({
      where: {
        id,
        tenantId,
      },
      include: {
        _count: {
          select: {
            campaigns: true,
          },
        },
      },
    });

    if (!existingOrg) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Organization not found',
      });
    }

    // Check if organization has active campaigns
    if (existingOrg._count.campaigns > 0) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'Cannot delete organization with active campaigns',
      });
    }

    // Delete organization (cascades to organization_users)
    await prisma.organization.delete({
      where: { id },
    });

    return res.status(200).json({
      message: 'Organization deleted successfully',
    });
  } catch (error) {
    console.error('Delete organization error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to delete organization',
    });
  }
};

/**
 * Get organization users
 * GET /api/v1/organizations/:id/users
 */
export const getOrganizationUsers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tenantId = req.user?.tenantId;

    if (!tenantId) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Tenant ID required'
      });
    }

    // Verify organization exists and belongs to tenant
    const organization = await prisma.organization.findFirst({
      where: {
        id,
        tenantId,
      },
    });

    if (!organization) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Organization not found',
      });
    }

    // Get organization users
    const organizationUsers = await prisma.organizationUser.findMany({
      where: {
        organizationId: id,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            isActive: true,
            lastLoginAt: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json({
      data: organizationUsers,
    });
  } catch (error) {
    console.error('Get organization users error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to retrieve organization users',
    });
  }
};

/**
 * Add user to organization
 * POST /api/v1/organizations/:id/users
 */
export const addUserToOrganization = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tenantId = req.user?.tenantId;
    const data = req.body as AddUserToOrganizationRequest;

    if (!tenantId) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Tenant ID required'
      });
    }

    // Verify organization exists and belongs to tenant
    const organization = await prisma.organization.findFirst({
      where: {
        id,
        tenantId,
      },
    });

    if (!organization) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Organization not found',
      });
    }

    // Verify user exists and belongs to same tenant
    const user = await prisma.user.findFirst({
      where: {
        id: data.userId,
        tenantId,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found',
      });
    }

    // Check if user is already in organization
    const existingOrgUser = await prisma.organizationUser.findUnique({
      where: {
        organizationId_userId: {
          organizationId: id,
          userId: data.userId,
        },
      },
    });

    if (existingOrgUser) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'User is already a member of this organization',
      });
    }

    // Add user to organization
    const organizationUser = await prisma.organizationUser.create({
      data: {
        organizationId: id,
        userId: data.userId,
        role: data.role,
      },
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
    });

    return res.status(201).json({
      data: organizationUser,
      message: 'User added to organization successfully',
    });
  } catch (error) {
    console.error('Add user to organization error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to add user to organization',
    });
  }
};
