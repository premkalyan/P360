# P360 DAP MVP - Technical Architecture Deep Dive

## 📚 **Technical Terminology Guide**

### **Platform & Integration Terms**
- **P360 DAP**: Pipeline360 Display Advertising Platform - custom platform to replace Microsoft Xandr
- **TTD**: The Trade Desk - major programmatic advertising demand-side platform (DSP) for buying digital ads
- **Bombora**: B2B intent data provider that tracks company research behavior across the web
- **Salesforce**: CRM platform used for managing customer accounts and opportunities
- **Microsoft Entra ID**: Enterprise identity management service (formerly Azure Active Directory)
- **Auth0**: Third-party authentication service for managing user logins and access
- **Metabase**: Open-source business intelligence tool for creating dashboards and reports

### **Advertising Technology Terms**
- **UID2 (Unified ID 2.0)**: Cookieless digital advertising identifier that replaces third-party cookies
- **ICP (Ideal Customer Profile)**: Definition of the perfect customer used to create lookalike audiences
- **REDS**: Real-time Event Data Stream from TTD containing impression/click/conversion events
- **Campaign Orchestration**: Managing advertising campaigns across platforms with budget/audience coordination
- **Attribution Engine**: System that tracks which marketing touchpoints led to conversions/sales
- **Audience Builder**: Tool for creating targeted customer segments using drag-and-drop logic
- **Lookalike Audiences**: Targeting similar companies/people to your existing customers using AI

### **Technical Architecture Terms**
- **Multi-Tenant SaaS**: Single application serving multiple customers with data isolation
- **Row Level Security (RLS)**: Database feature that restricts data access based on user permissions
- **Clean Architecture**: Software design pattern separating business logic from infrastructure
- **Domain-Driven Design (DDD)**: Approach to software development focused on business domain modeling
- **Infrastructure as Code (IaC)**: Managing cloud infrastructure through code (Terraform)
- **Blue-Green Deployment**: Zero-downtime deployment strategy using two identical environments

### **Data Processing Terms**
- **Data Pipeline**: Automated system for moving and transforming data from source to destination
- **Data Lake**: Storage system for raw data in its native format until needed
- **Materialized Views**: Pre-computed database views for faster query performance
- **Data Cubes**: Multi-dimensional data structures for fast analytical queries
- **ETL (Extract, Transform, Load)**: Process of moving data between systems with transformations

## 🗄️ **Database & Multi-Tenant Architecture**

### **Database Choice: PostgreSQL**
- **Primary Database**: Amazon RDS PostgreSQL 13+ (Multi-AZ deployment)
- **Read Replicas**: 2 replicas for reporting workloads to separate analytics from operational traffic
- **Hosting**: AWS RDS with automated backups, encryption at rest/transit

### **Multi-Tenant Architecture Design - Detailed Explanation**

**What is Multi-Tenancy?**
Multi-tenancy is a software architecture where a single application instance serves multiple customers (tenants) while keeping their data completely isolated. Each "tenant" gets their own secure, private workspace within the shared infrastructure.

**Multi-Tenancy Benefits:**
- **Cost Efficiency**: Share infrastructure costs across customers
- **Scalability**: Add new customers without new infrastructure
- **Maintenance**: Single codebase, centralized updates
- **Resource Optimization**: Share computational resources efficiently

**P360 Multi-Tenant Strategy:**
- **Tenant = Organization**: Each P360 customer gets their own organization
- **Shared Database**: Single PostgreSQL database with data isolation
- **Row-Level Security**: Database enforces tenant separation automatically
- **Shared Infrastructure**: All tenants use same AWS resources

**Data Isolation Methods:**
1. **Separate Databases** (Not used): Each tenant gets own database - expensive
2. **Separate Schemas** (Not used): Each tenant gets own schema - complex
3. **Shared Schema with org_id** (P360 Choice): All tenants share tables, filtered by org_id

**Security Considerations:**
- **Accidental Data Leakage**: Prevent tenant A from seeing tenant B's data
- **Performance Isolation**: Prevent one tenant from affecting others
- **Backup Isolation**: Tenant-specific backup and restore capabilities
- **Access Control**: Role-based permissions per tenant

```sql
-- Organization-based data isolation
CREATE TABLE organizations (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255),
    ttd_advertiser_id VARCHAR(255),
    salesforce_account_id VARCHAR(255),
    created_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- All tables include org_id for tenant isolation
CREATE TABLE users (
    id UUID PRIMARY KEY,
    org_id UUID REFERENCES organizations(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL,
    -- Row Level Security (RLS) ensures users only see their org data
);

-- Database-level isolation using Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_org_isolation ON users 
    FOR ALL TO application_role 
    USING (org_id = current_setting('app.current_org_id')::UUID);
```

**Multi-Tenant Strategy:**
- **Data Isolation**: Every table has `org_id` foreign key to organizations table
- **Row Level Security (RLS)**: Database-enforced tenant isolation
- **Application Context**: Set `current_org_id` in session for automatic filtering
- **Shared Infrastructure**: Single database with tenant-aware queries (not separate DBs per tenant)

---

## 🔐 **Authentication: Microsoft Entra ID + Auth0**

### **Microsoft Entra ID (formerly Azure AD) - Detailed Explanation**
**What is Microsoft Entra ID?**
Microsoft Entra ID (formerly Azure Active Directory) is Microsoft's cloud-based identity and access management service. It's the enterprise-grade solution for managing user identities, authentication, and access permissions across applications and resources.

**Key Features:**
- **Single Sign-On (SSO)**: Users log in once and access all connected applications
- **Multi-Factor Authentication (MFA)**: Additional security layers beyond passwords
- **Conditional Access**: Access rules based on location, device, risk level
- **Group Management**: Organize users into groups for permission management
- **Federation**: Connect with other identity providers and services

**Purpose in P360**: SSO for internal P360 staff (Super Admins, Campaign Managers)

