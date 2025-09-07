# PDF File: P360 DSP -- External Scopes (1) 1.pdf
==================================================

**Total Pages**: 8

## Page 1
--------------------
Pipeline360 // Display RFP & Scopes
Executive Summary
Why This Matters:
High Level Core Requirements
Integration Object Mapping
Technical Architecture Requirements
Integration Requirements Detail
Project Roles & Responsibilities
P360 Responsibilities
Timeline & Critical Success Milestones
Data Processing Requirements
Technical Deliverables
Submission Requirements
Appendix: Bombora Data Structure: 
Executive Summary
Pipeline-360 is seeking a qualified development partner to build a comprehensive Display advertising platform that
integrates with The TradeDesk, Internal Vendors and can be adjusted based upon customer data & preferences. This
product serves 3 primary purposes in itʼs completed state: 1) The ability for a customer to generate Advertising campaigns
via a hierarchal & programmatic campaign structure 2) the ability to generate audiences based upon their targeting
parameters and 3) the ability to reconcile the performance of these campaigns into our primary business context of
Branded Demand. This platform represents a critical business initiative with a firm deadline of December 19th 2025 for the
first customer dollar to be processed.
The successful vendor will work collaboratively with P360's product and engineering  teams while maintaining development
responsibility for the front end and back end code of the proposed solution. A strong vendor will be able to justify proposed
language solutions (ex, React / Node) and a proposed path for hosting and storage (ex: AWS / Azure). This project requires
expertise in high-volume data processing, real-time integrations, and a bonus to experience with programmatic advertising
workflows.
Why This Matters:
This platform directly generates customer revenue and must be production-ready by December 19th 2025 to meet
committed customer deliverables and revenue targets. The core of this product will contain several re-usable components
(Programs / Audience Builder) that we envision growing usage of in the long run of our product lifecycle.

## Page 2
--------------------
High Level Core Requirements
User Management System
Multi-tenant user authentication and authorization
Role-based permission system with organizational hierarchy. 
Future SSO capability (OAuth/SAML ready architecture for future products)
Admin + Login Pages (UI / UX)
Ability for a user with proper roles to create organizations, add users, link organizations to known seats in other
entities.
Program & Campaign Management (UI / UX Involved)
A Hierarchal Program creation flow, which houses parent rules for Display Campaigns and Line Items via APIʼs
and an interface.
Display Line Item tactical configuration
Budget allocation and flight date management
Audience targeting parameter configuration
Campaign status tracking and table views.
Audience Building and Management (UI / UX Involved)
Ability for a user to upload a .csv and store data in the product. This will be a series of domains in a .csv. 
Ability for a user to compose audiences based off of .csvʼ and/or data provided in the product by vendor
(Bombora) using and/or logic trees using the sourced parameters of their .csvʼs or the underlying Bombora data.
Ability for a created audience to be translated into an array posted into TTD
Data Processing Infrastructure
First Party Database for customer data normalization
High-volume file processing (2K+ CSV uploads annually)
Real-time data ingestion from vendor partners (20-60M records daily)
Data quality validation and error handling
Attribution logic processing and reconciliation

## Page 3
--------------------
Integration Layer
The TradeDesk campaign creation and reporting APIs: Partner Portal
The TradeDesk REDS Service will deliver files to us via a S3 file processing: Partner Portal
Bombora data ingestion from AWS S3 buckets for file processing
READ Connection to Internal Salesforce via an API connected to our seat
Future Integrate platform connectivity (architecture preparation)
Reporting & Analytics (UX / UI / iFrame)
Metabase dashboard embedding via iframe →  Metabase Open Source Editions
Results & statistics queried from TTD APIʼs
Attribution reporting connects customer data to campaign outcomes by joining log files from Bombora, Audiences,
and TTD.
Data hygiene cycles created for products requiring attribution
Activity Service
Comprehensive user audit logging – features write to service for history logs.
System monitoring and health checks – written on a feature-by-feature basis.
Consumable via UI and CSV export
Integration with monitoring and alerting systems
Integration Object Mapping
Customer Advertiser POST
/v3/advertiserRepresentative of 
Program Logical Container (P360
DB)N/A (Internal) Cross-campaign budget
management, high-level
audience definition, multi-
channel coordination.
Campaign Campaign POST /v3/campaignOverall budget, flight
dates, primary channel,
high-level KPIs (goals).
Container for Ad Groups.
Line Item Ad Group POST /v3/adgroupGranular targeting, bid
strategy (MaxBidCPM),
creative assignment,
pacing, specific budget
allocation.Pipeline360 Entity TTD API Entity/ConceptTTD API Endpoints Key Responsibilities

