-- P360 Database Initialization Script
-- ===================================
-- Creates initial database structure for P360 platform
-- Includes multi-tenant setup with RLS (Row Level Security)

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create schemas
CREATE SCHEMA IF NOT EXISTS p360_core;
CREATE SCHEMA IF NOT EXISTS p360_campaigns;
CREATE SCHEMA IF NOT EXISTS p360_analytics;

-- Set search path
SET search_path TO p360_core, p360_campaigns, p360_analytics, public;

-- Create enum types
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'analyst', 'viewer');
CREATE TYPE campaign_status AS ENUM ('draft', 'active', 'paused', 'completed', 'archived');
CREATE TYPE tenant_status AS ENUM ('active', 'suspended', 'trial');

-- Core Tables
-- ============

-- Tenants (Organizations)
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    status tenant_status DEFAULT 'trial',
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role user_role DEFAULT 'viewer',
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions
CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaign Tables
-- ===============

-- Campaigns
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status campaign_status DEFAULT 'draft',
    budget DECIMAL(15, 2),
    daily_budget DECIMAL(15, 2),
    start_date DATE,
    end_date DATE,
    target_audience JSONB DEFAULT '{}',
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaign Performance (Mock data for P360-67 testing)
CREATE TABLE IF NOT EXISTS campaign_performance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    spend DECIMAL(15, 4) DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(campaign_id, date)
);

-- Indexes for performance
-- ======================
CREATE INDEX IF NOT EXISTS idx_users_tenant_id ON users(tenant_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_campaigns_tenant_id ON campaigns(tenant_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaign_performance_campaign_id ON campaign_performance(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_performance_date ON campaign_performance(date);

-- Row Level Security (RLS)
-- ========================
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_performance ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY tenant_isolation_users ON users
    FOR ALL TO authenticated
    USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_campaigns ON campaigns
    FOR ALL TO authenticated
    USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY tenant_isolation_performance ON campaign_performance
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM campaigns 
            WHERE campaigns.id = campaign_performance.campaign_id 
            AND campaigns.tenant_id = current_setting('app.current_tenant_id')::UUID
        )
    );

-- Seed Data for P360-67 Testing
-- ==============================

-- Create demo tenant
INSERT INTO tenants (id, name, slug, status) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'Demo Organization', 'demo-org', 'active')
ON CONFLICT (slug) DO NOTHING;

-- Create demo user
INSERT INTO users (id, tenant_id, email, password_hash, first_name, last_name, role) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 
     '550e8400-e29b-41d4-a716-446655440000',
     'demo@p360.com', 
     crypt('demo123', gen_salt('bf')), 
     'Demo', 
     'User', 
     'manager')
ON CONFLICT (email) DO NOTHING;

-- Create demo campaigns for P360-67 testing
INSERT INTO campaigns (id, tenant_id, user_id, name, description, status, budget, daily_budget, start_date, end_date) VALUES
    ('550e8400-e29b-41d4-a716-446655440010',
     '550e8400-e29b-41d4-a716-446655440000',
     '550e8400-e29b-41d4-a716-446655440001',
     'Summer Sale 2024',
     'Promotional campaign for summer sale season targeting high-value customers',
     'active',
     15000.00,
     500.00,
     '2024-06-01',
     '2024-08-31'),
     
    ('550e8400-e29b-41d4-a716-446655440011',
     '550e8400-e29b-41d4-a716-446655440000',
     '550e8400-e29b-41d4-a716-446655440001',
     'Brand Awareness Q3',
     'Brand awareness campaign focusing on new product launches',
     'active',
     25000.00,
     800.00,
     '2024-07-01',
     '2024-09-30'),
     
    ('550e8400-e29b-41d4-a716-446655440012',
     '550e8400-e29b-41d4-a716-446655440000',
     '550e8400-e29b-41d4-a716-446655440001',
     'Product Launch',
     'Launch campaign for new product line with targeted messaging',
     'paused',
     8000.00,
     300.00,
     '2024-08-15',
     '2024-10-15')
ON CONFLICT (id) DO NOTHING;

-- Create mock performance data
INSERT INTO campaign_performance (campaign_id, date, impressions, clicks, spend, conversions) VALUES
    -- Summer Sale 2024 performance
    ('550e8400-e29b-41d4-a716-446655440010', '2024-09-01', 45678, 1234, 456.78, 67),
    ('550e8400-e29b-41d4-a716-446655440010', '2024-09-02', 52341, 1456, 523.41, 78),
    ('550e8400-e29b-41d4-a716-446655440010', '2024-09-03', 48902, 1342, 489.02, 71),
    
    -- Brand Awareness Q3 performance  
    ('550e8400-e29b-41d4-a716-446655440011', '2024-09-01', 78234, 2156, 782.34, 98),
    ('550e8400-e29b-41d4-a716-446655440011', '2024-09-02', 81567, 2298, 815.67, 103),
    ('550e8400-e29b-41d4-a716-446655440011', '2024-09-03', 76891, 2089, 768.91, 92),
    
    -- Product Launch performance
    ('550e8400-e29b-41d4-a716-446655440012', '2024-09-01', 23456, 567, 234.56, 34),
    ('550e8400-e29b-41d4-a716-446655440012', '2024-09-02', 25678, 634, 256.78, 38),
    ('550e8400-e29b-41d4-a716-446655440012', '2024-09-03', 21234, 498, 212.34, 29)
ON CONFLICT (campaign_id, date) DO NOTHING;

-- Functions for campaign statistics
-- =================================

-- Function to get campaign summary stats
CREATE OR REPLACE FUNCTION get_campaign_stats(tenant_uuid UUID)
RETURNS TABLE (
    total_campaigns BIGINT,
    active_campaigns BIGINT,
    total_spend NUMERIC,
    total_impressions BIGINT,
    total_clicks BIGINT,
    total_conversions BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (SELECT COUNT(*) FROM campaigns WHERE tenant_id = tenant_uuid) as total_campaigns,
        (SELECT COUNT(*) FROM campaigns WHERE tenant_id = tenant_uuid AND status = 'active') as active_campaigns,
        COALESCE((SELECT SUM(cp.spend) FROM campaign_performance cp 
                  JOIN campaigns c ON cp.campaign_id = c.id 
                  WHERE c.tenant_id = tenant_uuid), 0) as total_spend,
        COALESCE((SELECT SUM(cp.impressions) FROM campaign_performance cp 
                  JOIN campaigns c ON cp.campaign_id = c.id 
                  WHERE c.tenant_id = tenant_uuid), 0) as total_impressions,
        COALESCE((SELECT SUM(cp.clicks) FROM campaign_performance cp 
                  JOIN campaigns c ON cp.campaign_id = c.id 
                  WHERE c.tenant_id = tenant_uuid), 0) as total_clicks,
        COALESCE((SELECT SUM(cp.conversions) FROM campaign_performance cp 
                  JOIN campaigns c ON cp.campaign_id = c.id 
                  WHERE c.tenant_id = tenant_uuid), 0) as total_conversions;
END;
$$ LANGUAGE plpgsql;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT USAGE ON SCHEMA p360_core, p360_campaigns, p360_analytics TO p360_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA p360_core, p360_campaigns, p360_analytics TO p360_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA p360_core, p360_campaigns, p360_analytics TO p360_user;

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE 'P360 database initialized successfully!';
    RAISE NOTICE 'Demo tenant: demo-org (ID: 550e8400-e29b-41d4-a716-446655440000)';
    RAISE NOTICE 'Demo user: demo@p360.com / demo123';
    RAISE NOTICE 'Sample campaigns and performance data created for P360-67 testing';
END $$;