```python
# Entra ID Integration (SAML/OIDC)
class EntraIDAuth:
    def authenticate_internal_user(self, token):
        # Validate token with Microsoft Entra ID
        user_info = validate_entra_token(token)
        # Map Entra groups to P360 roles
        role = map_entra_group_to_role(user_info.groups)
        # Create/update user in P360 system
        return create_user_session(user_info, role)
```

**Configuration:**
- **App Registration**: P360 app registered in client's Entra ID tenant
- **Groups Mapping**: Entra ID groups → P360 roles (Super Admin, Campaign Manager)
- **Claims**: Extract user identity, role assignments, organization membership

### **Auth0 - Detailed Explanation**
**What is Auth0?**
Auth0 is a cloud-based identity platform that provides authentication and authorization services for applications. It's designed to handle user authentication for external customers and provides flexible, scalable identity management with extensive customization options.

**Key Features:**
- **Universal Login**: Customizable login experience with brand consistency
- **Social Login**: Integration with Google, LinkedIn, Facebook, etc.
- **Multi-Factor Authentication**: SMS, email, authenticator app options
- **User Management**: Self-service password reset, profile management
- **APIs and SDKs**: Easy integration with modern applications
- **Security**: Built-in protection against common attacks

**Purpose in P360**: Authentication for external customers (Marketers, future Agency users)

```python
# Auth0 Integration for External Users
class Auth0Integration:
    def authenticate_external_user(self, token):
        # Validate Auth0 JWT token
        user_info = validate_auth0_token(token)
        # Check organization membership
        org = validate_user_organization(user_info.org_id)
        return create_external_session(user_info, org)
```

**Why Both Systems?**
- **Security Separation**: Internal P360 staff vs external customers
- **Identity Management**: Leverage existing enterprise identity (Entra ID) for staff
- **Scalability**: Auth0 handles external customer identity at scale

---

## 👥 **Role-Based Access Control (RBAC)**

### **Role Definitions & Database Access**

#### **1. Super Admin (Internal)**
```python
class SuperAdminRole:
    permissions = [
        "create_organizations",
        "manage_all_users", 
        "view_all_data",           # Can see across ALL organizations
        "manage_api_keys",
        "system_administration",
        "manual_reconciliation"
    ]
    database_access = "GLOBAL"    # Can query across all org_id values
```

#### **2. Campaign Manager (Internal)**
```python
class CampaignManagerRole:
    permissions = [
        "manage_assigned_orgs",    # Only orgs assigned to them
        "create_campaigns",
        "upload_audiences",
        "view_reporting",
        "reconcile_records"
    ]
    database_access = "MULTI_ORG"  # Limited to assigned org_ids only
```

#### **3. Marketer (External Customer)**
```python
class MarketerRole:
    permissions = [
        "view_own_org_only",       # Strictly their organization
        "upload_audiences",
        "create_draft_campaigns",   # May require approval
        "view_own_reporting"
    ]
    database_access = "SINGLE_ORG"  # Only their org_id
```

### **Database Access Implementation (Scalable Approach)**
**❌ BAD: M×N Policies** (avoid this!)
```sql
-- This creates M roles × N tables = too many policies!
CREATE POLICY super_admin_campaigns ON campaigns FOR ALL TO super_admin_role USING (true);
CREATE POLICY super_admin_audiences ON audiences FOR ALL TO super_admin_role USING (true);
CREATE POLICY campaign_manager_campaigns ON campaigns FOR ALL TO campaign_manager_role USING (...);
-- ... this gets unwieldy fast!
```

**✅ GOOD: Single Function-Based Policy Per Table**
```sql
-- 1. Create ONE security function that handles ALL roles
CREATE OR REPLACE FUNCTION check_row_access(table_org_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    user_role TEXT;
    user_org_ids UUID[];
BEGIN
    -- Get current user's role and org access from session
    user_role := current_setting('app.user_role', true);
    user_org_ids := string_to_array(current_setting('app.user_org_ids', true), ',')::UUID[];
    
    -- Apply role-based logic
    CASE user_role
        WHEN 'super_admin' THEN
            RETURN true;  -- Super admins see everything
        WHEN 'campaign_manager' THEN
            RETURN table_org_id = ANY(user_org_ids);  -- Only assigned orgs
        WHEN 'marketer' THEN
            RETURN table_org_id = ANY(user_org_ids);  -- Only their org
        ELSE
            RETURN false;  -- Deny by default
    END CASE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Apply ONE policy per table using the shared function
CREATE POLICY access_policy ON campaigns
    FOR ALL TO application_user
    USING (check_row_access(org_id));

CREATE POLICY access_policy ON audiences  
    FOR ALL TO application_user
    USING (check_row_access(org_id));

CREATE POLICY access_policy ON programs
    FOR ALL TO application_user
    USING (check_row_access(org_id));

-- Only N policies total (one per table), not M×N!
```

**Session Setup in Application:**
```python
# When user logs in, set their context ONCE
def set_user_session(user):
    db_session.execute(f"""
        SET app.user_role = '{user.role}';
        SET app.user_org_ids = '{",".join(user.org_ids)}';
    """)
    
    # Now ALL queries automatically respect user's access level
    campaigns = Campaign.query.all()  # Only returns accessible campaigns
```

**Alternative: Application-Level Access Control**
```python
# If you prefer to avoid RLS entirely, handle in application layer:
class AccessControlMixin:
    @classmethod
    def for_user(cls, user):
        query = cls.query
        
        if user.role == 'super_admin':
            return query  # No filtering
        elif user.role in ['campaign_manager', 'marketer']:
            return query.filter(cls.org_id.in_(user.org_ids))
        else:
            return query.filter(False)  # No access

# Usage:
campaigns = Campaign.for_user(current_user).all()
```

## **Performance Comparison: DB vs Application Filtering**