## Page 4
--------------------
Pipeline360 can provide a proposed entity and object mapping in a separate format should it need to be needed further. Our
internal Datawarehouseʼs & Bombora are not tied to specific objects, moreover they are data sources that span multiple
data sources.
Technical Architecture Requirements
Technology Stack (A sample proposal may ) 
Frontend: React (latest stable version)
Backend: .NET (latest LTS version) or equivalent
Database: PostgreSQL or SQL Server on AWS RDS or equivalent
Hosting: AWS (EC2, S3, RDS, Lambda as appropriate) or equivalent
Data Processing: AWS Glue, SQS, SNS for data pipeline management or equivalent
Performance & Scalability Requirements
Integration Architecture & Data FlowsAudience Segment Audience & Data
GroupPOST
/v3/datagroup, POST
/v3/audienceDefinition of targetable
user sets using first-party
and third-party data
elements.
Users 12 admin users (initial) →
200+ reporting users.Peak usage < 2 second page loads
Vendor Data Ingestion20-60M records Daily batch Process within 4 hours
Customer File Uploads2K files/year (850 average
file)On-demand < 30 seconds processing
Salesforce Sync Accounts, Opportunities,
Line Items3x daily + on-demand< 15 minutes full sync
Campaign Actions Real-time updates User-initiated < 5 seconds responseComponent Volume Frequency Performance
Requirement
The TradeDesk
APIBidirectionalCampaign
creation,
reportingReal-time
campaigns, daily
reportingREST API Campaign
management +
performance
data
The TradeDesk
REDSInbound Attribution log
filesHourly S3 file dropRequires custom
attribution logicSystem Direction Data Type FrequencyFormat Notes

## Page 5
--------------------
Security & Compliance Requirements
GDPR Compliance: Full data protection and right to erasure capabilities
CCPA Compliance: California consumer privacy requirements
SOC 2 Preparation: Architecture must support future SOC 2 certification (2026)
Data Encryption: At rest and in transit
Access Controls: Role-based permissions with audit trails
API Security: OAuth 2.0, rate limiting, input validation
User Roles & Permissions
[P360 will provide detailed user role matrix in conjunction with designs and entity mapping]. We should assume for sake of
argument 
Integration Requirements Detail
The TradeDesk Integration
Campaign Creation: Full campaign setup including audiences, budgets, targeting
Reporting API: Daily performance data retrieval and reconciliation
REDS Service: Hourly S3 file processing with custom attribution logic
Error Handling: Robust retry logic and failure notification systems
Salesforce Integration
Objects: Accounts, Opportunities, Opportunity Line Items
Sync Frequency: 3x daily automated + real-time on-demand
Data Mapping: Bidirectional field mapping with conflict resolution
Audit Trail: All sync activities logged with success/failure tracking
Bombora Integration
Data Type: Intent data for audience enhancement
Delivery Method: S3 bucket file drops (P360-provisioned)
Processing: Real-time ingestion with data validation
Integration Logic: Match data to customer audiencesBombora Inbound Intent data &
Cookie SharingDaily S3 file dropCustomer
audience
enhancement
Salesforce BidirectionalAccount/Opportu
nity
reconciliation3x daily + on-
demandREST API Billing and
customer
management
Integrate BidirectionalCustomer
platform dataFuture
implementationAPI/File Architecture
preparation only

