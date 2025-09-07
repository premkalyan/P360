# P360 DAP MVP - Critical Questions & Dependencies

## Executive Summary

This document outlines critical questions, dependencies, and clarifications needed before project kickoff to ensure smooth delivery and avoid timeline risks.

**Status**: ⚠️ **CRITICAL** - These items must be resolved in Week 1 of project kickoff  
**Impact**: Delays in these areas directly affect the January 9, 2026 deadline

**🆕 RECENTLY ADDED CRITICAL ITEMS:**
- AWS Network & Infrastructure Access requirements
- Final UX Screens completion status and timeline
- Entra ID + Auth0 access strategy (immediate vs future)
- External system mock services and test connectors strategy
- Enhanced architecture components (monitoring, security, CI/CD, quality tools)

---

## 🎨 **UX/UI Design Dependencies**

### **CRITICAL: Design Deliverables Required**
The SOW explicitly states: *"There will be no designs created by Bounteous as part of this specific scope. All designs including copy will be provided by the Client prior to the start of the project."*

#### **Design Questions:**
1. **Design Readiness Status**
   - [ ] Are wireframes/mockups completed for all 12 screens?
   - [ ] Are user journey flows documented?
   - [ ] Is the design system/component library ready?
   - [ ] Are responsive design specifications available?

2. **⚠️ CRITICAL: Final UX Screens Status**
   - [ ] **Completion Status**: What percentage of the 12 screens are finalized?
   - [ ] **Design System**: Is there a complete component library and style guide?
   - [ ] **Responsive Specifications**: Are mobile/tablet breakpoints defined?
   - [ ] **Interactive Prototypes**: Are there clickable prototypes for complex workflows?
   - [ ] **Design Handover Format**: Figma, Sketch, Adobe XD with developer handoff specs?
   - [ ] **Asset Delivery**: Are icons, images, and other assets ready for development?

3. **Design Handover Process**
   - [ ] Who is the primary design contact for clarifications?
   - [ ] How will design updates be communicated during development?
   - [ ] What's the approval process for design implementation?
   - [ ] What's the timeline for design iteration during development?

3. **Specific Design Areas Needed**
   - [ ] **Authentication flows** (login, SSO, external auth)
   - [ ] **Admin console** (user management, org setup, reconciliation)
   - [ ] **Audience builder** (CSV upload, logic tree builder, preview)
   - [ ] **Campaign management** (program hierarchy, campaign wizard)
   - [ ] **Reporting dashboards** (Metabase embedding layouts)
   - [ ] **Error states and loading** (404, 500, processing states)

#### **Design Risk Mitigation:**
- [ ] Request design delivery by **September 15, 2025** (Week 2)
- [ ] Establish design review checkpoints during sprints
- [ ] Plan for design iteration cycles
- [ ] Identify design bottlenecks early

---

## 🔗 **Third-Party Integration Dependencies**

### **1. The Trade Desk (TTD) Integration**

#### **Access & Credentials Questions:**
- [ ] **TTD Partner Portal Access**: Who has admin access? How do we get developer accounts?
- [ ] **API Credentials**: How are advertiser API keys managed? Is there a test/sandbox environment?
- [ ] **REDS Service Setup**: Is the S3 bucket provisioned? What's the file delivery schedule?
- [ ] **Authentication**: How do we handle TTD API key rotation? What's the security protocol?

#### **Technical Specification Questions:**
- [ ] **API Version**: Which TTD API version should we target? (v3 mentioned in SOW)
- [ ] **Rate Limits**: What are the API rate limits? How should we handle throttling?
- [ ] **Data Format**: Are there specific JSON schema requirements for audience export?
- [ ] **Error Handling**: What are the standard error codes and retry patterns?

#### **Business Process Questions:**
- [ ] **Advertiser Setup**: How are new advertisers provisioned in TTD?
- [ ] **Seat Management**: How do we map P360 organizations to TTD seats?
- [ ] **Campaign Approval**: Are there approval workflows in TTD we need to respect?
- [ ] **Billing Integration**: How does TTD billing reconcile with P360 billing?

### **2. Bombora Integration**

#### **Data Access Questions:**
- [ ] **S3 Bucket Access**: Is the Bombora S3 bucket provisioned? What are the IAM permissions?
- [ ] **Data Schema**: Is there updated documentation for the Bombora data structure?
- [ ] **File Schedule**: What's the exact delivery schedule? (daily at what time?)
- [ ] **Data Volume**: What's the actual daily record volume? (20-60M is a wide range)

#### **Data Processing Questions:**
- [ ] **Data Retention**: How long should we retain Bombora data?
- [ ] **Data Quality**: What validation rules should we implement?
- [ ] **Taxonomy Updates**: How often does Bombora update their taxonomy?
- [ ] **Backfill Requirements**: Do we need historical data for testing?