### **📊 Database-Level RLS Performance**
**✅ More Efficient When:**
```sql
-- RLS: Database applies filter BEFORE loading data
SELECT * FROM campaigns WHERE org_id = 'user-org';
-- PostgreSQL query planner optimizes with indexes
-- Only matching rows are loaded from disk

-- Query plan with RLS:
-- Index Scan using campaigns_org_id_idx (cost=0.42..8.44 rows=1 width=500)
-- Filter applied at storage level
```

**❌ Less Efficient When:**
```sql
-- Complex RLS function with multiple conditions
CREATE FUNCTION check_complex_access() RETURNS BOOLEAN AS $$
BEGIN
    -- Multiple function calls per row can add overhead
    SELECT expensive_calculation();
    SELECT another_expensive_check();
    RETURN true;
END;
$$;
-- Function called for EVERY row = performance penalty
```

### **📊 Application-Level Filtering Performance**
**✅ More Efficient When:**
```python
# Application: Can optimize queries more intelligently
def get_user_campaigns(user_id, with_stats=False):
    query = Campaign.query.filter(Campaign.org_id.in_(user.org_ids))
    
    if with_stats:
        # Smart optimization: only join when needed
        query = query.options(selectinload(Campaign.statistics))
    
    return query.all()

# Can use different strategies per use case
def get_campaign_summary(user_id):
    # Optimized: only select needed columns
    return db.session.query(Campaign.id, Campaign.name, Campaign.budget)\
        .filter(Campaign.org_id.in_(user.org_ids))\
        .all()
```

**❌ Less Efficient When:**
```python
# Application: Easy to forget filtering or apply inefficiently
campaigns = Campaign.query.all()  # Loads ALL data first
filtered = [c for c in campaigns if c.org_id in user.org_ids]  # Filters in memory
# This is terrible for performance!
```

---

## **🏆 Performance Recommendation Matrix**

| Scenario | Best Approach | Reason |
|----------|---------------|---------|
| **Simple org filtering** | **DB RLS** | Index-optimized, applied at storage level |
| **Complex multi-condition logic** | **Application** | Avoid expensive function calls per row |
| **High security requirements** | **DB RLS** | Cannot be bypassed by developer error |
| **Flexible query optimization** | **Application** | Can optimize per use case |
| **Large datasets (millions of rows)** | **DB RLS** | Only loads matching data from disk |
| **Complex reporting queries** | **Application** | Better control over joins and aggregations |

---

### **🎯 P360 Recommendation: Hybrid Approach**

```python
# Use RLS for basic org security (simple, fast)
CREATE POLICY org_access_policy ON campaigns
    FOR ALL TO application_user
    USING (org_id = ANY(string_to_array(current_setting('app.user_org_ids'), ',')::UUID[]));

# Use application filtering for complex queries
class CampaignService:
    def get_performance_report(self, user, date_range, metrics):
        # Application-level: complex query optimization
        base_query = Campaign.query.filter(
            Campaign.org_id.in_(user.org_ids)  # Could rely on RLS, but explicit is clearer
        )
        
        if 'conversion_rate' in metrics:
            base_query = base_query.join(ConversionEvents)
        
        if 'roi' in metrics:
            base_query = base_query.join(RevenueAttribution)
            
        return base_query.filter(
            Campaign.created_at.between(date_range.start, date_range.end)
        ).all()
```

**Best of Both Worlds:**
- **RLS**: Security safety net + simple queries
- **Application**: Complex optimization + explicit control

---

**Recommendation: Use RLS Function Approach**
- **Pros**: Security enforced at database level, impossible to bypass, efficient for simple filtering
- **Cons**: Less flexible for complex queries, harder to debug performance
- **Scaling**: Only N policies (one per table), not M×N
- **Performance**: Excellent for simple org filtering, may need application layer for complex reports

---

## 🏢 **Organization Creation & User Management**

### **Organization Creation Process**
**Where**: Admin console with dedicated organization management screens

```python
# Organization Creation API
class OrganizationService:
    def create_organization(self, org_data):
        # 1. Create organization record
        org = Organization.create({
            'name': org_data.name,
            'domain': org_data.domain,
            'salesforce_account_id': org_data.sf_account_id
        })
        
        # 2. Setup TTD advertiser connection
        ttd_advertiser = self.setup_ttd_advertiser(org)
        
        # 3. Create default admin user
        admin_user = self.create_org_admin(org, org_data.admin_email)
        
        # 4. Initialize org-specific resources
        self.initialize_org_resources(org)
        
        return org
```

### **User Access Management Screens**
**Yes, we need comprehensive user management screens:**

#### **Screen 1: Organization Management** (Super Admin only)
- Create/edit organizations
- Link to TTD advertisers
- Link to Salesforce accounts
- Assign Campaign Managers to organizations

#### **Screen 2: User Management** (Super Admin + Campaign Manager)
- Create/edit users within their permitted organizations
- Assign roles and permissions
- Send user invitations
- Deactivate/reactivate users

#### **Screen 3: User Profile & Settings** (All users)
- Update personal information
- Change passwords (non-SSO users)
- View assigned organizations and permissions

---

## 📁 **CSV Upload & Ingestion (10K records <30s)**

### **High-Performance CSV Processing Architecture**

```python
# CSV Processing Pipeline
class CSVProcessor:
    def process_csv_upload(self, file, org_id):
        # 1. Async upload to S3 (immediate response to user)
        s3_key = self.upload_to_s3(file, org_id)
        
        # 2. Trigger background processing
        task_id = self.queue_processing_job(s3_key, org_id)
        
        return {"task_id": task_id, "status": "processing"}
    
    def process_csv_background(self, s3_key, org_id):
        # 3. Stream processing from S3 (not load into memory)
        with s3_client.stream_object(s3_key) as csv_stream:
            # 4. Batch insert in chunks of 1000 records
            for batch in chunked(csv_stream, 1000):
                validated_batch = self.validate_batch(batch)
                self.bulk_insert_audience_records(validated_batch, org_id)
        
        # 5. Post-processing: deduplication, validation
        self.deduplicate_audiences(org_id)
        self.update_processing_status("completed")
```

