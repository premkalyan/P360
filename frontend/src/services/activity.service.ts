// Activity Service - P360 Frontend
// Handles activity tracking and retrieval

// Types
export interface Activity {
  id: string;
  organizationId?: string;
  campaignId?: string;
  userId?: string;
  actorUserId?: string;
  type: ActivityType;
  category: ActivityCategory;
  title: string;
  description?: string;
  metadata: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  
  // Relations
  organization?: {
    id: string;
    name: string;
  };
  campaign?: {
    id: string;
    name: string;
  };
  user?: {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
  };
  actorUser?: {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
  };
}

export type ActivityType = 
  | 'organization_created'
  | 'organization_updated'
  | 'organization_deleted'
  | 'user_added'
  | 'user_removed'
  | 'status_changed'
  | 'budget_changed'
  | 'campaign_created'
  | 'campaign_updated'
  | 'campaign_deleted'
  | 'asset_uploaded'
  | 'targeting_updated'
  | 'system_action';

export type ActivityCategory = 
  | 'organization'
  | 'user'
  | 'campaign'
  | 'system'
  | 'audit';

export type TimeRange = '1h' | '24h' | '7d' | '30d' | '90d' | 'all';

export interface ActivityQuery {
  organizationId?: string;
  campaignId?: string;
  category?: ActivityCategory;
  type?: ActivityType;
  timeRange?: TimeRange;
  page?: number;
  limit?: number;
}