### **3. Salesforce Integration**

#### **API Access Questions:**
- [ ] **Salesforce Org**: Which Salesforce org(s) will we connect to?
- [ ] **API Credentials**: How do we get connected app credentials?
- [ ] **Field Mapping**: Is there a complete field mapping document?
- [ ] **Sync Permissions**: What objects can we read/write? What are the field-level permissions?

#### **Business Process Questions:**
- [ ] **Sync Timing**: Are the 3x daily sync times specified? (morning, afternoon, evening?)
- [ ] **Conflict Resolution**: What's the business logic for handling data conflicts?
- [ ] **Manual Reconciliation**: Who will perform manual reconciliation? What's the training process?
- [ ] **Data Governance**: Are there data retention and privacy requirements?

### **⚠️ CRITICAL: Mock Services & Test Connectors**

#### **Development Independence Questions:**
- [ ] **TTD Mock Services**: Do we need to create mock TTD APIs for development? What endpoints?
- [ ] **Bombora Test Data**: Do we have sample Bombora S3 files for testing data processing?
- [ ] **Salesforce Sandbox**: Is there a dedicated Salesforce sandbox org for development?
- [ ] **Test Data Generation**: Can we generate realistic test data that matches production schemas?

#### **Integration Testing Strategy:**
- [ ] **API Simulation**: Should we use tools like WireMock or create custom mocks?
- [ ] **Data Pipeline Testing**: How do we test high-volume data processing without real volumes?
- [ ] **Error Scenario Testing**: How do we simulate API failures and edge cases?
- [ ] **Performance Testing**: Can we test against production-like endpoints or need simulation?

#### **Development Environment Strategy:**
- [ ] **Isolated Development**: Can developers work independently without external API dependencies?
- [ ] **Integration Environment**: When/how do we test against real external systems?
- [ ] **Test Account Management**: Who manages test accounts across all external systems?
- [ ] **Data Refresh Strategy**: How often do we refresh test data from external systems?

---

## 🛠️ **Technical Infrastructure Questions**

### **AWS Environment Setup**
- [ ] **AWS Account**: Is the AWS account provisioned? Who has admin access?
- [ ] **Account Structure**: Single account or multi-account strategy?
- [ ] **Network Configuration**: Are there VPN or network connectivity requirements?
- [ ] **Security Requirements**: Are there specific security policies or compliance requirements?

### **⚠️ CRITICAL: Client AWS Network Access**
- [ ] **AWS Account Provisioning**: Do we have the client AWS account ready for infrastructure deployment?
- [ ] **Network Architecture**: What's the existing network topology? VPC structure?
- [ ] **Connectivity Requirements**: Are there existing VPN connections or Direct Connect?
- [ ] **Security Policies**: What are the organization's AWS security policies and guardrails?
- [ ] **IAM Permissions**: What level of access will Bounteous team have for infrastructure setup?
- [ ] **Multi-Account Strategy**: Are we using Control Tower or Organization setup?
- [ ] **Existing Resources**: Are there existing AWS resources we need to integrate with?

### **Monitoring & Observability**
- [ ] **Monitoring Tools**: Is DataDog confirmed, or should we use CloudWatch?
- [ ] **Log Aggregation**: What's the preferred logging solution?
- [ ] **Alerting**: Who should receive alerts? What are the escalation procedures?
- [ ] **Dashboards**: Are there specific KPIs that need to be tracked?

### **⚠️ MISSING: Additional Tech Components Architecture**

#### **Enhanced Monitoring Stack (Recommended)**
- [ ] **CloudWatch + X-Ray**: Basic AWS monitoring vs enhanced observability stack?
- [ ] **Prometheus + Grafana**: Should we implement custom metrics and dashboards?
- [ ] **Distributed Tracing**: Is X-Ray sufficient or do we need additional tracing tools?
- [ ] **APM Integration**: Application performance monitoring requirements?

#### **Enhanced Security Components (Recommended)**
- [ ] **AWS WAF**: Web Application Firewall implementation and rules configuration?
- [ ] **AWS Secrets Manager**: Centralized secrets management vs other solutions?
- [ ] **VPC Security**: Enhanced network security beyond basic security groups?
- [ ] **Compliance Scanning**: Automated security scanning and compliance monitoring?

#### **CI/CD & DevOps Tools (Recommended)**
- [ ] **GitHub Actions vs GitLab**: Preference for CI/CD platform? Integration ecosystem considerations?
- [ ] **Container Registry**: ECR vs other registry solutions?
- [ ] **Deployment Automation**: Terraform + additional orchestration tools?
- [ ] **Environment Management**: How many environments and promotion strategy?