**Performance Optimization Strategies:**
- **Streaming**: Process CSV without loading entire file into memory
- **Batch Processing**: Insert 1000 records per database transaction
- **Async Processing**: User gets immediate response, processing happens in background
- **Connection Pooling**: Reuse database connections for bulk operations
- **Indexing**: Proper database indexes on frequently queried columns

**Technology Stack:**
- **File Storage**: AWS S3 for uploaded CSVs
- **Background Jobs**: AWS SQS + Lambda or Celery workers
- **Database**: PostgreSQL with COPY command for bulk inserts
- **Monitoring**: Track processing time per file size

---

## 🧠 **Audience Builder with AND/OR Logic Trees**

### **Conceptual Explanation**
Audience Builder allows users to create complex audience segments using visual logic trees:

```
Example Logic Tree:
└── AND
    ├── Company Industry = "Technology"  
    ├── OR
    │   ├── Revenue > "$10M"
    │   └── Employee Count > 500
    └── AND
        ├── Bombora Topic = "Cloud Computing"
        └── Intent Score > 75
```

### **Technical Implementation**

```python
# Logic Tree Data Structure
class AudienceLogicTree:
    def __init__(self):
        self.root = LogicNode(operator="AND")
    
class LogicNode:
    def __init__(self, operator="AND"):  # AND/OR
        self.operator = operator
        self.conditions = []  # LeafConditions
        self.children = []    # Other LogicNodes
    
class LeafCondition:
    def __init__(self, field, operator, value):
        self.field = field        # "company_industry"
        self.operator = operator  # "equals", "greater_than", "contains"
        self.value = value        # "Technology"

# SQL Query Generation
class AudienceQueryBuilder:
    def build_query(self, logic_tree, org_id):
        base_query = """
        SELECT DISTINCT companies.domain, companies.company_name
        FROM companies
        LEFT JOIN bombora_data ON companies.domain = bombora_data.domain
        WHERE companies.org_id = %s
        """
        
        conditions = self.parse_logic_tree(logic_tree.root)
        final_query = f"{base_query} AND ({conditions})"
        
        return final_query
    
    def parse_logic_tree(self, node):
        if isinstance(node, LeafCondition):
            return self.build_condition_sql(node)
        
        child_conditions = []
        for child in node.children:
            child_conditions.append(self.parse_logic_tree(child))
        
        return f" {node.operator} ".join(child_conditions)
```

## **Real-Time Audience Builder Performance Strategy**

### **📊 Logic Tree Structure (Validation)**
✅ **Your Understanding is Correct:**
```
Logic Tree Structure:
├── Internal Nodes: AND / OR operators
│   ├── Can contain other Internal Nodes (nested logic)
│   └── Can contain Leaf Nodes (conditions)
└── Leaf Nodes: Field comparisons
    ├── company_industry = "Technology"
    ├── revenue > "$10M"
    ├── employee_count > 500
    └── bombora_intent_score > 75
```

### **🚀 Real-Time Filtering Performance Options**

#### **❌ Option 1: Query Per Change (Too Slow)**
```python
# User changes tree → Run full SQL query
def on_tree_change(logic_tree):
    sql = build_query_from_tree(logic_tree)
    count = db.execute(f"SELECT COUNT(*) FROM ({sql}) AS filtered").scalar()
    return {"count": count}  # Takes 500ms-2s per change = terrible UX
```

#### **✅ Option 2: Pre-Aggregated Data Cubes (Recommended)**
```python
# Pre-compute common aggregations for fast filtering
class AudienceDataCube:
    def __init__(self, org_id):
        # Load aggregated data for this org
        self.data_cube = self.build_data_cube(org_id)
    
    def build_data_cube(self, org_id):
        # Pre-aggregate by common dimensions
        cube = {}
        
        # Industry aggregations
        cube['industry'] = db.execute("""
            SELECT company_industry, COUNT(*) as count
            FROM companies WHERE org_id = %s
            GROUP BY company_industry
        """, org_id).fetchall()
        
        # Revenue ranges
        cube['revenue_ranges'] = db.execute("""
            SELECT 
                CASE 
                    WHEN revenue < 1000000 THEN '<$1M'
                    WHEN revenue < 10000000 THEN '$1M-$10M'
                    WHEN revenue < 100000000 THEN '$10M-$100M'
                    ELSE '$100M+'
                END as revenue_range,
                COUNT(*) as count
            FROM companies WHERE org_id = %s
            GROUP BY revenue_range
        """, org_id).fetchall()
        
        # Bombora intent scores
        cube['intent_scores'] = db.execute("""
            SELECT 
                CASE 
                    WHEN intent_score < 25 THEN 'Low'
                    WHEN intent_score < 50 THEN 'Medium'
                    WHEN intent_score < 75 THEN 'High'
                    ELSE 'Very High'
                END as intent_range,
                COUNT(*) as count
            FROM bombora_data b 
            JOIN companies c ON b.domain = c.domain
            WHERE c.org_id = %s
            GROUP BY intent_range
        """, org_id).fetchall()
        
        return cube
    
    def estimate_audience_size(self, logic_tree):
        # Fast estimation using pre-aggregated data
        return self.traverse_tree_estimate(logic_tree.root)
```