## Page 6
--------------------
Project Roles & Responsibilities
P360 Responsibilities
Product Management: Requirements definition, user story creation, acceptance criteria
Design: Complete UI/UX design system, wireframes, prototypes, and design specifications via provided figmaʼs
and demoʼs.
Infrastructure: AWS account provisioning and initial setup
Integration Support: API credentials with vendors, vendor relationship management
Testing Support: User acceptance testing, business logic validation. Final feature sign off.
Documentation Review: Technical documentation review and approval
Development Partner Responsibilities
Technical Architecture: System design, database schema, API architecture
Full Stack Development: Frontend React application and .NET backend services
Database Design: Schema design, optimization, migration strategies
Integration Development: All third-party API integrations and data processing
Testing: Unit testing, integration testing, performance testing
DevOps: CI/CD pipeline setup, deployment automation, monitoring setup
Documentation: Technical documentation, API documentation, deployment guides
Code Quality: Code reviews, security scanning, performance optimization
Project Management: Sprint planning, daily standups, progress reporting with P360
Shared Responsibilities
Code Reviews: Joint review process with P360 technical team oversight
Deployment: Collaborative deployment with P360 infrastructure team
Monitoring: Joint system monitoring and incident response
Knowledge Transfer: Ongoing knowledge sharing throughout development process
Timeline & Critical Success Milestones
Non-Negotiable Deadline: First customer dollar transacted: December 19th 2025
First Customer Dollar Traffic Requirements:
1. Customer organization provisioned in product
2. Audience uploaded and created in product
3. Campaign launched with associated audience and sent to TTD
4. TradeDesk integration operational with live campaigns built TTD
5. Attribution data flowing from REDS service into Product
6. Attributed Reporting Tables created in Product
7. Salesforce billing reconciliation functional
Data Processing Requirements
Customer File Processing
Volume: 2,000 CSV files annually. .csv utf-8 acceptable minimum functionality

## Page 7
--------------------
Size Range: Average 850 records per file (maximum 10,000)
Processing Time: < 30 seconds per file to upload
Validation: Data quality checks, format validation, duplicate detection
Error Handling: Detailed error reporting and resolution workflows
Vendor Data Ingestion
Daily Volume: 20-60 million records
Processing Window: 4-hour maximum processing time
Data Sources: The TradeDesk REDS (hourly), Bombora (daily)
Quality Assurance: Data validation, reconciliation, and error reporting
Attribution Logic: Custom business rules connecting campaign data to internal vendor data and customer inputs.
Technical Deliverables
Code & Architecture
Repository Access: Full Git repository with branching strategy
Code Documentation: Inline comments, README files, architecture documentation
API Documentation: Complete OpenAPI/Swagger specifications
Database Documentation: ERD, schema documentation, migration scripts
Testing & Quality Assurance
Unit Testing: Minimum 80% code coverage target
Integration Testing: All API endpoints and data flows tested
Performance Testing: Load testing for specified capacity requirements
Security Testing: Vulnerability scanning and penetration testing
AWS Best Practices: Following AWS Well-Architected Framework principles
Deployment & Operations
CI/CD Pipeline: Automated build, test, and deployment processes
Infrastructure as Code: Terraform or CloudFormation templates
Monitoring Setup: CloudWatch, application performance monitoring
Backup Strategy: Automated backup and recovery procedures
Scaling Documentation: Auto-scaling configuration and manual scaling procedures
Submission Requirements
Technical Proposal
Detailed system architecture diagram
Technology stack justification and implementation approach
Integration strategy for each third-party system
Database design and data modeling approach
Security and compliance implementation plan
Testing strategy and quality assurance methodology
Project Management

## Page 8
--------------------
Detailed project timeline with dependencies
Resource allocation and team member profiles
Risk assessment and mitigation strategies
Communication plan and collaboration tools
Change management and scope control processes
Company Qualifications
Company overview and relevant experience
Team member resumes and role assignments
Client references (minimum 2) for similar projects
Certifications and partnerships (AWS, Microsoft, etc.)
Financial stability and project capacity confirmation
Appendix: Bombora Data Structure: 
1{
2"hem":"abc-123-456",
3"domain":"capitalone.com",
4"company_name":"capitalone",
5"industry":["Finance"],
6"industry_id":["ind_39"],
7"revenue":["XXLarge($1B+)"],
8"revenue_id":["re_7"],
9"size":["XXLarge(10,000+Employees)"],
10"size_id":["sz_8"],
11"Tradedesk Cookie ID"], 442798977482733993
12"install_data":["EnterpriseApplications>EnterpriseBusiness
13Solutions(EBS)"],
14"install_data_id":["id_4"],
15"functional_area":["InformationTechnology>Software"],
16"functional_area_id":["fa_31"],
17"professional_group":["BusinessProfessional",
18"Fortune500Employee",
19"FinanceProfessional"],
20"professional_group_id":["pg_1","pg_4","pg_3"],
21"seniority":["Management"],
22"seniority_id":["sn_3"],
23"decision_maker":["FinanceDecisionMaker"],
24"decision_maker_id":["dm_1"],
25"country":"UnitedStates",
26"topic":["E*Trade(ETFC)"],
27"topic_id":["1500923"],
28"interest_group":["Trading&Investing"],
29"in
