import { Request, Response } from 'express';
import { z } from 'zod';
import { PrismaClient, ActivityType, ActivityCategory } from '@prisma/client';

const prisma = new PrismaClient();

// Validation schemas
const getActivitiesSchema = z.object({
  organizationId: z.string().uuid().optional(),
  campaignId: z.string().uuid().optional(),
  category: z.nativeEnum(ActivityCategory).optional(),
  type: z.nativeEnum(ActivityType).optional(),
  timeRange: z.enum(['1h', '24h', '7d', '30d', '90d', 'all']).optional().default('24h'),
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(100).optional().default(50),
});

const createActivitySchema = z.object({
  organizationId: z.string().uuid().optional(),
  campaignId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  type: z.nativeEnum(ActivityType),
  category: z.nativeEnum(ActivityCategory),
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  metadata: z.record(z.any()).optional().default({}),
});

/**
 * Get activities with filtering and pagination
 */
export const getActivities = async (req: Request, res: Response) => {
  try {
    const query = getActivitiesSchema.parse(req.query);
    const tenantId = req.user?.tenantId;

    if (!tenantId) {
      return res.status(401).json({ error: 'Tenant ID required' });
    }

    // Build time range filter
    const timeRangeFilter = getTimeRangeFilter(query.timeRange);

    // Build where clause
    const where: any = {
      tenantId,
      ...(query.organizationId && { organizationId: query.organizationId }),
      ...(query.campaignId && { campaignId: query.campaignId }),
      ...(query.category && { category: query.category }),
      ...(query.type && { type: query.type }),
      ...(timeRangeFilter && { createdAt: timeRangeFilter }),
    };

    // Get total count
    const total = await prisma.activity.count({ where });

    // Get activities with pagination
    const activities = await prisma.activity.findMany({
      where,
      include: {
        organization: {
          select: { id: true, name: true }
        },
        campaign: {
          select: { id: true, name: true }
        },
        user: {
          select: { id: true, firstName: true, lastName: true, email: true }
        },
        actorUser: {
          select: { id: true, firstName: true, lastName: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    const totalPages = Math.ceil(total / query.limit);

    res.json({
      data: activities,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages,
        hasNext: query.page < totalPages,
        hasPrev: query.page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid query parameters', details: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Create a new activity
 */
export const createActivity = async (req: Request, res: Response) => {
  try {
    const data = createActivitySchema.parse(req.body);
    const tenantId = req.user?.tenantId;
    const actorUserId = req.user?.id;

    if (!tenantId) {
      return res.status(401).json({ error: 'Tenant ID required' });
    }

    const activity = await prisma.activity.create({
      data: {
        ...data,
        tenantId,
        actorUserId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      },
      include: {
        organization: {
          select: { id: true, name: true }
        },
        campaign: {
          select: { id: true, name: true }
        },
        user: {
          select: { id: true, firstName: true, lastName: true, email: true }
        },
        actorUser: {
          select: { id: true, firstName: true, lastName: true, email: true }
        }
      },
    });

    res.status(201).json(activity);
  } catch (error) {
    console.error('Error creating activity:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid request data', details: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get activity statistics
 */
export const getActivityStats = async (req: Request, res: Response) => {
  try {
    const { organizationId, timeRange = '24h' } = req.query;
    const tenantId = req.user?.tenantId;

    if (!tenantId) {
      return res.status(401).json({ error: 'Tenant ID required' });
    }

    const timeRangeFilter = getTimeRangeFilter(timeRange as string);
    const where: any = {
      tenantId,
      ...(organizationId && { organizationId: organizationId as string }),
      ...(timeRangeFilter && { createdAt: timeRangeFilter }),
    };

    // Get activity counts by category
    const categoryStats = await prisma.activity.groupBy({
      by: ['category'],
      where,
      _count: { category: true },
    });

    // Get activity counts by type
    const typeStats = await prisma.activity.groupBy({
      by: ['type'],
      where,
      _count: { type: true },
    });

    // Get recent activity count
    const recentCount = await prisma.activity.count({
      where: {
        ...where,
        createdAt: {
          gte: new Date(Date.now() - 60 * 60 * 1000), // Last hour
        },
      },
    });

    res.json({
      categoryStats: categoryStats.map(stat => ({
        category: stat.category,
        count: stat._count.category,
      })),
      typeStats: typeStats.map(stat => ({
        type: stat.type,
        count: stat._count.type,
      })),
      recentCount,
      timeRange,
    });
  } catch (error) {
    console.error('Error fetching activity stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Helper function to get time range filter
 */
function getTimeRangeFilter(timeRange: string) {
  const now = new Date();
  
  switch (timeRange) {
    case '1h':
      return { gte: new Date(now.getTime() - 60 * 60 * 1000) };
    case '24h':
      return { gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) };
    case '7d':
      return { gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) };
    case '30d':
      return { gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) };
    case '90d':
      return { gte: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000) };
    case 'all':
    default:
      return undefined;
  }
}

/**
 * Helper function to log activity (can be used by other controllers)
 */
export const logActivity = async (params: {
  tenantId: string;
  organizationId?: string;
  campaignId?: string;
  userId?: string;
  actorUserId?: string;
  type: ActivityType;
  category: ActivityCategory;
  title: string;
  description?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}) => {
  try {
    return await prisma.activity.create({
      data: {
        tenantId: params.tenantId,
        organizationId: params.organizationId,
        campaignId: params.campaignId,
        userId: params.userId,
        actorUserId: params.actorUserId,
        type: params.type,
        category: params.category,
        title: params.title,
        description: params.description,
        metadata: params.metadata || {},
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
      },
    });
  } catch (error) {
    console.error('Error logging activity:', error);
    // Don't throw error to avoid breaking main operations
    return null;
  }
};
