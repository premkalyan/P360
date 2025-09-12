import { z } from 'zod';

// Organization Type Enums
export const OrganizationTypeSchema = z.enum(['advertiser', 'publisher', 'buyer']);
export const OrganizationStatusSchema = z.enum(['active', 'inactive', 'suspended']);
export const OrganizationSizeSchema = z.enum(['startup', 'small', 'medium', 'large', 'enterprise']);

// Base Organization Schema
export const OrganizationSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  name: z.string().min(1).max(255),
  type: OrganizationTypeSchema,
  status: OrganizationStatusSchema,
  description: z.string().optional(),
  website: z.string().url().optional(),
  industry: z.string().max(100).optional(),
  size: OrganizationSizeSchema.optional(),
  settings: z.record(z.string(), z.any()).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Create Organization Request Schema
export const CreateOrganizationSchema = z.object({
  name: z.string().min(1, 'Organization name is required').max(255, 'Name must be less than 255 characters'),
  type: OrganizationTypeSchema,
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  website: z.string().url('Invalid website URL format').optional(),
  industry: z.string().max(100, 'Industry must be less than 100 characters').optional(),
  size: OrganizationSizeSchema.optional(),
  settings: z.record(z.string(), z.any()).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

// Update Organization Request Schema
export const UpdateOrganizationSchema = z.object({
  name: z.string().min(1, 'Organization name is required').max(255, 'Name must be less than 255 characters').optional(),
  type: OrganizationTypeSchema.optional(),
  status: OrganizationStatusSchema.optional(),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  website: z.string().url('Invalid website URL format').optional(),
  industry: z.string().max(100, 'Industry must be less than 100 characters').optional(),
  size: OrganizationSizeSchema.optional(),
  settings: z.record(z.string(), z.any()).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

// Query Parameters Schema
export const OrganizationQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).pipe(z.number().min(1)).optional().default(1),
  limit: z.string().regex(/^\d+$/).transform(Number).pipe(z.number().min(1).max(100)).optional().default(20),
  type: OrganizationTypeSchema.optional(),
  status: OrganizationStatusSchema.optional(),
  size: OrganizationSizeSchema.optional(),
  search: z.string().max(255).optional(),
  sortBy: z.enum(['name', 'type', 'status', 'createdAt', 'updatedAt']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

// Response Schemas
export const OrganizationResponseSchema = z.object({
  data: OrganizationSchema,
  message: z.string().optional(),
});

export const OrganizationListResponseSchema = z.object({
  data: z.array(OrganizationSchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});

// Error Response Schema
export const ErrorResponseSchema = z.object({
  error: z.string(),
  message: z.string(),
  details: z.array(z.object({
    field: z.string(),
    message: z.string(),
  })).optional(),
});

// TypeScript Types
export type Organization = z.infer<typeof OrganizationSchema>;
export type CreateOrganizationRequest = z.infer<typeof CreateOrganizationSchema>;
export type UpdateOrganizationRequest = z.infer<typeof UpdateOrganizationSchema>;
export type OrganizationQuery = z.infer<typeof OrganizationQuerySchema>;
export type OrganizationResponse = z.infer<typeof OrganizationResponseSchema>;
export type OrganizationListResponse = z.infer<typeof OrganizationListResponseSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

// Organization User Schema (for user management)
export const OrganizationUserSchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.enum(['admin', 'manager', 'analyst', 'viewer']),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AddUserToOrganizationSchema = z.object({
  userId: z.string().uuid('Invalid user ID format'),
  role: z.enum(['admin', 'manager', 'analyst', 'viewer']).default('viewer'),
});

export type OrganizationUser = z.infer<typeof OrganizationUserSchema>;
export type AddUserToOrganizationRequest = z.infer<typeof AddUserToOrganizationSchema>;