#### **Code Quality & Security Scanning (Recommended)**
- [ ] **SonarQube**: Code quality analysis and technical debt tracking?
- [ ] **Snyk Vulnerability Scanning**: Security vulnerability detection in dependencies?
- [ ] **Static Code Analysis**: SAST tools integration in CI/CD pipeline?
- [ ] **License Compliance**: Open source license scanning and management?

#### **Performance & Reliability Tools**
- [ ] **Load Testing**: Locust, JMeter, or other performance testing tools?
- [ ] **Chaos Engineering**: Do we need fault injection testing tools?
- [ ] **Synthetic Monitoring**: Uptime monitoring and user journey validation?
- [ ] **Backup & Recovery**: Automated backup solutions beyond basic RDS backups?

### **Database & Storage**
- [ ] **Database Sizing**: What's the expected data growth rate for capacity planning?
- [ ] **Backup Requirements**: What are the RTO/RPO requirements beyond what we've specified?
- [ ] **Data Encryption**: Are there specific encryption requirements (FIPS, etc.)?
- [ ] **Compliance**: Are there SOC2, GDPR, or other compliance requirements?

---

## 👥 **Team & Process Dependencies**

### **P360 Team Roles**
- [ ] **Product Lead**: Who is the full-time SME mentioned in the SOW?
- [ ] **Technology Lead**: Who is the part-time technical authority?
- [ ] **Designer**: Who is the full-time designer providing mockups?
- [ ] **Executive Sponsor**: Who handles escalations and major decisions?

### **Communication & Collaboration**
- [ ] **Project Tools**: What tools for communication? (Slack, Teams, Discord?)
- [ ] **Documentation**: Where should we maintain project documentation?
- [ ] **Code Repository**: GitLab confirmed? Who manages access?
- [ ] **Meeting Cadence**: What's the preferred schedule for standups, demos, reviews?

### **Decision-Making Process**
- [ ] **Approval Authority**: Who can approve scope changes?
- [ ] **Technical Decisions**: Who has final say on architecture choices?
- [ ] **Feature Prioritization**: How do we handle change requests?
- [ ] **Go-Live Approval**: Who makes the final production deployment decision?

---

## 📊 **Business Logic & Process Questions**

### **User Management & Security**
- [ ] **User Provisioning**: How are new users onboarded? Self-service or admin-only?
- [ ] **Role Hierarchy**: Are there specific org structures we need to model?
- [ ] **Data Access**: How granular should data isolation be between organizations?
- [ ] **Session Management**: What are the session timeout requirements?

### **Campaign & Audience Logic**
- [ ] **Budget Constraints**: What validation rules for budget allocation?
- [ ] **Audience Size Limits**: Are there min/max audience size requirements?
- [ ] **Campaign States**: What are the complete campaign lifecycle states?
- [ ] **Approval Workflows**: Are there manual approval steps we need to implement?

### **Reporting & Attribution**
- [ ] **Attribution Windows**: What attribution windows should we support?
- [ ] **KPI Calculations**: Are there specific formulas for key metrics?
- [ ] **Report Scheduling**: Do we need scheduled report generation?
- [ ] **Data Export**: What export formats are required?

---

## 🔒 **Security & Compliance Questions**

### **Authentication & Authorization**

#### **⚠️ CRITICAL: Entra ID + Auth0 Access Timeline**
- [ ] **Current Access Status**: Do we have access to Entra ID tenant now or plan to integrate later?
- [ ] **Integration Priority**: Should we implement basic auth first and add SSO later?
- [ ] **Tenant Information**: Which specific Entra ID tenant will we integrate with?
- [ ] **App Registration**: Do we need to register the application in Entra ID now?
- [ ] **External Auth Timeline**: When do we need Auth0 setup complete?
- [ ] **Testing Strategy**: How do we test authentication without production tenant access?

#### **Authentication Implementation Questions**
- [ ] **SSO Requirements**: Which Entra ID tenant should we integrate with?
- [ ] **External Auth**: Which Auth0 tenant? Do we need to set up new?
- [ ] **MFA Requirements**: Is multi-factor authentication required for all users?
- [ ] **Password Policies**: Are there specific password complexity requirements?
- [ ] **Session Management**: What are the session timeout and security requirements?

### **Data Protection**
- [ ] **PII Handling**: What constitutes PII in this system? How should it be protected?
- [ ] **Data Residency**: Are there data location requirements?
- [ ] **Audit Logging**: What level of audit detail is required?
- [ ] **Incident Response**: What's the security incident escalation process?

---

## 🧪 **Testing & Quality Assurance Dependencies**

### **Test Data & Environments**
- [ ] **Production Data**: Can we get anonymized production data for testing?
- [ ] **Test Accounts**: Do we need test accounts in TTD, Bombora, Salesforce?
- [ ] **User Testing**: Who will participate in UAT? What's their availability?
- [ ] **Performance Baselines**: What are the current performance benchmarks from Xandr?