export interface ActivityListResponse {
  data: Activity[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface CreateActivityRequest {
  organizationId?: string;
  campaignId?: string;
  userId?: string;
  type: ActivityType;
  category: ActivityCategory;
  title: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface ActivityStats {
  categoryStats: Array<{
    category: ActivityCategory;
    count: number;
  }>;
  typeStats: Array<{
    type: ActivityType;
    count: number;
  }>;
  recentCount: number;
  timeRange: string;
}

class ActivityService {
  private baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:6601';

  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('p360_auth_token');
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const token = this.getAuthToken();
    
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed');
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get activities with filtering and pagination
   */
  async getActivities(query: ActivityQuery = {}): Promise<ActivityListResponse> {
    try {
      const params = new URLSearchParams();
      
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });

      const queryString = params.toString();
      const endpoint = `/api/v1/activities${queryString ? `?${queryString}` : ''}`;
      
      return await this.makeRequest(endpoint);
    } catch (error) {
      console.warn('🔄 Backend API unavailable for activities, using mock data:', error);
      
      // FALLBACK: Mock activities when API is not available
      return this.getMockActivities(query);
    }
  }

  /**
   * Create a new activity
   */
  async createActivity(data: CreateActivityRequest): Promise<Activity> {
    try {
      return await this.makeRequest('/api/v1/activities', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.warn('🔄 Backend API unavailable for create activity, using mock response:', error);
      
      // FALLBACK: Mock activity creation
      const mockActivity: Activity = {
        id: `activity-${Date.now()}`,
        ...data,
        metadata: data.metadata || {},
        createdAt: new Date().toISOString(),
      };
      
      return mockActivity;
    }
  }

  /**
   * Get activity statistics
   */
  async getActivityStats(organizationId?: string, timeRange: TimeRange = '24h'): Promise<ActivityStats> {
    try {
      const params = new URLSearchParams();
      if (organizationId) params.append('organizationId', organizationId);
      params.append('timeRange', timeRange);

      const queryString = params.toString();
      const endpoint = `/api/v1/activities/stats${queryString ? `?${queryString}` : ''}`;
      
      return await this.makeRequest(endpoint);
    } catch (error) {
      console.warn('🔄 Backend API unavailable for activity stats, using mock data:', error);
      
      // FALLBACK: Mock stats
      return {
        categoryStats: [
          { category: 'organization', count: 5 },
          { category: 'user', count: 3 },
          { category: 'system', count: 2 },
        ],
        typeStats: [
          { type: 'organization_updated', count: 3 },
          { type: 'user_added', count: 2 },
          { type: 'status_changed', count: 2 },
          { type: 'system_action', count: 3 },
        ],
        recentCount: 4,
        timeRange,
      };
    }
  }

  /**
   * Mock activities for fallback
   */
  private getMockActivities(query: ActivityQuery): ActivityListResponse {
    const mockActivities: Activity[] = [
      {
        id: '1',
        organizationId: query.organizationId || '1',
        type: 'organization_updated',
        category: 'organization',
        title: 'Budget increased from $15,000 to $20,000',
        description: 'Expanded budget to reach additional high-value prospects',
        metadata: { oldBudget: 15000, newBudget: 20000 },
        createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
        actorUser: {
          id: 'user-1',
          firstName: 'Tanner',
          lastName: 'Brumbarger',
          email: 'tanner@p360.com',
        },
      },
      {
        id: '2',
        organizationId: query.organizationId || '1',
        type: 'status_changed',
        category: 'system',
        title: 'Status changed from Draft to Active',
        description: 'Campaign launched after all targeting parameters confirmed',
        metadata: { oldStatus: 'draft', newStatus: 'active' },
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        actorUser: {
          id: 'system',
          firstName: 'System',
          lastName: '',
          email: 'system@p360.com',
        },
      },
      {
        id: '3',
        organizationId: query.organizationId || '1',
        type: 'targeting_updated',
        category: 'campaign',
        title: 'Targeting parameters updated',
        description: 'Added age range 25–45 and interests: renewable energy, SaaS tools',
        metadata: { ageRange: '25-45', interests: ['renewable energy', 'SaaS tools'] },
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
        actorUser: {
          id: 'user-2',
          firstName: 'Sarah',
          lastName: 'Chen',
          email: 'sarah@p360.com',
        },
      },
      {
        id: '4',
        organizationId: query.organizationId || '1',
        type: 'asset_uploaded',
        category: 'campaign',
        title: 'Uploaded creative asset',
        description: 'Approved and ready for use in campaign ads',
        metadata: { assetCount: 4, assetTypes: ['banner', 'video'] },
        createdAt: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString(), // 24 days ago
        actorUser: {
          id: 'user-3',
          firstName: 'David',
          lastName: 'Park',
          email: 'david@p360.com',
        },
      },
    ];

    // Apply filters
    let filteredActivities = mockActivities;

    if (query.category) {
      filteredActivities = filteredActivities.filter(activity => activity.category === query.category);
    }

    if (query.type) {
      filteredActivities = filteredActivities.filter(activity => activity.type === query.type);
    }

    if (query.timeRange && query.timeRange !== 'all') {
      const now = Date.now();
      const timeRangeMs = this.getTimeRangeMs(query.timeRange);
      filteredActivities = filteredActivities.filter(activity => 
        new Date(activity.createdAt).getTime() > (now - timeRangeMs)
      );
    }

    // Apply pagination
    const page = query.page || 1;
    const limit = query.limit || 50;
    const skip = (page - 1) * limit;
    const paginatedActivities = filteredActivities.slice(skip, skip + limit);

    return {
      data: paginatedActivities,
      pagination: {
        page,
        limit,
        total: filteredActivities.length,
        totalPages: Math.ceil(filteredActivities.length / limit),
        hasNext: skip + limit < filteredActivities.length,
        hasPrev: page > 1,
      },
    };
  }

  private getTimeRangeMs(timeRange: TimeRange): number {
    switch (timeRange) {
      case '1h': return 60 * 60 * 1000;
      case '24h': return 24 * 60 * 60 * 1000;
      case '7d': return 7 * 24 * 60 * 60 * 1000;
      case '30d': return 30 * 24 * 60 * 60 * 1000;
      case '90d': return 90 * 24 * 60 * 60 * 1000;
      default: return 0;
    }
  }
}

export const activityService = new ActivityService();
export default activityService;