#### **⚡ Option 3: Smart Hybrid Approach (P360 Recommendation)**
```python
class SmartAudienceBuilder:
    def __init__(self, org_id):
        self.org_id = org_id
        self.base_dataset = self.load_base_dataset()  # ~50K-200K records max
        self.aggregations = self.load_aggregations()
        
    def load_base_dataset(self):
        # Load frequently filtered fields only (not full records)
        return db.execute("""
            SELECT 
                c.domain,
                c.company_industry,
                c.revenue,
                c.employee_count,
                b.intent_score,
                b.topic_scores
            FROM companies c
            LEFT JOIN bombora_data b ON c.domain = b.domain
            WHERE c.org_id = %s
        """, self.org_id).fetchall()
    
    def filter_in_memory(self, logic_tree):
        # Filter base dataset in memory (very fast)
        filtered_domains = []
        
        for record in self.base_dataset:
            if self.evaluate_tree_for_record(logic_tree, record):
                filtered_domains.append(record.domain)
        
        return {
            "count": len(filtered_domains),
            "sample_companies": filtered_domains[:10],
            "estimated_total": len(filtered_domains)
        }
    
    def get_real_time_preview(self, logic_tree):
        # Option A: Use in-memory for speed (recommended for UI)
        if len(self.base_dataset) < 100000:
            return self.filter_in_memory(logic_tree)
        
        # Option B: Use aggregations for estimation
        else:
            return self.estimate_from_aggregations(logic_tree)
```

### **🎯 P360 Implementation Strategy**

#### **Phase 1: MVP Approach (Simple & Fast)**
```python
# Load org's audience data into Redis for fast filtering
class AudienceBuilderCache:
    def __init__(self, org_id):
        self.redis_key = f"audience_data:{org_id}"
        self.ensure_data_cached(org_id)
    
    def ensure_data_cached(self, org_id):
        if not redis.exists(self.redis_key):
            # Load and cache org's audience data
            data = self.load_audience_data(org_id)
            redis.setex(self.redis_key, 3600, json.dumps(data))  # 1 hour cache
    
    def real_time_filter(self, logic_tree):
        # Ultra-fast in-memory filtering using Redis
        data = json.loads(redis.get(self.redis_key))
        filtered = self.apply_logic_tree(logic_tree, data)
        
        return {
            "count": len(filtered),
            "preview": filtered[:100],  # Show first 100 matches
            "processing_time_ms": 50    # Sub-100ms response
        }
```

#### **Phase 2: Advanced Approach (Scale)**
```python
# For large organizations with millions of records
class ScalableAudienceBuilder:
    def __init__(self, org_id):
        self.org_id = org_id
        self.materialized_views = self.setup_materialized_views()
    
    def setup_materialized_views(self):
        # Pre-compute common filter combinations
        db.execute("""
            CREATE MATERIALIZED VIEW audience_summary AS
            SELECT 
                org_id,
                company_industry,
                revenue_range,
                intent_score_range,
                COUNT(*) as company_count,
                array_agg(domain) as sample_domains
            FROM companies c
            LEFT JOIN bombora_data b ON c.domain = b.domain
            GROUP BY org_id, company_industry, revenue_range, intent_score_range
        """)
    
    def smart_estimate(self, logic_tree):
        # Use materialized views for instant estimates
        estimate_query = self.build_estimate_query(logic_tree)
        result = db.execute(estimate_query).fetchone()
        
        return {
            "estimated_count": result.estimated_count,
            "confidence": "high" if result.sample_size > 1000 else "medium",
            "processing_time_ms": 10
        }
```

### **🏗️ Data Loading Strategy by Organization Size**

| Org Size | Records | Strategy | Memory Usage | Response Time |
|----------|---------|----------|--------------|---------------|
| **Small** | <50K | Full in-memory | ~50MB | <50ms |
| **Medium** | 50K-500K | Redis cache + sampling | ~100MB | <100ms |
| **Large** | 500K+ | Materialized views + estimates | ~10MB | <200ms |

### **🎛️ User Experience Features**
```javascript
// Frontend: Real-time filtering with debouncing
class AudienceBuilderUI {
    constructor() {
        this.filterDebounce = debounce(this.updateAudiencePreview, 300);
    }
    
    onTreeChange(newTree) {
        // Show loading state immediately
        this.showLoadingState();
        
        // Debounced API call
        this.filterDebounce(newTree);
    }
    
    updateAudiencePreview(tree) {
        // Fast API call to get audience size + preview
        api.getAudiencePreview(tree).then(result => {
            this.updateUI({
                count: result.count,
                sampleCompanies: result.preview,
                confidence: result.confidence
            });
        });
    }
}
```

**User Experience:**
- **Drag & Drop Interface**: Visual tree builder with real-time feedback
- **Instant Preview**: Show audience size + sample companies as user builds
- **Smart Caching**: Fast response times through intelligent data loading
- **Progressive Disclosure**: Start with estimates, drill down for exact counts
- **Save & Version**: Save audience definitions for reuse

---

---

## 🆔 **UID2 Identifiers & TTD Integration**

### **UID2 (Unified ID 2.0) - Detailed Explanation**
**What is UID2?**
UID2 (Unified ID 2.0) is an industry-standard, privacy-compliant identifier system that replaces third-party cookies in digital advertising. It was created by The Trade Desk to solve the "cookieless future" problem.

**How UID2 Works:**
1. **Email-Based**: Uses hashed and encrypted email addresses as the foundation
2. **Privacy-First**: Emails are hashed using SHA-256, then encrypted with rotating keys
3. **Opt-In Only**: Users must explicitly consent to data usage
4. **Decentralized**: No single company controls the identity graph
5. **Interoperable**: Works across different advertising platforms and publishers

**Technical Implementation:**
- Email → SHA-256 Hash → Encryption → UID2 Token
- Tokens refresh every hour for security
- Can be passed between advertising platforms while maintaining privacy
- Enables audience targeting without exposing personal information

**Business Value:**
- **Precise Targeting**: Match audiences across platforms using same identifier
- **Better Attribution**: Track user journey across touchpoints
- **Privacy Compliant**: Meets GDPR, CCPA requirements
- **Future-Proof**: Works without third-party cookies