### **Quality Gates**
- [ ] **Acceptance Criteria**: Who defines and approves acceptance criteria?
- [ ] **Bug Triage**: What's the process for bug prioritization and assignment?
- [ ] **Performance Testing**: What are the specific load testing requirements?
- [ ] **Security Testing**: Do we need external security audits?

---

## 📅 **Timeline & Milestone Dependencies**

### **Critical Path Items**
- [ ] **MSA Execution**: When will the Master Services Agreement be signed?
- [ ] **Resource Allocation**: When will the full Bounteous team be available?
- [ ] **Design Delivery**: Firm date for design delivery (impacts Sprint 1-2)
- [ ] **API Access**: When will all third-party API access be available?

### **Risk Factors**
- [ ] **Holiday Schedule**: Are there holiday blackouts during development?
- [ ] **Stakeholder Availability**: What's the availability during November/December?
- [ ] **Change Freeze**: Are there any change freezes near go-live?
- [ ] **Backup Plans**: What's the contingency if January 9 date slips?

---

## 🚨 **WEEK 1 CRITICAL PATH ITEMS**

### **Must Complete by September 8, 2025**
1. **Legal & Contracts**
   - [ ] MSA and SOW execution completed
   - [ ] Statement of work signed by all parties

2. **⚠️ CRITICAL: AWS Network & Infrastructure Access**
   - [ ] Client AWS account provisioned and accessible
   - [ ] Network architecture and connectivity requirements clarified
   - [ ] IAM permissions for Bounteous team established
   - [ ] Security policies and compliance requirements documented

3. **⚠️ CRITICAL: Final UX Screens Status**
   - [ ] All 12 screen designs delivered with specifications
   - [ ] Design system and component library finalized
   - [ ] Interactive prototypes for complex workflows
   - [ ] Developer handoff assets and specifications ready

4. **⚠️ CRITICAL: Authentication Access Timeline**
   - [ ] Entra ID tenant access confirmed (now vs later implementation)
   - [ ] Auth0 setup timeline and tenant information
   - [ ] Authentication testing strategy without production access

5. **⚠️ CRITICAL: External System Integration Strategy**
   - [ ] TTD API access, credentials, and sandbox environment
   - [ ] Bombora S3 bucket access and test data availability
   - [ ] Salesforce sandbox org and API credentials
   - [ ] Mock services and test connector strategy defined

6. **⚠️ CRITICAL: Enhanced Architecture Components**
   - [ ] Monitoring stack decisions (CloudWatch+X-Ray+Prometheus+Grafana)
   - [ ] Security components (AWS WAF + Secrets Manager)
   - [ ] CI/CD platform choice (GitHub Actions vs GitLab)
   - [ ] Code quality tools (SonarQube + Snyk) integration plan

7. **Team Coordination**
   - [ ] All key stakeholders identified and available
   - [ ] Communication channels established
   - [ ] Sprint 0 planning completed

---

## 📋 **Action Items & Owners**

### **P360 Action Items**
- [ ] **Design Team**: Deliver all screen designs by September 15
- [ ] **IT Team**: Provision AWS account and third-party API access
- [ ] **Product Team**: Define detailed acceptance criteria for Sprint 1-2
- [ ] **Legal Team**: Execute MSA and SOW by September 8

### **Bounteous Action Items**
- [ ] **Program Manager**: Schedule design review and technical architecture session
- [ ] **Solution Architect**: Review API documentation and integration requirements
- [ ] **DevOps Engineer**: Prepare infrastructure automation scripts
- [ ] **QA Lead**: Define testing strategy and environment requirements

### **Joint Action Items**
- [ ] **Technical Alignment**: Architecture review with P360 technical team
- [ ] **Security Review**: Validate security requirements and compliance needs
- [ ] **Integration Planning**: Detailed planning session for TTD, Bombora, Salesforce
- [ ] **Risk Assessment**: Review and update risk mitigation strategies

---

## 📞 **Escalation & Contact Information**

### **P360 Key Contacts Needed**
- [ ] **Executive Sponsor**: Name, contact, decision authority
- [ ] **Product Owner**: Name, contact, availability schedule
- [ ] **Technical Lead**: Name, contact, architectural authority
- [ ] **Designer**: Name, contact, design delivery timeline

### **Bounteous Team Structure**
- **Program Manager**: [To be assigned]
- **Solution Architect**: [To be assigned]
- **Technical Lead**: [To be assigned]
- **DevOps Engineer**: [To be assigned]

---

**Document Status**: Draft for Review  
**Next Action**: Schedule Week 1 stakeholder alignment meeting  
**Review Date**: Project Kickoff Meeting
