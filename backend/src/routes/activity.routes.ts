import { Router } from 'express';
import { getActivities, createActivity, getActivityStats } from '../controllers/activity.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

/**
 * @swagger
 * /api/v1/activities:
 *   get:
 *     summary: Get activities with filtering and pagination
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: organizationId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by organization ID
 *       - in: query
 *         name: campaignId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by campaign ID
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [organization, user, campaign, system, audit]
 *         description: Filter by activity category
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [organization_created, organization_updated, organization_deleted, user_added, user_removed, status_changed, budget_changed, campaign_created, campaign_updated, campaign_deleted, asset_uploaded, targeting_updated, system_action]
 *         description: Filter by activity type
 *       - in: query
 *         name: timeRange
 *         schema:
 *           type: string
 *           enum: [1h, 24h, 7d, 30d, 90d, all]
 *           default: 24h
 *         description: Time range filter
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 50
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Activities retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Activity'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       400:
 *         description: Invalid query parameters
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/', getActivities);

/**
 * @swagger
 * /api/v1/activities:
 *   post:
 *     summary: Create a new activity
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - category
 *               - title
 *             properties:
 *               organizationId:
 *                 type: string
 *                 format: uuid
 *               campaignId:
 *                 type: string
 *                 format: uuid
 *               userId:
 *                 type: string
 *                 format: uuid
 *               type:
 *                 type: string
 *                 enum: [organization_created, organization_updated, organization_deleted, user_added, user_removed, status_changed, budget_changed, campaign_created, campaign_updated, campaign_deleted, asset_uploaded, targeting_updated, system_action]
 *               category:
 *                 type: string
 *                 enum: [organization, user, campaign, system, audit]
 *               title:
 *                 type: string
 *                 maxLength: 255
 *               description:
 *                 type: string
 *               metadata:
 *                 type: object
 *     responses:
 *       201:
 *         description: Activity created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/', createActivity);

/**
 * @swagger
 * /api/v1/activities/stats:
 *   get:
 *     summary: Get activity statistics
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: organizationId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by organization ID
 *       - in: query
 *         name: timeRange
 *         schema:
 *           type: string
 *           enum: [1h, 24h, 7d, 30d, 90d, all]
 *           default: 24h
 *         description: Time range filter
 *     responses:
 *       200:
 *         description: Activity statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categoryStats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       category:
 *                         type: string
 *                       count:
 *                         type: integer
 *                 typeStats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                       count:
 *                         type: integer
 *                 recentCount:
 *                   type: integer
 *                 timeRange:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/stats', getActivityStats);

export default router;