```python
# UID2 Integration for TTD Audience Export
class UID2Service:
    def export_audience_to_ttd(self, audience_id, org_id):
        # 1. Get audience data from our system
        audience_data = self.get_audience_records(audience_id, org_id)
        
        # 2. Convert to UID2 format for TTD
        uid2_payload = {
            "audience_id": f"p360_{audience_id}",
            "ttd_advertiser_id": org.ttd_advertiser_id,
            "identifiers": []
        }
        
        for record in audience_data:
            # 3. Convert domain/email to UID2 tokens
            uid2_token = self.generate_uid2_token(record.email_hash)
            uid2_payload["identifiers"].append({
                "uid2": uid2_token,
                "domain": record.domain
            })
        
        # 4. Submit to TTD Audience API
        response = ttd_client.create_audience(uid2_payload)
        
        return response
```

### **ICP Audience Designation & Seed Creation - Detailed Explanation**

**What is ICP (Ideal Customer Profile)?**
An ICP is a detailed description of your perfect customer - the type of company/person most likely to buy your product and get the most value from it. In P360, ICPs are used to create high-performing advertising campaigns.

**ICP Components:**
- **Firmographic Data**: Company size, industry, revenue, location
- **Technographic Data**: Technology stack, tools used
- **Behavioral Data**: Website behavior, content consumption patterns
- **Intent Data**: Research topics, buying signals from Bombora

**Seed Creation Process:**
1. **Define ICP Criteria**: Use Audience Builder to create precise ICP definition
2. **Generate Seed Audience**: Export 10K-50K companies matching ICP to TTD
3. **AI Training**: TTD's algorithms analyze seed characteristics
4. **Lookalike Expansion**: TTD finds similar companies using machine learning
5. **Scale Targeting**: Reach 10x-100x larger audiences with similar characteristics

**Technical Requirements:**
- **Minimum Size**: 10,000 unique identifiers (UID2 tokens)
- **Maximum Size**: 50,000 identifiers (TTD platform limit)
- **Data Quality**: Clean, validated email/domain data
- **Refresh Rate**: Monthly updates to maintain relevance

**Business Impact:**
- **Higher Conversion Rates**: Target companies most likely to convert
- **Lower Cost Per Acquisition**: Efficient ad spend on qualified prospects
- **Scalable Growth**: Find new customers similar to best existing customers

```python
class ICPAudienceService:
    def create_icp_audience(self, audience_config, org_id):
        # 1. Build ICP audience using same logic tree
        icp_audience = self.build_audience(audience_config, is_icp=True)
        
        # 2. Validate minimum 10K identifiers requirement
        if len(icp_audience.identifiers) < 10000:
            raise ValidationError("ICP audience requires minimum 10K identifiers")
        
        # 3. Create TTD seed from ICP audience
        seed_response = self.create_ttd_seed(icp_audience, org_id)
        
        return icp_audience, seed_response
    
    def create_ttd_seed(self, icp_audience, org_id):
        # TTD Seed = Training data for lookalike audience expansion
        seed_payload = {
            "advertiser_id": org.ttd_advertiser_id,
            "seed_name": f"ICP_Seed_{icp_audience.name}",
            "identifiers": icp_audience.uid2_identifiers[:50000]  # TTD limit
        }
        
        return ttd_client.create_seed_audience(seed_payload)
```

---

## 🎯 **Campaign Orchestration - Detailed Explanation**

**What is Campaign Orchestration?**
Campaign Orchestration is the systematic management and coordination of advertising campaigns across multiple platforms, audiences, and objectives. In P360, it provides a unified way to manage complex advertising programs with multiple sub-campaigns.

**Why Use Campaign Orchestration?**
- **Budget Control**: Prevent overspend across multiple campaigns
- **Performance Optimization**: Reallocate budget to best-performing campaigns
- **Unified Reporting**: Single view of performance across all activities
- **Workflow Automation**: Automatically pause/adjust campaigns based on performance
- **Compliance**: Ensure campaigns meet brand and legal guidelines

**Key Components:**
1. **Programs**: Top-level containers (tied to Salesforce Opportunities)
2. **Campaigns**: Mid-level groups with specific audiences and objectives
3. **Line Items**: Execution level with bids, creatives, and targeting
4. **Budget Management**: Automatic pacing and spend controls
5. **Performance Monitoring**: Real-time optimization and alerting

### **Hierarchical Campaign Structure**
```
Program (IO Level)
├── Budget: $100,000
├── Flight Dates: Q4 2025
└── Campaigns
    ├── Campaign 1: Brand Awareness
    │   ├── Budget: $40,000
    │   ├── Audience: Technology_ICP
    │   └── Line Items
    │       ├── Line Item 1: Display Ads
    │       │   ├── Bid: $2.50 CPM
    │       │   ├── Creatives: banner_set_1
    │       │   └── Pacing: Even
    │       └── Line Item 2: Video Ads
    │           ├── Bid: $15.00 CPCV
    │           └── Creatives: video_set_1
    └── Campaign 2: Lead Generation
        ├── Budget: $60,000
        └── Audience: High_Intent_Prospects
```

### **Technical Implementation**
```python
class CampaignOrchestration:
    def create_program(self, program_data, org_id):
        # 1. Create program container
        program = Program.create({
            'org_id': org_id,
            'name': program_data.name,
            'total_budget': program_data.budget,
            'start_date': program_data.start_date,
            'end_date': program_data.end_date,
            'salesforce_opportunity_id': program_data.sf_opp_id
        })
        
        return program
    
    def create_campaign(self, campaign_data, program_id):
        # 2. Validate budget doesn't exceed program budget
        self.validate_budget_constraints(campaign_data.budget, program_id)
        
        campaign = Campaign.create({
            'program_id': program_id,
            'name': campaign_data.name,
            'budget': campaign_data.budget,
            'audience_id': campaign_data.audience_id,
            'kpis': campaign_data.kpis
        })
        
        # 3. Sync to TTD
        ttd_campaign = self.sync_campaign_to_ttd(campaign)
        campaign.update(ttd_campaign_id=ttd_campaign.id)
        
        return campaign
```

