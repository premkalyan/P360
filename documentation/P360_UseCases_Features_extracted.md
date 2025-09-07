# Excel File: DRAFT-P360-Use Cases-Features-v1.0.xlsx
==================================================

**Total Sheets**: 10

## Sheet: TANNER Use Cases & Features
------------------------------
**Dimensions**: 62 rows × 14 columns

**Columns**:
- Unnamed: 0
- Unnamed: 1
- Unnamed: 2
- Unnamed: 3
- Unnamed: 4
- Unnamed: 5
- Unnamed: 6
- Unnamed: 7
- Unnamed: 8
- Unnamed: 9
- Unnamed: 10
- Unnamed: 11
- Unnamed: 12
- Unnamed: 13

**Sample Data**:
Unnamed: 0                Unnamed: 1                         Unnamed: 2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      Unnamed: 3 Unnamed: 4                Unnamed: 5                 Unnamed: 6           Unnamed: 7 Unnamed: 8  Unnamed: 9 Unnamed: 10 Unnamed: 11 Unnamed: 12 Unnamed: 13
                           Use Cases                           Features                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Description    Release              Dependencies               Integrations Cross-Feature Impact    Screens Tables/Ints     T-Shirt   Eng Weeks                        
              1. Audience Management         1.1 CSV Upload & Ingestion                                                                                                                                                                                                                                                       • Users upload .csv of domains; system validates (format, duplicates) and stores in S3. Max 10K records/file; <30s processing.\n• Error log/management for failed imports\n**Discussion Point: Account name matching to domain (might require fuzzy matching, might not be MVP). Also, Domain + Country (CNN US vs UK, etc). AI potential        MVP                    AWS S3                     AWS S3   1.2, 1.3, 1.5, 2.2                                  S           1                        
              1. Audience Management               1.2 Audience Builder                                                                                                                                                                                                                                                                                                                                                          • AND/OR logic tree to segment data from CSV + Bombora fields (e.g., intent data). \n• Supports TTD-compatible JSON output.\n*Status/Change Log w/ revert back to previous audience, etc. Ability to view historical audience builds.         MVP    1.1, 1.3, Bombora, TTD               Bombora, TTD             1.5, 2.2                                  L           4                        
              1. Audience Management 1.3 Audience Field-Mapping Service                                                                                                                                    • Ingests and normalizes Bombora S3 files (20–60M records/day) using predefined schema mappings (e.g., Bombora’s "company_name" → P360’s "account_name"). \n• Normalize fields (e.g., company_name, intent_data) for segmentation.\nValidates data against P360’s taxonomy (e.g., industry verticals, revenue tiers)\n• Real-time ingestion with validation.\n• Performance target: Vendor data processing within 4 hours. log mismatches for manual review.        MVP 1.1, 4.4, AWS S3, Bombora AWS S3, Bombora, Integrate                  1.2                                  M           2                        
              1. Audience Management         1.4 Audience Deduplication                                                                                                                                                                                                                                                                                                                                                                                                                                                                     • Auto-flag duplicate audiences/invalid domains. Invalid Domains = Format (future: company doesn't exist, but out of scope)        MVP                       1.2                                             1.5                                  S           1                        
              1. Audience Management         1.5 Audience Export to TTD • Set-up TTD audience export service using the combined identifier provided by TTD, with batching and API submission\n• Enrich payloads with first-party cookies (if available) and TTD field mappings (e.g., "P360_audience_id" → "ttd_segment_id"). \n• Implement retry logic for API failures (max 3 attempts) with exponential backoff. \n- When does an audience get updated? An audience in tradedesk gets updated upon save in audience builder, full weekly saturation / update from bombora on saturdays. \n\nCreate tradedesk audience for every audience that's configured in P360.         MVP             1.2, 6.1, TTD                TTD, AWS S3                  2.4                                  S           1                        
              1. Audience Management  1.6 ICP Type for Audience Builder                                                                                                                                                                                                                                                                                                                                 A templatized verison / flag of Audience Builder that allows for A user to signify that this Audience represents their ICP. User has a clear distinction in the UI. The ICP Version of Audience Builder will be used to populate seeds in their TTD Advertiser.        MVP             1.2, 6.1, TTD                TTD, AWS S3                               0                                                            
              1. Audience Management     1.7 Seed Creation - Advertiser                                                                                                                                                                                                                                                                                                                                                                                                                                                         Creation of a Seed in TTD using the populated TDID's that are driven from the selection of the ICP Audience Builder - minimum 10K ID's.        MVP             1.2, 6.1, TTD                TTD, AWS S3                               0                                                            
           2. Campaign Orchestration              2.1 Program Hierarchy                                                                                                                                                                                                                                                                                                                                                                     • UI to nest Programs > Campaigns > Line Items. \n• DB schema supports parent-child relationships.\n- At some point, programs will need to hold files (non-mvp, but nice-to-have)\n- Program --> IO, Campaign --> Line Item        MVP                                                                  2.2, 2.3                                  M           2                        
           2. Campaign Orchestration         2.2 Campaign Configuration                                                                                                                                                                                                                                                                                                                                                                                                                   • Set budget, flight dates, KPIs, and assign audiences (from 1.2). \n• Real-time validation (e.g., budget ≤ Program cap).\nStatus / creation based off status, errors for Uis        MVP                  1.2, 2.1                                        2.4, 2.5                                  S           1                        

**Total Records**: 62 (showing first 10)

**Unnamed: 1 - Unique Values**: Use Cases, 1. Audience Management, 2. Campaign Orchestration, 3. Attribution & Reporting, 4. Data Integration: Bombaro, 4. Data Integration: TTD, 4. Data Integration: Salesforce, 7. Advanced Data Management, 5. Operational Support, 6. Performance Insights & Optimization
**Unnamed: 4 - Unique Values**: Release, MVP, Post-MVP
**Unnamed: 6 - Unique Values**: Integrations, AWS S3, Bombora, TTD, AWS S3, Bombora, Integrate, TTD, AWS S3, TTD, TTD, 4.7, Salesforce, Metabase, Metabase, TTD
**Unnamed: 8 - Unique Values**: Screens, 0
**Unnamed: 9 - Unique Values**: Tables/Ints
**Unnamed: 10 - Unique Values**: T-Shirt, S, L, M, XXL, XL
**Unnamed: 11 - Unique Values**: Eng Weeks, 1, 4, 2, 8, 6
**Unnamed: 12 - Unique Values**: need new feature for biz review, 4 feeds w/ UIDs (Tanner), evaluate API credits w/ Salesforce, reporting client we determine (Dependency). Bounteous to provide recs. , infra, Tanner to clarify joins, Infra, INfra, redundant to datadog features
**Unnamed: 13 - Unique Values**: infra

## Sheet: Traceability
------------------------------
**Dimensions**: 195 rows × 9 columns

**Columns**:
- Unnamed: 0
- Unnamed: 1
- https://miro.com/app/board/uXjVIkjtAqk=/?userEmail=nate.williams@bounteous.com&track=true&utm_source=notification&utm_medium=email&utm_campaign=add-to-board&utm_content=go-to-board&lid=6e2oe7utvsa4
- Unnamed: 3
- Unnamed: 4
- Unnamed: 5
- Unnamed: 6
- Unnamed: 7
- Unnamed: 8

**Sample Data**:
Unnamed: 0                         Unnamed: 1 https://miro.com/app/board/uXjVIkjtAqk=/?userEmail=nate.williams@bounteous.com&track=true&utm_source=notification&utm_medium=email&utm_campaign=add-to-board&utm_content=go-to-board&lid=6e2oe7utvsa4                           Unnamed: 3 Unnamed: 4                   Unnamed: 5            Unnamed: 6 Unnamed: 7                         Unnamed: 8
                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                    Direct Dependency Management                                                                    
                              Feature Mapping                                                                                                                                                                                        Work Unit Type                                 Name      Units        D/S Dep (Tables + UI) U/S Dep (Tables + UI)    Tot Dep                              Check
                   1.1 CSV Upload & Ingestion                                                                                                                                                                                             UI/Screen                      Audience Import          1                            1                     0          1         1.1 CSV Upload & Ingestion
           1.3 Audience Field-Mapping Service                                                                                                                                                                                             UI/Screen       Audience Field Mapping Service          1                            3                     2          5 1.3 Audience Field-Mapping Service
                         1.2 Audience Builder                                                                                                                                                                                             UI/Screen                     Audience Builder          1                            3                     2          5               1.2 Audience Builder
                   1.1 CSV Upload & Ingestion                                                                                                                                                                                     Table/Integration                      Audience Import          1                            0                     0          0         1.1 CSV Upload & Ingestion
           1.3 Audience Field-Mapping Service                                                                                                                                                                                     Table/Integration       Audience Field Mapping Service          1                            3                     2          5 1.3 Audience Field-Mapping Service
                         1.2 Audience Builder                                                                                                                                                                                     Table/Integration Account-Based Audience Config (JSON)          1                            1                     1          2               1.2 Audience Builder
                         1.2 Audience Builder                                                                                                                                                                                     Table/Integration                  People-Based (JSON)          1                            1                     1          2               1.2 Audience Builder

**Total Records**: 195 (showing first 10)

**https://miro.com/app/board/uXjVIkjtAqk=/?userEmail=nate.williams@bounteous.com&track=true&utm_source=notification&utm_medium=email&utm_campaign=add-to-board&utm_content=go-to-board&lid=6e2oe7utvsa4 - Unique Values**: Work Unit Type, UI/Screen, Table/Integration, Audience, Campaign Orchestration, Attribution & Reporting
**Unnamed: 4 - Unique Values**: Units, 1, 3, 5, 0
**Unnamed: 5 - Unique Values**: Direct Dependency Management, D/S Dep (Tables + UI), 1, 3, 0, 2, 4, 5, 30
**Unnamed: 6 - Unique Values**: U/S Dep (Tables + UI), 0, 2, 1, 3, 4, 5
**Unnamed: 7 - Unique Values**: Tot Dep, 1, 5, 0, 2, 3, 4, 6, 31

## Sheet: UC Summary
------------------------------
**Dimensions**: 39 rows × 10 columns

**Columns**:
- Unnamed: 0
- Unnamed: 1
- Unnamed: 2
- Unnamed: 3
- Unnamed: 4
- Unnamed: 5
- Unnamed: 6
- Unnamed: 7
- Unnamed: 8
- Unnamed: 9

**Sample Data**:
Unnamed: 0                         Unnamed: 1 Unnamed: 2 Unnamed: 3 Unnamed: 4 Unnamed: 5          Unnamed: 6 Unnamed: 7 Unnamed: 8                       Unnamed: 9
                                                     MVP                           Demand                                                                           
                        Use Case / Capability   Features    Screens     Tables        Wks             % Total                                                       
                   3. Attribution & Reporting          2          1          8         14 0.23333333333333334          x                                            
                       1. Audience Management          5          3          5          9                0.15                                                       
                    2. Campaign Orchestration          8          4          4          7 0.11666666666666667          x                                            
                  7. Advanced Data Management          3          0          1          6                 0.1                                                       
                     4. Data Integration: TTD          4          0          6          5 0.08333333333333333          x                                            
              4. Data Integration: Salesforce          4          0          5          5 0.08333333333333333                                                       
                      13. Roles & Permissions          6          2          3          5 0.08333333333333333          x            55% reusable for for marketplace
           8. User & System Activity Tracking          2          1          1          4 0.06666666666666667          x                                            

**Total Records**: 39 (showing first 10)

**Unnamed: 2 - Unique Values**: MVP, Features, 2, 5, 8, 3, 4, 6, 1, 9
**Unnamed: 3 - Unique Values**: Screens, 1, 3, 4, 0, 2, 12, Sprints, 5
**Unnamed: 4 - Unique Values**: Tables, 8, 5, 4, 1, 6, 3, 0, 39, Dev/Wk/sp
**Unnamed: 5 - Unique Values**: Demand, Wks, 14, 9, 7, 6, 5, 4, 3, 1
**Unnamed: 6 - Unique Values**: % Total, 0.23333333333333334, 0.15, 0.11666666666666667, 0.1, 0.08333333333333333, 0.06666666666666667, 0.05, 0.016666666666666666, 0
**Unnamed: 7 - Unique Values**: x
**Unnamed: 9 - Unique Values**: 55% reusable for for marketplace

## Sheet: DRAFT AI Use Cases
------------------------------
**Dimensions**: 15 rows × 5 columns

**Columns**:
- Unnamed: 0
- Use Case Area
- Feature
- AI Use Case
- HL Description

**Sample Data**:
Unnamed: 0                Use Case Area                     Feature                       AI Use Case                                                                                                                                                                               HL Description
                    Audience Management      Audience Deduplication      ML-Based Fuzzy Deduplication          Uses NLP and clustering to identify and flag near-duplicate domains or company names in CSV uploads and Bombora data, improving targeting accuracy and reducing redundant outreach.
                    Audience Management      Audience Field-Mapping            Dynamic Schema Mapping                                                                                                                                                                                         Priy
                    Audience Management      Audience Export to TTD        Privacy-Safe UID2 Identity                                                                                Normalizes UID2 identifiers for TTD exports, ensuring GDPR/CCPA compliance. Logs mismatches for audit trails.
                    Audience Management            Audience Builder    AI-Powered Segment Suggestions              Recommends new audience segments based on analysis of historical campaign performance, Bombora intent, and existing audience attributes using vector embeddings for similarity.
                 Campaign Orchestration         Forecast Generation         Predictive Reach & Pacing                                             Forecasts campaign reach and pacing over time by analyzing historical campaign data, market trends, and audience size to inform budget planning.
                 Campaign Orchestration Future: Optimization Engine    Real-Time Bid/Budget Optimizer                                               Analyzes live campaign data (REDS + TTD) to recommend optimal bid adjustments, pacing, or budget reallocation to maximize campaign efficiency.
           Data Integration: Salesforce          Manual/Bulk Record  Automated Record Matching Engine                                 Uses fuzzy matching and ML heuristics to suggest mappings between orphaned P360 campaigns and Salesforce opportunities, including conflict resolution logic.
                 Marketplace Management     Future: Creative Review    Creative Compliance Classifier                                                          Flags policy/brand violations in seller-uploaded assets (JPEG/PDF) using NLP and image analysis, preventing non-compliant listings.
                Attribution & Reporting         REDS Data Ingestion    Anomaly Detection for TTD Logs                                                  Monitors hourly REDS files for anomalies (e.g., sudden impression drops, spike in invalid clicks), triggering alerts for campaign managers.
                 Campaign Orchestration      Campaign Configuration Dynamic Budget Allocation Advisor Recommends optimal budget shifts across line items within a campaign based on real-time performance (CTR, spend vs. forecast), integrating directly with TTD sync for automated adjustments.

**Total Records**: 15 (showing first 10)

**Use Case Area - Unique Values**: Audience Management, Campaign Orchestration, Data Integration: Salesforce, Marketplace Management, Attribution & Reporting, Tech Foundation, Advanced Data Management, User & System Activity, Operational Support
**Feature - Unique Values**: Audience Deduplication, Audience Field-Mapping, Audience Export to TTD, Audience Builder, Forecast Generation, Future: Optimization Engine, Manual/Bulk Record, Future: Creative Review, REDS Data Ingestion, Campaign Configuration
**AI Use Case - Unique Values**: ML-Based Fuzzy Deduplication, Dynamic Schema Mapping, Privacy-Safe UID2 Identity, AI-Powered Segment Suggestions, Predictive Reach & Pacing, Real-Time Bid/Budget Optimizer, Automated Record Matching Engine, Creative Compliance Classifier, Anomaly Detection for TTD Logs, Dynamic Budget Allocation Advisor
**HL Description - Unique Values**: Uses NLP and clustering to identify and flag near-duplicate domains or company names in CSV uploads and Bombora data, improving targeting accuracy and reducing redundant outreach., Priy, Normalizes UID2 identifiers for TTD exports, ensuring GDPR/CCPA compliance. Logs mismatches for audit trails., Recommends new audience segments based on analysis of historical campaign performance, Bombora intent, and existing audience attributes using vector embeddings for similarity., Forecasts campaign reach and pacing over time by analyzing historical campaign data, market trends, and audience size to inform budget planning., Analyzes live campaign data (REDS + TTD) to recommend optimal bid adjustments, pacing, or budget reallocation to maximize campaign efficiency., Uses fuzzy matching and ML heuristics to suggest mappings between orphaned P360 campaigns and Salesforce opportunities, including conflict resolution logic., Flags policy/brand violations in seller-uploaded assets (JPEG/PDF) using NLP and image analysis, preventing non-compliant listings., Monitors hourly REDS files for anomalies (e.g., sudden impression drops, spike in invalid clicks), triggering alerts for campaign managers., Recommends optimal budget shifts across line items within a campaign based on real-time performance (CTR, spend vs. forecast), integrating directly with TTD sync for automated adjustments.

## Sheet: INT OLD Use Cases & Features
------------------------------
**Dimensions**: 58 rows × 16 columns

**Columns**:
- Unnamed: 0
- Unnamed: 1
- Unnamed: 2
- Unnamed: 3
- Unnamed: 4
- Unnamed: 5
- Unnamed: 6
- Unnamed: 7
- Unnamed: 8
- Unnamed: 9
- Unnamed: 10
- Unnamed: 11
- Unnamed: 12
- Unnamed: 13
- Unnamed: 14
- Unnamed: 15

**Sample Data**:
            Unnamed: 0                Unnamed: 1                         Unnamed: 2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Unnamed: 3     Unnamed: 4                Unnamed: 5                 Unnamed: 6           Unnamed: 7                                                                                                                                                                       Unnamed: 8 Unnamed: 9 Unnamed: 10                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          Unnamed: 11 Unnamed: 12 Unnamed: 13 Unnamed: 14 Unnamed: 15
            Capability                 Use Cases                           Features                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    Description Release (Day1)              Dependencies               Integrations Cross-Feature Impact                                                                                                                                                      P360 Requirements Reference    Screens Tables/Ints                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         Questions/Complexity Drivers     T-Shirt   Eng Weeks                        
   Audience Management    1. Audience Management         1.1 CSV Upload & Ingestion                                                                                                                                                                                                                                      • Users upload .csv of domains; system validates (format, duplicates) and stores in S3. Max 10K records/file; <30s processing.\n• Error log/management for failed imports\n**Discussion Point: Account name matching to domain (might require fuzzy matching, might not be MVP). Also, Domain + Country (CNN US vs UK, etc). AI potential            MVP                    AWS S3                     AWS S3   1.2, 1.3, 1.5, 2.2                                                                                                                  • Core Requirements - User Management - Organization Management          1           1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           Future Integration Points?           S           1                        
   Audience Management    1. Audience Management               1.2 Audience Builder                                                                                                                                                                                                                                                                                                                                         • AND/OR logic tree to segment data from CSV + Bombora fields (e.g., intent data). \n• Supports TTD-compatible JSON output.\n*Status/Change Log w/ revert back to previous audience, etc. Ability to view historical audience builds.             MVP    1.1, 1.3, Bombora, TTD               Bombora, TTD             1.5, 2.2                                                                                                                                                                                           1           3                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                L           4                        
   Audience Management    1. Audience Management 1.3 Audience Field-Mapping Service                                                                                                                   • Ingests and normalizes Bombora S3 files (20–60M records/day) using predefined schema mappings (e.g., Bombora’s "company_name" → P360’s "account_name"). \n• Normalize fields (e.g., company_name, intent_data) for segmentation.\nValidates data against P360’s taxonomy (e.g., industry verticals, revenue tiers)\n• Real-time ingestion with validation.\n• Performance target: Vendor data processing within 4 hours. log mismatches for manual review.            MVP 1.1, 4.4, AWS S3, Bombora AWS S3, Bombora, Integrate                  1.2                                                                                                                                                                                           1           1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    Assumes user table and role table           M           2                        
   Audience Management    1. Audience Management         1.4 Audience Deduplication                                                                                                                                                                                                                                                                                                                                                                                                                                                    • Auto-flag duplicate audiences/invalid domains. Invalid Domains = Format (future: company doesn't exist, but out of scope)            MVP                       1.2                                             1.5                                                                                                                  • Core Requirements - User Management - Organization Management          0           0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        • Are seat-org mappings stored by P360, or retrieved in real-time from TTD?\t           S           1                        
   Audience Management    1. Audience Management         1.5 Audience Export to TTD • Convert audience segments to TTD-compatible JSON with UID2 identifiers for cookieless targeting. \n• Enrich payloads with first-party cookies (if available) and TTD field mappings (e.g., "P360_audience_id" → "ttd_segment_id"). \n• Implement retry logic for API failures (max 3 attempts) with exponential backoff. \n- When does an audience get updated? An audience in tradedesk gets updated upon save in audience builder, full weekly saturation / update from bombora on saturdays. \n\nCreate tradedesk audience for every audience that's configured in P360.             MVP       1.2, 6.1, TTD, UID2          TTD, UID2, AWS S3                  2.4                                                                                                                                                                                           0           0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                S           1                        
Campaign Orchestration 2. Campaign Orchestration              2.1 Program Hierarchy                                                                                                                                                                                                                                                                                                                                                    • UI to nest Programs > Campaigns > Line Items. \n• DB schema supports parent-child relationships.\n- At some point, programs will need to hold files (non-mvp, but nice-to-have)\n- Program --> IO, Campaign --> Line Item            MVP                                                                  2.2, 2.3                                                                                                                                                                                           1           1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                M           2                        
Campaign Orchestration 2. Campaign Orchestration         2.2 Campaign Configuration                                                                                                                                                                                                                                                                                                                                                                                                  • Set budget, flight dates, KPIs, and assign audiences (from 1.2). \n• Real-time validation (e.g., budget ≤ Program cap).\nStatus / creation based off status, errors for Uis            MVP                  1.2, 2.1                                        2.4, 2.5                                                                                                                                                                                           1           1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                S           1                        
Campaign Orchestration 2. Campaign Orchestration        2.3 Line Item Configuration                                                                                                                                                                                                                                                                                                                                                                                                                                  • Configure bids, creatives, pacing.\n• Validate against TTD constraints (e.g., MaxBidCPM).\n- Line item configs are optional (nullable, etc)            MVP                  2.2, TTD                        TTD                  2.4                                                                                                                                                                                           1           1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                S           1                        
Campaign Orchestration 2. Campaign Orchestration           2.4 Campaign Sync to TTD                                                                                                                                                                                                                                                                                                                                                                                                          • Call TTD APIs (/v3/campaign, /v3/adgroup). \n• Retry logic for API failures. \n• Log sync status. \n• Performance target: <5 seconds response for campaign actions.            MVP             2.2, 2.3, TTD                   TTD, 4.7                  1.5 • Core Requirements - Audience Building and Management\n• Performance Requirements - Customer File Uploads\n• Import Table = Audience Import\n• Service = Audience Field Mapping          0           0 • How do we manage and intake multiple file formats? Is the customer expected to conform or do we have to onboard? If the latter, how can we scale this process either via UI/mapping, or templatized IaC to ingest custom data?\n• How do custom audiences blend with P360 audiences? Is it either A or B, or is C = A + B hybrid required for audience building?\n• Confirm flow / screens / tables\n• Data validation layer - what are the requirements?\n• What's the error management experience look like?\n• What are the expected error states for CSV uploads (e.g., malformed headers, duplicate domains)? How should they be surfaced to users?\t\t\t\t\t           S           1                        

**Total Records**: 58 (showing first 10)

**Unnamed: 0 - Unique Values**: Capability, Audience Management, Campaign Orchestration, Attribution, Reporting, & Adv Data Mgmt, Data Integration, Onboarding, Performance Insights & Optimization, Tech Foundation, Marketplace Mgmt, Roles & Permissions
**Unnamed: 1 - Unique Values**: Use Cases, 1. Audience Management, 2. Campaign Orchestration, 3. Attribution & Reporting, 4. Data Integration: Bombaro, 4. Data Integration: TTD, 4. Data Integration: Salesforce, 7. Advanced Data Management, 5. Operational Support, 6. Performance Insights & Optimization
**Unnamed: 4 - Unique Values**: Release (Day1), MVP, Post-MVP
**Unnamed: 9 - Unique Values**: Screens, 1, 0, 4
**Unnamed: 10 - Unique Values**: Tables/Ints, 1, 3, 0, 8, 2, 5, 4
**Unnamed: 12 - Unique Values**: T-Shirt, S, L, M, XXL, XL
**Unnamed: 13 - Unique Values**: Eng Weeks, 1, 4, 2, 8, 6
**Unnamed: 14 - Unique Values**: need new feature for biz review, 4 feeds w/ UIDs (Tanner), evaluate API credits w/ Salesforce, reporting client we determine (Dependency). Bounteous to provide recs. , infra, Tanner to clarify joins, Infra, INfra, redundant to datadog features
**Unnamed: 15 - Unique Values**: infra

## Sheet: Milestones
------------------------------
**Dimensions**: 11 rows × 5 columns

**Columns**:
- Unnamed: 0
- Unnamed: 1
- Unnamed: 2
- Unnamed: 3
- Unnamed: 4

**Sample Data**:
Unnamed: 0 Unnamed: 1          Unnamed: 2                                                 Unnamed: 3                                                                                                                                                                                                                     Unnamed: 4
                                                                                                                                                                                                                                                                                                                                   
            Milestone                Date                                                Description                                                                                                                                                                                                                     Next Steps
                    1 2025-08-15 00:00:00    Scope Alignment, Working Methods, Estimates/Commercials BNTS - Deck from this week\nSree - Excel from this week\nGreg - Tech Punchlist\nTanner - Review features/use cases, provide feedback\nTanner - Provide missing details (integration details, TTD clarifications from his call)
                    2 2025-08-15 00:00:00                   AI SDLC recommendations & specific tools                                                                                                                                                               Anil to provide specific tool recommendations for AI driven SDLC
                    3 2025-08-15 00:00:00                                 Metabase / reporting tools                                                                                                                                                                                             Anil - provide alternative options
                    4 2025-08-22 00:00:00                                                  MSA + SOW                                                                                                                                                                                                                      BNTS/P360
                    5 2025-08-22 00:00:00 Technologies - Accounts, Access, etc (AWS, TradeDesk, Etc)                                                                                                                                                                                                         BNTS - Number of Seats
                    6 2025-08-22 00:00:00                                              Tool accesses                                                                                                                                                                                Tanner - to provide licenses/test accounts etc.
                    7                ASAP                                                 Onboarding                                                                                                                                                                                                                  Matthew Nalty
                    8 2025-08-15 00:00:00                                 Confirm Datadog vs others?                                                                                                                                                                                                              Tanner to confirm

**Total Records**: 11 (showing first 10)

**Unnamed: 1 - Unique Values**: Milestone, 1, 2, 3, 4, 5, 6, 7, 8, 9
**Unnamed: 2 - Unique Values**: Date, 2025-08-15 00:00:00, 2025-08-22 00:00:00, ASAP, 2025-09-01 00:00:00
**Unnamed: 3 - Unique Values**: Description, Scope Alignment, Working Methods, Estimates/Commercials, AI SDLC recommendations & specific tools, Metabase / reporting tools, MSA + SOW, Technologies - Accounts, Access, etc (AWS, TradeDesk, Etc), Tool accesses, Onboarding, Confirm Datadog vs others?, MVP Runway Backlog/Sprint Zero Kickoff
**Unnamed: 4 - Unique Values**: Next Steps, BNTS - Deck from this week
Sree - Excel from this week
Greg - Tech Punchlist
Tanner - Review features/use cases, provide feedback
Tanner - Provide missing details (integration details, TTD clarifications from his call), Anil to provide specific tool recommendations for AI driven SDLC, Anil - provide alternative options, BNTS/P360, BNTS - Number of Seats, Tanner - to provide licenses/test accounts etc., Matthew Nalty, Tanner to confirm, Access & 2 Sprints Defined

## Sheet: Sheet4
------------------------------
**Dimensions**: 15 rows × 3 columns

**Columns**:
- Unnamed: 0
- Unnamed: 1
- Unnamed: 2

**Sample Data**:
Unnamed: 0                  Unnamed: 1                                                                                                                         Unnamed: 2
                               Element                                                                                                                        Description
                             Use Cases               Highlight specific, logical bundles where the product will be utilized to ensure a logical grouping of capabilities.
                              Features                                Outline the key functionalities that will be developed to provide value and meet user expectations.
                           Description                     Provide a concise overview of the capabilities, requirements, and how it fits into the overall product vision.
                               Release                              Define the timeline and phases for launching the MVP to manage stakeholder expectations and planning.
                          Dependencies Identify any interrelated tasks or systems required for successful MVP delivery to mitigate risks and facilitate smooth execution.
                          Integrations   Detail necessary connections with existing systems or third-party tools to ensure seamless operation and enhanced functionality.
                  Cross-Feature Impact                              Assess how features interact with each other to maintain coherence and avoid conflicts within the MVP
           P360 Requirements Reference                  Ensure alignment with broader organizational requirements and standards for consistent and strategic development.
                               Screens                        Describe the visual layouts and user interface elements to guide design and user experience considerations.

**Total Records**: 15 (showing first 10)

**Unnamed: 1 - Unique Values**: Element, Use Cases, Features, Description, Release, Dependencies, Integrations, Cross-Feature Impact, P360 Requirements Reference, Screens
**Unnamed: 2 - Unique Values**: Description, Highlight specific, logical bundles where the product will be utilized to ensure a logical grouping of capabilities., Outline the key functionalities that will be developed to provide value and meet user expectations., Provide a concise overview of the capabilities, requirements, and how it fits into the overall product vision., Define the timeline and phases for launching the MVP to manage stakeholder expectations and planning., Identify any interrelated tasks or systems required for successful MVP delivery to mitigate risks and facilitate smooth execution., Detail necessary connections with existing systems or third-party tools to ensure seamless operation and enhanced functionality., Assess how features interact with each other to maintain coherence and avoid conflicts within the MVP, Ensure alignment with broader organizational requirements and standards for consistent and strategic development., Describe the visual layouts and user interface elements to guide design and user experience considerations.

## Sheet: Xandr Gap Analysis
------------------------------
**Dimensions**: 13 rows × 6 columns

**Columns**:
- Unnamed: 0
- Unnamed: 1
- Unnamed: 2
- Unnamed: 3
- Unnamed: 4
- Unnamed: 5

**Sample Data**:
Unnamed: 0                     Unnamed: 1                                                                       Unnamed: 2                                                                     Unnamed: 3                                                                                 Unnamed: 4                                                                                Unnamed: 5
                               Capability                                                                            Xandr                                                                       P360 DSP                                                                          Delta/Opportunity                                                                           Recommendations
           Audience Upload & Segmentation         Cookie matching, contextual targeting, RTSS for real-time data ingestion                                  CSV upload, Bombora mapping, UID2 sync to TTD           Strong parity; Missing: TTL & segment TTL versioning, real-time cookie ingestion                 Add: Real-time cookie ingestion (Post-MVP), segment TTL management (MVP).
                              Forecasting                         Real-time reach/impressions tied to inventory & bid data                         Planned forecast engine (based on audience attributes)                                          Missing: inventory signals and TTD feedback loop.                           Integrate TTD inventory API (Post-MVP) for dynamic forecasting.
                 Program & Campaign Setup                    Multi-channel containers, advanced flighting, targeting rules                               Basic hierarchy (Program > Campaign > Line Item)               Parity in structure; Missing: Cross-channel support, auto-inheritance rules.                      Add: Auto-inheritance logic (MVP), multi-channel support (Post-MVP).
                      Line Item Execution                   Granular bid control, PMP, video/CTV, exchange-level targeting Basic display-only line items with pacing, bid config, and creative assignment                                Missing: PMP, video/CTV, and exchange-level targeting logic                     Prioritize: PMP support (Post-MVP), video/CTV formats (2026 roadmap).
                      Audience Activation RTSS, deal-ID activation, real-time cookie match with exchange, multi-DSP export                             TTD audience export with UID2 & Bombora enrichment         Functional parity for TTD; Missing: multi-DSP export flexibility for extensibility Build: Extensible audience export framework (Post-MVP) for Trade Desk, Google DV360, etc.
                      Creative Management                                                  Dynamic creatives, QA workflows           Marketers can upload assets; Sellers can list content in marketplace                                                          No dynamic creatives or QA tools.      Add: Creative compliance classifier (AI-08) + dynamic creative templates (Post-MVP).
                  Attribution & Reporting     Real-time impression & click logs, multi-touch attribution, log-level access                        Batch REDS files, Bombora matching, Metabase dashboards                       Attribution is batch-based; Missing: multi-touch or event-level logs                Enhance: Real-time event streaming (Kafka) + multi-touch model (Post-MVP).
                        User Roles & Auth                                       Full RBAC, agency delegation, data masking                 Buyer, Seller, Campaign Manager, Super Admin; Entra ID & Auth0                   Missing: no agency delegation, UI impersonation, or data masking by role                                 Add: Agency role (4.11) with delegated access (Post-MVP).
                      SSP/Exchange Access                                                Xandr Monetize + third-party SSPs                                                               TTD-only for now No exchange diversity; Missing: private marketplace (PMP) functionality (part of post-MVP)                                              Partner: Add 1-2 SSPs by 2026 for PMP deals.

**Total Records**: 13 (showing first 10)

**Unnamed: 1 - Unique Values**: Capability, Audience Upload & Segmentation, Forecasting, Program & Campaign Setup, Line Item Execution, Audience Activation, Creative Management, Attribution & Reporting, User Roles & Auth, SSP/Exchange Access
**Unnamed: 2 - Unique Values**: Xandr, Cookie matching, contextual targeting, RTSS for real-time data ingestion, Real-time reach/impressions tied to inventory & bid data, Multi-channel containers, advanced flighting, targeting rules, Granular bid control, PMP, video/CTV, exchange-level targeting, RTSS, deal-ID activation, real-time cookie match with exchange, multi-DSP export, Dynamic creatives, QA workflows, Real-time impression & click logs, multi-touch attribution, log-level access, Full RBAC, agency delegation, data masking, Xandr Monetize + third-party SSPs
**Unnamed: 3 - Unique Values**: P360 DSP, CSV upload, Bombora mapping, UID2 sync to TTD, Planned forecast engine (based on audience attributes), Basic hierarchy (Program > Campaign > Line Item), Basic display-only line items with pacing, bid config, and creative assignment, TTD audience export with UID2 & Bombora enrichment, Marketers can upload assets; Sellers can list content in marketplace, Batch REDS files, Bombora matching, Metabase dashboards, Buyer, Seller, Campaign Manager, Super Admin; Entra ID & Auth0, TTD-only for now
**Unnamed: 4 - Unique Values**: Delta/Opportunity, Strong parity; Missing: TTL & segment TTL versioning, real-time cookie ingestion, Missing: inventory signals and TTD feedback loop., Parity in structure; Missing: Cross-channel support, auto-inheritance rules., Missing: PMP, video/CTV, and exchange-level targeting logic, Functional parity for TTD; Missing: multi-DSP export flexibility for extensibility, No dynamic creatives or QA tools., Attribution is batch-based; Missing: multi-touch or event-level logs, Missing: no agency delegation, UI impersonation, or data masking by role, No exchange diversity; Missing: private marketplace (PMP) functionality (part of post-MVP)
**Unnamed: 5 - Unique Values**: Recommendations, Add: Real-time cookie ingestion (Post-MVP), segment TTL management (MVP)., Integrate TTD inventory API (Post-MVP) for dynamic forecasting., Add: Auto-inheritance logic (MVP), multi-channel support (Post-MVP)., Prioritize: PMP support (Post-MVP), video/CTV formats (2026 roadmap)., Build: Extensible audience export framework (Post-MVP) for Trade Desk, Google DV360, etc., Add: Creative compliance classifier (AI-08) + dynamic creative templates (Post-MVP)., Enhance: Real-time event streaming (Kafka) + multi-touch model (Post-MVP)., Add: Agency role (4.11) with delegated access (Post-MVP)., Partner: Add 1-2 SSPs by 2026 for PMP deals.

## Sheet: Work Units
------------------------------
**Dimensions**: 2 rows × 3 columns

**Columns**:
- Unnamed: 0
- Unnamed: 1
- Unnamed: 2

**Sample Data**:
Unnamed: 0 Unnamed: 1 Unnamed: 2
              Screens         10
           Tables/Int         30


## Sheet: T-Shirt
------------------------------
**Dimensions**: 24 rows × 7 columns

**Columns**:
- Unnamed: 0
- Unnamed: 1
- Unnamed: 2
- BE
- FS
- DE
- Unnamed: 6

**Sample Data**:
Unnamed: 0 Unnamed: 1 Unnamed: 2  BE   FS  DE Unnamed: 6
                    S          1   4    3               
                    M          2                        
                    L          4                        
                   XL          6                        
                  XXL          8                        
                                                        
                                                        
                                                        
                              31 155 1240 0.6        0.3
                                                        

**Total Records**: 24 (showing first 10)

**Unnamed: 1 - Unique Values**: S, M, L, XL, XXL
**Unnamed: 2 - Unique Values**: 1, 2, 4, 6, 8, 31, BE, 0.4, 496, 3.1
**BE - Unique Values**: 4, 155, FE, 0.3, 372, 2.325, BE, FS, DE
**FS - Unique Values**: 3, 1240, DE, 0.3, 372, 3.1, 2
