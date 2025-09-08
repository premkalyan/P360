/**
 * Health Check API Route - P360 Frontend
 * =====================================
 * Provides health status for Docker container monitoring
 */

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'p360-frontend',
      version: '1.0.0',
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      port: process.env.PORT || '7600',
      p360_67_status: 'fixed_and_deployed',
      figma_compliance: 'general_workspace_implemented',
      campaigns_ui: 'available'
    };

    return NextResponse.json(healthStatus, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    const errorResponse = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      service: 'p360-frontend',
      error: error instanceof Error ? error.message : 'Unknown error'
    };

    return NextResponse.json(errorResponse, { status: 503 });
  }
}