---

## 🌊 **Bombora Data Pipeline - Detailed Explanation**

**What is Bombora?**
Bombora is a B2B intent data provider that tracks anonymous company research behavior across 4,000+ B2B websites. They monitor which companies are researching specific topics, technologies, or solutions - providing "buying intent" signals for sales and marketing teams.

**How Bombora Data Works:**
1. **Content Monitoring**: Tracks content consumption across B2B publisher network
2. **Company Identification**: Uses IP address mapping to identify companies (not individuals)
3. **Topic Taxonomy**: Maps content to 7,000+ standardized business topics
4. **Intent Scoring**: Calculates 0-100 intent scores based on research behavior
5. **Data Delivery**: Provides weekly/daily data files via S3 or API

**Bombora Data Fields:**
- **Company Domain**: Primary company identifier (e.g., "microsoft.com")
- **Topic IDs**: Standardized topic identifiers (e.g., "Cloud Computing")
- **Intent Scores**: 0-100 scale indicating research intensity
- **Research Volume**: Number of research instances detected
- **Surge Indicator**: Whether intent is trending upward
- **Time Periods**: 4-week and 12-week activity windows

**Business Value for P360:**
- **Identify In-Market Prospects**: Find companies actively researching relevant solutions
- **Timing Optimization**: Reach prospects when they're in buying mode
- **Account Prioritization**: Focus sales efforts on high-intent accounts
- **Audience Expansion**: Find similar companies with buying intent

### **High-Volume Data Ingestion Architecture (20-60M records/day)**

```python
# Bombora Data Pipeline
class BomboraDataPipeline:
    def process_daily_file(self, s3_event):
        # 1. File arrives in S3 bucket (configured by Bombora)
        file_path = s3_event['s3']['object']['key']
        file_size = s3_event['s3']['object']['size']
        
        # 2. Trigger appropriate processing based on file size
        if file_size > 1_000_000_000:  # >1GB file
            self.process_large_file_parallel(file_path)
        else:
            self.process_standard_file(file_path)
    
    def process_large_file_parallel(self, file_path):
        # 3. Split large file into chunks for parallel processing
        chunk_tasks = self.split_file_into_chunks(file_path, chunk_size=10_000_000)
        
        # 4. Process chunks in parallel using Lambda/ECS tasks
        results = self.process_chunks_parallel(chunk_tasks)
        
        # 5. Aggregate results and update statistics
        self.aggregate_processing_results(results)
```

### **Cloud Architecture & Technology Stack**

**AWS Services Used:**
```yaml
Data Ingestion Pipeline:
  S3_Bucket: "bombora-data-ingest"
  Lambda_Trigger: "on_file_arrival"
  Processing: 
    - AWS_Batch: "for_large_files"
    - ECS_Fargate: "for_streaming_processing"
  Database: 
    - RDS_PostgreSQL: "normalized_data"
    - S3: "raw_data_lake"
  Monitoring:
    - CloudWatch: "processing_metrics"
    - SNS: "failure_alerts"
```

**Processing Performance:**
- **Target**: 60M records in <4 hours
- **Throughput**: ~4,167 records/second sustained
- **Architecture**: Parallel processing with 10-20 worker instances
- **Storage**: Raw files in S3, processed data in PostgreSQL + S3 data lake

### **Data Pipeline Flow**
```
Bombora S3 Bucket → Lambda Trigger → ECS Task
                                   ↓
                    Parallel Processing Workers
                                   ↓
                    PostgreSQL (normalized) + S3 (data lake)
                                   ↓
                    Data Quality Validation & Alerting
```

---

## 📊 **TTD REDS Hourly File Processing - Detailed Explanation**

**What is REDS (Real-time Event Data Stream)?**
REDS is The Trade Desk's real-time event streaming service that delivers granular campaign performance data. It provides detailed information about every impression, click, and conversion that occurs across TTD campaigns, typically delivered within 1-4 hours of the actual event.

**REDS Data Content:**
- **Impression Events**: When an ad is displayed to a user
- **Click Events**: When a user clicks on an ad
- **Conversion Events**: When a user takes a desired action (form fill, purchase, etc.)
- **Attribution Data**: Which campaign/line item drove the event
- **Audience Information**: Which audience segment the user belongs to
- **Cost Data**: Actual spend per event
- **Timestamp Data**: Precise timing of events

**REDS File Structure:**
```
event_timestamp | campaign_id | line_item_id | event_type | cost_usd | audience_id | user_id_type | conversion_value
2025-01-15 14:30:25 | 12345 | 67890 | impression | 0.0025 | aud_abc123 | UID2 | 0.00
2025-01-15 14:31:10 | 12345 | 67890 | click | 0.75 | aud_abc123 | UID2 | 0.00  
2025-01-15 14:45:33 | 12345 | 67890 | conversion | 0.00 | aud_abc123 | UID2 | 150.00
```

**Business Value:**
- **Real-time Optimization**: Quickly identify and pause underperforming campaigns
- **Granular Attribution**: Track exactly which audiences and campaigns drive results
- **ROI Calculation**: Calculate precise return on ad spend (ROAS)
- **Fraud Detection**: Identify suspicious click/impression patterns

### **REDS File Processing Implementation**

```python
# TTD REDS Processing
class REDSProcessor:
    def process_hourly_file(self, reds_file_path):
        # REDS file structure (simplified):
        # timestamp, campaign_id, line_item_id, event_type, cost, audience_id
        
        with open(reds_file_path, 'r') as file:
            # 1. Stream processing for large files
            for batch in chunked_csv_reader(file, chunk_size=50000):
                processed_events = []
                
                for event in batch:
                    # 2. Enrich with P360 campaign data
                    p360_campaign = self.lookup_campaign(event.campaign_id)
                    
                    # 3. Match to audiences
                    audience_match = self.match_to_audience(event.audience_id)
                    
                    # 4. Calculate attribution
                    attribution = self.calculate_attribution(event, p360_campaign)
                    
                    processed_events.append({
                        'event': event,
                        'p360_campaign': p360_campaign,
                        'audience': audience_match,
                        'attribution': attribution
                    })
                
                # 5. Bulk insert to attribution tables
                self.insert_attribution_data(processed_events)
```

**Data Volume & Performance:**
- **Frequency**: Every hour
- **Volume**: Varies by campaign activity (1K-1M events/hour)
- **Processing SLA**: <15 minutes per file
- **Storage**: Events stored in time-series optimized tables

---

## 🧮 **Attribution Engine - Detailed Explanation**

**What is Attribution?**
Attribution is the science of determining which marketing touchpoints deserve credit for driving conversions and revenue. In digital advertising, customers typically see multiple ads across different channels before converting, so attribution helps answer "which ads actually worked?"

**Attribution Challenges:**
- **Multi-Touch Journey**: Customers see 5-15+ touchpoints before converting
- **Cross-Channel**: Ads span display, social, search, email across different platforms
- **Time Delays**: Conversions may happen days/weeks after initial ad exposure
- **Data Silos**: Event data scattered across different advertising platforms

**P360 Attribution Engine Purpose:**
The Attribution Engine combines three data sources to create a unified view of campaign performance:
1. **REDS Data**: Real-time event data from TTD (impressions, clicks, conversions)
2. **P360 Campaign Data**: Campaign objectives, budgets, audiences, goals
3. **P360 Audience Data**: Which audience segments were targeted

**Attribution Models Supported:**
- **First-Touch**: Credit goes to first ad interaction
- **Last-Touch**: Credit goes to final ad before conversion
- **Linear**: Equal credit distributed across all touchpoints
- **Time-Decay**: More recent touchpoints get more credit
- **Data-Driven**: Machine learning determines optimal credit distribution

**Business Value:**
- **Budget Optimization**: Shift spend to campaigns driving real results
- **Audience Insights**: Identify which segments convert best
- **Campaign ROI**: Calculate true return on advertising spend
- **Performance Reporting**: Unified dashboards across all campaigns

### **Attribution Engine Technical Architecture**

```python
class AttributionEngine:
    def calculate_attribution(self, reds_event, audience_data, campaign_data):
        """
        Attribution Logic:
        1. Match REDS event to P360 campaign
        2. Identify which audience member triggered event
        3. Calculate revenue attribution based on campaign goals
        4. Update campaign performance metrics
        """
        
        attribution_record = {
            # From REDS
            'timestamp': reds_event.timestamp,
            'event_type': reds_event.event_type,  # impression, click, conversion
            'cost': reds_event.cost,
            'ttd_campaign_id': reds_event.campaign_id,
            
            # From P360 Campaign Data
            'p360_campaign_id': campaign_data.id,
            'p360_program_id': campaign_data.program_id,
            'org_id': campaign_data.org_id,
            
            # From Audience Data
            'audience_id': audience_data.id,
            'audience_segment': audience_data.segment_name,
            'company_domain': audience_data.domain,
            
            # Calculated Attribution
            'revenue_attributed': self.calculate_revenue_attribution(
                reds_event, campaign_data
            ),
            'conversion_value': self.calculate_conversion_value(
                reds_event, campaign_data.kpis
            )
        }
        
        return attribution_record
    
    def generate_attribution_reports(self, org_id, date_range):
        """
        Generate reports by joining all attribution data:
        """
        query = """
        SELECT 
            p.name as program_name,
            c.name as campaign_name,
            a.segment_name as audience_segment,
            SUM(attr.cost) as total_spend,
            SUM(attr.revenue_attributed) as total_revenue,
            COUNT(CASE WHEN attr.event_type = 'impression' THEN 1 END) as impressions,
            COUNT(CASE WHEN attr.event_type = 'click' THEN 1 END) as clicks,
            COUNT(CASE WHEN attr.event_type = 'conversion' THEN 1 END) as conversions
        FROM attribution_records attr
        JOIN campaigns c ON attr.p360_campaign_id = c.id
        JOIN programs p ON attr.p360_program_id = p.id  
        JOIN audiences a ON attr.audience_id = a.id
        WHERE attr.org_id = %s 
        AND attr.timestamp BETWEEN %s AND %s
        GROUP BY p.name, c.name, a.segment_name
        """
        
        return self.execute_attribution_query(query, org_id, date_range)
```

### **Data Flow Visualization**
```
TTD REDS Files (Hourly)
    ↓
[Event Processing Engine]
    ↓
Match Events to P360 Campaigns
    ↓
Lookup Audience Information  
    ↓
Calculate Attribution Metrics
    ↓
Store in Attribution Tables
    ↓
Generate Reports via Metabase
```

### **Attribution Metrics Calculated**
- **Cost Attribution**: How much spend per audience segment
- **Revenue Attribution**: Revenue generated per campaign/audience
- **Conversion Tracking**: Lead/sales attribution back to campaigns
- **Performance Metrics**: CTR, CPC, ROAS by audience and campaign

---

## 🔧 **Technology Stack Summary**

**Database & Storage:**
- PostgreSQL (RDS Multi-AZ) for operational data
- S3 for file storage (CSV, REDS, Bombora files)
- Redis (ElastiCache) for session/cache management

**Compute & Processing:**
- AWS Fargate for containerized applications
- AWS Lambda for event-driven processing
- AWS Batch for large-scale data processing

**Authentication & Security:**
- Microsoft Entra ID for internal SSO
- Auth0 for external user authentication
- AWS IAM for service-to-service authentication

**Monitoring & Operations:**
- CloudWatch for metrics and logging
- X-Ray for distributed tracing
- SNS for alerting and notifications

This architecture supports the high-volume, multi-tenant requirements while maintaining performance, security, and scalability for the January 2026 deadline.
